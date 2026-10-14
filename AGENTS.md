# AGENTS.md — OFPPT Hugo website

This repository is a **standalone Hugo site**, not a theme package. The site
configuration, French content, templates, styles, scripts, and runtime assets
are all part of the root project. Do not run theme conversion scripts or move
the site into an `exampleSite/` directory.

## Toolchain

- Requires **Hugo Extended >= 0.160.0**. Extended is required to compile
  `assets/scss/main.scss` in `layouts/partials/head.html`.
- Requires Go >= 1.21 to resolve the Hugo image module in `go.mod`.
- Node/npm is only used for the convenience scripts in `package.json`.

## Commands

- `npm run dev` — local Hugo development server.
- `npm run build` — minified production build.
- `npm run preview` — production-like local preview.
- There is no separate unit-test or lint script.

## Configuration and structure

- `hugo.toml` contains site parameters; `config/_default/` contains Hugo
  identity, language, menu, and module configuration.
- `content/french/` contains the French-language site sections.
- `data/fr/` contains homepage and month data; `i18n/fr.yaml` contains UI text.
- `layouts/` contains page templates and shared partials.
- `assets/scss/` and `assets/js/` contain site styles and scripts;
  `assets/images/` contains site images.
- `static/plugins/` contains vendored Bootstrap, jQuery, Slick, Venobox,
  Filterizr, and Themify Icons. Do not hand-edit vendor files.
- `archetypes/` contains templates for new content.
- `public/`, `resources/`, `hugo_stats.json`, `.hugo_build.lock`, and
  `go.sum` are generated or ignored build artifacts; do not commit them.

## Conventions

- 2-space indentation, LF line endings, and no trailing whitespace
  (`.editorconfig`).
- Format HTML templates with Prettier's `go-template` parser.
- The site uses a green, gray, and blue palette defined in
  `assets/scss/_variables.scss`.
- Course `teacher:` values must exactly match teacher page titles;
  blog `author:` values must urlize to author page slugs; teacher `course:`
  values drive the teacher list filter chips.
