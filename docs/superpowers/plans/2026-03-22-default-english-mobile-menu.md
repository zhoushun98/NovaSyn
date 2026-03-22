# Default English Entry and Mobile Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/` default to English while replacing the awkward mobile quick-links block with a localized header menu below the `lg` breakpoint.

**Architecture:** Keep the current locale-prefixed App Router structure intact and solve the root-entry requirement with two layers: a checked-in Cloudflare Pages redirect artifact for production and a minimal exported fallback page for local/static behavior. Rework the shared `MarketingShell` so desktop navigation stays unchanged while mobile navigation becomes a button-triggered dropdown panel that reuses the existing localized nav items and CTA destination.

**Tech Stack:** Next.js 16 App Router, static export (`output: "export"`), React client components, Tailwind CSS utilities, Framer Motion, Vitest, Testing Library

---

## File structure and responsibilities

- Modify: `src/app/(entry)/page.tsx`
  - Replace the language-picker landing UI with the minimal exported root fallback that immediately navigates to `/en` when the hosting redirect is not active.
- Modify: `src/app/marketing-ui.tsx`
  - Add mobile menu state and interactions to `MarketingShell`; keep desktop nav as-is; remove the old mobile quick-links block; render the localized mobile menu panel and CTA.
- Modify: `src/app/site-content.ts`
  - Add only the localized menu trigger / menu landmark copy needed by the redesigned mobile navigation while preserving current locale-path helpers.
- Modify: `src/app/page.test.tsx`
  - Replace root landing assertions and old mobile quick-links assertions with redirect-fallback and mobile menu tests in both locales.
- Create: `public/_redirects`
  - Define the Cloudflare Pages production redirect from `/` to `/en` as a checked-in deploy artifact.
- Verify only: `next.config.ts`
  - Confirm static export remains unchanged; do not add unsupported Next.js redirects.
- Verify only: `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`
  - Re-read the current Next 16 static export guidance before implementing root-entry behavior.

## Implementation notes for the engineer

- This repo uses static export, and the current Next.js docs explicitly mark `redirects()` in `next.config` as unsupported for this deployment mode. Do not solve `/ -> /en` with Next config.
- The current mobile quick-links nav lives in `src/app/marketing-ui.tsx` and is rendered below the header for `lg:hidden`. That block should be removed, not restyled.
- The locale switcher already preserves the current path through `localizeCurrentPath()`. Keep that behavior.
- The existing header CTA uses `mailto:${copy.footer.contact}`. The new mobile menu CTA should reuse that exact destination.
- The mobile menu item order is fixed by the approved spec: `Capabilities`, `Solutions`, `Customers`, `About`, then the primary CTA.
- The active page inside the mobile menu must keep both `aria-current="page"` and a visible active treatment distinct from inactive items.
- The mobile menu trigger should be localized in visible text and accessible name: `Menu` for English, `菜单` for Chinese.
- Below the `lg` breakpoint, the header must contain only brand + locale switcher + menu trigger. Move the current `md:inline-flex` CTA and `md:block` language-label treatment to `lg`-scoped behavior so the approved mobile header stays clean.
- Desktop behavior at `lg` and above should remain visually and structurally stable.

### Task 1: Replace the root landing page with redirect-first behavior

**Files:**
- Verify: `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`
- Modify: `src/app/(entry)/page.tsx`
- Create: `public/_redirects`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Re-read the Next 16 static export guide before changing root-entry behavior**

Read `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` and confirm:
- `redirects()` in `next.config.ts` is unsupported for `output: "export"`
- the root solution must stay compatible with static export output

No code changes in this step.

- [ ] **Step 2: Write the failing tests for the new root entry behavior**

Update `src/app/page.test.tsx` so the old root-page test no longer expects English/中文 choice links. Replace it with assertions for the new fallback page and deploy artifact.

```tsx
it("defines a production redirect from / to /en", () => {
  const redirects = readFileSync(path.join(process.cwd(), "public", "_redirects"), "utf8");

  expect(redirects).toMatch(/^\/\s+\/en\s+301$/m);
});

it("renders a root fallback that sends visitors to /en without showing a language picker", () => {
  render(<Home />);

  expect(screen.getByText(/redirecting to english/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /continue to english/i })).toHaveAttribute("href", "/en");
  expect(screen.queryByRole("link", { name: /中文/i })).not.toBeInTheDocument();
});
```

