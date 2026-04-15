---
system: Nord (Nordhealth)
component: Toast / Notification (may be via Alert)
url: https://nordhealth.design/components/
last_verified: 2026-03-28
confidence: low
---

# Toast / Notification

## Approach
Nord may provide a notification or toast pattern through its Alert component or a dedicated notification web component. In healthcare applications, transient notifications are appropriate for non-critical status updates (save confirmation, session timeout warning). However, for critical healthcare information (medication alerts, critical lab values), persistent in-page alerts are preferred over auto-dismissing toasts.

## Key Decisions
1. **Healthcare notification safety** (HIGH) — Critical information in clinical systems should not auto-dismiss. Any toast-like component in Nord likely has conservative defaults (longer duration or no auto-dismiss) for this reason.

## Notable Props
- Likely: message, type/intent (success/warning/error), duration
- Verify exact component name and API at nordhealth.design

## A11y Highlights
- **Screen reader**: Notification content announced; critical alerts use assertive live region
- **ARIA**: role="alert" for critical clinical notifications

## Strengths & Gaps
- **Best at**: Healthcare-appropriate notification design
- **Missing**: Verify component existence and API at nordhealth.design — confidence is low
