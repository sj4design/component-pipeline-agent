---
system: Salesforce Lightning Design System
component: Alert / Prompt
url: https://lightningdesignsystem.com/components/alert/
last_verified: 2026-03-28
confidence: high
---

# Alert

## Approach
Lightning's Alert is a full-width system notification banner displayed at the top of the page, used for critical system messages, maintenance notifications, and important status updates across Salesforce CRM. Lightning alerts are page-level announcements — they span the full viewport width, drawing maximum attention. For inline/contextual messages, Lightning uses the Messaging component.

## Key Decisions
1. **Full-width page-level banner** (HIGH) — Alert spans the full page width as a persistent top-of-page banner, unlike inline contextual alerts — appropriate for system-wide announcements (scheduled maintenance, browser compatibility warnings) that affect the entire session.
2. **Dismissible + non-dismissible** (HIGH) — System-wide maintenance alerts can be non-dismissible; informational alerts have a close button, giving control over urgency communication.
3. **Multiple simultaneous alerts** (MEDIUM) — Multiple Alert banners can stack for scenarios where multiple system conditions exist simultaneously.

## Notable Props
- `variant`: "offline" | "error" | "warning" | "info"
- `labels.heading`: Alert message text
- `onDismiss`: Close callback
- `isDismissible`: Boolean for dismissibility

## A11y Highlights
- **Keyboard**: Dismiss button focusable; links within alert accessible
- **Screen reader**: role="alert" for assertive announcement on render; message content announced
- **ARIA**: role="alert"; assertive live region; dismiss button aria-label

## Strengths & Gaps
- **Best at**: System-wide page-level announcements; full-width visual impact; stacking multiple conditions
- **Missing**: No inline/contextual alert variant (use Messaging); no multi-section structured content
