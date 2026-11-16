<!--
  Live demo sandbox for Svelte forms and shared state (340, session 9). Opened through its
  Svelte Playground link (the unit page has it); after editing any file in this folder,
  regenerate the link: node course-site-content/sandbox/playground-link.mjs 340-s09
  App owns the party for now; step 5 moves it into party.svelte.js. The form starts with
  no binding, no label, and no submit handler; the demo adds them. TeamSummary.svelte and
  party.svelte.js start empty.
-->
<script>
  import TeamSummary from './TeamSummary.svelte';

  let party = $state([
    { id: 25, name: 'pikachu', nickname: '' },
    { id: 133, name: 'eevee', nickname: '' },
    { id: 143, name: 'snorlax', nickname: '' },
  ]);

  let nickname = $state('');
</script>

<h1>Trainer page</h1>

<ul>
  {#each party as pokemon (pokemon.id)}
    <li>{pokemon.name}{pokemon.nickname ? ` · “${pokemon.nickname}”` : ''}</li>
  {/each}
</ul>

<form>
  <input placeholder="Nickname for Pikachu" />
  <button>Save nickname</button>
  <p>Preview: {nickname}</p>
</form>

<TeamSummary />

<style>
  /* Look and feel only. Global, so styles for elements the demo hasn't added yet don't
     raise css_unused_selector warnings, and so they reach TeamSummary. */
  :global(body) {
    font: 1.125rem/1.5 system-ui, sans-serif;
  }

  :global(ul) {
    padding: 0;
    list-style: none;
  }

  :global(li) {
    margin-block: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 2px solid #333;
    border-radius: 0.5rem;
  }

  :global(form) {
    display: grid;
    gap: 0.5rem;
    max-width: 24rem;
  }

  :global(label) {
    font-weight: 700;
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

  :global(aside) {
    margin-top: 1.5rem;
    padding: 0.25rem 1rem;
    border: 2px dashed #666;
    border-radius: 0.5rem;
  }

  :global(:focus-visible) {
    outline: 4px solid #111;
    outline-offset: 3px;
  }
</style>
