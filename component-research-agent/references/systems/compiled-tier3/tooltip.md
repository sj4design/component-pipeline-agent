---
component: Tooltip
tier: 3
last_verified: 2026-03-29
---

# Tooltip — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Tooltip | `Tooltip.Provider` for shared `delayDuration`/`skipDelayDuration` across all tooltips; `disableHoverableContent` for strict non-interactive mode; collision detection; headless — no visual style. | high |
| Chakra UI | Tooltip | `shouldWrapChildren` wraps disabled elements for hover support; `hasArrow` boolean; `openDelay`/`closeDelay`; token-integrated surface; `label` accepts ReactNode. | high |
| GOV.UK | Not available — hint text used | No tooltip component; hover-only info excludes touch/keyboard users; hint text (always visible secondary text) is the research-backed replacement for form and content guidance. | high |
| Base Web | Tooltip | Clear Tooltip vs Popover separation (Tooltip = non-interactive, Popover = interactive); `showArrow`; Overrides for content customization; adapts to light/dark theme tokens. | medium |
| Fluent 2 | Tooltip | `relationship` prop ("description" vs "label") controls ARIA semantics; `relationship="label"` is required for icon-only buttons; `withArrow`; Office toolbar patterns. | high |
| Gestalt | Tooltip | Forced dark background; `link` prop for "Learn more" actionable tooltip; `accessibilityLabel` for custom screen reader text; used on Pinterest's icon-dense pin interfaces. | medium |
| Mantine | Tooltip | `Tooltip.Floating` follows cursor (for data visualizations); `Tooltip.Group` for shared delay in dense UIs; `multiline` + `width` for longer content; `openDelay`/`closeDelay`. | high |
| Orbit | Tooltip | `enabled` prop for conditional tooltips (explain disabled states); `preferredAlign` for mobile viewport placement; travel-specific fare condition and feature explanations. | medium |
| Evergreen | Tooltip | `appearance="card"` (white background, bordered) for rich tooltip content vs default dark; built on Popover infrastructure; clean minimal API. | medium |
| Nord | Tooltip (nord-tooltip) | Web component; focus-triggered required for clinical keyboard navigation; used for clinical terminology explanations and abbreviated data cell expansion; shadow DOM ARIA. | low |

## Key Decision Patterns

Fluent 2's `relationship` prop is the most important ARIA distinction in the T3 tooltip set, and the one most frequently implemented incorrectly. The distinction is: `relationship="description"` adds `aria-describedby` on the trigger, which supplements the trigger's existing accessible name with additional context. `relationship="label"` adds `aria-label` on the trigger, which replaces the accessible name entirely. For icon-only buttons — a "Delete" button with only a trash can icon — the tooltip is the only source of the accessible name. Using `aria-describedby` with a tooltip on an icon-only button produces a button with no accessible name and only a supplementary description, which screen readers announce as "button [description text]" without naming the action. `aria-label` produces "Delete, button" — the correct pattern. Most T3 systems (Radix, Chakra, Mantine) use `aria-describedby` for all tooltips, making them inappropriate as the sole accessible name for icon buttons. Fluent 2's explicit `relationship` prop is the only T3 system that surfaces this distinction.

Radix's `Tooltip.Provider` with `skipDelayDuration` implements the "tooltip warmup" behavior that most systems omit. When a user hovers one tooltip and immediately moves to another, the second tooltip should appear without delay — their intent to scan tooltips is clear. The `skipDelayDuration` prop (default 300ms) is the window after a tooltip closes during which the next tooltip opens immediately. Without this, every rapid scan requires waiting through the full `delayDuration` delay again, which is the behavior that makes tooltips frustrating for power users who scan toolbar buttons quickly. Radix mirrors the behavior of native OS tooltips (macOS menu bar, Windows taskbar) that implement the same mechanic. Mantine's `Tooltip.Group` provides the same behavior scoped to a specific group of elements rather than application-wide.

Mantine's `Tooltip.Floating` is unique in the T3 set and solves a specific data visualization problem. Standard tooltips anchor to their trigger element — the tooltip appears above, below, or beside the button or icon it belongs to. In data visualizations (charts, maps, heatmaps), the "trigger" is a point on a canvas or SVG with no fixed DOM element to anchor to. `Tooltip.Floating` follows the cursor position directly, appearing where the user's pointer is on the canvas rather than at a fixed anchor point. This is the standard behavior for chart tooltip libraries (D3, Recharts, Victory) and Mantine provides it as a first-class component variant, making it easy to implement consistent tooltip styling across UI components and data visualizations in the same application.

GOV.UK's absence carries the most user-research backing of any T3 tooltip absence. The argument is not that tooltips are wrong for all use cases, but that hover-only interactions are inaccessible to three significant populations: touch device users (no hover event), keyboard users who rely on focus navigation (tooltip may appear on keyboard focus but the delay and behavior is inconsistent across browsers), and users with cognitive or attention disabilities who may not think to hover over elements to find hidden help. GOV.UK's research with UK government service users found that hint text — always-visible secondary text below form labels — reduced form errors compared to tooltip-hidden help text, because users could read the guidance before attempting to enter a value rather than after encountering an error.

## A11y Consensus

- Tooltips must use `role="tooltip"` on the tooltip content element and `aria-describedby` on the trigger element pointing to the tooltip's ID — this is the WAI-ARIA tooltip pattern that causes screen readers to announce the tooltip content as supplementary information after the trigger's accessible name.
- For icon-only interactive elements (buttons, links without visible text), the tooltip should provide `aria-label` on the element (not `aria-describedby`) — the tooltip is the accessible name, not a description. Fluent 2's `relationship="label"` prop is the reference implementation.
- Tooltips must open on keyboard focus, not only on hover — hover-only tooltips exclude keyboard users who do not also use a mouse. All T3 systems with a tooltip component implement focus-triggering.
- Escape must close an open tooltip and return focus to the trigger without moving focus elsewhere — this is the keyboard interaction specified in WAI-ARIA for non-modal hover widgets.
- Tooltips must not contain interactive elements (links, buttons) — interactive content in a tooltip is inaccessible because tooltips do not trap focus and users cannot move focus into the tooltip. If interactive content is needed, use a Popover with appropriate keyboard management.

## Recommended Use

Reference T3 tooltip approaches when deciding on ARIA relationship semantics, shared delay behavior, floating/cursor-following variants, and the hover-vs-visible-text accessibility question. Fluent 2 is the reference for the `relationship` prop ("label" vs "description") for correct ARIA on icon-only buttons; Radix is the reference for `skipDelayDuration` and `Tooltip.Provider` for application-wide hover warmup behavior; Mantine is the reference for `Tooltip.Floating` for data visualization cursor-following tooltips and `Tooltip.Group` for dense toolbar delay sharing; GOV.UK is the reference for the research-backed argument that visible hint text is always preferable to hover-hidden tooltip content.
