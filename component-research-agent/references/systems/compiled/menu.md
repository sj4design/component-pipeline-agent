---
component: menu
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Menu — All Systems Digest

## Material Design 3
**Approach**: Three distinct menu types — dropdown (anchor-triggered overlay list), context (right-click/long-press), exposed dropdown (persistent inline selection surface). 3-dot OverflowMenu pattern for toolbar overflow. Leading icons in menu items for domain visual coding.
**Key decisions**:
- Three types by trigger/context; context menus require different positioning logic (cursor-relative vs. anchor-relative) — same component would need branching trigger handling
- No keyboard shortcut display built-in; M3 targets cross-platform mobile/web where keyboard shortcuts are desktop-only conventions
- Exposed dropdown is persistent (not overlay); inline selection surfaces don't interrupt reading flow for single-value display contexts
**Notable API**: `type` (dropdown|context|exposed-dropdown); `anchorElement`; leading icon slot per item; `OverflowMenu` convenience component
**A11y**: role="menu" + role="menuitem"; arrow keys navigate; Enter/Space select; Escape closes and returns focus to trigger; submenu items use aria-haspopup.
**Best at**: Type taxonomy covering trigger-relative vs. cursor-relative positioning. **Missing**: No built-in keyboard shortcut display; no destructive item styling.

## Spectrum (Adobe)
**Approach**: Three-component system — Menu (content), MenuTrigger (anchor + open state), ActionMenu (pre-composed trigger+menu shortcut). `onAction` vs. `onSelectionChange` split at API level enforces action vs. selection semantics. Auto-converts to bottom tray on mobile viewports. `ContextualHelpTrigger` wraps disabled items to explain why they're unavailable.
**Key decisions**:
- `onAction`/`onSelectionChange` separation; action menus (do something) and selection menus (pick a value) have fundamentally different state management — one callback handler for both leads to accidental mixing
- Auto-tray on mobile; overlay menus anchored to desktop triggers are unreachable on small viewports — automatic conversion prevents mobile layout failures
- `ContextualHelpTrigger` for disabled items; disabled without explanation fails WCAG 1.4.3 informational adequacy for users who can't determine why an option is unavailable
**Notable API**: `onAction(key)`; `onSelectionChange(keys)`; `selectionMode` (single|multiple|none); `disabledKeys`; `ContextualHelpTrigger`; `renderEmptyState`
**A11y**: role="menu" + aria-label required; disabledKeys items still focusable (discoverable); ContextualHelpTrigger opens popover explaining disabled state; keyboard shortcut display not supported.
**Best at**: Mobile tray auto-conversion and disabled-item contextual help — best accessibility architecture for action menus. **Missing**: No keyboard shortcut display, no built-in submenu depth limit guidance.

## Carbon (IBM)
**Approach**: Keyboard shortcut display built-in (unique among all systems). Right-click context menu is first-class (not an afterthought). Danger hover state for destructive items. Maximum 12 items per menu documented. Icon-only trigger variant for toolbar overflow menus.
**Key decisions**:
- Keyboard shortcut display; IBM enterprise power users operate primarily via keyboard — showing shortcuts in menus teaches and accelerates workflows
- Context menu first-class; IBM data analysis tools (IBM Analytics, Cognos) require right-click workflows; treating it as a variant would limit its API
- Max 12 items guideline; beyond 12 items, scanning overhead exceeds threshold — use a tree or select instead (one of the few concrete density limits documented)
**Notable API**: `label` (item text); `shortcutText` (keyboard shortcut display); `renderIcon`; `hasDivider`; `danger` (destructive styling); `size` (sm|md|lg)
**A11y**: role="menu" + role="menuitem"; keyboard shortcut text is visually displayed and SR-readable (not aria-hidden); danger items announced as-is (no additional SR warning beyond visual styling).
**Best at**: Enterprise keyboard-shortcut workflow support and context menu first-class status. **Missing**: No mobile adaptation (tray conversion); no ContextualHelp for disabled items.

