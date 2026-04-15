---
system: Playbook (Power Home Remodeling)
component: Button
url: https://playbook.powerapp.cloud/kits/button
last_verified: 2026-03-28
confidence: medium
---

# Button

## Approach
Playbook's Button is one of the core components in their React/Rails design system, used throughout Power Home Remodeling's internal CRM, sales, and project management tools. The component follows Playbook's strong brand identity with their blue primary palette and supports the typical range of variants. The dual React/ViewComponent support is central to Playbook's architecture.

## Key Decisions
1. **Dual React/ViewComponent implementation** (HIGH) — Same button component is available in both React and Rails ViewComponent, ensuring visual consistency across the mixed frontend stack.
2. **Icon support** (MEDIUM) — Buttons support icons via prop, consistent with Playbook's use of Font Awesome icons throughout the system.
3. **Loading state support** (MEDIUM) — Loading state with spinner is supported, important for the async operations in their sales and project management workflows.

## Notable Props
- `variant`: Controls visual style (primary, secondary, etc.)
- `loading`: Boolean loading state
- `icon`: Icon name for icon inclusion
- `iconPosition`: "left" | "right"
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Enter and Space activate; focus visible
- **Screen reader**: Button labels required; loading state communicated
- **ARIA**: Standard button ARIA; aria-label for icon-only variants

## Strengths & Gaps
- **Best at**: Dual-framework support; consistent with Playbook's brand system
- **Missing**: Some API details uncertain — medium confidence; full variant list may differ
