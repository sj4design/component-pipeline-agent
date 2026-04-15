---
system: Salesforce Lightning Design System
component: Color Picker
url: https://lightningdesignsystem.com/components/color-picker/
last_verified: 2026-03-28
confidence: high
---

# Color Picker

## Approach
Salesforce Lightning provides a full ColorPicker component used in Salesforce's customization interfaces — branding colors for communities, custom theme configuration, and visual customization of dashboards and reports. The component includes a hex input field, a swatch palette of predefined colors, and a saturation/hue gradient picker for freeform color selection. This reflects Salesforce's extensive customization features for CRM theming.

## Key Decisions
1. **Swatch palette + gradient picker** (HIGH) — Combines predefined brand-safe color swatches with a freeform gradient/hue picker, balancing quick selection of common colors with flexibility for custom colors in CRM branding contexts.
2. **Hex input** (HIGH) — Direct hex code entry allows power users to input precise color values, important for brand color consistency in Salesforce communities and Lightning Experience themes.
3. **Summary color display** (MEDIUM) — Shows the currently selected color in a swatch preview, providing visual confirmation before confirming the selection.

## Notable Props
- `value`: Current hex color value
- `onChange`: Color change callback
- `swatches`: Array of predefined color options
- `label`: Field label
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Tab through sections (hex input, swatch grid, hue/saturation slider); arrow keys in swatch grid; saturation gradient navigable
- **Screen reader**: Color name or hex value announced; swatch selection announced; hue/saturation values communicated
- **ARIA**: Popover pattern for picker panel; aria-label on color input; swatch grid navigation

## Strengths & Gaps
- **Best at**: CRM branding customization; combined swatch + freeform color selection; hex input for precision
- **Missing**: No opacity/alpha channel support in base component; accessibility of gradient pickers is inherently complex
