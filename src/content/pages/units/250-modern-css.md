---
title: "Modern CSS"
description: "Custom properties, dark mode, :focus-visible, :has(), and nesting: name your design decisions once, and respond to the reader's settings."
courses: [dight250]
ready: false # true once the S11 dry run passes (PLAN.md: Build order)
session: 11
date: 2026-11-30
---

# Modern CSS

**The big idea:** name your design decisions once, with custom properties; respond to the reader's own settings, like dark mode; and select elements by what they contain. All of it in CSS, with no JavaScript.

## In short

Name each design decision once, as a custom property, and dark mode becomes new values for the same names, chosen by the reader's own setting with `prefers-color-scheme`. `:focus-visible` keeps focus easy to see, and `:has()` selects an element by what it contains, all with no JavaScript. For S11 you need every color and spacing size as a token on `:root`, a dark-mode block that changes only the color tokens, every pair passing AA in both modes, a visible `:focus-visible` style, and one useful `:has()` rule.

## Custom properties

A custom property is a value with a name. Define it once, usually on `:root` (the `<html>` element, so everything inherits it), and use it anywhere with `var()`:

```css
:root {
  --bg: #fffdf7;
  --text: #1f2430;
  --accent: #8a1c1c;
  --space-s: 0.5rem;
  --space-m: 1rem;
}

body {
  background: var(--bg);
  color: var(--text);
  padding: var(--space-m);
}

a {
  color: var(--accent);
}
```

Name them by their job (`--accent`), not their look (`--dark-red`), because the look is about to change. These names are often called **tokens**: your palette and spacing scale from P1 and P2, written down once.

## Dark mode

People can set their device to dark mode, and `prefers-color-scheme` lets your page follow. Because every color is a token, dark mode is just new values for the tokens; the rules stay as they are.

```css
:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #14161f;
    --text: #eceff6;
    --accent: #ff9b8a;
  }
}
```

`color-scheme` tells the browser both modes are handled, so form controls and scroll bars switch too. Every text and background pair needs checking again in dark mode: a red that passes on cream can fail on near-black.

A light/dark *button* needs JavaScript, so it's out of scope here. Following the device setting needs none, and it respects a choice the reader has already made.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 250" role="img" aria-labelledby="tokens-wide-title">
<title id="tokens-wide-title">Tokens on :root, such as --bg, --text, and --accent, feed rules like body and a through var(). In dark mode, a prefers-color-scheme media query gives the same tokens new values. The rules never change; only the tokens do.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="10" y="10" width="300" height="110" rx="6" />
<text class="d-code" x="22" y="34">:root</text>
<text class="d-code" x="34" y="58">--bg: #fffdf7;</text>
<text class="d-code" x="34" y="80">--text: #1f2430;</text>
<text class="d-code" x="34" y="102">--accent: #8a1c1c;</text>
<rect class="d-key" x="10" y="132" width="300" height="110" rx="6" />
<text class="d-muted" x="22" y="154">In dark mode (prefers-color-scheme)</text>
<text class="d-code" x="34" y="180">--bg: #14161f;</text>
<text class="d-code" x="34" y="202">--text: #eceff6;</text>
<text class="d-code" x="34" y="224">--accent: #ff9b8a;</text>
<line class="d-line" x1="310" y1="65" x2="346" y2="104" marker-end="url(#arrow-wide)" />
<line class="d-line" x1="310" y1="187" x2="346" y2="148" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="350" y="60" width="280" height="130" rx="6" />
<text class="d-code" x="362" y="86">body {</text>
<text class="d-code" x="374" y="108">background: var(--bg);</text>
<text class="d-code" x="374" y="130">color: var(--text);</text>
<text class="d-code" x="362" y="152">}</text>
<text class="d-code" x="362" y="176">a { color: var(--accent); }</text>
<text class="d-muted" x="490" y="216" text-anchor="middle">The rules never change;</text>
<text class="d-muted" x="490" y="238" text-anchor="middle">only the tokens do.</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 520" role="img" aria-labelledby="tokens-narrow-title">
<title id="tokens-narrow-title">Tokens on :root, such as --bg, --text, and --accent, feed rules like body and a through var(). In dark mode, a prefers-color-scheme media query gives the same tokens new values. The rules never change; only the tokens do.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="4" width="272" height="106" rx="6" />
<text class="d-code" x="16" y="28">:root</text>
<text class="d-code" x="28" y="52">--bg: #fffdf7;</text>
<text class="d-code" x="28" y="74">--text: #1f2430;</text>
<text class="d-code" x="28" y="96">--accent: #8a1c1c;</text>
<rect class="d-key" x="4" y="120" width="272" height="106" rx="6" />
<text class="d-muted" x="16" y="142">In dark mode</text>
<text class="d-code" x="28" y="166">--bg: #14161f;</text>
<text class="d-code" x="28" y="188">--text: #eceff6;</text>
<text class="d-code" x="28" y="210">--accent: #ff9b8a;</text>
<line class="d-line" x1="140" y1="228" x2="140" y2="256" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="260" width="272" height="170" rx="6" />
<text class="d-code" x="16" y="286">body {</text>
<text class="d-code" x="28" y="308">background:</text>
<text class="d-code" x="40" y="330">var(--bg);</text>
<text class="d-code" x="28" y="352">color: var(--text);</text>
<text class="d-code" x="16" y="374">}</text>
<text class="d-code" x="16" y="402">a { color: var(--accent); }</text>
<text class="d-muted" x="140" y="466" text-anchor="middle">The rules never change;</text>
<text class="d-muted" x="140" y="488" text-anchor="middle">only the tokens do.</text>
</svg>
<figcaption>Tokens feed the rules through <code>var()</code>. Dark mode gives the tokens new values, and every rule that uses them follows.</figcaption>
</figure>

