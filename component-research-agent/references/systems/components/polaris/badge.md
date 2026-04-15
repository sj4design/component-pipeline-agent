---
system: Shopify Polaris
component: Badge
url: https://polaris.shopify.com/components/badge
last_verified: 2026-03-28
---

# Badge

## Approach
Shopify Polaris's Badge component is purpose-built for e-commerce merchant interfaces, which shapes every design decision in the component. In Shopify's admin context, badges communicate order status (Paid, Pending, Refunded), product availability (Active, Archived, Draft), and fulfillment states (Fulfilled, Partially fulfilled, Unfulfilled). This means Polaris Badge is fundamentally a status indicator — a categorization label with strong semantic color mapping — rather than a notification count badge. The component reflects Polaris's merchant-centric design philosophy: merchants need to scan status at a glance across dense lists of orders and products, so the badge must be immediately readable and semantically unambiguous. Polaris does not implement a notification-count badge pattern; the component has no concept of a numeric count or position anchoring.

## Key Decisions
1. **Semantic tone system** (HIGH) — Polaris Badge uses named tones (`success`, `info`, `attention`, `warning`, `critical`, `new`, `magic`, `read-only`) rather than arbitrary colors. This is a deliberate information-architecture decision: in merchant contexts, a badge's color must carry a consistent meaning across every screen in the admin. If "red" means critical in one place and just decorative in another, merchants lose the ability to scan status quickly. The tone system enforces this contract.
2. **Progress indicator integration** (HIGH) — Polaris Badge supports a `progress` prop (`incomplete`, `partiallyComplete`, `complete`) that renders a partial-fill icon inside the badge. This is unique among the Tier 1 systems and directly addresses Shopify's fulfillment workflow needs, where an order can be partially fulfilled. The visual metaphor of a partially filled circle lets merchants understand state without reading text.
3. **No numeric count support** (MEDIUM) — Polaris Badge is explicitly for status labels, not notification counts. This is a scope decision: Shopify's admin UI handles notification counts through a different pattern (activity feed, sidebar counts), keeping Badge focused on a single, well-understood job.
4. **Size variants** (LOW) — Badge supports `small` and default sizes. The small variant exists for use in data tables where vertical space is constrained and the badge competes with other dense content. Default size is used in detail pages and cards where there's more breathing room.

## Notable Props
- `tone`: The core semantic prop — determines color and meaning (success, warning, critical, etc.)
- `progress`: Unique to Polaris — renders a partial-fill icon for workflow state (incomplete/partiallyComplete/complete)
- `size`: sm | default — respects table density requirements

## A11y Highlights
- **Keyboard**: No keyboard interaction — Badge is a non-interactive display element
- **Screen reader**: Badge text is read inline; the `progress` prop's icon includes a visually hidden text equivalent so the state is announced (e.g., "Partially complete")
- **ARIA**: Renders as `<span>` with no special ARIA role; relies on surrounding context to convey meaning rather than using `role="status"`

## Strengths & Gaps
- **Best at**: Communicating e-commerce and workflow status with a consistent semantic tone system that prevents color misuse across a large admin interface
- **Missing**: No notification count mode, no dot badge, no anchor/positioning for overlaying badges on other components — the notification badge use case is out of scope for Polaris
