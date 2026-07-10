---
name: new-skill
description: Scaffold a new skill in this repo — pick a name and category, delegate to /grilling first if the design isn't settled yet, write SKILL.md, register it, and link it locally. Manual invocation only.
disable-model-invocation: true
---

# New skill

Scaffold a new skill into this repo. This skill doesn't interview you about what the new skill should do — it delegates that to `/grilling` — and it doesn't duplicate `CONTRIBUTING.md`'s branch/commit/PR workflow either.

## 1. Confirm the design

If the new skill's purpose, trigger conditions, and process aren't already settled from the conversation so far, invoke `/grilling` to pin them down before scaffolding anything. Don't scaffold a skill whose design is still vague.

## 2. Pick a name

Prefer the shortest, most everyday word that's still unambiguous in context over a longer, more literally descriptive one. Save precision for the `description:` field, not the name.

Check the proposed name against every skill under `skills/*/*/SKILL.md`, not just the target category — skill names are effectively global since they double as slash-commands regardless of which folder they live in. On a collision, propose alternatives and ask the user to pick.

## 3. Pick a category

- `skills/engineering/` — skills for building and changing code
- `skills/productivity/` — skills for planning, thinking, and non-code work
- `skills/meta/` — skills for maintaining this skills repo itself (scaffolding, registry, docs — see `docs/adr/0002-meta-skill-category.md`)

Make your best guess and state your one-line reasoning. Only stop to ask the user when placement is genuinely ambiguous, or when none of the existing categories fit and a new one seems warranted (see step 6).

## 4. Decide `disable-model-invocation`

Ask the user explicitly whether the new skill should be manual-invocation-only or left auto-invokable by the model. This is a real per-skill design call — don't default it silently either way.

## 5. Check for borrowed content

Ask whether the skill is copied or adapted from another repo. If so, after scaffolding: add an entry to `skills-lock.json` (`source`, `sourceType`, `skillPath`, `computedHash`) and run `node scripts/refresh-credits.mjs` to update `README.md`'s credits table.

## 6. Write the files

Create `skills/<category>/<name>/SKILL.md` with frontmatter (`name`, `description`, `disable-model-invocation` if set) and a free-form body reflecting whatever process was agreed in step 1 — match the shape of whichever existing skill it most resembles (a flat synthesis skill like `to-prd`, a multi-step orchestrator like `develop`, etc.), not a fixed template.

Add supporting reference files (e.g. `*-FORMAT.md`) alongside `SKILL.md` only if the skill's own content calls for them, following `domain-modeling` and `tdd` as precedent.

If this is the first skill in a brand-new category: update the category bullet lists in both `CLAUDE.md` ("Structure" section) and `README.md` (the `skills/<category>/` bullets) so the docs don't drift, and consider whether the new category itself warrants an ADR (`domain-modeling`'s three criteria: hard to reverse, surprising without context, result of a real trade-off) — introducing `skills/meta/` did.

## 7. Register it

Add `"./skills/<category>/<name>"` to the `skills` array in `.claude-plugin/plugin.json`, keeping it in path order.

Run `./scripts/link-skills.sh` to symlink it into `~/.claude/skills` and `~/.agents/skills`.

## Out of scope

Branching, committing, and opening a PR. `CONTRIBUTING.md` already governs that for every change in this repo, including changes made by Claude Code — this skill doesn't duplicate it.
