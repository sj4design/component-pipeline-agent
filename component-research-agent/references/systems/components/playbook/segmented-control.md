---
system: Playbook (Power Home Remodeling)
component: ButtonGroup / RadioButtonGroup
url: https://playbook.powerapp.cloud/kits/button_group
last_verified: 2026-03-28
confidence: medium
---

# ButtonGroup / Segmented Control

## Approach
Playbook uses ButtonGroup or RadioButtonGroup for segmented control patterns in their CRM — view mode toggles, filter switches, and selection controls. Dual React/Rails.

## Key Decisions
1. **View mode toggles** (MEDIUM) — Used for switching between views in CRM (list/grid/map).
2. **Dual React/Rails** (HIGH) — Both implementations.
3. **Radio semantics** (MEDIUM) — RadioButtonGroup for persistent selection state.

## Notable Props
- `value`, `onChange`, connected button options

## A11y Highlights
- **Keyboard**: Arrow keys for radio group; Tab for button group
- **Screen reader**: Group semantics announced
- **ARIA**: radiogroup/button roles based on type

## Strengths & Gaps
- **Best at**: CRM view toggle patterns; dual framework
- **Missing**: Medium confidence; exact component uncertain
