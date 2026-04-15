---
system: GitHub Primer
component: Overlay / Drawer
url: https://primer.style/components/overlay
last_verified: 2026-03-28
confidence: medium
---

# Overlay / Drawer

## Approach
GitHub Primer's Overlay component is a base primitive for all overlay/panel UIs. For drawer/side panel patterns, developers compose Overlay with position styling. Primer doesn't have a dedicated named "Drawer" component as of recent versions; instead, Overlay handles both modal dialog and side panel use cases through configuration.

## Key Decisions
1. **Overlay as base for all overlays** (HIGH) — Single Overlay primitive handles modal, sheet, and side-panel patterns through variant/position configuration, keeping the overlay system unified.
2. **Side anchoring** (MEDIUM) — When configured for side panels, Overlay can attach to the edge of the viewport for drawer-like behavior.
3. **Focus trap and return** (HIGH) — Overlay manages all focus trap and focus return behavior regardless of overlay type (modal vs drawer).

## Notable Props
- `initialFocusRef`: Element to focus on open
- `returnFocusRef`: Element to focus on close
- `onEscape`: Escape key handler
- `position`: For side-panel positioning

## A11y Highlights
- **Keyboard**: Focus trapped inside; Escape closes; focus returns to trigger
- **Screen reader**: Depends on configuration; dialog role for modal overlays
- **ARIA**: focus trap; aria-modal when applicable

## Strengths & Gaps
- **Best at**: Unified overlay primitive for all overlay patterns; focus management
- **Missing**: Medium confidence — no dedicated Drawer component; composition requires more developer effort
