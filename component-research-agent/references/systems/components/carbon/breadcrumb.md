---
system: IBM Carbon Design System
component: Breadcrumb
url: https://carbondesignsystem.com/components/breadcrumb/usage/
last_verified: 2026-03-28
---

# Breadcrumb

## Approach
Carbon Design System includes a mature Breadcrumb component that reflects IBM's enterprise web application needs. In IBM Cloud, IBM Watson products, and IBM's suite of enterprise tools, deep navigation hierarchies are common — a user might be several levels deep within a resource group, within a region, within a project. The breadcrumb component is a standard wayfinding tool in Carbon's layout patterns. Carbon's Breadcrumb is notably conservative in its feature set compared to Spectrum — it does not include automatic collapse behavior, instead relying on the consumer to provide the correct subset of breadcrumb items that fits the space. This conservatism is intentional: Carbon prefers predictable, low-complexity components over smart-but-opaque behavior that might surprise developers.

A distinctive Carbon feature is its optional "current page" breadcrumb item — the last item in the trail can optionally be included as a non-link text item showing the current page title, or excluded (relying on the page header to communicate current position). Both patterns are documented and valid in Carbon, giving teams flexibility based on their layout needs.

## Key Decisions
1. **No automatic collapse — consumer controls visible items** (HIGH) — Carbon explicitly does not implement automatic truncation or collapse. Teams are expected to decide which items to show and to implement any truncation logic themselves. This is consistent with Carbon's philosophy of predictability over magic: a component that automatically hides items is harder to reason about and test than one that renders exactly what you give it.
2. **Optional current page item** (HIGH) — Carbon's breadcrumb documentation explicitly discusses whether to include the current page as the last item. The guidance is: include it when the page title is not already prominent in the layout (e.g., a page without a visible H1 header); omit it when the page title is shown elsewhere. This context-sensitive guidance reflects Carbon's enterprise documentation quality.
3. **`noTrailingSlash` prop** (MEDIUM) — Carbon provides a prop to control whether a trailing slash appears after the last visible breadcrumb item. This is a details-oriented decision for teams with strict URL style guides who don't want visual inconsistency between the breadcrumb display and their URL scheme.
4. **Skeleton state** (MEDIUM) — Carbon provides a `BreadcrumbSkeleton` component for loading states. This is consistent with Carbon's general approach of providing skeleton variants for all components that display dynamic data. In enterprise applications where navigation hierarchy is fetched from APIs, showing a skeleton breadcrumb prevents layout shift when the path data loads.

## Notable Props
- `noTrailingSlash`: Removes the trailing slash after the last item
- `BreadcrumbItem`: Individual item component with `href`, `isCurrentPage`, and `onClick`
- `isCurrentPage`: Marks the item as the current page (renders as text, not a link, with `aria-current="page"`)

## A11y Highlights
- **Keyboard**: All breadcrumb items with `href` are standard `<a>` elements, fully keyboard accessible via Tab and activatable with Enter
- **Screen reader**: The breadcrumb is wrapped in `<nav aria-label="breadcrumb">`; items with `isCurrentPage` render as `<span aria-current="page">` rather than a link; separators (/) are rendered as `aria-hidden` to avoid being announced
- **ARIA**: `<nav aria-label="breadcrumb">` landmark; `aria-current="page"` on current item; separators hidden from assistive technology; follows W3C breadcrumb ARIA pattern

## Strengths & Gaps
- **Best at**: Clean, predictable implementation with excellent a11y compliance (W3C ARIA pattern followed precisely), skeleton state for loading, and clear documentation on current-page inclusion patterns
- **Missing**: No automatic truncation/collapse for long paths — enterprise IBM apps with deep hierarchies must implement their own truncation logic, which creates inconsistency across different IBM products
