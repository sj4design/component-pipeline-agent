---
system: Gestalt (Pinterest)
component: Switch
url: https://gestalt.pinterest.systems/web/switch
last_verified: 2026-03-28
confidence: medium
---

# Switch

## Approach
Gestalt's Switch is used in Pinterest's advertising and notification settings for immediate toggle actions. The component uses Pinterest's brand color system (Pinterest red for active state) and follows Gestalt's pattern of required labels. The switch is designed for settings panels where immediate effect toggles are appropriate.

## Key Decisions
1. **role="switch" semantics** (HIGH) — Correct switch role for immediate effect toggles.
2. **required id and label** (HIGH) — Like all Gestalt interactive components, id and label are required, enforcing accessibility at the component level.

## Notable Props
- `id`: required
- `onChange`: change callback
- `switched`: controlled boolean state
- `disabled`: disabled state

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: role="switch" with aria-checked; label required
- **ARIA**: Correct switch semantics enforced by required label

## Strengths & Gaps
- **Best at**: Required label enforcement; Pinterest brand color integration
- **Missing**: No size variants; no description per switch
