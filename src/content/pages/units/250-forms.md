---
title: "Forms"
description: "Forms as a conversation: visible labels, grouped choices, the right input types, and errors that make sense without color."
courses: [dight250]
ready: false # true once the S09 dry run passes (PLAN.md: Build order)
session: 9
prototype: P4
date: 2026-11-18
---

# Forms

**The big idea:** a form is a conversation. Every field has a visible label, related choices are grouped under their question, and errors say what's wrong in words, with HTML doing the checking.

## Labels first

Every field needs a visible `<label>`, joined to its field by `for` and `id`:

```html
<label for="email">Email (required)</label>
<input id="email" name="email" type="email" autocomplete="email" required>
```

The link does three things: a screen reader reads the label when the field gets focus, clicking the label puts the cursor in the field (a bigger target), and the label stays on screen while you type. A `placeholder` does none of these well: it disappears as soon as you start typing, it's usually low contrast, and some screen readers skip it. Use it for an example at most, never instead of a label.

`name` is different from `id`: `name` is what the answer is called when the form is sent.

## The right field for the answer

- **Input types** (`email`, `url`, `tel`, `number`, `date`) bring up the right keyboard on a phone, and the browser checks the format for you.
- **`autocomplete`** (`name`, `email`, `tel`, …) lets the browser fill in what it already knows, which saves typing for everyone and a lot of effort for some.
- **`<textarea>`** for answers longer than a line; **`<select>`** or radio buttons for one choice from a list; checkboxes for "any of these."

## Group the choices

Radio buttons and checkboxes answer one question together, so they go in a `<fieldset>`, and the question is its `<legend>`:

```html
<fieldset>
  <legend>Which decade did it first air?</legend>
  <input type="radio" id="d70" name="decade" value="1970s">
  <label for="d70">1970s</label>
  <input type="radio" id="d80" name="decade" value="1980s">
  <label for="d80">1980s</label>
  <input type="radio" id="d90" name="decade" value="1990s">
  <label for="d90">1990s</label>
</fieldset>
```

Radio buttons with the same `name` are one group, so only one can be chosen. A screen reader reads the legend as you enter the group, so the question comes with the choices.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 290" role="img" aria-labelledby="form-wide-title">
<title id="form-wide-title">Two versions of the same form. With a visible label and a fieldset, a screen reader says: Email, required, edit text; then First aired in, group, 1980s, radio button, 2 of 3. With only a placeholder and no fieldset, it says Edit text, or the placeholder until you type; then 1980s, radio button, 2 of 3, with no question.</title>
<text x="20" y="22">With a label and a fieldset</text>
<text x="20" y="52">Email (required)</text>
<rect class="d-box" x="20" y="60" width="260" height="30" rx="4" />
<rect class="d-key" x="20" y="106" width="260" height="68" rx="4" />
<text x="32" y="128">First aired in</text>
<circle class="d-box" cx="38" cy="152" r="7" />
<text x="50" y="157">1970s</text>
<circle class="d-box" cx="118" cy="152" r="7" />
<text x="130" y="157">1980s</text>
<circle class="d-box" cx="198" cy="152" r="7" />
<text x="210" y="157">1990s</text>
<text class="d-muted" x="20" y="206">A screen reader says:</text>
<text x="20" y="230">"Email, required, edit text"</text>
<text x="20" y="254">"First aired in, group,</text>
<text x="20" y="276">1980s, radio button, 2 of 3"</text>
<text x="340" y="22">Placeholder, no fieldset</text>
<rect class="d-box" x="340" y="60" width="260" height="30" rx="4" />
<text class="d-muted" x="352" y="80">Email</text>
<circle class="d-box" cx="358" cy="152" r="7" />
<text x="370" y="157">1970s</text>
<circle class="d-box" cx="438" cy="152" r="7" />
<text x="450" y="157">1980s</text>
<circle class="d-box" cx="518" cy="152" r="7" />
<text x="530" y="157">1990s</text>
<text class="d-muted" x="340" y="206">A screen reader says:</text>
<text x="340" y="230">"Edit text" (or "Email", until you type)</text>
<text x="340" y="254">"1980s, radio button, 2 of 3"</text>
<text class="d-muted" x="340" y="276">which question?</text>
</svg>
<svg class="d-narrow" viewBox="0 0 280 560" role="img" aria-labelledby="form-narrow-title">
<title id="form-narrow-title">Two versions of the same form. With a visible label and a fieldset, a screen reader says: Email, required, edit text; then First aired in, group, 1980s, radio button, 2 of 3. With only a placeholder and no fieldset, it says Edit text, or the placeholder until you type; then 1980s, radio button, 2 of 3, with no question.</title>
<text x="4" y="18">With a label and a fieldset</text>
<text x="4" y="44">Email (required)</text>
<rect class="d-box" x="4" y="52" width="250" height="28" rx="4" />
<rect class="d-key" x="4" y="92" width="250" height="64" rx="4" />
<text x="14" y="112">First aired in</text>
<circle class="d-box" cx="20" cy="136" r="7" />
<text x="32" y="141">1970s</text>
<circle class="d-box" cx="100" cy="136" r="7" />
<text x="112" y="141">1980s</text>
<circle class="d-box" cx="180" cy="136" r="7" />
<text x="192" y="141">1990s</text>
<text class="d-muted" x="4" y="184">A screen reader says:</text>
<text x="4" y="206">"Email, required, edit text"</text>
<text x="4" y="228">"First aired in, group,</text>
<text x="4" y="248">1980s, radio button, 2 of 3"</text>
<text x="4" y="300">Placeholder, no fieldset</text>
<rect class="d-box" x="4" y="312" width="250" height="28" rx="4" />
<text class="d-muted" x="14" y="331">Email</text>
<circle class="d-box" cx="20" cy="372" r="7" />
<text x="32" y="377">1970s</text>
<circle class="d-box" cx="100" cy="372" r="7" />
<text x="112" y="377">1980s</text>
<circle class="d-box" cx="180" cy="372" r="7" />
<text x="192" y="377">1990s</text>
<text class="d-muted" x="4" y="420">A screen reader says:</text>
<text x="4" y="442">"Edit text"</text>
<text x="4" y="462">(or "Email", until you type)</text>
<text x="4" y="488">"1980s, radio button, 2 of 3"</text>
<text class="d-muted" x="4" y="510">which question?</text>
</svg>
<figcaption>Two forms that look almost the same. What a screen reader says comes from the HTML: the label and the legend are how the question reaches someone who can't see it.</figcaption>
</figure>

