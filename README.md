# Clarionis

Clarionis（明谛）是一个基于 Next.js 16 构建的多语言企业 AI 营销网站，支持 5 种语言（英、中、德、法、日），以静态站点形式呈现，支持完整的响应式设计和国际化内容切换。

## Tech Stack

- Next.js 16.2.1
- React 19.2.4
- TypeScript 5
- Tailwind CSS v4
- Framer Motion 12.38
- Vitest 4.1 + Testing Library

## Project Structure

- **Supported Locales**: `en`, `zh`, `de`, `fr`, `ja`
- **URL Structure**: Language-driven routing at `/<locale>/...` (e.g., `/zh/capabilities`, `/ja/solutions`)
- **Root Route**: `src/app/(entry)/page.tsx` serves English homepage directly at `/`
- **Content Management**: All copy lives in `src/app/site-content.ts` as the single source of truth
- **UI Components**: Shared marketing components in `src/app/marketing-ui.tsx`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Navigation to `/zh`, `/de`, `/fr`, or `/ja` switches language context.

## Available Scripts

```bash
npm run dev      # Start dev server
npm run test     # Run tests
npm run lint     # Lint code
npm run build    # Production build
npm run start    # Serve production build locally
```

### Run Specific Tests

```bash
npx vitest run src/app/page.test.tsx                    # Run single file
npx vitest run -t "switches homepage copy to Chinese"   # Run by test name
```

## Deployment: Static Export via Cloudflare Pages

This project is configured for **static export** deployment:

- `next.config.ts` has `output: "export"` enabled
- `npm run build` generates a deployable `out/` directory
- HTTP security headers are configured in `public/_headers` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)

### Cloudflare Pages Configuration

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: Repository root
- **Node.js version**: `20`

### Pre-Deployment Verification

Before deploying, run:

```bash
npm run test
npm run lint
npm run build
```

After deployment to Cloudflare Pages, verify:

- Homepage loads at `/` (English by default)
- Static assets load correctly
- Fonts display properly
- Language switching works for all 5 locales (`/zh`, `/de`, `/fr`, `/ja`)
- Root path `/` refreshes without errors
- `public/_redirects` is intentionally empty

## Important Notes

**Static Deployment Constraints**: This site is optimized for Cloudflare Pages static hosting. The following Next.js features are **not compatible** with static export and should trigger a re-evaluation of the deployment approach if added:

- `app/**/route.ts` (API routes)
- middleware
- Server Actions
- `cookies()` or `headers()` functions
- Dynamic rendering at request time
- Server-side `next/image` optimization

For architecture details and development conventions, see `CLAUDE.md`.
