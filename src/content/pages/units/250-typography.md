---
title: "Typography"
description: "Web fonts, rem and em, and line-height: type that grows when the reader asks it to, and a page that survives 200% zoom."
courses: [dight250]
ready: false # true once the S04 dry run passes, with the S04 brief (PLAN.md: Build order)
session: 4
prototype: P1
date: 2026-10-28
---

# Typography

**The big idea:** text has to grow when the reader asks it to. Size it in `rem`, give it room to breathe, and check that the page still works at 200% zoom.

## In short

Size text in `rem`, so it follows the font size each reader chose, and let every box grow with its text, so the page still works at 200% zoom. For S04 you need one web font with a fallback stack, every `font-size` in `rem`, a unitless `line-height` of at least 1.5 on body text, text blocks capped at about `65ch`, and no fixed `height` on anything that holds text.

## Web fonts, with a fallback

A web font is a file the browser downloads, linked from a service like Google Fonts or served from your own folder with `@font-face`. Until it arrives, the browser shows the next font in your `font-family` list, so always end the list with a fallback: `font-family: "Atkinson Hyperlegible", system-ui, sans-serif;`. `font-display: swap` shows the fallback straight away and swaps in the web font when it's ready, instead of showing no text at all. Every weight and style is its own file, so load only the ones you use.

## Units: px, rem, em

- `px` is fixed. It ignores the reader's own font-size setting.
- `rem` is relative to the root (`<html>`) font size, which starts as the reader's setting (16px unless they've changed it). `1.25rem` means "a quarter bigger than whatever this reader chose." Use it for font sizes.
- `em` is relative to the element's own inherited font size, so it **compounds**: `1.2em` inside `1.2em` is 1.44 times the root. That's handy for spacing that should scale with its own text (`padding: 0.5em`), and a trap for font sizes.

## Line height and line length

`line-height: 1.5`, with no unit, means one and a half times each element's own font size, so headings and body text each get the right spacing. About 1.5 for body text is a good start. Long lines are tiring to read, so cap text blocks at around `max-width: 65ch` (roughly 65 characters).

## The 200% zoom test

