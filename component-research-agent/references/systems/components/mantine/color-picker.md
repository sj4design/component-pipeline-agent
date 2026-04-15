---
system: Mantine
component: ColorPicker
url: https://mantine.dev/core/color-picker/
last_verified: 2026-03-29
confidence: high
---

# ColorPicker

## Approach
Mantine includes a full-featured `ColorPicker` component with an HSL/RGB/HEX saturation gradient canvas, a hue slider, an optional alpha channel slider, and a row of swatches for preset colors. It can operate as a standalone picker or be embedded inside a `ColorInput` text field with a popover trigger. The component is controlled or uncontrolled via `value`/`onChange` and supports multiple color format outputs (hex, rgb, rgba, hsl, hsla). This depth of functionality reflects Mantine's goal of covering advanced UI patterns commonly needed in SaaS and developer tools — configuration UIs, theme editors, and dashboard builders.

## Key Decisions
1. **Multiple format support** (HIGH) — The `format` prop allows output in hex, rgb, rgba, hsl, or hsla strings. This is essential for tools that work with CSS variables or design token pipelines where format consistency matters.
2. **Swatches for presets** (HIGH) — The `swatches` prop accepts a color array for preset chips, supporting workflows where users choose from a brand palette rather than picking arbitrary colors.
3. **Alpha channel as opt-in** (MEDIUM) — The alpha slider is shown only when the format includes transparency (rgba, hsla), keeping the UI clean for use cases that don't need opacity control.

## Notable Props
- `format`: `"hex"` | `"rgb"` | `"rgba"` | `"hsl"` | `"hsla"`
- `value` / `onChange`: Controlled color value
- `swatches`: Array of color strings for preset chips
- `swatchesPerRow`: Controls swatch grid column count
- `withPicker`: Hides the gradient canvas, showing only swatches

## A11y Highlights
- **Keyboard**: Hue and alpha sliders support arrow key input for fine adjustment
- **Screen reader**: Slider thumbs have `aria-label` attributes; color preview is labeled
- **ARIA**: `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on slider thumbs

## Strengths & Gaps
- **Best at**: Full-featured color selection with format flexibility and preset swatches — rare in open-source component libraries at this quality level
- **Missing**: No eyedropper/screen-pick integration (browser API exists but is not wired in); no named color search
