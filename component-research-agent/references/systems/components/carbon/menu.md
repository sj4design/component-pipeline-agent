---
system: Carbon Design System (IBM)
component: Menu, MenuButton, MenuItem, MenuDivider
url: https://carbondesignsystem.com/components/menu/usage/
last_verified: 2026-03-28
---

# Menu

## Approach

Carbon's menu system reflects IBM's enterprise software reality: users in tools like IBM Cloud, Watson Studio, and Cognos are power users who rely heavily on keyboard shortcuts, need to act on dense data tables, and often right-click on rows and columns expecting contextual actions. Carbon's response to this context is a menu component that explicitly supports keyboard shortcut display, right-click context menu activation, and submenu nesting — all as first-class features rather than afterthoughts.

The component family is **Menu** (the list surface), **MenuButton** (a composed trigger + menu for button-triggered use cases), and **MenuItem** (each action item). Carbon also explicitly documents that menu triggers can be an **overflow menu** (three-dot icon), a **combo button**, or a **context menu** (right-click on a row, column, or page area). This breadth of trigger types reflects IBM's enterprise data-heavy interfaces where multiple access patterns for the same actions need to coexist.

The overarching philosophy is information density paired with progressive complexity: menus can start flat, gain sections and dividers as the item count grows, and gain submenus when commands have meaningful hierarchical relationships. But Carbon explicitly warns against deep nesting — multiple levels of submenus make navigation harder, and the recommendation is to avoid more than one level of nesting.

## Key Decisions

1. **Menu (actions) vs. Dropdown (selection) — explicit separation** (HIGH) — Carbon routes all "choose a value" interactions through its Dropdown component (and its variants: Select, ComboBox, MultiSelect). The Menu component is strictly for executing actions. The WHY is semantic HTML and ARIA correctness: an action menu uses `role="menu"` + `role="menuitem"`, while a selection control uses listbox semantics. Conflating them breaks screen readers and violates WCAG success criteria around name/role/value.

2. **Keyboard shortcut display is a built-in feature** (HIGH) — Menu items in Carbon can display a keyboard shortcut annotation alongside the action label (e.g., "Copy  Ctrl+C"). The WHY is IBM's power-user product context: in data analysis tools, developers IDEs (built on Carbon), and cloud management consoles, keyboard shortcuts are a primary efficiency mechanism. Surfacing shortcuts directly in menus progressively educates users toward keyboard mastery without requiring them to hunt through help documentation.

3. **Context menu (right-click) is a first-class trigger** (HIGH) — Carbon explicitly documents right-click as a trigger mechanism for menus, naming it a "context menu." The guidelines state that menus can be opened when right-clicking on a page, a column, or a row. The WHY is table and data grid density: in a table with 50 rows, right-clicking a row for row-level actions is far faster than selecting the row then hunting for an action button. No other Tier 1 system documents right-click this explicitly.

4. **Danger hover state for destructive items** (HIGH) — Carbon menu items have a dedicated "danger hover" visual state — a distinct color treatment applied to destructive actions like "Delete." The WHY is error prevention: in enterprise tools where mistakes can affect production systems, billing, or published data, there needs to be a moment of visual pause before a destructive action. There are seven documented item states including both "danger hover" and "danger hover and focus," ensuring the distinction survives all interaction modalities.

5. **Submenus supported but limited to one level** (MEDIUM) — Submenus are supported via a caret indicator on the parent item. However, Carbon explicitly recommends against multiple levels of nesting because each additional level compounds navigation complexity. The WHY is cognitive load: a user navigating Menu → Submenu → Sub-submenu must hold the hierarchy in working memory, which is expensive in a complex enterprise UI already demanding attention elsewhere.

6. **Sections and dividers as grouping tools** (MEDIUM) — When there is a significant number of menu items, Carbon groups them into sections separated by divider lines. The dividers serve double duty: they categorize related actions AND visually distinguish high-impact actions (like delete at the bottom of a list, separated from safer actions above). The WHY is both scanability and safety — users can find their target faster in grouped lists, and the visual break before destructive actions creates a micro-checkpoint.

7. **Max 12 items guideline** (MEDIUM) — For context menus and overflow menus, Carbon recommends no more than 12 items. The WHY is scanability: beyond 12, a menu becomes a list that requires scrolling or sub-scanning, which defeats the purpose of the fast-access pattern menus are designed to serve. If more than 12 actions are needed, the guidance is to reorganize into submenus or reconsider the information architecture.

## Notable Props

- `label` on MenuButton: The trigger button label — Carbon's MenuButton is one of the few systems that surfaces a labeled button (not just an icon) as the primary menu trigger, reflecting enterprise contexts where icon-only buttons lack sufficient affordance.
- `kind` on MenuButton: Supports `primary`, `secondary`, `ghost`, and `danger` variants — the trigger button's visual hierarchy can match its urgency, which is rare among menu trigger patterns.
- Submenu indicator: A caret icon (chevron right) is automatically applied to items that have submenus, maintaining consistent affordance.
- `divider`: Explicit divider component for sectioning — not CSS-only, ensuring screen readers can perceive the grouping boundary.

## A11y Highlights

- **Keyboard**: When the button has focus, Space and Enter activate the popup menu. Up/Down arrow keys navigate the list. Escape closes the menu. Right arrow opens a submenu; Left arrow closes it and returns to parent. Home and End jump to first and last items.
- **Screen reader**: The popup menu has `role="menu"` with `aria-label="Menu"`. The trigger button uses `aria-haspopup="true"`. Each option has `role="menuitem"` with a unique `aria-label`. Single-select and multi-select items use checkmarks; visually selected items are communicated through the ARIA state.
- **ARIA**: `role="menu"` on the container, `role="menuitem"` on standard items. The trigger element sets `aria-haspopup="true"`. Disabled items carry `aria-disabled="true"` and remain focusable (Carbon's preference is to allow focus on disabled items so keyboard users can encounter and understand them, consistent with WCAG guidance on keyboard traps).

## Strengths & Gaps

- **Best at**: Enterprise power-user features — keyboard shortcut display, right-click context menus, and explicit danger states put Carbon ahead of every other Tier 1 system for data-heavy, command-rich interfaces.
- **Missing**: No automatic mobile adaptation (no tray mode like Spectrum), and no explicit guidance for icon-only menu items or menus with very complex content like descriptions or badges alongside actions.
