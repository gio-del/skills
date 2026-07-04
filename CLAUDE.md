# skills

A public repo of personal agent skills, installable via `npx skills@latest add gio-del/skills`
(the [vercel-labs/skills](https://github.com/vercel-labs/skills) tool). See `README.md`
for the human-facing pitch; this file is about how to work *in* this repo.

## Workflow

Follow `CONTRIBUTING.md` for every change, including changes made by Claude
Code itself: branch from `main` (never commit directly to `main`), develop
on that branch, then open a PR into `main` using
`.github/PULL_REQUEST_TEMPLATE.md`. Do this even for small repo-meta edits
like docs or this file.

## Structure

Canonical source: `skills/<category>/<name>/SKILL.md`.

- `skills/engineering/` — skills for building and changing code
- `skills/productivity/` — skills for planning and non-code work

`.claude/skills` and `.agents/skills` are gitignored — they're local install
targets, not source. `scripts/link-skills.sh` symlinks every skill in `skills/`
into `~/.claude/skills` and `~/.agents/skills` for local use across all
projects on this machine. Never add files directly under `.claude/skills` or
`.agents/skills`; edit the skill under `skills/` and re-run the link script if
a new skill needs linking.

`.claude-plugin/plugin.json` lists every skill path for Claude Code's plugin
mechanism — add new skills there too.

## Adding a new skill

1. Create `skills/<category>/<name>/SKILL.md` (reuse `engineering` /
   `productivity`, or introduce a new category only if a skill genuinely
   doesn't fit either).
2. Add its path to `.claude-plugin/plugin.json`.
3. Run `./scripts/link-skills.sh` to make it available locally.

## Crediting borrowed skills

If a skill is copied or adapted from another repo (e.g. `mattpocock/skills`),
add an entry to `skills-lock.json` (source, sourceType, skillPath, computedHash
— see existing entries) and add a row for it in `README.md`'s credits table
between the `<!-- CREDITS:START -->` / `<!-- CREDITS:END -->` markers by
running `node scripts/refresh-credits.mjs`. Credits are pinned to the exact
upstream commit the local copy matches, not a moving branch — re-run that
script (after `npx skills update`, if it warns of drift) whenever a borrowed
skill is refreshed.

## Domain modeling

`docs/adr/` exists at the repo root for hard-to-reverse, non-obvious,
real-tradeoff decisions about how these skills themselves work (see
`docs/adr/0001-skills-compose-by-delegation.md`). `CONTEXT.md` does not yet
exist. When a `grill-with-docs` / domain-modeling session in this repo
resolves a term or makes that kind of decision, create or update these files
lazily, following the `domain-modeling` skill's documented conventions.
