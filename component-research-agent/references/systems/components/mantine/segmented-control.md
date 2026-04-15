---
system: Mantine
component: SegmentedControl
url: https://mantine.dev/core/segmented-control/
last_verified: 2026-03-29
confidence: high
---

# SegmentedControl

## Approach
Mantine includes a first-class SegmentedControl component — a horizontal pill-shaped control with a sliding indicator background that highlights the selected segment. It is one of Mantine's more visually polished components, with a CSS transition on the indicator that moves smoothly between selections. The component is built on a RadioGroup (role="radiogroup" with radio buttons) for correct semantics, and provides both controlled and uncontrolled modes. It supports icons alongside text labels, disabled segments, full-width layout, and size variants. The component is commonly used in Mantine-built dashboards for view switching (List / Grid), time range selection (Day / Week / Month), and theme toggles (Light / Dark / System).

## Key Decisions
1. **Radio group semantics** (HIGH) — Using `role="radiogroup"` with each segment as `role="radio"` is the correct semantic choice for a single-select option control. This differentiates SegmentedControl from Tabs (which uses `role="tablist"` and `role="tab"`) — important because a SegmentedControl selects a value, while Tabs switches associated content panels.
2. **CSS indicator animation** (HIGH) — The selected segment's background is an absolutely positioned div that moves using CSS `transform: translateX()` with a transition. This achieves a smooth "sliding pill" effect without JavaScript measurement. The implementation respects `prefers-reduced-motion` by disabling the transition for users who prefer reduced motion.
3. **`data` prop for items** (HIGH) — Items are defined as an array of `{ value, label, disabled }` objects passed to the `data` prop, rather than using children. This data-driven API is cleaner for programmatically generated segments but less flexible for segments with complex JSX content (only string/ReactNode labels are supported).
4. **Size and orientation** (MEDIUM) — Size variants (xs through xl) and `orientation` (horizontal default, vertical option) are supported. Vertical SegmentedControl is used in sidebar navigation panels. Full-width mode stretches the component to fill its container.

## Notable Props
- `data`: array of `{ value: string, label: ReactNode, disabled?: boolean }` or string array
- `value` / `defaultValue` / `onChange`: controlled/uncontrolled
- `orientation`: `"horizontal"` | `"vertical"`
- `fullWidth`: stretch to container width
- `size`: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`
- `color`: Mantine color token for selected segment
- `disabled`: disables entire control
- `transitionDuration` / `transitionTimingFunction`: animation customization

## A11y Highlights
- **Keyboard**: Arrow Left/Right (horizontal) or Up/Down (vertical) navigate segments; Tab enters/exits the group; selected segment focused on entry
- **Screen reader**: `role="radiogroup"` on container; each segment is `role="radio"` with `aria-checked`; group labeled by `aria-label` or adjacent visible label
- **ARIA**: `aria-checked` on selected segment; `aria-disabled` on disabled segments; `aria-orientation` matches the orientation prop

## Strengths & Gaps
- **Best at**: Smooth animated indicator; correct radio semantics; native in @mantine/core (no extra package); comprehensive size/orientation/color variants
- **Missing**: No multi-select variant; no icon-only segments with tooltip (teams add tooltips manually); `data` prop limits JSX complexity inside segments
