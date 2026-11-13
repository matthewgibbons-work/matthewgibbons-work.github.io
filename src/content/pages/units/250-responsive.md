---
title: "Responsive design"
description: "One page for every screen: content that reflows down to 320px wide, and media queries that add layout as space allows."
courses: [dight250]
ready: true
session: 8
prototype: P4
date: 2026-11-16
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Responsive design

<details>
<summary>Key takeaways</summary>

- **Mobile first:** the base CSS, with no media query, is one column for every screen. `min-width` media queries *add* columns when there's room.
- **Breakpoints go where the content breaks, in `em`,** not at phone or tablet sizes in `px`. Someone with large text gets the one-column layout sooner.
- **Reflow at 320px** (WCAG 1.4.10): nothing makes the whole page scroll sideways. A 1280px laptop window zoomed to 400% is the same test.
- **Wide things get their own box:** images get `max-width: 100%; height: auto`; a table goes in a box with `overflow-x: auto`, `tabindex="0"`, `role="region"`, and a name.
- **A column beside a wide table needs `minmax(0, 1fr)`,** or `1fr` refuses to shrink below the table and the page scrolls sideways.
- **Container queries respond to the box, not the screen:** `container-type: inline-size` on a wrapper, then `@container (min-width: …)` lays a component out by how much room *it* has, so the same card can sit side by side in a wide column and stack in a narrow sidebar.
- **Make it fit, don't hide it:** `display: none` on a phone takes content away from the people using one.

</details>

## Fluid first

A page is responsive before you write any CSS: block boxes fill whatever width they're given, and text wraps. Layouts stop being responsive when we pin things down.

- Every page needs `<meta name="viewport" content="width=device-width, initial-scale=1">` in its `<head>` (yours already has it). Without it, phones pretend to be about 980px wide and shrink the whole page.
- Prefer `max-width` to `width`: `max-width: 40rem` says "no wider than this", and still shrinks on a phone.
- Images get `max-width: 100%; height: auto;` so they never burst out of their box.

## Mobile first, with `min-width`

Write the base CSS, with no media query at all, for the narrowest screen: usually one column, which is what the page does on its own, with no Grid. Then add layout only when there's room, with a `min-width` media query. Here's the S07 Grid page layout, mobile first:

```css
body {
  max-width: 60rem;
}

@media (min-width: 50em) {
  body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 16rem;
    grid-template-areas:
      "header header"
      "main   aside"
      "footer footer";
    gap: 1rem;
  }
}
```

Why `minmax(0, 1fr)` and not plain `1fr`? A `1fr` column never gets narrower than the widest thing inside it. Put a wide table in `main`, and just above the breakpoint `main` stays as wide as the table, so the whole page scrolls sideways. `minmax(0, 1fr)` lets the column shrink, and the table scrolls in its own box instead.

Two habits make this work:

- **Breakpoints where the content breaks,** not at phone or tablet sizes. Drag the window wider until the one-column layout looks stretched; that width is your breakpoint.
- **Breakpoints in `em`,** so they follow the reader's font size. Someone who sets a larger text size gets the one-column layout sooner, which is what they need. (Zooming in narrows the page for `px` and `em` queries alike, so zoom works either way.)

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

## Container queries: the box, not the screen

A media query asks how wide the **screen** is. That's the right question for the page layout, but not always for a component. A show card might sit in the wide main column *and* in the narrow sidebar, on the same screen. A media query gives both the same layout; one of them will be wrong.

A **container query** asks how wide the card's own **box** is. Mark the wrapper as a container, then write the query against it:

```css
.show-wrap {
  container-type: inline-size;
}

@container (min-width: 22em) {
  .show {
    display: flex;
    gap: 1rem;
  }
}
```

`container-type: inline-size` says "children may ask how wide I am." `@container (min-width: 22em)` applies only when the nearest container is at least that wide. Now the card in the main column puts its picture beside the text, the one in the sidebar stacks, and when the sidebar drops below the main section on a mid-size screen, it gets room and goes side by side too. Use media queries for the page, container queries for the pieces that live in more than one place.

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

## At a glance

The properties on this page in one place.

