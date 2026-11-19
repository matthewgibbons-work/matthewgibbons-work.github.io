---
title: "Astro intro and repo conversion"
description: "Your practice site becomes an Astro site: file-based routing, layouts, components that run at build time, and deploying under a base path."
courses: [dight340]
ready: false # true once the S10 dry run passes, with the S10 brief (PLAN.md: Build order)
session: 10
date: 2026-11-23
sticky_assignments: true # experiment 6, kept Nov 13 (PLAN.md, "Experiments")
---

# Astro intro and repo conversion

<details>
<summary>Key takeaways</summary>

- **Most of a site doesn't need JavaScript in the browser.** Astro runs your components once, when the site is built, and ships plain HTML.
- **Pages are files:** `src/pages/berries.astro` is `/berries/`. No router to set up.
- **A layout is written once** (the `<html>`, `<head>`, nav, and `<main>`), and each page's content goes where it says `<slot />`.
- **The frontmatter runs at build time.** A `fetch` there runs once, on GitHub, and its results are in the HTML. Check `response.ok`, so a bad answer stops the build instead of shipping "undefined".
- **Every internal link goes through `import.meta.env.BASE_URL`.** `href="/…"` works in dev and 404s on GitHub Pages.
- **Today's Spark puts it to work.** S10 starts your Astro practice site, after the Nov 23 kit update; your Final Project's milestone 2 repeats it.

</details>

## How it works

**Pages are files.** `src/pages/index.astro` is the home page and `src/pages/first-twelve.astro` is `/first-twelve/`. That's **file-based routing**: no router to set up.

**Build time.** An `.astro` file has two parts. Between the `---` fences at the top is the **frontmatter**, JavaScript that runs at build time on your computer or on GitHub, never in the visitor's browser. It can import components and even `await fetch(…)` PokéAPI. Below the fences is the template, HTML with `{expressions}`, and the build turns it into a finished `.html` file with no JavaScript at all, unless you ask for some (that's islands, on Dec 2).

**Layouts.** A layout wraps every page: the `<html>`, the `<head>`, the landmarks, the nav. It puts the page's own content where it says `<slot />`. Write the nav once, mark the current page with `aria-current="page"`, and every page gets it right.

**The base path.** Your site lives at `/dight340/sparks/astro-practice/` (and your Final Project at `/dight340/final-project/`), not the root of `github.io`, so `href="/first-twelve/"` 404s. Every internal link goes through `import.meta.env.BASE_URL`, which the deploy workflow sets for you. A three-line helper keeps it tidy:

```js
// src/lib/url.js
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
```

Then `<a href={url('first-twelve/')}>` works at `/` in `npm run dev` and at `/dight340/sparks/astro-practice/` on GitHub Pages.

**The kit update.** The deploy workflow now builds any folder with an Astro config (your practice site, then `final-project/`) as an Astro site with the right base. And Claude switches from the **Learning** output style to **Explanatory**: it stops leaving `TODO(human)` gaps and explains its choices as it goes (look for `★ Insight`). Your job is reading every explanation and deciding.

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

## At a glance

The syntax on this page in one place.

| Syntax | Example | What it does |
| --- | --- | --- |
| `src/pages/` | `src/pages/berries.astro` | Each file is a page at its own URL, here `/berries/` |
| `---` fences | `---` … `---` at the top of a `.astro` file | The frontmatter: JavaScript that runs at build time, never in the visitor's browser |
| `{expression}` | `{berries.map((berry) => <li>{berry.name}</li>)}` | Puts build-time values into the HTML |
| `await fetch()` in the frontmatter | `const response = await fetch(api);` | Fetches once, when the site is built; the results are in the HTML |
| `response.ok` | `if (!response.ok) throw new Error(…);` | Stops the build on an error answer instead of shipping a broken page |
| `src/layouts/` + `<slot />` | `<main><slot /></main>` | One layout for every page; each page's content goes in the slot |
| `Astro.props` | `const { title } = Astro.props;` | What a page passes to the layout: `<Base title="Berries">` |
| `aria-current="page"` | `<a href={url('berries/')} aria-current="page">` | Marks the nav link for the page you're on |
| `import.meta.env.BASE_URL` | `/dight340/sparks/astro-practice/` | Where the site lives; the deploy workflow sets it, so there's no `base` in `astro.config.mjs` |
| `url()` helper | `href={url('berries/')}` | Puts the base in front of every internal link and asset |

## Live demo

