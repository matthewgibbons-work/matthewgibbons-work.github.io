# DIGHT 250 & 340 course site

Astro, static output, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

Page content, the starter-kit zips, and the copy-paste prompts are synced from `dight-refactor/`. Edit them there, not here, then:

```bash
# in dight-refactor/starter-kits/
./build.sh
# back here
npm run sync     # copies into src/content/ and public/downloads/
```

The sync looks for `../dight-refactor`; set `DIGHT_REFACTOR=/path/to/it` if it lives elsewhere. Synced files are committed, because the deploy Action can't see `dight-refactor/`.

## Courses, schedule, and indexes (Oct 21)

`src/data/courses.json` is the course registry: each course's id, name, colour, `listed` flag, session calendar, Prototype dates, and Final Project dates. The hub cards, routes, `sync.mjs`, and the course-block splitting all read it. A course with `"listed": false` builds no pages and shows nowhere. `src/lib/courses.ts` has a comment on how to add one (350).

Each listed course gets `/<id>/schedule/`, `/units/`, `/sparks/`, `/prototypes/`, and `/final-project/`. The schedule joins `session: N` in `topics-<id>.yml` to the calendar in `courses.json`; a topic with no `session` is listed without a date. Final Project briefs come from `course-site-content/release/<id>-release.md`. Dates in the registry (Prototype and Final Project) have to be kept in step with the briefs' frontmatter by hand.
