#!/usr/bin/env bash
set -euo pipefail

# One-click deploy script for the ColonialMotel static site.
# - Makes a timestamped backup (tar.gz)
# - Fetches from remote, resets hard to a ref (tag/branch/commit)
# - Cleans untracked files
# - Validates key sitemap/robots files exist
# - Runs nginx config test + reload (if available)

SITE_DIR="${SITE_DIR:-/var/www/html}"
REMOTE="${REMOTE:-origin}"
REF="${REF:-v2026.01.14.1}"   # can be a tag (recommended), commit, or "main"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/colonial-motel}"
KEEP_BACKUPS="${KEEP_BACKUPS:-10}"
LOCK_FILE="${LOCK_FILE:-/var/lock/colonial-motel-deploy.lock}"

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERROR: required command not found: $1" >&2
    exit 1
  }
}

as_ref() {
  # Allow REF=main to mean remote tracking branch.
  if [[ "$REF" == "main" ]]; then
    echo "$REMOTE/main"
  else
    echo "$REF"
  fi
}

main() {
  require_cmd git
  require_cmd tar
  require_cmd date

  if [[ $EUID -ne 0 ]]; then
    echo "ERROR: run as root (use sudo) so backup + nginx reload work" >&2
    exit 1
  fi

  mkdir -p "$BACKUP_ROOT"

  # Simple lock to avoid concurrent deploys.
  exec 9>"$LOCK_FILE"
  if command -v flock >/dev/null 2>&1; then
    flock -n 9 || { echo "ERROR: another deploy is running (lock: $LOCK_FILE)" >&2; exit 1; }
  fi

  if [[ ! -d "$SITE_DIR/.git" ]]; then
    echo "ERROR: $SITE_DIR is not a git repo (missing .git)" >&2
    exit 1
  fi

  echo "==> Backup current site from: $SITE_DIR"
  local ts
  ts="$(date -u +%Y%m%dT%H%M%SZ)"
  local backup_file
  backup_file="$BACKUP_ROOT/site-$ts.tar.gz"

  # Exclude git metadata and common transient files.
  tar -C "$SITE_DIR" \
    --exclude=".git" \
    --exclude=".DS_Store" \
    --exclude="Thumbs.db" \
    -czf "$backup_file" .
  echo "    Backup written: $backup_file"

  echo "==> Fetch from $REMOTE (including tags)"
  git -C "$SITE_DIR" fetch --prune "$REMOTE"
  git -C "$SITE_DIR" fetch --tags "$REMOTE"

  local target
  target="$(as_ref)"
  echo "==> Deploy ref: $target"
  git -C "$SITE_DIR" reset --hard "$target"
  git -C "$SITE_DIR" clean -fdx

  echo "==> Validate required files exist"
  local required_files=(
    "robots.txt"
    "sitemap-index.xml"
    "sitemap.xml"
    "sitemap-en.xml"
    "sitemap-zh.xml"
    "sitemap-ja.xml"
    "sitemap-ko.xml"
    "sitemap-mi.xml"
    "index.html"
  )

  local missing=0
  for f in "${required_files[@]}"; do
    if [[ ! -f "$SITE_DIR/$f" ]]; then
      echo "ERROR: missing required file: $SITE_DIR/$f" >&2
      missing=1
    fi
  done
  if [[ "$missing" == "1" ]]; then
    echo "ERROR: deploy aborted (missing files). Repo state kept; restore from backup if needed." >&2
    exit 1
  fi

  if ! grep -q "sitemap-index.xml" "$SITE_DIR/robots.txt"; then
    echo "WARN: robots.txt does not mention sitemap-index.xml (please confirm robots policy)" >&2
  fi

  echo "==> Nginx reload (if installed)"
  if command -v nginx >/dev/null 2>&1; then
    nginx -t
    if command -v systemctl >/dev/null 2>&1; then
      systemctl reload nginx
      echo "    nginx reloaded"
    else
      echo "WARN: systemctl not found; skipping nginx reload" >&2
    fi
  else
    echo "WARN: nginx not installed; skipping nginx test/reload" >&2
  fi

  echo "==> Prune old backups (keep last $KEEP_BACKUPS)"
  # shellcheck disable=SC2012
  ls -1t "$BACKUP_ROOT"/site-*.tar.gz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs -r rm -f

  echo "==> Done"
  echo "    Site:   $SITE_DIR"
  echo "    Ref:    $target"
  echo "    Backup: $backup_file"
}

main "$@"
