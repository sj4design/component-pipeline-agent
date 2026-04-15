---
system: Twilio Paste
component: Menu
url: https://paste.twilio.design/components/menu
last_verified: 2026-03-28
confidence: high
---

# Menu

## Approach
Twilio Paste's Menu is a dropdown action menu built on Reakit's Menu primitive, providing the full ARIA menu/menuitem pattern. It's used for overflow action menus, contextual actions on resources, and multi-option controls in the Twilio console. Paste distinguishes Menu (action list) from Select (value selection) and from ListBox, with documentation guiding the correct component per use case.

## Key Decisions
1. **Reakit Menu primitive** (HIGH) — Full ARIA menu pattern (role="menu", role="menuitem", role="menuitemcheckbox", role="menuitemradio") from Reakit, ensuring keyboard navigation follows the ARIA menu specification.
2. **MenuGroup + MenuSeparator** (HIGH) — Menu supports groups with labels and visual separators for organizing action sets, common in the Twilio console's resource action menus.
3. **Hierarchical/nested menus** (MEDIUM) — Sub-menu support via MenuItem triggering a nested Menu, used for multi-level action organization in complex console workflows.

## Notable Props
- `state`: useMenuState hook result for controlled menu
- `MenuButton`: Trigger button component
- `MenuItem`, `MenuGroup`, `MenuSeparator`: Sub-components
- `placement`: Dropdown placement direction

## A11y Highlights
- **Keyboard**: Arrow keys navigate items; Enter/Space activate; Escape closes; right arrow opens sub-menu; Tab closes and moves focus
- **Screen reader**: role="menu"; role="menuitem"; selected item tracking via aria-activedescendant
- **ARIA**: Full ARIA menu pattern; aria-haspopup on trigger; aria-expanded; arrow key focus management

## Strengths & Gaps
- **Best at**: Full ARIA menu specification compliance; nested sub-menus; clear action vs select distinction
- **Missing**: No built-in search/filter within menu for large item sets
