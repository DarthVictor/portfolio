# Next implementation step: Homepage markup

## Summary

Build the homepage's semantic, responsive structure before applying visual tokens, themes, navigation, animations, or interactive islands. The result should establish the final information hierarchy without committing to the final visual design.

## Implementation changes

- Replace the minimal homepage with semantic sections for the introduction and positioning, selected work, experience, capabilities, personal introduction, and contact links.
- Use one descriptive `h1`, ordered section headings, `<main>`, `<section>`, and appropriate lists or timeline markup.
- Create small reusable Astro components only where they represent a distinct homepage section. Keep all components server-rendered.
- Use concise structural copy and labels; do not add draft case studies, invented outcomes, final visual assets, or interactive controls.
- Make the markup responsive through a simple single-column document flow. Desktop layout, responsive navigation, and visual styling are deferred to later steps.

## Verification

- Confirm the homepage builds as static HTML with no client-side JavaScript references.
- Check that the page has exactly one `h1`, logical heading order, and semantic landmarks.
- Check the unstyled structure at narrow and wide viewport widths for readable source order and no horizontal overflow.

## Deferred

- Design tokens, dark and light themes, typography, spacing, animation, and theme persistence.
- Global navigation, work routes, case-study content, CV publication, SEO metadata beyond the existing page description, and browser end-to-end tests.