If you choose a client-side redirect effect instead, add an assertion for the actual redirect mechanism you implement, such as a mocked `window.location.replace("/en")` call.

- [ ] **Step 3: Run the targeted tests and verify they fail for the expected reason**

Run:
- `npx vitest run src/app/page.test.tsx -t "defines a production redirect from / to /en"`
- `npx vitest run src/app/page.test.tsx -t "renders a root fallback that sends visitors to /en without showing a language picker"`

Expected:
- first test fails because `public/_redirects` does not exist yet
- second test fails because the current root page still renders the language picker

- [ ] **Step 4: Implement the checked-in production redirect artifact**

Create `public/_redirects` with the exact Cloudflare Pages rule:

```text
/ /en 301
```

Do not add extra redirects that are not required by the spec.

- [ ] **Step 5: Implement the minimal exported root fallback page using a supported redirect mechanism**

Replace the current `src/app/(entry)/page.tsx` language-picker UI with a minimal fallback page that:
- does not render language choice UI
- renders a single continuation link to `/en`
- uses a supported mechanism for immediate navigation in the exported page

Recommended implementation:

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    window.location.replace("/en");
  }, []);

  return (
    <main className="...">
      <section className="...">
        <span className="...">Clarionis 明谛</span>
        <h1 className="...">Redirecting to English.</h1>
        <p className="...">If you are not redirected automatically, continue to the English site.</p>
        <Link href="/en" className="...">
          Continue to English
        </Link>
      </section>
    </main>
  );
}
```

If you use a different supported mechanism, update the tests to assert that exact behavior.

- [ ] **Step 6: Re-run the targeted tests and verify they pass**

Run:
- `npx vitest run src/app/page.test.tsx -t "defines a production redirect from / to /en"`
- `npx vitest run src/app/page.test.tsx -t "renders a root fallback that sends visitors to /en without showing a language picker"`

Expected: PASS for both root-entry tests.

- [ ] **Step 7: Commit the root-entry changes**

```bash
git add public/_redirects src/app/(entry)/page.tsx src/app/page.test.tsx
git commit -m "feat: default root visits to english"
```

### Task 2: Add localized mobile menu copy and test hooks

**Files:**
- Modify: `src/app/site-content.ts`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Write failing tests for the localized mobile menu trigger and labels**

Add tests that expect the new mobile trigger copy and localized menu landmark labels.

```tsx
it("renders an English mobile menu trigger", async () => {
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

  expect(screen.getByRole("button", { name: /^menu$/i })).toBeInTheDocument();
});

