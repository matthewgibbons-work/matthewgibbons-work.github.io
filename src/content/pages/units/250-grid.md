---
title: "Grid"
description: "Two-dimensional layout: name the areas of your page, and let columns fit the space with auto-fit and minmax()."
courses: [dight250]
ready: true
session: 7
prototype: P3
date: 2026-11-09
sticky_assignments: true # experiment 6 (PLAN.md, "Experiments")
---

# Grid

<details>
<summary>Key takeaways</summary>

- Grid lays out **rows and columns at once**; Flexbox handles one direction. Rough rule: Flexbox for a row of things sized by their content, Grid for a layout you draw first and fill in.
- **`fr`** is a share of the space left *after* the gaps, so `1fr` columns always fit; percentages plus a gap overflow.
- **`grid-template-areas`** draws the page as named areas, one string per row; each element picks its area with `grid-area`. One string with a missing word and the whole rule is ignored, so the areas pile on top of each other.
- **`repeat(auto-fit, minmax(15rem, 1fr))`** lets the space choose the number of columns: one on a phone, three or four on a laptop, with no media queries.
- **The order you see must match the HTML.** Tab and screen readers follow the HTML, so draw the areas in the order it already reads.

</details>

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

Every row needs the same number of words. If one doesn't, the browser ignores the whole rule, quietly. The areas no longer exist, so every element that asked for one lands in the same spare cell, piled on top of the others: DevTools shows the rule struck through.

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

## At a glance

The properties on this page in one place. "Container" means the element with `display: grid`; "item" means one of its direct children.

| Property or value | Goes on | Common values | What it does |
| --- | --- | --- | --- |
| `display: grid` | container | | Places its direct children (the items) in rows and columns; with no columns set, that's one column |
| `gap` | container | `1rem` | Space between rows and columns, never at the edges |
| `grid-template-columns` | container | `1fr 16rem`, `repeat(3, 1fr)` | How many columns, and how wide each one is |
| `fr` | a column size | `1fr`, `2fr` | A share of the space left after the gaps |
| `repeat()` | a column size | `repeat(3, 1fr)` | Writes the same column several times |
| `minmax()` | a column size | `minmax(15rem, 1fr)` | A column at least the first size, at most the second |
| `auto-fit` | inside `repeat()` | `repeat(auto-fit, minmax(15rem, 1fr))` | As many columns as fit; the items stretch to fill the row |
| `min()` | inside `minmax()` | `minmax(min(15rem, 100%), 1fr)` | Lets the minimum shrink when the space is narrower than `15rem` (beside a sidebar, or at 200% zoom), so one column still fits |
| `grid-template-areas` | container | `"header header" "main aside"` | Draws the layout as named areas, one string per row |
| `grid-area` | item | `main`, `aside` | Puts the item in the area with that name |
| `grid-column: span 2` | item | | Makes one item two columns wide. **Not in an `auto-fit` grid:** at one column it forces a second, and the page scrolls sideways |

## Live demo

The whole class, one page: I change the CSS on the projector, you call what happens next. The sandbox is a plain page of colored boxes with no Grid yet, so each step is one change you can see. [Open the Grid sandbox](/sandbox/250-s07/index.html) in your browser, or <a href="/sandbox/250-s07/index.html" download="grid-sandbox.html">download it</a> to edit your own copy in VS Code. The CSS is in the `<style>` at the top.

Each step says which rule to type in, what to type, and what to look for. Save after every change (Cmd S) and look at the browser.

