---
title: "Astro islands and client-side data"
description: "Svelte inside Astro, client: directives, build-time vs client-side data, and view transitions that respect reduced motion."
courses: [dight340]
ready: false # true once the S12 dry run passes, with the S12 brief (PLAN.md: Build order)
session: 12
date: 2026-12-02
---

# Astro islands and client-side data

**The big idea:** an island is one interactive component in a page of static HTML. You choose which components wake up in the browser, and when.

## In short

An island is one interactive component in a page of static HTML: without a `client:` directive, a Svelte component on an Astro page is rendered at build time and sends no JavaScript, so its buttons do nothing. For S12 you need one of your Svelte components (P3, P4, or what your intent brief needs) on a Final Project page as an island with a directive you can explain, fed data the page fetched at build time, plus view transitions between pages.

## How it works

**Islands.** `npx astro add svelte` lets an Astro page use your Svelte components. With no directive, Astro renders the component to HTML at build time: it looks right, but it's a picture of a component. A **`client:` directive** makes it an island: Astro sends that component's JavaScript, and the browser **hydrates** it (attaches the Svelte code to the HTML that's already there). The directive says *when*:

- `client:load`: as soon as the page loads. For something people use straight away.
- `client:idle`: once the page has finished loading and the browser is idle. For things that can wait a moment.
- `client:visible`: when it scrolls into view. For things further down the page; nobody downloads what they never see.

Everything else on the page stays plain HTML, so a page with one small island ships one small script.

**Two places for data.** **At build time**, in the page's frontmatter: the same for every visitor, fetched once (a Pokédex list). **In the browser**, inside the island: data that depends on what this person does (look up the name they typed). The page passes build-time data to the island as **props**, and only data crosses: strings, numbers, arrays, plain objects. A function passed from an `.astro` page arrives as `null`, with no warning; callbacks between Svelte components *inside* the island work as before.

**Hydration and transitions.** There's a moment between the HTML appearing and the island waking up when a button looks ready but does nothing; keep islands small, and use `client:load` for anything people reach for first. `<ClientRouter />` from `astro:transitions`, in your layout's `<head>`, animates between pages instead of reloading. It turns its animations off for anyone whose system asks for reduced motion, and an island starts fresh on each page unless you give it `transition:persist`.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 230" role="img" aria-labelledby="island-wide-title">
<title id="island-wide-title">A page that is mostly static HTML: a header and nav, a Pokédex list fetched at build time, and a notes link, none of which send JavaScript. One region, the team planner, is a Svelte island with client:visible; it receives the Pokémon names as props from the page, sends its own JavaScript, and fetches more data in the browser when the person adds a Pokémon.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="150" y="8" width="320" height="214" rx="8" />
<text class="d-muted" x="160" y="28">pokedex.astro, as the browser gets it</text>
<rect class="d-box" x="166" y="40" width="288" height="34" rx="4" />
<text x="310" y="62" text-anchor="middle">Header and nav: HTML only</text>
<rect class="d-box" x="166" y="82" width="288" height="44" rx="4" />
<text x="310" y="102" text-anchor="middle">Pokédex list: HTML only</text>
<text class="d-muted" x="310" y="119" text-anchor="middle">fetched once, at build time</text>
<rect class="d-key" x="166" y="134" width="288" height="78" rx="4" />
<text x="310" y="156" text-anchor="middle">Team planner: a Svelte island</text>
<text class="d-muted d-code" x="310" y="176" text-anchor="middle">client:visible</text>
<text class="d-muted" x="310" y="198" text-anchor="middle">its own JavaScript; fetches in the browser</text>
<text class="d-muted" x="140" y="96" text-anchor="end">frontmatter</text>
<text class="d-muted" x="140" y="114" text-anchor="end">fetch</text>
<line class="d-line" x1="144" y1="104" x2="164" y2="104" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="140" y="166" text-anchor="end">names</text>
<text class="d-muted" x="140" y="184" text-anchor="end">as props</text>
<line class="d-line" x1="144" y1="174" x2="164" y2="174" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="456" y1="173" x2="496" y2="173" marker-start="url(#arrow-wide)" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="504" y="166">PokéAPI,</text>
<text class="d-muted" x="504" y="184">when you add one</text>
</svg>
<svg class="d-narrow" viewBox="0 0 300 330" role="img" aria-labelledby="island-narrow-title">
<title id="island-narrow-title">A page that is mostly static HTML: a header and nav, a Pokédex list fetched at build time, and a notes link, none of which send JavaScript. One region, the team planner, is a Svelte island with client:visible; it receives the Pokémon names as props from the page, sends its own JavaScript, and fetches more data in the browser when the person adds a Pokémon.</title>
<rect class="d-box" x="4" y="4" width="292" height="320" rx="8" />
<text class="d-muted" x="14" y="24">the page, as the browser gets it</text>
<rect class="d-box" x="16" y="36" width="268" height="36" rx="4" />
<text x="150" y="59" text-anchor="middle">Header, nav: HTML only</text>
<rect class="d-box" x="16" y="80" width="268" height="60" rx="4" />
<text x="150" y="104" text-anchor="middle">Pokédex list: HTML only</text>
<text class="d-muted" x="150" y="126" text-anchor="middle">fetched at build time</text>
<rect class="d-key" x="16" y="148" width="268" height="164" rx="4" />
<text x="150" y="172" text-anchor="middle">Team planner island</text>
<text class="d-muted d-code" x="150" y="196" text-anchor="middle">client:visible</text>
<text class="d-muted" x="150" y="222" text-anchor="middle">gets names as props</text>
<text class="d-muted" x="150" y="246" text-anchor="middle">sends its own JavaScript</text>
<text class="d-muted" x="150" y="270" text-anchor="middle">fetches PokéAPI in the</text>
<text class="d-muted" x="150" y="290" text-anchor="middle">browser when you add one</text>
</svg>
<figcaption>Most of the page is HTML made at build time. Only the island sends JavaScript, wakes up when it's scrolled into view, and talks to PokéAPI from the browser.</figcaption>
</figure>

## Predict, then reveal

```astro
---
import Counter from '../components/Counter.svelte';
---
<Counter />
```

<details>
<summary><code>Counter.svelte</code> is a button that counts clicks, and it works in your Svelte project. On this Astro page, you click it. What happens?</summary>

Nothing, and nothing in the console either. With no `client:` directive, Astro renders the component to HTML at build time and sends no JavaScript for it, so the button is a picture of a button. View Source shows a plain `<button>Clicked 0 times</button>` with no `<astro-island>` around it. Add `client:load` (or `client:visible`) and it works. A silent dead button is easy to miss, so click everything after you add a component.

</details>

<details>
<summary>The page passes <code>onadd={(name) =&gt; console.log(name)}</code> to a <code>client:load</code> island. The island calls <code>onadd('pikachu')</code> when you press Add. What happens?</summary>

A TypeError on the first press: `onadd is not a function`. Only data crosses from an `.astro` page into an island, and a function arrives as `null`, with no warning at build time. Keep the callback inside the island: a Svelte parent component that owns the state and passes `onadd` to its children, as in P4.

</details>

## Try it together

Pair programming, with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S12.

We start from a copy of `final-project/` in `try/s12/` (without `node_modules`; then `npm install` there), in plan mode:

```text
In try/s12/, add Svelte to the Astro site. On the Pokédex page, under the build-time list, add my P3 party builder (or P4 team planner) as an island. Pass it the Pokémon names from the page's frontmatter as a prop, keep its own PokéAPI lookups in the browser, and pick a client: directive. Explain the choice.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Read the directive.** Which one did it choose, and does the reason fit where the island sits on the page?
- **Watch it wake up.** DevTools → Network, filter "JS", reload, scroll down. When does the island's script load?
- **JavaScript off.** What still works? What's left where the island was?
- **Reduced motion.** Click between pages, then turn on Reduce motion (macOS: System Settings → Accessibility → Display) and click again. Any animation?

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on the line with the `client:` directive. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `final-project/` to `try/s12/`, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S12, out loud or to Claude:

- Which `client:` directive did you use, and what would change with each of the other two?
- What crosses from the page into the island as props? Is any of it a function?
- Which data is fetched at build time, and which in the browser? Is anything fetched twice?
- What's on the page where the island is, with JavaScript off?
- Could someone press a button before the island wakes up?

**Watch for:** no directive at all, so the island does nothing; `client:load` on everything, "to be safe"; a callback passed from the `.astro` page (it arrives as `null`); the whole page turned into one big island, so the build-time data is fetched again in the browser; a fast keyboard user, or a test, pressing a button before the island had hydrated.

</details>

## Links

- Astro: [Islands architecture](https://docs.astro.build/en/concepts/islands/), [Framework components](https://docs.astro.build/en/guides/framework-components/) (including what props can be passed), [Template directives: `client:`](https://docs.astro.build/en/reference/directives-reference/#client-directives), [`@astrojs/svelte`](https://docs.astro.build/en/guides/integrations-guide/svelte/), [View transitions](https://docs.astro.build/en/guides/view-transitions/) (`<ClientRouter />`, `transition:persist`, reduced motion)
- MDN: [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
