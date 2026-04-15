---
system: REI Cedar
component: Alert
url: https://cedar.rei.com/components/alert
last_verified: 2026-03-28
confidence: medium
---

# Alert

## Approach
REI Cedar's Alert is used for contextual status messages in e-commerce workflows — checkout error alerts, stock availability warnings, form validation feedback, and system notifications. Cedar's WCAG 2.1 AA commitment ensures proper live region implementation for dynamic alerts.

## Key Decisions
1. **Checkout error handling** (HIGH) — Error alerts in checkout flows are critical for purchase completion; Cedar's alert is designed for high-visibility error communication.
2. **Urgency-based ARIA** (HIGH) — Cedar's accessibility standards ensure role="alert" for urgent messages and role="status" for informational ones.
3. **Dismissible alerts** (MEDIUM) — User-dismissible informational alerts with accessible close button.

## Notable Props
- `type`: success/error/warning/info
- `dismissible`: Close button
- `message`: Alert content

## A11y Highlights
- **Keyboard**: Dismiss button accessible
- **Screen reader**: Appropriate live region per urgency; announced on render
- **ARIA**: role="alert" or role="status"; dismiss button aria-label

## Strengths & Gaps
- **Best at**: Checkout error alerts; WCAG-compliant live regions; Cedar brand alignment
- **Missing**: Medium confidence; some details uncertain
