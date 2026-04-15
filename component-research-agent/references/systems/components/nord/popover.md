---
system: Nord Design System (Nordhealth)
component: Dropdown (maps to Popover)
url: https://nordhealth.design/components/dropdown/
last_verified: 2026-03-29
confidence: high
---

# Popover (Nord: Dropdown)

## Approach
Nord implements popover-adjacent functionality through its `<nord-dropdown>` Web Component, which provides a positioned floating panel triggered by a button or custom trigger element. In clinical software, this pattern appears in contextual action menus on patient records ("More actions" menus), filter panels on clinical data tables, and brief contextual information displays that do not warrant a full modal dialog. Nord's Dropdown handles the core technical challenges of a popover: positioning relative to the trigger, boundary collision detection to keep the panel within the viewport (critical on clinical workstations with multiple monitor setups), and focus management between trigger and panel content. For richer interactive popovers requiring forms, complex content, or explicit user decisions — such as a confirmation popup for a clinical action — Nord directs teams to use `<nord-modal>` instead, keeping the Dropdown focused on menus and lightweight contextual content.

## Key Decisions
1. **Named "Dropdown" not "Popover"** (HIGH) — The Dropdown name reflects the primary clinical use case (contextual action menus, selection panels triggered from buttons in patient record toolbars), distinguishing it from the full popover pattern used for rich interactive content. The naming prevents teams from using Dropdown for complex overlay interactions that require modal-level focus management.
2. **Trigger + panel composability via slots** (HIGH) — Clinical toolbars and record action menus have diverse trigger elements (icon buttons, text buttons, table row action buttons). The slotted trigger model allows any Nord button component to activate the dropdown, keeping trigger styling consistent with the rest of the clinical interface.
3. **Automatic positioning with viewport collision detection** (HIGH) — Clinical workstations often run EHR software in split-screen configurations or on constrained-size windows. The Dropdown automatically adjusts panel placement (above/below, left-aligned/right-aligned) to remain fully visible, preventing clinical action menus from clipping off screen.
4. **Escape and outside-click dismissal** (MEDIUM) — Clinical users navigate rapidly under time pressure. The Dropdown responds to Escape key and outside-click to dismiss, matching the expected behavior for temporary overlay panels and allowing clinicians to quickly abandon a dropdown without precise click targeting on a close button.

## Notable Props
- `trigger` slot: The element that activates the dropdown (typically a `<nord-button>`); the component handles aria-expanded and aria-haspopup on the trigger automatically
- Default slot: Content of the dropdown panel — can contain `<nord-dropdown-item>` elements for menus, or arbitrary HTML for custom panel content
- `<nord-dropdown-item>`: Individual menu item within the dropdown; supports icons, descriptive text, and disabled state for inactive clinical actions
- `expand`: Boolean; controls programmatic open/close state of the dropdown panel

## A11y Highlights
- **Keyboard**: Trigger button is keyboard-focusable; Enter/Space opens the dropdown; Arrow keys navigate between `<nord-dropdown-item>` elements; Escape closes the panel and returns focus to the trigger; Tab closes the dropdown (focus moves to next element in document)
- **Screen reader**: Trigger element receives `aria-haspopup="true"` and `aria-expanded` reflecting the open state; dropdown panel has appropriate role; screen readers announce "has popup" when the trigger is focused, alerting clinical assistive technology users to the available action menu
- **ARIA**: `aria-haspopup="menu"` or `aria-haspopup="listbox"` on trigger depending on content type; `aria-expanded="true"/"false"` reflects panel state; `aria-controls` links trigger to panel; `role="menu"` and `role="menuitem"` on menu-type dropdowns

## Strengths & Gaps
- **Best at**: Contextual action menus on clinical record rows and toolbars; lightweight panel content like filter options and quick-access clinical tools; strong keyboard navigation and screen reader support; automatic viewport positioning for varied clinical workstation setups
- **Missing**: No rich popover variant with form content (teams must use Modal for that); no tooltip-style informational popover (teams use `<nord-tooltip>` for that instead); no support for nested dropdown menus (a pattern sometimes needed in complex clinical action hierarchies); limited animation/transition control for teams wanting custom show/hide behaviors
