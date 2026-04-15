---
system: Adobe Spectrum
component: Breadcrumbs
url: https://react-spectrum.adobe.com/react-spectrum/Breadcrumbs.html
last_verified: 2026-03-28
---

# Breadcrumb

## Approach
Adobe Spectrum includes a Breadcrumbs component (note the plural naming) that reflects Adobe's experience with complex application hierarchies in products like Adobe Experience Manager, Adobe Analytics, and Adobe Experience Platform. These products have deep, multi-level navigation structures where users frequently navigate between sections, and breadcrumbs are essential wayfinding tools. Spectrum's Breadcrumbs component is built around the concept of an automatically collapsing trail: when the breadcrumb path is too long to display in the available width, Spectrum automatically collapses middle items into a "…" (ellipsis) menu that reveals the hidden ancestors on click. This automatic collapse behavior is what distinguishes Spectrum's implementation — it handles the responsive truncation problem that most teams struggle to implement correctly.

The component also handles a "root context" concept, where the first item in the path can be configured to always show regardless of how many middle items are collapsed. This is important for Adobe's applications because users always need to know which top-level product or workspace they're in, even when deep in a sub-hierarchy.

## Key Decisions
1. **Automatic middle-item collapse into menu** (HIGH) — When the breadcrumb trail exceeds available width, Spectrum automatically collapses middle items into an ellipsis button that opens a menu showing the hidden ancestors. This is the correct UX solution for long paths — showing a truncated trail is worse than showing a collapsed menu because the truncated trail gives the illusion of a complete path while hiding information. Spectrum's collapse-to-menu approach is clear about what's hidden.
2. **Root item always visible** (HIGH) — The `showRoot` prop (or equivalent configuration) ensures the first breadcrumb item (the root/home) always remains visible even during aggressive collapse. This is critical for context: users need to know which top-level space they're in (e.g., "Experience Platform" rather than just "…" > "Segments" > "Current Segment"). The root item anchors the user's mental model.
3. **`isDisabled` on individual items** (MEDIUM) — Spectrum allows marking specific breadcrumb items as disabled (non-clickable). This addresses the pattern in Adobe's products where certain hierarchy levels are informational (not navigable) — they appear in the path to show structure but don't correspond to navigable pages.
4. **Sizes: S and M** (LOW) — Two sizes allow breadcrumbs to fit in both compact application headers and more spacious page layouts.

## Notable Props
- `items`: Array of item descriptors with `key`, `children`, and optional `href`
- `isDisabled`: Can be applied to individual items to make them non-navigable
- `showRoot`: Ensures root item survives collapse
- `onAction`: Callback for item selection — Spectrum uses a key-based selection model consistent with its other list/menu components

## A11y Highlights
- **Keyboard**: Breadcrumb items are focusable links or buttons; Tab moves between items; Enter/Space activates the current item; the ellipsis menu button opens a dropdown navigable with arrow keys
- **Screen reader**: The `<nav>` landmark has `aria-label="Breadcrumbs"` automatically; the current page item has `aria-current="page"`; the ellipsis menu announces the number of hidden items
- **ARIA**: `role="list"` on the item container; each item in a `role="listitem"`; active item gets `aria-current="page"`; the ellipsis button has an accessible name indicating it reveals more items

## Strengths & Gaps
- **Best at**: The automatic collapse-to-menu behavior for long paths is the most technically complete truncation implementation in Tier 1; strong a11y with automatic `aria-current="page"` and named landmark
- **Missing**: No structured data markup (schema.org BreadcrumbList) — Spectrum is a UI component library, not a meta/SEO tool, so this is intentional but worth noting for web contexts
