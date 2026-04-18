---
component: inline-edit
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Inline Edit — Research Document (--max)

## Meta

| Field | Value |
|-------|-------|
| Date | 2026-04-17 |
| Mode | --max (all systems, all patterns) |
| Systems surveyed | 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3) |
| Scope | All inline editing patterns, states, confirmation models, keyboard behaviors |

---

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|-----------|
| Material Design 3 | Mobile-first; M3 favors navigate-to-edit screens; tap on text is ambiguous | `TextField readOnly` for display → active `TextField` for edit; no standardized confirm/cancel |
| Spectrum (Adobe) | Product-level variability prevents generalization (Photoshop ≠ Analytics cell editing) | `TextField` with `autoFocus`; `Text` for view; `Button` for confirm/cancel; no pattern docs |
| Carbon (IBM) | Table-scoped inline editing only (DataTable); general InlineEdit not planned | `DataTable` editable cells for table context; custom composition otherwise |
| Polaris (Shopify) | Pattern documentation exists but no formal component | `TextField` + view/edit toggle; pattern guidance on auto-save vs. explicit confirmation |
| Twilio Paste | Not present | Compose from Text + Input + Button |
| GitHub Primer | Not dedicated; InlineAutocomplete only for @mention | Compose from Input + conditional rendering |
| shadcn/ui | Not present | Compose from Input + conditional rendering |
| Playbook | Not present | No documented pattern |
| REI Cedar | Not present | No documented pattern |
| Wise Design | Not present; form flows used instead | No documented pattern |
| Dell Design System | Not present | No documented pattern |
| Radix UI | No primitive; consumer manages state | Conditional render between display and input; Radix avoids patterns that are primarily state management |
| GOV.UK | Deliberate absence; "one thing per page" principle | "Check Your Answers" pattern — summary page + "Change" links navigate to dedicated question pages |
| Base Web | No component or pattern; varies per team | Compose from Input with manual toggle; confirmation model varies |
| Fluent 2 | Philosophical rejection; Microsoft research: in-place editing increases error rates in dense views | Dialog or OverlayDrawer with explicit edit form |
| Gestalt | Mobile-first; inline editing unreliable on touch | Sheet/Modal with explicit Save/Cancel |
| Mantine | Out of scope; community pattern only | Text + TextInput toggle; FocusTrap; Popover-based alternative |
| Orbit | Linear booking funnel; edits redirect to step pages | Step-page navigation for edits |
| Evergreen | Multi-field config entities; SideSheet pattern | SideSheet/Dialog with explicit Save/Cancel |
| Nord | Healthcare regulations (HIPAA, EU MDR); save-on-blur incompatible with audit trails | Explicit logged confirmation flow; no in-place editing allowed |

---

## How Systems Solve It

### Atlassian (InlineEdit)

Atlassian's InlineEdit is the definitive Tier 1 implementation — a production-proven component used across Jira issue titles, Confluence page titles, Trello card names, and sprint goals. The render-prop architecture (`readView` / `editView` as functions returning React elements) enables complete customization of display and edit surfaces while the component owns the state machine. Three explicit states: view, edit, saving. Built-in confirm (checkmark) and cancel (×) buttons are linked to Enter and Escape keyboard shortcuts, making the interaction both discoverable for pointer users and efficient for keyboard users. `keepEditViewOpenOnBlur` resolves the fundamental blur ambiguity for multi-field edits.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Render-prop architecture (`readView` / `editView`) | Any display type (large heading, small label, currency value) uses the same InlineEdit with different visual treatments | H | Render props avoid the "only works for text" limitation of Typography-coupled approaches |
| Built-in confirm/cancel button pair (checkmark/×) | Makes interaction discoverable for non-keyboard users; keyboard users get Enter/Escape shortcuts | H | Always include both visual buttons AND keyboard shortcuts; one without the other is incomplete |
| `keepEditViewOpenOnBlur` for multi-field edits | Default blur-to-save works for single-value quick edits; multi-field edits need focus to move to buttons without triggering save | H | This prop solves the most common multi-edit regression; implement it from day one |
| `validate: (value) => string | void` | Inline validation without leaving edit mode; error display without form context | M | Inline validation is critical for editable cells in tables and dashboards |
| `startWithEditViewOpen` | "Add new" flows where the field opens pre-focused | M | Needed for create-mode inline fields |

**Notable Props:** `readView: () => ReactElement`; `editView: (fieldProps, ref) => ReactElement`; `onConfirm: (value) => void`; `keepEditViewOpenOnBlur: boolean`; `isRequired: boolean`; `validate: (value) => string | void`; `startWithEditViewOpen: boolean`; `isEditing: boolean` (controlled mode)

