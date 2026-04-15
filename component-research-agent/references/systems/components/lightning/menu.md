---
system: Salesforce Lightning Design System
component: Action Menu / Dropdown Menu
url: https://lightningdesignsystem.com/components/menus/
last_verified: 2026-03-28
confidence: high
---

# Action Menu / Dropdown Menu

## Approach
Lightning's Menu/Dropdown is one of the system's most-used components, appearing in record actions, list view row actions, page header action bars, and navigation. Lightning provides multiple menu variants including the icon-triggered action menu (used in data table row action columns), button-triggered dropdown, and checkbox menu (for column visibility selection). The system's menu is robust with subheadings, dividers, icon support, and selection states.

## Key Decisions
1. **Row action menu pattern** (HIGH) — The action menu triggered by a down-arrow icon in table rows is a Lightning standard pattern — tight integration between the Menu and DataTable components for the "Edit, Delete, View" row actions ubiquitous in CRM list views.
2. **Selection checkmark items** (HIGH) — Menu items support checkmark/selection state for currently-active options (column visibility toggles, active filter state), making menus serve as selectable option lists in CRM toolbars.
3. **Nubbin positioning** (MEDIUM) — CSS nubbin indicating trigger position can be placed on any corner/side, accommodating the varied placement contexts throughout Salesforce's complex page layouts.

## Notable Props
- `items`: Menu item array with label, type, icon, disabled, checked
- `value` / `onselect`: Selected item tracking for selection menus
- `align`: Dropdown alignment (left/right/center)
- `iconName`: Trigger icon for icon-button-triggered menus
- `nubbin`: Nubbin position

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter/Space activate; Escape closes; tab closes and exits
- **Screen reader**: role="menu"; menuitems announced with state; aria-checked for selection items
- **ARIA**: role="menu"; role="menuitem" / "menuitemcheckbox"; aria-haspopup; aria-expanded

## Strengths & Gaps
- **Best at**: Row action menus; selection-state menu items; nubbin positioning; comprehensive enterprise menu patterns
- **Missing**: No built-in filter/search for long menu lists; sub-menu complexity
