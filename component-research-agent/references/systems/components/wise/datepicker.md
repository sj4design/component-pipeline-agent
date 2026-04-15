---
system: Wise Design
component: DatePicker
url: https://wise.design/components/date-picker
last_verified: 2026-03-28
confidence: low
---

# DatePicker

## Approach
Wise Design System (Wise, formerly TransferWise) serves a financial product context where date selection is used for transaction filters, scheduling transfers, and date-of-birth inputs. The system emphasizes simplicity and clarity over feature richness, consistent with Wise's product philosophy of reducing friction in financial UX. Based on available knowledge, the DatePicker follows Wise's clean, minimal aesthetic with a custom calendar popover. Limited public documentation means some specifics are uncertain.

## Key Decisions
1. **Minimal calendar UI** (MEDIUM) — Wise's design language favors simplicity; the DatePicker likely uses a clean, unadorned calendar with minimal decoration, consistent with their financial product UX standards.
2. **Input + popover pattern** (MEDIUM) — Text input with calendar trigger is the standard pattern for financial contexts where users may need to type specific dates (for transaction filtering) quickly.
3. **Financial context constraints** (MEDIUM) — Date constraints and formatting are likely first-class given financial use cases (no future dates for transactions, date-of-birth validation, etc.).

## Notable Props
- `value`: Controlled date value
- `onChange`: Selection callback
- `minDate` / `maxDate`: Date constraint boundaries
- `disabled`: Disable the entire picker

## A11y Highlights
- **Keyboard**: Standard calendar keyboard navigation expected
- **Screen reader**: Date announcements on grid cells expected
- **ARIA**: Standard calendar ARIA patterns expected

## Strengths & Gaps
- **Best at**: Clean, minimal date selection appropriate for financial product contexts
- **Missing**: Limited public documentation; full API surface and advanced features not well-documented externally
