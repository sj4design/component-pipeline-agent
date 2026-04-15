---
system: Playbook (Power Home Remodeling)
component: Message (Alert)
url: https://playbook.powerapp.cloud/kits/message
last_verified: 2026-03-28
confidence: medium
---

# Message (Alert)

## Approach
Playbook uses a "Message" component for inline alert/notification patterns in their CRM — form validation feedback, system status messages, and operation outcome notifications. Dual React/Rails. Standard variant set with icons.

## Key Decisions
1. **CRM status messages** (HIGH) — Inline alert for form feedback and operation status.
2. **Dual React/Rails** (HIGH) — Both implementations.
3. **Variant set** (MEDIUM) — Success, error, warning, info variants.

## Notable Props
- `message`: Alert message text
- `status`: success/error/warning/info
- `dismissible`: Close button support

## A11y Highlights
- **Keyboard**: Dismiss button if present
- **Screen reader**: Live region announcement; message text
- **ARIA**: role="alert" or role="status" per urgency

## Strengths & Gaps
- **Best at**: CRM form and operation feedback; dual framework
- **Missing**: Medium confidence; exact live region implementation uncertain
