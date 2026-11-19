---
title: "Live build: Minimal Expression"
description: "We build a small site together that defines pop culture with almost nothing: a clip and a font, then four colors and a font. Responsive styles are the focus, behind five gates."
courses: [dight250]
ready: false # true once the rehearsal build passes (plans/2026-11-live-builds.md, B2)
session: 13
date: 2026-12-07
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Live build: Minimal Expression

<details>
<summary>Key takeaways</summary>

- **Responsive means each piece adapts, not just the page.** A media query changes the page's layout; a container query lets one card lay itself out by how much room *it* has.
- **`auto-fit` with `minmax(min(20rem, 100%), 1fr)`** makes as many columns as fit, and never one wider than the screen.
- **Custom properties per item:** set four colors on a card, and everything inside it uses the variables. One rule, three looks.
- **Two of the four colors carry the text.** The other two may look great and still fail 4.5:1; check them before you use them for words.
- **Small steps, each with a gate.** Structure, layout, look, media, ship: a problem found at its own gate takes two minutes to fix.
- **Today's Spark is yours:** two pop-culture items of your own, the same responsive tools, a different problem.

</details>

Today I build one small site on the projector with Copilot, and you make the calls: what each prompt asks for, whether a gate passes, and what a line does. It's based on **Minimal Expression**, an assignment past DIGHT 250 classes built as their final: define something from pop culture with as little as possible. Ours is smaller, and the part to watch is how it responds to the screen, from a phone to a projector.

## The brief

> **Intent:** Saturday-morning pop culture, defined with as little as possible, for anyone who grew up with it, on whatever screen they have.
>
> **Pages:** a home page that defines one item with a clip and a font, and a page that defines three items with four colors and a font each. Each says why its choices define the item.
>
> **Done when:**
>
> - both pages have landmarks, one `<h1>`, and the same nav, with `aria-current="page"` on the current link;
> - one shared stylesheet, mobile first: nothing scrolls sideways at 320px, and nothing overlaps at 200% zoom;
> - the three items are cards in a grid that makes as many columns as fit, and each card puts its swatches beside its words when it has room, and stacks them when it doesn't;
> - each card's four colors and font are custom properties, and its text meets 4.5:1;
> - the clip has controls and captions, never plays on its own, and works with the keyboard;
> - no images (other than the clip) and no tables; the live pages pass the Feedback checks.

The items are picked already, so we spend the time on the build: *Superman* (1941) on the home page; *Scooby-Doo, Where Are You!*, *The Jetsons*, and *Schoolhouse Rock!* on the second page.

## Five gates

We build in five steps. Each ends with a **gate**: a check that has to pass before the next prompt.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 170" role="img" aria-labelledby="build-wide-title">
<title id="build-wide-title">Five checkpoints in order, each with the check that gates it. 1 Structure: the validator and landmarks. 2 Layout: 320px, 200% zoom, and a card that stacks when it's narrow. 3 Look: each item's text meets 4.5:1. 4 Media: captions on, and played with the keyboard. 5 Ship: the Feedback checks, and a keyboard pass on the live site.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="10" y="20" width="108" height="56" rx="6" />
<text x="64" y="44" text-anchor="middle">1</text>
<text x="64" y="64" text-anchor="middle">Structure</text>
<line class="d-line" x1="118" y1="48" x2="136" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="139" y="20" width="108" height="56" rx="6" />
<text x="193" y="44" text-anchor="middle">2</text>
<text x="193" y="64" text-anchor="middle">Layout</text>
<line class="d-line" x1="247" y1="48" x2="265" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="268" y="20" width="108" height="56" rx="6" />
<text x="322" y="44" text-anchor="middle">3</text>
<text x="322" y="64" text-anchor="middle">Look</text>
<line class="d-line" x1="376" y1="48" x2="394" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="397" y="20" width="108" height="56" rx="6" />
<text x="451" y="44" text-anchor="middle">4</text>
<text x="451" y="64" text-anchor="middle">Media</text>
<line class="d-line" x1="505" y1="48" x2="523" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="526" y="20" width="108" height="56" rx="6" />
<text x="580" y="44" text-anchor="middle">5</text>
<text x="580" y="64" text-anchor="middle">Ship</text>
<text class="d-muted" x="10" y="104">Gate:</text>
<text class="d-muted" x="64" y="128" text-anchor="middle">validator,</text>
<text class="d-muted" x="64" y="148" text-anchor="middle">landmarks</text>
<text class="d-muted" x="193" y="128" text-anchor="middle">320px, zoom,</text>
<text class="d-muted" x="193" y="148" text-anchor="middle">a card stacks</text>
<text class="d-muted" x="322" y="128" text-anchor="middle">4.5:1 on</text>
<text class="d-muted" x="322" y="148" text-anchor="middle">each card</text>
<text class="d-muted" x="451" y="128" text-anchor="middle">captions,</text>
<text class="d-muted" x="451" y="148" text-anchor="middle">keyboard play</text>
<text class="d-muted" x="580" y="128" text-anchor="middle">Feedback checks,</text>
<text class="d-muted" x="580" y="148" text-anchor="middle">live keyboard</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 330" role="img" aria-labelledby="build-narrow-title">
<title id="build-narrow-title">Five checkpoints in order, each with the check that gates it. 1 Structure: the validator and landmarks. 2 Layout: 320px, 200% zoom, and a card that stacks when it's narrow. 3 Look: each item's text meets 4.5:1. 4 Media: captions on, and played with the keyboard. 5 Ship: the Feedback checks, and a keyboard pass on the live site.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text class="d-muted" x="140" y="16">Gate</text>
<rect class="d-box" x="4" y="24" width="120" height="44" rx="6" />
<text x="64" y="51" text-anchor="middle">1 · Structure</text>
<text class="d-muted" x="140" y="44">validator,</text>
<text class="d-muted" x="140" y="62">landmarks</text>
<line class="d-line" x1="64" y1="68" x2="64" y2="84" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="86" width="120" height="44" rx="6" />
<text x="64" y="113" text-anchor="middle">2 · Layout</text>
<text class="d-muted" x="140" y="106">320px, zoom,</text>
<text class="d-muted" x="140" y="124">a card stacks</text>
<line class="d-line" x1="64" y1="130" x2="64" y2="146" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="148" width="120" height="44" rx="6" />
<text x="64" y="175" text-anchor="middle">3 · Look</text>
<text class="d-muted" x="140" y="168">4.5:1 on</text>
<text class="d-muted" x="140" y="186">each card</text>
<line class="d-line" x1="64" y1="192" x2="64" y2="208" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="210" width="120" height="44" rx="6" />
<text x="64" y="237" text-anchor="middle">4 · Media</text>
<text class="d-muted" x="140" y="230">captions,</text>
<text class="d-muted" x="140" y="248">keyboard play</text>
<line class="d-line" x1="64" y1="254" x2="64" y2="270" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="272" width="120" height="44" rx="6" />
<text x="64" y="299" text-anchor="middle">5 · Ship</text>
<text class="d-muted" x="140" y="292">Feedback checks,</text>
<text class="d-muted" x="140" y="310">live keyboard</text>
</svg>
<figcaption>Five checkpoints. Each gate has to pass before the next prompt, so problems are found while they're still small.</figcaption>
</figure>

