---
title: "Astro content collections"
description: "Your NOTES.md files become a content collection: a loader, a zod schema that checks every section, and a page per entry from dynamic routes."
courses: [dight340]
ready: false # true once the S11 model build passes, with the S11 brief (PLAN.md: Build order)
session: 11
date: 2026-11-30
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Astro content collections

<details>
<summary>Key takeaways</summary>

- **A collection turns a folder of files into data with rules.** A loader reads the files, a schema checks each entry, and pages are built only from entries that pass.
- **The schema is a checklist the build enforces.** A missing or empty field stops the build, and the error names the file and the field.
- **`getCollection()` gives you every entry** for an index. It promises no order, so sort it yourself.
- **One dynamic route makes every page:** `[id].astro` plus `getStaticPaths()`, run once at build time. A new file is a new page, with no page file to write.
- **Your `NOTES.md` files have no frontmatter,** so the course gives you a loader for them. Copy it as it is; your schema and pages do the rest.
- **Today's Spark puts it to work.** S11 turns your term's notes into pages on your practice site; your Final Project's milestone 3 uses the pattern twice.

</details>

## How it works

**Loader.** A loader reads files and turns each into an entry with an `id` and `data`. Astro's built-in `glob()` loader reads Markdown files with frontmatter (the Live demo uses it). Your `NOTES.md` files have no frontmatter, just five `## ` sections, so the course gives you a small loader that reads them from `sparks/` and `prototypes/` and splits each into `intent`, `aiUse`, `decisions`, `digDeeper`, and `openQuestions` (below; copy it as it is).

**Schema.** A schema says what every entry must have, written with **zod**, which Astro includes as `astro/zod`. Read it like a checklist: `z.object({ intent: z.string().min(1, 'Intent is empty') })` says "an object whose `intent` is a string with at least one character, or else say *Intent is empty*." If an entry breaks the rules, the **build stops** and names the file and the field. It's `/check`, enforced. A note whose Open questions heading has nothing under it stops the build like this:

```console
[InvalidContentEntryDataError] notes → s04-fetch-one data does not match collection schema.
  openQuestions: Open questions is empty
```

On GitHub, the **Build and deploy** run goes red, and your site is missing from that deploy until you fix the note and push again. So build before you push. And a field marked `.optional()` can never fail: a schema where everything is optional checks nothing.

**Pages.** `getCollection('notes')` gives you every entry, for an index page. A **dynamic route** is a page file whose name has brackets, like `src/pages/notes/[id].astro`: its `getStaticPaths()` returns one `{ params, props }` per entry, and Astro builds one page for each, at `/notes/s02-render-party/` and so on. `render(entry)` gives you a `<Content />` component for the entry's Markdown.

```js
// src/content.config.js
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { notesLoader } from './notes-loader.js';

const section = (name) => z.string({ error: `${name} is missing` }).min(1, `${name} is empty`);

const notes = defineCollection({
  loader: notesLoader,
  schema: z.object({
    title: z.string().min(1),
    kind: z.enum(['sparks', 'prototypes']),
    intent: section('Intent'),
    aiUse: section('AI use'),
    decisions: section('Accepted / changed / rejected'),
    digDeeper: section('Dig deeper'),
    openQuestions: section('Open questions'),
  }),
});

export const collections = { notes };
```

<details>
<summary>The course's notes loader (<code>src/notes-loader.js</code>): copy it as it is</summary>

