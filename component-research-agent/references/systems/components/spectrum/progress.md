---
system: Spectrum (Adobe)
component: ProgressBar + Meter (separate components)
url: https://react-spectrum.adobe.com/react-spectrum/ProgressBar.html
last_verified: 2026-03-28
---

# ProgressBar (and Meter — see below)

## Approach
Adobe Spectrum makes an architectural decision that most design systems skip: it splits what many call a "progress bar" into **two semantically distinct components** — `ProgressBar` and `Meter`. This is not a visual distinction. Both render as a horizontal filled track. The split is entirely about meaning and use case. `ProgressBar` represents the progression of a system-driven operation (downloading, uploading, processing, analyzing) — a task with a beginning, middle, and end. `Meter` represents a user-driven or persistent quantity within a known range (storage used, items consumed from a quota, achievement level) — a measurement that can go up or down and has no inherent "completion" state.

This separation is grounded in both semantic HTML principles and ARIA spec: the HTML `<progress>` element is for task completion, and the HTML `<meter>` element is for scalar measurements. Spectrum's component split maps directly to these native elements and their corresponding ARIA roles (`role="progressbar"` vs `role="meter"`). Screen readers announce these differently — a progressbar implies "this will finish eventually," while a meter implies "this is a current reading." Collapsing them into one component with a `variant` prop would mean making that semantic choice invisible to developers, increasing the risk of misuse. Adobe chose explicit naming and separate APIs to force the right decision at component selection time.

## Key Decisions
1. **ProgressBar vs. Meter split** (HIGH) — ProgressBar is for temporary system operations; Meter is for persistent user-driven quantities. The WHY is twofold: (1) proper ARIA semantics differ (`role="progressbar"` announces task progress, `role="meter"` announces a measurement), and (2) the visual design differs — Meter uses `variant` (informative/positive/warning/critical) to communicate levels, while ProgressBar uses `isIndeterminate` for unknown duration. Conflating them would obscure these meaningful differences and encourage developers to misuse a progressbar to show disk usage (a known anti-pattern in accessibility).

2. **Indeterminate via `isIndeterminate` boolean** (HIGH) — When the duration of an operation cannot be determined, `isIndeterminate={true}` triggers the animation and removes `aria-valuenow` from the DOM. This is the correct ARIA pattern. Spectrum is explicit about this being a boolean prop rather than a null value, keeping the API readable — it's clear from code review whether indeterminate state was intentional.

3. **Custom min/max range via `minValue` / `maxValue`** (MEDIUM) — Rather than forcing a 0–100 scale, Spectrum lets developers pass domain-specific values (e.g., `minValue={0}` `maxValue={500}` for a 500MB download). The displayed label automatically formats to the scale. The WHY: forcing 0–100 requires developers to write conversion logic, introducing bugs. Accepting the real domain values and handling the math internally is safer and produces more accurate screen reader announcements.

4. **`formatOptions` for label display** (MEDIUM) — ProgressBar accepts `formatOptions` compatible with JavaScript's `Intl.NumberFormat`, allowing the value label to display as a percentage, a currency amount, a file size, or any locale-aware format. This is unusually flexible for a progress bar component. The WHY: Adobe builds tools used in dozens of locales (Creative Cloud, Document Cloud, Experience Platform), and percentage formatting conventions differ internationally. Building this in prevents ad-hoc label hacks.

5. **`staticColor` for background contrast** (LOW) — A `staticColor` prop accepts `'white'` or `'black'`, overriding the theme color when the progress bar sits on a colored background (e.g., a blue hero banner). The WHY: Spectrum's design tokens are optimized for light/dark mode, but when a component appears on a non-neutral background, those tokens may fail contrast requirements. `staticColor` is the escape hatch that keeps accessibility intact without requiring a custom theme.

## Notable Props
- `isIndeterminate`: Triggers animation and removes `aria-valuenow` — correctly implements the ARIA pattern for unknown-duration operations.
- `minValue` / `maxValue`: Domain-scale values; avoids forcing consumers to normalize to 0–100.
- `formatOptions`: `Intl.NumberFormat` options for locale-aware value label formatting.
- `valueLabel`: Fully custom label string (e.g., "30 of 60 dogs") that overrides automatic formatting when the computed label is not meaningful to users.
- `labelPosition`: `'top'` (default) or `'side'` — allows layout-appropriate placement when horizontal space is constrained.
- `showValueLabel`: Toggle the percentage/value display; requires an accessible label via `label`, `aria-label`, or `aria-labelledby` when hidden.
- `staticColor`: `'white'` | `'black'` — contrast override for colored backgrounds.

## A11y Highlights
- **Keyboard**: Not interactive, never focusable. No keyboard interaction is defined.
- **Screen reader**: Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`. When `isIndeterminate` is true, `aria-valuenow` is intentionally omitted. A label prop (`label`, `aria-label`, or `aria-labelledby`) is **required** — the component enforces this in TypeScript types, making it difficult to accidentally ship an unlabeled progress bar.
- **ARIA**: Meter uses `role="meter"` (distinct from `role="progressbar"`), which assistive technology announces differently — as a current measurement rather than a task in progress. This is the core reason for the split: the two ARIA roles communicate fundamentally different things to screen reader users. RTL layout is automatically flipped for Hebrew and Arabic locales.

## Strengths & Gaps
- **Best at**: Semantic correctness and accessibility enforcement — the ProgressBar/Meter split, required label props, and `Intl.NumberFormat` integration make this the most rigorous implementation of accessible progress feedback across all Tier 1 systems.
- **Missing**: Only two visual sizes (S, L); no built-in buffer/secondary-track pattern for scenarios like video buffering where a second progress value needs to be shown simultaneously.
