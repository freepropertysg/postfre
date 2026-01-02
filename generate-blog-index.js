const fs = require("fs");
const path = require("path");

// ===============================
// CONFIG
// ===============================
const BLOG_DIR = path.join(__dirname, "sg", "blog");
const INDEX_FILE = path.join(BLOG_DIR, "index.html");

// ===============================
// SAFETY CHECKS
// ===============================
if (!fs.existsSync(BLOG_DIR)) {
  throw new Error("sg/blog folder not found");
}

if (!fs.existsSync(INDEX_FILE)) {
  throw new Error("sg/blog/index.html not found");
}

// ===============================
// READ INDEX FILE
// ===============================
const html = fs.readFileSync(INDEX_FILE, "utf8");

// ===============================
// READ BLOG POSTS
// ===============================
const posts = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith(".html") && f !== "index.html")
  .sort();

// ===============================
// BUILD LIST
// ===============================
const list = posts.map(file => {
  const slug = file.replace(".html", "");
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  return `  <li><a href="/sg/blog/${slug}">${title}</a></li>`;
}).join("\n");

// ===============================
// REPLACE LIST BLOCK
// ===============================
const updated = html.replace(
  /<!-- BLOG-LIST-START -->[\s\S]*?<!-- BLOG-LIST-END -->/,
  `<!-- BLOG-LIST-START -->\n<ul class="blog-list">\n${list}\n</ul>\n<!-- BLOG-LIST-END -->`
);

// ===============================
// WRITE BACK
// ===============================
fs.writeFileSync(INDEX_FILE, updated);

console.log("✅ Blog index updated: /sg/blog/index.html");