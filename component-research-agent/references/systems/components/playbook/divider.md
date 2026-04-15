---
system: Power Home Remodeling Playbook
component: Separator / Divider
url: https://playbook.powerapp.cloud
last_verified: 2026-03-28
confidence: medium
---

# Separator / Divider

## Approach
Playbook likely includes a Separator or Divider component for separating content sections in sales presentations, appointment scheduling screens, and homeowner-facing information pages. Both React and Rails ViewComponent variants would be available. Used to separate sections within cards, form sections, and content blocks.

## Key Decisions
1. **Content section separation** (MEDIUM) — Separates distinct content groups within cards and forms.
2. **Dual React/Rails support** (HIGH) — Available as React component and Rails ViewComponent.

## Notable Props
- Standard separator/divider props expected
- Orientation variants likely supported

## A11y Highlights
- **Keyboard**: Not interactive
- **Screen reader**: Separator role or decorative
- **ARIA**: Standard HR/separator semantics

## Strengths & Gaps
- **Best at**: Sales and service content organization; dual React/Rails compatibility
- **Missing**: Medium confidence — verify specific implementation in Playbook docs
