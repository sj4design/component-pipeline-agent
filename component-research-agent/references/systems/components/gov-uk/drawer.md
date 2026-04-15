---
system: GOV.UK Design System
component: Drawer
url: https://design-system.service.gov.uk/components/
last_verified: 2026-03-28
confidence: high
---

# Drawer

## Approach
GOV.UK Design System does not include a Drawer component. Slide-in panel overlays require JavaScript for animation and focus management, and the off-canvas pattern is associated with complex application navigation that is atypical for GOV.UK's linear transactional service model. Navigation in GOV.UK services follows a hierarchical page structure, not sidebar drawer navigation.

## Key Decisions
1. **No drawer component** (HIGH) — GOV.UK services use full-page navigation patterns rather than side drawers. The complexity of accessible focus trapping and the JavaScript dependency makes drawer patterns incompatible with GOV.UK's core design principles.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No drawer; teams must build custom if needed, or reconsider the navigation pattern
