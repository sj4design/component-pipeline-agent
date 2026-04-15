---
system: Shopify Polaris
component: TextField
url: https://polaris.shopify.com/components/selection-and-input/text-field
last_verified: 2026-03-28
---

# TextField

## Approach
Polaris takes a commerce-first approach to text fields, building a single versatile TextField component that handles single-line, multiline, and connected-field patterns all in one. This design reflects Shopify's merchant admin context where forms frequently combine a value with a unit (price + currency, weight + unit, dimension + measurement) and where tag-based inputs (like product tags) are common. Rather than splitting into separate components, Polaris keeps everything in one TextField and uses props like `multiline`, `connectedLeft`/`connectedRight`, `prefix`/`suffix`, and `verticalContent` to compose complex input patterns. This single-component strategy reduces the API surface merchants need to learn and ensures consistent behavior across all text input contexts within the Shopify admin.

## Key Decisions
1. **Connected fields as a first-class pattern** (HIGH) — The `connectedLeft` and `connectedRight` props allow attaching related elements (typically Select dropdowns) directly to the TextField's visual boundary. This exists because Shopify merchants constantly deal with value+unit pairs: "$50.00 USD", "2.5 kg", "10 x 15 cm". Rather than forcing developers to manually align separate components, Polaris provides a built-in composition pattern that handles border radius merging, focus states, and visual continuity. This is the most commerce-specific text field feature among all systems researched.

2. **Prefix and suffix for inline context** (MEDIUM) — Prefix renders inside the field before the editable text (e.g., "$"), while suffix renders after it (e.g., "%", "@shopify.com"). These are distinct from connected fields because they're non-editable inline decorators rather than separate interactive elements. Polaris separated these because in commerce, currency symbols and unit indicators are part of the value's meaning but should not be editable -- this distinction prevents user confusion about what they can and cannot modify.

3. **verticalContent for tag-style inputs** (MEDIUM) — The `verticalContent` prop places content (typically tag chips) above the text input within the same field boundary. This is Polaris's solution for multi-value inputs like product tags, email recipients, or filter tokens. Instead of building a separate TagInput component, Polaris extends TextField to handle this pattern, keeping the tag management integrated with the typing experience.

4. **Multiline via prop rather than separate component** (LOW) — Setting `multiline` to true or a number converts the TextField into a textarea. Setting it to a number specifies minimum rows. Auto-grow is built in. Polaris chose this over a separate TextArea component because in the Shopify admin, the distinction between "short text" and "long text" is often a configuration choice rather than a fundamentally different interaction.

## Notable Props
- `connectedLeft` / `connectedRight`: Attach interactive elements (Select, Button) to field edges -- unique to commerce-oriented systems
- `verticalContent`: Renders tag-like content above the input within the field boundary, enabling multi-value input patterns
- `clearButton` / `onClearButtonClick`: Built-in clear affordance for search-like contexts without needing a separate SearchField component
- `monospaced`: Applies monospace font for code or formatted data entry -- a practical prop that most systems leave to custom styling
- `autoComplete`: Polaris explicitly documents autocomplete attribute guidance, recommending it on all inputs even when set to "off"

## A11y Highlights
- **Keyboard**: Standard input behavior. Clear button is keyboard-accessible. Connected fields maintain a logical tab order where the TextField and its connected elements are sequential in the tab flow.
- **Screen reader**: Label is required and programmatically associated. Prefix and suffix text are included in the accessible description so screen readers announce "$" before the value and "%" after it, providing the same context sighted users get visually.
- **ARIA**: Uses aria-describedby for help text and error messages. Error state is communicated via aria-invalid. Connected fields maintain individual labeling while the visual grouping communicates their relationship.

## Strengths & Gaps
- **Best at**: Commerce-specific patterns -- the connected fields, prefix/suffix, and verticalContent props create the most complete solution for value+unit, currency, and tag-input patterns among all systems researched.
- **Missing**: No quiet/borderless variant for inline-edit contexts, no built-in character counter, no multiple sizes (Polaris uses a single standard size), and no fluid/auto-width mode.
