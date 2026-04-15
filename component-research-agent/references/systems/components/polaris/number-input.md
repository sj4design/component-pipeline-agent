---
system: Polaris (Shopify)
component: TextField (type="number") — no dedicated NumberField
url: https://polaris.shopify.com/components/selection-and-input/text-field
last_verified: 2026-03-28
---

# Number Input (Absent — Uses TextField with type="number")

## Approach
Polaris does not have a dedicated NumberField or NumberInput component in its main component library. Like Material Design 3, Polaris routes numeric input through its general-purpose TextField component using `type="number"`, but Polaris goes further than Material by explicitly documenting numeric-specific props (`min`, `max`, `step`, `largeStep`) and stepper behavior as first-class features of the TextField component. This approach reflects Shopify's product reality: the vast majority of numeric input in Shopify's merchant-facing admin involves simple quantities, prices, and counts. The most common numeric input in Shopify (product quantity, inventory count, price fields) is bounded, stepped, and simple enough that a general `TextField` with `type="number"` covers all real use cases without the overhead of a specialized component. The tradeoff is that Shopify's POS (point-of-sale) and web components APIs do ship a dedicated `NumberField` component with more explicit stepper controls — the existence of this component in the POS layer but not the main Polaris library reveals a pragmatic division: the POS touch interface needs explicit, large stepper buttons (because touch users cannot rely on arrow keys), while the desktop admin can lean on the browser's native stepper affordance.

The most notable Polaris-specific addition over vanilla `type="number"` behavior is the `largeStep` prop, which controls the value change applied when the user presses Page Up or Page Down. This is a deliberate accessibility enhancement: ARIA's spinbutton specification mentions large-step keyboard behavior, but HTML provides no native Page Up/Down handling for number inputs. Polaris implements it explicitly.

## Key Decisions

1. **No dedicated component — TextField handles all numeric input** (HIGH) — Polaris's explicit documentation of numeric TextField usage (with `type="number"` examples in the docs) signals that this is intentional, not an oversight. The WHY is Shopify's component philosophy: Polaris favors a small number of highly flexible components over a large number of specialized ones. Every additional component adds onboarding cost for the thousands of developers building on the Shopify platform. If `TextField` + `type="number"` covers 95% of use cases, a dedicated NumberField adds maintenance burden for 5% of cases.

2. **`largeStep` prop for Page Up/Down** (MEDIUM) — The `largeStep` prop defines the increment applied on Page Up/Page Down key events. Standard HTML `<input type="number">` does not respond to Page Up/Down; Polaris adds this behavior. The WHY is ARIA spinbutton compliance: the ARIA 1.1 specification for `role="spinbutton"` specifies that Page Up/Down should apply a "large step" change. Without explicit implementation, keyboard-only users have no way to make large-increment changes efficiently. The decision to expose this as a separate prop rather than deriving it (e.g., `step * 10`) gives product teams explicit control over what "jump ahead" means in their specific context.

3. **Spinner (stepper) buttons shown on hover/focus with `aria-hidden`** (MEDIUM) — Polaris renders up/down arrow buttons inside the TextField when `type="number"`, but marks them `aria-hidden="true"`. The WHY is a deliberate accessibility decision: the stepper buttons are a mouse convenience affordance, not the primary interaction model. Screen reader users operate number inputs via keyboard (arrow keys), not by activating the spinner arrows. Making the buttons aria-hidden prevents screen reader users from encountering redundant controls that duplicate arrow-key functionality. This is a principled stance — it matches ARIA guidance that visual stepper affordances in spinbuttons are supplementary to keyboard interaction.

4. **`min` / `max` as HTML attribute mirrors** (LOW) — Polaris documents `min` and `max` as "mimicking the behavior of the native HTML attribute". Rather than building custom range validation, Polaris delegates range enforcement to the browser. The WHY is again about minimal override of native behavior: browser-native range validation provides `aria-valuemin`/`aria-valuemax` for free, handles clamping at the platform level, and triggers native constraint validation API errors. The cost is that validation feedback styling must be handled by Polaris's `error` prop separately, since browser native `min`/`max` errors render outside Polaris's design language.

5. **POS NumberField as the "full" version** (MEDIUM) — Shopify's POS UI extensions expose a dedicated `NumberField` component with explicit stepper controls designed for touch. This contextual split — sparse desktop TextField vs. explicit POS NumberField — documents a design insight: the same data type (a number) needs different input affordances depending on interaction modality. Desktop: rely on keyboard + native stepper hover. Touch: large, always-visible stepper buttons are mandatory.

## Notable Props
- `type="number"` (on TextField): Activates numeric mode — spinner buttons on hover/focus, `min`/`max`/`step` HTML attributes, browser native `role="spinbutton"`.
- `min` / `max`: Mirror HTML `min`/`max` attributes. Enforce range at the browser level; Polaris does not add custom clamping logic.
- `step`: Increment per stepper click or arrow key (e.g., `step={0.01}` for price fields).
- `largeStep`: Increment for Page Up/Page Down — Polaris-specific extension beyond native HTML behavior.
- `error`: String or boolean — renders red error border + error message below. No separate warning state.

## A11y Highlights
- **Keyboard**: Arrow Up/Down increment/decrement by `step`. Page Up/Down increment/decrement by `largeStep` (Polaris-specific implementation of ARIA spinbutton large-step behavior). Home/End for min/max follows browser-native `<input type="number">` behavior.
- **Screen reader**: The spinner (stepper) buttons are rendered with `aria-hidden="true"` — they are intentionally invisible to screen readers. Screen reader users interact via keyboard (arrow keys) using spinbutton semantics. `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` are provided by the browser's native `type="number"` implementation when `min`/`max` are set.
- **ARIA**: `role="spinbutton"` is applied implicitly by the browser on `<input type="number">`. Polaris does not override or supplement this. The decision to `aria-hidden` the spinner buttons is documented as intentional and matches ARIA guidance that spinbutton controls should be operable via keyboard without requiring additional button activations.

## Strengths & Gaps
- **Best at**: The `largeStep` prop is a deliberate, explicit implementation of ARIA spinbutton large-step keyboard behavior — more precise than leaving it to browser defaults, and shows more ARIA compliance than most general-purpose TextField implementations.
- **Missing**: No locale-aware formatting (no `Intl.NumberFormat` integration), no warning state for soft validation, and no visible always-on stepper buttons for desktop — teams needing prominent ±  buttons for quantity fields must build them custom.
