---
component: inline-edit
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — mobile-first editing model
**Approach:** M3 has no InlineEdit component. M3's mobile-first heritage favors explicit navigation to edit screens rather than direct manipulation of displayed values. A tap on text in a mobile app is ambiguous (navigate, select, tooltip) — M3 avoids the pattern. Teams compose view/edit state from TextField with `readOnly` prop. No pattern-level guidance on inline editing exists in M3's documentation.
**Key Decisions:**
- [HIGH] Absent: Android HIG favors navigate-to-edit screens; M3 reflects this — direct in-place editing is not an idiomatic M3 pattern
- [MED] TextField composition: `TextField readOnly` for display state → active `TextField` for edit state — no standardized confirm/cancel affordances
- [HIGH] No pattern documentation: even the composition approach is undocumented; teams have no M3 reference for keyboard shortcuts, confirmation affordances, or error states
**Notable API:** No component. `TextField` with `readOnly` prop as the only related primitive.
**A11y:** Custom implementations must handle: Enter/F2 to enter edit mode, Escape to cancel, Enter to confirm, `aria-label` changes to reflect current mode.
**Best at:** Nothing for inline editing — M3 provides no support at component or pattern level.
**Missing:** Entire inline editing pattern, including state machine, keyboard shortcuts, confirmation affordances, and design guidance.

---

## spectrum
**Component:** Absent — product-level implementation
**Approach:** Spectrum has no InlineEdit component. Adobe's products (Photoshop layer naming, Experience Manager asset renaming, Analytics cell editing) use in-place editing extensively, but each is a product-level implementation using Spectrum primitives. No pattern documentation exists. The high variability across product contexts appears to be the reason no generalized component has been built.
**Key Decisions:**
- [HIGH] Absent: product team diversity prevents generalization — Photoshop layer name editing vs. Experience Platform cell editing have different UX constraints
- [MED] TextField for edit state: `autoFocus`, `onBlur`, `onChange` are the composition hooks; view state is a custom styled text display
- [HIGH] No pattern documentation: unlike Atlassian which explicitly documents when to use InlineEdit vs. a form, Spectrum provides no guidance — teams cannot look to Spectrum for keyboard or error state decisions
**Notable API:** No component. `TextField` with `autoFocus`; `Text` for view state; `Button` with icon for confirm/cancel.
**A11y:** No prescribed pattern. Standard inline edit a11y requires: `role="button"` on view state text, `aria-live` for mode change announcements, focus return to display element after save/cancel.
**Best at:** Nothing — Spectrum has no inline edit capability or pattern guidance.
**Missing:** Component and pattern documentation for keyboard shortcuts, save confirmation, and error states in inline editing contexts.

---

## carbon
**Component:** Absent — DataTable provides table-context inline editing only
**Approach:** Carbon has no general InlineEdit component. Inline editing in Carbon is scoped to DataTable cells via the `useEditableRows` pattern — the most common IBM enterprise use case. For non-table contexts (heading editing, item name editing, attribute editing in detail panels), teams build custom solutions. No general-purpose InlineEdit is planned in Carbon's roadmap.
**Key Decisions:**
- [HIGH] Table-scoped inline editing only: DataTable's built-in inline editing covers IBM's primary use case; general InlineEdit for arbitrary text values is not planned
- [MED] Explicit edit modes preferred in IBM context: IBM's critical system configuration apps favor visible "Edit" buttons over direct-click activation — lower accidental edit risk for high-stakes configuration
- [MED] No community pattern: unlike other Carbon gaps, no widely-adopted community InlineEdit pattern exists; teams reference Atlassian's implementation as a design guide
**Notable API:** No component. `DataTable` with editable cell configuration for table-context editing.
**A11y:** DataTable inline editing uses F2 to enter edit mode in cells (ARIA grid interaction pattern), Escape to cancel, Enter to confirm.
**Best at:** Table-cell inline editing within DataTable — well-designed for enterprise data grids.
**Missing:** General InlineEdit for non-table contexts: heading editing, item name editing, detail panel attribute editing.

---

