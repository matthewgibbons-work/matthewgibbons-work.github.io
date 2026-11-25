---
title: "Modern CSS"
description: "Custom properties, dark mode, :focus-visible, :has(), and nesting: name your design decisions once, and respond to the reader's settings."
courses: [dight250]
ready: false # true once the S11 model build passes, with the S11 brief (PLAN.md: Build order)
session: 11
date: 2026-11-30
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Modern CSS

<details>
<summary>Key takeaways</summary>

- **Name each design decision once.** A custom property on `:root` (`--accent: #8a1c1c;`) is used everywhere with `var(--accent)`, so changing it is one line. Name it by its job, not its look.
- **Dark mode is new values for the same names.** `@media (prefers-color-scheme: dark)` follows the reader's own setting, and `color-scheme: light dark` switches form fields too. No JavaScript.
- **Check every pair again in dark mode.** A color that passes on cream can fail badly on near-black.
- **Never remove focus without a replacement.** `:focus-visible` draws the keyboard's cursor your way, at least 3:1 in both modes.
- **`:has()` selects an element by what it contains:** `.card:has(img)` is the card, not the image. Nesting with `&` keeps a component's rules together; keep it one level deep.
- **Today's Spark puts it to work.** S11 is a new page for reading at night, with tokens, a dark mode that passes contrast, visible focus, and a `:has()` rule.

</details>

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

## At a glance

The properties, rules, and selectors on this page in one place.

| Property, rule, or selector | Goes on | Example | What it does |
| --- | --- | --- | --- |
| `--name: value` | `:root` | `--accent: #8a1c1c;` | A custom property (a token): a value with a name, inherited by everything |
| `var()` | any value | `color: var(--accent);` | Uses the token's value; change the token and every `var()` follows |
| The lime test | `:root`, for a moment | `--accent: lime;` | Anything that doesn't turn lime has a color typed in |
| `color-scheme` | `:root` | `color-scheme: light dark;` | Tells the browser both modes are handled, so form fields and scroll bars switch too |
| `@media (prefers-color-scheme: dark)` | around a `:root` rule | `@media (prefers-color-scheme: dark) { :root { --bg: #14161f; } }` | New token values when the reader's device is set to dark |
| `:focus-visible` | any element | `:focus-visible { outline: 3px solid var(--accent); }` | Styles focus when the browser shows it: always for the keyboard |
| `outline-offset` | with `outline` | `outline-offset: 2px;` | A gap between the element and its outline, so the ring stands clear |
| `outline: none` | | | Removes the keyboard's cursor. **Never without a replacement** |
| `:has()` | any selector | `.card:has(img)` | Selects the element (the card) if something inside matches (an image) |
| `&` (nesting) | inside a rule | `.card { & h3 { … } &:has(img) { … } }` | A rule inside a rule; `&` means "this element". One level deep |

## Live demo

The whole class, one page: I change the CSS, you call what happens next. The sandbox is "Late-night reruns", the Saturday Morning Archive's after-midnight TV guide, for night owls and new parents. It's a white screen at 2 a.m.; every color is typed into its rule, the accent four times; `a:focus { outline: none; }` hides where the keyboard is; and the cards with a poster stack it on top of the words. [Open the Modern CSS sandbox](/sandbox/250-s11/index.html) in your browser, or download <a href="/sandbox/250-s11/250-s11.zip" download>its folder as a zip</a> to edit your own copy in VS Code. The CSS you change is at the top of the `<style>`; each comment says which step changes it. A slide's preview doesn't follow dark mode, so the two dark-mode slides preview the dark values directly; in your copy, use DevTools → **Rendering** → **Emulate CSS media feature prefers-color-scheme**.

<div data-slides="250-s11"><p>The slides need JavaScript. Every step is in the demo script below.</p></div>

<details>
<summary>Demo script</summary>

