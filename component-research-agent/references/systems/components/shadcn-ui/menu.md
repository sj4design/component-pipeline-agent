---
system: shadcn/ui
component: DropdownMenu
url: https://ui.shadcn.com/docs/components/dropdown-menu
last_verified: 2026-03-28
confidence: high
---

# DropdownMenu

## Approach
shadcn/ui's DropdownMenu is built on Radix UI's DropdownMenu primitive, providing the full ARIA menu pattern with keyboard navigation, nested sub-menus, and item variants (standard, checkbox, radio, separator, label). The compound component API gives full structural control. ContextMenu is a separate component sharing the same patterns for right-click context menus.

## Key Decisions
1. **Radix DropdownMenu primitive** (HIGH) — Full ARIA menu pattern from Radix including roving tabindex, keyboard navigation, sub-menu hover/arrow triggering, and all menu item types.
2. **DropdownMenuCheckboxItem + DropdownMenuRadioItem** (HIGH) — Built-in support for checkbox and radio menu items (with checked/selected state indicators), enabling column visibility toggles and single-selection menu patterns without custom components.
3. **Nested sub-menus** (HIGH) — Sub-menus via DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent — full hierarchical menu support with proper keyboard activation (right arrow to open, left arrow to close).

## Notable Props
- `open` / `defaultOpen`: Controlled/uncontrolled
- `onOpenChange`: Callback
- `DropdownMenuCheckboxItem[checked]`: Checkbox item state
- `DropdownMenuRadioGroup[value]`: Radio group selection
- `modal`: Whether to use modal focus trapping

## A11y Highlights
- **Keyboard**: Arrow keys; Enter/Space; Escape; right arrow opens sub-menu; left arrow closes sub-menu
- **Screen reader**: Full ARIA menu roles; checked state on checkbox/radio items; sub-menu trigger announces sub-menu presence
- **ARIA**: Radix auto-wires all menu ARIA; role="menu"; role="menuitem/checkox/radio/separator"; aria-haspopup; aria-expanded

## Strengths & Gaps
- **Best at**: Complete menu item type support; nested sub-menus; ContextMenu sharing the same pattern; Radix full ARIA correctness
- **Missing**: No built-in search/filter within menu; ContextMenu requires separate component setup
