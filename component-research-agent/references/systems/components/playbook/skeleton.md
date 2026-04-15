---
system: Playbook (Power Home Remodeling)
component: Skeleton
url: https://playbook.powerapp.cloud/kits/skeleton
last_verified: 2026-03-28
confidence: medium
---

# Skeleton

## Approach
Playbook's Skeleton provides loading state placeholders for CRM data views. Dual React/Rails. Animated placeholders for loading records, dashboards, and list views.

## Key Decisions
1. **CRM loading states** (HIGH) — Placeholders for loading CRM records and dashboards.
2. **Dual React/Rails** (HIGH) — Both implementations.
3. **Pulse animation** (MEDIUM) — Visual loading pulse animation.

## Notable Props
- `width`, `height`: Shape configuration
- `variant`: Text/image/block variants

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-hidden; container aria-busy
- **ARIA**: aria-busy on loading container

## Strengths & Gaps
- **Best at**: CRM loading state placeholders; dual framework
- **Missing**: Medium confidence; exact API uncertain
