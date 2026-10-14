# OFPPT

The official OFPPT website is a French-language Hugo site presenting
professional training, courses, teachers, events, notices, research, and
scholarships.

## Run locally

Install Hugo Extended 0.160.0 or newer and Go 1.21 or newer. Go is used to
download the Hugo image-processing module on the first build.

```sh
npm run dev
```

The local site is served at <http://localhost:1313/>. To create a production
build:

```sh
npm run build
```

For a production-like local preview:

```sh
npm run preview
```

The Hugo commands can also be run directly:

```sh
hugo server
hugo --gc --minify --forceSyncStatic
```

## Project structure

- `config/` and `hugo.toml` contain Hugo and site configuration.
- `content/french/` contains the French pages and sections.
- `data/fr/` contains homepage and date data.
- `i18n/` contains French interface strings.
- `layouts/` contains the page templates and shared partials.
- `assets/` contains the site's images, SCSS, and JavaScript.
- `static/` contains vendor plugins and files copied directly to the built site.
- `archetypes/` contains templates for creating new content.
- `go.mod` declares the Hugo module used for image processing.

The production build is configured for GitHub Pages. Netlify, GitLab Pages, and
Vercel configuration files are also included.