Every Prototype's "done" list includes "readable at 200% zoom, with nothing cut off or overlapping." Zoom with Cmd + (Ctrl + on Windows) until the browser says 200%. Text getting bigger is the easy part. What breaks is usually layout: boxes with a fixed `height`, text that can't wrap, things positioned on top of each other.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 210" role="img" aria-labelledby="units-wide-title">
<title id="units-wide-title">Three nested boxes each set to 1.2em grow to 1.2, 1.44, then 1.73 times the root size, because em compounds. Three nested boxes each set to 1.2rem all stay 1.2 times the root size.</title>
<text x="150" y="20" text-anchor="middle"><tspan class="d-code">font-size: 1.2em</tspan> (compounds)</text>
<rect class="d-box" x="10" y="32" width="280" height="168" rx="6" />
<text class="d-muted" x="22" y="54">outer: 1.2 × root</text>
<rect class="d-box" x="30" y="66" width="240" height="122" rx="6" />
<text class="d-muted" x="42" y="88">middle: 1.44 ×</text>
<rect class="d-key" x="50" y="100" width="200" height="76" rx="6" />
<text x="150" y="145" text-anchor="middle">inner: 1.73 × root</text>
<text x="490" y="20" text-anchor="middle"><tspan class="d-code">font-size: 1.2rem</tspan> (doesn't)</text>
<rect class="d-box" x="350" y="32" width="280" height="168" rx="6" />
<text class="d-muted" x="362" y="54">outer: 1.2 × root</text>
<rect class="d-box" x="370" y="66" width="240" height="122" rx="6" />
<text class="d-muted" x="382" y="88">middle: 1.2 ×</text>
<rect class="d-box" x="390" y="100" width="200" height="76" rx="6" />
<text x="490" y="145" text-anchor="middle">inner: 1.2 × root</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 420" role="img" aria-labelledby="units-narrow-title">
<title id="units-narrow-title">Three nested boxes each set to 1.2em grow to 1.2, 1.44, then 1.73 times the root size, because em compounds. Three nested boxes each set to 1.2rem all stay 1.2 times the root size.</title>
<text x="140" y="18" text-anchor="middle"><tspan class="d-code">1.2em</tspan> (compounds)</text>
<rect class="d-box" x="4" y="28" width="272" height="168" rx="6" />
<text class="d-muted" x="16" y="50">outer: 1.2 × root</text>
<rect class="d-box" x="20" y="62" width="240" height="122" rx="6" />
<text class="d-muted" x="32" y="84">middle: 1.44 ×</text>
<rect class="d-key" x="36" y="96" width="208" height="76" rx="6" />
<text x="140" y="140" text-anchor="middle">inner: 1.73 × root</text>
<text x="140" y="230" text-anchor="middle"><tspan class="d-code">1.2rem</tspan> (doesn't)</text>
<rect class="d-box" x="4" y="240" width="272" height="168" rx="6" />
<text class="d-muted" x="16" y="262">outer: 1.2 × root</text>
<rect class="d-box" x="20" y="274" width="240" height="122" rx="6" />
<text class="d-muted" x="32" y="296">middle: 1.2 ×</text>
<rect class="d-box" x="36" y="308" width="208" height="76" rx="6" />
<text x="140" y="352" text-anchor="middle">inner: 1.2 × root</text>
</svg>
<figcaption><code>em</code> multiplies at every level of nesting; <code>rem</code> always goes back to the root. Three levels of <code>1.2em</code> make text 1.73 times the size you meant.</figcaption>
</figure>

## Predict, then reveal

<details>
<summary>A reader sets their browser's default font size to 20px. One heading uses <code>font-size: 16px</code>, another <code>font-size: 1rem</code>. Which one grows?</summary>

Only the `1rem` heading, to 20px. The `16px` one stays 16px, ignoring the reader's choice. (Page zoom enlarges both, but plenty of people change the default size instead of zooming, and `px` shuts them out.)

</details>

<details>
<summary><code>.card { font-size: 1.2em; }</code>, and one card sits inside another. How big is the inner card's text?</summary>

1.44 times the root size: 1.2 × 1.2, because the inner card's `em` is measured from the outer card, which is already 1.2. With `1.2rem` it would be 1.2, however deep the nesting.

</details>

<details>
<summary>At 200% zoom, the nav overlaps the page heading. Is that a font problem or a layout problem?</summary>

Almost always layout. The text grew as it should. Something around it didn't make room, usually a fixed `height` on the header or nav, or a `position` that pins it in place. Remove the fixed height (or use `min-height`) and let the content set the size.

</details>

## Try it together

Pair programming, with the whole class. I drive Copilot on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S04.

We start from a copy of an S03 theme palette page in `try/s04/` (your `.gitignore` keeps `try/` out of your commits), with no units or zoom in the prompt on purpose:

```text
Pick fonts for this page and set up the type sizes.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* CSS does, and which line does it:

- **Search for `px`.** Is any `font-size` in pixels? Does any box that holds text have a fixed `height`?
- **Zoom to 200%** (Cmd + on a Mac, Ctrl + on Windows) and scroll the whole page. Is anything cut off or overlapping?
- **Change the default size.** In Chrome, **Settings → Appearance → Customize fonts**, set **Font size** to 20, and reload. Did the text grow? (Set it back to 16.)
- **Read the font lines.** Does every `font-family` end in a generic family like `sans-serif`? Does the font link load only the weights the CSS uses?

**Dig deeper:** we highlight the `line-height` line and run [`/dig-deeper`](/250/skills/dig-deeper/). Why does it work best with no unit? Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your S03 folder to `try/s04/`, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S04, out loud or to the agent:

- Which `font-size` lines would ignore a reader who set their browser to 20px?
- At 200% zoom, which box runs out of room first, and which line sets its size?
- If the web font never arrives, what does the page show instead?
- Which font weights does the link load, and which ones does the CSS use?
- Why is `line-height` written with no unit?

**Watch for:** every size in `px`, so the reader's font-size setting does nothing; a header or card with a fixed `height` that text spills out of at 200%; a web font with no fallback, or five weights loaded when the page uses two; a decorative display font for body text, or a cramped `line-height` like `1.1`.

</details>

## Links

- MDN: [`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size), [`rem`, `em`, and `ch` units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units), [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height), [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-family), [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face), [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display)
- WCAG: [Understanding 1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [Understanding 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- Fonts: [Google Fonts](https://fonts.google.com/)
