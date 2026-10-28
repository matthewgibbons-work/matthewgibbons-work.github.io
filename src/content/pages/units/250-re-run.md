---
title: "Re-run in the loop"
description: "Your first full loop, on ground you already know: why a \"done\" list is a spec you can check line by line."
courses: [dight250]
ready: true # S02 dry run passed Oct 21
session: 2
date: 2026-10-21
---

# Re-run in the loop

**The big idea:** you can only judge an agent's work on ground you know. So your first full loop rebuilds something you've already made by hand.

## In short

A "done" list is a spec you can check line by line, and the agent only does the Generate step: the intent, the spec, the checking, and the explaining are yours. For S02 you need to rebuild your Episode Guide that way, with your intent written first and a "done" list that puts the episodes in a real `<table>` (with a `<caption>` and `scope`), inside `header`, `main`, and `footer`, passing the validator.

## Why a re-run

In S01 you set up the loop: **Intent → Spec → Generate → Verify → Explain**. In S02 you run all five steps for the first time, on your Episode Guide. You wrote that page yourself before the restart, so when the agent hands you a table, you already know what a good one looks like.

Two of the five steps carry most of the weight, and they're a pair. The **Spec** is a "done" list: short, concrete lines like "the episodes are in a `<table>` with a `<caption>`." **Verify** means going down that list, line by line, and checking each one on the real page. If a line can't be checked, it isn't a spec yet. "Make it accessible" can't be checked. "Header cells use `<th>` with `scope`" can.

The agent only does **Generate**. Everything else is yours: what the page is for (Intent), what done means (Spec), whether it's true (Verify), and what you kept, changed, or rejected (Explain).

<figure class="diagram">
<svg class="d-wide" viewBox="0 -4 640 136" role="img" aria-labelledby="loop-wide-title">
<title id="loop-wide-title">The loop: Intent, Spec, Generate, Verify, Explain. The agent does Generate; you do the rest. Verify checks the page against the Spec.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="40" width="104" height="52" rx="6" />
<text x="56" y="71" text-anchor="middle">Intent</text>
<line class="d-line" x1="108" y1="66" x2="132" y2="66" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="134" y="40" width="104" height="52" rx="6" />
<text x="186" y="71" text-anchor="middle">Spec</text>
<line class="d-line" x1="238" y1="66" x2="262" y2="66" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="264" y="40" width="104" height="52" rx="6" />
<text x="316" y="71" text-anchor="middle">Generate</text>
<line class="d-line" x1="368" y1="66" x2="392" y2="66" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="394" y="40" width="104" height="52" rx="6" />
<text x="446" y="71" text-anchor="middle">Verify</text>
<line class="d-line" x1="498" y1="66" x2="522" y2="66" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="524" y="40" width="104" height="52" rx="6" />
<text x="576" y="71" text-anchor="middle">Explain</text>
<path class="d-line" d="M446,40 V16 H186 V38" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="316" y="12" text-anchor="middle">checks the page against</text>
<text class="d-muted" x="316" y="118" text-anchor="middle">agent</text>
<text class="d-muted" x="121" y="118" text-anchor="middle">you</text>
<text class="d-muted" x="511" y="118" text-anchor="middle">you</text>
</svg>
<svg class="d-narrow" viewBox="0 0 252 350" role="img" aria-labelledby="loop-narrow-title">
<title id="loop-narrow-title">The loop: Intent, Spec, Generate, Verify, Explain. The agent does Generate; you do the rest. Verify checks the page against the Spec.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="4" width="180" height="46" rx="6" />
<text x="94" y="32" text-anchor="middle">Intent (you)</text>
<line class="d-line" x1="94" y1="50" x2="94" y2="68" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="70" width="180" height="46" rx="6" />
<text x="94" y="98" text-anchor="middle">Spec (you)</text>
<line class="d-line" x1="94" y1="116" x2="94" y2="134" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="136" width="180" height="46" rx="6" />
<text x="94" y="164" text-anchor="middle">Generate (agent)</text>
<line class="d-line" x1="94" y1="182" x2="94" y2="200" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="202" width="180" height="46" rx="6" />
<text x="94" y="230" text-anchor="middle">Verify (you)</text>
<line class="d-line" x1="94" y1="248" x2="94" y2="266" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="268" width="180" height="46" rx="6" />
<text x="94" y="296" text-anchor="middle">Explain (you)</text>
<path class="d-line" d="M184,225 H222 V93 H186" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="232" y="165" text-anchor="middle" transform="rotate(90 232 165)">checks against</text>
</svg>
<figcaption>The loop. The agent only generates; you own the other four steps. Verify goes back to the Spec and checks the page against it, one line at a time.</figcaption>
</figure>

## Predict, then reveal

<details>
<summary>The agent builds your episode table with no <code>&lt;caption&gt;</code>. Which step of the loop should catch it?</summary>

**Verify**, because your Spec says "the episodes are in a `<table>` with a `<caption>`." If the line weren't in the Spec, nothing in the loop would catch it. That's why the Spec comes before Generate: it's the list Verify checks against.

</details>

<details>
<summary>Is "make an episode guide" an intent?</summary>

Not yet. An intent says what the page is for and who will use it: "a guide to Season 1 for someone deciding which episodes to watch." That changes what a good page looks like (maybe each episode needs a one-line "why watch it"), and the agent can't guess it.

</details>

<details>
<summary>The page passes the W3C validator with no errors. Is it done?</summary>

Not necessarily. A page built entirely from `<div>`s, with no table, no landmarks, and no `<caption>`, can be perfectly valid HTML. The validator checks the HTML is well formed, not that it's the right HTML. It's one line of the "done" list, not the whole list.

</details>

## Live build

We gave the agent this prompt, with no intent and no spec, and saw what came back:

```text
Make an HTML page listing these episodes with their air date and a one-line summary, and make it look nice.
```

The validator and axe can pass a page like this, because neither knows a table should be there. The "done" list does: going down it line by line turned up each slip. Then we ran the loop properly, with an intent and the "done" list in the prompt, and compared the two versions.

**On your own:** if you missed class or want another pass, run the prompt above in a new chat in a practice folder you don't commit, then run it again with your intent and the S02 "done" list, compare the two, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these on your own S02, out loud or to the agent:

- Are the episodes in a real `<table>`, with a `<caption>` and `scope` on the header cells?
- Where are `header`, `main`, and `footer`? Is there one `<h1>`?
- Is anything linked from outside your repo, like a CSS framework?
- Where did each air date and summary come from: you, or the agent?
- Which line of the "done" list would have caught each slip?

**Watch for:** episodes in `<div>`s styled to look like a table, or a `<table>` with no `<caption>` and no `scope`; the whole page in `<div>`s, with no landmarks; a CSS framework linked from a CDN "to make it look nice", which `AGENTS.md` rules out; episodes, air dates, or summaries you never gave it, filled in without asking (two runs gave the same episode two different air dates, both stated just as confidently).

</details>

## Links

- MDN: [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table), [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption), [`<th>` and `scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th), [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main)
- W3C: [Tables tutorial](https://www.w3.org/WAI/tutorials/tables/) (Web Accessibility Initiative)
- Spec: [HTML Standard, tabular data](https://html.spec.whatwg.org/multipage/tables.html)
- Tool: [W3C validator](https://validator.w3.org/nu/)
