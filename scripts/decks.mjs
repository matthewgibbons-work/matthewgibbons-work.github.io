// Code slides (session 10 experiment 1, Nov 18): turns each Live demo sandbox's
// slides/deck.yml into slides/slides.json, which CodeSlides.astro plays in the unit page.
//
// A deck lists steps. Each step names a folder under slides/steps/ (the whole page or app as it
// stands after that demo step), a file in it, and a region: the lines between a
// `slide:<region>` marker line and a `/slide:<region>` marker line (any comment syntax). Only
// that region is shown on the slide; marker lines are dropped. Shiki highlights it here, at
// sync time, with a theme whose colours are CSS variables (set in global.css from the site's
// own contrast-checked palette), so the browser never loads Shiki, only the magic-move renderer.
//
// Previews: a 250 step folder is its own page (steps/NN/<file>). A 340 step is built once in
// prep by dight-refactor/tools/slides (`npm run previews -- 340-sNN`) into slides/preview/NN/.
// `preview: false` on a step (a compile error shown on purpose) means no preview. `show: <selector>`
// scrolls the preview to the part the step changes. `page:` previews another page in the step
// (250: a file in the folder; 340: a path under the built preview, such as berries/index.html).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHighlighter, createCssVariablesTheme } from 'shiki';
import { codeToKeyedTokens } from '@shikijs/magic-move/core';
import { parse } from 'yaml';

const theme = createCssVariablesTheme({ name: 'site', variablePrefix: '--code-', fontStyle: true });
let highlighter;

function region(text, name, where) {
  const lines = text.split('\n');
  const start = lines.findIndex((l) => new RegExp(`(^|[^/])slide:${name}\\b`).test(l));
  const end = lines.findIndex((l, i) => i > start && l.includes(`/slide:${name}`));
  if (start < 0 || end < 0) throw new Error(`${where}: no slide:${name} … /slide:${name} markers`);
  const body = lines.slice(start + 1, end).filter((l) => !/\/?slide:[\w-]+/.test(l));
  const indent = Math.min(...body.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return body.map((l) => l.slice(indent)).join('\n');
}

function firstChange(before, after) {
  if (before === undefined) return 0;
  const a = before.split('\n');
  const b = after.split('\n');
  const i = b.findIndex((line, n) => line !== a[n]);
  return i < 0 ? 0 : i;
}

export async function buildDecks(sandboxRoot) {
  let entries;
  try {
    entries = await readdir(sandboxRoot, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries.filter((e) => e.isDirectory())) {
    const slides = path.join(sandboxRoot, entry.name, 'slides');
    let deck;
    try {
      deck = parse(await readFile(path.join(slides, 'deck.yml'), 'utf8'));
    } catch {
      continue;
    }
    highlighter ??= await createHighlighter({ themes: [theme], langs: ['html', 'css', 'javascript', 'svelte', 'astro', 'markdown'] });
    const course = entry.name.split('-')[0];
    const previous = new Map();
    const steps = [];
    for (const s of deck.steps) {
      const step = String(s.step).padStart(2, '0');
      const where = `sandbox/${entry.name}/slides/steps/${step}/${s.file}`;
      const code = region(await readFile(path.join(slides, 'steps', step, s.file), 'utf8'), s.region, where);
      const preview =
        s.preview === false
          ? null
          : course === '250'
            ? `steps/${step}/${s.page ?? s.file}`
            : `preview/${step}/${s.page ?? 'index.html'}`;
      steps.push({
        title: s.title,
        look: s.look,
        file: s.file,
        region: s.region,
        preview,
        show: s.show ?? null,
        focus: firstChange(previous.get(`${s.file}#${s.region}`), code),
        tokens: codeToKeyedTokens(highlighter, code, { lang: s.lang, theme: 'site' }, false),
      });
      previous.set(`${s.file}#${s.region}`, code);
    }
    await writeFile(path.join(slides, 'slides.json'), JSON.stringify({ title: deck.title, steps }));
    console.log(`  slides: ${entry.name} (${steps.length} steps)`);
  }
}
