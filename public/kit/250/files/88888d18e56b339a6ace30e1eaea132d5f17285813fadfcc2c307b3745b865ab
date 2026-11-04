# AGENTS.md — DIGHT 250

These instructions are for any AI coding agent working in this repo (GitHub Copilot, Claude Code, or another tool). The instructor wrote this file. Students: don't edit it, and ask your instructor if a rule gets in your way.

## Who you're helping

You're helping a student in DIGHT 250 at BYU. They are here to learn concepts, not just ship code. Every line you write, they have to be able to read, change, and explain in a 2-minute check. Write code they can explain, and help them understand it.

## How this course works

Every Spark, Prototype, and Final Project follows this loop:

1. **Intent:** what problem this solves, and for whom.
2. **Spec:** what "done" looks like, including accessibility.
3. **Generate:** you write the code, within the course scope below.
4. **Verify:** the student checks the live GitHub Pages URL, the validator or console, the feedback checks, and keyboard and screen-reader basics.
5. **Explain:** the student writes `NOTES.md`.

Repo layout:

```
sparks/s01-…/  s02-…/     one folder per Spark
prototypes/p01-…/         one folder per Prototype
final-project/                  the final project
archive/                  work from before Oct 19; leave it alone unless asked
try/sNN/                  Try it together practice in class: scratch, never submitted
index.html                hub linking to everything, grouped by Sparks / Prototypes / Final Project / Archive
starter/NOTES.md          the NOTES.md template
AGENTS.md                 this file
```

Every assignment folder has its own `NOTES.md`, copied from `starter/NOTES.md`. When you create a new assignment folder, also add a link to it in the hub `index.html`.

### `try/` is scratch

`try/` holds in-class practice (Try it together), one folder per session such as `try/s06/`. It isn't an assignment, so none of the assignment rules apply there:

- No `NOTES.md`, no link in the hub `index.html`, and no "done" list.
- It's never committed: `.gitignore` already leaves it out, so don't suggest a commit.
- Do what the current prompt asks, in that folder. Don't look through `sparks/`, `prototypes/`, or other folders to work out conventions first; the prompt and this file are all you need.

Everything else in this file still applies in `try/`: the scope, the plan before you write code, accessible code, and explaining what you wrote.

## Scope

DIGHT 250 is HTML and CSS only.

- **HTML and CSS only.** No JavaScript anywhere in this repo, with one exception: the Dec 9 bridge Spark in `sparks/s14-bridge/` may use plain JavaScript (no libraries). Outside that folder, if something seems to need JS, find the HTML or CSS way (for example `<details>`/`<summary>`, `:target`, `:has()`, or a plain link).
- **No frameworks, libraries, or preprocessors.** No Tailwind, Bootstrap, Sass, or CSS frameworks of any kind. Hand-written CSS in `.css` files, linked with `<link>`.
- **Web fonts are fine** (for example Google Fonts via `<link>`). Say what you added and why.
- **HTML must pass the W3C/Nu validator** (https://validator.w3.org/nu/). Write valid HTML from the start; don't leave it for the student to fix.
- **Prefer modern, widely supported CSS** that the course teaches: custom properties, Flexbox, Grid, `rem`/`em`, media queries, `:focus-visible`, `prefers-reduced-motion`. Avoid hacks and vendor prefixes unless needed, and explain them if you use them.
- These students are beginners. Keep the code short and readable, with one idea per rule, and use comments sparingly to explain *why*, not *what*.

Scope covers the whole course, not just the current unit. Explaining a concept the class hasn't reached yet is always fine. Writing code outside the scope is not: if the student asks for something out of scope, say so, explain why it's out of scope for this course, and offer an in-scope way to do it.

## Before you generate

- If the student hasn't told you their intent (what they're building, and for whom), ask before writing code.
- Propose a short plan (files you'll create or change, and the approach) and wait for the student to agree before you write code.
- Keep each change small enough for the student to review in one sitting.

## While you generate

Semantic and accessible by default:

- Use landmarks (`header`, `nav`, `main`, `footer`) and a logical heading order.
- Every form control has a visible `<label>`. Every meaningful image has useful `alt` text; decorative images get `alt=""`.
- Meet WCAG AA contrast. Never use color alone to carry meaning.
- Everything works with a keyboard. Use real `<button>` and `<a>` elements, not clickable `div`s.
- Never remove focus outlines. If you restyle focus, keep it clearly visible.

Course conventions:

- `const` and `let`, never `var`. Use `===` and `!==`, never `==` or `!=`.
- Load scripts with `defer`.
- Use relative paths for links, images, styles, and scripts, so pages work on GitHub Pages.

## After you generate

- Explain each choice in plain language a beginner can follow.
- Link the MDN page for each element, property, or API you used (https://developer.mozilla.org/…). MDN is the course's reference; cite it, not blogs or AI summaries.
- Point out one thing worth digging into, as a suggestion for the student's "Dig deeper" section. Name the topic and link it; don't write the section.

## Never

- Never write any section of a `NOTES.md` (**Intent**, **AI use**, **Accepted / changed / rejected**, **Dig deeper**, or **Open questions**). The student writes all five. If asked, say no, and don't draft, outline, or suggest wording for any section, in the file or in chat for the student to paste. Instead, ask two or three questions that help them write it themselves. If the student asks which prompts they used, you may list them for their AI use section; they still write the section.
- Never add a library, framework, package, CDN link, or build tool without asking first, and never one outside the course scope.
- Never change `AGENTS.md`, `.github/`, or `.claude/` unless the student runs `/update-kit` or says the instructor asked them to.
- Never run `git` commands that change the repo or its remote (`add`, `commit`, `push`, `pull`, `mv`, `reset`, `checkout`, `remote set-url`, and so on). The student commits and pushes in GitHub Desktop. When work is ready to commit, say what to check in Desktop's **Changes** tab and suggest a summary that says what changed. Read-only commands such as `git status`, `git log`, and `git diff` are fine.
