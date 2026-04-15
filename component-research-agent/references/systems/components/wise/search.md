---
system: Wise Design
component: Search
url: https://wise.design/components/search
last_verified: 2026-03-28
confidence: low
---

# Search

## Approach
Wise's Search is used for filtering transaction history and searching recipients/contacts in their financial product. The search experience is focused on data filtering rather than product discovery. Clean minimal input with clear functionality.

## Key Decisions
1. **Transaction filter search** (MEDIUM) — Primary use case is filtering the transaction list and finding transfer recipients.
2. **Minimal UI** (MEDIUM) — Consistent with Wise's clean aesthetic; search input without heavy adornment.
3. **Clear button** (LOW) — Clear control for resetting filter state.

## Notable Props
- `value`, `onChange`, `placeholder`

## A11y Highlights
- **Keyboard**: Type to filter; clear button accessible
- **Screen reader**: Search role announced
- **ARIA**: role="searchbox" expected

## Strengths & Gaps
- **Best at**: Financial data filtering search
- **Missing**: Low confidence — limited documentation
