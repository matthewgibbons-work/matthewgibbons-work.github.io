---
title: "Spark 0: Set up your repo"
description: "Download the starter kit, add it to your repo, and let the agent walk you through the new layout."
courses: [dight250, dight340]
session: 1
date: 2026-10-19
due: 2026-10-21
---

# Spark 0: Set up your repo

Today you'll reorganize your course repo for the new system. You won't do it alone: an AI agent walks you through it one step at a time and stops so you can check each step. Your job is to read what it proposes, check it, and say "next" only when you understand what happened.

**Time:** about 45 minutes in studio. **Due:** before class on Wed Oct 21.

At the end you'll have:

- all your earlier work safe in an `archive/` folder, still live on GitHub Pages
- a new hub page with sections for Sparks, Prototypes, Release, and Archive
- your first `NOTES.md`, written by you
- two commits, pushed, each with a message that says what changed: one for the move into `archive/`, one for the new hub and notes

## Before you start

- [ ] Your laptop, with VS Code open.
- [ ] Your course repo cloned on this laptop, with nothing waiting to be committed. In VS Code's terminal, `git status` should say "nothing to commit, working tree clean." If it doesn't, commit or ask for help first.
- [ ] Run `git pull` so you have the latest version.

**DIGHT 250:** Copilot Chat signed in and responding. Open the Chat view and type "hi." If it answers, you're ready.

