# Default English entry and mobile menu redesign

## Summary
Clarionis should no longer stop first-time visitors on a language-picker landing page. The root path `/` should immediately redirect to `/en`, making English the default entry experience. On mobile, the header should be simplified so the brand appears alongside the locale switcher and a `Menu` trigger, with the four page links moving into a collapsible navigation panel.

## Goals
- Make first-time visits feel direct and polished by defaulting to English.
- Remove the awkward four-link mobile quick-nav block from the top of the page.
- Preserve the bilingual route structure and localized navigation labels.
- Keep the visual language premium, restrained, and consistent with the current dark glass aesthetic.

## Non-goals
- No desktop navigation redesign.
- No changes to page copy or information architecture.
- No locale auto-detection.
- No new pages or route hierarchy changes beyond the root redirect.

## Routing behavior
### Root path
- Visiting `/` should end at `/en` immediately for production traffic.
- Because this repo uses Next.js static export (`output: "export"`), this redirect should be implemented as a Cloudflare Pages hosting-level redirect rather than a Next.js `redirects()` config.
- The standalone language selection screen should be removed from the primary browsing flow.
- Canonical browsing paths remain locale-prefixed (`/en`, `/zh`, `/en/capabilities`, `/zh/about`, etc.).
- Local development and test coverage should use a build-safe fallback for `/` that aligns with the production outcome, but production deployment behavior is the hosting-level redirect.

### Locale switching
- Switching languages should continue to preserve the current page path.
  - Example: `/en/solutions` → `/zh/solutions`
- This behavior remains unchanged from the current localized route model.

## Mobile header redesign
### Current issue
The current mobile experience stacks a four-item quick-links block directly beneath the sticky header. This consumes too much vertical space and makes the top of the page feel cramped and list-like instead of refined.

### New structure
On mobile widths, the sticky header should contain only:
- Brand mark / wordmark on the left
- Locale switcher on the right
- `Menu` button on the right

The page-link quick-nav block under the header should be removed on mobile.

### Menu panel behavior
Tapping `Menu` should reveal a dark glass dropdown panel directly beneath the header container.

The panel should contain, in order:
1. `Capabilities`
2. `Solutions`
3. `Customers`
4. `About`
5. Primary CTA (`Book a Demo` / localized equivalent), using the same `mailto` destination as the existing header CTA rather than introducing a new flow

### Interaction rules
- The panel should open and close without navigating away.
- The active page should remain visually distinct and retain `aria-current="page"`.
- The locale switcher remains visible even when the menu is closed.
- Choosing a nav item closes the menu through normal route navigation.
- Choosing the locale switcher should preserve the current path and reset the menu to closed on the destination route.
- Clicking outside the panel closes it.
- Pressing `Escape` closes it.
- Crossing from mobile to desktop viewport closes and resets the panel state.
- The panel may remain open during scroll until one of the explicit close actions above occurs.
- The panel should feel like part of the header system, not a separate page section.

## Desktop behavior
- Desktop navigation remains as-is.
- The existing inline desktop nav can continue to show the four page links across the header.
- The existing desktop CTA remains visible in the header.

## Visual direction
The redesign should stay within the current premium, nocturnal, glass-panel aesthetic, but with tighter mobile hierarchy.

Key visual intent:
- Fewer elements above the hero.
- Stronger emphasis on the hero headline appearing earlier on screen.
- Mobile menu panel should feel deliberate and architectural, not like generic hamburger navigation.
- Keep rounded geometry, translucent layering, and soft border/shadow treatment consistent with the rest of the interface.

## Accessibility and semantics
- The `Menu` control should be a real button.
- It should expose expanded/collapsed state with `aria-expanded` and point at the menu panel with `aria-controls`.
- The button should keep a stable accessible name (`Menu` is sufficient if the visible label remains present).
- When the panel opens via keyboard, focus should move into the panel to the first interactive item.
- When the panel closes via keyboard dismissal, focus should return to the `Menu` button.
- The mobile menu container should have a clear navigation landmark label.
- Active links should continue to expose `aria-current="page"`.
- Redirect behavior should not break access to localized routes directly.

## Implementation outline
### Routes
- Replace the current root landing implementation with a redirect to `/en`.
- Keep localized routes under `[locale]` unchanged.

### Navigation shell
- Add mobile-only menu state to the shared marketing shell.
- Render a `Menu` button beside the locale switcher.
- Render a conditional mobile dropdown panel inside the header area.
- Remove the old mobile quick-links block from the main page flow.

### CTA placement
- Keep the CTA inside the mobile dropdown panel.
- Preserve the existing desktop CTA placement in the header.

## Testing expectations
Add or update tests to verify:
- Production redirect handling for `/` is defined in a static-export-compatible way, with coverage aimed at the chosen Cloudflare Pages redirect artifact or equivalent deployment-facing configuration.
- Any local/test fallback for `/` aligns with the production outcome of landing on `/en`.
- The old language selection content is no longer the live root entry experience.
- Mobile navigation exposes a `Menu` control instead of the old top quick-links block.
- The old mobile quick-links block is absent in the mobile layout.
- The mobile menu includes the four page links and the existing `mailto` CTA.
- The mobile menu renders correctly in both English and Chinese, including localized labels.
- `aria-expanded`, `aria-controls`, and `aria-current` behave correctly.
- Locale switching still preserves the current route and resets the mobile menu state.

## Risks and mitigations
- **Risk:** Mobile menu state could conflict with locale switching or route changes.
  - **Mitigation:** Keep menu state local to the shell and let route transitions naturally reset the panel.
- **Risk:** Redirecting `/` could affect tests that assumed a rendered landing page.
  - **Mitigation:** Replace those assertions with redirect-focused coverage.
- **Risk:** Removing the quick-links block could accidentally reduce discoverability.
  - **Mitigation:** Keep the menu trigger visually strong and include all four destinations plus CTA in the panel.

## Success criteria
- First-time visitors landing on `/` reach English content immediately.
- The mobile top area feels cleaner and less cramped.
- The hero content appears earlier on mobile.
- Navigation remains discoverable, localized, and accessible.
- Desktop behavior stays stable.
