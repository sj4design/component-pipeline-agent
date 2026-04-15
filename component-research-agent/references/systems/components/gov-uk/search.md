---
system: GOV.UK Design System
component: Search (via Text Input with button pattern)
url: https://design-system.service.gov.uk/patterns/search/
last_verified: 2026-03-28
confidence: high
---

# Search

## Approach
GOV.UK handles search as a pattern rather than a component — it combines a text input with a submit button inside a `<form role="search">`. The GOV.UK header includes a standard search component. Site-wide search uses this form pattern, which works without JavaScript and integrates with the GOV.UK frontend JavaScript for autocomplete suggestions. The pattern is thoroughly documented with guidance on placement, placeholder text, and button labeling.

## Key Decisions
1. **Form-based search** (HIGH) — Search is implemented as a form with input + button, which works without JavaScript, supports keyboard activation (Enter submits), and creates the correct `role="search"` landmark. This is the most accessible search implementation.
2. **No autocomplete in core** (MEDIUM) — The basic pattern doesn't include autocomplete suggestions, which requires JavaScript. GOV.UK's JavaScript-enhanced search uses accessible autocomplete libraries.

## Notable Props
- Standard HTML form attributes
- Input: `type="search"`, `name`, `id`, `aria-label` or `<label>`
- Button: text "Search" (not just an icon)

## A11y Highlights
- **Keyboard**: Enter submits; standard input navigation
- **Screen reader**: `role="search"` form landmark; visible "Search" button (not icon-only)
- **ARIA**: Search landmark for navigation; no icon-only buttons (always visible label text)

## Strengths & Gaps
- **Best at**: No-JS form submission; role="search" landmark; visible button label
- **Missing**: No autocomplete; no instant search; no search results announcement
