---
system: Wise Design
component: Alert / Notification Banner
url: https://wise.design/components/alert
last_verified: 2026-03-28
confidence: low
---

# Alert / Notification Banner

## Approach
Wise's Alert provides inline status messages for financial operation outcomes — transfer confirmation alerts, account verification requirements, and error notifications. Financial alert context demands clear, trustworthy messaging.

## Key Decisions
1. **Financial operation feedback** (MEDIUM) — Error and warning alerts for failed transfers, verification requirements.
2. **Clear visual severity** (MEDIUM) — Success/warning/error clearly differentiated visually.
3. **Dismissible info alerts** (LOW) — Informational alerts user-dismissible.

## Notable Props
- `type`, `message`, `dismissible`

## A11y Highlights
- **Keyboard**: Dismiss button accessible
- **Screen reader**: Live region announcement
- **ARIA**: role="alert" or "status"

## Strengths & Gaps
- **Best at**: Financial operation status alerts
- **Missing**: Low confidence — limited documentation
