---
title: "Testing and accessibility"
description: "End-to-end tests with Playwright and automated accessibility checks with axe, run on every push."
courses: [dight340]
ready: false # true once the S13 dry run passes, with the S13 brief (PLAN.md: Build order)
session: 13
date: 2026-12-07
---

# Testing and accessibility

**The big idea:** a test is a promise you can rerun. Playwright drives a real browser through your site the way a person would, and axe checks every page for the accessibility failures a machine can find.

## In short

Playwright drives a real browser through your built site the way a person would, finding things by role and name, and axe scans each page for the accessibility failures a machine can find. For S13 you need the Dec 7 kit update, then Playwright tests in your Final Project that check the nav marks the current page, that the main island works from the keyboard, and that axe finds nothing on each kind of page, each one broken once on purpose to prove it can fail.

## How it works

**End-to-end tests.** Vitest checked your logic without a browser. Playwright builds your Final Project, serves it, opens Chromium, and does what a visitor does: go to a page, find a button, press Enter, and `expect` what should happen. Everything from the HTML to the island's JavaScript has to work for a test to pass.

**Find things the way people do.** `page.getByRole('button', { name: 'Add bulbasaur' })` finds a button by its role and accessible name, which is how a screen reader finds it too. If the test can't find your button that way, a screen-reader user probably can't either. Prefer `getByRole` and `getByLabel` to CSS selectors. Keyboard tests use `page.keyboard.press('Tab')` and `'Enter'`. For islands, wait until they've hydrated before you press anything (S12's race).

**axe.** `@axe-core/playwright` scans a page for rule failures a machine can detect: missing labels and alt text, colour contrast, invalid ARIA, duplicate ids, landmarks. One scan per kind of page catches regressions on every push. What axe *can't* judge is meaning: whether alt text is useful, whether two buttons can be told apart, where focus goes after a remove. That's what your keyboard tests and screen-reader pass are for.

**The kit update** adds both to the **Checks** workflow: on every push, it installs Playwright's Chromium on GitHub, runs your tests, and marks the commit red if one fails. It reports; it doesn't block the deploy.

```js
// final-project/playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4321' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Build the site, then serve it the way GitHub Pages will, while the tests run.
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

```js
// final-project/tests/site.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the nav marks the current page', async ({ page }) => {
  await page.goto('/pokedex/');
  await expect(page.getByRole('link', { name: 'Pokédex' })).toHaveAttribute('aria-current', 'page');
});

test('the party picker adds a Pokémon from the keyboard', async ({ page }) => {
  await page.goto('/pokedex/');
  const add = page.getByRole('button', { name: 'Add bulbasaur' });
  await add.scrollIntoViewIfNeeded();
  // An island's HTML arrives first; its JavaScript wakes it up a moment later.
  // Astro removes the island's `ssr` attribute once it has.
  await page.locator('astro-island:not([ssr])').waitFor();
  await add.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Party: bulbasaur');
});

