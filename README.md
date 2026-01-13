# Colonial Motel static site

This repository is a **pure static website** intended to be deployed directly to an Nginx web root.

## Deployment model (GitHub → server)

### Principles

- GitHub is the single source of truth.
- The production server is deployment-only.
- No manual file uploads.
- No server-side runtime or build step.
- Nginx config is assumed to already be working (this repo does not modify it).

### What gets deployed

The server web root should contain only:

- `*.html` (site pages)
- `css/`, `js/`, `images/`, `fonts/` (static assets)
- `lan/` (localized pages)
- `robots.txt`, `sitemap.xml`

Dev-only folders (ignored by Git) and therefore **not deployed**:

- `tools/` (local helper scripts)
- `scss/` (source styles)
- `docs/` (notes)
- `.venv/` (local Python env)

### Local setup (first time)

1) Initialize Git and commit:

```bash
git init
git branch -M main
git add -A
git commit -m "Initial static site"
```

2) Add your GitHub remote and push:

```bash
git remote add origin https://github.com/samzcp99/ColonialMotel.git
git push -u origin main
```

### Production server setup (first time)

One-time steps to make `/var/www/html` track `origin/main`.

1) Backup the current web root (optional but recommended):

```bash
sudo mv /var/www/html "/var/www/html_backup_$(date +%F_%H%M%S)"
sudo mkdir -p /var/www/html
```

2) Clone the repo into the web root:

```bash
sudo git clone https://github.com/samzcp99/ColonialMotel.git /var/www/html
```

If you run the deploy command with `sudo`, you may need:

```bash
sudo git config --global --add safe.directory /var/www/html
```

Preferred (cleaner) alternative: make `/var/www/html` owned by a non-root deploy user and run git commands without `sudo`.

### Production server update (pull-based)

On the server, deploy by resetting the web root to match `origin/main` exactly:

```bash
cd /var/www/html
git fetch --all --prune
git reset --hard origin/main
```

This guarantees `/var/www/html` always matches GitHub (no manual edits, no server commits).

### Recommended server deploy script

Create a root-owned script (example path: `/usr/local/bin/site-deploy`) with:

```bash
#!/usr/bin/env bash
set -euo pipefail

WEBROOT="/var/www/html"
BRANCH="origin/main"

cd "$WEBROOT"

# Safety checks
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
	echo "ERROR: $WEBROOT is not a git repository" >&2
	exit 1
fi

echo "Deploying $(git remote get-url origin 2>/dev/null || echo '(no origin)') -> $WEBROOT"

git fetch --all --prune
git reset --hard "$BRANCH"

echo "Deployed commit: $(git rev-parse --short HEAD)"
```

Then run:

```bash
sudo chmod +x /usr/local/bin/site-deploy
sudo /usr/local/bin/site-deploy
```

## Notes

- Do not store secrets in this repository.
- If you use HTTPS GitHub auth on the server, use a deploy key or a PAT stored in the server’s credential manager (not in the repo).
