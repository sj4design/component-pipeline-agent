---
system: Dell Design System
component: Skeleton
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Skeleton

## Approach
Dell Design System's Skeleton provides loading placeholders for management dashboard data, device inventory lists, and product catalog loading on Dell properties.

## Key Decisions
1. **Management data loading** (MEDIUM) — Placeholders for inventory and dashboard loading states.
2. **Product listing loading** (LOW) — E-commerce product loading states.

## Notable Props
- `width`, `height`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-hidden; aria-busy expected
- **ARIA**: Standard skeleton ARIA

## Strengths & Gaps
- **Best at**: Enterprise management loading states
- **Missing**: Low confidence — verify before use
