---
system: Ant Design
component: Form
url: https://ant.design/components/form/
last_verified: 2026-03-28
---

# Form

## Approach

Ant Design's Form is the most feature-rich form component of any Tier 1 design system — not incrementally richer, but categorically different in scope and philosophy. Where other systems provide a layout container or a simple validation coordinator, Ant Design's Form is a complete state management system for form data, with its own store (powered by `rc-field-form` under the hood), a field subscription model, a rules engine with async support, cross-field dependency tracking, dynamic field arrays, and a multi-form context provider. The driving philosophy is that forms in enterprise B2B products (Alibaba's ecosystem includes dashboards, management consoles, and data-heavy admin panels) are complex enough to justify a first-class reactive data layer, and that bolting an external form library onto design system components creates friction. So Ant Design internalized that complexity.

The central architectural decision is the Form Store: `Form.useForm()` returns a `FormInstance` that holds all field values, validation states, and touched states. This instance is the source of truth, not React's component state. Fields register themselves with the store via their `name` prop, and the Form manages selective re-renders — only the field whose value changed re-renders, not the entire form tree. This performance-first design has tradeoffs: you cannot read field values via `getFieldsValue()` during render (because the store is outside React's render cycle) and must use `useWatch()` for reactive value access.

## Key Decisions

1. **Store-based selective field re-rendering** (HIGH) — Form maintains its own data store separate from React component state. Only the specific field that changed re-renders on value update, not the whole form. The WHY: Ant Design's target context is data-dense forms with 20–50+ fields (complex configuration panels, multi-section data entry screens in management consoles). If every field re-rendered on each keystroke in a 50-field form, performance would degrade noticeably. The selective update model solves this, but creates an important mental model shift: developers cannot get field values in a render function the normal React way — they must use `form.getFieldsValue()` outside render, or `useWatch()` for reactive subscriptions.

2. **validateTrigger is configurable per form and per field** (HIGH) — The `validateTrigger` prop defaults to `onChange` at the Form level, meaning validation runs on every keystroke. It can be overridden per Form.Item to `onBlur`, `onFocus`, or any DOM event name. The WHY: Different field types benefit from different timing. A required field benefits from `onChange` (immediate feedback when the user starts filling). An email field with async server-side duplicate check benefits from `onBlur` (avoids hammering the server on every character). By making this configurable at both form and item level, Ant Design allows a single form to have mixed validation strategies appropriate to each field. `validateDebounce` further refines async validation timing.

3. **`dependencies` for cross-field validation** (HIGH) — Form.Item's `dependencies` prop accepts an array of field names. When any of the listed fields changes value, the current field's validation rules are re-evaluated. The canonical example is a "confirm password" field that must validate whether its value matches the "password" field — it adds `dependencies={['password']}` so that changing the password field triggers re-validation of the confirm field. The WHY: Without `dependencies`, a user could change "password" after filling "confirm password" and the mismatch would not be flagged until form submission. This is unique among Tier 1 systems — no other system provides a declarative cross-field dependency mechanism at the form architecture level.

4. **`shouldUpdate` for conditional rendering without validation** (MEDIUM) — Form.Item with `shouldUpdate={true}` re-renders its children whenever any form value changes. Form.Item with `shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}` re-renders only when the `type` field changes. The WHY: This enables declarative conditional field logic — show a different set of fields based on a prior field's value — without the developer managing this state externally. Note: `dependencies` and `shouldUpdate` should not be combined on the same Form.Item; `dependencies` is for validation triggers, `shouldUpdate` is for render control.

5. **Three layout modes as a form-level decision** (MEDIUM) — The `layout` prop on Form accepts `horizontal` (label on left, input on right in a grid), `vertical` (label above input), or `inline` (all fields in a row, labels adjacent to inputs). This is a Form-level decision, not per-field. `labelCol` and `wrapperCol` grid span props control the relative width of labels vs inputs in horizontal mode. The WHY: Enterprise forms often have standardized layout across all their forms — a product might decide that settings pages are always horizontal, creation dialogs are always vertical, and filter bars are always inline. Making layout a Form-level prop enforces this consistency with a single line.

