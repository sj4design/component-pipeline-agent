# Interaction Rules — Core (Always Read)

> Sections 1-4, 9 from interaction-rules.md. For DatePicker, disabled, error, and ARIA failures, see `interaction-rules-advanced.md`.

---

## 1. WCAG 2.2 Success Criteria for Interactive Components

### Mandatory Criteria (Level A)

| SC | Name | Rule for Agent |
|---|---|---|
| 2.1.1 | Keyboard | Every interactive component MUST be operable via keyboard alone. No mouse-only actions. |
| 2.1.2 | No Keyboard Trap | Focus MUST be movable away from any component using standard keys (Tab, Escape). If non-standard exit exists, document it visually. |
| 4.1.2 | Name, Role, Value | Every interactive element MUST expose: (1) accessible name, (2) role, (3) current state/value programmatically. |
| 3.2.6 | Consistent Help | If help mechanisms exist (chat, FAQ, contact), place them in the same relative location across pages. |
| 3.3.7 | Redundant Entry | Never ask users to re-enter info already provided in the same session. Auto-populate when possible. |

### Mandatory Criteria (Level AA)

| SC | Name | Rule for Agent |
|---|---|---|
| 2.4.3 | Focus Order | Tab order MUST match logical reading/operation order. DOM order = visual order. |
| 2.4.7 | Focus Visible | Every focusable element MUST have a visible focus indicator. Never suppress `outline`. |
| 2.4.11 | Focus Not Obscured (Minimum) | Focused element MUST NOT be entirely hidden by sticky headers, footers, or overlays. |
| 2.5.8 | Target Size (Minimum) | Interactive targets MUST be at least 24x24 CSS pixels, or have sufficient spacing. |
| 3.3.8 | Accessible Authentication | Authentication MUST NOT require cognitive function tests unless alternatives exist. |

### Recommended Criteria (Level AAA)

| SC | Name | Rule for Agent |
|---|---|---|
| 2.4.12 | Focus Not Obscured (Enhanced) | No part of focused component hidden by author content. |
| 2.4.13 | Focus Appearance | Focus indicator MUST be >= 2px perimeter area AND >= 3:1 contrast ratio. |

---

## 2. Focus Management Strategies

### Two Techniques for Composite Widgets

#### A. Roving Tabindex
- Only ONE child has `tabindex="0"` at a time; all others have `tabindex="-1"`.
- Arrow keys move `tabindex="0"` to the next/prev child.
- Tab/Shift+Tab exits the composite entirely.
- **Use when:** Items are DOM elements that can receive native focus.

#### B. aria-activedescendant
- Container has `tabindex="0"` and keeps DOM focus.
- `aria-activedescendant` on the container points to the ID of the "active" child.
- **Use when:** Performance matters or items are dynamically rendered.

### Universal Focus Rules

| Rule | Description |
|---|---|
| Tab enters, Tab exits | A composite widget is ONE tab stop. Internal navigation uses arrow keys. |
| Focus on open | When a popup/dialog/menu opens, move focus INTO it. |
| Focus on close | When a popup/dialog/menu closes, return focus to the TRIGGER element. |
| Focus on delete | When focused item is removed, move focus to next item (or previous if last). |
| Focus on error | After form submission with errors, move focus to the first invalid field. |
| No focus loss | Focus MUST NEVER be sent to `<body>`. Always have a target. |

---

## 3. Component Keyboard Patterns (APG)

### Button
| Key | Action |
|---|---|
| `Enter` | Activate the button |
| `Space` | Activate the button |

### Checkbox
| Key | Action |
|---|---|
| `Space` | Toggle checked state |
| (no Enter) | Enter does NOT toggle; it submits the form |

States: `aria-checked="true"`, `"false"`, or `"mixed"` (tri-state).

### Radio Group
| Key | Action |
|---|---|
| `Tab` | Moves focus INTO the group (to checked radio, or first if none checked) |
| `Shift+Tab` | Moves focus OUT of the group |
| `Right Arrow` / `Down Arrow` | Move to next radio, check it |
| `Left Arrow` / `Up Arrow` | Move to previous radio, check it |

Arrow keys wrap around. The group is ONE tab stop. Use roving tabindex.

### Tabs
| Key | Action |
|---|---|
| `Tab` | Moves focus to active tab, then to tab panel |
| `Right Arrow` | Next tab (wraps) |
| `Left Arrow` | Previous tab (wraps) |
| `Home` | First tab |
| `End` | Last tab |
| `Space` / `Enter` | Activate tab (manual activation mode only) |
| `Delete` | Close current tab (if deletable) |

Modes: **Automatic** (panel shows on focus) vs **Manual** (panel shows on Enter/Space).

### Dialog (Modal)
| Key | Action |
|---|---|
| `Tab` | Next focusable inside dialog (wraps) |
| `Shift+Tab` | Previous focusable inside dialog (wraps) |
| `Escape` | Close dialog, return focus to trigger |

Focus: on open → first focusable. `aria-modal="true"`. Focus MUST be trapped.

### Alert Dialog
Same as Dialog, plus: `alertdialog` role. `aria-labelledby` + `aria-describedby` required. Focus → least destructive action.