**Accessibility:** `role="button"` + `tabIndex={0}` on readView wrapper; Enter activates edit mode; Escape cancels; focus returns to readView after confirm/cancel; `aria-live="polite"` announces mode entry; `aria-live="assertive"` for validation errors. Best-in-class focus management in Tier 1.

---

### Ant Design (Typography `editable` prop)

Ant Design integrates inline editing directly into the Typography component family via an `editable` configuration object — the lowest-effort path to inline editing in Tier 1. The pencil icon affordance triggers edit mode (persistent, visible alongside text). The `text` prop separates the displayed value (formatted) from the raw edit value — "$ 1,234.56" displayed, `1234.56` edited. `maxLength` with character counter and `autoSize` for growing textarea are built-in for Paragraph editing. The `triggerType` array enables text itself as the click target.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| `editable.text` separates display from edit value | Formatted display (currency, dates) with raw editing without custom composition | H | Unique practical feature — reference for formatted-value inline editing |
| Persistent pencil icon affordance | Edit trigger always visible — more discoverable than hover-only pencil | M | Always-visible affordance has visual noise cost; hover-reveal pencil is the spectrum alternative |
| Inline editing as Typography capability | Zero-friction addition to existing text elements | M | Works only for typographic text; non-typography display values need a different approach |
| `editable.triggerType` (icon | text) | Text itself as click target for space-constrained UIs | M | Combine both for maximum discoverability |

**Notable Props:** `editable: boolean | { editing, icon, tooltip, maxLength, autoSize, text, onChange, onStart, onEnd, onCancel, triggerType: ("icon" | "text")[] }`; Typography.Text / Typography.Title / Typography.Paragraph

**Accessibility:** Pencil icon trigger is `role="button"` with keyboard focus and Enter/Space activation; Escape cancels; Enter confirms (Shift+Enter for Paragraph); `aria-label` on icon from tooltip text. `triggerType: ["text"]` may have incomplete `role="button"` semantics on text element — verify in current implementation.

---

### Chakra UI (Editable)

Chakra's Editable is the only Tier 3 inline edit implementation and the reference compound component architecture for the pattern. The compound model (Editable / EditablePreview / EditableInput / EditableTextarea) independently styles and positions the preview and input, avoiding the "magic size-matching" problem of single-element inline edits. `EditableControls` is a render prop for custom save/cancel button layout rather than prescribing a fixed button position. The `submitOnBlur` boolean explicitly chooses between blur-to-save (default true) and explicit save/cancel model.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Compound component (Preview/Input as separate children) | Preview and input independently styled; no magic size-matching; cleaner DOM | H | Reference architecture for inline edit component composition |
| `submitOnBlur` as explicit prop | Forces teams to make a conscious UX decision rather than accepting an opinionated default | H | The most important single configuration in inline editing UX; must be explicit |
| `EditableControls` render prop | Custom button layout without prescribed positioning — buttons above, below, inline, or in a popover | M | Save/cancel button positioning is context-dependent; render prop is the right abstraction |
| `startWithEditView` | "Add new" flows where the field opens pre-focused | M | Same use case as Atlassian's `startWithEditViewOpen` |
| `isPreviewFocusable` | Controls whether preview is in the tab order (default true) | M | `false` for display-only contexts where editing is triggered programmatically |

**Notable Props:** `submitOnBlur`; `startWithEditView`; `isPreviewFocusable`; `placeholder`; `value` / `defaultValue`; `onChange`; `onSubmit`; `onCancel`; `onEdit`; `selectAllOnFocus`

**Accessibility:** EditablePreview receives focus and Enter activates edit mode; Escape cancels and returns focus to preview; `submitOnBlur` default (true) may cause accidental saves for keyboard/switch users — document the accessibility implication.

---

### Lightning Design System (Salesforce) — Table + Record Field

Lightning's Inline Edit is the most comprehensive Tier 2 implementation, purpose-built for CRM table and record field contexts. Record field editing uses a pencil icon that appears on hover/focus — clicking reveals the input in place of the display value. Table inline editing supports mass edit (editing the same field across multiple selected rows simultaneously). Popout editors handle complex field types (rich text, lookups, date pickers) that can't fit in an inline input. Keyboard-driven table cell editing follows the ARIA grid pattern (F2 to enter edit mode).

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Hover/focus pencil icon on record fields | Progressive disclosure — edit affordance doesn't clutter display mode | H | Pencil-on-hover is the standard CRM pattern; implement with focus-visible fallback |
| Mass edit for table inline editing | Correcting the same field on many records simultaneously — critical CRM efficiency pattern | M | Only relevant for table-context inline editing with row selection |
| Popout editors for complex field types | Rich text, lookup, and date fields can't be inline — popout editor keeps them in context | H | Plan for non-text field types in your inline edit system |
| F2 to enter edit mode in cells | ARIA grid interaction pattern; standard for accessible data table cell editing | H | F2 is the correct keyboard shortcut for cell edit mode in grid contexts |

