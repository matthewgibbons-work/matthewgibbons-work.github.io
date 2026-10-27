---
title: "Svelte components and props"
description: "Typed $props, callback props, and snippets: split the page into components that pass data down and events up. The Final Project brief comes out."
courses: [dight340]
ready: false # true once the S08 dry run passes, with the S08 brief (PLAN.md: Build order)
session: 8
prototype: P4
date: 2026-11-16
---

# Svelte components and props

**The big idea:** data flows down, events flow up. A component takes **props** from its parent and tells the parent what happened through a **callback**; it never reaches up and changes the parent's data itself.

## In short

Once a page grows, you split it into components, each its own `.svelte` file: a `PartyList` that owns the party, and a `PartyMember` that shows one Pokémon. The parent passes data in as attributes, `<PartyMember {pokemon} onremove={removePokemon} />`, and the child takes them with `let { pokemon, onremove } = $props();`. A prop is the parent's data on loan: the child reads it and shows it. When something should *change* (remove this one, level it up), the child calls a **callback prop** (`onremove(pokemon.id)`), and the parent, which owns the party, makes the change. One owner per piece of data means one place to look when it's wrong.

**Snippets** are chunks of markup you can pass around. Anything you put between a component's tags arrives as a snippet called `children`, and the component places it with `{@render children()}`. That's how you build layout components: a `Panel` with a heading and whatever you put inside it. `$props.id()` gives each component instance a unique id, which is exactly what `aria-labelledby` needs.

Props are where you'll **read TypeScript** most. A typed component lists what it accepts:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    pokemon: { id: number; name: string; level: number };
    onremove: (id: number) => void;
    children?: Snippet;
  }

  let { pokemon, onremove, children }: Props = $props();
</script>
```

Read it as: "This component takes a `pokemon` (an object with a number `id`, a string `name`, and a number `level`), an `onremove` function that takes a number and returns nothing, and *optionally* (the `?`) some `children` markup." If the parent forgets `onremove` or passes a name where a number belongs, the editor underlines it before you run anything.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 220" role="img" aria-labelledby="props-wide-title">
<title id="props-wide-title">PartyList owns the party state. It passes each Pokémon down to a PartyMember as a prop. When a Remove button is pressed, the PartyMember calls onremove with the Pokémon's id, which goes back up to PartyList, and PartyList changes the party.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-key" x="200" y="10" width="240" height="56" rx="6" />
<text class="d-code" x="320" y="34" text-anchor="middle">PartyList</text>
<text class="d-muted" x="320" y="54" text-anchor="middle">owns the party ($state)</text>
<rect class="d-box" x="20" y="150" width="170" height="56" rx="6" />
<text class="d-code" x="105" y="174" text-anchor="middle">PartyMember</text>
<text class="d-muted" x="105" y="194" text-anchor="middle">Pikachu</text>
<rect class="d-box" x="235" y="150" width="170" height="56" rx="6" />
<text class="d-code" x="320" y="174" text-anchor="middle">PartyMember</text>
<text class="d-muted" x="320" y="194" text-anchor="middle">Eevee</text>
<rect class="d-box" x="450" y="150" width="170" height="56" rx="6" />
<text class="d-code" x="535" y="174" text-anchor="middle">PartyMember</text>
<text class="d-muted" x="535" y="194" text-anchor="middle">Snorlax</text>
<line class="d-line" x1="250" y1="66" x2="120" y2="148" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="305" y1="66" x2="305" y2="148" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="390" y1="66" x2="520" y2="148" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="160" y="104" text-anchor="end">pokemon (prop)</text>
<line class="d-line" x1="355" y1="148" x2="355" y2="68" marker-end="url(#arrow-wide)" />
<text class="d-muted d-code" x="362" y="140">onremove(133)</text>
</svg>
<svg class="d-narrow" viewBox="0 0 300 330" role="img" aria-labelledby="props-narrow-title">
<title id="props-narrow-title">PartyList owns the party state. It passes each Pokémon down to a PartyMember as a prop. When a Remove button is pressed, the PartyMember calls onremove with the Pokémon's id, which goes back up to PartyList, and PartyList changes the party.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-key" x="40" y="4" width="220" height="56" rx="6" />
<text class="d-code" x="150" y="28" text-anchor="middle">PartyList</text>
<text class="d-muted" x="150" y="48" text-anchor="middle">owns the party</text>
<line class="d-line" x1="110" y1="60" x2="110" y2="158" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="102" y="104" text-anchor="end">pokemon</text>
<text class="d-muted" x="102" y="122" text-anchor="end">(prop)</text>
<line class="d-line" x1="190" y1="158" x2="190" y2="62" marker-end="url(#arrow-narrow)" />
<text class="d-muted d-code" x="198" y="104">onremove</text>
<text class="d-muted d-code" x="198" y="122">(133)</text>
<rect class="d-box" x="40" y="160" width="220" height="50" rx="6" />
<text class="d-code" x="150" y="190" text-anchor="middle">PartyMember · Eevee</text>
<rect class="d-box" x="40" y="218" width="220" height="44" rx="6" />
<text class="d-muted d-code" x="150" y="245" text-anchor="middle">PartyMember · Pikachu</text>
<rect class="d-box" x="40" y="270" width="220" height="44" rx="6" />
<text class="d-muted d-code" x="150" y="297" text-anchor="middle">PartyMember · Snorlax</text>
</svg>
<figcaption>One owner. Each Pokémon goes down to its <code>PartyMember</code> as a prop; a Remove press comes back up as <code>onremove(id)</code>, and only <code>PartyList</code> changes the party.</figcaption>
</figure>

## Predict, then reveal

```svelte
<!-- PartyMember.svelte -->
<script>
  let { pokemon } = $props();
