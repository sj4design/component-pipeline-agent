---
system: Salesforce Lightning Design System
component: Skeleton / Placeholder
url: https://lightningdesignsystem.com/utilities/skeleton/
last_verified: 2026-03-28
confidence: medium
---

# Skeleton / Placeholder

## Approach
Lightning provides skeleton placeholder utilities for loading states in CRM pages. Lightning's skeleton patterns are designed to match the structure of specific CRM content types — record detail page layouts, list views, and related list placeholders. The system provides pre-built skeleton structures that mirror the actual content layout, creating a "content-accurate" loading experience.

## Key Decisions
1. **Content-accurate skeletons** (HIGH) — Skeleton placeholders are designed to match the visual structure of actual CRM content (record field layout, list view table structure), reducing layout shift when content loads.
2. **CSS utility approach** (MEDIUM) — Implemented as utility classes applied to placeholder elements rather than a complex component, keeping the implementation lightweight.
3. **Shimmer animation** (MEDIUM) — Gradient shimmer animation communicates active loading state, prefers-reduced-motion should disable it.

## Notable Props
- Utility classes applied to placeholder elements (no component API per se)
- `.slds-is-loading`: Applied to container during loading

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-busy on loading container; screen reader context preserved
- **ARIA**: aria-busy="true" on loading sections; skeleton content is aria-hidden

## Strengths & Gaps
- **Best at**: Pre-built skeleton patterns matching CRM page layouts; content-accurate loading states
- **Missing**: Medium confidence on exact implementation; CSS utility rather than component
