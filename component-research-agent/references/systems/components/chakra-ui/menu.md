---
system: Chakra UI
component: Menu
url: https://chakra-ui.com/docs/components/menu
last_verified: 2026-03-28
confidence: high
---

# Menu

## Approach
Chakra UI's Menu provides a styled dropdown menu component with Chakra's design token integration. It composes as Menu, MenuButton, MenuList, MenuItem, MenuItemOption (for selection), MenuOptionGroup (radio/checkbox groups), MenuDivider, and MenuGroup. The component handles focus management, keyboard navigation, and ARIA automatically. Chakra's Menu is designed for action menus (not navigation menus), providing clear slot-based composition.

## Key Decisions
1. **MenuItemOption and MenuOptionGroup** (HIGH) — First-class components for checkbox and radio-style menu items, supporting the pattern of menus that contain toggle or exclusive selection items (e.g., "Sort by" menu with radio items).
2. **MenuButton as the trigger** (HIGH) — MenuButton is a dedicated trigger component that automatically connects to the menu via ARIA. It renders as a standard button with correct `aria-haspopup="menu"` and `aria-expanded`.
3. **Token-integrated styling** (MEDIUM) — Menu items use Chakra's hover/focus tokens, so the entire menu adapts to the active color scheme without any custom CSS.

## Notable Props
- `isOpen` / `onOpen` / `onClose`: controlled state
- `MenuItemOption`: `value`, `type="checkbox"` or `type="radio"` (default)
- `MenuOptionGroup`: `value`, `onChange`, `type="radio" | "checkbox"` for grouped selection
- `closeOnSelect`: boolean — controls if menu closes after item selection

## A11y Highlights
- **Keyboard**: Arrow keys navigate items; Enter activates; Escape closes; type-ahead for items
- **Screen reader**: `role="menu"` on MenuList; `role="menuitem"` on items; `role="menuitemcheckbox"` / `role="menuitemradio"` on option items
- **ARIA**: `aria-checked` on option items; `aria-expanded` on MenuButton; `aria-haspopup="menu"`

## Strengths & Gaps
- **Best at**: MenuOptionGroup for radio/checkbox items; token-integrated styling; clean component composition
- **Missing**: No ContextMenu equivalent; no Menubar (horizontal persistent menu) component
