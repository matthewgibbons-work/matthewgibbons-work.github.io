---
title: "Forms"
description: "Forms as a conversation: visible labels, grouped choices, the right input types, and errors that make sense without color."
courses: [dight250]
ready: true
session: 9
prototype: P4
date: 2026-11-18
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Forms

<details>
<summary>Key takeaways</summary>

- **A form is a conversation:** it asks in words, groups the choices under their question, and says what's wrong in words.
- **Every field gets a visible `<label>`,** joined by `for` and `id`. A `placeholder` disappears when you type; never use it as the label.
- **The right `type` and `autocomplete`** bring up the right phone keyboard, let the browser check the format, and fill in what it already knows.
- **Radio buttons and checkboxes go in a `<fieldset>`,** with the question as its `<legend>`, so a screen reader hears the question with the choices.
- **Let HTML check** (`required`, `type="email"`, `minlength`), style problems with `:user-invalid` (not `:invalid`, which is red before anyone types), and put the error in words with `aria-describedby`, never color alone.
- **Today's Spark puts it to work.** S09 fixes an RSVP form; P4 builds a bigger one.

</details>

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

## At a glance

The elements and attributes on this page in one place.

| Element or attribute | Goes on | Example | What it does |
| --- | --- | --- | --- |
| `<label for>` | before its field | `<label for="email">Email (required)</label>` | Names the field, stays visible, and makes the label clickable; `for` matches the field's `id` |
| `id` | a field | `id="email"` | What the label's `for` (and `aria-describedby`) points at |
| `name` | a field | `name="email"` | What the answer is called when the form is sent |
| `type` | `<input>` | `email`, `url`, `tel`, `number`, `date` | The right phone keyboard, and the browser checks the format |
| `autocomplete` | a field | `name`, `email`, `tel` | Lets the browser fill in what it already knows |
| `<fieldset>` + `<legend>` | around radios or checkboxes | `<legend>Which decade did it first air?</legend>` | Groups the choices under their question |
| `required`, `minlength` | a field | `required minlength="20"` | Checks the browser runs on submit, with its own message in words |
| `:user-invalid` | a CSS selector | `input:user-invalid { … }` | Matches a field with a problem, but only after someone has changed it or tried to submit |
| `:invalid` | a CSS selector | | Matches from the moment the page loads. **Not for error styles:** empty required fields are red before anyone types |
| `aria-describedby` | a field | `aria-describedby="email-hint"` | A screen reader reads that element's words along with the field |
| `action`, `method` | `<form>` | `action="thanks.html" method="get"` | Where the answers go, and how (`get` puts them in the URL) |

## Live demo

The whole class, one form: I change the HTML and CSS on the projector, you call what happens next. The sandbox is a "Suggest a show" form for the Saturday Morning Archive that looks fine with a mouse and fails nearly everyone else: placeholders instead of labels, a plain text box for the email, radio buttons with no question, red borders before anyone types, and nowhere to send it. [Open the Forms sandbox](/sandbox/250-s09/index.html) in your browser, or download <a href="/sandbox/250-s09/index.html" download="index.html">index.html</a> and <a href="/sandbox/250-s09/thanks.html" download="thanks.html">thanks.html</a> into one folder to edit your own copy in VS Code. The CSS is in the `<style>` at the top; each comment in the form says which step changes it.

Each step says what to change, what to type, and what to look for. Save after every change (Cmd S) and look at the browser.

1. **Labels, not placeholders.** Click in the first box and type your name: "Your name" is gone, and nothing says what the box was for. Replace the two `<input>` lines with:

   ```html
   <label for="name">Your name (required)</label>
   <input type="text" id="name" name="name" required>
   <label for="email">Email (required)</label>
   <input type="text" id="email" name="email" required>
   ```

   The labels stay while you type. Click the word "Email": the cursor jumps into its box.

2. **The right field for the answer.** Type your name, `abc` in the email box, and press Send: the browser skips the email and complains about the empty "Why" box instead, because a text box takes anything. Change the email `<input>` to `type="email"`, and add `autocomplete="email"` to it and `autocomplete="name"` to the name field. Save, type your name and `abc` again, and press Send: now the browser stops at the email and says, in words, that it needs an `@`. On a phone, the email keyboard now has an `@` key.

3. **Group the choices under their question.** The three radio buttons say "1970s, 1980s, 1990s", but nothing asks a question; a screen reader says "1980s, radio button, 2 of 3", and that's all. Wrap the three `<div class="choice">` blocks in:

   ```html
   <fieldset>
     <legend>Which decade did it first air?</legend>
     …
   </fieldset>
   ```

   The question sits in the box's border, and a screen reader reads it as you enter the group.

4. **Red before anyone's typed.** Reload the page: every required field is already red, and you haven't done anything wrong. That's the `:invalid` rule at the top of the `<style>`: an empty required field is invalid from the start. Change both selectors to `:user-invalid`:

   ```css
   input:user-invalid,
   textarea:user-invalid {
     border-color: #b3261e;
   }
   ```

   Reload: no red. Press Send with everything empty: the browser stops at the first problem and says what's wrong, and now the empty fields turn red.

5. **Say it in words, not just red.** A red border means nothing to someone who can't see red. Replace the `<textarea>` line with a label, the field, and a hint tied to it:

   ```html
   <label for="why">Why should we add it? (required)</label>
   <textarea id="why" name="why" required minlength="20" aria-describedby="why-hint"></textarea>
   <p class="hint" id="why-hint">At least 20 characters.</p>
   ```

   Then add a hint after the email field (`<p class="hint" id="email-hint">An address like name@example.com.</p>`, and `aria-describedby="email-hint"` on the email `<input>`), and under the step 4 rule, add:

   ```css
   :user-invalid + .hint::before {
     content: "Check this: ";
     font-weight: bold;
   }
   ```

   Press Send with "Why" too short: "**Check this:** At least 20 characters." The words change, not only the color, and a screen reader reads the hint with the field.

6. **Where does it go?** Fill in everything (made-up details) and press Send: the page just reloads, because `action="#"` sends it right back here. Change the form's opening tag to:

   ```html
   <form action="thanks.html" method="get">
   ```

   Send again: the thank-you page. Look at the address bar: everything you typed is in the URL, after the `?`. That's `method="get"`, and it's why you only ever practise with made-up details.

**On your own:** in your copy of the sandbox (a few minutes each):

- Add a "Which channel?" `<select>` with three channels and a visible label. Does it need a `<fieldset>`?
- Add an optional "Episode link" field. Which `type` makes the browser check it, and what does it say for `abc`?
- Tab through the whole form without the mouse, and fill it in with only the keyboard (arrow keys move between radio buttons). Is anything unreachable?

## Links

- MDN: [Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form), [How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form), [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form), [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label), [`<input>` types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input), [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset), [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend), [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete), [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid), [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby)
- WCAG: [Understanding 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [Understanding 1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), [Understanding 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), [Understanding 3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- W3C: [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) (Web Accessibility Initiative)
- Dig deeper: when you start P4, highlight `:user-invalid` (or an `autocomplete` attribute) in your own form and run [`/dig-deeper`](/250/skills/dig-deeper/). Answer its predict question before the reveal.
