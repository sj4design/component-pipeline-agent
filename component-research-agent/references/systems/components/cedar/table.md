---
system: REI Cedar
component: Table
url: https://cedar.rei.com/components/table
last_verified: 2026-03-28
confidence: medium
---

# Table

## Approach
REI Cedar's Table component is used for product comparison, size charts, and specification tables in REI's e-commerce context. The Vue-based component focuses on semantic table structure with Cedar's visual styling — clean borders, REI typography, and responsive behavior. Given the retail context, tables are often used for product specifications and size guides rather than complex data management.

## Key Decisions
1. **Content-display focus** (HIGH) — Cedar's table is optimized for content display (size charts, specifications) rather than data management features like sorting or inline editing, reflecting e-commerce use cases.
2. **Responsive scrolling** (HIGH) — Horizontal scroll wrapper for tables on narrow viewports, critical for mobile e-commerce where size charts and comparison tables need to work on small screens.
3. **Caption/summary support** (MEDIUM) — Accessible caption support for describing table content, important for screen reader users accessing product comparison tables.

## Notable Props
- `modifier`: Style modifier (borderless, compact variants)
- `caption`: Table caption for accessibility

## A11y Highlights
- **Keyboard**: Standard table navigation
- **Screen reader**: Caption announces table purpose; th scope attributes for header association
- **ARIA**: Semantic table structure; caption element

## Strengths & Gaps
- **Best at**: Product specification and size chart display; mobile scroll handling; Cedar brand consistency
- **Missing**: No sort or filter features; not a data grid; medium confidence on full API
