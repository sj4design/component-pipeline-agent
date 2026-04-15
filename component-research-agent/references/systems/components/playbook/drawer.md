---
system: Playbook (Power Home Remodeling)
component: Drawer
url: https://playbook.powerapp.cloud/kits/drawer
last_verified: 2026-03-28
confidence: medium
---

# Drawer

## Approach
Playbook's Drawer is a sliding panel for CRM detail views and filter panels. Dual React/Rails. Used for customer detail quick-views and filtering interfaces without leaving the current list context.

## Key Decisions
1. **CRM detail quick-view** (HIGH) — Primary use for viewing customer/job details alongside list without navigation.
2. **Dual React/Rails** (HIGH) — Both implementations.
3. **Side slide-in** (MEDIUM) — Slides from right for contextual detail display.

## Notable Props
- `isOpen`: Open state
- `onClose`: Close callback
- `position`: Side of entry

## A11y Highlights
- **Keyboard**: Focus trap; Escape closes; Tab within
- **Screen reader**: role="dialog"; aria-labelledby
- **ARIA**: dialog role; focus management

## Strengths & Gaps
- **Best at**: CRM context preservation; dual framework
- **Missing**: Medium confidence; exact API uncertain
