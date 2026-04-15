---
system: Material Design 3
component: LinearProgressIndicator / CircularProgressIndicator
url: https://m3.material.io/components/progress-indicators/overview
last_verified: 2026-03-28
---

# Progress Indicators (Linear & Circular)

## Approach
Material Design 3 treats progress indicators as two distinct but philosophically unified components — `LinearProgressIndicator` for horizontal contexts and `CircularProgressIndicator` for compact or centered layouts. The core philosophy is that progress indicators exist to communicate measurable advancement through a task, building user confidence that a system is working and not frozen. MD3 deliberately separates progress indicators from spinners (indeterminate activity indicators) because the two serve different cognitive purposes: a progress indicator tells the user "here's how far along we are," while a spinner simply says "something is happening." The determinate state is the primary use case; indeterminate is treated as a fallback when progress cannot be calculated. Both shapes share the same underlying token system and color semantics, ensuring visual coherence whether the layout calls for linear or circular form.

The API differs by platform — Android uses `LinearProgressIndicator` and `CircularProgressIndicator` as XML attributes or Jetpack Compose composables, while the web component set is handled through Material Web Components. In Compose, passing a `progress` lambda enables determinate mode; omitting it produces indeterminate animation. The linear variant supports two indeterminate animation subtypes: **disjoint** (two separate segments cycling in the same color) and **contiguous** (three adjacent segments in different colors), giving motion designers meaningful control.

## Key Decisions
1. **Two shapes, two components** (HIGH) — MD3 provides linear and circular as separate components rather than a single component with a `shape` prop. This keeps each component's API focused and avoids the complexity of handling circular-specific props (like stroke width and sweep angle) inside a linear component. The tradeoff is that switching shapes requires swapping the component, not just a prop — but this is intentional: the shapes are genuinely different structural elements, not just visual variations of the same thing.

2. **Determinate vs. indeterminate via a single prop** (HIGH) — In Compose, you pass a `progress` float (0.0–1.0) for determinate mode; passing nothing triggers indeterminate animation. This is cleaner than a separate `isIndeterminate` boolean because it avoids conflicting states. The value range is 0.0–1.0 rather than 0–100, aligning with Material's preference for normalized values that translate more cleanly to animation lerp calculations.

3. **Color follows the primary token** (MEDIUM) — The indicator fill color defaults to `colorPrimary` (e.g., `#6442d6` in MD3's baseline purple theme) and the track (unfilled background) defaults to `colorPrimaryContainer`. This deliberate pairing ensures the progress state reads as a brand-colored action against a tinted background, rather than a grey track that feels low-fidelity. The token approach also means theming the entire app automatically updates all progress indicators.

4. **`gapSize` and `drawStopIndicator` for linear** (MEDIUM) — MD3's linear indicator exposes a `gapSize` between the indicator and track ends, and a `drawStopIndicator` boolean that renders a small dot at the 100% endpoint. The stop indicator is a subtle but deliberate affordance: it visually marks where the fill is heading, reducing ambiguity when progress is at a low value and the track appears mostly empty.

5. **Reduced-motion support** (LOW) — MD3 respects `prefers-reduced-motion` at the platform level. On Android, the indeterminate animation can be suppressed; on web, CSS animations pause. This is not documented as a prominent feature but is built into the token animation system.

## Notable Props
- `progress` (Compose, Float?): Null triggers indeterminate; a float from 0.0 to 1.0 drives determinate fill. The nullable type is the API's way of encoding the determinate/indeterminate distinction without a separate boolean.
- `trackColor`: The color of the unfilled track. Defaults to `colorPrimaryContainer`, which creates a tonal relationship with the fill rather than a neutral grey.
- `strokeCap`: Controls how the end of the fill bar is rendered — `StrokeCap.Round` gives a pill-shaped leading edge, which is MD3's default for a softer feel.
- `gapSize`: Space between the indicator end and the track edge. Unique to MD3 linear; contributes to the segmented/floating visual quality.
- `drawStopIndicator`: Renders a dot at the full-completion end of the track, marking the destination visually.

## A11y Highlights
- **Keyboard**: Progress indicators are non-interactive and are never focusable. No keyboard interaction is defined or expected.
- **Screen reader**: MD3 uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin` (0), and `aria-valuemax` (100) on web implementations. In Android, TalkBack reads the percentage automatically from the `LinearProgressIndicator`'s progress value. An accessible label must be supplied via `contentDescription` (Android) or `aria-label` (web) since the component has no visible text label of its own.
- **ARIA**: For indeterminate state, `aria-valuenow` is omitted entirely — the ARIA spec requires this when progress is unknown, and MD3 follows this correctly. The absence of `aria-valuenow` is what signals "indeterminate" to assistive technology, rather than a special ARIA state attribute.

## Strengths & Gaps
- **Best at**: Tightly integrated token system means progress indicators automatically inherit theme color, elevation, and motion settings with zero extra configuration.
- **Missing**: No built-in value label (percentage text) rendered by the component itself — displaying "45%" alongside the bar requires the developer to compose a separate `Text` element, unlike Spectrum or Carbon which include label slots natively.
