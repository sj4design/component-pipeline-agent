---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Avatar

## Approach
Material Design 3 does not include a standalone Avatar component. This is a notable gap given M3's mobile focus, where avatars are ubiquitous in messaging, contacts, and social contexts. The absence reflects a deliberate scope decision: M3 defines the visual language for avatars through its "Profile image" guidance in the Typography and Imagery documentation, but does not ship a reusable component implementation. The reasoning is that avatar-like displays in M3 apps typically occur within higher-level components — the NavigationDrawer shows a profile image at the top, ListItem can contain an image in the leading slot, and chips can contain an avatar. Rather than creating a standalone Avatar primitive that would be used inconsistently, M3 guides teams to use its shape tokens (specifically the "full" shape token for circles) and the `ImageView` within their platform's component toolkit.

The workaround for teams building on M3 is to compose an avatar using M3's shape and color system: use the "extra large" shape token (full circle) with a fixed size (40dp for standard, 32dp for compact contexts), fill with M3's `primaryContainer` color role for the initials fallback, and use `onPrimaryContainer` for the initials text. For image avatars, clip to the circular shape using the full-circle shape token. This approach ensures the avatar adapts correctly to dynamic color and dark mode without custom color overrides. The gap in the official library means there is no standardized API, no AvatarGroup pattern, and no official guidance on image loading states — teams make inconsistent decisions that make M3-based design systems harder to maintain.

## Key Decisions
1. **Deliberate omission in favor of composition** (HIGH) — M3 chose not to ship Avatar because its slot-based component model (ListItem leading slot, Chip avatar slot) covers the most common uses. The philosophy is that a standalone Avatar component invites misuse as decoration, while slot-based placement keeps avatars anchored to their semantic context (this is a person in a list; this is the sender of a message).
2. **Shape token coverage for teams that compose** (MEDIUM) — For teams building their own avatar, M3's full-circle shape token ensures the circular shape is part of the design token system rather than hardcoded CSS. This means themed shape changes (if M3 ever allows shape overrides at the system level) propagate to custom avatar implementations automatically.
3. **Color role guidance for initials fallback** (MEDIUM) — The `primaryContainer`/`onPrimaryContainer` color role pairing is the implicit standard for initials-style avatars in M3 apps. Using these roles ensures the fallback state reads correctly in both light and dark modes and respects dynamic color.

## Notable Props
- No official Avatar props — component does not exist as a standalone primitive
- Platform-specific implementations (Jetpack Compose has `coil` integration; Flutter has custom implementations) vary by platform

## A11y Highlights
- **Keyboard**: No guidance provided — implementations vary
- **Screen reader**: No official guidance; teams must add `alt` text to image elements and `aria-label` to any interactive avatar usage
- **ARIA**: No standardized ARIA pattern; the absence of a component means each team implements differently

## Strengths & Gaps
- **Best at**: Providing color and shape tokens that allow consistent DIY avatar construction that adapts to dynamic color and dark/light themes
- **Missing**: Entirely absent as a component — no fallback sequence (image → initials → icon), no AvatarGroup, no loading states, no standard size scale, and no official a11y guidance
