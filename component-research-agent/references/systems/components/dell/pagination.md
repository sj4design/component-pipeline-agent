---
system: Dell Design System
component: Pagination
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Pagination

## Approach
Dell Design System's Pagination is used in enterprise management interfaces for navigating large device/server inventories and product catalog pages. Enterprise data pagination often handles thousands of records requiring robust page navigation.

## Key Decisions
1. **Large dataset pagination** (MEDIUM) — Navigating enterprise device inventories with potentially thousands of records.
2. **Items per page control** (MEDIUM) — Enterprise users likely need to adjust page size for their workflow.
3. **Record count display** (LOW) — Showing total record count for enterprise data management context.

## Notable Props
- Standard pagination props expected

## A11y Highlights
- **Keyboard**: Standard pagination keyboard behavior
- **Screen reader**: nav landmark; current page marked
- **ARIA**: Standard pagination ARIA

## Strengths & Gaps
- **Best at**: Enterprise large dataset pagination
- **Missing**: Low confidence — verify before use
