---
system: Orbit (Kiwi.com)
component: Avatar
url: https://orbit.kiwi/components/visuals/avatar/
last_verified: 2026-03-29
confidence: high
---

# Avatar

## Approach
Orbit's Avatar component serves two primary personas in the Kiwi.com product: passenger profiles (for multi-passenger booking summaries) and customer service agent avatars in the live chat interface. Because both use cases are narrow and well-defined, the component stays intentionally lean — it handles image display, initials-based fallback, and size variants without over-engineering features like status indicators or badge overlays that would be irrelevant in a booking context. The fallback to initials is important because passenger photos are rarely available, making graceful degradation the default path rather than an edge case.

## Key Decisions
1. **Initials fallback** (HIGH) — Passenger names are always known from the booking form; rendering initials ensures the avatar is always meaningful even without a photo, which is the common case.
2. **Size variants** (MEDIUM) — Multiple sizes (small, medium, large) accommodate different contexts: small for passenger lists in booking summaries, large for the chat agent identity panel.
3. **Circular shape only** (MEDIUM) — Orbit does not offer square avatars; the circular form is consistent with the friendly, consumer-facing tone of Kiwi.com's brand.

## Notable Props
- `src`: image URL; absence triggers initials fallback
- `name`: used to generate initials and as the accessible label
- `size`: `"small" | "medium" | "large"`
- `type`: `"person" | "airplane"` — airplane variant used for carrier/airline identity

## A11y Highlights
- **Keyboard**: Not focusable unless wrapped in an interactive element; purely presentational.
- **Screen reader**: `alt` text derived from `name` prop when an image is present; initials rendered with `aria-hidden` and the name exposed via `aria-label` on the container.
- **ARIA**: `role="img"` on the root element when no interactive behavior is attached.

## Strengths & Gaps
- **Best at**: Clean passenger/agent identity representation with automatic initials fallback; airline avatar variant is travel-domain unique.
- **Missing**: No status indicator (online/offline), no badge slot for notification counts, no group/stacked avatar variant.