## Checkpoint 1: structure

```text
Read the brief I've pasted below. Propose a plan first: the files, and the landmarks and headings on each page. Then create index.html and items.html in minimal-expression/, with the same nav on both, the clip's <figure> on the home page (no CSS yet), and the three items on items.html as a list, each with its name, why its colors and font define it, and its four colors named with their hex codes.
```

**Gate:** each page has landmarks, one `<h1>`, and `aria-current="page"` on the right link. Upload one page to the [W3C validator](https://validator.w3.org/nu/). Ask: why are the three items a `<ul>`, not three `<div>`s?

## Checkpoint 2: layout

```text
Add one shared style.css, mobile first: one column as the base. On items.html, make the list a grid with repeat(auto-fit, minmax(min(20rem, 100%), 1fr)). Make each card a container (container-type: inline-size), and with a container query at 34rem put the swatches beside the words. On the home page, one media query at 48em puts the clip and its words side by side. Size the h1 with clamp().
```

**Gate:**

- The device toolbar at 320px: no sideways scroll on either page. Then 200% zoom.
- Narrow the window slowly on items.html. When does the grid drop a column, and when does a card stack its swatches? They're different moments: the grid answers to the page, each card to its own width.
- **Explain this line:** `minmax(min(20rem, 100%), 1fr)`. What goes wrong at 300px without the `min()`?

## Checkpoint 3: look

```text
Give each card its own four colors as custom properties (--bg, --text, --accent-1, --accent-2) and its font as --font, set on the card's class, with everything inside the card using the variables. Text uses --text on --bg; the accents are only for the border and the swatches. Load the three fonts from Google Fonts with a fallback for each.
```

**Gate:** check each card's `--text` on `--bg` in [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/). Then ask: could either accent hold text on its card?

- *Scooby-Doo:* both accents pass on the dark purple, but neither passes on the green. A pair works in one direction only.
- *The Jetsons:* both accents fail on the cream (2.3:1 and 2.0:1), so they stay as swatches.
- *Schoolhouse Rock!:* blue on yellow is 3.9:1, fine for a large heading (3:1) and not for body text.

## Checkpoint 4: media

```text
In the home page's figure, add the clip from media/superman-1941.mp4 with controls, no autoplay, preload="metadata", and the captions from media/superman-1941.vtt as a default English track. Add a download link inside the video for browsers that can't play it, and a figcaption saying where the clip is from.
```

**Gate:** play it: the captions show. Tab to the player and play and pause it with the keyboard. Ask: why no `autoplay`, even muted?

## Checkpoint 5: ship

Commit in GitHub Desktop ("Minimal Expression, built in class") and push.

**Gate:** the **Feedback checks** Summary for both pages, then Tab through the live site at 320px on a phone. Go down the brief's "done" list, line by line.

## What went wrong, and how we caught it

<details>
<summary>Filled in after class</summary>

What went wrong today, and the gate that caught it, go here after class.

</details>

## Links

- [MDN: Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [MDN: `repeat()` with `auto-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
- [MDN: `clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [MDN: Using custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN: `<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track)
- [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
- [*Superman* (1941) at the Internet Archive](https://archive.org/details/max-fleischers-superman-01-the-mad-scientist-1941-hd)
