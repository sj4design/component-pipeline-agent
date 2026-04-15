---
system: Chakra UI
component: SegmentedControl (v3) / Not available natively (v2)
url: https://chakra-ui.com/docs/components/segmented-control
last_verified: 2026-03-29
confidence: medium
---

# Segmented Control

## Approach
Chakra UI v2 does not include a SegmentedControl component. Teams build it from a `RadioGroup` (for single-select semantics) with custom styling to achieve the visual capsule with sliding selection indicator, or use a styled `ButtonGroup`. Chakra UI v3 added a native SegmentedControl component — a horizontal pill-shaped control where one segment is active at a time, visually distinguished by a filled background that moves between segments. The v3 implementation provides the correct radio group semantics under the hood, matching the WAI-ARIA radio group pattern rather than a tabs pattern (distinguishing between view-switching tabs and value-selection segmented controls).

## Key Decisions
1. **Radio semantics, not tabs** (HIGH) — SegmentedControl uses `role="radiogroup"` with each segment as `role="radio"`. This is the correct semantic distinction: tabs switch content panels (ARIA tabs pattern), while segmented controls select a value from a set (ARIA radio pattern). Some systems (notably iOS UIKit) use SegmentedControl for both purposes, but the v3 Chakra implementation is semantically precise.
2. **Animated indicator** (HIGH) — The v3 component includes a sliding background indicator that animates between selected segments using CSS transitions. This is the defining visual characteristic of a segmented control vs. a plain radio group. The animation is controlled by CSS custom properties and respects `prefers-reduced-motion`.
3. **v2 workaround via RadioGroup** (MEDIUM) — For v2, the recommended pattern is `RadioGroup` with styled `Radio` buttons that hide the default radio input circle and apply button-style CSS. This achieves the functionality without the visual polish of the native v3 component.
4. **Icon and text support** (MEDIUM) — v3 SegmentedControl segments support both text labels and leading icons. Icon-only segments require explicit aria-label on each segment for screen reader accessibility.

## Notable Props
- `value` / `defaultValue` / `onValueChange`: controlled/uncontrolled selection
- `size`: `"sm"` | `"md"` | `"lg"`
- `colorScheme`: Chakra color scheme token
- `isDisabled`: disables entire control
- Per-segment: `value`, `label`, `disabled`

## A11y Highlights
- **Keyboard**: Arrow Left/Right navigate between segments; Space/Enter selects; Tab enters/exits the group
- **Screen reader**: `role="radiogroup"` on container; each segment is `role="radio"` with `aria-checked`; group labeled by visible heading or `aria-label`
- **ARIA**: `aria-checked` on selected segment; `aria-disabled` on disabled segments; `aria-orientation="horizontal"` on group

## Strengths & Gaps
- **Best at**: Correct radio semantics (vs. tabs); animated indicator; token-based theming with dark mode support in v3
- **Missing**: Not available in v2 without custom implementation; no vertical orientation; no multi-select variant
