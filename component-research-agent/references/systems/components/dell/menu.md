---
system: Dell Design System
component: Menu
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Menu

## Approach
Dell Design System's Menu is used in enterprise management interfaces for contextual device actions (restart, update, configure, decommission) and navigation menus in management consoles and e-commerce.

## Key Decisions
1. **Enterprise management actions** (MEDIUM) — Menu designed for device/system management operations with clear action labels.
2. **Icon support** (LOW) — Icon + label items for action recognition in dense management UIs.
3. **Hierarchical sub-menus** (LOW) — Sub-menus for complex action hierarchies in management consoles.

## Notable Props
- Standard menu trigger and items

## A11y Highlights
- **Keyboard**: Arrow key navigation; Escape close
- **Screen reader**: Menu role; items announced
- **ARIA**: Standard menu ARIA

## Strengths & Gaps
- **Best at**: Enterprise management action menus
- **Missing**: Low confidence — verify before use
