<!-- Hướng dẫn Copilot / AI cho MinHy-s-Portfolio -->

## Purpose

This file gives concise, project-specific guidance to an AI coding agent to be immediately productive in the MinHy-s-Portfolio repository (a static personal portfolio site).

## Quick facts

- Project type: Static website (HTML, CSS, JS). No build tool or package manifest detected.
- Primary entry: `index.html` (root). Main client script: `index.js`.
- Style structure: `css/` with global files (`main.css`, `responsive.css`, `theme.css`) and per-section files under `css/sections/` (e.g. `about-me.css`).
- Assets: `assets/` (images, `assets/icons/` vector icons).

## Big picture & intent

- This repo is a single-page portfolio. The HTML contains semantic sections with IDs (e.g. `#about`, `#job`, `#projects`) that map directly to section CSS files in `css/sections/`.
- JavaScript is intentionally minimal: a small scroll-reveal implementation and a hamburger menu. Keep client-side changes small and unobtrusive.

## Key files to reference (examples)

- `index.html` — top-level structure, section IDs, and the primary markup patterns (BEM-like classes such as `about-hero__content`). Use this to find where to add new content or markup.
- `index.js` — global scroll behavior (adds `active` to `.reveal` elements on scroll). If you modify reveal behaviour, update both `index.js` and any `.reveal` usage in HTML.
- `css/main.css`, `css/responsive.css` — global layout and responsive rules.
- `css/sections/*.css` — per-section styles. When adding a new section, add a new file here and import it from `index.html` (or add to `main.css` if it's very small).
- `assets/icons/` — small SVG icons used in the nav and skill list (e.g. `minhhylogo.svg`). Use existing icons for consistency.

## Conventions and patterns (discoverable)

- Section wiring: Create a <section class="section" id="<name>"> in `index.html`, then add corresponding styles in `css/sections/<name>.css`.
- Class style: Many classes follow a BEM-ish pattern (e.g. `about-hero__content`, `project__meta`). Follow this when naming new classes.
- Reveal pattern: Elements intended to animate on scroll use class `reveal` and are observed by an IntersectionObserver in `index.html` and a scroll listener in `index.js`. To add reveal behavior add `reveal` to markup — no additional JS wiring is normally needed.
- Accessibility: Hamburger button uses `aria-expanded`. When toggling menus, maintain/update `aria-*` attributes.

## Developer workflows (how to run/debug)

- Local preview: This repo has no build step — open `index.html` in a browser. For a local static server (recommended), run a simple HTTP server from the repo root. Example (PowerShell):

```powershell
# from repository root
python -m http.server 8000
# then open http://localhost:8000/
```

- Editing CSS: Prefer adding per-section CSS in `css/sections/` instead of modifying `main.css` for easier isolation and future maintenance.
- Debugging JS: Small scripts are inline in `index.html` and external in `index.js`. Use the browser devtools to set breakpoints in `index.js` or inspect DOM changes (e.g. `.reveal`/`.active` toggles).

## Integration points & external dependencies

- No external build dependencies found (no `package.json`). The site currently links only to local assets and pages.
- External links: projects reference external GitHub URLs; make sure external anchors use `rel="noopener"` and `target="_blank"` as currently used.

## When creating changes, follow this minimal checklist

1. Update `index.html` for markup (add section, nav link, and IDs). Keep language/strings consistent (Vietnamese is used in many places).
2. Add styles in `css/sections/<section>.css` and import or reference it from `index.html` (keep ordering consistent with other section CSS files).
3. If behavior is needed (menu/reveal), prefer reusing `index.js` patterns; otherwise add a small external script and include it after `index.js`.
4. Run the local static server and verify visually (mobile and desktop) and in devtools for JS errors.

## Examples to copy from

- Adding a nav link: follow the nav structure in `index.html` (anchors that point to section IDs). Keep the brand anchor using `assets/icons/minhhylogo.svg`.
- Reveal usage: add `class="section reveal"` or add `reveal` to elements that should animate; the existing IntersectionObserver will handle them.

## Notes & constraints

- Do not add or assume a Node toolchain. If you need to add build tooling, propose it explicitly and include a migration plan (this repo currently expects plain static files).
- Keep changes minimal and reversible — the project is a small personal portfolio and readability/consistency are priorities.

## If something is unclear

- Ask which deployment target the user prefers (GitHub Pages is the natural fit). Also ask whether they want a Node-based dev-server / build pipeline added.

End of file
