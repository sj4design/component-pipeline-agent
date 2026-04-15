---
component: color-picker
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — HCT color space / Material Theme Builder
**Approach:** M3 has no Color Picker component. M3's color system is built on HCT (Hue-Chroma-Tone), which generates Dynamic Color palettes from a seed color (typically extracted from a device wallpaper). The Material Theme Builder tool generates design tokens from a source color; end users do not pick colors in M3 applications — the system generates harmonious palettes automatically.
**Key Decisions:**
- [HIGH] Absent by architecture: M3's Dynamic Color system eliminates the user color-picking use case; theming is systematic, not user-driven
- [MED] HCT color space: perceptually uniform; better than HSB/HSL for generating accessible color palettes with predictable contrast ratios
- [MED] No guidance for user-facing color input: applications that do need color pickers (design tools, custom theming) are out of M3's scope and must use custom implementations
**Notable API:** No component. Material Theme Builder (tool, not component) for generating palettes from a seed color.
**A11y:** No guidance for custom color picker implementations.
**Best at:** Systematic palette generation — M3's HCT-based Dynamic Color is architecturally superior for consistent theming, but unrelated to user-facing color selection.
**Missing:** A Color Picker component for applications where users need to select arbitrary colors — graphic editors, custom theming interfaces, data visualization color assignments.

---

## spectrum
**Component:** 6-component color picker system (most complete Tier 1)
**Approach:** Spectrum provides six intercomposable color sub-components: `ColorPicker` (full picker popover), `ColorArea` (2D color space), `ColorSlider` (channel slider), `ColorSwatch` (preview), `ColorWheel` (hue wheel), `ColorField` (hex/channel text input). All components use a `Color` object (not a hex string) as their value type. `colorSpace` prop on `ColorArea` selects the color model.
**Key Decisions:**
- [HIGH] Six composable sub-components: teams build the exact picker UI they need — a `ColorWheel` + `ColorSlider` for saturation, or a `ColorArea` in HSL space, with no unused UI visible
- [HIGH] `Color` object not hex string: typed color object carries space-aware numeric channel values; color space conversions are built-in without external color library
- [MED] `channel` prop on `ColorSlider`: specifies which color channel the slider controls (`"hue"`, `"saturation"`, `"lightness"`, `"alpha"`) — enables building arbitrary multi-channel pickers
**Notable API:** `colorSpace: "hsb" | "hsl" | "rgb"` on `ColorArea`; `channel` on `ColorSlider`; `ColorPicker` as the all-in-one popover; `ColorSwatch` for display-only previews
**A11y:** `ColorSlider` has `role="slider"` with `aria-label` naming the channel; `ColorArea` is a 2D range with keyboard arrow navigation and descriptive announcements of position. Most complete color picker a11y in Tier 1.
**Best at:** Composable architecture and the typed `Color` object — best system for building custom color selection UIs with correct color space handling and accessibility.
**Missing:** No built-in palette picker (preset swatches grid); teams must compose `ColorSwatch` into a grid manually.

---

## carbon
**Component:** Absent — enterprise B2B focus
**Approach:** Carbon has no Color Picker. IBM's enterprise applications (Cloud infrastructure, security, analytics) deal with data and configuration, not color selection. The `@carbon/colors` package provides a constrained, accessible palette of IBM's brand colors for data visualization and status indication — but this is a design token system, not a user-facing picker.
**Key Decisions:**
- [HIGH] Absent: IBM product contexts do not present users with free-form color selection; data visualization uses a fixed accessible palette
- [MED] `@carbon/colors` for constrained palette: IBM's accessible color ramp (10 tones per hue) serves data visualization color assignment use cases without a picker UI
- [MED] No community pattern either: unlike some other missing Carbon components, there is no widely-adopted community Color Picker for Carbon; teams use third-party libraries
**Notable API:** No component. `@carbon/colors` token package for constrained palette access.
**A11y:** No guidance for custom color picker a11y.
**Best at:** Nothing for user-facing color selection — `@carbon/colors` serves the design-time constrained palette use case only.
**Missing:** A user-facing Color Picker for any IBM application use case requiring color input (data visualization customization, dashboard personalization, report branding).

---

