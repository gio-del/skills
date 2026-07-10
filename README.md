# skills

Gio's agent skills — the ones I actually use across my own projects. Small,
composable, and designed to work with any coding agent that follows the
[Agent Skills](https://github.com/vercel-labs/skills) convention.

## Quickstart

```bash
npx skills@latest add gio-del/skills
```

Pick the skills you want and which agent(s) to install them for.

### Plugin marketplace (Claude Code)

If you use Claude Code and don't need the per-skill picker, install the
whole set as a plugin instead:

```
/plugin marketplace add gio-del/skills
/plugin install gio-del-skills@gio-del-skills
```

## Structure

Skills live under `skills/<category>/<name>/SKILL.md`:

- `skills/content/` — skills for producing polished, audience-facing output (slides, etc.)
- `skills/engineering/` — skills for building and changing code
- `skills/productivity/` — skills for planning, thinking, and non-code work
- `skills/meta/` — skills for maintaining this skills repo itself (scaffolding, registry, docs)

`.claude/skills` and `.agents/skills` are **not** committed — they're local
install targets, gitignored. For your own machine, `scripts/link-skills.sh`
symlinks every skill in this repo into `~/.claude/skills` and
`~/.agents/skills` so a `git pull` here keeps every project up to date.

## Credits

A few skills here started life in [mattpocock/skills](https://github.com/mattpocock/skills)
and are used with only light adaptation. Each credit below is pinned to the
exact upstream commit the local copy matches — not a moving branch — so it
stays accurate even after mattpocock's `main` changes.

<!-- CREDITS:START -->
| Skill | Source |
| --- | --- |
| [domain-modeling](skills/engineering/domain-modeling/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/engineering/domain-modeling/SKILL.md) |
| [grill-me](skills/productivity/grill-me/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/productivity/grill-me/SKILL.md) |
| [grill-with-docs](skills/engineering/grill-with-docs/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/engineering/grill-with-docs/SKILL.md) |
| [grilling](skills/productivity/grilling/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/productivity/grilling/SKILL.md) |
| [tdd](skills/engineering/tdd/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/engineering/tdd/SKILL.md) |
| [teach](skills/productivity/teach/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/productivity/teach/SKILL.md) |
| [to-prd](skills/engineering/to-prd/SKILL.md) | [mattpocock/skills@272f99b](https://github.com/mattpocock/skills/blob/272f99b22574f50e4266791c86b9302682970e23/skills/engineering/to-prd/SKILL.md) |
<!-- CREDITS:END -->

Run `node scripts/refresh-credits.mjs` after `npx skills update` to refresh
these pins.
