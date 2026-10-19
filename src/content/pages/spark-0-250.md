---
title: "Spark 0: Set up your repo"
description: "Download the starter kit, add it to your repo, and let the agent walk you through the new layout."
courses: [dight250]
session: 1
date: 2026-10-19
due: 2026-10-21
---

# Spark 0: Set up your repo

Today you'll reorganize your course repo for the new system. You won't do it alone: an AI agent walks you through it one step at a time and stops so you can check each step. Your job is to read what it proposes, check it, and say "next" only when you understand what happened.

**Time:** about 45 minutes in studio, in five parts. **Due:** before class on Wed Oct 21.

**Why do it this way?** You could reorganize a repo by hand in ten minutes. The point of Spark 0 is to practice the loop you'll use all term with an agent that does the typing: **read what it proposes, check it, and be able to explain it.** If you said "next" without knowing what happened, that's the habit to break now, while the stakes are low.

At the end you'll have:

- all your earlier work safe in an `archive/` folder, still live on GitHub Pages
- a new hub page with sections for Sparks, Prototypes, Release, and Archive
- your first `NOTES.md`, written by you: five short sections, about 10 minutes of writing in Part D ([what goes in each section](/notes/))
- two commits, pushed, each with a message that says what changed: one for the move into `archive/`, one for the new hub and notes

## Before you start

- [ ] Your laptop, with VS Code open.
- [ ] [GitHub Desktop](https://desktop.github.com/) installed and signed in with the GitHub account you push with, and your course repo added to it (**File → Add Local Repository**, or **Clone Repository** if it isn't on this laptop yet).
- [ ] Nothing waiting to be committed: GitHub Desktop's **Changes** tab says "No local changes." If it doesn't, commit or ask for help first.
- [ ] The latest version: click **Fetch origin**, then **Pull origin** if it appears.
- [ ] **GitHub Copilot Free** set up on the GitHub account you already push with. It's free and needs no payment details. In VS Code, click the Copilot icon in the Status Bar (bottom of the window), choose to sign in, and sign in with that GitHub account. If the account has no Copilot plan yet, VS Code sets up Copilot Free for you. (You can also turn it on at [github.com/settings/copilot](https://github.com/settings/copilot).)
- [ ] The **GitHub Copilot Chat** extension installed in VS Code. Signing in usually adds it; if not, find it in the Extensions view (search "GitHub Copilot Chat").
- [ ] Copilot Chat responding. Open the Chat view and type "hi." If it answers, you're ready.

## Part A of E · Download the starter kit (about 3 min)

**[Download dight250-starter.zip](/downloads/dight250-starter.zip)** (8 KB). It goes in your `username.github.io` repo.

Unzip it. On a Mac, double-click it; on Windows, right-click → **Extract All**. You get one folder, `dight250-starter`.

## Part B of E · Add the kit to your repo in VS Code (about 2 min)

Drag the whole `dight250-starter` folder from Finder or File Explorer **into VS Code's Explorer sidebar**, and drop it on the empty space below your files, so it lands at the top level of your repo.

> **Use VS Code, not Finder.** The kit has a folder whose name starts with a dot (`.github`). On a Mac, Finder hides it, so copying files out of the folder one by one in Finder loses it. Dragging the whole folder into VS Code keeps everything.

You should now see `dight250-starter/` in your repo. The agent moves the files to the right place in its first step.

## Part C of E · Start the agent (about 5 min)

1. In VS Code, open the Chat view.
2. In the mode menu at the bottom of the chat box, choose **Agent**. Agent mode can create and move files; Ask mode can't.
3. Copy the Start prompt below, paste it into the chat, and send it.

<!-- prompt:start -->

After the agent's first step, type `/` in the chat and check that `dig-deeper` and `check` are listed. Those are the course's skills, and you'll use them all term.

## Part D of E · Work through the agent's steps (about 25 min)

The agent does one step, tells you what to check, and waits. Each reply starts with a bold line, like **Step 3 of 9 · Move old work into `archive/`**, so you always know where you are. Those are the agent's steps, inside this part. For each one:

1. **Read what it proposes before you agree.** Especially file moves: does every old project end up in `archive/`?
2. **Check it.** Look in the Explorer. Open the file it changed. Ask "why?" whenever you're unsure.
3. **Say "next"** only when you could explain that step to someone else.

Things the agent will ask you for:

- **The name shown on your hub.** Your repo is public, so a pseudonym or first name only is fine.
- **Your GitHub username.**
- **Your NOTES.md.** The agent gives you a question for each section, but you write every section yourself. It won't write any of it for you (that's in `AGENTS.md`).

