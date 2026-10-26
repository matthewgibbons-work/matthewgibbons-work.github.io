---
title: "Astro intro and repo conversion"
description: "Your release/ folder becomes an Astro site: file-based routing, layouts, components that run at build time, and deploying under a base path."
courses: [dight340]
ready: false # true once the S10 dry run passes, with the S10 brief (PLAN.md: Build order)
session: 10
date: 2026-11-23
---

# Astro intro and repo conversion

**The big idea:** most of a site doesn't need JavaScript in the browser. Astro runs your components once, when the site is built, and ships plain HTML; you add interactivity only where it earns its place.

## In short

From today, your repo's `release/` folder is an **Astro** site, and your Release grows inside it. In Astro, the files in `src/pages/` *are* the site's addresses: `src/pages/index.astro` is the home page and `src/pages/pokedex.astro` is `/pokedex/`. That's **file-based routing**: no router to set up.

An `.astro` file has two parts. Between the `---` fences at the top is the **frontmatter**, JavaScript that runs at **build time** on your computer or on GitHub, never in the visitor's browser. It can import components and even `await fetch(…)` PokéAPI. Below the fences is the template, HTML with `{expressions}`, and the build turns it into a finished `.html` file. Visitors get the HTML with no JavaScript at all, unless you ask for some (that's islands, on Dec 2).

A **layout** is a component that wraps every page: the `<html>`, the `<head>`, the landmarks, the nav. It puts the page's own content where it says `<slot />`. Write the nav once, mark the current page with `aria-current="page"`, and every page gets it right.

One thing to get right on day one is the **base path**. Your site doesn't live at the root of `github.io`; it lives at `/dight340/release/`. A link written `href="/pokedex/"` goes to the root and 404s. Every internal link goes through Astro's `import.meta.env.BASE_URL`, which the deploy workflow sets for you. A three-line helper keeps it tidy:

```js
// src/lib/url.js
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
```

Then `<a href={url('pokedex/')}>` works at `/` in `npm run dev` and at `/dight340/release/` on GitHub Pages.

Today's **kit update** brings two changes. The deploy workflow now builds `release/` as an Astro site with the right base. And Claude switches from the **Learning** output style to **Explanatory**: it stops leaving `TODO(human)` gaps and instead explains its choices as it goes (look for `★ Insight`). You're building a whole site now, and you've shown you can write the small parts. Your job is reading every explanation and deciding.

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
<summary>This link is in your <code>release/</code> site's nav. It works in <code>npm run dev</code>. Where does it go on GitHub Pages?</summary>

To `https://<username>.github.io/pokedex/`: the root of *all* your Pages sites, not your Release. That's a 404, or someone else's page if you have a repo called `pokedex`. In dev the site lives at `/`, so the mistake hides until you deploy. Write it as `href={url('pokedex/')}`, which becomes `/dight340/release/pokedex/` once the workflow sets the base. The template's own `href="/favicon.svg"` has the same bug.

</details>

## Try it together

Everyone, in your `dight340` session (after the kit update, in a **new** session so Explanatory is on), plan mode:

```text
In try/s10/, create an Astro site with the minimal template (no git repository of its own). Add a shared layout with a nav, a home page, and a Pokédex page that lists the first 12 Pokémon from PokéAPI at build time. The site will be served from /dight340/release/, so every internal link must work under that base.
```

Ask Claude to start `npm run dev`.

**How to check it**

- **Hunt for slashes.** Search the project for `href="/` and `src="/`. Every internal link should go through `BASE_URL`.
- **View Source** on the Pokédex page (in the browser, not DevTools). Are the 12 names in the HTML? Is there any `<script>`?
- **Turn JavaScript off** (DevTools → Command menu, Cmd+Shift+P → "Disable JavaScript"), and reload. Does everything still work? Turn it back on.
- **Find the landmarks and the nav.** Is there one `<main>`, a labelled `<nav>`, and `aria-current="page"` on the current link?

**Dig deeper:** run [`/dig-deeper`](/340/skills/dig-deeper/) on the `await fetch` line in the Pokédex page's frontmatter, naming the file and line. Be ready to say *when* it runs, and how often.

<details>
<summary>What went wrong, and how we caught it</summary>

Requests like this often come back with one or more of these:

- Root-relative links (`href="/pokedex/"`) that work in dev and 404 on Pages, including the template's own favicon link.
- A `base` hard-coded in `astro.config.mjs` with the wrong repo name, or set as `/release` so dev breaks too. The deploy workflow passes the base; the config doesn't need one.
- The fetch in a `<script>` tag, so it runs in every visitor's browser, when it could have run once at build time.
- No `response.ok` check in the frontmatter, so a PokéAPI hiccup builds a page of "undefined".
- No `aria-current`, or a nav that isn't in a `<nav>`.

It looked complete in `npm run dev`. We searched for leading slashes, viewed the source, turned JavaScript off, and pushed it to see the real address.

</details>

## Links

- Astro: [Why Astro?](https://docs.astro.build/en/concepts/why-astro/), [Project structure](https://docs.astro.build/en/basics/project-structure/), [Pages](https://docs.astro.build/en/basics/astro-pages/), [Components](https://docs.astro.build/en/basics/astro-components/), [Layouts](https://docs.astro.build/en/basics/layouts/), [Routing](https://docs.astro.build/en/guides/routing/), [`base` and `BASE_URL`](https://docs.astro.build/en/reference/configuration-reference/#base), [Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- Claude Code: [Output styles](https://code.claude.com/docs/en/output-styles) (Learning and Explanatory)
- MDN: [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current), [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
