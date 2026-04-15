---
system: Wise Design
component: Empty State
url: https://wise.design/components/empty-state
last_verified: 2026-03-28
confidence: low
---

# Empty State

## Approach
Wise's Empty State addresses no transaction history, new account states, and zero-balance scenarios in their financial product. Clean, clear messaging consistent with Wise's minimal aesthetic.

## Key Decisions
1. **New account onboarding** (MEDIUM) — First transfer, empty transaction history states.
2. **Clear next action** (MEDIUM) — Guide users to make their first transfer or add funds.
3. **Minimal illustration** (LOW) — Consistent with Wise's clean aesthetic.

## Notable Props
- `heading`, `description`, `action`

## A11y Highlights
- **Keyboard**: CTA accessible
- **Screen reader**: Heading and description
- **ARIA**: Standard empty state patterns

## Strengths & Gaps
- **Best at**: Financial product zero-state onboarding
- **Missing**: Low confidence — limited documentation
