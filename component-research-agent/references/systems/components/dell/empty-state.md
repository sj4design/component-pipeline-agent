---
system: Dell Design System
component: Empty State
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Empty State

## Approach
Dell Design System's Empty State addresses no search results, empty device inventories, and first-time management setup states in enterprise management tools. Enterprise empty states guide users to add devices or configure systems.

## Key Decisions
1. **Enterprise zero-data** (MEDIUM) — No devices found, no inventory yet configured.
2. **Setup guidance** (MEDIUM) — CTA guides to adding/configuring enterprise resources.
3. **Enterprise illustration** (LOW) — Brand-aligned imagery.

## Notable Props
- `heading`, `description`, `action`

## A11y Highlights
- **Keyboard**: CTA accessible
- **Screen reader**: Heading and description context
- **ARIA**: Standard empty state ARIA

## Strengths & Gaps
- **Best at**: Enterprise management zero-data states
- **Missing**: Low confidence — verify before use
