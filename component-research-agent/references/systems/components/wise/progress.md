---
system: Wise Design
component: Progress
url: https://wise.design/components/progress
last_verified: 2026-03-28
confidence: low
---

# Progress

## Approach
Wise's Progress indicator is used for transfer processing status, profile completion, and onboarding step progress in their financial product. Transfer progress visualization is important for user confidence in financial operations.

## Key Decisions
1. **Transfer status progress** (MEDIUM) — Showing financial transfer processing stages.
2. **Onboarding completion** (MEDIUM) — Profile/verification completion progress.
3. **Clean visual** (LOW) — Minimal progress styling consistent with Wise's aesthetic.

## Notable Props
- `value`: Progress percentage

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Progress announced
- **ARIA**: role="progressbar" expected

## Strengths & Gaps
- **Best at**: Financial transfer and onboarding progress display
- **Missing**: Low confidence — limited documentation
