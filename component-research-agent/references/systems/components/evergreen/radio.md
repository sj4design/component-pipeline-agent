---
system: Evergreen (Segment)
component: Radio / RadioGroup
url: https://evergreen.segment.com/components/radio
last_verified: 2026-03-28
confidence: medium
---

# Radio / RadioGroup

## Approach
Evergreen's Radio follows the system's minimal B2B aesthetic. The RadioGroup manages controlled state and renders radios in a consistent list format. Used in Segment's settings and configuration panels for exclusive option selection.

## Key Decisions
1. **RadioGroup for state management** (HIGH) — Context-based value propagation, same pattern as Chakra.
2. **isRequired** (MEDIUM) — Marks required radio groups in forms.

## Notable Props
- RadioGroup: `value`, `onChange`, `size`
- Radio: `value`, `label`, `isDisabled`

## A11y Highlights
- **Keyboard**: Arrow navigation; roving tabindex
- **Screen reader**: radiogroup; radio roles; label association
- **ARIA**: Standard ARIA

## Strengths & Gaps
- **Best at**: Clean minimal design; RadioGroup state management
- **Missing**: No description per option; no radio card variant
