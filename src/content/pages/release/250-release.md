---
title: "Final Project"
description: "A five-page site that defines the Digital Humanities in your own words, for a reader you choose, with three real projects that back the definition up. Due Sat Dec 12, 11:59 pm, the day of the open lab, where you can get final help."
courses: [dight250]
ready: true
tier: release
released: 2026-11-16
due: 2026-12-12
folder: final-project/
---

# Final Project

Make a five-page site that answers one question for a reader you choose: what are the Digital Humanities? Define it in your own words on the home page, back the definition up with three real DH projects, one page each, and finish with a reflections page, in HTML and CSS only. It's due Sat Dec 12 at 11:59 pm. Submit by pasting two links in Learning Suite. It's graded on a 25-point rubric (25% of your grade), and AI use (`NOTES.md`) carries the most points. Rework doesn't apply: this is the finished piece.

It draws on everything this term, and from Mon Nov 23 your studio time goes to it. Your S09 intent brief is its Intent and Spec: who it's for, a first draft of your definition, your three examples, and the "done" list you check it against. The writing is yours: the agent can help you find projects and write the markup, not write your definition, analysis, or reflections. The thing most people miss is checking every page, not just the home page: the validator, contrast, keyboard, 320px, and 200% zoom, on each one.

**Key dates**

- **Mon Nov 16:** brief out.
- **Wed Nov 18:** intent brief (S09), due Mon Nov 23.
- **Mon Nov 23:** studio time goes to the Final Project. P4, the last Prototype, is due Tue Nov 24.
- **Sat Dec 12, 11:59 pm:** due. The open lab that day is for final help.

The full week-by-week list is under **Timeline**.

## The brief

A Spark is an idea and a Prototype is a working model. A **Final Project** is something shipped to real people. Yours is a small site that defines the **Digital Humanities** (DH). What that term means is the question your site answers, in your own words; don't borrow a definition and decorate it.

**Write it for one reader.** Your intent brief names a real or realistic person, and every page is written for them: a roommate who asked what your minor is, a history major wondering whether DH has anything for them, a parent who wants to know what you'll do with it. Their question decides which examples you pick and how you explain them.

**Five pages**, in `final-project/`:

