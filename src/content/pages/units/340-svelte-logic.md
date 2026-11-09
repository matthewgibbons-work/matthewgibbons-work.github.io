---
title: "Svelte logic and events"
description: "if, each, and await blocks; fetching data in a component; and the accessibility warnings Svelte gives you for free."
courses: [dight340]
ready: true
session: 7
prototype: P3
date: 2026-11-09
sticky_assignments: true # experiment 6 (PLAN.md, "Experiments")
---

# Svelte logic and events

<details>
<summary>Key takeaways</summary>

- Markup can **branch, repeat, and wait**: `{#if}` chooses, `{#each}` repeats, and `{#await}` shows loading, the result, or the error for a Promise.
- **Key every `{#each}`** that can change: `(pokemon.id)` tells Svelte which row belongs to which item, so removing one removes *that* row, not the last one with its text shifted up.
- **`{#await}` replaces three flags.** Hold the Promise in `$state`; assign a new one to fetch again. Always give it a `{:catch}`.
- **Events are attributes**: `onclick`, `onsubmit`, `onkeydown`, each given a function.
- **The compiler checks accessibility as it builds**: a clickable `<span>` or an `<img>` with no `alt` is an `a11y_…` warning. Treat every one as a bug, and reach for a `<button>`.

</details>

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

## At a glance

The syntax on this page in one place.

