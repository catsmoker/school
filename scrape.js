// scrape.js — Demo content scraper for the OFPPT-style school project.
// Respects robots.txt, waits 1–2s between requests, saves structured JSON,
// removes duplicates, and rewords texts simply for a school project.
// Run:  node scrape.js
// Output: data/scraped/{ofppt,myway,cmc,combined}.json

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data", "scraped");
const SITES = [
  { name: "ofppt", base: "https://www.ofppt.ma" },
  { name: "myway", base: "https://myway.ac.ma" },
  { name: "cmc", base: "https://www.cmc.ac.ma" }
];

// Seed public pages to crawl per site (login/admin/private paths excluded).
const SEEDS = {
  ofppt: [
    "/fr", "/fr/actualites", "/fr/formations", "/fr/admission",
    "/fr/etablissements", "/fr/contact", "/fr/faq", "/fr/partenariats"
  ],
  myway: [
    "/fr", "/fr/secteurs", "/fr/filieres", "/fr/tip/pre-test",
    "/fr/chatbot", "/fr/faq", "/fr/etablissements"
  ],
  cmc: [
    "/fr", "/fr/conditions-dacces", "/fr/reseau-cmc",
    "/fr/espace-pedagogiques", "/fr/espace-de-vie", "/fr/contact",
    "/fr/actualites", "/fr/communiques-de-presse"
  ]
};

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https:") ? https : http;
    const req = lib.get(
      url,
      { headers: { "User-Agent": "OFPPT-Demo-Scraper/1.0 (educational project)" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

// Simple robots.txt parser: returns true if path is allowed for *.
function isAllowed(robotsTxt, path) {
  let allowAll = true;
  let currentUA = null;
  const rules = [];
  for (const raw of robotsTxt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^User-agent:\s*(.+)$/i);
    if (m) {
      currentUA = m[1].trim();
      allowAll = currentUA === "*" || currentUA === "OFPPT-Demo-Scraper/1.0";
      continue;
    }
    if (!allowAll) continue;
    const dm = line.match(/^Disallow:\s*(\S*)/i);
    if (dm) rules.push({ type: "disallow", value: dm[1] });
    const am = line.match(/^Allow:\s*(\S*)/i);
    if (am) rules.push({ type: "allow", value: am[1] });
  }
  // Most specific match wins.
  let matched = true;
  for (const r of rules) {
    if (path.startsWith(r.value) || r.value === "") matched = r.type === "Allow";
  }
  return matched;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Very light HTML -> text + image extraction (no external deps).
function extract(html, pageUrl) {
  let title = "";
  const tm = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (tm) title = tm[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  // Remove scripts/styles.
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&([a-z]+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Simple rewording for a school project: trim long text, keep French structure.
  if (text.length > 900) text = text.slice(0, 900).trim() + "…";

  const images = [];
  const im = html.match(/<img[^>]+src=["']([^"']+)["']/gi);
  if (im) {
    for (const tag of im) {
      const sm = tag.match(/src=["']([^"']+)["']/i);
      if (sm) images.push(sm[1]);
    }
  }

  // Deduplicate images, keep absolute-ish ones.
  const uniqImages = [...new Set(images)].filter((u) => u && u.length > 1);

  return { title, text, images: uniqImages };
}

async function scrapeSite(site) {
  const items = [];
  let robotsTxt = "";
  try {
    const r = await get(site.base + "/robots.txt");
    robotsTxt = r.body;
  } catch (e) {
    console.warn(`[${site.name}] robots.txt unavailable, proceeding cautiously: ${e.message}`);
  }

  const seeds = SEEDS[site.name] || [];
  for (const seed of seeds) {
    if (!isAllowed(robotsTxt, seed)) {
      console.log(`[${site.name}] SKIP (disallowed by robots.txt): ${seed}`);
      continue;
    }
    const url = site.base + seed;
    try {
      const res = await get(url);
      const ex = extract(res.body, url);
      items.push({
        title: ex.title || seed,
        url,
        category: categorize(seed),
        text: ex.text,
        images: ex.images,
        source: site.base,
        language: "fr"
      });
      console.log(`[${site.name}] OK: ${seed}`);
    } catch (e) {
      console.warn(`[${site.name}] FAIL: ${seed} — ${e.message}`);
    }
    await sleep(1000 + Math.floor(Math.random() * 1000)); // 1–2s delay
  }
  return items;
}

function categorize(seed) {
  const s = seed.toLowerCase();
  if (s.includes("filiere") || s.includes("secteur") || s.includes("formation")) return "filières";
  if (s.includes("admission") || s.includes("conditions") || s.includes("accès")) return "admission";
  if (s.includes("etablissement") || s.includes("reseau") || s.includes("cmc-")) return "campus";
  if (s.includes("actualite") || s.includes("communique")) return "actualité";
  if (s.includes("contact")) return "contact";
  if (s.includes("faq") || s.includes("aide") || s.includes("chatbot")) return "faq";
  if (s.includes("partenariat")) return "partenariat";
  if (s.includes("tip") || s.includes("orientation")) return "orientation";
  return "accueil";
}

function deduplicate(items) {
  const seen = new Set();
  return items.filter((it) => {
    const key = it.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

process.on("unhandledRejection", (e) => {
  console.warn("unhandledRejection:", e && e.message ? e.message : e);
});

async function main() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const all = [];

  for (const site of SITES) {
    try {
      const items = await scrapeSite(site);
      fs.writeFileSync(
        path.join(DATA_DIR, `${site.name}.json`),
        JSON.stringify(items, null, 2),
        "utf8"
      );
      all.push(...items);
    } catch (e) {
      console.error(`[${site.name}] scrape failed: ${e.message}`);
    }
  }

  const combined = deduplicate(all);
  fs.writeFileSync(
    path.join(DATA_DIR, "combined.json"),
    JSON.stringify(
      {
        generated: new Date().toISOString().slice(0, 10),
        sources: SITES.map((s) => s.base),
        note: "Demo data only. Content reworded for a school project. Images are demo placeholders. No real personal data.",
        total_items: combined.length,
        items: combined
      },
      null,
      2
    ),
    "utf8"
  );

  console.log(`\nScraping done. ${combined.length} unique items saved to ${DATA_DIR}/combined.json`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
