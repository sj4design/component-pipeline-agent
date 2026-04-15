---
system: Mantine
component: Badge
url: https://mantine.dev/core/badge/
last_verified: 2026-03-28
confidence: high
---

# Badge

## Approach
Mantine's Badge is a versatile status/label component with the full Mantine color + variant + size system. It supports optional left/right section slots for icons or small content. The gradient variant is available (consistent with Button's gradient support). Badge is commonly used for version numbers, status labels, feature tags, and count indicators in Mantine applications.

## Key Decisions
1. **leftSection / rightSection** (HIGH) — Icon slots inside the badge using Mantine's consistent slot pattern. An icon-left badge is a common status pattern (green checkmark + "Active" text).
2. **Gradient variant** (MEDIUM) — Gradient badges for highlighting new features, premium statuses, or promotional labels.
3. **Full size scale** (MEDIUM) — xs through xl, unlike most badge components that only have sm/md/lg.

## Notable Props
- `color`: token color
- `variant`: `"filled" | "light" | "outline" | "dot" | "gradient"`
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`
- `gradient`: for gradient variant
- `leftSection` / `rightSection`: icon/content slots
- `radius`: border radius

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Text content; color is supplementary
- **ARIA**: No special ARIA needed

## Strengths & Gaps
- **Best at**: leftSection/rightSection; gradient variant; dot variant for notification dots; full size scale
- **Missing**: No count overflow (99+); no PresenceBadge equivalent
