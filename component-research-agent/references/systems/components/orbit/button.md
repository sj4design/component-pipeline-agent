---
system: Orbit (Kiwi.com)
component: Button
url: https://orbit.kiwi/components/button/
last_verified: 2026-03-28
confidence: medium
---

# Button

## Approach
Orbit's Button is designed for a consumer-facing travel app, balancing visual appeal with functional clarity. The system provides a button with Kiwi.com's characteristic colorful, friendly aesthetic — using the brand blue as primary and providing clear semantic color options for different action types. Orbit's button hierarchy is tuned for mobile-first travel booking flows: large touch targets, clear CTA hierarchy, and explicit support for destructive actions (cancelling a booking, removing a passenger). The component also handles loading states, which are important for the booking confirmation flow.

## Key Decisions
1. **type prop for semantic roles** (HIGH) — Orbit uses `type` to distinguish `"primary"`, `"secondary"`, `"critical"`, `"white"`, `"success"` etc. The `"critical"` type for destructive actions is more explicit than a `"danger"` variant, reflecting the high-stakes nature of travel booking actions (cancellation, deletion).
2. **fullWidth for mobile booking flows** (HIGH) — `fullWidth` is a heavily used prop in Kiwi.com's mobile booking flow where CTAs span the full screen width. The component handles this as a layout mode rather than requiring CSS overrides.
3. **Icon support with iconLeft/iconRight** (MEDIUM) — Named icon components from Orbit's icon set can be placed at either end. The booking flow uses iconLeft for "search" type context icons and iconRight for "next" navigation indicators.

## Notable Props
- `type`: `"primary" | "secondary" | "critical" | "white" | "success" | "warning" | "info"`
- `size`: `"small" | "normal" | "large"`
- `fullWidth`: boolean for 100% width
- `loading`: shows spinner, disables interaction
- `iconLeft` / `iconRight`: Orbit icon components
- `disabled`: standard disabled state
- `href` / `external`: render as anchor with link behavior

## A11y Highlights
- **Keyboard**: Native button or anchor behavior; loading state prevents double-submission
- **Screen reader**: Loading state announces; icon-only buttons require title prop for label
- **ARIA**: `aria-busy` during loading; `role="button"` maintained when rendered as anchor

## Strengths & Gaps
- **Best at**: Mobile-first full-width CTA; critical/destructive semantic type; loading state for booking flows
- **Missing**: No split button or button group; limited to Orbit's icon set for icon props
