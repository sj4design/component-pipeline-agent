---
system: Radix UI
component: Separator (Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/separator
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Radix Primitives provides a `Separator` primitive (not named "Divider") that serves as the accessible foundation for visual dividing lines. Radix Themes then exposes its own `Separator` component built on top of this primitive, adding size, color, and orientation props consistent with the Themes design token system. The naming choice of "Separator" over "Divider" directly follows the WAI-ARIA specification, which defines `role="separator"` as the accessible name for this pattern — Radix consistently aligns its component names with ARIA roles to reduce cognitive overhead for accessibility-aware teams. The Primitive itself is intentionally minimal: it renders a styled `<div>` with the correct ARIA role, and all visual styling is the consumer's responsibility when used outside of Themes.

## Key Decisions
1. **Named Separator to match ARIA role** (HIGH) — Aligning component names with WAI-ARIA roles is a foundational Radix design decision; it makes the accessibility contract self-documenting and removes ambiguity about the element's semantic purpose.
2. **Orientation prop (horizontal/vertical)** (HIGH) — The separator supports both orientations because UI layouts require both row and column dividers; the orientation prop directly maps to `aria-orientation` to keep accessibility correct by default.
3. **Decorative prop to suppress ARIA role** (MEDIUM) — When used purely visually (not as a structural landmark), the `decorative` prop sets `role="none"` and removes the element from the accessibility tree, preventing screen readers from announcing noise.

## Notable Props
- `orientation`: `"horizontal"` | `"vertical"` — controls layout direction and `aria-orientation`
- `decorative`: boolean — when true, renders as purely visual with `role="none"`
- `size`: (Themes only) `"1"` | `"2"` | `"3"` | `"4"` — controls width or height relative to container
- `color`: (Themes only) maps to Radix Themes color tokens

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior required or expected.
- **Screen reader**: When not decorative, announced as a separator landmark between content regions; screen readers typically do not read the element aloud but use it for navigation context.
- **ARIA**: `role="separator"` by default; `aria-orientation="horizontal|vertical"`; `role="none"` when `decorative={true}`.

## Strengths & Gaps
- **Best at**: Delivering a semantically correct, accessible separator with zero configuration; the `decorative` escape hatch prevents screen reader noise for purely ornamental uses.
- **Missing**: No label/text support within the separator (e.g., "OR" dividers common in auth forms require custom composition); no built-in dashed or dotted style variants in Primitives.
