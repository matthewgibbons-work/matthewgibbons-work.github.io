---
title: "Modules, npm, Vite, and Vitest"
description: "Split your code into modules that say what they share, bring in tools with npm, run and build with Vite, and test your logic with Vitest."
courses: [dight340]
ready: false # true once the S05 dry run passes, with the S05 brief (PLAN.md: Build order)
session: 5
prototype: P2
date: 2026-11-02
---

# Modules, npm, Vite, and Vitest

**The big idea:** real projects are many small files and a few tools. Each file says what it shares, a build tool joins them up, and tests check the logic before anyone opens the page.

## In short

A module is a JavaScript file that says what it shares (`export`) and takes what it needs (`import`); npm brings in tools, Vite runs and builds the project, and Vitest checks the logic. For S05 you need a Vite project with your party's rules in `party.js` (plain functions, no DOM) and at least three tests, a `main.js` that imports the rules and draws the page, and the Nov 2 kit update, which adds feedback checks on every push.

## How it works

**Modules.** A module has its own scope: nothing in it is visible to other files unless it says `export`. That lets you split the party into **logic** (`party.js`: functions that take data and return data), **the page** (`main.js`: finds elements, listens, renders), and **tests**. Browsers load modules with `<script type="module">`, which is deferred automatically, but only from a web server, never from a file opened in Finder.

**npm.** A project's `package.json` lists the tools it needs (`devDependencies` for tools you only use while building) and the commands it runs (`scripts`). `npm install` downloads them into `node_modules/`, which is never committed: anyone can recreate it from `package.json` and `package-lock.json`.

**Vite and Vitest.** `npm run dev` starts a local server that reloads as you save. `npm run build` bundles everything into `dist/`, and `base: './'` in `vite.config.js` makes its paths relative, so it works in a subfolder on GitHub Pages. Vitest runs tests: small functions that call your code and `expect` a result. A test is only worth having if it can fail, so break the code once and watch it go red.

**The kit update.** Your repo gets **feedback CI**: on every push, GitHub runs ESLint (the course's `const`/`let` and `===` rules) and your tests, and marks the commit green or red. It reports; it never blocks. Claude Code gets a **scope-guard hook**, a script that runs before every command and stops an `npm install` of React, jQuery, or Tailwind. `AGENTS.md` *asks* the agent to stay in scope; the hook *enforces* it.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 210" role="img" aria-labelledby="mod-wide-title">
<title id="mod-wide-title">party.js holds the logic and exports it. main.js imports it and draws the page; npm run build turns that into the dist folder. party.test.js imports the same functions and checks them; vitest run reports whether the tests pass.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-key" x="10" y="77" width="150" height="56" rx="6" />
<text class="d-code" x="85" y="101" text-anchor="middle">party.js</text>
<text class="d-muted" x="85" y="121" text-anchor="middle">logic, exported</text>
<line class="d-line" x1="160" y1="96" x2="238" y2="52" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="160" y1="114" x2="238" y2="158" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="196" y="110" text-anchor="middle">import</text>
<rect class="d-box" x="240" y="22" width="170" height="56" rx="6" />
<text class="d-code" x="325" y="46" text-anchor="middle">main.js</text>
<text class="d-muted" x="325" y="66" text-anchor="middle">draws the page</text>
<rect class="d-box" x="240" y="132" width="170" height="56" rx="6" />
<text class="d-code" x="325" y="156" text-anchor="middle">party.test.js</text>
<text class="d-muted" x="325" y="176" text-anchor="middle">checks the logic</text>
<line class="d-line" x1="410" y1="50" x2="466" y2="50" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="410" y1="160" x2="466" y2="160" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="468" y="22" width="162" height="56" rx="6" />
<text class="d-code" x="549" y="46" text-anchor="middle">dist/</text>
<text class="d-muted d-code" x="549" y="66" text-anchor="middle">npm run build</text>
<rect class="d-box" x="468" y="132" width="162" height="56" rx="6" />
<text x="549" y="156" text-anchor="middle">pass or fail</text>
<text class="d-muted d-code" x="549" y="176" text-anchor="middle">vitest run</text>
</svg>
<svg class="d-narrow" viewBox="0 0 300 290" role="img" aria-labelledby="mod-narrow-title">
<title id="mod-narrow-title">party.js holds the logic and exports it. main.js imports it and draws the page; npm run build turns that into the dist folder. party.test.js imports the same functions and checks them; vitest run reports whether the tests pass.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-key" x="75" y="4" width="150" height="56" rx="6" />
<text class="d-code" x="150" y="28" text-anchor="middle">party.js</text>
<text class="d-muted" x="150" y="48" text-anchor="middle">logic, exported</text>
<line class="d-line" x1="120" y1="60" x2="80" y2="106" marker-end="url(#arrow-narrow)" />
<line class="d-line" x1="180" y1="60" x2="220" y2="106" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="150" y="94" text-anchor="middle">import</text>
<rect class="d-box" x="4" y="108" width="140" height="56" rx="6" />
<text class="d-code" x="74" y="132" text-anchor="middle">main.js</text>
<text class="d-muted" x="74" y="152" text-anchor="middle">draws the page</text>
<rect class="d-box" x="156" y="108" width="140" height="56" rx="6" />
<text class="d-code" x="226" y="132" text-anchor="middle">party.test.js</text>
<text class="d-muted" x="226" y="152" text-anchor="middle">checks it</text>
<line class="d-line" x1="74" y1="164" x2="74" y2="208" marker-end="url(#arrow-narrow)" />
<line class="d-line" x1="226" y1="164" x2="226" y2="208" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="210" width="140" height="56" rx="6" />
<text class="d-code" x="74" y="234" text-anchor="middle">dist/</text>
<text class="d-muted d-code" x="74" y="254" text-anchor="middle">npm run build</text>
<rect class="d-box" x="156" y="210" width="140" height="56" rx="6" />
<text x="226" y="234" text-anchor="middle">pass or fail</text>
<text class="d-muted d-code" x="226" y="254" text-anchor="middle">vitest run</text>
</svg>
<figcaption>One module of logic, used twice: the page imports it to draw the party, and the tests import it to check it. Vite builds the page into <code>dist/</code>; Vitest runs the tests. CI runs the tests again on every push.</figcaption>
</figure>

## Predict, then reveal

```html
<script type="module" src="main.js"></script>
```

<details>
<summary>You double-click this page's <code>index.html</code> in Finder. <code>main.js</code> has one line, <code>import { addMember } from './party.js';</code>. What happens?</summary>

Nothing runs. The console shows a CORS error about the origin `null`: a page opened from a file has no web address, and browsers only load modules from a server. That's one reason for Vite: `npm run dev` serves the folder at a `localhost` address, and `npm run build` makes plain files that GitHub Pages can serve. (It's also why the Async try-it pages asked for `defer` instead.)

