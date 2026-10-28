# Product notes

This repository is the production website source, not a theme demo. It is a
standalone Hugo site whose content and configuration live at the repository
root. The Educenter implementation is in `themes/educenter-hugo/`.

## Build and preview

Requirements: Hugo Extended >= 0.160.0 and Go >= 1.21.

```bash
npm run dev
npm run build
npm run preview
```

The npm wrappers require Bash. Direct Hugo equivalents are `hugo server`,
`hugo --gc --minify --forceSyncStatic`, and
`hugo server -e production --minify --disableFastRender`.

## Product data and integrations

Public content is maintained in `content/french/`, with shared homepage data in
`data/fr/`. Site settings are in `config/_default/` and `hugo.toml`.

Student account, application, and payment screens currently have no production
backend. They must not be used to authenticate real students, submit real
applications, or process real payments. Before enabling those workflows,
connect them to the approved services and remove all sample accounts and
simulated transaction behavior.

## Deployment

Netlify reads `netlify.toml` from the repository root and publishes `public/`.
Its build configuration skips non-production contexts. In the Netlify
dashboard, disable deploy previews and branch deploys and configure the
production branch.
