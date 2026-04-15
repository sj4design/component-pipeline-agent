---
component: DatePicker
tier: 2
last_verified: 2026-03-28
---

# DatePicker — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | DatePicker (via Input) | Native input[type=date]; no custom calendar UI | high |
| Salesforce Lightning | Datepicker | Custom calendar popup triggered from input; cross-browser consistent | high |
| GitHub Primer | DatePicker (not present) | Not present; native input[type=date] via TextInput | high |
| shadcn/ui | Calendar / DatePicker | react-day-picker wrapped in Popover; full custom calendar UI | high |
| Playbook | DatePicker | Custom calendar with dual React/Rails support | medium |
| REI Cedar | CdrDatePicker | Custom calendar picker; WCAG 2.1 AA explicit commitment | medium |
| Wise Design | DatePicker | Calendar picker for transfer/expiry dates; financial context | low |
| Dell Design System | DatePicker | Enterprise form calendar picker | low |

## Key Decision Patterns

**Native vs. custom calendar:** Paste (and Primer) use native input[type=date] — zero JS, mobile-native, but inconsistent cross-browser appearance. Lightning, shadcn/ui, Cedar, and Playbook use custom calendar UIs for consistent appearance and richer features (range selection, disabled dates, locale control).

**Library basis:** shadcn/ui uses react-day-picker. Lightning builds its own. Paste relies on native browser. Cedar (Vue) builds custom. Playbook accommodates Rails ViewComponent + React.

**Range selection:** Lightning and shadcn/ui explicitly support date range selection. Paste/native does not without two separate inputs.

**Localization:** Native input[type=date] inherits system locale. Custom pickers (Lightning, shadcn/ui, Cedar) handle localization in JS.

## A11y Consensus
- Grid/calendar navigation: arrow keys between days, Page Up/Down for month navigation, Home/End for week start/end
- role="grid" with role="gridcell" for calendar days
- Selected date: aria-selected="true"; today: aria-current="date"
- Input label association via FormField/FormControl wrapper

## Recommended Use
Use native input[type=date] (Paste approach) for simple date entry in mobile-critical contexts. Use custom calendar (shadcn/ui, Lightning) when date ranges, disabled dates, or cross-browser appearance consistency is required.