Each step says what to change and what to look for. Save after every change (Cmd S) and look at the browser. For steps 4 and 5, open DevTools (Cmd Option I) → the ⋮ menu → **More tools** → **Rendering**, and set **Emulate CSS media feature prefers-color-scheme** to *dark*.

1. **Every color typed into its rule.** Count the `#8a1c1c`s at the top of the `<style>`: four. Changing the accent means finding every one, and missing one is easy.

2. **Tokens on `:root`.** Under the step 1 comment, add:

   ```css
   :root {
     --bg: #fffdf7;
     --surface: #ffffff;
     --band: #f3e9d2;
     --text: #1f2430;
     --muted: #5b6170;
     --accent: #8a1c1c;
     --on-accent: #ffffff;
   }
   ```

   Then replace each color in the rules below it with its token: `color: var(--text);`, `background: var(--bg);`, `color: var(--accent);`, and so on. Leave `.tonight`'s background as it is for now. Reload: the page looks exactly the same.

3. **The lime test.** Change `--accent` to `lime` and reload. The links, the header line, and the show names turn lime, but the "Starts soon" badge stays dark red: it still has `#8a1c1c` typed in. Change it to `background: var(--accent);`, then put `--accent` back to `#8a1c1c`. Now the accent is one line.

4. **Dark mode: new values, same rules.** Under the step 4 comment, add:

   ```css
   :root {
     color-scheme: light dark;
   }

   @media (prefers-color-scheme: dark) {
     :root {
       --bg: #14161f;
       --surface: #1e2130;
       --band: #262a3b;
       --text: #eceff6;
       --muted: #a9afbd;
     }
   }
   ```

   Switch Rendering to *dark*: the page goes dark, the email field too (that's `color-scheme`), and no rule changed. But the links are still `#8a1c1c` on `#14161f`. Put both in the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/): 1.94:1, far under 4.5:1.

5. **A dark accent.** Inside the dark `:root`, add:

   ```css
   --accent: #ff9b8a;
   --on-accent: #14161f;
   ```

   WebAIM: `#ff9b8a` on `#14161f` is 8.85:1. The badge's text flips to the dark background color, so it passes too.

6. **Focus you can see.** Press Tab: nothing shows where you are. Under the step 6 comment, replace `a:focus { outline: none; }` with:

   ```css
   :focus-visible {
     outline: 3px solid var(--accent);
     outline-offset: 2px;
   }
   ```

   Tab again, in both modes: a ring on every link, 9.12:1 on the light background and 8.85:1 on the dark one, and it uses the token, so it changes with the mode.

7. **Cards with a picture: `:has()` and nesting.** Under the step 7 comment, move `.card h3` inside `.card` and add a `:has()` rule, so the whole card is one rule:

   ```css
   .card {
     background: var(--surface);
     border: 2px solid var(--text);

     & h3 {
       color: var(--accent);
     }

     &:has(img) {
       display: grid;
       grid-template-columns: 6rem 1fr;
       gap: 1rem;
     }
   }
   ```

   The two cards with a poster put it in a narrow column beside the words; The Puddle Pirates, with no picture, stays as it was.

</details>

**On your own:** in your copy of the sandbox (a few minutes each):

- Delete `color-scheme: light dark;` and look at the page in dark mode. What happens to the email field and its button?
- Give the card with no picture a dashed border, without adding a class. (Try `:not()` around a `:has()`.)
- Copy The Puddle Pirates' card and add a poster to the copy. Which CSS did you have to change?

## Links

- MDN: [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties), [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var), [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme), [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme), [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible), [`outline-offset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-offset), [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has), [`:not()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not), [Using CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using), [the `&` nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Nesting_selector)
- WCAG: [Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [Understanding 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- WebAIM: [Contrast checker](https://webaim.org/resources/contrastchecker/)
- Dig deeper: highlight a `var()` in your copy of the sandbox and run [`/dig-deeper`](/250/skills/dig-deeper/). Ask what happens if the token isn't defined, and answer its predict question before the reveal.
