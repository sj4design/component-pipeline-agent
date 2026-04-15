---
system: Base Web (Uber)
component: Toggle (Switch)
url: https://baseweb.design/components/toggle/
last_verified: 2026-03-28
confidence: medium
---

# Toggle (Switch)

## Approach
Base Web calls its toggle switch component "Toggle" (not Switch). It follows the same Overrides customization pattern. The Toggle uses `role="checkbox"` rather than `role="switch"` in some versions — this is a less semantically precise choice than Radix's switch implementation. Uber's settings interfaces use toggles for immediate feature activation (enabling/disabling features in the driver app settings).

## Key Decisions
1. **Toggle naming** (MEDIUM) — Named "Toggle" rather than "Switch", which is more aligned with older ARIA guidance. The semantic distinction between checkbox and switch may not be fully implemented.
2. **Overrides pattern** (HIGH) — Like all Base Web components, full visual customization via overrides.

## Notable Props
- `checked` / `onChange`: controlled state
- `disabled`: disabled state
- `overrides`: visual customization

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: Checked state communicated; label via adjacent element
- **ARIA**: May use role="checkbox" rather than role="switch" — verify at baseweb.design

## Strengths & Gaps
- **Best at**: Overrides customization; Uber settings patterns
- **Missing**: May lack role="switch" semantic precision; verify API at baseweb.design
