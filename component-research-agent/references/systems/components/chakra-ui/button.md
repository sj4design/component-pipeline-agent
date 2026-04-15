---
system: Chakra UI
component: Button
url: https://chakra-ui.com/docs/components/button
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
Chakra UI's Button is one of its most feature-complete components, designed to cover the full range of application button needs out of the box. It supports visual variants (solid, outline, ghost, link), size scales, color schemes mapped to the design token system, loading states with spinner integration, and left/right icon slots. The component is built on Chakra's recipe system in v3, making it fully theme-able without overriding individual props. Chakra treats the button as a primary design token consumer — the `colorScheme` prop maps directly to the palette token system.

## Key Decisions
1. **colorScheme as the primary visual control** (HIGH) — Rather than explicit color props, Chakra uses `colorScheme` which maps to a full color palette (50–900 scale). This means a single prop change updates background, hover, focus ring, and text color consistently.
2. **Built-in loading state** (HIGH) — The `isLoading` prop replaces button content with a spinner and optionally shows `loadingText`. This is a common need that Chakra solves natively, avoiding the pattern of consumers conditionally rendering spinners outside the button.
3. **Icon-only shorthand** (MEDIUM) — The `IconButton` component is a separate component for icon-only buttons, which automatically applies a square aspect ratio and `aria-label` enforcement. This forces correct accessibility for icon buttons rather than relying on developer discipline.

## Notable Props
- `variant`: `"solid" | "outline" | "ghost" | "link"` — visual style
- `colorScheme`: token palette name (e.g., `"blue"`, `"red"`, `"teal"`)
- `size`: `"xs" | "sm" | "md" | "lg"`
- `isLoading`: shows spinner; `loadingText`: optional text during loading
- `leftIcon` / `rightIcon`: ReactElement placed inside button
- `isDisabled`: semantic disabled; `isFullWidth`: 100% width

## A11y Highlights
- **Keyboard**: Native `<button>` behavior; loading state prevents interaction
- **Screen reader**: `isLoading` adds `aria-disabled` and announces loading state; `IconButton` requires `aria-label`
- **ARIA**: `aria-busy="true"` during loading state; disabled buttons use `aria-disabled` rather than HTML `disabled` to keep them focusable

## Strengths & Gaps
- **Best at**: Loading state handling; color scheme token integration; icon button pattern
- **Missing**: No split-button or button group with connected borders in v3; toggle button state requires manual ARIA management
