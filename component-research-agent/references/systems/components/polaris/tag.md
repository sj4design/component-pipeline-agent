---
system: Polaris (Shopify)
component: Tag
url: https://polaris.shopify.com/components/tag
last_verified: 2026-03-28
---

# Tag

## Approach

Shopify Polaris's Tag component is deliberately minimal — and that minimalism is a philosophical statement. Polaris describes tags as "interactive, merchant-supplied keywords that help label, organize, and categorize objects." The phrase "merchant-supplied" is the key: in Shopify's domain, tags are almost always user-created metadata on products, orders, or customers — they are input artifacts, not system-assigned status labels. This shapes every design decision in the component: tags in Polaris exist in the context of merchants managing their own data, not systems communicating status to users. The component is therefore optimized for the add/remove workflow — easy to add via a text input, easy to remove via a clearly labeled close button. Polaris explicitly enforces mutually exclusive interaction states through its prop API: a tag can either navigate (`url`), trigger a custom action (`onClick`), or be removable (`onRemove`), but never a combination. This constraint reflects Shopify's UX philosophy of reducing merchant cognitive load — a clickable tag that also has a remove button creates ambiguity about what interaction is primary. The system's simplicity is a feature, not a limitation.

## Key Decisions

1. **Mutually exclusive interaction props (onClick vs onRemove vs url)** (HIGH) — The API only allows one interaction mode at a time: the tag is either a link, a button, or has a separate remove button, never a combination. The WHY: in merchant-facing UIs, interaction ambiguity creates support burden. Shopify research found that tags with multiple interactive affordances (e.g., "click to filter AND click X to remove") confused merchants who weren't sure what the primary action was. The constraint is enforced through props to prevent accidental ambiguous UIs.

2. **Auto-generated aria-label on remove buttons** (HIGH) — When `onRemove` is provided, the close button automatically receives an `aria-label` of "Remove [tag text]" without requiring the developer to specify it. The WHY: Shopify's merchant-facing products are built by many teams, and accessibility implementation quality varies. By generating the remove button's `aria-label` automatically from the tag's text content, Polaris eliminates the most common a11y failure on dismissible components — an unlabeled or incorrectly labeled remove button.

3. **Size variant for system-applied vs merchant-applied tags** (MEDIUM) — The `size="large"` option is documented specifically for "auto-applied attributes" — tags that the Shopify system adds automatically rather than the merchant adding manually. The WHY: in Shopify Admin, system-generated tags (like automatic shipping classifications or fraud risk indicators) need to stand out from merchant-applied custom tags. Rather than using a different component, the size variant signals provenance: large = system, default = merchant.

4. **Focus management guidance is documentation-level, not API-level** (MEDIUM) — Polaris documents that "focus should move to the next element after removal" but does not enforce this in the component itself. The WHY: Polaris operates in a multi-framework environment where focus management involves app-level state, not just component-level DOM manipulation. Rather than implement opinionated focus management that might conflict with each team's state management approach, Polaris documents the expected behavior and leaves implementation to each team.

5. **No TagGroup or container component** (MEDIUM) — Tags are standalone components with no built-in group wrapper. The WHY: in Shopify Admin's architecture, tags appear in many different container contexts (product forms, order filters, customer profiles), each with different layout requirements. A prescriptive TagGroup component would constrain layout flexibility that Shopify's diverse use cases require. Teams compose their own tag lists using Polaris layout primitives (InlineStack, etc.).

## Notable Props

- `onRemove`: The primary interaction prop — its presence automatically generates a close button with correct aria-label, making this the most impactful single prop in the component
- `accessibilityLabel`: Allows overriding the auto-generated remove button label — useful when the tag text alone is insufficient context (e.g., a tag in a list where "Remove" needs to say "Remove from product" not just "Remove red")
- `disabled`: Disables all interaction (both onClick/url and onRemove) — important in read-only views of merchant data where tags should be visible but not editable
- `size`: The `"large"` value is specifically for system-generated tags — a rare example of a size prop that carries semantic meaning beyond visual scaling

## A11y Highlights

- **Keyboard**: Tags using `onClick` or `url` receive focus via Tab and activate with Enter/Space (url) or Enter/Space (onClick). The remove button on dismissible tags is a separate focusable element reached via Tab, activated with Enter/Space. After removing a tag, focus should move to the next tag in the list or to the input field that adds new tags — this is documented guidance, not automatic behavior.
- **Screen reader**: Remove buttons announce as "Remove [tag text]" automatically. Tags rendered as links announce their destination. The `accessibilityLabel` prop allows custom announcement text for complex tag content.
- **ARIA**: `url` tags render as `<a>` elements with standard link semantics. `onClick` tags render as `<button>` elements. Remove buttons are `<button>` elements with `aria-label`. The component does not use custom ARIA roles — it relies on native HTML semantics throughout, which is Polaris's general accessibility philosophy.

## Strengths & Gaps

- **Best at**: Merchant-centric add/remove workflow — the auto-generated aria-label, mutually exclusive interaction model, and documentation of focus management post-removal make Polaris Tag the cleanest reference for removable tag UX in user-managed data contexts.
- **Missing**: No semantic color system and no TagGroup container — for teams needing status tags (success/error/warning colors) or built-in overflow management, Polaris offers no guidance, reflecting its e-commerce focus where merchant-supplied tags are typically unstyled keywords rather than status indicators.
