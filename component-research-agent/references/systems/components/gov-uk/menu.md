---
system: GOV.UK Design System
component: Navigation (Header navigation, not a dropdown Menu)
url: https://design-system.service.gov.uk/components/header/
last_verified: 2026-03-28
confidence: high
---

# Navigation / Menu

## Approach
GOV.UK Design System does not include a dropdown menu component. Navigation in GOV.UK services is handled through the Header (with navigation links) and Service Navigation components. GOV.UK's approach to navigation is flat — multi-level dropdown menus are considered a usability problem for government services serving diverse populations, including users with motor impairments who struggle with hover-activated dropdowns and users with cognitive disabilities who find hierarchical navigation confusing.

## Key Decisions
1. **No dropdown menu** (HIGH) — GOV.UK's user research found that dropdown menus create barriers for significant portions of the population. The preferred pattern is either flat navigation or separate pages for subsections.
2. **Simple navigation as the pattern** (HIGH) — The GOV.UK service pattern uses simple top navigation or breadcrumbs, routing users to the right section rather than showing a hierarchical menu.

## Notable Props
- N/A — component does not exist

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: Flat navigation avoids dropdown accessibility issues
- **Missing**: No dropdown menu for action menus or complex navigation
