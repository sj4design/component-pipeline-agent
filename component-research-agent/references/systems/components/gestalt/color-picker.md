---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Gestalt has no ColorPicker component, and this absence is intentional and deeply rooted in Pinterest's product philosophy. Pinterest is a content discovery platform where color is treated as data and content — it belongs to the Pins, images, and boards that users save and explore, not to a user-customizable UI preference layer. Users on Pinterest do not "choose colors" in the way they might in a productivity tool or creative suite; they consume and organize visual content created elsewhere. Because the product's color surface is entirely controlled by Pinterest's design token system and by the colors inherent in user-uploaded imagery, there is no product use case that would justify a general-purpose color picker in the public design system. Even in Pinterest's business-facing tools (ads, analytics dashboards), color selection is constrained to predefined brand palettes rather than arbitrary hex input, maintaining visual consistency at scale across a global audience.

## Key Decisions
1. **Color is content, not configuration** (HIGH) — Pinterest's mental model treats color as an attribute of discovered content (Pin images, board covers), not a UI customization option. Building a color picker would contradict this foundational principle.
2. **Controlled color system via design tokens** (HIGH) — All UI colors are defined in Gestalt's token system (semantic and base tokens). Allowing arbitrary color selection would introduce visual inconsistency incompatible with Pinterest's visual-first brand.
3. **Business tools use constrained palettes** (MEDIUM) — Pinterest's advertiser and creator tools that do involve color choices (e.g., brand color for ad overlays) use a small predefined palette selector — not in the public Gestalt system — keeping selections on-brand and accessible.
4. **Accessibility compliance at scale** (MEDIUM) — A color picker would expose Pinterest to accessibility compliance risks at scale (40+ languages, global audience). Controlled tokens ensure contrast ratios and color-blind-safe palettes are always enforced.

## Notable Props
- N/A — Component does not exist in Gestalt.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — not applicable; the intentional absence is a strength from a design-system consistency perspective.
- **Missing**: No color picker for any use case in the public system. Teams building tools that require color selection (e.g., internal creative tools) must build custom solutions outside Gestalt, creating fragmentation risk for internal products.
