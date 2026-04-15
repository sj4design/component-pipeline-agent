---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Orbit does not include a ColorPicker component, and this absence is a deliberate reflection of Kiwi.com's product domain. Travel booking flows — flight search, seat selection, baggage options, passenger details, payment — contain no user-facing interaction that requires selecting or configuring a color value. Kiwi.com's UI is entirely transactional: users choose routes, dates, seat classes, and add-ons, none of which involve color as a configurable property. Because Orbit is a product-specific design system rather than a general-purpose component library, it excludes components that have no mapping to any screen in the Kiwi.com application. Building a ColorPicker would add maintenance burden with zero product benefit.

## Key Decisions
1. **Scope to product needs** (HIGH) — Orbit explicitly limits its component set to what is used in production at Kiwi.com, avoiding the "build everything" trap that inflates general-purpose libraries.
2. **No travel-domain use case** (HIGH) — Every step of the Kiwi.com funnel has been audited; color configuration does not appear in flight search, booking, account management, or customer service flows.
3. **External library recommendation** (LOW) — Teams needing color selection in adjacent tooling (e.g., internal admin dashboards) are expected to use a general-purpose library rather than extend Orbit with domain-irrelevant components.

## Notable Props
- N/A — component not present in Orbit.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: ColorPicker entirely. Teams needing it should look outside Orbit (e.g., react-color, Radix primitives).
