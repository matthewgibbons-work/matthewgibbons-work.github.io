---
title: "Svelte forms and shared state"
description: "bind:, shared state in .svelte.js modules, labeled inputs, and errors people can perceive."
courses: [dight340]
ready: true
session: 9
prototype: P4
date: 2026-11-18
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Svelte forms and shared state

<details>
<summary>Key takeaways</summary>

- **A form is a conversation.** It asks in words (a visible `<label>`), answers in words (an error message, not just red), and puts you back where you need to be (focus on the field to fix).
- **`bind:value` goes both ways.** Typing changes the state; changing the state changes what's in the box.
- **Handle `onsubmit`, not the button's click**, so Enter works too, and call `event.preventDefault()` so the browser doesn't send the form and leave the page.
- **An error people can perceive** is text in an element that's on the page from the start (`role="alert"`), joined to its input by `aria-describedby`, with `aria-invalid` on the input.
- **Shared state lives in a `.svelte.js` module.** Export it as a `const` and change what's inside it; Svelte won't build a module that reassigns exported state (`state_invalid_export`).
- **Today's Spark puts it to work.** S09 adds a nickname form and a shared party to your S08 page; P4 builds the team planner on both.

</details>

## How it works

**Binding.** `bind:value={nickname}` ties an input to a `$state` variable both ways: typing changes `nickname`, and setting `nickname` changes what's in the box. There's `bind:checked` for a checkbox and `bind:group` for a set of radio buttons or checkboxes. Handle the form's `onsubmit` (so Enter works), call `event.preventDefault()`, then check the values yourself.

**Errors people can find.** Each input has a visible `<label>`. The error is text, not just a red border, in an element that's on the page from the start, so a screen reader announces it when it fills in (`role="alert"` or `aria-live`). The input points at it with `aria-describedby` and says it's invalid with `aria-invalid`, and focus goes back to the first field that needs fixing.

**Shared state.** Put state two components need in its own module, a file ending `.svelte.js` so runes work in it, and import it in both: `export const party = $state({ members: [] })`. Components **change its properties** (`party.members.push(…)`), and every importer sees the change. You can't export a `$state` variable and then reassign it: Svelte refuses to build, with `state_invalid_export`. An import is a live link to a variable, but Svelte's reactivity lives in what `$state` gives back, and reassigning would quietly replace it. So export a `const` and change what's inside it, or export functions that read and change it.

