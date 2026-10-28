# School Website

A French-language website for professional education in Morocco, built with
Hugo. This repository contains the site itself, including its content, layouts,
configuration, and assets.

## Requirements

- Hugo Extended 0.160.0 or newer
- Go 1.21 or newer (for the Hugo image module)
- Node.js only if you want to use the npm command wrappers

## Local development

```bash
npm run dev
```

Or run Hugo directly:

```bash
hugo server
```

Create a production build with:

```bash
npm run build
```

The npm wrappers use Bash. On Windows, use Git Bash or run Hugo directly.

## Content and configuration

- Site configuration: `config/_default/` and `hugo.toml`
- French content: `content/french/`
- Homepage data: `data/fr/`
- French interface strings: `i18n/fr.yaml`
- Site assets and static files: `assets/` and `static/`
- Theme implementation: `themes/educenter-hugo/`

## Netlify

The repository root is the Netlify base directory. `netlify.toml` builds and
publishes `public/` for the production context only, using the Netlify URL as
the Hugo base URL.

In the Netlify dashboard, choose the production branch under **Project
configuration → Build & deploy → Continuous deployment**, and disable deploy
previews and branch deploys. The configuration skips non-production builds as
an additional guard.

## Product integrations

The public pages are statically generated. Student account, application, and
payment flows need production backend services before collecting real personal,
application, or payment data. Do not use sample credentials or client-side
simulations for real users or transactions.

## Credits

The site uses the Educenter Hugo theme, distributed under the repository's MIT
license.
