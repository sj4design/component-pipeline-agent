---
system: Atlassian DS
component: DatePicker / Calendar
url: https://atlassian.design/components/datetime-picker/date-picker/
last_verified: 2026-03-28
---

# DatePicker / Calendar

## Approach
Atlassian's date picker philosophy is shaped by one insight: Jira/Confluence users interact with dates constantly — project managers set due dates hundreds of times per week. Every extra keystroke multiplies across a user's week. This drives a keyboard-efficiency-first design. Atlassian provides DatePicker (single with popover) and Calendar (standalone) as separate components but notably has no dedicated DateRangePicker. In Jira, "Start date" and "Due date" are independent fields with independent validation. A range picker implies coupling, but in project management you often set start without knowing end. This isn't a gap — it's a deliberate product-context decision.

## Key Decisions
1. **No dedicated DateRangePicker** (HIGH) — Ranges are handled by pairing two independent DatePickers. In project management, start and end dates are set independently and have separate validation. A unified range picker implies coupling that doesn't match the workflow.
2. **`disabledDateFilter` as callback function** (HIGH) — A function that receives a date string and returns boolean, called per visible calendar date. Atlassian's products have complex rules (sprint boundaries, release dates, per-team schedules) that static arrays can't express.
3. **Keyboard-first with optional calendar button** (MEDIUM) — `shouldShowCalendarButton` prop makes the trigger optional. Power users (Jira keyboard shortcut enthusiasts) don't want to reach for a calendar icon. Calendar opens on input focus or keypress.
4. **Explicit validation messages for disabled dates** (MEDIUM) — When a user types a disabled date, they get "Please enter a future date" or "Please enter a date within the sprint" — unlike Polaris's silent revert. In project management, knowing WHY a date is rejected is actionable information.

## Notable Props
- `disabledDateFilter`: Callback for dynamic date evaluation — supports rule-based disabling.
- `formatDisplayLabel`: Custom formatting function for display vs stored value separation.
- `shouldShowCalendarButton`: Boolean to hide/show calendar trigger — keyboard-first option.
- `spacing`: "compact" | "default" — matches Atlassian's density system.

## A11y Highlights
- **Keyboard**: Tab to focus, Enter to open calendar, arrow keys navigate dates, Enter selects. Escape closes. Text entry always accepted.
- **Screen reader**: Focus announces selected date. Disabled dates include reason. `aria-expanded` indicates calendar state.
- **ARIA**: `aria-haspopup` on trigger, proper focus management returning to input after close.

## Strengths & Gaps
- **Best at**: Keyboard efficiency, validation messaging, `disabledDateFilter` callback for dynamic rules.
- **Missing**: No range picker. No presets. No range highlighting. Limited calendar customization.