```svelte
<form onsubmit={save} novalidate>
  <label for="nickname">Nickname for Pikachu</label>
  <input id="nickname" bind:this={input} bind:value={nickname}
    aria-invalid={error !== ''} aria-describedby="nickname-error" />
  <p id="nickname-error" role="alert">{error}</p>
  <button>Save nickname</button>
</form>
```

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 160" role="img" aria-labelledby="bind-wide-title">
<title id="bind-wide-title">An input and the nickname state are tied both ways by bind:value. On a valid submit, the form changes the shared party in party.svelte.js. Every component that imports the party, such as the team summary, shows the change.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="40" width="112" height="60" rx="6" />
<text x="60" y="66" text-anchor="middle">Input</text>
<text class="d-muted d-code" x="60" y="86" text-anchor="middle">&lt;input&gt;</text>
<line class="d-line" x1="120" y1="70" x2="164" y2="70" marker-start="url(#arrow-wide)" marker-end="url(#arrow-wide)" />
<text class="d-muted d-code" x="142" y="30" text-anchor="middle">bind:value</text>
<rect class="d-box" x="168" y="40" width="136" height="60" rx="6" />
<text x="236" y="66" text-anchor="middle">Form state</text>
<text class="d-muted d-code" x="236" y="86" text-anchor="middle">nickname</text>
<line class="d-line" x1="304" y1="70" x2="330" y2="70" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="318" y="124" text-anchor="middle">valid submit</text>
<rect class="d-key" x="332" y="40" width="136" height="60" rx="6" />
<text x="400" y="66" text-anchor="middle">Shared state</text>
<text class="d-muted d-code" x="400" y="86" text-anchor="middle">party.svelte.js</text>
<line class="d-line" x1="468" y1="70" x2="494" y2="70" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="482" y="124" text-anchor="middle">every importer</text>
<rect class="d-box" x="496" y="40" width="136" height="60" rx="6" />
<text x="564" y="66" text-anchor="middle">Summary</text>
<text class="d-muted" x="564" y="86" text-anchor="middle">shows "Sparky"</text>
</svg>
<svg class="d-narrow" viewBox="0 0 262 330" role="img" aria-labelledby="bind-narrow-title">
<title id="bind-narrow-title">An input and the nickname state are tied both ways by bind:value. On a valid submit, the form changes the shared party in party.svelte.js. Every component that imports the party, such as the team summary, shows the change.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="4" width="190" height="56" rx="6" />
<text x="99" y="28" text-anchor="middle">Input</text>
<text class="d-muted d-code" x="99" y="48" text-anchor="middle">&lt;input&gt;</text>
<line class="d-line" x1="99" y1="62" x2="99" y2="80" marker-start="url(#arrow-narrow)" marker-end="url(#arrow-narrow)" />
<text class="d-muted d-code" x="110" y="76">bind:value</text>
<rect class="d-box" x="4" y="82" width="190" height="56" rx="6" />
<text x="99" y="106" text-anchor="middle">Form state</text>
<text class="d-muted d-code" x="99" y="126" text-anchor="middle">nickname</text>
<line class="d-line" x1="99" y1="138" x2="99" y2="158" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="110" y="153">valid submit</text>
<rect class="d-key" x="4" y="160" width="190" height="56" rx="6" />
<text x="99" y="184" text-anchor="middle">Shared state</text>
<text class="d-muted d-code" x="99" y="204" text-anchor="middle">party.svelte.js</text>
<line class="d-line" x1="99" y1="216" x2="99" y2="236" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="110" y="231">every importer</text>
<rect class="d-box" x="4" y="238" width="190" height="56" rx="6" />
<text x="99" y="262" text-anchor="middle">Summary</text>
<text class="d-muted" x="99" y="282" text-anchor="middle">shows "Sparky"</text>
</svg>
<figcaption><code>bind:value</code> keeps the box and the form's state in step while you type. Only a valid submit changes the shared party, and every component that imports it updates.</figcaption>
</figure>

## At a glance

The syntax on this page in one place.

| Syntax | Example | What it does |
| --- | --- | --- |
| `bind:value` | `<input bind:value={nickname} />` | Ties the box and the state together, both ways |
| `bind:group` | `<input type="radio" bind:group={role} value="attacker" />` | One state variable for a set of radio buttons (or checkboxes) |
| `bind:checked` | `<input type="checkbox" bind:checked={shiny} />` | Ties one checkbox to a `true`/`false` state |
| `onsubmit` | `<form onsubmit={save}>`, then `event.preventDefault();` | Runs on the button *and* Enter; stops the browser sending the form and leaving the page |
| `<label for>` | `<label for="nickname">…</label>` + `<input id="nickname">` | Names the input, stays visible while you type, and makes the label clickable |
| an error on the page from the start | `<p id="nickname-error" role="alert">{error}</p>` | Announced by a screen reader when its text fills in |
| `aria-invalid`, `aria-describedby` | `aria-invalid={error !== ''} aria-describedby="nickname-error"` | Says the field is wrong, and reads the error along with it |
| `bind:this` and `.focus()` | `<input bind:this={input}>`, then `input.focus();` | Gets the element itself, so you can send focus back to the field to fix |
| a `.svelte.js` module | `export const party = $state([…]);` | State any component can import; every importer sees the same party |
| `state_invalid_export` | `export let party = …;` then `party = [];` | Svelte refuses to build: change what's inside, don't reassign |

## Live demo

