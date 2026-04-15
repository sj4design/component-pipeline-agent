---
system: Gestalt (Pinterest)
component: Popover
url: https://gestalt.pinterest.systems/web/popover
last_verified: 2026-03-28
confidence: medium
---

# Popover

## Approach
Gestalt's Popover is a positioned overlay for contextual content, triggered by a user action on an anchor element. It uses an anchor ref for positioning and renders in a portal. Gestalt distinguishes between Popover (for interactive content) and Tooltip (for simple text labels). The component is used in Pinterest for media viewers, pin detail overlays, and contextual settings.

## Key Decisions
1. **anchor ref-based positioning** (HIGH) — Popover takes an `anchor` ref pointing to the trigger element for positioning, rather than a wrapper/trigger pattern. This decouples trigger and popover in the component tree, useful for complex trigger scenarios.
2. **idealDirection prop** (HIGH) — `idealDirection` specifies the preferred placement direction (`"up" | "down" | "left" | "right"`), with automatic fallback if the preferred direction would be clipped. This matches Pinterest's adaptive positioning needs on its image-heavy interfaces.
3. **onDismiss required** (MEDIUM) — `onDismiss` is required, enforcing that all Popovers handle closure. This prevents the accidental "undismissable popover" bug.

## Notable Props
- `anchor`: ref to anchor element for positioning
- `idealDirection`: preferred placement direction
- `onDismiss`: required close handler
- `size`: `"xs" | "sm" | "md" | "lg" | "xl" | "flexible"`
- `color`: `"white" | "darkGray"` for tooltip-style popovers

## A11y Highlights
- **Keyboard**: Escape closes; Tab navigates content; focus returns to anchor on close
- **Screen reader**: role="dialog" with aria-label; background content interactable (non-modal)
- **ARIA**: dialog role; anchor has aria-haspopup and aria-expanded

## Strengths & Gaps
- **Best at**: anchor ref positioning; idealDirection with auto-fallback; required onDismiss; color variants
- **Missing**: No initialFocusRef; no focus trap (non-modal by default)
