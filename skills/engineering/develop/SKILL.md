---
name: develop
description: Implement a PRD or issue end-to-end in the target repo — read its ADRs, branch, break work into vertical slices, TDD each slice, record new ADRs, commit each slice, update the tracker, offer to open a PR, and close the tracker issue linked to it. Manual invocation only.
disable-model-invocation: true
---

# Develop

Implement a PRD or issue in the target repo, respecting its existing architectural decisions and testing it as you go. This skill orchestrates `tdd`, `domain-modeling`, and `verify` rather than duplicating their rules.

By default this includes the full git workflow: branch, commit each story as an independent vertical slice, and ask to open a PR at the end. Skip all git steps (4, 9, and 10) only if the user explicitly asks to work without git for this run.

## 1. Get the PRD/issue

Accept whatever the user hands over: pasted text, a local file path, or a URL/reference to an issue tracker (fetch it via MCP or API if one is configured).

If no PRD/issue is supplied, stop immediately and say so — do not guess scope from a bare request.

## 2. Read existing ADRs

Before touching code, read the target repo's architectural decisions using `domain-modeling`'s convention: `CONTEXT.md` + `docs/adr/` for a single context, or `CONTEXT-MAP.md` pointing to per-context `docs/adr/` for multiple contexts.

If neither exists, proceed without ADR context. Do not bootstrap domain modeling here — that only happens later, as a side effect of recording a new decision (see step 6).

## 3. Establish the user stories

If the PRD/issue already has an explicit story or task breakdown, use it as-is.

If it's unstructured prose, decompose it into stories yourself, using the same shape `to-prd` produces:

> As a `<actor>`, I want `<feature>`, so that `<benefit>`.

Confirm this breakdown with the user before implementing anything.

## 4. Branch

Check `git status` before doing anything else:

- If there are uncommitted changes, or the current branch isn't the default branch, stop and ask the user how to proceed (stash, commit separately, branch from here anyway, or abort). Never stash or discard silently.
- Otherwise, switch to the default branch and pull. If the pull fails (no remote, offline), warn and continue rather than failing the whole run.

Propose a branch name `<type>/<short-description>`, where `<type>` is `feat`, `fix`, `chore`, or `docs` inferred from the PRD's dominant intent, and `<short-description>` is a kebab-case slug of the PRD's subject. Confirm the name with the user — or let them edit it — before running `git checkout -b`.

## 5. Implement one story at a time — vertical slices only

Never horizontal-slice (all seams agreed, then all tests, then all code) across the PRD. For each story:

1. Agree the seam(s) it touches with the user.
2. Run a `/tdd` cycle against that seam until green.
3. If no meaningful seam exists for this piece of work (a visual/CSS-only change, a spike, config/infra-only edits), skip TDD: implement directly, then exercise the change with `/verify`.

Move to the next story only once the current one is green.

## 6. Record new ADRs as they arise

If implementing a story forces a decision that is hard to reverse, surprising without context, and the result of a real trade-off (`domain-modeling`'s three criteria — all must hold), invoke `/domain-modeling` to record it in the target repo. This is the only point at which `CONTEXT.md`/`docs/adr/` may be created from scratch in the target repo.

## 7. Resolve ADR/PRD conflicts by asking, never by picking a side

If a story asks for something an existing ADR rules out, stop and surface the conflict: quote the ADR, explain the contradiction, and ask the user whether the ADR is superseded (record that via `/domain-modeling`) or the PRD needs to change. Don't silently favor either one.

## 8. Update the tracker

As each story goes green, check it off in the source PRD/issue, using whatever mechanism it was read through (MCP, API, or local file edit). Once every story lands, leave the issue itself open — it closes in step 11, linked to whatever development artifact comes out of step 10, rather than being closed on its own.

## 9. Commit each story as an independent vertical slice

Once a story is green — its code, any ADR recorded for it (step 6), and any local tracker edit for it (step 8) — commit all of it together as one commit. That's the unit: one story, one commit, independently meaningful on its own.

For the message, check the target repo's recent `git log` for an existing convention (e.g. Conventional Commits) and match it; otherwise use a plain imperative summary line with an optional body. Push the branch immediately after each commit.

Repeat steps 5–9 for each remaining story.

## 10. Ask to open a PR

Once every story is committed and the tracker is fully updated, ask the user whether to open a PR. Don't open one without an explicit yes.

If yes: look for the target repo's PR template (e.g. `.github/PULL_REQUEST_TEMPLATE.md`) and fill it from the PRD, the stories implemented, and any ADRs recorded; if no template exists, default to a Summary + Test plan body. Then run `gh pr create`.

If no: stop. The branch and its commits remain as-is for the user to handle manually, and the tracker issue stays open (see step 11) — there's no artifact yet to close it against.

## 11. Close the tracker issue, linked to the artifact

If the PRD/issue came from an issue tracker (not pasted text or a local file) and step 10 produced a PR, close the issue and link it to that PR, using whatever mechanism it was read through (MCP or API): the tracker's native PR-linking convention where one exists (e.g. a `Closes #<n>` reference in the PR body, which GitHub also uses to auto-close on merge), otherwise a closing comment on the issue containing the PR's URL. Don't close the issue immediately on merge instead of now — this step runs right after the PR is opened, not deferred to whenever it lands.

If step 10 ended in "no PR," skip this step — leave the issue open, since there's no artifact yet to link it to.
