---
system: Evergreen (Segment/Twilio)
component: SideSheet
url: https://evergreen.segment.com/components/side-sheet
last_verified: 2026-03-29
confidence: high
---

# Drawer

> **Name mapping**: Evergreen calls this component `SideSheet`. It serves the same purpose as a Drawer in other systems — a sliding panel anchored to the side of the viewport.

## Approach
Evergreen's SideSheet is the primary overlay pattern for Segment's entity detail and editing workflows. When a user clicks a source, destination, or audience entry in a list, the detail view slides in from the right as a SideSheet rather than navigating to a new page — a pattern common in B2B SaaS where users want to inspect details while maintaining the list context. This overlay-over-content model is well-suited to dashboards where the list is the primary navigation mechanism. The SideSheet is also used for settings panels, connection wizards, and schema editors, making it one of the most heavily used overlay patterns in Segment's UI.

## Key Decisions
1. **Right-anchored panel over full navigation** (HIGH) — Segment's product research found that users frequently switch between multiple sources/destinations in rapid succession; the SideSheet preserves the list view beneath it, enabling fast context switching without full page navigations.
2. **Width customization** (HIGH) — Different tasks require different panel widths: a simple status view needs 400px; a schema mapping editor may need 800px or wider. Evergreen's SideSheet accepts a `width` prop to accommodate this range.
3. **Animated entrance** (MEDIUM) — The slide-in animation provides spatial context — it communicates "this content came from the right" and reinforces the mental model that the main content is still present beneath the overlay.

## Notable Props
- `isShown`: boolean controlling visibility
- `onCloseComplete`: callback after close animation completes
- `width`: panel width (px or string, defaults to 620)
- `position`: `Position.RIGHT | Position.LEFT | Position.TOP | Position.BOTTOM`
- `preventBodyScrolling`: boolean to lock background scroll
- `containerProps`: passed to the inner content container

## A11y Highlights
- **Keyboard**: Focus is moved inside on open and trapped; Escape closes; Tab cycles through interactive content; focus returns to trigger on close.
- **Screen reader**: `role="dialog"` with `aria-modal="true"`; `aria-labelledby` points to the title when present.
- **ARIA**: Background content receives `aria-hidden="true"` while the SideSheet is open.

## Strengths & Gaps
- **Best at**: Entity detail and editing panels in B2B dashboards; flexible width for varying content density; multi-position support; clean animation.
- **Missing**: No built-in header/footer scaffold (teams must compose their own title bar and action buttons); no snap-point or partial-open state; no mobile bottom-sheet fallback.
