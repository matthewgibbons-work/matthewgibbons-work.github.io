<!--
  Live demo sandbox for Svelte components and props (340, session 8). Opened through its
  Svelte Playground link (the unit page has it); after editing any file in this folder,
  regenerate the link: node course-site-content/sandbox/playground-link.mjs 340-s08
  App owns the party. PartyMember.svelte and Panel.svelte start empty; the demo fills them.
-->
<script>
  import PartyMember from './PartyMember.svelte';
  import Panel from './Panel.svelte';

  let party = $state([
    { id: 25, name: 'pikachu', level: 12 },
    { id: 133, name: 'eevee', level: 8 },
    { id: 143, name: 'snorlax', level: 30 },
  ]);

  let totalLevel = $derived(party.reduce((sum, p) => sum + p.level, 0));

  // Only App changes the party. Children call these through callback props.
  function remove(id) {
    party = party.filter((p) => p.id !== id);
  }

  function levelUp(id) {
    party.find((p) => p.id === id).level++;
  }
</script>

<h1>Trainer page</h1>

<p>Total level: {totalLevel}</p>

<ul>
  {#each party as pokemon (pokemon.id)}
    <li>{pokemon.name} · level {pokemon.level}</li>
  {/each}
</ul>

<style>
  /* Look and feel only. Global, so styles for rows and buttons the demo hasn't added yet
     don't raise css_unused_selector warnings, and so they reach the child components. */
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

  :global(section) {
    padding: 0.25rem 1rem;
    border: 2px dashed #666;
    border-radius: 0.5rem;
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
