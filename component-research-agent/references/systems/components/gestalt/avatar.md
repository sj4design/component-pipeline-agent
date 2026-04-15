---
system: Gestalt (Pinterest)
component: Avatar
url: https://gestalt.pinterest.systems/web/avatar
last_verified: 2026-03-28
confidence: medium
---

# Avatar

## Approach
Gestalt's Avatar displays a user or board image in a circular container with automatic fallback to initials when no image is provided. It integrates with Pinterest's person and board entity types. AvatarGroup stacks multiple avatars in Pinterest's characteristic overlapping style, commonly seen in board collaborators and group pin displays.

## Key Decisions
1. **size with named scale** (HIGH) — Avatar sizes use named values (xs, sm, md, lg, xl, xxl) rather than pixel values, ensuring consistency with Gestalt's sizing scale across Pinterest product surfaces.
2. **accessibilityLabel required** (HIGH) — Gestalt explicitly requires an `accessibilityLabel` prop on Avatar rather than deriving it from a name prop, enforcing intentional accessible name authoring.
3. **AvatarGroup with addCollaborators** (MEDIUM) — AvatarGroup includes an `addCollaborators` prop that adds a "+" button at the end of the stack, enabling the "invite collaborators" pattern used extensively in Pinterest boards.

## Notable Props
- `src`: image URL
- `name`: used for initials fallback
- `accessibilityLabel`: required accessible name
- `size`: `"xs" | "sm" | "md" | "lg" | "xl" | "xxl"`
- AvatarGroup: `collaborators`, `addCollaborators`, `maxAvatars`

## A11y Highlights
- **Keyboard**: Non-interactive by default
- **Screen reader**: accessibilityLabel explicitly required; initials fallback uses same label
- **ARIA**: img role with accessibilityLabel as alt

## Strengths & Gaps
- **Best at**: Required accessibilityLabel; AvatarGroup with addCollaborators; Pinterest entity types
- **Missing**: No status indicator dot; no loading shimmer
