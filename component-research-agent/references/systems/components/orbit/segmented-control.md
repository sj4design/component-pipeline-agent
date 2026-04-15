---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# Segmented Control

## Approach
Orbit does not ship a generic SegmentedControl component. The most prominent use case that a segmented control would serve in a travel booking UI — switching between one-way, round-trip, and multi-city flight search modes — is handled by a domain-specific custom component built directly into the flight search widget. This custom implementation has travel-specific behaviors: selecting "multi-city" reveals an entirely different form layout (multiple origin/destination row pairs), and selecting "one-way" removes the return date field. These contextual side effects are too tightly coupled to the search form's state to be expressed cleanly through a generic segmented control API. Because Kiwi.com's product surfaces no other confirmed use case for a generic mode-switcher outside the bespoke flight-type selector, a reusable SegmentedControl primitive has not been built into Orbit.

## Key Decisions
1. **Domain coupling in flight type selector** (HIGH) — The one-way/round-trip/multi-city toggle has form-restructuring side effects that belong in the search widget's own state management, not in a generic component.
2. **No secondary use cases identified** (HIGH) — A thorough review of Kiwi.com's product screens (search, results, booking, account) reveals no other place where a generic segmented control would be used.
3. **`Tabs` or `ButtonLink` groups as substitutes** (LOW) — For cases where a visual tab-style selector is needed in informational contexts (e.g., switching between outbound/return itinerary views), teams use Orbit's Tab or ButtonGroup components instead.

## Notable Props
- N/A — component not present in Orbit.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A generic SegmentedControl. Teams needing this should consider Orbit's `Tabs` for navigation contexts or compose a button-group toggle from `Button` primitives using `role="group"` and `aria-pressed`.