The whole class, one site: we step through it on the projector, and you call each change before it appears. The site is a "Berry guide" built on [PokéAPI's berries](https://pokeapi.co/api/v2/berry?limit=12): a home page and a list of twelve berries. It's already an Astro project, but every page stands alone: each is a whole HTML document with its own copy of the nav, the list arrives from a `<script>` in the browser behind "Loading…" (so it's blank with JavaScript off), and every link starts with `/`. There's no Playground for Astro, so the slides are the demo. Each preview is that step's site, built once, with its base set to where the preview lives. That's why the root-relative links break inside the preview until step 4.

<div data-slides="340-s10"><p>The slides need JavaScript. Every step is in the demo script below.</p></div>

<details>
<summary>Demo script</summary>

Each step says which file changes and what to look for in the preview.

1. **One layout.** Both pages carry their own `<html>`, `<head>`, and nav. Add `src/layouts/Base.astro`:

   ```astro
   ---
   const { title } = Astro.props;
   ---
   <!doctype html>
   <html lang="en">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>{title} · Berry guide</title>
   </head>
   <body>
     <nav aria-label="Site">
       <ul>
         <li><a href="/">Home</a></li>
         <li><a href="/berries/">Berries</a></li>
       </ul>
     </nav>
     <main>
       <slot />
     </main>
   </body>
   </html>
   ```

   Then `src/pages/index.astro` keeps only its own content:

   ```astro
   ---
   import Base from '../layouts/Base.astro';
   ---
   <Base title="Home">
     <h1>Berry guide</h1>
     <p>Every berry a trainer can grow, for players planning a garden.</p>
   </Base>
   ```

   The preview looks the same. The difference is in the files: the nav now lives in one place.

2. **The second page, with no copying.** `src/pages/berries.astro` drops its `<html>`, `<head>`, and nav and wraps its content in `<Base title="Berries">`, the same way. Its `<script>` stays for now. The tab title says "Berries · Berry guide": that's `Astro.props`.

3. **Fetch once, at build time.** Move the fetch out of the `<script>` and above the fence:

   ```astro
   ---
   import Base from '../layouts/Base.astro';

   const response = await fetch('https://pokeapi.co/api/v2/berry?limit=12');
   if (!response.ok) throw new Error(`PokéAPI answered ${response.status}`);
   const { results: berries } = await response.json();
   ---
   <Base title="Berries">
     <h1>Berries</h1>
     <ul>
       {berries.map((berry) => <li>{berry.name}</li>)}
     </ul>
   </Base>
   ```

   No "Loading…": the names are in the page when it arrives. If PokéAPI answers with an error, the build stops with that message instead of shipping a page of "undefined".

4. **Every link through `BASE_URL`.** Click Berries in the step 3 preview: it leaves this site for the root of the server. Add `src/lib/url.js`:

   ```js
   export const url = (path = '') =>
     `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
   ```

   Then, in the layout, `import { url } from '../lib/url.js';` in the frontmatter, and the nav becomes:

   ```astro
   <li><a href={url()}>Home</a></li>
   <li><a href={url('berries/')}>Berries</a></li>
   ```

   Click Berries in the preview now: it stays inside the site. On GitHub Pages, the same line becomes `/dight340/sparks/astro-practice/berries/`.

5. **JavaScript off, View Source.** Open [the finished Berries page](/sandbox/340-s10/slides/preview/04/berries/) in its own tab, then View Source (Cmd Option U): all twelve names are in the HTML, and there's no `<script>`. Turn JavaScript off (DevTools → Cmd Shift P → "Disable JavaScript") and reload: the page still reads.

</details>

**On your own:** in your own practice site, after S10 (a few minutes each):

- Run `npm run build` and open `dist/`. Which files did Astro write, and is there a `.js` file anywhere?
- Break your data URL on purpose (add a letter) and run `npm run build`. What does your `response.ok` check say, and does a page still get built?
- Add a third page with a `.astro` file in `src/pages/` and a link in the layout's nav. How many files did you change?

## Links

- Astro: [Why Astro?](https://docs.astro.build/en/concepts/why-astro/), [Project structure](https://docs.astro.build/en/basics/project-structure/), [Pages](https://docs.astro.build/en/basics/astro-pages/), [Components](https://docs.astro.build/en/basics/astro-components/), [Layouts](https://docs.astro.build/en/basics/layouts/), [Routing](https://docs.astro.build/en/guides/routing/), [`base` and `BASE_URL`](https://docs.astro.build/en/reference/configuration-reference/#base), [Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- Claude Code: [Output styles](https://code.claude.com/docs/en/output-styles) (Learning and Explanatory)
- MDN: [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current), [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
- Dig deeper: run [`/dig-deeper`](/340/skills/dig-deeper/) on the `await fetch` line in your practice site's data page. Answer its predict question before the reveal.