- **Home** (`index.html`): your definition, in your own words, with at least two credible sources linked, and a preview card for each example (a short summary, an image with its credit, and a link to the example's page).
- **Three example pages**, one per real DH project (a digital archive, a map, a text-analysis project, a 3D reconstruction, a database, an online exhibit: anything someone has built and you can link to). Each page has:
  - an **overview**: what the project is, who made it, and what it lets people do;
  - your **analysis**: how it fits your definition, which kind of DH it shows, and why you chose it, with specifics from your own time in the project: something you searched, read, or tried there, and what it showed you;
  - at least one **image, video, or audio** element from the project, with `alt` text and a credit in a `<figcaption>`;
  - links to the project itself and to any sources you used.
- **Reflections** (`reflections.html`): what changed in your understanding of DH as you worked, and one pattern you noticed across your three examples.

**The words are yours.** Your definition, analysis, and reflections are your own writing, like your `NOTES.md`. The agent can help you find projects, check a fact, and turn your writing into valid, accessible pages. It doesn't write the prose. If it drafts a sentence you keep, that's its writing, not yours: rewrite it, and say so in `NOTES.md`.

The site lives in `final-project/` in your repo, starting at `final-project/index.html`, and your hub links to it under **Final Project**.

## Timeline

| When | What happens |
| --- | --- |
| Mon Nov 16 | This brief goes out. Start looking at DH projects: which ones would your reader care about? |
| Wed Nov 18 | S09: write your intent brief in class. It's this project's Intent and Spec. |
| Mon Nov 23 | From here, studio time goes to the Final Project. P4, the last Prototype, is due Tue Nov 24. |
| Wed Dec 2 | S12: audit your Final Project and fix two things. |
| Mon Dec 7 | S13: the big live build, then check your Final Project against your own "done" list. |
| **Sat Dec 12** | Open lab. **Due, 11:59 pm:** links in Learning Suite. Come for final help if you need it. |

## Spec: the "done" list

<!-- done:start -->

**The site**

- [ ] Five pages in `final-project/`: `index.html`, three example pages, and `reflections.html`, joined by a nav that's the same on every page. The current page is marked with `aria-current="page"`, and styled so it doesn't rely on color alone.
- [ ] One shared CSS file for the whole site (an extra file for one page's special parts is fine).
- [ ] It uses at least four of this term's units, named in `NOTES.md`: color, typography, box model, Flexbox, Grid, responsive design, forms, multimedia, modern CSS, motion.
- [ ] Every line of your S09 "done" list. If your plan changed, `NOTES.md` says what changed and why.

**The content**

- [ ] The home page defines the Digital Humanities in your own words, links at least two credible sources, and has a preview card for each example: a summary, an image with its credit, and a link to its page.
- [ ] Each example page covers a real DH project: an overview, and your own analysis of how it fits your definition, which kind of DH it shows, and why you chose it, with at least one specific from your own time in the project (something you searched, read, or tried there). There's no word count: write enough that a reader can tell you spent real time with it.
- [ ] Each example page has at least one image, video, or audio element from the project, credited in a `<figcaption>`, and links to the project and your sources.
- [ ] The reflections page says what changed in your understanding and names one pattern across your examples.
- [ ] Every link opens and goes where it says, and every fact you state, you've checked at its source.

**Every page**

- [ ] Landmarks, one `<h1>`, and headings in a logical order.
- [ ] Passes the [W3C validator](https://validator.w3.org/nu/) with no errors, and your **Feedback checks** run shows ✅ in both tables (or `NOTES.md` says what it found and what you did).
- [ ] Every text/background pair meets WCAG AA contrast, in every color mode you support.
- [ ] Keyboard only: every link and control can be reached, focus is always visible, and nothing traps focus.
- [ ] At 320px wide nothing makes the page scroll sideways, and at 200% zoom nothing is cut off or overlapping.
- [ ] Images have `alt` text that fits their purpose; any video or audio has controls, captions, and no autoplay; any motion respects `prefers-reduced-motion`.

**The record**

- [ ] `final-project/NOTES.md` covers every section, in your own words. **AI use** says what the agent helped with (research, markup) and confirms the site's writing is yours. **Accepted / changed / rejected** covers the whole project, with at least three real decisions and why.
- [ ] Commits spread across at least two weeks, each with a message that says what changed.
- [ ] Your hub links to `final-project/` under Final Project, and the live site loads.

<!-- done:end -->

## Rubric (25 points)

"Developing" earns about half the category's points.

| Category | Points | Strong (full points) | Developing | Missing (0) |
| --- | --- | --- | --- | --- |
| Functionality | 4 | Every page loads on the live URL, every link works, and your S09 "done" list is met. | One or two broken links, or a few unmet lines. | The live site doesn't load, or most of the list isn't met. |
| Code quality | 3 | Valid HTML, one shared stylesheet, readable CSS with reused values, no leftover code you don't use. | Mostly clean, with some duplication or dead code. | Invalid HTML, or styles copied page to page. |
| Git | 3 | Small commits across two or more weeks, each saying what changed. | A few large commits, or vague messages ("update"). | One or two commits, all at the deadline. |
| AI use (`NOTES.md`) | 6 | Every section in your own voice; prompts named; real decisions with reasons; clear enough that I could tell what any part of the code does and why it's there; open questions that show what you still want to understand. | Thin sections, or decisions with no reasons. | Sections missing, or written by the agent. |
| Accessibility | 4 | Every "Every page" item passes when I check it. | One or two items fail. | Several fail, or there's no sign of checking. |
| Intent and content | 5 | A clear definition in your own words, examples and analysis that back it up, sources cited and media credited, all written for the reader your intent brief named. | The definition is vague, the analysis only describes the projects or could have been written without opening them, or sources and credits are missing in places. | No intent brief, no definition, or writing that isn't yours. |

## Working in the loop

The same loop as every Spark, at full size:

1. **Intent and Spec:** your S09 intent brief. Keep it open; it's what you verify against.
2. **Generate:** write each page's words yourself first, then ask the agent to turn them into the page, page by page, in small requests. Ask for a plan first, every time.
3. **Verify:** each page as you finish it: the Feedback checks on every push, then keyboard, 320px, 200%, and contrast by hand. Open every link.
4. **Explain:** write `final-project/NOTES.md` as you go, not the night before. Every rejected suggestion is worth a line.

Then run [`/check`](/250/skills/check/) `final-project` with the "done" list pasted (the **Copy** button copies it).

**Watch for:** the agent "improving" your writing when you asked for markup, projects, people, dates, or links it made up (open every one), images used without a credit, the agent rewriting pages you've already checked when you ask for something small, styles copied into every page instead of one shared file, and JavaScript (`AGENTS.md` rules it out here).

## Submitting

In the Learning Suite assignment **Final Project**, paste:

1. your live site's URL (`…/final-project/`), and
2. a direct link to your `final-project/` folder on GitHub.

**Graded:** the rubric above, out of 25.
