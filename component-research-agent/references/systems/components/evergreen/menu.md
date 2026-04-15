---
system: Evergreen (Segment)
component: Menu / Popover
url: https://evergreen.segment.com/components/menu
last_verified: 2026-03-28
confidence: medium
---

# Menu

## Approach
Evergreen provides Menu and Popover components. Menu is the content structure (menu items, groups, dividers) while Popover handles the trigger and panel positioning. This composition is similar to Base Web's approach. Evergreen's Menu supports menu items with icons and a selectable item variant for toggle actions.

## Key Decisions
1. **Menu.Group and Menu.Divider** (MEDIUM) — Section grouping for organizing related menu actions. Analytics dashboards group View/Edit/Delete actions by category.
2. **Menu.OptionsGroup** (HIGH) — A menu option group with radio-style exclusive selection. Used for sort order menus ("Most recent" / "Alphabetical") in Segment's analytics tables.

## Notable Props
- Menu: composable with Menu.Group, Menu.Divider, Menu.Item, Menu.OptionsGroup
- Menu.Item: `icon`, `onSelect`, `intent`
- Menu.OptionsGroup: `options`, `selected`, `onChange`, `title`

## A11y Highlights
- **Keyboard**: Arrow keys; Enter; Escape; proper menu role pattern
- **Screen reader**: role="menu"; menuitem; separator roles
- **ARIA**: OptionsGroup uses aria-checked for selected state

## Strengths & Gaps
- **Best at**: Menu.OptionsGroup for sort/filter menus; intent on items for danger actions; Popover composition
- **Missing**: No sub-menu support; no context menu
