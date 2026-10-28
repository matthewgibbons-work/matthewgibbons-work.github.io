---
title: "Bridge to DIGHT 340"
description: "A first look at JavaScript: a script that listens for an event and changes the page, checked the same way as everything else."
courses: [dight250]
ready: false # true once the S14 dry run passes (PLAN.md: Build order)
session: 14
date: 2026-12-09
---

# Bridge to DIGHT 340

**The big idea:** HTML is the content, CSS is the look, and JavaScript is the behavior. A script listens for something to happen and changes the page in response, and everything you've learned about checking still applies to it.

## In short

HTML is the content, CSS is the look, and JavaScript is the behavior: a script finds an element, listens for an event, and changes the page in response. Everything you've checked all term still applies, so a button has to be a real `<button>` that works from the keyboard and tells screen readers its state. For S14 you need one `.js` file loaded with `defer`, a real `<button>` per episode whose `aria-pressed` flips between `"false"` and `"true"`, the state shown in more than color, and no console errors.

## Where JavaScript fits

All term, `AGENTS.md` has kept JavaScript out of your repo, and you've done a lot without it: `<details>` that opens and closes, forms the browser checks, dark mode, layouts that respond to the screen. Use HTML and CSS first. Reach for a script when the page has to *remember* or *react* in a way they can't, like marking an episode as watched.

This session is the one exception, written into `AGENTS.md` all term: plain JavaScript, no libraries, only in `sparks/s14-bridge/`.

A script lives in its own file, loaded from the HTML with `defer`, so it waits until the page's HTML has been read:

```html
<script src="script.js" defer></script>
```

## Events

The browser turns the page into objects your script can find and change: the **DOM** (Document Object Model). A script finds elements, then **listens** for events on them, like a click, and runs a function when one happens.

```html
<button type="button" class="watched" aria-pressed="false">Watched</button>
```

```js
const buttons = document.querySelectorAll('.watched');

for (const button of buttons) {
  button.addEventListener('click', () => {
    const pressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!pressed));
  });
}
```

Read it in plain words: find every watched button; for each one, when it's clicked, read whether it's pressed, and flip it. `const`, `===`, and `defer` are the course conventions `AGENTS.md` has listed all term; now you can see what they're for.

CSS can style the state, so it shows in more than color:

```css
.watched[aria-pressed="true"] {
  font-weight: bold;
}

.watched[aria-pressed="true"]::after {
  content: " ✓";
}
```

## Accessible behavior

- **Use a real `<button>`.** It's in the Tab order, Enter and Space press it, and screen readers say "button". A `<div>` with a click listener does none of that.
- **Say what changed.** `aria-pressed` tells a screen reader the button is a toggle and whether it's on ("Watched, toggle button, pressed"). `aria-expanded` does the same for something that shows and hides.
- **Check the console.** A script that throws an error just stops; the page looks fine and does nothing. DevTools' **Console** is the script's validator.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 180" role="img" aria-labelledby="event-wide-title">
<title id="event-wide-title">One click, step by step. Someone presses the button; the browser fires a click event; your listener function runs; it changes the page by setting aria-pressed to true. A screen reader then says: Watched, toggle button, pressed.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="10" y="20" width="132" height="56" rx="6" />
<text x="76" y="44" text-anchor="middle">Click, Enter,</text>
<text x="76" y="64" text-anchor="middle">or Space</text>
<line class="d-line" x1="142" y1="48" x2="166" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="169" y="20" width="132" height="56" rx="6" />
<text x="235" y="44" text-anchor="middle">a "click"</text>
<text x="235" y="64" text-anchor="middle">event</text>
<line class="d-line" x1="301" y1="48" x2="325" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="328" y="20" width="132" height="56" rx="6" />
<text x="394" y="44" text-anchor="middle">your listener</text>
<text x="394" y="64" text-anchor="middle">runs</text>
<line class="d-line" x1="460" y1="48" x2="484" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="487" y="20" width="143" height="56" rx="6" />
<text x="558" y="44" text-anchor="middle">the page</text>
<text x="558" y="64" text-anchor="middle">changes</text>
<text class="d-code" x="630" y="108" text-anchor="end">aria-pressed="true"</text>
<text class="d-muted" x="10" y="146">A screen reader says:</text>
<text x="10" y="168">"Watched, toggle button, pressed"</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 360" role="img" aria-labelledby="event-narrow-title">
<title id="event-narrow-title">One click, step by step. Someone presses the button; the browser fires a click event; your listener function runs; it changes the page by setting aria-pressed to true. A screen reader then says: Watched, toggle button, pressed.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="40" y="4" width="200" height="40" rx="6" />
<text x="140" y="29" text-anchor="middle">Click, Enter, or Space</text>
<line class="d-line" x1="140" y1="44" x2="140" y2="62" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="40" y="64" width="200" height="40" rx="6" />
<text x="140" y="89" text-anchor="middle">a "click" event</text>
<line class="d-line" x1="140" y1="104" x2="140" y2="122" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="40" y="124" width="200" height="40" rx="6" />
<text x="140" y="149" text-anchor="middle">your listener runs</text>
<line class="d-line" x1="140" y1="164" x2="140" y2="182" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="40" y="184" width="200" height="40" rx="6" />
<text x="140" y="209" text-anchor="middle">the page changes</text>
<text class="d-code" x="140" y="252" text-anchor="middle">aria-pressed="true"</text>
<text class="d-muted" x="140" y="300" text-anchor="middle">A screen reader says:</text>
<text x="140" y="324" text-anchor="middle">"Watched, toggle button,</text>
<text x="140" y="344" text-anchor="middle">pressed"</text>
</svg>
<figcaption>One click, step by step. The script's job ends with a change to the page, and that change has to be visible and announced.</figcaption>
</figure>

