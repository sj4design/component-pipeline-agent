---
component: ColorPicker
tier: 2
last_verified: 2026-03-28
---

# ColorPicker — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | ColorPicker (not present) | Not present; not a Twilio Console use case | high |
| Salesforce Lightning | Color Picker | Swatch palette + gradient picker + hex input; CRM branding customization | high |
| GitHub Primer | ColorPicker (not present) | Not present; label color is product-specific custom implementation | high |
| shadcn/ui | ColorPicker (not present) | Not present; use native input[type=color] or react-colorful integration | medium |
| Playbook | ColorPicker (not present) | Not present; product colors via swatches | medium |
| REI Cedar | ColorPicker (not present) | Not present; product variant swatches not a generic picker | medium |
| Wise Design | ColorPicker (not present) | Not present; no user color selection use case | low |
| Dell Design System | ColorPicker (not present) | Not present; theme options not user-facing | low |

## Key Decision Patterns

**Rare component:** ColorPicker is the rarest component in the T2 set — only Lightning provides a dedicated ColorPicker. Color selection is not a common enterprise or developer tool use case; it appears primarily in CRM customization (Salesforce communities, Experience Cloud themes).

**Lightning's full picker:** Lightning's Color Picker includes three selection methods: swatch palette (predefined colors), hue-saturation gradient (freeform), and hex input (precision entry). This comprehensive approach serves Salesforce admins customizing branding without developer involvement.

**Native input[type=color]:** All systems without a dedicated ColorPicker fall back to native input[type=color] — which provides OS-native color picker UI (inconsistent across browsers but functional). Zero JS required.

**Accessibility challenge:** Color picker gradient/hue interfaces are inherently difficult to make accessible — the 2D gradient requires alternative keyboard input (hex field or preset swatches) for users who cannot interact with the gradient directly.

## A11y Consensus
- Always provide hex input or preset swatches as accessible alternatives to gradient pickers
- Gradient picker: keyboard navigation on 2D surface requires both X (saturation) and Y (lightness) arrow key controls with aria-valuenow for each axis
- Selected color: announce the color name or hex value to screen readers
- Popover pattern: the picker opens in a popover with proper focus management

## Recommended Use
Use Lightning Color Picker for Salesforce branding customization contexts. Use native input[type=color] for simple color selection needs. Use react-colorful with custom shadcn/ui Popover for React apps requiring a styled color picker. The gradient picker must always have hex input fallback for accessibility.
