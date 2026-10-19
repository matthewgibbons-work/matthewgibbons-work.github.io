// Copies course content from dight-refactor/ into this site, so nothing is edited twice.
// Edit the source in dight-refactor/ only, run its starter-kits/build.sh, then `npm run sync`.
//
//   course-site-content/*.md           → src/content/pages/<name>-250.md and <name>-340.md (split)
//   course-site-content/units/, sparks/, prototypes/ NNN-<slug>.md
//                                      → src/content/pages/<same folder>/NNN-<slug>.md (one course each)
//   course-site-content/topics-NNN.yml → src/content/topics/NNN.yml
//   starter-kits/dist/*.zip            → public/downloads/
//   starter-kits/dist/copy-paste/*.md  → src/content/prompts/
//   starter-kits/src/templates/NOTES.md → src/content/templates/NOTES.md
//
// Source folder: ../dight-refactor next to this repo, or set DIGHT_REFACTOR=/path/to/it.
//
// Every page is copied, drafts included: the build decides what's live (`ready` plus its
// date; see src/lib/published.ts). The explicit coursePages list is gone (Oct 19).

import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.env.DIGHT_REFACTOR ?? path.join(site, '../dight-refactor'));

const courses = ['250', '340'];

// Shared pages (the .md files at the top of course-site-content/) are split into one copy
// per course (site v2, Oct 17). In the source:
//   <!-- 250 --> … <!-- /250 -->  (own lines) kept only on the 250 page; the same for 340
//   {{course}}                    becomes 250 or 340
//   <!-- prompt:start -->         left in; the page swaps in that course's Start prompt
// The leading HTML comment (notes for editors) is dropped, and `courses:` is set to one course.
// Single-course pages (Oct 19) live in these folders, named 250-<slug>.md or 340-<slug>.md.
// They get the same treatment for their own course, so {{course}} works in them too.
const courseFolders = ['units', 'sparks', 'prototypes'];

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

// Keeps one course's blocks, drops the other's and the marker lines.
function forCourse(text, course) {
  const out = [];
  let skip = false;
  for (const line of text.split('\n')) {
    const open = line.match(/^<!-- (250|340) -->$/);
    if (open) { skip = open[1] !== course; continue; }
    if (/^<!-- \/(250|340) -->$/.test(line)) { skip = false; continue; }
    if (!skip) out.push(line);
  }
  return out
    .join('\n')
    .replace(/^(---\n[\s\S]*?\n---\n)\n*<!--[\s\S]*?-->\n/, '$1')
    .replace(/^courses: .*$/m, `courses: [dight${course}]`)
    .replaceAll('{{course}}', course);
}

// Shared pages: written one by one, because src/content/pages/ also holds the folders below.
const pagesFrom = path.join(source, 'course-site-content');
const pagesTo = path.join(site, 'src/content/pages');
await mkdir(pagesTo, { recursive: true });
for (const name of await listFiles(pagesFrom, '.md')) {
  const text = await readFile(path.join(pagesFrom, name), 'utf8');
  for (const course of courses) {
    const out = name.replace(/\.md$/, `-${course}.md`);
    await writeFile(path.join(pagesTo, out), forCourse(text, course));
    console.log(`  ${path.relative(source, path.join(pagesFrom, name))} → ${path.relative(site, path.join(pagesTo, out))}`);
  }
}

// Single-course pages: each folder is owned by this script, so replaced wholesale.
for (const folder of courseFolders) {
  const from = path.join(pagesFrom, folder);
  const to = path.join(pagesTo, folder);
  await fresh(to);
  if (!(await exists(from))) continue;
  for (const name of await listFiles(from, '.md')) {
    const match = name.match(/^(250|340)-[a-z0-9-]+\.md$/);
    if (!match) {
      console.warn(`  Skipped ${folder}/${name}: name it 250-<slug>.md or 340-<slug>.md`);
      continue;
    }
    const text = await readFile(path.join(from, name), 'utf8');
    await writeFile(path.join(to, name), forCourse(text, match[1]));
    console.log(`  ${path.relative(source, path.join(from, name))} → ${path.relative(site, path.join(to, name))}`);
  }
}

// Topics this term: one list per course, no dates.
const topicsTo = path.join(site, 'src/content/topics');
await fresh(topicsTo);
for (const course of courses) {
  const from = path.join(pagesFrom, `topics-${course}.yml`);
  await cp(from, path.join(topicsTo, `${course}.yml`));
  console.log(`  ${path.relative(source, from)} → ${path.relative(site, path.join(topicsTo, `${course}.yml`))}`);
}

// Downloads and prompts: owned by this script, so replaced wholesale.
const dist = path.join(source, 'starter-kits/dist');

const downloadsTo = path.join(site, 'public/downloads');
await fresh(downloadsTo);
await copyAll(dist, await listFiles(dist, '.zip'), downloadsTo);

const promptsFrom = path.join(dist, 'copy-paste');
const promptsTo = path.join(site, 'src/content/prompts');
await fresh(promptsTo);
await copyAll(promptsFrom, await listFiles(promptsFrom, '.md'), promptsTo);

// The NOTES.md template: the same file build.sh puts in both kits' starter/ folder.
const templatesTo = path.join(site, 'src/content/templates');
await fresh(templatesTo);
await copyAll(path.join(source, 'starter-kits/src/templates'), ['NOTES.md'], templatesTo);

console.log('Done. Review with `git status`, then build and commit.');