</script>

<button onclick={() => pokemon.level++}>Level up {pokemon.name}</button>
```

<details>
<summary><code>pokemon</code> comes from the parent's <code>$state</code> party, and the parent shows the party's total level. You press the button. Does the total go up?</summary>

Yes, and that's the problem. The party is reactive all the way down, so changing `pokemon.level` inside the child changes the parent's data, and the total updates. But the browser console shows Svelte's `ownership_invalid_mutation` warning: "Mutating unbound props … is strongly discouraged." The child changed data it doesn't own, so when the total is wrong next week, there are now two places to look. Give the child an `onlevelup` callback prop and let the parent do `pokemon.level++`.

</details>

## Try it together

Everyone, in your `dight340` session, plan mode. Copy your `try/s07/` folder to `try/s08/` first (or your S07 Spark folder).

```text
In try/s08/, split the party list into a PartyList component that owns the party and a PartyMember component for one Pokémon. PartyMember gets the Pokémon as a prop and calls an onremove callback prop; it never changes the party itself. Write PartyMember's props in TypeScript so I can read the types.
```

**How to check it**

- **Who changes the party?** Search `PartyMember.svelte` for `splice`, `filter`, `level++`, or `party`. The only changes should be in `PartyList`.
- **Read the types aloud.** Take turns reading `interface Props` in plain words, like the unit page does.
- **Check the console.** Open the browser console, use every button. Any `ownership_invalid_mutation`?
- **Keyboard again.** Remove a member with Enter. Does focus still land somewhere sensible now that the button lives in another component?

**Dig deeper:** run [`/dig-deeper`](/340/skills/dig-deeper/) on the `let { … }: Props = $props();` line, naming the file and line. Be ready to say what the `?` would mean.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- The child changing the parent's data (`pokemon.level++`, or `party.splice` through a passed-in array). It works, with a warning in the browser console.
- Svelte 4 patterns: `export let pokemon`, or `createEventDispatcher` and `on:remove` instead of a callback prop.
- `any` as the type, or no types at all, so there's nothing to read.
- Focus after a remove quietly broken by the split: the focus code stayed in the child, which can't see its siblings.

The page looked identical before and after the split, which is the goal and the trap. We searched the child for changes to data it doesn't own, watched the browser console while clicking, and redid the S07 keyboard check.

</details>

## Links

- Svelte: [`$props`](https://svelte.dev/docs/svelte/$props) (read "Updating props" and "Type safety"), [Snippets](https://svelte.dev/docs/svelte/snippet), [`{@render}`](https://svelte.dev/docs/svelte/@render), [TypeScript](https://svelte.dev/docs/svelte/typescript)
- TypeScript: [Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html) (interfaces and optional properties), [Function type expressions](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions)
- MDN: [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby)