The whole class, one form: I change it on the projector, you call what happens next. The sandbox is a Svelte Playground for a digital archive's reading room. `App.svelte` has a settings form with no bindings, two boxes whose names are plain text instead of labels, and no submit handler. Below it is a sample diary page that reads the *saved* settings. `Greeting.svelte` and `settings.svelte.js` are empty. Switch files with the tabs above the editor. [Open the Svelte sandbox in the Playground](https://svelte.dev/playground/untitled#H4sIAAAAAAAAE61X247juBH9lYomgLoXutjunl6M2u1ggUkmASabxfQAeWg3FrRYsjhNkQJJ38YwsB-y-x37vp-yXxIUKUvuyyCTy5OtInnq1KlikdxHijUYFdHbv73760e4uBzBb7_C7egNWKb4Qm-jJHJMyI1QPCoqJi0mUSUk2qi420du19JiMkTJEeq7ts3sGqUj24JZfMleauVQORsV0fQPaTpXAO_FGoFjo4--odIGbv0K-ttYYIqDrZlBDtYxh3B2cTlKwKK1Qit4c57BP1pUyMHVRq-WNQhnCbtD-UGy3dLoleIghXqAM1cjrJRw0LIlQs0sCHd-DaxyaAC5cEItgakdUIggFLhaWKi05GgSAja4RIWGuBAWoRagNEco9cpYTK1wmHbR5l1gedvzSGlF1nyypH1qR28I9ANutHlADt_rNYyv4KwPEHDbohENKld4h14vYYEBF1WFBpWD1uiFxAYqoxs_6bZl5uE8o7wGzpQRWtNgs0ADuvLTWmbcDs6YAmYM253DRrgaGDjcOqgESn4d4j_mx_s1yDipZLRuYi-2RUe62QK0QtCLT1i6BAzjQsNi5ZxWNgEGZY3lw0JvE59WBmrlyTgdRjL4rm1Bb5T15CxbIz9F99Wh9OYarMMWrqDRa_RzGxDK6X5iV3TZJ5vBxzqUEpWPcTZEqDThLoSiOGwCSoNkC5TBhXAW3EbDQm_RBq5Kg10tGuGgZopLNBm8M4jkrXNG007JDhyCZ8CmdbtsrtJ0NldTWxrRuhmtEE2rjevxQhLjLH_iIL6eK5qe5_DPmrnYBoGKTqumlRhqeoFSb3ySvDYWaZVEN-h4A3_0m-lsD1QXBcQfkHE0cQJWfKZvpU3DZJyAM0wFrraA0A1gqZksYDKCw_kzTn7DBMUTWGClDSmzo7JoDVqLFm7ZuqdE7gc6cUyAHVnx-XSkIzSMnxAbpnmCwxwiOgxORke6pVY2eKC1ewjgBcRjg02cgGRmSSqMs8nrYIm3qTfG3uqNcLieq2neJ3Kupn0K8_Bdj2cfTvZKn4BpXo_DDNLJF8HUtkxBKZm1N_PIb72UxJlHs7fCUvfwWk1zmhdWCNWuXOcKYOrXWAw1BTCV1Kf47CNtZQp1mneW4zgV_KxDobZ-M4_8jp1H3tXNPKJl8wjWTK7oM8g0jyCfwff-_zQPKP81pBc1IL6nv_8zYJenAPnnrTMsZPMUeJqfaOUNL_k5NqsAdVvrja_soe6oPa8Up2ODlTXYkqnBy7_LKRNy1zdSX6dntHnt-fMMd3xCs_RsOvjQWWe0n05Kq7NSbXbVNVfTtqfRGlwL3Mwj7-KH8FXAnogd6CqwJ0UP4Qj47dcn8e5Pt92fINYqhgJiXVVxWEyhHHwf8icU2xGPNpBgxolSIli3k1hUWrmUfN14j_Zu6JziM94fggT1ZPZWMLOjE4tBrRu0zveqJDS78TSvJ2HqECOlYh7N7ui3W8gU3xjhHCq_LoHxm9HkPlAD2L8S1dC5T2I8dIXYzn7_6ee_M1PWcJHBrdIbYEsmVAZ_Ya5GAxs6hp0GpzfKHyKV1Cvjz46SetyClQ_H07USnEvMfv_pl95_LqoDKdVJFPTyOvnx_Bt4r_WDh6sQJWgldxm8k3rBZAJWB03D8YUS6bZgh9tCzayKHTDOkcMOHXCtYhdCA8OERSit_XGlVhb5jxYllk4b2DCjwvnob2GaAH3RlvVw-sE3OQEVS8_lbKH57hz2AZtSXMA4G_s2mo-z12B31mGTrkRCdwqbWjSi8g37EKr6CES12wPx0AILWBrBr4NtydoCRr4Xd5aGbdON4K4uYHJ5ND-BzYZteJ6cDviNe1dpc__E7pvmo5DSDYpl7Qr4djR6kXrXXb6G_uSE_0IbjqaASbsFq6Xg8Ori4uLRYErdb2UfBf7Eu28aj2MILeFJWoSq0QjXwbeMUyvqKcEo-_ZLHu6YESwVas2k4DexMyuM73v0YxQXQxSL0Wg0eVGqO6Ml3sRMonEnGI1Qad2JPM5en2TYLIUqYNR9l1pqUzxy8HUpyro22Hs8Il1eXr40v9uXA0FPJHW6LWA8ZPCZiuP_d3Yz6mk9jd7f-HQfUK8Jb40CXiHia35xKk1ovyAck6J80cey29zP_QRiXwqLM1sjh1dXV1f_aVxFpcuVTdfCisWJznrlpFBYwOWg2ng8vn40muqqsuh8yR2xp_mxe9J7FrcuKqhOD8kXnrBPLtuP37HPB588ZuHWP0gKYHDUDlzN3HAL7x-xxzv4UqOFGg1m4F8EX0fz-eviMdMXx0_I5nlP9WVSgdJTOveHfwEabwTKNxAAAA). It runs in your browser with nothing to install; to keep your changes, use the Playground's **Save** (it asks you to sign in with GitHub) or download the starting files: <a href="/sandbox/340-s09/App.svelte" download="App.svelte">App.svelte</a>, <a href="/sandbox/340-s09/Greeting.svelte" download="Greeting.svelte">Greeting.svelte</a>, <a href="/sandbox/340-s09/settings.svelte.js" download="settings.svelte.js">settings.svelte.js</a>.

