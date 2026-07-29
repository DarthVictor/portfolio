# First implementation step: Astro foundation

## Summary

Initialize the repository as a static Astro 7 portfolio using Astro’s current recommended strict TypeScript setup, pnpm, MDX, and optional Preact islands. This step establishes the project foundation and content contracts; it does not implement the final design or case-study content.

Use Node 24 and pnpm 11. Astro supports current even-numbered Node releases, and Vercel supports Node 24. Follow the official [Astro installation](https://docs.astro.build/en/install-and-setup/), [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/), and [testing](https://docs.astro.build/en/guides/testing/) conventions.

## Implementation changes

- Scaffold a minimal Astro project with static output, strict TypeScript, `darthvictor.xyz` as the configured site URL, and no server adapter.
- Install the official MDX and Preact integrations. Preact will ship only when a component explicitly uses a client directive.
- Standardize on pnpm with a committed lockfile, Node `24.x`, `.gitignore`, EditorConfig, and documented development commands.
- Add ESLint with Astro/TypeScript support, Prettier with Astro formatting, Astro Check, Vitest, and Playwright.
- Provide scripts for development, build, preview, type/content checks, linting, formatting, unit tests, end-to-end tests, and a combined `verify` command.
- Add a minimal semantic homepage solely to prove routing and production builds. Visual design, navigation, themes, CV publication, and real content remain deferred.

## Content interfaces

Create validated Astro content collections for:

- `work`: title, summary, employer label, role, period, disciplines, technologies, featured state/order, draft state, publication date, cover metadata, SEO description, and confidentiality mode.
- `decisions`: title, date, summary, status, tags, related case study, and draft state; detailed context, alternatives, reasoning, and tradeoffs live in MDX content.
- `writing`: title, description, publication/update dates, tags, and draft state.

Use MDX loaders and typed schemas in `src/content.config.ts`. Add a shared visibility helper with these rules:

- Local development and Vercel previews include drafts.
- Production builds exclude drafts.
- A deliberate `SHOW_DRAFTS` override is allowed for local production-build verification.
- Later route generation must use this helper so drafts cannot accidentally appear in production.

Do not add the six placeholder case studies yet; that belongs to delivery step five.

## Verification

- Confirm a clean install from the committed pnpm lockfile.
- Run formatting checks, ESLint, Astro/TypeScript checks, unit tests, and a production build through `pnpm verify`.
- Unit-test draft visibility for development, Vercel preview, and production environments.
- Use Playwright to confirm the minimal homepage loads, has one descriptive `h1`, and returns no browser errors from a production preview.
- Ensure generated output remains static and no client-side Preact bundle is emitted before an interactive island is introduced.

## Assumptions

- Existing `CV.md`, `CV.pdf`, `PORTFOLIO_PLAN.md`, and license remain unchanged.
- The package manager is pnpm because it is already installed and avoids the local PowerShell npm-shim restriction.
- Dependency versions are resolved from current stable releases and locked in `pnpm-lock.yaml`.
- CI, Vercel connection, theming, final visual design, analytics, SEO assets, and portfolio content are intentionally outside this first step.
