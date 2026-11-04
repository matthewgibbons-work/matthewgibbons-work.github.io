// DIGHT 340 scope guard: a Claude Code PreToolUse hook (ships Nov 2).
// AGENTS.md *asks* the agent to stay in scope; this hook *enforces* it. Before Claude
// runs a shell command or edits a package.json, Claude Code sends the details here.
// If the change would install an off-scope package, we exit with code 2: Claude Code
// cancels the action and shows Claude the message below, so it can explain and offer
// an in-scope way. Anything else exits 0 and carries on as normal.
// Docs: https://code.claude.com/docs/en/hooks
import { readFileSync } from 'node:fs';

// Off-scope for DIGHT 340 (AGENTS.md → Scope). The in-scope alternative is the value.
const OFF_SCOPE = {
  react: 'Svelte 5',
  'react-dom': 'Svelte 5',
  next: 'Astro',
  preact: 'Svelte 5',
  vue: 'Svelte 5',
  nuxt: 'Astro',
  '@angular/core': 'Svelte 5',
  jquery: 'plain DOM methods, like querySelector and addEventListener',
  tailwindcss: 'plain CSS',
  '@tailwindcss/vite': 'plain CSS',
  bootstrap: 'plain CSS',
};

// Scaffolders that create an off-scope project in one go.
const OFF_SCOPE_CREATE = /\b(create-react-app|create-next-app|create-vue|create-nuxt|@angular\/cli)\b|--template[ =](react|preact|vue|next)\b/;

const input = JSON.parse(readFileSync(0, 'utf8'));
const { tool_name: tool, tool_input: args = {} } = input;

const block = (what) => {
  console.error(
    `Blocked by the DIGHT 340 scope guard: ${what}. ` +
      'This course uses vanilla JavaScript, Svelte 5, and Astro only (see AGENTS.md → Scope). ' +
      "Explain this to the student, and offer the in-scope way instead. Don't try to get around this check.",
  );
  process.exit(2);
};

// Package names a command or file mentions, matched as whole names.
const mentioned = (text) =>
  Object.keys(OFF_SCOPE).filter((name) => {
    const escaped = name.replace(/[/@.]/g, '\\$&');
    return new RegExp(`(^|[\\s"'])${escaped}(@[^\\s"']*)?(?=$|[\\s"'])`).test(text);
  });

if (tool === 'Bash') {
  const command = args.command ?? '';
  const installs = /\b(npm|pnpm|yarn|bun)\s+(install|i|add)\b|\bnpx\b|\b(npm|pnpm|yarn|bun)\s+(create|init|dlx|x)\b/.test(command);
  if (installs) {
    if (OFF_SCOPE_CREATE.test(command)) block('that command creates a project in a framework outside the course');
    const found = mentioned(command);
    if (found.length > 0) {
      block(found.map((name) => `${name} (use ${OFF_SCOPE[name]})`).join(', '));
    }
  }
} else if (tool === 'Write' || tool === 'Edit' || tool === 'MultiEdit') {
  const path = args.file_path ?? '';
  if (path.endsWith('package.json')) {
    const text = [args.content, args.new_string, ...(args.edits ?? []).map((e) => e.new_string)]
      .filter(Boolean)
      .join('\n');
    // In package.json a dependency appears as "name": "version".
    const found = Object.keys(OFF_SCOPE).filter((name) => text.includes(`"${name}":`));
    if (found.length > 0) {
      block(`adding ${found.join(', ')} to package.json (use ${found.map((n) => OFF_SCOPE[n]).join(', ')})`);
    }
  }
}

process.exit(0);
