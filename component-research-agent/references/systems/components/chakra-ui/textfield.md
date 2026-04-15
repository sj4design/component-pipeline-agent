---
system: Chakra UI
component: Input / InputGroup
url: https://chakra-ui.com/docs/components/input
last_verified: 2026-03-28
confidence: high
---

# Input / InputGroup

## Approach
Chakra UI's Input component is a styled native input with full token integration and the InputGroup pattern for addons. The system provides Input, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, and InputRightAddon as composable pieces. Elements (icons, spinners) are overlaid on the input; addons (labels like "https://", unit suffixes like "kg") are separate bordered sections. This mirrors the distinction between visual embellishments and semantic addons. Chakra's Input also ships as part of `Field` in v3, which bundles label, input, and error message.

## Key Decisions
1. **InputGroup composition** (HIGH) — The group pattern handles padding compensation automatically — when a left element is present, the input's left padding increases to prevent text hiding behind the icon. This is handled without manual padding overrides, which is a common source of bugs.
2. **Field wrapper in v3** (HIGH) — In v3, the `Field` component bundles label, required indicator, helper text, and error message around an input. This reflects the reality that inputs are rarely used alone — they exist in the context of a form field with label and feedback.
3. **variant system** (MEDIUM) — `"outline"` (bordered), `"filled"` (background fill), `"flushed"` (bottom border only), `"unstyled"`. Flushed is specifically useful for inline editing and form layouts where a full border feels heavy.

## Notable Props
- `variant`: `"outline" | "filled" | "flushed" | "unstyled"`
- `size`: `"xs" | "sm" | "md" | "lg"`
- `isInvalid`: triggers error styling
- `isDisabled` / `isReadOnly`: state props
- `InputLeftElement` / `InputRightElement`: icon/content overlays
- `InputLeftAddon` / `InputRightAddon`: bordered prefix/suffix sections

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: `isInvalid` adds `aria-invalid="true"`; `aria-describedby` links to error message; label connection via `htmlFor` or `Field` wrapper
- **ARIA**: `aria-required`, `aria-invalid`, `aria-describedby` all managed via Field/FormControl wrapper

## Strengths & Gaps
- **Best at**: InputGroup automatic padding; Field bundle for complete form fields; flushed variant for inline editing
- **Missing**: No character count built-in; no masked input; no clear button built-in
