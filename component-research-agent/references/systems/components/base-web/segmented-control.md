---
system: Base Web (Uber)
component: Not available natively (ButtonGroup pattern)
url: https://baseweb.design/components/button-group/
last_verified: 2026-03-29
confidence: high
---

# Segmented Control (Absent — ButtonGroup Pattern)

## Approach
Base Web does not include a dedicated SegmentedControl component. The ButtonGroup component is the recommended building block for this pattern, providing a row of mutually exclusive toggle buttons that visually merge into a single control. The ButtonGroup supports `mode="radio"` for single-selection semantics, which maps directly to the segmented control interaction model. This compositional approach reflects Base Web's philosophy of building complex patterns from primitive components rather than prescribing purpose-built composites. The ButtonGroup covers the functional requirement, and teams needing the exact visual treatment of a segmented control (capsule shape, tight grouping, selected state fill) apply those styles through the override system.

## Key Decisions
1. **ButtonGroup with radio mode** (HIGH) — Setting `mode="radio"` on ButtonGroup provides the single-selection behavior with proper keyboard navigation (arrow keys between buttons) and ARIA radio group semantics. This is the intentional substitute, not an approximation — the component was designed with this use case in mind.
2. **Override system for visual customization** (HIGH) — The capsule/pill shape common in segmented controls requires overriding border-radius and removing individual button border-radius to merge them visually. This is done via ButtonGroup's Root override and Button's BaseButton override — verbose but fully controllable without forking the component.
3. **No icon-only segmented control guidance** (LOW) — ButtonGroup supports icon-only buttons, but there's no specific documented pattern for icon-only segmented controls (common in toolbars). Teams implementing this must ensure appropriate aria-label attributes are applied to each button.

## Notable Props
- `mode`: `"radio" | "checkbox"` — radio for single-select, checkbox for multi-select
- `selected`: controlled selected index/indices
- `onClick`: click handler with button index
- `disabled`: disables all buttons
- `overrides`: ButtonGroup and Button override system for visual customization

## A11y Highlights
- **Keyboard**: In radio mode, arrow keys navigate between buttons; Tab enters/exits the group; selected state indicated by button state
- **Screen reader**: In radio mode, rendered as `role="group"` with individual buttons having `aria-pressed`; group label via `aria-label` on the container
- **ARIA**: `role="group"` on ButtonGroup; individual buttons use `aria-pressed` for toggle state; `aria-label` recommended on the group when context isn't obvious from surrounding content

## Strengths & Gaps
- **Best at**: Flexible single/multi-select button groups with full visual override capability; correct ARIA semantics via radio mode
- **Missing**: No purpose-built SegmentedControl component with the visual defaults (capsule container, fill transition animation, equal-width segments) that teams expect — requires manual override setup
