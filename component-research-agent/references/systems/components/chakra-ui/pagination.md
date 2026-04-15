---
system: Chakra UI
component: Pagination
url: https://chakra-ui.com/docs/components/pagination
last_verified: 2026-03-28
confidence: high
---

# Pagination

## Approach
Chakra UI v3 includes a Pagination component with prev/next controls and page number buttons. The component handles ellipsis display for large page counts and integrates with Chakra's token system. It provides a composable API with Pagination.Root, Pagination.PrevTrigger, Pagination.NextTrigger, Pagination.Items, and Pagination.PageText.

## Key Decisions
1. **Composable parts** (HIGH) — The split into separate trigger, items, and text components allows flexible layout — some products want [< Prev] [1 2 3 ...] [Next >] and others want [1/50] [< >]. The composable parts handle both.
2. **siblingCount** (MEDIUM) — Controls how many page buttons appear around the current page, configuring the ellipsis display.

## Notable Props
- `count`: total items (not pages)
- `pageSize`: items per page
- `page` / `onPageChange`: controlled state
- `siblingCount`: pages around current

## A11y Highlights
- **Keyboard**: All buttons keyboard navigable
- **Screen reader**: nav landmark; aria-current="page" on active page; prev/next labeled
- **ARIA**: Complete pagination ARIA

## Strengths & Gaps
- **Best at**: Composable parts for layout flexibility; siblingCount control; v3 Ark UI integration
- **Missing**: No items-per-page selector built-in
