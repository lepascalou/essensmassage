import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const prodDir = path.join(rootDir, "prod");

// Load language files
const frContent = JSON.parse(
  fs.readFileSync(path.join(rootDir, "src/templates/content/fr.json"), "utf8")
);
const enContent = JSON.parse(
  fs.readFileSync(path.join(rootDir, "src/templates/content/en.json"), "utf8")
);

// Files and folders to copy
const filesToCopy = [
  "favicon-light.ico",
  "favicon-dark.ico",
  "sitemap.xml",
];

const foldersToCopy = ["src"];

function copyFile(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

// Render HTML from template
function renderTemplate(lang, content) {
  const templatePath = path.join(rootDir, "src/templates/layout.ejs");
  const assetPath = lang === "fr" ? "" : "..";
  const templateContent = fs.readFileSync(templatePath, "utf8");
  
  return ejs.render(templateContent, {
    lang,
    t: content,
    assetPath,
    filename: templatePath,
  });
}

// Clean prod directory
if (fs.existsSync(prodDir)) {
  fs.rmSync(prodDir, { recursive: true });
}
fs.mkdirSync(prodDir);

console.log("📦 Building production folder...");

// Generate HTML files from templates
console.log("🔨 Rendering templates...");
const frHtml = renderTemplate("fr", frContent);
fs.writeFileSync(path.join(prodDir, "index.html"), frHtml);
console.log("✓ French version (index.html)");

const enHtml = renderTemplate("en", enContent);
fs.mkdirSync(path.join(prodDir, "en"), { recursive: true });
fs.writeFileSync(path.join(prodDir, "en/index.html"), enHtml);
console.log("✓ English version (en/index.html)");

// Copy individual files
filesToCopy.forEach((file) => {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    const dest = path.join(prodDir, file);
    copyFile(src, dest);
    console.log(`✓ ${file}`);
  }
});

// Copy folders
foldersToCopy.forEach((folder) => {
  const src = path.join(rootDir, folder);
  const dest = path.join(prodDir, folder);
  if (fs.existsSync(src)) {
    copyFolder(src, dest);
    console.log(`✓ ${folder}/`);
  }
});

console.log("\n✅ Production build ready in ./prod/");
console.log("📤 You can now upload the contents of ./prod/ to your web hosting");

