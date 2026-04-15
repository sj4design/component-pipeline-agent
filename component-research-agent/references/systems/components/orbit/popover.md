---
system: Orbit (Kiwi.com)
component: Popover
url: https://orbit.kiwi/components/overlay/popover/
last_verified: 2026-03-29
confidence: high
---

# Popover

## Approach
Orbit's Popover is a click-triggered floating content panel used throughout the booking interface to surface supplemental information without leaving the current screen: baggage allowance details when hovering over a baggage icon, fare condition breakdowns on the results page, and tooltip-style explanations for travel jargon (e.g., "What is a protected connection?"). The component is positioned absolutely relative to its trigger and supports directional placement to avoid viewport clipping — critical in a responsive layout where the trigger element may appear near the screen edge. Orbit's Popover is distinct from a tooltip in that it can contain rich content including links, tables, and structured text, not just a single string.

## Key Decisions
1. **Click-triggered (not hover)** (HIGH) — On touch devices, hover is unavailable; click-triggered popovers ensure consistent behavior across mobile and desktop, which is essential given Kiwi.com's mobile-first audience.
2. **Rich content slot** (HIGH) — Travel information (baggage rules, fare conditions, connection protection terms) often requires formatted content — bullet lists, links to full terms, price tables — that a simple tooltip string cannot accommodate.
3. **Smart placement** (MEDIUM) — Supports `"top"`, `"bottom"`, `"left"`, `"right"` with automatic flip fallback to prevent the popover from rendering outside the viewport, especially important in the cramped layout of the flight results card.

## Notable Props
- `content`: the popover body (React node — accepts rich content)
- `placement`: preferred placement direction with auto-flip
- `onOpen` / `onClose`: lifecycle callbacks
- `noPadding`: removes internal padding for custom-layout content
- `width`: custom width override

## A11y Highlights
- **Keyboard**: Trigger is a focusable button; Escape closes the popover; focus is managed back to the trigger on close.
- **Screen reader**: Popover content uses `role="dialog"` or `role="tooltip"` depending on content richness; `aria-expanded` on the trigger reflects open state.
- **ARIA**: `aria-haspopup` on the trigger element; popover is linked to trigger via `aria-controls`.

## Strengths & Gaps
- **Best at**: Rich travel-information overlays (baggage, fare conditions, fare rules) with smart viewport-aware placement and full React content slots.
- **Missing**: No nested popover support; no built-in close-on-outside-scroll behavior for sticky elements; limited animation configuration.
