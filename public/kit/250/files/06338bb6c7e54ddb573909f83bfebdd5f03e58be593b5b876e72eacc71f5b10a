---
name: update-kit
description: "Updates the course kit files to the newest version on the course site; says what will change first"
disable-model-invocation: true
---

Update this repo's course kit: the files the instructor owns (`AGENTS.md`, `.gitignore`, `.github/`, and `.course-kit-version`) to the newest version on the course site. My running this skill is my asking for it, so the `AGENTS.md` rule about kit files allows these changes. Change nothing else.

Use the terminal, one command at a time. The commands are for macOS; on Windows (PowerShell) use the one in [brackets]. Kit site: `https://matthewgibbons-work.github.io/kit/250/`.

1. **Read the manifest:** `curl -fsSL https://matthewgibbons-work.github.io/kit/250/manifest.json` [`(Invoke-WebRequest https://matthewgibbons-work.github.io/kit/250/manifest.json -UseBasicParsing).Content`]. `versions` lists every kit version, oldest first; each has a `version` date, `files` (path → SHA-256), and `notes`. `known` lists, for each path, every SHA-256 the course has ever shipped.
2. **Pick the target:** the newest version whose date is today or earlier (`date +%F` [`Get-Date -Format yyyy-MM-dd`]). My version is in `.course-kit-version` (none if the file is missing). If mine is the target, tell me "The course kit is up to date (<version>)" and stop.
3. **Compare, changing nothing yet.** For each path in the target's `files`:
   - missing from my repo → **add**
   - otherwise hash it: `shasum -a 256 <path>` [`(Get-FileHash <path>).Hash.ToLower()`]. The target's hash, or the target's hash is the same as in my version's `files` (the course didn't change it, so my copy stays) → **unchanged**. In `known` for that path → **replace** (I haven't edited it). Anything else → **edited by me**, unless the only difference is Windows line endings, which counts as not edited.
   - Each path in my version's `files` (or in `known`, if I have no version) that the target's `files` doesn't list, and that exists in my repo → **remove**, or **edited by me** if its hash isn't in `known`.
4. **Before you change anything,** tell me the plan: "Course kit <mine> → <target>", then each file to add, replace, and remove, how many are unchanged, and the target's `notes`.
5. If any file is **edited by me**, ask me about each one: keep mine, take the course's, or show me the difference (download the course's copy to a temporary file outside this repo, compare, and explain the difference in a sentence or two). Wait for my answers. If nothing is edited by me, go straight on.
6. **Apply.** For each add and replace, and each edited file I chose to replace, download `https://matthewgibbons-work.github.io/kit/250/files/<sha256>` to its path: `curl -fsSL <url> --create-dirs -o <path>` [`New-Item -ItemType Directory -Force <folder> | Out-Null; Invoke-WebRequest <url> -OutFile <path> -UseBasicParsing`]. Delete each file to remove (and each edited one I chose to remove). Then write the target version, followed by a newline, to `.course-kit-version`.
7. **Check:** hash each file you wrote; each should match the target's hash. If one doesn't, tell me which.
8. Show me what changed (the files, in a short list), read me the target's `notes`, and tell me what to commit in GitHub Desktop (a summary like "Update course kit for Nov 4"). Don't commit or push.

If the course site can't be reached, say so and stop: I'll try again later or ask my instructor. Don't get kit files any other way.
