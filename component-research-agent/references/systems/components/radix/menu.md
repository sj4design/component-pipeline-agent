---
system: Radix UI (WorkOS)
component: DropdownMenu / ContextMenu / Menubar
url: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
last_verified: 2026-03-28
confidence: high
---

# DropdownMenu / ContextMenu / Menubar

## Approach
Radix provides three distinct menu primitives: DropdownMenu (triggered by button), ContextMenu (triggered by right-click), and Menubar (persistent menu strip). Each implements the correct WAI-ARIA menu pattern for its trigger type. They share sub-components for items (Item, CheckboxItem, RadioItem, Sub, SubTrigger, SubContent) but have different root behavior. This separation ensures each menu type has the correct keyboard behavior without compromise.

## Key Decisions
1. **Three separate menu types** (HIGH) — DropdownMenu, ContextMenu, and Menubar are separate because they have fundamentally different interaction models and ARIA patterns. Conflating them would require conditional behavior that makes each worse.
2. **CheckboxItem and RadioItem as menu primitives** (HIGH) — Checked state menu items (toggle features) and radio-group menu items (exclusive selection in a menu) are first-class sub-components. This covers common patterns in editing toolbars without consumer workarounds.
3. **Sub-menus via Sub, SubTrigger, SubContent** (HIGH) — Multi-level menus are composable via these three parts. SubTrigger automatically gets the correct arrow indicator and `aria-haspopup` attributes.

## Notable Props
- `open` / `onOpenChange`: controlled menu state
- `modal`: boolean — when false, allows interaction outside the menu
- `DropdownMenu.CheckboxItem`: `checked`, `onCheckedChange`
- `DropdownMenu.RadioItem` + `DropdownMenu.RadioGroup`: radio selection
- `inset`: adds left padding to align with checked items

## A11y Highlights
- **Keyboard**: Arrow keys navigate items; Enter activates; Escape closes; type-ahead for items; Right arrow opens submenu
- **Screen reader**: `role="menu"` on content; `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`; `aria-checked` on checkbox/radio items
- **ARIA**: Full ARIA menu pattern; ContextMenu trigger has `aria-haspopup="menu"`; `aria-expanded` on DropdownMenu trigger

## Strengths & Gaps
- **Best at**: Complete menu ecosystem; CheckboxItem/RadioItem; correct ContextMenu vs DropdownMenu separation; sub-menus
- **Missing**: No visual styles; no keyboard shortcut display built-in; no icon slot (must be added by consumer)
