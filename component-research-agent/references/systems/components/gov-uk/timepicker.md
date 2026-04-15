---
system: GOV.UK Design System
component: Not available natively (text input pattern)
url: https://design-system.service.gov.uk/patterns/ask-users-for-times/
last_verified: 2026-03-29
confidence: high
---

# Time Picker (Absent — Text Input Pattern)

## Approach
GOV.UK does not provide a TimePicker widget component, and this absence is deliberate. The design system's guidance on "Ask users for times" prescribes using plain text input fields rather than any picker widget. The primary recommended approach is two separate inputs — one for hours and one for minutes — styled as standard GOV.UK text inputs with appropriate width classes (`govuk-input--width-2`). This approach is grounded in extensive user research showing that text inputs are faster, more predictable, and more accessible than custom picker widgets, particularly for users on mobile devices, users with motor impairments, and users of assistive technology. GOV.UK services deal with time entry primarily in contexts like scheduling appointments, recording working hours, or entering times for legal forms — all scenarios where a direct text entry is more efficient than navigating a picker UI.

## Key Decisions
1. **Two separate inputs over single field** (HIGH) — GOV.UK recommends separate hour and minute inputs rather than a single HH:MM text field. This mirrors the approach used for date inputs (day/month/year as separate fields). The rationale is that separate fields set clear expectations about the format and reduce the need for users to parse or remember the separator character.
2. **12-hour vs 24-hour format** (HIGH) — For most services, GOV.UK recommends asking for times in the format users think in (12-hour with AM/PM for appointment times; 24-hour for professional/operational contexts). The choice between 12 and 24-hour format should be driven by the context and the mental model of the target users, not technical convenience.
3. **No spinner controls** (HIGH) — Up/down stepper arrows are explicitly avoided. They are slow for large time adjustments, can be accidentally triggered, and are not accessible to all users. The text field approach is always faster: typing "14" into a 24-hour input is one action; clicking a stepper from 8 to 14 requires six interactions.
4. **Hint text for format guidance** (MEDIUM) — The pattern includes guidance text (hint text) beneath the label specifying the expected format, e.g., "Use 24-hour format, for example 09:00 or 17:30". This sets unambiguous expectations without relying on placeholder text, which disappears when the user starts typing.

## Notable Props
- Standard `govuk-input govuk-input--width-2` CSS classes for hour/minute fields
- `type="text"` with `inputmode="numeric"` for mobile numeric keyboard
- `autocomplete="off"` to prevent browser interference
- Label + hint text via `govuk-label` and `govuk-hint` classes

## A11y Highlights
- **Keyboard**: Standard text input keyboard interaction; Tab between hour and minute fields; no custom keyboard traps
- **Screen reader**: Each input has an explicit `<label>` element; hint text is associated via `aria-describedby`; error messages use `aria-describedby` linking error text to the specific input
- **ARIA**: No custom ARIA needed; semantic HTML provides full accessibility; error state uses `aria-invalid="true"` and `aria-describedby` on the input

## Strengths & Gaps
- **Best at**: Accessible, fast time entry for a broad user base including mobile users, AT users, and low-digital-literacy users; no JavaScript dependency; works with server-side validation
- **Missing**: No time picker widget for contexts where selection from a range is the UX goal; no time zone handling guidance in the component (handled by content design guidance separately)
