---
component: popover
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No dedicated Popover — Dialog / Menu / Bottom Sheet workarounds
**Approach:** M3 has no Popover component. The pattern forces a choice: use Dialog (full modal focus trap, accessible, high-friction), Menu (list of actions, constrained content), or Bottom Sheet (mobile-native, slides up from bottom). This absence clarifies architectural decisions: if content is interactive, it must be a Dialog or Menu with proper focus semantics.
**Key Decisions:**
- [HIGH] Absent by design: M3's mobile-first stance means floating anchored content is secondary to bottom-sheet and modal patterns
- [MED] Bottom Sheet as popover alternative on mobile: for contextual information and action panels, Bottom Sheet is the idiomatic M3 solution
- [MED] Architectural clarity through absence: teams cannot accidentally use a popover where a modal is semantically required
**Notable API:** `ModalBottomSheet` and `Dialog` as alternatives; Menu for action lists
**A11y:** Dialog and Bottom Sheet have full `role="dialog"` and `aria-modal` semantics. Menu uses `role="menu"`. No popover-specific ARIA.
**Best at:** Forcing architectural clarity — without a popover, teams must consciously choose between the right modal/menu/sheet pattern.
**Missing:** Anchored floating content for contextual help, preview cards, and non-modal interactive overlays.

---

## spectrum
**Component:** Popover (used via Dialog + DialogTrigger or ContextualHelp)
**Approach:** Spectrum's Popover is the container for floating content anchored to a trigger. It includes an optional visual tip (arrow), inherits Dialog's focus trap by default, and supports 20 placement positions. `ContextualHelp` is a pre-built Popover for "?" help triggers. Origin-aware open/close animations respond to placement direction.
**Key Decisions:**
- [HIGH] Focus trap inherited from Dialog: all Spectrum popovers are accessible modal overlays by default — no "non-modal popover" escape hatch, enforcing accessibility
- [HIGH] 20 placements: top/bottom/left/right × start/center/end + auto variants — handles complex layouts where the default placement would overflow the viewport
- [MED] `shouldFlip` prop: automatically moves to opposite side when preferred placement would overflow — reduces manual placement management
**Notable API:** `placement` (20 options); `shouldFlip: boolean`; `offset` for distance from trigger; `ContextualHelp` as a ready-made help popover
**A11y:** `role="dialog"` with `aria-labelledby` if a heading is present; focus moves into the popover on open; Escape closes and returns focus to trigger. Origin-aware animation direction for cognitive continuity.
**Best at:** `ContextualHelp` as a pre-built accessible help popover — zero-configuration solution for form field help text and inline documentation.
**Missing:** Non-modal (tooltip-style) popover for read-only content that should not trap focus; no hover trigger support.

---

## carbon
**Component:** Popover (low-level) / Toggletip (named pattern)
**Approach:** Carbon distinguishes Popover (a low-level anchored container with no built-in trigger behavior) from Toggletip (a click-triggered accessible tooltip-like overlay). Popover is used as a primitive for building custom overlays; Toggletip is the ready-to-use component. The 4-column width cap prevents popovers from becoming mini-modals.
**Key Decisions:**
- [HIGH] Popover vs. Toggletip distinction: Toggletip handles hover vs. click distinction explicitly — hover shows a tooltip, click shows a Toggletip (with interactive content)
- [MED] `highContrast` prop: renders popover with Carbon's high-contrast color scheme — used on dark surfaces or for important callouts that need visual emphasis
- [MED] 4-column max width guideline: prevents excessive content density in floating panels; forces teams to put long content in modals instead
**Notable API:** `align` (start/center/end on each side); `highContrast: boolean`; `autoAlign: boolean` for viewport-overflow prevention
**A11y:** Toggletip uses `role="tooltip"` with `aria-labelledby` when content is read-only and `role="dialog"` when interactive content is present — correct semantic distinction.
**Best at:** Semantic differentiation between hover tooltips and click-triggered interactive overlays via the Popover/Toggletip split.
**Missing:** Rich interactive popover with built-in trigger management; carbon's Popover is a primitive requiring manual wiring of trigger and accessibility.

---

