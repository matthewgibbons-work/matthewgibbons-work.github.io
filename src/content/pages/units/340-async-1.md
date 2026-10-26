---
title: "Async 1: Promises"
description: "The event loop, Promises, and Promise.all: code that waits for work that finishes later, without stopping the page."
courses: [dight340]
ready: true # S03 dry run passed Oct 26
session: 3
prototype: P1
date: 2026-10-26
---

# Async 1: Promises

**The big idea:** some work finishes later. A Promise is a placeholder for a value that isn't ready yet, and your code keeps running while it waits.

## In short

JavaScript runs on one thread: one thing at a time. Anything slow (a timer, a network request) is handed off, and the **event loop** runs its callback once the current code has finished and nothing else is running. A **Promise** is the object you get back straight away. It starts *pending*, then settles once: *fulfilled* with a value, or *rejected* with an error. `.then()` runs when it fulfils, `.catch()` when it rejects, and a rejection nobody catches turns up as an "Uncaught (in promise)" error in the console. Promise callbacks get priority: they run before timers, even a 0 ms one. When you need several independent results, **`Promise.all`** starts them all at once and waits for the slowest. Three 1-second loads then take about 1 second, not 3. If any one rejects, `Promise.all` rejects straight away. That's P1's "fetch the party in parallel," before `fetch` arrives on Wednesday. Once the array arrives, getting it onto the page is S02's job: hand it to a `render()` that builds each item with `createElement` and `textContent`, and put any failure message in a paragraph's `textContent`, not just the console.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 210" role="img" aria-labelledby="all-wide-title">
<title id="all-wide-title">A timeline of loading three Pokémon that take 1 second each. One after another, the loads run end to end and finish at 3 seconds. With Promise.all, all three run at the same time and finish at about 1 second.</title>
<text x="10" y="30">One after another</text>
<rect class="d-box" x="120" y="42" width="160" height="30" rx="4" />
<text x="200" y="62" text-anchor="middle">pikachu</text>
<rect class="d-box" x="280" y="42" width="160" height="30" rx="4" />
<text x="360" y="62" text-anchor="middle">eevee</text>
<rect class="d-box" x="440" y="42" width="160" height="30" rx="4" />
<text x="520" y="62" text-anchor="middle">snorlax</text>
<text class="d-muted" x="10" y="62">about 3 s</text>
<text x="10" y="102"><tspan class="d-code">Promise.all</tspan></text>
<rect class="d-key" x="120" y="88" width="160" height="22" rx="4" />
<text x="200" y="104" text-anchor="middle">pikachu</text>
<rect class="d-key" x="120" y="114" width="160" height="22" rx="4" />
<text x="200" y="130" text-anchor="middle">eevee</text>
<rect class="d-key" x="120" y="140" width="160" height="22" rx="4" />
<text x="200" y="156" text-anchor="middle">snorlax</text>
<text class="d-muted" x="10" y="130">about 1 s</text>
<line class="d-line" x1="120" y1="178" x2="600" y2="178" />
<line class="d-line" x1="120" y1="172" x2="120" y2="184" />
<line class="d-line" x1="280" y1="172" x2="280" y2="184" />
<line class="d-line" x1="440" y1="172" x2="440" y2="184" />
<line class="d-line" x1="600" y1="172" x2="600" y2="184" />
<text class="d-muted" x="120" y="202" text-anchor="middle">0 s</text>
<text class="d-muted" x="280" y="202" text-anchor="middle">1 s</text>
<text class="d-muted" x="440" y="202" text-anchor="middle">2 s</text>
<text class="d-muted" x="600" y="202" text-anchor="middle">3 s</text>
</svg>
<svg class="d-narrow" viewBox="0 0 300 300" role="img" aria-labelledby="all-narrow-title">
<title id="all-narrow-title">A timeline of loading three Pokémon that take 1 second each. One after another, the loads run end to end and finish at 3 seconds. With Promise.all, all three run at the same time and finish at about 1 second.</title>
<text x="10" y="20">One after another: about 3 s</text>
<rect class="d-box" x="20" y="32" width="88" height="30" rx="4" />
<text x="64" y="52" text-anchor="middle">pikachu</text>
<rect class="d-box" x="108" y="32" width="88" height="30" rx="4" />
<text x="152" y="52" text-anchor="middle">eevee</text>
<rect class="d-box" x="196" y="32" width="88" height="30" rx="4" />
<text x="240" y="52" text-anchor="middle">snorlax</text>
<text x="10" y="100"><tspan class="d-code">Promise.all</tspan>: about 1 s</text>
<rect class="d-key" x="20" y="112" width="88" height="26" rx="4" />
<text x="64" y="130" text-anchor="middle">pikachu</text>
<rect class="d-key" x="20" y="142" width="88" height="26" rx="4" />
<text x="64" y="160" text-anchor="middle">eevee</text>
<rect class="d-key" x="20" y="172" width="88" height="26" rx="4" />
<text x="64" y="190" text-anchor="middle">snorlax</text>
<line class="d-line" x1="20" y1="222" x2="284" y2="222" />
<line class="d-line" x1="20" y1="216" x2="20" y2="228" />
<line class="d-line" x1="108" y1="216" x2="108" y2="228" />
<line class="d-line" x1="196" y1="216" x2="196" y2="228" />
<line class="d-line" x1="284" y1="216" x2="284" y2="228" />
<text class="d-muted" x="20" y="248" text-anchor="middle">0 s</text>
<text class="d-muted" x="108" y="248" text-anchor="middle">1 s</text>
<text class="d-muted" x="196" y="248" text-anchor="middle">2 s</text>
<text class="d-muted" x="276" y="248" text-anchor="middle">3 s</text>
</svg>
<figcaption>Three independent 1-second loads. Waiting for each before starting the next takes 3 seconds; starting all three and waiting with <code>Promise.all</code> takes about 1.</figcaption>
</figure>

