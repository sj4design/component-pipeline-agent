---
system: Base Web (Uber)
component: Radio / RadioGroup
url: https://baseweb.design/components/radio/
last_verified: 2026-03-28
confidence: medium
---

# Radio / RadioGroup

## Approach
Base Web's Radio component follows the same Overrides pattern as other components. It provides RadioGroup for managing selection state and Radio for individual items. The component supports alignment (horizontal/vertical), description text below each label, and the standard disabled state. Overrides expose all visual sub-components for customization.

## Key Decisions
1. **description per radio** (MEDIUM) — Each Radio supports a `description` prop for supplementary text below the label. This is used in Uber's product configuration screens where options need additional explanation.
2. **Overrides pattern** (HIGH) — Full customization of Radio, RadioMarkOuter, RadioMarkInner, Label, Description via overrides.
3. **align: horizontal/vertical** (MEDIUM) — Layout control on RadioGroup.

## Notable Props
- RadioGroup: `value`, `onChange`, `name`, `align`
- Radio: `value`, `description`, `disabled`, `overrides`

## A11y Highlights
- **Keyboard**: Arrow keys navigate; roving tabindex within group
- **Screen reader**: radiogroup role; radio role per item; label and description associated
- **ARIA**: Standard radio group ARIA

## Strengths & Gaps
- **Best at**: description per option; Overrides customization; alignment control
- **Missing**: No radio card pattern; limited visual distinction vs other systems
