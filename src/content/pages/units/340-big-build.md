---
title: "Big live build"
description: "A whole Astro and Svelte app, from intent brief to verified deploy, built together in one session. And configuring the agent you hand a project to."
courses: [dight340]
ready: false # true once the S14 dry run passes, with the S14 brief (PLAN.md: Build order)
session: 14
date: 2026-12-09
---

# Big live build

**The big idea:** everything at once, in order: intent, spec, generate, verify, explain. And the agent you hand a project to works better when you've told it how.

## In short

Today we build a whole small app together, start to finish, the way you'll finish your Release: an Astro site with one Svelte island, data from PokéAPI, tests, and a live deploy. Nothing in it is new. What's new is doing every step of the loop, in order, at full size, in one sitting, and noticing which steps are tempting to skip.

1. **Intent and spec first, by hand.** Two sentences of intent and a "done" list you could check in a minute each. The agent can't do these for you; it can only question them.
2. **Plan before code.** Plan mode, with the intent and the list pasted in. Agree on pages, islands, where each piece of data comes from (build time or browser), and the tests, before a line is written.
3. **Generate in small steps,** and verify each one before the next: build, then the page, then the island, then the tests.
4. **Verify like CI does:** `npm run build`, `npx vitest run`, `npx playwright test`, then the things no test covers: the keyboard, VoiceOver, 200% zoom, and the live URL.
5. **Explain:** what you accepted, changed, and rejected, while you still remember why.

The second half of today is about the agent itself. All term, Claude Code has followed the course's `AGENTS.md`. A real project has its own: where things live, the commands that prove it works, and the rules its people learned the hard way. Claude Code reads a **subfolder's** `AGENTS.md` (your `release/AGENTS.md`) once it opens a file in that folder, alongside the course's root one. A **custom skill** is a `SKILL.md` file in `release/.claude/skills/<name>/`, written like `/check`: a `name`, a `description`, then instructions; it becomes a `/` command the first time Claude reads or edits a file in `release/`. Writing those two files is your Release's "configure your agent", and today's Spark.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 150" role="img" aria-labelledby="loop-wide-title">
<title id="loop-wide-title">The session as a timeline of the loop: Intent and Spec by hand for 10 minutes; Plan in plan mode for 5; Generate in small steps for about 25, each step verified; Verify like CI, with build, tests, axe, keyboard, and the live URL, for 15; Explain in NOTES.md for 5.</title>
<rect class="d-key" x="4" y="30" width="100" height="60" rx="6" />
<text x="54" y="56" text-anchor="middle">Intent, spec</text>
<text class="d-muted" x="54" y="76" text-anchor="middle">by hand · 10</text>
<rect class="d-box" x="110" y="30" width="80" height="60" rx="6" />
<text x="150" y="56" text-anchor="middle">Plan</text>
<text class="d-muted" x="150" y="76" text-anchor="middle">5</text>
<rect class="d-box" x="196" y="30" width="230" height="60" rx="6" />
<text x="311" y="56" text-anchor="middle">Generate, step by step</text>
<text class="d-muted" x="311" y="76" text-anchor="middle">each step checked · 25</text>
<rect class="d-key" x="432" y="30" width="130" height="60" rx="6" />
<text x="497" y="56" text-anchor="middle">Verify like CI</text>
<text class="d-muted" x="497" y="76" text-anchor="middle">15</text>
<rect class="d-box" x="568" y="30" width="68" height="60" rx="6" />
<text x="602" y="56" text-anchor="middle">Explain</text>
<text class="d-muted" x="602" y="76" text-anchor="middle">5</text>
<text class="d-muted" x="320" y="122" text-anchor="middle">minutes, roughly · intent, spec, and verify are the ones the agent can't do for you</text>
</svg>
<svg class="d-narrow" viewBox="0 0 262 330" role="img" aria-labelledby="loop-narrow-title">
<title id="loop-narrow-title">The session as a timeline of the loop: Intent and Spec by hand for 10 minutes; Plan in plan mode for 5; Generate in small steps for about 25, each step verified; Verify like CI, with build, tests, axe, keyboard, and the live URL, for 15; Explain in NOTES.md for 5.</title>
<rect class="d-key" x="4" y="4" width="254" height="52" rx="6" />
<text x="131" y="26" text-anchor="middle">Intent, spec</text>
<text class="d-muted" x="131" y="44" text-anchor="middle">by hand · 10 min</text>
<rect class="d-box" x="4" y="62" width="254" height="40" rx="6" />
<text x="131" y="87" text-anchor="middle">Plan · 5 min</text>
<rect class="d-box" x="4" y="108" width="254" height="80" rx="6" />
<text x="131" y="140" text-anchor="middle">Generate, step by step</text>
<text class="d-muted" x="131" y="162" text-anchor="middle">each step checked · 25 min</text>
<rect class="d-key" x="4" y="194" width="254" height="60" rx="6" />
<text x="131" y="220" text-anchor="middle">Verify like CI</text>
<text class="d-muted" x="131" y="240" text-anchor="middle">15 min</text>
<rect class="d-box" x="4" y="260" width="254" height="40" rx="6" />
<text x="131" y="285" text-anchor="middle">Explain · 5 min</text>
<text class="d-muted" x="131" y="322" text-anchor="middle">intent, spec, verify: yours alone</text>
</svg>
<figcaption>The loop as one session. Intent, spec, and verify (outlined) are yours; generate is the agent's, and it's never more than a step ahead of a check.</figcaption>
</figure>

