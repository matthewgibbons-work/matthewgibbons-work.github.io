---
title: "Flexbox"
description: "Lay out a row or a column of boxes: spacing, alignment, wrapping, and why the order people see must match the order in the HTML."
courses: [dight250]
ready: false # true once the S06 dry run passes (PLAN.md: Build order)
session: 6
prototype: P2
date: 2026-11-04
---

# Flexbox

**The big idea:** Flexbox lays out boxes in one direction, a row or a column, and shares out the space between them. It can also change the order you see, which is exactly what it shouldn't do.

## In short

Flexbox lines boxes up in a row or a column, spaces them with `gap`, and wraps them onto new lines when there isn't room. It can also reorder what you see, which leaves keyboard and screen-reader users following the HTML order instead. For S06 you need two flex rows (the title and nav, and a row of featured cards that wraps), spaced with `gap`, and no `order` or `-reverse`: if you want a different order, change the HTML.

## A row or a column

Put `display: flex` on a container, and its children become **flex items** that line up along the **main axis**: a row by default, or a column with `flex-direction: column`. The other direction is the **cross axis**. Every Flexbox property works along one of the two.

```css
nav ul {
  display: flex;
  gap: 1rem;
}
```

That's the whole nav bar from Box model (S05), without `inline-block`: the list items sit in a row with 1rem between them.

## Spacing and alignment

- **`gap`** sets the space *between* items, and never adds any at the ends. It replaces margins on each item.
- **`justify-content`** shares out space along the main axis: `flex-start` (the default), `center`, or `space-between` (first item at the start, last at the end, like a title on the left and a nav on the right).
- **`align-items`** lines items up across the cross axis. The default, `stretch`, makes them all as tall as the tallest (in a row), which is why cards in a row come out the same height. `center` centers them.

## Growing, shrinking, wrapping

Flex items shrink to fit by default, all on one line, even if that squashes them to slivers. Two properties fix that:

- **`flex-wrap: wrap`** lets items move onto a new line when there isn't room. Without it, a row of cards overflows at 200% zoom.
- **`flex`** on an item says how it grows. `flex: 1` makes items share the leftover space equally. `flex: 1 1 15rem` means "start at 15rem, grow and shrink from there," so with `flex-wrap` the cards drop to a new line when each would be narrower than 15rem.

## What you see, and what's in the HTML

Flexbox can show items in a different order from the HTML: `flex-direction: row-reverse` flips a row, and `order: -1` pulls one item to the front. The page *looks* reordered, but the keyboard and screen readers still follow the HTML. A keyboard user tabbing through a reversed nav moves right to left, against what they see.

So if the order should change, change it in the HTML. Keep what people see and what's in the HTML the same.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 214" role="img" aria-labelledby="order-wide-title">
<title id="order-wide-title">Three nav links in the HTML: 1 Home, 2 Shows, 3 About, and Tab follows that order. With flex-direction: row-reverse they show as About, Shows, Home, but Tab still goes Home, Shows, About, now from right to left.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text x="20" y="20">In the HTML, and the Tab order</text>
<rect class="d-box" x="20" y="32" width="170" height="44" rx="6" />
<text x="105" y="59" text-anchor="middle">1 · Home</text>
<line class="d-line" x1="190" y1="54" x2="232" y2="54" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="235" y="32" width="170" height="44" rx="6" />
<text x="320" y="59" text-anchor="middle">2 · Shows</text>
<line class="d-line" x1="405" y1="54" x2="447" y2="54" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="450" y="32" width="170" height="44" rx="6" />
<text x="535" y="59" text-anchor="middle">3 · About</text>
<text x="20" y="120">What you see with <tspan class="d-code">flex-direction: row-reverse</tspan></text>
<rect class="d-box" x="20" y="132" width="170" height="44" rx="6" />
<text x="105" y="159" text-anchor="middle">3 · About</text>
<line class="d-line" x1="235" y1="154" x2="193" y2="154" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="235" y="132" width="170" height="44" rx="6" />
<text x="320" y="159" text-anchor="middle">2 · Shows</text>
<line class="d-line" x1="450" y1="154" x2="408" y2="154" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="450" y="132" width="170" height="44" rx="6" />
<text x="535" y="159" text-anchor="middle">1 · Home</text>
<text class="d-muted" x="320" y="204" text-anchor="middle">Tab still goes 1, 2, 3: now right to left, against what you see</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 330" role="img" aria-labelledby="order-narrow-title">
<title id="order-narrow-title">Three nav links in the HTML: 1 Home, 2 Shows, 3 About, and Tab follows that order. With flex-direction: row-reverse they show as About, Shows, Home, but Tab still goes Home, Shows, About, now from right to left.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text x="4" y="18">In the HTML (Tab order)</text>
<rect class="d-box" x="4" y="28" width="180" height="38" rx="6" />
<text x="94" y="52" text-anchor="middle">1 · Home</text>
<line class="d-line" x1="94" y1="66" x2="94" y2="82" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="84" width="180" height="38" rx="6" />
<text x="94" y="108" text-anchor="middle">2 · Shows</text>
<line class="d-line" x1="94" y1="122" x2="94" y2="138" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="140" width="180" height="38" rx="6" />
<text x="94" y="164" text-anchor="middle">3 · About</text>
<text x="4" y="212">What you see with <tspan class="d-code">row-reverse</tspan></text>
<rect class="d-box" x="4" y="222" width="80" height="38" rx="6" />
<text x="44" y="246" text-anchor="middle">3 · About</text>
<line class="d-line" x1="100" y1="241" x2="86" y2="241" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="100" y="222" width="80" height="38" rx="6" />
<text x="140" y="246" text-anchor="middle">2 · Shows</text>
<line class="d-line" x1="196" y1="241" x2="182" y2="241" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="196" y="222" width="80" height="38" rx="6" />
<text x="236" y="246" text-anchor="middle">1 · Home</text>
<text class="d-muted" x="4" y="292">Tab still goes 1, 2, 3:</text>
<text class="d-muted" x="4" y="312">right to left, against what you see</text>
</svg>
<figcaption>Flexbox can change the order you see without changing the order in the HTML. Keyboard and screen-reader users get the HTML order, so keep the two the same.</figcaption>
</figure>

