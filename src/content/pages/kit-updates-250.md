---
title: "Kit updates"
description: "What each course kit update added, how to check it's working, and how to read the results."
courses: [dight250]
ready: false
date: 2026-11-09
---

# Kit updates

Your course kit (`AGENTS.md`, the skills, and the files that run checks) changes a few times a term. Each update adds something new to your repo. This page says what each one added, **how to tell it's working**, and **what its results mean**. Come back here whenever a brief says to read your checks or run [`/update-kit`](/250/skills/update-kit/).

**Which version do I have?** Open `.course-kit-version` at the root of your repo: it holds the date of your kit. Or run `/update-kit`: it says "up to date," or tells you what it will change before it changes anything.

## Reading your checks

Every time you push to `main`, GitHub runs **Feedback checks** on your pages: the W3C validator and an axe accessibility scan. It never blocks your push. It's a second pair of eyes.

### Where to find the report

1. In GitHub Desktop, choose **Repository → View on GitHub** (or open your repo on github.com).
2. Click the **Actions** tab at the top.
3. Click the newest **Feedback checks** run. Its name is your commit summary, so you can match it to your push. It takes a minute or two to finish.
4. You land on the run's **Summary**. Scroll down to the report called **Feedback checks**.

The run itself always shows a green ✅, **even when your pages have problems**. Green only means the checks ran. The results are in the report.

### What the report means

The report has two tables, one per check, with a row for every page in your repo (`archive/` and `try/` are skipped):

| You see | It means | What to do |
| --- | --- | --- |
| ✅ No errors / No issues found | That check found nothing on this page | Nothing. Still Tab through it, zoom to 200%, and check contrast yourself: no tool catches everything. |
| ❌ 2 errors / 1 issue | The check found problems | Read the list under the tables. Each item names the problem and links to an explanation. Fix it, or write in `NOTES.md` what it found and why you left it. |
| ⚠️ didn't run | The check itself failed, not your page | Click **Re-run jobs** (top right). If it happens again, check the page by hand at [validator.w3.org/nu](https://validator.w3.org/nu/) and tell your instructor. |

The same problems also show as yellow **annotations** above the Summary, each one naming the file.

### Is it working?

- **No Feedback checks runs at all?** Your repo is missing `.github/workflows/feedback.yml`. The `.github` folder is hidden in Finder, so it's easy to leave out of a commit. Look for it in your repo on github.com, and if it isn't there, run `/update-kit`.
- **Your new page isn't in the tables?** It isn't pushed yet, or it's inside `try/`. Commit and push it in GitHub Desktop, then open the newest run.
- **Your page passes here but looks wrong?** The checks read your HTML, not your design. Layout, zoom, and Tab order are still yours to test.

## Every update

Newest first. Each entry says what changed and how to check it worked.

### Nov 4: `/update-kit`, and `try/` is scratch

**What's new:** the [`/update-kit`](/250/skills/update-kit/) skill, so later updates never need a download. `AGENTS.md` now says `try/` is a scratch folder: no `NOTES.md`, no hub link, never committed.

**Check it worked:**

- Your repo has `.course-kit-version` at the root, holding `2026-11-04`.
- Type `/` in Copilot Chat: `update-kit` is in the list.
- Run `/update-kit`: it says your kit is up to date.

### Nov 2: Feedback checks

**What's new:** `.github/workflows/feedback.yml`, which runs the W3C validator and axe on every push (see [Reading your checks](#reading-your-checks)), and a `.gitignore`, so files like `.DS_Store` stay out of your commits.

**Check it worked:**

- On github.com, your repo has `.github/workflows/feedback.yml` and `.gitignore` at the root.
- The **Actions** tab has a **Feedback checks** run for your last push, and its Summary has a report with your pages in both tables.
