---
system: Twilio Paste
component: Pagination
url: https://paste.twilio.design/components/pagination
last_verified: 2026-03-28
confidence: high
---

# Pagination

## Approach
Twilio Paste's Pagination provides both a standard page navigation component and an Arrow Pagination variant (for simple prev/next without page numbers). Standard pagination includes page number buttons, prev/next controls, and optional first/last page buttons. Used in the Twilio console for navigating through API resource lists (phone numbers, messages, services).

## Key Decisions
1. **Arrow Pagination variant** (HIGH) — Simple prev/next arrow pagination without page numbers, appropriate for API resource lists where total count isn't always known and Twilio's cursor-based API pagination doesn't expose total pages.
2. **Semantic nav landmark** (HIGH) — Pagination wraps in a nav element with aria-label="pagination navigation" for proper landmark navigation.
3. **Current page communication** (HIGH) — Current page button has aria-current="page" to communicate current position to screen readers.

## Notable Props
- `label`: Nav aria-label (e.g., "pagination navigation")
- `currentPage`: Current page for highlighting and aria-current
- `pageCount`: Total pages for generating page buttons
- `onPageChange`: Page selection callback

## A11y Highlights
- **Keyboard**: Tab through page buttons; Enter/Space activate
- **Screen reader**: nav landmark with label; current page announced via aria-current="page"; prev/next buttons labeled
- **ARIA**: nav aria-label; aria-current="page"; prev/next buttons have descriptive aria-labels

## Strengths & Gaps
- **Best at**: Arrow Pagination for cursor-based API lists; semantic nav landmark; aria-current page
- **Missing**: No go-to-page input; no items-per-page selector
