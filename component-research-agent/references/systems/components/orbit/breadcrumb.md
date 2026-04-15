---
system: Orbit (Kiwi.com)
component: Breadcrumbs
url: https://orbit.kiwi/components/navigation/breadcrumbs/
last_verified: 2026-03-29
confidence: high
---

# Breadcrumb

## Approach
Orbit's Breadcrumbs component is tuned for the linear, funnel-style navigation of a travel booking flow: Search → Results → Booking → Payment → Confirmation. Because this is a transactional funnel rather than a content hierarchy, the breadcrumb serves primarily as a progress indicator and a way to backtrack without losing entered data — not as a deep site-map navigation tool. The component renders as a horizontal list of links separated by chevrons, with the current step visually distinguished. On mobile viewports it collapses to show only the previous step and the current step, conserving horizontal space.

## Key Decisions
1. **Funnel-optimized truncation** (HIGH) — On small screens only the immediately preceding step is shown, keeping the interface clean while still providing a single back-navigation anchor, which is the most needed action on mobile.
2. **`onGoBack` callback** (HIGH) — In addition to standard link navigation, Orbit's breadcrumbs expose an explicit back-navigation handler so the booking app can intercept navigation and preserve form state or trigger confirmation dialogs before leaving a step.
3. **Separator as chevron** (MEDIUM) — Uses a directional chevron (›) rather than a slash, reinforcing the sequential, directional nature of the booking funnel.

## Notable Props
- `children`: `BreadcrumbItem` nodes, each with `href` and label
- `onGoBack`: callback triggered when the back action is invoked (mobile collapse mode)
- `spaceAfter`: controls bottom margin for layout composition

## A11y Highlights
- **Keyboard**: All breadcrumb links are keyboard-navigable via Tab; Enter activates navigation.
- **Screen reader**: Wrapped in `<nav aria-label="Breadcrumb">`; current page item has `aria-current="page"`.
- **ARIA**: Uses an ordered list (`<ol>`) internally to convey sequence to assistive technology.

## Strengths & Gaps
- **Best at**: Linear booking funnel navigation with mobile-friendly collapse and back-navigation callbacks for state preservation.
- **Missing**: No support for non-linear hierarchical navigation (e.g., deep content trees); no ellipsis truncation for very long paths.
