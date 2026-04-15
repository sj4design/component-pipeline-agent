---
system: Chakra UI
component: Badge
url: https://chakra-ui.com/docs/components/badge
last_verified: 2026-03-28
confidence: high
---

# Badge

## Approach
Chakra UI's Badge is a styled inline label component using the colorScheme and variant system. It's simple and consistent with other Chakra components in its color API. The Badge is used for status labels, version indicators, feature flags, and count displays.

## Key Decisions
1. **colorScheme for semantic colors** (HIGH) — The same colorScheme prop used across all Chakra components. A "green" badge for success, "red" for error, "yellow" for warning. Consistent with Button, Tag, and Alert color patterns.
2. **variant: solid/subtle/outline** (MEDIUM) — Three visual treatments cover most badge use cases.

## Notable Props
- `colorScheme`: semantic color token
- `variant`: `"solid" | "subtle" | "outline"`
- `size`: size control

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Text content is the accessible name; color is supplementary
- **ARIA**: No special ARIA for static badges

## Strengths & Gaps
- **Best at**: colorScheme consistency with entire Chakra system; simple API
- **Missing**: No count overflow (99+); no dot badge; no badge positioning on icons/avatars built-in
