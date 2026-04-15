---
system: GOV.UK Design System
component: Popover
url: https://design-system.service.gov.uk/components/
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
GOV.UK Design System does not include a Popover component. Interactive floating overlays that require JavaScript for positioning and focus management conflict with the design system's progressive enhancement philosophy. GOV.UK provides Details (disclosure widget) as the recommended alternative for additional information that does not need absolute positioning.

## Key Decisions
1. **No popover component** (HIGH) — GOV.UK research has found that popovers can be difficult to discover, may not work reliably on touch devices, and create accessibility challenges. The Details component provides a no-JS in-flow alternative for supplementary information.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No popover; teams needing contextual help should use Details or inline help text
