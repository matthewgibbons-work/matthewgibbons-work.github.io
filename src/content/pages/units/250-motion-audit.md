---
title: "Motion and an accessibility audit"
description: "Transitions and animations that explain rather than decorate and calm down when asked, then an audit of your Release with the tools and your own hands."
courses: [dight250]
ready: false # true once the S12 dry run passes (PLAN.md: Build order)
session: 12
date: 2026-12-02
---

# Motion and an accessibility audit

**The big idea:** motion should explain, not decorate, and it calms down for people who ask. Then audit your Release: the tools find some of the problems, and your own hands find the rest.

## Transitions

A transition animates a change between two states, like a link's color on hover:

```css
a {
  transition: background-color 150ms ease-out;
}

a:hover,
a:focus-visible {
  background-color: var(--highlight);
}
```

- Keep it short: 100–300ms. Longer feels slow on the tenth click.
- Animate `opacity`, `color`, and `transform`. Animating `width`, `height`, or `top` makes the text around it jump.
- Whatever happens on `:hover` should also happen on `:focus-visible`, or keyboard users miss it.
- Use motion to explain something (where a thing came from, that a click worked), not to decorate.

## Animations

`@keyframes` describes a sequence, and `animation` plays it:

```css
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

.badge {
  animation: pop-in 300ms ease-out;
}
```

Two hard rules. Anything that moves on its own for more than five seconds needs a way to pause it, so avoid `infinite` (WCAG 2.2.2). And nothing may flash more than three times a second (2.3.1), which can trigger seizures.

## Reduced motion

Some people get dizzy, nauseous, or distracted from movement on screen, especially sliding, zooming, spinning, and parallax. They can ask for less in their device settings, and `prefers-reduced-motion` tells your CSS. The cleanest pattern adds motion only for people who haven't asked to reduce it:

```css
@media (prefers-reduced-motion: no-preference) {
  .badge {
    animation: pop-in 300ms ease-out;
  }
}
```

"Reduce" doesn't have to mean "none": a quick fade instead of a slide is usually fine. Test it in DevTools → **Rendering** → **Emulate CSS media feature prefers-reduced-motion**.

## The audit

Your Feedback checks run the validator and axe on every push. Automated tools are fast and never get bored, but they find only a minority of real problems: axe can tell that an image has `alt` text, not that the text is right. The rest is up to you, in this order:

1. **The Feedback checks:** both tables ✅ on every page.
2. **Keyboard only:** Tab through every page. Can you reach and use everything? Can you always see where you are? Does focus move in the order you see?
3. **200% zoom and 320px:** nothing overlapping, cut off, or scrolling sideways.
4. **Contrast spot checks:** text, focus outlines, and field borders, in every color mode you support.
5. **A two-minute screen-reader pass:** VoiceOver (Cmd + F5 on a Mac) or NVDA on Windows. Listen to the headings, the links, and one form. Does it make sense without the screen?
6. **Your intent brief:** does the site do what you said, for the person you named?

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 312" role="img" aria-labelledby="audit-wide-title">
<title id="audit-wide-title">What each check catches. Automatic, in your Feedback checks: the validator finds broken HTML but misses a page built entirely of divs; axe finds contrast and missing labels and alt, but can't tell whether the alt is right. By hand: the keyboard finds unreachable controls, hidden focus, and odd focus order; 200% zoom and 320px find overlap, cut-off text, and sideways scrolling; a screen reader finds names, questions, and reading order as heard; and you check whether the site does what your intent brief says.</title>
<text class="d-muted" x="20" y="20">Automatic: your Feedback checks</text>
<rect class="d-box" x="20" y="30" width="150" height="36" rx="5" />
<text x="95" y="53" text-anchor="middle">Validator</text>
<text x="186" y="53">Broken HTML. Misses: a page built entirely of divs.</text>
<rect class="d-box" x="20" y="72" width="150" height="36" rx="5" />
<text x="95" y="95" text-anchor="middle">axe</text>
<text x="186" y="95">Contrast, missing labels and alt. Misses: is the alt right?</text>
<text class="d-muted" x="20" y="134">By hand</text>
<rect class="d-box" x="20" y="144" width="150" height="36" rx="5" />
<text x="95" y="167" text-anchor="middle">Keyboard</text>
<text x="186" y="167">Unreachable controls, hidden focus, odd focus order.</text>
<rect class="d-box" x="20" y="186" width="150" height="36" rx="5" />
<text x="95" y="209" text-anchor="middle">200% and 320px</text>
<text x="186" y="209">Overlap, cut-off text, sideways scrolling.</text>
<rect class="d-box" x="20" y="228" width="150" height="36" rx="5" />
<text x="95" y="251" text-anchor="middle">Screen reader</text>
<text x="186" y="251">Names, questions, and reading order, as heard.</text>
<rect class="d-key" x="20" y="270" width="150" height="36" rx="5" />
<text x="95" y="293" text-anchor="middle">You</text>
<text x="186" y="293">Does it do what your intent brief says?</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 530" role="img" aria-labelledby="audit-narrow-title">
<title id="audit-narrow-title">What each check catches. Automatic, in your Feedback checks: the validator finds broken HTML but misses a page built entirely of divs; axe finds contrast and missing labels and alt, but can't tell whether the alt is right. By hand: the keyboard finds unreachable controls, hidden focus, and odd focus order; 200% zoom and 320px find overlap, cut-off text, and sideways scrolling; a screen reader finds names, questions, and reading order as heard; and you check whether the site does what your intent brief says.</title>
<text class="d-muted" x="4" y="16">Automatic: your Feedback checks</text>
<rect class="d-box" x="4" y="24" width="272" height="66" rx="5" />
<text x="16" y="44">Validator</text>
<text class="d-muted" x="16" y="64">Broken HTML.</text>
<text class="d-muted" x="16" y="82">Misses: a page of divs.</text>
<rect class="d-box" x="4" y="96" width="272" height="66" rx="5" />
<text x="16" y="116">axe</text>
<text class="d-muted" x="16" y="136">Contrast, missing labels, alt.</text>
<text class="d-muted" x="16" y="154">Misses: is the alt right?</text>
<text class="d-muted" x="4" y="186">By hand</text>
<rect class="d-box" x="4" y="194" width="272" height="66" rx="5" />
<text x="16" y="214">Keyboard</text>
<text class="d-muted" x="16" y="234">Unreachable controls,</text>
<text class="d-muted" x="16" y="252">hidden focus, odd order.</text>
<rect class="d-box" x="4" y="266" width="272" height="66" rx="5" />
<text x="16" y="286">200% and 320px</text>
<text class="d-muted" x="16" y="306">Overlap, cut-off text,</text>
<text class="d-muted" x="16" y="324">sideways scrolling.</text>
<rect class="d-box" x="4" y="338" width="272" height="66" rx="5" />
<text x="16" y="358">Screen reader</text>
<text class="d-muted" x="16" y="378">Names, questions, and</text>
<text class="d-muted" x="16" y="396">reading order, as heard.</text>
<rect class="d-key" x="4" y="410" width="272" height="66" rx="5" />
<text x="16" y="430">You</text>
<text class="d-muted" x="16" y="450">Does it do what your</text>
<text class="d-muted" x="16" y="468">intent brief says?</text>
</svg>
<figcaption>Each check finds different problems. The automatic two run on every push; the rest need your hands, ears, and judgment.</figcaption>
</figure>

