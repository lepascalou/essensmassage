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
├── src/                      # Source files (edit these)
│   ├── assets/
│   │   ├── images/          # Website images (banner, photos)
│   │   └── icons/           # Logos, favicons
│   ├── css/
│   │   └── bootstrap.purged.last.css     # Main CSS (source)
│   ├── js/
│   │   └── custom.js                     # Custom JS (source)
│   └── tarteaucitron/       # Cookie consent manager
├── index.html               # French homepage
├── en/index.html           # English homepage
├── prod/                    # Production build folder (generated)
├── scripts/
│   └── build-prod.js       # Production build script
├── package.json            # npm configuration
├── SETUP.md               # This file
└── sitemap.xml            # SEO sitemap
```

## File Management

**Source vs. Generated Files:**
- Edit unminified source files in `src/` (e.g., `custom.js`, `bootstrap.purged.last.css`)
- `.min.css` and `.min.js` files are **automatically generated** by the build process
- `.gitignore` prevents generated files from being committed (keeps repo clean)

**Removed/Not Needed:**
- Google verification files (`google*.html`)
- Default hosting placeholder pages
- Old Bootstrap CSS files (`bootstrap.purged.css` - kept only the actively used `bootstrap.purged.last.css`)

## npm Commands

### Development Workflow
```bash
# Format code (makes it readable)
npm run format

# Build minified files
npm run build

# Watch files and auto-rebuild on changes
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

1. **Edit source files** in `src/` folder
   - `custom.js` - Your JavaScript
   - `bootstrap.purged.last.css` - Your CSS
   - HTML files - Your page content

2. **Format and build**
   ```bash
   npm run format && npm run build
   ```

3. **Test locally** (optional)
   ```bash
   npx http-server -p 8000
   ```
   Then open http://localhost:8000

4. **Commit to Git**
   ```bash
   git add . && git commit -m "Description"
   git push
   ```

5. **Deploy to production**
   ```bash
   npm run prod
   ```
   - Zip the `prod/` folder
   - Upload to your web host via FTP/SFTP

## Tools Installed

- **esbuild** (^0.21.0) - JavaScript minification
- **clean-css-cli** (^5.6.3) - CSS minification
- **chokidar-cli** (^3.0.0) - File watching for auto-rebuild
- **prettier** (^3.0.0) - Code formatting (HTML/CSS/JS)

## Version Control (.gitignore)

Files automatically excluded from Git commits:
- `node_modules/` - Dependencies
- `**/*.min.css` and `**/*.min.js` - Generated minified files
- `*.log` - Log files
- `google*.html` - Google verification files
- Hosting/verification files - Not needed in version control

This keeps your repository clean and focused on source files only.

## For Questions

See the deployment options in your hosting provider's documentation. Typically:
1. Run `npm run prod`
2. Zip the `prod/` folder
3. Upload via FTP/SFTP to your web host
4. Verify at https://essensmassage.fr

Your site is now ready for development and production deployment!