## Predict, then reveal

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

<details>
<summary>In what order do the four letters appear in the console?</summary>

**A, D, C, B.** A and D are ordinary code, so they run first, top to bottom. C and B both wait for the event loop, but promise callbacks run before timers, so C comes before B, even though the timer asked for 0 ms. "0 ms" means "as soon as possible after everything else," not "now."

</details>

## Try it together

There's no `fetch` until Wednesday, so we'll use a fake loader that takes a second (and fails for one name). Everyone: make a `try/s03/` folder at the top of your `dight340` repo and put this in `try/s03/load.js`. It's practice, so keep it out of your commits: in GitHub Desktop's **Changes** tab, right-click any file under `try/` and choose **Ignore folder (add to .gitignore)**, then commit the new `.gitignore`.

```js
const loadPokemon = (name) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === 'missingno') reject(new Error(`No Pokémon called ${name}`));
      else resolve({ name });
    }, 1000);
  });
```

Then, in plan mode, ask Claude:

```text
In try/s03/load.js, use loadPokemon to load pikachu, eevee, and snorlax, then log the party. Add a try/s03/index.html that loads it with defer, so I can watch the console.
```

Open `try/s03/index.html` in your browser (double-click it in Finder) with DevTools' console open.

**How to check it**

- **Time it.** Put `console.time('party')` before the loads and `console.timeEnd('party')` after them, and reload. About 1 second, or about 3?
- **Break it.** Add `missingno` to the list. Is there a message, or a red "Uncaught (in promise)" error?
- **Read the shape.** Is there a `.then()` inside another `.then()`? Did Claude change `loadPokemon` itself? (It shouldn't: it's the test case.)
- **Compare** with your neighbour: same approach, same time?

**Dig deeper:** run [`/dig-deeper`](/340/skills/dig-deeper/) on the line that waits for the party (`Promise.all`, or the first `await`), naming the file and line (for example, `/dig-deeper try/s03/load.js line 12`). Be ready to say what it waits for, and for how long.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- The three loads one after another, each waiting for the last, though none depends on another.
- No `.catch()` or `try`/`catch`, so adding `missingno` to the list gives an "Uncaught (in promise)" error instead of a message.
- `.then()` nested inside `.then()` inside `.then()`, hard to read and easy to get wrong.

It worked, which is why we timed it: `console.time('party')` and `console.timeEnd('party')` around the load showed about 3 seconds. With `Promise.all` it dropped to about 1. Then we added `missingno` to see what a failure looks like.

Runs inside your repo, where `AGENTS.md` asks for readable code and visible errors, slip less often. That's the rules file doing its job, so compare yours with the run in a bare folder.

</details>

## Links

- MDN: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), [JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model), [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout), [`console.time()`](https://developer.mozilla.org/en-US/docs/Web/API/console/time_static)
- Visualizer: [Loupe](https://latentflip.com/loupe/), which steps through the call stack, the event loop, and the callback queue
