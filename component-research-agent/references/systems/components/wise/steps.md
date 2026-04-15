---
system: Wise Design
component: Stepper (Steps)
url: https://wise.design
last_verified: 2026-03-28
confidence: low
---

# Stepper (Steps)

## Approach
Wise likely includes a step indicator component given its multi-step money transfer and onboarding flows — creating an account, setting up transfers, verifying identity, and adding recipients all involve multi-step processes. Wise's flows tend to be linear and focused, making a simple linear step indicator appropriate.

## Key Decisions
1. **Multi-step financial flows** (MEDIUM) — Step indicators guide users through identity verification, transfer setup, and account creation flows.
2. **Linear progression** (LOW) — Wise's transfer flows are typically linear without branching.

## Notable Props
- Low confidence — specific props not verified

## A11y Highlights
- **Keyboard**: Standard step navigation expected
- **Screen reader**: Step progression announced
- **ARIA**: Standard step indicator ARIA patterns expected

## Strengths & Gaps
- **Best at**: Financial onboarding and transfer step flows
- **Missing**: Low confidence — verify before use
