---
title: "Final Project"
description: "An Astro site with Svelte islands: live PokéAPI data, your NOTES.md files as a collection, tests, and an agent you've configured. Due Wed Dec 16, 11:59 pm, the day of the open lab, where you can get final help."
courses: [dight340]
ready: false # true once the Final Project brief is reviewed (PLAN.md: Build order)
tier: release
released: 2026-11-16
due: 2026-12-16
folder: final-project/
---

# Final Project

**Units:** everything this term, and the four sessions still to come (Astro intro, content collections, islands, and testing). Brief out Mon Nov 16; intent brief Wed Nov 18 (S09); due Wed Dec 16, 11:59 pm. The open lab that day is for final help. Rework doesn't apply to the Final Project: this is the finished piece.

## The brief

A Final Project is something shipped to real users. Yours is a small website in your repo's `final-project/` folder, built with **Astro**, with **Svelte islands** where it needs to be interactive. It's the place your term's work comes together:

- **Data from an API.** The default is [PokéAPI](https://pokeapi.co/): a Pokédex for one region, a team planner, a type-matchup guide, a "which starter should I pick?" site. You decide the audience and what they need. Some pages get their data when the site is built; at least one island fetches or changes data in the browser.
- **Your `NOTES.md` files as a collection.** Every Spark and Prototype you've written this term becomes a page on the site, checked by a schema (S11). It's a portfolio of how you worked, not just what you built.
- **Tests.** Vitest for your logic, and Playwright with axe for the site (S13). They run on every push.
- **Configure your agent.** You write your project's own `final-project/AGENTS.md` and one custom skill, and explain why (below).

The work starts in Svelte this week (P4 is a good first piece), and moves into `final-project/` on Mon Nov 23, when it becomes an Astro site (S10). Each session after that adds a layer, and its Spark is a piece of your Final Project.

**Own choice:** your own data source, by proposal in your S09 intent brief. It must be free and need no API key (a key in a public repo or a static site isn't secret), and it must return JSON your site can use. Everything else in the "done" list applies.

**A real outside user is optional**, and worth it if you have one: a friend who plays, a younger sibling, a club. If you test with someone, write up what they did and what you changed in `NOTES.md`.

## Configure your agent

You've worked all term under the course's `AGENTS.md`. Now write the rules for *this* project, as the person who knows it best.

- **`final-project/AGENTS.md`:** 10–25 lines, in your words: what the site is and for whom, where things live (`src/pages/`, `src/components/`, your data module), the commands that prove it works (`npm run build`, `npx vitest run`, `npx playwright test`), and the rules you've learned the hard way this term (keys on every `{#each}`, `BASE_URL` in every link, no `$effect` that sets state, whatever bit you). Claude Code loads it on demand, once it reads a file in `final-project/`, alongside the course's root `AGENTS.md`, which still applies.
- **One custom skill:** `final-project/.claude/skills/<name>/SKILL.md`, with a `name`, a `description`, and instructions in the same format as `/check` and `/dig-deeper`. Make it something you'd actually run more than once: `/new-note` (scaffold a `NOTES.md` with today's date and ask you the questions, without writing the answers), `/a11y-pass` (walk a page with you: keyboard, zoom, names, live regions), `/add-pokemon-page`. It loads once Claude reads or edits a file in `final-project/`.
- **You write both.** The course's `AGENTS.md` keeps Claude out of `AGENTS.md` and `.claude/` files, and that's the point: these are your decisions. Ask Claude to *review* them ("What's ambiguous in final-project/AGENTS.md? Don't edit it.") and to try your skill.
- **Explain why** in `final-project/NOTES.md`: each rule's reason, and one time the file or the skill changed what Claude did (or didn't, and what you changed).

## Timeline

