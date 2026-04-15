---
system: Material Design 3
component: Exposed Dropdown Menu (Select)
url: https://material-web.dev/components/select/
last_verified: 2026-03-28
---

# Exposed Dropdown Menu (Select)

## Approach
M3 treats selection as a specialization of text fields, not a standalone primitive. The "Exposed Dropdown Menu" is built on top of filled and outlined text field variants, which is why it shares visual DNA with text inputs -- same label animation, same container shapes, same theming tokens. This decision unifies the form experience: users see consistent affordances whether typing or selecting. Google deliberately avoids calling it "Select" in the spec, because the component is conceptually a text field that constrains input to a predefined list. The underlying web implementation (`md-filled-select`, `md-outlined-select`) uses a button-based listbox ARIA pattern rather than the native `<select>`, giving full control over styling and behavior while maintaining accessibility.

## Key Decisions
1. **Two visual variants: Filled and Outlined** (HIGH) -- Filled selects use a container fill with a bottom indicator line, optimized for prominence in dense forms. Outlined selects use a stroke border, better for sparse layouts. This mirrors the text field system exactly, so teams choose one variant per form context and apply it universally to both inputs and selects.
2. **Listbox pattern over combobox** (HIGH) -- M3 web select uses `role="listbox"` triggered by a button, not `role="combobox"`. This is because the standard select does not allow freeform typing -- it is a pure pick-from-list control. Combobox is reserved for autocomplete/filterable scenarios. This keeps ARIA semantics honest and avoids confusing assistive technology.
3. **No built-in search or filtering** (MEDIUM) -- The exposed dropdown menu intentionally omits typeahead filtering. M3 treats searchable selection as a separate pattern (autocomplete). This keeps the base select simple and lightweight, avoiding scope creep that would complicate the most common use case: choosing from a short, known list.
4. **Label animation shared with TextField** (LOW) -- The floating label transitions identically to text fields, reinforcing visual consistency. It also signals interactivity through motion, a core M3 principle.

## Notable Props
- `value` / `data-value`: Tracks current selection; `-1` index when nothing selected, enabling explicit empty states
- `required`: Maps to `aria-required`, integrating with native form validation
- `quick`: Enables opening the menu on pointerdown rather than click, reducing perceived latency for power users
- `typeaheadDelay`: Configures keyboard type-to-select speed, acknowledging that optimal timing varies by user ability

## A11y Highlights
- **Keyboard**: Arrow keys navigate options, Enter/Space select, Escape closes. Type-ahead character matching jumps to options.
- **Screen reader**: Follows WAI-ARIA collapsible dropdown listbox pattern. Selected value announced on focus. Option count and position conveyed.
- **ARIA**: Uses `role="listbox"` on the options container, `role="option"` on items, `aria-expanded` on the trigger button. Deliberately avoids combobox role.

## Strengths & Gaps
- **Best at**: Visual consistency with text fields in form-heavy UIs; clean two-variant system that scales across themes.
- **Missing**: No built-in multi-select, no filtering/search, no async loading -- teams needing these must compose with other M3 primitives or build custom.
