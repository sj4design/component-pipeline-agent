---
system: Fluent 2 (Microsoft)
component: Pagination
url: https://fluent2.microsoft.design/components/web/react/
last_verified: 2026-03-28
confidence: medium
---

# Pagination

## Approach
Fluent 2 does not have a dedicated Pagination component in its core library. Microsoft's enterprise applications typically implement pagination as a custom pattern combining Fluent 2 Button, Input, and Text components. Some Microsoft products use infinite scroll or virtualized lists (via Fluent's VirtualizedList patterns) as alternatives to traditional pagination.

## Key Decisions
1. **No dedicated pagination component** (MEDIUM) — Fluent 2 focuses on lower-level primitives. Pagination is typically composed from Button, Text, and Select components. The DataGrid component has built-in pagination capability for table contexts.

## Notable Props
- N/A (composed from Button, Select, Text)

## A11y Highlights
- N/A (depends on composition)

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No standalone Pagination component; teams compose from primitives or use DataGrid's built-in pagination
