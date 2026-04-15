---
system: Playbook (Power Home Remodeling)
component: Breadcrumb
url: https://playbook.powerapp.cloud/kits/breadcrumb
last_verified: 2026-03-28
confidence: medium
---

# Breadcrumb

## Approach
Playbook's Breadcrumb shows navigation hierarchy in their CRM — the path from dashboard to a specific job record or customer detail. Dual React/Rails. Standard nav/ol/li structure.

## Key Decisions
1. **CRM navigation hierarchy** (HIGH) — Shows path through CRM dashboard, customer, and job record hierarchy.
2. **Dual React/Rails** (HIGH) — Cross-stack implementation.
3. **Current page indicator** (MEDIUM) — Final item marked as current page without link.

## Notable Props
- `items`: Breadcrumb path array with label and href
- `currentPage`: Final item text

## A11y Highlights
- **Keyboard**: Tab through links; current page not linked
- **Screen reader**: nav landmark; list structure; aria-current on current page
- **ARIA**: aria-label="breadcrumb"; aria-current="page"

## Strengths & Gaps
- **Best at**: CRM navigation hierarchy; dual framework
- **Missing**: Medium confidence; ellipsis truncation uncertain
