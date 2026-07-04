# Contributing

This is a small personal repo, but changes — including from Claude Code
itself — go through the same lightweight flow:

1. **Branch from `main`.** Never commit directly to `main`.

   ```bash
   git checkout main
   git pull
   git checkout -b <type>/<short-description>
   ```

   Use a prefix that matches the change: `feat/`, `fix/`, `chore/`, `docs/`.
2. **Develop on that branch.** Commit as you go; keep commits scoped and
   messages descriptive.
3. **Open a PR into `main`** once the branch is ready:

   ```bash
   gh pr create --title "..." --body "..."
   ```

   The PR description should follow `.github/PULL_REQUEST_TEMPLATE.md`.
4. **Merge via the PR**, not a local fast-forward — keep `main`'s history
   matching what GitHub shows as merged.

This applies to every change: new skills, edits to existing skills, docs,
scripts, and repo-meta files like this one.
