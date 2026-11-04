#!/usr/bin/env node
// DIGHT 340 course kit updater. /update-kit runs it; so does the SessionStart hook (--hook).
// The instructor wrote this file; it is part of the kit. Node 18+, no packages.
//
//   --check            one line: up to date, or which update is out
//   --hook             SessionStart: says so only when an update is out; silent otherwise
//   --plan             what an update would add, replace, and remove; changes nothing
//   --apply [--take P]...  does it. A file you edited is kept unless you --take it.
//   --fetch P          saves the course's copy of P to a temporary file and prints its path
//   --as-of YYYY-MM-DD treat this as today (testing)   --base URL|DIR  another kit source
//
// The course site's /kit/340/manifest.json lists every kit version (dated) with each
// file's SHA-256; files are served at files/<sha256>. A file whose hash isn't any version
// the course shipped counts as edited by you.

import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const takes = args.flatMap((a, i) => (a === '--take' ? [args[i + 1]] : []));

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const base = (option('--base') || process.env.KIT_BASE_URL || 'https://matthewgibbons-work.github.io/kit/340/').replace(/\/?$/, '/');
const today = option('--as-of') || new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time
const timeoutMs = flag('--hook') ? 2000 : 15000;
const versionFile = path.join(root, '.course-kit-version');

const hash = (text) => createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');

async function get(rel) {
  if (!/^https?:/.test(base)) return readFile(path.join(base, rel), 'utf8');
  const res = await fetch(base + rel, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`${base + rel} answered ${res.status}`);
  return res.text();
}

async function readLocal(rel) {
  try {
    return await readFile(path.join(root, rel), 'utf8');
  } catch {
    return null;
  }
}

async function load() {
  const manifest = JSON.parse(await get('manifest.json'));
  const out = manifest.versions.filter((v) => v.version <= today);
  const target = out.at(-1);
  const mine = ((await readLocal('.course-kit-version')) || '').trim() || null;
  return { manifest, target, mine };
}

async function plan({ manifest, target, mine }) {
  const known = manifest.known;
  const p = { add: [], replace: [], remove: [], edited: [], same: [] };
  for (const [rel, sha] of Object.entries(target.files)) {
    const text = await readLocal(rel);
    if (text === null) p.add.push(rel);
    else if (hash(text) === sha) p.same.push(rel);
    else if (known[rel]?.includes(hash(text))) p.replace.push(rel);
    else p.edited.push({ path: rel, action: 'replace' });
  }
  // Files the student's version had (or, with no version, any earlier one) that the target drops.
  const mineV = manifest.versions.find((v) => v.version === mine);
  const earlier = mineV ? [mineV] : manifest.versions.filter((v) => v.version <= target.version);
  const had = new Set(earlier.flatMap((v) => Object.keys(v.files)));
  for (const rel of had) {
    if (rel in target.files) continue;
    const text = await readLocal(rel);
    if (text === null) continue;
    if (known[rel]?.includes(hash(text))) p.remove.push(rel);
    else p.edited.push({ path: rel, action: 'remove' });
  }
  return p;
}

const list = (label, items) => (items.length ? `${label} (${items.length}):\n${items.map((i) => `  - ${i}`).join('\n')}\n` : '');

function describe(p, mine, target) {
  return (
    `Course kit: ${mine ?? 'no version recorded'} → ${target.version}\n` +
    list('Will add', p.add) +
    list('Will replace', p.replace) +
    list('Will remove', p.remove) +
    list(
      'Edited by you (ask before touching)',
      p.edited.map((e) => `${e.path} (the update would ${e.action} it)`),
    ) +
    `Unchanged: ${p.same.length} file${p.same.length === 1 ? '' : 's'}\n` +
    (target.notes ? `After updating: ${target.notes}\n` : '')
  );
}

async function main() {
  if (flag('--hook')) {
    try {
      const { target, mine } = await load();
      if (target && mine && target.version > mine) {
        const msg = `Course kit update available (${mine} → ${target.version}). Run /update-kit to see what it changes.`;
        console.log(JSON.stringify({ systemMessage: msg, hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: `${msg} Mention this to the student once; don't run it unless they ask.` } }));
      }
    } catch {
      // Offline or the site is down: say nothing.
    }
    return;
  }

  const state = await load();
  const { target, mine } = state;
  if (!target) throw new Error(`No kit version is out yet as of ${today}.`);
  const upToDate = mine === target.version;

  if (flag('--check')) {
    console.log(upToDate ? `Course kit is up to date (${mine}).` : `Course kit update available: ${mine ?? 'no version recorded'} → ${target.version}. Run /update-kit.`);
    return;
  }

  if (flag('--fetch')) {
    const rel = option('--fetch');
    const sha = target.files[rel] ?? state.manifest.versions.findLast((v) => v.files[rel])?.files[rel];
    if (!sha) throw new Error(`${rel} isn't a kit file.`);
    const dir = path.join(os.tmpdir(), 'course-kit', target.version);
    const out = path.join(dir, rel.replaceAll('/', '__'));
    await mkdir(dir, { recursive: true });
    await writeFile(out, await get(`files/${sha}`));
    console.log(out);
    return;
  }

  if (upToDate) {
    console.log(`Course kit is up to date (${mine}). Nothing to change.`);
    return;
  }

  const p = await plan(state);
  if (flag('--plan') || !flag('--apply')) {
    process.stdout.write(describe(p, mine, target));
    return;
  }

  // --apply
  const changed = [];
  for (const rel of [...p.add, ...p.replace, ...p.edited.filter((e) => e.action === 'replace' && takes.includes(e.path)).map((e) => e.path)]) {
    const text = await get(`files/${target.files[rel]}`);
    if (hash(text) !== target.files[rel]) throw new Error(`Download of ${rel} didn't match its hash; nothing more was changed.`);
    await mkdir(path.dirname(path.join(root, rel)), { recursive: true });
    await writeFile(path.join(root, rel), text);
    changed.push(`${p.add.includes(rel) ? 'added' : 'replaced'} ${rel}`);
  }
  for (const rel of [...p.remove, ...p.edited.filter((e) => e.action === 'remove' && takes.includes(e.path)).map((e) => e.path)]) {
    await rm(path.join(root, rel), { force: true });
    changed.push(`removed ${rel}`);
  }
  const kept = p.edited.filter((e) => !takes.includes(e.path)).map((e) => `kept your ${e.path}`);
  await writeFile(versionFile, `${target.version}\n`);
  console.log(`Course kit is now ${target.version}.\n` + [...changed, ...kept].map((c) => `  - ${c}`).join('\n'));
  if (target.notes) console.log(`After updating: ${target.notes}`);
}

main().catch((err) => {
  console.error(`update-kit: ${err.message}`);
  process.exit(1);
});
