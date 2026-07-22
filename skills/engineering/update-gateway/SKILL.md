---
name: update-gateway
description: Refresh a Gateway's GATEWAY.md by reading new commits since each project's last checkpoint, flagging uncommitted changes and thin docs, and reconciling repos that appeared or disappeared on disk. Manual invocation only.
disable-model-invocation: true
---

# Update gateway

Refresh `GATEWAY.md` at the current Gateway root. This assumes `GATEWAY.md`, `CONTEXT.md`, and `docs/adr/` already exist there — if they don't, run `/gateway-init` first. See `gateway-init`'s `GATEWAY-FORMAT.md` for the schema this file follows, and the root's own `CONTEXT.md` for its Gateway/Project/Checkpoint/Status vocabulary.

## 1. Read the current state

Parse `GATEWAY.md`'s table for the registered Projects, their paths, and Checkpoint hashes.

## 2. Reconcile against disk

- For every Git repo found under the Gateway root with no entry in `GATEWAY.md`: stop and ask before adding it. Show its name, path, current branch, and last commit so the user can decide its Status.
- For every `GATEWAY.md` entry whose path no longer exists on disk: stop and ask, offering three options — remove the entry, mark it `archived`, or leave it untouched. Never decide this automatically.

Don't proceed to step 3 for a Project still pending one of these decisions.

## 3. Refresh each registered Project

For each Project with a resolved path:

1. `git fetch` — never `git pull` or checkout. This must not touch the Project's working tree or currently-checked-out branch.
2. Diff `origin/main` (or `origin/master`, whichever exists) against the recorded Checkpoint.
3. If there are new commits, update the Project's status description/notes to reflect them, and set Checkpoint to the new tip commit hash.
4. If the Project has zero commits on `main` yet, leave Checkpoint empty (`—`) rather than inventing one — this is distinct from Status `idea` (a repo with zero commits still gets a real Status like `active`; `idea` means no repo exists at all).

## 4. Surface transient warnings

For each Project, check and report to the user — in your response, never written into `GATEWAY.md` — the following:

- **Uncommitted changes**: staged or working-tree changes present.
- **Thin docs**: the Project has enough substance to warrant it (more than a handful of commits/files) but is missing both `README.md` and `CONTEXT.md`/`CONTEXT-MAP.md`.

These are point-in-time facts, not part of the snapshot — see the root's `CONTEXT.md` `Snapshot` entry for why.

## 5. Write the update

Rewrite `GATEWAY.md`'s table and per-project sections with the refreshed Status, Checkpoint, and Last Updated date (today). Keep the file snapshot-only — don't append history or accumulate a changelog.

## Out of scope

Committing the updated `GATEWAY.md` to the Gateway root's own repo. That's a deliberate step for the user, same as any other commit.
