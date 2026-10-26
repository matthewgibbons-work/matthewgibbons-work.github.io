---
title: "Svelte intro"
description: "Components and runes: $state, $derived, and $effect. Change the data and Svelte updates the page, with no render() of your own. Plus reading TypeScript annotations."
courses: [dight340]
ready: false # true once the S06 dry run passes, with the S06 brief (PLAN.md: Build order)
session: 6
prototype: P2
date: 2026-11-04
---

# Svelte intro

**The big idea:** say what the page should show for any data, and let Svelte keep it true. You change the data; Svelte changes only the parts of the page that depend on it.

## In short

A Svelte **component** is one `.svelte` file with three parts: a `<script>` for its logic, markup that's HTML with `{expressions}` in it, and a `<style>` that applies to this component only. Vite's Svelte plugin compiles it into plain JavaScript at build time, so the browser never sees Svelte itself.

Svelte 5 uses **runes**, special functions that start with `$`. `let level = $state(14)` makes `level` **reactive**: change it (`level++`) and every `{level}` on the page updates. Arrays and objects are reactive all the way down, so `party.push(…)` or `party[0].level++` works too. `let toEvolve = $derived(16 - level)` is a value **computed** from state, and Svelte recalculates it whenever `level` changes; you never set it yourself. `$effect(() => { … })` runs code after the page updates, again whenever the state it reads changes. It's the escape hatch for reaching *outside* the component (the tab title, `localStorage`, a canvas), and the docs warn against using it to keep one piece of state in step with another: that's what `$derived` is for. Events are ordinary attributes: `onclick={() => level++}`. (`on:click`, `export let`, and `$:` are Svelte 4; `AGENTS.md` rules them out.)

Compare S02. There's no `render()`, no `replaceChildren()`, and no hand-written `.focus()`: Svelte updates the one text node that changed, so the button you pressed is still there and still focused.

You'll also start **reading TypeScript**, because Svelte and Astro examples use it. In `<script lang="ts">`, an annotation after a colon says what kind of value something holds: `let level: number = $state(5)` reads "level holds a number." `function levelUp(by: number = 1): void` reads "takes a number called `by`, 1 if you leave it out, and returns nothing." The types are checked by your editor and removed at build time; they don't change what runs. You only need to read them.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 150" role="img" aria-labelledby="sv-wide-title">
<title id="sv-wide-title">A cycle: $state level feeds $derived toEvolve; both appear in the page's markup; a click on a button runs onclick, which changes level; Svelte then updates only the text that depends on level.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-key" x="4" y="30" width="136" height="60" rx="6" />
<text x="72" y="56" text-anchor="middle">State</text>
<text class="d-muted d-code" x="72" y="76" text-anchor="middle">$state(14)</text>
<line class="d-line" x1="140" y1="60" x2="166" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="168" y="30" width="136" height="60" rx="6" />
<text x="236" y="56" text-anchor="middle">Derived</text>
<text class="d-muted d-code" x="236" y="76" text-anchor="middle">$derived(…)</text>
<line class="d-line" x1="304" y1="60" x2="330" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="332" y="30" width="136" height="60" rx="6" />
<text x="400" y="56" text-anchor="middle">Page</text>
<text class="d-muted d-code" x="400" y="76" text-anchor="middle">{level}</text>
<line class="d-line" x1="468" y1="60" x2="494" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="496" y="30" width="136" height="60" rx="6" />
<text x="564" y="56" text-anchor="middle">Event</text>
<text class="d-muted d-code" x="564" y="76" text-anchor="middle">onclick</text>
<path class="d-line" d="M564,90 V126 H72 V92" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="318" y="144" text-anchor="middle">you change state; Svelte updates only what depends on it</text>
</svg>
<svg class="d-narrow" viewBox="0 0 262 330" role="img" aria-labelledby="sv-narrow-title">
<title id="sv-narrow-title">A cycle: $state level feeds $derived toEvolve; both appear in the page's markup; a click on a button runs onclick, which changes level; Svelte then updates only the text that depends on level.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-key" x="4" y="4" width="190" height="56" rx="6" />
<text x="99" y="28" text-anchor="middle">State</text>
<text class="d-muted d-code" x="99" y="48" text-anchor="middle">$state(14)</text>
<line class="d-line" x1="99" y1="60" x2="99" y2="80" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="82" width="190" height="56" rx="6" />
<text x="99" y="106" text-anchor="middle">Derived</text>
<text class="d-muted d-code" x="99" y="126" text-anchor="middle">$derived(…)</text>
<line class="d-line" x1="99" y1="138" x2="99" y2="158" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="160" width="190" height="56" rx="6" />
<text x="99" y="184" text-anchor="middle">Page</text>
<text class="d-muted d-code" x="99" y="204" text-anchor="middle">{level}</text>
<line class="d-line" x1="99" y1="216" x2="99" y2="236" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="238" width="190" height="56" rx="6" />
<text x="99" y="262" text-anchor="middle">Event</text>
<text class="d-muted d-code" x="99" y="282" text-anchor="middle">onclick</text>
<path class="d-line" d="M194,266 H232 V32 H196" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="243" y="149" text-anchor="middle" transform="rotate(90 243 149)">change the state</text>
</svg>
<figcaption>The S02 cycle, automated. You still change data, never the page, but there's no <code>render()</code>: Svelte knows which text depends on which state, and updates just that.</figcaption>
</figure>

