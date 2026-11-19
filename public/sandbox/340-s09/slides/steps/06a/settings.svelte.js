// slide:module
const defaults = { name: 'Reader', size: 'normal', transcripts: false, goal: 20 };

export let settings = $state({ ...defaults });

export function reset() {
  settings = { ...defaults };
}
// /slide:module
