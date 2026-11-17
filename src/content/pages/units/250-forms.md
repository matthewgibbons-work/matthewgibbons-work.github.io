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
| `<fieldset>` + `<legend>` | around radios, checkboxes, or related fields | `<legend>Which decade did it first air?</legend>`, `<legend>Drop-off</legend>` | Groups the fields under their question or heading; a screen reader says it as you enter the group |
| `required`, `minlength`, `min`, `max` | a field | `required minlength="20"`, `min="1970" max="1999"` | Checks the browser runs on submit, with its own message in words |
| `:user-invalid` | a CSS selector | `input:user-invalid { … }` | Matches a field with a problem, but only after someone has changed it or tried to submit |
| `:invalid` | a CSS selector | | Matches from the moment the page loads. **Not for error styles:** empty required fields are red before anyone types |
| `aria-describedby` | a field | `aria-describedby="email-hint"` | A screen reader reads that element's words along with the field |
| `:user-invalid + .hint::before` | a CSS selector | `content: "Check this: ";` | Adds words to the hint once its field has a problem, so the error isn't only a color |
| `action`, `method` | `<form>` | `action="thanks.html" method="get"` | Where the answers go, and how (`get` puts them in the URL) |

## Live demo

The whole class, one form: I change the HTML and CSS on the projector, you call what happens next. The sandbox is a "Lend us a tape" form for the Saturday Morning Archive. It looks fine with a mouse and fails nearly everyone else: the field names are plain text, not labels; every field takes anything you type; two groups both have a field called "Date"; required fields are red before anyone types; and the form goes nowhere. [Open the Forms sandbox](/sandbox/250-s09/index.html) in your browser, or download <a href="/sandbox/250-s09/index.html" download="index.html">index.html</a> and <a href="/sandbox/250-s09/thanks.html" download="thanks.html">thanks.html</a> into one folder to edit your own copy in VS Code. The CSS is in the `<style>` at the top; each comment in the form says which step changes it.

Each step says what to change, what to type, and what to look for. Save after every change (Cmd S) and look at the browser. For steps 1, 3, and 5, open DevTools (Cmd Option I), right-click a field and choose **Inspect**, then open the **Accessibility** tab beside Styles: **Name** is what a screen reader calls the field.

1. **Text that only looks like a label.** Click the words "Your name": nothing happens. Inspect the box under them: its Name is empty, so a screen reader says only "edit text". Replace the four lines under the step 1 comment with:

   ```html
   <label for="name">Your name</label>
   <input type="text" id="name" name="name" autocomplete="name" required>
   <label for="phone">Phone</label>
   <input type="tel" id="phone" name="phone" autocomplete="tel" required>
   ```

   Click "Phone": the cursor jumps into its box. Inspect it: Name is "Phone". (On a phone, `type="tel"` brings up the number pad, and `autocomplete` offers the number the browser already knows.)

2. **The right field for the answer.** Type a name and a phone number first (the browser checks fields in order). Type `the eighties` in the year box and `my photo` in the link box, and press Send: the browser complains about the empty dates, and never notices the year or the link. Replace the five lines under the step 2 comment with:

   ```html
   <label for="year">Year it was recorded</label>
   <input type="number" id="year" name="year" min="1970" max="1999" required>
   <p class="hint">Any year from 1970 to 1999.</p>
   <label for="photo">Link to a photo of the label (optional)</label>
   <input type="url" id="photo" name="photo">
   ```

   Try typing letters in the year box: most won't go in (an `e` can, for numbers like `1e3`). Clear it, type `2005`, and press Send: the browser stops at the year and says it must be 1999 or earlier. Fix it, and it stops at the link: it wants a URL. Clear the link (it's optional, so empty is fine).

3. **Two fields called "Date".** Inspect the first Date box: no Name at all. Labels alone won't fix this one. With labels, both boxes would be called "Date", and a screen reader user tabbing in wouldn't know which is which. Replace everything under the step 3 comment, down to the button, with:

   ```html
   <fieldset>
     <legend>Drop-off</legend>
     <label for="dropoff-date">Date</label>
     <input type="date" id="dropoff-date" name="dropoff-date" required>
     <label for="dropoff-time">Time</label>
     <input type="time" id="dropoff-time" name="dropoff-time">
   </fieldset>

   <fieldset>
     <legend>Pick-up</legend>
     <label for="pickup-date">Date</label>
     <input type="date" id="pickup-date" name="pickup-date" required>
     <label for="pickup-time">Time</label>
     <input type="time" id="pickup-time" name="pickup-time">
   </fieldset>
   ```

   Each pair sits in a box with its question in the border, and the boxes now have a calendar and a clock. In the Accessibility tab, open the **Accessibility tree**: each Date box sits inside a group called "Drop-off" or "Pick-up", so a screen reader says "Pick-up, group" as you enter it. (Notice the `id`s have to differ, even though the labels don't.)

4. **Red before anyone's typed.** Reload: the name, phone, year, and both dates are red, and you haven't done anything wrong. That's the `input:invalid` rule at the top of the `<style>`: an empty required field is invalid from the start. Change it to:

   ```css
   input:user-invalid {
     border-color: #b3261e;
   }
   ```

   Reload: no red. Type `2005` in the year and click away: only the year turns red. Press Send with the rest empty: the browser stops at the first problem, and now every empty required field turns red.

5. **Tie the hint to its field.** Inspect the year box: its Name is "Year it was recorded", and that's all. The hint right under it is on the screen, but a screen reader never connects the two. Give the hint an `id`, and point the field at it:

   ```html
   <input type="number" id="year" name="year" min="1970" max="1999" required aria-describedby="year-hint">
   <p class="hint" id="year-hint">Any year from 1970 to 1999.</p>
   ```

   Inspect it again: the Accessibility tab now shows **Description: Any year from 1970 to 1999.** A screen reader reads it after the label, so someone who hears "invalid" also hears what's allowed.

6. **Where does it go?** Fill in everything (made-up details) and press Send: the page just reloads, because `action="#"` sends it right back here. Change the form's opening tag to:

   ```html
   <form action="thanks.html" method="get">
   ```

   Send again: the thank-you page. Look at the address bar: everything you typed is in the URL after the `?`, phone number included. It's now in the browser's history, too. That's `method="get"`: fine for a search box, wrong for personal details on a real site, which use `method="post"` and a server. That's why you only ever practise with made-up details.

**On your own:** in your copy of the sandbox (a few minutes each):

- Make the pick-up optional. Which attribute comes out of which fields, and does the Pick-up box still need its legend?
- Stop people choosing a drop-off date before Wed Nov 18, 2026. Which attribute does it, and what does the browser say for Nov 1?
- Fill in and send the whole form with the keyboard only, the calendar and clock included. Where is it hardest?

## Links

- MDN: [Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form), [How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form), [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form), [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label), [`<input>` types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input), [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset), [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend), [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete), [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid), [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby)
- WCAG: [Understanding 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [Understanding 1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), [Understanding 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), [Understanding 3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- W3C: [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) (Web Accessibility Initiative)
- Dig deeper: when you start P4, highlight `:user-invalid` (or an `autocomplete` attribute) in your own form and run [`/dig-deeper`](/250/skills/dig-deeper/). Answer its predict question before the reveal.
