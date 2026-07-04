#!/usr/bin/env node
// Refreshes the credits table in README.md for skills borrowed from other repos.
//
// For every entry in skills-lock.json, fetches the file at the source repo's
// current default-branch HEAD and byte-compares it against our local copy.
//   - identical  -> pin the credit link to that exact commit SHA
//   - different  -> leave the existing pin alone and warn (upstream moved on;
//                   run `npx skills update` to pull the new version first)
//
// Usage: node scripts/refresh-credits.mjs

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.resolve(fileURLToPath(import.meta.url), "../..");
const LOCK_PATH = path.join(REPO, "skills-lock.json");
const README_PATH = path.join(REPO, "README.md");
const START = "<!-- CREDITS:START -->";
const END = "<!-- CREDITS:END -->";

async function ghJson(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "refresh-credits-script" },
  });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

async function main() {
  const lock = JSON.parse(await readFile(LOCK_PATH, "utf8"));
  const rows = [];
  let hadDrift = false;

  for (const [name, entry] of Object.entries(lock.skills)) {
    if (entry.sourceType !== "github") continue;

    const [owner, repo] = entry.source.split("/");
    const localPath = path.join(REPO, entry.skillPath);
    const local = await readFile(localPath, "utf8");

    const branchInfo = await ghJson(`https://api.github.com/repos/${owner}/${repo}`);
    const branch = branchInfo.default_branch;
    const remote = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${entry.skillPath}`
    ).then((r) => r.text());

    if (remote !== local) {
      console.warn(
        `! ${name}: local copy differs from ${entry.source}@${branch}. Run \`npx skills update\` first, then re-run this script.`
      );
      hadDrift = true;
      continue;
    }

    const commit = await ghJson(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`);
    const sha = commit.sha;
    const url = `https://github.com/${entry.source}/blob/${sha}/${entry.skillPath}`;
    rows.push(`| [${name}](${entry.skillPath}) | [${entry.source}@${sha.slice(0, 7)}](${url}) |`);
    console.log(`✓ ${name}: pinned to ${entry.source}@${sha.slice(0, 7)}`);
  }

  const table = ["| Skill | Source |", "| --- | --- |", ...rows].join("\n");
  const readme = await readFile(README_PATH, "utf8");
  const startIdx = readme.indexOf(START);
  const endIdx = readme.indexOf(END);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`README.md is missing ${START} / ${END} markers`);
  }
  const updated =
    readme.slice(0, startIdx + START.length) + "\n" + table + "\n" + readme.slice(endIdx);
  await writeFile(README_PATH, updated);

  if (hadDrift) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
