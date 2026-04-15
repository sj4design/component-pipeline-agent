---
system: Wise Design
component: Switch
url: https://wise.design/components/switch
last_verified: 2026-03-28
confidence: low
---

# Switch

## Approach
Wise's Switch is used for feature toggles in financial account settings — enabling notifications, opting into features, and managing security settings. Clean visual consistent with Wise's minimal product design.

## Key Decisions
1. **Feature opt-in use** (MEDIUM) — Account and notification feature toggles.
2. **Clean minimal visual** (MEDIUM) — Consistent with Wise's aesthetic.
3. **Security-sensitive toggles** (LOW) — Some switches may enable/disable security features, requiring careful state communication.

## Notable Props
- `checked`, `onChange`, `disabled`

## A11y Highlights
- **Keyboard**: Space toggles
- **Screen reader**: State announced
- **ARIA**: role="switch" expected

## Strengths & Gaps
- **Best at**: Financial feature toggle settings
- **Missing**: Low confidence — limited documentation
