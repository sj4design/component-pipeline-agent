---
system: Orbit (Kiwi.com)
component: Popover / ActionMenu
url: https://orbit.kiwi/components/popover/
last_verified: 2026-03-28
confidence: medium
---

# Menu / Action Menu

## Approach
Orbit handles action menus through the Popover component combined with a list of actions. A dedicated ActionMenu or DropdownMenu may exist as an overlay pattern. In Kiwi.com's interface, action menus appear for booking management (cancel, modify, share) and trip options. The travel context means menus are typically short (3-5 items) and action-oriented.

## Key Decisions
1. **Popover-based action lists** (MEDIUM) — Orbit's menu pattern uses Popover as the overlay mechanism with action list content inside.
2. **Short action-oriented lists** (MEDIUM) — Travel booking menus don't require checkbox/radio items or complex hierarchies.

## Notable Props
- Popover-based; specific ActionMenu API may vary
- Likely: anchor trigger, open/close state, action items

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter activates; Escape closes
- **Screen reader**: Appropriate menu ARIA
- **ARIA**: Standard dropdown menu pattern

## Strengths & Gaps
- **Best at**: Simple action menus for booking management
- **Missing**: No checkbox/radio menu items; no sub-menus; verify exact API at orbit.kiwi
