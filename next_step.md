# Six preview-only draft case studies

## Roadmap status

- [x] Delivery step 1: Astro, MDX, content schemas, and quality tooling
- [x] Delivery step 2: semantic, responsive homepage markup
- [x] Delivery step 3: visual tokens and dark/light themes
- [x] Delivery step 4: responsive homepage visual review
- [x] Delivery step 5: work archive and reusable case-study system
- [ ] Delivery step 6: six preview-only draft case studies

## Goal

Complete delivery step 6 from `PORTFOLIO_PLAN.md`: add the six temporary case studies to the `work` content collection, expose them in local development and preview builds, and keep them absent from production listings, routes, and search indexing.

These drafts are evidence-gathering and review artifacts, not publishable claims. Every factual statement must be traceable to `CV.md` or explicitly confirmed by Victor. Unknown context must remain a visible validation question rather than being inferred.

## Completed foundation

- [x] Static `/work` archive with an intentional production empty state
- [x] Static `/work/[slug]` route generation from visible content entries
- [x] Shared work filtering, sorting, and path helpers
- [x] Reusable archive card, case-study layout, and structured decision block
- [x] Draft labels and `noindex, nofollow` support
- [x] Route-safe shared navigation
- [x] Unit coverage for filtering, ordering, and path generation
- [x] Generated-output coverage for the archive, navigation, and zero client-side JavaScript
- [x] Responsive visual review of the empty archive in both palettes
- [x] Removal of the pinned `packageManager` version while retaining `engines.pnpm: 11.x`

## Next-step plan

### 1. Build an evidence matrix before writing prose

- [ ] Create one evidence record for each of the six planned case studies, citing the exact supporting lines in `CV.md` and the relevant homepage summary.
- [ ] Record only supported employer, dates, role, technologies, responsibilities, and outcomes.
- [ ] Collect unresolved questions for situation, constraints, alternatives, ownership boundaries, trade-offs, and lessons.
- [ ] Ask Victor to validate the gaps that materially affect the story before turning them into narrative claims.

The six required drafts are:

1. Tolstoy AI integrations
2. Tolstoy design-system infrastructure
3. Bright Data frontend performance
4. Bright Data payment workflows
5. Tenengroup checkout UX
6. Luxoft microfrontend migration

### 2. Add schema-valid MDX drafts

- [ ] Create exactly six flat `src/content/work/*.mdx` entries using stable entry IDs as route slugs.
- [ ] Mark every entry `draft: true` and provide complete schema metadata.
- [ ] Assign deterministic featured ordering without changing production output.
- [ ] Structure each draft around situation, role, constraints, decisions, alternatives, implementation, responsibilities, outcomes, and lessons only where evidence exists.
- [ ] Mark unsupported sections as editorial validation questions.
- [ ] Use `DecisionBlock` only when context, choice, reasoning, trade-off, and validation status are supported.
- [ ] Add restrained local cover placeholders that contain no confidential or invented product details and reserve their rendered aspect ratio.

### 3. Connect preview-only discovery

- [ ] Show all six entries on `/work` in development and preview builds.
- [ ] Decide how the three grouped homepage work summaries map to six case studies: choose one primary link per card or expose multiple case-study links. Do not choose this mapping implicitly.
- [ ] After the mapping is approved, resolve homepage links against the visible work entries so production cannot emit links to excluded draft routes.
- [ ] Keep the production `/work` empty state until reviewed content is approved for publication.

### 4. Add production-versus-preview verification

- [ ] Add a repeatable preview-build command or test harness that supplies `VERCEL_ENV=preview` without a new dependency.
- [ ] Require all six archive cards and static routes in preview output.
- [ ] Require a visible Draft label and `noindex, nofollow` on every preview case-study page.
- [ ] Require all six draft routes and their content to be absent from production output.
- [ ] Verify preview and production pages still emit no bundled client-side JavaScript.
- [ ] Add a broken-internal-link check covering homepage, archive, and case-study navigation in both build modes.

### 5. Review the milestone

- [ ] Run formatting, linting, unit tests, production build/output tests, and preview build/output tests.
- [ ] Review archive cards and all six long-form pages at small-phone and desktop widths in dark and light palettes.
- [ ] Check heading order, keyboard focus, reduced motion, code overflow, image layout stability, and back navigation.
- [ ] Perform a final factual review against the evidence matrix before requesting PR review.

## Completion criteria

- [ ] Exactly six clearly labeled temporary draft case studies exist and validate.
- [ ] Every factual statement is sourced from `CV.md` or explicitly approved by Victor.
- [ ] Development and preview builds list and generate all six routes.
- [ ] Production lists and generates none of the draft routes.
- [ ] Every draft page visibly identifies its status and includes `noindex, nofollow`.
- [ ] Homepage preview links resolve without creating broken production links.
- [ ] Covers reserve layout space and reveal no confidential information.
- [ ] Responsive behavior, semantic structure, focus visibility, both palettes, and the zero-client-JavaScript baseline are preserved.
- [ ] All production and preview verification commands pass.

## Later milestones

- [ ] Delivery step 7: portfolio decision log and “Building this portfolio” meta-case study
- [ ] Delivery step 8: interactions, accessibility completion, SEO, and analytics
- [ ] Delivery step 9: complete automated and visual QA
- [ ] Delivery step 10: replace drafts with reviewed content, connect `darthvictor.xyz`, and launch
