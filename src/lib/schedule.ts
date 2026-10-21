// The schedule and the three index pages (Oct 21): units, Sparks, and Prototypes in session
// order, with dates. Dates come from the course registry (src/data/courses.json); the
// session each topic is taught in comes from `session:` in topics-<course>.yml. A topic
// with no `session` yet is listed without a date, not dropped.
//
// Only published pages link (src/lib/published.ts). An unpublished item shows its title
// (the topic name for a unit, "S05" for a Spark, "P2 · Box model + Flexbox" for a Prototype)
// and "Coming Mon Nov 2", with no link. Titles of draft pages are never read, so nothing
// from a draft reaches a production build.

import { getEntry } from 'astro:content';
import { courses, fmtDay, type Course } from './courses';
import {
  buildTime,
  findPage,
  pageHref,
  prototypePage,
  releasePage,
  sessionPair,
  type Page,
} from './published';

/** A unit, Spark, or Prototype in a list. */
export interface Item {
  title: string;
  /** Set only when the page is published. */
  href?: string;
  /** ISO date this item is taught or goes out; unset when the topic has no `session` yet. */
  date?: string;
  /** "Coming Mon Nov 2" for an unpublished item; unset when it's published. */
  coming?: string;
  session?: number;
  /** Anything else worth a column: the unit a Spark belongs to, a due date. */
  note?: string;
}

/** "Coming Mon Nov 2" while the date is ahead; "Coming soon" once it has passed or is unknown. */
export function comingLabel(date?: string): string {
  if (!date) return 'Coming soon';
  const live = new Date(`${date}T13:00:00Z`);
  return buildTime < live ? `Coming ${fmtDay(date)}` : 'Coming soon';
}

const pad = (n: number) => String(n).padStart(2, '0');

interface Topic {
  name: string;
  summary: string;
  tier?: string;
  prototype?: string;
  session?: number;
  unit?: string;
}

/** The course's topics in teaching order, with the unit and Spark pages that are shown for each. */
async function topicRows(course: Course) {
  const c = courses[course];
  const topics = ((await getEntry('topics', course))?.data ?? []) as Topic[];
  const spark0 = await getEntry('pages', `spark-0-${course}`);
  return Promise.all(
    topics.map(async (topic) => {
      const date = topic.session ? c.sessions[topic.session] : undefined;
      const pair = topic.session ? await sessionPair(course, topic.session) : undefined;
      const unit: Page | undefined = (topic.unit && (await findPage(course, 'unit', topic.unit))) || pair?.unit;
      // Session 1 is Onboarding: its Spark is Spark 0, the setup guide, which is always live.
      const spark = topic.session === 1 ? undefined : pair?.spark;
      return { topic, date, unit, spark, spark0: topic.session === 1 && spark0 ? `/${course}/spark-0/` : undefined };
    }),
  );
}

/** The Open lab topic has no session; the registry holds its date. */
const isOpenLab = (topic: Topic) => !topic.session && /^open lab$/i.test(topic.name);

/** Units: one per topic, in teaching order. */
export async function unitItems(course: Course): Promise<Item[]> {
  const rows = await topicRows(course);
  return rows
    .filter(({ topic }) => !isOpenLab(topic))
    .map(({ topic, date, unit, spark0 }) => {
      const href = unit ? pageHref(unit) : spark0;
      return {
        title: topic.name,
        session: topic.session,
        date,
        href,
        coming: href ? undefined : comingLabel(date),
        // Session 1 has no unit page: it links to the Spark 0 setup guide instead.
        note: !unit && spark0 ? 'Setup guide' : undefined,
      };
    });
}

/** Sparks: one per session, in order. Session 1's Spark is Spark 0. */
export async function sparkItems(course: Course): Promise<Item[]> {
  const rows = await topicRows(course);
  return rows
    .filter(({ topic }) => topic.session)
    .map(({ topic, date, spark, spark0 }) => {
      const session = topic.session!;
      if (spark0) return { title: 'Spark 0', href: spark0, session, date, note: topic.name };
      const due = spark?.data.due ? `Due ${fmtDay(spark.data.due)}` : undefined;
      return {
        title: spark ? spark.data.title : `S${pad(session)}`,
        href: spark ? pageHref(spark) : undefined,
        coming: spark ? undefined : comingLabel(date),
        session,
        date,
        // The unit it goes with, and when it's due once the brief is out.
        note: [topic.name, due].filter(Boolean).join(' · '),
      };
    });
}

