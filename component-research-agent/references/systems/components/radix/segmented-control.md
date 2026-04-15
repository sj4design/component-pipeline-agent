---
system: Radix UI
component: SegmentedControl
url: https://www.radix-ui.com/themes/docs/components/segmented-control
last_verified: 2026-03-29
confidence: high
---

# Segmented Control

## Approach
Radix Themes (not Primitives) ships a `SegmentedControl` component that functions as a styled single-selection control resembling a tab bar or radio group. Like the ColorPicker, this is a Themes-exclusive component because the underlying interaction model is already covered by existing Radix Primitives — specifically `RadioGroup` and `Tabs` — and the SegmentedControl is effectively a visual variant of those patterns with a distinct sliding indicator animation. Radix Primitives does not expose a SegmentedControl because the ARIA pattern (`role="radiogroup"` with `role="radio"` items, or `role="tablist"` with `role="tab"` items) is already fully covered. The Themes component opts for the radio group semantic model, making it appropriate for mode-switching selections rather than content-panel navigation.

## Key Decisions
1. **Themes-only, built on radio semantics** (HIGH) — The SegmentedControl maps to `role="radiogroup"` / `role="radio"` rather than tabs because it controls a value selection (like a setting or filter), not a content panel switch; this semantic choice prevents misuse as a Tabs replacement.
2. **Sliding indicator via CSS animation** (HIGH) — The animated sliding background indicator is implemented using CSS transforms and Radix Themes CSS variables, keeping the animation GPU-accelerated and respecting `prefers-reduced-motion` media query.
3. **Size and radius tokens** (MEDIUM) — The component exposes Radix Themes' standard `size` and `radius` props, ensuring it integrates coherently with other Themes components without custom overrides.

## Notable Props
- `value`: controlled selected value string
- `defaultValue`: uncontrolled default selected value
- `onValueChange`: callback when selection changes
- `size`: `"1"` | `"2"` | `"3"` — maps to Themes size scale
- `radius`: `"none"` | `"small"` | `"medium"` | `"large"` | `"full"`
- `SegmentedControl.Item` child: `value` prop identifying each segment

## A11y Highlights
- **Keyboard**: Arrow Left/Right to move between segments; Space/Enter to select focused segment; Tab moves focus into and out of the control as a group.
- **Screen reader**: The group is announced as a radio group with the current selection state; each item is announced as a radio button with checked/unchecked state.
- **ARIA**: `role="radiogroup"` on the root; `role="radio"` with `aria-checked` on each item; `aria-label` or `aria-labelledby` should be provided on the root to name the control.

## Strengths & Gaps
- **Best at**: Delivering a polished, animated segmented control that integrates with Radix Themes tokens and has correct radio group accessibility out of the box.
- **Missing**: No Primitive version means headless teams must build from `RadioGroup` with custom CSS; no multi-select variant; no icon-only segment support with proper labeling utilities.
