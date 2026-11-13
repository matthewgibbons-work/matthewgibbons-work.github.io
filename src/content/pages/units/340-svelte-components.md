---
title: "Svelte components and props"
description: "Typed $props, callback props, and snippets: split the page into components that pass data down and events up. The Final Project brief comes out."
courses: [dight340]
ready: true
session: 8
prototype: P4
date: 2026-11-16
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Svelte components and props

<details>
<summary>Key takeaways</summary>

- **Data flows down, events flow up.** A parent passes data to a child as **props**; the child reports what happened through a **callback prop**.
- **One owner per piece of data.** Only the component that holds the `$state` changes it. A child that does `pokemon.level++` on its prop works, but the browser console warns `ownership_invalid_mutation`.
- **`let { … } = $props()`** is how a component takes its props. `<PartyMember {pokemon} />` is short for `pokemon={pokemon}`.
- **`interface Props`** lists what a component accepts, in TypeScript. Read it aloud: each prop, its type, and `?` for optional.
- **Snippets fill layout components:** whatever goes between a component's tags arrives as `children`, placed with `{@render children()}`. `$props.id()` gives each instance a unique id for `aria-labelledby`.
- **Focus after a remove belongs to the parent**, the only component that can see who's left.

</details>

## How it works

**Props and callbacks.** The parent passes data in as attributes, `<PartyMember {pokemon} onremove={removePokemon} />`, and the child takes them with `let { pokemon, onremove } = $props();`. A prop is the parent's data on loan: the child reads it and shows it. When something should *change*, the child calls `onremove(pokemon.id)`, and the parent, which owns the party, makes the change. One owner per piece of data means one place to look when it's wrong.

**Snippets.** Anything you put between a component's tags arrives as a snippet called `children`, and the component places it with `{@render children()}`. That's how you build layout components: a `Panel` with a heading and whatever you put inside it. `$props.id()` gives each component instance a unique id, which is exactly what `aria-labelledby` needs.

**Reading typed props.** A typed component lists what it accepts:

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

## At a glance

The syntax on this page in one place.

| Syntax | Example | What it does |
| --- | --- | --- |
| `$props()` | `let { pokemon } = $props();` | Takes the props the parent passed in |
| passing a prop | `<PartyMember {pokemon} />` | Gives the child data; `{pokemon}` is short for `pokemon={pokemon}` |
| a callback prop | `onremove={remove}`, then `onremove(pokemon.id)` in the child | The child says what happened; the parent makes the change |
| `ownership_invalid_mutation` | `onclick={() => pokemon.level++}` in the child | The browser console's "this child changed data it doesn't own": use a callback |
| `interface Props` | `onremove: (id: number) => void;` | Lists each prop and its type, so the editor can check the parent |
| `children` and `{@render}` | `<Panel title="My party">…</Panel>`, then `{@render children()}` | Places whatever the parent put between the tags |
| `$props.id()` | `const id = $props.id();` | A unique id per instance, for `aria-labelledby` |

## Live demo

