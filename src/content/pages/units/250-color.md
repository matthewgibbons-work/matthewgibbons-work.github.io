---
title: "Color"
description: "How to read and write colors in hex, rgb(), and hsl(), backgrounds and gradients, and the two rules that keep color readable for everyone: enough contrast, and never color alone."
courses: [dight250]
ready: false # true once the S03 dry run passes, with the S03 brief (PLAN.md: Build order)
session: 3
prototype: P1
date: 2026-10-26
---

# Color

**The big idea:** color only carries meaning if everyone can see it. First you have to be able to read the colors the agent writes. Then two rules keep them readable: enough contrast, and never color alone.

## Writing colors

CSS gives you several ways to write the same color, and the agent will use whichever it likes. You need to be able to read all of them.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 210" role="img" aria-labelledby="formats-wide-title">
<title id="formats-wide-title">One blue, written three ways. Hex: #1d5fc2, where 1d is red 29, 5f is green 95, and c2 is blue 194. rgb(29 95 194): red, green, and blue, each from 0 to 255. hsl(216 74% 44%): hue from 0 to 360, saturation, and lightness.</title>
<rect x="20" y="20" width="120" height="170" rx="6" style="fill:#1d5fc2;stroke:var(--border)" stroke-width="1.5" />
<text class="d-code" x="170" y="52">#1d5fc2</text>
<text class="d-muted" x="170" y="74">hex: red 1d (29), green 5f (95), blue c2 (194)</text>
<text class="d-code" x="170" y="112">rgb(29 95 194)</text>
<text class="d-muted" x="170" y="134">red, green, blue, each from 0 to 255</text>
<text class="d-code" x="170" y="172">hsl(216 74% 44%)</text>
<text class="d-muted" x="170" y="194">hue (0 to 360), saturation, lightness</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 330" role="img" aria-labelledby="formats-narrow-title">
<title id="formats-narrow-title">One blue, written three ways. Hex: #1d5fc2, where 1d is red 29, 5f is green 95, and c2 is blue 194. rgb(29 95 194): red, green, and blue, each from 0 to 255. hsl(216 74% 44%): hue from 0 to 360, saturation, and lightness.</title>
<rect x="20" y="10" width="240" height="50" rx="6" style="fill:#1d5fc2;stroke:var(--border)" stroke-width="1.5" />
<text class="d-code" x="20" y="96">#1d5fc2</text>
<text class="d-muted" x="20" y="116">hex: red 1d (29),</text>
<text class="d-muted" x="20" y="134">green 5f (95), blue c2 (194)</text>
<text class="d-code" x="20" y="184">rgb(29 95 194)</text>
<text class="d-muted" x="20" y="204">red, green, blue,</text>
<text class="d-muted" x="20" y="222">each from 0 to 255</text>
<text class="d-code" x="20" y="272">hsl(216 74% 44%)</text>
<text class="d-muted" x="20" y="292">hue (0 to 360),</text>
<text class="d-muted" x="20" y="310">saturation, lightness</text>
</svg>
<figcaption>One color, three spellings. They all describe the same blue.</figcaption>
</figure>

- **Hex**, like `#1d5fc2`: three pairs of digits, one each for red, green, and blue. It counts in base 16, so the digits run 0–9 and then a–f, and `ff` is 255.
- **`rgb()`**: the same three amounts, written as ordinary numbers from 0 to 255.
- **`hsl()`**: a description instead of amounts. Which **hue** (a position on the color wheel, 0 to 360), how **saturated** (0% is gray, 100% is vivid), and how **light** (0% is black, 100% is white).

### Reading a color

You don't need to memorize numbers, just get a rough read:

- In hex or `rgb()`, the biggest channel names the family: lots of red and little of the others is reddish. All three equal is gray. All high is light, all low is dark.
- In `hsl()`, the hue is the family: 0 is red, 60 yellow, 120 green, 180 cyan, 240 blue, 300 magenta. So 216 is a blue leaning toward cyan. Low saturation is dull, and low lightness is dark.
- `hsl()` is the easiest to adjust. For a lighter version of the same color, change only the last number.

**Follow along (3 minutes):** open DevTools on this page (Cmd + Option + I on a Mac, Ctrl + Shift + I on Windows). In the **Styles** pane, find a color value with a small square beside it. Click the square to open the color picker and drag around. Shift-click the square to flip the value between hex, `rgb()`, and `hsl()`. You'll use this to check every color the agent writes.

### Palettes from one hue