**Narrow and wide:** in Chrome, open DevTools (Cmd Option I) and turn on the device toolbar (Cmd Shift M). Set Dimensions to **Responsive** and type a width, such as `320`, or drag the edge of the page. Turn the toolbar off to go back to the full window. (In VS Code's Live Preview, drag the divider between the editor and the preview instead.)

1. **`display: grid`, then `gap`.** In the empty `.cards { }` rule, type:

   ```css
   display: grid;
   ```

   Nothing moves. Grid with no columns set is one column, and the cards were already stacked in one. Now add `gap: 1rem;` on the next line. Space opens between the cards, but not around the outside.

2. **Columns with `fr`.** Add a third line to `.cards`:

   ```css
   grid-template-columns: 1fr 1fr 1fr;
   ```

   Six cards, three equal columns, two rows. Change the value to `1fr 2fr 1fr`: the middle column is twice as wide as each side. Now change it to `33% 33% 33%`. The third column runs past the dashed outline. Why? 99% of the width plus two `1rem` gaps is more than 100%. `fr` shares out only the space left after the gaps, so it always fits.

3. **`repeat()`, then go narrow.** Change the value to `repeat(3, 1fr)`: the same three columns, shorter to write. Now go narrow, to 320px. The three columns stay, about 70px each, and the words in them wrap one per line. Go back to wide.

4. **`auto-fit` and `minmax()`.** Change the line to:

   ```css
   grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
   ```

   Wide, you get as many columns at least `15rem` (240px) wide as fit: four on a typical laptop window, with cards 5 and 6 stretched across a second row. Narrow it slowly. Four columns, then three, two, one: the drops come at about 1080, 820, and 570px wide. At 320px there's one column and nothing spills.

   `.cards` now holds three lines: `display`, `gap`, and `grid-template-columns`.

5. **`span 2` on one card, then take it out.** In the empty `.card:first-child { }` rule, type:

   ```css
   grid-column: span 2;
   ```

   Wide, card 1 is two columns wide. Now go narrow, to 320px (it shows anywhere under about 570px). One column isn't enough for card 1, so the grid adds a thin second one, and card 3 squeezes in beside card 2. The cards spill past the dashed outline, and the page scrolls sideways. Delete the line.

6. **Name the areas.** Go back to wide. In the empty `.page { }` rule, type:

   ```css
   display: grid;
   grid-template-columns: 1fr 16rem;
   grid-template-areas:
     "header header"
     "main   aside"
     "footer footer";
   gap: 1rem;
   ```

   Then fill in the four empty rules under it:

   ```css
   header { grid-area: header; }
   main   { grid-area: main; }
   aside  { grid-area: aside; }
   footer { grid-area: footer; }
   ```

   The header runs across the top, main and aside sit side by side, and the footer runs across the bottom. Main is narrower now, so the cards drop a column. In DevTools' **Elements** panel, click the **grid** badge beside `<div class="page">` to outline the grid. In the **Layout** pane, under Overlay display settings, check **Show area names**.

7. **Break a string.** In `grid-template-areas`, delete `aside` from the middle row, so it reads `"main"`. All four areas pile on top of each other in one column on the right, and the two columns you drew sit empty on the left. In DevTools' **Styles** pane, `grid-template-areas` is struck through, with a warning icon. The rows don't all have the same number of words, so the browser ignored the whole rule. Put `aside` back.

8. **Swap `main` and `aside`.** Change the middle row to `"aside  main"`, and the columns to `16rem 1fr` so the aside stays narrow. The aside is on the left now. Click the page just above the header, then press Tab, again and again. Focus goes from the header link to the cards on the *right*, and only then jumps back left to the aside's links. The keyboard follows the HTML, where `<main>` comes before `<aside>`.

**On your own:** in your copy of the sandbox (a few minutes each):

- Get exactly two card columns on a laptop-width window, then three, by changing only the `minmax()` minimum.
- Put the sidebar on the left *and* keep the Tab order right. (Change the HTML, not just the strings.)
- Add a fourth area, `nav`, across the top under the header, without breaking the layout.

## Links

- MDN: [Grids (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids), [Basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts), [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns), [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas), [`grid-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-area), [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat), [`minmax()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax), [the `fr` unit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value), [Grid layout and accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility), [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside)
- Dig deeper: highlight the `minmax()` in your own CSS and run [`/dig-deeper`](/250/skills/dig-deeper/). What happens if the minimum is wider than the screen?
- WCAG: [Understanding 1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [Understanding 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
