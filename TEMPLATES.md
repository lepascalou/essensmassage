# EJS Template System - Usage Guide

## What Changed

Your site now uses **EJS templating** to manage the English and French versions. Instead of maintaining two identical 1000+ line HTML files, you now have:

- **One main template** (`src/templates/layout.ejs`) - shared structure
- **Reusable section components** (`src/templates/sections/`) - navbar, hero, services, etc.
- **Language-specific content files** (`src/templates/content/fr.json` and `en.json`)

## File Structure

```
src/templates/
├── layout.ejs              # Main template (includes all sections)
├── sections/               # Reusable section components
│   ├── navbar.ejs
│   ├── hero.ejs
│   ├── services.ejs
│   ├── about.ejs
│   ├── infos.ejs
│   ├── contact.ejs
│   ├── faq.ejs
│   └── footer.ejs
└── content/
    ├── fr.json            # All French text content
    └── en.json            # All English text content
```

## How to Edit Content

### Edit French Content
Edit **`src/templates/content/fr.json`**:
- All navigation text
- Section headings
- Button labels
- FAQ questions and answers
- Footer content
- All user-facing text

### Edit French Layout/Structure
Edit **`src/templates/sections/*.ejs`** files
- Navbar links
- Bootstrap classes
- HTML structure (will apply to both languages)

### Same for English
Edit **`src/templates/content/en.json`** for English text
Section templates are shared (same HTML, different content inserted)

## Building

### Development Mode
```bash
npm run build:html    # Generate HTML from templates once
npm run dev           # Watch for changes in templates and rebuild
```

During dev mode, templates automatically regenerate when you edit:
- Any `.ejs` template file
- Any `.json` content file

### Production Build
```bash
npm run prod          # Build everything and generate prod/ folder
```

This will:
1. Compile templates to HTML
2. Minify CSS and JS
3. Copy everything to `prod/` folder ready to deploy

## Examples

### To Update Navigation (French)
Edit `src/templates/content/fr.json`:
```json
{
  "nav": {
    "home": "Accueil",
    "services": "Soins",      // Change this
    "about": "A propos",
    ...
  }
}
```

Then run: `npm run build:html` (or `npm run dev` watches automatically)

### To Add a New FAQ Question
Edit `src/templates/content/fr.json`:
```json
{
  "faq": {
    "questions": [
      { "id": "One", "question": "...", "answer": "..." },
      { "id": "New", "question": "New question?", "answer": "Answer here" }
    ]
  }
}
```

The template will automatically render the new accordion item in both languages.

### To Change the Logo/Navigation Design
Edit `src/templates/sections/navbar.ejs` - changes apply to both languages automatically.

## Benefits

✅ **DRY (Don't Repeat Yourself)** - Edit navbar once, applies to both versions
✅ **Consistency** - Same CSS classes, same structure for both languages  
✅ **Easy Maintenance** - One source of truth for each language
✅ **Quick Scaling** - Adding a new language? Just add a new JSON file
✅ **Version Control** - Git now shows meaningful diffs in content, not 1000 lines of HTML

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/templates/layout.ejs` | Main HTML shell, imports all sections |
| `src/templates/content/fr.json` | All French content |
| `src/templates/content/en.json` | All English content |
| `scripts/build-html.js` | Generates index.html and en/index.html from templates |
| `scripts/build-prod.js` | Generates production-ready files |

## Troubleshooting

**HTML files not updating?**
- Make sure you ran `npm run build:html` after editing templates
- Or use `npm run dev` to auto-rebuild on changes

**Want to revert?**
- The old `index.html` and `en/index.html` are still in git history
- But you won't need to - this system is much cleaner!