for (const path of ['/', '/pokedex/', '/notes/']) {
  test(`axe finds no violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
```

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 190" role="img" aria-labelledby="pw-wide-title">
<title id="pw-wide-title">npx playwright test starts the web server, which builds and serves the site. Playwright opens Chromium and, for each test, goes to a page, finds elements by role and name, presses keys, and checks expectations. axe scans the same page for rule violations. The results report pass or fail, locally and in the Checks workflow on every push.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="30" width="136" height="60" rx="6" />
<text x="72" y="56" text-anchor="middle">Your tests</text>
<text class="d-muted d-code" x="72" y="76" text-anchor="middle">*.spec.js</text>
<line class="d-line" x1="140" y1="60" x2="166" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="168" y="30" width="136" height="60" rx="6" />
<text x="236" y="56" text-anchor="middle">Web server</text>
<text class="d-muted" x="236" y="76" text-anchor="middle">build, preview</text>
<line class="d-line" x1="304" y1="60" x2="330" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="332" y="30" width="136" height="60" rx="6" />
<text x="400" y="56" text-anchor="middle">Chromium</text>
<text class="d-muted d-code" x="400" y="76" text-anchor="middle">getByRole</text>
<line class="d-line" x1="468" y1="60" x2="494" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="496" y="30" width="136" height="60" rx="6" />
<text x="564" y="56" text-anchor="middle">Pass or fail</text>
<text class="d-muted" x="564" y="76" text-anchor="middle">locally and in CI</text>
<rect class="d-box" x="332" y="120" width="136" height="56" rx="6" />
<text x="400" y="144" text-anchor="middle">axe scan</text>
<text class="d-muted d-code" x="400" y="164" text-anchor="middle">violations: []</text>
<line class="d-line" x1="400" y1="90" x2="400" y2="118" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="468" y1="148" x2="564" y2="148" />
<line class="d-line" x1="564" y1="148" x2="564" y2="92" marker-end="url(#arrow-wide)" />
</svg>
<svg class="d-narrow" viewBox="0 0 262 330" role="img" aria-labelledby="pw-narrow-title">
<title id="pw-narrow-title">npx playwright test starts the web server, which builds and serves the site. Playwright opens Chromium and, for each test, goes to a page, finds elements by role and name, presses keys, and checks expectations. axe scans the same page for rule violations. The results report pass or fail, locally and in the Checks workflow on every push.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="4" width="190" height="56" rx="6" />
<text x="99" y="28" text-anchor="middle">Your tests</text>
<text class="d-muted d-code" x="99" y="48" text-anchor="middle">tests/*.spec.js</text>
<line class="d-line" x1="99" y1="60" x2="99" y2="80" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="82" width="190" height="56" rx="6" />
<text x="99" y="106" text-anchor="middle">Web server</text>
<text class="d-muted d-code" x="99" y="126" text-anchor="middle">build + preview</text>
<line class="d-line" x1="99" y1="138" x2="99" y2="158" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="160" width="190" height="56" rx="6" />
<text x="99" y="184" text-anchor="middle">Chromium + axe</text>
<text class="d-muted d-code" x="99" y="204" text-anchor="middle">getByRole, analyze</text>
<line class="d-line" x1="99" y1="216" x2="99" y2="236" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="238" width="190" height="56" rx="6" />
<text x="99" y="262" text-anchor="middle">Pass or fail</text>
<text class="d-muted" x="99" y="282" text-anchor="middle">locally and in CI</text>
</svg>
<figcaption>One command builds the site, serves it, drives a real browser through it, and asks axe about every page it visits. CI runs the same command on every push.</figcaption>
</figure>

## Predict, then reveal

```html
<li><img src="pikachu.png" alt="sprite"> Pikachu <button>Remove</button></li>
<li><img src="eevee.png" alt="sprite"> Eevee <button>Remove</button></li>
```

<details>
<summary>axe scans a page with this list (plus a heading, landmarks, and a title) and reports zero violations. Is the list accessible?</summary>

No. Every image has *an* alt, and every button has *a* name, so the rules pass. But a screen reader hears "sprite, image" twice and "Remove, button" twice, with no way to tell which Pokémon either one is about. axe checks that things exist and are well-formed; it can't judge whether they make sense. (We ran exactly this page through axe: `violations: []`.) A role-based test would catch it, though: `getByRole('button', { name: 'Remove Eevee' })` can't find a button that's only called "Remove."

</details>

<details>
<summary>A test finds the Add button with <code>page.locator('.btn-add')</code> and passes. Someone changes the button's text to a "+" icon with no label. Does the test still pass?</summary>

Yes. The class is still there, so the test finds the button, presses it, and the party still changes. But a screen reader now hears just "button." Written as `page.getByRole('button', { name: 'Add bulbasaur' })`, the same test would go red the moment the name disappeared, which is the point: a role-based locator is an accessibility check too.

</details>

## Try it together

Pair programming, with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S13.

We start from a copy of `final-project/` in `try/s13/` (without `node_modules`; then `npm install` there), in plan mode:

```text
In try/s13/, set up Playwright with @axe-core/playwright. Write tests that use role and label locators: one that the nav marks the current page, one that uses the island with only the keyboard, and an axe scan of each kind of page. Have Playwright build and preview the site itself.
```

Then `npx playwright install chromium` (once), and `npx playwright test`. Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Run it, then break it.** All green? Remove a `<label>` or an `aria-current` and run again. Which test goes red?
- **Read a locator aloud.** Would a screen-reader user find that element by the same role and name?
- **Find the wait.** Does the island test wait for hydration? Run it ten times (`--repeat-each 10`).
- **What isn't tested?** Name one thing from the "done" list that no test here covers.

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on the `AxeBuilder` line. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, do the kit update (S13, step 0), copy your `final-project/` to `try/s13/`, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S13, out loud or to Claude:

- Which test goes red when you remove a label? If none does, what are the tests checking?
- Does every locator use a role or a label? Which one doesn't, and why?
- How does the island test know the island has woken up?
- Which pages does axe scan? Are any rules turned off?
- How does Playwright start the site, locally and in CI?

**Watch for:** CSS selectors instead of roles and names, so tests pass when a button has no name; an island test that presses before hydration and fails one run in five; `waitForTimeout(2000)` to "fix" that; an axe scan of the home page only, or with rules disabled; no `webServer` in the config, so the tests fail in CI. Green on the first run proves nothing yet.

</details>

## Links

- Playwright: [Writing tests](https://playwright.dev/docs/writing-tests), [Locators](https://playwright.dev/docs/locators) (why `getByRole` first), [Web server](https://playwright.dev/docs/test-webserver), [Accessibility testing](https://playwright.dev/docs/accessibility-testing), [Continuous integration](https://playwright.dev/docs/ci)
- axe: [axe-core rules](https://dequeuniversity.com/rules/axe/), [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright)
- W3C: [Evaluating web accessibility: tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/) (what automated tools can and can't do)
- MDN: [Accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name), [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
