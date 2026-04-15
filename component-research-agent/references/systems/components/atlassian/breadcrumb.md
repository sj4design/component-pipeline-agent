---
system: Atlassian Design System
component: Breadcrumbs
url: https://atlassian.design/components/breadcrumbs
last_verified: 2026-03-28
---

# Breadcrumb

## Approach
Atlassian Design System includes a robust Breadcrumbs component (plural) that serves Confluence and Jira's complex navigation hierarchies. In Confluence, a page can be nested 5+ levels deep within spaces and folders; in Jira, users navigate through projects, boards, sprints, and issue details. These deep hierarchies make breadcrumbs essential — not optional — in Atlassian's product context. Atlassian's Breadcrumbs component handles the truncation problem with a "collapse" behavior: when there are more items than the configured maximum, middle items are replaced by an ellipsis button that expands the full trail on click. The first item and last item always remain visible, ensuring users always know their origin (space/project) and current position (page/issue).

The component is composed of a `Breadcrumbs` wrapper and individual `BreadcrumbsItem` components, allowing consumers to control exactly which items appear and their order. Each `BreadcrumbsItem` accepts an `href` and a custom component (for use with client-side routers like React Router), making the component framework-agnostic in terms of navigation handling.

## Key Decisions
1. **Expand-on-click for truncated middle items** (HIGH) — Atlassian's collapse behavior replaces middle items with an ellipsis button that reveals the full trail when clicked. This is the same pattern as Spectrum but implemented differently: Atlassian defaults to showing all items and collapses when `maxItems` is set, while Spectrum auto-detects overflow. The `maxItems` prop gives teams explicit control over when truncation kicks in, which is predictable but requires the team to know the typical path depth in advance.
2. **`maxItems` prop for explicit control** (HIGH) — Setting `maxItems` to 3 means Atlassian always shows first + ellipsis + last when path length exceeds 3. This is simpler to reason about than width-based auto-collapse, and in Atlassian's product context, the path depth is generally known (Confluence has a predictable hierarchy depth). The tradeoff is that on wide screens, items might collapse unnecessarily.
3. **Component prop for router integration** (MEDIUM) — Each `BreadcrumbsItem` accepts a `component` prop that replaces the underlying `<a>` tag with any custom component (e.g., React Router's `<Link>`). This is a practical decision for single-page applications where hard navigation (`<a href>`) causes unnecessary page reloads. Atlassian's own products use this for client-side navigation.
4. **Truncation tooltip on hover** (MEDIUM) — When breadcrumb item text is truncated due to being too long, Atlassian displays the full text in a tooltip on hover. This ensures users can always access the full path item name even when it's visually shortened.

## Notable Props
- `maxItems`: Number — collapses middle items when exceeded (explicit control over truncation threshold)
- `component` (BreadcrumbsItem): Replace the `<a>` tag with any router component
- `iconBefore` / `iconAfter` (BreadcrumbsItem): Add icons to individual breadcrumb items

## A11y Highlights
- **Keyboard**: All items are focusable links (or buttons for the ellipsis); Tab moves between them; Enter activates; the ellipsis button expands the collapsed items inline (no dropdown — items render in place)
- **Screen reader**: `<nav aria-label="Breadcrumbs">` wraps the component; the last item (current page) has `aria-current="page"`; the ellipsis button announces as "Show [N] more breadcrumbs" or equivalent
- **ARIA**: `<nav>` landmark with label; `aria-current="page"` on current item; separators are `aria-hidden`; collapsed items are in the DOM but hidden — they become visible (not inserted) when expanded, avoiding layout shift announcements

## Strengths & Gaps
- **Best at**: The `maxItems` explicit control is predictable for known-depth hierarchies; the `component` prop for router integration is the most practical for SPA teams; icon support on individual items is unique in Tier 1
- **Missing**: No automatic width-based collapse (width-responsive truncation requires manual `maxItems` tuning); no skeleton loading state for asynchronous path resolution
