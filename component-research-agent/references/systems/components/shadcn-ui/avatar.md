---
system: shadcn/ui
component: Avatar
url: https://ui.shadcn.com/docs/components/avatar
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
shadcn/ui's Avatar is built on Radix UI's Avatar primitive, providing image with fallback to initials (AvatarFallback). Radix handles the image load error detection and automatic fallback to the AvatarFallback content. The compound component pattern (Avatar, AvatarImage, AvatarFallback) gives control over both states.

## Key Decisions
1. **Radix Avatar with automatic fallback** (HIGH) — Radix detects image load failure and automatically shows AvatarFallback content, enabling clean image → initials fallback without manual error handling.
2. **AvatarFallback as custom slot** (HIGH) — AvatarFallback accepts any React content (initials text, icon, placeholder) giving full control over the fallback state appearance.
3. **Tailwind styling** (MEDIUM) — Circular avatar shape, size, and background color are all customized via Tailwind className, enabling any size or shape configuration.

## Notable Props
- `AvatarImage[src]`: Image source URL
- `AvatarImage[alt]`: Required alt text
- `AvatarFallback`: Rendered when image fails or during load
- `delayMs` on AvatarFallback: Delay before showing fallback to avoid flash

## A11y Highlights
- **Keyboard**: Non-interactive unless wrapped in Link/Button
- **Screen reader**: AvatarImage alt text; AvatarFallback content read as text when image absent
- **ARIA**: alt text on AvatarImage; AvatarFallback text provides name when image is unavailable

## Strengths & Gaps
- **Best at**: Automatic fallback via Radix; custom fallback content; delayMs for smooth fallback transition
- **Missing**: No AvatarGroup built-in; no presence indicator; no size token system
