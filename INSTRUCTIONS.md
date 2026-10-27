# Educenter Hugo Theme — OFPPT-style School Demo

This is a complete, fully working demo replica of a Moroccan school website (OFPPT/MyWay/CMC style). **Everything is fake and clearly a demonstration:** no real payments, no real student data, all content fictional.

## Prerequisites

- **Hugo Extended >= 0.160** (required for SCSS compilation): `hugo version`
- **Node.js** (for the scraper script): `node --version`
- **Go** (used by Hugo modules, first build needs network)

## Folder structure

```
school/                         # Hugo theme (root = theme)
├── educenter-hugo/             # theme files
│   ├── archetypes/
│   ├── assets/                 # SCSS + JS
│   ├── layouts/                # Hugo templates
│   ├── static/                 # vendors (Bootstrap, jQuery, slick, …) + js/demo-app.js
│   └── theme.toml
├── exampleSite/                # demo site (content, config, data)
│   ├── config/_default/        # hugo.toml, menus.fr.toml, languages.toml, module.toml
│   ├── content/french/         # all site content (course, blog, contact, pages, …)
│   ├── data/fr/                # homepage.yml, months.yml
│   ├── i18n/fr.yaml            # French UI strings
│   └── hugo.toml               # site params (logo, contact, social, map, …)
├── data/                       # scraped content (imported into the site)
│   └── scraped/
│       ├── combined.json       # merged, deduplicated scraped items
│       ├── ofppt.json          # (empty — ofppt.ma blocked in some networks)
│       ├── myway.json
│       └── cmc.json
├── scrape.js                   # content scraper (Node, no external deps)
├── static/                     # site-level static (data for the demo app)
│   └── data/students.json      # mock student database
├── package.json                # npm scripts (dev, build, preview)
└── INSTRUCTIONS.md             # this file
```

## How to run

From the repo root:

```bash
# 1. Install dependencies (Hugo Extended + Node). Hugo is not installed by npm.
# 2. Start the demo site:
cd exampleSite
hugo server --themesDir ..          # themesDir = repo root, finds educenter-hugo/
# or, using npm (bash only):
npm run dev                         # equivalent: cd exampleSite && hugo server --themesDir ..
```

Open `http://localhost:1313/`.

To build for production:

```bash
cd exampleSite
hugo --themesDir .. --gc --minify
# or: npm run build
```

> Note: `npm run dev` / `npm run build` are bash-only scripts. On Windows PowerShell use Git Bash, or run Hugo directly as shown above. Do **not** run `npm run project-setup` (it converts theme→site and destroys the theme layout).

## Scraper (content import)

The scraper crawls the public pages of `myway.ac.ma`, `www.cmc.ac.ma` and `www.ofppt.ma`, checks `robots.txt` first, waits 1–2s between requests, deduplicates by URL, and saves structured JSON (`title`, `url`, `category`, `text`, `images`) to `data/scraped/`.

```bash
node scrape.js
```

Output: `data/scraped/combined.json` (merged, deduplicated items). The imported content feeds the **programs** (course), **news** (blog) and **contact** pages. Images are used as demo placeholders only.

> `www.ofppt.ma` may be unreachable from some networks; in that case its content still comes through via the MyWay news feed included in the scrape.

## Fake Apply flow (fixed)

The "Apply / Postuler" button previously led to a 404. It now points to a working demo flow:

1. **Apply form** (`/apply/`): identity, chosen program, level (TS/T/Qualification), document upload, terms acceptance.
2. **Fees page** (`/fees/`): tuition, registration fees and payment schedule by filière.
3. **Fake payment** (`/apply/payment/`): card or bank-transfer form that **always succeeds**, then shows a receipt. A visible notice states: *"Demo only, no real payment."*
4. **Confirmation** (`/apply/confirmation/`): shows a fake application number and receipt.

No real backend, no real payments, no real data is stored.

## Fake login system (functional, client-side)

**Login page** (`/login/`):
- Username/email + password fields with validation.
- Error messages for wrong credentials.
- **Demo credentials displayed on the page** so testers can log in (password for all: `demo123`):

| Étudiant | Identifiant / e-mail |
|---|---|
| Amine Benali — TS Développement Digital | amine.benali@ecole-demo.ma |
| Sarah Tazi — T Gestion des Entreprises | sarah.tazi@ecole-demo.ma |
| Karim Mansouri — TS Électromécanique | karim.mansouri@ecole-demo.ma |
| Inès Berrada — Qualification Cuisine | ines.berrada@ecole-demo.ma |
| Youssef Idrissi — T Infographie | youssef.idrissi@ecole-demo.ma |

Mock accounts live in `static/data/students.json`. Session is kept in `localStorage`. **Logout** links are on every student page.

## Student dashboard (after login)

`/dashboard/` shows: avatar (initials), name, school points, program & level, current modules, grades with progress bars, attendance, weekly timetable, announcements, upcoming exams, documents/certificates and messages. Related pages:

- `/announcements/` — announcements
- `/exams/` — upcoming exams
- `/documents/` — documents & certificates
- `/messages/` — messages
- `/profile/` — profile + logout

All data is fake but realistic and consistent across pages (stored in `static/data/students.json` and rendered by `static/js/demo-app.js`).

## Fixes applied

- Added the missing `layouts/educenter-hugo/partials/image.html` partial (was referenced 23× but did not exist).
- Moved the theme into `educenter-hugo/` so `--themesDir ..` resolves correctly; updated `package.json` scripts accordingly.
- Changed every `apply_url` from `contact/` (404) to `apply/` (working form) on all courses and events.
- Removed creator names (Abdolah Anjar / Moaad) from all content (news, programs, staff, events). They are mentioned **only once**, in the footer: *"Projet créé par Abdullah Anshar et Mouad."*
- Replaced the three "Dernières Nouvelles" creator cards with school news (authors now "Rédaction OFPPT").
- Footer note: *"Projet démo scolaire. Contenu inspiré des sites publics OFPPT, MyWay et CMC. Toutes les données sont fictives."*
- Responsive CSS added in `educenter-hugo/assets/scss/_demo.scss`.
- Removed duplicated/creator-branded content; checked buttons and links.

## Important notes

- **No real payments** — the payment simulation always succeeds and is explicitly labelled demo-only.
- **No real student data** — all accounts, grades and documents are fictional.
- **Images** are demo placeholders; scraped images are not hotlinked as real content.
- This is a school project demo, not a production site.
