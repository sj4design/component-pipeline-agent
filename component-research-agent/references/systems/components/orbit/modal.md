---
system: Orbit (Kiwi.com)
component: Modal
url: https://orbit.kiwi/components/modal/
last_verified: 2026-03-28
confidence: medium
---

# Modal

## Approach
Orbit's Modal is designed for Kiwi.com's booking flow use cases: trip confirmation details, seat selection overlays, passenger information forms, and booking error notifications. The component supports a mobile-first full-screen mode and a standard dialog mode. Orbit's Modal includes a built-in close button, header, and footer structure, reflecting the common patterns in travel booking UIs where modals have clear titles, content areas, and action buttons.

## Key Decisions
1. **Mobile-first full-screen design** (HIGH) — Orbit's Modal is designed to work as a full-screen overlay on mobile devices (the primary Kiwi.com platform) and a centered dialog on desktop. The `isMobileFullPage` behavior ensures the booking flow works well on small screens.
2. **Section component inside Modal** (MEDIUM) — Orbit's Modal content uses its Section component for visual grouping, supporting the pattern of modals with multiple distinct information sections (e.g., flight details, passenger info, extras) without scrolling confusion.
3. **fixedFooter prop** (MEDIUM) — The `fixedFooter` keeps action buttons visible even when modal content is scrolled. For booking confirmation flows, the "Confirm booking" button must always be visible, making this a critical feature.

## Notable Props
- `onClose`: close callback (required)
- `title` / `description`: modal header content
- `fixedFooter`: boolean — pins footer to bottom during scroll
- `size`: `"small" | "normal" | "large" | "extraLarge"`
- `isMobileFullPage`: boolean — full screen on mobile

## A11y Highlights
- **Keyboard**: Focus trapped; Escape closes; Tab cycle through interactive elements
- **Screen reader**: role="dialog" with aria-labelledby from title; background content aria-hidden
- **ARIA**: Standard dialog ARIA; title prop ensures accessible label

## Strengths & Gaps
- **Best at**: fixedFooter for booking CTAs; mobile full-screen mode; travel workflow structure
- **Missing**: No non-modal dialog variant; limited customization outside of travel patterns
