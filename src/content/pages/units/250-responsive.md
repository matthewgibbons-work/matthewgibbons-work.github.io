---
title: "Responsive design"
description: "One page for every screen: content that reflows down to 320px wide, and media queries that add layout as space allows."
courses: [dight250]
ready: false # true once the S08 dry run passes (PLAN.md: Build order)
session: 8
prototype: P4
date: 2026-11-16
---

# Responsive design

**The big idea:** one page, every screen. Build for the narrowest screen first, so it reflows down to 320px with no sideways scrolling, then add layout as space allows.

## In short

Build the one-column layout first, for every screen, and add columns with `min-width` media queries in `em` only when there's room, so the page reflows down to 320px with nothing hidden and no sideways scrolling. For S08 you need a one-column base, at least one `min-width` query in `em` that brings back the sidebar, the table in its own scrolling box that works from the keyboard, and nothing hidden on small screens.

## Fluid first

A page is responsive before you write any CSS: block boxes fill whatever width they're given, and text wraps. Layouts stop being responsive when we pin things down.

- Every page needs `<meta name="viewport" content="width=device-width, initial-scale=1">` in its `<head>` (yours already has it). Without it, phones pretend to be about 980px wide and shrink the whole page.
- Prefer `max-width` to `width`: `max-width: 40rem` says "no wider than this", and still shrinks on a phone.
- Images get `max-width: 100%; height: auto;` so they never burst out of their box.

## Mobile first, with `min-width`

Write the base CSS, with no media query at all, for the narrowest screen: usually one column. Then add layout only when there's room, with a `min-width` media query. Here's the S07 Grid page layout, mobile first:

```css
body {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "aside"
    "footer";
  gap: 1rem;
}

@media (min-width: 50em) {
  body {
    grid-template-columns: 1fr 16rem;
    grid-template-areas:
      "header header"
      "main   aside"
      "footer footer";
  }
}
```

Two habits make this work:

- **Breakpoints where the content breaks,** not at phone or tablet sizes. Drag the window wider until the one-column layout looks stretched; that width is your breakpoint.
- **Breakpoints in `em`,** so they follow the reader's font size. Someone with large text, or zoomed in, gets the one-column layout sooner, which is what they need.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 250" role="img" aria-labelledby="mobile-wide-title">
<title id="mobile-wide-title">Mobile first. The base styles give every screen one column: header, main, aside, and footer stacked. A min-width media query at 50em adds a second column, putting main and aside side by side, only when there's room.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text x="20" y="20">Base styles: one column</text>
<text class="d-muted" x="20" y="40">every screen starts here</text>
<rect class="d-box" x="20" y="54" width="150" height="30" rx="5" />
<text x="95" y="74" text-anchor="middle">header</text>
<rect class="d-box" x="20" y="90" width="150" height="70" rx="5" />
<text x="95" y="130" text-anchor="middle">main</text>
<rect class="d-box" x="20" y="166" width="150" height="34" rx="5" />
<text x="95" y="188" text-anchor="middle">aside</text>
<rect class="d-box" x="20" y="206" width="150" height="30" rx="5" />
<text x="95" y="226" text-anchor="middle">footer</text>
<line class="d-line" x1="186" y1="140" x2="236" y2="140" marker-end="url(#arrow-wide)" />
<text class="d-code" x="250" y="20">@media (min-width: 50em)</text>
<text class="d-muted" x="250" y="40">adds a column when there's room</text>
<rect class="d-box" x="250" y="54" width="370" height="30" rx="5" />
<text x="435" y="74" text-anchor="middle">header</text>
<rect class="d-box" x="250" y="90" width="250" height="110" rx="5" />
<text x="375" y="150" text-anchor="middle">main</text>
<rect class="d-key" x="508" y="90" width="112" height="110" rx="5" />
<text x="564" y="150" text-anchor="middle">aside</text>
<rect class="d-box" x="250" y="206" width="370" height="30" rx="5" />
<text x="435" y="226" text-anchor="middle">footer</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 500" role="img" aria-labelledby="mobile-narrow-title">
<title id="mobile-narrow-title">Mobile first. The base styles give every screen one column: header, main, aside, and footer stacked. A min-width media query at 50em adds a second column, putting main and aside side by side, only when there's room.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text x="4" y="18">Base styles: one column</text>
<text class="d-muted" x="4" y="38">every screen starts here</text>
<rect class="d-box" x="60" y="50" width="160" height="28" rx="5" />
<text x="140" y="69" text-anchor="middle">header</text>
<rect class="d-box" x="60" y="84" width="160" height="60" rx="5" />
<text x="140" y="119" text-anchor="middle">main</text>
<rect class="d-box" x="60" y="150" width="160" height="30" rx="5" />
<text x="140" y="170" text-anchor="middle">aside</text>
<rect class="d-box" x="60" y="186" width="160" height="28" rx="5" />
<text x="140" y="205" text-anchor="middle">footer</text>
<line class="d-line" x1="140" y1="224" x2="140" y2="252" marker-end="url(#arrow-narrow)" />
<text class="d-code" x="4" y="278">@media (min-width: 50em)</text>
<text class="d-muted" x="4" y="298">adds a column when there's room</text>
<rect class="d-box" x="4" y="310" width="272" height="28" rx="5" />
<text x="140" y="329" text-anchor="middle">header</text>
<rect class="d-box" x="4" y="344" width="176" height="100" rx="5" />
<text x="92" y="399" text-anchor="middle">main</text>
<rect class="d-key" x="186" y="344" width="90" height="100" rx="5" />
<text x="231" y="399" text-anchor="middle">aside</text>
<rect class="d-box" x="4" y="450" width="272" height="28" rx="5" />
<text x="140" y="469" text-anchor="middle">footer</text>
</svg>
<figcaption>Mobile first: the simplest layout is the default, so it's what every screen gets if nothing else applies. A <code>min-width</code> query adds the second column only when there's room for it.</figcaption>
</figure>

