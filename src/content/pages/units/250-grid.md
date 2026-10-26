---
title: "Grid"
description: "Two-dimensional layout: name the areas of your page, and let columns fit the space with auto-fit and minmax()."
courses: [dight250]
ready: false # true once the S07 dry run passes (PLAN.md: Build order)
session: 7
prototype: P3
date: 2026-11-09
---

# Grid

**The big idea:** Grid lays out rows and columns at once. Name the areas of your page, and let the columns fit whatever space there is.

## Rows and columns at once

Flexbox handles one direction: a row *or* a column. Grid handles both. Put `display: grid` on a container, describe its columns (and, if you need to, its rows), and its children drop into the cells.

```css
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
```

The **`fr`** unit means "a share of the space that's left." Three `1fr` columns split the width equally *after* the gaps are taken out, so they always fit. A rough rule: Flexbox for a row of things whose size comes from their content (a nav bar), Grid for a layout you draw first and fill in (a page, a gallery).

## Name the areas

`grid-template-areas` lets you draw the page in text. Each string is a row, each word is a cell, and repeating a word makes an area span cells. Each element then says which area it goes in with `grid-area`.

```css
body {
  display: grid;
  grid-template-columns: 1fr 16rem;
  grid-template-areas:
    "header header"
    "main   aside"
    "footer footer";
  gap: 1rem;
}
header { grid-area: header; }
main   { grid-area: main; }
aside  { grid-area: aside; }
footer { grid-area: footer; }
```

Every row needs the same number of words. If one doesn't, the browser ignores the whole rule, quietly, and everything stacks: DevTools shows it struck through.

Areas can go anywhere, in any order, which is the same trap as Flexbox's `order`: the keyboard and screen readers still follow the HTML. Draw the areas in the order the HTML already reads.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 250" role="img" aria-labelledby="areas-wide-title">
<title id="areas-wide-title">grid-template-areas written as three strings: header header, main aside, footer footer. Drawn as boxes, the header runs across the top, main and aside sit side by side, and the footer runs across the bottom. Each element is placed with grid-area.</title>
<text class="d-code" x="20" y="40">grid-template-areas:</text>
<text class="d-code" x="40" y="66">"header header"</text>
<text class="d-code" x="40" y="90">"main aside"</text>
<text class="d-code" x="40" y="114">"footer footer";</text>
<text class="d-muted" x="20" y="156">Each element says where it goes:</text>
<text class="d-code" x="20" y="182">aside { grid-area: aside; }</text>
<rect class="d-box" x="330" y="24" width="290" height="44" rx="6" />
<text x="475" y="51" text-anchor="middle">header</text>
<rect class="d-box" x="330" y="76" width="186" height="108" rx="6" />
<text x="423" y="135" text-anchor="middle">main</text>
<rect class="d-key" x="524" y="76" width="96" height="108" rx="6" />
<text x="572" y="135" text-anchor="middle">aside</text>
<rect class="d-box" x="330" y="192" width="290" height="40" rx="6" />
<text x="475" y="217" text-anchor="middle">footer</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 360" role="img" aria-labelledby="areas-narrow-title">
<title id="areas-narrow-title">grid-template-areas written as three strings: header header, main aside, footer footer. Drawn as boxes, the header runs across the top, main and aside sit side by side, and the footer runs across the bottom. Each element is placed with grid-area.</title>
<text class="d-code" x="4" y="20">grid-template-areas:</text>
<text class="d-code" x="20" y="42">"header header"</text>
<text class="d-code" x="20" y="64">"main aside"</text>
<text class="d-code" x="20" y="86">"footer footer";</text>
<rect class="d-box" x="4" y="104" width="272" height="40" rx="6" />
<text x="140" y="129" text-anchor="middle">header</text>
<rect class="d-box" x="4" y="152" width="172" height="96" rx="6" />
<text x="90" y="205" text-anchor="middle">main</text>
<rect class="d-key" x="184" y="152" width="92" height="96" rx="6" />
<text x="230" y="205" text-anchor="middle">aside</text>
<rect class="d-box" x="4" y="256" width="272" height="40" rx="6" />
<text x="140" y="281" text-anchor="middle">footer</text>
<text class="d-code" x="4" y="330">aside { grid-area: aside; }</text>
</svg>
<figcaption>The same layout twice: as <code>grid-template-areas</code> text, and as the boxes it draws. Each element names its area with <code>grid-area</code>.</figcaption>
</figure>

