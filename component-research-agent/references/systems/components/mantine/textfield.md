---
system: Mantine
component: TextInput / Textarea
url: https://mantine.dev/core/text-input/
last_verified: 2026-03-28
confidence: high
---

# TextInput / Textarea

## Approach
Mantine's TextInput is a complete form field component bundling input, label, description (helper text), and error message. The component system is consistent across all Mantine input types (TextInput, Textarea, NumberInput, PasswordInput, etc.) — they all share the same label/description/error pattern and the same leftSection/rightSection slot pattern. This consistency makes form building predictable. Mantine also provides an `InputWrapper` for wrapping custom inputs in the same label/description/error layout.

## Key Decisions
1. **leftSection / rightSection slots** (HIGH) — Generic content slots for icons and actions inside the input. These are consistent across all Mantine input components, creating a unified slot API. The slots auto-adjust input padding.
2. **description prop for helper text** (HIGH) — The `description` prop renders secondary guidance text below the label (not below the input). The `error` prop renders an error message below the input, replacing or supplementing description. This two-slot approach is cleaner than a single helperText prop that serves both purposes.
3. **variant: default, filled, unstyled** (MEDIUM) — Three visual variants covering the main input styling contexts: default (border), filled (background), unstyled (no decoration) for custom styling.

## Notable Props
- `label`: visible label text
- `description`: helper text below label
- `error`: error message (makes input invalid)
- `leftSection` / `rightSection`: icon/action slots
- `leftSectionWidth` / `rightSectionWidth`: slot width for padding compensation
- `variant`: `"default" | "filled" | "unstyled"`
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`
- `withAsterisk`: shows required indicator without making field required

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label linked via id/for; error and description linked via aria-describedby
- **ARIA**: aria-invalid on error state; aria-required when required; aria-describedby for both description and error

## Strengths & Gaps
- **Best at**: Consistent API across all input types; description + error two-slot approach; withAsterisk for visual required indicator
- **Missing**: No character count in core TextInput (available in Textarea via `maxLength + autosize`); no masked input
