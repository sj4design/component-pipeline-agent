---
system: Playbook (Power Home Remodeling)
component: Link
url: https://playbook.powerapp.cloud/kits/link
last_verified: 2026-03-28
confidence: medium
---

# Link

## Approach
Playbook's Link component provides styled hyperlinks for CRM navigation — linking to customer records, job details, and related resources. Dual React/Rails. Standard anchor styling with Playbook's brand link colors.

## Key Decisions
1. **CRM record navigation** (HIGH) — Links to CRM records and related resources.
2. **Dual React/Rails** (HIGH) — Both implementations.
3. **Visual variants** (MEDIUM) — Different states and variants for different link contexts.

## Notable Props
- `href`, `target`, `text`

## A11y Highlights
- **Keyboard**: Native anchor activation
- **Screen reader**: Link text announced
- **ARIA**: Native anchor semantics

## Strengths & Gaps
- **Best at**: CRM navigation links; dual framework
- **Missing**: Medium confidence; external link handling uncertain
