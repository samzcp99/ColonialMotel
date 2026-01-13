#!/usr/bin/env bash
set -euo pipefail

# First-time bootstrap for a server that does not yet have the site as a git repo.
# - Backs up current SITE_DIR (if it exists)
# - Clones the repo into a temp dir
# - Swaps into place atomically
# - Runs scripts/deploy.sh for the actual release reset + nginx reload

SITE_DIR="${SITE_DIR:-/var/www/html}"
REMOTE_URL="${REMOTE_URL:-}"
REF="${REF:-v2026.01.14.1}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/colonial-motel}"

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERROR: required command not found: $1" >&2
    exit 1
  }
}

main() {
  require_cmd git
  require_cmd tar
  require_cmd date

  if [[ $EUID -ne 0 ]]; then
    echo "ERROR: run as root (use sudo)" >&2
    exit 1
  fi

  if [[ -z "$REMOTE_URL" ]]; then
    echo "ERROR: REMOTE_URL is required (private repo). Example:" >&2
    echo "  REMOTE_URL=git@github.com:samzcp99/ColonialMotel.git" >&2
    exit 1
  fi

  if [[ "$SITE_DIR" == "/" ]]; then
    echo "ERROR: refusing to operate on /" >&2
    exit 1
  fi

  mkdir -p "$BACKUP_ROOT"

  echo "==> Backup existing site (if present): $SITE_DIR"
  local ts
  ts="$(date -u +%Y%m%dT%H%M%SZ)"
  if [[ -d "$SITE_DIR" ]] && [[ -n "$(ls -A "$SITE_DIR" 2>/dev/null || true)" ]]; then
    tar -C "$(dirname "$SITE_DIR")" \
      --exclude="$(basename "$SITE_DIR")/.git" \
      -czf "$BACKUP_ROOT/prebootstrap-$(basename "$SITE_DIR")-$ts.tar.gz" \
      "$(basename "$SITE_DIR")"
    echo "    Backup written: $BACKUP_ROOT/prebootstrap-$(basename "$SITE_DIR")-$ts.tar.gz"
  else
    echo "    No existing files to backup"
  fi

  if [[ -d "$SITE_DIR/.git" ]]; then
    echo "==> $SITE_DIR is already a git repo; skipping clone"
  else
    echo "==> Clone repo into a temp dir"
    local tmp_dir
    tmp_dir="${SITE_DIR}.new.${ts}"
    rm -rf "$tmp_dir"
    git clone "$REMOTE_URL" "$tmp_dir"

    echo "==> Swap into place"
    if [[ -d "$SITE_DIR" ]]; then
      mv "$SITE_DIR" "${SITE_DIR}.old.${ts}"
    fi
    mv "$tmp_dir" "$SITE_DIR"
  fi

  echo "==> Run deploy script"
  SITE_DIR="$SITE_DIR" REF="$REF" BACKUP_ROOT="$BACKUP_ROOT" bash "$SITE_DIR/scripts/deploy.sh"
}

main "$@"
