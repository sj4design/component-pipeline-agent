---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Time Picker

## Approach
Nord does not provide a Time Picker component — time entry in clinical software uses `<nord-input type="time">` (native browser time input) or plain text inputs with explicit format instructions. This choice is critically important in healthcare contexts where time precision directly affects patient safety. Medication administration schedules (e.g., "give at 08:00, 14:00, and 22:00"), clinical procedure timing, and appointment scheduling require time values that are unambiguous and precisely entered. Custom time picker widgets introduce several risks in clinical environments: visual clock-face pickers can make it easy to accidentally select 8:00 PM instead of 8:00 AM, scroll-wheel time selectors can drift on touch devices, and multi-column spinners (hours column | minutes column) require careful interaction that may be error-prone under clinical time pressure. Nord's approach favors explicit text entry in 24-hour format (HH:MM) with clear format instructions — a format that eliminates AM/PM ambiguity entirely, which is particularly important in international healthcare software where 12-hour clock conventions differ.

## Key Decisions
1. **Absent by design — 24-hour format eliminates AM/PM ambiguity** (HIGH) — In clinical medication administration and procedure scheduling, AM/PM ambiguity is a documented source of medical error. A medication order for "8:00 AM" that a nurse interprets as "8:00 PM" due to a UI that defaults to 12-hour format could cause a critical timing error. Nord's text-based `type="time"` approach with 24-hour display removes this ambiguity category.
2. **Absent by design — widget interaction risk on clinical tablets** (HIGH) — Scroll-wheel and clock-face time pickers require precise fine motor interaction on touchscreens. In a clinical ward environment where clinicians wear gloves, are fatigued, or are under pressure, these interaction modes introduce higher error rates than direct keyboard entry of a 4-digit 24-hour time value.
3. **Native `<input type="time">` for standards-based time capture** (MEDIUM) — Native browser time inputs submit values in HH:MM format, integrating cleanly with clinical API backends that use ISO 8601 time formatting. No custom serialization or parsing is required — the format-interoperability concern is solved at the browser level.
4. **Explicit format guidance in hint text** (MEDIUM) — Nord's `<nord-input>` supports `hint` text that displays format instructions adjacent to the field. For clinical time entry, teams are expected to use hint text like "Use 24-hour format (HH:MM)" to remove any uncertainty about the expected input format, particularly for clinicians who may be less familiar with digital time input conventions.

## Notable Props
- No `<nord-timepicker>` component exists; no props applicable.
- Recommended pattern using `<nord-input>`:
  - `type="time"`: Native browser time input with HH:MM format capture
  - `label`: Must clearly indicate whether 24-hour format is expected (e.g., "Administration Time (24-hour)")
  - `hint`: Format instruction text (e.g., "Enter time in HH:MM format, e.g. 14:30")
  - `min` / `max`: Time range constraints for scheduling validation (e.g., business hours constraints for non-emergency appointments)

## A11y Highlights
- **Keyboard**: Native `<input type="time">` provides full keyboard input: type digits directly for precise time entry; arrow keys adjust hours/minutes segments in browsers that support time input navigation; screen-reader users can type time values directly without widget interaction
- **Screen reader**: Native `<input type="time">` with associated label provides standard screen reader announcement; time value is read back to the user on focus; format constraints communicated via hint text linked through `aria-describedby`
- **ARIA**: `aria-describedby` links format hint text to the input field; `aria-required="true"` for mandatory time fields in clinical scheduling; standard text field ARIA semantics apply — no special ARIA patterns needed beyond those provided by Nord's input component

## Strengths & Gaps
- **Best at**: Unambiguous 24-hour clinical time entry that eliminates AM/PM medication timing errors; leverages native browser time input semantics for accessibility and API format compatibility; no custom widget complexity that could introduce interaction errors on clinical tablets
- **Missing**: No time range picker (start time + end time pair, useful for procedure duration booking and appointment slot selection); no time-with-timezone variant for telemedicine and cross-timezone clinical scheduling; no clinical shift selector pattern (morning/afternoon/night shift as time presets); teams building appointment scheduling UIs must implement all of these patterns from scratch outside Nord
