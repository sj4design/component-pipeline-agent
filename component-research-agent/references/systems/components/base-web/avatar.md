---
system: Base Web (Uber)
component: Avatar
url: https://baseweb.design/components/avatar/
last_verified: 2026-03-28
confidence: medium
---

# Avatar

## Approach
Base Web's Avatar component displays a user's profile image with automatic fallback to initials when the image fails or is not provided. It supports size variants and integrates with Base Web's theming system. The component handles image error states automatically, deriving initials from a `name` prop.

## Key Decisions
1. **Overrides for deep customization** (HIGH) — Like all Base Web components, Avatar exposes an `overrides` prop targeting internal elements (Root, Avatar, Initials) for style or component replacement without forking.
2. **Name-based initials fallback** (HIGH) — The `name` prop serves dual purpose: accessible alt text when image is shown, and source for derived initials when image is absent. Names are split on spaces to generate initials.
3. **size prop with preset values** (MEDIUM) — Avatar accepts named sizes (scale100–scale1600) from the Base Web scale system, ensuring consistent sizing with other components.

## Notable Props
- `src`: image URL
- `name`: display name (alt text + initials source)
- `size`: size from Base Web scale (e.g., "scale1200")
- `overrides`: target Root, Avatar, Initials sub-elements

## A11y Highlights
- **Keyboard**: Non-interactive by default
- **Screen reader**: img alt derived from name prop; initials fallback has same accessible name
- **ARIA**: Standard img alt attribute

## Strengths & Gaps
- **Best at**: Overrides pattern for customization; automatic initials fallback; Base Web scale integration
- **Missing**: No AvatarGroup for stacking; no status indicator dot built-in
