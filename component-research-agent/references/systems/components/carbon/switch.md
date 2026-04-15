---
system: Carbon (IBM)
component: Toggle
url: https://carbondesignsystem.com/components/toggle/usage/
last_verified: 2026-03-28
---

# Toggle

## Approach

Carbon's Toggle is the most fully specified switch-type component among the Tier 1 systems, reflecting IBM's enterprise software heritage where data density, contextual clarity, and accessibility compliance are non-negotiable. Carbon draws a firm line: toggles are exclusively for binary actions that take effect immediately after the user flips the switch. This is documented policy, not a suggestion — if an action requires a save step, you use a checkbox in a form, full stop. The two-size system (default and small) exists because IBM's product portfolio spans spacious settings pages and dense data table rows where the same full-size toggle would dominate the layout. The small toggle's built-in checkmark tick in the "on" state is a concrete accessibility decision: when the label and state text are hidden to save space, the icon inside the thumb is the only redundant encoding left, and Carbon bakes it in rather than leaving it to the implementer. The component name itself — "Toggle" not "Switch" — reflects Carbon's language preference for verb-form component names that describe the action rather than the physical metaphor.

## Key Decisions

1. **Two sizes with different label requirements** (HIGH) — The default Toggle requires both a component label and state text ("On"/"Off" or custom action text). The small Toggle makes both optional. The WHY is information hierarchy: a full-size toggle on a settings page has enough room to be self-describing; a small toggle embedded in a data table row or a condensed toolbar does not. Requiring labels on the default prevents silent unlabeled toggles in spacious contexts where they have no excuse for being absent.

2. **Small toggle has a mandatory checkmark in the "on" state** (HIGH) — When label and state text are hidden, the small toggle displays a checkmark tick inside the thumb when active. This is not an option — it is always present on the small variant. The WHY is WCAG compliance: without it, state would be communicated by color alone, violating success criterion 1.4.1 (Use of Color). Carbon chose to solve this at the component level rather than leaving it as a developer responsibility.

3. **State text is a design primitive, not just a label** (MEDIUM) — The component explicitly supports custom state text ("Enabled"/"Disabled", "Active"/"Inactive", "On"/"Off") positioned to the side of the toggle track. This solves a real enterprise problem: in IBM's products, the words "On" and "Off" may be legally or contextually insufficient — a HIPAA-covered feature requires "Active" and "Inactive" to match compliance documentation. Most design systems leave this to developers to hack around the component; Carbon builds it in.

4. **Toggle is never used for selections or form values** (HIGH) — Carbon's documentation explicitly prohibits using Toggle in contexts where a checkbox is appropriate: multi-item selection, "I agree" acknowledgments, or anything requiring a save. The WHY is that mixing the two patterns in a product creates user confusion about which controls require saving. Policing this at the system level protects product consistency.

5. **Label spacing is being standardized via feature flag** (LOW) — A feature flag adjusts the space between the toggle label and its container from 16px to 8px to match label spacing across other components. The WHY is cross-component visual rhythm: when toggle label spacing is inconsistent with, say, checkbox label spacing, forms that mix the two controls look misaligned. The flag approach lets teams opt into the corrected behavior before it becomes the default in v12.

## Notable Props

- `size`: `"default"` | `"sm"` — The size variant prop, with different label rules per size.
- `labelText`: The descriptive label above or beside the toggle (required for default size).
- `labelA` / `labelB`: Custom state text for the "off" and "on" states respectively.
- `toggled`: Controlled state boolean.
- `onToggle`: State change callback.
- `hideLabel`: Hides the label text visually while keeping it accessible to screen readers.

## A11y Highlights

- **Keyboard**: Space key toggles state. Tab moves focus to/from the toggle. The component follows standard ARIA switch keyboard behavior per W3C APG.
- **Screen reader**: Announces the label and current state. Custom state text (`labelA`/`labelB`) is read as part of the announcement, so "Notifications, Enabled" rather than "Notifications, On" when custom labels are used.
- **ARIA**: Uses `role="switch"` with `aria-checked="true|false"`. A known accessibility issue (reported September 2024, GitHub issue #17525) flagged that under certain configurations the toggle with `role="switch"` could be rendered without an associated accessible label — Carbon is actively tracking this. The `type="checkbox"` attribute on the underlying input element ensures broad browser support for switch semantics.

## Strengths & Gaps

- **Best at**: Structured documentation of exactly when to use Toggle vs Checkbox, two-size system with clear density rules, built-in state text customization for compliance-sensitive contexts, and the small toggle's automatic checkmark for WCAG color-independence.
- **Missing**: No loading/pending state for async operations (a significant gap for enterprise apps that POST settings to an API before confirming success), and no built-in icon-in-thumb support beyond the fixed checkmark in the small variant.
