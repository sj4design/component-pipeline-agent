---
system: Dell Design System
component: Button
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Button

## Approach
Dell Design System's Button serves enterprise IT management and e-commerce contexts across Dell Technologies products. The button system follows Dell's blue brand palette and supports the action patterns common in server configuration UIs, support portals, and Dell.com commerce. Enterprise B2B context means buttons frequently appear in forms, data tables, and configuration workflows.

## Key Decisions
1. **Enterprise action hierarchy** (MEDIUM) — Variant system addresses the range of actions in enterprise management UIs — primary CTA, secondary, ghost, and potentially destructive for system operations.
2. **Dell brand alignment** (MEDIUM) — Primary button uses Dell's blue, maintaining brand consistency across all Dell digital properties.
3. **Icon button support** (LOW) — Icon buttons likely supported given toolbar patterns in management interfaces.

## Notable Props
- `variant`: Primary, secondary, ghost/outline variants
- `disabled`: Disabled state
- `loading`: Loading state expected

## A11y Highlights
- **Keyboard**: Standard button activation expected
- **Screen reader**: Standard button announcement expected
- **ARIA**: Standard button ARIA patterns expected

## Strengths & Gaps
- **Best at**: Enterprise management UI action patterns; Dell brand consistency
- **Missing**: Low confidence — limited public documentation; verify before use in research
