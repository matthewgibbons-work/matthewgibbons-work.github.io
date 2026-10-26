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

A **module** is a JavaScript file with its own scope: nothing in it is visible to other files unless it says `export`, and other files take what they need with `import`. That lets you split the party into **logic** (`party.js`: plain functions that take data and return data, no DOM), **the page** (`main.js`: finds elements, listens, renders), and **tests**. Browsers load modules with `<script type="module">`, which is deferred automatically, but only from a web server, never from a file opened in Finder.

**npm** installs tools from the npm registry. A project's `package.json` lists what it needs (`devDependencies` for tools you only use while building) and the commands it runs (`scripts`). `npm install` downloads them into `node_modules/`, which can be huge and is never committed: anyone can recreate it from `package.json` and `package-lock.json`.

**Vite** is the build tool. `npm run dev` starts a local server that reloads the page as you save. `npm run build` bundles everything into a `dist/` folder of plain files a browser can load, and `base: './'` in `vite.config.js` makes its paths relative, so it works in a subfolder on GitHub Pages. **Vitest** runs tests: small functions that call your code and `expect` a result. A test is only worth having if it can fail, so break the code once and watch it go red.

Two more things arrive today, and neither is written by the agent. Your repo gets **feedback CI**: on every push, GitHub runs ESLint (the course's `const`/`let` and `===` rules) and your Vitest tests, and marks the commit green or red. It reports; it never blocks. And Claude Code gets a **scope-guard hook**: a small script that runs before every command, and stops an `npm install` of React, jQuery, or Tailwind before it happens. `AGENTS.md` *asks* the agent to stay in scope; the hook *enforces* it. That's how teams put rules on agents.

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

## Try it together

**First, the kit update** (once, about 3 minutes). Download [`dight340-update-nov02.zip`](/downloads/dight340-update-nov02.zip) and double-click it, so it unzips into your Downloads folder. Then, in your `dight340` session:

```text
My instructor asked me to update the course kit. Copy everything in ~/Downloads/dight340-update-nov02/ into the root of this repo, replacing what's there, including the hidden .claude, .github, and .gitignore. Then show me git status.
```

Commit it in GitHub Desktop ("Update course kit for Nov 2"), and push. Then start a **new** session in the Desktop app, so the hook loads, and ask Claude to `npm install jquery`. What happens?

**Then the prompt**, in plan mode, in the new session:

```text
In try/s05/, set up a Vite project (vanilla JavaScript, no framework) with Vitest. Copy the party data from sparks/s02-render-party into a party.js module with an addMember function that won't add a seventh Pokémon, and write tests for it.
```

**How to check it**

- **Run it.** `npm run dev` in `try/s05/` (ask Claude to start it), and open the `localhost` address. Does the party show, with a clean console?
- **Break it.** Run `npx vitest run`: green? Now change the 6 in `addMember` to 7 and run it again. Does a test go red? If nothing fails, the tests don't test the rule.
- **Build it.** Run `npm run build`, and open `dist/index.html` in a text editor. Do the `src` paths start with `./`? If they start with `/`, `vite.config.js` is missing `base: './'`.
- **Look at what's committed.** In GitHub Desktop's Changes tab, does anything from `node_modules/` appear? (It shouldn't: the kit's `.gitignore` keeps it out.)

**Dig deeper:** run [`/dig-deeper`](/340/skills/dig-deeper/) on one `expect(…)` line in the test file, naming the file and line. Be ready to say what would make it fail.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- No `base: './'` in `vite.config.js`. The dev server works perfectly, and the built page is blank on GitHub Pages, because its script is at `/assets/…`, the root of the whole site.
- Tests that can't fail: they check that `addMember` returns *something*, or copy the function's own logic into the test, so breaking the rule leaves them green.
- The project template's leftovers kept: a counter button, logos, and a `public/` icon linked with `/icons.svg`, which breaks under GitHub Pages for the same reason.
- Logic and DOM tangled together, so `party.js` touches `document` and the test needs a browser.

Everything passed on the dev server. We built it and read the paths in `dist/index.html`, then broke the rule on purpose and ran the tests again.

The scope guard stopped `npm install jquery` before it ran, and Claude explained why and suggested `querySelector`. If yours didn't, your session started before the kit update: open a new one.

</details>

## Links

- MDN: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type#module)
- npm: [About `package.json`](https://docs.npmjs.com/cli/configuring-npm/package-json), [`npm install`](https://docs.npmjs.com/cli/commands/npm-install)
- Vite: [Getting started](https://vite.dev/guide/), [`base`](https://vite.dev/config/shared-options#base), [Deploying a static site](https://vite.dev/guide/static-deploy)
- Vitest: [Getting started](https://vitest.dev/guide/), [`expect`](https://vitest.dev/api/expect)
- ESLint: [`no-var`](https://eslint.org/docs/latest/rules/no-var), [`prefer-const`](https://eslint.org/docs/latest/rules/prefer-const), [`eqeqeq`](https://eslint.org/docs/latest/rules/eqeqeq)
- Claude Code: [Hooks](https://code.claude.com/docs/en/hooks), the feature behind the scope guard
