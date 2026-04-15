---
system: Chakra UI
component: ColorPicker
url: https://chakra-ui.com/docs/components/color-picker
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Chakra UI v3 introduced a native `ColorPicker` component, filling a gap that existed throughout v2 where color selection required third-party libraries or fully custom implementations. The component is built on Chakra's composable recipe system and integrates directly with the design token pipeline, allowing the picker's own chrome (sliders, input, swatch) to respect the active color mode and theme. The ColorPicker supports HEX, HSL, and HSB formats and includes a color channel input set for fine-grained value editing alongside the visual gradient canvas. In v2, teams had to reach for libraries like `react-colorful` or `react-color` and manually connect them to Chakra's form field system; v3 resolves this by shipping a first-party solution that participates in Chakra's form control context, enabling native error state and disabled state propagation.

## Key Decisions
1. **v3-only, not backported to v2** (HIGH) — The v3 architecture shift to a slot-based recipe system made it practical to build a complex multi-part component like ColorPicker with consistent theming; the older v2 style-props model would have produced a brittle, hard-to-theme implementation.
2. **Integrated with FormControl context** (HIGH) — By participating in Chakra's FormControl context, the ColorPicker automatically receives `aria-invalid`, `aria-required`, `aria-describedby` from the wrapping form field, maintaining consistency with all other Chakra form inputs without extra wiring.
3. **Format prop for color model switching** (MEDIUM) — The `format` prop (`"hex"` | `"hsl"` | `"hsb"`) controls which color representation is used for the `value`/`onChange` interface, allowing teams to work in whichever color space suits their application data model.

## Notable Props
- `value`: controlled color value string
- `defaultValue`: uncontrolled initial color string
- `onValueChange`: callback with new color value
- `format`: `"hex"` | `"hsl"` | `"hsb"` — output color format
- `open`: controls popover open state
- `onOpenChange`: open state change callback
- `disabled`: disables the entire picker

## A11y Highlights
- **Keyboard**: Gradient canvas supports arrow key navigation; hue and alpha sliders follow ARIA slider keyboard contract (Arrow keys, Home, End, Page Up/Down for larger steps).
- **Screen reader**: Color channel inputs are individually labeled; the trigger swatch announces the current color value; picker popover is a labeled dialog region.
- **ARIA**: `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` on range inputs; inherits `aria-invalid` and `aria-disabled` from FormControl context.

## Strengths & Gaps
- **Best at**: Seamless integration into Chakra forms with automatic accessibility attribute propagation, dark mode support via color tokens, and multi-format color model support in a single package.
- **Missing**: No color swatch history or saved palette support; no eyedropper API; v2 users must still rely on third-party solutions; no color contrast accessibility checking built in.
