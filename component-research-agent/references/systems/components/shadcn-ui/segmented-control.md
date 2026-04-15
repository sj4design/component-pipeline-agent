---
system: shadcn/ui
component: ToggleGroup (Segmented Control)
url: https://ui.shadcn.com/docs/components/toggle-group
last_verified: 2026-03-28
confidence: high
---

# ToggleGroup (Segmented Control)

## Approach
shadcn/ui's ToggleGroup (built on Radix UI's ToggleGroup) serves as the segmented control pattern. It supports both single and multiple selection modes. The compound component pattern (ToggleGroup, ToggleGroupItem) gives full structural control. Used for view mode toggles, filter selections, and formatting controls (bold/italic/underline in text editors).

## Key Decisions
1. **Radix ToggleGroup primitive** (HIGH) — Radix's ToggleGroup implements the ARIA toolbar/group pattern with roving tabindex, keyboard navigation, and single/multiple selection modes.
2. **type="single" | "multiple"** (HIGH) — Single mode for exclusive selection (view mode), multiple for non-exclusive toggles (text formatting options) — one component handles both patterns.
3. **Icon + text support** (MEDIUM) — ToggleGroupItem accepts any content (icon, text, or both) via children, giving full flexibility for icon-based segmented controls.

## Notable Props
- `type`: "single" | "multiple"
- `value` / `defaultValue`: Selection value(s)
- `onValueChange`: Selection callback
- `disabled`: Group or per-item disable

## A11y Highlights
- **Keyboard**: Arrow keys navigate within group (roving tabindex); Enter/Space toggles; Tab exits group
- **Screen reader**: role="group"; each item role="radio" (single) or "checkbox" (multiple); pressed state communicated
- **ARIA**: Radix auto-wires role and aria-pressed; roving tabindex; group role

## Strengths & Gaps
- **Best at**: Single and multiple selection in one component; icon/text content flexibility; Radix ARIA correctness
- **Missing**: No "pill/capsule" visual style built-in (requires Tailwind customization); named ToggleGroup not SegmentedControl
