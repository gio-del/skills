---
name: gateway-init
description: Bootstrap the Gateway pattern in a root folder holding multiple independent project repos — creates GATEWAY.md, its CONTEXT.md vocabulary, and supporting ADRs, so /update-gateway and /new-project have something to operate on. Manual invocation only.
disable-model-invocation: true
---

# Gateway init

Turn a root folder into a Gateway: a parent directory (not itself a project) that tracks the state of multiple independent Project repos living in its subfolders. This is a one-time setup per root; `/update-gateway` and `/new-project` assume it has already run.

## 1. Confirm the design is settled

If the Gateway's schema, status glossary, and reconciliation behavior aren't already agreed from the conversation so far, invoke `/grilling` (or `/grill-with-docs`, which also covers the domain-modeling step below) to pin them down before scaffolding anything. `GATEWAY-FORMAT.md` in this folder documents the baseline shape, but real per-user decisions — does a Checkpoint come from `main` only, is history a changelog or a snapshot, what counts as "thin docs" — are exactly what `/grilling` should confirm, not what this skill should assume.

## 2. Survey the root

Look for existing subfolders that are independent Git repos — each is a candidate Project. For each, gather: path, current branch, last commit on `main`/`master`, and whether `README.md`/`CONTEXT.md` exist. Present these to the user and let them assign a Status and description for each before writing anything — this is the same reconciliation `/update-gateway` performs on later runs, just done once upfront.

## 3. Write `GATEWAY.md`

Follow the schema in `GATEWAY-FORMAT.md`: a summary table (Project | Path | Status | Checkpoint | Last Updated) plus one section per Project underneath with free-text notes. Snapshot only — no changelog.

## 4. Write the Gateway's own `CONTEXT.md`

Following `domain-modeling`'s format, define at minimum: Gateway, Project, Checkpoint, Status, Snapshot. Extend this if the survey or grilling session surfaced other Gateway-specific vocabulary.

## 5. Record the standing ADRs

Two decisions are the settled defaults for every Gateway unless grilling in step 1 changed them — write them to the new root's `docs/adr/`:

- Checkpoints are read from `main`/`master` only, never feature branches.
- The Gateway root itself becomes its own local-only Git repo (no remote), tracking `GATEWAY.md`, its `CONTEXT.md`/`docs/adr/`, and any Gateway scripts — Project subfolders are excluded via `.gitignore` since each is already an independent repo.

## 6. Initialize the root repo

`git init` the Gateway root (if not already done), add the files from steps 3–5 plus a `.gitignore` excluding every Project subfolder, and make the initial commit locally. Never push this repo anywhere — see the ADR from step 5.

## Out of scope

Ongoing maintenance is `/update-gateway`'s job; adding new Projects afterward is `/new-project`'s job. Both assume `GATEWAY.md`/`CONTEXT.md` already exist and read `GATEWAY-FORMAT.md` for the schema — this skill doesn't duplicate their behavior.