## Predict, then reveal

<details>
<summary>A nav is a flex row. You want the links centered top to bottom inside a tall header. <code>justify-content: center</code> or <code>align-items: center</code>?</summary>

`align-items: center`. In a row, the main axis runs left to right, so `justify-content` moves things sideways. Top to bottom is the cross axis, and that's `align-items`. (In a column, the two swap.)

</details>

<details>
<summary>The nav has <code>flex-direction: row-reverse</code>, so Home shows on the right. You press Tab once. Which link gets focus?</summary>

Home, the one on the right, because it's first in the HTML. Tab then moves left, to Shows and About: backwards for anyone watching the screen. Swapping the links in the HTML gives the same look with no mismatch.

</details>

<details>
<summary>Three cards in a flex row each have <code>flex: 1</code>. One has three times as much text as the others. How wide is each card, and how tall?</summary>

The same width: `flex: 1` shares the space equally, whatever is inside. And the same height, because the default `align-items: stretch` makes every card as tall as the tallest one. The long card sets the height for the whole row.

</details>

## Try it together

Pair programming, with the whole class. I drive Copilot on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S06.

We start from a copy of an S05 page in `try/s06/`:

```text
Use Flexbox to add a row of featured-episode cards above the table, one for each of my episodes, each with a title, one sentence, and a link to that episode's row in the table. Show the newest episode first.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- Tab through the cards. Does focus move in the order you see them?
- Search the CSS for `order` and `reverse`. If either is there, is the order in the HTML the same as the order on screen?
- Zoom to 200%. Do the cards wrap onto new lines, or squash and overflow?
- Is the space between cards a `gap` on the container, or margins on each card?

**Dig deeper:** we highlight the cards' `flex` line (or `flex-wrap`) and run [`/dig-deeper`](/250/skills/dig-deeper/). We ask what happens if you remove it. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `sparks/s05-box-model/` folder to `try/s06/`, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S06, out loud or to the agent:

- Which elements are flex containers, and in which direction does each one run?
- How did it put the newest episode first: in the HTML, or in the CSS?
- If you Tab through the cards, does focus follow what you see?
- What happens to the cards when the window is too narrow for all of them?
- What will a screen reader's list of links say for these cards?

**Watch for:** "Newest first" done with `order` or `flex-direction: row-reverse`, so Tab runs against what you see; no `flex-wrap`, so the cards squash to slivers or overflow at 200% zoom; a fixed `width` in `px` on each card, so they don't fit a narrow window; margins on every card instead of `gap`, leaving extra space after the last one; every link reading "Read more," so a screen reader's list of links is three identical lines.

</details>

## Links

- MDN: [Flexbox (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox), [Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts), [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap), [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content), [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items), [`flex-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-wrap), [`flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex), [Ordering flex items](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Ordering_items)
- WCAG: [Understanding 1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [Understanding 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
