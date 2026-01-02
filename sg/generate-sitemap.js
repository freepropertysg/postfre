const fs = require("fs");
const path = require("path");

// ===============================
// CONFIG
// ===============================
const SITE_URL = "https://postfre.com";
const BASE_PATH = "/sg";
const BLOG_DIR = path.join(__dirname, "sg", "blog");

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

// === STATIC PAGES (SG) ===
urls.push(
  urlBlock(`${SITE_URL}${BASE_PATH}/`, "1.0", "weekly"),
  urlBlock(`${SITE_URL}${BASE_PATH}/about/`, "0.8", "monthly"),
  urlBlock(`${SITE_URL}${BASE_PATH}/listings/`, "0.9", "daily"),
  urlBlock(`${SITE_URL}${BASE_PATH}/blog/`, "0.7", "weekly"),
  urlBlock(`${SITE_URL}${BASE_PATH}/contact/`, "0.6", "monthly"),
  urlBlock(`${SITE_URL}${BASE_PATH}/privacy-policy/`, "0.3", "yearly"),
  urlBlock(`${SITE_URL}${BASE_PATH}/terms/`, "0.3", "yearly")
);

// === BLOG POSTS (SG) ===
if (fs.existsSync(BLOG_DIR)) {
  fs.readdirSync(BLOG_DIR).forEach(file => {
    if (file.endsWith(".html") && file !== "index.html") {
      const slug = file.replace(".html", "");
      urls.push(
        urlBlock(`${SITE_URL}${BASE_PATH}/blog/${slug}`, "0.6", "monthly")
      );
    }
  });
}

// ===============================
// SITEMAP OUTPUT
// ===============================
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap);

console.log("✅ Sitemap generated: /sitemap.xml");