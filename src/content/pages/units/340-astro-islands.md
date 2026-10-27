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

`npx astro add svelte` lets an Astro page use your Svelte components, P3's and P4's included. Drop one into a page and Astro renders it to HTML **at build time**, like everything else: it looks right, but it's a picture of a component. Its buttons do nothing, because no JavaScript was sent.

A **`client:` directive** turns it into an **island**: Astro sends that component's JavaScript, and the browser **hydrates** it (attaches the Svelte code to the HTML that's already there). The directive says *when*:

- `client:load`: as soon as the page loads. For something people use straight away.
- `client:idle`: once the page has finished loading and the browser is idle. For things that can wait a moment.
- `client:visible`: when it scrolls into view. For things further down the page; nobody downloads what they never see.

Everything else on the page stays plain HTML. That's why Astro sites are fast: a page with one small island ships one small script.

That gives you two places to get **data**. **At build time**, in the page's frontmatter: the same for every visitor, fetched once (a Pokédex list). **In the browser**, inside the island: data that depends on what this person does (look up the name they typed). The page passes build-time data to the island as **props**, and only data crosses: strings, numbers, arrays, plain objects. A function passed from an `.astro` page to an island arrives as `null`, with no warning; callbacks between Svelte components *inside* the island work as before.

Two things to know about hydration. There's a moment between the HTML appearing and the island waking up, when a button looks ready but does nothing; keep islands small, and use `client:load` for anything people reach for first. And **view transitions**: `<ClientRouter />` from `astro:transitions`, in your layout's `<head>`, animates between pages instead of reloading. It turns its animations off for anyone whose system asks for reduced motion (`prefers-reduced-motion`), and an island starts fresh on each page unless you give it `transition:persist`.

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

## Try it together

Everyone, in your `dight340` session, plan mode. Copy `final-project/` to `try/s12/` (without `node_modules`), and `npm install` there.

```text
In try/s12/, add Svelte to the Astro site. On the Pokédex page, under the build-time list, add my P3 party builder (or P4 team planner) as an island. Pass it the Pokémon names from the page's frontmatter as a prop, keep its own PokéAPI lookups in the browser, and pick a client: directive. Explain the choice.
```

**How to check it**

- **Read the directive.** Which one did it choose, and does the reason fit where the island sits on the page?
- **Watch it wake up.** DevTools → Network, filter "JS", reload, scroll down. When does the island's script load?
- **JavaScript off.** What still works? What's left on the page where the island was?
- **Reduced motion.** Click between pages, then turn on Reduce motion (macOS: System Settings → Accessibility → Display) and click again. Any animation?

**Dig deeper:** run [`/dig-deeper`](/340/skills/dig-deeper/) on the line with the `client:` directive, naming the file and line. Be ready to say what would change with each of the other two.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- No directive at all, so the island renders and does nothing.
- `client:load` on everything, "to be safe," which ships every component's JavaScript up front and throws away the point of islands.
- A callback passed from the `.astro` page into the island (`onadd={…}`), which arrives as `null` and breaks on the first click.
- The whole page turned into one big island, list and all, so the build-time data is fetched again in the browser.
- A test, or a fast keyboard user, pressing a button before the island had hydrated. Our own Playwright test did exactly that on a `client:visible` island, and had to wait for the island first.

It looked the same as the static version, which is the trap. We clicked every control, watched the Network tab while scrolling, and turned JavaScript off.

</details>

## Links

- Astro: [Islands architecture](https://docs.astro.build/en/concepts/islands/), [Framework components](https://docs.astro.build/en/guides/framework-components/) (including what props can be passed), [Template directives: `client:`](https://docs.astro.build/en/reference/directives-reference/#client-directives), [`@astrojs/svelte`](https://docs.astro.build/en/guides/integrations-guide/svelte/), [View transitions](https://docs.astro.build/en/guides/view-transitions/) (`<ClientRouter />`, `transition:persist`, reduced motion)
- MDN: [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
