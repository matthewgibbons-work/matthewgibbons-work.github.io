---
title: "Final Project"
description: "An Astro site with Svelte islands that defines the Digital Humanities in your own words: your examples as a collection, live data from a museum or Wikipedia API, your NOTES.md files as a second collection, tests, and an agent you've configured. Due Wed Dec 16, 11:59 pm, the day of the open lab, where you can get final help."
courses: [dight340]
ready: true
tier: release
released: 2026-11-16
due: 2026-12-16
folder: final-project/
---

# Final Project

Build a small Astro website with Svelte islands that answers one question for a reader you choose: what are the Digital Humanities? Your definition is in your own words, your three or more examples are a content collection, live data comes from a free museum or Wikipedia API, your term's `NOTES.md` files are a second collection, tests run on every push, and you write your own `AGENTS.md` and skill. It's due Wed Dec 16 at 11:59 pm. Submit by pasting two links in Learning Suite. It's graded on a 25-point rubric (25% of your grade), and AI use carries the most points. Rework doesn't apply: this is the finished piece.

It draws on everything this term, including the four sessions from Nov 23 on (Astro intro, content collections, islands, and testing); from S10 on, each Spark is a piece of it, so it grows a layer a week. Your S09 intent brief is where you choose your reader, your examples, and your API. The writing is yours: Claude can help you find projects and build the site, not write your definition, analysis, or reflections. The thing most people miss is the agent configuration: you write `final-project/AGENTS.md` and the skill yourself, and explain why each rule is there.

**Key dates**

- **Mon Nov 16:** brief out.
- **Wed Nov 18:** intent brief (S09), due Mon Nov 23.
- **Mon Nov 23:** `final-project/` becomes an Astro site and deploys (S10).
- **Wed Dec 16, 11:59 pm:** due. The open lab that day is for final help.

The full week-by-week list is under **Timeline**.

## The brief

A Final Project is something shipped to real users. Yours is a small website in your repo's `final-project/` folder, built with **Astro**, with **Svelte islands** where it needs to be interactive, that defines the **Digital Humanities** (DH). What that term means is the question your site answers, in your own words; don't borrow a definition and decorate it.

**Write it for one reader.** Your intent brief names a real or realistic person, and the site is written for them: a roommate who asked what your minor is, a history major wondering whether DH has anything for them, a parent who wants to know what you'll do with it.

The site has:

