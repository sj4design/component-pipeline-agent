---
system: Wise Design
component: Table
url: https://wise.design/components/table
last_verified: 2026-03-28
confidence: low
---

# Table

## Approach
Wise's Table component is used for transaction history, fee comparison, and account statement displays in their financial product. The financial context means tables frequently show monetary amounts with appropriate alignment, date columns, and status indicators. Wise's minimal design aesthetic applies to table styling with clean borders and readable typography.

## Key Decisions
1. **Financial data display** (MEDIUM) — Table design addresses financial data patterns: right-aligned currency amounts, status badges in cells, sortable transaction date columns.
2. **Clean minimal styling** (MEDIUM) — Minimal borders and background treatments consistent with Wise's product aesthetic.
3. **Responsive handling** (LOW) — Mobile-friendly table behavior for transaction history on mobile.

## Notable Props
- Standard table row/column structure expected
- `sortable`: Column sort support expected

## A11y Highlights
- **Keyboard**: Standard table navigation expected
- **Screen reader**: Semantic table structure expected
- **ARIA**: Standard table ARIA expected

## Strengths & Gaps
- **Best at**: Financial transaction and fee display tables
- **Missing**: Low confidence — limited public documentation
