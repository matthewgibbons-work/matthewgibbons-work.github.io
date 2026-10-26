---
title: "Box model and display"
description: "Every element is a box of content, padding, border, and margin. How big the box really is, how boxes sit together, and why the things people tap need room."
courses: [dight250]
ready: false # true once the S05 dry run passes (PLAN.md: Build order)
session: 5
prototype: P2
date: 2026-11-02
---

# Box model and display

**The big idea:** every element is a box. Layout starts with knowing how big each box really is, how boxes sit next to each other, and giving the things people tap enough room.

## Every element is a box

The browser draws every element as a rectangle in four layers, from the inside out:

- **Content:** the text or image itself.
- **Padding:** space inside the border. It takes the element's background, and it's part of what you can click or tap.
- **Border:** the edge. It can be invisible, but it still takes up room if it has a width.
- **Margin:** space outside the border, always transparent, pushing other boxes away. When two blocks' margins meet top to bottom, they **collapse**: the gap is the larger of the two, not their sum.

Open DevTools, select an element in the **Elements** panel, and the **Computed** tab draws these four layers with their sizes. It's the fastest way to answer "where is this gap coming from?"

## How wide is a box?

By default, `width` sets only the **content**. Padding and border are added on top, so `width: 200px; padding: 20px; border: 5px solid` makes a box 250px wide. That's why `width: 100%` plus padding so often makes a page scroll sideways.

`box-sizing: border-box` changes what `width` means: the whole visible box, padding and border included. Most sites set it once, for everything, at the top of the CSS:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 260" role="img" aria-labelledby="box-wide-title">
<title id="box-wide-title">The box model: content inside padding, inside a border, inside margin. With width 200px, padding 20px and a 5px border, the default content-box makes the box 250px wide. Border-box keeps it 200px wide and shrinks the content to 150px.</title>
<rect class="d-box" x="10" y="20" width="320" height="220" rx="6" stroke-dasharray="6 4" />
<text class="d-muted" x="22" y="42">margin</text>
<rect class="d-key" x="40" y="54" width="260" height="156" rx="4" />
<text class="d-muted" x="52" y="76">border</text>
<rect class="d-box" x="64" y="86" width="212" height="96" rx="4" />
<text class="d-muted" x="76" y="106">padding</text>
<rect class="d-box" x="96" y="118" width="148" height="40" rx="4" />
<text x="170" y="143" text-anchor="middle">content</text>
<text class="d-code" x="360" y="44">width: 200px;</text>
<text class="d-code" x="360" y="66">padding: 20px;</text>
<text class="d-code" x="360" y="88">border: 5px solid;</text>
<text x="360" y="130">content-box (the default):</text>
<text class="d-muted" x="360" y="152">250px wide in all</text>
<text x="360" y="194">border-box:</text>
<text class="d-muted" x="360" y="216">200px wide; content 150px</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 380" role="img" aria-labelledby="box-narrow-title">
<title id="box-narrow-title">The box model: content inside padding, inside a border, inside margin. With width 200px, padding 20px and a 5px border, the default content-box makes the box 250px wide. Border-box keeps it 200px wide and shrinks the content to 150px.</title>
<rect class="d-box" x="4" y="4" width="272" height="200" rx="6" stroke-dasharray="6 4" />
<text class="d-muted" x="14" y="24">margin</text>
<rect class="d-key" x="24" y="34" width="232" height="144" rx="4" />
<text class="d-muted" x="34" y="54">border</text>
<rect class="d-box" x="44" y="64" width="192" height="90" rx="4" />
<text class="d-muted" x="54" y="82">padding</text>
<rect class="d-box" x="70" y="94" width="140" height="36" rx="4" />
<text x="140" y="117" text-anchor="middle">content</text>
<text class="d-code" x="4" y="236">width: 200px;</text>
<text class="d-code" x="4" y="256">padding: 20px; border: 5px;</text>
<text x="4" y="292">content-box (the default):</text>
<text class="d-muted" x="4" y="312">250px wide in all</text>
<text x="4" y="346">border-box:</text>
<text class="d-muted" x="4" y="366">200px wide; content 150px</text>
</svg>
<figcaption>Four layers, inside out: content, padding, border, margin. With <code>box-sizing: border-box</code>, <code>width</code> means the whole visible box, which is almost always what you meant.</figcaption>
</figure>

