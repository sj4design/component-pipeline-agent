---
system: Orbit (Kiwi.com)
component: Separator
url: https://orbit.kiwi/components/layout/separator/
last_verified: 2026-03-29
confidence: high
---

# Divider

> **Name mapping**: Orbit calls this component `Separator`. It serves the same purpose as a Divider in other systems.

## Approach
Orbit's Separator is a structural layout component used to visually delineate distinct sections of travel-related content — separating outbound and return flight segments in an itinerary, dividing passenger detail sections from payment details, or marking the boundary between booking summary and fare breakdown. Because Kiwi.com UIs tend toward information-dense layouts, the Separator provides visual breathing room without consuming the vertical space that a margin-only approach would require. It renders as a horizontal rule with optional spacing control above and below, keeping the implementation minimal while covering all production use cases.

## Key Decisions
1. **Horizontal-only** (HIGH) — Kiwi.com's content flows are vertically stacked on mobile and desktop alike; a vertical separator has no current production use case in the booking funnel, so the component focuses exclusively on horizontal separation.
2. **Spacing props** (HIGH) — `spaceAfter` controls the whitespace following the separator, allowing teams to tune density without wrapping in additional Box/Stack components.
3. **Semantic `<hr>` element** (MEDIUM) — Using the native HTML element ensures screen readers announce a thematic break, which is meaningful when separating distinct itinerary segments.

## Notable Props
- `spaceAfter`: `"none" | "smallest" | "small" | "medium" | "large" | "largest"` — controls bottom margin
- `type`: `"solid" | "dashed"` — visual style variant

## A11y Highlights
- **Keyboard**: Not focusable; purely presentational.
- **Screen reader**: Renders as `<hr>` which is announced as a thematic break by most screen readers.
- **ARIA**: No ARIA overrides needed; native `<hr>` semantics are sufficient.

## Strengths & Gaps
- **Best at**: Clean section separation in dense booking layouts with fine-grained spacing control.
- **Missing**: No vertical orientation; no label/text in the divider (e.g., "Or pay with"); no color customization beyond the design token default.
