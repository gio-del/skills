---
name: slides
description: Generate or extend a reveal.js slide deck from a description of what to show, rendered against a design system bootstrapped by /design-system. Manual invocation only.
disable-model-invocation: true
---

# Slides

Turn a description of a talk into a reveal.js deck, rendered against one of the repo's design systems.

## 1. Pick a design system

If a design system name was passed as an argument, use it. Otherwise, glob `design-systems/*/brand-guidelines.md`:

- **None found**: tell the user to run `/design-system` first.
- **Exactly one**: warn the user only one design system exists (name it) and confirm before proceeding.
- **Multiple**: read each `brand-guidelines.md`'s `description:` frontmatter and offer a picker showing name + description.

## 2. Get the description of what to show

Accept whatever the user hands over: inline text, or a path to a file. If it's too thin to imply a rough structure (slide count, throughline), ask one clarifying question before generating — don't silently guess, but don't run a full `/grilling` interview either.

## 3. Pick a deck name

If a deck with this name already exists under `slides/<deck-name>/`, this is an edit — extend/modify its existing slides rather than regenerating the deck from scratch (see `docs/adr/0004-slides-edits-in-place.md`). Otherwise this is a new deck.

## 4. Generate or edit the deck

Write `slides/<deck-name>/` as a small local reveal.js project (`index.html` + assets), referencing the chosen design system's `theme.css` and `layouts/` by relative path rather than copying them. Compose slides out of the design system's named layouts — don't invent one-off slide markup that bypasses them.

## Out of scope

Bootstrapping a design system — that's `/design-system`, which this skill only consumes.
