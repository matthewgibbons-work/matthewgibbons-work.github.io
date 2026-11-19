---
title: "Pokédex live build, day 2"
description: "The Pokédex gets its search: a tested filter module, one Svelte island over the build-time list, an announced result count, an axe DevTools scan, and a redeploy."
courses: [dight340]
ready: false # true once the rehearsal build passes (plans/2026-11-live-builds.md, B1)
session: 14
date: 2026-12-09
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Pokédex live build, day 2

<details>
<summary>Key takeaways</summary>

- **Logic first, in a plain module with tests.** The search is a pure function (`filterPokemon`), tested before any component uses it, so the island only wires inputs to it.
- **One island, fed at build time.** The page fetches all 151 when the site is built and hands them to the island as a prop. The island never fetches, and with JavaScript off the full list still shows.
- **A result people can perceive** is text in an element that's on the page from the start (`role="status"`), so a screen reader announces each new count, and "no matches" says what to do next.
- **Tools find some problems, people find the rest.** axe DevTools checks what a program can; the keyboard, VoiceOver, and 320px are yours.
- **Your Final Project's milestone 5 is today:** Vitest in Checks, an axe DevTools scan of each kind of page, and your reflections drafted.

</details>

Monday ended with a live site: a list of 151 and a page for each. Today it gets the part a reader actually asked for, finding one fast. I drive; you make the calls. If Monday ran long, I bring in the rest of day 1 from my rehearsal build first, so nobody's behind. Everything lands in the [class repo](https://github.com/matthewgibbons-work/dight340-pokedex), and today ends at `day2-end`.

From the brief, today's "done" items:

- the list can be searched by name or number and filtered by one type, with the result count announced;
- the search logic has Vitest tests that run on every push;
- an axe DevTools scan is clean, and it still works with the keyboard alone, at 320px, and at 200% zoom.

## Checkpoint 1: the search, as a tested module

```text
Add src/lib/filter.js with filterPokemon(pokemon, { query, type }): a name containing the query in any case, or a number matching it ("25" and "#025" both find Pikachu), and a type if one is chosen. Add typesIn(pokemon) for every type, once each, sorted. Write the Vitest tests first, in filter.test.js, and a test for pokeapi.js's display names and units. Add a Checks workflow that runs ESLint and npm test on every push. Don't touch any page yet.
```

**How we check it:**

- `npm test`: every test passes. Then **break one on purpose** (change `includes` to `startsWith`) and watch which tests fail. Do they say what's wrong? Undo it.
- Read the test list as a spec. Is anything from the brief missing? (Two types on one Pokémon? Spaces around the query?)
- Push. The Checks run goes green in the Actions tab.
- **Explain this line:** `if (/^\d+$/.test(digits)) return p.id === Number(digits);`

## Checkpoint 2: one island over the list

```text
Add Svelte to the site. On the home page, fetch all 151 with their types at build time (getAllPokemon in pokeapi.js), and pass them to a new island, src/components/FilterPokedex.svelte, as one prop, with each link already built with url(). The island has a labelled search box and a labelled type <select> ("All types" first), and renders the cards from filterPokemon. It never fetches. Use client:load, and tell me why not client:visible here.
```

**How we check it:**

- Type "char", then choose Flying: one card, Charizard. All of it with the keyboard: Tab to the box, type, Tab to the select, arrow keys.
- **JavaScript off** and reload: all 151 are still there. (Astro rendered the island's first state as HTML.) What doesn't work now?
- `npm run build`: how long does it take now, and why? (151 more requests, once per build, for the types.)
- `client:load` or `client:visible`? The search is the first thing on the page, so waiting for it to scroll into view gains nothing.

## Checkpoint 3: say what happened

```text
In FilterPokedex.svelte, add a line that says "Showing N of 151", in an element with role="status" that's on the page from the start. When nothing matches, say so in words, naming the search and the type, with a button that clears both and puts focus back in the search box.
```

**How we check it:**

- **VoiceOver on** (Cmd F5), focus in the search, type "mew": it announces "Showing 2 of 151". Type "zzz": "Showing 0 of 151", and the message says what to try.
- Press the clear button: the full list, and the cursor is back in the search box.
- Why must the status element be there from the start, rather than appearing when there's a result? (A screen reader watches a live region it already knows about. One added later may never be announced.)

## Checkpoint 4: the axe DevTools scan

No prompt to start. We run **axe DevTools** (the browser extension) on the home page and on one detail page, in the built site (`npm run build`, then `npm run preview`).

**How we check it:**

- Zero violations, or we read each one together and decide the fix before asking Claude for it.
- Then the checks axe can't do: Tab through a detail page, then 320px wide and 200% zoom on the list.
- What would axe have missed in checkpoint 3 if we'd left out `role="status"`? (Nothing. It can't tell that a count should be announced. That's why VoiceOver was a separate check.)

## Checkpoint 5: ship it

```text
/ship
```

**How we check it:**

- `/ship` runs the tests and the build, then lists the hand checks. We do each one.
- Push. Checks and Deploy both go green; on the live URL, search, filter, open a detail page, and come back.
- Tag the commit `day2-end`.
- **Explain:** what did we accept from Claude as it was, change, or reject today, and why? That's your `NOTES.md` habit, at full size.

**Stretch, if there's time:** keep the search in the URL (`?q=char&type=fire`), so a filtered list can be shared.

## What went wrong, and how we caught it

<details>
<summary>Filled in after class</summary>

What went wrong today, and the check that caught it, go here after class.

</details>

## Links

- [Astro: Islands and `client:` directives](https://docs.astro.build/en/concepts/islands/)
- [Svelte: `bind:value`](https://svelte.dev/docs/svelte/bind)
- [Vitest: Getting started](https://vitest.dev/guide/)
- [MDN: ARIA `status` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role)
- [axe DevTools browser extension](https://www.deque.com/axe/devtools/extension/)
- [The class repo](https://github.com/matthewgibbons-work/dight340-pokedex): today runs from `day1-end` to `day2-end`.
