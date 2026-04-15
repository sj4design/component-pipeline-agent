---
system: Dell Design System
component: Tabs
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Tabs

## Approach
Dell Design System's Tabs are used in enterprise management consoles for organizing configuration sections, specification views, and monitoring dashboards. The B2B enterprise context means tabs organize dense technical information across configuration categories. Limited public documentation means confidence is low.

## Key Decisions
1. **Configuration section organization** (MEDIUM) — Tabs primarily serve configuration and spec organization use cases in management interfaces rather than marketing or content browsing patterns.
2. **Enterprise information density** (LOW) — Tab panels contain dense technical content appropriate for power users in IT management roles.
3. **Consistent form integration** (LOW) — Tabs integrate with Dell's form and layout system for configuration page patterns.

## Notable Props
- `selectedTab`: Controlled selection
- `onChange`: Selection callback

## A11y Highlights
- **Keyboard**: Standard tablist keyboard navigation expected
- **Screen reader**: ARIA tab pattern expected
- **ARIA**: Standard tab ARIA expected

## Strengths & Gaps
- **Best at**: Enterprise configuration organization; management console patterns
- **Missing**: Low confidence — limited public documentation; verify before use
