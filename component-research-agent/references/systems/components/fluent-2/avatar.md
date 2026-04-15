---
system: Fluent 2 (Microsoft)
component: Avatar
url: https://fluent2.microsoft.design/components/web/react/avatar/
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
Fluent 2's Avatar is a highly featured component covering person, group, and shape variants. It supports image display with fallback to initials or icon, multiple size variants (16–128px), active/inactive presence indicators, and ring/shadow effects for active states. The AvatarGroup component stacks multiple avatars with overflow handling.

## Key Decisions
1. **shape prop for different avatar types** (HIGH) — `shape="circular"` (default for people) vs `shape="square"` (for groups, bots, companies) communicates different entity types visually. This semantic distinction is important in Microsoft's enterprise context where Teams shows people as circles and groups as squares.
2. **active prop with ring/shadow effects** (HIGH) — `active="active"` applies a colored ring or shadow to indicate an active presence state (like a live Teams call). `activeAppearance` controls whether it's ring or shadow. This is a Teams-specific pattern not seen in most design systems.
3. **AvatarGroup with spread and stack layouts** (HIGH) — AvatarGroup supports `layout="stack"` (overlapping) and `layout="spread"` (evenly spaced), with a `maxAvatars` prop for overflow control and a "+N" overflow indicator.

## Notable Props
- `name`: display name (alt text + initials)
- `image`: `{ src }` for image display
- `size`: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128
- `shape`: `"circular" | "square"`
- `active`: `"active" | "inactive" | "unset"`
- `activeAppearance`: `"ring" | "shadow" | "ring-shadow"`
- `color`: named color or "colorful" for automatic assignment

## A11y Highlights
- **Keyboard**: Non-interactive by default; focusable when used as button
- **Screen reader**: aria-label from name prop; presence state announced
- **ARIA**: Standard image alt; active state communicated via label

## Strengths & Gaps
- **Best at**: shape variants for entity types; active ring/shadow for presence; AvatarGroup layouts; large size range
- **Missing**: No loading shimmer state; tied to Microsoft/Teams visual language
