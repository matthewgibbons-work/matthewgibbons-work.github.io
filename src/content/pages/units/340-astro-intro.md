---
title: "Astro intro and repo conversion"
description: "Your final-project/ folder becomes an Astro site: file-based routing, layouts, components that run at build time, and deploying under a base path."
courses: [dight340]
ready: false # true once the S10 dry run passes, with the S10 brief (PLAN.md: Build order)
session: 10
date: 2026-11-23
---

# Astro intro and repo conversion

**The big idea:** most of a site doesn't need JavaScript in the browser. Astro runs your components once, when the site is built, and ships plain HTML; you add interactivity only where it earns its place.

## In short

Astro runs your components once, when the site is built, and ships plain HTML: the files in `src/pages/` are the site's pages, and a layout wraps them all. For S10 you need your `final-project/` folder turned into a deployed Astro site with a layout, a home page, and one page of real data fetched at build time, with every internal link going through `BASE_URL` so it works at `/dight340/final-project/`.

## How it works

**Pages are files.** `src/pages/index.astro` is the home page and `src/pages/pokedex.astro` is `/pokedex/`. That's **file-based routing**: no router to set up.

**Build time.** An `.astro` file has two parts. Between the `---` fences at the top is the **frontmatter**, JavaScript that runs at build time on your computer or on GitHub, never in the visitor's browser. It can import components and even `await fetch(…)` PokéAPI. Below the fences is the template, HTML with `{expressions}`, and the build turns it into a finished `.html` file with no JavaScript at all, unless you ask for some (that's islands, on Dec 2).

**Layouts.** A layout wraps every page: the `<html>`, the `<head>`, the landmarks, the nav. It puts the page's own content where it says `<slot />`. Write the nav once, mark the current page with `aria-current="page"`, and every page gets it right.

**The base path.** Your site lives at `/dight340/final-project/`, not the root of `github.io`, so `href="/pokedex/"` 404s. Every internal link goes through `import.meta.env.BASE_URL`, which the deploy workflow sets for you. A three-line helper keeps it tidy:

```js
// src/lib/url.js
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
```

Then `<a href={url('pokedex/')}>` works at `/` in `npm run dev` and at `/dight340/final-project/` on GitHub Pages.

**The kit update.** The deploy workflow now builds `final-project/` as an Astro site with the right base. And Claude switches from the **Learning** output style to **Explanatory**: it stops leaving `TODO(human)` gaps and explains its choices as it goes (look for `★ Insight`). Your job is reading every explanation and deciding.

<figure class="diagram">
<svg class="d-wide" viewBox="0 0 640 180" role="img" aria-labelledby="astro-wide-title">
<title id="astro-wide-title">At build time, astro build runs each page's frontmatter in Node, including any fetch to PokéAPI, and writes finished HTML files to dist. GitHub Pages serves those files. In the browser, the visitor gets HTML only, with no JavaScript unless a component is made an island.</title>
<defs><marker id="arrow-wide" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text class="d-muted" x="160" y="20" text-anchor="middle">build time (on GitHub)</text>
<text class="d-muted" x="530" y="20" text-anchor="middle">in the browser</text>
<rect class="d-box" x="4" y="34" width="140" height="70" rx="6" />
<text class="d-code" x="74" y="62" text-anchor="middle">src/pages/</text>
<text class="d-muted" x="74" y="84" text-anchor="middle">.astro files</text>
<line class="d-line" x1="144" y1="69" x2="174" y2="69" marker-end="url(#arrow-wide)" />
<rect class="d-key" x="176" y="34" width="150" height="70" rx="6" />
<text class="d-code" x="251" y="62" text-anchor="middle">astro build</text>
<text class="d-muted" x="251" y="84" text-anchor="middle">frontmatter runs</text>
<line class="d-line" x1="326" y1="69" x2="356" y2="69" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="358" y="34" width="110" height="70" rx="6" />
<text class="d-code" x="413" y="62" text-anchor="middle">dist/</text>
<text class="d-muted" x="413" y="84" text-anchor="middle">.html files</text>
<line class="d-line" x1="468" y1="69" x2="498" y2="69" marker-end="url(#arrow-wide)" />
<rect class="d-box" x="500" y="34" width="132" height="70" rx="6" />
<text x="566" y="62" text-anchor="middle">The page</text>
<text class="d-muted" x="566" y="84" text-anchor="middle">HTML, no JS</text>
<line class="d-line" x1="251" y1="104" x2="251" y2="136" marker-start="url(#arrow-wide)" />
<text class="d-muted" x="251" y="158" text-anchor="middle"><tspan class="d-code">await fetch(…)</tspan> to PokéAPI happens here, once</text>
<line class="d-line" x1="482" y1="30" x2="482" y2="112" stroke-dasharray="4 4" />
</svg>
<svg class="d-narrow" viewBox="0 0 262 360" role="img" aria-labelledby="astro-narrow-title">
<title id="astro-narrow-title">At build time, astro build runs each page's frontmatter in Node, including any fetch to PokéAPI, and writes finished HTML files to dist. GitHub Pages serves those files. In the browser, the visitor gets HTML only, with no JavaScript unless a component is made an island.</title>
<defs><marker id="arrow-narrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="d-arrow" d="M0,0 L8,4 L0,8 z" /></marker></defs>
<text class="d-muted" x="4" y="16">build time (on GitHub)</text>
<rect class="d-box" x="4" y="26" width="190" height="56" rx="6" />
<text class="d-code" x="99" y="50" text-anchor="middle">src/pages/</text>
<text class="d-muted" x="99" y="70" text-anchor="middle">.astro files</text>
<line class="d-line" x1="99" y1="82" x2="99" y2="102" marker-end="url(#arrow-narrow)" />
<rect class="d-key" x="4" y="104" width="190" height="56" rx="6" />
<text class="d-code" x="99" y="128" text-anchor="middle">astro build</text>
<text class="d-muted" x="99" y="148" text-anchor="middle">frontmatter, fetch</text>
<line class="d-line" x1="99" y1="160" x2="99" y2="180" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="182" width="190" height="56" rx="6" />
<text class="d-code" x="99" y="206" text-anchor="middle">dist/</text>
<text class="d-muted" x="99" y="226" text-anchor="middle">.html files</text>
<line class="d-line" x1="4" y1="256" x2="258" y2="256" stroke-dasharray="4 4" />
<text class="d-muted" x="4" y="276">in the browser</text>
<line class="d-line" x1="99" y1="238" x2="99" y2="284" marker-end="url(#arrow-narrow)" />
<rect class="d-box" x="4" y="286" width="190" height="56" rx="6" />
<text x="99" y="310" text-anchor="middle">The page</text>
<text class="d-muted" x="99" y="330" text-anchor="middle">HTML, no JS</text>
</svg>
<figcaption>Everything before the dashed line happens once, when the site is built. Visitors only ever get the finished HTML, so a page that fetched PokéAPI at build time loads instantly and works with JavaScript off.</figcaption>
</figure>

