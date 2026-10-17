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
