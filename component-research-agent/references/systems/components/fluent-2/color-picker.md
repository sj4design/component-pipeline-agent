---
system: Fluent 2 (Microsoft)
component: SwatchPicker (primary) + ColorPicker (preview)
url: https://react.fluentui.dev/?path=/docs/components-swatchpicker--docs
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Fluent 2 addresses color selection through two complementary components. SwatchPicker is the stable, production-ready solution for selecting from a predefined palette of colors — the dominant pattern across Office 365, Teams, and Outlook where brand-approved or document-theme colors are offered. ColorPicker is a separate preview component for freeform color selection (hex input, hue/saturation picker), targeted at power-user scenarios like custom theme creation. The split reflects Microsoft's philosophy of constraining color choice to curated palettes in most contexts while still supporting advanced use cases. SwatchPicker renders a grid of color swatches with clear selected-state indicators, matching the color panel found in Word, PowerPoint, and Excel. Both components are built with Griffel CSS-in-JS and consume Fluent design tokens, ensuring automatic adaptation across light, dark, and high-contrast themes.

## Key Decisions
1. **Dual-component strategy** (HIGH) — Separating palette selection (SwatchPicker) from freeform picking (ColorPicker preview) allows the stable API to cover 90% of Office use cases while the experimental API matures independently without breaking changes.
2. **Predefined swatch grid as primary pattern** (HIGH) — Enterprise document workflows require consistent, on-brand color choices; a constrained palette reduces user error and ensures accessible color combinations within Microsoft 365 themes.
3. **Design token integration** (HIGH) — Swatch values can map directly to Fluent color tokens, meaning selected colors are guaranteed to remain legible across all supported themes including Windows High Contrast mode.
4. **ColorPicker as preview/advanced** (MEDIUM) — Keeps freeform color input behind a feature flag so product teams can opt in only when their scenario genuinely requires it, avoiding complexity in simpler UIs.
5. **Selected-state ring indicator** (MEDIUM) — A visible border ring around the active swatch provides a clear non-color-only selected state, satisfying WCAG success criterion 1.4.1 (use of color).

## Notable Props
- `selectedValue`: controlled selected swatch value
- `onSelectionChange`: callback fired with new swatch value
- `shape`: `"circular"` | `"rounded"` | `"square"` — swatch shape variant
- `size`: `"small"` | `"medium"` | `"large"` — affects swatch dimensions
- `color` (on `SwatchPickerRow`/`ColorSwatch`): hex or CSS color string for the swatch
- `value`: unique identifier for each swatch item

## A11y Highlights
- **Keyboard**: Arrow keys navigate between swatches within the grid; Enter/Space selects the focused swatch; Tab moves focus in and out of the picker.
- **Screen reader**: Each swatch announces its color name or value via `aria-label`; selected state is conveyed via `aria-selected`; the grid uses `role="grid"` or `role="listbox"` semantics.
- **ARIA**: `role="option"` on individual swatches, `aria-selected` for current selection, `aria-label` providing color name/hex on each item; high-contrast mode is supported via Fluent's token system which automatically maps to Windows system colors.

## Strengths & Gaps
- **Best at**: Curated palette selection matching Office 365 document theme color panels; token-driven theming that handles high-contrast automatically; clean grid layout familiar to Microsoft 365 users.
- **Missing**: ColorPicker (freeform) is still in preview and lacks the stability guarantees of SwatchPicker; no built-in eyedropper/color sampling tool; no gradient or opacity controls in either component; SwatchPicker does not natively support grouping swatches by category without custom layout.
