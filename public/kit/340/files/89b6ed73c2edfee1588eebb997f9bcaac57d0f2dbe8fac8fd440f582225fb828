// DIGHT 340 feedback CI: the course conventions as ESLint rules (ships Nov 2).
// It checks only what the course asks for, so a red mark always means one of these:
//   const and let, never var · const when a variable is never reassigned · === and !==, never == or !=
// Runs on every push (.github/workflows/check.yml). It reports; it never blocks a deploy.
// Rules: https://eslint.org/docs/latest/rules/
export default [
  {
    ignores: ['archive/**', 'try/**', '_site/**', '**/node_modules/**', '**/dist/**', '**/.astro/**', '**/build/**', '**/test-results/**', '**/playwright-report/**'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
];