```js
// The DIGHT 340 notes loader (S11). Copy it as it is; your schema and pages do the rest.
// It finds every NOTES.md in your repo's sparks/ and prototypes/ folders, and turns
// each into a collection entry:
//   id: the folder name, like "s02-render-party"
//   data: { title, kind, intent, aiUse, decisions, digDeeper, openQuestions }
//   the whole file, rendered, for <Content />
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const SECTIONS = {
  'Intent': 'intent',
  'AI use': 'aiUse',
  'Accepted / changed / rejected': 'decisions',
  'Dig deeper': 'digDeeper',
  'Open questions': 'openQuestions',
};

const parseNotes = (text) => {
  const data = { title: (text.match(/^# NOTES — (.+)$/m)?.[1] ?? '').trim() };
  for (const part of text.split(/^## /m).slice(1)) {
    const [heading, ...lines] = part.split('\n');
    const key = SECTIONS[heading.trim()];
    if (key) data[key] = lines.join('\n').trim();
  }
  return data;
};

// The repo root is the nearest folder above this site that has a sparks/ folder.
const findRepoRoot = async () => {
  let dir = resolve('.');
  while (!(await stat(join(dir, 'sparks')).catch(() => null))) {
    if (dirname(dir) === dir) throw new Error('No sparks/ folder found above this site.');
    dir = dirname(dir);
  }
  return dir;
};

export const notesLoader = {
  name: 'notes-loader',
  load: async ({ store, parseData, renderMarkdown }) => {
    store.clear();
    const root = await findRepoRoot();
    for (const kind of ['sparks', 'prototypes']) {
      const dir = join(root, kind);
      const folders = await readdir(dir).catch(() => []);
      for (const folder of folders) {
        const text = await readFile(join(dir, folder, 'NOTES.md'), 'utf8').catch(() => null);
        if (text === null) continue;
        // parseData checks the entry against your schema, and stops the build if it fails.
        const data = await parseData({ id: folder, data: { ...parseNotes(text), kind } });
        store.set({ id: folder, data, body: text, rendered: await renderMarkdown(text) });
      }
    }
  },
};
```

</details>

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 170" role="img" aria-labelledby="coll-wide-title">
<title id="coll-wide-title">Your NOTES.md files go into the notes loader, which splits each into five sections. The zod schema checks every entry; an empty or missing section stops the build. getCollection and getStaticPaths then make a notes index page and one page per entry.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="30" width="136" height="60" rx="6" />
<text x="72" y="56" text-anchor="middle">Files</text>
<text class="d-muted d-code" x="72" y="76" text-anchor="middle">*/NOTES.md</text>
<line class="d-line" x1="140" y1="60" x2="166" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="168" y="30" width="136" height="60" rx="6" />
<text x="236" y="56" text-anchor="middle">Loader</text>
<text class="d-muted" x="236" y="76" text-anchor="middle">five sections</text>
<line class="d-line" x1="304" y1="60" x2="330" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="332" y="30" width="136" height="60" rx="6" />
<text x="400" y="56" text-anchor="middle">Schema</text>
<text class="d-muted d-code" x="400" y="76" text-anchor="middle">z.object(…)</text>
<line class="d-line" x1="468" y1="60" x2="494" y2="60" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="496" y="30" width="136" height="60" rx="6" />
<text x="564" y="56" text-anchor="middle">Pages</text>
<text class="d-muted d-code" x="564" y="76" text-anchor="middle">[id].astro</text>
<line class="d-line" x1="400" y1="90" x2="400" y2="122" marker-end="url(#arrow-wide)" />
<text class="d-muted" x="400" y="144" text-anchor="middle">a section empty or missing: the build stops and names it</text>
</svg>
<svg class="d-narrow" viewBox="0 0 262 340" role="img" aria-labelledby="coll-narrow-title">
<title id="coll-narrow-title">Your NOTES.md files go into the notes loader, which splits each into five sections. The zod schema checks every entry; an empty or missing section stops the build. getCollection and getStaticPaths then make a notes index page and one page per entry.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<rect class="d-box" x="4" y="4" width="190" height="56" rx="6" />
<text x="99" y="28" text-anchor="middle">Files</text>
<text class="d-muted d-code" x="99" y="48" text-anchor="middle">*/NOTES.md</text>
<line class="d-line" x1="99" y1="60" x2="99" y2="80" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="82" width="190" height="56" rx="6" />
<text x="99" y="106" text-anchor="middle">Loader</text>
<text class="d-muted" x="99" y="126" text-anchor="middle">five sections</text>
<line class="d-line" x1="99" y1="138" x2="99" y2="158" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="160" width="190" height="56" rx="6" />
<text x="99" y="184" text-anchor="middle">Schema</text>
<text class="d-muted d-code" x="99" y="204" text-anchor="middle">z.object(…)</text>
<line class="d-line" x1="194" y1="188" x2="222" y2="188" marker-end="url(#arrow-narrow)" />
<text class="d-muted" x="236" y="188" text-anchor="middle" transform="rotate(90 236 188)">stops the build</text>
<line class="d-line" x1="99" y1="216" x2="99" y2="236" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="238" width="190" height="56" rx="6" />
<text x="99" y="262" text-anchor="middle">Pages</text>
<text class="d-muted d-code" x="99" y="282" text-anchor="middle">[id].astro</text>
</svg>
<figcaption>The loader turns files into entries; the schema decides which entries are allowed; the pages are built only from entries that passed. A <code>NOTES.md</code> with a hole in it never reaches the site.</figcaption>
</figure>

