---
system: Nord (Nordhealth)
component: Checkbox (nord-checkbox web component)
url: https://nordhealth.design/components/checkbox/
last_verified: 2026-03-28
confidence: low
---

# Checkbox

## Approach
Nord provides a Checkbox web component for healthcare application use. Checkboxes appear in clinical forms for symptom checklists, consent forms, and feature toggles in clinical settings. Healthcare checkboxes must have clear visual states (especially checked vs unchecked) for clinical staff who make consequential decisions based on form state.

## Key Decisions
1. **Web component standard** (HIGH) — Framework portability is the core driver.
2. **Clear visual states for clinical use** (HIGH) — In healthcare, ambiguous checkbox state could lead to clinical errors. Nord's checkbox design prioritizes clear, unambiguous checked/unchecked differentiation.

## Notable Props
- `checked`: boolean
- `value`: form value
- `label` (via slot or prop)
- `disabled`: disabled state
- `required`: required indicator

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: Native checkbox semantics in web component; label association
- **ARIA**: Standard checkbox ARIA in shadow DOM

## Strengths & Gaps
- **Best at**: Healthcare-appropriate clear visual states; web component portability
- **Missing**: Verify exact API; likely no indeterminate state support; limited customization
