---
system: Dell Design System
component: ButtonGroup / Segmented Control
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Segmented Control / ButtonGroup

## Approach
Dell Design System may use a segmented control or button group for view mode toggles and filter selection in enterprise management interfaces and Dell.com product browsing.

## Key Decisions
1. **View toggles** (MEDIUM) — Grid/list view and filter mode selection.
2. **Management interface toggles** (LOW) — Tab/panel view selection in management consoles.

## Notable Props
- `value`, `onChange`

## A11y Highlights
- **Keyboard**: Group navigation
- **Screen reader**: Selection state
- **ARIA**: Group semantics

## Strengths & Gaps
- **Best at**: Enterprise view mode selection
- **Missing**: Low confidence — verify before use
