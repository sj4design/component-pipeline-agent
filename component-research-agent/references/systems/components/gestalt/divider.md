---
system: Gestalt (Pinterest)
component: Divider
url: https://gestalt.pinterest.systems/web/divider
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Gestalt's Divider is a minimal horizontal rule component that provides visual separation between content sections. It is intentionally a thin, low-profile element — a single-pixel line rendered using Pinterest's neutral border color token — designed to structure content without competing with the visual richness of Pin imagery and media that dominates Pinterest's UI. The component is stateless and carries no interactive behavior, serving purely as a layout aid. Its simplicity reflects Pinterest's design philosophy that structural chrome should be as invisible as possible, letting content be the primary visual anchor. Divider is most commonly used within lists, settings panels, profile pages, and modal interiors where section breaks aid scannability without requiring headers.

## Key Decisions
1. **Horizontal only** (HIGH) — Pinterest's content layout is primarily vertical scroll (masonry feed, lists, settings), so a horizontal divider covers virtually all use cases. Vertical dividers are not part of the component, keeping the API surface minimal.
2. **No label/text variant** (HIGH) — Unlike some design systems that offer "labeled dividers" (e.g., "— or —"), Gestalt's Divider is purely decorative. Labeled separators in Pinterest's UI (e.g., login "or" separators) are composed manually using Box + Divider + Text, preserving component simplicity.
3. **Token-based color** (MEDIUM) — The line color is tied to Pinterest's `color.border.container` semantic token, ensuring the divider automatically adapts to light/dark mode without prop-level configuration.
4. **Renders as `<hr>`** (MEDIUM) — Using the native HTML horizontal rule element provides built-in semantic meaning and `role="separator"` for assistive technologies without additional ARIA attributes.

## Notable Props
- No configurable props — Divider is a zero-prop component. Its appearance is entirely controlled by design tokens.

## A11y Highlights
- **Keyboard**: Not focusable; purely presentational in the tab order.
- **Screen reader**: Rendered as `<hr>` which carries implicit `role="separator"`. Screen readers announce it as a thematic break between content sections.
- **ARIA**: No additional ARIA attributes needed; `<hr>` semantics handle separator role natively. If used purely decoratively with no semantic section break intent, consuming code may add `aria-hidden="true"`.

## Strengths & Gaps
- **Best at**: Lightweight, zero-configuration content section separation; automatic dark mode adaptation via tokens; correct HTML semantics out of the box.
- **Missing**: No vertical orientation; no labeled/text-inlay variant; no spacing control via props (consuming code must use Box for margin management around the divider); no dashed or styled variants for decorative use cases.
