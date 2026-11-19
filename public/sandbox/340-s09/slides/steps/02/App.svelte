<!--
  Code slides step for Svelte forms (session 10 experiment 1: the whole app after one demo
  step; tools/slides builds its preview). Copied from the live demo sandbox for Svelte forms and shared state (340, session 9). Opened through its
  Svelte Playground link (the unit page has it); after editing any file in this folder,
  regenerate the link: node course-site-content/sandbox/playground-link.mjs 340-s09
  Reworked Nov 16 (session 9 experiment: the demo is a different problem from the Spark). S09
  renames a member of the party (an array) with a text field; this sandbox is a reading room's
  settings: one object, radio buttons, a checkbox, and a number to check. App owns the saved
  settings for now; step 6 moves them into settings.svelte.js. The form starts with no
  bindings, no labels for its two boxes, and no submit handler. Greeting.svelte and
  settings.svelte.js start empty.
-->
<script>
  // slide:script
  import Greeting from './Greeting.svelte';

  // What's saved: the sample page below reads these
  let settings = $state({ name: 'Reader', size: 'normal', transcripts: false, goal: 20 });

  // What's in the form, before anyone presses Save
  let name = $state('');
  let size = $state('normal');
  let transcripts = $state(false);
  let goal = $state(20);

  const sizes = { normal: '1rem', large: '1.25rem', 'x-large': '1.5rem' };
  // /slide:script
</script>

<Greeting />

<h1>Reading room settings</h1>

<!-- slide:form -->
<form>
  <span class="field-name">Display name</span>
  <input bind:value={name} />

  <fieldset>
    <legend>Text size</legend>
    <label><input type="radio" name="size" value="normal" bind:group={size} /> Normal</label>
    <label><input type="radio" name="size" value="large" bind:group={size} /> Large</label>
    <label><input type="radio" name="size" value="x-large" bind:group={size} /> Extra large</label>
  </fieldset>

  <label><input type="checkbox" bind:checked={transcripts} /> Show the transcription under each scan</label>

  <span class="field-name">Daily reading goal (pages)</span>
  <input type="number" />

  <button>Save settings</button>
</form>
<!-- /slide:form -->

<p class="preview">
  Preview: {name} · {size} text · transcription {transcripts ? 'on' : 'off'} · {goal} pages a day
</p>

<article style:font-size={sizes[settings.size]}>
  <h2>Diary of a homesteader, page 1</h2>
  <p class="scan">[scan of a handwritten page, 1902]</p>
  {#if settings.transcripts}
    <p>“March 3. Snow again. Father went to town for flour and came back with a fiddle.”</p>
  {/if}
</article>

<style>
  /* Look and feel only. Global, so styles for elements the demo hasn't added yet don't
     raise css_unused_selector warnings, and so they reach Greeting. */
  :global(body) {
    font: 1.125rem/1.5 system-ui, sans-serif;
  }

  :global(form) {
    display: grid;
    gap: 0.5rem;
    max-width: 24rem;
  }

  :global(.field-name),
  :global(label[for]),
  :global(legend) {
    font-weight: 700;
  }

  :global(fieldset) {
    display: grid;
    gap: 0.25rem;
    border: 2px solid #333;
    border-radius: 0.5rem;
  }

  :global(input),
  :global(button) {
    font: inherit;
    padding: 0.25rem 0.75rem;
  }

  :global([aria-invalid='true']) {
    border: 3px solid #b00020;
  }

  :global([role='alert']) {
    min-height: 1.5em;
    margin: 0;
    color: #b00020;
    font-weight: 700;
  }

  :global(.preview) {
    color: #444;
  }

  :global(article) {
    margin-top: 1rem;
    padding: 0.25rem 1rem;
    border: 2px solid #333;
    border-radius: 0.5rem;
  }

  :global(.scan) {
    padding: 1.5rem;
    background: #eee5d3;
    font-style: italic;
  }

  :global(.greeting) {
    padding: 0.5rem 1rem;
    border: 2px dashed #666;
    border-radius: 0.5rem;
  }

  :global(:focus-visible) {
    outline: 4px solid #111;
    outline-offset: 3px;
  }
</style>
