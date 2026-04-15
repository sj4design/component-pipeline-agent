---
system: Ant Design
component: Menu + Dropdown
url: https://ant.design/components/menu/ and https://ant.design/components/dropdown/
last_verified: 2026-03-28
---

# Menu + Dropdown

## Approach

Ant Design makes one of the most architecturally unusual choices among the Tier 1 systems: it maintains **two separate components** for menus — **Menu** and **Dropdown** — that serve fundamentally different purposes. Menu is a structural navigation component for building persistent site or app navigation (top navigation bars, side navigation trees). Dropdown is a transient overlay component for surfacing contextual actions or options from a trigger button. No other Tier 1 system names its navigation component "Menu" alongside a separate action overlay; most either route navigation through a separate Navigation component or conflate the two into one. This split reflects Ant Design's origin in enterprise Chinese SaaS applications — tools like Alibaba Cloud, Ant Financial dashboards, and backend management systems where both structural site navigation and contextual action menus are simultaneously prominent UI concerns.

Menu supports three layout modes: **horizontal** (top navigation bar — suitable for consumer-facing landing pages), **vertical** (side navigation tree — suitable for multi-level admin panels), and **inline** (collapsible inline submenus — for sidebar navigation). The fact that Menu manages collapsible state, submenus, selected item persistence, and multi-level hierarchy makes it closer to what most systems would call a Navigation or Sidebar component. This is Ant Design's deliberate choice to make "Menu" do more: in backend management UIs, the distinction between navigation and menus is frequently blurred, and Ant Design serves that space directly.

Dropdown, by contrast, is simpler: it wraps any trigger element and renders a Menu (or a custom overlay) in a floating layer. Dropdown provides the positioning, z-index management, and trigger behavior; the Menu inside it provides the items. This composition pattern means that Ant Design's Dropdown effectively reuses the full power of Menu — including submenus, icon support, danger items, and selection state — inside an overlay without duplicating those features.

## Key Decisions

1. **Menu for navigation, Dropdown for contextual actions — hard split** (HIGH) — Ant Design routes persistent navigation through Menu and transient action menus through Dropdown. The WHY is product fit: Ant Design was built for enterprise admin systems where the top navigation bar and the left sidebar are central UI elements that deserve a full-featured, stateful component. Conflating navigation with ephemeral action menus would force navigation to adopt overlay semantics it doesn't need, and vice versa. This split is the right call for Ant's enterprise audience, though it can be confusing to newcomers who expect a single "Menu" component for both contexts.

2. **Inline submenus as a first-class feature of Menu** (HIGH) — Menu supports recursive, multi-level submenu nesting through its `SubMenu` component. Submenus can be inline (collapsed/expanded within a sidebar) or popup (flyout on hover/click). The WHY is the sidebar navigation reality: enterprise admin applications regularly have 3–4 levels of navigation hierarchy (Module → Section → Feature → Sub-feature). Ant Design's Menu was designed to handle this without workarounds, whereas other systems like Polaris explicitly refuse submenus and Carbon limits them to one level. The tradeoff is complexity: deeply nested menus are harder to navigate and can bury important actions.

3. **`danger` prop on Menu items** (HIGH) — Menu items (and Dropdown items) accept a `danger` boolean that applies red styling via `--ant-menu-danger-item-color: #ff4d4f`. This is a first-class design token in the component, not a custom CSS class. The WHY is user safety in enterprise contexts: actions like "Delete service," "Revoke access," or "Terminate instance" in cloud management tools have irreversible consequences. The danger state creates a visual checkpoint — a moment of recognition that the item is categorically different before clicking. Ant Design documents both a danger color and a danger active background (`--ant-menu-color-danger-item-bg-active`), ensuring the danger state persists through hover and focus.