Each step says which file, what to type, and what to look for. Two things to know first:

- **Every edit restarts the app.** The form and the saved settings go back to how they started.
- **If the result goes blank,** make any edit (even a space) and it comes back.

1. **Bind the box to the state.** Type in the Display name box: the "Preview:" line under the form stays empty, because nothing connects them. In `App.svelte`, add `bind:value={name}` to the first `<input>`:

   ```svelte
   <input bind:value={name} />
   ```

   Type again: the preview follows every key. Now the other way: change `let name = $state('');` to `$state('Ada')`. The box starts with "Ada" in it. Change it back to `''`.

2. **Radio buttons and a checkbox.** Click "Large": the preview still says "normal text", and the checkbox does nothing either. Add `bind:group={size}` to each of the three radio buttons, and `bind:checked={transcripts}` to the checkbox:

   ```svelte
   <label><input type="radio" name="size" value="normal" bind:group={size} /> Normal</label>
   <label><input type="radio" name="size" value="large" bind:group={size} /> Large</label>
   <label><input type="radio" name="size" value="x-large" bind:group={size} /> Extra large</label>
   ```

   ```svelte
   <label><input type="checkbox" bind:checked={transcripts} /> Show the transcription under each scan</label>
   ```

   "Normal" starts checked, because `size` starts as `'normal'`. Click "Large": the preview says "large text". Tick the box: "transcription on". One `bind:group` variable holds the whole set's answer, and it's the checked button's `value`. The diary page hasn't changed: it reads what's *saved*, and nothing saves yet.

3. **Labels for the two boxes.** Click the words "Display name": nothing happens. They're a `<span>`, so a screen reader reaching the box hears only "edit text". (The radio buttons and checkbox are fine: each `<input>` sits inside its `<label>`.) Replace the two `<span>`s and their boxes, giving the goal box its binding at the same time:

   ```svelte
   <label for="name">Display name</label>
   <input id="name" bind:value={name} />
   ```

   ```svelte
   <label for="goal">Daily reading goal (pages)</label>
   <input id="goal" type="number" bind:value={goal} />
   ```

   Click "Daily reading goal": the cursor jumps into its box. The preview says "20 pages a day": with `type="number"`, `bind:value` gives `goal` a number, not text.

