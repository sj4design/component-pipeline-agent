---
system: Fluent 2 (Microsoft)
component: Empty State
url: https://fluent2.microsoft.design/components/web/react/
last_verified: 2026-03-28
confidence: medium
---

# Empty State

## Approach
Fluent 2 does not have a dedicated Empty State component. Microsoft's products compose empty states using Fluent 2 Text, Image, and Button components. Some Microsoft design documentation provides guidance on empty state patterns (using illustrations from Microsoft's illustration library with a title and description), but there is no code component encapsulating this pattern.

## Key Decisions
1. **No empty-state component** (MEDIUM) — Fluent 2 provides primitive building blocks. Empty states are product-level composition patterns. Microsoft's design guidance recommends illustration + title + description + optional action but does not codify this as a component.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No empty state component; teams compose from Text, Image, and Button
