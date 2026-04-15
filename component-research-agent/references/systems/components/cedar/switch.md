---
system: REI Cedar
component: Switch
url: https://cedar.rei.com/components/switch
last_verified: 2026-03-28
confidence: medium
---

# Switch

## Approach
REI Cedar's Switch is a Vue toggle for boolean preferences in REI's account and notification settings. Mobile-touch-friendly sizing given REI's mobile user base. WCAG 2.1 AA compliant per Cedar's accessibility standards.

## Key Decisions
1. **Account settings use** (HIGH) — Used for notification and preference toggles in REI account management.
2. **Touch-optimized** (HIGH) — Thumb and track sized for comfortable mobile tap.
3. **ARIA switch role** (MEDIUM) — Correct semantic role for immediate-effect toggles.

## Notable Props
- `checked`: State
- `onChange`: Callback

## A11y Highlights
- **Keyboard**: Space toggles
- **Screen reader**: role="switch"; on/off announced
- **ARIA**: role="switch"; aria-checked

## Strengths & Gaps
- **Best at**: Mobile-optimized toggle; Cedar accessibility compliance
- **Missing**: Medium confidence; some details uncertain