The whole class, three components: I change them on the projector, you call what happens next. The sandbox is a Svelte Playground where `App.svelte` already owns a party of three in `$state`, with `remove` and `levelUp` functions ready, and `PartyMember.svelte` and `Panel.svelte` are empty. Switch files with the tabs above the editor. [Open the Svelte sandbox in the Playground](https://svelte.dev/playground/untitled#H4sIAAAAAAAAE41W247bNhD9lYlTYO1Eku31brrQehcoWiAtkCIBkj5lg4AWRxa7FElwRr7UMNB_6Mf0vZ_SLylIyZf1umhfbGEuh4eHwxluekbU2Mt7P_z09sdPMLkawV9_wsfRDZAwcmZXvaTHQumlMrKXl0ITJr1SaaRe_nnT47ULycHQS3ZQ3zmX0QI1B9tMEJ6zF9YwGqZe3pu-SNMHA_BOLRAk1na3NpTWw8eYAYWtnTUhA4SR4Lx1BP3J1SgBQiJlDdwMMnjv0KAErrxt5hUopoDcYXzQYj33tjEStDKP0OcKoTGKwYk5QiUIFA9uQZSMHlAqVmYOwqwhbBCUAa4UQWm1RJ8EYI9zNOgFIwSsgJqDsTLwbTxhSoox7fY67LY1dHseacjI6l8pKJ_S6CaAfucc2KWhCOmE53UGH8Lfz1jP0HcaRhk-CIN6ZyAWngFrx-vbmBu1LJXWEarOHkya3j-YKRVeOb4Pa6naWc_H8FB6W8NFNny-5MXtkxSD-ij4QCSEhUCN3NKHO_iGWDD2Pwc7wAaUzOHyOoFQGjlcOPUoiqq5SEDjAnUO40vYJsfB48lkH424QDzE3pyGXh1CyVivxeoQPBl10V8GRzTZstDvQkTgKtGrBcp-q71H2RTY71NTJ-AGcHcP1NTwGlwWMRMYDXZYwyG8N3odj7CohJnjk1P8vlJaejRQCK2Dg3BfqsE0E8VjW9pZQCsbU3CobI-1XWBfyQFs2p3udG2BS6UZfb_fsnOZkvDi7g6UHMQT27bk9nCR9i_uGV5WKiOfoNy1KO1GX7_eoU2H-xJ6MNNqfP_JC2XQx3s0HVbj1uHuPwVdd9JvDipvp0PXxjQ61uHmJYqi6rYlCJx9xNoa6HcfmZKDbUt1qtX9ZmcOx7wNLSuuAXu77lbRqoUfBvjIPC4YLgGvNUbn8BW8s_YxXqgSUYM1ep3BW21nQidAFmIsxXbk7bLtQLOG2XaXNF60SpC5YBBSooQ1cssWpA1WLxQhFERfG9MQyq-EGgu2HpbCG2XmlERUsgFwDT7KEbCLUDNH7S-DV8MAnc8jv_7MyvX-GEtrOIdxNr689lgPx9k10JoY67RRSWirlBJ6VR6XxQ6o0UfVIKUy8xxGt61BK-I0qhDam8Fz-Vrt86Wi0ONyKDWuOojwmS69cDmE384qtJqbVDHWlEOBhtF3nnmIHGXfho10plr4uTLpTNviMfiOXAfG0XqSOLNeos_h0q2ArFYSXk4mkyfO1AupGjqBZVxxyl4YKq2vcyiEUyy0-u2sAoTxfp2RMYvnAePzlKSgCiW8fPPmzX9yOlmyrcKT81emQq_4uTSXz7Q5gctLWzSULhSpmcY9rG1YK4M5XB0EHI_Ht0-8qS1LQs5h4lZHjaK7ZuEdgSvu5ewb3Cb_8nQ4HiNPHw8nnpPnA3xkdHCdgwAX59JScQUCKhSyneESlpVgXKCHuUWCGfIS0YQXArCYUwZxNv5fmqej8ZTsGf85ygTjv3__4yoHa7ohAXU7hSPJCj2eJfZl-w-OfboMuQkAAA). It runs in your browser with nothing to install; to keep your changes, use the Playground's **Save** (it asks you to sign in with GitHub) or download the starting files: <a href="/sandbox/340-s08/App.svelte" download="App.svelte">App.svelte</a>, <a href="/sandbox/340-s08/PartyMember.svelte" download="PartyMember.svelte">PartyMember.svelte</a>, <a href="/sandbox/340-s08/Panel.svelte" download="Panel.svelte">Panel.svelte</a>.

Each step says which file, what to type, and what to look for. Three things to know first:

- **Every edit restarts the app.** The party is back to three, at their starting levels.
- **The console** is under the result: click **Console** to open it. Ownership warnings show there, not in the editor.
- **Total level** is at the top of the result. It's how you'll see whether the party's data changed.

1. **Move one row into a component.** In `PartyMember.svelte`, replace the comment with:

   ```svelte
   <script>
     let { pokemon } = $props();
   </script>

   <li>{pokemon.name} · level {pokemon.level}</li>
   ```

   Then in `App.svelte`, replace the `<li>` line inside `{#each}` with:

   ```svelte
   <PartyMember {pokemon} />
   ```

   The page looks exactly the same. That's the point: the row now lives in its own file, and `App` hands each one its Pokémon.

2. **Events up, with a callback prop.** In `PartyMember.svelte`, change the props line to `let { pokemon, onremove } = $props();`, and inside the `<li>`, after the text, add:

   ```svelte
   <button onclick={() => onremove(pokemon.id)}>Remove {pokemon.name}</button>
   ```

   Press a Remove button. Nothing happens, and the console has a `TypeError`: `App` never passed an `onremove`. In `App.svelte`, change the component line to:

   ```svelte
   <PartyMember {pokemon} onremove={remove} />
   ```

   Press Remove again: the row goes, and the total drops. The child only said *which* Pokémon; `App`'s `remove` changed the party.

3. **A child that changes data it doesn't own.** In `PartyMember.svelte`, before the Remove button, add:

   ```svelte
   <button onclick={() => pokemon.level++}>Level up {pokemon.name}</button>
   ```

   Press Level up Pikachu. Pikachu's level and the total both go up, so it works. Now open the console: `ownership_invalid_mutation`, "Mutating unbound props … is strongly discouraged." When the total is wrong next week, there are now two places to look. Fix it the way Remove works: add `onlevelup` to the props line, change the button to `onclick={() => onlevelup(pokemon.id)}`, and in `App.svelte` add `onlevelup={levelUp}` to the component line. Clear the console and press Level up again: same result, no warning.

4. **Read the types.** In `PartyMember.svelte`, change `<script>` to `<script lang="ts">` and replace the props line with:

   ```ts
   interface Props {
     pokemon: { id: number; name: string; level: number };
     onremove: (id: number) => void;
     onlevelup: (id: number) => void;
   }

   let { pokemon, onremove, onlevelup }: Props = $props();
   ```

   Nothing on the page changes. Read it aloud together: "a `pokemon` with a number `id`, a string `name`, and a number `level`; an `onremove` that takes a number and returns nothing; the same for `onlevelup`." The Playground doesn't check types; in VS Code, passing `onremove="oops"` from the parent gets underlined before you run anything.

5. **A layout component with a snippet.** In `Panel.svelte`, replace the comment with:

   ```svelte
   <script>
     let { title, children } = $props();
     const id = $props.id();
   </script>

   <section aria-labelledby={id}>
     <h2 {id}>{title}</h2>
     {@render children()}
   </section>
   ```

   In `App.svelte`, wrap the "Total level" paragraph and the whole `<ul>` in:

   ```svelte
   <Panel title="My party">
     …
   </Panel>
   ```

   A dashed panel with a "My party" heading now holds the total and the list. Everything between the tags arrived as `children`. Right-click the heading and choose **Inspect**: the `<section>`'s `aria-labelledby` matches the `<h2>`'s `id`, so a screen reader announces the region as "My party."

**On your own:** in your own Playground copy (a few minutes each):

- Add a second `<Panel title="Box">` under the first, with a short list of its own. You don't change `Panel.svelte` at all.
- Tab to a Remove button and press Enter. Where does focus go? Make it land on the next member's Remove button, and decide which component has to do it.
- Give `PartyMember` an optional `nickname` prop (`nickname?: string` in `Props`) and show it after the name only when it's set.

## Links

- Svelte: [`$props`](https://svelte.dev/docs/svelte/$props) (read "Updating props" and "Type safety"), [Snippets](https://svelte.dev/docs/svelte/snippet), [`{@render}`](https://svelte.dev/docs/svelte/@render), [TypeScript](https://svelte.dev/docs/svelte/typescript)
- TypeScript: [Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html) (interfaces and optional properties), [Function type expressions](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions)
- Dig deeper: run [`/dig-deeper`](/340/skills/dig-deeper/) on the `let { … }: Props = $props();` line of your own S08. Answer its predict question before the reveal.
- MDN: [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby)
