# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, bilingual (English / Arabic RTL) one-page landing site for Aya Al-Herbawy, a Beirut-based biochemist and nutrition coach. It's built with Astro 7, TypeScript and plain CSS.

- **Primary goal:** get prospective clients to message her on WhatsApp.
- **Secondary:** recruiters, via a CV download. The site must not read like a CV.
- **Product decisions:** in `dev_docs/requirements.md` (gitignored, local only). Read it before changing scope, copy or design.

## Commands

The shell's default `node` here is v16 (nvm), but Astro 7 needs **Node ≥ 22.12**. Prefix commands with Homebrew's Node, or `nvm use 24` first:

```bash
PATH=/opt/homebrew/bin:$PATH npm run build   # astro check (types + .astro) then static build to dist/
PATH=/opt/homebrew/bin:$PATH npm run check   # type-check only
PATH=/opt/homebrew/bin:$PATH npm run dev     # http://localhost:4321
```

- There are no tests and no linter. `npm run build` is the verification gate, because the `Copy` interface makes translation drift a type error.
- For the Browser pane, `.claude/launch.json` defines `astro-dev`, which already points at `/opt/homebrew/bin/node`.

## Architecture

- **One page, two locales.** `src/pages/[locale]/index.astro` composes every section and builds `/en/` and `/ar/` via `getStaticPaths` over `locales`. `src/pages/index.astro` only redirects: saved `localStorage.lang`, then browser language, then `/en/`.
- **Content is constants, not markup.**
  - All visible strings live in `src/i18n/{en,ar}.ts`, typed by `Copy` in `src/i18n/types.ts`. Components receive the copy object as a `c` prop.
  - Structured dated entries (conferences, education) are in `src/data/learning.ts`, with `Localized<T>` fields.
  - Contact numbers, links, the GA ID and the paper colours are in `src/config/site.ts`.
  - Never hard-code user-facing text in a component.
- **Theming touches three places.**
  1. `global.css` defines light tokens on `:root`. The dark set appears **twice**: under `prefers-color-scheme: dark` with `:root:not([data-theme='light'])`, and under `:root[data-theme='dark']`. Edit both.
  2. `Base.astro` has an inline pre-paint script that applies `localStorage.theme`.
  3. `Header.astro`'s script toggles `data-theme` and rewrites the `theme-color` metas from `site.colors`, which must match `--paper`.
- **Arabic is typeset, not mirrored.**
  - `:root:lang(ar)` overrides the type tokens (Markazi Text, no italics, small caps or tracking, larger sizes, looser leading).
  - Layout must use logical properties (`*-inline`, `*-block`, `inset-inline`) so `dir="rtl"` mirrors it for free. Don't use `left`/`right`/`margin-left`. The only exception is the English-only drop cap (`.story:lang(en)`).
  - Wrap Latin snippets inside Arabic text (handles, numbers) in `<bdi>`.
- **Cross-component contracts via data attributes:**
  - `data-cta-anchor`: `StickyCta` hides the bottom WhatsApp bar while any element with it is on screen (IntersectionObserver). Put it on the wrapper of every in-page WhatsApp button.
  - `data-wa="<placement>"` (set by `WhatsAppButton`) and `data-track="<event>"`: `ConsentBanner`'s script turns them into GA events. That only happens once `site.gaMeasurementId` is set and the visitor has consented.
- **Astro scoped-CSS gotcha:** a `class` passed into a child component isn't matched by the parent's scoped styles, because the child's element doesn't carry the parent's scope attribute. Target it with `:global()` (see `StickyCta.astro`).
- **Fonts:** Fontsource variable packages are imported in `Base.astro`, which preloads only the current locale's headline face. The family names are `'Literata Variable'`, `'Hanken Grotesk Variable'` and `'Markazi Text Variable'`.
- **Portrait:** `Portrait.astro` globs `src/assets/portrait.{jpg,jpeg,png,webp}`. When no file exists it renders a placeholder.
- **Logo:** `src/assets/logo.jpg` is her Instagram profile mark, and only a 150px JPEG on a light square.
  - It's used only for the favicon, the home-screen icon and the 48px avatar beside the Instagram link.
  - Don't put it in the header or hero, or display it larger: it blurs, and it clashes with the editorial type.
  - `public/favicon-32.png` and `public/apple-touch-icon.png` are generated from it with `sips` (see README).

## Design constraints (from the client brief)

- **Mobile-first is the top requirement.** Most traffic arrives from Instagram's in-app browser. Check every change at 375px wide, in both locales and both themes, with no horizontal scroll and tap targets of at least 44px.
- **Editorial look, and it must not look AI-generated or templated.** That rules out:
  - Tailwind
  - emoji
  - gradients or glows
  - rounded cards with shadows
  - icon-card rows
  - Inter, Roboto, Playfair or Montserrat

  Lists use numbered entries with hairline rules. The pill shape is reserved for the WhatsApp button.
- **Palette contrast rules (WCAG, already computed):**
  - Amber `#f39c12` is never text on light backgrounds. Use `#8a5604`, or amber as a fill with `#1c1c1c` text.
  - Olive `#4a5d23` and slate `#2c3e50` are never text on the dark background. Use `#98ae72` / khaki `#d4d6a7` / cream `#edede2` instead.
- **Copy:**
  - Specific, first-person, local detail. Avoid AI phrasing ("elevate", heavy em dashes).
  - English uses curly apostrophes (’).
  - The title "Biochemist & nutrition coach" is provisional: she isn't a licensed dietitian yet, so don't use "dietitian".
  - Claude wrote the Arabic copy, and it still needs a native speaker's review.

## Reference material (local, gitignored `dev_docs/`)

- `requirements.md`: decisions, the tech stack and open questions.
- `reports/Nutritionist portfolio design inspiration.md`: research behind the design.
- `design/Main.dc.html`: source of the design canvas (https://claude.ai/artifact/APahvZQusZCHswtuYqWGey). Its copy constants seeded `src/i18n`.
- `conferences.md`, the CV (`.docx` and `.pdf`) and the brand palette file `aya's typography.html`.
