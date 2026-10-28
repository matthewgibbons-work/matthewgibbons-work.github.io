---
title: "Multimedia and positioning"
description: "Images, video, and audio that work for people who can't see or hear them, plus positioning and visually hidden text."
courses: [dight250]
ready: false # true once the S10 dry run passes (PLAN.md: Build order)
session: 10
date: 2026-11-23
---

# Multimedia and positioning

**The big idea:** media has to work for people who can't see or hear it: text alternatives, captions, and nothing that starts on its own. Positioning lets you layer things on top of each other, and visually hidden text gives screen readers words that eyes don't need.

## In short

Media has to work for people who can't see or hear it: `alt` text, captions, `controls`, and nothing that plays on its own. `position: absolute` places something inside the nearest positioned ancestor, and a `.visually-hidden` class gives screen readers words that eyes don't need. For S10 you need a captioned image, a video with `controls`, no autoplay, and a captions file you wrote by listening, a "New" badge positioned in its own card's corner and written in words, and an icon link named by hidden text.

## Images, revisited

- **`alt` says what the image is *for*,** not what it looks like pixel by pixel. A show's title card next to its name can be `alt=""` (decorative: the name is already there); the same card as the only content of a link needs the link's destination.
- **`width` and `height`** attributes (the image's real size) let the browser save the space before the image arrives, so the page doesn't jump as it loads. CSS (`max-width: 100%; height: auto;`) still makes it responsive.
- **`<figure>` and `<figcaption>`** pair an image (or a video, or a code sample) with a caption everyone can see. The caption and the `alt` shouldn't repeat each other.

## Video and audio

```html
<video controls width="640" height="360">
  <source src="friday.mp4" type="video/mp4">
  <track kind="captions" src="friday.vtt" srclang="en" label="English" default>
</video>
```

- **`controls`** gives the browser's own play, pause, volume, and captions buttons, which already work with a keyboard.
- **Captions** come from a WebVTT (`.vtt`) file: plain text, one cue per line of speech, each with a start and end time. You write them by listening; nobody else can check them for you.

```text
WEBVTT

00:00:00.000 --> 00:00:01.000
Hildy!
```

- **No `autoplay`.** Sound that starts on its own talks over a screen reader (WCAG 1.4.2), and anything that moves for more than five seconds needs a way to pause it (2.2.2). Let people press play.
- **Embeds** (a YouTube `<iframe>`) need a `title` that says what they are.

## Positioning

- **`static`** (the default): in the normal flow.
- **`relative`:** still in the flow, and it becomes the reference point for anything `absolute` inside it.
- **`absolute`:** taken out of the flow and placed with `top`, `right`, `bottom`, `left`, measured from the nearest positioned ancestor.
- **`fixed`** and **`sticky`:** pinned to the screen, always or once you scroll past.

A badge in a card's corner is the classic pair:

```css
.card { position: relative; }
.badge { position: absolute; top: 0.5rem; right: 0.5rem; }
```

Positioned things sit on top of other content, so check them at 200% zoom: a badge can cover a heading, and a sticky header can cover half the screen, or hide the thing that has keyboard focus (WCAG 2.4.11).

## Hidden, but for whom?

There are three ways to hide something, and each hides it from different people. A visually hidden class is the one you'll use most: it keeps text out of sight but in the page, so screen readers still read it.

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

```html
<a href="#clip">
  <span aria-hidden="true">▶</span>
  <span class="visually-hidden">Watch the clip</span>
</a>
```

The arrow is for eyes, and hidden from screen readers, which might read out its symbol name ("black right-pointing triangle"). The words are for screen readers.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 200" role="img" aria-labelledby="hide-wide-title">
<title id="hide-wide-title">Three ways to hide. display: none is not seen and not heard; use it for things that aren't there right now. The visually-hidden class is not seen but is heard; use it for a name for an icon-only link. aria-hidden="true" is seen but not heard; use it for decoration next to real words.</title>
<rect class="d-box" x="10" y="10" width="196" height="180" rx="6" />
<text class="d-code" x="22" y="40">display: none</text>
<text x="22" y="76">Seen: no</text>
<text x="22" y="100">Heard: no</text>
<text class="d-muted" x="22" y="140">For what isn't</text>
<text class="d-muted" x="22" y="162">there right now</text>
<rect class="d-key" x="222" y="10" width="196" height="180" rx="6" />
<text class="d-code" x="234" y="40">.visually-hidden</text>
<text x="234" y="76">Seen: no</text>
<text x="234" y="100">Heard: yes</text>
<text class="d-muted" x="234" y="140">A name for an</text>
<text class="d-muted" x="234" y="162">icon-only link</text>
<rect class="d-box" x="434" y="10" width="196" height="180" rx="6" />
<text class="d-code" x="446" y="40">aria-hidden="true"</text>
<text x="446" y="76">Seen: yes</text>
<text x="446" y="100">Heard: no</text>
<text class="d-muted" x="446" y="140">Decoration next</text>
<text class="d-muted" x="446" y="162">to real words</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 420" role="img" aria-labelledby="hide-narrow-title">
<title id="hide-narrow-title">Three ways to hide. display: none is not seen and not heard; use it for things that aren't there right now. The visually-hidden class is not seen but is heard; use it for a name for an icon-only link. aria-hidden="true" is seen but not heard; use it for decoration next to real words.</title>
<rect class="d-box" x="4" y="4" width="272" height="128" rx="6" />
<text class="d-code" x="16" y="30">display: none</text>
<text x="16" y="60">Seen: no · Heard: no</text>
<text class="d-muted" x="16" y="88">For what isn't</text>
<text class="d-muted" x="16" y="110">there right now</text>
<rect class="d-key" x="4" y="144" width="272" height="128" rx="6" />
<text class="d-code" x="16" y="170">.visually-hidden</text>
<text x="16" y="200">Seen: no · Heard: yes</text>
<text class="d-muted" x="16" y="228">A name for an</text>
<text class="d-muted" x="16" y="250">icon-only link</text>
<rect class="d-box" x="4" y="284" width="272" height="128" rx="6" />
<text class="d-code" x="16" y="310">aria-hidden="true"</text>
<text x="16" y="340">Seen: yes · Heard: no</text>
<text class="d-muted" x="16" y="368">Decoration next</text>
<text class="d-muted" x="16" y="390">to real words</text>
</svg>
<figcaption>Three ways to hide, and who each one hides from. Only <code>.visually-hidden</code> keeps words for screen readers while hiding them from view.</figcaption>
</figure>

## Predict, then reveal

<details>
<summary>A "New" badge has <code>position: absolute; top: 0; right: 0;</code>, and the card has no <code>position</code> at all. Where does the badge go?</summary>

To the top right corner of the page (or of the nearest positioned ancestor, if there is one), not the card. `absolute` measures from the nearest ancestor that has a `position` other than `static`. Every badge on the page piles up in the same corner. `position: relative` on the card fixes it.

</details>

<details>
<summary>A background video is muted and loops forever. No sound, so no problem?</summary>

Still a problem. Anything that moves on its own for more than five seconds needs a way to pause it (WCAG 2.2.2), because movement pulls attention away from reading, and for some people it causes dizziness or nausea. Give it `controls`, or don't loop it, and don't `autoplay`.

</details>

<details>
<summary>An icon-only link's name is in a <code>&lt;span&gt;</code> with <code>display: none</code>. What does a screen reader say when it reaches the link?</summary>

Just "link", or the URL read out letter by letter, because `display: none` hides the text from screen readers too. Use the `.visually-hidden` class instead, so the name is read but not shown.

</details>

## Try it together

Pair programming, with the whole class. I drive Copilot on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S10.

We start from a copy of an S08 page in `try/s10/`, with MDN's free sample clip, [friday.mp4](https://developer.mozilla.org/shared-assets/videos/friday.mp4) (six seconds from the 1940 film *His Girl Friday*), saved in the same folder:

```text
Add the video friday.mp4 from this folder to the page, and put a "New" badge in the corner of each featured card.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- Reload the page. Does the video start on its own? Does it have controls? Is there a captions (CC) button?
- Is each badge in its own card's corner, or are they all piled up in one corner of the page?
- Is "New" in words, not just a colored dot? Turn on VoiceOver (Cmd + F5) for a card: does it say "New"?
- Zoom to 200%. Does a badge cover a heading or a link?

**Dig deeper:** we highlight `position: absolute` (or the `.visually-hidden` rule, if it wrote one) and run [`/dig-deeper`](/250/skills/dig-deeper/). We ask what it's measured from. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `sparks/s08-responsive/` folder to `try/s10/`, download the clip into it, run the starting prompt above, try the same pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S10, out loud or to the agent:

- Does anything play on its own when the page loads? Which attribute would make it?
- Where do the captions come from, and could the agent have heard the clip?
- What is each badge positioned against, and which line sets that?
- What will a screen reader say for the badge, and for the icon link?
- Is anything hidden with `display: none` that a screen reader needs?

**Watch for:** `autoplay` (often with `muted` and `loop`), or no `controls`; no captions track at all. Or, when asked for captions, a `.vtt` file of words the agent made up: it can't hear the clip; badges with `position: absolute` and no `position: relative` on the card, so they all land in one corner of the page; a badge that's only a colored dot, or the word "New" hidden with `display: none` "for screen readers."; no `width` and `height` on the video, so the page jumps as it loads.

</details>

## Links

- MDN: [Video and audio content (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio), [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img), [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure), [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), [`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track), [WebVTT format](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API/Web_Video_Text_Tracks_Format), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe), [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position), [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index), [`aria-hidden`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
- WCAG: [Understanding 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html), [Understanding 1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html), [Understanding 1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html), [Understanding 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [Understanding 2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- W3C: [An alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/); WebAIM: [Invisible content just for screen reader users](https://webaim.org/techniques/css/invisiblecontent/)
