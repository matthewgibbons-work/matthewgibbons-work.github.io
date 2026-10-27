---
title: "Big live build"
description: "Everything at once: a whole small site, from intent brief to verified deploy, in one session."
courses: [dight250]
ready: false # true once the S13 dry run passes (PLAN.md: Build order)
session: 13
date: 2026-12-07
---

# Big live build

**The big idea:** everything at once. One small site, from an intent brief to a verified deploy, in one session, with every check done out loud before moving on. It's your Final Project in miniature, and the order of work is the thing to take with you.

## The brief

We'll all build the same site, so we can check it together.

**Intent:** the Saturday Morning Archive runs a monthly **Rewatch Club**, a Saturday-morning watch party for families in the neighborhood. Parents need to know what's on, when, and where, and sign up so there are enough seats and snacks. Plenty of them will be on a phone.

**Pages:** a home page (what it is, where, and the next three parties), a schedule (a table of dates, shows, and episodes), and a sign-up form, plus a thank-you page.

**"Done" when:**

- Every page has landmarks, one `<h1>`, and the same nav, with the current page marked by `aria-current="page"`.
- The schedule is a `<table>` with a `<caption>` and `<th scope>`.
- One shared stylesheet; mobile first; nothing scrolls sideways at 320px, and nothing overlaps at 200% zoom.
- Colors and type are custom properties, with a dark mode, and every text pair meets 4.5:1 in both.
- The sign-up form has a visible label on every field, its choices in a `<fieldset>` with a `<legend>`, errors in words with `:user-invalid`, and it goes to `thanks.html`.
- Any motion respects reduced motion.
- The live pages pass the Feedback checks, and the whole site works with a keyboard.

Read it before anyone opens a chat: is every line something you could check with a yes or a no?

## Five checkpoints

We build in five steps. Each one ends with a **gate**: a check that has to pass before the next prompt. Small steps mean small mistakes, found while they're still easy to fix.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 170" role="img" aria-labelledby="build-wide-title">
<title id="build-wide-title">Five checkpoints in order, each with the check that gates it. 1 Structure: the validator and landmarks. 2 Layout: 320px and 200% zoom. 3 Look: contrast in both modes. 4 Form: labels, and submitting it empty. 5 Ship: the Feedback checks, and a keyboard pass on the live site.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="10" y="20" width="108" height="56" rx="6" />
<text x="64" y="44" text-anchor="middle">1</text>
<text x="64" y="64" text-anchor="middle">Structure</text>
<line class="d-line" x1="118" y1="48" x2="136" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="139" y="20" width="108" height="56" rx="6" />
<text x="193" y="44" text-anchor="middle">2</text>
<text x="193" y="64" text-anchor="middle">Layout</text>
<line class="d-line" x1="247" y1="48" x2="265" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="268" y="20" width="108" height="56" rx="6" />
<text x="322" y="44" text-anchor="middle">3</text>
<text x="322" y="64" text-anchor="middle">Look</text>
<line class="d-line" x1="376" y1="48" x2="394" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="397" y="20" width="108" height="56" rx="6" />
<text x="451" y="44" text-anchor="middle">4</text>
<text x="451" y="64" text-anchor="middle">Form</text>
<line class="d-line" x1="505" y1="48" x2="523" y2="48" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="526" y="20" width="108" height="56" rx="6" />
<text x="580" y="44" text-anchor="middle">5</text>
<text x="580" y="64" text-anchor="middle">Ship</text>
<text class="d-muted" x="10" y="104">Gate:</text>
<text class="d-muted" x="64" y="128" text-anchor="middle">validator,</text>
<text class="d-muted" x="64" y="148" text-anchor="middle">landmarks</text>
<text class="d-muted" x="193" y="128" text-anchor="middle">320px,</text>
<text class="d-muted" x="193" y="148" text-anchor="middle">200% zoom</text>
<text class="d-muted" x="322" y="128" text-anchor="middle">contrast,</text>
<text class="d-muted" x="322" y="148" text-anchor="middle">both modes</text>
<text class="d-muted" x="451" y="128" text-anchor="middle">labels,</text>
<text class="d-muted" x="451" y="148" text-anchor="middle">submit empty</text>
<text class="d-muted" x="580" y="128" text-anchor="middle">Feedback checks,</text>
<text class="d-muted" x="580" y="148" text-anchor="middle">live keyboard</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 330" role="img" aria-labelledby="build-narrow-title">
<title id="build-narrow-title">Five checkpoints in order, each with the check that gates it. 1 Structure: the validator and landmarks. 2 Layout: 320px and 200% zoom. 3 Look: contrast in both modes. 4 Form: labels, and submitting it empty. 5 Ship: the Feedback checks, and a keyboard pass on the live site.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text class="d-muted" x="140" y="16">Gate</text>
<rect class="d-box" x="4" y="24" width="120" height="44" rx="6" />
<text x="64" y="51" text-anchor="middle">1 · Structure</text>
<text class="d-muted" x="140" y="44">validator,</text>
<text class="d-muted" x="140" y="62">landmarks</text>
<line class="d-line" x1="64" y1="68" x2="64" y2="84" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="86" width="120" height="44" rx="6" />
<text x="64" y="113" text-anchor="middle">2 · Layout</text>
<text class="d-muted" x="140" y="106">320px,</text>
<text class="d-muted" x="140" y="124">200% zoom</text>
<line class="d-line" x1="64" y1="130" x2="64" y2="146" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="148" width="120" height="44" rx="6" />
<text x="64" y="175" text-anchor="middle">3 · Look</text>
<text class="d-muted" x="140" y="168">contrast,</text>
<text class="d-muted" x="140" y="186">both modes</text>
<line class="d-line" x1="64" y1="192" x2="64" y2="208" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="210" width="120" height="44" rx="6" />
<text x="64" y="237" text-anchor="middle">4 · Form</text>
<text class="d-muted" x="140" y="230">labels,</text>
<text class="d-muted" x="140" y="248">submit empty</text>
<line class="d-line" x1="64" y1="254" x2="64" y2="270" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="272" width="120" height="44" rx="6" />
<text x="64" y="299" text-anchor="middle">5 · Ship</text>
<text class="d-muted" x="140" y="292">Feedback checks,</text>
<text class="d-muted" x="140" y="310">live keyboard</text>
</svg>
<figcaption>Five checkpoints. Each gate has to pass before the next prompt, so problems are found while they're still small.</figcaption>
</figure>

