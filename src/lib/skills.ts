// Page details for each skill. The skill text itself comes from the prompts collection
// (synced from dight-refactor/starter-kits/dist/copy-paste/), the same text as the kit's SKILL.md.
// URLs: /<course>/skills/<name>/ (Oct 19: renamed from prompts, since the kit ships them as skills).
// The Start prompt isn't a skill: it lives only on each course's Spark 1 page.

import type { Course } from './courses';

export type SkillName = 'dig-deeper' | 'check';

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

export const skillOrder: SkillName[] = ['dig-deeper', 'check'];

/** The synced file each course's page shows: dig-deeper (shared), check-250, check-340. */
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
};

/** A skill's page details for one course, with that course's wording applied. */
export function skillInfo(name: SkillName, course: Course): SkillInfo {
  const { byCourse, ...info } = skills[name];
  return { ...info, ...byCourse?.[course] };
}
