---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Evergreen does not include a ColorPicker component. In Segment's analytics and customer data platform, chart and visualization colors are system-defined tokens rather than user-configurable values. Data visualizations (funnel charts, cohort tables, audience overlap diagrams) use Segment's fixed categorical color palette, which is chosen for accessibility (colorblind-safe) and brand consistency. Users do not configure chart colors, segment colors, or any UI element colors directly in Segment's product. The product's B2B focus on data configuration (sources, destinations, events, audiences) means users configure data pipelines, not visual themes. Because the product has no color-selection use case, building a ColorPicker would be scope creep with zero product benefit.

## Key Decisions
1. **System-defined chart color palette** (HIGH) — Evergreen's design team curates a fixed categorical color set for data visualization to ensure accessibility (WCAG AA contrast, colorblind-safe combinations), which would be undermined if users could override colors.
2. **B2B configuration focus** (HIGH) — Segment's interface is entirely about configuring data flows, not visual customization; the product's user mental model is "connect your data sources," not "style your dashboard."
3. **No third-party integrations requiring color config** (LOW) — Unlike some analytics tools that let users theme embedded widgets, Segment's embedded components use fixed Twilio/Segment brand colors.

## Notable Props
- N/A — component not present in Evergreen.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A ColorPicker. Teams extending Evergreen to whitelabel or theme-customization features should use a dedicated library (e.g., react-colorful, Radix primitives).
