---
system: Mantine
component: Popover
url: https://mantine.dev/core/popover/
last_verified: 2026-03-29
confidence: high
---

# Popover

## Approach
Mantine's Popover is a floating container anchored to a trigger element, built on the `@floating-ui/react` positioning library. It uses a compound component pattern: `Popover` (root), `Popover.Target` (wraps the trigger), and `Popover.Dropdown` (the floating content panel). The component handles positioning, flip/shift collision detection, offset, and visibility state. It is the foundation for many higher-level Mantine components: HoverCard, Menu, Tooltip, ColorPicker, and DatePicker all use Popover or its positioning engine internally. The component is intentionally generic — it places no constraints on what goes inside the dropdown, enabling popover content from simple text to full form panels.

## Key Decisions
1. **Compound component architecture** (HIGH) — `Popover.Target` and `Popover.Dropdown` are separate children, not props. This means the trigger can be any element (button, icon, text) and the content can be any JSX. Compared to systems that accept a `content` render prop, the compound pattern is more composable and avoids prop drilling.
2. **@floating-ui positioning engine** (HIGH) — Mantine migrated from Popper.js to @floating-ui in v6. This provides more precise positioning, better collision detection, and significantly smaller bundle size. The `position` prop (top/bottom/left/right + alignment) and `offset`, `withArrow`, and `arrowSize` control the floating layout.
3. **Controlled and uncontrolled** (MEDIUM) — `opened` + `onChange` for controlled mode; no props for uncontrolled mode (built-in open/close toggle). Controlled mode is necessary for popovers that close programmatically (after form submission, after confirmation).
4. **`withinPortal`** (MEDIUM) — By default, the dropdown renders in a portal at document.body to avoid overflow:hidden clipping. This is `true` by default, which is correct for most use cases but may need to be set to `false` for specific contexts (modals with their own stacking context).

## Notable Props
- `opened` / `onChange`: controlled open state
- `position`: `"top"` | `"bottom"` | `"left"` | `"right"` + `-start`/`-end` variants
- `offset`: distance from trigger (default 8)
- `withArrow`: show pointing arrow
- `trapFocus`: trap keyboard focus inside dropdown (for interactive content)
- `closeOnClickOutside`: close when clicking outside (default true)
- `closeOnEscape`: close on Escape key (default true)
- `withinPortal`: render in document.body portal (default true)
- `shadow`, `radius`, `width`: visual styling

## A11y Highlights
- **Keyboard**: Trigger button opens/closes; Tab navigates within dropdown when `trapFocus` enabled; Escape closes
- **Screen reader**: Dropdown content announced when opened; `aria-expanded` on trigger (when using button trigger)
- **ARIA**: `aria-haspopup` and `aria-expanded` on trigger; Popover.Dropdown gets `role="dialog"` when `trapFocus` is true; otherwise `role` must be set by consumer based on content type

## Strengths & Gaps
- **Best at**: Foundation for all Mantine floating UI; @floating-ui precision positioning; flexible compound architecture; used and battle-tested across many Mantine components
- **Missing**: No built-in header/footer structure for popover panels (consumers compose); `role` is not automatically set to "dialog" unless `trapFocus` is true — consumer must set appropriate role for the content type