Because `hsl()` keeps hue and lightness separate, a palette is easy to build: hold the hue and saturation, and step the lightness. It also settles the text color. Light text goes on the dark steps and dark text on the light ones.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 170" role="img" aria-labelledby="steps-wide-title">
<title id="steps-wide-title">Five blues with hue 216 and saturation 74%, at lightness 15, 30, 50, 70, and 90 percent. White text on 15 percent is 16 to 1, on 30 percent 9.9 to 1, and on 50 percent 4.9 to 1. Dark text on 70 percent is 7.1 to 1, and on 90 percent 13.3 to 1.</title>
<rect x="2" y="10" width="108" height="70" rx="6" style="fill:#0a2143;stroke:var(--border)" stroke-width="1.5" />
<rect x="133" y="10" width="108" height="70" rx="6" style="fill:#144185;stroke:var(--border)" stroke-width="1.5" />
<rect x="265" y="10" width="108" height="70" rx="6" style="fill:#216dde;stroke:var(--border)" stroke-width="1.5" />
<rect x="396" y="10" width="108" height="70" rx="6" style="fill:#7aa7eb;stroke:var(--border)" stroke-width="1.5" />
<rect x="528" y="10" width="108" height="70" rx="6" style="fill:#d3e2f8;stroke:var(--border)" stroke-width="1.5" />
<text x="56" y="56" text-anchor="middle" style="fill:#fff;font-size:26px;font-weight:700">Aa</text>
<text x="187" y="56" text-anchor="middle" style="fill:#fff;font-size:26px;font-weight:700">Aa</text>
<text x="319" y="56" text-anchor="middle" style="fill:#fff;font-size:26px;font-weight:700">Aa</text>
<text x="450" y="56" text-anchor="middle" style="fill:#1a1a1a;font-size:26px;font-weight:700">Aa</text>
<text x="582" y="56" text-anchor="middle" style="fill:#1a1a1a;font-size:26px;font-weight:700">Aa</text>
<text class="d-code" x="56" y="108" text-anchor="middle">L 15%</text>
<text class="d-code" x="187" y="108" text-anchor="middle">L 30%</text>
<text class="d-code" x="319" y="108" text-anchor="middle">L 50%</text>
<text class="d-code" x="450" y="108" text-anchor="middle">L 70%</text>
<text class="d-code" x="582" y="108" text-anchor="middle">L 90%</text>
<text class="d-muted" x="56" y="130" text-anchor="middle">white text</text>
<text class="d-muted" x="187" y="130" text-anchor="middle">white text</text>
<text class="d-muted" x="319" y="130" text-anchor="middle">white text</text>
<text class="d-muted" x="450" y="130" text-anchor="middle">dark text</text>
<text class="d-muted" x="582" y="130" text-anchor="middle">dark text</text>
<text x="56" y="152" text-anchor="middle">16:1</text>
<text x="187" y="152" text-anchor="middle">9.9:1</text>
<text x="319" y="152" text-anchor="middle">4.9:1</text>
<text x="450" y="152" text-anchor="middle">7.1:1</text>
<text x="582" y="152" text-anchor="middle">13.3:1</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 330" role="img" aria-labelledby="steps-narrow-title">
<title id="steps-narrow-title">Five blues with hue 216 and saturation 74%, at lightness 15, 30, 50, 70, and 90 percent. White text on 15 percent is 16 to 1, on 30 percent 9.9 to 1, and on 50 percent 4.9 to 1. Dark text on 70 percent is 7.1 to 1, and on 90 percent 13.3 to 1.</title>
<rect x="10" y="8" width="84" height="48" rx="6" style="fill:#0a2143;stroke:var(--border)" stroke-width="1.5" />
<rect x="10" y="72" width="84" height="48" rx="6" style="fill:#144185;stroke:var(--border)" stroke-width="1.5" />
<rect x="10" y="136" width="84" height="48" rx="6" style="fill:#216dde;stroke:var(--border)" stroke-width="1.5" />
<rect x="10" y="200" width="84" height="48" rx="6" style="fill:#7aa7eb;stroke:var(--border)" stroke-width="1.5" />
<rect x="10" y="264" width="84" height="48" rx="6" style="fill:#d3e2f8;stroke:var(--border)" stroke-width="1.5" />
<text x="52" y="40" text-anchor="middle" style="fill:#fff;font-size:22px;font-weight:700">Aa</text>
<text x="52" y="104" text-anchor="middle" style="fill:#fff;font-size:22px;font-weight:700">Aa</text>
<text x="52" y="168" text-anchor="middle" style="fill:#fff;font-size:22px;font-weight:700">Aa</text>
<text x="52" y="232" text-anchor="middle" style="fill:#1a1a1a;font-size:22px;font-weight:700">Aa</text>
<text x="52" y="296" text-anchor="middle" style="fill:#1a1a1a;font-size:22px;font-weight:700">Aa</text>
<text class="d-code" x="112" y="28">L 15%</text>
<text class="d-code" x="112" y="92">L 30%</text>
<text class="d-code" x="112" y="156">L 50%</text>
<text class="d-code" x="112" y="220">L 70%</text>
<text class="d-code" x="112" y="284">L 90%</text>
<text class="d-muted" x="112" y="48">white text, 16:1</text>
<text class="d-muted" x="112" y="112">white text, 9.9:1</text>
<text class="d-muted" x="112" y="176">white text, 4.9:1</text>
<text class="d-muted" x="112" y="240">dark text, 7.1:1</text>
<text class="d-muted" x="112" y="304">dark text, 13.3:1</text>
</svg>
<figcaption>One hue (216) and one saturation (74%), five lightnesses. The middle of the scale is the tightest: white text on the 50% blue is 4.9:1, only just over the 4.5:1 body text needs.</figcaption>
</figure>

