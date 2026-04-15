---
system: Twilio Paste
component: Radio Group
url: https://paste.twilio.design/components/radio-group
last_verified: 2026-03-28
confidence: high
---

# Radio Group

## Approach
Twilio Paste provides Radio and RadioGroup components, always used together. RadioGroup wraps radios in a fieldset with legend for correct semantic grouping. Paste provides a RadioButtonGroup variant that renders radio inputs as styled button-like toggles, useful for compact option selection in the Twilio console (e.g., selecting message direction: inbound/outbound).

## Key Decisions
1. **RadioButtonGroup variant** (HIGH) — Button-styled radio group provides a visually compact alternative to traditional radio buttons, used in Twilio console for selecting from a small set of mutually exclusive options where the toggle visual is more appropriate.
2. **Fieldset/legend semantics** (HIGH) — RadioGroup wraps in fieldset with legend (the group label), ensuring screen readers announce the group question alongside each option label.
3. **Horizontal and vertical layouts** (MEDIUM) — RadioGroup supports both horizontal and vertical radio arrangements for layout flexibility in different console contexts.

## Notable Props
- `name`: Required group name binding all radio inputs together
- `value` / `defaultValue`: Controlled/uncontrolled selected value
- `onChange`: Selection callback
- `orientation`: "vertical" | "horizontal"
- `i18nRequiredLabel`: Internationalized required indicator text

## A11y Highlights
- **Keyboard**: Arrow keys navigate within group (roving tabindex); Tab exits group; initial Tab focuses selected or first
- **Screen reader**: Each radio announces option label + group label from fieldset/legend; checked/unchecked state
- **ARIA**: fieldset/legend for grouping; aria-required; radio role with checked state; roving tabindex pattern

## Strengths & Gaps
- **Best at**: RadioButtonGroup visual variant; correct fieldset semantics; horizontal/vertical layout options
- **Missing**: No custom icon-based radio; limited to text labels in RadioButtonGroup
