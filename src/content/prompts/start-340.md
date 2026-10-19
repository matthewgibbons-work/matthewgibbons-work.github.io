You're running Spark 0 for DIGHT 340: renaming my `dight340-exercises` repo to `dight340` and restructuring it for the new course system. Follow `AGENTS.md` throughout.

How to run this:

- Start every reply with a status line in bold that shows where we are, using the step's heading from below, like **Step 4 of 10 · Move old work into `archive/`**. Keep it there when you're answering a question in the middle of a step.
- Do one step at a time. At the end of each step, tell me what you did and what I should check, then end with: "Ask me anything about this step, or say *next*." **Stop and wait.** If I ask a question, answer it briefly, then wait again. Don't start the next step until I say "next".
- Explain each step in plain language.
- Show me any file moves before you make them. Never delete my old work; it all moves to `archive/`.
- I commit and push myself, in GitHub Desktop. Don't run `git` commands that change the repo (`add`, `commit`, `push`, and so on). When it's time to commit, tell me what to check in Desktop's **Changes** tab and suggest a commit message.
- Don't leave parts of the work for me to write as code (no `TODO(human)` markers) during this Spark. The parts I write are in `NOTES.md`.

## Step 1: Check the kit and the agent setup

The repo root should have `AGENTS.md`, `.claude/settings.json`, `.claude/skills/` (with `dig-deeper/` and `check/`, each holding a `SKILL.md`), and `starter/` (with `index.html` and `NOTES.md`).

- If they're inside a subfolder (for example `dight340-starter/`), show me the moves to bring them to the root, then make them once I agree, and remove the empty subfolder.
- If anything is missing, stop and tell me to download the starter kit again from the course site.
- Check there's no `CLAUDE.md` or `CLAUDE.local.md` in this repo. If there is one, Claude Code reads it *instead of* `AGENTS.md`, so tell me and we'll decide what to do with it.
- Then tell me what to do next, depending on where I'm running you:
  - **Claude desktop app (Code tab):** no restart. The app picks up the skills straight away, so tell me to type `/` and check that `dig-deeper` and `check` are listed. It loads `AGENTS.md` and the Learning output style only when a session starts, so read `AGENTS.md` now and follow it for the rest of this session; from my next session, both load on their own. Don't tell me to restart or open a new session.
  - **Terminal:** tell me to restart Claude Code, because it reads `AGENTS.md`, `.claude/settings.json`, and the skills only when it starts: `/exit`, then `claude --continue` to come back to this conversation. Then tell me to run `claude --version` (it needs to be 2.1.277 or later to read `AGENTS.md`), `/context` to see that `AGENTS.md` is loaded, and type `/` to see `dig-deeper` and `check`.
  - **VS Code extension:** tell me to restart by opening a new Claude tab and resuming this conversation from the session history, then type `/` to see the two skills.
  - **Copilot:** tell me to check that **Chat: Open Customizations** (in the Command Palette) lists `AGENTS.md`.

## Step 2: Rename the repo

I do this part on github.com, not you. Tell me how:

1. Open the repo on GitHub → **Settings** → **General** → rename `dight340-exercises` to `dight340`.
2. In GitHub Desktop, point my local repo at the new name: **Repository → Repository Settings → Remote**, and change the URL to `https://github.com/<username>/dight340.git` (fill in my username). Then click **Fetch origin** to check it connects.

Explain what changes:

- **Repo URLs:** GitHub redirects the old repo URLs to the new name.
- **Pages URL:** this one changes to `https://<username>.github.io/dight340/`, and the old Pages URL stops working. Any links I've already submitted that point to the old Pages URL will break. (We'll cover resubmitting at the end.)
- **Local folder:** my local folder can keep its old name. Renaming it is optional.

## Step 3: Look at what's here

List the files and folders at the repo root, and say what each one seems to be (for example: "`ex03/` — your array-methods exercise", or "`party.js` — Pokémon party practice"). Then propose the plan:

