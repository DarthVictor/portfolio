# Portfolio Creation Plan

## Product direction

Build a recruiter-friendly portfolio for Senior Frontend Engineer and Senior Full-Stack Engineer roles.

Use [Brittany Chiang's portfolio](https://brittanychiang.com/) as a reference for clear hierarchy, fast scanning, professional presentation, strong typography, accessibility, and restrained animation. The site should not copy its layout or palette. It should distinguish itself through deeper case studies, visible decision records, interactive elements, and stronger full-stack evidence.

The portfolio will use `darthvictor.xyz` as its canonical domain and Vercel as its hosting platform.

## Information architecture

Primary routes:

- `/` — scannable homepage
- `/work` — complete case-study archive
- `/work/[slug]` — individual case studies
- `/work/building-this-portfolio` — transparent meta-case study
- `/cv.pdf` — downloadable CV
- Custom 404 page

The homepage will contain:

1. Introduction and current positioning
2. Selected case studies
3. Experience timeline
4. Frontend and full-stack capabilities
5. Short personal introduction
6. Contact links for email, LinkedIn, GitHub, and CV

The homepage should summarize and reinterpret professional experience instead of repeating CV bullets.

## Case-study system

Create six temporary case studies for preview-development purposes, using only facts already present in the CV:

- Tolstoy AI integrations
- Tolstoy design-system infrastructure
- Bright Data frontend performance
- Bright Data payment workflows
- Tenengroup checkout UX
- Luxoft microfrontend migration

These drafts will be clearly marked as temporary, included in Vercel preview deployments, and excluded from production builds and search indexing.

Every case study should support:

- Situation and problem
- Role and scope
- Constraints
- UX and technical decisions
- Alternatives considered
- Implementation approach
- Frontend and backend responsibilities
- Measurable outcomes
- Tradeoffs and lessons
- Technologies used

The public launch gate will require at least four reviewed case studies: two frontend or UX stories, one architecture story, and one full-stack or integration story.

## Development decisions

Show decision-making in two complementary ways:

- Structured decision blocks inside professional case studies
- A "Building this portfolio" meta-case study documenting the portfolio's own UX and engineering choices

Decision records should capture:

- Context
- Options considered
- Selected approach
- Reasoning
- Tradeoffs
- Result or validation status

The portfolio decision page should be updated throughout development so that the site itself becomes evidence of engineering judgment.

## Visual and interaction design

Use a dark-first design with a polished light theme:

- Distinctive charcoal or ink dark palette
- Warm neutral light palette
- Violet or cobalt accent color
- Self-hosted variable sans-serif and monospace fonts
- Consistent spacing, typography, color, radius, and motion tokens
- Desktop split layout and conventional stacked mobile layout
- System-aware theme selection saved locally
- No visible theme flash during page load
- Reduced-motion support

Interactions should remain purposeful:

- Clear hover and keyboard-focus states
- Subtle entrance and navigation transitions
- Case-study filters by discipline and technology
- Reading progress on long case studies
- Small interactive demonstrations where they clarify a decision
- No custom cursor, scroll hijacking, or distracting decorative animation

## Technical architecture

Use:

- Astro with strict TypeScript
- MDX for case studies and future articles
- Astro content collections with validated frontmatter
- React islands only for genuinely interactive features
- Custom CSS with design tokens and scoped component styles
- No large UI component library
- Optimized local images and fonts
- Static generation for speed and low hosting cost

Core content collections:

- `work` — professional case studies and the portfolio meta-case study
- `decisions` — reusable decision records
- `writing` — future technical articles

The Writing section should remain absent from navigation until its first real article is published. Its schema, typography, metadata, and shared MDX components should be compatible with the case-study system from the beginning.

## Content interfaces

Case-study metadata should include:

- Title, summary, and slug
- Employer label, role, and period
- Disciplines and technologies
- Featured order
- Draft and publication status
- Cover visual
- SEO description
- Confidentiality or anonymization note

Draft visibility will be controlled at build time:

- Vercel previews include drafts
- Production excludes drafts from listings and generated routes
- Draft pages use `noindex` as an additional safeguard

## Accessibility, performance, and SEO

Acceptance targets:

- WCAG 2.2 AA fundamentals
- Full keyboard navigation and visible focus
- Skip link and semantic landmarks
- Correct heading structure
- Accessible theme toggle and interactive controls
- Verified contrast in both themes
- Lighthouse targets of 95 or higher
- Minimal layout shift and browser JavaScript
- Responsive behavior from small phones through wide desktop screens

SEO should include canonical URLs, Open Graph images, sitemap, robots rules, structured person and work metadata, and meaningful page titles.

## Testing

Automated verification should cover:

- Astro and TypeScript validation
- Content-schema validation
- Homepage and case-study navigation
- Draft exclusion from production
- Theme selection and persistence
- Keyboard interaction
- Mobile, tablet, and desktop layouts
- Broken internal links
- Custom 404 behavior
- Accessibility scans
- Production build

Manual QA should verify visual hierarchy, both themes, reduced motion, long-form readability, touch behavior, and major browsers.

## Deployment and cost

- Connect the existing GitHub repository to Vercel
- Use Vercel preview deployments for development and draft reviews
- Deploy production from the main branch
- Connect `darthvictor.xyz` after the real-content launch gate is met
- Configure HTTPS, canonical-domain redirects, and DNS
- Use Vercel Hobby at no monthly cost under normal personal-portfolio usage

Domain renewal should be the only expected recurring cost.

## Delivery sequence

- [x] 1. Establish Astro, MDX, content schemas, and quality tooling
- [x] 2. Build the homepage's semantic, responsive markup
- [x] 3. Define visual tokens and build both themes
- [x] 4. Review the homepage UI in both themes and at mobile, tablet, and desktop sizes
- [x] 5. Build the work archive and reusable case-study template
- [ ] 6. Add six preview-only draft case studies
- [ ] 7. Add the portfolio decision log and meta-case study
- [ ] 8. Add interactions, accessibility, SEO, and analytics
- [ ] 9. Complete automated and visual QA
- [ ] 10. Replace drafts with real content, connect `darthvictor.xyz`, and launch
