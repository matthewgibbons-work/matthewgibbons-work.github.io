// Page details for each skill. The skill text itself comes from the prompts collection
// (synced from dight-refactor/starter-kits/dist/copy-paste/), the same text as the kit's SKILL.md.
// URLs: /<course>/skills/<name>/ (Oct 19: renamed from prompts, since the kit ships them as skills).
// The Start prompt isn't a skill: it lives only on each course's Spark 1 page.

import type { Course } from './courses';

export type SkillName = 'dig-deeper' | 'check' | 'update-kit';

export interface SkillInfo {
  title: string;
  /** The slash command that runs it. */
  command: string;
  /** What it does, in one line. */
  description: string;
  /** How to run it, as short HTML-free sentences. */
  howTo: string[];
  /** Per-course wording that replaces `description` or `howTo`. */
  byCourse?: Partial<Record<Course, Partial<Pick<SkillInfo, 'description' | 'howTo'>>>>;
}

export const skillOrder: SkillName[] = ['dig-deeper', 'check', 'update-kit'];

/** The synced file each course's page shows: dig-deeper (shared), check-250/340, update-kit-250/340. */
export function skillFile(name: SkillName, course: Course): string {
  return name === 'dig-deeper' ? name : `${name}-${course}`;
}

export function skillHref(name: SkillName, course: Course): string {
  return `/${course}/skills/${name}/`;
}

/** Where students run skills, per course. */
export const skillWhere: Record<Course, string> = {
  '250': 'Run them in Copilot Chat, in Agent mode, with your repo folder open in VS Code.',
  '340': 'Run them in any Claude Code session opened on your repo folder.',
};

export const skills: Record<SkillName, SkillInfo> = {
  'dig-deeper': {
    title: 'Dig deeper',
    command: '/dig-deeper',
    description: 'A tutor for code you’ve highlighted: it explains, links MDN, then asks you to predict.',
    howTo: [
      'Highlight the code you want to understand, or name the file and lines.',
      'Type /dig-deeper in the chat and send it.',
      'Answer its “predict” question before it reveals the answer.',
    ],
    // Oct 21: the Desktop app has no editor to highlight in, and the VS Code extension
    // didn't pass highlighted code to the skill. Naming the code works everywhere.
    byCourse: {
      '340': {
        description: 'A tutor for code you name: it explains, links MDN, then asks you to predict.',
        howTo: [
          'Type /dig-deeper, then the file and the lines you want to understand, like /dig-deeper main.js lines 40-52.',
          'Or paste the code after /dig-deeper.',
          'Answer its “predict” question before it reveals the answer.',
        ],
      },
    },
  },
  check: {
    title: 'Check',
    command: '/check',
    description: 'A pre-submission self-check: it points out gaps but never fills them.',
    howTo: [
      'Type /check followed by the assignment folder, like /check sparks/s01-repo-restructure.',
      'If you have the assignment brief, paste or link it too, so it checks against the “done” list.',
      'Fix what it flags yourself. It won’t write your NOTES.md.',
    ],
  },
  // Nov 4: replaces the download-and-paste kit updates.
  'update-kit': {
    title: 'Update kit',
    command: '/update-kit',
    description: 'Brings the course kit files up to date from the course site, and tells you what it will change before it changes anything.',
    howTo: [
      'Type /update-kit in the chat and send it, when a brief says there’s a kit update.',
      'Read what it says it will add, replace, or remove. If it asks about a file you changed, choose keep mine, take the course’s, or show me the difference.',
      'Commit the changes in GitHub Desktop and push. It never commits for you.',
    ],
    byCourse: {
      '340': {
        howTo: [
          'Type /update-kit in the chat and send it. A new session tells you when an update is out.',
          'Read what it says it will add, replace, or remove. If it asks about a file you changed, choose keep mine, take the course’s, or show me the difference.',
          'Commit the changes in GitHub Desktop, push, and open a new session if it says settings changed.',
        ],
      },
    },
  },
};

/** A skill's page details for one course, with that course's wording applied. */
export function skillInfo(name: SkillName, course: Course): SkillInfo {
  const { byCourse, ...info } = skills[name];
  return { ...info, ...byCourse?.[course] };
}