## What to take to your Final Project

- **Structure, then layout, then looks.** Good HTML makes everything after it easier; CSS can't fix the wrong element.
- **One small request at a time,** with a plan first. "Build the whole site" is how you get a lot of code nobody can explain.
- **Check before you move on.** Every gate is two minutes. Finding a problem at checkpoint 5 that started at checkpoint 1 costs much more.
- **Be able to explain any line.** When someone asks about a line, "the agent wrote it" is where the answer starts, not where it ends.

## Predict, then reveal

<details>
<summary>Which should come first: the layout, or the HTML structure? Why?</summary>

The structure. Layout is applied *to* elements, so if the episode list is a pile of `<div>`s, no CSS will make it a table for a screen reader. Get the right elements first (landmarks, headings, table, form), check them, then lay them out.

</details>

<details>
<summary>When should the validator first run: after the HTML, or at the end?</summary>

After the HTML, at checkpoint 1, and then on every push through your Feedback checks. An unclosed tag found early is a one-line fix; found at the end, it might be the reason three later things look broken.

</details>

<details>
<summary>The agent says, "Your site is complete and fully accessible." What do you do?</summary>

Treat it as a claim and check it against the "done" list, line by line, on the live site: the Feedback checks, Tab through every page, 320px, two contrast pairs, and submit the form empty. "Fully accessible" is not a check; your list is.

</details>

## Try it together

Today, Try it together *is* the build, about 40 minutes. Create `sparks/s13-big-build/` (it's also today's Spark, so it gets committed and pushed), and run these five prompts in order. Don't start the next prompt until the gate passes, and help your neighbour if theirs doesn't.

**1. Structure.** Paste the intent and "done" list above, then:

```text
Propose a plan first: the files, and the landmarks and headings on each page. Then create index.html, schedule.html, and signup.html in sparks/s13-big-build/, with the same nav on every page and no CSS yet.
```

*Gate:* each page has landmarks, one `<h1>`, and `aria-current="page"` on the right nav link; the schedule table has a `<caption>` and `scope`. Upload one page to the [W3C validator](https://validator.w3.org/nu/) (**Validate by file upload**).

**2. Layout.**

```text
Add one shared style.css. Mobile first: one column as the base, min-width media queries in em. The nav wraps with Flexbox, and the home page shows the next three parties as cards in an auto-fit grid.
```

*Gate:* the device toolbar at 320px (no sideways scroll), then 200% zoom.

**3. Look.**

```text
Put the colors and type in custom properties on :root, with a dark mode using prefers-color-scheme. Every text pair must meet 4.5:1 in both modes; list each pair and its ratio.
```

*Gate:* check two pairs in each mode in WebAIM, and Tab in both modes.

**4. Form.**

```text
Build the sign-up form on signup.html: name, email, which party (radio buttons), how many people, and anything we should know. Every field has a visible label, the parties are in a fieldset with a legend, problems show in words with :user-invalid, and it goes to a new thanks.html with method get.
```

*Gate:* click every label, submit it empty, and listen to the radio group with VoiceOver.

**5. Ship.** In GitHub Desktop, commit ("S13: Rewatch Club, built in class") and push. Then link it from your hub under Sparks.

*Gate:* the **Feedback checks** Summary for all four pages, then Tab through the live site.

**How to check it,** at the end: go down the "done" list above, line by line, on the live site. **Dig deeper:** pick one line in the site you couldn't explain yet and run [`/dig-deeper`](/250/skills/dig-deeper/) on it.

<details>
<summary>What went wrong, and how we caught it</summary>

Builds like this usually turn up a few of these, and each gate is where they show:

- At **structure:** the schedule as cards instead of a table, or the nav different on each page.
- At **layout:** a `grid-column: span 2` card or a fixed width that scrolls sideways at 320px.
- At **look:** a dark-mode link color under 4.5:1, or a focus ring that disappears in dark mode.
- At **form:** placeholders instead of labels, or the parties with no `<legend>`.
- At **ship:** a page left out of the nav, or `thanks.html` with no way back.
- And at any point: the agent "helpfully" rewriting a page that had already passed its gate. Small requests and checking the diff in Desktop caught it.

None of these were hard to fix where they were found. That's the point of the gates.

</details>

## Links

- This term's units: [Color](/250/units/color/), [Typography](/250/units/typography/), [Box model](/250/units/box-model/), [Flexbox](/250/units/flexbox/), [Grid](/250/units/grid/), [Responsive design](/250/units/responsive/), [Forms](/250/units/forms/), [Multimedia](/250/units/multimedia/), [Modern CSS](/250/units/modern-css/), [Motion and audit](/250/units/motion-audit/)
- MDN: [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current)
- Checklists: [W3C Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/), [WebAIM WCAG checklist](https://webaim.org/standards/wcag/checklist)
