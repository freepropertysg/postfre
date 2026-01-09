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
   ROOT PAGES
================================ */
urls.push(
  urlBlock(`${SITE_URL}/`, "1.0", "daily"),
  urlBlock(`${SITE_URL}/about/`, "0.8", "monthly"),
  urlBlock(`${SITE_URL}/listings/`, "0.9", "daily"),
  urlBlock(`${SITE_URL}/contact/`, "0.6", "monthly"),
  urlBlock(`${SITE_URL}/posting-guidelines/`, "0.4", "yearly"),
  urlBlock(`${SITE_URL}/privacy-policy/`, "0.3", "yearly"),
  urlBlock(`${SITE_URL}/terms/`, "0.3", "yearly")
);

/* ==============================
   ROOT BLOG ( /blog )
================================ */
const rootBlogDir = path.join(ROOT_DIR, "blog");

if (fs.existsSync(rootBlogDir)) {
  urls.push(
    urlBlock(`${SITE_URL}/blog/`, "0.8", "weekly")
  );

  fs.readdirSync(rootBlogDir).forEach(file => {
    if (file.endsWith(".html") && file !== "index.html") {
      const slug = file.replace(".html", "");
      urls.push(
        urlBlock(`${SITE_URL}/blog/${slug}`, "0.6", "monthly")
      );
    }
  });
}

/* ==============================
   AUTO-DETECT COUNTRY FOLDERS
   (sg, my, bd, us, etc.)
================================ */
fs.readdirSync(ROOT_DIR, { withFileTypes: true })
  .filter(
    d =>
      d.isDirectory() &&
      /^[a-z]{2}$/.test(d.name) &&
      d.name !== "node_modules"
  )
  .forEach(country => {
    const code = country.name;
    const countryPath = path.join(ROOT_DIR, code);
    const blogDir = path.join(countryPath, "blog");

    // Country homepage
    urls.push(
      urlBlock(`${SITE_URL}/${code}/`, "0.9", "weekly")
    );

    // Country blog
    if (fs.existsSync(blogDir)) {
      urls.push(
        urlBlock(`${SITE_URL}/${code}/blog/`, "0.7", "weekly")
      );

      fs.readdirSync(blogDir).forEach(file => {
        if (file.endsWith(".html") && file !== "index.html") {
          const slug = file.replace(".html", "");
          urls.push(
            urlBlock(`${SITE_URL}/${code}/blog/${slug}`, "0.6", "monthly")
          );
        }
      });
    }
  });

/* ==============================
   OUTPUT
================================ */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>
`;

fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), sitemap);

console.log("✅ Sitemap generated successfully (root + blog + countries)");
