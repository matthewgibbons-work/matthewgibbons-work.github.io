---
title: "Multimedia and positioning"
description: "Images, video, and audio that work for people who can't see or hear them, plus positioning and visually hidden text."
courses: [dight250]
ready: false # true once the S10 dry run passes (PLAN.md: Build order)
session: 10
date: 2026-11-23
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Multimedia and positioning

<details>
<summary>Key takeaways</summary>

- **Media has to work for people who can't see or hear it:** `alt` text that says what the image is for, captions for speech and sound, and nothing that plays on its own.
- **`<video controls>`** gives the browser's own buttons, keyboard included. Leave out `autoplay`, and give anything that moves for more than five seconds a way to pause.
- **Captions are a `.vtt` file you write by listening,** joined with `<track kind="captions">`. The agent can't hear the clip.
- **`position: absolute` measures from the nearest positioned ancestor.** Put `position: relative` on the card, or every badge lands in the page's corner. `sticky` and `fixed` pin things to the screen, so check that they don't cover focus.
- **Hide on purpose:** `.visually-hidden` keeps words for screen readers, `aria-hidden="true"` hides decoration from them, and `display: none` hides from everyone.
- **Today's Spark puts it to work.** S10 fixes a "Clip of the week" page.

</details>

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

```vtt
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

Positioned things sit on top of other content, so check them at 200% zoom: a badge can cover a heading, and a sticky header can cover half the screen, or hide the thing that has keyboard focus (WCAG 2.4.11). `scroll-padding-top` on `html`, as tall as the header, keeps whatever you tab to or jump to from landing underneath it.

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

## At a glance

The elements, attributes, and properties on this page in one place.

| Element, attribute, or property | Goes on | Example | What it does |
| --- | --- | --- | --- |
| `alt` | `<img>` | `alt="Poster: a robot dog leaping over a moon"`, `alt=""` | Says what the image is *for*; `alt=""` when the words next to it already say it all |
| `width`, `height` | `<img>`, `<video>` | `width="300" height="450"` | The real size, so the browser saves the space and the page doesn't jump as it loads |
| `<figure>` + `<figcaption>` | around an image or video | `<figcaption>Saturday 9:00</figcaption>` | A caption everyone can see; it shouldn't repeat the `alt` |
| `controls` | `<video>`, `<audio>` | `<video controls>` | The browser's own play, pause, volume, and captions buttons, keyboard included |
| `autoplay`, `loop` | `<video>`, `<audio>` | | Starts on its own, plays forever. **Leave them out:** let people press play |
| `<track kind="captions">` | inside `<video>` | `src="clip.vtt" srclang="en" label="English"` | Joins a WebVTT file of captions you wrote by listening; turns on the CC button |
| `position: relative` | the container | `.poster { position: relative; }` | Stays in the flow, and becomes what `absolute` children measure from |
| `position: absolute` + `top`, `right`… | the thing to place | `top: 0.5rem; right: 0.5rem;` | Leaves the flow, placed from the nearest positioned ancestor (or the page, if there isn't one) |
| `position: sticky` | a header | `top: 0;` | Scrolls with the page, then sticks once it reaches the top |
| `position: fixed` | a button or link | `bottom: 1rem; right: 1rem;` | Pinned to the screen, whatever you scroll |
| `scroll-padding-top` | `html` | `scroll-padding-top: 5rem;` | Leaves room for a sticky header, so what you tab or jump to isn't hidden under it |
| `.visually-hidden` | a `<span>` of words | `<span class="visually-hidden">Back to top</span>` | Not seen, but heard: a name for an icon-only link |
| `aria-hidden="true"` | an icon or symbol | `<span aria-hidden="true">↑</span>` | Seen, but not heard: decoration next to real words |
| `display: none` | | | Not seen and not heard. **Not for names:** a screen reader skips it too |

## Live demo

The whole class, one page: I change the HTML and CSS, you call what happens next. The sandbox is a "Now showing" poster wall for the Saturday Morning Archive's cartoon matinee. It looks fine to someone with a mouse, good eyes, and the sound up, and fails nearly everyone else: the trailer starts on its own and loops forever, with no buttons and no captions; the posters make the page jump as they load, and their captions repeat their `alt`; every "Sold out" ribbon lands in the page's corner; the sticky header hides what you tab to; and the "back to top" arrow is read as just "link". [Open the Multimedia sandbox](/sandbox/250-s10/index.html) in your browser, or download <a href="/sandbox/250-s10/250-s10.zip" download>its folder as a zip</a> to edit your own copy in VS Code. The CSS is in the `<style>` at the top; each comment says which step changes it.

<div data-slides="250-s10"><p>The slides need JavaScript. Every step is in the demo script below.</p></div>

<details>
<summary>Demo script</summary>

Each step says what to change, what to type, and what to look for. Save after every change (Cmd S) and look at the browser. For steps 3 and 6, open DevTools (Cmd Option I), right-click the element and choose **Inspect**, then open the **Accessibility** tab beside Styles: **Name** is what a screen reader calls it.

1. **A trailer that plays itself.** Reload: the trailer starts at once, loops forever, and has no buttons, so there's no way to stop it. Replace the `<video>` tag under the step 1 comment with:

   ```html
   <video controls width="640" height="360">
   ```

   Reload: it waits. Tab to it: the browser's own play, pause, and volume buttons work with Space and the arrow keys.

2. **Captions for a clip with no words.** The trailer has no speech, but it has sound, and someone who can't hear it should know that. Under the `<source>` line, add:

   ```html
   <track kind="captions" src="flower.vtt" srclang="en" label="English">
   ```

   Reload: a CC button appears in the controls. Turn it on and play: the cues from `flower.vtt` show on the picture. Open `flower.vtt` in VS Code: plain text, a start and end time, then the words.

3. **Posters that make the page jump.** Inspect the first poster: it has no `width` or `height`, so the browser can't save its space until the file arrives, and on a slow connection everything below it jumps. Open the Accessibility tab: its Name is the same words as its caption, so a screen reader says them twice. Replace the first `<figure>` under the step 3 comment with:

   ```html
   <figure class="poster">
     <img src="poster-robodog.svg" width="300" height="450"
          alt="A robot dog leaping over a crescent moon">
     <figcaption>Robo-Dog Rides Again · Saturday 9:00</figcaption>
     <p class="ribbon">Sold out</p>
   </figure>
   ```

   (The other two are already done.) Reload: the space is saved before the posters arrive, and the `alt` says what the poster shows while the caption says what and when.

4. **Every ribbon in one corner.** All three "Sold out" ribbons sit in a pile at the top right of the page. They're `position: absolute`, and nothing around them is positioned, so they measure from the page. Under the step 4 comment, add:

   ```css
   .poster {
     position: relative;
   }
   ```

   Each ribbon jumps to its own poster's corner.

5. **A sticky header that hides focus.** Zoom to 200% and press Shift Tab up from the bottom of the page: links slide under the sticky header, and the focus ring vanishes behind it. Under the step 5 comment, add:

   ```css
   html {
     scroll-padding-top: 6rem;
   }
   ```

   Do it again: each link stops below the header, focus ring and all.

6. **An arrow that says "link".** Inspect the ↑ in the bottom corner: it's `position: fixed`, and its Name is "↑", which a screen reader reads as "upwards arrow, link", or just "link". Replace the link under the step 6 comment with:

   ```html
   <a class="to-top" href="#top">
     <span aria-hidden="true">↑</span>
     <span class="visually-hidden">Back to top</span>
   </a>
   ```

   Inspect it again: Name is "Back to top", and the arrow looks the same.

</details>

**On your own:** in your copy of the sandbox (a few minutes each):

- Move every "Sold out" ribbon to the bottom left of its poster. Which two properties change?
- Change the header from `sticky` to `fixed`. What happens to the "Now showing" heading under it, and why?
- Turn the third poster into a link to the show's page, with no words but the poster. What should its `alt` say now?

## Links

- MDN: [Video and audio content (Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio), [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img), [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure), [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), [`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track), [WebVTT format](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API/Web_Video_Text_Tracks_Format), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe), [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position), [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index), [`scroll-padding-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-top), [`aria-hidden`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
- WCAG: [Understanding 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html), [Understanding 1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html), [Understanding 1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html), [Understanding 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [Understanding 2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- W3C: [An alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/); WebAIM: [Invisible content just for screen reader users](https://webaim.org/techniques/css/invisiblecontent/)
- Dig deeper: when you start S10, highlight `position: absolute` (or your `.visually-hidden` rule) in your own page and run [`/dig-deeper`](/250/skills/dig-deeper/). Ask what it's measured from, and answer its predict question before the reveal.