4. **Handle the submit, and say what's wrong in words.** Press **Save settings** first: the result goes blank. The browser sent the form and left the page (make any edit to bring it back). In `App.svelte`, add this before `</script>`:

   ```js
   let error = $state('');

   function save(event) {
     event.preventDefault();
     if (!Number.isInteger(goal) || goal < 1 || goal > 200) {
       error = 'Pick a goal from 1 to 200 pages.';
     } else {
       error = '';
       settings.name = name.trim() || 'Reader';
       settings.size = size;
       settings.transcripts = transcripts;
       settings.goal = goal;
     }
   }
   ```

   Change `<form>` to `<form onsubmit={save}>`, and right after the goal `<input>`, add the error's home, empty until there's an error:

   ```svelte
   <p id="goal-error" role="alert">{error}</p>
   ```

   Type `500` in the goal box and press Enter: "Pick a goal from 1 to 200 pages." Empty the box and press Save: the same message (an empty number box binds as `null`, which isn't a whole number). Type `25`, choose "Extra large", tick the transcription, and press Save: the diary page grows, and the transcription appears.

5. **Tie the error to the box, and put focus back.** Replace the goal `<input>` line with:

   ```svelte
   <input id="goal" type="number" bind:value={goal} bind:this={goalInput}
     aria-invalid={error !== ''} aria-describedby="goal-error" />
   ```

   Add `let goalInput;` before `</script>`, and `goalInput.focus();` as the last line of the error branch in `save`. Type `500` in the goal, then click Save with the mouse (so focus leaves the box): the goal box gets a red border, the message appears, and the cursor is back in the goal box, ready to fix it. Right-click the box and choose **Inspect**: `aria-invalid="true"`, and `aria-describedby` names the message's `id`. (A screen reader reads the label, "invalid", then the message.)

6. **Share the settings with a module.** In `settings.svelte.js`, replace the comment with the saved settings, exported, plus a function that puts them back to the defaults:

   ```js
   const defaults = { name: 'Reader', size: 'normal', transcripts: false, goal: 20 };

   export let settings = $state({ ...defaults });

   export function reset() {
     settings = { ...defaults };
   }
   ```

   In `App.svelte`, delete the `let settings = $state({ … });` line and import them instead:

   ```js
   import { settings } from './settings.svelte.js';
   ```

   The result says **Error compiling settings.svelte.js**: "Cannot export state from a module if it is reassigned" (`state_invalid_export`). The module reassigns `settings` in `reset`. Delete `reset`, and change `export let` to `export const`: the app is back. Now in `Greeting.svelte`, replace the comment with:

   ```svelte
   <script>
     import { settings } from './settings.svelte.js';
   </script>

   <p class="greeting">Welcome back, {settings.name}. Today's goal: {settings.goal} pages.</p>
   ```

   A dashed greeting appears at the top: "Welcome back, Reader." Type "Ada" as the display name, set a goal of 30, and press Save: the greeting changes too. `App` and `Greeting` never pass a prop; they import the same settings object.

**On your own:** in your own Playground copy (a few minutes each):

- After a good save, show "Saved." in an element with `role="status"`, on the page from the start. Why `status` here and not `alert`?
- Make the transcription checkbox take effect the moment it's ticked, with no Save. Which line changes, and is that better or worse for this setting than for the goal?
- Add a **Typeface** choice (serif or sans-serif) as a labeled `<select>` with `bind:value`, saved like the others, and make the diary page use it.

## Links

- Svelte: [`bind:`](https://svelte.dev/docs/svelte/bind), [`$state`: passing state across modules](https://svelte.dev/docs/svelte/$state#Passing-state-across-modules), [`.svelte.js` files](https://svelte.dev/docs/svelte/svelte-js-files)
- MDN: [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label), [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid), [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby), [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role), [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- WAI: [Form validation and errors](https://www.w3.org/WAI/tutorials/forms/notifications/)
- Dig deeper: run [`/dig-deeper`](/340/skills/dig-deeper/) on the `bind:value` line when you start P4. Answer its predict question before the reveal.
