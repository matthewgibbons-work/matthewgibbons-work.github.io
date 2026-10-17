// Page details for each copy-paste prompt. The prompt text itself comes from the
// prompts collection (synced from dight-refactor/starter-kits/dist/copy-paste/).

export type PromptName = 'start-250' | 'start-340' | 'dig-deeper' | 'check';

export interface PromptInfo {
  title: string;
  description: string;
  courses: ('dight250' | 'dight340')[];
  /** The slash command that runs the same text once the kit is in place. */
  command: string;
  /** Where and how to paste it, as short HTML-free sentences. */
  howTo: string[];
}

export const prompts: Record<PromptName, PromptInfo> = {
  'start-250': {
    title: 'Start prompt: DIGHT 250',
    description: 'Runs Spark 0 for DIGHT 250, one step at a time.',
    courses: ['dight250'],
    command: '/start',
    howTo: [
      'In VS Code, open the Chat view and choose Agent in the mode menu.',
      'Copy the prompt, paste it into the chat, and send it.',
      'Today you paste it: /start only works after the agent’s first step puts the kit in place.',
    ],
  },
  'start-340': {
    title: 'Start prompt: DIGHT 340',
    description: 'Runs Spark 0 for DIGHT 340, one step at a time.',
    courses: ['dight340'],
    command: '/start',
    howTo: [
      'In the Claude desktop app, open the Code tab and start a new session on your repo folder.',
      'Copy the prompt, paste it in, and send it.',
      'Using Copilot Chat as a fallback? Choose Agent mode, paste the same prompt, and say which step you’d reached.',
    ],
  },
  'dig-deeper': {
    title: 'Dig deeper prompt',
    description: 'A tutor for code you’ve highlighted: it explains, links MDN, then asks you to predict.',
    courses: ['dight250', 'dight340'],
    command: '/dig-deeper',
    howTo: [
      'Highlight the code you want to understand, or paste it after the prompt.',
      'Copy the prompt, paste it into the chat, and send it.',
      'Answer its “predict” question before it reveals the answer.',
    ],
  },
  check: {
    title: 'Check prompt',
    description: 'A pre-submission self-check: it points out gaps but never fills them.',
    courses: ['dight250', 'dight340'],
    command: '/check',
    howTo: [
      'Copy the prompt, paste it into the chat, and add the assignment folder after it, like sparks/s01-repo-restructure.',
      'If you have the assignment brief, paste or link it too, so it checks against the “done” list.',
      'Fix what it flags yourself. It won’t write your NOTES.md.',
    ],
  },
};

export const promptOrder: PromptName[] = ['start-250', 'start-340', 'dig-deeper', 'check'];
