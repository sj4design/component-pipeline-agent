---
system: Twilio Paste
component: Side Panel (Drawer)
url: https://paste.twilio.design/components/side-panel
last_verified: 2026-03-28
confidence: medium
---

# Side Panel (Drawer)

## Approach
Twilio Paste provides a "Side Panel" component (or similar panel overlay) for sliding panel UIs used in the Twilio console for contextual detail views and configuration panels. This slides in from the edge (typically right) while keeping the main content visible behind it. The component may be built on Paste's Sheet or similar overlay primitive.

## Key Decisions
1. **Side-panel rather than full modal** (HIGH) — Slide-in panel preserves context of the main view while providing a focused editing or detail view, appropriate for console workflows where full-page navigation would disrupt the workflow.
2. **Focus management** (HIGH) — Panel opening moves focus inside; Escape and close button return focus to trigger.
3. **Non-blocking main content** (MEDIUM) — Main content remains partially visible (with overlay), keeping users oriented in the console layout.

## Notable Props
- `isOpen`: Panel open state
- `onDismiss`: Close callback
- `label`: Accessible panel label

## A11y Highlights
- **Keyboard**: Focus moves to panel on open; Tab within panel; Escape closes
- **Screen reader**: role="dialog"; aria-labelledby; aria-modal
- **ARIA**: dialog role; focus trap within panel; aria-modal

## Strengths & Gaps
- **Best at**: Context-preserving task panels; console workflow focus
- **Missing**: Medium confidence on exact Paste component name/API; details may differ from current Paste docs