## At a glance

The syntax on this page in one place.

| Syntax | Example | What it does |
| --- | --- | --- |
| `src/content.config.js` | `export const collections = { berries };` | Where every collection is defined; Astro reads it when the site builds |
| `defineCollection()` | `defineCollection({ loader, schema })` | One collection: where its entries come from and what each must have |
| `glob()` loader | `glob({ pattern: '*.md', base: './src/content/berries' })` | Reads Markdown files with frontmatter; each file's name is its `id` |
| A custom loader | `loader: notesLoader` | Any object with a `load()` function; the course's reads your `NOTES.md` sections |
| `z.object({…})` | `z.object({ name: z.string().min(1) })` | The schema: every field each entry must have |
| `.min(1, 'message')` | `z.string().min(1, 'Intent is empty')` | Refuses an empty string, with your message in the build error |
| `z.enum([…])` | `z.enum(['spicy', 'dry', 'sweet', 'bitter', 'sour'])` | Only one of these values is allowed |
| `getCollection()` | `await getCollection('berries')` | Every entry that passed the schema, in no promised order |
| `.sort()` + `localeCompare()` | `.sort((a, b) => a.data.name.localeCompare(b.data.name))` | Puts the entries in the order you choose |
| `entry.id`, `entry.data` | `berry.id` is `pecha`; `berry.data.flavor` is `sweet` | The entry's name (and its URL), and its checked fields |
| `[id].astro` + `getStaticPaths()` | `return berries.map((berry) => ({ params: { id: berry.id }, props: { berry } }));` | One page per entry, built once when the site builds |
| `render()` + `<Content />` | `const { Content } = await render(berry);` | The entry's Markdown, as a component you place in the page |

## Live demo

The whole class, one site: we step through it on the projector, and you call each change before it appears. It's the Berry guide from the S10 demo, now with a grower's note on each berry: when to carry it. Right now each berry's page is written by hand, the list of berries is typed in, and one page has already lost its flavor line without anyone noticing. Each preview is that step's site, built once. The two slides where the build fails on purpose have no preview.

<div data-slides="340-s11"><p>The slides need JavaScript. Every step is in the demo script below.</p></div>

<details>
<summary>Demo script</summary>

Each step says which file changes and what to look for in the preview.

1. **A page by hand for every berry.** `src/pages/berries/cheri.astro`, `pecha.astro`, and `rawst.astro` are copies of each other with different words, and `src/pages/berries/index.astro` lists them by hand. Pecha's page says "Cures: poison" and no flavor.

2. **The berry as data.** Each berry becomes a Markdown file in `src/content/berries/`, with its facts in frontmatter and the grower's note below:

   ```markdown
   ---
   name: Cheri Berry
   flavor: spicy
   cures: paralysis
   ---
   Carry one through any route with Electric types. It works the moment your Pokémon is paralyzed, so you don't spend a turn in the bag.
   ```

   The preview hasn't changed: nothing reads these files yet. Pecha's file has `name` and `cures`, and no `flavor`.

