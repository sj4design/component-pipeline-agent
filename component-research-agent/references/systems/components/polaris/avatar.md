---
system: Shopify Polaris
component: Avatar
url: https://polaris.shopify.com/components/avatar
last_verified: 2026-03-28
---

# Avatar

## Approach
Shopify Polaris includes a native Avatar component designed specifically for the merchant and customer context within Shopify's admin interface. The component serves two primary roles: representing merchants (store owners and their team members) and representing customers in order and customer management views. This dual-context purpose shapes Polaris Avatar's design — it needs to work for both internal team members (who might have uploaded profile photos) and for customers (who almost never have uploaded photos, so fallbacks are critical). Polaris Avatar handles image display, initials fallback, and a default silhouette icon as a final fallback, covering the full degradation sequence. The component comes in multiple size variants calibrated to Polaris's layout contexts: customer list rows need a compact avatar, while a customer detail page header can show a larger one.

## Key Decisions
1. **Merchant/customer context awareness** (HIGH) — Polaris Avatar explicitly acknowledges two distinct user types in its documentation. This isn't just a naming convention — it affects how the component is used in the system. The `customer` prop signals that this avatar represents a Shopify customer (as opposed to a staff member), which can affect the default fallback behavior and the semantic meaning in screen reader announcements.
2. **Three-level fallback sequence** (HIGH) — Polaris Avatar handles the full fallback gracefully: image → initials (derived from `name` prop) → silhouette icon. This is the correct priority order and is handled automatically. Teams do not need to manually implement fallback logic because Polaris detects image load failure and falls back to initials, then to the icon if no name is available. The initials are derived automatically from the `name` prop (first and last name initials), which reduces integration overhead.
3. **Size system tied to layout context** (MEDIUM) — Polaris Avatar supports `xs`, `sm`, `md`, `lg`, `xl` sizes. Each size maps to a specific set of uses: `xs` for inline mentions within text, `sm` for list rows, `md` for most card contexts, `lg` and `xl` for detail page headers. This explicit mapping in the documentation prevents ad-hoc sizing decisions that would fragment the visual system.
4. **initials color assignment** (MEDIUM) — When showing initials, Polaris Avatar assigns a background color from a fixed palette based on the user's name hash. This ensures that the same person consistently gets the same color across sessions and devices, which helps users recognize specific people in lists before the image loads. The color is not configurable because configuring it would break the recognition-over-time benefit.

## Notable Props
- `name`: Drives both the `alt` text and the initials fallback — one prop handles both concerns
- `customer`: Boolean that signals the avatar represents a customer, not a merchant
- `size`: xs | sm | md | lg | xl — calibrated to Polaris layout contexts
- `source`: Image URL (if absent, falls back to initials or icon automatically)

## A11y Highlights
- **Keyboard**: Non-interactive by default; when used inside a link or button, inherits parent keyboard behavior
- **Screen reader**: Uses `name` prop as the `alt` attribute on the image, or as an `aria-label` on the initials element — a clean approach that ties accessibility to the same data driving the visual display
- **ARIA**: Image variant renders as `<img>` with `alt`; initials variant uses `aria-label` on a `<span>`; both approaches correctly represent the user's name to assistive technology

## Strengths & Gaps
- **Best at**: The automatic three-level fallback sequence (image → initials → icon) is seamless and requires no manual fallback logic from consumers; the name-based initials color assignment creates visual consistency across sessions
- **Missing**: No AvatarGroup stacking component (must be built manually), and no loading/skeleton state while the image fetches
