---
system: Playbook (Power Home Remodeling)
component: LoadingInline
url: https://playbook.powerapp.cloud/kits/loading_inline
last_verified: 2026-03-28
confidence: medium
---

# LoadingInline (Spinner)

## Approach
Playbook provides a LoadingInline component for inline loading indicators in their CRM — showing loading states during async data fetches, form submissions, and CRM record operations. Available in both React and ViewComponent implementations.

## Key Decisions
1. **Inline loading for CRM operations** (HIGH) — Designed for inline display alongside content being loaded in CRM records.
2. **Dual React/Rails** (HIGH) — Both implementations available.
3. **Accessible label** (MEDIUM) — Loading context communicated accessibly.

## Notable Props
- `size`: Size variant
- `label`: Accessible description

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Loading state announced with label
- **ARIA**: aria-label or role="status" for loading announcement

## Strengths & Gaps
- **Best at**: Inline CRM loading states; dual framework
- **Missing**: Medium confidence; overlay loading pattern details uncertain
