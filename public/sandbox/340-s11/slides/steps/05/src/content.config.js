// slide:file
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
// /slide:file
