---
system: Base Web (Uber)
component: Pagination
url: https://baseweb.design/components/pagination/
last_verified: 2026-03-28
confidence: medium
---

# Pagination

## Approach
Base Web's Pagination component provides prev/next navigation with a page selector dropdown for jumping to specific pages. This differs from the traditional numbered-button approach — instead of rendering individual page number buttons, it uses a Select-style dropdown for page selection, which scales to any number of pages without layout issues.

## Key Decisions
1. **Dropdown page selector instead of numbered buttons** (HIGH) — The page selector is a `<select>` or Base Web Select, allowing users to jump to any page without rendering many page buttons. This is more practical for large page counts (100+ pages) in data-heavy Uber internal tools.
2. **Overrides for all sub-elements** (HIGH) — PrevButton, NextButton, Select, Root all accept override components, fitting the Base Web customization model for teams with custom button or select implementations.
3. **numPages + currentPage controlled pattern** (MEDIUM) — Fully controlled via `numPages`, `currentPage`, and `onPageChange`, with no internal state management.

## Notable Props
- `numPages`: total page count
- `currentPage`: controlled current page
- `onPageChange`: callback with `{ nextPage }`
- `labels`: customize prev/next button labels
- `overrides`: PrevButton, NextButton, Select, Root

## A11y Highlights
- **Keyboard**: Prev/next buttons keyboard accessible; page selector keyboard accessible via Select
- **Screen reader**: Buttons and select labeled; page context announced
- **ARIA**: Standard button and select ARIA

## Strengths & Gaps
- **Best at**: Dropdown page selection for large page counts; overrides pattern; controlled state
- **Missing**: No numbered page buttons variant; no items-per-page selector built-in