## Focus you can see

When someone moves through a page with the keyboard, the focus outline is their cursor. Browsers draw one by default, and `outline: none` removes it, so never use it without a replacement (WCAG 2.4.7).

`:focus-visible` matches when the browser thinks the focus should be shown: always for the keyboard, usually not for a mouse click on a button. Style it to fit your design, with at least 3:1 contrast against what's around it, in both modes:

```css
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
```

## `:has()` and nesting

**`:has()`** selects an element by what's inside it. `.card:has(img)` is "a card that contains an image," so cards with pictures can get a different layout from cards without. `fieldset:has(:checked)` is "a group where something is chosen."

**Nesting** lets you write rules inside rules, with `&` meaning "this element":

```css
.card {
  padding: var(--space-m);

  & h3 {
    margin-top: 0;
  }

  &:has(img) {
    padding-top: 0;
  }
}
```

Keep nesting one level deep. Deeper nesting makes selectors that are hard to read and hard to override.

## Predict, then reveal

<details>
<summary>You change <code>--accent</code> on <code>:root</code>. Which parts of the page change?</summary>

Everything that uses `var(--accent)`: links, the focus outline, borders, badges. Anything where someone typed the hex value directly instead stays the old color. That's how to spot leftovers: change the token to something loud, like lime, and look for what didn't change.

</details>

<details>
<summary>You click a button with the mouse. Does <code>:focus</code> match? Does <code>:focus-visible</code>?</summary>

Usually `:focus` does and `:focus-visible` doesn't: the button has focus, but the browser decides a mouse user doesn't need the ring. Tab to the same button and both match. (Text fields are different: `:focus-visible` matches on a click, because you need to see where you're typing.)

</details>

<details>
<summary>What does <code>.card:has(img)</code> select: the card, or the image?</summary>

The card. `:has()` picks the element *before* it, if something inside matches. The image is only the test. To style the image itself, it's `.card img`.

</details>

## Try it together

Pair programming, with the whole class. I drive Copilot on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S11.

We start from a copy of an S10 page in `try/s11/`:

```text
Add a dark mode to this page.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- In DevTools, open **Rendering** and set **Emulate CSS media feature prefers-color-scheme** to *dark*. Does the page switch?
- Read the CSS: are the colors custom properties that change in one place, or is every color written out twice?
- Check two text/background pairs in dark mode in the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/). Then Tab through in both modes: can you always see focus?
- Did it add a JavaScript toggle button? (`AGENTS.md` rules it out. What does the CSS-only version give up, and what does it keep?)

**Dig deeper:** we highlight a `var()` and run [`/dig-deeper`](/250/skills/dig-deeper/). We ask what happens if the token isn't defined. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `sparks/s10-multimedia/` folder to `try/s11/`, run the starting prompt above, try the same pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S11, out loud or to the agent:

- Where is each color defined, and how many places would you edit to change the accent?
- What changes in dark mode: the tokens, or every rule that uses a color?
- Which pairs did you check in dark mode, and what did WebAIM say?
- Where is focus in dark mode, and what color is the outline?
- Is there any JavaScript, and what would the CSS-only version give up?

**Watch for:** a light/dark toggle button with a script and `localStorage`, out of scope for this course; every color written out twice, once per mode, instead of tokens; dark-mode pairs that fail contrast: a link color that was fine on cream and isn't on near-black, or mid-gray text; the focus outline in the light-mode color, invisible on the dark background; `color-scheme` missing, so form fields stay glaring white.

</details>

## Links

- MDN: [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties), [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var), [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme), [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme), [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible), [`outline-offset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-offset), [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has), [Using CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using), [the `&` nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Nesting_selector)
- WCAG: [Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [Understanding 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
