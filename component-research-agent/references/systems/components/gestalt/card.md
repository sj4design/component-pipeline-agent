---
system: Gestalt (Pinterest)
component: Module / TileData
url: https://gestalt.pinterest.systems/web/module
last_verified: 2026-03-28
confidence: medium
---

# Card (via Module / TileData)

## Approach
Gestalt's primary "card" component is Module — a surface container with collapsible sections. For data cards (metrics, KPIs), Gestalt has TileData. For image-centric pins (Pinterest's core), the Pin component handles the pin card. Gestalt doesn't have a generic Card because Pinterest's card needs are very domain-specific. Module handles settings card, TileData handles analytics cards, and Pin handles content cards.

## Key Decisions
1. **Domain-specific card components** (HIGH) — Pinterest's diverse card types (pin, board, user profile, metric) are each domain-specific enough to warrant their own component rather than a generic card.
2. **Module for expandable content** (MEDIUM) — Module is the primary card-like container for settings and info display with optional expand/collapse.

## Notable Props
- Module: `title`, `type` (info/error/warning/success), expandable
- TileData: `title`, `value`, `trend`, `selected`

## A11y Highlights
- **Keyboard**: Module expansion is keyboard accessible
- **Screen reader**: Module heading and content announced
- **ARIA**: Appropriate container semantics

## Strengths & Gaps
- **Best at**: Pinterest-specific domain cards; TileData for metrics; Module for expandable info
- **Missing**: Generic card container; image + text card pattern
