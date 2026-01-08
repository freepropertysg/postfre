const fs = require("fs");
const path = require("path");

// ===============================
// CONFIG
// ===============================
const SITE_URL = "https://postfre.com";
const ROOT_DIR = __dirname;

// today as YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];

// ===============================
// HELPERS
// ===============================
function urlBlock(loc, priority, changefreq) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// ===============================
// URL COLLECTION
// ===============================
let urls = [];

/* ==============================
   GLOBAL ROOT PAGES
================================ */
urls.push(
  urlBlock(`${SITE_URL}/`, "1.0", "weekly"),
  urlBlock(`${SITE_URL}/about/`, "0.8", "monthly"),
  urlBlock(`${SITE_URL}/listings/`, "0.9", "daily"),
  urlBlock(`${SITE_URL}/contact/`, "0.6", "monthly"),
  urlBlock(`${SITE_URL}/posting-guidelines/`, "0.4", "yearly"),
  urlBlock(`${SITE_URL}/privacy-policy/`, "0.3", "yearly"),
  urlBlock(`${SITE_URL}/terms/`, "0.3", "yearly")
);

/* ==============================
   AUTO-DETECT COUNTRY FOLDERS
   (any 2-letter folder: sg, my, bd, us, etc.)
================================ */
fs.readdirSync(ROOT_DIR, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => dir.name)
  .filter(name => /^[a-z]{2}$/.test(name))
  .forEach(country => {

    // country homepage
    urls.push(
      urlBlock(`${SITE_URL}/${country}/`, "0.9", "weekly")
    );

    // country blog index
    const blogDir = path.join(ROOT_DIR, country, "blog");
    if (fs.existsSync(blogDir)) {
      urls.push(
        urlBlock(`${SITE_URL}/${country}/blog/`, "0.7", "weekly")
      );

      // blog posts
      fs.readdirSync(blogDir).forEach(file => {
        if (file.endsWith(".html") && file !== "index.html") {
          const slug = file.replace(".html", "");
          urls.push(
            urlBlock(`${SITE_URL}/${country}/blog/${slug}`, "0.6", "monthly")
          );
        }
      });
    }
  });

// ===============================
// OUTPUT
// ===============================
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>
`;

fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), sitemap);

console.log("✅ Sitemap generated correctly (global + auto-detected countries)");
