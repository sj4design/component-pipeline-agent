---
system: Wise Design
component: Drawer / Side Panel
url: https://wise.design/components/drawer
last_verified: 2026-03-28
confidence: low
---

# Drawer / Side Panel

## Approach
Wise may use a drawer or bottom sheet for mobile financial workflows — account settings, transfer details, and verification steps on mobile. Financial product drawers handle high-stakes content requiring clear focus management.

## Key Decisions
1. **Mobile financial workflows** (MEDIUM) — Side or bottom drawers for transfer details and account settings on mobile.
2. **Focus management** (MEDIUM) — Critical for financial content requiring user attention.

## Notable Props
- `isOpen`, `onClose`, `position`

## A11y Highlights
- **Keyboard**: Focus trap; Escape closes
- **Screen reader**: dialog role expected
- **ARIA**: Standard drawer ARIA expected

## Strengths & Gaps
- **Best at**: Mobile financial workflow panels
- **Missing**: Low confidence — limited documentation
