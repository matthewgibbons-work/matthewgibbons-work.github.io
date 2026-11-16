---
title: "Svelte forms and shared state"
description: "bind:, shared state in .svelte.js modules, labeled inputs, and errors people can perceive. Spark: your Final Project intent brief."
courses: [dight340]
ready: true
session: 9
prototype: P4
date: 2026-11-18
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Svelte forms and shared state

<details>
<summary>Key takeaways</summary>

- **A form is a conversation.** It asks in words (a visible `<label>`), answers in words (an error message, not just red), and puts you back where you need to be (focus on the field to fix).
- **`bind:value` goes both ways.** Typing changes the state; changing the state changes what's in the box.
- **Handle `onsubmit`, not the button's click**, so Enter works too, and call `event.preventDefault()` so the browser doesn't send the form and leave the page.
- **An error people can perceive** is text in an element that's on the page from the start (`role="alert"`), joined to its input by `aria-describedby`, with `aria-invalid` on the input.
- **Shared state lives in a `.svelte.js` module.** Export it as a `const` and change what's inside it; Svelte won't build a module that reassigns exported state (`state_invalid_export`).
- **Today's Spark doesn't use this.** S09 is your Final Project intent brief; P4 is where forms and shared state come in.

</details>

## How it works

**Binding.** `bind:value={nickname}` ties an input to a `$state` variable both ways: typing changes `nickname`, and setting `nickname` changes what's in the box. There's `bind:checked` for a checkbox and `bind:group` for a set of radio buttons or checkboxes. Handle the form's `onsubmit` (so Enter works), call `event.preventDefault()`, then check the values yourself.

**Errors people can find.** Each input has a visible `<label>`. The error is text, not just a red border, in an element that's on the page from the start, so a screen reader announces it when it fills in (`role="alert"` or `aria-live`). The input points at it with `aria-describedby` and says it's invalid with `aria-invalid`, and focus goes back to the first field that needs fixing.

**Shared state.** Put state two components need in its own module, a file ending `.svelte.js` so runes work in it, and import it in both: `export const party = $state({ members: [] })`. Components **change its properties** (`party.members.push(…)`), and every importer sees the change. You can't export a `$state` variable and then reassign it: Svelte refuses to build, with `state_invalid_export`. An import is a live link to a variable, but Svelte's reactivity lives in what `$state` gives back, and reassigning would quietly replace it. So export a `const` and change what's inside it, or export functions that read and change it.

