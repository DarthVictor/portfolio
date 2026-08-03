# Case-study evidence matrix

This document is the factual source of truth for the six preview-only case studies in delivery step 6. Draft content may use claims marked `CV-supported`. New factual detail must be marked `Victor-confirmed` with the confirmation date before it is turned into narrative prose. Everything else remains a visible editorial question.

## Shared rules

- Employer, role, period, technology, responsibility, and outcome claims must cite `CV.md` or an explicit confirmation from Victor.
- Adjacent CV bullets are related employment evidence, not proof that they belong to the same project story.
- Numeric results may be repeated exactly, but their measurement method must remain a question until confirmed.
- No draft may invent team size, traffic, architecture, constraints, alternatives, timelines, customer behavior, or confidential product details.
- The six covers are abstract placeholders and are not product representations.

## Tolstoy AI integrations

Slug: `tolstoy-ai-integrations`

### Supported claims

| Status                        | Claim                                                                                                                                                                                      | Source                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| CV-supported                  | Victor has been a Senior Full Stack Engineer at Tolstoy since November 2024.                                                                                                               | `CV.md:21`                    |
| CV-supported                  | Tolstoy's product is an AI commerce platform.                                                                                                                                              | `CV.md:23`                    |
| CV-supported                  | Victor builds full-stack features using React, TypeScript, AWS Lambda, DynamoDB, and PostgreSQL.                                                                                           | `CV.md:23`                    |
| CV-supported                  | Victor designs and develops AI Studio infrastructure supporting the creation and maintenance of more than 30 third-party integrations.                                                     | `CV.md:24`                    |
| CV-supported                  | The homepage groups AI-agent integration work with React and TypeScript UI infrastructure.                                                                                                 | `src/data/homepage.ts:43-47`  |
| Victor-confirmed (2026-08-02) | By summer 2026, AI Studio had evolved from a small image-and-video-generation harness into a conversational content workspace.                                                             | Victor-provided article notes |
| Victor-confirmed (2026-08-02) | The connector catalogue includes content, marketing/analytics, and customer-platform integrations, with differing asset, analytics, and customer-data workflows.                           | Victor-provided article notes |
| Victor-confirmed (2026-08-02) | API-key and OAuth 2 integrations require different implementation and customer-setup flows. Some OAuth providers require manual application submission, demonstrations, and review.        | Victor-provided article notes |
| Victor-confirmed (2026-08-02) | Connector validation can require paid subscriptions, API keys, and provider-approved test accounts; connectors are released in beta while real-world behaviour and feedback are validated. | Victor-provided article notes |
| Victor-confirmed (2026-08-02) | Customers can confuse similarly named connector products such as TikTok and TikTok Shop; the product uses explicit names and clarification messages.                                       | Victor-provided article notes |
| Victor-confirmed (2026-08-02) | Each connector has an intentionally chosen mix of compact AI skills and explicit tools, based on the connector's workflow and required actions.                                            | Victor-provided article notes |
| Victor-confirmed (2026-08-02) | AWS monitoring and dedicated Slack channels support the operational handling of connector failures and provider changes.                                                                   | Victor-provided article notes |

### Editorial questions

- Who creates or maintains integrations, and what workflow problem did the infrastructure solve?
- What did Victor own individually, and what belonged to the wider team?
- Which parts of the architecture and integration lifecycle can be discussed publicly beyond the confirmed product, access, testing, and beta-release details?
- What alternatives were considered, and what trade-offs shaped the selected approach?
- Beyond supporting 30+ integrations, what quality, delivery, or maintenance result can be substantiated?
- What lessons changed later integration work?

## Tolstoy design-system infrastructure

Slug: `tolstoy-design-system-infrastructure`

### Supported claims

| Status       | Claim                                                                                                                             | Source                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| CV-supported | Victor has been a Senior Full Stack Engineer at Tolstoy since November 2024.                                                      | `CV.md:21`                   |
| CV-supported | Victor builds full-stack AI commerce features using React and TypeScript alongside AWS Lambda, DynamoDB, and PostgreSQL.          | `CV.md:23`                   |
| CV-supported | Victor builds reusable design-system components and shared UI foundations for AI-assisted React and TypeScript product workflows. | `CV.md:25`                   |
| CV-supported | The homepage describes reusable React and TypeScript UI infrastructure alongside AI-agent capabilities.                           | `src/data/homepage.ts:43-47` |

### Editorial questions

- What inconsistency or delivery problem motivated the shared UI foundations?
- Which components, tokens, patterns, or tooling did Victor own?
- Who used the system, and how was adoption encouraged or enforced?
- What accessibility, maintenance, or product constraints shaped the design?
- What alternatives and trade-offs were considered?
- Is there a supported adoption, quality, or delivery outcome?

## Bright Data frontend performance

Slug: `bright-data-frontend-performance`

### Supported claims

| Status       | Claim                                                                                                        | Source                       |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| CV-supported | Victor was a Senior Full Stack Developer at Bright Data from February to November 2024.                      | `CV.md:27`                   |
| CV-supported | Victor led development of Toolip.io, a React and TypeScript SaaS platform for managing proxy infrastructure. | `CV.md:29`                   |
| CV-supported | Frontend performance improvements reduced page-load time by 25%.                                             | `CV.md:30`                   |
| CV-supported | The homepage describes performance work on a proxy-management platform.                                      | `src/data/homepage.ts:50-54` |

