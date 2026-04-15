---
system: Fluent 2 (Microsoft)
component: DatePicker
url: https://fluent2.microsoft.design/components/web/react/datepicker/usage
last_verified: 2026-03-28
confidence: high
---

# DatePicker

## Approach
Fluent 2's DatePicker is a mature, feature-rich component designed to serve Microsoft's vast product portfolio — from Office applications to Azure dashboards to consumer apps. It separates the DatePicker (input + popover trigger) from the Calendar component, allowing the calendar grid to be used independently in scheduling UIs. The component has deep localization support using Microsoft's own internationalization infrastructure and handles multiple calendar systems. Fluent 2 also provides a DateRangePicker variant. The component emphasizes keyboard accessibility and is designed to work seamlessly in both web and desktop application contexts.

## Key Decisions
1. **Separate Calendar component** (HIGH) — Like Spectrum, Fluent 2 separates the Calendar grid from the DatePicker trigger. This allows Azure dashboards and Teams scheduling features to embed a calendar inline without an input wrapper, reflecting Microsoft's diverse product surface needs.
2. **Strings prop for full localization** (HIGH) — A `strings` prop accepts an object of all user-facing strings (button labels, month names, navigation text), enabling full localization without a built-in i18n framework dependency. This is critical for Microsoft's global products.
3. **highlightSelectedMonth and showGoToToday** (MEDIUM) — These props reflect Office-specific patterns where users need visual context about the current selection and quick navigation back to today. They encode Outlook Calendar behavior into the component API.

## Notable Props
- `value` / `onSelectDate`: controlled date value and change callback
- `minDate` / `maxDate`: date range constraints
- `strings`: full localization object
- `showGoToToday`: shows "Go to today" navigation button
- `highlightCurrentMonth` / `highlightSelectedMonth`: visual indicators
- `calendarAs`: allows replacing the internal Calendar component
- `textField`: overrides the input rendering

## A11y Highlights
- **Keyboard**: Arrow keys for day navigation; Page Up/Down for month; Alt+Page Up/Down for year; Home/End for week boundaries
- **Screen reader**: Full ARIA grid implementation; cell content announced with day number and selection state; month changes announced via live region
- **ARIA**: `role="grid"` on calendar; `aria-selected` on cells; `aria-describedby` for date constraints

## Strengths & Gaps
- **Best at**: Deep localization; Calendar as independent component; Office/enterprise patterns like "Go to today"
- **Missing**: No inline date picker mode without composing Calendar separately; very large bundle if only date input is needed
