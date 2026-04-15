---
system: shadcn/ui
component: Empty State (no dedicated component)
url: https://ui.shadcn.com
last_verified: 2026-03-28
confidence: high
---

# Empty State

## Approach
shadcn/ui does not have a dedicated Empty State component. Consistent with the system's philosophy of not over-componentizing patterns that are simple enough to compose manually, empty states are implemented by developers using shadcn/ui's existing building blocks (Card, Typography, Button). The community maintains various empty state recipes, but none are part of the official component set.

## Key Decisions
1. **No dedicated component by design** (HIGH) — shadcn/ui explicitly avoids componentizing layout patterns that are project-specific (empty states vary widely in illustration choice, messaging, and CTA).
2. **Developer composition** (HIGH) — Empty states are composed from Card, Heading, Paragraph, and Button — standard components developers already have.
3. **Community recipes** (MEDIUM) — The shadcn/ui community shares empty state patterns but they are not official; various third-party component registries provide empty state components following shadcn/ui conventions.

## Notable Props
- Not applicable — compose using existing shadcn/ui components

## A11y Highlights
- **Keyboard**: Action buttons/links use standard button/link accessibility
- **Screen reader**: Developer controls heading hierarchy and action labels
- **ARIA**: Developer responsibility; standard component composition applies

## Strengths & Gaps
- **Best at**: Maximum flexibility for project-specific empty states; no illustration constraints
- **Missing**: No standard empty state structure; no illustration library; consistency across a product requires discipline