### Combobox
| Key | Action |
|---|---|
| `Down Arrow` | Open popup / next option |
| `Up Arrow` | Open popup / previous option |
| `Enter` | Accept focused option, close popup |
| `Escape` | Close popup, revert |
| Printable chars | Filter options |

`aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`.

### Listbox
| Key | Action |
|---|---|
| `Down Arrow` | Next option |
| `Up Arrow` | Previous option |
| `Home` / `End` | First / last option |
| `Space` | Toggle selection (multi-select) |
| Type-ahead | Focus matching option |

### Menu / Menubar
**Menubar (horizontal):** Right/Left = next/prev item. Down/Up = open submenu. Escape = close.
**Submenu (vertical):** Down/Up = next/prev item. Right = open child. Left/Escape = close.

### Slider
| Key | Action |
|---|---|
| `Right Arrow` / `Up Arrow` | Increase by one step |
| `Left Arrow` / `Down Arrow` | Decrease by one step |
| `Page Up` / `Page Down` | Large step |
| `Home` / `End` | Min / max value |

### Grid
Arrow keys navigate cells. `Page Down/Up` = page navigation. `Home/End` = row start/end. `Ctrl+Home/End` = grid start/end. `Enter` = edit mode. `Escape` = exit edit.

### Tree View
`Down/Up` = next/prev visible node. `Right` on closed parent = open. `Right` on open parent = first child. `Left` on child = parent. `Left` on open parent = close. `Home/End` = first/last. Type-ahead supported.

---

## 4. ARIA Roles and Properties by Component

| Component | Container Role | Item Role | Key Properties | Key States |
|---|---|---|---|---|
| Button | - | `button` | `aria-label`, `aria-describedby` | `aria-pressed`, `aria-expanded`, `aria-disabled` |
| Checkbox | - | `checkbox` | `aria-label` | `aria-checked` |
| Radio Group | `radiogroup` | `radio` | `aria-label` (on group) | `aria-checked` |
| Tabs | `tablist` | `tab` + `tabpanel` | `aria-controls`, `aria-labelledby` | `aria-selected` |
| Dialog | `dialog` | - | `aria-labelledby`, `aria-describedby` | `aria-modal` |
| Alert Dialog | `alertdialog` | - | `aria-labelledby`, `aria-describedby` | `aria-modal` |
| Combobox | `combobox` | `option` | `aria-controls`, `aria-haspopup`, `aria-activedescendant` | `aria-expanded`, `aria-selected` |
| Listbox | `listbox` | `option` | `aria-label`, `aria-activedescendant` | `aria-selected`, `aria-multiselectable` |
| Menu | `menu` | `menuitem` | `aria-label`, `aria-haspopup` | `aria-expanded`, `aria-disabled` |
| Slider | - | `slider` | `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` | `aria-disabled` |
| Grid | `grid` | `row` > `gridcell` | `aria-label`, `aria-rowcount`, `aria-colcount` | `aria-selected`, `aria-readonly` |
| Tree | `tree` | `treeitem` | `aria-label`, `aria-level`, `aria-setsize`, `aria-posinset` | `aria-expanded`, `aria-selected` |
| Switch | - | `switch` | `aria-label` | `aria-checked` |
| Tooltip | `tooltip` | - | `aria-describedby` (on trigger) | - |
| Accordion | - | `button` + region | `aria-controls`, `aria-expanded`, `aria-labelledby` | `aria-expanded` |

### Naming Priority
1. `aria-labelledby` (highest — references visible element)
2. `aria-label` (direct string)
3. Native `<label>` (via `for`/`id`)
4. `title` (lowest — avoid as sole name)

---

## 9. Decision Framework for the Interaction Agent

### Step 1: Classify the Component
```
Simple interactive (button, link, checkbox, switch)
  → Native HTML. Add ARIA only for state.

Composite widget (tabs, radio, menu, toolbar, listbox, tree, grid)
  → ONE tab stop. Arrow keys navigate children.
  → Choose: Roving Tabindex OR aria-activedescendant.

Popup/overlay (dialog, menu, combobox, tooltip, popover, datepicker)
  → Define: open/close triggers, focus-on-open, focus-on-close.
  → Escape closes. Modal → focus trap. Non-modal → light dismiss.

Form input (text, select, textarea, search)
  → Label association. Error pattern: aria-invalid + aria-describedby.
```

### Step 2: Generate Keyboard Table
Columns: **Key** | **Condition** | **Action** | **Focus moves to**

### Step 3: Generate ARIA Spec
Per slot: **Role** | **Required properties** | **Required states** | **Conditional properties**

### Step 4: Generate Focus Management Rules
1. Tab order (list tab stops)
2. Arrow-key navigation (list composites)
3. Open/close (list popups with focus targets)
4. Deletable items (focus-after-delete)

### Step 5: Validate Against WCAG
- [ ] 2.1.1: Every action reachable by keyboard?
- [ ] 2.1.2: Can focus escape every container?
- [ ] 2.4.3: Tab order matches visual/logical order?
- [ ] 2.4.7: Every focusable element has visible focus style?
- [ ] 2.4.11: Focused element not obscured?
- [ ] 4.1.2: Every interactive element has name + role + value?
- [ ] 2.5.8: Target size >= 24x24px?
