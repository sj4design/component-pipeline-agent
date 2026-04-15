---
component: Popover
tier: 3
last_verified: 2026-03-29
---

# Popover — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Popover | `modal` prop (true = focus trap, false = non-blocking); Popover.Arrow component; separate Overlay and Content for independent animation; fills the gap between non-interactive Tooltip and blocking Dialog. | high |
| Chakra UI | Popover | Built-in PopoverHeader/Body/Footer/CloseButton/Arrow slots; `initialFocusRef` for first-focus target; `returnFocusOnClose` control; `isLazy` for deferred rendering. | high |
| GOV.UK | Not available — Details component preferred | No popover; Details (`<details>/<summary>`) is the progressive-enhancement alternative for supplemental information that doesn't require absolute positioning. | high |
| Base Web | Popover | `triggerType` (click vs. hover); `StatefulPopover` manages open state internally; full Overrides for all sub-elements. | medium |
| Fluent 2 | Popover | Non-modal by default; `trapFocus` prop converts to modal behavior on demand; `PopoverSurface` provides elevation/border tokens; used as a contextual settings panel. | high |
| Gestalt | Popover | Anchor ref-based positioning (decouples trigger from popover in component tree); required `onDismiss` prevents undismissable popovers; `idealDirection` with auto-fallback. | medium |
| Mantine | Popover | Foundation for all Mantine floating UI (Menu, HoverCard, ColorPicker, DatePicker); `@floating-ui/react` for precise positioning; `withinPortal` default true; `trapFocus` for modal mode; compound Popover.Target + Popover.Dropdown. | high |
| Orbit | Popover | Click-triggered (consistent on touch); rich travel content (baggage rules, fare conditions); `placement` with auto-flip for mobile viewport edge detection. | high |
| Evergreen | Popover | `content` prop accepts render function with `{ close }` callback — allows menu items to close the popover programmatically without external state. | high |
| Nord | Dropdown | Named Dropdown (not Popover); slotted trigger for any Nord button component; arrow key navigation for `<nord-dropdown-item>`; Escape + outside-click dismiss; automatic viewport collision detection for clinical workstations. | high |

## Key Decision Patterns

The most important architectural decision in T3 popovers is the modal/non-modal distinction. Radix's explicit `modal` prop, Fluent 2's non-modal default with opt-in `trapFocus`, and Mantine's `trapFocus` prop all address the same problem: a popover that contains interactive content (a form, a menu) needs different keyboard behavior than one that shows static information. Non-modal popovers (no focus trap) let users continue tabbing through the rest of the page; modal popovers (focus trap) confine keyboard navigation to the popover content. The choice matters for accessibility: a non-modal popover with a form can lose its open state when the user tabs out unexpectedly, while a modal popover blocks access to the rest of the page until dismissed. Radix and Fluent 2 expose this as an explicit decision rather than a default; Mantine requires `trapFocus` to be set manually.

Mantine's Popover as the foundation for all of its floating UI is the clearest example of a T3 design system building upward from a single primitive. Menu, HoverCard, Tooltip, ColorPicker, DatePicker, and Select all use Mantine's Popover or its underlying `@floating-ui/react` positioning engine. This means any positioning fix or feature added to Popover benefits the entire floating UI ecosystem. By contrast, systems that build each floating component independently (Chakra, Gestalt) must maintain separate positioning logic for each, leading to behavioral differences between components that should be consistent.

Evergreen's render-function `content` prop (`content={({ close }) => <MenuItem onClick={close} />}`) is the most practical API innovation for menu-in-popover patterns. The common pattern of opening a Popover, showing a list of actions, and having each action close the popover requires either: (a) passing the `onClose` callback through multiple levels of props, (b) using a context or global state, or (c) giving the content a `close` function directly via the render prop. Evergreen's approach (c) is zero-friction and eliminates all the prop-drilling and state coordination normally needed.

GOV.UK's Details component alternative reflects the most extreme version of progressive enhancement thinking. The `<details>/<summary>` HTML pattern provides collapsible content disclosure with zero JavaScript, zero positioning complexity, and universal screen reader support — at the cost of no absolute positioning (the content appears inline, not floating). For supplemental help text and additional information, GOV.UK argues this is the correct tradeoff: the use case doesn't require floating behavior, and the accessibility guarantees are stronger.

## A11y Consensus

- The trigger element must have `aria-haspopup` (typically "dialog" for interactive popovers, "menu" for action menus) and `aria-expanded` to announce the popover's availability and state to screen readers.
- Interactive popovers (those containing buttons, forms, or links) should use `role="dialog"` on the content panel; static informational popovers use `role="tooltip"` or no role; action list popovers use `role="menu"` — the role must match the interaction model.
- Escape must close the popover and return focus to the trigger element; without focus return, keyboard users lose their position in the page after a popover closes.
- Non-modal popovers (no focus trap) are accessible only if they have a visible close button or the Escape key works reliably — users who Tab out of a non-modal popover may lose the popover context unexpectedly.
- Gestalt's required `onDismiss` prop is the only T3 system that programmatically prevents undismissable popovers — all other systems allow forgetting close handling, which is a common implementation error.

## Recommended Use

Reference T3 popover approaches when deciding on modal vs. non-modal behavior, positioning library choice, and self-closing content patterns. Radix is the reference for explicit modal/non-modal `modal` prop and independent overlay/content animation; Mantine is the reference for using Popover as the positioning foundation across all floating UI components; Evergreen is the reference for the render-function `{ close }` pattern for self-closing popover content; Fluent 2 is the reference for non-modal-by-default with `trapFocus` escalation; GOV.UK's Details is the reference for non-floating progressive-enhancement disclosure.
