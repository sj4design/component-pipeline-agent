---
system: Nord (Nordhealth)
component: Search Input (via nord-input type="search")
url: https://nordhealth.design/components/input/
last_verified: 2026-03-28
confidence: low
---

# Search Input

## Approach
Nord likely handles search through its Input web component with type="search" rather than a dedicated Search component. Healthcare search contexts include searching patient records, searching medication databases, and filtering clinical lists. The web component approach means search inputs use the same Input component with appropriate type and icon decoration.

## Key Decisions
1. **Input-based search** (MEDIUM) — Consistent with other healthcare-focused systems that prioritize familiar, reliable input patterns over specialized search components.

## Notable Props
- nord-input: `type="search"`, standard input props
- Verify dedicated SearchInput existence at nordhealth.design

## A11y Highlights
- **Keyboard**: Native search behavior; Escape clears
- **Screen reader**: Search input semantics
- **ARIA**: role="search" on form wrapper

## Strengths & Gaps
- **Best at**: Reliable search input for healthcare contexts
- **Missing**: Verify at nordhealth.design; likely no autocomplete or specialized search behavior
