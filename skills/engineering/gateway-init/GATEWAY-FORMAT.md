# GATEWAY.md Format

## Structure

```md
# Gateway

{one-line description}

| Project | Path | Status | Checkpoint | Last Updated |
|---|---|---|---|---|
| bank-tracker | `./bank-tracker` | active | `ed6d273` | 2026-07-22 |

## bank-tracker

{free-text description}

- **Stack**: ...
- **Status notes**: ...
- **Docs**: ...
```

## Status glossary

Fixed set of four values — don't introduce others without re-running `/grilling`:

- **active** — work in progress, recent commits
- **paused** — exists, not being worked on now, may resume
- **archived** — deliberately closed
- **idea** — registered intent, no repo/folder exists yet

## Checkpoint

The last commit hash on `main`/`master` that `/update-gateway` has already processed and folded into a Project's status description. A Project with zero commits yet gets an empty Checkpoint (`—`), not status `idea` — `idea` is reserved for Projects with no repo at all.

## Snapshot, not changelog

Every field reflects only the current state, overwritten on each `/update-gateway` run. Don't accumulate history inside `GATEWAY.md` — a Project's own Git log is the history.

## Rules

- Only track the table columns listed above; free-text notes under each Project section may vary in content but not the schema.
- Update entries in place. Don't append dated log lines or keep stale rows for removed Projects — see `/update-gateway`'s missing-path reconciliation flow for how removal itself gets decided.
