---
title: "Async 2: fetch and errors"
description: "async/await, fetching PokéAPI, JSON, and error handling: a request can fail in two ways, and only one of them throws."
courses: [dight340]
ready: true # S04 dry run passed Oct 28
session: 4
prototype: P1
date: 2026-10-28
---

# Async 2: fetch and errors

**The big idea:** a request can fail in two ways, and only one of them throws. `async`/`await` makes the code read top to bottom, but it still waits.

## In short

An `async` function always returns a Promise, and inside it `await` pauses *that function* until a Promise settles, while the rest of the page carries on. `fetch(url)` returns a Promise of a `Response`. It **rejects** only when the request can't happen at all: you're offline, or the server can't be reached. A server that answers "404 Not Found" or "500" is still an answer, so `fetch` **resolves**, with `response.ok` set to `false`. That's the second way to fail, and nothing throws unless you check `ok` and throw yourself. Once `ok` is true, `await response.json()` turns the body into objects. Put the whole thing in `try`/`catch`, show the error where people can see it (and hear it), and use `finally` to end the loading state either way. For a whole party, start every fetch and `await Promise.all(...)` once, exactly as on Monday.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 220" role="img" aria-labelledby="fetch-wide-title">
<title id="fetch-wide-title">await fetch either rejects, when you're offline, which goes to catch, or resolves. If it resolves, check response.ok. If ok is false, for example a 404, throw, which also goes to catch. If ok is true, await response.json, then render.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="10" y="30" width="150" height="50" rx="6" />
<text class="d-code" x="85" y="60" text-anchor="middle">await fetch(url)</text>
<line class="d-line" x1="160" y1="55" x2="186" y2="55" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="173" y="22" text-anchor="middle">resolves</text>
<rect class="d-box" x="188" y="30" width="140" height="50" rx="6" />
<text class="d-code" x="258" y="60" text-anchor="middle">response.ok?</text>
<line class="d-line" x1="328" y1="55" x2="354" y2="55" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="341" y="22" text-anchor="middle">true</text>
<rect class="d-box" x="356" y="30" width="150" height="50" rx="6" />
<text class="d-code" x="431" y="60" text-anchor="middle">await .json()</text>
<line class="d-line" x1="506" y1="55" x2="532" y2="55" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="534" y="30" width="96" height="50" rx="6" />
<text x="582" y="60" text-anchor="middle">render</text>
<line class="d-line" x1="85" y1="80" x2="85" y2="148" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="93" y="112">rejects:</text>
<text class="d-muted" x="93" y="130">offline</text>
<line class="d-line" x1="258" y1="80" x2="258" y2="148" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="266" y="112">false (404, 500):</text>
<text class="d-muted" x="266" y="130">you <tspan class="d-code">throw</tspan></text>
<rect class="d-key" x="10" y="150" width="318" height="56" rx="6" />
<text class="d-code" x="169" y="174" text-anchor="middle">catch</text>
<text x="169" y="195" text-anchor="middle">show a message people can see and hear</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 430" role="img" aria-labelledby="fetch-narrow-title">
<title id="fetch-narrow-title">await fetch either rejects, when you're offline, which goes to catch, or resolves. If it resolves, check response.ok. If ok is false, for example a 404, throw, which also goes to catch. If ok is true, await response.json, then render.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="10" width="176" height="50" rx="6" />
<text class="d-code" x="92" y="40" text-anchor="middle">await fetch(url)</text>
<line class="d-line" x1="92" y1="60" x2="92" y2="98" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="100" y="84">resolves</text>
<rect class="d-box" x="4" y="100" width="176" height="50" rx="6" />
<text class="d-code" x="92" y="130" text-anchor="middle">response.ok?</text>
<line class="d-line" x1="92" y1="150" x2="92" y2="188" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="100" y="174">true</text>
<rect class="d-box" x="4" y="190" width="176" height="50" rx="6" />
<text class="d-code" x="92" y="220" text-anchor="middle">await .json()</text>
<line class="d-line" x1="92" y1="240" x2="92" y2="278" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="280" width="176" height="50" rx="6" />
<text x="92" y="310" text-anchor="middle">render</text>
<line class="d-line" x1="180" y1="35" x2="250" y2="35" />
<text class="d-muted" x="186" y="27">rejects</text>
<line class="d-line" x1="180" y1="125" x2="250" y2="125" />
<text class="d-muted" x="186" y="117">false: throw</text>
<line class="d-line" x1="250" y1="35" x2="250" y2="366" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="368" width="272" height="56" rx="6" />
<text class="d-code" x="140" y="390" text-anchor="middle">catch</text>
<text x="140" y="412" text-anchor="middle">show a message people perceive</text>
</svg>
<figcaption>Two ways to fail. Offline, <code>fetch</code> rejects and lands in <code>catch</code> by itself. A 404 or 500 resolves, so it reaches <code>catch</code> only if you check <code>response.ok</code> and throw.</figcaption>
</figure>

