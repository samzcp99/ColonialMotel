<!-- Copilot / AI instructions for contributors working on this static-site repo -->
# Copilot instructions — static-site

Purpose
- Help maintain and evolve a small static website built with plain HTML, vendor CSS/JS, and author SCSS.

Big picture
- This is a static site: the primary pages are at the repo root (e.g. `index.html`, `about.html`, `rooms.html`, `blog.html`).
- Styles are authored in `scss/` and the compiled CSS used by the site lives in `css/` (see `scss/style.scss` -> `css/style.css`).
- Vendor libraries (Bootstrap, jQuery, Owl Carousel, etc.) are checked in under `css/` and `js/`. Avoid editing vendor files directly.

Quick workflows
- Preview locally: run a local static server from the project root and open `http://localhost:8000`:

  ```bash
  # Python 3
  python3 -m http.server 8000
  ```

- Rebuild author CSS (if you edit SCSS):

  ```bash
  # Install dart-sass if needed: npm install -g sass
  sass scss/style.scss css/style.css --no-source-map --style=expanded
  ```

- JS edits: prefer `js/main.js` for project-specific behavior. Leave minified vendor files (e.g. `js/jquery.min.js`) alone.

Project conventions & patterns
- Source vs built files: Edit `.html` and files in `scss/` and `js/main.js`. `css/` contains both vendor and built CSS; `css/style.css` is the compiled result of `scss/style.scss`.
- Asset paths: images live in `images/`, fonts in `fonts/` and are referenced from HTML/CSS with relative paths. Keep directory structure intact.
- Bootstrap usage: The project includes a customized SCSS tree under `scss/bootstrap/`. If altering Bootstrap variables, prefer updating `scss/style.scss` or the relevant partials under `scss/` and recompiling.

Important files to inspect
- Site entry: [index.html](index.html)
- Page templates: [about.html](about.html), [rooms.html](rooms.html), [blog.html](blog.html)
- Author CSS: [scss/style.scss](scss/style.scss) -> [css/style.css](css/style.css)
- Project JS: [js/main.js](js/main.js)

Editing guidance for AI agents
- When modifying layout or styles, change `scss/` partials and recompile; do not hand-edit minified vendor CSS in `css/`.
- When introducing new npm tooling or package-based workflows, add a `README.md` with commands and a `package.json` for reproducibility — do not assume a package manager is already configured.
- Preserve existing HTML semantics: pages are flat files (no templating engine). If extracting templates, document the new structure and update this instruction file.

Examples
- To update the hero styles on the homepage: edit `scss/style.scss` or the partial under `scss/` that contains hero rules, then run the `sass` command above and refresh `index.html` in the browser.
- To add a new page `gallery.html`: create `gallery.html` at the repo root, add images to `images/gallery/`, and update any navigation links in `index.html` and `js/main.js` if scripts reference the page.

What not to change
- Do not modify files under `js/` or `css/` that are clearly vendor libraries (names ending in `.min.js`, `.min.css`, or third-party names like `owl.carousel`, `ionicons`).

If unsure
- Run the local server and inspect the page in the browser to confirm visual/regression changes.
- Ask for clarification and point to the specific file you plan to edit (e.g. "I'll change `scss/_nav.scss` to adjust header spacing").

Feedback
- If any section is unclear or you find a different workflow (for example a build task or CI step not documented here), update this file and open a short PR describing the change.
