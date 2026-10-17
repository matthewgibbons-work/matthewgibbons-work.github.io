// Page details for each copy-paste prompt, per course. The prompt text itself comes
// from the prompts collection (synced from dight-refactor/starter-kits/dist/copy-paste/).
// URLs: /<course>/prompts/<name>/ (site v2, Oct 17).

import type { Course } from './courses';

export type PromptName = 'start' | 'dig-deeper' | 'check';

export interface PromptInfo {
  title: string;
  description: string;
  /** "spark-0": run once, in Spark 0. "term": used all term. */
  group: 'spark-0' | 'term';
  /** The slash command that runs the same text once the kit is in place. The Start
   *  prompt has none: Spark 0 runs once, before the kit is there. */
  command?: string;
  /** Where and how to paste it, as short HTML-free sentences. */
  howTo: string[];
}

export const promptOrder: PromptName[] = ['start', 'dig-deeper', 'check'];

/** The synced file each course's page shows: start-250, check-340, dig-deeper (shared). */
export function promptFile(name: PromptName, course: Course): string {
  return name === 'dig-deeper' ? name : `${name}-${course}`;
}

export function promptHref(name: PromptName, course: Course): string {
  return `/${course}/prompts/${name}/`;
}

const shared: Record<'dig-deeper' | 'check', Omit<PromptInfo, 'howTo'>> = {
  'dig-deeper': {
    title: 'Dig deeper prompt',
    description: 'A tutor for code you’ve highlighted: it explains, links MDN, then asks you to predict.',
    group: 'term',
    command: '/dig-deeper',
  },
  check: {
    title: 'Check prompt',
    description: 'A pre-submission self-check: it points out gaps but never fills them.',
    group: 'term',
    command: '/check',
  },
};

const digDeeperHowTo = [
  'Highlight the code you want to understand, or paste it after the prompt.',
  'Copy the prompt, paste it into the chat, and send it.',
  'Answer its “predict” question before it reveals the answer.',
];

const checkHowTo = [
  'Copy the prompt, paste it into the chat, and add the assignment folder after it, like sparks/s01-repo-restructure.',
  'If you have the assignment brief, paste or link it too, so it checks against the “done” list.',
  'Fix what it flags yourself. It won’t write your NOTES.md.',
];

export const prompts: Record<Course, Record<PromptName, PromptInfo>> = {
  '250': {
    start: {
      title: 'Start prompt',
      description: 'Runs Spark 0 one step at a time.',
      group: 'spark-0',
      howTo: [
        'In VS Code, open the Chat view and choose Agent in the mode menu.',
        'Copy the prompt, paste it into the chat, and send it.',
        'If the conversation breaks partway, paste it again and say which step you’d reached.',
      ],
    },
    'dig-deeper': { ...shared['dig-deeper'], howTo: digDeeperHowTo },
    check: { ...shared.check, howTo: checkHowTo },
  },
  '340': {
    start: {
      title: 'Start prompt',
      description: 'Runs Spark 0 one step at a time.',
      group: 'spark-0',
      howTo: [
        'In the Claude desktop app, open the Code tab and start a new session.',
        'Choose your repo folder itself, not the folder it’s in.',
        'Copy the prompt, paste it in, and send it.',
        'Using Copilot Chat as a fallback? Choose Agent mode, paste the same prompt, and say which step you’d reached.',
      ],
    },
    'dig-deeper': { ...shared['dig-deeper'], howTo: digDeeperHowTo },
    check: { ...shared.check, howTo: checkHowTo },
  },
};