| Date | Session | What happens for your Final Project |
| --- | --- | --- |
| Mon Nov 16 | S08 | Brief out. Start thinking about audience and data. |
| Wed Nov 18 | S09 | **Intent brief** (the S09 Spark): audience, problem, data, features, your "done" list. |
| Mon Nov 23 | S10 | `final-project/` becomes an Astro site and deploys. P4 due. |
| Mon Nov 30 | S11 | Your `NOTES.md` files become a collection. |
| Wed Dec 2 | S12 | Svelte islands and client-side data. |
| Mon Dec 7 | S13 | Playwright + axe tests run in CI. |
| Wed Dec 9 | S14 | Big live build; configure your agent (the S14 Spark). |
| **Wed Dec 16** | Open lab | **Due, 11:59 pm.** Come for final help if you need it. |

## Spec: the "done" list

<!-- done:start -->

**The site**

- [ ] `final-project/` is an Astro site, built by the **Build and deploy** workflow, live at `…/dight340/final-project/`. Every internal link works there (they use `import.meta.env.BASE_URL`).
- [ ] At least three kinds of page share one layout with landmarks and a nav that marks the current page (`aria-current="page"`): a home page, your data pages, and your notes.
- [ ] At least one page gets API data **at build time**, and at least one Svelte island fetches or changes data **in the browser**, with a `client:` directive you can justify.
- [ ] The islands use what you learned in Svelte: runes, keyed `{#each}`, typed props and callback props, and a labeled form with errors people can perceive.

**Your notes collection**

- [ ] Every Spark and Prototype `NOTES.md` from this term is an entry in a content collection, with a zod schema that requires all five sections.
- [ ] A notes index page lists them, and a dynamic route gives each one its own page.

**Quality and tests**

- [ ] Your logic lives in plain modules with Vitest tests.
- [ ] At least three Playwright tests, including an axe scan of each kind of page, run in the **Checks** workflow. Checks is green, or `final-project/NOTES.md` says what's failing and why.
- [ ] `const`/`let` and `===`; no console errors; no Svelte or Astro warnings in the build.

**Accessibility**

- [ ] Works with the keyboard alone, with visible focus; readable at 200% zoom and at 320px wide; motion respects `prefers-reduced-motion`.
- [ ] axe reports no violations, and you've done one screen-reader pass of your main flow (VoiceOver: Cmd+F5), written up in `final-project/NOTES.md`.

**Your agent and your notes**

- [ ] `final-project/AGENTS.md` and one custom skill in `final-project/.claude/skills/`, written by you.
- [ ] `final-project/NOTES.md` covers every section, plus: why each `AGENTS.md` rule is there, what your skill does and when you used it, and whether the site solves the problem in your intent brief.
- [ ] Meaningful commits across the work window, not one big one at the end.

<!-- done:end -->

## Rubric (25 points)

The Final Project is 25% of your grade.

| Category | Points | Full marks looks like |
| --- | --- | --- |
| **Functionality** | 5 | Every page and island works on the live site, with real data, and handles loading, failure, and empty states. |
| **Code quality** | 3 | Small components with typed props and one owner per piece of data; logic in tested modules; no warnings; readable names. |
| **Git** | 2 | Meaningful commits over the work window, each saying what changed; nothing generated or secret committed. |
| **AI use** | 7 | A complete `final-project/NOTES.md`, honest about what you accepted, changed, and rejected, and clear enough that I could tell what any part of the code does and why it's there; your "Open questions" show what you still want to understand; your `AGENTS.md` and skill, with reasons, and evidence they changed how you worked. |
| **Accessibility** | 4 | Keyboard, focus, zoom, reflow, names, announcements, and reduced motion all hold; axe clean; a written screen-reader pass. |
| **Intent** | 4 | The site does what your intent brief said, for the people it named, or `NOTES.md` explains what changed and why, and you can say whether it solves the problem. |

## Submitting

In the Learning Suite assignment **Final Project**, paste:

1. your live Final Project URL (`…/dight340/final-project/`), and
2. a direct link to your `final-project/` folder on GitHub.

Then run [`/check`](/340/skills/check/) `release` with the "done" list above before you submit.