## Columns that fit

A gallery shouldn't need you to decide how many columns there are. Let the browser work it out:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
```

Read it from the inside out: each column is at least `15rem` and at most `1fr`; `auto-fit` makes as many columns as fit. On a phone that's one column, on a laptop three or four, with no media queries. (`auto-fill` is the same, except it keeps empty columns when there are only a few cards; `auto-fit` lets the cards stretch into the space.)

## Predict, then reveal

<details>
<summary>At 320px wide, what happens to <code>repeat(3, 1fr)</code>? And to <code>repeat(auto-fit, minmax(15rem, 1fr))</code>?</summary>

`repeat(3, 1fr)` always makes three columns, so each card is about 90px wide: slivers of text, a word to a line. The `auto-fit` version makes one column, because a second 15rem column won't fit. The first decides the number of columns; the second lets the space decide.

</details>

<details>
<summary>The areas put <code>aside</code> on the left and <code>main</code> on the right, but in the HTML <code>main</code> comes first. Which does Tab reach first?</summary>

`main`, because Tab follows the HTML. A keyboard user's focus starts on the right-hand side and jumps back left: the same mismatch as Flexbox's `order`. Put the `aside` first in the HTML, or draw it on the right.

</details>

<details>
<summary>Three columns of <code>33%</code> and a <code>1rem</code> gap. Why does the row overflow?</summary>

Percentages are measured from the container's whole width, so 3 × 33% is 99% *before* the two gaps are added: 99% + 2rem is wider than the container. `1fr` is measured from what's left after the gaps, so `repeat(3, 1fr)` always fits.

</details>

## Try it together

Everyone runs the same prompt, then we check what came back. Copy your `sparks/s06-flexbox/` folder to `try/s07/`, open `try/s07/index.html`, and paste:

```text
Turn the featured-episode cards into a grid that fits as many columns as the screen allows, and give the page a sidebar.
```

**How to check it**

- Drag the window narrower, slowly. Do the cards drop one column at a time, down to one?
- Search the CSS for `repeat(`. Is the number of columns fixed? Are any column widths in `px`?
- Is the sidebar an `<aside>`? Tab through: does focus follow the order you see?
- Zoom to 200%. Does anything overlap or get cut off?

**Dig deeper:** highlight the `minmax()` and run [`/dig-deeper`](/250/skills/dig-deeper/). Ask what happens if the minimum is wider than the screen.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- A fixed `repeat(3, 1fr)`, so the cards squash to slivers on a narrow window.
- `grid-column: span 2` on a "featured" card, which forces a second column even when only one fits, so the page scrolls sideways.
- The sidebar drawn on the left with `grid-template-areas` while it comes after `main` in the HTML, so Tab jumps right, then left.
- The sidebar in a `<div>`, with no `<aside>`.
- One area string with a missing word, so the whole layout rule was ignored and everything stacked.

On a wide screen it looked finished. Dragging the window narrower showed the slivers and the sideways scroll; DevTools' Grid badge (click **grid** next to the element in the Elements panel) drew the lines and the area names on the page. In your Spark you'll ask again, with `auto-fit` and "the order you see is the HTML order" in the "done" list.

</details>

## Links

- MDN: [Grids (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids), [Basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts), [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns), [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas), [`grid-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-area), [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat), [`minmax()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax), [the `fr` unit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value), [Grid layout and accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility), [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside)
- WCAG: [Understanding 1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [Understanding 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