it("renders a Chinese mobile menu trigger", async () => {
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "zh" }) }));

  expect(screen.getByRole("button", { name: /^菜单$/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted tests and verify they fail**

Run:
- `npx vitest run src/app/page.test.tsx -t "renders an English mobile menu trigger"`
- `npx vitest run src/app/page.test.tsx -t "renders a Chinese mobile menu trigger"`

Expected: FAIL because `MarketingShell` currently renders no mobile menu button and `site-content.ts` has no menu-trigger copy.

- [ ] **Step 5: Implement the minimal localized copy in `site-content.ts`**

Extend the `Content` type with only the fields needed by the new mobile nav. Recommended shape:

```ts
mobileMenuLabel: string;
mobileMenuNavLabel: string;
```

Populate them minimally:

```ts
en: {
  mobileMenuLabel: "Menu",
  mobileMenuNavLabel: "Mobile navigation",
}

zh: {
  mobileMenuLabel: "菜单",
  mobileMenuNavLabel: "移动端导航",
}
```

Keep the trigger accessible name stable and equal to the visible localized label. Do not add a separate `Close menu` label.

- [ ] **Step 6: Re-run the targeted tests and confirm they still fail for implementation reasons only**

Run:
- `npx vitest run src/app/page.test.tsx -t "renders an English mobile menu trigger"`
- `npx vitest run src/app/page.test.tsx -t "renders a Chinese mobile menu trigger"`

Expected: Still FAIL because the shared shell has not been updated yet, but no content-shape errors remain.

- [ ] **Step 7: Carry the failing tests forward without committing yet**

Do not commit in a red state. Leave the new content fields and failing tests in place, then continue directly into the `MarketingShell` implementation task so the branch stays TDD-clean.


### Task 3: Replace mobile quick links with a localized dropdown menu

**Files:**
- Modify: `src/app/marketing-ui.tsx`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Write failing interaction and accessibility tests for the mobile menu shell**

Expand `src/app/page.test.tsx` with interaction coverage.

```tsx
import userEvent from "@testing-library/user-event";

it("opens the English mobile menu and reveals nav links plus CTA in the approved order", async () => {
  const user = userEvent.setup();
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

  const trigger = screen.getByRole("button", { name: /^menu$/i });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveAttribute("aria-controls", "mobile-site-menu");

  await user.click(trigger);

  const menu = screen.getByRole("navigation", { name: /mobile navigation/i });
  const links = within(menu).getAllByRole("link");

  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(links.map((link) => link.textContent)).toEqual([
    "Capabilities",
    "Solutions",
    "Customers",
    "About",
    "Book a Demo",
  ]);
  expect(within(menu).getByRole("link", { name: /^about$/i })).toHaveAttribute("href", "/en/about");
  expect(within(menu).getByRole("link", { name: /book a demo/i })).toHaveAttribute(
    "href",
    "mailto:hello@clarionis.ai",
  );
});

it("closes the mobile menu on outside click", async () => {
  const user = userEvent.setup();
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

  await user.click(screen.getByRole("button", { name: /^menu$/i }));
  await user.click(document.body);

  expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
});

it("closes the mobile menu on escape and returns focus to the trigger", async () => {
  const user = userEvent.setup();
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

  const trigger = screen.getByRole("button", { name: /^menu$/i });
  trigger.focus();
  await user.keyboard("[Enter]");
  await user.keyboard("[Escape]");

  expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it("moves focus to the first menu item when opened from keyboard", async () => {
  const user = userEvent.setup();
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

  const trigger = screen.getByRole("button", { name: /^menu$/i });
  trigger.focus();
  await user.keyboard("[Enter]");

  expect(screen.getByRole("link", { name: /^capabilities$/i })).toHaveFocus();
});

it("marks the active mobile menu link with aria-current and a distinct active class", async () => {
  const user = userEvent.setup();
  render(await SolutionsPage({ params: Promise.resolve({ locale: "en" }) }));

  await user.click(screen.getByRole("button", { name: /^menu$/i }));

  const menu = screen.getByRole("navigation", { name: /mobile navigation/i });
  const activeLink = within(menu).getByRole("link", { name: /^solutions$/i });

  expect(activeLink).toHaveAttribute("aria-current", "page");
  expect(activeLink.className).toMatch(/bg-white/);
});

it("does not render the old quick-links block on mobile", async () => {
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

  expect(screen.queryByRole("navigation", { name: /quick links/i })).not.toBeInTheDocument();
});

it("keeps mobile-only and desktop-only header classes aligned with the lg breakpoint", () => {
  const source = readFileSync(appPath("marketing-ui.tsx"), "utf8");

  expect(source).toContain('className="hidden items-center gap-2 lg:flex"');
  expect(source).toContain('className="inline-flex lg:hidden');
  expect(source).toContain('className="hidden lg:block"');
  expect(source).toContain('className="hidden lg:inline-flex"');
});
```

Also add tests for:
- locale switcher preserving current path after the mobile menu work
- menu reset on route/locale change
- menu reset when crossing from below `lg` to desktop widths
- at least one Chinese-locale menu-open assertion

- [ ] **Step 2: Run the focused menu tests and verify they fail**

Run: `npx vitest run src/app/page.test.tsx -t "mobile menu"`

Expected: FAIL because the current shell still renders the old quick-links nav and no mobile menu button/panel exists.

- [ ] **Step 3: Implement mobile menu state and structure in `MarketingShell`**

Make the smallest focused changes needed in `src/app/marketing-ui.tsx`:

1. Add client-side state and refs for the mobile menu.
2. Keep the current desktop `<nav className="hidden ... lg:flex">` unchanged.
3. Add a mobile-only button next to the locale switcher.
4. Remove the old mobile quick-links block from below `<main>`.
5. Render a conditional dropdown panel inside the header area for `lg:hidden`.

Recommended structure:

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const menuButtonRef = useRef<HTMLButtonElement>(null);
const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
```

```tsx
<button
  ref={menuButtonRef}
  type="button"
  aria-expanded={isMobileMenuOpen}
  aria-controls="mobile-site-menu"
  className="inline-flex lg:hidden ..."
  onClick={() => setIsMobileMenuOpen((value) => !value)}
>
  {copy.mobileMenuLabel}
</button>
```

```tsx
{isMobileMenuOpen ? (
  <nav id="mobile-site-menu" aria-label={copy.mobileMenuNavLabel} className="lg:hidden ...">
    {copy.nav.map((item, index) => (
      <Link
        key={item.href}
        ref={index === 0 ? firstMenuLinkRef : undefined}
        href={buildLocalizedPath(locale, item.href)}
        aria-current={currentPath === buildLocalizedPath(locale, item.href) ? "page" : undefined}
        className="..."
      >
        {item.label}
      </Link>
    ))}
    <Link href={`mailto:${copy.footer.contact}`} className="...">
      {copy.hero.primaryCta}
    </Link>
  </nav>
) : null}
```

Visual constraints:
- Match the existing glass-panel aesthetic.
- Keep the panel visually attached to the header.
- Do not add a hamburger icon unless needed; text trigger is correct per spec.

- [ ] **Step 4: Implement required menu behavior**

In the same file, add only the behavior specified in the spec and already covered by tests:
- close on outside click
- close on `Escape`
- reset closed state after locale change / route navigation
- reset closed state when crossing into desktop (`lg`) widths
- move focus to the first menu item when opened from keyboard
- return focus to the trigger when closed by keyboard dismissal

Keep the logic local to `MarketingShell`; do not extract a new abstraction unless it becomes necessary.

- [ ] **Step 5: Run the focused menu tests and verify they pass**

Run: `npx vitest run src/app/page.test.tsx -t "mobile menu"`

Expected: PASS for the new menu interaction and absence-of-quick-links assertions.

- [ ] **Step 6: Commit the mobile shell redesign**

```bash
git add src/app/marketing-ui.tsx src/app/page.test.tsx
git commit -m "feat: add mobile header menu"
```

### Task 4: Cover regressions across locales and full route behavior

**Files:**
- Modify: `src/app/page.test.tsx`
- Verify: `src/app/site-content.ts`
- Verify: `src/app/marketing-ui.tsx`

- [ ] **Step 1: Add the remaining regression tests that protect the final behavior**

Make sure `src/app/page.test.tsx` includes all of these:
- Chinese mobile trigger renders as `菜单`
- Chinese mobile menu opens with localized nav landmark label
- locale switcher still preserves current path
- active desktop or mobile nav semantics still use `aria-current="page"`
- standalone route heading test still passes after shell changes

Example Chinese assertion:

```tsx
it("renders localized mobile menu labels in Chinese", async () => {
  const user = userEvent.setup();
  render(await LocaleHomePage({ params: Promise.resolve({ locale: "zh" }) }));

  await user.click(screen.getByRole("button", { name: /^菜单$/i }));

  expect(screen.getByRole("navigation", { name: /移动端导航/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^关于$/i })).toHaveAttribute("href", "/zh/about");
});
```

- [ ] **Step 2: Run the full route test file**

Run: `npx vitest run src/app/page.test.tsx`

Expected: PASS for the full route regression suite.

- [ ] **Step 3: Run full verification for the changed surface**

Run: `npm run lint && npm run test && npm run build`

Expected:
- lint passes
- Vitest passes
- Next build succeeds with static export output intact

- [ ] **Step 4: Inspect the static export artifact for the redirect file**

Run: `ls out && ls out | grep _redirects`

Expected: `_redirects` exists in the build output.

- [ ] **Step 5: Commit the regression coverage and final verification state**

```bash
git add src/app/page.test.tsx src/app/site-content.ts src/app/marketing-ui.tsx public/_redirects src/app/(entry)/page.tsx
git commit -m "test: cover default english entry and mobile menu"
```

## Final verification checklist

Before claiming implementation is complete, confirm all of the following:

- `public/_redirects` contains `/ /en 301`
- `src/app/(entry)/page.tsx` no longer renders a language-choice screen
- `src/app/marketing-ui.tsx` no longer renders the old mobile quick-links block
- Mobile header below `lg` shows locale switcher plus localized menu trigger
- Menu panel contains four localized nav links plus the existing `mailto` CTA
- `npx vitest run src/app/page.test.tsx` passes
- `npm run lint` passes
- `npm run test` passes
- `npm run build` passes

## Suggested commit sequence

1. `feat: default root visits to english`
2. `feat: add localized mobile menu copy`
3. `feat: add mobile header menu`
4. `test: cover default english entry and mobile menu`