```svelte
<form onsubmit={save} novalidate>
  <label for="nickname">Nickname for Pikachu</label>
  <input id="nickname" bind:this={input} bind:value={nickname}
    aria-invalid={error !== ''} aria-describedby="nickname-error" />
  <p id="nickname-error" role="alert">{error}</p>
  <button>Save nickname</button>
</form>
```

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 160" role="img" aria-labelledby="bind-wide-title">
<title id="bind-wide-title">An input and the nickname state are tied both ways by bind:value. On a valid submit, the form changes the shared party in party.svelte.js. Every component that imports the party, such as the team summary, shows the change.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="40" width="112" height="60" rx="6" />
<text x="60" y="66" text-anchor="middle">Input</text>
<text class="d-muted d-code" x="60" y="86" text-anchor="middle">&lt;input&gt;</text>
<line class="d-line" x1="120" y1="70" x2="164" y2="70" marker-start="url(#arrow-wide)" marker-end="url(#arrow-wide)" />
<text class="d-muted d-code" x="142" y="30" text-anchor="middle">bind:value</text>
<rect class="d-box" x="168" y="40" width="136" height="60" rx="6" />
<text x="236" y="66" text-anchor="middle">Form state</text>
<text class="d-muted d-code" x="236" y="86" text-anchor="middle">nickname</text>
<line class="d-line" x1="304" y1="70" x2="330" y2="70" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="318" y="124" text-anchor="middle">valid submit</text>
<rect class="d-key" x="332" y="40" width="136" height="60" rx="6" />
<text x="400" y="66" text-anchor="middle">Shared state</text>
<text class="d-muted d-code" x="400" y="86" text-anchor="middle">party.svelte.js</text>
<line class="d-line" x1="468" y1="70" x2="494" y2="70" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="482" y="124" text-anchor="middle">every importer</text>
<rect class="d-box" x="496" y="40" width="136" height="60" rx="6" />
<text x="564" y="66" text-anchor="middle">Summary</text>
<text class="d-muted" x="564" y="86" text-anchor="middle">shows "Sparky"</text>
</svg>
<svg class="d-narrow" viewBox="0 0 262 330" role="img" aria-labelledby="bind-narrow-title">
<title id="bind-narrow-title">An input and the nickname state are tied both ways by bind:value. On a valid submit, the form changes the shared party in party.svelte.js. Every component that imports the party, such as the team summary, shows the change.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="4" width="190" height="56" rx="6" />
<text x="99" y="28" text-anchor="middle">Input</text>
<text class="d-muted d-code" x="99" y="48" text-anchor="middle">&lt;input&gt;</text>
<line class="d-line" x1="99" y1="62" x2="99" y2="80" marker-start="url(#arrow-narrow)" marker-end="url(#arrow-narrow)" />
<text class="d-muted d-code" x="110" y="76">bind:value</text>
<rect class="d-box" x="4" y="82" width="190" height="56" rx="6" />
<text x="99" y="106" text-anchor="middle">Form state</text>
<text class="d-muted d-code" x="99" y="126" text-anchor="middle">nickname</text>
<line class="d-line" x1="99" y1="138" x2="99" y2="158" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="110" y="153">valid submit</text>
<rect class="d-key" x="4" y="160" width="190" height="56" rx="6" />
<text x="99" y="184" text-anchor="middle">Shared state</text>
<text class="d-muted d-code" x="99" y="204" text-anchor="middle">party.svelte.js</text>
<line class="d-line" x1="99" y1="216" x2="99" y2="236" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="110" y="231">every importer</text>
<rect class="d-box" x="4" y="238" width="190" height="56" rx="6" />
<text x="99" y="262" text-anchor="middle">Summary</text>
<text class="d-muted" x="99" y="282" text-anchor="middle">shows "Sparky"</text>
</svg>
<figcaption><code>bind:value</code> keeps the box and the form's state in step while you type. Only a valid submit changes the shared party, and every component that imports it updates.</figcaption>
</figure>

## At a glance

The syntax on this page in one place.

| Syntax | Example | What it does |
| --- | --- | --- |
| `bind:value` | `<input bind:value={nickname} />` | Ties the box and the state together, both ways |
| `bind:group` | `<input type="radio" bind:group={role} value="attacker" />` | One state variable for a set of radio buttons (or checkboxes) |
| `bind:checked` | `<input type="checkbox" bind:checked={shiny} />` | Ties one checkbox to a `true`/`false` state |
| `onsubmit` | `<form onsubmit={save}>`, then `event.preventDefault();` | Runs on the button *and* Enter; stops the browser sending the form and leaving the page |
| `<label for>` | `<label for="nickname">…</label>` + `<input id="nickname">` | Names the input, stays visible while you type, and makes the label clickable |
| an error on the page from the start | `<p id="nickname-error" role="alert">{error}</p>` | Announced by a screen reader when its text fills in |
| `aria-invalid`, `aria-describedby` | `aria-invalid={error !== ''} aria-describedby="nickname-error"` | Says the field is wrong, and reads the error along with it |
| `bind:this` and `.focus()` | `<input bind:this={input}>`, then `input.focus();` | Gets the element itself, so you can send focus back to the field to fix |
| a `.svelte.js` module | `export const party = $state([…]);` | State any component can import; every importer sees the same party |
| `state_invalid_export` | `export let party = …;` then `party = [];` | Svelte refuses to build: change what's inside, don't reassign |

## Live demo

