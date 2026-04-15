---
system: Playbook (Power Home Remodeling)
component: Dropdown
url: https://playbook.powerapp.cloud/kits/dropdown
last_verified: 2026-03-28
confidence: medium
---

# Dropdown (Menu)

## Approach
Playbook's Dropdown menu is used in CRM for contextual actions on records, navigation dropdowns, and option selection. Dual React/Rails implementation. Standard dropdown menu with items, separators, and icon support.

## Key Decisions
1. **CRM contextual actions** (HIGH) — Used for record action menus in their CRM (edit, delete, schedule, assign).
2. **Dual React/Rails** (HIGH) — Cross-stack consistent implementation.
3. **Icon + label items** (MEDIUM) — Menu items support icons for visual action recognition.

## Notable Props
- `trigger`: Trigger element
- `items`: Menu items array
- `onSelect`: Selection callback

## A11y Highlights
- **Keyboard**: Arrow keys; Enter/Space activate; Escape closes
- **Screen reader**: Menu role; item announcements
- **ARIA**: role="menu"; aria-haspopup; aria-expanded

## Strengths & Gaps
- **Best at**: CRM action menus; dual framework
- **Missing**: Medium confidence; sub-menu and advanced features uncertain
