---
name: develop
description: Implement a PRD or issue end-to-end in the target repo — read its ADRs, break work into vertical slices, TDD each slice, record new ADRs, and update the tracker. Manual invocation only.
disable-model-invocation: true
---

# Develop

Implement a PRD or issue in the target repo, respecting its existing architectural decisions and testing it as you go. This skill orchestrates `tdd`, `domain-modeling`, and `verify` rather than duplicating their rules.

## 1. Get the PRD/issue

Accept whatever the user hands over: pasted text, a local file path, or a URL/reference to an issue tracker (fetch it via MCP or API if one is configured).

If no PRD/issue is supplied, stop immediately and say so — do not guess scope from a bare request.

## 2. Read existing ADRs

Before touching code, read the target repo's architectural decisions using `domain-modeling`'s convention: `CONTEXT.md` + `docs/adr/` for a single context, or `CONTEXT-MAP.md` pointing to per-context `docs/adr/` for multiple contexts.

If neither exists, proceed without ADR context. Do not bootstrap domain modeling here — that only happens later, as a side effect of recording a new decision (see step 5).

## 3. Establish the user stories

If the PRD/issue already has an explicit story or task breakdown, use it as-is.

If it's unstructured prose, decompose it into stories yourself, using the same shape `to-prd` produces:

> As a `<actor>`, I want `<feature>`, so that `<benefit>`.

Confirm this breakdown with the user before implementing anything.

## 4. Implement one story at a time — vertical slices only

Never horizontal-slice (all seams agreed, then all tests, then all code) across the PRD. For each story:

1. Agree the seam(s) it touches with the user.
2. Run a `/tdd` cycle against that seam until green.
3. If no meaningful seam exists for this piece of work (a visual/CSS-only change, a spike, config/infra-only edits), skip TDD: implement directly, then exercise the change with `/verify`.

Move to the next story only once the current one is green.

## 5. Record new ADRs as they arise

If implementing a story forces a decision that is hard to reverse, surprising without context, and the result of a real trade-off (`domain-modeling`'s three criteria — all must hold), invoke `/domain-modeling` to record it in the target repo. This is the only point at which `CONTEXT.md`/`docs/adr/` may be created from scratch in the target repo.

## 6. Resolve ADR/PRD conflicts by asking, never by picking a side

If a story asks for something an existing ADR rules out, stop and surface the conflict: quote the ADR, explain the contradiction, and ask the user whether the ADR is superseded (record that via `/domain-modeling`) or the PRD needs to change. Don't silently favor either one.

## 7. Update the tracker

As each story goes green, check it off in the source PRD/issue, using whatever mechanism it was read through (MCP, API, or local file edit). Mark the whole PRD/issue complete once every story lands.

## Out of scope

This skill stops at implemented, tested, tracker-updated code. It does not branch, commit, or open a PR — that's a separate, deliberate step.
