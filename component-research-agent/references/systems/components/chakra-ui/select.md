---
system: Chakra UI
component: Select / NativeSelect
url: https://chakra-ui.com/docs/components/native-select
last_verified: 2026-03-28
confidence: high
---

# Select / NativeSelect

## Approach
Chakra UI v3 offers both a NativeSelect (wrapping `<select>`) and a custom Select (via Ark UI) with full styling capabilities. NativeSelect uses the native HTML select element, which has better mobile support and accessibility out-of-the-box at the cost of limited styling (especially for options). The custom Select uses Ark UI's headless Select (Zag.js state machine) for a fully styleable listbox. Chakra's guidance recommends NativeSelect for simpler forms and the custom Select when visual design requirements exceed native styling capabilities.

## Key Decisions
1. **NativeSelect for simplicity/mobile** (HIGH) — Native select elements use the platform's native picker on mobile (iOS wheel, Android dropdown), which is often better UX than custom implementations. Chakra's NativeSelect recommendation for mobile-first apps reflects this.
2. **Custom Select via Ark UI** (HIGH) — When visual customization is required, Ark UI's Select provides full styling control using Zag.js state machines. It supports item icons, badges, groups, and custom item rendering that native selects can't support.
3. **error and invalid states** (MEDIUM) — Both select variants integrate with Chakra's form system: `isInvalid` applies error styling and triggers error message display. This connects select validation to the broader form validation pattern.

## Notable Props
- NativeSelect: `placeholder`, `size`, `variant`, `isDisabled`, `isInvalid`
- Custom Select: `value`, `onValueChange`, `items` or composable Select.Item components
- `colorScheme`: token-based accent color for focus rings and active state

## A11y Highlights
- **Keyboard**: NativeSelect: native browser behavior; Custom Select: Arrow keys, Enter, Escape, type-ahead
- **Screen reader**: NativeSelect: full native select semantics; Custom Select: role="combobox"/listbox/option
- **ARIA**: NativeSelect is most accessible natively; Custom Select implements full combobox ARIA

## Strengths & Gaps
- **Best at**: Choice between native and custom based on need; Ark UI custom select for rich item rendering
- **Missing**: No built-in multi-select for the native variant; custom Select requires Ark UI dependency
