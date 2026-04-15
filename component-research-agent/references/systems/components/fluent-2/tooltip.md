---
system: Fluent 2 (Microsoft)
component: Tooltip
url: https://fluent2.microsoft.design/components/web/react/tooltip/usage
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
Fluent 2's Tooltip is designed for the dense Office toolbar environment where most interactive elements are icon-only buttons that require tooltips to be comprehensible. The component handles hover, focus, and pointer entry/leave with the precise timing needed for toolbar scanning — quick show for already-hovering users, delay for first-time hover. Fluent's Tooltip also serves as the mechanism for explaining disabled buttons (via the `relationship` prop), which is critical for accessibility in complex Office UIs.

## Key Decisions
1. **relationship prop** (HIGH) — `relationship: "description"` vs `"label"` changes the ARIA semantics. Description adds `aria-describedby` (supplementary info); label adds `aria-label` (replaces accessible name). For icon-only buttons, `relationship="label"` makes the tooltip the button's accessible name, which is the correct pattern.
2. **withArrow** (MEDIUM) — Boolean for directional arrow. Arrows are important in dense toolbars to disambiguate which button the tooltip belongs to.
3. **Fluent motion integration** (MEDIUM) — Tooltip animations follow Fluent's motion system (entrance/exit timing curves) for cross-product consistency.

## Notable Props
- `content`: tooltip text
- `relationship`: `"description" | "label"`
- `withArrow`: boolean
- `positioning`: placement and collision detection options
- `showDelay` / `hideDelay`: timing control

## A11y Highlights
- **Keyboard**: Opens on focus; Escape closes; does not trap focus
- **Screen reader**: relationship="label" sets aria-label; relationship="description" sets aria-describedby
- **ARIA**: Correct relationship semantics are critical for icon button accessibility; Fluent documents this explicitly

## Strengths & Gaps
- **Best at**: relationship prop for correct aria semantics on icon buttons; disabled button tooltip support; Office toolbar patterns
- **Missing**: No rich tooltip with interactive content (use Popover)
