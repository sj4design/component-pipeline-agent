---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
Orbit does not include a generic NumberInput component with increment/decrement steppers. This gap reflects the fact that Kiwi.com's numeric input needs are split into two categories, each handled differently. For free-form numeric data entry (passport numbers, phone numbers, age), Orbit's standard `InputField` with `type="number"` or `type="text"` is used directly. For bounded integer selection with steppers — the most visible being passenger count selection (adults, children, infants) — Kiwi.com uses a bespoke stepper component that is deeply integrated into the flight search widget and is not exposed as a standalone, general-purpose NumberInput primitive. The domain-specific passenger stepper has business rules (max 9 passengers, adult-to-infant ratios) baked in that would make a generic NumberInput API awkward to express. Because no other use case in the booking funnel requires a generic stepper, a reusable NumberInput has never been prioritized.

## Key Decisions
1. **Passenger count as domain-specific logic** (HIGH) — The adult/child/infant stepper enforces complex interdependent constraints (e.g., each infant requires one adult) that belong in a domain component, not a generic number input.
2. **`InputField` for free-form numbers** (MEDIUM) — Passport numbers, frequent flyer IDs, and phone numbers are best served by a plain text/number input without steppers, which is already handled by `InputField`.
3. **No generic stepper abstraction** (MEDIUM) — Extracting a reusable stepper from the flight search widget has been deprioritized because no other confirmed use case exists in the Orbit roadmap.

## Notable Props
- N/A — no generic NumberInput exists. Use `InputField` with `type="number"` for free-form numeric entry.

## A11y Highlights
- **Keyboard**: N/A (no component)
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A reusable stepper/number-input with min/max/step props. Teams needing this outside the flight search context must compose from `InputField` and `IconButton` primitives.
