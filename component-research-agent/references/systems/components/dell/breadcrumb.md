---
system: Dell Design System
component: Breadcrumb
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Breadcrumb

## Approach
Dell Design System's Breadcrumb shows navigation hierarchy in enterprise management portals and Dell.com — product category navigation and configuration path tracking.

## Key Decisions
1. **Enterprise navigation hierarchy** (MEDIUM) — Management console navigation path and e-commerce product categories.
2. **Standard semantics** (LOW) — nav/ol/li structure with aria-current.

## Notable Props
- Standard breadcrumb items with label and href

## A11y Highlights
- **Keyboard**: Tab through links
- **Screen reader**: nav landmark; breadcrumb label; aria-current
- **ARIA**: Standard breadcrumb ARIA

## Strengths & Gaps
- **Best at**: Enterprise and e-commerce navigation paths
- **Missing**: Low confidence — verify before use