## polaris
**Component:** ColorPicker (HSB model only)
**Approach:** Polaris's ColorPicker uses the HSB (Hue-Saturation-Brightness) color model exclusively, returning an `HSBAColor` object. `allowAlpha` enables the alpha channel slider. `onChange` fires continuously during interaction for live preview updating. `fullWidth` removes the max-width constraint. Polaris's picker is designed for Shopify theme color customization.
**Key Decisions:**
- [HIGH] HSB model only: Polaris chose HSB because it matches how designers think about color (hue wheel, saturation, brightness) — Shopify merchants customizing themes need intuitive color selection, not hex codes
- [MED] `HSBAColor` object return: typed color value with `{hue, saturation, brightness, alpha}` fields — application converts to hex/CSS for storage and display
- [MED] Continuous `onChange` for live preview: fires on every position change during drag, not just on release — enables real-time theme preview as merchants drag the color picker
**Notable API:** `color: HSBAColor`; `onChange: (color: HSBAColor) => void`; `allowAlpha: boolean`; `fullWidth: boolean`
**A11y:** No keyboard navigation within the color area (drag-only); no `role="slider"` on the hue/saturation area. This is a documented accessibility gap — keyboard and screen reader users cannot use the Polaris ColorPicker without pointing device access.
**Best at:** Live preview integration and the HSB model for merchant-friendly color customization in Shopify theme editing.
**Missing:** Keyboard accessibility for the color area (critical gap); hex input field; RGB/HEX color model support.

---

## atlassian
**Component:** @atlaskit/color-picker (not core ADS — palette-constrained grid)
**Approach:** Atlassian's color picker is a palette grid, not a free-form picker. It renders a grid of pre-defined color swatches as radio buttons. `role="radiogroup"` on the grid with `role="radio"` on each swatch. The `checkMarkColor` prop ensures the checkmark on the selected swatch has sufficient contrast against the swatch color. Used for label colors in Jira, card colors in Trello.
**Key Decisions:**
- [HIGH] Palette grid not free-form: Jira labels and Trello cards have a fixed set of allowed colors — a constrained palette prevents users from selecting inaccessible or visually clashing colors
- [HIGH] `role="radiogroup"` + `role="radio"` ARIA: the palette is a group of radio buttons — correct ARIA semantics for single-select from a predefined set
- [MED] `checkMarkColor` for swatch contrast: the checkmark indicating the selected color must contrast against the swatch background — `checkMarkColor` allows white or dark checkmarks per swatch
**Notable API:** `colors` array of `{label, value}` objects; `selectedColor`; `onChange`; `checkMarkColor: "white" | "default"` per color option
**A11y:** `role="radiogroup"` with `aria-label` on the group; `role="radio"` on each swatch with `aria-label` from the color's `label` string (e.g., "Red"); `aria-checked` on selected swatch. Best ARIA semantics for palette-constrained pickers in Tier 1.
**Best at:** ARIA correctness for constrained palette pickers — `radiogroup`/`radio` semantics are perfectly appropriate for single-select from a fixed color set.
**Missing:** Free-form color selection; hex/RGB input; any alpha support — constrained to the provided palette array.

---

## ant-design
**Component:** ColorPicker (3 formats + presets)
**Approach:** Ant Design's ColorPicker supports three display formats — hex, RGB, and HSB — with a format switcher UI. `presets` prop provides named palette groups (e.g., "Recommended", "Recent"). `disabledAlpha` removes the alpha channel. The default display is a trigger swatch that opens a popover picker — no always-visible inline mode. `panelRender` is an escape hatch for completely custom picker UI. `showText` displays the current color value next to the swatch trigger.
**Key Decisions:**
- [HIGH] Three formats with switcher: users can view and edit in hex/RGB/HSB — the only Tier 1 picker with in-place format switching; useful for developers who think in hex and designers who think in HSB
- [MED] `presets` with named groups: `[{label: "Recommended", colors: [...]}, {label: "Recent", colors: [...]}]` — supports dynamic "recently used" palettes alongside static brand palette
- [MED] `panelRender` escape hatch: completely replaces the picker panel with custom content while keeping the trigger and popover behavior — more flexible than Polaris's fixed HSB panel
**Notable API:** `format: "hex" | "rgb" | "hsb"`; `presets: [{label, colors}]`; `disabledAlpha: boolean`; `showText: boolean | (color) => ReactNode`; `panelRender`
**A11y:** The trigger swatch is a `<button>` with `aria-label` showing the current color value. The format input fields within the panel are labeled. The color area and sliders lack `role="slider"` with `aria-value*` attributes — a11y gaps similar to Polaris.
**Best at:** Multi-format support with switcher and `presets` with named groups — the most feature-complete picker for applications where users need to work in multiple color spaces.
**Missing:** Keyboard navigation within the color area (same drag-only gap as Polaris); inline (always-visible) mode without the trigger/popover pattern.
