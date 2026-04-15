---
system: Spectrum (Adobe)
component: ProgressCircle
url: https://react-spectrum.adobe.com/react-spectrum/ProgressCircle.html
last_verified: 2026-03-28
---

# ProgressCircle

## Approach
Spectrum treats circular and linear progress as fundamentally different visual and semantic objects, which is why `ProgressCircle` and `ProgressBar` are separate components rather than variants of one. The circular form is optimised for contexts where vertical space is at a premium — icon-sized slots inside toolbars, loading states inside image wells, or compact card footers — where a horizontal bar would break the layout. `ProgressCircle` supports both determinate and indeterminate modes via the `isIndeterminate` boolean prop, with determinate mode capable of representing arbitrary ranges through `minValue`/`maxValue` rather than hard-coding 0–100. Adobe's products span enormously varied interfaces (Lightroom mobile, Analytics dashboards, Experience Manager admin panels), so the component must be equally at home in a dense data grid as it is in a full-bleed creative canvas — hence the three size variants (S, M, L) and a `staticColor` prop that ensures contrast compliance when placed over photographic or coloured backgrounds, which is a daily reality in creative tools. Accessibility is enforced at the prop level: an `aria-label` or `aria-labelledby` is required by the API, not just recommended, reflecting Adobe's strong a11y commitments across all Spectrum components.

## Key Decisions
1. **Separate component from ProgressBar** (HIGH) — ProgressCircle is not a prop on ProgressBar; it is its own component. The rationale is compositional clarity: the circular form is used in fundamentally different layout positions than a bar (inline vs. spanning), and mixing them into one component would create a confusing API with mutually exclusive layout props. Keeping them separate means each API is focused and the component's intent is unambiguous at the call site. A developer reaching for `ProgressCircle` knows exactly what they're rendering.

2. **`isIndeterminate` boolean** (HIGH) — Rather than inferring mode from the absence of a `value` prop (as M3 does), Spectrum uses an explicit boolean flag. This is a deliberate API clarity decision: the indeterminate state is named and intentional, not inferred. It means a developer can set `isIndeterminate={true}` while also passing a `value` without causing an accidental mode switch — the explicit flag wins. It also makes the intent readable in JSX without needing to trace whether `value` is undefined.

3. **`staticColor` prop for contrast on coloured backgrounds** (HIGH) — When `ProgressCircle` is placed over a dark photograph, video thumbnail, or brand-coloured container, the default primary-tinted arc may become invisible. The `staticColor` prop (`"white"` or `"black"`) forces a fixed colour regardless of the system theme. This is a practical concession to Adobe's creative product context, where UI elements routinely sit over arbitrary user content. Most design systems don't have this prop because their use cases involve controlled backgrounds.

4. **Custom value range via `minValue`/`maxValue`** (MEDIUM) — Rather than normalising progress to 0–100 and asking developers to convert, Spectrum lets the component accept the raw values from the data layer. If a task goes from step 3 to step 27, you pass `minValue={3}` and `maxValue={27}`. This reduces mapping logic at the usage site and treats the component as a view layer that receives domain data directly — consistent with Spectrum's "data-forward" prop philosophy.

5. **Three size variants (S/M/L)** (MEDIUM) — Small (16px) sits comfortably inside a button or icon slot. Medium (32px) is the default for standalone loading states. Large (64px) works for page-level or section-level loading where the indicator needs visual prominence. The three sizes are defined by Spectrum's T-shirt sizing scale rather than arbitrary pixels, which keeps them harmonised with the broader component system's spatial tokens.

## Notable Props
- `isIndeterminate`: Explicit mode-declaration prop — interesting because it makes the design intent readable in code rather than inferred from missing values.
- `staticColor`: Rare across design systems; solves the real problem of showing a spinner over user-controlled image content in creative tools.
- `minValue` / `maxValue`: Allows passing domain-scale values directly, eliminating the 0–100 normalisation step at the call site.
- `aria-label` (required): Enforced at the type level — the component won't render accessibly without it. This is stricter than most systems that merely recommend it.

## A11y Highlights
- **Keyboard**: Not interactive — no keyboard focus or handling. The component does not manage focus; loading state focus management is the application's responsibility (e.g., moving focus to newly loaded content).
- **Screen reader**: Uses `role="progressbar"`. In indeterminate mode, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` are absent per ARIA spec — the progressbar role without value attributes communicates "in progress, unknown duration" to screen readers. The `aria-label` (required) is announced when the element comes into the accessibility tree.
- **ARIA**: `aria-label` or `aria-labelledby` is mandatory — the API enforces this. There is no built-in `aria-live` region or announcement when loading completes; the application must handle that separately. Internationalisation of the label is the developer's responsibility: pass a localised string to `aria-label`.

## Strengths & Gaps
- **Best at**: Enforcing accessible labelling at the API level and handling contrast edge cases on coloured/image backgrounds via `staticColor` — critical for Adobe's creative tool ecosystem.
- **Missing**: No built-in loading overlay/wrapper pattern (Spectrum leaves overlay composition to the application), no `aria-live` announcement on completion, and no delay prop to suppress flicker on fast operations.
