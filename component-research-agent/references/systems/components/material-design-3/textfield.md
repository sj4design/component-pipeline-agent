---
system: Material Design 3
component: TextField (Filled & Outlined)
url: https://m3.material.io/components/text-fields/specs
last_verified: 2026-03-28
---

# TextField

## Approach
Material Design 3 treats text fields as one of its most opinionated components, offering exactly two variants -- Filled and Outlined -- that are functionally identical but visually distinct. The philosophy is that text fields should signal their editability through strong visual affordances: Filled uses a container background with a bottom indicator line, while Outlined uses a complete stroke border. M3 chose this dual-variant strategy because different surface contexts demand different levels of visual weight -- Filled works on plain backgrounds where the container provides contrast, while Outlined works on colored or busy surfaces where a full border delineates the field. The animated floating label, which transitions from placeholder position to a scaled-down label above the input, is a signature M3 pattern that eliminates the need for a separate static label, saving vertical space while maintaining context after the user begins typing.

## Key Decisions
1. **Two variants instead of one configurable style** (HIGH) — M3 provides Filled and Outlined as discrete components rather than a single component with a style prop. This forces designers to make an intentional choice per-context rather than defaulting. The Filled variant uses a container fill plus bottom activation indicator; Outlined uses a stroked border with a label notch cut into the top stroke. This architectural separation means each variant can optimize its own interaction states independently.

2. **Floating label as the primary labeling pattern** (HIGH) — The label starts inside the field as placeholder-like text, then animates up and shrinks when the field is focused or has a value. This eliminates the need for a separate label element above the field, reducing vertical footprint. The tradeoff is animation complexity and potential a11y issues if not wired correctly -- the label must remain programmatically associated via aria attributes even as it visually transforms.

3. **Supporting text replaces helper on error** (MEDIUM) — Helper text lives below the field and gets replaced by error text when validation fails. This prevents two lines of text stacking below the field, keeping the layout stable. The error state also prepends the word "Error" or shows an error icon to ensure colorblind users can distinguish error from helper text without relying on color alone.

4. **Character counter as a built-in feature** (LOW) — When a maxlength attribute is present, the counter renders automatically in the supporting text area, aligned to the trailing edge. This is notable because many systems treat character counting as a developer responsibility rather than a component feature.

## Notable Props
- `leading-icon` / `trailing-icon`: Slot-based icon placement that can describe input method (search icon) or provide actions (clear, visibility toggle)
- `error` / `error-text`: Boolean error state with corresponding accessible error message, overriding reportValidity() state
- `supporting-text`: Persistent helper text below the field, replaced by error-text during validation failure
- `maxlength`: Automatically triggers character counter display without additional configuration

## A11y Highlights
- **Keyboard**: Standard tab focus, native input keyboard behavior. No custom key bindings needed since the component delegates to the native input element.
- **Screen reader**: Label is announced on focus regardless of its visual animation state. Error messages are surfaced via aria-describedby so they announce when the field enters an error state.
- **ARIA**: Uses aria-label as override when external label is provided. Error state is communicated through aria-invalid. The "Error" prefix on error messages provides a non-color signal for validation failures.

## Strengths & Gaps
- **Best at**: Providing strong visual affordances for editability through two well-defined variants with clear guidance on when to use each, plus built-in character counting and error state handling.
- **Missing**: No built-in search field variant, no quiet/minimal style for dense data tables, and no native support for connected fields (prefix/suffix units or addon elements outside the field boundary).