- **A home page** with your definition, in your own words, with at least two credible sources linked, and a card for each example.
- **Your examples as a collection.** Three or more real DH projects (a digital archive, a map, a text-analysis project, a 3D reconstruction, an online exhibit), each a Markdown file in a content collection, checked by a schema. Each one gets its own page: an overview, your analysis (how it fits your definition, which kind of DH it shows, and why you chose it, with specifics from your own time in the project), an image or other media with `alt` text and a credit, and links to the project and your sources.
- **Live data from an API.** Pick one free API that needs no key, and use it where it helps your reader:
  - [Art Institute of Chicago](https://api.artic.edu/docs/): artworks, with images through its IIIF server;
  - [The Met Collection](https://metmuseum.github.io/): objects, with public-domain images;
  - [Wikipedia's REST API](https://en.wikipedia.org/api/rest_v1/): a summary and thumbnail for any article.

  At least one page gets its data **when the site is built** (an example page pulls the museum record for the object it discusses); at least one island fetches **in the browser** (search the collection for more objects like it, look up a term your reader might not know).
- **A reflections page:** what changed in your understanding of DH as you worked, and one pattern across your examples.
- **Your `NOTES.md` files as a collection.** Every Spark and Prototype you've written this term becomes a page in a "How I built this" section, checked by a schema (S11). It's a portfolio of how you worked, not just what you built.
- **Tests.** Vitest for your logic, and Playwright with axe for the site (S13). They run on every push.
- **Configure your agent.** You write your project's own `final-project/AGENTS.md` and one custom skill, and explain why (below).

**The words are yours.** Your definition, analysis, and reflections are your own writing, like your `NOTES.md`. Claude can help you find projects, check a fact, write your schema, and build the pages around your writing. It doesn't write the prose. If it drafts a sentence you keep, rewrite it, and say so in `NOTES.md`.

The site moves into `final-project/` on Mon Nov 23, when it becomes an Astro site (S10). Until then, read about DH projects and open your API's endpoints in the browser.

**Another API:** you can propose a different free DH data source in your S09 intent brief (a digital archive, a library, a gazetteer). It must need no key (a key in a public repo or a static site isn't secret), and it must return JSON your site can use. Everything else in the "done" list applies.

**A real outside user is optional**, and worth it if you have one: the reader you named, or someone like them. If you test with someone, write up what they did and what you changed in `NOTES.md`.

## Configure your agent

You've worked all term under the course's `AGENTS.md`. Now write the rules for *this* project, as the person who knows it best.

- **`final-project/AGENTS.md`:** 10–25 lines, in your words: what the site is and for whom, where things live (`src/pages/`, `src/components/`, `src/content/`, your data module), the commands that prove it works (`npm run build`, `npx vitest run`, `npx playwright test`), and the rules you've learned the hard way this term (keys on every `{#each}`, `BASE_URL` in every link, no `$effect` that sets state, "don't write or rewrite my prose", whatever bit you). Claude Code loads it on demand, once it reads a file in `final-project/`, alongside the course's root `AGENTS.md`, which still applies.
- **One custom skill:** `final-project/.claude/skills/<name>/SKILL.md`, with a `name`, a `description`, and instructions in the same format as `/check` and `/dig-deeper`. Make it something you'd actually run more than once: `/new-example` (scaffold an example's Markdown file with the schema's fields and ask you for each one, without writing the analysis), `/new-note` (the same for a `NOTES.md`), `/a11y-pass` (walk a page with you: keyboard, zoom, names, live regions), `/check-links` (open every link on a page and report the broken ones).
- **You write both.** The course's `AGENTS.md` keeps Claude out of `AGENTS.md` and `.claude/` files, and that's the point: these are your decisions. Ask Claude to *review* them ("What's ambiguous in final-project/AGENTS.md? Don't edit it.") and to try your skill.
- **Explain why** in `final-project/NOTES.md`: each rule's reason, and one time the file or the skill changed what Claude did (or didn't, and what you changed).

## Timeline

| Date | Session | What happens for your Final Project |
| --- | --- | --- |
| Mon Nov 16 | S08 | Brief out. Start looking at DH projects and the APIs. |
| Wed Nov 18 | S09 | **Intent brief** (the S09 Spark): reader, definition draft, examples, API, pages and islands, your "done" list. |
| Mon Nov 23 | S10 | `final-project/` becomes an Astro site and deploys. P4 is due Tue Nov 24. |
| Mon Nov 30 | S11 | Content collections: your `NOTES.md` files, and the same pattern for your examples. |
| Wed Dec 2 | S12 | Svelte islands and client-side data. |
| Mon Dec 7 | S13 | Playwright + axe tests run in CI. |
| Wed Dec 9 | S14 | Big live build; configure your agent (the S14 Spark). |
| **Wed Dec 16** | Open lab | **Due, 11:59 pm.** Come for final help if you need it. |

## Spec: the "done" list

<!-- done:start -->

**The site**

- [ ] `final-project/` is an Astro site, built by the **Build and deploy** workflow, live at `…/dight340/final-project/`. Every internal link works there (they use `import.meta.env.BASE_URL`).
- [ ] Every page shares one layout with landmarks and a nav that marks the current page (`aria-current="page"`): home, examples, reflections, and notes.
- [ ] At least one page gets API data **at build time**, and at least one Svelte island fetches or changes data **in the browser**, with a `client:` directive you can justify.
- [ ] The islands use what you learned in Svelte: runes, keyed `{#each}`, typed props and callback props, and a labeled form with errors people can perceive.

**The content**

- [ ] The home page defines the Digital Humanities in your own words and links at least two credible sources.
- [ ] Three or more examples are entries in a content collection, with a zod schema that requires a title, the project's URL, the kind of DH it shows, an image (or other media) with `alt` text and a credit, and at least one source. An index lists them, and a dynamic route gives each one its own page.
- [ ] Each example page has an overview and your own analysis: how it fits your definition, which kind of DH it shows, and why you chose it, with at least one specific from your own time in the project (something you searched, read, or tried there). There's no word count: write enough that a reader can tell you spent real time with it.
- [ ] A reflections page says what changed in your understanding and names one pattern across your examples.
- [ ] Every link opens and goes where it says, and every fact you state, you've checked at its source.

**Your notes collection**

- [ ] Every Spark and Prototype `NOTES.md` from this term is an entry in a content collection, with a zod schema that requires all five sections.
- [ ] A notes index page lists them, and a dynamic route gives each one its own page.

**Quality and tests**

- [ ] Your logic (turning API responses into what your pages need, at least) lives in plain modules with Vitest tests.
- [ ] At least three Playwright tests, including an axe scan of each kind of page, run in the **Checks** workflow. Checks is green, or `final-project/NOTES.md` says what's failing and why.
- [ ] `const`/`let` and `===`; no console errors; no Svelte or Astro warnings in the build.

**Accessibility**

- [ ] Works with the keyboard alone, with visible focus; readable at 200% zoom and at 320px wide; motion respects `prefers-reduced-motion`.
- [ ] axe reports no violations, and you've done one screen-reader pass of your main flow (VoiceOver: Cmd+F5), written up in `final-project/NOTES.md`.

**Your agent and your notes**

- [ ] `final-project/AGENTS.md` and one custom skill in `final-project/.claude/skills/`, written by you.
- [ ] `final-project/NOTES.md` covers every section, plus: what Claude helped with (research, code) and that the site's writing is yours; why each `AGENTS.md` rule is there; what your skill does and when you used it; and whether the site answers your reader's question.
- [ ] Meaningful commits across the work window, not one big one at the end.

<!-- done:end -->

## Rubric (25 points)

The Final Project is 25% of your grade.

| Category | Points | Full marks looks like |
| --- | --- | --- |
| **Functionality** | 5 | Every page and island works on the live site, with real data, and handles loading, failure, and empty states. |
| **Code quality** | 3 | Small components with typed props and one owner per piece of data; logic in tested modules; schemas that catch a missing field; no warnings; readable names. |
| **Git** | 2 | Meaningful commits over the work window, each saying what changed; nothing generated or secret committed. |
| **AI use** | 7 | A complete `final-project/NOTES.md`, honest about what you accepted, changed, and rejected, and clear enough that I could tell what any part of the code does and why it's there; your "Open questions" show what you still want to understand; your `AGENTS.md` and skill, with reasons, and evidence they changed how you worked. |
| **Accessibility** | 4 | Keyboard, focus, zoom, reflow, names, announcements, and reduced motion all hold; axe clean; a written screen-reader pass. |
| **Intent and content** | 4 | A clear definition in your own words, examples and analysis that back it up with specifics from your own time in each project, sources cited and media credited, all written for the reader your intent brief named; or `NOTES.md` explains what changed and why. |

## Submitting

In the Learning Suite assignment **Final Project**, paste:

1. your live Final Project URL (`…/dight340/final-project/`), and
2. a direct link to your `final-project/` folder on GitHub.

Then run [`/check`](/340/skills/check/) `final-project` with the "done" list above before you submit (the **Copy** button copies it).

**Watch for:** Claude "improving" your writing when you asked for code; projects, people, dates, or links it made up (open every one); images used without a credit; and API URLs it remembers instead of reads. The Met retired its old search endpoint (`/public/collection/v1/search`) on Oct 1, 2026: search is now `/v1.1/search`, while `/v1/objects/<id>` still works. Open each endpoint in the browser before you build on it.
