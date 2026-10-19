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
  // Prompts became skills (Oct 19): /prompts/ URLs move to /skills/. The Start prompt
  // lives only on Spark 0 now, so its old URLs go there.
  redirects: {
    '/prompts': '/skills/',
    '/prompts/dig-deeper': '/skills/dig-deeper/',
    '/prompts/check': '/skills/check/',
    '/prompts/start-250': '/250/spark-0/',
    '/prompts/start-340': '/340/spark-0/',
    '/250/prompts': '/250/skills/',
    '/250/prompts/start': '/250/spark-0/',
    '/250/prompts/dig-deeper': '/250/skills/dig-deeper/',
    '/250/prompts/check': '/250/skills/check/',
    '/340/prompts': '/340/skills/',
    '/340/prompts/start': '/340/spark-0/',
    '/340/prompts/dig-deeper': '/340/skills/dig-deeper/',
    '/340/prompts/check': '/340/skills/check/',
  },
});
