# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Common commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm run test`
- Run a single test file: `npx vitest run src/app/page.test.tsx`
- Run tests matching a name: `npx vitest run -t "switches homepage copy to Chinese"`
- Lint: `npm run lint`
- Production build: `npm run build`
- Serve production build locally if needed: `npm run start`

## Deployment

- This app is configured for static export via `next.config.ts` with `output: "export"`.
- `npm run build` generates the deployable `out/` directory.
- Cloudflare Pages settings for this repo:
  - Production branch: `main`
  - Build command: `npm run build`
  - Build output directory: `out`
  - Node.js version: `20`
- If future changes add request-time Next.js features such as `app/**/route.ts`, middleware, Server Actions, `cookies()`, `headers()`, or server-side `next/image` optimization, re-evaluate the deployment approach before implementing them.

## Architecture overview

- This is a Next.js 16 App Router project, but the current site is effectively a single-page marketing site.
- The main product surface lives in `src/app/page.tsx`. That file contains both the homepage UI and the bilingual content model.
- The page is implemented as a client component (`"use client"`) because language switching is local React state, not route-based i18n.
- Content is stored inline as a typed `content: Record<Locale, Content>` object with `en` and `zh` variants. Most copy changes, section changes, and localization work happen there.
- The homepage structure is a sequence of marketing sections (hero, thesis, capabilities, solutions, proof, trust, final CTA, footer) rendered from that content object rather than split into many smaller files.

## Styling and UI patterns

- Global visual styling lives in `src/app/globals.css`; this includes the page atmosphere, background treatment, and base element rules.
- Typography and metadata are defined in `src/app/layout.tsx` using `next/font/google` (`Cormorant_Garamond` for display and `Manrope` for sans text).
- The UI relies heavily on Tailwind utility classes inside `src/app/page.tsx` rather than separate component stylesheets.
- Framer Motion is used directly in `src/app/page.tsx` for reveal and transition behavior, so animation changes are usually made there alongside layout changes.

## Testing notes

- Vitest is configured in `vitest.config.ts` with a `jsdom` environment and `src/test/setup.ts` as the shared setup file.
- `src/test/setup.ts` stubs `IntersectionObserver`, which is required for the current motion/UI test environment.
- Tests live primarily in `src/app/page.test.tsx`.
- The test suite mixes DOM assertions with source-file assertions using `readFileSync(...)` against `src/app/page.tsx` and `src/app/globals.css`. Preserve that pattern when validating visual regressions that are awkward to assert through rendered DOM alone.

## Working rules specific to this repo

- Read the relevant Next.js docs under `node_modules/next/dist/docs/` before making framework-level changes; this repo explicitly depends on current Next.js 16 behavior rather than older conventions.
- Prefer targeted edits in `src/app/page.tsx`, `src/app/layout.tsx`, and `src/app/globals.css` over introducing extra abstraction for this site.
- Keep the bilingual behavior intact when editing visible copy or section UI; changes in one locale usually require matching updates in the other.