**Accessibility:** F2 to enter edit mode in table cells (ARIA grid pattern); Escape to cancel; Enter to confirm; `aria-live` announcement when cell enters/exits edit mode.

---

### Carbon (IBM) — DataTable Context

Carbon scopes inline editing to DataTable cells via the `useEditableRows` pattern. This is intentionally limited to the IBM enterprise use case (data tables), with Carbon explicitly not planning a general InlineEdit component. The DataTable inline editing follows ARIA grid interaction patterns correctly. For non-table contexts, IBM teams reference Atlassian's implementation as a design guide — an acknowledgment that Atlassian's is the reference implementation.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Table-scoped only by design | IBM's primary inline editing use case is data grid cells; general InlineEdit is lower priority | M | Table-cell inline editing has its own ARIA patterns (grid, F2, arrow keys) that differ from general inline edit |

**Notable Props:** `DataTable` with editable cell configuration

**Accessibility:** F2 to enter edit mode in cells; Escape to cancel; Enter to confirm (ARIA grid pattern).

---

### Polaris (Shopify) — Pattern Documentation

Polaris provides the most practically useful pattern documentation for inline editing among systems without a formal component. Key guidance: every editable value must have a visible affordance (pencil icon or Edit button) — users should not discover editability by accident. Auto-save on blur for single-value quick edits; explicit confirm button for multi-field or high-stakes edits. This auto-save vs. explicit confirmation guidance is the most valuable decision framework in the Tier 1 set.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Auto-save vs. explicit confirmation guidance | Single-value quick edits can blur-to-save; multi-field or high-stakes edits need explicit confirmation | H | Use this framework to decide confirmation model per use case, not as a system-wide default |
| Visible affordance requirement | "Users should not discover editability by accident" — a UX principle with accessibility implications | H | Always-visible affordance (pencil/edit button) is more inclusive than hover-only |

---

## Pipeline Hints

### Archetype Recommendation

**Primary Archetype: Render-prop inline edit with explicit state machine (view → edit → saving)**

Rationale: Atlassian's render-prop architecture is the only Tier 1 production-proven InlineEdit component, and its architecture is validated by 3+ major products (Jira, Confluence, Trello). Chakra's compound component approach is the best Tier 3 reference for component structure. The critical decisions are: (1) render props for customizable display/edit surfaces, (2) explicit confirm/cancel affordances with keyboard bindings, (3) `keepEditViewOpenOnBlur` / `submitOnBlur` as an explicit configuration, not an opinionated default. Lightning's popout editor pattern validates that non-text field types need a different activation model.

---

### Slot Consensus Table

| Slot | N / systems-with-component | Notes |
|------|---------------------------|-------|
| readView / EditablePreview | 2/2 (Atlassian, Chakra) | Display-mode content; clickable to activate edit |
| editView / EditableInput | 2/2 | Edit-mode input; receives focus on activation |
| confirmButton / checkmark | 2/2 (Atlassian built-in, Chakra EditableControls) | Save action affordance |
| cancelButton / × | 2/2 | Cancel action affordance |
| editTrigger / pencil icon | Ant, Lightning, Polaris pattern | Persistent or hover-reveal edit activation button |
| validationMessage | 1/2 (Atlassian) | Inline error below input in edit mode |
| editableTextarea | Chakra (EditableTextarea), Ant (autoSize) | Multi-line inline editing |

---

### Property Consensus Table

| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| `readView` / `editView` | render prop | Atlassian | Fully customizable display and edit surfaces |
| `onConfirm` / `onSubmit` | function(value) | Atlassian, Chakra | Save callback with new value |
| `onCancel` | function | Atlassian, Chakra, Ant | Cancel callback |
| `onEdit` / `onStart` | function | Atlassian, Chakra, Ant | Edit mode activation callback |
| `submitOnBlur` / `keepEditViewOpenOnBlur` | boolean | Atlassian (keepEditViewOpenOnBlur=false default), Chakra (submitOnBlur=true default) | Controls blur behavior |
| `isEditing` | boolean | Atlassian controlled mode | External control of edit state |
| `startWithEditViewOpen` / `startWithEditView` | boolean | Atlassian, Chakra | Opens pre-focused for "add new" flows |
| `isRequired` | boolean | Atlassian | Prevents confirmation of empty values |
| `validate` | function(value) => string | void | Atlassian | Inline validation in edit mode |
| `defaultValue` / `value` | string | All | Initial / controlled value |
| `placeholder` | string | Chakra, Ant | Placeholder in edit mode |
| `isPreviewFocusable` | boolean | Chakra | Tab order control on preview element |
| `selectAllOnFocus` | boolean | Chakra | Select all text when entering edit mode |
| `editable` | boolean | object | Ant | Enable/configure inline editing on Typography |
| `text` | string | Ant (editable.text) | Separate display value from edit value |
| `maxLength` | number | Ant | Character limit with counter |
| `autoSize` | boolean | object | Ant | Growing textarea for Paragraph editing |
| `triggerType` | ("icon" | "text")[] | Ant | Edit activation targets |

---

### Boolean Properties Table

| Property | Default | Notes |
|----------|---------|-------|
| `submitOnBlur` | true (Chakra) | Most common inline edit UX decision |
| `keepEditViewOpenOnBlur` | false (Atlassian) | Atlassian inverts: false = blur cancels; true = blur kept for multi-field |
| `startWithEditViewOpen` | false | "Add new" pattern |
| `isRequired` | false | Atlassian; prevents saving empty values |
| `isEditing` | false | Atlassian controlled mode |
| `isPreviewFocusable` | true | Chakra; remove from tab order if needed |
| `selectAllOnFocus` | false | Chakra; selects all text on edit activation |
| `autoSize` | false | Ant Paragraph growing textarea |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| view (read) | All implementations | Display state; trigger visible or hover-revealed |
| edit (active) | All implementations | Input focused; confirm/cancel affordances visible |
| saving / loading | Atlassian | Post-confirm async state; spinner/loading indicator |
| error / validation | Atlassian (validate prop) | Inline error message below input in edit mode |
| disabled | Atlassian, Ant | Cannot enter edit mode |
| required (empty invalid) | Atlassian (isRequired) | Cannot confirm with empty value |
| hover (trigger reveal) | Ant (icon visible), Lightning (pencil on hover), Polaris pattern | Hover-reveal edit affordance |
| focus-visible (trigger reveal) | Best practice; Lightning, Polaris | Keyboard-accessible equivalent of hover-reveal |

---

### Exclusion Patterns

