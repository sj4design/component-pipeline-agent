---
system: Wise Design
component: Tooltip
url: https://wise.design/components/tooltip
last_verified: 2026-03-28
confidence: low
---

# Tooltip

## Approach
Wise's Tooltip provides supplementary information in their financial product — explaining fee structures, transaction statuses, and currency information. Financial products use tooltips heavily to explain complex concepts (exchange rates, fees) without cluttering the main interface. Wise's clean design applies to tooltip styling with minimal decoration.

## Key Decisions
1. **Financial explanation use case** (MEDIUM) — Primary use case is explaining financial concepts and fees inline, requiring clear readable tooltip content.
2. **Clean visual treatment** (MEDIUM) — Consistent with Wise's minimal aesthetic.
3. **Placement control** (LOW) — Standard placement options expected.

## Notable Props
- `content`: Tooltip text
- `placement`: Direction

## A11y Highlights
- **Keyboard**: Focus trigger; Escape dismiss
- **Screen reader**: Standard tooltip announcement
- **ARIA**: role="tooltip"; aria-describedby

## Strengths & Gaps
- **Best at**: Financial explanation tooltips; clean minimal styling
- **Missing**: Low confidence — limited public documentation
