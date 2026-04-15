---
system: Material Design 3
component: TextField (type="number") — no dedicated NumberInput
url: https://m3.material.io/components/text-fields/guidelines
last_verified: 2026-03-28
---

# Number Input (Absent — Uses TextField with type="number")

## Approach
Material Design 3 does not have a dedicated NumberInput or NumberField component. This is a deliberate architectural choice rooted in Google's philosophy of building general-purpose primitives rather than domain-specific components: the TextField component handles all text and numeric input scenarios by delegating to the browser's native HTML input element and its `type` attribute. When `type="number"` is passed to a Material TextField, the browser's native numeric input semantics apply — including native stepper buttons, arrow-key behavior, and spinbutton accessibility. Google's rationale for this approach appears to be that numeric input requirements vary enormously across products (a search result count field vs. a financial amount field vs. a measurement field have fundamentally different needs), and building a single NumberField abstraction either becomes too opinionated (forcing a specific stepper style) or too configurable (effectively re-inventing the TextField API). The notable community pressure against this decision is visible in GitHub issue #19154 on the material-ui repository, which has been open for years requesting a dedicated NumberInput — MUI Base eventually shipped a separate `NumberInput` component with explicit stepper buttons in response to this demand, but this lives in MUI's component library, not the Material Design 3 specification itself.

The implication for component builders is significant: there is no Google-specified visual pattern for stepper buttons in Material Design 3. Teams building on Material are expected to compose their own numeric input patterns by combining TextField with custom increment/decrement buttons if needed, or to use `type="number"` and accept the browser's native (and visually inconsistent across browsers) stepper rendering.

## Key Decisions

1. **No dedicated component — use TextField + `type="number"`** (HIGH) — Material Design 3's explicit stance is that TextField covers numeric input. The WHY is a philosophy of minimal component surface area: every new component adds maintenance burden, documentation overhead, and API decisions that may not age well. By relying on HTML semantics, Material avoids prescribing how steppers should look or behave, leaving that to product teams. The cost is visual inconsistency across browsers — Chrome, Firefox, and Safari render native `<input type="number">` steppers differently — and the lack of a standard, styled pattern for teams that want stepper affordances.

2. **Filled and Outlined variants apply to numeric inputs equally** (MEDIUM) — Material Design 3's TextField has two structural variants (Filled with bottom border + fill, Outlined with full border). Both apply to `type="number"` identically. There is no guidance on which variant is preferred for numeric entry contexts, which means product teams must make this choice without Material-specific guidance.

3. **Error state via `error` prop and helper text** (MEDIUM) — TextField has a single error state (no "warning" tier like Carbon). Out-of-range validation for numeric inputs follows the same error pattern as text validation — a red border, an error icon, and `helperText` below the field. The WHY of a single error tier is design simplicity: for a general-purpose component system serving consumer apps, the warning/error distinction that enterprise tools (Carbon) need is an edge case, not the norm.

4. **No stepper button specification** (HIGH) — Material Design 3 provides zero guidance on increment/decrement button placement, iconography, or sizing for numeric inputs. Teams who need visible +/− controls must design and build them independently. This is the most consequential gap for design systems teams: there is no reference implementation to follow, no token mapping for stepper button sizing, and no ARIA guidance specific to numeric inputs in the Material documentation.

5. **`inputmode="numeric"` vs `type="number"` ambiguity** (MEDIUM) — Material Design 3 does not document when to use `type="number"` (spinbutton semantics, stepper arrows, value validation) versus `inputmode="numeric"` (numeric keyboard on mobile, no stepper, no spinbutton role). This distinction matters: `role="spinbutton"` from `type="number"` announces min/max/step to screen readers, while `inputmode="numeric"` treats the field as plain text. Without Material guidance, teams may choose incorrectly and either over-engineer accessibility or under-deliver it.

## Notable Props
- `type="number"` (on TextField): Activates browser-native numeric input — stepper arrows, arrow-key behavior, `min`/`max`/`step` HTML attributes, `role="spinbutton"`.
- `error`: Boolean that triggers the error state (red border + `errorText`). No separate warning state exists.
- `helperText`: Supporting text shown below the input; switches to `errorText` content when `error={true}`.
- `label`: Required for accessibility in all TextField usage, including numeric variants.

## A11y Highlights
- **Keyboard**: Arrow Up/Down increment/decrement by the HTML `step` attribute value (defaults to 1). Home/End jump to `min`/`max` when set. This is all browser-native behavior — Material Design 3 adds no keyboard handling of its own for numeric inputs.
- **Screen reader**: When `type="number"` is used, the browser applies `role="spinbutton"` implicitly. `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` are set from the HTML `min`, `max`, and `value` attributes. Material adds no additional ARIA instrumentation beyond standard TextField label association.
- **ARIA**: `role="spinbutton"` via native browser behavior on `<input type="number">`. No Material-specific ARIA augmentation for numeric inputs is documented. Notably, accessibility guidance from the ARIA working group recommends `inputmode="numeric"` + `pattern` over `type="number"` in some contexts because spinbutton semantics can be confusing when step controls are not visible — Material gives no guidance on this tradeoff.

## Strengths & Gaps
- **Best at**: Zero-overhead numeric input for simple forms — `type="number"` works out of the box with minimal configuration and carries well-understood HTML semantics.
- **Missing**: No stepper button design spec, no guidance on `type="number"` vs `inputmode="numeric"`, no locale-aware formatting, and no warning tier for soft validation — teams building numeric inputs on Material must make all of these decisions independently.