**DIGHT 340:** the Claude desktop app signed in with your Claude account, with its **Code** tab open. If the app offers an update, install it first. (Using Claude Code in the terminal or the VS Code extension instead? Check the version with `claude --version`: it must be **2.1.277 or later** to read the course's `AGENTS.md`.) If Claude isn't working, use Copilot Chat for today (see "If something goes wrong").

## Step 1: Download the starter kit

| Course | Repo | Starter kit |
| --- | --- | --- |
| DIGHT 250 | `username.github.io` | [dight250-starter.zip](/downloads/dight250-starter.zip) |
| DIGHT 340 | `dight340-exercises` (you'll rename it today) | [dight340-starter.zip](/downloads/dight340-starter.zip) |

Unzip it. On a Mac, double-click it; on Windows, right-click → **Extract All**. You get one folder, `dight250-starter` or `dight340-starter`.

## Step 2: Add the kit to your repo in VS Code

Drag the whole `dight250-starter` (or `dight340-starter`) folder from Finder or File Explorer **into VS Code's Explorer sidebar**, and drop it on the empty space below your files, so it lands at the top level of your repo.

> **Use VS Code, not Finder.** The kit has folders whose names start with a dot (`.github` in 250, `.claude` in 340). On a Mac, Finder hides these, so copying files out of the folder one by one in Finder loses them. Dragging the whole folder into VS Code keeps everything.

You should now see `dight250-starter/` (or `dight340-starter/`) in your repo. The agent moves the files to the right place in its first step.

## Step 3: Start the agent

### DIGHT 250: Copilot Chat

1. Open the Chat view.
2. In the mode menu at the bottom of the chat box, choose **Agent**. Agent mode can create and move files; Ask mode can't.
3. Copy the [Start prompt for DIGHT 250](/prompts/start-250) and paste it into the chat. Send it.

You paste the Start prompt because you only run it once, before the kit is in place. After the agent's first step, the kit's skills are in place, so from then on you can type `/dig-deeper` or `/check` instead of pasting those prompts.

### DIGHT 340: the Claude desktop app

1. In the Claude desktop app, open the **Code** tab and start a new session.
2. Choose your repo folder (`dight340-exercises`) itself, not the folder it's in.
3. Copy the [Start prompt for DIGHT 340](/prompts/start-340) and paste it in. Send it.

After the agent's first step, type `/` and check that `dig-deeper` and `check` are listed. You don't need to restart: the app picks up the skills straight away, and `AGENTS.md` and the Learning output style load on their own from your next session.

**Using the terminal or the VS Code extension instead?** After the agent's first step, restart Claude Code once so it reads `AGENTS.md`, the skills, and the settings. In the terminal, type `/exit`, then `claude --continue` to come back to the same conversation. In the VS Code extension, open a new Claude tab and resume the conversation from the session history.

## Step 4: Work through the steps

The agent does one step, tells you what to check, and waits. Each reply starts with a bold line, like **Step 3 of 9 · Move old work into `archive/`**, so you always know where you are. For each step:

1. **Read what it proposes before you agree.** Especially file moves: does every old project end up in `archive/`?
2. **Check it.** Look in the Explorer. Open the file it changed. Ask "why?" whenever you're unsure.
3. **Say "next"** only when you could explain that step to someone else.

Things the agent will ask you for:

- **The name shown on your hub.** Your repo is public, so a pseudonym or first name only is fine.
- **Your GitHub username.**
- **Your NOTES.md.** The agent gives you a question for each section, but you write it. It won't write it for you (that's in `AGENTS.md`).

**DIGHT 250:** you type the `git` commands yourself. The agent shows you what to type and explains it.
**DIGHT 340:** you rename the repo on github.com yourself (Settings → General). The agent runs the `git` commands after showing you each one.

## Step 5: Check your work

You're done when all of these are true:

- [ ] Your live site shows the new hub.
  - **250:** `https://<username>.github.io/`
  - **340:** `https://<username>.github.io/dight340/`
- [ ] Every link on the hub works, including your archived projects.
- [ ] **250:** the hub passes the [W3C validator](https://validator.w3.org/nu/) (use "Check by address"). **340:** the browser console shows no errors.
- [ ] You can reach every link on the hub using only the Tab key, and you can see where you are.
- [ ] `sparks/s01-repo-restructure/NOTES.md` has every section filled in, in your own words.
- [ ] `git status` says "nothing to commit," and both commits are on GitHub (check the repo's commit history).

Before you finish, run `/check sparks/s01-repo-restructure` (or paste the [Check prompt](/prompts/check)). It points out gaps and doesn't fill them.

## Submitting

Nothing to submit in Learning Suite: Sparks are graded straight from your repo. Complete means the folder exists, its `NOTES.md` covers every section, and the live page loads.

**Reworking an old assignment before Oct 28?** Your old pages moved, so their links changed.

- **250:** `…github.io/cartoon/` is now `…github.io/archive/cartoon/`.
- **340:** the repo rename changed every link: `…github.io/dight340-exercises/ex03/` is now `…github.io/dight340/archive/ex03/`.

Resubmit the new link in that assignment in Learning Suite. A resubmission today just means "new URL." Say so in the comment if it's also rework ready for grading.

## If something goes wrong

**The agent does several steps at once.**
Tell it: "Stop. Undo that last step, then do one step at a time and wait for me." If files moved and you're unsure what happened, don't commit. `git status` shows every change, and the instructor can help you undo it.

**The agent wants to delete something.**
Say no. Old work moves to `archive/`; nothing is deleted except the empty kit folder and `starter/index.html` after it's copied.

**The agent says the kit is missing.**
Check that the `dight250-starter/` (or `dight340-starter/`) folder is inside your repo in VS Code's Explorer, not next to it. If you copied files in Finder, delete what you copied and drag the whole folder in again.

**The live site still shows the old page.**
GitHub Pages can take a few minutes after a push. Check the **Actions** tab in your repo for a green check, then refresh with Shift held down.

**Old pages in `archive/` look broken (no styles or images).**
A path didn't survive the move. Ask the agent: "Check every link and src in archive/ and tell me which ones point to files that don't exist." Fix them together, then commit again.

**Copilot says you've hit a limit.**
Tell the instructor. You can finish the remaining steps by hand: the steps above say what each one should do.

**DIGHT 250: `/dig-deeper` or `/check` doesn't appear when you type `/`.**
Check that VS Code has your repo folder itself open (not a folder above it), and that `.github/skills/` is at the top level. Until it's fixed, paste the [Dig deeper](/prompts/dig-deeper) or [Check](/prompts/check) prompt instead; they're the same text.

**DIGHT 250: Copilot says it "couldn't load" the skill, but keeps going.**
That's fine. It already has the skill's instructions and is following them. To avoid it, name the folder: `/check sparks/s01-repo-restructure`, not just `/check`.

**DIGHT 340: `/dig-deeper` or `/check` doesn't appear when you type `/`.**
Check that the session is open on your repo folder itself (not a folder above it), and that `.claude/skills/` is at the top level. If it still doesn't appear, start a new session on the repo folder. Until it's fixed, paste the [Dig deeper](/prompts/dig-deeper) or [Check](/prompts/check) prompt instead; they're the same text.

**DIGHT 340: Claude doesn't seem to know the course rules, or the Learning style is off.**
Both load when a session starts, so start a new session on your repo folder. To check, ask: "Without opening any files: which libraries are off-limits in this repo?" If it has to open a file to answer, check that there's no `CLAUDE.md` in the repo (Claude Code reads a `CLAUDE.md` *instead of* `AGENTS.md`). In the terminal, also check your version (`claude --version`, needs 2.1.277 or later).

**DIGHT 340: Claude isn't working, or you hit your usage limit.**
Switch to Copilot Chat: open the Chat view, choose **Agent** mode, paste the **340** Start prompt, and tell it which step you'd reached. It reads the same `AGENTS.md`.

## Why we're doing it this way

You could reorganize a repo by hand in ten minutes. The point of Spark 0 is to practice the loop you'll use all term with an agent that does the typing: **read what it proposes, check it, and be able to explain it.** If you said "next" without knowing what happened, that's the habit to break now, while the stakes are low.
