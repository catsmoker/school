# School Website

This repository is a standalone Hugo site. Site content/configuration live at
the repository root; the Educenter layout implementation is in
`themes/educenter-hugo/`.

## Toolchain and commands

- Requires Hugo Extended >= 0.160.0 for SCSS compilation.
- Requires Go >= 1.21 for the Hugo image module.
- `npm run dev` starts the local server.
- `npm run build` creates a minified production build in `public/`.
- `npm run preview` runs a production-mode local server.
- npm wrappers use Bash; run Hugo directly when Bash is unavailable.

## Site structure

- `config/_default/`: Hugo configuration, languages, menus, and module settings.
- `content/french/`: French-language pages and sections.
- `data/fr/`: homepage and month data.
- `i18n/fr.yaml`: French interface strings.
- `assets/` and `static/`: site-level images and static files.
- `themes/educenter-hugo/`: layouts, theme assets, and vendored static plugins.
- `data/scraped/`: source data; not mounted as published site content.

Keep the `theme = "educenter-hugo"` setting in `config/_default/hugo.toml`
consistent with the theme directory name.

## Production constraints

Netlify is configured for production-context builds only; branch deploys and
deploy previews should also be disabled in its dashboard. Hugo builds are
static. Do not treat client-side sample accounts, applications, or payment
simulations as production authentication or transaction processing.

Generated files such as `public/`, `resources/`, `hugo_stats.json`,
`.hugo_build.lock`, and `go.sum` are ignored and should not be committed.

## Content relationships

- Course `teacher:` values must match teacher page titles exactly.
- Blog `author:` values must urlize to an existing `author/` page slug.
- Teacher `course:` values drive the generated course filter chips.
