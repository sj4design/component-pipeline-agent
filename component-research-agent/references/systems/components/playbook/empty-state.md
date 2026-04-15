---
system: Playbook (Power Home Remodeling)
component: Empty State
url: https://playbook.powerapp.cloud/kits/empty_state
last_verified: 2026-03-28
confidence: medium
---

# Empty State

## Approach
Playbook's Empty State addresses zero-data scenarios in their CRM — no jobs assigned, no customers found, first-time feature use. Dual React/Rails. Standard heading + description + CTA structure.

## Key Decisions
1. **CRM zero-data states** (HIGH) — Addresses no results and onboarding scenarios in CRM.
2. **Dual React/Rails** (HIGH) — Both implementations.
3. **CTA action** (MEDIUM) — Primary action button guiding users to resolution.

## Notable Props
- `heading`: Empty state title
- `description`: Explanatory text
- `action`: CTA button
- `image`: Visual element

## A11y Highlights
- **Keyboard**: CTA button accessible
- **Screen reader**: Heading and description; CTA labeled
- **ARIA**: Standard heading hierarchy; accessible action button

## Strengths & Gaps
- **Best at**: CRM zero-data states; dual framework
- **Missing**: Medium confidence; illustration library uncertain
