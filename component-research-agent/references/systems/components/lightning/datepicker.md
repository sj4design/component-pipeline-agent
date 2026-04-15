---
system: Salesforce Lightning Design System
component: Datepicker
url: https://lightningdesignsystem.com/components/datepickers/
last_verified: 2026-03-28
confidence: high
---

# Datepicker

## Approach
Salesforce Lightning's Datepicker is a fully custom calendar widget rendered as a popover, not relying on native input[type=date]. This gives Lightning full cross-browser visual consistency critical for enterprise CRM applications where UI uniformity across Windows/Mac enterprise browsers is required. The component includes a text input for manual entry alongside the calendar trigger, supporting both keyboard typing and visual date selection. It supports locale-aware date formatting and integrates with Lightning's form layout system.

## Key Decisions
1. **Custom calendar popover** (HIGH) — Fully custom calendar widget ensures identical appearance in Chrome, Firefox, IE11/Edge (critical for Salesforce's enterprise customer base), at the cost of significant ARIA implementation complexity.
2. **Dual input + calendar pattern** (HIGH) — Text input allows direct keyboard entry of dates while the calendar icon triggers the popover, accommodating power users and mouse users simultaneously.
3. **Locale/internationalization first** (HIGH) — Date format display adapts to locale settings, essential for Salesforce's global enterprise deployments across different regional date format conventions.

## Notable Props
- `value`: ISO 8601 date string for controlled usage
- `min` / `max`: Constrains selectable date range, disables out-of-range dates visually
- `dateStyle`: Controls display format (short, medium, long) for locale adaptation
- `disabled`: Disables both the text input and calendar trigger button

## A11y Highlights
- **Keyboard**: Arrow keys navigate calendar grid; Enter selects; Escape closes popover; Tab moves between month/year controls
- **Screen reader**: Calendar grid cells announced with full date; selected date communicated via aria-selected; current month/year in region landmark
- **ARIA**: role="dialog" on popover; role="grid" on calendar; aria-label on each day cell; aria-live for month navigation announcements

## Strengths & Gaps
- **Best at**: Enterprise-grade cross-browser consistency; locale/internationalization support; comprehensive keyboard navigation of the calendar grid
- **Missing**: Built-in date range selection (requires separate DateRange component); inline (non-popover) calendar variant
