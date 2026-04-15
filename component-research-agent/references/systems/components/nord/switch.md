---
system: Nord (Nordhealth)
component: Toggle (nord-toggle web component)
url: https://nordhealth.design/components/toggle/
last_verified: 2026-03-28
confidence: low
---

# Toggle (Switch)

## Approach
Nord may provide a Toggle web component for healthcare settings where immediate toggle actions are appropriate (enabling notification preferences, activating clinical alerts). Healthcare toggle components must be very clearly labeled since toggling the wrong setting could affect clinical workflows.

## Key Decisions
1. **Web component standard** (HIGH) — Portability requirement.
2. **Clear state indication** (HIGH) — Healthcare toggles must have unambiguous on/off visual states; Nord's design system priorities clear state communication.

## Notable Props
- `checked` / `value`
- `label`: required
- Verify at nordhealth.design

## A11y Highlights
- **Keyboard**: Space toggles
- **Screen reader**: role="switch" or similar; label required
- **ARIA**: Verify at nordhealth.design

## Strengths & Gaps
- **Best at**: Healthcare settings patterns; web component portability
- **Missing**: Verify API at nordhealth.design — confidence is low
