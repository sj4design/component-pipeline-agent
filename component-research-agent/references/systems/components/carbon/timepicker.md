---
system: Carbon (IBM)
component: Time Picker
url: https://carbondesignsystem.com/components/time-picker/usage/
last_verified: 2026-03-28
---

# Time Picker (Carbon)

## Approach
Carbon's Time Picker is the most pragmatic of the Tier 1 implementations: a simple text input field combined with a separate Select dropdown for AM/PM selection. This two-element composition reflects IBM's enterprise form design philosophy — in the contexts where time entry appears in IBM's products (Cloud scheduling, appointment booking, shift management in Maximo), the time is always entered as a known exact value by a user who already knows what time they need. There is no discovery or approximate selection involved. A text field is therefore the most efficient input for expert users, and the AM/PM select prevents the most common error (typing 1:00 when you mean 13:00). Carbon's implementation is intentionally simple — no dial, no segments, no spinners — because IBM's accessibility and usability research found that enterprise users resist visually complex pickers that feel like consumer mobile apps. The component is also a composition of two existing Carbon components (TextInput + Select), which means it inherits all the form validation, error state, helper text, and label patterns of Carbon's form system automatically.

## Key Decisions
1. **Text input + AM/PM Select as a composition** (HIGH) — Rather than a single specialized input, Carbon's Time Picker is two form components working in tandem. The text input accepts the HH:MM value; the Select provides 12/24-hour disambiguation. This means all of Carbon's form validation patterns (error messages, required indicators, disabled states, helper text) apply to the time picker without any special handling. Teams familiar with Carbon forms need no additional learning to implement a time picker in error state.
2. **No built-in validation format parsing** (MEDIUM) — Carbon's time picker does not validate the entered time string — it accepts whatever the user types. Validation (ensuring valid range, correct format, reasonable values) is the application's responsibility. IBM made this decision because their enterprise applications have highly varied time input requirements: some accept HH:MM, some accept HH:MM:SS, some accept relative times ("in 2 hours"), and a single validation scheme would be wrong for most contexts.
3. **Optional AM/PM Select** (MEDIUM) — The AM/PM dropdown is optional, not mandatory. Teams building 24-hour systems (common in IBM's European enterprise deployments, in manufacturing systems, and in healthcare IT) omit the select entirely and the text input accepts 24-hour format values directly. This flexibility is a concession to IBM's global and cross-industry product surface where time format conventions vary significantly.

## Notable Props
- `id`: Required; links the label to the input for accessibility.
- `placeholder`: Displays format hint (e.g., "hh:mm") inside the text input.
- `timeZone`: Time zone label displayed after the AM/PM select — this is a display label only, not a functional time zone offset calculator (unlike Spectrum's TimeField).
- `size`: `"sm" | "md" | "lg"` — inherits Carbon's standard form element size system.

## A11y Highlights
- **Keyboard**: Standard text input keyboard behavior. The AM/PM select follows Carbon's Select keyboard pattern (Space/Enter to open, Arrow keys to select, Escape to close).
- **Screen reader**: Both the text input and select are native form elements with associated labels via `<label for>`. No custom ARIA needed. The composition is accessible by default because it is built from accessible primitives.
- **ARIA**: No custom ARIA roles. The time zone label (if present) is visually associated text — it is not programmatically associated with the input, which is a minor gap for screen reader users who may not hear the time zone context.

## Strengths & Gaps
- **Best at**: Form system integration — inherits all of Carbon's form validation, error, and label patterns automatically because it is composed of standard form primitives rather than a specialized input widget.
- **Missing**: No format validation, no time zone calculation (only display label), no spinner or dial option, and no range time picker — Carbon's time picker is the most minimal in the Tier 1 set, trading features for simplicity and enterprise-appropriate design.
