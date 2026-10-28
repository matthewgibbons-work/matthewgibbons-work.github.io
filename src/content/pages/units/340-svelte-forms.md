---
title: "Svelte forms and shared state"
description: "bind:, shared state in .svelte.js modules, labeled inputs, and errors people can perceive. Spark: your Final Project intent brief."
courses: [dight340]
ready: false # true once the S09 dry run passes, with the S09 brief (PLAN.md: Build order)
session: 9
prototype: P4
date: 2026-11-18
---

# Svelte forms and shared state

**The big idea:** a form is a conversation. `bind:` keeps an input and your state in step, shared state lets two components see the same party, and every error has to reach the person, not just the console.

## In short

`bind:value` keeps an input and your state in step, a shared `.svelte.js` module lets two components see the same party, and every form error has to reach the person in words, not just in red or in the console. Today's Spark, S09, is your Final Project intent brief and doesn't use this; P4 does: a labelled form whose errors are announced and focused, and a party shared between components.

## How it works

**Binding.** `bind:value={nickname}` ties an input to a `$state` variable both ways: typing changes `nickname`, and setting `nickname` changes what's in the box. There's `bind:checked` for a checkbox and `bind:group` for a set of radio buttons or checkboxes. Handle the form's `onsubmit` (so Enter works), call `event.preventDefault()`, then check the values yourself.

**Errors people can find.** Each input has a visible `<label>`. The error is text, not just a red border, in an element that's on the page from the start, so a screen reader announces it when it fills in (`role="alert"` or `aria-live`). The input points at it with `aria-describedby` and says it's invalid with `aria-invalid`, and focus goes back to the first field that needs fixing.

**Shared state.** Put state two components need in its own module, a file ending `.svelte.js` so runes work in it, and import it in both: `export const party = $state({ members: [] })`. Components **change its properties** (`party.members.push(…)`), and every importer sees the change. You can't export a `$state` variable and then reassign it; Svelte refuses to build (the predict check shows why).

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

## Predict, then reveal

```js
// counter.svelte.js
export let count = $state(0);

export const increment = () => {
  count += 1;
};
```

<details>
<summary>Two components import <code>count</code> and <code>increment</code>. One calls <code>increment()</code>. What does the other one show?</summary>

Neither shows anything: the project won't build. Svelte stops with `state_invalid_export`: "Cannot export state from a module if it is reassigned." An import is a live link to a *variable*, but Svelte's reactivity lives in what `$state` gives back, and reassigning `count` would quietly replace it. So export an object and change its properties (`export const counter = $state({ count: 0 })`, then `counter.count += 1`), or export functions that read and change it.

</details>

<details>
<summary>The nickname input has <code>placeholder="Nickname"</code> and no <code>&lt;label&gt;</code>. A sighted mouse user types a name and it works. What does a screen-reader user hear, and what does anyone see once they start typing?</summary>

Many screen readers don't treat a placeholder as the input's name, so they may hear just "edit text." And once anyone types, the placeholder disappears, so nobody can check what the box was for. A visible `<label for="…">` fixes both, and it makes the label clickable, which is a bigger target.

</details>

## Try it together

Pair programming, with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio; it's practice for P4, since S09 is your intent brief.

We start from a copy of `try/s08/` in `try/s09/`, in plan mode:

```text
In try/s09/, add a form to rename a party member: a nickname input, up to 12 characters, required. Move the party into a shared party.svelte.js module, and add a TeamSummary component that lists everyone by nickname.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Submit it empty, keyboard only.** Is there an error in words? Where's focus? Does VoiceOver (Cmd+F5) read the error?
- **Submit 13 characters, then only spaces.** Same questions.
- **Inspect the input.** In Elements: a `<label>`? `aria-invalid` and `aria-describedby` pointing at the error?
- **Rename someone.** Does the summary update without a reload? Find the line that changes the shared party.

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on the `bind:value` line. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your S08 folder to `try/s09/`, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio as you start P4, out loud or to Claude:

- What names each input? Is it still there after you type?
- Where does the error message live before there's an error?
- Which line moves focus back to the field, and when does it run?
- When are errors checked: on submit, or on every keystroke?
- Is the shared party an object whose properties change, or something reassigned?

**Watch for:** a `placeholder` instead of a `<label>`; the error shown only as a red border, or added to the page at the moment of the error, so it's never announced; errors shouted at people mid-word; the browser's `required` bubble left to do the work, with nothing for the 12-character rule; shared state exported as a `let` and reassigned, or "fixed" with `$effect`s that copy one component's state into another.

</details>

## Links

- Svelte: [`bind:`](https://svelte.dev/docs/svelte/bind), [`$state`: passing state across modules](https://svelte.dev/docs/svelte/$state#Passing-state-across-modules), [`.svelte.js` files](https://svelte.dev/docs/svelte/svelte-js-files)
- MDN: [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label), [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid), [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby), [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role), [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- WAI: [Form validation and errors](https://www.w3.org/WAI/tutorials/forms/notifications/)
