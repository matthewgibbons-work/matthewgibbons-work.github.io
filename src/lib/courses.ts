// The two courses. Every course page takes its identity from here: name, badge,
// accent, and URLs. Course pages live under /250/ and /340/ (site v2, Oct 17).

export type Course = '250' | '340';

export interface CourseInfo {
  id: Course;
  name: string;
  topic: string;
  /** The agent, by name only (Oct 19: no app or editor named on the cards). */
  agent: string;
  /** Course home. */
  href: string;
  /** Prototypes: number, topics, due. Dates may shift; Learning Suite has the current ones. */
  prototypes: [string, string, string][];
}

export const courses: Record<Course, CourseInfo> = {
  '250': {
    id: '250',
    name: 'DIGHT 250',
    topic: 'HTML and CSS',
    agent: 'GitHub Copilot',
    href: '/250/',
    prototypes: [
      ['P1', 'Color + Typography', 'Mon Nov 2'],
      ['P2', 'Box model + Flexbox', 'Mon Nov 9'],
      ['P3', 'Grid', 'Mon Nov 16'],
      ['P4', 'Responsive + Forms', 'Mon Nov 23'],
    ],
  },
  '340': {
    id: '340',
    name: 'DIGHT 340',
    topic: 'JavaScript, Svelte, and Astro',
    agent: 'Claude Code',
    href: '/340/',
    prototypes: [
      ['P1', 'Async 1 + Async 2', 'Mon Nov 2'],
      ['P2', 'Modules/Vite + Svelte intro', 'Mon Nov 9'],
      ['P3', 'Svelte logic + events', 'Mon Nov 16'],
      ['P4', 'Svelte components + forms/shared state', 'Mon Nov 23'],
    ],
  },
};

export const courseOrder: Course[] = ['250', '340'];

export function otherCourse(course: Course): Course {
  return course === '250' ? '340' : '250';
}
