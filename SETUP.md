# Development Setup

## Installation

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org (LTS version recommended)

2. **Install dependencies**
   ```bash
   npm install
   ```

## Your Site Structure

Your site uses:
- **Bootstrap** (CSS) - `bootstrap.purged.last.min.css`
- **Custom JS** - `custom.min.js`
- **TarteAuCitron** - Cookie consent manager (in `tarteaucitron/` folder)
- **HTML** - `index.html` and `en/index.html`

## npm Commands

### Initialize a Git repository (optional but recommended)
```bash
git init
git add .
git commit -m "Initial commit"
```

This tracks your changes and lets you see what changed over time.

## Workflow

1. **Edit your HTML/CSS/JS** normally
2. **Before deploying**, run minification:
   ```bash
   npm run build:css
   ```
3. **Commit changes** if using git:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Deploy** as usual

## What's installed

- **clean-css-cli** - Minifies CSS files automatically
- **npm** - Node Package Manager (comes with Node.js)

That's it! Simple and lightweight for your one-page site.
