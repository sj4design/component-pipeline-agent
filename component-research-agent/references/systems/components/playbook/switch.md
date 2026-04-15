---
system: Playbook (Power Home Remodeling)
component: Toggle
url: https://playbook.powerapp.cloud/kits/toggle
last_verified: 2026-03-28
confidence: medium
---

# Toggle (Switch)

## Approach
Playbook's Toggle is used for boolean setting switches in their CRM — toggling feature visibility, enabling notification preferences, and managing user settings. Dual React/Rails implementation. Standard toggle visual with on/off state.

## Key Decisions
1. **Settings toggle use case** (HIGH) — Used for immediate-effect boolean toggles in CRM settings.
2. **Dual React/Rails** (HIGH) — Consistent implementation across frameworks.
3. **Clear on/off visual** (MEDIUM) — Clear visual distinction between on and off states.

## Notable Props
- `checked`: Toggle state
- `onChange`: Callback
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Space toggles
- **Screen reader**: State announced
- **ARIA**: role="switch" or "checkbox"; aria-checked

## Strengths & Gaps
- **Best at**: CRM settings toggles; dual framework
- **Missing**: Medium confidence; ARIA role details uncertain
