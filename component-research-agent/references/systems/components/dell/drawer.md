---
system: Dell Design System
component: Side Panel / Drawer
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Side Panel / Drawer

## Approach
Dell Design System may provide a side panel or drawer for enterprise management detail views — device detail panels alongside management tables, configuration drawers for hardware settings.

## Key Decisions
1. **Management detail panels** (MEDIUM) — Side panels for viewing device/server details alongside the management list.
2. **Configuration drawers** (LOW) — Drawers for configuration settings without full page navigation.

## Notable Props
- Standard panel open/close and position props

## A11y Highlights
- **Keyboard**: Focus trap; Escape closes
- **Screen reader**: dialog role expected
- **ARIA**: Standard drawer ARIA

## Strengths & Gaps
- **Best at**: Enterprise management detail views
- **Missing**: Low confidence — verify before use