## Predict, then reveal

<details>
<summary>A reader has reduced motion turned on. Does your 150ms color fade on link hover have to go?</summary>

No. A color change isn't movement, and it's brief. Reduced motion is about things that slide, zoom, spin, bounce, or scroll on their own. Keep the fade; calm the slide-in.

</details>

<details>
<summary>Axe and the validator both pass on every page. Is the site accessible?</summary>

Not necessarily. Automated tools find only a minority of problems. They pass `alt="image"`, a nav you can't reach in a sensible order, a form whose error says nothing useful, and a page that makes no sense read aloud. A pass means "no problems a machine can see," which is where the audit starts, not where it ends.

</details>

<details>
<summary>The site's logo spins forever. Which rule does it break, and what's the fix?</summary>

WCAG 2.2.2: it starts on its own, lasts more than five seconds, and sits next to other content, with no way to pause it. Spin it once when the page loads (only for people who haven't asked for reduced motion), or only on hover and focus.

</details>

## Try it together

Everyone runs the same prompt, then we check what came back. Copy your `sparks/s11-modern-css/` folder to `try/s12/`, open `try/s12/index.html`, and paste:

```text
Add some fun Saturday-morning animations to this page.
```

**How to check it**

- DevTools → **Rendering** → emulate `prefers-reduced-motion: reduce`. Does the motion stop or calm down?
- Does anything loop forever, or flash?
- Does every hover effect also happen on keyboard focus?
- While it moves, can you still read everything? Does any text jump around?

**Dig deeper:** highlight the `@media (prefers-reduced-motion …)` rule (or, if there isn't one, an `animation` line) and run [`/dig-deeper`](/250/skills/dig-deeper/).

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- Bouncing, wobbling, or spinning with `infinite`, and nothing to stop it.
- No `prefers-reduced-motion` at all, or a rule that only shortens the motion a little.
- Effects on `:hover` only, never on `:focus-visible`.
- `width`, `height`, or `margin` animated, so the text around them jumps.
- A JavaScript scroll effect, out of scope here.

It was fun for five seconds. Emulating reduced motion, Tabbing through, and watching for ten seconds found the problems. In your Spark you'll add one bit of motion to your Release, on purpose, with the reduced-motion version built in.

</details>

## Links

- MDN: [Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using), [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition), [Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using), [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes), [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform), [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- WCAG: [Understanding 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [Understanding 2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), [Understanding 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- Auditing: [W3C Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/), [WebAIM: Using VoiceOver](https://webaim.org/articles/voiceover/), [WebAIM WCAG checklist](https://webaim.org/standards/wcag/checklist), [Chrome DevTools: emulate CSS media features](https://developer.chrome.com/docs/devtools/rendering/emulate-css)
