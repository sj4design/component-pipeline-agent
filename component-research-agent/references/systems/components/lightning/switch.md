---
system: Salesforce Lightning Design System
component: Toggle
url: https://lightningdesignsystem.com/components/toggle/
last_verified: 2026-03-28
confidence: high
---

# Toggle (Switch)

## Approach
Salesforce Lightning calls this component "Toggle" and uses it for immediate boolean setting changes in Salesforce CRM — feature toggles in app configuration, record setting switches, and notification preferences. Lightning's Toggle has distinctive "Active/Inactive" or "On/Off" faux text labels on the track that are visually descriptive. The component integrates with Lightning's form system.

## Key Decisions
1. **Toggle naming** (HIGH) — Lightning uses "Toggle" rather than "Switch," reflecting Salesforce's UI terminology convention, though the underlying semantics use role="checkbox" with an on/off mental model.
2. **Faux text labels on track** (MEDIUM) — On/Off or Active/Inactive text indicators on the toggle track provide additional clarity about the toggle state beyond just position, important in complex Salesforce configuration interfaces.
3. **Form integration** (HIGH) — Toggle integrates with Lightning's form field pattern (label, help text, error message) like other form controls, appropriate for the configuration form contexts where it appears.

## Notable Props
- `checked`: Controlled toggle state
- `onChange`: Toggle callback
- `label`: Toggle label text (required)
- `messageToggleActive`: Text for active state label (default "Active")
- `messageToggleInactive`: Text for inactive state label (default "Inactive")
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Space toggles; Tab to focus
- **Screen reader**: Label announced with current state; Active/Inactive state communicated
- **ARIA**: role="checkbox" (historical Lightning pattern); aria-checked; label association

## Strengths & Gaps
- **Best at**: Configurable on/off text labels on track; full form field integration; CRM settings patterns
- **Missing**: Uses role="checkbox" rather than role="switch" (older ARIA pattern)
