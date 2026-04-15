---
system: REI Cedar
component: Radio
url: https://cedar.rei.com/components/radio
last_verified: 2026-03-28
confidence: medium
---

# Radio

## Approach
REI Cedar's Radio is a Vue component for mutually exclusive selection in e-commerce forms — shipping method selection, size picking (when not using a visual size picker), and account preference settings. Cedar emphasizes mobile touch-friendly radio sizing and clear visual feedback.

## Key Decisions
1. **E-commerce selection** (HIGH) — Optimized for shipping method and option selection in checkout flows.
2. **Touch sizing** (HIGH) — Large tap targets for mobile checkout accuracy.
3. **Group integration** (MEDIUM) — RadioGroup with fieldset/legend for accessible grouping.

## Notable Props
- `value`: Controlled selection
- `name`: Group binding
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Arrow keys within group; Tab exits
- **Screen reader**: Option + group announced
- **ARIA**: fieldset/legend; radio role; aria-checked

## Strengths & Gaps
- **Best at**: Mobile-optimized checkout radio selection; Cedar brand
- **Missing**: Medium confidence; advanced options uncertain