## Polaris (Shopify)
**Approach**: No Menu component — uses ActionList inside Popover composition. `actionRole` prop on ActionList switches item semantics (menuitem|option|destructive). `allowFiltering` for 8+ items adds inline search. Destructive boolean flag; no Section grouping limit.
**Key decisions**:
- ActionList + Popover composition; Shopify apps need ActionList in contexts other than menus (bulk action bars, resource list row actions, card footers) — a dedicated Menu component would duplicate ActionList with less flexibility
- `allowFiltering` on large lists; merchant apps with 20+ shipping carriers or payment methods need inline filter without navigating to a separate screen
- `actionRole` as semantic switch; the same list of actions might be menu items in a dropdown or options in a listbox depending on context — one prop vs. two components
**Notable API**: `actionRole` (menuitem|option|destructive); `allowFiltering`; `items` array (with url, onAction, destructive, disabled per item); `sections` for grouping
**A11y**: role driven by actionRole prop; Popover manages focus trap and Escape dismissal; destructive items have no additional SR warning (visual-only distinction).
**Best at**: Composable ActionList flexibility for non-menu contexts. **Missing**: No keyboard shortcut display; no disabled-item contextual help; no built-in mobile tray.

## Atlassian
**Approach**: Two distinct components — DropdownMenu (contextual overlay, triggered) vs. Menu (persistent navigation sidebar). DropdownItemCheckbox and DropdownItemRadio are separate components (not modes). No destructive item styling — Atlassian uses confirmation modals instead of red text for irreversible actions.
**Key decisions**:
- DropdownMenu vs. Menu split; Jira sidebar navigation (persistent, keyboard-navigable, always-present) and dropdown action lists (temporary, focus-trapped, trigger-anchored) have incompatible a11y requirements — one component would need branching ARIA role management
- Separate DropdownItemCheckbox/DropdownItemRadio components; selection state (aria-checked) and action semantics (menuitem vs. menuitemcheckbox) require different ARIA roles — a `selectionMode` prop would need runtime ARIA switching
- No destructive styling; Atlassian UX research shows red menu items increase accidental clicks — irreversible actions require confirmation dialog friction, not just color warning
**Notable API**: `trigger` (ReactNode, receives isOpen); `placement`; `shouldFlip`; `DropdownItemCheckbox` / `DropdownItemRadio`; `shouldRenderToParent` (portal control)
**A11y**: role="menu" + role="menuitem/menuitemcheckbox/menuitemradio" per item type; Escape closes and returns focus; arrow keys navigate; no hover-only interactions.
**Best at**: Semantic item-type differentiation and principled avoidance of destructive styling. **Missing**: No keyboard shortcut display; no disabled-item help; no mobile tray adaptation.

## Ant Design
**Approach**: Two components with distinct use cases — Menu (structural navigation, persistent, horizontal/vertical/inline modes) and Dropdown (contextual overlay). `danger` prop for destructive items. Dark theme first-class (`theme="dark"`). Inline submenu mode supports unlimited depth (no depth recommendation).
**Key decisions**:
- Menu vs. Dropdown split; application navigation (top nav, sidebar) needs persistent presence, selected-state tracking, and collapse behavior — overlay contextual menus need none of these
- `danger` prop on items; Chinese enterprise UX requires visual distinction for destructive actions inline rather than always requiring confirmation dialogs
- Dark theme built-in; Ant Design targets enterprise dashboards where dark mode is a first-class requirement, not an afterthought CSS override
**Notable API**: `danger` (boolean on MenuItem); `theme` (light|dark on Menu); `mode` (horizontal|vertical|inline); `items` array API; `expandIcon`; `getPopupContainer`
**A11y**: role="menu" + role="menuitem"; keyboard navigation via arrow keys; no built-in keyboard shortcut display; dark theme provides sufficient contrast (tested); `danger` items have no additional SR announcement.
**Best at**: Navigation menu modes (horizontal/vertical/inline) and first-class dark theme. **Missing**: No keyboard shortcut display; no mobile tray; inline mode depth limit not documented.
