---
title: "Kit updates"
description: "What each course kit update added, how to check it's working, and how to read the results."
courses: [dight340]
ready: true
date: 2026-11-09
---

# Kit updates

Your course kit (`AGENTS.md`, the skills, and the files that run checks) changes a few times a term. Each update adds something new to your repo. This page says what each one added, **how to tell it's working**, and **what its results mean**. Come back here whenever a brief says to read your checks or run [`/update-kit`](/340/skills/update-kit/).

**Which version do I have?** Open `.course-kit-version` at the root of your repo: it holds the date of your kit. Or run `/update-kit`: it says "up to date," or tells you what it will change before it changes anything.

## Reading your checks

Every time you push to `main`, GitHub runs two workflows. Neither one blocks your push.

| Workflow | What it checks | Green ✅ | Red ❌ |
| --- | --- | --- | --- |
| **Checks** | ESLint (the course rules, like `const`/`let` and `===`), then the Vitest tests in every folder that has them | No lint errors, and every test passed | Something to look at. Your page still deploys. |
| **Build and deploy** | Builds every folder with a `package.json` and publishes the whole repo to GitHub Pages | Everything built and is live | A folder didn't build. Everything else still deployed; that folder's page is missing or out of date. |

### Where to find the results

1. In GitHub Desktop, choose **Repository → View on GitHub** (or open your repo on github.com).
2. The fastest check is the small ✅ or ❌ next to your latest commit, above the file list. Click it to see both workflows.
3. For the details, click the **Actions** tab, then the newest run of the workflow you want. Its name is your commit summary.
4. Click the job, then the step with the ❌ (for example **ESLint (const/let, ===)** or **Vitest (every folder with tests)**). The log names each file, line, and rule, or each failing test.

For **Build and deploy**, the step **Report folders that didn't build** names the folders. Run `npm run build` in that folder on your computer: you'll see the same error, and it's quicker to fix there.

### Check before you push

You can run the same checks locally, so a red mark is never a surprise:

- `npx eslint .` at the root of your repo (the same rules as **Checks**).
- `npm test` in a project folder (its Vitest tests).
- `npm run build` in a project folder (what **Build and deploy** does).

### Is it working?

- **No runs at all?** Your repo is missing `.github/workflows/`. The `.github` folder is hidden in Finder, so it's easy to leave out of a commit. Look for it on github.com, and if it isn't there, run `/update-kit`.
- **Build and deploy is green but your page doesn't change?** On GitHub, open **Settings → Pages** and check that **Source** is **GitHub Actions**. Then give it a minute and reload without the cache (Cmd/Ctrl + Shift + R).
- **Checks is red on a folder you didn't touch?** It checks the whole repo, so an older folder can fail too. Fix it, or write in that folder's `NOTES.md` why you left it.

## Every update

Newest first. Each entry says what changed and how to check it worked.

### Nov 4: Build and deploy, and `/update-kit`

**What's new:**

- `.github/workflows/deploy.yml`: **Build and deploy** builds your Vite and Svelte folders and publishes the whole repo to Pages.
- The [`/update-kit`](/340/skills/update-kit/) skill, so later updates never need a download.
- A check that runs when you open a new Claude Code session and tells you when a newer kit is out.
- `AGENTS.md` now says `try/` is a scratch folder: no `NOTES.md`, no hub link, never committed.

**One step that isn't a file:** on GitHub, **Settings → Pages → Source → GitHub Actions**. Without it, **Build and deploy** goes red at the deploy step.

**Check it worked:**

- Your repo has `.course-kit-version` at the root, holding `2026-11-04`.
- The **Actions** tab shows a green **Build and deploy** for your last push, and your newest Svelte Spark loads at its Pages address.
- Type `/` in a new session: `update-kit` is in the list.
- When a newer kit is out, a new session starts with "Course kit update available … Run /update-kit." No message means you're up to date (or offline).

### Nov 2: Checks, and the scope guard

**What's new:**

- `eslint.config.mjs` and `.github/workflows/check.yml`: **Checks** runs ESLint and your Vitest tests on every push (see [Reading your checks](#reading-your-checks)).
- `.claude/hooks/scope-guard.mjs`: if Claude tries to install an off-scope package (React, Next.js, and so on), the install is cancelled and Claude explains the in-scope choice instead (Svelte, Astro).
- An updated `.gitignore`, so `node_modules/` and `.DS_Store` stay out of your commits.

**Check it worked:**

- The **Actions** tab has a **Checks** run for your last push.
- `npx eslint .` at your repo root runs and prints either nothing (all clear) or a list of problems.
- To see the scope guard work, ask Claude in a new session to "install react". It should stop and suggest Svelte. You don't need to keep anything it does.
