---
system: Fluent 2 (Microsoft)
component: Badge / CounterBadge / PresenceBadge
url: https://fluent2.microsoft.design/components/web/react/badge/usage
last_verified: 2026-03-28
confidence: high
---

# Badge / CounterBadge / PresenceBadge

## Approach
Fluent 2 provides three badge variants: Badge (general label), CounterBadge (numeric count overlay), and PresenceBadge (user online status indicator). This reflects Microsoft's diverse badge needs: status labels, notification counts on icons, and user presence indicators in Teams. Having three distinct components with focused APIs is cleaner than a single component with complex conditional rendering.

## Key Decisions
1. **Three distinct badge types** (HIGH) — Badge, CounterBadge, PresenceBadge are separate because they have different semantics (label vs count vs presence status), different visual treatments, and different ARIA requirements.
2. **CounterBadge overflow** (HIGH) — `overflowCount` shows "99+" or similar when the count exceeds the threshold. This Teams notification count behavior is built-in.
3. **PresenceBadge status** (HIGH) — `status: "available" | "away" | "busy" | "do-not-disturb" | "offline" | "out-of-office"` — exact Teams presence statuses. These are fixed values encoding the Teams/Microsoft 365 presence system.

## Notable Props
- Badge: `color`, `size`, `shape` (rounded/circular/square), `appearance`
- CounterBadge: `count`, `overflowCount`, `showZero`
- PresenceBadge: `status` (Teams presence states), `size`

## A11y Highlights
- **Keyboard**: Non-interactive (badges are display elements)
- **Screen reader**: All three communicate their meaning via text (aria-label on icons they decorate)
- **ARIA**: Badges decorating icons need aria-label on the icon (not the badge itself)

## Strengths & Gaps
- **Best at**: Three-type system; CounterBadge with overflow; PresenceBadge for Teams patterns
- **Missing**: N/A — very complete badge system; one of the best in the ecosystem