| Property or rule | Goes on | Common values | What it does |
| --- | --- | --- | --- |
| viewport `<meta>` | `<head>` | `width=device-width, initial-scale=1` | Makes phones lay the page out at their real width (every course page already has it) |
| `max-width` | a box | `60rem` | No wider than this, and still shrinks on a narrow screen (where `width` won't) |
| `max-width: 100%; height: auto` | `img` | | The image never gets wider than its box, and keeps its shape |
| the base CSS | the page | no media query | What every screen gets: write it for the narrowest, usually one column |
| `@media (min-width: …)` | around rules | `50em` | Adds layout only when the screen is at least this wide |
| `em` in a breakpoint | inside `@media` | `50em` | Follows the reader's font size, so large text gets one column sooner |
| `minmax(0, 1fr)` | a column size | `minmax(0, 1fr) 16rem` | A column that can shrink below its widest content, so a wide table can't push the page sideways |
| `overflow-x: auto` | a box around a table | | Scrolls the table inside its box, not the whole page; give the box `tabindex="0"`, `role="region"`, and a name |
| `container-type: inline-size` | a wrapper | | Makes the wrapper a container its children can ask about |
| `@container (min-width: …)` | around rules | `22em` | Applies when the nearest container (not the screen) is at least this wide |
| `display: none` | | | Hides content. **Not to make a page fit a phone:** phone users lose it |

## Live demo

The whole class, one page: I change the CSS on the projector, you call what happens next. The sandbox is a Saturday Morning Archive page written for a laptop only: a fixed width, two columns at every size, a wide picture, a wide schedule table, and a show card in both the main section and the sidebar. [Open the Responsive sandbox](/sandbox/250-s08/index.html) in your browser, or <a href="/sandbox/250-s08/index.html" download="responsive-sandbox.html">download it</a> to edit your own copy in VS Code. The CSS is in the `<style>` at the top.

Each step says which rule to change, what to type, and what to look for. Save after every change (Cmd S) and look at the browser.

**Narrow and wide:** in Chrome, open DevTools (Cmd Option I) and turn on the device toolbar (Cmd Shift M). Set Dimensions to **Responsive** and type a width, such as `320`. Turn the toolbar off to go back to the full window.

1. **Find what's wrong at 320px.** Set the width to `320`. The page is far wider than the phone: the sidebar is a narrow strip, and you can drag the page sideways. Look at the `.page` rule: `width: 960px`, and two columns at every size.

2. **Mobile first.** Change the `.page` rule so the base is one column and the grid comes in only when there's room. Replace the whole rule with:

   ```css
   .page {
     max-width: 60rem;
   }

   @media (min-width: 50em) {
     .page {
       display: grid;
       grid-template-columns: 1fr 16rem;
       grid-template-areas:
         "header header"
         "main   aside"
         "footer footer";
       gap: 1rem;
     }
   }
   ```

   At 320px, the header, main, sidebar, and footer now stack in one column, and the sidebar is full width below the main section. But the picture and the table still stick out past the right edge, and the page still drags sideways.

3. **The picture.** In the empty `img { }` rule, type:

   ```css
   max-width: 100%;
   height: auto;
   ```

   The picture shrinks to fit the column, and keeps its shape. The table still sticks out.

4. **The table's own box.** In the empty `.table-scroll { }` rule, type:

   ```css
   overflow-x: auto;
   ```

   The page stops dragging sideways: only the table scrolls, inside its box. Click just above the page, press Tab until the table's box gets a focus outline, then press the right arrow key: the table scrolls. That works because the box in the HTML has `tabindex="0"`; its `role="region"` and `aria-labelledby` make a screen reader call it "This Saturday's broadcast schedule".

5. **The sidebar comes back, and the page breaks.** Drag the width up slowly. At 800px (`50em`), the sidebar moves beside the main section. Now set the width to `900`: the page drags sideways again. A `1fr` column won't get narrower than the widest thing in it, and that's the table. In the media query, change the columns to:

   ```css
   grid-template-columns: minmax(0, 1fr) 16rem;
   ```

   Main shrinks to fit, and the table scrolls in its own box again. Try `1000` and `1100`: still no sideways drag.

6. **A container query for the show cards.** Set the width to `1100`. There are two orange show cards, one in the main section and one in the sidebar, both with the picture above the text. In the empty `.show-wrap { }` rule, type `container-type: inline-size;`. Then, under that rule, add:

   ```css
   @container (min-width: 22em) {
     .show {
       display: flex;
       gap: 1rem;
       align-items: center;
     }
   }
   ```

   The card in the main section puts its picture beside the text; the one in the sidebar still stacks, because its box is narrower than `22em`. Same screen, two layouts. Now set the width to `700`: the sidebar drops below the main section, its box gets wide, and its card goes side by side too. At `320`, both stack. A media query couldn't tell the two cards apart.

7. **400% zoom is 320px.** Turn the device toolbar off, make the browser window full width, and zoom in (Cmd +) until it says 400%. One column, the same as at 320px. Zoom back to 100% (Cmd 0).

8. **The tempting fix.** After the media query's closing brace, add:

   ```css
   @media (max-width: 49.99em) {
     aside { display: none; }
   }
   ```

   At 320px the page looks tidier, and "What's new" is gone. Everyone on a phone just lost it. Delete the rule.

**On your own:** in your copy of the sandbox (a few minutes each):

- Find the width where the one-column text gets too wide to read comfortably, and move the breakpoint there. Is it still in `em`?
- Add a second breakpoint, at a wider width, that puts the schedule table above the picture in two columns.
- Change the container query's `22em` until the sidebar card goes side by side at `1100` too. What's the smallest value that does it, and does the card still read well?
- Set Chrome's font size to **Very large** (Settings → Appearance → Font size), reload at a laptop width, and watch which layout you get. Then set it back.

## Links

- MDN: [Responsive design (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design), [Media query fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries), [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using), [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media), [Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type), [viewport `<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport), [`max-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-width), [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow), [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex), [the `region` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role)
- Dig deeper: highlight the first `@media` rule in your own CSS and run [`/dig-deeper`](/250/skills/dig-deeper/). What would change if it were written in `px`, or as an `@container` query?
- WCAG: [Understanding 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Tool: [Chrome DevTools device mode](https://developer.chrome.com/docs/devtools/device-mode)
