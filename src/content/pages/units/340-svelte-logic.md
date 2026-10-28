---
title: "Svelte logic and events"
description: "if, each, and await blocks; fetching data in a component; and the accessibility warnings Svelte gives you for free."
courses: [dight340]
ready: false # true once the S07 dry run passes, with the S07 brief (PLAN.md: Build order)
session: 7
prototype: P3
date: 2026-11-09
---

# Svelte logic and events

**The big idea:** markup can branch, repeat, and wait. Svelte's blocks say what the page shows in each case, and its compiler warns you when a case would shut someone out.

## In short

Svelte's blocks put logic in markup: `{#if}` chooses, `{#each}` repeats, and `{#await}` shows loading, the result, or the error for a Promise. For S07 you need a party fetched in parallel and shown with a **keyed** `{#each}`, an `{#await}` with a `{:catch}`, an empty-party message, and real `<button>`s to remove members, with no `a11y_…` warnings in the terminal.

## How it works

**Choosing and repeating.** `{#if party.length === 0}…{:else}…{/if}` shows one thing or another. `{#each party as pokemon (pokemon.id)}…{/each}` repeats markup for every item, and the part in brackets is the **key**: it tells Svelte which piece of the page belongs to which item, so when one is removed Svelte removes *that* row, instead of shuffling text between rows. An `{:else}` inside `{#each}` covers the empty list.

**Waiting.** `{#await request}…{:then pokemon}…{:catch error}…{/await}` shows a loading state, the result, or the error, so a component can fetch the way P1 did without managing three flags by hand. To fetch again, assign a new Promise to the `$state` that holds the request.

**Events and warnings.** Events are attributes: `onclick`, `onsubmit`, `onkeydown`, each given a function. Because the compiler reads all your markup, it catches accessibility problems before anyone opens the page: a `<div>` with an `onclick` gets `a11y_click_events_have_key_events` ("consider a `<button>`"), and an `<img>` with no `alt` gets `a11y_missing_attribute`. They show in the terminal running `npm run dev`. Treat every one as a bug.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 230" role="img" aria-labelledby="each-wide-title">
<title id="each-wide-title">Removing Pikachu from a three-row list where Pikachu's nickname box says Sparky. Without a key, Svelte updates rows by position: the first row now says Eevee but still holds Sparky, and the last row is removed. With a key, Pikachu's own row is removed, and Eevee's and Snorlax's rows are untouched.</title>
<text x="10" y="50">Before</text>
<rect class="d-box" x="150" y="24" width="150" height="50" rx="4" />
<text x="225" y="46" text-anchor="middle">Pikachu</text>
<text class="d-muted" x="225" y="64" text-anchor="middle">nickname: Sparky</text>
<rect class="d-box" x="310" y="24" width="150" height="50" rx="4" />
<text x="385" y="46" text-anchor="middle">Eevee</text>
<text class="d-muted" x="385" y="64" text-anchor="middle">nickname: (empty)</text>
<rect class="d-box" x="470" y="24" width="150" height="50" rx="4" />
<text x="545" y="46" text-anchor="middle">Snorlax</text>
<text class="d-muted" x="545" y="64" text-anchor="middle">nickname: (empty)</text>
<text x="10" y="118">No key</text>
<rect class="d-box" x="150" y="92" width="150" height="50" rx="4" />
<text x="225" y="114" text-anchor="middle">Eevee</text>
<text class="d-muted" x="225" y="132" text-anchor="middle">nickname: Sparky</text>
<rect class="d-box" x="310" y="92" width="150" height="50" rx="4" />
<text x="385" y="114" text-anchor="middle">Snorlax</text>
<text class="d-muted" x="385" y="132" text-anchor="middle">nickname: (empty)</text>
<text class="d-muted" x="545" y="121" text-anchor="middle">last row removed</text>
<text x="10" y="186"><tspan class="d-code">(pokemon.id)</tspan></text>
<text class="d-muted" x="225" y="189" text-anchor="middle">Pikachu's row removed</text>
<rect class="d-key" x="310" y="160" width="150" height="50" rx="4" />
<text x="385" y="182" text-anchor="middle">Eevee</text>
<text class="d-muted" x="385" y="200" text-anchor="middle">nickname: (empty)</text>
<rect class="d-key" x="470" y="160" width="150" height="50" rx="4" />
<text x="545" y="182" text-anchor="middle">Snorlax</text>
<text class="d-muted" x="545" y="200" text-anchor="middle">nickname: (empty)</text>
</svg>
<svg class="d-narrow" viewBox="0 0 300 300" role="img" aria-labelledby="each-narrow-title">
<title id="each-narrow-title">Removing Pikachu from a three-row list where Pikachu's nickname box says Sparky. Without a key, Svelte updates rows by position: the first row now says Eevee but still holds Sparky, and the last row is removed. With a key, Pikachu's own row is removed, and Eevee's and Snorlax's rows are untouched.</title>
<text x="4" y="18">Before</text>
<rect class="d-box" x="4" y="26" width="94" height="46" rx="4" />
<text x="51" y="46" text-anchor="middle">Pikachu</text>
<text class="d-muted" x="51" y="64" text-anchor="middle">Sparky</text>
<rect class="d-box" x="103" y="26" width="94" height="46" rx="4" />
<text x="150" y="46" text-anchor="middle">Eevee</text>
<rect class="d-box" x="202" y="26" width="94" height="46" rx="4" />
<text x="249" y="46" text-anchor="middle">Snorlax</text>
<text x="4" y="112">No key</text>
<rect class="d-box" x="4" y="120" width="94" height="46" rx="4" />
<text x="51" y="140" text-anchor="middle">Eevee</text>
<text class="d-muted" x="51" y="158" text-anchor="middle">Sparky</text>
<rect class="d-box" x="103" y="120" width="94" height="46" rx="4" />
<text x="150" y="140" text-anchor="middle">Snorlax</text>
<text class="d-muted" x="249" y="148" text-anchor="middle">removed</text>
<text x="4" y="206"><tspan class="d-code">(pokemon.id)</tspan></text>
<text class="d-muted" x="51" y="242" text-anchor="middle">removed</text>
<rect class="d-key" x="103" y="214" width="94" height="46" rx="4" />
<text x="150" y="234" text-anchor="middle">Eevee</text>
<rect class="d-key" x="202" y="214" width="94" height="46" rx="4" />
<text x="249" y="234" text-anchor="middle">Snorlax</text>
</svg>
<figcaption>Remove Pikachu after typing a nickname in its row. Without a key, the rows stay and their text shifts up, so Eevee inherits "Sparky." With <code>(pokemon.id)</code>, Svelte removes Pikachu's own row.</figcaption>
</figure>