## How boxes sit together: `display`

- **`block`** boxes (`p`, `h1`, `section`, `li`) start on a new line and fill the width they're given.
- **`inline`** boxes (`a`, `em`, `strong`, `span`) flow inside a line of text. They ignore `width` and `height`, and padding above and below them is painted but doesn't push other lines away, so it overlaps.
- **`inline-block`** flows like text but behaves like a box: `width`, `height`, and padding all take up real room.
- **`none`** removes the element completely: it isn't drawn, it can't be focused, and screen readers skip it. Use it for things that truly shouldn't be there, not to hide a label.

Wednesday's Flexbox is another `display` value, `display: flex`, for laying out a row or column of boxes.

## Room to tap

A link or button is a **target**. Fingers are less precise than a mouse, and so are shaky hands. WCAG 2.2 level AA asks for targets at least **24 by 24** CSS pixels (or enough space around a smaller one); **44 by 44** is the comfortable size to aim for. Links inside a sentence are exempt, but a nav bar, a button, or an icon link isn't.

Padding is how you get there without making the text bigger, because padding is part of the target and margin isn't. To check a size, hover an element in DevTools' **Elements** panel: the page shows its width × height.

## Predict, then reveal

<details>
<summary>A box has <code>width: 100%</code> and <code>padding: 1rem</code>, inside <code>main</code>. Why does the page now scroll sideways?</summary>

With the default `content-box`, the content is already 100% of `main`'s width, and the padding is added on top: 100% plus 2rem. `box-sizing: border-box` makes the padding fit inside the 100%.

</details>

<details>
<summary>You add <code>padding: 0.75rem</code> to a link inside a paragraph, so it's easier to tap. What happens to the lines above and below it?</summary>

Nothing moves, and the link's background now overlaps them. An `inline` element's top and bottom padding is painted but doesn't take up room in the line. `display: inline-block` makes it a real box that pushes the lines apart. (For a link in a sentence, the usual answer is to leave it alone: inline links are exempt from the target size.)

</details>

<details>
<summary>The nav links are 18px tall. Without changing the font size, how do you get them to 44px?</summary>

Padding: about 13px above and below (or `0.8rem`) adds up to 44, and with `inline-block` or Flexbox that height takes up real room. Margin would add space *between* the links, but the part you can tap would still be 18px.

</details>

## Try it together

Everyone runs the same prompt, then we check what came back. Copy your `sparks/s04-type-scale/` folder to `try/s05/` (the kit update in today's Spark adds a `.gitignore` that keeps `try/` out of your commits; until then, yours from S03 does). Open `try/s05/index.html` and paste:

```text
Add a navigation bar at the top of this page with links to my hub, my S04 page, and my archive, and give the whole page more breathing room.
```

**How to check it**

- Hover each nav link in DevTools' **Elements** panel. Is every one at least 24 × 24, and close to 44 tall?
- Find `box-sizing` in the CSS. Is it `border-box`? Is there a `width: 100%` with padding that makes the page scroll sideways?
- Are the links inside a `<nav>`, in a list? Does Tab show focus on each one?
- Zoom to 200%. Do the nav links wrap neatly, or crash into each other?

**Dig deeper:** highlight the rule that sets the nav links' `display` and padding and run [`/dig-deeper`](/250/skills/dig-deeper/). Ask what would change if it were `inline`.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- Nav links with no padding: text-sized targets, 18–20px tall, under 24 × 24.
- Padding on `inline` links, so their backgrounds overlap the content below at 200% zoom.
- `width: 100%` plus padding with no `border-box`, so the page scrolls sideways.
- A fixed `height` on the nav that the links spill out of when they wrap.
- Links in a `<div>`, with no `<nav>` and no list.

The page looked tidy, and "more breathing room" sounded done. Hovering each link in DevTools turned "looks fine" into a size we could compare with 24 × 24. In your Spark you'll ask again, with the target size and `border-box` in the "done" list.

</details>

## Links

- MDN: [The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model), [`box-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing), [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display), [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding), [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin), [Margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing), [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
- WCAG: [Understanding 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Understanding 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