| Syntax | Example | What it does |
| --- | --- | --- |
| `{#if}` … `{:else}` … `{/if}` | `{#if party.length === 0}` | Shows one piece of markup or another |
| `{#each}` … `{/each}` | `{#each party as pokemon}` | Repeats markup for every item in a list |
| a key, in brackets | `{#each party as pokemon (pokemon.id)}` | Ties each row to its item, so a remove takes the right row (and what's typed in it) |
| `{:else}` inside `{#each}` | `{:else}<li>Your party is empty.</li>` | Shown when the list is empty |
| `{#await}` … `{:then}` … `{:catch}` … `{/await}` | `{#await request}` | Loading, then the result, or the error, for one Promise |
| a new Promise in `$state` | `request = lookUp('mew')` | Fetches again: `{#await}` starts over at loading |
| event attributes | `onclick={() => remove(pokemon)}`, `onsubmit`, `onkeydown` | Runs a function when the event happens |
| `a11y_click_events_have_key_events` | on a `<span onclick>` | The compiler's "this can't be used with a keyboard": use a `<button>` |
| `a11y_missing_attribute` | on an `<img>` with no `alt` | The compiler's "a screen reader can't describe this": add `alt` |

## Live demo

The whole class, one component: I change the markup on the projector, you call what happens next. The sandbox is a Svelte Playground with a party already in `$state` and a `lookUp()` function ready, so each step is one change to the markup, and the Playground's warnings show up the moment you type. [Open the Svelte sandbox in the Playground](https://svelte.dev/playground/untitled#H4sIAAAAAAAAE22VXW7bRhDHrzJmA1gKRNKSbBigZQMBGqQFnMRA0qcoiFfcIbnRcne7M5TEGgZyh5yiJ-h7e5OcpFhSH47tF4mYmf9v54vLu8iIGqMs-vX3N799hOnpCfz7D3w4OQcSRi7sJhpFLJReKyOjrBCacBQVSiNF2ae7iFsXxMEQjXaoV84ltELNwbYQhM_Zc2sYDVOURbOjOJ4bgGu1QpBY293ZUFgPHzoFaFuqHISRgKugg8H09GQEhETKGjgfJvB649CrGg3DBJSBm-tX75JajgJ7Hh28NI8SeO_QoASuvG3KChTT7qQbLdrS28ZI0MosYcAVQmMUgxMlQiUIFA8vQBSMPrBRKlamBK4UQWjFCDyWaNALRgjqwMnAWImQ28YTxqQY420P0m25qdufHAdFUn-lwP9YIVDulWNQBB6FbC86bN8rRkdQ2lBxMPLaQi38EiU4LXKknSMYG5fMTRxfzc2sJ16FAzSG2jy3cAkviAXj4FOwA9yBkhlMzkYQZpjBsVNLkVfNMdyPHkaMp9N9COIK8UnA6SGAjPVabHYhn4cXcxMeisbkHIbpsbYrHDi7xNqaIdz1pF2K3X9SKM3oBwM3hMsrcHB0eQk7xUUQ3PfUNIX3JuyPXTYuAwE33taKcAQVahma05cMZEEQqdKEWQowuAZrEArkvEICUQplkkAU1Jr8kG0g_-EGobh9qrk1xOCRnDWEcAliLRT3rMFtxewoS9OQrnAqyW0qnEpXk3RbQPriLuDub_tKAFQBg6MdLrHLYbe46y7J195bP7h9Z-HGLv_7u7YGcqE1SphHW848SvYoj9x4s88t-UrWDH7qWFgHj382SHxYiG2Vx1Ix2-NhEMzS_Q7NzawaX71t-9nM0mrcGxvdLVh4w-FDt6jjH9--n2bdQvbzLC0SVOgR-r1MO00ATq6urV12Q2jcLK0mvf3AOvvx7ft5z-rH-xgW1pxbjV0S6UvoeOEOKRA1WKPbBN5ouxB6FMbfxVJ363i7pi5y0TBbQ9DaBiqxQnPMIKRECS1y31GQNli9UISQE31pTEMovxBqzNl6WAsflooSeJkGSVZ2Zw4WVrb7lSms4QzGyXhy5rFOx8kZUEuMddyoUbgRKSb0qng4qR2o0Q9eEimVKTM42c5bK-K4qyzcQAaf02u110tF4RrKoNC42SLCY7z2wmUQfrdWoVVpYsVYUwY5Gka_9ZQh8iQ5D4VsTbXwpTLxQtt8GXwPXIeMO-sj4cJ6iT6DidsAWa0k_DKdTn9yxl5I1dAjLOOGY_bCUGF9nUEunGKh1V_PdqAf86NhKFOhV_w0z8mTRB_hssLmDcUrRWqhD9eCbVgrgxmcHqoZj8cXP3ljWxSEnMHUbXbsWbrb4_A9xg1HGfsG7z_f_w_oIJa6wQcAAA). It runs in your browser with nothing to install; to keep your changes, use the Playground's **Save** (it asks you to sign in with GitHub) or <a href="/sandbox/340-s07/App.svelte" download="App.svelte">download the starting file</a>.

Each step says where to type, what to type, and what to look for. Three things to know first:

- **Every edit restarts the component.** The party is back to three and the lookup runs again, so anything you typed into the result is gone.
- **Warnings show as a wavy underline** in the editor. Hover it to read the warning and its code.
- **The console** is under the result: click **Console** to open it.

1. **List the party with `{#each}`.** Inside the `<ul>`, replace the comment `<!-- Steps 1–4: the party goes here -->` with:

   ```svelte
   {#each party as pokemon}
     <li>{pokemon.name}</li>
   {/each}
   ```

   Three rows: Pikachu, Eevee, and Snorlax. (The capitals come from the CSS.)

2. **A Remove that only works with a mouse.** Inside the `<li>`, after `{pokemon.name}`, add:

   ```svelte
   <span onclick={() => remove(pokemon)}>✕</span>
   ```

   Click a ✕: the row goes. Now hover the underline under `<span`. There are two warnings: `a11y_click_events_have_key_events` and `a11y_no_static_element_interactions`. Click in the result and press Tab: focus never lands on a ✕. Replace the whole `<span>` with:

   ```svelte
   <button onclick={() => remove(pokemon)}>Remove {pokemon.name}</button>
   ```

   The underline goes. Tab reaches every button, and Enter or Space removes that row.

3. **The empty list with `{:else}`.** Just before `{/each}`, add:

   ```svelte
   {:else}
     <li>Your party is empty.</li>
   ```

   Tab to a Remove button and press Enter, three times. After the last one, "Your party is empty." appears. Where did focus go each time the button you pressed disappeared? (On your own comes back to that.)

4. **Why the key matters.** Inside the `<li>`, between `{pokemon.name}` and the button, add:

   ```svelte
   <label>Nickname <input /></label>
   ```

   Type "Sparky" in Pikachu's box, then press Remove Pikachu. Eevee's row now says "Sparky." With no key, Svelte updated the rows by position: it moved the names up and removed the *last* row, and the typed text stayed in the first box. Now change the first line to:

   ```svelte
   {#each party as pokemon (pokemon.id)}
   ```

   Type "Sparky" for Pikachu again (the edit restarted the component), and remove Pikachu. Pikachu's own row goes, and Eevee's box is still empty.

5. **`{#await}` for the lookup.** Under "Look one up," replace the comment `<!-- Steps 5–7: the lookup goes here -->` with:

   ```svelte
   {#await request}
     <p>Looking it up…</p>
   {:then pokemon}
     <p>Found {pokemon.name}.</p>
     <img src={pokemon.sprites.front_default} />
   {/await}
   ```

   "Looking it up…" flashes, then Ditto's name and picture appear. Hover the underline under `<img`: `a11y_missing_attribute`. Add `alt={pokemon.name}` to the `<img>`, and the warning goes.

6. **Break the fetch.** In the `<script>`, change the last line to:

   ```js
   let request = $state(lookUp('dittoo'));
   ```

   "Looking it up…" shows, then disappears, and nothing takes its place. Open the console: the error is there, where no visitor will ever see it. Now, just before `{/await}`, add:

   ```svelte
   {:catch error}
     <p>{error.message}</p>
   ```

   The page says: No Pokémon called "dittoo". Leave the typo in for step 7.

7. **Fetch again.** Just above `{#await request}`, add:

   ```svelte
   <button onclick={() => (request = lookUp('mew'))}>Look up Mew</button>
   ```

   Press it. The error goes, "Looking it up…" shows, then Mew appears. Giving `request` a new Promise sent `{#await}` back to loading. Press it again: loading, then Mew, every time.

**On your own:** in your own Playground copy (a few minutes each):

- Show "Party full" instead of the list's last row once there are six, with `{#if}`. (Add three more to `party` to test it.)
- Turn "Look up Mew" into a labeled form with a text box and `onsubmit`, so you can look up anyone.
- After the last Remove, where is focus? Make it land on the heading instead.

## Links

- Svelte: [`{#if}`](https://svelte.dev/docs/svelte/if), [`{#each}`](https://svelte.dev/docs/svelte/each) (keyed each blocks), [`{#await}`](https://svelte.dev/docs/svelte/await), [Basic markup](https://svelte.dev/docs/svelte/basic-markup) (event attributes), [Compiler warnings](https://svelte.dev/docs/svelte/compiler-warnings) (the `a11y_` list)
- Dig deeper: run [`/dig-deeper`](/340/skills/dig-deeper/) on the `{#each}` line of your own S07. What goes wrong without its key?
- MDN: [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button), [`HTMLElement.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus), [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
