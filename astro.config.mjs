// @ts-check
import { defineConfig } from 'astro/config';

// User site: served from the root, so no `base`.
// Root-relative links (/downloads/…, /prompts/…) work as written.
export default defineConfig({
  site: 'https://matthewgibbons-work.github.io',
  // The Spark 0 guide links /prompts/check without a slash; Pages serves both forms.
  trailingSlash: 'ignore',
  // No Shiki: code blocks use the site's own contrast-checked colours.
  markdown: { syntaxHighlight: false },
});
