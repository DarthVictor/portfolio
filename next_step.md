# Visual tokens and responsive homepage themes

## Summary

Implement the specified dark-first, static portfolio presentation with complete
system-aware light-theme support. Use system font stacks only; no font binaries,
licenses, external font requests, JavaScript, dependencies, navigation, or
content changes.

## Key changes

- Add `src/styles/global.css`, imported in `src/pages/index.astro` frontmatter.
  Define dark tokens on `:root` and `:root[data-theme="dark"]`; define light
  tokens for both system preference without an attribute and `data-theme="light"`,
  including matching `color-scheme`.
- Add the requested semantic color, spacing, radius, shadow, typography, and
  motion tokens; set reduced-motion durations to `0ms`. Define system sans and
  mono stacks with `ui-sans-serif`/`system-ui` and `ui-monospace` fallbacks,
  respectively.
- Add the global reset, document colors, typography defaults, link states,
  focus-visible treatment, and safe overflow handling.
- Add presentation classes and scoped page styles while preserving all existing
  text, six sections, source order, heading levels, links, and `<time>` markup.
- Build the mobile-first, max-`72rem` single-column layout; at `64rem`, switch
  `main` to a two-column grid with the introduction in the left column and all
  later sections in the right column.
- Style selected work as non-interactive cards, experience as an ordered-list
  timeline with decorative CSS markers, capabilities as grouped panels, and
  contact links as wrapping text links/pills. Use token-only colors and avoid
  gradients, animation, decorative imagery, and implied-card click affordances.

## Test plan

- Extend `tests/output.test.mjs` to assert a compiled stylesheet is linked, no
  client-side JavaScript is emitted, and the existing `h1`, six sections,
  heading order, and CV output remain intact.
- Run formatting, linting, unit tests, static build, and output tests. The
  current baseline reaches Biome successfully but fails because
  `tests/output.test.mjs` has nonconforming line endings; the implementation
  will format the touched test file as part of the required formatting pass.
- Smoke-check dark/light system selection and explicit `data-theme` overrides
  without client-side code; inspect the static page at 320px, 768px, 1024px,
  and 1440px for focus visibility, reading measure, source order, and horizontal
  overflow.

## Assumptions

- System-font-only is the approved revision; `@font-face` rules and
  `public/fonts/` assets are deliberately omitted.
- The introduction will remain non-sticky to keep this first presentation pass
  restrained; the desktop split layout still places it in the narrower left
  column.
- No new browser test tooling will be added; visual checks remain manual and
  bounded to implementation defects, with final visual sign-off deferred as
  specified.
