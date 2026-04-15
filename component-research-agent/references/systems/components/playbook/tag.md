---
system: Playbook (Power Home Remodeling)
component: Badge
url: https://playbook.powerapp.cloud/kits/badge
last_verified: 2026-03-28
confidence: medium
---

# Badge (Tag)

## Approach
Playbook's Badge/Tag is used for status labels and category indicators in their CRM — job status badges, priority indicators, and team/role tags. Dual React/Rails support. Color variants communicate different status categories in the CRM workflow.

## Key Decisions
1. **CRM status labels** (HIGH) — Primary use for job and customer record status indication.
2. **Color variant system** (MEDIUM) — Multiple color variants for different status categories.
3. **Removable variant** (MEDIUM) — May include removable chips for multi-select filter patterns.

## Notable Props
- `text`: Badge label
- `color` / `status`: Variant
- `removable`: Remove button

## A11y Highlights
- **Keyboard**: Non-interactive badges not in tab order; remove button if present is focusable
- **Screen reader**: Label text announced
- **ARIA**: Standard label/status pattern

## Strengths & Gaps
- **Best at**: CRM status labels; dual framework
- **Missing**: Medium confidence; exact feature set uncertain
