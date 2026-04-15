---
system: Base Web (Uber)
component: Menu
url: https://baseweb.design/components/menu/
last_verified: 2026-03-28
confidence: medium
---

# Menu

## Approach
Base Web's Menu provides a dropdown list of items. It integrates with the StatefulPopover or Popover for the trigger and panel behavior, and provides the Menu component for the list content. This composition model separates trigger behavior (Popover) from list content (Menu), allowing more flexible trigger types.

## Key Decisions
1. **Stateful vs controlled** (MEDIUM) — StatefulMenu manages item highlight state; Menu is controlled. StatefulMenu is simpler for most use cases.
2. **getItemLabel / renderItem** (HIGH) — Flexible item rendering: getItemLabel for simple label extraction from data objects, or renderItem for full custom rendering.
3. **Overrides per item** (HIGH) — Items can have individual overrides for specific rows.

## Notable Props
- `items`: array of item objects
- `getItemLabel`: function to extract display label
- `renderItem`: custom item renderer
- `onItemSelect`: selection callback
- `overrides`

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter selects; Escape closes
- **Screen reader**: role="menu" with role="menuitem" items; aria-activedescendant tracks focused item
- **ARIA**: Standard menu ARIA; StatefulMenu manages focus/active state

## Strengths & Gaps
- **Best at**: Flexible item rendering; Popover integration; Overrides per item
- **Missing**: No CheckboxItem/RadioItem variants; no context menu support
