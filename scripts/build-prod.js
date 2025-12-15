import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prodDir = path.join(__dirname, "..", "prod");

// Files and folders to copy
const filesToCopy = [
  "index.html",
  "en/index.html",
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

// Clean prod directory
if (fs.existsSync(prodDir)) {
  fs.rmSync(prodDir, { recursive: true });
}
fs.mkdirSync(prodDir);

console.log("📦 Building production folder...");

// Copy individual files
filesToCopy.forEach((file) => {
  const src = path.join(__dirname, "..", file);
  if (fs.existsSync(src)) {
    const dest = path.join(prodDir, file);
    copyFile(src, dest);
    console.log(`✓ ${file}`);
  }
});

// Copy folders
foldersToCopy.forEach((folder) => {
  const src = path.join(__dirname, "..", folder);
  const dest = path.join(prodDir, folder);
  if (fs.existsSync(src)) {
    copyFolder(src, dest);
    console.log(`✓ ${folder}/`);
  }
});

console.log("\n✅ Production build ready in ./prod/");
console.log("📤 You can now upload the contents of ./prod/ to your web hosting");
