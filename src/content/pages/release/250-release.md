---
title: "Final Project"
description: "A small site for a real or realistic audience: expand the Saturday Morning Archive, or bring your own idea. Due Sat Dec 12, 11:59 pm, the day of the open lab, where you can get final help."
courses: [dight250]
ready: false # true once the Final Project brief is reviewed, before Mon Nov 16 (PLAN.md: Build order)
tier: release
released: 2026-11-16
due: 2026-12-12
folder: final-project/
---

# Final Project

**Units:** everything this term. Your intent brief is Wednesday's Spark (S09). Due Sat Dec 12, 11:59 pm. The open lab that day is for final help.

## The brief

A Spark is an idea and a Prototype is a working model. A **Final Project** is something shipped to real people. Make a small site, three to five pages, for a real or realistic audience, and take it through the loop one last time at full size: you decide what it's for and what "done" means, the agent writes most of the code, and you check it, fix it, and explain it.

**Default: expand the Saturday Morning Archive.** Turn what you've built this term into one small site, with a shared header, nav, and footer. For example: a home page (from P3), an episode guide or a page per show (from your Sparks), and a Suggest-a-show page (from P4). At least one page has to be new.

**Your own choice:** a small site for a real or realistic audience: a club's events, a family recipe collection, a portfolio for a job you want, a guide to something you know well. It's still HTML and CSS only (`AGENTS.md` holds you to that), and your intent brief names who it's for.

Either way, the site lives in `final-project/` in your repo, starting at `final-project/index.html`, and your hub links to it under **Final Project**.

## Timeline

| When | What happens |
| --- | --- |
| Mon Nov 16 | This brief goes out. Start thinking about what you'd build. |
| Wed Nov 18 | S09: write your intent brief in class. It's this project's Intent and Spec. |
| Mon Nov 23 | No more Prototypes: from here, studio time goes to the Final Project. |
| Wed Dec 2 | S12: audit your Final Project and fix two things. |
| Mon Dec 7 | S13: the big live build, then check your Final Project against your own "done" list. |
| **Sat Dec 12** | Open lab | **Due, 11:59 pm:** links in Learning Suite. Come for final help if you need it. |

## Spec: the "done" list

<!-- done:start -->

**The site**

- [ ] Three to five pages in `final-project/`, joined by a nav that's the same on every page. The current page is marked with `aria-current="page"`, and styled so it doesn't rely on color alone.
- [ ] One shared CSS file for the whole site (an extra file for one page's special parts is fine).
- [ ] At least one page you didn't build in an earlier Spark or Prototype.
- [ ] It uses at least four of this term's units, named in `NOTES.md`: color, typography, box model, Flexbox, Grid, responsive design, forms, multimedia, modern CSS, motion.
- [ ] Every line of your S09 "done" list. If your plan changed, `NOTES.md` says what changed and why.

**Every page**

- [ ] Landmarks, one `<h1>`, and headings in a logical order.
- [ ] Passes the [W3C validator](https://validator.w3.org/nu/) with no errors, and your **Feedback checks** run shows ✅ in both tables (or `NOTES.md` says what it found and what you did).
- [ ] Every text/background pair meets WCAG AA contrast, in every color mode you support.
- [ ] Keyboard only: every link and control can be reached, focus is always visible, and nothing traps focus.
- [ ] At 320px wide nothing makes the page scroll sideways, and at 200% zoom nothing is cut off or overlapping.
- [ ] Images have `alt` text that fits their purpose; any video or audio has controls, captions, and no autoplay; any motion respects `prefers-reduced-motion`.

**The record**

- [ ] `final-project/NOTES.md` covers every section, in your own words. **Accepted / changed / rejected** covers the whole project, with at least three real decisions and why.
- [ ] Commits spread across at least two weeks, each with a message that says what changed.
- [ ] Your hub links to `final-project/` under Final Project, and the live site loads.

<!-- done:end -->

## Rubric (25 points)

"Developing" earns about half the category's points.

| Category | Points | Strong (full points) | Developing | Missing (0) |
| --- | --- | --- | --- | --- |
| Functionality | 4 | Every page loads on the live URL, every link and form works, and your S09 "done" list is met. | One or two broken links, or a few unmet lines. | The live site doesn't load, or most of the list isn't met. |
| Code quality | 3 | Valid HTML, one shared stylesheet, readable CSS with reused values, no leftover code you don't use. | Mostly clean, with some duplication or dead code. | Invalid HTML, or styles copied page to page. |
| Git | 3 | Small commits across two or more weeks, each saying what changed. | A few large commits, or vague messages ("update"). | One or two commits, all at the deadline. |
| AI use (`NOTES.md`) | 6 | Every section in your own voice; prompts named; real decisions with reasons; clear enough that I could tell what any part of the code does and why it's there; open questions that show what you still want to understand. | Thin sections, or decisions with no reasons. | Sections missing, or written by the agent. |
| Accessibility | 4 | Every "Every page" item passes when I check it. | One or two items fail. | Several fail, or there's no sign of checking. |
| Intent | 5 | The site does what your intent brief said, for the audience it named, and you can say whether it solves the problem. | Partly; the audience or the problem drifted without explanation. | No intent brief, or the site doesn't connect to it. |

## Working in the loop

The same loop as every Spark, at full size:

1. **Intent and Spec:** your S09 intent brief. Keep it open; it's what you verify against.
2. **Generate:** page by page, in small requests. Ask for a plan first, every time.
3. **Verify:** each page as you finish it: the Feedback checks on every push, then keyboard, 320px, 200%, and contrast by hand.
4. **Explain:** write `final-project/NOTES.md` as you go, not the night before. Every rejected suggestion is worth a line.

Then run [`/check`](/250/skills/check/) `release` with the "done" list pasted (the **Copy** button copies it).

**Watch for:** the agent rewriting pages you've already checked when you ask for something small, styles copied into every page instead of one shared file, facts or dates it made up, and JavaScript (`AGENTS.md` rules it out here).

## Submitting

In the Learning Suite assignment **Final Project**, paste:

1. your live site's URL (`…/final-project/`), and
2. a direct link to your `final-project/` folder on GitHub.

**Graded:** the rubric above, out of 25.
