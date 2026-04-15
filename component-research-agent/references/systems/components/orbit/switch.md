---
system: Orbit (Kiwi.com)
component: Switch (not available — use Checkbox)
url: https://orbit.kiwi/components/
last_verified: 2026-03-28
confidence: medium
---

# Switch

## Approach
Orbit does not have a dedicated Switch component. For toggle/switch interactions, Kiwi.com's product uses the Checkbox component with appropriate labels. The absence reflects Orbit's travel-focused scope — settings and preference toggles in travel apps are typically handled by checkboxes in forms, not standalone switch components. Mobile booking flows rarely use the iOS-style toggle switch.

## Key Decisions
1. **No switch component** (MEDIUM) — Travel booking forms use checkboxes for boolean selections. A switch implies immediate effect which is less appropriate in form contexts.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Toggle switch for settings UIs
