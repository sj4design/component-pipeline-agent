---
system: Evergreen (Segment)
component: Tab / Tablist
url: https://evergreen.segment.com/components/tab
last_verified: 2026-03-28
confidence: medium
---

# Tab / Tablist

## Approach
Evergreen provides Tab and Tablist components for in-page content organization. The implementation is clean but minimal — focused on Segment's analytics dashboard patterns where tabs switch between different views of the same data (overview, events, users). Evergreen's tabs use a link-like visual style consistent with the system's overall design language. The component supports both tab (ARIA role) and navigation patterns.

## Key Decisions
1. **is prop for render element** (MEDIUM) — Evergreen's Tab accepts an `is` prop to render as a different element (link, anchor, React Router Link), following Evergreen's polymorphic rendering pattern. This allows tabs to function as navigation links without losing the visual style.
2. **appearance for selected state** (MEDIUM) — The `isSelected` prop drives the visual active state. Evergreen uses `isSelected` consistently across Tab and other selection components, creating a coherent selection API.

## Notable Props
- `isSelected`: active tab state
- `onSelect`: selection callback
- `is`: polymorphic element (default is `<button>`)
- `appearance`: visual style

## A11y Highlights
- **Keyboard**: Arrow key navigation within tablist; standard button/link behavior
- **Screen reader**: role="tab" on Tab; role="tablist" on Tablist; aria-selected
- **ARIA**: Standard ARIA tabs pattern; panels are managed by consumer

## Strengths & Gaps
- **Best at**: Simple, clean API; polymorphic rendering for navigation tabs
- **Missing**: No content panel management; no variant breadth; minimal feature set
