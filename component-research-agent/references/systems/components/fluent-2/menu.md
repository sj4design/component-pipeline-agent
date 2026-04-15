---
system: Fluent 2 (Microsoft)
component: Menu
url: https://fluent2.microsoft.design/components/web/react/menu/usage
last_verified: 2026-03-28
confidence: high
---

# Menu

## Approach
Fluent 2's Menu is a comprehensive dropdown menu component for Microsoft's diverse product needs — Office right-click context menus, Teams action menus, Azure resource action menus. It supports all menu item variants: regular items, checkbox items, radio items, sub-menus, and dividers. The component integrates with Fluent's motion system for entrance/exit animations. Fluent Menu also supports a "split button" pattern via SplitButton + Menu integration.

## Key Decisions
1. **MenuItemCheckbox and MenuItemRadio** (HIGH) — First-class components for Office toolbar menus where items represent toggle states (bold/italic/underline) or exclusive selections (alignment). These have correct aria-checked and menuitemcheckbox/menuitemradio roles.
2. **Nested sub-menus** (HIGH) — Full sub-menu support with MenuGroupHeader and nested Menu components. Office menus frequently have sub-menus (Insert > Table > sizes).
3. **SplitButton integration** (HIGH) — Menu integrates with SplitButton to create the button+dropdown pattern common in Office (Save + Save As dropdown, Send + Send options dropdown).

## Notable Props
- `open` / `onOpenChange`: controlled state
- `MenuTrigger > disableButtonEnhancement`: for non-button triggers
- `MenuItemCheckbox`: `checked`, `name`, `value`
- `MenuItemRadio`: `value` — within MenuGroup `selectionMode="single"`
- `positioning`: placement configuration

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter activates; Escape closes; right arrow opens sub-menu; type-ahead
- **Screen reader**: role="menu", role="menuitem", role="menuitemcheckbox", role="menuitemradio"; aria-checked on selection items
- **ARIA**: Full ARIA menu pattern; sub-menus connected via aria-controls; separators have role="separator"

## Strengths & Gaps
- **Best at**: MenuItemCheckbox/Radio for Office toolbar patterns; SplitButton integration; nested sub-menus; motion integration
- **Missing**: No specific ContextMenu variant (uses Menu with different trigger); limited icon position options
