// @ts-check
import { defineConfig } from 'astro/config';

// User site: served from the root, so no `base`.
// Root-relative links (/downloads/…, /250/…) work as written.
export default defineConfig({
  site: 'https://matthewgibbons-work.github.io',
  // Links with or without a trailing slash both work; Pages serves both forms.
  trailingSlash: 'ignore',
  // No Shiki: code blocks use the site's own contrast-checked colours.
  markdown: { syntaxHighlight: false },
  // Keep source whitespace: compression drops the space before an inline tag
  // that starts a new line ("Write it\n<em>before</em>" → "Write it<em>before</em>").
  compressHTML: false,
  // The Start prompts moved under each course (site v2, Oct 17). No choice to make, so redirect.
  redirects: {
    '/prompts/start-250': '/250/prompts/start/',
    '/prompts/start-340': '/340/prompts/start/',
  },
});
