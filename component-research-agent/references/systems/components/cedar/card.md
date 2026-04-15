---
system: REI Cedar
component: Card
url: https://cedar.rei.com/components/card
last_verified: 2026-03-28
confidence: medium
---

# Card

## Approach
REI Cedar's Card is used extensively in REI's e-commerce for product cards (image + name + price + rating), article/content cards, and promotional feature cards. Cedar's Card has a rich media/image slot as a first-class feature given the product card use case. The component is Vue-based with slot-based content areas.

## Key Decisions
1. **Product card optimization** (HIGH) — Card has a dedicated image/media slot for product photography, the primary card use case on REI.com product listing pages.
2. **Link card pattern** (HIGH) — Product cards are fully clickable links to product detail pages; Cedar's Card supports link card semantics with correct anchor wrapping.
3. **Horizontal and vertical layouts** (MEDIUM) — Card supports both vertical (product grid) and horizontal (search result list) layout orientations for REI's different product display contexts.

## Notable Props
- `tag`: The root HTML element (defaults to div, can be 'a' for link cards)
- `mediaImage`: Image slot for card media
- `orientation`: Vertical vs horizontal layout

## A11y Highlights
- **Keyboard**: Link card is focusable; focus state visible per Cedar tokens
- **Screen reader**: Product image has meaningful alt; link card announces as link with card title
- **ARIA**: Link card wraps appropriately; image alt text required

## Strengths & Gaps
- **Best at**: Product card patterns; image/media slot; link card pattern; horizontal/vertical orientation
- **Missing**: Medium confidence; some Vue API details may differ
