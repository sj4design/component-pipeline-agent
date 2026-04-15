---
system: Atlassian Design System
component: DropdownMenu (+ DropdownItem, DropdownItemGroup, DropdownItemCheckbox, DropdownItemRadio)
url: https://atlassian.design/components/dropdown-menu
last_verified: 2026-03-28
---

# DropdownMenu

## Approach

Atlassian's DropdownMenu is a stateful, composable component designed to handle one of the most common interaction patterns across Jira, Confluence, Trello, and Bitbucket: surfacing a set of contextual actions or options behind a trigger. Atlassian's product suite is rich in dense interfaces — issue trackers, project boards, code review tools — where almost every card, row, or item has a set of associated actions that cannot all fit on screen. DropdownMenu is the answer to that problem, and it is designed with the assumption that it will appear hundreds of times per page across Atlassian's products.

The component family is intentionally granular: **DropdownMenu** manages the trigger and overlay; **DropdownItem** represents a single action; **DropdownItemGroup** groups related items with an optional title; **DropdownItemCheckbox** is a toggleable item that persists a boolean state; **DropdownItemRadio** is a mutually exclusive selection item within a group. This family structure reflects Atlassian's approach of building each variant as a distinct, named component rather than encoding behavior in props — a team member reading JSX immediately knows whether an item is an action, a toggle, or a radio selection without examining prop values.

A companion **Menu** component exists separately from DropdownMenu and handles inline menu rendering (navigation menus in sidebars, page-level menus that are always visible). This is Atlassian's equivalent of the MD3 distinction between ephemeral and persistent menus: DropdownMenu is for on-demand overlays, Menu is for persistent navigation surfaces.

## Key Decisions

1. **DropdownMenu (overlay actions) vs. Menu (persistent navigation) — two components** (HIGH) — Atlassian separates the transient overlay menu (DropdownMenu) from the persistent navigation menu (Menu) into distinct components. The WHY is that they serve fundamentally different user needs: DropdownMenu surfaces contextual commands that appear and vanish, while Menu provides persistent wayfinding that must always be visible. Merging them into one component with a `persistent` prop would force both to share state management, positioning logic, and ARIA semantics that are genuinely different between the two contexts.

2. **Distinct item types as separate components** (HIGH) — Rather than a single DropdownItem with a `type="checkbox"` prop, Atlassian provides DropdownItemCheckbox and DropdownItemRadio as separate components. The WHY is composability and discoverability: when a developer writes `<DropdownItemCheckbox>`, the intent is immediately self-documenting without prop inspection. It also means each item type can evolve its API independently — adding a `defaultChecked` prop to DropdownItemCheckbox doesn't pollute the DropdownItem API with boolean state that standard action items never need.

3. **Submenus supported but explicitly discouraged** (MEDIUM) — The Atlassian design system supports nested menu structures, but the guidance strongly recommends avoiding them where possible. The WHY is usability: submenus require directional arrow navigation to reveal and dismiss, which is a learned interaction that many users don't know. On mobile and touch devices, hover-triggered submenus don't work at all. Atlassian's recommendation is to flatten the hierarchy using sections with descriptive titles instead of nesting. When submenus are unavoidable (deep hierarchies in Jira's project settings, for example), the system supports them, but as a known usability cost.

4. **DropdownItemGroup for sectioning** (MEDIUM) — Related items are grouped using DropdownItemGroup, which renders a section with an optional title and a visual separator. The WHY is scanability in dense Atlassian interfaces: a Jira issue's action menu might include edit, comment, assign, transition, and delete actions. Grouping these by category (content actions, workflow actions, destructive actions) lets users scan by section rather than reading every item. The optional title makes the categorization explicit for both sighted users and screen readers.

5. **No built-in danger/destructive item styling in DropdownMenu** (MEDIUM) — The ADS DropdownMenu documentation does not include a first-class destructive item variant with red styling (unlike Carbon's danger hover state or Polaris's `destructive` prop). Atlassian's approach to risky actions is to use confirmation dialogs (via Modal) for truly destructive operations rather than relying on item-level color cues. The WHY reflects a product philosophy: a red menu item creates visual friction but does not prevent the action; a confirmation dialog creates a hard checkpoint. For actions like deleting a Jira project or archiving a Confluence space, Atlassian judges that friction alone is insufficient.

6. **`aria-haspopup` and `aria-controls` on trigger** (HIGH) — The trigger element is associated to the dropdown menu via `aria-controls` pointing to the menu's id, and `aria-haspopup` signals the presence of a popup. The AUI documentation from Atlassian's older system used CSS class `.aui-dropdown2-trigger` and `aria-controls` for this association — the design system has maintained this semantic pattern through to the modern React component system. The WHY is keyboard and screen reader navigation: without `aria-controls`, assistive technology cannot programmatically associate a button with the menu it opens.

7. **Stateful vs. stateless variants** (MEDIUM) — DropdownMenu is stateful by default (manages its own open/close state). A `DropdownMenuStateless` variant gives teams full control via props for contexts where external state management is required (e.g., driven by a URL parameter, synchronized across multiple menus, or controlled by a global keyboard shortcut). The WHY is flexibility without forcing all consumers into controlled patterns — most use cases want uncontrolled behavior, and the opt-in stateless variant handles the rare controlled case.

## Notable Props

- `trigger`: Accepts a render prop for custom trigger elements — any button, icon button, or link can serve as the menu trigger.
- `isOpen` / `defaultOpen`: Stateless/stateful open control.
- `placement`: Controls overlay positioning relative to trigger (bottom-left, bottom-right, etc.) — important for menus near screen edges.
- `shouldRenderToParent`: Controls whether the overlay renders in a portal or in the DOM tree — relevant for z-index and stacking context issues in complex layouts.
- `isSelected` on DropdownItemCheckbox/DropdownItemRadio: The selection state — distinct from DropdownItem, which has no selection state.

## A11y Highlights

- **Keyboard**: Arrow keys navigate between items; Enter/Space activate the focused item. Escape closes the menu and returns focus to the trigger. When submenus are present, Right/Left arrows navigate into and out of them. First-letter typeahead is supported for quickly jumping to items starting with a typed character.
- **Screen reader**: Each DropdownItemGroup is announced as a group with its title (if provided). DropdownItemCheckbox announces checked/unchecked state. DropdownItemRadio announces selected state. The trigger button announces its expanded state via `aria-expanded`.
- **ARIA**: `role="menu"` on the menu container; `role="menuitem"` on DropdownItem; `role="menuitemcheckbox"` on DropdownItemCheckbox; `role="menuitemradio"` on DropdownItemRadio. The trigger carries `aria-haspopup="true"` and `aria-expanded`. Groups use `role="group"` with `aria-label` from the group title. Atlassian ships components with these ARIA attributes pre-wired, removing the burden from product teams.

## Strengths & Gaps

- **Best at**: The granular item-type component family (DropdownItem, DropdownItemCheckbox, DropdownItemRadio) is the most self-documenting and correctly ARIA-attributed menu system among Tier 1 systems — the correct ARIA roles are enforced structurally, not through props.
- **Missing**: No first-class destructive item styling (reliance on confirmation modals instead), and no built-in keyboard shortcut display within items — both of which Carbon handles explicitly for enterprise power-user contexts.
