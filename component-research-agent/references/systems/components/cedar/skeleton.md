---
system: REI Cedar
component: Skeleton
url: https://cedar.rei.com/components/skeleton
last_verified: 2026-03-28
confidence: medium
---

# Skeleton

## Approach
REI Cedar's Skeleton placeholders handle loading states for product listings, search results, and account data on REI.com. Product card skeletons matching the actual card layout are a key use case.

## Key Decisions
1. **Product card skeletons** (HIGH) — Loading placeholders that match the visual structure of product cards.
2. **Shimmer animation** (MEDIUM) — Gradient shimmer animation for loading state.
3. **prefers-reduced-motion** (HIGH) — Reduced animation per Cedar's accessibility standards.

## Notable Props
- `width`, `height`: Shape sizing

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-hidden; aria-busy on container
- **ARIA**: Appropriate loading state communication

## Strengths & Gaps
- **Best at**: E-commerce product card loading; Cedar accessibility standards
- **Missing**: Medium confidence; exact implementation uncertain