The whole class, one form: I change it on the projector, you call what happens next. The sandbox is a Svelte Playground where `App.svelte` owns a party of three and has a nickname form with no binding, no label, and no submit handler. `TeamSummary.svelte` and `party.svelte.js` are empty. Switch files with the tabs above the editor. [Open the Svelte sandbox in the Playground](https://svelte.dev/playground/untitled#H4sIAAAAAAAAE5VW224bNxD9lekmgOxgL5JlJ8hKdhGgQFogaAPYb1aQUOJIOzGXXHC4kgVBQD6k_Y6-91PyJQW5q6tlNH3bneGcOTw8O8tVpEWJUR798tv7X--gf9mFf_6G2-5bYKHl2DxGceQEqQVpGeVToRjjaEoKOcrvV5FbVr7YB6J4A_WuqlKeo3I-NhaMp-ITox1qx1EeDX9KkpEG-EBzBIml2fSGqbFwGyr8Y8kgtAQuhEUJ7IRDOOtfdmNgZCaj4e15Cn9UqFGCK6ypZwWQY4_donxUYjmzptYSFOkHOHMFQq3JQSVmCIVgIHc-ADF1aAElOdIzEHoJfotAGlxBDFOjJNrYA1ucoUbruXgsj5qDNhJhYmrLmDA5TNrdZu3GsmrLI_EVafmVvfYJd9960HdVBWahOUBWwrplkEKbxQDYYQVXUJo5erJA2plmTStu-pVTuCsaybxM1jEsyBUeWRsYk5akZ7F_VmKMKg6yagNcj0tyUAgtFdpB6B7OQ0gZuJQp3KEob-uyFHbTz1d76CMOTWfAsnLLdKST5GakhzyxVLkbv5zKyli3jwdTa0ropNnTHp3BSPsiha7V4xpeBgec3fs4wApI5nBxFYN3Ww6dih7EpKg7MWiaPLTBDqzj_fW9fn9bgDhH_I_ll7vlrI1V4vF0wafzPcKb_I5zp-Pzw2wrx0gPi97NnRWk0QYvDrOi1yRqFfRavUAxKdrdC4bKPGBpNJy1DynJ83VDdqjoZrUJ-87r3duGy8_wxX_p37_9-fJJcv39219fwG9nPcwUNe0z337tWQdCIz30_gq5IemqdlApMcEifBrXo-j3TSfv3I_NYYwiyJqKce2c0Te3Yo5bfYZZGw0rqpuPFueEixxWW2LDrPI2ytrWIz3c90_WhNgtFQaQ7BV8MOYh-HuKqMBotUzhvTJjoWJgA2EtB46osPQTaWf7QrDuOO9-lLBEB9Lojms0BiuIESbMn2tdM8rPjAonzlhYCKtJz7j5rth4wCXYcHz71oZXmcfKZ4HO2djI5TmsGvip0S6HXtq7uLJYZr30CnjJDsukptjPR04YLU0Hfvm68doGqFZbmEpI_63n0B00AUXskrBpP6U0nqpXtK0vhZ2RTsbKTB5y6KaezOAYOkShm77Zy46NlWhzuKgegY0iCS_6_f5BMrFCUs0HsEdM_DFvuUhiPzZzmFmSLdJMVEe0SvGYLEi6IoeLy2dgw9Q7kDpZIM0Kl8ObbvdURTD4eXxwXMGrRwdGukBL7qlEF080OupwLyyJhPRcKJLXHWdr7Hzaom_k7O_kHHe73YuTZO-tUXjdEQqt28MoSSdFu81eerWnmD_jnUUmRhmbHzT4MZEEk8Rj6zhThXYnjdOo0jttGym4QAkvXr9-_X99k0_NpOZkTkxjtaNkaqdIYw6XOxl7vd7gIJuY6ZTRBa032MNsM1P8dQgfXZT7A1rHz9yAjn6Fh9egp8m9u1CWwW34wedhDLV3nWbozwwyFGgx_VEeT3-kh1RO5o9uZls-Arids64Qzs-z5lLwHEkIv_xDop_W_wJVr0PQcQoAAA). It runs in your browser with nothing to install; to keep your changes, use the Playground's **Save** (it asks you to sign in with GitHub) or download the starting files: <a href="/sandbox/340-s09/App.svelte" download="App.svelte">App.svelte</a>, <a href="/sandbox/340-s09/TeamSummary.svelte" download="TeamSummary.svelte">TeamSummary.svelte</a>, <a href="/sandbox/340-s09/party.svelte.js" download="party.svelte.js">party.svelte.js</a>.

Each step says which file, what to type, and what to look for. Two things to know first:

- **Every edit restarts the app.** The party is back to three, with no nicknames.
- **If the result goes blank,** make any edit (even a space) and it comes back.

1. **Bind the box to the state.** Type in the box: the "Preview:" line under the button stays empty, because nothing connects them. In `App.svelte`, add `bind:value={nickname}` to the `<input>`:

   ```svelte
   <input placeholder="Nickname for Pikachu" bind:value={nickname} />
   ```

   Type again: the preview follows every key. Now the other way: change `let nickname = $state('');` to `$state('Sparky')`. The box starts with "Sparky" in it. Change it back to `''`.

2. **A label that stays.** Type a few letters: the placeholder is gone, and nothing on the page says what the box is for. Replace the `<input>` line with:

   ```svelte
   <label for="nickname">Nickname for Pikachu</label>
   <input id="nickname" bind:value={nickname} />
   ```

   The label stays while you type. Click the label: the cursor jumps into the box.

3. **Handle the submit, and say what's wrong in words.** Press **Save nickname** first: the result goes blank. The browser sent the form and left the page (make any edit to bring it back). In `App.svelte`, add this before `</script>`:

   ```js
   let error = $state('');

   function save(event) {
     event.preventDefault();
     const name = nickname.trim();
     if (name === '') {
       error = 'Enter a nickname for Pikachu.';
     } else if (name.length > 12) {
       error = 'Use 12 characters or fewer.';
     } else {
       error = '';
       party[0].nickname = name;
       nickname = '';
     }
   }
   ```

   Change `<form>` to `<form onsubmit={save}>`, and right after the `<input>` add the error's home, empty until there's an error:

   ```svelte
   <p id="nickname-error" role="alert">{error}</p>
   ```

   Press Save with the box empty: "Enter a nickname for Pikachu." Type 13 letters and press Enter: the length message. Type "Sparky" and press Enter: Pikachu's row says "Sparky", and the box clears.

4. **Tie the error to the field, and put focus back.** Replace the `<input>` line with:

   ```svelte
   <input id="nickname" bind:value={nickname} bind:this={input}
     aria-invalid={error !== ''} aria-describedby="nickname-error" />
   ```

   Add `let input;` before `</script>`, and `input.focus();` as the last line of *both* error branches in `save`. Click Save with the box empty: the box gets a red border, the message appears, and the cursor is back in the box, ready to fix it. Right-click the box and choose **Inspect**: `aria-invalid="true"`, and `aria-describedby` names the message's `id`. (A screen reader reads the label, "invalid", then the message.)

5. **Share the party with a module.** In `party.svelte.js`, replace the comment with the party from `App.svelte`, exported, plus a function that empties it:

   ```js
   export let party = $state([
     { id: 25, name: 'pikachu', nickname: '' },
     { id: 133, name: 'eevee', nickname: '' },
     { id: 143, name: 'snorlax', nickname: '' },
   ]);

   export function clear() {
     party = [];
   }
   ```

   In `App.svelte`, delete the `let party = $state([…]);` block and import it instead:

   ```js
   import { party } from './party.svelte.js';
   ```

   The result says **Error compiling party.svelte.js**: "Cannot export state from a module if it is reassigned" (`state_invalid_export`). The module reassigns `party` in `clear`. Delete `clear`, and change `export let` to `export const`: the app is back. Now in `TeamSummary.svelte`, replace the comment with:

   ```svelte
   <script>
     import { party } from './party.svelte.js';
   </script>

   <aside aria-labelledby="summary-title">
     <h2 id="summary-title">Team summary</h2>
     <p>{party.length} members: {party.map((p) => p.nickname || p.name).join(', ')}</p>
   </aside>
   ```

   A dashed Team summary box lists the party. Save "Sparky" as Pikachu's nickname: the summary changes too. `App` and `TeamSummary` never pass a prop; they import the same party.

**On your own:** in your own Playground copy (a few minutes each):

- Let the form rename anyone: three radio buttons in a `<fieldset>` with a `<legend>`, one `bind:group`, and `save` changes the chosen member. What does the label say now?
- Add a **Clear party** button to `TeamSummary` that empties the shared party *without* reassigning it.
- Send focus to the error message instead of the box. Is that better or worse for someone who has to fix the name?

## Links

- Svelte: [`bind:`](https://svelte.dev/docs/svelte/bind), [`$state`: passing state across modules](https://svelte.dev/docs/svelte/$state#Passing-state-across-modules), [`.svelte.js` files](https://svelte.dev/docs/svelte/svelte-js-files)
- MDN: [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label), [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid), [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby), [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role), [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- WAI: [Form validation and errors](https://www.w3.org/WAI/tutorials/forms/notifications/)
- Dig deeper: run [`/dig-deeper`](/340/skills/dig-deeper/) on the `bind:value` line when you start P4. Answer its predict question before the reveal.
