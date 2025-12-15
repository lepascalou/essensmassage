# Development Setup

## Installation

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org (LTS version recommended)

2. **Install dependencies**
   ```bash
   npm install
   ```

## Project Structure

```
root/
├── src/                           # Source files (edit these)
│   ├── assets/
│   │   ├── images/               # Website images (banner, photos)
│   │   └── icons/                # Logos, favicons
│   ├── css/
│   │   └── bootstrap.purged.last.css     # Main CSS (source)
│   ├── js/
│   │   └── custom.js             # Custom JS (source)
│   ├── tarteaucitron/            # Cookie consent manager
│   └── templates/                # HTML templates (NEW)
│       ├── layout.ejs            # Main template shell
│       ├── sections/             # Reusable page sections
│       │   ├── navbar.ejs
│       │   ├── hero.ejs
│       │   ├── services.ejs
│       │   ├── about.ejs
│       │   ├── infos.ejs
│       │   ├── contact.ejs
│       │   ├── faq.ejs
│       │   └── footer.ejs
│       └── content/              # Language-specific content
│           ├── fr.json           # French text & content
│           └── en.json           # English text & content
├── index.html                    # French homepage (generated from templates)
├── en/index.html                 # English homepage (generated from templates)
├── prod/                         # Production build folder (generated)
├── scripts/
│   ├── build-html.js             # Template compiler (NEW)
│   └── build-prod.js             # Production build script
├── package.json                  # npm configuration
├── SETUP.md                      # This file
├── TEMPLATES.md                  # Template system guide (NEW)
└── sitemap.xml                   # SEO sitemap
```

## File Management

**Source vs. Generated Files:**
- Edit unminified source files in `src/` (e.g., `custom.js`, `bootstrap.purged.last.css`)
- `.min.css` and `.min.js` files are **automatically generated** by the build process
- `.gitignore` prevents generated files from being committed (keeps repo clean)
- **HTML files (`index.html` and `en/index.html`) are now generated from templates** - do not edit them directly!

**Template Files (NEW):**
- Edit content in `src/templates/content/fr.json` (French) and `en.json` (English)
- Edit structure in `src/templates/sections/*.ejs` files
- `src/templates/layout.ejs` is the main template that combines all sections
- Run `npm run build:html` to generate HTML files from templates

**Removed/Not Needed:**
- Google verification files (`google*.html`)
- Default hosting placeholder pages
- Old Bootstrap CSS files (`bootstrap.purged.css` - kept only the actively used `bootstrap.purged.last.css`)

## npm Commands

### Development Workflow
```bash
# Generate HTML files from templates (run once)
npm run build:html

# Format code (makes it readable)
npm run format

# Build minified files
npm run build

# Watch files and auto-rebuild on changes (includes templates!)
npm run dev

# Local testing
npx http-server -p 8000
```

### Production Deployment
```bash
# Create clean production folder with minified assets
npm run prod

# Then zip the 'prod/' folder and upload via FTP/SFTP
```

### Git Version Control
```bash
# Check what changed
git status

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Workflow: Edit → Build → Deploy

1. **Edit source files**
   - **Content (NEW):** Edit `src/templates/content/fr.json` (French) or `en.json` (English)
   - **Structure (NEW):** Edit `src/templates/sections/*.ejs` files
   - **Styling:** Edit `src/css/custom.js` or `bootstrap.purged.last.css`
   - **JavaScript:** Edit `src/js/custom.js`

2. **Build HTML from templates**
   ```bash
   npm run build:html
   ```
   This generates `index.html` and `en/index.html` from your templates.

3. **Format and build all assets**
   ```bash
   npm run format && npm run build
   ```

4. **Test locally** (optional)
   ```bash
   npx http-server -p 8000
   ```
   Then open http://localhost:8000

5. **Commit to Git**
   ```bash
   git add . && git commit -m "Description of changes"
   git push
   ```

6. **Deploy to production**
   ```bash
   npm run prod
   ```
   - Zip the `prod/` folder
   - Upload to your web host via FTP/SFTP

## Tools Installed

- **ejs** (^3.1.10) - Template engine for HTML generation (NEW)
- **esbuild** (^0.21.0) - JavaScript minification
- **clean-css-cli** (^5.6.3) - CSS minification
- **chokidar-cli** (^3.0.0) - File watching for auto-rebuild (now watches templates!)
- **prettier** (^3.0.0) - Code formatting (HTML/CSS/JS)

## Version Control (.gitignore)

Files automatically excluded from Git commits:
- `node_modules/` - Dependencies
- `**/*.min.css` and `**/*.min.js` - Generated minified files
- `index.html` and `en/index.html` - Generated from templates
- `prod/` - Production build folder
- `*.log` - Log files
- `google*.html` - Google verification files
- Hosting/verification files - Not needed in version control

This keeps your repository clean and focused on source files only. The HTML files are regenerated during build.

## Template System Guide

For detailed information on using the EJS template system, see **[TEMPLATES.md](TEMPLATES.md)**

Key points:
- ✅ Edit content in JSON files, not HTML
- ✅ Share structure between French/English versions
- ✅ Add new language by creating new JSON file
- ✅ All templates are watched during `npm run dev`

## For Questions

See the deployment options in your hosting provider's documentation. Typically:
1. Run `npm run prod`
2. Zip the `prod/` folder
3. Upload via FTP/SFTP to your web host
4. Verify at https://essensmassage.fr

Your site is now ready for development and production deployment!
