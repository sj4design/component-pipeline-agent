---
system: Radix UI
component: ColorPicker
url: https://www.radix-ui.com/themes/docs/components/color-picker
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
The ColorPicker component lives exclusively in Radix Themes (v3+), not in Radix Primitives. This distinction is central to understanding Radix's architecture: Primitives provides headless, unstyled interaction patterns, while Themes layers opinionated, styled components on top. The ColorPicker in Themes supports HEX, HSL, and HSB color modes with a canvas-based gradient picker, hue slider, and alpha channel control. Because Radix Primitives does not expose a ColorPicker, teams using only Primitives must compose one from scratch using Popover, Slider, and controlled inputs. The Themes implementation is intentionally opinionated to serve rapid prototyping use cases within the Radix design language.

## Key Decisions
1. **Themes-only, not a Primitive** (HIGH) — Color picking involves complex visual interaction (gradient canvases, sliders) that doesn't map cleanly to a single WAI-ARIA pattern, so Radix chose to build it as a styled Themes component rather than an accessible primitive, avoiding premature abstraction.
2. **Multiple color model support (HEX/HSL/HSB)** (HIGH) — Supporting three color models acknowledges that developers and designers think in different color spaces; HEX for web output, HSL for human-readable lightness control, HSB for design-tool familiarity.
3. **Alpha channel included** (MEDIUM) — The alpha slider is bundled into the component rather than opt-in, reflecting the assumption that most color picker use cases in UI tools require full RGBA control.

## Notable Props
- `value`: controlled color value as a string (HEX format)
- `defaultValue`: uncontrolled initial color string
- `onValueChange`: callback fired when the selected color changes
- `open`: controls popover open state
- `onOpenChange`: callback for open state changes

## A11y Highlights
- **Keyboard**: Gradient canvas supports arrow key navigation for hue/saturation adjustment; sliders follow ARIA slider keyboard contract (Arrow keys, Home, End).
- **Screen reader**: The trigger button announces the current color value; the popover region is labeled.
- **ARIA**: Uses `role="slider"` on hue and alpha range inputs; popover follows ARIA dialog or tooltip pattern depending on implementation version.

## Strengths & Gaps
- **Best at**: Providing a fully styled, ready-to-use color picker within the Radix Themes design language with zero configuration.
- **Missing**: No Primitive-level building block means teams on Radix Primitives alone cannot leverage any shared logic; no color swatch history, no palette presets, and no eyedropper API integration.