4. **Dark theme as a first-class variant** (MEDIUM) — Menu ships with comprehensive dark theme CSS variables (`--ant-menu-dark-*`) as part of the core component, not as an external override. The WHY is Ant Design's enterprise audience: developer tools, monitoring dashboards, and cloud consoles frequently default to dark mode, and requiring a complete CSS override to achieve dark menus would create fragmented visual quality across teams. By shipping dark tokens alongside light tokens, Ant Design ensures dark mode menus are visually correct without per-team effort.

5. **Horizontal mode for top navigation** (MEDIUM) — Menu's horizontal mode renders items in a row, suitable for top navigation bars on landing pages and consumer apps. When the menu overflows horizontal space, it automatically collapses excess items into an overflow submenu. The WHY is product versatility: Ant Design serves both consumer-facing Alibaba properties (where horizontal top navigation is standard) and enterprise admin tools (where vertical side navigation dominates). Supporting both layout modes in a single component lets teams switch navigation orientation without changing their data model.

6. **Dropdown + Menu composition for full-featured overlays** (HIGH) — Dropdown does not have its own item list implementation. Instead, it accepts a Menu as its content, then positions and displays it as a floating overlay. The WHY is DRY architecture: all the features of Menu (icons, danger items, submenus, selection) become available inside a Dropdown without reimplementation. This means Dropdown inherits Menu's accessibility behavior automatically, and improvements to Menu propagate to all Dropdown contexts. The downside is that Dropdown is tightly coupled to Menu's API, making it harder to use completely custom overlay content.

7. **Icon support with consistent sizing and spacing** (MEDIUM) — Menu items support leading icons with standardized sizing (`--ant-menu-icon-size: 14px`) and spacing (`--ant-menu-icon-margin-inline-end: 10px`). The WHY is scanability in dense admin interfaces: icons serve as visual anchors that let users pattern-match on shape rather than reading every label. The consistent spacing ensures icons align across all items in a menu, preventing the visual misalignment that occurs when ad-hoc icon placement is left to individual teams.

## Notable Props

- `mode`: `"horizontal"` | `"vertical"` | `"inline"` — the most consequential prop, determines the entire layout and interaction model.
- `danger` on Menu.Item: Boolean — applies red danger styling via design tokens, not custom CSS.
- `collapsed`: Boolean on inline mode — controls sidebar collapse state, enabling animated expand/collapse.
- `selectedKeys` / `defaultSelectedKeys`: Controlled/uncontrolled selection state — Menu tracks which items are "selected" (active navigation state), a feature action menus don't need.
- `openKeys` / `defaultOpenKeys`: Controls which submenus are expanded — relevant for sidebar navigation persistence across page loads.
- `theme`: `"light"` | `"dark"` — toggles the full dark theme token set.

## A11y Highlights

- **Keyboard**: Arrow keys (up/down) navigate items; Enter/Space activate; Escape closes popup submenus. Horizontal menus additionally support left/right arrow navigation between top-level items. The 46px horizontal line height (`--ant-menu-horizontal-line-height`) meets WCAG's 44px minimum touch target size.
- **Screen reader**: Group titles (at muted `rgba(0,0,0,0.45)` opacity) provide categorical structure that screen readers can announce. Selected items receive `aria-selected="true"`. Disabled items carry `aria-disabled="true"`.
- **ARIA**: `role="menu"` on the container; `role="menuitem"` on standard items; `role="menuitemradio"` on items in a selection group. `aria-expanded` on submenus. The z-index popup layer (`--ant-menu-z-index-popup: 1050`) is high enough to clear modals and other overlaid content in complex admin layouts.

## Strengths & Gaps

- **Best at**: Breadth — the combination of Menu and Dropdown provides the most feature-complete menu ecosystem among Tier 1 systems, covering structural navigation, inline submenus, contextual overlays, dark mode, danger states, and icon support all in one cohesive system.
- **Missing**: No built-in keyboard shortcut display in menu items, no inline filtering for long lists (unlike Polaris's `allowFiltering`), and no explicit guidance for very long menus in the dropdown context (50+ item menus have no virtualization story).
