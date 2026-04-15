---
system: Chakra UI
component: Divider / Separator
url: https://v2.chakra-ui.com/docs/components/divider
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Chakra UI provides a Divider component that renders a semantic horizontal rule (`<hr>`) or a vertical divider depending on the `orientation` prop. It integrates with Chakra's color mode and style system, accepting all Chakra style props for customization (borderColor, borderStyle, borderWidth). In v3, it was renamed to Separator to align with the emerging HTML `<hr>` as separator semantic and to match the naming convention adopted by Radix UI and shadcn/ui. The component is intentionally minimal — it is a styled presentational element, not a structural or interactive component, and its API surface reflects that simplicity.

## Key Decisions
1. **`<hr>` as semantic base** (HIGH) — Using `<hr>` as the underlying element provides native screen reader semantics (announced as "separator") without needing custom ARIA. Chakra renders `role="separator"` explicitly as well for environments where `<hr>` semantics aren't communicated correctly.
2. **Orientation support** (MEDIUM) — `orientation="horizontal"` (default) or `orientation="vertical"`. Vertical dividers are common in toolbars and navigation bars between items. Chakra handles the CSS differences (height vs width, margin direction) automatically based on orientation.
3. **Style props passthrough** (MEDIUM) — Because Chakra's components accept all CSS-in-JS style props, teams can customize the divider's color, thickness, style (dashed, dotted), and spacing directly on the component without needing to add custom CSS or wrap in a Box. This is consistent with Chakra's prop-based styling philosophy.
4. **v3 rename to Separator** (LOW) — The rename to Separator in v3 aligns with the HTML Living Standard treating `<hr>` as a thematic break / separator rather than a horizontal rule. This is a naming clarity change, not a functionality change.

## Notable Props
- `orientation`: `"horizontal"` (default) | `"vertical"`
- `variant`: `"solid"` | `"dashed"` — border style
- `borderColor`: color token for the divider line
- `borderWidth`: thickness of the line
- All Chakra style props accepted (spacing, sizing, etc.)

## A11y Highlights
- **Keyboard**: Non-interactive, no keyboard interaction
- **Screen reader**: Rendered as `<hr>` with `role="separator"`; announced as a separator/divider between content sections
- **ARIA**: `role="separator"` with `aria-orientation` matching the orientation prop

## Strengths & Gaps
- **Best at**: Simple, style-prop-driven divider with semantic HTML base; works in both light and dark mode via color tokens; minimal API
- **Missing**: No decorative label/text in the middle of the divider (e.g., "OR" dividers between form sections require custom composition); no gradient or decorative variants
