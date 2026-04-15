---
system: REI Cedar
component: Toast
url: https://cedar.rei.com/components/toast
last_verified: 2026-03-28
confidence: medium
---

# Toast

## Approach
REI Cedar's Toast provides transient notifications for e-commerce operations — item added to cart, wishlist saves, checkout step completions, and error alerts. The Vue-based component follows Cedar's accessibility standards and uses the standard toast pattern with auto-dismiss and manual close. Cedar's toast positioning and animation are consistent with REI's product visual design.

## Key Decisions
1. **E-commerce operation feedback** (HIGH) — Toast is optimized for cart, wishlist, and purchase flow feedback patterns central to REI's e-commerce functionality.
2. **Clear variant set** (MEDIUM) — Success, error, warning, info variants with Cedar's brand-consistent visual treatment.
3. **Auto-dismiss with pause on hover** (MEDIUM) — Auto-dismiss timer pauses when user hovers over the toast, preventing dismissal while the user reads the message.

## Notable Props
- `message`: Toast content
- `type`: success/error/warning/info
- `duration`: Auto-dismiss timing

## A11y Highlights
- **Keyboard**: Close button accessible
- **Screen reader**: Live region announcement; variant communicated
- **ARIA**: role="status" or "alert"; aria-live

## Strengths & Gaps
- **Best at**: E-commerce cart/purchase flow notifications; pause-on-hover behavior; Cedar brand alignment
- **Missing**: Medium confidence on full API; rich content/action support uncertain