/** Prototypes: P1 to P4 from the registry, each with the units that feed it. */
export async function prototypeItems(course: Course): Promise<Item[]> {
  const c = courses[course];
  const topics = ((await getEntry('topics', course))?.data ?? []) as Topic[];
  return Promise.all(
    c.prototypes.map(async (p) => {
      const page = await prototypePage(course, p.id);
      const feeds = topics.filter((t) => t.prototype === p.id).map((t) => t.name);
      return {
        title: `${p.id} · ${p.topic}`,
        href: page ? pageHref(page) : undefined,
        date: p.released,
        coming: page ? undefined : comingLabel(p.released),
        note: [feeds.length ? `Units: ${feeds.join(', ')}` : '', `Due ${fmtDay(p.due)}`].filter(Boolean).join(' · '),
      };
    }),
  );
}

/** Something that happens on a date besides class: a Prototype due, a Release milestone. */
export interface Milestone {
  text: string;
  href?: string;
}

/** One row of the schedule: a class session, a no-class day, a milestone-only day, or an undated topic. */
export interface ScheduleRow {
  key: string;
  kind: 'session' | 'noclass' | 'event' | 'undated';
  date?: string;
  session?: number;
  unit?: Item;
  spark?: Item;
  milestones: Milestone[];
  /** "No class", with the reason if the registry has one. */
  noClass?: string;
}

export async function scheduleRows(course: Course): Promise<ScheduleRow[]> {
  const c = courses[course];
  const [units, sparks] = await Promise.all([unitItems(course), sparkItems(course)]);
  const brief = await releasePage(course);
  const releaseHref = brief && pageHref(brief);

  // Milestones, keyed by date.
  const milestones = new Map<string, Milestone[]>();
  const add = (date: string, m: Milestone) => milestones.set(date, [...(milestones.get(date) ?? []), m]);
  for (const p of c.prototypes) {
    const page = await prototypePage(course, p.id);
    add(p.due, { text: `${p.id} due`, href: page && pageHref(page) });
  }
  add(c.release.released, { text: 'Release brief out', href: releaseHref });
  add(c.release.intentBrief, { text: 'Release intent brief, in class', href: releaseHref });
  add(c.release.due, { text: `Release due, ${c.release.dueTime}`, href: releaseHref });
  add(c.release.openLab, { text: 'Open lab: Release walkthroughs' });

  const rows: ScheduleRow[] = [];
  const used = new Set<string>();

  // Sessions: one row per topic that has a `session`, on that session's date.
  for (const unit of units.filter((u) => u.session && u.date)) {
    used.add(unit.date!);
    rows.push({
      key: `session-${unit.session}`,
      kind: 'session',
      date: unit.date,
      session: unit.session,
      unit,
      spark: sparks.find((s) => s.session === unit.session),
      milestones: milestones.get(unit.date!) ?? [],
    });
  }

  for (const day of c.noClass) {
    used.add(day.date);
    rows.push({
      key: `noclass-${day.date}`,
      kind: 'noclass',
      date: day.date,
      milestones: milestones.get(day.date) ?? [],
      noClass: day.reason ? `No class (${day.reason})` : 'No class',
    });
  }

  // Days with milestones but no class: Release due, the open lab.
  for (const [date, list] of milestones) {
    if (!used.has(date)) rows.push({ key: `event-${date}`, kind: 'event', date, milestones: list });
  }

  rows.sort((a, b) => a.date!.localeCompare(b.date!));

  // Topics with no date yet (no `session` in topics-<course>.yml, or a session the calendar
  // doesn't have), in teaching order, after the dated rows. The Open lab topic is already
  // the open-lab row above.
  for (const unit of units.filter((u) => !u.date)) {
    rows.push({
      key: `undated-${unit.title}`,
      kind: 'undated',
      session: unit.session,
      unit,
      spark: sparks.find((s) => s.session === unit.session && unit.session),
      milestones: [],
    });
  }
  return rows;
}
