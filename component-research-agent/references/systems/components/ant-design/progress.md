---
system: Ant Design
component: Progress
url: https://ant.design/components/progress/
last_verified: 2026-03-28
---

# Progress

## Approach
Ant Design's `Progress` component makes the most structurally ambitious choice of any Tier 1 system: it consolidates linear (line), circular (circle), and dashboard (partial arc) progress visualizations into a single component with a `type` prop. Where every other system either provides only linear, or provides linear and circular as separate components, Ant Design unifies all three shapes under one API. The philosophy is developer ergonomics and API simplicity — a developer who understands `Progress` once understands all three shapes, and switching between them requires changing one prop. This reflects Ant Design's heritage as a design system built for China's enterprise SaaS market, where products tend to be dashboard-heavy and simultaneously need multiple progress visualization styles on the same screen (line for upload tasks, circle for capacity indicators, dashboard for gauge-style metrics).

The component is also distinctive in treating status transitions as first-class: the `status` prop accepts `'normal'`, `'active'`, `'success'`, and `'exception'`, where `active` creates an animated shimmer effect on the line type and success/exception trigger color and icon changes automatically. This status model means the developer doesn't manually manage colors — they declare the semantic state and the component handles all visual rendering including the success checkmark and error X icons. The `format` prop enables fully custom percentage label rendering, which can display anything from a raw number to a custom JSX element inside the circle.

## Key Decisions
1. **Single component for three shapes via `type` prop** (HIGH) — `type="line"` (default), `type="circle"`, and `type="dashboard"`. The WHY: Ant Design's target products are enterprise dashboards that frequently need multiple visualizations of progress simultaneously. Maintaining three separate components would triple the API surface and create inconsistencies in how `percent`, `status`, and `strokeColor` behave across shapes. One component with one API ensures these props behave identically regardless of shape. The tradeoff is that the component has props that only apply to specific types (e.g., `gapDegree` is only meaningful for `dashboard` type), which creates a wider prop surface with some type-specific unused props.

2. **`status` drives color and icon automatically** (HIGH) — `status="success"` renders the fill green with a checkmark; `status="exception"` renders red with an X icon; `status="active"` adds a shimmer animation to the line type. The WHY: In Ant Design's SaaS context, async operations need to communicate outcome, not just percentage. Decoupling status from percent means a developer can set `status="success"` when an operation completes without needing to manually set `percent={100}` and change colors — the semantic declaration handles all visual output. This is operationally cleaner for async state management.

3. **`strokeColor` supports gradients** (MEDIUM) — For the line type, `strokeColor` accepts either a single color string or an object `{ '0%': '#108ee9', '100%': '#87d068' }` for a gradient fill. For circle and dashboard types, it accepts a conic gradient object keyed by percentage. The WHY: Ant Design's enterprise users frequently want progress bars that convey intensity zones (green → yellow → red as capacity fills), and implementing this through multiple stacked elements or CSS overrides is fragile. First-class gradient support in the API makes this pattern robust and theme-aware.

4. **`format` prop for custom label rendering** (MEDIUM) — The `format` prop accepts a function `(percent) => ReactNode`, allowing the percentage label (displayed in the center of circle/dashboard, or to the right of line) to render as anything — a custom string, an icon, or a JSX fragment. The WHY: Ant Design's business context includes scenarios where "73%" is less useful than "73 GB / 100 GB" or a custom status icon. The format function gives developers full control over the label without forking the component or overriding CSS.

5. **`percentPosition` for inline label placement** (LOW) — Ant Design 5.x added `percentPosition` to control where the percentage label appears relative to the line bar (inside, start, end). This responds to layout contexts where a label to the right of a bar overflows a container. The WHY: enterprise tables and lists often contain progress bars in constrained-width table cells, where the default right-side label breaks the layout. In-bar label placement avoids overflow while keeping the percentage visible.

## Notable Props
- `type` ('line' | 'circle' | 'dashboard'): Shape selector — the defining prop. Defaults to `'line'`.
- `percent` (number, 0–100): Current progress value.
- `status` ('normal' | 'active' | 'success' | 'exception'): Semantic state that drives color and icon. Separates visual state management from raw percentage tracking.
- `strokeColor` (string | object): Single color or gradient object — unique among Tier 1 systems for supporting gradient fills natively.
- `format` ((percent) => ReactNode): Custom label rendering function.
- `gapDegree` (number): Angle of the gap in the dashboard arc — only meaningful for `type="dashboard"`.
- `strokeWidth` (number): Bar thickness in pixels (line) or percentage of radius (circle/dashboard).
- `percentPosition` (object, v5+): Controls label alignment relative to the bar.

## A11y Highlights
- **Keyboard**: Not interactive; never receives focus.
- **Screen reader**: Uses `role="progressbar"` with `aria-valuenow` set to the `percent` value, `aria-valuemin="0"`, and `aria-valuemax="100"`. An accessible name must be supplied by the developer via `aria-label` on the containing element or through the page's label association — Ant Design does not enforce a required label prop, which is a gap compared to Spectrum. The `format` function's return value is visually rendered but may not be reliably announced by all screen readers without additional ARIA markup.
- **ARIA**: When `status="active"`, the component does not add any ARIA live region, meaning screen readers do not announce the shimmer animation. Progress value updates need to be handled by the consuming application if real-time announcements are required. For the circle and dashboard types, the percentage label inside the shape is rendered as visible text that screen readers can read, but the visual shape itself carries no additional semantic meaning beyond `role="progressbar"`.

## Strengths & Gaps
- **Best at**: Shape flexibility and rich visual customization — the only Tier 1 system that provides linear, circular, and dashboard (partial arc) shapes with a unified API, plus native gradient stroke support, making it the most versatile for data-heavy dashboard contexts.
- **Missing**: No enforced accessible label requirement (unlike Spectrum) and no `isIndeterminate` prop on the line type — indeterminate behavior requires custom CSS animation overrides rather than a first-class API prop.