6. **Form.List for dynamic field arrays** (MEDIUM) — `Form.List` manages arrays of field groups (e.g., multiple address entries, variable number of items in an order). It provides `add`, `remove`, and `move` operations as part of its render props API. The WHY: Dynamic field arrays are a common enterprise form pattern — configure N number of notification rules, add variable number of tags, define multiple recipients. Without a built-in solution, teams resort to fragile workarounds. Form.List integrates with the Form store so each array item's fields are tracked, validated, and submitted correctly without custom wiring.

## Notable Props/API

- `validateTrigger` (on Form and Form.Item): When validation fires. Default `onChange`. Set to `"onBlur"` for fields where real-time validation is noisy. Set to an array like `["onBlur", "onChange"]` for fields that should validate both ways.
- `dependencies` (on Form.Item): Array of field names whose changes trigger this field's re-validation. The only declarative cross-field dependency mechanism in any Tier 1 system.
- `shouldUpdate` (on Form.Item): Boolean or comparison function controlling whether the Form.Item re-renders on form value changes. Used for conditional field rendering based on other field values.
- `rules` (on Form.Item): Array of rule objects. Each rule can be `{ required: true }`, `{ type: 'email' }`, `{ min: 8, message: 'At least 8 characters' }`, `{ pattern: /regex/, message: '...' }`, or `{ validator: async (rule, value) => { /* async check */ } }`.
- `scrollToFirstError` (on Form): Boolean. After submission failure, automatically scrolls the viewport to the first field with an error. Essential for long forms where the first error may be above the fold.
- `onFinish` (on Form): Called with all field values when submission passes all validation. The "clean data, after successful validation" callback. Equivalent to Atlassian's `onSubmit` but named to match Ant's lifecycle vocabulary.
- `onFinishFailed` (on Form): Called when submission fails validation. Receives `{ values, errorFields, outOfDate }` — giving the developer all field values plus the specific errors, which enables custom error summary rendering.
- `preserve` (on Form.Item): When `false`, removes the field's value from the store when the field unmounts. Used with `shouldUpdate`-driven conditional rendering to clean up values that are no longer visible.

## A11y Highlights

- **Keyboard**: Tab traversal follows DOM order. Enter in a single-field form or explicit submit button submits. In inline layout, multiple fields appear in a row but tab order is correct left-to-right. `scrollToFirstError` combined with `autoFocus` on the first invalid field after submission is the recommended focus management pattern.
- **Screen reader**: Error messages generated by the `rules` system are rendered as visible text below the field and linked via `aria-describedby`. `hasFeedback={true}` on Form.Item adds a status icon (success, error, warning, validating) next to the input — the icon is visible but its meaning should be supplemented with the text error message for screen reader users. Ant Design relies on visible text for error communication rather than ARIA-live announcements.
- **ARIA**: Form.Item with a `name` prop adds `aria-required` when the rules include `{ required: true }`. `aria-invalid` is set on the field when its validation state is error. `aria-describedby` links the field to the error message element. The `required` indicator (asterisk or "(required)" text) is rendered by the Form system based on the presence of a `required: true` rule — developers do not set it manually.

## Strengths & Gaps

- **Best at**: Cross-field validation via `dependencies` and dynamic field arrays via `Form.List` — these two features together make Ant Design's Form the only Tier 1 system capable of handling the full complexity of enterprise data-entry forms (dependent field validation, variable-length field groups) without an external form library.
- **Missing**: Visual form layout utilities comparable to Polaris's FormLayout.Group or Carbon's fluid grid integration — Ant Design's `labelCol`/`wrapperCol` grid system requires understanding the 24-column grid to use, and there is no simple "put these two fields side by side" shorthand that doesn't require grid math.
