---
system: Playbook (Power Home Remodeling)
component: Pagination
url: https://playbook.powerapp.cloud/kits/pagination
last_verified: 2026-03-28
confidence: medium
---

# Pagination

## Approach
Playbook's Pagination navigates through CRM record lists — customer lists, job lists, and scheduling queues. Dual React/Rails. Standard numbered pagination with prev/next controls.

## Key Decisions
1. **CRM list navigation** (HIGH) — Navigating paginated CRM data lists.
2. **Dual React/Rails** (HIGH) — Cross-stack implementation.
3. **Current page highlighting** (MEDIUM) — Clear current page indication.

## Notable Props
- `currentPage`: Active page
- `totalPages`: Total page count
- `onPageChange`: Navigation callback

## A11y Highlights
- **Keyboard**: Tab through controls; Enter activates
- **Screen reader**: nav landmark; current page marked
- **ARIA**: nav label; aria-current="page"

## Strengths & Gaps
- **Best at**: CRM list pagination; dual framework
- **Missing**: Medium confidence; items-per-page uncertain
