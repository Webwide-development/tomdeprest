# Master

## Starter template voor alle Webwide projecten

### Terminal

---

<b>Theme binnenhalen met master theme template via GitHub + verwijderen oude commit-files</b>

```bash
cd programmatie
mkdir `[nieuwe map`]
cd `[nieuwe map`]
code .
git clone https://github.com/Webwide-development/master.git .
git remote -v
git remote remove origin
git remote add origin https://github.com/Webwide-development/`[nieuwe naam`].git
git branch

rm -rf .git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jouw-gebruiker/nieuwe-shopify-theme.git
git push -u origin main
```

<b>Nieuw theme binnenhalen via nieuwe store</b>

```bash
shopify theme pull --store [storename].myshopify.com

touch .shopifyignore
touch .gitignore
touch shopify.theme.toml

npm init -y
npm install -D vite tailwindcss postcss autoprefixer @tailwindcss/vite @tailwindcss/postcss @shopify/cli @shopify/prettier-plugin-liquid @shopify/theme npm-run-all

touch postcss.config.js
touch vite.config.js
```

### Invullen config files

---

<b>vite.config.js</b>

```javascript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    outDir: "assets",
    emptyOutDir: false,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        styles: "src/styles.css", // Alleen CSS wordt via Vite verwerkt
      },
      output: {
        assetFileNames: "[name].[ext]",
        dir: "assets",
      },
    },
  },
  css: {
    devSourcemap: true,
    postcss: "./postcss.config.js",
    preprocessorOptions: {
      css: {
        extract: true,
      },
    },
  },
  plugins: [tailwindcss()],
});
```

<b>postcss.config.js</b>

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

<b>shopify.theme.toml</b>

```bash
[environments.dev]
store = "webwide-teststore.myshopify.com"
```

### Invullen .shopifyignore & .gitignore

---

<b>.shopifyignore</b>

```bash
node_modules
package.json
package-lock.json
src/*.<file_extension>
vite.config.json
tailwind.config.js
postcss.config.js
.gitignore
vscode/*.<file_extension>
*.md
.git/*.<file_extension>
.github/*.<file_extension>
```

<b>.gitignore</b>

```bash
# Dependencies
node_modules

# Editor directories & files
.idea
.vscode
# /assets/styles.css

# Varia
logs
```

### Invullen package.json

---

```json
{
  "name": "Master",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "run-p -sr shopify:dev watch",
    "shopify:dev": "shopify theme dev -e dev",
    "watch": "vite build -w",
    "build": "vite build --minify"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Webwide-development/master.git"
  },
  "keywords": ["project", "packages"],
  "author": {
    "name": "Webwide | Kevin Bequoye",
    "email": "kevin@web-wide.be",
    "url": "https://web-wide.be",
    "homepage": "https://web-wide.be"
  },
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/Webwide-development/master.git/issues"
  },
  "homepage": "https://github.com/Webwide-development/master.git",
  "type": "module",
  "devDependencies": {
    "@shopify/cli": "^3.86.0",
    "@shopify/prettier-plugin-liquid": "^1.10.0",
    "@shopify/theme": "^3.58.2",
    "@tailwindcss/postcss": "^4.1.14",
    "@tailwindcss/vite": "^4.1.14",
    "autoprefixer": "^10.4.21",
    "npm-run-all": "^4.1.5",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.14",
    "vite": "^7.1.10"
  }
}
```

### Folder structuur

---

- src
  - base
    - \_index.css
    - colors.css
    - typography.css
    - variables.css
  - components
    - \_index.css
  - utilities
    - \_index.css
  - styles.css

### CSS Structuur per file

---

<b>styles.css</b>

```css
/* Import alle files uit de src folder, alle folder hebben een _index.css file die wordt gebruikt om alle files uit die folder te importeren */
@import "tailwindcss";

/* Custom styling */
@import "./base/_index"; /* Custom base styling */

@import "./components/_index.css"; /* Custom components */

@import "./utilities/_index.css"; /* Custom utilities */

/* Exclude assets folder */
@source not "../../assets";
```

<b>base/\_index.css</b>

```css
/* import all files from the base folder */
@import "./variables.css";
@import "./typography.css";
@import "./colors.css";
```

<b>components/\_index.css</b>

```css
/* import all files from the components folder */
@import "./{...}.css";
```

<b>utilities/\_index.css</b>

```css
/* import all files from the utilities folder */
@import "./{...}.css";
```

### CSS koppelen in project

---

- stylesheets.liquid

```liquid
{{ 'styles.css' |  asset_url | stylesheet_tag }}
{{ 'overflow-list.css' | asset_url | preload_tag: as: 'style' }}
{{ 'base.css' | asset_url | stylesheet_tag: preload: true }}
```
