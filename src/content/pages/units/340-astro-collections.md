---
title: "Astro content collections"
description: "Your NOTES.md files become a content collection: a loader, a zod schema that checks every section, and a page per entry from dynamic routes."
courses: [dight340]
ready: false # true once the S11 dry run passes, with the S11 brief (PLAN.md: Build order)
session: 11
date: 2026-11-30
---

# Astro content collections

**The big idea:** a folder of files becomes data with rules. A collection loads your `NOTES.md` files, a schema refuses one with a section missing, and one dynamic route makes a page for each.

## In short

A content collection turns a folder of files into data with rules: a **loader** reads the files, a **schema** stops the build if one breaks the rules, and a **dynamic route** makes a page for each entry. For S11 you need the course's notes loader (copy it from below), a zod schema that requires all five `NOTES.md` sections, a notes index, and a page for each note in your Final Project, and every old note fixed until the build passes.

## How it works

**Loader.** Astro's built-in `glob()` loader reads Markdown files with frontmatter. Your `NOTES.md` files have no frontmatter, just five `## ` sections, so the course gives you a small loader that reads them from `sparks/` and `prototypes/` and splits each into `intent`, `aiUse`, `decisions`, `digDeeper`, and `openQuestions` (below; copy it as it is).

**Schema.** A schema says what every entry must have, written with **zod**, which Astro includes as `astro/zod`. Read it like a checklist: `z.object({ intent: z.string().min(1, 'Intent is empty') })` says "an object whose `intent` is a string with at least one character, or else say *Intent is empty*." If an entry breaks the rules, the **build stops** and names the file and the field. It's `/check`, enforced.

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

## Predict, then reveal

<details>
<summary>Your S04 <code>NOTES.md</code> has the <code>## Open questions</code> heading but nothing under it. You run <code>npm run build</code> in <code>final-project/</code>. What happens?</summary>

The build stops before any page is made:

```text
[InvalidContentEntryDataError] notes → s04-fetch-one data does not match collection schema.
  openQuestions: Open questions is empty
```

The schema's `.min(1, 'Open questions is empty')` caught it, and the message names the entry (the folder) and the field. Delete the heading entirely and it says `Dig deeper is missing` instead (or whichever section went). On GitHub, the **Build and deploy** run goes red, and your Final Project is missing from that deploy until you fix the note and push again. So build before you push.

</details>

<details>
<summary>Claude's schema marks every section <code>.optional()</code>. You empty your S04 note's Open questions and build. What happens, and is that good?</summary>

The build passes, and the note page goes live with an empty section. A schema where everything is optional can never fail, so it isn't checking anything: it's the same as a test that can't go red. Each section should be a required string with `.min(1, …)`, and you should break one note on purpose once to see the build stop.

</details>

## Try it together

Pair programming, with the whole class. I drive Claude Code on the projector; you navigate. After each step you read the output with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S11.

We start from a copy of `final-project/` in `try/s11/` (without `node_modules`; then `npm install` there), in plan mode, and paste the loader in from this page before approving the plan:

```text
In try/s11/, add a notes collection. I'll paste the course's notes loader into src/notes-loader.js myself. Write src/content.config.js with a zod schema that requires all five NOTES.md sections, a notes index page that lists every note by title, and a page for each note at notes/<id>/. Use the layout and the url() helper.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Build it.** `npm run build` in `try/s11/`. How many notes pages did it make? Is every Spark there?
- **Break a note.** Empty one section of a real `NOTES.md` and build again. Which file, which field? Undo it.
- **Read the schema aloud** like a checklist, one line each.
- **Follow the links.** In `npm run preview`, open the index and every note. Do the links use `url()`? Are notes in a sensible order?

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on `getStaticPaths` in `[id].astro`. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, copy your `final-project/` to `try/s11/`, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S11, out loud or to Claude:

- Which line of the schema would stop a note with an empty section? Can any section be left out?
- How many pages does `getStaticPaths` make, and when does it run?
- What order does the index list the notes in, and which line decides it?
- Does every note link go through `url()`?
- How many `<h1>`s does a note page have?

**Watch for:** the built-in `glob()` loader, with an offer to add frontmatter to every `NOTES.md` (the course loader exists so you don't); every section `.optional()`, so the schema can't fail; `getCollection()` unsorted; note links without the base, or `[id].astro` with no `getStaticPaths`; `<Content />` inside an extra `<h1>`.

</details>

## Links

- Astro: [Content collections](https://docs.astro.build/en/guides/content-collections/), [Content loader reference](https://docs.astro.build/en/reference/content-loader-reference/) (the object loader the course's `notesLoader` is), [Dynamic routes](https://docs.astro.build/en/guides/routing/#dynamic-routes), [`getStaticPaths()`](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
- zod: [Defining schemas](https://zod.dev/api) (strings, objects, enums, and custom error messages)
- MDN: [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [`String.prototype.localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
