---
system: Nord (Nordhealth)
component: Radio (nord-radio web component)
url: https://nordhealth.design/components/radio/
last_verified: 2026-03-28
confidence: low
---

# Radio

## Approach
Nord provides a Radio web component for healthcare forms requiring mutually exclusive selections: patient gender, appointment type, referral source. Healthcare radio buttons must be large and clearly distinguishable for users with motor impairments or visual impairments.

## Key Decisions
1. **Web component standard** (HIGH) — Framework portability across healthcare systems.
2. **Required label** (HIGH) — Accessible label enforcement for clinical data entry correctness.

## Notable Props
- `value`, `checked`, `label`
- `disabled`, `required`
- Grouping via name attribute or RadioGroup component (verify)

## A11y Highlights
- **Keyboard**: Standard radio behavior within group
- **Screen reader**: radio role; label association; group via fieldset/legend
- **ARIA**: Standard radio ARIA in shadow DOM

## Strengths & Gaps
- **Best at**: Healthcare-appropriate design; web component portability
- **Missing**: Verify full API at nordhealth.design
