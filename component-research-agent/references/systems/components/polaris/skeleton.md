---
system: Polaris (Shopify)
component: SkeletonPage, SkeletonBodyText, SkeletonDisplayText, SkeletonThumbnail, SkeletonTabs
url: https://polaris.shopify.com/components/feedback-indicators/skeleton-page
last_verified: 2026-03-28
---

# Skeleton Components (5-Component System)

## Approach

Polaris is by far the most invested design system in skeleton loading among the six systems reviewed, shipping five distinct skeleton components where other systems ship one or three. This investment is not arbitrary — it reflects the specific demands of Shopify's merchant audience. Merchants navigating the admin interface are making business decisions (inventory, pricing, fulfillment, marketing) under time pressure. When pages take even 1–2 seconds to load, a merchant needs to instantly understand what kind of page is coming: is it a product detail page, a list view, an order page? Each has a distinct spatial grammar. Shopify's five-component skeleton system encodes those spatial grammars explicitly: `SkeletonPage` represents the full admin page chrome (header, title, action buttons, back navigation), while `SkeletonBodyText`, `SkeletonDisplayText`, `SkeletonThumbnail`, and `SkeletonTabs` represent the content zones within it.

The design philosophy is "faithful representation": skeletons should be an accurate structural preview of the loaded state, not a generic placeholder. Polaris documentation explicitly discourages using skeleton components for static content (elements that never change), distinguishing between static elements that should show real content immediately versus dynamic elements whose values come from a server. A product title like "Products" is static and should appear immediately; the specific product name is dynamic and needs a skeleton. This distinction prevents unnecessary skeleton states and keeps the UI honest.

Polaris distinguishes skeleton use from Spinner and ProgressBar cleanly: skeletons are for full-page loads where content arrives simultaneously; Spinners are for in-context operations and localized feedback; ProgressBar is for determinate operations where completion percentage is known.

## Key Decisions

1. **5 components encoding distinct content types** (HIGH) — Rather than a generic `Skeleton` with shape props, Polaris ships `SkeletonPage` (page chrome), `SkeletonBodyText` (paragraph blocks), `SkeletonDisplayText` (headings/display type), `SkeletonThumbnail` (images/media), and `SkeletonTabs` (navigation tabs). WHY: Shopify's merchant-facing admin has a consistent, well-defined visual language. Each of these 5 content types appears on virtually every admin page. Having a named component for each type means developers can't misuse a generic block — if you need a heading skeleton, you use `SkeletonDisplayText`, which automatically has the right height, weight, and proportion. This prevents the "rectangular blocks everywhere" approach that produces skeletons that look nothing like the loaded content.

2. **Static vs dynamic content distinction** (HIGH) — Polaris documentation emphasizes that skeleton components should only represent dynamic (server-loaded) content, not static elements. WHY: Using a skeleton for a page title that always says "Products" creates a flash of fake content before the real identical content appears — a jarring micro-jank with no benefit. By only skeletonizing truly dynamic content, Polaris skeletons feel like genuine loading previews rather than theatrical performance. This is a philosophically important distinction that no other system among the six makes as explicitly.

3. **SkeletonPage as an orchestrating container** (HIGH) — `SkeletonPage` provides the full-page chrome (navigation, header, title area, primary action zone) while accepting `children` for the content area. WHY: Page chrome elements (breadcrumbs, page title, header actions) have the same visual treatment on every admin page. Rather than requiring developers to compose skeletons for the chrome plus the content area, Polaris handles the chrome automatically. This dramatically reduces the boilerplate of building a skeleton for a new admin page.

4. **`primaryAction` and `backAction` boolean props on SkeletonPage** (MEDIUM) — SkeletonPage accepts booleans for whether to render skeleton placeholders for the primary action button and back navigation. WHY: some admin pages have a primary action (e.g., "Save"), others don't. If you always rendered an action button skeleton, merchants would see a fake button on pages that don't have one — creating a false affordance that disappears on load. These boolean flags let developers precisely mirror the real page's action presence.

5. **`lines` prop on SkeletonBodyText, `size` on SkeletonThumbnail** (MEDIUM) — SkeletonBodyText defaults to 3 lines; SkeletonThumbnail accepts `"small"`, `"medium"`, `"large"`, `"extraSmall"` sizes. WHY: content accuracy matters. A product with a two-paragraph description should show a skeleton with the approximate line count of those paragraphs. A thumbnail in a list might be a different size than one on a detail page. These props let developers tune shape fidelity without manual height overrides. The more the skeleton matches the final layout, the less jarring the content-load transition.

## Notable Props
- `SkeletonPage: title` — Can pass the real page title (e.g., "Products") as a string so static page titles appear immediately while dynamic content skeletonizes; encodes the static vs dynamic philosophy directly in the API
- `SkeletonPage: primaryAction` (boolean) — Whether to render an action button skeleton
- `SkeletonPage: fullWidth` / `narrowWidth` (booleans) — Mirror the real Page component's layout variants for accurate width representation
- `SkeletonBodyText: lines` (number, default 3) — Text block height fidelity
- `SkeletonThumbnail: size` — `"extraSmall"` | `"small"` | `"medium"` | `"large"` matching real thumbnail sizes
- `SkeletonTabs: count` (number) — Number of tab placeholders; `fitted` boolean for full-width tab sets

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard handling on any of the 5 components
- **Screen reader**: Polaris documentation does not explicitly detail ARIA implementation for skeleton components. The semantic DOM structure (proper use of headings, landmarks in the page chrome) provides inherent structure, but loading-state announcements are not built-in. The recommended practice is to manage `aria-busy="true"` on the page container and use `aria-live="polite"` for loading completion messages
- **ARIA**: No confirmed built-in `role="status"`, `aria-live`, or `aria-label="loading"` in the skeleton components. This is a known gap; Polaris's a11y documentation for these components focuses on visual structure rather than assistive technology integration

## Strengths & Gaps
- **Best at**: Shape fidelity through content-type-specific components; the static vs dynamic content distinction is the clearest conceptual framework for when to skeleton; SkeletonPage's orchestration of chrome reduces developer boilerplate dramatically
- **Missing**: No built-in accessibility announcements for screen readers; no shimmer/pulse animation documented (appears to be a static CSS approach); no explicit `prefers-reduced-motion` guidance; the 5-component approach requires more code than single-component systems for simple use cases
