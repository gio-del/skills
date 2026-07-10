---
name: design-system
description: Bootstrap a design system for reveal.js slide decks — interviews you via /grilling for brand identity, colors, typography, and layouts, then generates a theme, named layouts, brand assets, and a brand-guidelines.md. Manual invocation only.
disable-model-invocation: true
---

# Design system

Bootstrap a design system for reveal.js decks: a theme, a set of named slide layouts, brand assets, and a human-readable `brand-guidelines.md`. This skill doesn't interview you directly — it delegates to `/grilling`.

A repo can hold multiple design systems side by side; `/slides` picks one at generation time.

## 1. Pick a name

Ask for a short, unique name for this design system (e.g. `acme-corp`, `personal-talks`). Check it doesn't collide with an existing `design-systems/<name>/` directory.

## 2. Interview via `/grilling`

Invoke `/grilling` to pin down:

- Brand name and a one-line description — becomes the `description:` frontmatter in `brand-guidelines.md`, shown by `/slides`'s picker when no design system is specified.
- Color palette: primary/secondary/accent, light and dark handling.
- Typography: heading and body fonts.
- Logo/imagery assets: file paths the user provides.
- Which slide layouts are needed, from a default set (title, section-header, bullets, image-with-caption, quote) — confirm, trim, or extend rather than assuming all five every time.

## 3. Generate the design system

Write `design-systems/<name>/`:

- `theme.css` — CSS custom properties for color and typography, derived from the interview.
- `layouts/` — one file per confirmed layout, built on the theme's custom properties.
- `brand-guidelines.md` — `description:` frontmatter plus a human-readable brand doc (colors, type, logo usage, voice).
- Copy any provided asset files (logo, imagery) alongside.

## Out of scope

Generating an actual deck — that's `/slides`, which consumes a design system produced here.
