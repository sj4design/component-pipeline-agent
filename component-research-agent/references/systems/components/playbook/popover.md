---
system: Playbook (Power Home Remodeling)
component: Popover
url: https://playbook.powerapp.cloud/kits/popover
last_verified: 2026-03-28
confidence: medium
---

# Popover

## Approach
Playbook's Popover provides contextual information overlays in their CRM — inline help content, record quick-view panels, and contextual action panels. Dual React/Rails. Standard anchored popover with placement control.

## Key Decisions
1. **CRM contextual panels** (HIGH) — Used for quick-view and inline help in CRM.
2. **Dual React/Rails** (HIGH) — Cross-stack consistent behavior.
3. **Placement control** (MEDIUM) — Multiple placement directions for CRM layout contexts.

## Notable Props
- `trigger`: Anchor element
- `placement`: Position direction

## A11y Highlights
- **Keyboard**: Trigger opens; Escape closes; Tab within
- **Screen reader**: dialog role; focus management
- **ARIA**: aria-haspopup; aria-expanded; focus return on close

## Strengths & Gaps
- **Best at**: CRM contextual overlays; dual framework
- **Missing**: Medium confidence; exact implementation uncertain
