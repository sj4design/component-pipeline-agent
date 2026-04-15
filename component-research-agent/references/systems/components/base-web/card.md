---
system: Base Web (Uber)
component: Card (not available as standalone)
url: https://baseweb.design/components/
last_verified: 2026-03-28
confidence: medium
---

# Card

## Approach
Base Web does not have a dedicated Card component. Uber's interfaces use custom surface compositions built from Base Web's typography, spacing tokens, and other primitives. Cards in Uber's products are custom implementations per team. This reflects Base Web's focus on primitive and interactive components rather than layout containers.

## Key Decisions
1. **No card component** (MEDIUM) — Base Web is focused on interactive primitives. Layout containers like cards are left to consumer implementation with Base Web's style system.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Generic card surface component; teams must build custom cards
