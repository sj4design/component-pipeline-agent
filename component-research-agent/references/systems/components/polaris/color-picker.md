---
system: Polaris (Shopify)
component: ColorPicker
url: https://polaris.shopify.com/components/color-picker
last_verified: 2026-03-28
---

# ColorPicker

## Approach
Polaris provides a first-class ColorPicker component built around the HSB (Hue, Saturation, Brightness) color model, and this choice directly reflects Shopify's merchant use case. Merchants on Shopify use color pickers primarily for two purposes: customizing their online store themes (picking brand colors, button colors, background colors) and configuring product visual attributes (product color swatches, shipping label branding). Both of these use cases are handled most intuitively through HSB because merchants think about color in terms of "how vivid" and "how dark" rather than in RGB channel values. The component provides a 2D saturation/brightness canvas and a separate hue slider — the same two-control model most merchants will recognize from mobile OS color pickers and basic photo editors. Polaris deliberately keeps the picker minimal (no text input for hex values in the base component) because merchant-facing tools should not expose technical color formats to users who are not web developers.

## Key Decisions
1. **HSB model as the only input paradigm** (HIGH) — Polaris's ColorPicker does not expose RGB sliders, hex input, or format switching. This is a deliberate simplicity decision: Shopify's primary ColorPicker users are merchants, not developers. HSB maps naturally to how humans perceive color (pick the hue, then tune the vividness and darkness), making it accessible to non-technical users. Developers who need hex output can convert from the HSB value object programmatically.
2. **Alpha channel support via a separate prop** (MEDIUM) — The `allowAlpha` prop adds a fourth slider for opacity. This is gated behind a prop rather than always visible because most merchant use cases (brand colors, button colors) don't require transparency, and an extra slider adds cognitive overhead. By hiding it by default, the component stays simple for the 90% case.
3. **Value is an HSBAColor object, not a string** (MEDIUM) — The component's `color` prop accepts and returns `{hue, saturation, brightness, alpha}` rather than a hex string. This is counterintuitive for developers but reflects the component's rendering approach: the 2D canvas is rendered with hue as a CSS background gradient and saturation/brightness as the selector position, so the HSB representation is the native internal format. Converting to/from hex is left to the consuming application.
4. **No preset swatches built in** (LOW) — Unlike Ant Design's `presets` feature, Polaris's ColorPicker has no built-in palette/swatch system. For theme editors requiring brand palettes, Shopify teams are expected to compose a separate swatch grid above the picker and set the picker value when a swatch is clicked. This keeps the component focused but requires more integration code.

## Notable Props
- `color`: `HSBAColor` — Accepts `{hue: 0-360, saturation: 0-1, brightness: 0-1, alpha: 0-1}`. The 0-1 range for saturation/brightness (not 0-100%) is a specific API decision reflecting the CSS gradient calculations under the hood.
- `allowAlpha`: `boolean` — Shows or hides the alpha slider. Off by default to keep merchant-facing UIs simple.
- `fullWidth`: `boolean` — Allows the picker to stretch to its container width, supporting responsive theme editor panels.
- `onChange`: Fires continuously during drag (not only on release), enabling live preview of color changes in the store theme — a critical UX requirement for Shopify's theme customizer.

## A11y Highlights
- **Keyboard**: The 2D color area responds to arrow keys for fine positional adjustment. The hue slider and alpha slider follow standard ARIA slider keyboard behavior (Arrow keys, Home, End).
- **Screen reader**: Color values are announced as HSB percentages on the gradient canvas and as degree values on the hue slider. The current implementation does not announce a human-readable color name (e.g., "blue"), only the numeric values.
- **ARIA**: The gradient canvas uses `role="slider"` with `aria-valuetext` for the two-axis position. Sliders follow the WAI-ARIA slider pattern with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

## Strengths & Gaps
- **Best at**: Clean, merchant-friendly HSB color selection for store customization contexts — the two-control model (canvas + hue slider) is the simplest viable color picker that still gives full color range coverage.
- **Missing**: Hex/RGB text input and preset palette support, which means developers building advanced theme editors must compose additional elements outside the component to meet power-user needs.
