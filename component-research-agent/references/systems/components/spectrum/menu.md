---
system: Adobe Spectrum
component: Menu + ActionMenu + MenuTrigger
url: https://react-spectrum.adobe.com/react-spectrum/Menu.html
last_verified: 2026-03-28
---

# Menu / ActionMenu

## Approach

Spectrum's menu system is built on a deliberate semantic split: a **Menu** renders a list of actions and fires `onAction` when the user picks one; a **MenuTrigger** pairs any trigger element with a Menu overlay; and an **ActionMenu** is a pre-composed convenience component that wraps an icon-only three-dot button and a Menu for the extremely common overflow/"more actions" pattern. This decomposition reflects Adobe's philosophy of building small, composable primitives that can be assembled into opinionated patterns — rather than building one monolithic DropdownMenu that bundles trigger, overlay, and list into an inseparable unit.

The critical semantic decision is that Menu fires `onAction`, not `onSelectionChange`. Selection (picking a persistent value) is deliberately routed to Picker/Select/ComboBox. When `selectionMode` is set on a Menu, the callback changes to `onSelectionChange`, but the default is action-only — making it impossible to accidentally treat a menu like a select without explicit opt-in. This design choice exists because Adobe's products ship complex UIs where mixing action menus and selection menus is a constant source of bugs; the API forces intentionality.

Mobile behavior is another first-class design concern: on small screens, MenuTrigger automatically renders the overlay as a bottom tray rather than a floating popover. This is not a developer opt-in — it happens automatically — because Adobe's research showed that floating menus on mobile create tap-target and thumb-reach problems that tray menus solve at the platform level.

## Key Decisions

1. **Menu (actions) vs. Picker (selection) — hard architectural split** (HIGH) — Spectrum makes it syntactically impossible to confuse an action menu with a selection control. The `onAction` callback only fires when `selectionMode="none"` (the default). To get selection behavior, you must explicitly set `selectionMode="single"` or `"multiple"`, at which point `onSelectionChange` fires instead. The WHY is product correctness: in a design tool like Figma or a creative workflow app like Lightroom, accidentally treating a menu as a stateful selector corrupts undo history, persisted settings, and accessibility semantics.

2. **Submenu support via explicit `SubmenuTrigger` wrapper** (HIGH) — Submenus are supported, but they require wrapping the parent item in a `SubmenuTrigger` component rather than nesting Menu components directly. The WHY is focus management clarity: when a menu item can open a submenu, the ownership of focus needs to be unambiguous. A wrapper component makes the parent-child relationship explicit in JSX, avoiding the ambiguity of inferring submenu behavior from the presence of nested children.

3. **`ContextualHelpTrigger` for unavailable items** (MEDIUM) — Rather than simply disabling items and leaving users confused, Spectrum provides a `ContextualHelpTrigger` that can wrap a disabled MenuItem to show a contextual dialog explaining why the item is unavailable. The WHY is frustration reduction: "Delete" appearing grayed out with no explanation is a common complaint in professional software. This pattern is especially important in Adobe's enterprise products where permissions, licenses, or workflow states frequently disable actions.

4. **ActionMenu formalizes the 3-dot overflow pattern** (HIGH) — Rather than leaving every team to pair their own ActionButton with a Menu, ActionMenu is a named component that encapsulates the icon-only trigger + menu combination. The WHY is design consistency across Adobe's product suite. Every Spectrum-using product (Acrobat, Experience Platform, Marketo) gets the same overflow pattern with the same keyboard behavior, ARIA markup, and mobile tray fallback — without each team rebuilding it.

5. **Auto-tray on mobile** (HIGH) — MenuTrigger detects mobile context and renders a bottom tray instead of a floating popover. This is not configurable because it is not a preference — it is the correct behavior for touch interfaces. The WHY reflects Adobe's cross-platform product strategy: Spectrum components ship in both web and native contexts, and the same logical component must produce the right physical output for each.

6. **`closeOnSelect` is a prop on MenuTrigger, not Menu** (MEDIUM) — Multi-select menus often need to stay open after selection. By putting `closeOnSelect` on the trigger rather than the menu, Spectrum keeps the close behavior coupled to the overlay layer (where it logically belongs) rather than the list layer. This separation lets the same Menu component work in both persistent and dismissive contexts without internal state changes.

## Notable Props

- `onAction`: The primary callback for action menus — only fires when `selectionMode="none"`, making the semantic distinction enforced at runtime.
- `selectionMode`: `"none"` | `"single"` | `"multiple"` — switching this changes the entire callback model, intentionally making the menu's purpose explicit.
- `escapeKeyBehavior`: `"clearSelection"` (default) | `"none"` — defaults to clearing selection on Escape rather than just closing, which matches user expectations in creative tools where Escape means "cancel/clear."
- `disabledKeys`: Items remain visible but inert — Spectrum does not hide disabled items, because hidden options imply those features don't exist, while disabled ones signal they exist but are conditionally unavailable.
- `textValue` on items: Used for typeahead and screen reader announcement separately from the rendered label — critical when items contain icons or keyboard shortcut annotations that should not be read aloud.

## A11y Highlights

- **Keyboard**: Arrow keys traverse items; `shouldFocusWrap` enables circular navigation (End wraps to first). Right/left arrow keys open and close submenus in a language-aware direction. Escape closes the menu (or clears selection per `escapeKeyBehavior`).
- **Screen reader**: Item descriptions added via `slot="description"` are announced separately from the label, preventing redundancy. `ContextualHelpTrigger` dialogs are announced as contextual help, not as menu items. Sections without a title require `aria-label` to avoid unnamed landmark warnings.
- **ARIA**: Items use `role="menuitem"`, `role="menuitemradio"`, or `role="menuitemcheckbox"` depending on selection mode — one of the few systems that correctly differentiates all three ARIA menu item roles. `aria-haspopup` and `aria-expanded` on the trigger. `textValue` ensures typeahead and screen reader text diverge when necessary (e.g., a "Copy" item with a keyboard shortcut rendered visually should have `textValue="Copy"` so TTS reads only "Copy," not "Copy Cmd+C").

## Strengths & Gaps

- **Best at**: Semantic precision — the action/selection split, the three ARIA menuitem role variants, and the ContextualHelpTrigger for disabled states make this the most semantically rigorous menu system among the Tier 1 systems.
- **Missing**: No built-in danger/destructive item styling (teams must apply custom CSS for red "Delete" items), and keyboard shortcut display is visual-only — the `Keyboard` component shows shortcuts but does not bind them, requiring teams to wire key handlers separately.
