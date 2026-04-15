---
system: Power Home Remodeling Playbook
component: Stepper
url: https://playbook.powerapp.cloud
last_verified: 2026-03-28
confidence: medium
---

# Stepper (Steps)

## Approach
Playbook includes a Stepper component used in home remodeling sales and service workflows — guiding homeowners and sales representatives through multi-step processes like project estimation, financing applications, and installation scheduling. The dual React/Rails architecture means the Stepper works in both the customer-facing React app and internal Rails-based admin tools.

## Key Decisions
1. **Multi-step workflow guidance** (HIGH) — Stepper is designed for sales and service process flows that span multiple decisions or information-gathering steps.
2. **Dual React/Rails support** (HIGH) — Available as both a React component and Rails ViewComponent, consistent with Playbook's cross-framework architecture.
3. **Step completion tracking** (MEDIUM) — Steps track completed/current/upcoming states to show progress through longer remodeling project workflows.

## Notable Props
- Standard stepper props expected (current step, steps array)
- React and Rails ViewComponent variants

## A11y Highlights
- **Keyboard**: Step navigation via Tab; interactive steps via Enter
- **Screen reader**: Step progression and current step announced
- **ARIA**: Standard step indicator ARIA patterns expected

## Strengths & Gaps
- **Best at**: Sales/service multi-step flows; dual React/Rails compatibility
- **Missing**: Medium confidence — verify specific props and variants in Playbook docs
