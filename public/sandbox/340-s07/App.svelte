<!--
  Live demo sandbox for Svelte logic and events (340, session 7). Experiment 2 in PLAN.md,
  "Experiments". Opened through its Svelte Playground link (the unit page has it); after
  editing this file, regenerate the link: node course-site-content/sandbox/playground-link.mjs
  The script is ready; the demo steps go in the two marked places in the markup.
-->
<script>
  let party = $state([
    { id: 25, name: 'pikachu' },
    { id: 133, name: 'eevee' },
    { id: 143, name: 'snorlax' },
  ]);

  function remove(pokemon) {
    party = party.filter((p) => p !== pokemon);
  }

  // One lookup: a Promise, held in $state so assigning a new one fetches again.
  async function lookUp(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error(`No Pokémon called "${name}".`);
    return response.json();
  }

  let request = $state(lookUp('ditto'));
</script>

<h1>My party</h1>

<ul>
  <!-- Steps 1–4: the party goes here -->
</ul>

<h2>Look one up</h2>

<!-- Steps 5–7: the lookup goes here -->

<style>
  /* Look and feel only. Global, so styles for rows and buttons you haven't added yet
     don't raise css_unused_selector warnings. */
  :global(body) {
    font: 1.125rem/1.5 system-ui, sans-serif;
  }

  :global(ul) {
    padding: 0;
    list-style: none;
  }

  :global(li) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-block: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 2px solid #333;
    border-radius: 0.5rem;
    text-transform: capitalize;
  }

  :global(button) {
    font: inherit;
    padding: 0.25rem 0.75rem;
  }

  :global(:focus-visible) {
    outline: 4px solid #111;
    outline-offset: 3px;
  }
</style>
