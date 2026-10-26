---
title: "Color"
description: "Color formats, backgrounds, and gradients, and the two rules that keep color readable for everyone: enough contrast, and never color alone."
courses: [dight250]
ready: false # true once the S03 dry run passes, with the S03 brief (PLAN.md: Build order)
session: 3
prototype: P1
date: 2026-10-26
---

# Color

**The big idea:** color only carries meaning if everyone can see it. That takes two rules: enough contrast, and never color alone.

## Writing colors

CSS gives you several ways to write the same color. `#1d5fc2` (hex) and `rgb(29 95 194)` say how much red, green, and blue. `hsl(216 74% 44%)` says which hue, how saturated, and how light, which makes it easy to build a palette: keep the hue, change the lightness. Whatever format the agent picks, you should be able to read it and say roughly what color it is.

Backgrounds work the same way. `background-color` fills an element, and `linear-gradient()` blends between colors. A gradient is an image, so it goes in `background-image` (or the `background` shorthand), never in `background-color`.

## Contrast

Contrast is the difference in lightness between text and what's behind it, measured as a ratio from **1:1** (the same color) to **21:1** (black on white). WCAG level AA, the baseline for this course, asks for:

- **4.5:1** for body text.
- **3:1** for large text (about 24px, or 19px bold) and for the edges of things you interact with, like buttons, inputs, and focus outlines.

You can't judge a ratio by eye, and neither can the agent: it often says a pair "passes" without checking. Check every text color against its background with a contrast checker. On a gradient or an image, check the worst point, where the text is hardest to read.

## Never color alone

About 1 in 12 men and 1 in 200 women have some form of color vision deficiency, and everyone loses color on a dim screen in sunlight. So color can add meaning, but never carry it alone. Links stay underlined. A required field says "required," not just red. A "watched" episode gets a word or an icon with a text label, not just a green row.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 150" role="img" aria-labelledby="contrast-wide-title">
<title id="contrast-wide-title">A contrast scale from 1:1 to 21:1. Below 3:1 fails. 3:1 is enough for large text and interface parts. 4.5:1, the AA level for body text, is highlighted. 7:1 is the enhanced AAA level. Gray #777 on white is 4.48:1, just under 4.5:1.</title>
<line class="d-line" x1="40" y1="60" x2="600" y2="60" />
<line class="d-line" x1="40" y1="50" x2="40" y2="70" />
<line class="d-line" x1="242" y1="48" x2="242" y2="72" />
<rect class="d-key" x="316" y="42" width="3" height="36" />
<line class="d-line" x1="398" y1="48" x2="398" y2="72" />
<line class="d-line" x1="600" y1="50" x2="600" y2="70" />
<text x="40" y="34" text-anchor="middle">1:1</text>
<text x="242" y="34" text-anchor="middle">3:1</text>
<text x="317" y="30" text-anchor="middle">4.5:1 (AA)</text>
<text x="398" y="34" text-anchor="middle">7:1</text>
<text x="600" y="34" text-anchor="middle">21:1</text>
<text class="d-muted" x="141" y="94" text-anchor="middle">fails</text>
<text class="d-muted" x="280" y="94" text-anchor="middle">large text</text>
<text class="d-muted" x="358" y="94" text-anchor="middle">body text</text>
<text class="d-muted" x="499" y="94" text-anchor="middle">enhanced (AAA)</text>
<line class="d-line" x1="314" y1="104" x2="314" y2="118" />
<text class="d-code" x="314" y="138" text-anchor="end">#777 on white</text>
<text class="d-muted" x="322" y="138">4.48:1, just under</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 360" role="img" aria-labelledby="contrast-narrow-title">
<title id="contrast-narrow-title">A contrast scale from 1:1 to 21:1. Below 3:1 fails. 3:1 is enough for large text and interface parts. 4.5:1, the AA level for body text, is highlighted. 7:1 is the enhanced AAA level. Gray #777 on white is 4.48:1, just under 4.5:1.</title>
<line class="d-line" x1="40" y1="20" x2="40" y2="340" />
<line class="d-line" x1="30" y1="40" x2="50" y2="40" />
<line class="d-line" x1="28" y1="148" x2="52" y2="148" />
<rect class="d-key" x="22" y="191" width="36" height="3" />
<line class="d-line" x1="28" y1="232" x2="52" y2="232" />
<line class="d-line" x1="30" y1="340" x2="50" y2="340" />
<text x="66" y="45">21:1 <tspan class="d-muted">black on white</tspan></text>
<text x="66" y="153">7:1 <tspan class="d-muted">enhanced (AAA)</tspan></text>
<text x="66" y="197">4.5:1 <tspan class="d-muted">body text (AA)</tspan></text>
<text class="d-muted" x="66" y="215"><tspan class="d-code">#777</tspan> on white: 4.48:1</text>
<text x="66" y="237">3:1 <tspan class="d-muted">large text, UI parts</tspan></text>
<text x="66" y="345">1:1 <tspan class="d-muted">same color</tspan></text>
</svg>
<figcaption>The contrast scale, spaced so the thresholds are easy to tell apart. AA, this course's baseline, needs 4.5:1 for body text and 3:1 for large text and interface parts.</figcaption>
</figure>