You commit and push in GitHub Desktop. The agent tells you what to check in the **Changes** tab and suggests a commit summary.

## Part E of E · Check your work (about 10 min)

- [ ] Your live site shows the new hub at
  `https://<username>.github.io/`.
- [ ] Every link on the hub works, including your archived projects.
- [ ] The hub passes the [W3C validator](https://validator.w3.org/nu/) (use "Check by address").
- [ ] You can reach every link on the hub using only the Tab key, and you can see where you are.
- [ ] `sparks/s01-repo-restructure/NOTES.md` has every section filled in, in your own words.
- [ ] GitHub Desktop says "No local changes," both commits are in its **History** tab, and there's nothing left to push.

Then run [`/check`](/250/skills/check/) on the folder: `/check sparks/s01-repo-restructure`. It points out gaps and doesn't fill them.

## You're done

When every box in Part E is true, Spark 0 is complete. There's nothing to submit in Learning Suite: Sparks are graded straight from your repo. Complete means the folder exists, its `NOTES.md` covers every section, and the live page loads.

**Reworking an old assignment before Oct 28?** Your old pages moved, so their links changed.
`…github.io/cartoon/` is now `…github.io/archive/cartoon/`.
Resubmit the new link in that assignment in Learning Suite. A resubmission now just means "new URL." Say so in the comment if it's also rework ready for grading.

**Next:** back to [your course page](/250/) for what's coming this term.

## If something goes wrong

### Starting the agent (Part C)

<details>
<summary>The agent says the kit is missing.</summary>

Check that the `dight250-starter/` folder is inside your repo in VS Code's Explorer, not next to it. If you copied files in Finder, delete what you copied and drag the whole folder in again.

</details>

<details>
<summary><code>/dig-deeper</code> or <code>/check</code> doesn't appear when you type <code>/</code>.</summary>

Check that VS Code has your repo folder itself open (not a folder above it), and that `.github/skills/` is at the top level.
If they're still missing, ask the instructor.

</details>

### While the agent works (Part D)

<details>
<summary>The agent does several steps at once.</summary>

Tell it: "Stop. Undo that last step, then do one step at a time and wait for me." If files moved and you're unsure what happened, don't commit. GitHub Desktop's **Changes** tab shows every change, and the instructor can help you undo it.

</details>

<details>
<summary>The agent wants to delete something.</summary>

Say no. Old work moves to `archive/`; nothing is deleted except the empty kit folder and `starter/index.html` after it's copied.

</details>

<details>
<summary>Copilot says you've hit a limit.</summary>

Tell the instructor. You can finish the remaining steps by hand: the Start prompt says what each step should do.

</details>

### After you push (Part E)

<details>
<summary>The live site still shows the old page.</summary>

GitHub Pages can take a few minutes after a push. Check the **Actions** tab in your repo for a green check, then refresh with Shift held down.

</details>

<details>
<summary>Old pages in <code>archive/</code> look broken (no styles or images).</summary>

A path didn't survive the move. Ask the agent: "Check every link and src in archive/ and tell me which ones point to files that don't exist." Fix them together, then commit again.

</details>

<details>
<summary>Copilot says it "couldn't load" the skill, but keeps going.</summary>

That's fine. It already has the skill's instructions and is following them. To avoid it, name the folder: `/check sparks/s01-repo-restructure`, not just `/check`.

</details>
