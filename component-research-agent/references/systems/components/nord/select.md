---
system: Nord (Nordhealth)
component: Select (nord-select web component)
url: https://nordhealth.design/components/select/
last_verified: 2026-03-28
confidence: low
---

# Select

## Approach
Nord provides a Select web component wrapping the native HTML `<select>` element. For healthcare applications, native selects are appropriate for most use cases — staff selecting patient conditions from a coded list, selecting appointment types, or choosing from a list of healthcare providers. The web component adds Nord's styling conventions and form integration while preserving native select accessibility and mobile behavior.

## Key Decisions
1. **Native select wrapper** (HIGH) — Healthcare applications prioritize reliability and accessibility over visual customization. Native selects are most accessible and work consistently across all platforms.
2. **Healthcare form integration** (HIGH) — Integrates with Nord's validation pattern, showing clear error states important for clinical data entry.

## Notable Props
- `value`: selected value
- `label`: visible label (required)
- `error`: error message
- `helper-text`: supplementary guidance
- `disabled`: disabled state
- `required`: required field indicator

## A11y Highlights
- **Keyboard**: Native browser select behavior
- **Screen reader**: Native select semantics; label, helper, error properly associated
- **ARIA**: No custom ARIA needed; web component uses native select inside

## Strengths & Gaps
- **Best at**: Portability; native accessibility; healthcare form validation
- **Missing**: No custom option rendering; verify exact API at nordhealth.design
