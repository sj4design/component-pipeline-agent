---
system: Chakra UI
component: Switch
url: https://chakra-ui.com/docs/components/switch
last_verified: 2026-03-28
confidence: high
---

# Switch

## Approach
Chakra UI's Switch is a styled toggle switch with full token integration. It uses `role="switch"` for correct ARIA semantics and supports the colorScheme system for the active state color. The component wraps a hidden native checkbox for form integration while rendering a custom visual toggle. Chakra's Switch is visually polished with smooth thumb animation by default.

## Key Decisions
1. **Hidden native checkbox for form** (HIGH) — Under the hood, Chakra Switch uses a visually hidden native checkbox to participate in HTML form submission and React Hook Form integration without custom adapters.
2. **colorScheme for active state** (HIGH) — The switch track when active uses the colorScheme color, making it easy to create green "on" / neutral "off" patterns or brand-colored switches.
3. **size scale** (MEDIUM) — `"sm" | "md" | "lg"` sizes control the thumb and track dimensions. Larger switches are used as primary feature toggles; small for dense settings lists.

## Notable Props
- `isChecked` / `onChange`: controlled state
- `colorScheme`: track color when active
- `size`: `"sm" | "md" | "lg"`
- `isDisabled` / `isReadOnly`: state
- `id` / `name`: form attributes

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: `role="switch"` with `aria-checked`; label via associated `<label>` element
- **ARIA**: Correct role="switch" semantics

## Strengths & Gaps
- **Best at**: colorScheme integration; native form integration via hidden checkbox; smooth animation defaults
- **Missing**: No thumbIcon option; no custom track content
