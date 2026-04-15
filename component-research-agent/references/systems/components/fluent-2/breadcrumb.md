---
system: Fluent 2 (Microsoft)
component: Breadcrumb
url: https://fluent2.microsoft.design/components/web/react/breadcrumb/
last_verified: 2026-03-28
confidence: high
---

# Breadcrumb

## Approach
Fluent 2's Breadcrumb renders a navigation trail with BreadcrumbItem, BreadcrumbButton, BreadcrumbLink, and BreadcrumbDivider sub-components. Items can be interactive (BreadcrumbButton/Link for past pages) or non-interactive (current page). The component supports icon display in items and has size variants (small, medium, large).

## Key Decisions
1. **BreadcrumbButton vs BreadcrumbLink** (HIGH) — Items that trigger navigation use BreadcrumbLink (renders `<a>`), while items triggering non-navigation actions (like opening a context menu) use BreadcrumbButton (renders `<button>`). This semantic distinction is enforced at the component level rather than relying on the as prop pattern.
2. **Size variants** (HIGH) — Small, medium, and large sizes control the text size and icon size across all breadcrumb items, matching the density needs of different surfaces (compact headers vs. large page headers).
3. **Icon support in items** (MEDIUM) — BreadcrumbButton and BreadcrumbLink accept icon props for adding icons before text, used in Microsoft products to represent file types or section types in navigation.

## Notable Props
- `size`: `"small" | "medium" | "large"`
- `BreadcrumbItem`: wrapper for each breadcrumb
- `BreadcrumbLink`: anchor element for navigation
- `BreadcrumbButton`: button element for non-navigation actions
- `BreadcrumbDivider`: separator element
- `current`: marks the current page item

## A11y Highlights
- **Keyboard**: Tab navigates between interactive items
- **Screen reader**: nav with aria-label="breadcrumb"; current item has aria-current="page"
- **ARIA**: Correct nav landmark and current page

## Strengths & Gaps
- **Best at**: BreadcrumbButton/Link semantic distinction; size variants; icon support; proper nav landmark
- **Missing**: No collapseOnMobile; no overflow/truncation for deep paths
