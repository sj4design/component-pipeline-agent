---
component: TimePicker
tier: 3
last_verified: 2026-03-29
---

# TimePicker — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — native input recommended | No primitive; `<input type="time">` recommended for standard entry; Select composition for custom UI; no scheduling-specific use cases driving a component. | high |
| Chakra UI | Not available — native input recommended | `<Input type="time">` with Chakra styling; no roadmap item; native browser behavior considered sufficient; third-party libraries recommended for complex needs. | high |
| GOV.UK | Not available — separate text inputs | Two separate text inputs (hours, minutes) with `inputmode="numeric"`; 24-hour vs 12-hour guidance driven by user mental model; no spinner controls; hint text for format; no JS required. | high |
| Base Web | TimePicker | Dropdown list at configurable `step` intervals (default 1800s = 30min); built on Select (searchable, overridable); `creatable` for free-form entry; 12/24h format; DatetimePicker compound component. | high |
| Fluent 2 | TimePicker | Combobox-style dropdown with freeform typing; `increment` (minutes); `hourCycle` (h11/h12/h23/h24) for locale; built on Combobox for full accessibility inheritance; `startHour`/`endHour` range limits; date-time integration. | high |
| Gestalt | Not available — product scope | Time input not required for most of Pinterest's product; pin scheduling uses custom internal implementation; DatePicker covers the common date-only need. | high |
| Mantine | TimeInput / TimePicker (@mantine/dates) | Two-tier: `TimeInput` wraps `<input type="time">` for form-style entry; `TimePicker` (v7) provides scroll-wheel visual selection; `withSeconds` for sub-minute precision; 12/24h format; dayjs dependency. | high |
| Orbit | Not available — domain pattern | Departure time preferences use range sliders, not pickers; exact time entry uses native `<input type="time">` directly; no custom component needed for any Kiwi.com use case. | high |
| Evergreen | Not available — day-granularity model | Segment analytics queries operate at day granularity; no user-facing time-of-day configuration; DatePicker covers all temporal selection needs. | high |
| Nord | Not available — clinical accuracy | 24-hour `<nord-input type="time">` with explicit hint; AM/PM ambiguity documented as medical error source; scroll-wheel/clock-face pickers risky on clinical tablets; ISO 8601 format via native input for API compatibility. | high |

## Key Decision Patterns

The most important architectural split in T3 time pickers is dropdown/combobox versus native input versus text fields. Base Web and Fluent 2 both implement dropdown-based time pickers that present pre-generated time slots — Base Web calls this a TimePicker built on Select; Fluent 2 calls it a TimePicker built on Combobox. Both allow freeform typed entry as well. Mantine provides both patterns explicitly: TimeInput (native `<input type="time">`) and TimePicker (scroll-wheel visual picker). The GOV.UK and Nord approaches reject custom widgets entirely, preferring separate text inputs or native `<input type="time">` with format guidance. The practical implication: dropdown-based pickers work well for scheduling workflows with discrete time slots (meeting times, delivery windows, appointments) but are a poor fit for forms requiring arbitrary time entry (clinical measurements, logging, scientific data).

Base Web and Fluent 2's dropdown-based time pickers converge on the same architectural insight: building on their respective Select/Combobox components rather than implementing a custom widget. This provides searchability, keyboard navigation, ARIA combobox semantics, and theming for free — the time picker inherits the full interaction model of the parent component. Base Web's `step` (in seconds) and Fluent 2's `increment` (in minutes) both serve the same purpose with different units. Both support `creatable`/`freeform` modes for entering times not in the generated list. The key advantage of this approach over a native `<input type="time">` is visual consistency: the time picker looks and behaves exactly like other dropdowns in the application, regardless of browser or OS.

Nord's absence carries the most medically specific reasoning in the T3 set. The AM/PM ambiguity argument — that a medication order specified as 8:00 AM could be entered as 8:00 PM in a 12-hour picker, causing a timing error with clinical consequences — is a documented source of medical errors. 24-hour format eliminates this category of error entirely. Nord's prescription of explicit 24-hour text entry (via native `<input type="time">` which submits in HH:MM format) addresses both the ambiguity issue and the interaction risk of scroll-wheel pickers on touch devices used by gloved clinical staff. This argument applies to any domain where time precision has safety implications, not just healthcare.

Orbit's time-range slider is the most unconventional approach to time selection in the T3 set, and the most domain-appropriate for flight search. Rather than asking users to specify an exact departure time, Orbit's flight search lets users define a departure window by dragging a slider across a 00:00–23:59 range. This interaction model matches how travelers think ("I want a morning flight" rather than "I want to depart at 7:00 AM") and is better suited for filtering a list of existing flight options than for scheduling a specific event. The absence of a traditional TimePicker in Orbit reflects that its primary time-related UX problem has a completely different solution.

## A11y Consensus

- `<input type="time">` is the most accessible time entry pattern for most contexts: browser native, keyboard-operable (arrow keys adjust segments, type-ahead entry works), and screen reader supported without additional ARIA. GOV.UK, Radix, Chakra, Orbit, and Nord all recommend or default to this approach.
- Dropdown-based time pickers (Base Web, Fluent 2) inherit combobox ARIA semantics: `role="combobox"` on the input, `role="listbox"` on the dropdown, `role="option"` on each time slot, `aria-expanded`, `aria-activedescendant` tracking the focused option. These are the same patterns used for Select and Combobox components.
- The accessible label on a time picker must describe what time is being collected — "Meeting start time," "Medication administration time," "Appointment hour" — not just "Time." Generic labels cause screen readers to announce type-only ("time input") without context.
- For separate hours and minutes fields (GOV.UK pattern), each field must have its own distinct label — not "Time" on the hours field with the minutes field unlabeled. GOV.UK recommends "Hour" and "Minute" as field labels with a group label for the overall time field.
- Clock-face graphical pickers are not discussed by any T3 system as a production recommendation — they are complex to make keyboard-accessible and behave inconsistently across screen readers; none of the T3 systems implement them.

## Recommended Use

Reference T3 time picker approaches when deciding on dropdown-vs-native-input, discrete-slot vs. free-form entry, and 12h/24h format handling. Fluent 2 is the reference for a full-featured dropdown TimePicker with `increment`, `hourCycle`, and Combobox accessibility inheritance; Base Web is the reference for `step`-interval slot generation and `creatable` free-form entry; Mantine is the reference for the two-tier TimeInput/TimePicker split for keyboard-vs-visual selection mode; GOV.UK is the reference for separate hour/minute text fields with 12h/24h format guidance; Nord is the reference for the 24-hour clinical accuracy argument against AM/PM pickers and scroll-wheel interaction on touch devices.
