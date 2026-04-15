---
system: Evergreen (Segment)
component: Accordion (not available — use Pane + disclosure pattern)
url: https://evergreen.segment.com/components/pane
last_verified: 2026-03-28
confidence: medium
---

# Accordion

## Approach
Evergreen does not have a named Accordion component. Segment's analytics dashboard UI primarily uses tabbed navigation, cards, and data tables rather than accordion patterns. For collapsible content, Evergreen provides the building blocks (Pane, Card, Heading, Text, and the `useDisclosureState` hook) that teams can compose into a custom accordion pattern. This reflects Evergreen's "flexibility-first" philosophy — provide primitives and let teams build what they need.

## Key Decisions
1. **Composition over pre-built accordion** (HIGH) — Evergreen provides layout primitives (Pane, Card) and state management utilities but no accordion component. This keeps the library lean and avoids prescribing a specific accordion pattern for Segment's diverse product surfaces.
2. **Pane as the content container** (MEDIUM) — Pane is a `<div>` with Evergreen styling system integration. Teams building accordions use Pane for both the trigger header area and the expandable content panel.

## Notable Props
- N/A — component does not exist in Evergreen

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No accordion component; teams must build their own with correct ARIA
