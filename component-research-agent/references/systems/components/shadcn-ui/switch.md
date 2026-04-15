---
system: shadcn/ui
component: Switch
url: https://ui.shadcn.com/docs/components/switch
last_verified: 2026-03-28
confidence: high
---

# Switch

## Approach
shadcn/ui's Switch is built on Radix UI's Switch primitive, providing a custom-styled toggle switch with role="switch" and aria-checked semantics. The thumb slides smoothly with CSS transitions. Integrates with react-hook-form via the Form component for controlled form usage. Clean, minimal visual consistent with shadcn/ui's aesthetic.

## Key Decisions
1. **Radix Switch primitive** (HIGH) — Custom visual switch with Radix's ARIA switch semantics and keyboard behavior, providing consistent cross-browser appearance.
2. **Smooth thumb animation** (MEDIUM) — CSS transition on thumb position provides polished visual feedback with minimal JavaScript.
3. **Form integration** (MEDIUM) — Works with react-hook-form Controller for form-based switch inputs.

## Notable Props
- `checked` / `defaultChecked`: Controlled/uncontrolled state
- `onCheckedChange`: Toggle callback
- `disabled`: Disabled state
- `id`: For label htmlFor association

## A11y Highlights
- **Keyboard**: Space toggles; Enter may toggle
- **Screen reader**: role="switch"; aria-checked="true"|"false"; label via htmlFor
- **ARIA**: Radix auto-wires role="switch" and aria-checked

## Strengths & Gaps
- **Best at**: Clean custom visual; Radix ARIA switch role; smooth CSS animation
- **Missing**: No loading state; no on-track text labels; label must be manually composed
