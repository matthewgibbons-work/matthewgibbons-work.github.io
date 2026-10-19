import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Markdown pages, synced from dight-refactor/course-site-content/ (npm run sync).
// The id is the path without .md: 'spark-0-250', 'units/250-color',
// 'sparks/250-s02', 'prototypes/250-p1'. The folder says what kind of page it is.
// A page goes live only when it's `ready` and its date has arrived (`date` for
// units and Sparks, `released` for Prototypes); see src/lib/published.ts.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      courses: z.array(z.enum(['dight250', 'dight340'])).min(1),
      /** Set once the dry run passes. Missing means draft, so nothing leaks by accident. */
      ready: z.boolean().default(false),
      tier: z.enum(['spark', 'prototype', 'release']).optional(),
      /** Joins a unit page to its Spark. */
      session: z.number().int().min(1).optional(),
      /** Joins a unit page to the Prototype it feeds. */
      prototype: z.string().regex(/^P\d$/).optional(),
      date: z.coerce.date().optional(),
      released: z.coerce.date().optional(),
      due: z.coerce.date().optional(),
      folder: z.string().optional(),
    })
    .refine((page) => !page.ready || page.date || page.released, {
      message: 'A ready page needs a `date` or `released` to go live on.',
    }),
});

// Copy-paste prompt texts, synced from dight-refactor/starter-kits/dist/copy-paste/.
// No frontmatter: each page shows the file's raw text exactly as tested.
const prompts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/prompts' }),
});

// The NOTES.md template, synced from dight-refactor/starter-kits/src/templates/.
// Shown raw, like the prompts.
const templates = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/templates' }),
});

// Topics this term, one file per course (id '250' or '340'), synced from
// dight-refactor/course-site-content/topics-NNN.yml. In teaching order, with no
// dates on purpose, so units can shift without an edit.
const topics = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/topics' }),
  schema: z.array(
    z.object({
      name: z.string(),
      summary: z.string(),
      tier: z.enum(['spark', 'prototype', 'release']).optional(),
      prototype: z.string().regex(/^P\d$/).optional(),
      /** Slug of this topic's unit page (units/NNN-<slug>.md); linked once it's published. */
      unit: z.string().regex(/^[a-z0-9-]+$/).optional(),
    }),
  ),
});

export const collections = { pages, prompts, templates, topics };
