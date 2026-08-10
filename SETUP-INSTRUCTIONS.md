# Tailwind CSS setup

You're on Create React App (`process.env.REACT_APP_...`), so this is the standard CRA + Tailwind setup.

## 1. Install

Run in your project root:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

> Use Tailwind v3 with CRA — v4's new CSS-first setup needs a Vite/PostCSS pipeline CRA doesn't ship with, and this project's `postcss.config.js` here matches v3.

## 2. Add config files

Drop `tailwind.config.js` and `postcss.config.js` (included in this delivery) into your project root, next to `package.json`.

## 3. Replace your global stylesheet

Replace the contents of `src/index.css` with the `index.css` included here. It imports the three fonts (Fraunces, Work Sans, IBM Plex Mono) from Google Fonts and adds the `@tailwind` directives plus two small reusable utility classes (`.eyebrow`, `.link-underline`) used across the redesigned components.

Make sure `src/index.js` still has `import './index.css';` at the top (CRA adds this by default).

## 4. Drop in the redesigned components

Copy the files from `src/components/` and `src/pages/` here into the matching folders in your project, overwriting the old ones. All the old per-component `.css` imports (`../styles/Nav.css`, `../styles/Footer.css`, etc.) have been removed — styling is now done entirely with Tailwind utility classes, so those old CSS files are no longer needed (you can delete them, or leave them unused).

All logic — the axios calls, form handlers, state, and routes — is untouched. Only `className` markup and styling changed.

## 5. Restart the dev server

```bash
npm start
```

## Design tokens used

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1E2A32` | primary text |
| `paper` | `#FAF6EF` | page background |
| `brass` | `#A67C52` | accent — links, highlights |
| `sage` | `#5B6F5B` | secondary accent — tags |
| `stone` | `#DCD3C4` | hairline borders/dividers |
| `charcoal` | `#2A2620` | dark section backgrounds |

Fonts: **Fraunces** (display/headings), **Work Sans** (body), **IBM Plex Mono** (labels, eyebrows, dates, tech tags).
