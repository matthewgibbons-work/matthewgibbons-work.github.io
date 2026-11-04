---
name: update-kit
description: "Updates the course kit files to the newest version on the course site; says what will change first"
disable-model-invocation: true
---

Update this repo's course kit: the files the instructor owns (`AGENTS.md`, `.claude/`, `.github/workflows/`, `.gitignore`, `eslint.config.mjs`, `.course-kit-version`) to the newest version on the course site. My running this skill is my asking for it, so the `AGENTS.md` rule about kit files allows these changes. Change nothing else.

1. Run `node .claude/kit/update.mjs --plan` and read what it prints.
2. If it says the kit is up to date, tell me so in one line and stop.
3. **Before you change anything,** tell me what the update will do, in plain language: the version change, then each file it will add, replace, or remove, and the "After updating" note if there is one.
4. If it lists any file as **edited by you**, ask me about each one: keep mine, take the course's, or show me the difference. To show the difference, run `node .claude/kit/update.mjs --fetch <path>`, then `git diff --no-index -- <path> <the file it printed>`, explain the difference in a sentence or two, and ask again. Wait for my answers. If nothing is edited by me, go straight on.
5. Run `node .claude/kit/update.mjs --apply`, adding `--take <path>` for each edited file I chose to replace. Don't change kit files any other way.
6. Show me `git status`, read me the "After updating" note, and tell me what to commit in GitHub Desktop (a summary like "Update course kit for Nov 23"). Don't commit or push. If `.claude/settings.json` changed, tell me to open a new session so it loads.

If the script can't reach the course site, say so and stop: I'll try again later or ask my instructor. Don't download or copy kit files any other way.
