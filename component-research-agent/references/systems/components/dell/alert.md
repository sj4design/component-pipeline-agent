---
system: Dell Design System
component: Alert / Message Bar
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Alert / Message Bar

## Approach
Dell Design System's Alert is used for enterprise management and e-commerce status messages — system error notifications, operation completion alerts, and maintenance warnings in management consoles.

## Key Decisions
1. **Enterprise system alerts** (MEDIUM) — System error, maintenance, and operation status in management interfaces.
2. **High-stakes error communication** (MEDIUM) — Enterprise operations with consequences need clear error communication.
3. **Urgency-appropriate ARIA** (LOW) — Live region roles per message urgency.

## Notable Props
- `variant`, `message`, `dismissible`

## A11y Highlights
- **Keyboard**: Dismiss button accessible
- **Screen reader**: Live region announcement
- **ARIA**: Appropriate alert ARIA

## Strengths & Gaps
- **Best at**: Enterprise system error alerts
- **Missing**: Low confidence — verify before use
