# Aya Al-Herbawy: landing page

A bilingual (English / Arabic) one-page site for Aya Al-Herbawy, built with [Astro](https://astro.build) as plain static HTML. It's designed for phones first, has light and dark themes, and uses WhatsApp as its main call to action. Visitors don't download any JavaScript framework. The only scripts are a few small inline and bundled ones: the theme toggle, the menu, the sticky button and analytics consent.

## Requirements

| Tool | Version | Notes |
| --- | --- | --- |
| Node.js | **22.12 or newer** | Astro 7 won't start on older versions. `.node-version` pins `24` for the hosting build. |
| npm | the one that ships with Node | |

Check the version with `node -v`. If it prints something older, install and switch to Node 24 with nvm:

```bash
nvm install 24
```

```bash
nvm use 24
```

To make it the default for new terminals:

```bash
nvm alias default 24
```

Homebrew's Node (`brew install node`) also works.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. The root page redirects to `/en/` or `/ar/` (see [Routing](#routing)). Changes reload in the browser as you save.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on port 4321 |
| `npm run check` | `astro check`: TypeScript and `.astro` template diagnostics |
| `npm run build` | Runs `check` first, then writes the static site to `dist/`. Fails on any type error. |
| `npm run preview` | Serves the built `dist/` locally (run `build` first) |

There's no test suite or linter. `npm run build` is the gate: it type-checks every component and every translation file.

Astro sends anonymous telemetry by default. To turn it off for this machine:

```bash
npx astro telemetry disable
```

## Project structure

```
src/
  config/site.ts        Variables: phone, WhatsApp number, Instagram, CV path, GA ID, paper colours
  i18n/
    types.ts            Locales, the Copy interface every language implements, Localized<T>
    en.ts, ar.ts        All page text, one file per language
    index.ts            getCopy(), localeMeta (direction, date locale), formatDate()
  data/learning.ts      Conferences and education (newest first), localised per field
  styles/global.css     Colour and type tokens (light, dark, Arabic overrides) and shared classes
  layouts/Base.astro    <html lang/dir>, SEO and hreflang, fonts, the no-flash theme script
  components/           One component per section, plus WhatsAppButton, SectionHead, StickyCta, ConsentBanner
  pages/
    index.astro         Root: picks a language and redirects
    [locale]/index.astro  Builds /en/ and /ar/ from the same components
    404.astro           Bilingual not-found page
public/
  cv/Aya_Al_Herbawy_CV.pdf
  favicon-32.png, apple-touch-icon.png   Generated from src/assets/logo.jpg
  robots.txt
dev_docs/               Requirements, research, design source, CV sources (gitignored)
```

## How it works

### Routing

- `src/pages/[locale]/index.astro` builds one page per entry in `locales`, so you get `/en/` and `/ar/`. Each page sets `lang` and `dir` on `<html>` at build time and links the language versions with `hreflang` tags.
- `src/pages/index.astro` is a tiny redirect page. It sends the visitor to the language they last chose (`localStorage.lang`, set by the language switch), otherwise to Arabic if the browser prefers Arabic, otherwise to English. Without JavaScript it falls back to `/en/`.
- `astro.config.mjs` uses `trailingSlash: 'always'`, so links are written `/en/`, not `/en`.

### Content

- Every visible string lives in `src/i18n/en.ts` / `ar.ts`, and both must satisfy the `Copy` interface in `types.ts`. A missing or extra key is a build error.
- Section components receive the whole copy object as a `c` prop.
- Dated, structured entries (conferences, education) live in `src/data/learning.ts`. Their text fields are `Localized` (`{ en, ar }`).
- Dates are formatted with `Intl`. Arabic uses `ar-LB-u-nu-latn`: Western digits with Levantine month names (e.g. "3 تشرين الأول 2026").

### Theming

- **Tokens:** colours are CSS custom properties in `global.css`. Light ("warm paper") is the default. Dark ("olive night") applies when the OS prefers dark (unless the visitor picked light) or when `<html data-theme="dark">` is set. The dark token set appears twice, once for each case.
- **No flash:** an inline script in `Base.astro` reads `localStorage.theme` before first paint and sets `data-theme`.
- **Toggle:** the script in `Header.astro` switches the theme. It also keeps `aria-pressed` and the `theme-color` meta tags in sync, so the phone's browser bar matches the page.
- **Keep in sync:** `site.colors.lightPaper` / `darkPaper` in `site.ts` must match `--paper` in `global.css`.

### Arabic

`:root:lang(ar)` in `global.css` swaps the type tokens:

- **Font:** Markazi Text.
- **Emphasis:** no italics, small caps or letter-spacing.
- **Size:** larger sizes and looser line-height.

Layout uses logical CSS properties (`padding-inline`, `border-block-start`, `inset-inline`), so the same stylesheet mirrors itself under `dir="rtl"`.

### Fonts

Fonts are self-hosted with Fontsource variable packages: Literata (with optical sizes and italics), Hanken Grotesk and Markazi Text. Browsers only download the subsets a page uses. `Base.astro` preloads just the current language's headline face.

### WhatsApp button

- `whatsappHref()` in `site.ts` builds `https://wa.me/<number>?text=<prefilled message>` from each language's `whatsappMessage`.
- `StickyCta` keeps a bar at the bottom of the screen. An `IntersectionObserver` hides it while any element marked `data-cta-anchor` (the hero, "How it works" and contact buttons) is on screen.

### Analytics

Google Analytics 4 is off until `gaMeasurementId` is set in `src/config/site.ts`. Once it's set:

- `ConsentBanner` asks for consent. The answer is stored in `localStorage['analytics-consent']`, and `gtag.js` loads only after the visitor accepts.
- Clicks on elements with `data-wa="<placement>"` send a `whatsapp_click` event, and `data-track="<name>"` sends a custom event (the CV link uses `cv_download`, email links `email_click`).
- A "Cookie settings" link appears in the footer so visitors can change their answer.

### localStorage keys

| Key | Values | Set by |
| --- | --- | --- |
| `theme` | `light` / `dark` | Theme toggle |
| `lang` | `en` / `ar` | Language switch |
| `analytics-consent` | `granted` / `denied` | Consent banner |

## Common edits

| Task | Where |
| --- | --- |
| Change any text | `src/i18n/en.ts` and `src/i18n/ar.ts` (keep both in step) |
| Add a conference | Add an entry at the top of `conferences` in `src/data/learning.ts` |
| Change phone, email, Instagram or GA ID | `src/config/site.ts` |
| Replace the portrait | Overwrite `src/assets/portrait.jpg` (`.png`/`.webp` also work). It's shown cropped to 4:5 and kept toward the top (`object-position` in `Portrait.astro`). Without a file, a placeholder is shown. |
| Replace the CV | Overwrite `public/cv/Aya_Al_Herbawy_CV.pdf` (or change `cvPath`) |
| Replace the logo | Overwrite `src/assets/logo.jpg` (the avatar next to the Instagram link), then regenerate the icons: `sips -s format png -z 32 32 src/assets/logo.jpg --out public/favicon-32.png` and the same with `180 180` for `public/apple-touch-icon.png` |
| Change colours | `src/styles/global.css` (dark tokens appear twice) and `site.colors` |

### Adding a language (e.g. French)

1. Add `'fr'` to `locales` in `src/i18n/types.ts` and to `i18n.locales` in `astro.config.mjs`.
2. Create `src/i18n/fr.ts` implementing `Copy`. Register it in `copies` and `localeMeta` in `src/i18n/index.ts`.
3. Run `npm run check`. TypeScript flags every `Localized` field in `src/data/learning.ts` that's missing a French value.
4. Update the parts that currently assume two languages:
   - The redirect logic in `src/pages/index.astro`.
   - The single-link language switch in `Header.astro`, which uses `otherLocale()`. It needs to become a small list.

## Deployment (Cloudflare Pages)

1. Push the repo to GitHub and create a Pages project from it.
2. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output directory: `dist`
3. Environment variables:
   - `SITE_URL`: the live origin, e.g. `https://ayaalherbawy.com`. It's used for canonical and `hreflang` URLs. Without it they point at `http://localhost:4321`.
   - `NODE_VERSION`: `24` (it's also read from `.node-version`).
4. Add the custom domain in the Pages project.

The output is plain static files, so any static host (Netlify, Vercel, GitHub Pages) works with the same build command and folder.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `astro` crashes or npm complains about the engine | Node is older than 22.12. See [Requirements](#requirements). |
| `npm warn Unknown user config "always-auth"` | Comes from your global `~/.npmrc`. Harmless. |
| Canonical / `hreflang` URLs show `localhost` in `dist/` | `SITE_URL` wasn't set at build time. |
| The sticky WhatsApp bar never hides in an embedded preview | Some preview panes don't run `IntersectionObserver` until they render. Check in a normal browser tab. |
