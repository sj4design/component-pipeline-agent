---
system: Shopify Polaris
component: Not available as a standalone component (integrated into Page component)
url: https://polaris.shopify.com/components/layout-and-structure/page
last_verified: 2026-03-28
---

# Breadcrumb

## Approach
Shopify Polaris does not provide a standalone Breadcrumb component. Instead, breadcrumb-like back navigation is integrated directly into the Page component via a `backAction` prop. This is a deliberate architectural decision rooted in Shopify's e-commerce admin context and the way Shopify merchants navigate their store. In the Shopify admin, navigation is almost always one or two levels deep — you go from a list (Orders) to a detail (Order #1234), rarely deeper. Because the hierarchy is shallow, a full breadcrumb trail is rarely needed; a single "back to Orders" link is sufficient for the vast majority of navigation patterns in the admin.

By baking the back action into the Page component, Polaris ensures that every page in the Shopify admin has a consistent, standardized back-navigation affordance without requiring teams to compose breadcrumbs separately. The Page component's `backAction` renders as a "< [Previous page title]" link in the page header, which serves the same navigational purpose as a breadcrumb for shallow hierarchies. For teams using Polaris for non-Shopify applications that have deeper hierarchies, this is a genuine gap — there is no supported way to show a multi-level breadcrumb trail without building a custom component.

## Key Decisions
1. **Back action in Page, not standalone Breadcrumb** (HIGH) — Polaris chose to solve the navigation-context problem at the Page composition level rather than with a separate Breadcrumb component. This is correct for Shopify's 1-2 level hierarchy but constrains teams building deeper hierarchies on the Polaris design system. The decision reflects Polaris's product-specific rather than general-purpose philosophy.
2. **Single back-link model** (HIGH) — Rather than a full trail, Polaris shows only the immediate parent's title. This simplification works because Shopify merchants rarely need to jump 3 levels up — they go back one level and then navigate laterally. The cognitive model for Shopify admin is breadth (many types of things) over depth (deep nesting within things).
3. **No separator customization** (LOW) — Since there's no standalone Breadcrumb, there's no separator style, no separator character, and no customization surface for teams that need a different visual treatment.

## Notable Props
- Page `backAction`: `{ content: string, url?: string, onAction?: () => void }` — the single back navigation link
- No dedicated Breadcrumb component props

## A11y Highlights
- **Keyboard**: The `backAction` renders as a standard link (`<a>`) — fully keyboard accessible via Tab and Enter
- **Screen reader**: The back link's `content` prop serves as the accessible label; it announces as a standard link with the parent page's title
- **ARIA**: No breadcrumb-specific ARIA — the `<nav aria-label="Breadcrumb">` pattern is not used because there's only one link; it renders as a standalone link in the page header region

## Strengths & Gaps
- **Best at**: Clean, zero-config back navigation for the shallow 1-2 level hierarchies that dominate Shopify admin; always consistent because it's part of the Page component contract
- **Missing**: No multi-level breadcrumb for deeper hierarchies, no standalone component, no collapse/truncation, and no way to show 3+ levels of navigation context — teams building non-Shopify applications on Polaris must build breadcrumb from scratch
