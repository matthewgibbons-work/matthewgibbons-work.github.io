// @ts-check
import { defineConfig } from 'astro/config';

// User site: served from the root, so no `base`.
// Root-relative links (/downloads/…, /prompts/…) work as written.
export default defineConfig({
  site: 'https://matthewgibbons-work.github.io',
  trailingSlash: 'always',
});
