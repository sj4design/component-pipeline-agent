---
system: REI Cedar
component: Modal
url: https://cedar.rei.com/components/modal
last_verified: 2026-03-28
confidence: medium
---

# Modal

## Approach
REI Cedar's Modal is a Vue component used for focused interactions in REI's e-commerce context — size guides, product detail overlays, location selection, and confirmation dialogs. Cedar's modal implementation emphasizes smooth animation and clear visual layering with REI's design language. The system has full-screen mobile behavior, critical given REI's significant mobile commerce traffic.

## Key Decisions
1. **Full-screen on mobile** (HIGH) — Modal transitions to full-screen on small viewports, providing better usability on mobile devices for REI's commerce-heavy mobile audience.
2. **Vue slot-based content** (HIGH) — Header, body, and footer are Vue slots allowing rich, structured content including product images, size charts, and form elements.
3. **Overlay dismiss control** (MEDIUM) — Overlay click dismiss can be disabled for required workflow steps where modal must be explicitly acted upon.

## Notable Props
- `opened`: Boolean open state
- `onClosed`: Close callback
- `overlayDismiss`: Boolean to enable/disable overlay click dismiss
- `fullScreen`: Boolean for full-screen variant

## A11y Highlights
- **Keyboard**: Focus trap; Escape closes; Tab cycles through focusable elements
- **Screen reader**: Dialog role; title provides accessible name
- **ARIA**: role="dialog"; aria-modal; aria-labelledby

## Strengths & Gaps
- **Best at**: Mobile full-screen handling; commerce overlay patterns; Vue slot flexibility
- **Missing**: Medium confidence on some API details
