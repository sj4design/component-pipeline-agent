---
system: Evergreen (Segment/Twilio)
component: SegmentedControl
url: https://evergreen.segment.com/components/segmented-control
last_verified: 2026-03-29
confidence: high
---

# Segmented Control

## Approach
Evergreen's SegmentedControl is a tab-like button group used to switch between mutually exclusive views or modes within a single UI surface — a pattern that appears throughout Segment's analytics product. Users switch between chart types (line, bar, funnel) in visualizations, toggle between relative and absolute time ranges in analytics views, and switch between "sources" and "destinations" views in certain workspace panels. The SegmentedControl communicates "these are all valid states; you're in one of them" more clearly than radio buttons (too form-like) or tabs (too page-navigation-like) for these view-mode contexts. The component is built directly into Evergreen and does not require external primitives.

## Key Decisions
1. **Named after Segment's brand metaphor** (HIGH) — The component name "SegmentedControl" is a direct nod to Segment's brand identity, reflecting that this is a first-class component reflecting the company's UI aesthetic and not a generic import.
2. **Controlled state** (HIGH) — `value` and `onChange` make it fully controlled, fitting Segment's SPA pattern where view modes are typically reflected in URL state or application state that the component should not own.
3. **`options` array API** (MEDIUM) — Rather than composing individual child buttons, the component accepts an `options` array (`[{ label, value }]`), simplifying usage and enforcing consistent option structure while trading some flexibility for brevity.

## Notable Props
- `options`: `Array<{ label: string, value: string | number }>` — the control options
- `value`: currently selected value (controlled)
- `onChange`: callback receiving the new value
- `size`: `"small" | "medium" | "large"` — control height/font size
- `disabled`: disables all options in the group

## A11y Highlights
- **Keyboard**: Arrow keys navigate between options; the selected option updates on arrow key press; Tab moves focus into and out of the control group.
- **Screen reader**: Rendered as a `role="group"` with individual options as `role="radio"` buttons; `aria-checked` reflects selection state.
- **ARIA**: Uses the radio group pattern (`role="radiogroup"`, `role="radio"`, `aria-checked`) as recommended for mutually exclusive selection controls.

## Strengths & Gaps
- **Best at**: View-mode switching in analytics dashboards (chart type, time range display mode, entity type filters); clean controlled API with minimal boilerplate.
- **Missing**: No icon-only option support (label is required); no disabled individual options (only group-level disable); no vertical orientation variant.