## polaris
**Component:** Popover (universal overlay container)
**Approach:** Polaris's Popover is the system's universal overlay container — used for dropdowns, action menus, color pickers, date pickers, and custom floating content. The `autofocusTarget` prop controls where focus moves on open. `preferredPosition` with `'mostSpace'` auto-selects the side with the most room. `preventCloseOnChildOverlayClick` supports nested overlays.
**Key Decisions:**
- [HIGH] Universal overlay container: one component handles all floating anchored content — reduces API surface compared to having separate Dropdown, Menu, and Popover components
- [MED] `autofocusTarget: "container" | "first-node" | "none"`: explicit focus management control — "none" for non-modal informational popovers that should not trap focus
- [MED] `preventCloseOnChildOverlayClick`: needed for nested overlay patterns like a color picker inside a form popover — prevents the parent from closing when the child receives interaction
**Notable API:** `preferredPosition: "below" | "above" | "mostSpace"`; `autofocusTarget`; `sectioned: boolean` for automatic padding inside popover; `fluidContent: boolean` for full-width
**A11y:** When `autofocusTarget` is set, Polaris handles focus movement. Escape closes and returns focus to the activator. Non-modal mode (autofocusTarget="none") does not trap focus, enabling tooltip-like popovers.
**Best at:** Flexibility as a universal overlay container — one component for dropdowns, menus, pickers, and custom content with consistent placement and focus management.
**Missing:** Built-in popover types (info, warning, help) — Polaris Popover is style-neutral; semantic variants require consumer styling.

---

## atlassian
**Component:** Popup (replaced deprecated InlineDialog)
**Approach:** Atlassian's Popup uses portal-based rendering (renders outside the DOM tree at the document body) to avoid z-index and overflow clipping issues in Jira's deeply nested layouts. Placement uses Popper.js. An optional blanket (semi-transparent overlay) can make the popup modal-like. Popup is controlled-only — `isOpen` and `onClose` are required.
**Key Decisions:**
- [HIGH] Portal rendering: Jira and Confluence have deeply nested stacking contexts that cause z-index issues for in-place overlays; portal rendering sidesteps this entirely
- [HIGH] Controlled-only design: `isOpen` is required — no internal toggle state; forces explicit state management consistent with Atlassian's controlled component philosophy
- [MED] Z-index tier system: Atlassian's token system defines z-index tiers for tooltips, modals, popovers, and flags; Popup uses the popover tier to prevent layering conflicts across Jira panels
**Notable API:** `placement` (Popper.js placement strings); `shouldRenderToParent: boolean` (opt out of portal rendering when needed); `trigger` render prop for the activating element; optional `blanket` overlay
**A11y:** Consumer manages `aria-expanded` on the trigger and provides `aria-label` or `aria-labelledby` on the popup container. Popup sets `role="dialog"` when `shouldFitContainer` is used. Escape handling is built-in.
**Best at:** Portal rendering with z-index tier management — solves Jira's complex stacking context issues that defeat in-place overlay implementations.
**Missing:** Non-controlled mode; built-in trigger management; pre-built semantic popover types (help, error, info).

---

## ant-design
**Component:** Popover (inherits from Tooltip → Popover → Popconfirm hierarchy)
**Approach:** Ant Design builds a three-level overlay hierarchy: Tooltip (text-only) → Popover (title + content slots) → Popconfirm (confirmation dialog). Each inherits placement, trigger, and animation from the base. The default trigger is `hover`, which is the most common case in Chinese enterprise UIs but requires work for keyboard accessibility. `getContainer` controls portal target; `ConfigProvider` sets global default trigger.
**Key Decisions:**
- [HIGH] Three-level inheritance: Tooltip/Popover/Popconfirm share placement/trigger/animation API — learning one means knowing all three
- [HIGH] `hover` default trigger: enterprise admin users interact primarily with mouse; hover popovers show contextual info without click — but `hover`-only triggers are inaccessible to keyboard users
- [MED] `title` + `content` slots: Popover has separate title (bold heading) and content (body) areas — structured for enterprise info cards and action panels
**Notable API:** `trigger: "hover" | "focus" | "click" | "contextMenu"` (array supported); `getContainer` for portal target; `placement` (12 options); `open` / `onOpenChange` for controlled mode
**A11y:** Hover-only trigger is an accessibility gap — keyboard users cannot access hover popovers. Teams must add `trigger={["hover", "focus"]}` or use `trigger="click"` for interactive content. `role="tooltip"` is applied for hover-only; interactive content requires `role="dialog"`.
**Best at:** Popconfirm for inline confirmation dialogs — the three-component inheritance means Popconfirm shares all placement and animation behavior with Popover, making destructive-action confirmation consistent and easy to implement.
**Missing:** Keyboard-accessible default trigger — hover-only is inaccessible; teams must remember to add focus trigger manually.
