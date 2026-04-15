---
system: Base Web (Uber)
component: Empty State
url: https://baseweb.design/components/
last_verified: 2026-03-28
confidence: medium
---

# Empty State

## Approach
Base Web does not provide a dedicated Empty State component. Uber's internal products compose empty states using existing Base Web primitives — typically a combination of ParagraphMedium or HeadingSmall text components with optional icon integration. The lack of a dedicated component reflects Base Web's focus on primitive building blocks over opinionated composite patterns.

## Key Decisions
1. **No empty-state component** (HIGH) — Base Web provides low-level typography and layout primitives. Empty states are considered application-level patterns composed by product teams, not a reusable system component.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No empty state; teams compose from Typography and Block components
