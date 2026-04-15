---
system: Carbon (IBM)
component: Button
url: https://carbondesignsystem.com/components/button/usage/
last_verified: 2026-03-28
---

# Carbon Button

## Approach

Carbon approaches buttons through the lens of enterprise density and information hierarchy. IBM products like Watson, Cloud, and Security dashboards pack dozens of actions onto a single screen, so Carbon's button system is optimized for environments where visual noise from too many prominent buttons is the primary UX risk. The system defines five "kinds" (primary, secondary, tertiary, ghost, danger) specifically ordered by visual weight, and the documentation actively discourages overusing primary or secondary buttons. Carbon is unusually prescriptive about when to use each kind: ghost buttons for data table primary actions, tertiary for multi-action layouts, and danger available in three emphasis levels (primary, tertiary, ghost). This opinionated guidance reflects IBM's experience that enterprise teams without strict rules will default to primary buttons everywhere, creating interfaces where nothing stands out.

## Key Decisions

1. **Ghost button requires an icon** (HIGH) — Carbon mandates that standalone ghost buttons must include an icon because ghost buttons have such low visual affordance (no background, no border) that users may not recognize them as interactive without an icon signifier. This is a hard-won enterprise UX lesson: in dense dashboards with lots of text, a ghost button without an icon looks like plain text. The rule eliminates an entire category of "I didn't know that was clickable" usability issues at the cost of limiting ghost button flexibility.

2. **Danger comes in three emphasis levels** (HIGH) — Unlike most systems that offer a single "danger" or "destructive" variant, Carbon provides danger-primary, danger-tertiary, and danger-ghost. The reasoning: not all destructive actions are equally catastrophic. "Delete account" (danger-primary) demands maximum visual alarm, while "Remove filter" (danger-ghost) is destructive but low-stakes. This three-tier approach prevents the "everything is red" problem where danger styling loses its impact because it is applied uniformly.

3. **Seven size options including expressive** (MEDIUM) — Carbon offers XS, SM, MD, LG (productive), LG (expressive), XL, and 2XL buttons. The productive/expressive split at the LG size exists because IBM products serve two distinct contexts: data-dense "productive" interfaces where compact controls maximize content, and marketing or onboarding "expressive" interfaces where larger, more generous buttons improve scannability and emotional warmth. Most systems force teams to pick one density philosophy; Carbon supports both.

4. **Fluid-width buttons in contained contexts** (MEDIUM) — Carbon explicitly supports fluid (100% width) buttons in modals, tearsheets, and side panels. The rationale: in constrained containers, fixed-width buttons create awkward whitespace and alignment issues. Fluid buttons ensure consistent alignment with form fields and other full-width elements, which matters in IBM's form-heavy enterprise interfaces.

## Notable Props

- `kind` (primary | secondary | tertiary | danger | ghost): Named by intent weight rather than appearance, guiding teams toward appropriate emphasis.
- `size` (xs | sm | md | lg | xl | 2xl): Seven sizes accommodates everything from dense data tables (xs) to marketing hero sections (2xl).
- `isExpressive`: Toggles between productive (compact) and expressive (generous) sizing at the same breakpoint, letting a single layout serve different emotional contexts.
- `hasIconOnly`: Activates icon-only mode with tooltip on hover/focus, ensuring the label is always discoverable.

## A11y Highlights

- **Keyboard**: Tab to focus, Enter/Space to activate. Icon-only buttons display their text label as a tooltip on both hover and keyboard focus, ensuring keyboard-only users see the label.
- **Screen reader**: Icon-only buttons expose the tooltip text as the accessible name. Danger buttons do not get special ARIA treatment; the visual color is supplemented by clear label text (e.g., "Delete" not "Confirm").
- **ARIA**: Standard role="button". Carbon recommends adding a visible border between adjacent secondary and ghost buttons to achieve 3:1 contrast ratio between interactive elements, addressing a specific WCAG 2.1 non-text contrast requirement.

## Strengths & Gaps

- **Best at**: Providing granular emphasis control (five kinds, seven sizes, three danger levels) for complex enterprise dashboards where dozens of actions compete for attention.
- **Missing**: No built-in toggle button or segmented button component; toggling selection state requires composing with other Carbon components like Content Switcher.
