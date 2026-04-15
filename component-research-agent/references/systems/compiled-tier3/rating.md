---
component: Rating
tier: 3
last_verified: 2026-03-31
---

# Rating — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available | No rating primitive. Radix provides RadioGroup which can be composed into a star rating, but no dedicated Rating component exists in the primitives library. | high |
| Chakra UI | Not available (v2) / Rating (v3) | Chakra UI v3 (Park UI-based) includes a Rating component with half-star support, custom icons, and size variants. Chakra v2 did not include Rating. Built on Ark UI's rating primitive. | high |
| GOV.UK | Not available | No rating component; government services do not use star ratings — satisfaction is collected via structured text surveys (radio buttons with labeled options like "Very satisfied" to "Very dissatisfied"). | high |
| Base Web (Uber) | StarRating | `StarRating` component for display and input. Supports `numItems` (star count), `value` (selected), `readOnly`. Overrides API for custom star rendering. Used for driver/rider ratings in Uber's rider app. | high |
| Fluent 2 (Microsoft) | Not available | No rating component in Fluent 2. Microsoft products that display ratings (Microsoft Store app ratings) implement custom solutions outside the design system. | high |
| Gestalt (Pinterest) | Not available | No rating component; Pinterest uses "Save" and reaction patterns rather than star-based scoring for content feedback. | medium |
| Mantine | Rating | Full-featured Rating component. `fractions` prop for arbitrary precision (2 = half stars, 4 = quarter stars). `highlightSelectedOnly` to highlight only the selected star (emoji-style). `getSymbol` function for custom icon per position. Sizes xs-xl. `readOnly` for display. | high |
| Orbit (Kiwi.com) | Not available | No rating component; Kiwi.com travel search uses text-based review scores and recommendation percentages rather than star ratings. | medium |
| Evergreen (Segment) | Not available | No rating component; analytics dashboards do not require star-rating input. | medium |
| Nord (Nordhealth) | Not available | No rating component; clinical/healthcare interfaces do not use star ratings for patient or provider feedback — structured questionnaires with validated scales are used instead. | medium |

## Key Decision Patterns

Rating is present in only 3 of 10 Tier 3 systems (Base Web, Chakra v3, Mantine), making it one of the least-adopted components at this tier. The pattern mirrors Tier 2: most design systems consider rating too domain-specific (e-commerce, ride-sharing, app stores) to include as a foundational primitive.

Mantine's `fractions` prop is the most flexible precision model across all tiers. Rather than a boolean `allowHalf`, Mantine accepts any integer denominator — `fractions={2}` for half stars, `fractions={4}` for quarter stars, `fractions={10}` for fine-grained display precision. This is strictly more powerful than Ant Design's binary half/full model. For display of aggregated review scores (e.g., 4.3 stars), `fractions={10}` renders accurate visual representation without rounding to the nearest half.

Mantine's `highlightSelectedOnly` prop enables emoji-style rating where only the chosen position is highlighted rather than all stars up to and including the selection. Standard star ratings fill stars 1 through N (cumulative fill). But for emoji-face ratings ("sad, neutral, happy") or quality-label ratings ("poor, fair, good, excellent"), cumulative fill is semantically wrong — selecting "good" should not also highlight "poor" and "fair." This prop toggles between the two mental models without requiring a separate component.

Mantine's `getSymbol` function receives the star index and returns a ReactNode, enabling per-position custom icons — identical to Ant Design's `character` function. Both Ant and Mantine recognized that rating scales are not always stars: hearts for wishlists, thumbs for approval, emoji faces for satisfaction, custom SVGs for brand-specific scales.

Base Web's `StarRating` is purpose-built for Uber's driver/rider rating workflow. It is more constrained than Ant or Mantine — no half-star support, no custom icons, no fractional precision. However, the Overrides API allows replacing the default star SVG with any React component per star position. Base Web also exposes `onMouseLeave` for canceling hover preview, which is important for touch-to-hover conversion on mobile where hover states must be explicitly cleared.

Chakra UI v3's Rating (via Ark UI) supports `allowHalf`, custom `icon`/`emptyIcon` props, and size variants (xs through xl). It uses a visually hidden radio group internally for a11y. The component is relatively new (added in the v3 rewrite) and less battle-tested than Mantine's or Ant's implementations.

GOV.UK's absence reinforces the same principle seen in its slider omission: interaction patterns requiring precise motor targeting (clicking exactly on the 4th star) are excluded in favor of explicit labeled radio buttons. A government satisfaction survey presents "Very satisfied / Satisfied / Neutral / Dissatisfied / Very dissatisfied" as a standard radio group — structurally equivalent to a 5-star rating but with zero ambiguity about what each option means and full keyboard/AT support by default.

## A11y Consensus

- Interactive rating must use radio group pattern: a container with `role="radiogroup"` (or `<fieldset>`) and each star as `role="radio"` with `aria-checked`. This provides native keyboard navigation (Arrow keys to select, Tab to move focus in/out of group) and screen reader announcement ("3 of 5, radio button, checked").
- Display-only (read-only) rating should use `role="img"` with an `aria-label` describing the precise value: "Rated 4.3 out of 5 stars" — screen readers cannot interpret visual star fill, so the label must contain the numeric value.
- Half-star and fractional display must announce the fractional value in `aria-label`, not round to the nearest whole number — "4.5 out of 5" not "5 out of 5."
- Per-star labels (Ant's `tooltips`, Mantine's label prop) should be announced as the accessible name of each radio option: "1 star — Terrible", "2 stars — Bad", etc.
- Mantine uses visually hidden radio inputs; Base Web uses `role="radio"` on custom elements; Chakra v3 uses visually hidden native radio inputs — all three arrive at the radio group pattern.

## Recommended Use

Reference Mantine for the most flexible rating component in T3: `fractions` for arbitrary precision, `highlightSelectedOnly` for emoji-style scales, and `getSymbol` for per-position custom icons. Reference Base Web for a minimal ride-sharing/review-focused implementation with Overrides. Reference Chakra v3 for a mid-complexity implementation with half-star and custom icon support. For building a custom rating component without a library, use a radio group (`role="radiogroup"` + `role="radio"`) as the a11y foundation, with star icons as visual decoration and `aria-label` on each option announcing the star count.