## Reflow at 320px

WCAG asks that content can be read at **320 CSS pixels wide** without scrolling in two directions (1.4.10 Reflow). That's a small phone, and it's also a 1280px laptop window zoomed to 400%: the same test, for different people. Tables, maps, and diagrams may scroll sideways, but inside their own box, not the whole page.

When a page scrolls sideways at 320px, it's almost always one of these: a fixed `width` in `px`, a wide table, a long URL that can't wrap, an image without `max-width: 100%`, or a grid item that spans more columns than fit.

A wide table gets its own scrolling box. Give it `tabindex="0"`, so keyboard users can reach it and scroll with the arrow keys, and a name, so screen readers say what it is:

```html
<div class="table-scroll" role="region" aria-labelledby="episodes-caption" tabindex="0">
  <table>
    <caption id="episodes-caption">Season 1 picks for first-time viewers</caption>
    …
  </table>
</div>
```

```css
.table-scroll {
  overflow-x: auto;
}
```

To test, open DevTools' device toolbar (Cmd + Shift + M on a Mac, Ctrl + Shift + M on Windows) and set the width to 320.

## Predict, then reveal

<details>
<summary>A layout is written for laptops, and <code>@media (max-width: 600px)</code> undoes the columns for phones. What's the catch?</summary>

Phones get the complicated layout first and then have to undo it, rule by rule. Anything you forget to undo breaks the phone layout, and every new desktop rule adds something else to undo. The `600px` also ignores the reader's font size. Mobile first turns it around: the simple layout is the base, and wider screens *add* to it.

</details>

<details>
<summary>Your page scrolls sideways at 320px. Name three likely causes, and how you'd find the one that's guilty.</summary>

A fixed `px` width, a wide table, a long URL, an image without `max-width: 100%`, or a grid item spanning too many columns. To find it, scroll right at 320px and see what sticks out, or hover elements in DevTools' Elements panel until one's width is more than 320.

</details>

<details>
<summary>Is zooming a 1280px laptop window to 400% the same test as a 320px phone?</summary>

Yes. 1280 ÷ 4 = 320 CSS pixels, so the page gets the same width and the same media queries (if they're in `em`, they respond to zoom too). That's why reflow and zoom are one rule: the people who zoom in a long way get the phone layout, and it has to work.

</details>

## Try it together

Pair programming, with the whole class. I drive Copilot on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S08.

We start from a copy of an S07 page in `try/s08/`, with the shortest prompt of the term, on purpose:

```text
Make this page responsive.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- Open the device toolbar and set the width to 320. Does anything make the whole page scroll sideways?
- Read the media queries. `min-width` or `max-width`? `px` or `em`?
- Search for `display: none`. Is anything hidden from small screens that big screens get?
- At 320px, does the table scroll on its own, inside a box you can reach with Tab and scroll with the arrow keys?

**Dig deeper:** we highlight the first `@media` rule and run [`/dig-deeper`](/250/skills/dig-deeper/). We ask what would change if it were written in `em`, or the other way round. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `sparks/s07-grid/` folder to `try/s08/`, run the starting prompt above, try the same pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S08, out loud or to the agent:

- With every media query switched off, what does the page look like? Is that one column?
- Is each media query `min-width` or `max-width`, and in which unit?
- At 320px in the device toolbar, does anything make the page scroll sideways? Which line?
- Is anything hidden on a phone that a laptop shows?
- Can you scroll the table from the keyboard, and what will a screen reader call its box?

**Watch for:** desktop-first `max-width` queries in `px`, undoing the layout for phones; the sidebar (or the table) hidden with `display: none` on small screens "to save space," so phone users lose content; the table left as it was, so the whole page scrolls sideways at 320px; fixed widths left in place, with breakpoints added around them.

</details>

## Links

- MDN: [Responsive design (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design), [Media query fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries), [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using), [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media), [viewport `<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport), [`max-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-width), [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow), [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex), [the `region` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role)
- WCAG: [Understanding 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Tool: [Chrome DevTools device mode](https://developer.chrome.com/docs/devtools/device-mode)