## Predict, then reveal

```astro
<a href="/pokedex/">Pokédex</a>
```

<details>
<summary>This link is in your <code>final-project/</code> site's nav. It works in <code>npm run dev</code>. Where does it go on GitHub Pages?</summary>

To `https://<username>.github.io/pokedex/`: the root of *all* your Pages sites, not your Final Project. That's a 404, or someone else's page if you have a repo called `pokedex`. In dev the site lives at `/`, so the mistake hides until you deploy. Write it as `href={url('pokedex/')}`, which becomes `/dight340/final-project/pokedex/` once the workflow sets the base. The template's own `href="/favicon.svg"` has the same bug.

</details>

<details>
<summary>Your Pokédex page's frontmatter does <code>await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')</code>. A hundred people open the page. How many times does that fetch run?</summary>

None of those hundred times. It ran once, when GitHub built the site, and the 12 names are already in the HTML they download. That's why View Source shows the names and no `<script>`, and why the page works with JavaScript off. It also means the list only changes when the site is rebuilt: fine for a Pokédex, wrong for anything that has to be live (that's what islands are for).

</details>

## Try it together

Pair programming, with the whole class, after the kit update (in a **new** session, so Explanatory is on). I drive Claude Code on the projector; you navigate. After each step you read the output and its `★ Insight`s with me, decide whether to keep it or revise it, and say what to ask for next. Your own run comes in studio, with S10.

We start here, in plan mode:

```text
In try/s10/, create an Astro site with the minimal template (no git repository of its own). Add a shared layout with a nav, a home page, and a Pokédex page that lists the first 12 Pokémon from PokéAPI at build time. The site will be served from /dight340/final-project/, so every internal link must work under that base.
```

Then we put it under pressure, one step at a time. Each time, the question is what *our* code does, and which line does it:

- **Hunt for slashes.** Search the project for `href="/` and `src="/`. Does every internal link go through `BASE_URL`?
- **View Source** on the Pokédex page (in the browser, not DevTools). Are the 12 names in the HTML? Is there any `<script>`?
- **Turn JavaScript off** (DevTools → Command menu, Cmd+Shift+P → "Disable JavaScript"), and reload. Does everything still work?
- **Find the landmarks and the nav.** One `<main>`, a labelled `<nav>`, and `aria-current="page"` on the current link?

**Dig deeper:** we run [`/dig-deeper`](/340/skills/dig-deeper/) on the `await fetch` line in the Pokédex page's frontmatter. Answer its predict question before the reveal.

**On your own:** if you missed class or want another pass, do the kit update (S10, step 0), open a new session, run the starting prompt above, try the same four pressure tests, and answer the questions in the box below.

<details>
<summary>Questions to ask your output</summary>

Use these in studio on your own S10, out loud or to Claude:

- Where does every internal link get its base from? Is there one that doesn't?
- When does the PokéAPI fetch run, and how often?
- Is a `base` set in `astro.config.mjs`? Why doesn't it need one?
- What happens to the build if PokéAPI answers with an error? Which line checks?
- Which element marks the current page in the nav?

**Watch for:** root-relative links (`href="/pokedex/"`) that work in dev and 404 on Pages, including the template's own favicon link; a `base` hard-coded in `astro.config.mjs` (the workflow passes it); the fetch in a `<script>` tag, so it runs in every visitor's browser; no `response.ok` check, so a PokéAPI hiccup builds a page of "undefined"; no `aria-current`, or a nav that isn't in a `<nav>`.

</details>

## Links

- Astro: [Why Astro?](https://docs.astro.build/en/concepts/why-astro/), [Project structure](https://docs.astro.build/en/basics/project-structure/), [Pages](https://docs.astro.build/en/basics/astro-pages/), [Components](https://docs.astro.build/en/basics/astro-components/), [Layouts](https://docs.astro.build/en/basics/layouts/), [Routing](https://docs.astro.build/en/guides/routing/), [`base` and `BASE_URL`](https://docs.astro.build/en/reference/configuration-reference/#base), [Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- Claude Code: [Output styles](https://code.claude.com/docs/en/output-styles) (Learning and Explanatory)
- MDN: [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current), [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
