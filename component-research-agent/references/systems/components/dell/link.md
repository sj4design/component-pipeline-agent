---
system: Dell Design System
component: Link
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Link

## Approach
Dell Design System's Link provides styled anchors for Dell.com and enterprise management portals — product links, documentation references, and management console navigation.

## Key Decisions
1. **Product and documentation links** (MEDIUM) — Dell.com product navigation and technical documentation references.
2. **Dell brand link styling** (MEDIUM) — Dell's blue link color and hover states.

## Notable Props
- `href`, `target`

## A11y Highlights
- **Keyboard**: Native anchor activation
- **Screen reader**: Link text announced
- **ARIA**: Native anchor semantics

## Strengths & Gaps
- **Best at**: Dell.com and enterprise portal navigation links
- **Missing**: Low confidence — verify before use
