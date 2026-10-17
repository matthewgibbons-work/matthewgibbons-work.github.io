import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Markdown pages, synced from dight-refactor/course-site-content/ (npm run sync).
// The schema follows the frontmatter already in use there; fields only the
// Spark and Prototype briefs use are optional, so those can join later unchanged.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    courses: z.array(z.enum(['dight250', 'dight340'])).min(1),
    tier: z.enum(['spark', 'prototype', 'release']).optional(),
    session: z.number().int().min(1).optional(),
    date: z.coerce.date().optional(),
    released: z.coerce.date().optional(),
    due: z.coerce.date().optional(),
    folder: z.string().optional(),
  }),
});

// Copy-paste prompt texts, synced from dight-refactor/starter-kits/dist/copy-paste/.
// No frontmatter: each page shows the file's raw text exactly as tested.
const prompts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/prompts' }),
});

export const collections = { pages, prompts };
