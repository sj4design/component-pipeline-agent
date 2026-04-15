---
system: IBM Carbon Design System
component: Tag (Carbon's badge-equivalent label component)
url: https://carbondesignsystem.com/components/tag/usage/
last_verified: 2026-03-28
---

# Badge

## Approach
Carbon Design System calls its badge-equivalent component "Tag" rather than "Badge," which signals an important philosophical distinction. In Carbon's world — built around IBM's enterprise data and B2B software products — the dominant use case is categorization and filtering, not notification counts. A Tag in Carbon is a label that classifies an item (e.g., "In progress," "Draft," "AI-generated") and can optionally be interactive (dismissible or filterable). Carbon explicitly separates the notification-count badge pattern as a different concern, typically handled inline in navigation or data grid contexts rather than as a standalone component. The Tag component comes in two main forms: a read-only label and a dismissible tag used in filter UIs. This bifurcation exists because IBM's product teams needed a way to build filter chips (user-removable tags) and status labels from the same base, avoiding two separate components that would diverge in styling over time.

## Key Decisions
1. **"Tag" naming over "Badge"** (HIGH) — The naming choice communicates the primary use case: categorization. IBM's research on enterprise workflows found that users think about tags as classifiers ("this item belongs to category X"), not as alerts. Using the word "Badge" would suggest notification or achievement semantics that don't fit most Carbon use cases.
2. **Dismissible vs. read-only variant** (HIGH) — Carbon provides a `filter` variant of Tag that includes an X button for removal, specifically designed for filter chip UIs. This is a direct response to the pattern in IBM products where users build complex filter sets and need to remove individual filters without clearing all. The close button gets its own focus and keyboard interaction, separate from the tag label.
3. **Semantic color set** (MEDIUM) — Tags come in a fixed set of semantic colors (red, magenta, purple, blue, cyan, teal, green, gray, cool-gray, warm-gray) plus an `outline` variant. Rather than mapping to abstract statuses, Carbon uses descriptive color names, giving teams flexibility to assign meaning contextually rather than enforcing a fixed status vocabulary across all IBM products.
4. **Size variants: sm, md, lg** (MEDIUM) — Three explicit sizes allow Tags to be used in dense data grids (sm) as well as in more spacious content areas (lg). This is an enterprise-data-first decision — in tables with 50+ rows, a small tag wastes minimal space while still being legible.
5. **Operational Tag for interactive click behavior** (MEDIUM) — Carbon added an "operational" tag variant that behaves as a button, supporting click events for filtering or selection. This variant emerged from patterns where clicking a tag should trigger a filter action rather than just displaying information.

## Notable Props
- `type`: Determines semantic color (red, blue, green, etc.) — notable because it's descriptive rather than semantic (unlike Polaris's "critical"/"success")
- `filter`: Boolean that adds the dismiss button and changes interaction model
- `size`: sm | md | lg — all three needed for enterprise density requirements

## A11y Highlights
- **Keyboard**: Dismissible tags receive focus as buttons; the close (X) button is separately focusable and activated with Enter or Space
- **Screen reader**: Tag text is read as-is; dismissible variant's close button has `aria-label="Clear filter [tag name]"` to provide context
- **ARIA**: Read-only tags render as `<span>`; interactive tags render as `<button>` or use `role="button"`; no `role="status"` or live region for count changes

## Strengths & Gaps
- **Best at**: Categorization labels and filter chips in dense enterprise data tables, with strong size flexibility
- **Missing**: No notification-count badge with positioning (anchoring to icons), no dot-mode indicator, and no overflow "99+" handling — the notification badge pattern requires custom implementation
