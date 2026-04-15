---
system: Nord (Nordhealth)
component: Badge / Tag (nord-badge web component)
url: https://nordhealth.design/components/badge/
last_verified: 2026-03-28
confidence: low
---

# Badge / Tag

## Approach
Nord provides a Badge web component for healthcare status labels — patient status indicators (Active, Discharged, Pending), appointment status (Confirmed, Cancelled), and priority labels (Urgent, Routine). Healthcare badges must convey meaning through text content, not color alone, since clinical staff may be colorblind or using high-contrast modes.

## Key Decisions
1. **Status badges for healthcare** (HIGH) — Healthcare badge colors carry clinical meaning (red = urgent) but must always be accompanied by text labels.
2. **Web component standard** (HIGH) — Portability across clinical systems.

## Notable Props
- `variant` or `color`: status-semantic variants
- Text content via slot
- Verify exact API at nordhealth.design

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior
- **Screen reader**: Text content provides the meaning; color is supplementary
- **ARIA**: No ARIA needed for static badges; text must convey meaning

## Strengths & Gaps
- **Best at**: Healthcare status communication; text-over-color principle
- **Missing**: Verify API; no interactive/removable tags