- **Avoid inline editing for multi-field related data** — editing related fields simultaneously as a unit should use a dialog or panel (Fluent 2's philosophy). Inline edit is for single-field value corrections.
- **Avoid auto-save on blur in high-stakes contexts** — clinical data (Nord), financial records, CRM data with automations (Atlassian Jira) should use explicit confirmation. Save-on-blur is appropriate only for low-stakes quick corrections.
- **Avoid inline editing in mobile-first / touch-first UIs** — Gestalt's research shows touch interactions are ambiguous for in-place editing. Use sheet/modal for mobile editing.
- **Don't make hover-only the sole edit trigger** — hover affordances are inaccessible for keyboard users; always provide a focus-visible equivalent.
- **Avoid inline editing in transactional / government flows** — GOV.UK's "one thing per page" and "Check Your Answers" patterns are the correct approach for forms where cognitive clarity matters.
- **Don't conflate table-cell inline editing (F2, arrow keys, grid pattern) with general inline editing** — these are different ARIA interaction models.

---

### Building Block Candidates

| Candidate | Used by | Notes |
|-----------|---------|-------|
| FocusTrap | Mantine community pattern | Contains focus within edit area for popover-based confirm/cancel |
| Popover (for confirm/cancel buttons) | Mantine community, some Lightning popout editors | Alternative to inline confirm/cancel button layout |
| TextField / Input | All composition approaches | The edit-mode input element |
| LiveRegion / aria-live | Atlassian, best practice | Announce mode transitions to screen readers |
| IconButton (pencil/edit trigger) | Lightning, Ant, Polaris pattern | Hover-reveal or persistent edit activation |

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `triggerType` (Ant) | icon \| text |
| confirmation model | auto-save (blur-to-save) \| explicit (confirm/cancel buttons) \| Enter-to-save |
| activation model | click-on-text \| click-on-icon \| programmatic (`isEditing` controlled) |
| edit scope | single-value \| table-cell \| multi-field (use dialog instead) |
| `aria-live` | polite (mode change) \| assertive (validation errors) |

---

### A11y Consensus

| Aspect | Consensus | Notes |
|--------|-----------|-------|
| Read view role | `role="button"` + `tabIndex={0}` on display element | Atlassian; standard pattern |
| Edit activation keyboard | Enter or Space on read view trigger | Activates edit mode and moves focus to input |
| Cancel keyboard | Escape | Returns to read view; focus returns to trigger |
| Confirm keyboard | Enter | Submits value; focus returns to trigger |
| Focus management | Focus to input on activation; focus to trigger on save/cancel | Without this, keyboard users lose location in the page |
| Mode transition announcement | `aria-live="polite"` announcing "Editing [field name]" | OR move focus to input directly (implies edit state) |
| Validation error announcement | `aria-live="assertive"` for validation errors in edit mode | Immediate announcement is required for errors |
| Edit trigger label | `aria-label="Edit [field name]"` on pencil/edit icon button | Never generic "Edit" without context |
| Display trigger | Must not be a plain `<span>` with `onClick` — requires `role="button"` or `<button>` element | Span click handlers are inaccessible to keyboard |
| Save-on-blur accessibility | `submitOnBlur` is an accessibility risk for keyboard/switch users | Document prominently; recommend `submitOnBlur=false` for keyboard-heavy contexts |
| Table cell activation | F2 to enter edit mode in ARIA grid contexts | Different from general inline edit (Enter/click) |
| APG pattern | Button Pattern (activation) + Dialog Pattern (for popout editors) | No dedicated APG pattern for inline edit; compose from Button + live region |

---

## What Everyone Agrees On

1. **Focus management is non-negotiable** — activating edit mode must move focus to the input; exiting (save or cancel) must return focus to the trigger element. Without this, keyboard-only users lose their place in the page. Every system that implements inline edit (Atlassian, Chakra, Ant, Lightning) documents this. Every system that chose not to implement it cites focus complexity as a reason.

2. **The activation trigger must be keyboard-accessible** — plain `<span>` click handlers are universally rejected. The read-view element must be a `<button>` or `role="button"` with Enter/Space activation. Atlassian, Chakra, Ant, and Polaris's pattern documentation all require this.

3. **Inline editing is appropriate for single-value corrections, not multi-field forms** — Polaris, Fluent 2, Atlassian, and GOV.UK all converge on this: if editing requires context from other fields or has multi-field scope, use a dialog/panel/page. Inline edit is for spot corrections.

4. **Escape to cancel, Enter to confirm** — universal keyboard contract across all implementations (Atlassian, Chakra, Ant, Lightning, Carbon DataTable, Polaris pattern). No system deviates from this.

5. **The edit affordance must be visible or keyboard-discoverable** — hover-only pencil icons are insufficient. Every system provides a focus-visible equivalent. Polaris's pattern documentation requires "a visible affordance — users should not discover editability by accident."

6. **Save-on-blur is a UX decision, not a default** — Chakra makes it configurable (`submitOnBlur`); Atlassian provides `keepEditViewOpenOnBlur`; Polaris's pattern guidance distinguishes single-value (blur-to-save OK) from multi-field (explicit confirm required). This is the most important single design decision in inline editing.

7. **Inline validation without leaving edit mode** — all Tier 1 systems that implement inline edit (Atlassian) or provide pattern guidance (Polaris) require validation feedback in edit mode. Navigating away from the field to see a validation error is an antipattern.

---

## Where They Disagree

### 1. Render props vs. compound components vs. prop-object configuration

**Option A: Render props (readView/editView)** — Atlassian
**Option B: Compound components (Preview/Input as children)** — Chakra (Editable/EditablePreview/EditableInput)
**Option C: Prop object on existing component** — Ant Design (`editable` object on Typography)

- Upside A: Maximum flexibility for display treatment; any React element as view or edit surface; works for headings, values, badges
- Downside A: Verbose; render props are less discoverable than JSX children
- Upside B: JSX composability; independently styled/positioned preview and input; children are more discoverable
- Downside B: Preview and input must be sibling children; complex nesting can occur
- Upside C: Zero new component; lowest adoption friction for teams already using Typography
- Downside C: Only works for typographic text elements; no generic inline edit capability
- Para tu caso: Option A (render props) if you need maximum flexibility across display types. Option B (compound components) if your team prefers JSX composition. Option C only if inline editing is exclusively for text/heading elements.

---

### 2. Auto-save on blur vs. explicit confirm/cancel

**Option A: Auto-save on blur (default or option)** — Chakra (`submitOnBlur=true`), Ant Design, Polaris (single-value pattern)
**Option B: Explicit confirm/cancel buttons** — Atlassian (checkmark/×), Polaris (multi-field pattern), Lightning (table edit)
**Option C: Enter-only confirmation, Escape to cancel** — Carbon DataTable cell editing, some table patterns

- Upside A: Fast; low friction; works well for headings and single quick edits; no extra button UI
- Downside A: Accidental saves; accessibility risk for keyboard/switch users; confusing when confirmation is expected
- Upside B: Discoverable; matches user mental model for form editing; safe for high-stakes values; more accessible
- Downside B: More UI; button positioning is complex; awkward in tight layouts
- Upside C: Keyboard-efficient; no extra buttons; clear keyboard contract
- Downside C: No visual affordance for non-keyboard users; missing discoverability
- Para tu caso: Explicit confirm/cancel (Option B) as default; offer `submitOnBlur` as opt-in for simple single-value contexts. Never make auto-save the only option — it is an accessibility risk.

---

### 3. Inline confirm buttons vs. popover-positioned confirm buttons

**Option A: Confirm/cancel buttons directly below input (inline)** — Atlassian (checkmark/× below field)
**Option B: Confirm/cancel in a floating popover** — Mantine community pattern; some Lightning popout editors

- Upside A: Always visible; predictable position; no popover z-index issues
- Downside A: Shifts layout on activation; takes vertical space in compact UIs
- Upside B: Doesn't shift layout; can be positioned flexibly
- Downside B: Popover z-index conflicts; extra DOM complexity; less predictable keyboard navigation
- Para tu caso: Inline (Option A) for most contexts. Popover (Option B) only for table cell editing where layout shift is unacceptable.

---

### 4. Always-visible edit trigger vs. hover/focus-reveal pencil icon

**Option A: Always-visible pencil icon or "Edit" button** — Ant Design (persistent pencil), Polaris pattern recommendation
**Option B: Pencil icon reveals on hover/focus-visible** — Lightning (record fields), common CRM pattern

- Adopters of A: Ant Design, Polaris pattern guidance
- Adopters of B: Lightning Design System, Confluence headings
- Upside A: More accessible; discoverable without hover; no hover-exclusive affordance
- Downside A: Visual noise in dense UIs with many editable fields
- Upside B: Cleaner display mode; less visual noise in CRM-style record views
- Downside B: Inaccessible if focus-visible equivalent is not implemented; users may not discover editability
- Para tu caso: Always-visible for content-first UIs (dashboards, cards). Hover/focus-reveal for record/CRM views where every field is editable and the pattern is established.

---

### 5. Single-value inline edit vs. popout editor for complex fields

**Option A: Inline text input only** — Atlassian InlineEdit, Chakra Editable, Ant Typography editable
**Option B: Popout editor for complex field types** — Lightning (date, lookup, rich text popout editors)

- Adopters of A: Atlassian (for text values), Chakra
- Adopters of B: Lightning Design System
- Upside A: Truly in-place; no context shift; simple state machine
- Downside A: Cannot handle complex inputs (date pickers, rich text, lookup comboboxes) inline
- Upside B: Handles all field types; popout provides space for complex inputs
- Downside B: "Popout" breaks the "in-place" promise; closer to a Dialog pattern
- Para tu caso: Inline (Option A) for text/number/simple values. Popout (Option B) for date pickers, rich text, and lookup fields. Implement both patterns in your inline edit system.

---

### 6. Inline editing appropriate vs. inappropriate (philosophical split)

**Pro inline editing** — Atlassian (Jira/Confluence/Trello), Ant Design, Chakra, Lightning, Polaris pattern
**Anti inline editing** — Fluent 2 (error rate research), GOV.UK (cognitive load research), Nord (safety-critical), Gestalt (mobile-first), Orbit (linear funnel)

- Pro argument: Direct manipulation is faster for expert users; reduces navigation overhead; reflects mental model of "this value is editable"
- Anti argument (Fluent 2): Microsoft UX research found in-place editing increases error rates in dense list/table views — the display context makes users less careful
- Anti argument (GOV.UK): Mode ambiguity ("which parts are editable?") is a significant barrier for users with cognitive disabilities and low digital literacy
- Anti argument (Nord): Save-on-blur on clinical tablets could silently modify medication dosages — patient safety
- Para tu caso: Inline editing is appropriate for expert/power user contexts (CRM, productivity apps, developer tools). It is contraindicated for transactional flows, regulated data contexts, and general-public / low digital-literacy audiences.

---

## Visual Patterns Found

| Pattern | Description | Systems |
|---------|-------------|---------|
| Render-prop inline edit | readView / editView render props; confirm/cancel below field | Atlassian |
| Compound inline edit | Preview/Input as JSX children; EditableControls render prop | Chakra |
| Typography editable | Pencil icon on Typography element; activated on click | Ant Design |
| CRM record field pencil | Hover/focus-reveal pencil on labeled field; inline input replaces value | Lightning |
| Table cell inline edit | F2 to activate; arrow keys for navigation; grid ARIA pattern | Lightning, Carbon DataTable |
| Check Your Answers | Summary page with "Change" links to dedicated question pages | GOV.UK |
| Modal/dialog edit | Full-context edit form in dialog/panel; explicit Save/Cancel | Fluent 2, Evergreen, Gestalt |

```
ATLASSIAN-STYLE INLINE EDIT (view → edit states)

VIEW STATE:
┌─────────────────────────────────────────────────────┐
│  Sprint Goal                                        │
│  ┌───────────────────────────────────────────────┐  │
│  │  Complete user authentication flow  [✏ hover] │  │  ← readView; role="button"
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

EDIT STATE (after Enter/click):
┌─────────────────────────────────────────────────────┐
│  Sprint Goal                                        │
│  ┌───────────────────────────────────────────────┐  │
│  │  Complete user authentication flow            │  │  ← editView input (focused)
│  └───────────────────────────────────────────────┘  │
│  [✓ Confirm]  [✕ Cancel]                            │  ← confirm/cancel buttons
└─────────────────────────────────────────────────────┘

EDIT STATE WITH VALIDATION ERROR:
┌─────────────────────────────────────────────────────┐
│  Sprint Goal                                        │
│  ┌───────────────────────────────────────────────┐  │
│  │  [empty value]                                │  │  ← invalid; isRequired
│  └───────────────────────────────────────────────┘  │
│  ⚠ This field is required                          │  ← aria-live="assertive"
│  [✓ Confirm]  [✕ Cancel]                            │
└─────────────────────────────────────────────────────┘

ANT DESIGN TYPOGRAPHY EDITABLE
┌──────────────────────────────────────────────┐
│  Product Name  [✏]                           │  ← view mode; pencil always visible
└──────────────────────────────────────────────┘
       ↓ click pencil or text
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │  Product Name                          │  │  ← inline input; Enter=confirm, Esc=cancel
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘

CRM RECORD FIELD PENCIL (Lightning pattern)
┌─────────────────────────────────────────────────────┐
│  Account Name                                       │
│  Acme Corporation                        [✏ hover] │  ← pencil appears on hover/focus
└─────────────────────────────────────────────────────┘
       ↓ click pencil
┌─────────────────────────────────────────────────────┐
│  Account Name                                       │
│  ┌─────────────────────────────┐  [✓] [✕]          │
│  │  Acme Corporation           │                    │
│  └─────────────────────────────┘                    │
└─────────────────────────────────────────────────────┘

TABLE CELL INLINE EDIT (grid pattern)
┌──────────────┬──────────────┬──────────────────────┐
│  Name        │  Status      │  Revenue             │
├──────────────┼──────────────┼──────────────────────┤
│  Acme Corp   │  Active      │  $42,000             │  ← F2 to enter edit mode
├──────────────┼──────────────┼──────────────────────┤
│  Beta Inc    │  ┌─────────┐ │  $18,500             │  ← edit mode on cell
│              │  │ Active  │ │                      │
│              │  └─────────┘ │                      │
└──────────────┴──────────────┴──────────────────────┘

STATE MACHINE DIAGRAM
            Enter/click
   [view] ────────────→ [edit]
     ↑                     │
     │         Escape       │
     └─────────────────────┘ ← cancel; focus returns to trigger
     ↑
     │         Enter/✓ confirm
     └─────────────────────── ← save; async saving state possible
                                     └→ [saving] → [view]

CHAKRA COMPOUND COMPONENT STRUCTURE
┌─ Editable ──────────────────────────────────────┐
│  ┌─ EditablePreview ─────────────────────────┐  │  ← display state
│  │  Acme Corporation                         │  │
│  └───────────────────────────────────────────┘  │
│  ┌─ EditableInput ───────────────────────────┐  │  ← edit state (conditionally rendered)
│  │  Acme Corporation                         │  │
│  └───────────────────────────────────────────┘  │
│  ┌─ EditableControls (render prop) ──────────┐  │  ← save/cancel; consumer-positioned
│  │  [✓]  [✕]                                 │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Risks to Consider

### HIGH — Missing focus management on save/cancel

**Risk:** If focus does not return to the read-view trigger element after saving or canceling, keyboard users lose their position in the page. This is the most common implementation failure for inline edit. In a list of 20 editable items, if focus drops to the document root after each save, the user must navigate from the top to continue editing.

**Mitigation:** Store a ref to the read-view trigger element before activating edit mode. On save/cancel, call `triggerRef.current.focus()`. Test with keyboard only — no mouse — before shipping. This is the single most important a11y requirement for inline edit.

---

### HIGH — Save-on-blur causes data loss or accidental saves

**Risk:** `submitOnBlur=true` (Chakra default) saves the value when the user moves focus to any other element. For keyboard users navigating via Tab, any accidental Tab press saves the current edit state — even an incomplete or erroneous value. For switch access users, unintended tab switches can silently save incorrect values. Nord's patient-safety argument (medication dosage on clinical tablet) is the extreme case; accidental form submission is the common case.

**Mitigation:** Default `submitOnBlur` to `false` for all new implementations. Document the accessibility risk prominently. Provide `submitOnBlur` as an opt-in for confirmed low-stakes single-value edits where the UX benefit outweighs the risk.

---

### HIGH — Plain span with onClick as activation trigger

**Risk:** A `<span onClick={activateEdit}>` is mouse-only. Keyboard users pressing Tab will skip over it because spans are not in the natural tab order. Screen reader users cannot activate it with Enter/Space. This is the most common implementation shortcut, and it creates a complete keyboard accessibility failure.

**Mitigation:** Wrap the read-view display in a `<button>` element (preferred) or add `role="button"` + `tabIndex={0}` + `onKeyDown` handler for Enter/Space. Prefer `<button>` — it handles focus, keyboard activation, and ARIA semantics automatically.

---

### MEDIUM — Missing `aria-live` announcement for mode transitions

**Risk:** When the UI switches from view mode to edit mode, screen reader users who are navigating by headings or landmarks may not be aware that the input has appeared. If focus moves to the input directly (which is the recommended approach), this is implicit. But if focus movement is delayed or the input appears elsewhere in the DOM, the mode transition is silent.

**Mitigation:** Move focus directly to the input on activation — this is the most reliable mode announcement. Supplement with `aria-live="polite"` announcing "Editing [field name]" for cases where focus movement alone is insufficient (e.g., complex composite edit surfaces).

---

### MEDIUM — Inline edit in table cells conflicts with grid keyboard navigation

**Risk:** ARIA grid components use arrow keys for cell navigation. If inline edit in a table cell intercepts arrow keys (as text inputs do), users cannot navigate the table while a cell is in edit mode. F2 is the standard way to enter edit mode in a grid; Escape exits edit mode and returns to grid navigation. If your inline edit implementation uses Enter to enter edit mode (standard for non-grid contexts), it conflicts with grid's Enter behavior (activate interactive element in cell).

**Mitigation:** In table/grid contexts, use F2 to enter edit mode and Escape to exit. In general inline edit contexts (headings, labels, record fields), use Enter/click to enter and Escape to cancel. Never conflate the two interaction models in a single component.

---

### LOW — Layout shift on activation

**Risk:** Switching from read view to edit view can shift surrounding layout if the input has different dimensions than the display text (different height, border, padding). In dense list views or tables, this creates disorienting visual jumps.

**Mitigation:** Size the input to match the read-view dimensions during the design phase. Use CSS transitions on height. Alternatively, overlay the input over the read-view text using absolute positioning (Atlassian's approach in some contexts). Test activation at different content lengths.

---

## Next Steps

1. **Decide the component architecture** — render props (Atlassian) or compound components (Chakra). Render props offer maximum flexibility; compound components offer JSX discoverability.
2. **Implement the state machine first** — view → edit → saving → view; view → edit → cancel → view. The state machine is the component; UI is secondary.
3. **Make `submitOnBlur` configurable and default to false** — document the accessibility risk for blur-to-save.
4. **Implement focus management before anything else** — ref to trigger element; return focus on save/cancel. Test with keyboard only before adding visual features.
5. **Add `keepEditViewOpenOnBlur` / blur handling for confirm/cancel buttons** — focus moving to the confirm button should not trigger cancel.
6. **Implement `aria-live="polite"` for mode transitions** and `aria-live="assertive"` for validation errors.
7. **Spec keyboard contract** — Enter/Space to activate (non-table); Escape to cancel; Enter to confirm; F2 for table cell contexts.
8. **Add `validate` prop** — inline validation is required; navigating away to see errors is an antipattern.
9. **Design the edit trigger affordance** — decide always-visible vs. hover/focus-reveal based on use case; always implement the focus-visible equivalent.
10. **Plan for non-text field types** — if date pickers, rich text, or lookup inputs need inline editing, design the popout editor pattern separately.