### Editorial questions

- Which page-load metric and baseline produced the 25% figure?
- How was the result measured and over what period or sample?
- What bottlenecks and user workflows were prioritized?
- Which implementation changes did Victor make?
- What constraints, alternatives, regressions, or trade-offs were considered?
- What performance lesson influenced later work?

## Bright Data payment workflows

Slug: `bright-data-payment-workflows`

### Supported claims

| Status       | Claim                                                                                   | Source                       |
| ------------ | --------------------------------------------------------------------------------------- | ---------------------------- |
| CV-supported | Victor was a Senior Full Stack Developer at Bright Data from February to November 2024. | `CV.md:27`                   |
| CV-supported | Victor built payment workflows across React and Node.js services.                       | `CV.md:31`                   |
| CV-supported | Those workflows integrated Stripe, PayPal, and BlueSnap.                                | `CV.md:31`                   |
| CV-supported | The homepage describes payment flows across React and Node.js services.                 | `src/data/homepage.ts:50-54` |

### Editorial questions

- Which customer and business workflows were in scope?
- What frontend, backend, provider, and operational boundaries did Victor own?
- What security, compliance, localization, or failure-recovery constraints can be discussed?
- How were provider differences represented without overcomplicating the product?
- Which alternatives and trade-offs were considered?
- Is there a measurable reliability, conversion, or delivery outcome?

## Tenengroup commerce platform migration

Slug: `tenengroup-ui-migration`

### Supported claims

| Status       | Claim                                                                                                                                                     | Source                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| CV-supported | Victor was a Senior Full Stack Developer at Tenengroup from July 2022 to February 2024.                                                                   | `CV.md:33`                   |
| CV-supported | Victor built and optimized React shopping-cart and checkout experiences for the MYKA and Oak & Luna brands.                                               | `CV.md:35`                   |
| CV-supported | This work reduced cart abandonment by 20%.                                                                                                                | `CV.md:35`                   |
| CV-supported | The homepage describes checkout experiences and separately mentions a scalable Next.js data-access and API layer.                                         | `src/data/homepage.ts:57-61` |
| Victor-confirmed (2026-08-03) | The initial implementation combined .NET-rendered templates with React and Redux widgets, receiving a centrally assembled state payload. | Victor-provided case-study notes |
| Victor-confirmed (2026-08-03) | The migration moved the brands to a modular Next.js and React application using SWR for server state and Zustand for client state. | Victor-provided case-study notes |
| Victor-confirmed (2026-08-03) | Modular data access made server state easier to cache and removed the need to pass central state from .NET templates into React. | Victor-provided case-study notes |
| Victor-confirmed (2026-08-03) | The shared platform supported brand-specific customisation and internationalisation: MYKA operated in 10+ languages, while Oak & Luna and additional brands such as Lime & Lou could use the same backend with different configurations. | Victor-provided case-study notes |
| Victor-confirmed (2026-08-03) | The new platform used managed Kubernetes on AWS and declarative Terraform deployments, replacing a Windows VPN-dependent deployment workflow. | Victor-provided case-study notes |
| Victor-confirmed (2026-08-03) | Checkout was the first rewritten UI; the migration ultimately moved all UI to Next.js and React, and all backend services from .NET Framework to a modern .NET API. | Victor-provided case-study notes |

### Editorial questions

- Which cart or checkout friction initiated the work?
- How was the 20% abandonment reduction measured and attributed?
- Which research, analytics, experiments, or design inputs were used?
- What did Victor own across UI, state, APIs, and cross-team delivery?
- Which alternatives, trade-offs, and lessons can be discussed publicly?

## Luxoft microfrontend migration

Slug: `luxoft-microfrontend-migration`

### Supported claims

| Status       | Claim                                                                                                                       | Source     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------- |
| CV-supported | Victor was Chief Frontend Developer at Luxoft from February 2021 to July 2022.                                              | `CV.md:39` |
| CV-supported | Victor led a microfrontend migration using Webpack Module Federation.                                                       | `CV.md:41` |
| CV-supported | The migration enabled independent deployment of product modules and faster delivery.                                        | `CV.md:41` |
| Question     | The VTB Bank reporting interfaces are a separate CV bullet and are not confirmed as the product migrated to microfrontends. | `CV.md:42` |

### Editorial questions

- What system and organizational constraints motivated the migration?
- Which modules, teams, or deployment boundaries were involved?
- What migration sequence and compatibility strategy did Victor lead?
- What alternatives to Module Federation were evaluated?
- How was “faster delivery” observed or measured?
- Was the VTB reporting product part of this migration?
- What operational trade-offs or lessons emerged after independent deployment?

## Homepage mapping approved for this milestone

- The Tolstoy homepage card links to both Tolstoy drafts in preview-visible environments.
- The Bright Data homepage card links to both Bright Data drafts in preview-visible environments.
- The Tenengroup homepage card links only to the commerce platform migration draft.
- The Luxoft draft remains discoverable through the preview work archive and does not add a fourth homepage card.
- Production keeps the current summaries unlinked while every mapped case study remains a draft.
