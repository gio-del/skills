---
name: new-project
description: Scaffold a new Project folder at the Gateway root — git init it, register it in GATEWAY.md, and optionally link a remote (GitHub/Bitbucket/GitLab) with guided metadata. Manual invocation only.
disable-model-invocation: true
---

# New project

Create a new Project at the current Gateway root and register it in `GATEWAY.md`. This assumes the root already has a Gateway set up — if it doesn't, run `/gateway-init` first. See `gateway-init`'s `GATEWAY-FORMAT.md` for the schema, and the root's own `CONTEXT.md` for its Status glossary.

## 1. Check for a collision

If a folder with the requested name already exists at the Gateway root, stop and report the error. Don't guess whether it should instead be reconciled as an existing unregistered repo — that's `/update-gateway`'s job. This command only creates new folders.

## 2. Initialize locally

Create the folder, `git init` it, and make an initial commit (e.g. a starter `README.md`, or whatever minimal scaffold the user wants).

## 3. Register it

Add a new entry to `GATEWAY.md`: name, path, Status (ask the user — `idea` doesn't apply here since the folder/repo now exists), an empty Checkpoint (no commits to compare against yet), and today's date.

## 4. Offer to link a remote (optional, skippable)

Ask whether to link a remote now or skip this entirely.

If yes:

1. Ask which provider: GitHub, Bitbucket, or GitLab.
2. Verify the matching CLI is installed and authenticated (`gh auth status`, `glab auth status`, or Bitbucket's CLI equivalent). If it's missing or unauthenticated, say so and stop — don't attempt to install or authenticate on the user's behalf.
3. Propose metadata — title (defaults to the folder name), description, and visibility (defaults to **private**) — and let the user edit any of it before proceeding.
4. Create the remote repo, add it as `origin`, and push `main`.

## Out of scope

Making the repo public, or taking any remote action at all, without the user explicitly confirming — visibility defaults to private and remote creation defaults to skipped/asked, never silent.
