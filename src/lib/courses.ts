// The course registry (Oct 21): the one place that says which courses exist. The data is
// in src/data/courses.json; sync.mjs reads the same file. Every course page takes its
// identity from here: name, colour, calendar, Prototype and Release dates, and URLs.
// Course pages live under /<id>/ (site v2, Oct 17).
//
// Fields in courses.json:
//   id        the URL segment and the file prefix: '250' → /250/, units/250-color.md
//   name      shown in the nav, cards, and titles
//   topic     the one-line subject, shown on its card
//   agent     the agent, by name only (Oct 19: no app or editor named on the cards)
//   color     a colour token in global.css: blue, red, yellow, green, teal. It tints the badge,
//             the nav underline, and the card, always beside a text label
//   listed    false builds no pages for the course and shows it nowhere (hub, nav, sync)
//   calendar  a key in `calendars`: session number → date, and the no-class days
//   release   brief out, intent brief in class, due, and the open lab (final-exam slot)
//   prototypes  each Prototype's id, topic, release date, and due date (dates may shift; Learning Suite has
//             the current ones, so keep this file in step)
//
// To add a course (say, 350):
//   1. Add an entry to `courses` in courses.json with "listed": false. Nothing shows yet.
//   2. Write its content in dight-refactor/course-site-content/ the way 250 and 340 are:
//      units/350-<slug>.md, sparks/350-sNN.md, prototypes/350-pN.md, release/350-release.md,
//      topics-350.yml, and <!-- 350 --> … <!-- /350 --> blocks in the shared pages.
//   3. Per-course copy that isn't data lives in three places; add a 350 branch to each:
//      src/pages/[course]/index.astro ("Your setup"), src/lib/skills.ts (skillWhere,
//      byCourse), and src/pages/[course]/skills/index.astro (the skills folder).
//   4. When it should go live, flip "listed" to true, run `npm run sync`, and build.
// sync.mjs skips unlisted courses, but still drops their <!-- 350 --> blocks from shared pages.

import registry from '../data/courses.json';

/** A course id from courses.json, e.g. '250'. Only listed courses are ever routed. */
export type Course = string;

export interface Prototype {
  id: string;
  topic: string;
  /** ISO date the brief goes out. */
  released: string;
  /** ISO date. */
  due: string;
}

export interface ReleaseDates {
  released: string;
  intentBrief: string;
  due: string;
  dueTime: string;
  openLab: string;
}

export interface NoClass {
  date: string;
  reason?: string;
}

export interface CourseInfo {
  id: Course;
  name: string;
  topic: string;
  agent: string;
  /** A colour token name (blue, red, …); see global.css. */
  color: string;
  listed: boolean;
  /** Course home. */
  href: string;
  /** Session number → ISO date. */
  sessions: Record<number, string>;
  /** Days the class doesn't meet. */
  noClass: NoClass[];
  release: ReleaseDates;
  prototypes: Prototype[];
}

type Calendar = { sessions: Record<string, string>; noClass: NoClass[] };

const all: CourseInfo[] = registry.courses.map((c) => {
  const calendar = (registry.calendars as Record<string, Calendar>)[c.calendar];
  if (!calendar) throw new Error(`Course ${c.id} names the calendar "${c.calendar}", which courses.json doesn't have.`);
  return {
    ...c,
    href: `/${c.id}/`,
    sessions: Object.fromEntries(Object.entries(calendar.sessions).map(([n, d]) => [Number(n), d])),
    noClass: calendar.noClass,
  };
});

/** The listed courses, in order. An unlisted course builds no pages and appears nowhere. */
export const courseOrder: Course[] = all.filter((c) => c.listed).map((c) => c.id);

export const courses: Record<Course, CourseInfo> = Object.fromEntries(
  all.filter((c) => c.listed).map((c) => [c.id, c]),
);

/** A listed course's accent as a CSS value, e.g. 'var(--blue)'. */
export function accent(course: Course): string {
  return `var(--${courses[course].color})`;
}

/** The other listed course, for the "Switch to" link. With one course listed there is none. */
export function otherCourse(course: Course): Course | undefined {
  return courseOrder.find((id) => id !== course);
}

/** 'Mon Nov 2' from an ISO date or a Date, in UTC so the day never slips. */
export function fmtDay(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(`${date}T00:00:00Z`) : date;
  // 'Mon, Nov 2' → 'Mon Nov 2', the way the plan and the course home write dates.
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }).replace(',', '');
}
