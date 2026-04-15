---
system: Spectrum (Adobe)
component: ColorPicker (+ ColorArea, ColorSlider, ColorSwatch, ColorWheel, ColorField)
url: https://react-spectrum.adobe.com/react-spectrum/ColorPicker.html
last_verified: 2026-03-28
---

# ColorPicker — The Sub-System Architecture

## Approach
Adobe's Spectrum contains the most complete color selection system in any Tier 1 design system, and understanding why requires understanding who Adobe builds for: Photoshop users, Illustrator users, Lightroom users — professionals who live inside color pickers for hours each day. Rather than shipping a single monolithic ColorPicker, Adobe decomposed color selection into six primitives: ColorPicker (the composed dialog trigger), ColorArea (the 2D saturation/lightness gradient canvas), ColorSlider (single-channel slider, used for hue, alpha, or any channel), ColorSwatch (a clickable color preview), ColorWheel (a circular hue ring), and ColorField (a text input for hex/RGB/HSL values). This sub-system architecture exists because different Adobe products need different combinations: Photoshop's HSB wheel with brightness slider is different from Illustrator's CMYK sliders, which are different from a simple color swatch picker in a presentation tool. By separating these into composable primitives, any product team can assemble precisely the color UI they need without hacking a monolithic component.

## Key Decisions
1. **Sub-component architecture over monolithic picker** (HIGH) — The decision to build six separate components rather than one was driven by the extreme variation in color UIs across Adobe products. A monolithic component would require so many props and variants that it would become unmaintainable. The primitive approach means each piece can be independently composed, tested, and themed. The cost is that simple use cases require more wiring — but Adobe judged that its product teams have the capability to assemble primitives and that flexibility is worth the setup cost.
2. **Color state is managed via a Color object, not a hex string** (HIGH) — All six components share the `@react-stately/color` Color type, which is a rich object supporting conversion between HSB, HSL, RGB, and CMYK. This is architecturally significant: the component doesn't lossy-convert to hex and back, so color fidelity is preserved across formats. For print-calibrated tools like InDesign, this is a hard requirement.
3. **ColorWheel reflects Photoshop's mental model** (MEDIUM) — The circular hue wheel with a 2D saturation/brightness square inside is the interaction pattern photoshop users have memorized over decades. Spectrum implements this exact model deliberately to minimize cognitive friction for existing Adobe users migrating to web applications. This is a user retention decision as much as a design decision.
4. **Separate ColorField for text entry** (MEDIUM) — Rather than embedding a text input inside the larger picker, Spectrum provides ColorField as an independent component. This means a product can offer hex-only input without the visual picker, or stack them together. The separation respects that some workflows (copying hex codes from brand guidelines) are faster with text than with a visual picker.
5. **Format switching (hex/rgb/hsl/hsb) is a first-class feature** (MEDIUM) — ColorPicker exposes a format toggle because creative professionals frequently need to communicate color in the format their downstream tool expects. A developer wants hex; a print designer needs CMYK values; a motion designer wants HSB. Supporting all simultaneously reflects Adobe's multi-disciplinary user base.

## Notable Props
- `value` / `defaultValue` on ColorPicker: Accepts `Color | string` — the string can be any format (hex, rgb(), hsl()) and the system parses it into the internal Color type, which is why the API feels flexible while maintaining internal fidelity.
- `colorSpace` on ColorArea: Constrains which color space's channels the 2D gradient represents. This is unique to Spectrum — most systems hardcode the space.
- `channel` on ColorSlider: Specifies which single channel this slider controls (hue, saturation, brightness, red, green, blue, alpha). This is the key primitive prop enabling arbitrary slider combinations.
- `isDisabled` / `isReadOnly` on all sub-components: First-class props because Adobe tools frequently show color swatches in non-editable "document color" panels alongside editable pickers in the same view.

## A11y Highlights
- **Keyboard**: ColorArea responds to Arrow keys (fine adjustment), Shift+Arrow (coarse step), Page Up/Down (large jumps). ColorSlider follows slider ARIA pattern with Home/End for min/max. ColorWheel uses arrow keys for degree rotation.
- **Screen reader**: Color values are announced in the currently active format (e.g., "Hue 240 degrees, Saturation 80%, Brightness 65%"). On ColorArea, current channel values are announced after each arrow key press.
- **ARIA**: ColorArea uses `role="slider"` with two `aria-valuetext` announcements for the two axes. ColorSlider maps to the standard ARIA slider pattern. ColorWheel uses `role="slider"` with degree values.

## Strengths & Gaps
- **Best at**: Professional-grade color selection with format flexibility, composable architecture, and deep Photoshop-familiar interaction patterns — no other Tier 1 system comes close for complex color workflows.
- **Missing**: Pre-built preset swatch grids with named colors (brand palettes) are not provided as a composed pattern — teams must assemble ColorSwatch instances manually, which requires more code than Ant Design's `presets` prop.