## Predict, then reveal

```svelte
{#each party as pokemon}
  <li>
    <label>Nickname for {pokemon.name} <input /></label>
    <button onclick={() => (party = party.filter((p) => p !== pokemon))}>
      Remove {pokemon.name}
    </button>
  </li>
{/each}
```

<details>
<summary>You type "Sparky" into Pikachu's nickname box, then press Remove Pikachu. Where is "Sparky" now?</summary>

In Eevee's box. With no key, Svelte keeps the first two rows and updates their text by position: row 1 now says Eevee, but the `<input>` in it is the same element, still holding what you typed. The fix is a key, `{#each party as pokemon (pokemon.id)}`, so Svelte removes Pikachu's own row. Anything a row keeps for itself (typed text, focus, an open `<details>`) needs one.

</details>

<details>
<summary>The Remove control is <code>&lt;span onclick={remove}&gt;✕&lt;/span&gt;</code>. It works with the mouse. What happens with the keyboard, and where would you find out first?</summary>

Nothing: Tab skips straight past it, because a `<span>` can't take focus and doesn't respond to Enter. You'd find out first in the terminal running `npm run dev`, where Svelte warns `a11y_click_events_have_key_events` and `a11y_no_static_element_interactions` the moment it compiles. The fix is a `<button>`, with words a screen reader can say: "Remove Pikachu", not "✕".

</details>

## Try it together

Pair programming, with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S07.

We start here, in plan mode:

```text
In try/s07/, make a Svelte 5 page that fetches pikachu, eevee, and snorlax from PokéAPI and lists them, each with a Remove button. Show a loading message, an error if the fetch fails, and a message when the party is empty.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Read the terminal.** Any `a11y_…` warnings where `npm run dev` is running?
- **Type, then remove.** Type a nickname in one row and remove the row above it. Where did the text go?
- **Break the fetch.** Change `eevee` to `eeveee`. Is there a message on the page?
- **Empty it.** Remove all three with the keyboard. Is there a message, and where is focus?

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on the `{#each}` line. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, run the starting prompt above in your kit, ask Claude to start `npm run dev`, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S07, out loud or to Claude:

- What's the key in the `{#each}`, and what goes wrong without it?
- Which block shows the loading message, and which shows the error?
- How many places hold "is it loading?" Could two of them disagree?
- What does the terminal say while `npm run dev` runs?
- After the last Remove, where is focus, and which line put it there?

**Watch for:** an `{#each}` with no key; a clickable `<div>` or `<span>` for Remove (the warning scrolls past while the page reloads); `{#await}` with no `{:catch}`, or separate `loading`, `error`, and `data` variables that can disagree; the fetch inside an `$effect` that writes to `$state`; focus dropped on the page after the last Remove, as in S02.

</details>

## Links

- Svelte: [`{#if}`](https://svelte.dev/docs/svelte/if), [`{#each}`](https://svelte.dev/docs/svelte/each) (keyed each blocks), [`{#await}`](https://svelte.dev/docs/svelte/await), [Basic markup](https://svelte.dev/docs/svelte/basic-markup) (event attributes), [Compiler warnings](https://svelte.dev/docs/svelte/compiler-warnings) (the `a11y_` list)
- MDN: [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button), [`HTMLElement.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus), [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
