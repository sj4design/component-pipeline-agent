---
system: Radix UI (WorkOS)
component: Badge (via Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/badge
last_verified: 2026-03-28
confidence: high
---

# Badge / Tag

## Approach
Radix Themes provides a Badge component for tag/label display. At the primitives level, there is no Tag primitive. The Badge is a styled, non-interactive label element with color and variant options. For interactive tags (removable chips in multi-select), Radix relies on consumer composition. The Badge is designed for status indicators, category labels, and count displays.

## Key Decisions
1. **Static display component** (HIGH) — Badge/Tag is presentational; interactive tag patterns (removable chips) must be built by consumers. This keeps the component simple and avoids the API complexity of optional remove buttons.
2. **color and variant** (MEDIUM) — Badge supports the full Radix Themes color scale and solid/soft/outline/surface variants, making it easy to create category-coded tag systems.

## Notable Props
- `color`: semantic color token
- `variant`: `"solid" | "soft" | "outline" | "surface"`
- `radius`: border radius override
- `highContrast`: higher contrast text option

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior needed
- **Screen reader**: Inline text element; reads as part of surrounding content
- **ARIA**: No special ARIA needed for static badges; removable tags need close button with `aria-label`

## Strengths & Gaps
- **Best at**: Clean color token integration; variant system for different tag styles
- **Missing**: No removable tag pattern; no tag input component; no max-width truncation handling
