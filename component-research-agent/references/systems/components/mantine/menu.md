---
system: Mantine
component: Menu
url: https://mantine.dev/core/menu/
last_verified: 2026-03-28
confidence: high
---

# Menu

## Approach
Mantine's Menu is a feature-complete dropdown menu with a clean API. It supports all standard menu item types: regular items (with icons and keyboard shortcuts display), checked items, dividers, and labels. The component uses Mantine's Popover under the hood for positioning and handles focus management. Menu.Target wraps the trigger element.

## Key Decisions
1. **Menu.Item with icon and rightSection** (HIGH) — Items support `leftSection` (icon) and `rightSection` (keyboard shortcut display, count badges, etc.). This covers the full range of desktop application menu item content.
2. **closeOnItemClick** (MEDIUM) — Boolean to control whether the menu closes after an item is clicked. For menus where items represent toggles (show/hide columns), you want to keep the menu open. Default is true.
3. **Loop keyboard navigation** (HIGH) — Like Mantine's Accordion and Tabs, keyboard navigation loops from last to first item. Consistent keyboard behavior across all Mantine interactive components.

## Notable Props
- `opened` / `onChange`: controlled state
- `closeOnItemClick`: boolean — keep open on item click
- `loop`: keyboard navigation wraps
- Menu.Item: `leftSection`, `rightSection`, `disabled`, `color` (danger color for destructive actions), `onClick`
- Menu.Label: section label text
- Menu.Divider: separator

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter activates; Escape closes; Home/End jump to ends; loop option
- **Screen reader**: role="menu"; role="menuitem"; role="separator" on dividers; labels via Menu.Label with role="presentation"
- **ARIA**: Full menu ARIA; items with color="red" are still announced normally (color is visual only)

## Strengths & Gaps
- **Best at**: rightSection for shortcuts/badges; closeOnItemClick control; loop navigation; item color for danger
- **Missing**: No CheckboxItem/RadioItem (use MenuItem with custom checked icon); no sub-menu built-in
