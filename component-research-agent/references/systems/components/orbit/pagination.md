---
system: Orbit (Kiwi.com)
component: Pagination
url: https://orbit.kiwi/components/navigation/pagination/
last_verified: 2026-03-29
confidence: high
---

# Pagination

## Approach
Orbit's Pagination component is designed for flight search results, where users commonly need to navigate across dozens of pages of available flights filtered by time, price, and airline. The component provides previous/next controls along with numbered page buttons, supporting the mental model of "I'm on page 3 of 12 results" that frequent travelers use when scanning for specific departure windows. Because search result pages on Kiwi.com are fetched asynchronously, the Pagination component is purely presentational — it reports the selected page to the parent and lets the application manage data fetching, keeping the component stateless and reusable.

## Key Decisions
1. **Controlled/stateless design** (HIGH) — Pagination reports `onPageChange` events and accepts `currentPage` and `pageCount` as props, making it fully controlled. This is essential for a travel search product where page changes trigger API calls that the application layer must orchestrate.
2. **Truncation for large page counts** (HIGH) — When search results span many pages, the component truncates the middle range (e.g., 1 2 3 … 11 12), preventing the control from overwhelming the search results UI.
3. **Mobile-friendly prev/next focus** (MEDIUM) — On small screens, numbered page buttons are reduced to previous/next controls only, prioritizing touch-friendliness over page-count visibility.

## Notable Props
- `pageCount`: total number of pages
- `currentPage`: the active page (1-indexed)
- `onPageChange`: callback receiving the new page number
- `selectedPage`: alias/alternative to `currentPage` in some versions

## A11y Highlights
- **Keyboard**: All page buttons are keyboard-navigable; current page button is non-interactive or marked as active; prev/next always reachable via Tab.
- **Screen reader**: Wrapped in `<nav aria-label="Pagination">`; current page has `aria-current="page"`; prev/next buttons have descriptive `aria-label` values.
- **ARIA**: Each page button uses `aria-label="Page N"` to provide context beyond the visible number.

## Strengths & Gaps
- **Best at**: Flight search results pagination with large page counts; clean truncation; fully controlled for API-driven data.
- **Missing**: No "items per page" selector; no "jump to page" input for very large datasets; no infinite scroll integration.
