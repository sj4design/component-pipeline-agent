---
component: Breadcrumb
tier: 3
last_verified: 2026-03-29
---

# Breadcrumb — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Breadcrumb | Semantic HTML structure (`nav > ol > li > a`) with CSS-generated separators hidden from AT; correct ARIA but no overflow handling. | high |
| Chakra UI | Breadcrumb | `isCurrentPage` prop applies `aria-current="page"` and de-links the last item; `BreadcrumbSeparator` accepts any content; polymorphic link via `as` prop. | high |
| GOV.UK | Breadcrumbs | `collapseOnMobile` shows only parent on small screens; Nunjucks macro for server-side rendering; explicitly not for transactional/form flows. | high |
| Base Web | Breadcrumbs | Override-based separator and StyledLink integration; minimal default styling; no mobile collapse built-in. | medium |
| Fluent 2 | Breadcrumb | Separate `BreadcrumbButton` and `BreadcrumbLink` sub-components for non-navigation vs. navigation actions; size variants; icon support in items. | high |
| Gestalt | Breadcrumbs | Data-array API (`items: [{href, label}]`); automatic current-page detection from last item; no custom separator support. | medium |
| Mantine | Breadcrumbs | Children-as-items (not data array); any React node as separator; no automatic nav landmark or `aria-current` — developer must add both manually. | high |
| Orbit | Breadcrumbs | Funnel-optimized: collapses to previous + current on mobile; `onGoBack` callback for state-preserving back navigation in booking flows. | high |
| Evergreen | Not available — SPA sidebar navigation replaces breadcrumbs | Segment's persistent sidebar nav makes breadcrumbs architecturally redundant; no breadcrumb component in scope. | high |
| Nord | nord-breadcrumb (Breadcrumb) | EHR deep-hierarchy navigation; composable `nord-breadcrumb-item` children with `href` for shareable deep links; automatic `aria-current` on item without `href`. | high |

## Key Decision Patterns

The biggest structural divergence in T3 breadcrumbs is between data-array APIs (Gestalt) and children-based composition (Chakra, Mantine, Fluent 2, Nord, Orbit). Gestalt's array approach ensures consistent separator injection and automatic current-page detection at the cost of flexibility. Mantine's children approach gives full per-item rendering control but shifts responsibility for ARIA and nav landmark to the developer — a notable gap that Mantine documents explicitly.

Orbit is the only T3 system that fundamentally reframes the breadcrumb's purpose. Rather than a site-map navigator, Orbit's breadcrumb is a booking-funnel progress tracker, complete with an `onGoBack` callback that allows state-preserving back navigation. This pattern — intercepting navigation to preserve form state — is a real-world travel booking need that no other T3 system addresses.

Fluent 2's `BreadcrumbButton` vs. `BreadcrumbLink` semantic split is a meaningful contribution. Many breadcrumb implementations use `<a>` for everything and style some items as non-interactive text. Fluent 2 formalizes the distinction: links for URL navigation, buttons for in-page actions triggered from a breadcrumb item (e.g., "open folder picker"). This is the correct semantic separation and rarely seen elsewhere.

Evergreen's absence is the most thoroughly explained absence in the T3 set. Rather than "we haven't built it," Evergreen documents why their SPA sidebar architecture makes breadcrumbs redundant — a useful architectural argument for teams evaluating navigation patterns.

## A11y Consensus

- The correct breadcrumb structure is `<nav aria-label="breadcrumb">` wrapping an `<ol>` of link items — every system that implements breadcrumbs follows this pattern.
- The current page item receives `aria-current="page"` and is rendered as non-interactive text (not a link) — users should not navigate to where they already are.
- Separators between items must be hidden from assistive technology via `aria-hidden` or CSS pseudo-elements; they are visual punctuation, not content.
- Nord explicitly adds `role="list"` to preserve list semantics in browsers that strip semantics from CSS-styled lists — a rarely documented but important edge case.
- Mantine is the only system that does not automatically apply the nav landmark or `aria-current`, requiring developers to add both — a documented accessibility gap.

## Recommended Use

Reference T3 breadcrumb approaches when deciding on API shape (data array vs. children composition), mobile truncation strategy (GOV.UK's `collapseOnMobile` vs. Orbit's funnel collapse), and semantic separation of navigation actions (Fluent 2's Button/Link split). Nord is the reference for EHR deep-hierarchy navigation with shareable URLs; Orbit is the reference for transactional funnel breadcrumbs with back-navigation state management.
