---
system: Ant Design
component: ColorPicker
url: https://ant.design/components/color-picker/
last_verified: 2026-03-28
---

# ColorPicker

## Approach
Ant Design added ColorPicker in v5.5.0 (mid-2023), making it one of the most recently added major components in the library. The component reflects Ant's philosophy of maximum developer flexibility: it supports hex, RGB, and HSB formats simultaneously with a built-in format switcher, includes a preset palette API for brand color grids, provides an alpha slider, and supports both panel mode (always open inline) and trigger mode (opens in a popover). Ant Design serves a diverse Chinese enterprise software ecosystem that includes design tools, content management systems, data platforms, and SaaS products — contexts where color pickers appear in dashboard theming, chart color customization, and product configuration panels. Unlike Polaris which simplifies for merchants, or Atlassian which constrains to a vocabulary, Ant Design's ColorPicker is explicitly built for power-user workflows where developers and designers within enterprise applications need the full color selection surface.

## Key Decisions
1. **Three simultaneous format support (hex/rgb/hsb)** (HIGH) — The picker includes a format switcher that toggles between hex input, RGB numeric inputs, and HSB sliders, all reflecting the same underlying color. This design acknowledges that Ant Design's users include both technical users (who copy hex codes into CSS) and non-technical product teams (who prefer the visual HSB model). Building in all three avoids requiring developers to choose one and exclude others — the end user decides which representation to use in the moment.
2. **`presets` prop for named palette grids** (HIGH) — Ant Design's `presets` prop accepts an array of labeled color groups, each with a title and array of color values. This is a first-class feature, not an afterthought, because enterprise applications frequently need to enforce brand palette compliance while also allowing custom color choice. Users can select from a preset (quick, brand-safe) or use the gradient picker (freeform, power-user). The two-tier model serves both compliance and flexibility simultaneously.
3. **Trigger + popover architecture by default** (MEDIUM) — The default usage is a small colored square trigger that opens a popover panel, rather than an always-open panel. This reflects the use case where color pickers appear in toolbars and form fields where screen real estate is at a premium. The `open` and `onOpenChange` props allow controlled open/close state for complex form scenarios.
4. **`disabledAlpha` prop to gate transparency** (MEDIUM) — Alpha support is included by default (unlike Polaris which gates it with `allowAlpha`), but can be disabled when the product requires opaque colors only. Ant inverts the default assumption: transparency is available by default, reflecting its broader design-tool and dashboard theming use cases where alpha-transparent colors are common.
5. **`showText` prop for hex display on trigger** (LOW) — The trigger button can optionally display the current hex value alongside the color swatch. This small feature supports developer/power-user workflows where users want to see the exact value without opening the panel, and it reduces the round-trip of open → read hex → close.

## Notable Props
- `value` / `defaultValue`: Accepts `Color | string` — strings can be hex (#ff0000), rgb(255,0,0), or hsb(0,100%,100%).
- `presets`: `Array<{label: string, colors: string[]}>` — Named color groups for brand palette grids. Unique to Ant Design among Tier 1 systems as a built-in first-class feature.
- `format`: `'hex' | 'rgb' | 'hsb'` — Controls which text input format is shown by default.
- `disabledAlpha`: `boolean` — Removes the alpha slider, for use cases requiring fully opaque colors.
- `panelRender`: A render prop that allows complete custom replacement of the color panel — reflecting Ant Design's general philosophy of extreme customizability via render props throughout the library.
- `showText`: `boolean | function` — Displays the current color value text on the trigger swatch.

## A11y Highlights
- **Keyboard**: The color gradient canvas responds to arrow keys. Format input fields are standard text inputs with normal tab order. Preset swatches are keyboard navigable with arrow keys.
- **Screen reader**: The trigger button announces the current color value as text. Preset color names (from the label property) are announced when navigating swatches — but unnamed swatches only announce hex values, which is not ideal for non-technical users.
- **ARIA**: The popover follows Ant Design's standard popover accessibility pattern. The gradient canvas uses ARIA slider roles. Input fields for RGB/hex values are standard labeled inputs. Accessibility of the color panel is functional but less rigorously specified than Spectrum's implementation.

## Strengths & Gaps
- **Best at**: Developer-friendly power features — multi-format support, built-in preset palettes, and the `panelRender` escape hatch make this the most flexible ColorPicker in Tier 1 for building custom enterprise theming and design-tool UIs.
- **Missing**: The depth of Spectrum's sub-component composability — Ant's picker is a well-featured monolith, but if a product needs a ColorWheel rather than a square gradient, or needs to combine channels in non-standard ways, there is no primitive layer to compose from.
