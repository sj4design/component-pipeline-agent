---
system: Dell Design System
component: Toggle / Switch
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Toggle / Switch

## Approach
Dell Design System's Switch/Toggle is used for enabling/disabling features in enterprise management consoles — enabling monitoring, toggling maintenance mode, and switching configuration states. Enterprise IT context means switches can trigger significant system changes.

## Key Decisions
1. **System configuration toggles** (MEDIUM) — Used for enabling/disabling enterprise system features and monitoring.
2. **Clear state visibility** (MEDIUM) — Enabled/Disabled state must be unambiguous given operational impact.
3. **ARIA role** (LOW) — role="switch" expected for correct semantics.

## Notable Props
- `checked`, `onChange`, `disabled`

## A11y Highlights
- **Keyboard**: Space toggle
- **Screen reader**: State announced
- **ARIA**: role="switch" expected

## Strengths & Gaps
- **Best at**: Enterprise system configuration toggles
- **Missing**: Low confidence — verify before use