</details>

<details>
<summary><code>npm run dev</code> shows the party perfectly. You build and push without <code>base: './'</code> in <code>vite.config.js</code>. What does the live page show?</summary>

A blank page, and 404s in the console. Without `base: './'`, the built `index.html` loads its script from `/assets/…`, the root of the whole `github.io` site, not your project's folder. The dev server never shows this, because it serves your folder at the root. Open `dist/index.html` in a text editor after every build: the paths should start with `./`.

</details>

## Try it together

**First, the kit update** (once, about 3 minutes). Download [`dight340-update-nov02.zip`](/downloads/dight340-update-nov02.zip) and double-click it, so it unzips into your Downloads folder. Then, in your `dight340` session:

```text
My instructor asked me to update the course kit. Copy everything in ~/Downloads/dight340-update-nov02/ into the root of this repo, replacing what's there, including the hidden .claude, .github, and .gitignore. Then show me git status.
```

Commit it in GitHub Desktop ("Update course kit for Nov 2"), and push. Then start a **new** session in the Desktop app, so the hook loads, and ask Claude to `npm install jquery`. What happens?

**Then pair programming,** with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S05.

We start here, in plan mode:

```text
In try/s05/, set up a Vite project (vanilla JavaScript, no framework) with Vitest. Copy the party data from sparks/s02-render-party into a party.js module with an addMember function that won't add a seventh Pokémon, and write tests for it.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Run it.** `npm run dev` in `try/s05/`, and open the `localhost` address. Does the party show, with a clean console?
- **Break it.** Run `npx vitest run`: green? Now change the 6 in `addMember` to 7 and run it again. Does a test go red?
- **Build it.** Run `npm run build`, and open `dist/index.html` in a text editor. Do the `src` paths start with `./`?
- **Look at what's committed.** In GitHub Desktop's Changes tab, does anything from `node_modules/` appear?

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on one `expect(…)` line in the test file. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, do the kit update above, run the starting prompt in a new session, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S05, out loud or to Claude:

- Which file holds the party's rules, and does it ever touch `document`?
- Change the rule (6 to 7). Which test goes red? If none does, what are the tests actually checking?
- In `dist/index.html`, where do the script paths point, and which line of `vite.config.js` decides that?
- What's in `package.json`'s `devDependencies`, and why are they there and not in `dependencies`?
- What stopped `npm install jquery`, and which file holds that rule?

**Watch for:** no `base: './'` (the dev server works and the live page is blank); tests that can't fail, because they only check that `addMember` returns something or copy its logic; the template's leftovers (a counter button, logos, a `/icons.svg` link that breaks on GitHub Pages); `party.js` reaching into `document`. If the scope guard didn't stop `npm install jquery`, your session started before the kit update: open a new one.

</details>

## Links

- MDN: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type#module)
- npm: [About `package.json`](https://docs.npmjs.com/cli/configuring-npm/package-json), [`npm install`](https://docs.npmjs.com/cli/commands/npm-install)
- Vite: [Getting started](https://vite.dev/guide/), [`base`](https://vite.dev/config/shared-options#base), [Deploying a static site](https://vite.dev/guide/static-deploy)
- Vitest: [Getting started](https://vitest.dev/guide/), [`expect`](https://vitest.dev/api/expect)
- ESLint: [`no-var`](https://eslint.org/docs/latest/rules/no-var), [`prefer-const`](https://eslint.org/docs/latest/rules/prefer-const), [`eqeqeq`](https://eslint.org/docs/latest/rules/eqeqeq)
- Claude Code: [Hooks](https://code.claude.com/docs/en/hooks), the feature behind the scope guard
