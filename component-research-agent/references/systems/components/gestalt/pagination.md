---
system: Gestalt (Pinterest)
component: Pagination
url: https://gestalt.pinterest.systems/web/pagination
last_verified: 2026-03-28
confidence: medium
---

# Pagination

## Approach
Gestalt's Pagination component provides previous/next navigation with page number display. Pinterest's feed-centric product primarily uses infinite scroll, so the Pagination component is used mainly in admin interfaces and settings pages. It is a relatively simple component compared to other design systems, focusing on the core prev/next pattern with current page indication.

## Key Decisions
1. **Controlled component** (HIGH) — `currentPage`, `totalCount`, `pageSize`, and `onPageChange` give full control to the parent. No internal state, consistent with Gestalt's preference for controlled patterns.
2. **accessibilityLabel required** (HIGH) — Gestalt requires an explicit `accessibilityLabel` on the nav element to ensure screen reader users understand the pagination's purpose in context.

## Notable Props
- `currentPage`: controlled current page
- `totalCount`: total items (used to calculate page count)
- `pageSize`: items per page
- `onPageChange`: callback with next page number
- `accessibilityLabel`: nav aria-label

## A11y Highlights
- **Keyboard**: Prev/next buttons keyboard accessible
- **Screen reader**: nav with accessibilityLabel; prev/next buttons labeled; current page announced
- **ARIA**: nav landmark with explicit label

## Strengths & Gaps
- **Best at**: Required accessibilityLabel; controlled state; totalCount-based page calculation
- **Missing**: No numbered page buttons; no items-per-page selector; minimal feature set
