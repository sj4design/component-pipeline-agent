---
system: Ant Design
component: Typography with `editable` prop (Typography.Text, Typography.Title, Typography.Paragraph)
url: https://ant.design/components/typography/
last_verified: 2026-03-28
---

# Inline Edit (via Typography `editable` prop)

## Approach
Ant Design takes a fundamentally different architectural approach to inline editing compared to Atlassian's dedicated InlineEdit component. Rather than a standalone component, Ant Design integrates editing capability directly into the Typography component family (Typography.Text, Typography.Title, Typography.Paragraph) through an `editable` prop. The philosophy is that the text being edited is a typographic element first — it has a semantic role (heading, paragraph, label) and rendering characteristics — and the ability to edit it is a capability layered onto that typography, not a separate component category. This reflects Ant Design's general preference for prop-based capability enhancement over component proliferation. The tradeoff is that inline editing in Ant is only available for typography elements, not for arbitrary custom display content — if you need to inline-edit a value displayed as a Badge, a Tag, or a custom composite element, Ant's built-in approach does not apply, and you must compose a custom solution.

## Key Decisions
1. **Editing as a Typography capability, not a separate component** (HIGH) — The `editable` prop on Typography.Text or Typography.Paragraph enables a pencil icon affordance that switches the text to an input. This architectural choice means that text elements throughout an Ant Design application can become editable with a single prop addition, without any component import changes or structure refactoring. For teams building content-heavy applications (CMS interfaces, wiki tools, note-taking apps), this prop-based enhancement reduces boilerplate significantly compared to Atlassian's render-prop approach. The limitation is that it only works for textual values in typographic roles.
2. **Edit icon affordance (pencil icon) is the visual signal** (HIGH) — Unlike Atlassian where the read view is a custom-rendered element and the click target is the text itself, Ant Design's editable Typography displays a persistent pencil icon alongside the text. Clicking this icon (or the text itself, depending on configuration) enters edit mode. The persistent icon is more discoverable than pure click-on-text activation, because users can see the affordance without mousing over the text. The tradeoff is visual clutter — in information-dense UIs, every editable text value having a pencil icon can be noisy.
3. **`onStart`, `onChange`, `onEnd`, `onCancel` callback model** (MEDIUM) — The `editable` prop object accepts a rich callback interface: `onStart` (edit mode entered), `onChange` (value changed), `onEnd` (confirmed), `onCancel` (cancelled). This callback model makes it straightforward to integrate with form state management libraries and server-save workflows. The `onEnd` receives the final string value, which is simpler than Atlassian's render-prop model where the application manages the value through the child input's props.
4. **`maxLength` and `autoSize` within the edit input** (MEDIUM) — The editable configuration accepts `maxLength` (character limit with display indicator) and `autoSize` (TextArea auto-grow behavior for Paragraph editing). These features reflect Ant Design's use cases: editing a tweet-length caption needs a character counter; editing a product description paragraph needs an auto-growing textarea. These are practical features that Atlassian's InlineEdit leaves to the application to implement in the `editView` render prop.
5. **`text` prop for controlled edit value** (MEDIUM) — The `editable` object has a `text` prop that allows specifying a different value for the edit input than what is displayed. This is useful when the display is formatted (e.g., "$1,234.56") but the edit value should be the raw number ("1234.56"), allowing editing of the underlying data while displaying a formatted version. This is a nuanced feature that addresses a real-world formatting vs. editing tension not explicitly handled in other systems.

## Notable Props
- `editable`: `boolean | EditConfig` — The core prop. When an object, accepts: `{ editing, icon, tooltip, maxLength, autoSize, text, onChange, onStart, onEnd, onCancel }`.
- `editable.icon`: Custom React element to replace the default pencil icon — allowing branded or context-specific edit affordances.
- `editable.tooltip`: Custom tooltip text for the edit trigger — defaults to "Edit" but can be set to context-specific strings like "Rename" or "Edit title".
- `editable.text`: The raw value passed to the edit input, separate from the display text.
- `editable.triggerType`: `Array<'icon' | 'text'>` — Controls whether clicking the icon, the text, or both activates edit mode.

## A11y Highlights
- **Keyboard**: The pencil icon trigger is keyboard-focusable (Tab) and activatable (Enter/Space). Within the edit input, Enter confirms (for Text) or Shift+Enter confirms (for Paragraph, where Enter creates a line break). Escape cancels.
- **Screen reader**: The Typography.Text element reads the current value. The pencil icon button has an `aria-label` of "Edit" (or the custom tooltip text), giving screen reader users a clear action description. After confirming, focus returns to the text element and the new value is announced.
- **ARIA**: The edit trigger icon uses `role="button"`. The text element itself does not have `role="button"` unless `triggerType` includes "text" — in which case it should, but Ant's implementation of this particular a11y detail should be verified in the current version.

## Strengths & Gaps
- **Best at**: Zero-friction inline editing for typography elements — adding `editable` to an existing Typography.Text component is the lowest-effort path to inline editing in any Tier 1 system, and the `text` prop for separating display format from edit value is a unique and practically valuable feature.
- **Missing**: Support for non-typography display values — if the value is displayed as a custom component (a colored Badge, a Tag with an icon, a metric card value), Ant Design's editable Typography approach does not apply, requiring a custom composition that provides no standard reference from Ant Design's documentation.
