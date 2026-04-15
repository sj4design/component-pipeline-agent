---
system: Mantine
component: Table
url: https://mantine.dev/core/table/
last_verified: 2026-03-28
confidence: high
---

# Table

## Approach
Mantine's Table is a styled presentational table that covers common table display needs with a practical feature set: striped rows, highlighted rows on hover, row borders, caption placement, and horizontal scrolling via `ScrollArea` integration. The component uses Mantine's style system for consistent theming and supports both top and bottom caption positions. Mantine also provides a `DataTable` in the community packages, but the core Table is sufficient for most display use cases.

## Key Decisions
1. **withTableBorder and withColumnBorders** (MEDIUM) — Two separate border controls allow fine-grained table styling: outer border only, column separators only, both, or neither. This covers the main table styling variants seen in dashboards and data displays.
2. **highlightOnHover** (MEDIUM) — Adds row hover highlighting, useful for interactive tables where rows are clickable. Combined with `onClick` on rows, creates a full clickable row pattern with visual feedback.
3. **stickyHeader** (HIGH) — Built-in support for sticky column headers when the table is in a scrollable container. This is a commonly needed feature that Mantine handles without requiring extra CSS.

## Notable Props
- `striped`: boolean or `"odd" | "even"` — alternating row colors
- `highlightOnHover`: row hover effect
- `withTableBorder`: outer table border
- `withColumnBorders`: column separator borders
- `stickyHeader`: sticky column headers with scrollable body
- `stickyHeaderOffset`: offset for sticky header (useful with fixed navbar)
- `captionSide`: `"top" | "bottom"`

## A11y Highlights
- **Keyboard**: Standard table navigation; no interactive elements by default
- **Screen reader**: Semantic HTML table; `<caption>` rendered when caption provided; th elements for headers
- **ARIA**: Scope attributes on header cells; minimal ARIA needed due to semantic HTML

## Strengths & Gaps
- **Best at**: stickyHeader with offset; striped/hover/border controls; clean theming integration
- **Missing**: No sort, filter, or selection in core; no virtualization; no column resizing