## Predict, then reveal

```svelte
<script>
  let level = $state(15);
  let ready = $derived(level >= 16);
  let message = ready ? 'Ready to evolve!' : 'Keep training';
</script>

<button onclick={() => level++}>Level up</button>
<p>{message}</p>
```

<details>
<summary>You click Level up once, so <code>level</code> is 16. What does the paragraph say?</summary>

Still "Keep training." `ready` is derived, so it becomes `true`. But `message` is a plain `let`: its line ran once, when the component started, and nothing runs it again. Svelte even warns about it (`state_referenced_locally`: "This reference only captures the initial value"). Make `message` a `$derived` too, or put the expression straight into the markup: `<p>{ready ? 'Ready to evolve!' : 'Keep training'}</p>`.

</details>

## Try it together

Everyone, in your `dight340` session, plan mode:

```text
In try/s06/, create a Svelte 5 project with Vite, in JavaScript. Make a PokemonCard component that shows one Pokémon's name and level, with buttons to level it up and down, and a line saying how many levels until it evolves at level 16.
```

Ask Claude to start `npm run dev`, and open the `localhost` address.

**How to check it**

- **Keyboard only.** Tab to the level-up button and press Enter until it's ready to evolve. Does the line update? Is focus still on the button?
- **Name the runes.** Point at each `$state`, `$derived`, and `$effect`. Is any `$effect` setting state that a `$derived` could compute instead?
- **Listen to the buttons.** Are they labelled with words a screen reader can say ("Level up Charmander"), or just `+` and `−`?
- **Spot old syntax.** Any `on:click`, `export let`, or `$:`? That's Svelte 4.

**Dig deeper:** run [`/dig-deeper`](/340/skills/dig-deeper/) on the `$derived` line, naming the file and line. Be ready to say when it recalculates.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- An `$effect` doing a `$derived`'s job: `$effect(() => { toEvolve = 16 - level; })`, with `toEvolve` as its own `$state`. It works, a moment late, and it's the pattern the Svelte docs warn against.
- Buttons labelled `+` and `−`, so a screen reader hears "plus, button" with no Pokémon and no verb.
- No lower limit: Level down goes to 0, then −1.
- Svelte 4 syntax (`on:click`, `export let`) in a project that isn't covered by `AGENTS.md`.
- The template's demo counter, logos, and a `/icons.svg` link left in, which breaks on GitHub Pages.

It looked right with the mouse. We tabbed to the buttons, read their names in the accessibility tree, pressed Level down until it went negative, and searched the file for `$effect`.

</details>

## Links

- Svelte: [Overview](https://svelte.dev/docs/svelte/overview), [`.svelte` files](https://svelte.dev/docs/svelte/svelte-files), [`$state`](https://svelte.dev/docs/svelte/$state), [`$derived`](https://svelte.dev/docs/svelte/$derived), [`$effect`](https://svelte.dev/docs/svelte/$effect) (read "When not to use `$effect`"), [Basic markup](https://svelte.dev/docs/svelte/basic-markup) (events), [TypeScript](https://svelte.dev/docs/svelte/typescript)
- Svelte: [the interactive tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte), parts 1 and 2, for practice outside class
- MDN: [`document.title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (good uses for `$effect`)
- TypeScript: [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), for reading annotations
