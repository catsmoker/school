# AGENTS.md — Educenter Hugo theme

This repo is a **Hugo theme** (root = theme), not a standalone site. `exampleSite/` is the demo site, served with `--themesDir ../..` (see `package.json`).

## Toolchain

- Requires **Hugo Extended >= 0.160.0** (`exampleSite/config/_default/module.toml` floor wins; `theme.toml` / CI / netlify still pin stale `0.115.1`). SCSS (`assets/scss/main.scss` via `resources.Get | toCSS` in `layouts/partials/head.html`) only compiles with Extended.
- Also needs Go (`exampleSite/go.mod`, `go 1.21`, pulls `gethugothemes/hugo-modules/images` — first build needs network) and Node for the npm wrappers. Hugo/Go are not npm-installed; verify with `hugo version`.

## Commands (`package.json` — dual-mode)

Scripts auto-detect layout: if `exampleSite/` exists they `cd exampleSite && hugo ... --themesDir ../..`, else run at root.

- `npm run dev` — local server. `npm run build` — production build (`--gc --minify --templateMetrics --forceSyncStatic`). `npm run preview` — production-like server (`-e production --minify --disableFastRender`).
- Scripts are **bash-only** (`export ...; if [ -d ...]`): they fail in Windows PowerShell/cmd. Use Git Bash, or run Hugo directly, e.g. `cd exampleSite; hugo server --themesDir ../..`.
- No real tests: `npm run test` just aliases `pnpm preview`. No lint/typecheck scripts.

## Destructive one-way scripts — do not run casually

- `npm run project-setup` (`scripts/projectSetup.js`): converts theme→site by moving `layouts,assets,static` → `themes/<theme>/` and flattening `exampleSite/*` to root, then deleting `exampleSite/`. All deploy configs (`.github/workflows/main.yml`, `netlify.toml`, `.gitlab-ci.yml`, `vercel-build.sh`) run this before build.
- `npm run theme-setup` (`scripts/themeSetup.js`): reverse conversion. Only use when explicitly asked to convert.
- Trap: `README.md` "Local development" tells you to run `npm run project-setup` before `npm run dev` — do **not** do that for theme work; it destroys the theme layout. Just `npm run dev`.

## Config (two live files — not duplicates)

- `exampleSite/config/_default/hugo.toml`: identity (`title`, `theme = "educenter-hugo"`, timezone, pagination), markup, caches, module mounts. Setup scripts parse the `theme = "..."` line by regex — keep that format.
- `exampleSite/hugo.toml` (root of exampleSite): all `[params]` — plugins, social, map, contact, preloader, cookies. Edit here for site params.
- `exampleSite/config/_default/languages.toml` (`fr` only — `en` removed; `defaultContentLanguage = 'fr'`, `disableLanguages = ["en"]` in `_default/hugo.toml`), `menus.fr.toml` (French labels), `module.toml`. Footer copyright credits the student makers (Abdolah Anjar et Moaad).

## Structure

- Theme code: `layouts/` (per-type `course/ event/ notice/ research/ teacher/ about/ author/ contact/ pages/ scholarship/` + `_default/baseof.html`, `index.html`, `404.html`; `partials/*-card.html`, `header/footer/head.html`), `assets/{scss,js}/`, `static/plugins/` (vendored Bootstrap/jQuery/slick/venobox/filterizr — do not hand-edit), `archetypes/default.md`.
- Site content (all French, OFPPT-adapted demo content): `exampleSite/content/french/` (sections `about author blog contact course event notice research scholarship teacher`), `exampleSite/data/fr/` (`homepage.yml`, `months.yml`), `exampleSite/i18n/fr.yaml` (Moroccan French UI strings), `exampleSite/static/`, `exampleSite/assets/` (images only — no SCSS overrides).
- Generated/ignored (never commit): `public/`, `resources/`, `hugo_stats.json`, `.hugo_build.lock`, `go.sum` (`.gitignore`).

## Conventions

- 2-space, LF, trim trailing whitespace (`.editorconfig`); `*.md` exempt.
- `*.html` formatted with Prettier `go-template` parser (`goTemplateBracketSpacing: true`, `bracketSameLine: true` in `.prettierrc`).
- Legacy JS rules in `.jshintrc` (`esversion: 12`, globals `jQuery,$,google`).
- Brand: OFPPT palette — `$primary-color: #ff7800` (orange, sampled from ofppt.ma) in `assets/scss/_variables.scss` (single accent variable, theme-wide); preloader bg is white (`_common.scss`). Dark navy `#1a1a37` base kept.
- Cross-linking contracts: course `teacher:` must equal the teacher page `title` exactly (`layouts/course/single.html` matches by Title); blog `author:` must urlize to an `author/` page slug; teacher `course:` values feed the auto-generated filter chips (`layouts/teacher/list.html`).
