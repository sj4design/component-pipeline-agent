---
system: Radix UI (WorkOS)
component: Drawer (no dedicated primitive — use Dialog with CSS positioning)
url: https://www.radix-ui.com/primitives/docs/components/dialog
last_verified: 2026-03-28
confidence: high
---

# Drawer

## Approach
Radix does not have a dedicated Drawer primitive. Drawers (side panels) are built using the Dialog primitive with CSS positioning to anchor the content to a viewport edge. The `vaul` library (by emilkowalski) is the most popular Radix-compatible drawer library, providing swipe-to-close gesture support and spring animation. Many shadcn/ui implementations use vaul for their Drawer component.

## Key Decisions
1. **Dialog as foundation** (HIGH) — A drawer is semantically a dialog — it traps focus and blocks background interaction. Using Dialog ensures correct ARIA semantics without reimplementing focus management.
2. **vaul for gesture support** (MEDIUM) — The external vaul library adds swipe-to-close that Radix Dialog doesn't provide. This is the community-accepted pattern.

## Notable Props
- Dialog props (open, onOpenChange, modal)
- CSS: DialogContent with position:fixed, right/left/top/bottom:0, height/width constraints

## A11y Highlights
- **Keyboard**: Same as Dialog — focus trapped, Escape closes
- **Screen reader**: role="dialog" with aria-labelledby; background aria-hidden
- **ARIA**: Dialog ARIA semantics apply; drawer is a visual variation of dialog

## Strengths & Gaps
- **Best at**: Correct Dialog ARIA semantics; community vaul for gestures
- **Missing**: No built-in drawer primitive with snap points or gesture support
