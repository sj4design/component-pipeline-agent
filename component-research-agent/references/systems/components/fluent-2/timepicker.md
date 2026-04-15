---
system: Fluent 2 (Microsoft)
component: TimePicker
url: https://react.fluentui.dev/?path=/docs/components-timepicker--docs
last_verified: 2026-03-29
confidence: high
---

# Time Picker

## Approach
Fluent 2's TimePicker is a dropdown-based time selection component purpose-built for calendar and scheduling contexts, most prominently used in Teams meeting creation, Outlook calendar event forms, and scheduling assistant UIs. Rather than a clock face or scroll-wheel picker, TimePicker renders as a Combobox-style input with a pre-generated list of time options at configurable intervals (default 30 minutes), allowing users to either select from the dropdown or type a time directly. This design decision reflects the keyboard-productivity expectations of enterprise schedulers who frequently set meeting times directly via keyboard. The component integrates with the Fluent DatePicker for combined date+time selection in event forms, and supports both 12-hour and 24-hour formats to accommodate Microsoft 365's global user base across different regional conventions.

## Key Decisions
1. **Dropdown list with freeform typing** (HIGH) — Pre-generating time slots (every 30 min by default) enables fast mouse/touch selection for the common case (scheduling a meeting at a standard interval), while freeform text entry supports precise times (e.g., 9:45 AM) — this dual-mode approach matches how Outlook's time pickers have worked for over a decade, minimizing relearning friction for existing Microsoft users.
2. **Configurable increment** (HIGH) — The `increment` prop (in minutes) allows product teams to offer 15-minute slots for Teams meeting scheduling, 60-minute slots for all-day-event time selection, or custom intervals for specialized scheduling tools — one component serves multiple Microsoft 365 scheduling contexts.
3. **12h/24h format support** (HIGH) — The `hourCycle` prop supports `"h11"`, `"h12"`, `"h23"`, `"h24"` to match locale settings from the user's Microsoft 365 profile, critical for a product used globally across regions with different time display conventions.
4. **DateFns/date-fns-tz integration** (MEDIUM) — TimePicker operates on JavaScript `Date` objects and integrates with the date utility libraries used across Fluent's date components, enabling timezone-aware scheduling critical for Teams meeting coordination across time zones.
5. **Combobox-based architecture** (MEDIUM) — Building TimePicker on top of Combobox primitives reuses all of Combobox's accessibility infrastructure, keyboard navigation, and Fluent theming — reducing implementation surface and ensuring consistent behavior with other Fluent form inputs.

## Notable Props
- `selectedTime`: controlled selected `Date` value
- `defaultSelectedTime`: uncontrolled initial time
- `onTimeChange`: callback receiving the selected `Date` and the raw input string
- `startHour`: first hour shown in the dropdown (0–23, default 0)
- `endHour`: last hour shown in the dropdown (1–24, default 24)
- `increment`: minutes between generated time slots (default 30)
- `hourCycle`: `"h11"` | `"h12"` | `"h23"` | `"h24"` — 12h vs 24h format
- `freeform`: boolean — allows typing times not in the generated list
- `disabled`: disables the picker
- `appearance`: `"outline"` | `"underline"` | `"filled-darker"` | `"filled-lighter"`

## A11y Highlights
- **Keyboard**: The text input portion accepts typed time values; Alt+Down or F4 opens the dropdown; Arrow keys navigate the time option list; Enter selects the focused option; Escape closes without selection; Tab moves focus out of the component.
- **Screen reader**: Inherits Combobox ARIA semantics — `role="combobox"` on the input with `aria-expanded`, `aria-haspopup="listbox"`, `aria-autocomplete="list"`; each time option uses `role="option"` with `aria-selected`; the selected time is reflected in the input value and announced on change; `aria-label` on the input should describe the field (e.g., "Meeting start time").
- **ARIA**: Full WAI-ARIA 1.2 combobox pattern inherited from Combobox component; `aria-controls` links input to listbox; `aria-activedescendant` tracks focused option; high-contrast mode supported via Fluent token system — dropdown borders, selected option background, and focus ring map to Windows system colors (`Highlight`, `HighlightText`, `ButtonText`).

## Strengths & Gaps
- **Best at**: Scheduling-context time selection matching Outlook and Teams time picker UX patterns; configurable slot intervals; 12h/24h format support for global Microsoft 365 deployment; keyboard-friendly freeform time entry; strong accessibility inheritance from Combobox.
- **Missing**: No visual clock face or analog time picker for touch-first scenarios; no built-in timezone display or selection (timezone handling is left to the consuming application); no duration picker variant (e.g., "1 hour 30 minutes") for meeting length selection; integration with DatePicker for combined datetime selection requires manual composition rather than a unified DateTimePicker component.