3. **A collection with a schema.** Add `src/content.config.js`:

   ```js
   import { defineCollection } from 'astro:content';
   import { glob } from 'astro/loaders';
   import { z } from 'astro/zod';

   const berries = defineCollection({
     loader: glob({ pattern: '*.md', base: './src/content/berries' }),
     schema: z.object({
       name: z.string().min(1),
       flavor: z.enum(['spicy', 'dry', 'sweet', 'bitter', 'sour']),
       cures: z.string().min(1),
     }),
   });

   export const collections = { berries };
   ```

   Build, and it stops:

   ```console
   [InvalidContentEntryDataError] berries → pecha data does not match collection schema.
     flavor: Invalid option: expected one of "spicy"|"dry"|"sweet"|"bitter"|"sour"
   ```

   The hole the hand pages hid is now an error with a file name. (zod's own message says "Invalid option" for a missing field; a message of your own, like S11's, would say what's wrong.)

4. **Fix the data, then list it.** Add `flavor: sweet` to `pecha.md`, and the build passes. Then the list comes from the collection:

   ```astro
   ---
   import { getCollection } from 'astro:content';
   import Base from '../../layouts/Base.astro';
   import { url } from '../../lib/url.js';

   const berries = (await getCollection('berries'))
     .sort((a, b) => a.data.name.localeCompare(b.data.name));
   ---
   <Base title="Berries">
     <h1>Berries</h1>
     <ul>
       {berries.map((berry) => (
         <li><a href={url(`berries/${berry.id}/`)}>{berry.data.name}</a></li>
       ))}
     </ul>
   </Base>
   ```

   The list is now in alphabetical order. Pecha's hand page still has no flavor: the pages don't read the collection yet.

5. **One file makes every page.** Delete the three hand pages and add `src/pages/berries/[id].astro`:

   ```astro
   ---
   import { getCollection, render } from 'astro:content';
   import Base from '../../layouts/Base.astro';

   export async function getStaticPaths() {
     const berries = await getCollection('berries');
     return berries.map((berry) => ({ params: { id: berry.id }, props: { berry } }));
   }

   const { berry } = Astro.props;
   const { Content } = await render(berry);
   ---
   <Base title={berry.data.name}>
     <h1>{berry.data.name}</h1>
     <p>Flavor: {berry.data.flavor} · Cures: {berry.data.cures}</p>
     <Content />
   </Base>
   ```

   Pecha's page now shows "Flavor: sweet", from the same line as every other berry's.

6. **A new berry is a new file.** Add `src/content/berries/aspear.md` (sour, cures freeze) and build. Aspear is first in the list, with [its own page](/sandbox/340-s11/slides/preview/05/berries/aspear/), and no page file changed.

</details>

**On your own:** in your own practice site, after S11 (a few minutes each):

- Add a field no note has to your schema (say `mood: z.string()`) and build. What does the error say? Now make it `.optional()` and build again. What does that tell you about `.optional()`? Take it out.
- Put `console.log(Astro.params)` in `[id].astro`'s frontmatter and run `npm run build`. When does it print, how many times, and does it ever print in the browser?
- Copy one Spark folder under a new name, like `sparks/s99-copy/`, and build. What's its URL, and where did that name come from? Delete the copy.

## Links

- Astro: [Content collections](https://docs.astro.build/en/guides/content-collections/), [Content loader reference](https://docs.astro.build/en/reference/content-loader-reference/) (`glob()`, and the object loader the course's `notesLoader` is), [Dynamic routes](https://docs.astro.build/en/guides/routing/#dynamic-routes), [`getStaticPaths()`](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
- zod: [Defining schemas](https://zod.dev/api) (strings, objects, enums, and custom error messages)
- MDN: [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [`String.prototype.localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- Dig deeper: run [`/dig-deeper`](/340/skills/dig-deeper/) on `getStaticPaths` in your practice site's `[id].astro`. Answer its predict question before the reveal.
