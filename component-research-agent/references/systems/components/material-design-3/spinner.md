---
system: Material Design 3
component: Progress Indicator (Circular, Indeterminate)
url: https://m3.material.io/components/progress-indicators/overview
last_verified: 2026-03-28
---

# Progress Indicator — Circular Indeterminate

## Approach
Material Design 3 takes a unified, single-component approach to progress feedback: one component handles both determinate (known progress) and indeterminate (unknown duration) modes by the presence or absence of a `value` prop. The circular form is designed for compact UI contexts — inline within a card, centred in a button, or floating over a content region — where a linear bar would feel visually oversized. Indeterminate mode renders as a continuously animating arc that grows and shrinks as it travels the invisible circular track clockwise, providing unambiguous motion cues that the system is active. M3 updated the progress indicator visual language to align with the broader Material You colour expression, introducing four-colour indeterminate cycles that pull from the system's tonal palette, reinforcing brand identity even in loading states. The design deliberately decouples loading feedback from overlay blocking: a spinner by itself does not lock interaction; overlay behaviour is left to the application to compose, giving developers full control without prescribing a modal pattern.

## Key Decisions
1. **Unified determinate/indeterminate API** (HIGH) — Passing `value` (0–1 in web, 0–100 in Android) makes the indicator determinate; omitting it or setting `indeterminate` to `true` switches to animation mode. This eliminates the need for two separate components, reduces API surface, and lets teams swap between modes at runtime as soon as progress data becomes available — a common real-world pattern where a task starts indeterminate and resolves to a determinate fill once a backend response includes completion percentage.

2. **Four-colour indeterminate animation** (MEDIUM) — The `four-color` attribute on `<md-circular-progress>` cycles the arc through four tonal roles (primary, secondary, tertiary, error) during its spin. The reasoning is expressive brand differentiation: in Material You, colour is a primary identity vector, so even transient loading states participate in the design system's palette story. Teams that want a single-colour, more neutral loading state omit this attribute.

3. **Circular vs. linear form — distinct components** (HIGH) — M3 keeps `<md-circular-progress>` and `<md-linear-progress>` as separate element types rather than a `shape` prop on one component. The rationale is semantic and compositional: circular indicators are placed within constrained layout slots (icon buttons, avatar zones, compact tiles), while linear indicators span horizontal containers (page tops, card headers). Having distinct elements makes placement intent explicit and avoids prop-driven layout ambiguity.

4. **No built-in overlay** (MEDIUM) — Material Design 3 documents the spinner as a standalone feedback element and explicitly defers overlay/blocking patterns to the app layer. This reflects the system's composition philosophy: rather than baking a modal overlay into the loading component (and then exposing props to disable it), devs compose a `<div>` backdrop + `<md-circular-progress>` as needed. The downside is inconsistency across products that implement overlays differently.

5. **Colour via design tokens, not explicit props** (LOW) — The indicator's colour follows the primary container token by default and can be overridden through CSS custom properties (`--md-circular-progress-active-indicator-color`). This preserves the Material You adaptive colour contract — the spinner tints automatically when the system theme changes — but makes explicit colour control more verbose than a simple `color` prop.

## Notable Props
- `indeterminate`: Switches the component from value-tracking arc to continuous looping animation. The key signal that "we have no ETA."
- `value` (0–1): When present, overrides indeterminate and draws a proportional filled arc. The same prop drives both modes — no separate "mode" switch needed.
- `four-color`: Enables the M3 multi-tonal cycling animation. Interesting because it's a purely expressive decision with no functional a11y or behavioural consequence — purely brand/aesthetic opt-in.
- `--md-circular-progress-size` (CSS custom property): Controls diameter. No discrete "S/M/L" enum; size is fully fluid, which is flexible but means teams must define their own size conventions.

## A11y Highlights
- **Keyboard**: Not interactive — no keyboard handling. Does not manage or trap focus. Focus management during loading states is the application's responsibility.
- **Screen reader**: Uses `role="progressbar"`. In indeterminate mode, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` are omitted (as per ARIA spec for indeterminate progressbars). The component does not automatically announce that loading has started or ended — it requires the app to manage an `aria-live` region or `aria-busy` attribute on the loading target.
- **ARIA**: An `aria-label` must be manually added to the element (`<md-circular-progress aria-label="Loading content">`); the component does not supply a default label. The recommended pattern from M3 docs is to also set `aria-busy="true"` on the region being loaded and remove it when done, providing screen readers with a contextual signal rather than relying solely on the progressbar role.

## Strengths & Gaps
- **Best at**: Seamlessly switching between indeterminate and determinate modes at runtime with a single prop change — ideal for progressive disclosure loading flows.
- **Missing**: No built-in overlay/blocking pattern, no default loading label, and no out-of-the-box `prefers-reduced-motion` pause behaviour in the web component (motion reduction is left to CSS).
