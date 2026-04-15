---
system: Orbit (Kiwi.com)
component: Loading (Spinner)
url: https://orbit.kiwi/components/loading/
last_verified: 2026-03-28
confidence: medium
---

# Loading (Spinner)

## Approach
Orbit's Loading component provides a spinner for async operations in the travel booking flow — search results loading, payment processing, booking confirmation. The component supports different types for different contexts.

## Key Decisions
1. **type prop** (MEDIUM) — Different loading types (page-level, inline, button) for different contexts within the booking flow.

## Notable Props
- `type`: loading context variant
- `text`: optional loading message

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Loading text announced; role="progressbar"
- **ARIA**: text prop provides accessible loading message

## Strengths & Gaps
- **Best at**: Travel booking loading states; type variants for context
- **Missing**: Limited customization; verify API at orbit.kiwi
