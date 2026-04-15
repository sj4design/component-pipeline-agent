---
system: Orbit (Kiwi.com)
component: Itinerary (accordion-like, for travel)
url: https://orbit.kiwi/components/itinerary/
last_verified: 2026-03-28
confidence: medium
---

# Itinerary (Accordion-like component)

## Approach
Orbit does not have a generic "Accordion" component. Instead, it has an `Itinerary` component which serves a travel-specific accordion use case: displaying flight segments with expandable layover and stop details. For general accordion needs, Orbit provides a `Collapse` component that handles the show/hide animation pattern. The Itinerary component is purpose-built for Kiwi.com's core product — displaying multi-segment flight information in a compact, expandable format.

## Key Decisions
1. **Domain-specific over generic** (HIGH) — Orbit chose to build travel-specific components rather than a general accordion. The Itinerary component understands flight data structure (origin, destination, duration, stops) and renders it appropriately. This is Orbit's overall philosophy: solve real Kiwi.com problems, not abstract design patterns.
2. **Collapse as the generic primitive** (MEDIUM) — `Collapse` is the generic show/hide component for cases where Itinerary doesn't fit. It provides the animation and state but no opinions about content, header style, or multi-item management.

## Notable Props
- Itinerary: `segments` array with flight segment data
- Collapse: `expanded`, `label`, `actions`

## A11y Highlights
- **Keyboard**: Standard button behavior for expand/collapse triggers
- **Screen reader**: Itinerary segment content is structured for reading order; expanded state communicated via aria-expanded
- **ARIA**: Collapse uses aria-expanded on the trigger button

## Strengths & Gaps
- **Best at**: Travel itinerary display; Collapse as a lightweight accordion primitive
- **Missing**: No general-purpose accordion with multiple items and "show all" control; not suitable for FAQ or settings use cases