## From a form to the page

P1 adds one Pokémon by name, which needs two DOM pieces S02 didn't use: a form's `submit` event, and a live region that screen readers announce.

```html
<form id="add-form">
  <label for="name">Pokémon name</label>
  <input id="name" name="name" required>
  <button>Add to party</button>
</form>
<p id="status" aria-live="polite"></p>
```

```js
const form = document.querySelector('#add-form');
const input = document.querySelector('#name');
const button = form.querySelector('button');
const status = document.querySelector('#status');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // stay on this page
  const name = input.value.trim().toLowerCase();
  button.disabled = true;
  status.textContent = `Loading ${name}…`;
  try {
    // fetch, check response.ok, await .json(), add to the party, render()
    status.textContent = `Added ${name}.`;
  } catch (error) {
    status.textContent = `Couldn't add ${name}: ${error.message}`;
  } finally {
    button.disabled = false;
  }
});
```

Listening for `submit` on the form, not `click` on the button, means Enter in the text box works too. `preventDefault()` stops the browser's normal form submission, which would reload the page. The `aria-live` paragraph is in the HTML from the start and empty: screen readers announce changes to its text, so it has to exist before the first message arrives.

## Predict, then reveal

```js
try {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachuu');
  const pokemon = await response.json();
  showPokemon(pokemon);
} catch (error) {
  showError(`Couldn't load that Pokémon: ${error.message}`);
}
```

<details>
<summary>The name has a typo (<code>pikachuu</code>). Does <code>showError</code> run?</summary>

No, at least not where you'd expect. The server answers with a 404, so `fetch` resolves. PokéAPI's 404 body is valid JSON (`{"status":404,"message":"Not Found"}`), so `.json()` resolves too. Then `showPokemon` gets an object with no `name` or `types`, and you see "undefined" on the page, or a TypeError from deep inside `showPokemon`. The fix is one line before `.json()`: `` if (!response.ok) throw new Error(`HTTP ${response.status}`); ``.

</details>

## Try it together

Pair programming, with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S04.

We start here, in plan mode:

```text
In try/s04/, fetch pikachu from PokéAPI and show its name and sprite on a page. Load the script with defer.
```

Then we put it under pressure, one step at a time: a misspelled name (`pikachuu`), then DevTools → Network → **Slow 4G**, then **Offline**. Each time, the question is what *our* code does, and which line does it.

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on the line with `await response.json()`. Answer its predict question before the reveal.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S04, out loud or to Claude:

- Where does this code wait, and what is it waiting for?
- If the name is misspelled, which line notices? (A 404 still resolves.)
- What does someone see while it loads, and which line takes that away?
- When the network is offline, which line runs?
- What will a screen reader say for the sprite?

**Watch for:** no `response.ok` check before `.json()`; errors only in `console.error`; `alt="sprite"` or no `alt`; for a party, `await` inside a `for` loop, one Pokémon at a time.

</details>

## Links

- MDN: [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch), [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [`Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok), [`async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await), [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch), [`submit` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), [`Event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), [`aria-live`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live)
- API: [PokéAPI documentation](https://pokeapi.co/docs/v2)
