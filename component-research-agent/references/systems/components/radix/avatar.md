---
system: Radix UI (WorkOS)
component: Avatar
url: https://www.radix-ui.com/primitives/docs/components/avatar
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
Radix Avatar is a headless primitive for displaying user profile images with automatic fallback to initials or a custom element when the image fails to load. It composes as Avatar.Root, Avatar.Image, and Avatar.Fallback. The three-part composition provides complete control over the loading state, fallback timing, and fallback content. Radix implements the image loading detection to decide when to show the fallback — not just whether an src is provided, but whether the image actually loaded.

## Key Decisions
1. **Loading state via delayMs** (HIGH) — `Avatar.Fallback delayMs={600}` delays showing the fallback until after the specified delay. This prevents a flash of initials/icon when an image is about to load quickly, which would cause a jarring transition.
2. **Three-state loading model** (HIGH) — Radix Avatar tracks three states: loading (checking), loaded (show image), error (show fallback). This is more precise than a simple has-src/no-src boolean.
3. **Custom fallback content** (MEDIUM) — Fallback accepts any ReactNode — initials, a generic user icon, a placeholder pattern. This avoids prescribing a single fallback style.

## Notable Props
- `Avatar.Image > onLoadingStatusChange`: callback for load state changes
- `Avatar.Fallback > delayMs`: delay before fallback appears
- `asChild` on Root for polymorphic rendering (e.g., render avatar as a link)

## A11y Highlights
- **Keyboard**: Non-interactive by default; asChild as link/button adds keyboard behavior
- **Screen reader**: `Avatar.Image` should have `alt` text; fallback text (initials) serves as alt when image fails
- **ARIA**: Alt text on image is required; fallback should have `aria-hidden` if image alt text already describes the user

## Strengths & Gaps
- **Best at**: delayMs for smooth loading transition; three-state loading model; custom fallback
- **Missing**: No built-in size scale; no status indicator slot (online/offline dot); no avatar group for stacked avatars
