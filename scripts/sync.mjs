// Copies course content from dight-refactor/ into this site, so nothing is edited twice.
// Edit the source in dight-refactor/ only, run its starter-kits/build.sh, then `npm run sync`.
//
//   course-site-content/spark-0.md     → src/content/pages/spark-0.md
//   starter-kits/dist/*.zip            → public/downloads/
//   starter-kits/dist/copy-paste/*.md  → src/content/prompts/
//
// Source folder: ../dight-refactor next to this repo, or set DIGHT_REFACTOR=/path/to/it.

import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.env.DIGHT_REFACTOR ?? path.join(site, '../dight-refactor'));

const pages = ['spark-0.md'];

async function exists(p) {
  return stat(p).then(() => true, () => false);
}

async function listFiles(dir, ext) {
  const names = await readdir(dir);
  return names.filter((n) => n.endsWith(ext)).sort();
}

// Wipe a folder this script owns, so files removed at the source disappear here too.
async function fresh(dir) {
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
}

async function copyAll(fromDir, names, toDir) {
  for (const name of names) {
    await cp(path.join(fromDir, name), path.join(toDir, name));
    console.log(`  ${path.relative(source, path.join(fromDir, name))} → ${path.relative(site, path.join(toDir, name))}`);
  }
}

if (!(await exists(path.join(source, 'PLAN.md')))) {
  console.error(`Can't find dight-refactor at ${source}. Set DIGHT_REFACTOR=/path/to/dight-refactor.`);
  process.exit(1);
}

console.log(`Syncing from ${source}`);

// Pages: copied one by one, because src/content/pages/ may also hold pages written here.
const pagesFrom = path.join(source, 'course-site-content');
const pagesTo = path.join(site, 'src/content/pages');
await mkdir(pagesTo, { recursive: true });
await copyAll(pagesFrom, pages, pagesTo);

// Downloads and prompts: owned by this script, so replaced wholesale.
const dist = path.join(source, 'starter-kits/dist');

const downloadsTo = path.join(site, 'public/downloads');
await fresh(downloadsTo);
await copyAll(dist, await listFiles(dist, '.zip'), downloadsTo);

const promptsFrom = path.join(dist, 'copy-paste');
const promptsTo = path.join(site, 'src/content/prompts');
await fresh(promptsTo);
await copyAll(promptsFrom, await listFiles(promptsFrom, '.md'), promptsTo);

console.log('Done. Review with `git status`, then build and commit.');