## Let HTML do the checking

`required`, `type="email"`, and `minlength="20"` are checks the browser runs for you. When someone submits, it stops at the first problem and says what's wrong, in words. No JavaScript needed.

To style a field that has a problem, use **`:user-invalid`**. Its older cousin `:invalid` matches straight away, so every empty required field is red before anyone has typed a thing. `:user-invalid` waits until the person has changed the field or tried to submit.

Never let color carry the error alone. Tie a hint to the field with `aria-describedby` (so a screen reader reads it with the field), and change its words when the field is wrong:

```html
<label for="email">Email (required)</label>
<input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-hint">
<p class="hint" id="email-hint">An address like name@example.com.</p>
```

```css
input:user-invalid {
  border: 2px solid #b3261e;
}

input:user-invalid + .hint::before {
  content: "Check this: ";
  font-weight: bold;
}
```

## Where does it go?

A form sends its answers to the URL in `action`. GitHub Pages can't store anything, so for this course, send it to a thank-you page in the same folder: `<form action="thanks.html" method="get">`. With `get`, the answers appear in the URL of the thank-you page, which is a good way to see what a form sends, and a good reason to practise only with made-up details. Real sites send forms to a server, which is DIGHT 340's territory.

## Predict, then reveal

<details>
<summary>An email field has <code>placeholder="Email"</code> and no label. What happens as soon as someone starts typing?</summary>

The placeholder disappears, so the field no longer says what it's for. Anyone who looks away, or who checks their answers before submitting, has to guess. Placeholders are usually pale gray, below 4.5:1, and some screen readers don't read them. A visible `<label>` fixes all of it.

</details>

<details>
<summary>A required field is styled with <code>input:invalid { border-color: red; }</code>. What does the form look like when the page first loads?</summary>

Every required field is already red, before anyone has typed anything, because an empty required field is invalid. It reads as "you've done something wrong" to someone who hasn't started. `:user-invalid` waits until they've touched the field or tried to submit.

</details>

<details>
<summary>Three radio buttons with labels but no <code>fieldset</code>. What does a screen reader say on the second one?</summary>

Something like "1980s, radio button, 2 of 3", and nothing about the question. A sighted person sees the question above the buttons; a screen-reader user gets the choices without it. Put them in a `<fieldset>` with the question as its `<legend>`.

</details>

## Try it together

Everyone runs the same prompt, then we check what came back. Copy your `sparks/s08-responsive/` folder to `try/s09/`, open `try/s09/index.html`, and paste:

```text
Add a form where visitors can suggest a cartoon for the archive: their name, email, the show, the decade it first aired, and why.
```

**How to check it**

- Click each label. Does the cursor jump into its field?
- Are the decade choices in a `<fieldset>` with the question as the `<legend>`?
- Submit it empty. Does the browser say what's wrong in words? Do any fields turn red before you've touched them?
- Is any `placeholder` doing a label's job? Is the email field `type="email"` with `autocomplete="email"`?

**Dig deeper:** highlight `:user-invalid` (or an `autocomplete` attribute) and run [`/dig-deeper`](/250/skills/dig-deeper/).

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- Placeholders instead of labels, especially for name and email.
- The decade as radio buttons with no `<fieldset>` or `<legend>`, or as a free-text box.
- Errors shown only by a red border, or `:invalid` so the form is red from the start.
- A JavaScript validation script, which `AGENTS.md` rules out here, when the HTML attributes already do the job.
- `action="#"` or a made-up URL, so the form goes nowhere you can see.

It looked like a form. Clicking the labels, submitting it empty, and reading the HTML for `fieldset` showed which parts were only drawn as a form. In P4 you'll build one with labels, a fieldset, and `:user-invalid` in the "done" list.

</details>

## Links

- MDN: [Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form), [How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form), [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form), [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label), [`<input>` types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input), [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset), [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend), [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete), [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid), [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby)
- WCAG: [Understanding 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [Understanding 1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), [Understanding 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), [Understanding 3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- W3C: [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) (Web Accessibility Initiative)
