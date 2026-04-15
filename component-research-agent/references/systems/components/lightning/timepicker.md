---
system: Salesforce Lightning Design System
component: Timepicker
url: https://lightningdesignsystem.com/components/timepicker/
last_verified: 2026-03-28
confidence: high
---

# Timepicker

## Approach
Salesforce Lightning provides a dedicated Timepicker component used across CRM contexts — scheduling calls, setting reminders, configuring business hours, and appointment scheduling in Service Cloud. Unlike native input[type=time], Lightning's Timepicker is a custom dropdown-based component that presents time options in a listbox, allowing consistent cross-browser appearance. Users can type a time directly or select from a dropdown list of time slots.

## Key Decisions
1. **Custom listbox dropdown** (HIGH) — Lightning uses a combobox-style input with a dropdown listbox of time options rather than native input[type=time], providing consistent cross-browser appearance critical in enterprise environments where browser diversity is high.
2. **Configurable time intervals** (HIGH) — The step/interval prop controls the time slot granularity shown in the dropdown (e.g., 15-minute or 30-minute intervals), important for scheduling contexts where specific intervals are required.
3. **Free-form text entry** (MEDIUM) — Users can type a time directly in addition to selecting from the dropdown, balancing speed for power users with discoverability for new users.

## Notable Props
- `value`: Controlled time value (HH:mm format)
- `onChange`: Change callback
- `stepInMinutes`: Interval between dropdown options (default 30)
- `minTime` / `maxTime`: Time range constraints
- `disabled`: Disabled state
- `label`: Field label (required)

## A11y Highlights
- **Keyboard**: Arrow keys navigate dropdown options; Enter selects; Escape closes dropdown; type to filter/jump
- **Screen reader**: combobox role for input; listbox for dropdown; options announced on navigation
- **ARIA**: role="combobox"; aria-expanded; aria-controls pointing to listbox; role="option" for time slots

## Strengths & Gaps
- **Best at**: Consistent cross-browser time UI; configurable intervals for scheduling; enterprise CRM scheduling patterns
- **Missing**: No AM/PM toggle separate from text entry; relies on combobox pattern which requires keyboard proficiency