## Predict, then reveal

```markdown
<!-- release/AGENTS.md -->
- Never use innerHTML. Build elements with Svelte markup or createElement.
```

<details>
<summary>You open a new session and ask Claude to add a new Svelte component in <code>release/src/components/</code>. Does it follow this rule?</summary>

Only once it has read a file in `release/`. Claude Code loads a subfolder's `AGENTS.md` on demand, when it opens a file in that folder, not when the session starts. A request that makes a brand-new file there without reading anything first can run before your rules are loaded. So start Release sessions with "Read release/AGENTS.md and follow it," or ask it to read the component it's changing first. (Your skill in `release/.claude/skills/` works the same way: it appears in the `/` menu once Claude has touched a file in `release/`.) Then test the rule: ask for something that would break it, and see whether Claude objects.

</details>

## Try it together: the live build

We'll build **Type Matchups** together, in `try/s14/`: pick a type and see what it's strong and weak against. Everyone drives their own session; we check each step together before the next.

**Intent and "done" list (write your own version first, 5 minutes):**

> A new player choosing moves wants to know, for one type, which types it hits hard and which hit it hard, without reading a wiki table.

- A page lists every real type (PokéAPI's `/type` endpoint, at build time; it also returns `stellar`, `unknown`, and `shadow`, which aren't real types to a player).
- A Svelte island with a labelled `<select>` shows the chosen type's "strong against" and "weak to" lists, fetched from `/type/<name>` in the browser, with loading and error states that are announced.
- The matchup logic (turning PokéAPI's `damage_relations` into two lists) is a plain module with Vitest tests.
- A Playwright test picks a type with the keyboard and checks the lists; an axe scan passes.
- Every link uses `BASE_URL`; works at 200% zoom and with VoiceOver.

**The prompts, one step at a time:**

```text
1. Read my intent and "done" list (pasted below). Don't write code yet: propose pages, islands, which data is fetched at build time vs in the browser, the module and its tests, and the Playwright tests.
2. Create the Astro site in try/s14/ (minimal template, no git) with Svelte, a layout, and the types page.
3. Write the matchup module and its Vitest tests. Run them.
4. Add the island with client:visible, and wire it to the module.
5. Add the Playwright and axe tests. Run everything.
```

**How to check it (after every step, not just the last):**

- **Build** (`npm run build`), and read any warning.
- **Run the tests** that exist so far, and break one on purpose.
- **Keyboard and VoiceOver** on whatever's new.
- **Compare** with the "done" list: which items are now true?

**Dig deeper:** pick the one line from today you'd be least comfortable explaining if someone asked, and run [`/dig-deeper`](/340/skills/dig-deeper/) on it.

<details>
<summary>What went wrong, and how we caught it</summary>

At this size, the slips are mostly about order, not syntax:

- Generating before planning, so step 4 rewrote step 2.
- `stellar`, `unknown`, and `shadow` listed as types, because nobody looked at the data before building on it.
- The matchup logic written inside the island, where the Vitest tests can't reach it.
- Tests added last and written to pass, instead of first and written to fail.
- "It works" said before the build, the tests, the keyboard, or the live URL had been checked.

We caught them by refusing to start a step until the last one had been checked against the "done" list.

</details>

## Links

- Claude Code: [AGENTS.md and CLAUDE.md](https://code.claude.com/docs/en/memory) (how subfolder files load), [Skills](https://code.claude.com/docs/en/skills) (`SKILL.md`, where skills live, `$ARGUMENTS`), [Hooks](https://code.claude.com/docs/en/hooks) (rules the agent can't skip, like the course's scope guard)
- PokéAPI: [Types](https://pokeapi.co/docs/v2#types) (`damage_relations`)
- Everything else is this term's unit pages: [Astro intro](/340/units/astro-intro/), [content collections](/340/units/astro-collections/), [islands](/340/units/astro-islands/), [testing](/340/units/testing-a11y/).