- **Stays at the root:** `.git/`, `.github/`, `.claude/`, `AGENTS.md`, `starter/`, `.gitignore`, and `README.md` if it exists.
- **Moves to `archive/`:** everything else, including all `ex0N/` folders, loose practice files like `party.js`, and my current `index.html` if there is one (it becomes `archive/index.html`).

Explain why moving everything together keeps my old pages working: the relative paths between them still point to the same places. Don't touch my `dight340-reflections` repo; reflections move into this repo later in the term.

## Step 4: Move old work into `archive/`

Once I agree, create `archive/` and move everything into it. Then check every relative link, `src`, and `import` path in the archived files, and say whether each one still points to a file that exists. Fix only paths that broke, and tell me each fix.

Then have me commit this step on its own in GitHub Desktop (no push yet), with a summary like "Move old work into archive/". Tell me what I'll see in the **Changes** tab: each moved file may show up twice, once as deleted and once as new. That's normal; Git matches them up as moves, so each file keeps its history. Explain why the move gets its own commit: the history shows it clearly as moves, and it's a safe point to come back to if a later step goes wrong. Wait until I tell you it's committed.

## Step 5: Create the new structure

Create `sparks/s01-repo-restructure/`. Explain the plan for the other folders: `sparks/` gets one folder per Spark, `prototypes/` starts with P1 on Oct 26, and `release/` becomes an Astro site from Nov 23. Git doesn't track empty folders, so we'll create those when we need them.

## Step 6: Build the new hub

Copy `starter/index.html` to the root as `index.html`, then delete `starter/index.html` (keep `starter/NOTES.md`; it's the template for every assignment). Ask me for:

- the name I want shown (a pseudonym is fine; the repo is public), and
- my GitHub username.

Fill those in, replace `your-username/your-repo` with `<username>/dight340`, and add:

- **Sparks:** S01 · Repo restructure, linking to the folder on github.com (it has no page of its own).
- **Archive:** a link to each archived exercise that has a page, plus `archive/` if it has an `index.html`.

Remove the commented-out examples once the real links are in. Keep it plain HTML and CSS, with no JavaScript; the hub doesn't need any.

## Step 7: Start my first NOTES.md

Copy `starter/NOTES.md` to `sparks/s01-repo-restructure/NOTES.md` and replace `<assignment name>` with "S01 · Repo restructure". **Don't write any of the sections.** Tell me what each section is for, and ask me one question to get me started on each. Wait while I write them.

## Step 8: Commit and push

Have me commit in GitHub Desktop, and suggest a meaningful summary (for example: "Add starter kit, new hub, and S01 notes"). Tell me to check that every changed file in the **Changes** tab is ticked, including the kit files from Step 1 (`AGENTS.md`, `.claude/`, and `starter/`), which aren't committed yet. Then have me click **Push origin**, and explain that it sends both commits (this one and the archive commit) to GitHub. Wait until I tell you it's pushed. Then run `git status` and confirm nothing is left to commit.

## Step 9: Verify it's live

Tell me how to check, in this order:

1. `https://<username>.github.io/dight340/` loads the new hub. It can take a minute or two after the push. If it doesn't, check **Settings → Pages** in the renamed repo.
2. Every hub link works, including the archived exercises.
3. On each page I open, the browser console shows no errors.
4. I can reach every link using only the Tab key, and I can see where the focus is.

If something fails, help me find out why before fixing it.

## Step 10: Wrap up

Summarize what we did in 3–4 sentences. Point out that my old exercises now live at `https://<username>.github.io/dight340/archive/…`, so if I'm reworking any old assignment before Oct 28, I need to resubmit its new link in Learning Suite. Remind me that my `NOTES.md` has to cover every section for this Spark to count as Complete, and that I can run `/check` before I'm done. Mention that this repo's `.claude/settings.json` turns on the **Learning** output style, so from the next session Claude will sometimes leave a small piece of code for me to write (marked `TODO(human)`). Suggest one thing to dig into, with a link, such as how Git tracks moved files, what a remote is, or how GitHub Pages builds project-site URLs.