## polaris
**Component:** No dedicated component — pattern documentation for composition
**Approach:** Polaris handles inline editing through composed patterns using TextField. The pattern documentation (without a formal component) distinguishes between click-to-edit (direct activation) and explicit Edit button activation, and between auto-save-on-blur and explicit confirmation — valuable guidance even without a component. Teams in Shopify Admin implement view/edit toggle independently.
**Key Decisions:**
- [MED] Composition over component: Polaris provides pattern guidance for the activation model and save/cancel decision without a formal component — flexibility at the cost of consistency
- [HIGH] Click activation must be discoverable: every editable value should have a visible affordance (pencil icon or Edit button) — users should not discover editability by accident
- [MED] Auto-save vs. explicit confirmation guidance: auto-save on blur for single-value quick edits; explicit confirm button for multi-field or high-stakes edits — the most practically useful distinction in Tier 1 for teams without a component
**Notable API:** No component. `TextField` with `autoFocus`, `onBlur`, `onFocus`; pattern documentation for save/cancel decision.
**A11y:** Pattern documentation requires: Tab-reachable and Enter/Space-activatable display element; Escape to cancel; Enter to confirm; focus return to display after save.
**Best at:** Auto-save vs. explicit confirmation guidance — the most practical pattern-level documentation for inline editing among systems lacking a dedicated component.
**Missing:** A formal InlineEdit component — teams reimplement the state machine, keyboard handling, and accessible focus management for each inline editing context.

---

## atlassian
**Component:** InlineEdit (definitive Tier 1 implementation)
**Approach:** Atlassian's InlineEdit is a production-proven component used in Jira issue titles, Confluence page titles, Trello card names, and sprint goals. Three explicit states: view, edit, saving. `readView` and `editView` are render props — fully customizable display and edit surfaces with the state machine managed by the component. Built-in confirm (checkmark) and cancel (X) buttons linked to Enter and Escape keyboard shortcuts. `keepEditViewOpenOnBlur` for multi-field edits.
**Key Decisions:**
- [HIGH] Render-prop architecture: `readView` and `editView` are functions returning React elements — any display type (large heading, small label, data value) uses the same InlineEdit component with different visual treatments
- [HIGH] Built-in confirm/cancel button pair: checkmark/X buttons positioned below the field with keyboard bindings — makes the interaction discoverable for non-keyboard users while providing shortcuts for power users
- [MED] `keepEditViewOpenOnBlur` for multi-field: blur-to-save is default for single value edits; `keepEditViewOpenOnBlur` keeps edit mode open when focus moves to the confirm/cancel buttons
**Notable API:** `readView: () => ReactElement`; `editView: (fieldProps, ref) => ReactElement`; `onConfirm: (value) => void`; `keepEditViewOpenOnBlur: boolean`; `isRequired: boolean`; `validate: (value) => string | void`; `startWithEditViewOpen: boolean`
**A11y:** `role="button"` + `tabIndex={0}` on readView; Enter activates edit mode; Escape cancels; focus returns to readView after confirm/cancel. `aria-live` announces mode entry. `aria-live="assertive"` for validation errors. Best-in-class focus management for inline editing.
**Best at:** Complete, production-proven InlineEdit with render-prop flexibility, confirm/cancel keyboard handling, inline validation, and accessible focus management — the reference implementation for Tier 1.
**Missing:** Multi-field inline edit (editing multiple related values simultaneously as a unit).

---

## ant-design
**Component:** Typography `editable` prop (Typography.Text/Title/Paragraph)
**Approach:** Ant Design integrates inline editing directly into the Typography component family via an `editable` prop object. The pencil icon affordance triggers edit mode. The `text` prop separates the displayed (formatted) value from the raw edit value. `maxLength` with character counter and `autoSize` for growing textarea are built-in for Paragraph editing. Works only for typographic text elements — not arbitrary display components.
**Key Decisions:**
- [HIGH] Editing as Typography capability: `editable` added to an existing Typography.Text component with a single prop change — the lowest-effort path to inline editing in Tier 1
- [MED] `editable.text` separates display from edit value: display "$ 1,234.56" while editing `1234.56` — formatted display with raw numeric editing without custom composition
- [MED] Persistent pencil icon affordance: visible edit trigger icon alongside text — more discoverable than pure click-on-text activation but adds visual noise in dense UIs
**Notable API:** `editable: boolean | { editing, icon, tooltip, maxLength, autoSize, text, onChange, onStart, onEnd, onCancel }`; `editable.triggerType: ("icon" | "text")[]`; `editable.tooltip` for custom edit button label
**A11y:** Pencil icon trigger is `role="button"` with keyboard focus and Enter/Space activation; Escape cancels; Enter confirms (Shift+Enter for Paragraph). `aria-label` on the icon from tooltip text. `triggerType` including "text" may have incomplete `role="button"` on the text element itself — verify in current implementation.
**Best at:** Zero-friction addition to existing Typography elements and the `editable.text` prop for separated display/edit values — unique practical feature for formatted value editing.
**Missing:** Support for non-typography display values (Badge, Tag, custom composites); no built-in render-prop API for custom display treatments beyond typography.
