# Darth Victor portfolio

A static Astro portfolio built with TypeScript, MDX, and optional Preact islands.

## Requirements

- Node.js 24.x
- pnpm 11.x

## Commands

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm format:check
pnpm lint
pnpm test:unit
pnpm test:output
pnpm verify
```

Run `pnpm dev` to start the local site. Run `pnpm verify` before deploying the generated `dist` directory.

## Analytics

The production site can use the self-hosted Umami instance at
`https://analytics.darthvictor.xyz`. Create a website for `darthvictor.xyz` in
Umami, then set `PUBLIC_UMAMI_WEBSITE_ID` in the deployment environment before
building. The tracker is disabled when the variable is empty and is limited to
the production portfolio domains.
