---
component: Menu
tier: 3
last_verified: 2026-03-29
---

# Menu — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | DropdownMenu / ContextMenu / Menubar | Three separate primitives for different trigger types; CheckboxItem and RadioItem as first-class sub-components; Sub/SubTrigger/SubContent for multi-level menus; no visual styles (unstyled headless). | high |
| Chakra UI | Menu | Compound components (Menu/MenuButton/MenuList/MenuItem); MenuItemOption and MenuOptionGroup for radio/checkbox groups; `closeOnSelect` control; token-integrated hover/focus states. | high |
| GOV.UK | Not available — flat navigation pattern | No dropdown menu component; GOV.UK research found dropdown menus create barriers for users with motor impairments and cognitive disabilities; flat Header navigation is the pattern. | high |
| Base Web | Menu | Data-driven via `items` array; `getItemLabel`/`renderItem` for flexible item rendering; stateful (StatefulMenu) vs. controlled (Menu) variants; no CheckboxItem/RadioItem. | medium |
| Fluent 2 | Menu | MenuItemCheckbox and MenuItemRadio for Office toolbar patterns; SplitButton integration; nested sub-menus via MenuGroup; motion system entrance/exit animations; used in Office/Teams/Azure context menus. | high |
| Gestalt | Dropdown | Named "Dropdown" not "Menu"; Dropdown.Section for action grouping; Dropdown.Item and Dropdown.Link for mixed action/navigation menus; limited to simple action lists (no checkbox/radio/sub-menu). | medium |
| Mantine | Menu | `leftSection`/`rightSection` on items (icons + keyboard shortcut display); `closeOnItemClick` to keep menu open for toggle items; `color="red"` on items for destructive actions; loop keyboard navigation. | high |
| Orbit | Popover-based action menu | Short Popover-based action lists for booking management (3-5 items); travel domain doesn't require complex menu features; verify exact API. | medium |
| Evergreen | Menu | Menu.OptionsGroup for radio-style exclusive selection (sort/filter menus); Menu.Item with `intent` for danger actions; Popover handles trigger and positioning. | medium |
| Nord | Dropdown / Action Menu | Web component for clinical action menus (patient record Edit/Archive/Print); simple action lists appropriate for clinical staff efficiency; verify at nordhealth.design. | low |

## Key Decision Patterns

Radix's three-primitive menu system (DropdownMenu, ContextMenu, Menubar) is the clearest architectural decision in the T3 set. The WAI-ARIA menu spec has three fundamentally different patterns: a menu opened by a button trigger (DropdownMenu), a menu opened by right-click or long-press (ContextMenu), and a persistent horizontal menu strip (Menubar). These require different trigger interactions, different ARIA attributes on the trigger element, and different keyboard entry behaviors. Conflating them into a single Menu component with a `type` prop would require conditional behavior that weakens each. Radix separates them because correctness matters more than API surface minimization.

The checkpoint items (CheckboxItem and RadioItem) split reveals which systems serve productivity tool UX versus simpler action menu UX. Radix, Chakra, and Fluent 2 all provide first-class CheckboxItem/RadioItem sub-components because their target products include toolbar menus where items represent toggle states (bold/italic in Office, show/hide sidebar in Teams). Mantine, Gestalt, Base Web, and Orbit do not provide dedicated checkbox/radio menu items because their target products primarily use menus for action lists (delete, edit, share) rather than state-toggling menus. This is a product domain decision surfaced as an API gap.

Mantine's `rightSection` prop on Menu.Item is the most practical design decision for desktop application menus. Most design systems display items with a text label and optional icon on the left. Mantine adds a right-side slot specifically for keyboard shortcut display ("⌘K", "Ctrl+Z") and count badges — directly serving the use case of documentation and productivity tool menus that show keyboard shortcut reminders. No other T3 system has this as a first-class slot.

GOV.UK's absence is research-driven and the strongest documented anti-dropdown argument in the T3 set. Their user research found that hover-activated dropdowns exclude users with motor impairments (cursor leaves the menu accidentally), cognitive disabilities (hierarchical navigation is confusing), and users on touch devices (hover doesn't exist). The recommended pattern is flat navigation links and simple page structures. This is a design decision backed by the actual demographics of the UK public using government services.

## A11y Consensus

- The WAI-ARIA menu pattern requires `role="menu"` on the container, `role="menuitem"` on items, arrow key navigation within the menu, and Escape to close — all T3 systems that implement menus follow this pattern.
- CheckboxItem and RadioItem must use `role="menuitemcheckbox"` and `role="menuitemradio"` respectively, with `aria-checked` — not `role="menuitem"` with a visual checkmark; Radix, Chakra, and Fluent 2 implement this correctly.
- The trigger element must have `aria-haspopup="menu"` and `aria-expanded` to announce the menu affordance and state to screen reader users before they open the menu.
- Keyboard entry into a menu opened by a button should place focus on the first item; type-ahead (pressing a letter key to jump to items starting with that letter) is part of the ARIA menu keyboard pattern — Radix, Fluent 2, and Mantine implement type-ahead.
- Sub-menu triggers must have `aria-haspopup="menu"` and `aria-expanded`; the right arrow key opens the sub-menu; left arrow closes it and returns focus to the parent — this is only reliably implemented by Radix and Fluent 2.

## Recommended Use

Reference T3 menu approaches when deciding on single vs. multi-primitive menu architecture, CheckboxItem/RadioItem requirements, and keyboard shortcut display. Radix is the reference for the three-primitive separation (DropdownMenu/ContextMenu/Menubar) and correct ARIA for all item types; Fluent 2 is the reference for Office/productivity toolbar menu patterns with checkbox/radio items and sub-menus; Mantine is the reference for `rightSection` keyboard shortcut display; GOV.UK is the reference for the usability research argument against dropdown menus in public-facing services.
