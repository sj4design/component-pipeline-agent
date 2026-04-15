---
system: GOV.UK Design System
component: Skeleton
url: https://design-system.service.gov.uk/components/
last_verified: 2026-03-28
confidence: high
---

# Skeleton

## Approach
GOV.UK Design System does not include a Skeleton loading component. GOV.UK's progressive enhancement philosophy means pages should load meaningful content on the server; JavaScript-dependent loading states are avoided. If a page requires a loading state, GOV.UK guidance suggests using a full-page loading message or spinner (also not a formal component) rather than skeleton screens, which imply a SPA architecture incompatible with the server-rendered model.

## Key Decisions
1. **No skeleton component** (HIGH) — Skeleton screens are a client-side rendering pattern. GOV.UK services render content server-side, so by the time a page loads, content is already present. The design system does not cater to SPA-style progressive content loading.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No skeleton; not applicable to GOV.UK's server-rendered model
