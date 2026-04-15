# Interaction Rules — Advanced (Conditional)

> Sections 5-8 from interaction-rules.md. Read ONLY when the component matches:
> - Section 5: DatePicker/Calendar components
> - Section 6: Any component with disabled state
> - Section 7: Form controls with validation
> - Section 8: Final validation checklist (all components)

---

## 5. Date Picker Deep Dive

### Pattern A: Dialog Date Picker
Text input + button → modal dialog with calendar grid (`role="grid"`).
Each day cell = `gridcell` containing focusable `button`.

**Keyboard for calendar grid:**
| Key | Action |
|---|---|
| `Right/Left Arrow` | Next/previous day |
| `Down/Up Arrow` | Same day next/previous week |
| `Home` / `End` | First/last day of month |
| `Page Up/Down` | Same day previous/next month |
| `Shift+Page Up/Down` | Same day previous/next year |
| `Enter` / `Space` | Select date, close dialog |
| `Escape` | Close without selecting |

**Focus:** On open → current/selected date. On close → trigger button. Month heading = `aria-live="polite"`.

**ARIA structure:**
```
dialog[aria-modal="true"][aria-label="Choose Date"]
  button "Previous Month"
  h2#month-year[aria-live="polite"] "March 2026"
  button "Next Month"
  table[role="grid"][aria-labelledby="month-year"]
    thead > tr > th
    tbody > tr > td[role="gridcell"] > button[aria-selected][tabindex]
```

### Pattern B: Combobox Date Picker
`role="combobox"` + `aria-haspopup="dialog"` + `aria-expanded`. `Down Arrow` or `Alt+Down Arrow` opens popup.

### Grid vs Table Rule
- `role="grid"` when cells are interactive (clickable days) → date pickers
- `role="table"` when cells are read-only data display

---

## 6. Disabled States Rules

### `disabled` vs `aria-disabled` Decision

| Attribute | Focusable? | Click works? | SR announces? |
|---|---|---|---|
| `disabled` | NO | NO | Skipped in tab order |
| `aria-disabled="true"` | YES | YES (suppress via JS) | "unavailable" / "dimmed" |

### Agent Rules
1. **Prefer `aria-disabled="true"`** for custom components (keeps discoverable)
2. **Use native `disabled`** only on native HTML form elements
3. **When using `aria-disabled`:** MUST add `event.preventDefault()` + visual styling
4. **Disabled in toolbars/menubars:** Keep focusable, use `aria-disabled="true"`
5. **Never disable submit buttons without explanation**

---

## 7. Error and Validation Rules

### On Individual Fields
```html
<input id="email" aria-invalid="true" aria-describedby="email-error email-hint" />
<span id="email-error" role="alert">Enter a valid email address.</span>
```

Rules:
1. `aria-invalid="true"` when validation fails, remove when corrected
2. Error container MUST exist in DOM on page load (even if empty)
3. Use `role="alert"` on error container for immediate announcement
4. `aria-describedby` lists error ID BEFORE hint ID
5. Do NOT use `aria-invalid` on empty required fields

### On Form Submission
1. Move focus to FIRST invalid field
2. Optional: error summary at top with `role="alert"` + links to fields

### Live Region Rules
| Attribute | Behavior | Use When |
|---|---|---|
| `aria-live="assertive"` | Interrupts speech | Critical errors |
| `aria-live="polite"` | Waits for speech end | Status updates, success |
| `role="alert"` | = `assertive` + `atomic` | Inline errors |
| `role="status"` | = `polite` + `atomic` | Character counts, save status |

---

## 8. Common ARIA Failures to Avoid

| # | Mistake | Fix |
|---|---|---|
| 1 | No ARIA is better than bad ARIA | Prefer native HTML semantics |
| 2 | Missing required ARIA attributes | Include ALL required attrs for assigned role |
| 3 | Broken `aria-labelledby`/`aria-describedby` refs | Verify referenced IDs exist |
| 4 | `aria-hidden="true"` on focusable elements | Also set `tabindex="-1"` |
| 5 | Wrong role hierarchy | Maintain: `list > listitem`, `tablist > tab`, `menu > menuitem` |
| 6 | `aria-label` replacing visible text | Use `aria-labelledby` instead |
| 7 | `aria-label` on non-interactive elements | Only on interactive or landmark roles |
| 8 | Missing `aria-expanded` on disclosure triggers | Required for show/hide triggers |
| 9 | Overusing ARIA | Lean on native HTML, ARIA fills gaps |
| 10 | `aria-live` container not in DOM on load | Pre-render empty container |
