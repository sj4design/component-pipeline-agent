---
system: Twilio Paste
component: Checkbox
url: https://paste.twilio.design/components/checkbox
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
Twilio Paste's Checkbox wraps the native HTML checkbox input with custom styling via CSS. Paste provides both individual Checkbox and CheckboxGroup (for related checkbox sets with a shared group label). The indeterminate state is supported for parent checkboxes in hierarchical checkbox trees. Paste is explicit about the difference between CheckboxGroup (related but individually optional selections) and when to use a different pattern.

## Key Decisions
1. **Native checkbox foundation** (HIGH) — Styled native checkbox preserves native keyboard interaction, mobile tap behavior, and intrinsic form submission value semantics.
2. **CheckboxGroup with fieldset/legend** (HIGH) — CheckboxGroup wraps items in a fieldset with legend, the correct semantic HTML for communicating that checkboxes are related to a screen reader.
3. **Indeterminate state support** (HIGH) — First-class support for the indeterminate state (partial parent selection) used in select-all patterns, with visual indicator and aria-checked="mixed".

## Notable Props
- `indeterminate`: Boolean for partial-selection state
- `defaultChecked` / `checked`: Uncontrolled/controlled state
- `hasError`: Error state with aria-describedby wiring
- `id`: Required for label association

## A11y Highlights
- **Keyboard**: Space toggles; Tab to focus
- **Screen reader**: Announces checked/unchecked/mixed; group label via fieldset/legend context
- **ARIA**: aria-checked="mixed" for indeterminate; aria-describedby for error/help; fieldset/legend for group

## Strengths & Gaps
- **Best at**: Indeterminate state; correct CheckboxGroup fieldset semantics; enforced form field patterns
- **Missing**: No custom icon/visual override; limited animation on check
