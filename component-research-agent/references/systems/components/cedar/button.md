---
system: REI Cedar
component: Button
url: https://cedar.rei.com/components/button
last_verified: 2026-03-28
confidence: medium
---

# Button

## Approach
REI Cedar's Button is a Vue component reflecting REI's outdoor retail brand with a strong emphasis on clear action hierarchy. Cedar's buttons are used across REI's e-commerce platform, from product add-to-cart actions to account management. The system provides brand-aligned variants (primary brand green, secondary, ghost) with strong mobile sizing defaults given REI's high mobile traffic.

## Key Decisions
1. **Full-width mobile variant** (HIGH) — Cedar buttons support full-width display, critical for mobile e-commerce CTAs where full-width buttons improve tap accessibility and visual weight on small screens.
2. **Icon integration** (MEDIUM) — Icon slot support for leading/trailing icons within buttons, used for cart, wishlist, and navigation action patterns.
3. **Size variants sized for touch** (HIGH) — Large default touch target size reflecting REI's mobile-first commerce context and accessibility requirements.

## Notable Props
- `responsive`: Boolean for full-width on mobile
- `iconLeft` / `iconRight`: Icon slot names for icon+label buttons
- `disabled`: Disabled state
- `size`: Size variant control

## A11y Highlights
- **Keyboard**: Native button activation; focus ring styled per Cedar tokens
- **Screen reader**: Standard button semantics; icon buttons require aria-label
- **ARIA**: aria-label for icon-only; aria-disabled patterns

## Strengths & Gaps
- **Best at**: Mobile/touch-optimized sizing; full-width responsive pattern; REI brand alignment
- **Missing**: Medium confidence — some Vue-specific API details may differ from current docs