## What DIGHT 340 does with this

340 starts where this leaves off: finding and changing elements, fetching data from other sites, splitting code into modules, and then Svelte and Astro, frameworks that write much of this for you. The loop is the same, the agent is the same idea, and so are the checks: does it work for everyone, and can you explain every line?

## Predict, then reveal

<details>
<summary>A script in <code>&lt;head&gt;</code> with no <code>defer</code> runs <code>document.querySelector('button')</code>. What does it get?</summary>

`null`. The script runs as soon as the browser reaches it, before the buttons further down the page exist. The next line, `addEventListener`, then throws an error in the console, and nothing works. `defer` makes the script wait until the HTML has been read.

</details>

<details>
<summary>A <code>&lt;div class="button"&gt;</code> has a click listener. Can a keyboard user use it?</summary>

No. A `<div>` isn't in the Tab order, so they can't reach it, and Enter and Space do nothing on it. A screen reader doesn't call it a button, either. A real `<button>` gets all of that for free.

</details>

<details>
<summary>You want each episode's summary to show and hide on demand. Which way needs no JavaScript at all?</summary>

`<details>` and `<summary>`: the browser handles the open and close, the keyboard, and what a screen reader says. Everything on this course site's "Predict, then reveal" checks works that way. Use a script when HTML can't do it.

</details>

## Try it together

Pair programming, with the whole class. I drive Copilot on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S14.

JavaScript is allowed only in `sparks/s14-bridge/`, so we start from a copy of an S02 Episode Guide in `sparks/s14-bridge/try/` (your `.gitignore` keeps any folder called `try` out of your commits):

```text
Add a button that shows and hides the episode summaries, using JavaScript.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- Is it a real `<button>`? Tab to it and press Enter, then Space. Does it work both ways?
- With VoiceOver on (Cmd + F5), does it say "expanded" and "collapsed"? Is there an `aria-expanded` that changes?
- Open DevTools' **Console**. Any red errors? Is the script loaded with `defer`, and does it use `const` or `let` and `===`?
- Could `<details>` have done this with no JavaScript?

**Dig deeper:** we highlight the `addEventListener` line and run [`/dig-deeper`](/250/skills/dig-deeper/). We ask what each part of it means. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `sparks/s02-episode-guide-rerun/` folder to `sparks/s14-bridge/try/`, run the starting prompt above, try the same pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S14, out loud or to the agent:

- Which element does the script listen to, and for which event?
- Is it a real `<button>`? What happens with Tab, then Enter, then Space?
- What will a screen reader say before and after a press? Which attribute changes?
- Where is the script loaded, and what would go wrong without `defer`?
- Could `<details>` have done this with no JavaScript at all?

**Watch for:** a `<div>` or `<span>` with a click listener instead of a `<button>`, so the keyboard can't reach it; no `aria-expanded`, so a screen reader can't tell whether the summaries are showing; the script in `<head>` without `defer`, so it can't find the button, and the console shows an error; summaries hidden with an inline style the script flips, when `<details>` would have done it with no script at all; `var` and `==`, which `AGENTS.md` asks the agent not to use.

</details>

## Links

- MDN: [What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript), [DOM scripting](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting), [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events), [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), [`setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute), [`<script>` and `defer`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script), [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button), [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), [`aria-pressed`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed), [`aria-expanded`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded)
- Tool: [Chrome DevTools Console](https://developer.chrome.com/docs/devtools/console)
- The next course: [DIGHT 340](/340/)
