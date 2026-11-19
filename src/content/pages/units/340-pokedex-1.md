---
title: "Pokédex live build, day 1"
description: "We build a Pokédex together from a finished intent brief: configure the agent first, then the first 151 Pokémon at build time, a page for each, and a live deploy."
courses: [dight340]
ready: false # true once the rehearsal build passes (plans/2026-11-live-builds.md, B1)
session: 13
date: 2026-12-07
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Pokédex live build, day 1

<details>
<summary>Key takeaways</summary>

- **Configure the agent before it writes anything.** An `AGENTS.md` says what the project is, where things live, and the rules people learned the hard way. A skill turns a routine you repeat into a `/` command. Then test both: ask for something that would break a rule.
- **Build time is the default.** The list and all 151 detail pages are fetched once, when the site is built, so every page is plain HTML that works with JavaScript off.
- **`getStaticPaths` turns one file into 151 pages.** It returns one `params` object per page, and the page's frontmatter runs once for each.
- **The loop doesn't change at full size:** intent, spec, generate a small step, verify it, explain it. Only the generating belongs to the agent.
- **Today's Spark is the agent half.** S13 hands you a project Claude keeps getting wrong, and you write its `AGENTS.md` and a skill yourself.

</details>

Today and Wednesday we build one site together, from a finished brief to a live deploy: a Pokédex of the first 151 Pokémon. I drive Claude Code on the projector. You make the calls: what a rule should say, whether a step is done, and what a line of code does. Every checkpoint below becomes a commit in the [class repo](https://github.com/matthewgibbons-work/dight340-pokedex), so you can open any step later; the last one today is tagged `day1-end`.

## The intent brief

> **Reader:** classmates who half-remember a Pokémon, on a phone or a laptop, some using a keyboard or a screen reader.
>
> **Question:** "Which one was that, and what is it like?" They find it by part of its name, its number, or its type, and see its types, size, and base stats on one page.
>
> **Data:** PokéAPI, the first 151, fetched when the site is built.
>
> **Done when:**
>
> - every Pokémon has its own page, with its artwork, number, types, height, weight, and six base stats;
> - the list can be searched by name or number and filtered by one type, with the result count announced (day 2);
> - the search logic has Vitest tests that run on every push (day 2);
> - it works with the keyboard alone, at 320px and 200% zoom, and an axe DevTools scan is clean;
> - it's live on GitHub Pages, and every link works there.

Day 1 is everything except the search: the agent, the layout, the list, the detail pages, and the deploy.

## Before class

I made the repo from Astro's minimal template (`npm create astro@latest -- --template minimal`) and pushed it, so we start from a site that builds and shows one heading.

## Checkpoint 1: configure the agent

We write the project's `AGENTS.md` together, then a skill. You call the rules; I type. It has three parts:

- what the project is and who it's for;
- where things live (the folders, before they exist);
- the rules: every link through one helper (the site lives at `/dight340-pokedex/`, not the root), every `fetch` checks `response.ok`, alt text that isn't read twice, logic in tested modules, and what "done" means.

The skill, `.claude/skills/ship/SKILL.md`, is the check we'll run before every push: tests, build, then the checks only a person can do (keyboard, VoiceOver, axe DevTools, 320px).

```text
Read AGENTS.md and .claude/skills/ship/SKILL.md. Don't change anything. Which rule are you most likely to break in this project, and what would make you break it? Is anything in them unclear or contradictory?
```

**How we check it:**

- Open a **new session**. `AGENTS.md` at the repo root loads when a session starts, so an old session hasn't seen it. Type `/` and `ship` should be in the menu.
- Ask "What are this project's rules about links?" and check that it answers from the file, not from general advice.
- We'll test the link rule properly at checkpoint 2, by asking for something that would break it.

## Checkpoint 2: the layout

```text
Add a shared layout in src/layouts/Base.astro: a skip link, a header with the site name and a nav (All 151, About) that marks the current page with aria-current, and a footer crediting PokéAPI. Add src/lib/url.js with a url() helper for every internal link, as AGENTS.md says. Use the layout on the home page and a short About page.
```

**How we check it:**

- `npm run dev`, then click both nav links. Inspect the current one: `aria-current="page"`.
- **Turn JavaScript off** (DevTools, Cmd Shift P, "Disable JavaScript") and reload. Everything still works, because nothing here needs it.
- **The rule test.** In a new session: `Add a link back to the home page on the About page.` Does it use `url()` or write `href="/"`? If it writes `/`, the rule isn't clear enough, and we fix the rule, not just the link.

## Checkpoint 3: the first 151, at build time

```text
In src/lib/pokeapi.js, fetch https://pokeapi.co/api/v2/pokemon?limit=151 at build time, check response.ok, and turn each result into { id, name, image }: the id from the end of its URL, a display name (Nidoran♀, Nidoran♂, Mr. Mime, and Farfetch’d need more than a capital letter), and the official artwork URL. List them on the home page as a grid of links to /pokemon/<id>/.
```

**How we check it:**

- Open the endpoint in the browser first and read one result. What does it give you, and what doesn't it give you? (No types, which is why the search waits until Wednesday.)
- **View Source** on the home page: are the 151 names in the HTML, with no `<script>` fetching them?
- Each card's image is next to the name in the same link. What should its alt text be, and why? (Read the rule in `AGENTS.md`.)

## Checkpoint 4: a page for each Pokémon

```text
Add src/pages/pokemon/[id].astro. getStaticPaths returns one page per Pokémon in the list. Each page fetches /pokemon/<id> at build time and shows the artwork (alt text: the name), the number, types, height in metres, weight in kilograms, and the six base stats, each as a labelled <meter> with its number. Add previous and next links, and a 404 page.
```

**How we check it:**

- Open `/pokemon/25/`. PokéAPI says Pikachu's height is `4` and weight is `60`. What units are those, and does the page convert them? (Decimetres and hectograms: 0.4 m, 6 kg.)
- Open `/pokemon/122/`: does Mr. Mime's name come out right?
- Open `/pokemon/999/`: our 404, not a crash.
- `npm run build`: how many pages, and how long did it take? Every page is fetched once, when the site is built, and never again by a visitor.
- **Explain this line:** `return list.map((p) => ({ params: { id: String(p.id) } }));`. Why a string?

## Checkpoint 5: deploy

```text
Add a GitHub Actions workflow that builds the site and deploys it to GitHub Pages on every push to main, with the site and base path from actions/configure-pages, so url() gets the right base. Then run /ship.
```

**How we check it:**

- `/ship` runs the build and lists the hand checks. We do them: Tab through the list and one detail page, then 320px and 200% zoom.
- Push. The Actions tab goes green, and the live URL loads.
- On the live site, click a card, then the nav, then a previous link. Any 404 means a link skipped `url()`. Which one?
- Tag the commit `day1-end`.

## What went wrong, and how we caught it

<details>
<summary>Filled in after class</summary>

What went wrong today, and the check that caught it, go here after class.

</details>

## Links

- [Astro: Routing and dynamic routes (`getStaticPaths`)](https://docs.astro.build/en/guides/routing/#dynamic-routes)
- [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Claude Code: Memory (`AGENTS.md` and `CLAUDE.md`)](https://code.claude.com/docs/en/memory)
- [Claude Code: Skills](https://code.claude.com/docs/en/skills)
- [PokéAPI documentation](https://pokeapi.co/docs/v2)
- [MDN: `<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)
- [The class repo](https://github.com/matthewgibbons-work/dight340-pokedex): each checkpoint is a commit; today ends at `day1-end`.
