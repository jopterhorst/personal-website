# Jop ter Horst — Personal Website

A buildless personal portfolio with restrained Liquid Glass styling, expressive typography, and responsive light and dark themes.

## Design

- Floating translucent navigation and a glass note layered over the current portrait.
- Manrope and DM Sans paired with Instrument Serif for expressive headings.
- Original project artwork made in CSS, three featured projects, a compact public project archive, an expandable career timeline, and seven connected expertise areas, led by business problem-solving.
- Subtle hover effects with support for reduced motion, visible keyboard focus, and a skip link.
- System-aware theme selection with a saved manual preference.
- Privacy-conscious local time using `Europe/Amsterdam`, including daylight saving time. No schedules or availability are inferred.

## Local preview

From this folder, run:

```sh
python3 -m http.server 8080
```

Open [localhost:8080](http://localhost:8080). No package installation or build is needed.

## Files

- `index.html`: content, navigation, project cards, experience, and contact links.
- `styles.css`: typography, layout, themes, project illustrations, and responsive behavior.
- `script.js`: theme preference, Amsterdam local time, and active section navigation.
- `assets/profile-photo.png`: current portrait supplied by Jop.
- `favicon.svg`: site icon.

Fonts load from Google Fonts with local system fallbacks. All other visual elements are local. Deployment remains compatible with the repository’s existing static hosting configuration; see `CLOUDFLARE_DEPLOYMENT.md`.

The original portfolio was developed with Claude Sonnet 4. The October 2026 content update uses the owner’s supplied professional brief and verified public repositories.

## Content and privacy

The current role is **Manager, Technical Account Management** at Siemens Digital Industries Software (Mendix), covering the Benelux from September 2026. The previous role is displayed as **Technical Account Manager**, with the EMEA partner scope in its description, and ends in September 2026. Both roles are grouped under Siemens, with a connected role timeline. CLEVR roles remain available in a native, keyboard-accessible disclosure with their original dates.

Career and certification facts come from the owner’s October 2026 brief. Public project copy is grounded in the linked repositories. The internal GenAI tooling entry and schedule-based activity status were removed for privacy. No internal financial results or customer details are published. Content stays in semantic HTML so it is readable without JavaScript; JavaScript is reserved for theme, clock, and navigation behavior.

Canonical, Open Graph, and Person structured metadata use `https://jopterhorst.nl/`. Existing Cloudflare static deployment files are unchanged.

## Central narrative

The site leads with turning business problems into working solutions. The Approach section describes AI as an accelerator of an existing development and architecture background, followed by a personal perspective on the discipline needed to operate enterprise software. Projects come before the career timeline as concrete examples of that approach.

Intelligence Center X wording is based on [Siemens’ official public product page](https://www.siemens.com/en-gb/products/intelligence-center-x/) and [public announcement](https://news.siemens.com/en-us/siemens-intelligence-center-x/). Product descriptions remain distinct from Jop’s personal views; no project delivery or production experience with Graph Studio or AI Studio is claimed.

The five public projects are retained: Audio Recorder, Audio Transcription, ProPresenter Import, Kefas Bridge and the CTF Archive. Digital Product Passport stays removed at the owner’s request. Project copy explains the problem, the implemented solution and its practical use.
