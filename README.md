# Jop ter Horst — Connected

The selected personal website, based on Version 08: an organic connection atlas with mint, plum, citrus, coral and lavender, rounded typography, vector paths and a connected career trail.

## Preview

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/. No build step or package installation is required.

## Content and behavior

- Current role: Manager, Technical Account Management at Siemens (Mendix), Benelux, since September 2026.
- The preceding Technical Account Manager role ends in September 2026.
- All seven career roles are visible, grouped by employer, above the five public projects. The supplied overlapping CLEVR dates are retained.
- Personal copy focuses on practical business problems and automation, including at church.
- Daytime/evening palette preference uses browser storage. Links and content work without JavaScript; the palette control and current-year update are progressive enhancements.
- Responsive layouts, keyboard focus and reduced-motion support. Google Fonts have system fallbacks; the portrait and all other assets are local or native SVG/CSS.

## Files

`index.html` contains the content and production metadata. `styles.css`, `script.js` and `favicon.svg` provide the selected design. The current portrait is `assets/profile-photo.png`. `_redirects` sends former comparison URLs to the homepage and retains the static fallback.

Canonical, social sharing and Person metadata use https://jopterhorst.nl/. The production page is indexable. Static Cloudflare compatibility is preserved.

## Archived explorations

Earlier designs are preserved in Git tag **archive/portfolio-designs-2026-10-10**. Version 01 is the root page at that tag; Versions 02–07 are in their respective `version-N/` directories. The tag also captures the original Version 08 comparison before promotion. These files are no longer part of the published working tree, and the footer has no comparison links.

For example, inspect a preserved source with:

```sh
git show archive/portfolio-designs-2026-10-10:version-6/index.html
```

To recover the entire archive in a separate folder:

```sh
mkdir -p /tmp/personal-website-design-archive
git archive archive/portfolio-designs-2026-10-10 | tar -x -C /tmp/personal-website-design-archive
```