## Predict, then reveal

<details>
<summary>Is gray <code>#777</code> on a white background enough contrast for body text?</summary>

No, just. It's 4.48:1, a hair under the 4.5:1 AA needs. It looks fine to most people on a good screen, which is exactly why you check with a tool instead of your eyes. `#767676` is the lightest gray that passes on white.

</details>

<details>
<summary>Your heading sits on a gradient from dark blue to light blue. Where do you measure its contrast?</summary>

At the worst point: wherever the text crosses the part of the gradient closest to its own color. If white text passes on the light end, it passes everywhere. A checker can't read a gradient for you, so pick that color from the gradient and check it.

</details>

<details>
<summary>An episode list marks the ones you've watched with a green row. What's the problem?</summary>

Color is the only signal. Someone who can't tell that green from the other rows, or who's reading on a dim phone, sees no difference at all. Add a word ("Watched") or an icon with a text label, and keep the green as a bonus.

</details>

## Try it together

Everyone runs the same prompt, then we check what came back. Copy your `sparks/s02-episode-guide-rerun/` folder to `try/s03/` at the top of your repo (it's practice, so keep it out of your commits: in GitHub Desktop's **Changes** tab, right-click any file under `try/` and choose **Ignore folder (add to .gitignore)**, then commit the new `.gitignore`). Open `try/s03/index.html` and paste this into the chat, with no contrast requirement on purpose:

```text
Give this page a bright, retro Saturday-morning color scheme, with a gradient behind the heading.
```

**How to check it**

- Ask the agent for each text and background pair's contrast ratio. Check two of them yourself in the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/), including the heading at the lightest point of the gradient. Do the numbers match?
- In Chrome DevTools, open **Rendering** (⋮ menu → More tools) and set **Emulate vision deficiencies** to *Achromatopsia*. Can you still find every link?
- Are the links still underlined?
- Tab through the page. Can you see the focus outline on every background?

**Dig deeper:** highlight one color value the agent wrote, like an `hsl()`, and run [`/dig-deeper`](/250/skills/dig-deeper/). Be ready to say roughly what color it is without looking at the page.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- Pastel or mid-tone text on a bright background, well under 4.5:1.
- A heading on a gradient that's fine at one end and unreadable at the other.
- Links recolored with the underline removed, so color is the only way to spot them.
- A note saying the colors "meet accessibility standards," with no ratio checked.

The page looked great. The contrast checker didn't agree: we checked each text color against its background, including the worst point of the gradient, and turned the claim into numbers. In your Spark you'll ask again, with "every text color meets 4.5:1 (3:1 for large text), and links stay underlined" in the "done" list.

</details>

## Links

- MDN: [`<color>` values](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value), [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color), [`linear-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient), [Color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast)
- WCAG: [Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Understanding 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- Tool: [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