### Backgrounds and gradients

`background-color` fills an element. `linear-gradient()` blends between colors: a direction, then two or more colors.

```css
header {
  background-image: linear-gradient(135deg, hsl(216 74% 30%), hsl(190 70% 40%));
}
```

`135deg` points toward the bottom right, and the two colors are where the blend starts and ends. A gradient is an image, so it goes in `background-image` (or the `background` shorthand), never in `background-color`.

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
<summary>You want the same blue, but lighter, for a hover state. In <code>hsl(216 74% 44%)</code>, which number do you change?</summary>

The last one, the lightness: try `hsl(216 74% 55%)`. Changing the hue would give you a different color, and changing the saturation would make it duller or more vivid. A lighter color also has less contrast against white text, so check the pair again.

</details>

<details>
<summary>Is gray <code>#777</code> on a white background enough contrast for body text?</summary>

No, just. It's 4.48:1, a hair under the 4.5:1 AA needs. It looks fine to most people on a good screen, which is exactly why you check with a tool instead of your eyes. `#767676` is the lightest gray that passes on white.

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
- Pick one color the agent wrote in hex. In DevTools, Shift-click its swatch to see it as `hsl()`. Which number would you change to make it lighter?
- In Chrome DevTools, open **Rendering** (⋮ menu → More tools) and set **Emulate vision deficiencies** to *Achromatopsia*. Can you still find every link, and are they still underlined?
- Tab through the page. Can you see the focus outline on every background?

**Dig deeper:** highlight one color value the agent wrote, like an `hsl()`, and run [`/dig-deeper`](/250/skills/dig-deeper/). Be ready to say roughly what color it is without looking at the page.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- Pastel or mid-tone text on a bright background, well under 4.5:1.
- A heading on a gradient that's fine at one end and unreadable at the other.
- Links recolored with the underline removed, so color is the only way to spot them.
- A note saying the colors "meet accessibility standards," with no ratio checked.

The page looked great. The contrast checker didn't agree: we checked each text color against its background, including the worst point of the gradient, and turned the claim into numbers. In your Spark you'll choose a theme and build the palette yourself, with "every text color meets 4.5:1 (3:1 for large text), and links stay underlined" in the "done" list.

</details>

## More ways to write a color

<details>
<summary>Read later: hex shorthand, names, transparency, <code>currentColor</code>, <code>oklch()</code></summary>

You won't be asked about these in class, but you'll see them in code the agent writes.

- **Hex shorthand and length:** `#fff` is `#ffffff`, and `#000` is black. Eight digits add a transparency pair on the end.
- **Named colors:** `tomato`, `rebeccapurple`, and about 140 others. Handy for a quick test, and rarely enough for a palette.
- **Transparency:** `rgb(29 95 194 / 50%)` and `hsl(216 74% 44% / 0.5)`. A see-through color shows what's behind it, so its contrast depends on that. Check the pair as it really appears.
- **`currentColor`:** reuses the element's text color, which is handy for borders and icons that should always match.
- **`oklch()` and `color-mix()`:** newer ways to write and combine colors, and agents sometimes reach for them. `oklch(L C H)` is lightness, chroma (how vivid), and hue, so the same idea as `hsl()`. If you can't read what it wrote, ask the agent to give it to you in hex or `hsl()`.

</details>

## Links

- MDN: [`<color>` values](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value), [`hsl()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hsl), [`rgb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/rgb), [hex colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/hex-color), [`oklch()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch), [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color), [`linear-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient), [Color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast)
- WCAG: [Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Understanding 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- Tool: [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
