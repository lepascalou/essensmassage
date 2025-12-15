import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// Load language files
const frContent = JSON.parse(
  fs.readFileSync(path.join(rootDir, "src/templates/content/fr.json"), "utf8")
);
const enContent = JSON.parse(
  fs.readFileSync(path.join(rootDir, "src/templates/content/en.json"), "utf8")
);

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

console.log("🔨 Rendering HTML templates...");

// Generate French version
const frHtml = renderTemplate("fr", frContent);
fs.writeFileSync(path.join(rootDir, "index.html"), frHtml);
console.log("✓ index.html (French)");

// Generate English version
const enHtml = renderTemplate("en", enContent);
fs.mkdirSync(path.join(rootDir, "en"), { recursive: true });
fs.writeFileSync(path.join(rootDir, "en/index.html"), enHtml);
console.log("✓ en/index.html (English)");

console.log("\n✅ HTML files generated successfully!");
