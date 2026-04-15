---
system: GitHub Primer
component: ActionMenu
url: https://primer.style/components/action-menu
last_verified: 2026-03-28
confidence: high
---

# ActionMenu

## Approach
GitHub Primer's ActionMenu is a feature-rich dropdown menu built on Primer's overlay system. It's used extensively for GitHub's contextual action menus — branch selector, label assignment, assignee picker, and overflow action menus. ActionMenu supports items with leading visual (icons, avatars), descriptions, dividers, and selection states. The ActionList component (used inside ActionMenu) is a versatile list primitive that also appears as standalone action lists.

## Key Decisions
1. **ActionList as shared primitive** (HIGH) — ActionMenu composes ActionList, meaning menu items share the same component as standalone lists, ensuring visual consistency between menus and list views throughout GitHub's interface.
2. **Multi-select items via ActionList.Selection** (HIGH) — ActionMenu supports multi-select items with checkmarks for GitHub's label assignment and project selection patterns where users select multiple options from a menu.
3. **Leading/trailing visual on items** (HIGH) — Each menu item supports leadingVisual (icon, color dot for labels, avatar for users) and trailingVisual, essential for GitHub's label, assignee, and milestone pickers that show visual identifiers.

## Notable Props
- `onOpenChange`: Menu open/close callback
- ActionList.Item `selected`: Selection state
- ActionList.Item `onSelect`: Item selection callback
- ActionList.Group: Item grouping with optional heading
- `anchorRef`: Custom anchor for programmatic positioning

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter/Space activate; Escape closes; focus traps in open menu
- **Screen reader**: role="menu" or role="listbox" depending on selection mode; items announced with state
- **ARIA**: aria-haspopup; aria-expanded; role="menuitem" or role="option"; aria-checked for selected items

## Strengths & Gaps
- **Best at**: Multi-select menus; leading visuals for icons/avatars/color labels; ActionList sharing between menus and standalone lists
- **Missing**: No built-in search/filter within menu; complex nested sub-menus require custom composition
