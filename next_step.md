# Validate the six preview-only case studies

## Status

Delivery step 6 is technically implemented.

- [x] Six flat, schema-valid MDX drafts exist with stable route slugs.
- [x] Every draft uses only CV-supported facts; missing context is shown as an editorial question.
- [x] `docs/case-study-evidence.md` records claim sources, factual boundaries, and validation questions.
- [x] Drafts do not require a fabricated publication date; published entries still require `publishedAt`.
- [x] Six abstract local SVG covers include explicit dimensions and reserve a 16:9 layout area.
- [x] Development and Vercel preview builds show six ordered archive cards and generate six static routes.
- [x] Production keeps the empty archive and generates no draft routes or draft homepage links.
- [x] The approved homepage mapping produces five preview-only links: two Tolstoy, two Bright Data, and one Tenengroup.
- [x] Every draft page has a visible Draft label and `noindex, nofollow`.
- [x] Production and preview output tests verify routes, labels, indexing rules, homepage mapping, broken root-relative links, and zero bundled client-side JavaScript.
- [x] The main verification command tests both build modes and leaves `dist/` in production-safe state.
- [x] Layout metrics passed across all six routes at 360px in light mode and 1440px in dark mode; representative archive and case-study pages were also visually reviewed in the alternate palette at each width.
- [x] Covers load, titles fit, mobile facts collapse to one column, keyboard focus is visible, reduced motion is respected, back navigation works, and the browser reports no errors.

## Current verification baseline

`pnpm verify` passes:

- 15 unit tests;
- 5 production-output tests;
- 4 preview-output tests;
- production and preview static builds;
- final production rebuild.

Expected build warnings remain for the intentionally empty `decisions` and `writing` collections.

## Next action — Victor's factual review

Review `docs/case-study-evidence.md` and answer only the questions that can be discussed publicly. The draft pages already expose the same gaps, so unanswered items may safely remain questions.

Priority questions with the highest narrative value:

1. Tolstoy AI integrations
   - What workflow problem did the AI Studio infrastructure solve?
   - What did Victor own individually?
   - Which architectural decision and trade-off can be described publicly?
   - Is there a supported result beyond the count of 40+ integrations?
2. Tolstoy design-system infrastructure
   - What inconsistency or delivery problem motivated the shared UI foundations?
   - Which components, patterns, or tooling did Victor own?
   - Is there a supported adoption, accessibility, quality, or delivery result?
3. Bright Data frontend performance
   - Which metric, baseline, and measurement method produced the 25% improvement?
   - Which bottlenecks and implementation changes produced it?
4. Bright Data payment workflows
   - Which customer workflows and service boundaries were in scope?
   - How were provider differences, failures, and retries handled?
   - Is there a supported reliability, conversion, or delivery result?
5. Tenengroup checkout UX
   - Which checkout friction initiated the work?
   - How was the 20% abandonment reduction measured and attributed?
   - Were the Next.js data-access layer and .NET API collaboration part of this initiative?
6. Luxoft microfrontend migration
   - What product and organizational constraints motivated the migration?
   - Why was Module Federation selected over alternatives?
   - How was faster delivery observed or measured?
   - Was the separately documented VTB reporting work part of this migration?

## After factual review

- [ ] Mark confirmed answers as `Victor-confirmed` with the confirmation date in `docs/case-study-evidence.md`.
- [ ] Replace the corresponding editorial questions with supported narrative prose.
- [ ] Add `DecisionBlock` only where context, choice, rationale, and trade-off are all confirmed.
- [ ] Rerun `pnpm verify` and repeat targeted visual review for pages whose content changed materially.
- [ ] Decide whether delivery step 6 is ready to merge before beginning delivery step 7.

## Following milestone

Delivery step 7 from `PORTFOLIO_PLAN.md`: add the portfolio decision log and the “Building this portfolio” meta-case study. Do not modify `PORTFOLIO_PLAN.md` without an explicit request.
