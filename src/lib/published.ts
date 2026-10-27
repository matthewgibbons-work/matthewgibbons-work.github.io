// What's live: the one place the site decides whether a page is published (Oct 19).
// A page is published when its frontmatter says `ready: true` and its go-live time has
// passed: 13:00 UTC on its `date` (units, Sparks) or `released` (Prototypes and the Final Project brief), the same
// hour as the daily rebuild in deploy.yml (6 am MST, 7 am MDT).
// Production builds leave unpublished pages out entirely, along with every link to them.
// `npm run dev` shows everything, so drafts can be checked; each one gets a banner.
// PUBLISH_AS_OF=2026-10-26 npm run build previews what a later day's rebuild will publish.

import { getCollection, type CollectionEntry } from 'astro:content';
import { courseOrder, type Course } from './courses';

export type Page = CollectionEntry<'pages'>;
export type Kind = 'unit' | 'spark' | 'prototype' | 'release';

const kindFolders: Record<string, Kind> = { units: 'unit', sparks: 'spark', prototypes: 'prototype', release: 'release' };
const urlFolders: Record<Kind, string> = { unit: 'units', spark: 'sparks', prototype: 'prototypes', release: 'release' };

// Course ids come from the registry (src/data/courses.json), listed courses only.
const idPattern = new RegExp(`^(units|sparks|prototypes|release)/(${courseOrder.join('|')})-([a-z0-9-]+)$`);

const GO_LIVE_HOUR_UTC = 13;

/** The moment this build treats as "now". */
export const buildTime = process.env.PUBLISH_AS_OF ? new Date(process.env.PUBLISH_AS_OF) : new Date();

/** Dev shows drafts; production doesn't. */
const showDrafts = import.meta.env.DEV;

/** 'units/250-color' → { kind: 'unit', course: '250', slug: 'color' }. Spark 1 and other pages → null. */
export function parseId(id: string): { kind: Kind; course: Course; slug: string } | null {
  const match = id.match(idPattern);
  if (!match) return null;
  return { kind: kindFolders[match[1]], course: match[2] as Course, slug: match[3] };
}

export function pageHref(page: Page): string {
  const parsed = parseId(page.id);
  if (!parsed) throw new Error(`${page.id} isn't a unit, Spark, Prototype, or Final Project page`);
  // A course has one Final Project brief, so it has no slug in its URL: /250/final-project/.
  if (parsed.kind === 'release') return `/${parsed.course}/final-project/`;
  return `/${parsed.course}/${urlFolders[parsed.kind]}/${parsed.slug}/`;
}

export function goLiveTime(page: Page): Date | undefined {
  const day = page.data.date ?? page.data.released;
  if (!day) return undefined;
  const live = new Date(day);
  live.setUTCHours(GO_LIVE_HOUR_UTC, 0, 0, 0);
  return live;
}

export type Status = 'published' | 'scheduled' | 'draft';

export function pageStatus(page: Page): Status {
  if (!page.data.ready) return 'draft';
  const live = goLiveTime(page);
  return live && buildTime >= live ? 'published' : 'scheduled';
}

/** Whether this build renders the page and links to it. */
export function isShown(page: Page): boolean {
  return showDrafts || pageStatus(page) === 'published';
}

/** Every unit, Spark, Prototype, or Final Project page this build shows, for one course or both. */
export async function shownPages(kind: Kind, course?: Course): Promise<Page[]> {
  const all = await getCollection('pages');
  return all.filter((page) => {
    const parsed = parseId(page.id);
    return parsed?.kind === kind && (!course || parsed.course === course) && isShown(page);
  });
}

/** The shown page for a course, kind, and slug (e.g. '250', 'unit', 'color'), if any. */
export async function findPage(course: Course, kind: Kind, slug: string): Promise<Page | undefined> {
  return (await shownPages(kind, course)).find((page) => parseId(page.id)?.slug === slug);
}

/** The shown Final Project brief for a course, if any (sources are named release/250-release.md). */
export async function releasePage(course: Course): Promise<Page | undefined> {
  return findPage(course, 'release', 'release');
}

/** The shown unit page and Spark for one session: they share `session`. */
export async function sessionPair(course: Course, session: number) {
  const [units, sparks] = await Promise.all([shownPages('unit', course), shownPages('spark', course)]);
  return {
    unit: units.find((page) => page.data.session === session),
    spark: sparks.find((page) => page.data.session === session),
  };
}

/** The shown Prototype brief for 'P1' etc. (sources are named 250-p1.md). */
export async function prototypePage(course: Course, prototype: string): Promise<Page | undefined> {
  return findPage(course, 'prototype', prototype.toLowerCase());
}

/** The shown unit pages that feed a Prototype, in session order. */
export async function unitsFeeding(course: Course, prototype: string): Promise<Page[]> {
  return (await shownPages('unit', course))
    .filter((page) => page.data.prototype === prototype)
    .sort((a, b) => (a.data.session ?? 0) - (b.data.session ?? 0));
}
