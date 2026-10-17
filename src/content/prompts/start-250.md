You're running Spark 0 for DIGHT 250: restructuring my `username.github.io` repo for the new course system. Follow `AGENTS.md` throughout.

How to run this:

- Start every reply with a status line in bold that shows where we are, using the step's heading from below, like **Step 3 of 9 · Move old work into `archive/`**. Keep it there when you're answering a question in the middle of a step.
- Do one step at a time. At the end of each step, tell me what you did and what I should check, then end with: "Ask me anything about this step, or say *next*." **Stop and wait.** If I ask a question, answer it briefly, then wait again. Don't start the next step until I say "next".
- Explain each step in plain language. I'm a beginner.
- Show me any file moves before you make them. Never delete my old work; it all moves to `archive/`.
- I run the `git` commands myself. Show me exactly what to type and what each command does.
- Don't leave parts of the work for me to write as code (no `TODO(human)` markers) during this Spark. The parts I write are in `NOTES.md`.

## Step 1: Check the kit is in place

The repo root should have `AGENTS.md`, `.github/skills/` (with `dig-deeper/` and `check/`, each holding a `SKILL.md`), and `starter/` (with `index.html` and `NOTES.md`).

- If they're all at the root, say so.
- If they're inside a subfolder (for example `dight250-starter/`), show me the moves to bring them to the root, then make them once I agree, and remove the empty subfolder.
- If anything is missing, stop and tell me to download the starter kit again from the course site.

## Step 2: Look at what's here

List the files and folders at the repo root, and say what each one seems to be (for example: "`cartoon/` — your cartoon page exercise"). Then propose the plan:

- **Stays at the root:** `.git/`, `.github/`, `AGENTS.md`, `starter/`, and `README.md`, `CNAME`, or `.nojekyll` if they exist.
- **Moves to `archive/`:** everything else, including my current `index.html` (it becomes `archive/index.html`), all project folders, shared CSS and image folders, and `ai-notes.md`.

Explain why moving everything together keeps my old pages working: the relative links between them (like `cartoon/` or `../css/style.css`) still point to the same places, because the files keep the same positions relative to each other.

## Step 3: Move old work into `archive/`

Once I agree, show me the commands to create `archive/` and move everything with `git mv`, so Git keeps each file's history, and explain what that means. I'll run them and tell you when they're done. Then have me run `git status` and check that every move shows as renamed. Then check every link and `src` in `archive/index.html` and say whether each one still points to a file that exists. Fix only paths that broke, and tell me each fix.

Then show me the commands to commit this step on its own (no push yet), with a message like "Move old work into archive/". Explain why the move gets its own commit: the history shows it clearly as renames, and it's a safe point to come back to if a later step goes wrong. I'll run them and tell you when they're done.

## Step 4: Create the new structure

Create `sparks/s01-repo-restructure/`. Explain the plan for the other folders: `sparks/` gets one folder per Spark (`s02-…`, `s03-…`), `prototypes/` starts with P1 on Oct 26, and `release/` comes later. Git doesn't track empty folders, so we'll create those when we need them.

## Step 5: Build the new hub

Copy `starter/index.html` to the root as `index.html`, then delete `starter/index.html` (keep `starter/NOTES.md`; it's the template for every assignment). Ask me for:

- the name I want shown (a pseudonym is fine; the repo is public), and
- my GitHub username.

Fill those in, replace `your-username/your-repo` with my real repo, and add:

- **Sparks:** S01 · Repo restructure, linking to the folder on github.com (it has no page of its own).
- **Archive:** a link to `archive/` (my old hub), plus a link to each old project.

Remove the commented-out examples once the real links are in. Then walk me through the file section by section: what each landmark (`header`, `main`, `section`, `footer`) is for, and why each section has a heading. Link MDN for each.

## Step 6: Start my first NOTES.md

Copy `starter/NOTES.md` to `sparks/s01-repo-restructure/NOTES.md` and replace `<assignment name>` with "S01 · Repo restructure". **Don't write any of the sections.** Tell me what each section is for, and ask me one question to get me started on each. Wait while I write them.

## Step 7: Commit and push

Show me the commands to stage, commit, and push, with a meaningful commit message (for example: "Add starter kit, new hub, and S01 notes"). Stage everything new, including the kit files from Step 1 (`AGENTS.md`, `.github/`, and `starter/`), which aren't committed yet. Explain what each command does, and that the push sends both commits (this one and the archive commit) to GitHub. I'll run them and tell you when they're done. Then have me run `git status` and check it says there's nothing to commit.

## Step 8: Verify it's live

Tell me how to check, in this order:

1. My Pages URL (`https://<username>.github.io/`) loads the new hub. It can take a minute or two after the push.
2. Every hub link works, including the archived pages.
3. The hub passes the W3C validator (https://validator.w3.org/nu/): paste the Pages URL into "Check by address."
4. I can reach every link using only the Tab key, and I can see where the focus is.

If something fails, help me find out why before fixing it.

## Step 9: Wrap up

Summarize what we did in 3–4 sentences. Point out that my old pages now live under `/archive/` (for example `https://<username>.github.io/archive/cartoon/`), so if I'm reworking any old assignment before Oct 28, I need to resubmit its new link in Learning Suite. Remind me that my `NOTES.md` has to cover every section for this Spark to count as Complete, and that I can run `/check` (or paste the Check prompt from the course site) before I'm done. Suggest one thing to dig into, with an MDN link, such as `git mv`, relative URLs, or HTML landmarks.
