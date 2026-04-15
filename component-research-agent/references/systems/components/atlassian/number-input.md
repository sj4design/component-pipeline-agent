---
system: Atlassian Design System
component: Textfield (type="number") — no dedicated NumberInput
url: https://atlassian.design/components/textfield/
last_verified: 2026-03-28
---

# Number Input (Absent — No Dedicated Component Confirmed)

## Approach
The Atlassian Design System does not include a dedicated NumberInput or NumberField component. This was confirmed by reviewing the full component index at atlassian.design/components, which lists Textfield, Select, Range (slider), Checkbox, Radio, Toggle, and Date time picker as form input primitives — but no NumberInput. For numeric data entry, Atlassian teams are expected to use the Textfield component with `type="number"` passed as an HTML attribute, inheriting browser-native stepper behavior, arrow-key interaction, and spinbutton semantics. Atlassian's component set reflects its product context: Jira, Confluence, and Trello are primarily collaboration and project management tools where numeric input (story points, due dates as numbers, counts) is always secondary to text and selection interactions. The need for a dedicated NumberInput with rich stepping behavior, formatting, and validation simply has not risen to the priority level needed to justify a new component in Atlassian's design system, whose philosophy has traditionally emphasized strong fundamentals (Textfield, Select, Form) over specialized variants.

The Atlassian design system is notably aware of the `type="number"` vs `inputmode="numeric"` distinction from an accessibility perspective — search results from atlassian.design reference the consideration that `<input type="number">` creates a `role="spinbutton"` implicitly, and that this role may not be appropriate when stepper controls are not visible. Atlassian's accessibility documentation references the consideration of using `inputmode="numeric"` with a `pattern` attribute as a sometimes-preferable alternative to `type="number"`, which is a more nuanced stance than most design systems take.

The practical implication for design system builders is that Atlassian provides no visual reference, no token mapping, no interaction spec, and no ARIA implementation guide specific to numeric inputs. Teams building numeric entry on Atlassian foundations are working from first principles, with only the generic Textfield as a starting point.

## Key Decisions

1. **No dedicated component — confirmed by component index** (HIGH) — The atlassian.design/components page (verified 2026-03-28) lists no NumberInput or NumberField. This is a confirmed absence, not a search gap. The WHY is product-portfolio-driven: Atlassian's core products (Jira, Confluence, Trello, Bitbucket) are collaboration tools where rich numeric input is rare. Story point fields, count inputs, and numeric IDs are simple enough to not justify a specialized component. Atlassian's DS team allocates component investment toward their highest-frequency patterns.

2. **`type="number"` vs `inputmode="numeric"` — documented tension** (MEDIUM) — Atlassian's accessibility documentation acknowledges the tradeoff between `type="number"` (spinbutton role, stepper arrows, browser validation) and `inputmode="numeric"` (numeric mobile keyboard, no spinbutton, treated as text). The WHY this distinction matters: `role="spinbutton"` announces min/max/step to screen readers and implies keyboard stepping behavior. If a product uses `type="number"` purely for the mobile numeric keyboard but does not implement proper min/max and keyboard step behavior, they create an ARIA promise they don't fulfill. Atlassian's documentation recognizes this problem rather than papering over it.

3. **Range component for approximate numeric selection** (MEDIUM) — Atlassian offers a Range component (slider) as an alternative to text-based numeric input for scenarios involving approximate value selection. The WHY is interaction appropriateness: when a user needs to set a "confidence level" from 0–100 or adjust a "priority weight", dragging a slider communicates continuous selection better than a stepper. The availability of Range alongside Textfield reflects an implicit guidance that number inputs are not monolithic — the right control depends on precision requirements and value range.

4. **Form component as the governance layer** (LOW) — Atlassian's Form component handles label association, validation state display, and error messaging for all field types including numeric Textfields. Error states, required field indicators, and helper text all route through Form rather than the Textfield props directly. This means numeric validation UX (clamping feedback, out-of-range errors) depends on how the product team wires the Form component — there is no pre-built numeric validation behavior.

5. **No stepper button design or spec** (HIGH) — Like Material Design 3, Atlassian provides zero guidance on increment/decrement button placement, icon choice, sizing, or behavior for numeric inputs. Teams that need visible ± stepper affordances — shopping cart quantities, pagination size selectors, iteration counters — must design, build, and test them entirely from scratch against Atlassian's token system.

## Notable Props
- Textfield accepts native HTML attributes including `type`, `min`, `max`, and `step` — these are passed through to the underlying `<input>` element.
- No Atlassian-specific numeric props exist (no `step`, `precision`, `formatOptions`, or equivalent as named component API props).
- `isInvalid`: Atlassian Textfield's error state prop — triggers red border and enables `errorMessage` display via the Form component.

## A11y Highlights
- **Keyboard**: Arrow Up/Down increment/decrement follows browser-native `<input type="number">` behavior when `type="number"` is used. Atlassian documents no custom keyboard handling for numeric inputs beyond native browser behavior.
- **Screen reader**: When `type="number"` is used, the browser implicitly applies `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` from the HTML `min`, `max`, `value` attributes. Atlassian's accessibility documentation specifically notes that `role="spinbutton"` should only be used when stepper controls are actually present and functional — teams using `type="number"` purely for mobile keyboard triggering are advised to consider `inputmode="numeric"` instead.
- **ARIA**: `role="spinbutton"` via native browser behavior only. No Atlassian-authored ARIA augmentation for numeric inputs. Form component provides `aria-describedby` linking fields to their error messages and helper text.

## Strengths & Gaps
- **Best at**: The Atlassian accessibility documentation's explicit acknowledgment of the `type="number"` vs `inputmode="numeric"` tradeoff is the most nuanced accessibility guidance on this topic among the six Tier 1 systems — even without a dedicated component, their a11y thinking is sound.
- **Missing**: Everything a dedicated component would provide — no stepper design spec, no locale formatting, no clamping behavior, no validation states specific to numeric constraints, and no visual pattern for ± controls. Teams building any non-trivial numeric input on Atlassian foundations are on their own.
