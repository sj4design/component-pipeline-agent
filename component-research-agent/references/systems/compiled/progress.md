---
component: progress
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Progress — All Systems Digest

## Material Design 3
**Approach**: Two distinct components — LinearProgressIndicator and CircularProgressIndicator. Determinate vs. indeterminate via nullable `progress` float (null = indeterminate). Linear has two indeterminate animation subtypes (disjoint/contiguous). Color follows `colorPrimary` token. Separate from Spinner (indeterminate activity).
**Key decisions**:
- Two separate components (not one with `shape` prop); each has shape-specific props (gapSize, drawStopIndicator for linear; strokeCap, strokeWidth for circular) — merging would create cross-contamination
- Determinate via nullable float (0.0–1.0 not 0–100); normalized values translate cleanly to animation lerp calculations; null triggers indeterminate without a separate boolean
- `drawStopIndicator` marks the 100% endpoint with a dot; visually marks where the fill is heading — reduces ambiguity when progress is at low values
**Notable API**: `progress` (Float?, null=indeterminate); `trackColor`; `strokeCap`; `gapSize`; `drawStopIndicator`; `app:indicatorColor`
**A11y**: role="progressbar" + aria-valuenow/min/max; indeterminate = aria-valuenow omitted (correct ARIA spec); aria-label required (no visible label in component); prefers-reduced-motion respected.
**Best at**: Tightly integrated token system — automatically inherits theme color and motion settings. **Missing**: No built-in percentage label rendered by the component itself.

## Spectrum (Adobe)
**Approach**: ProgressBar and Meter as two separate components — only system to formalize this split. ProgressBar = task completion (role="progressbar"); Meter = persistent scalar measurement (role="meter"). `formatOptions` uses Intl.NumberFormatOptions for locale-aware label formatting. Label required (TypeScript enforced).
**Key decisions**:
- ProgressBar/Meter split enforced at component level; ARIA roles differ (progressbar implies "will finish," meter implies "current reading") — collapsing into one with a variant prop makes the semantic choice invisible and increases misuse risk
- `isIndeterminate` boolean explicitly removes aria-valuenow from DOM; clearer intent in code review than null value approach
- `minValue`/`maxValue` accept domain values (not forced to 0–100); teams work with raw values without conversion logic — safer and produces more accurate SR announcements
**Notable API**: `isIndeterminate`; `minValue`/`maxValue`; `formatOptions` (Intl.NumberFormatOptions); `valueLabel` (fully custom label string); `labelPosition` (top|side); `showValueLabel`; `staticColor` (white|black for colored backgrounds)
**A11y**: role="meter" announces as current measurement (not task in progress); label prop required in TypeScript types; aria-valuenow omitted for indeterminate; RTL auto-flipped.
**Best at**: Semantic correctness — ProgressBar/Meter split, required label enforcement, Intl.NumberFormat integration. **Missing**: No buffer/secondary-track pattern; only two sizes.

## Carbon (IBM)
**Approach**: Explicit success/error states with color + icon (not just color). Helper text below the bar is the canonical location for percentage and status text, announced via aria-live="polite". Two sizes (sm 4px / md 8px). Note: separate from Carbon's "Progress Indicator" (multi-step wizard component).
**Key decisions**:
- Success/error states use icon + color together; color alone fails WCAG for color-blind users — icon reinforces state unambiguously; "fill to full width on error" visually closes the bar instead of leaving ambiguous partial fill
- Helper text as primary label location; below-bar text stays readable at all fill levels (no contrast conflict with fill color) and can transition from "45%" to "Upload complete" without layout change
- `status` prop separates semantic state from numeric value; you can set `status="finished"` when async resolves regardless of whether `value` reached 100
**Notable API**: `value` (0-100); `status` (active|finished|error); `size` (sm|md); `helperText`; `label` (above bar, required); `hideLabel`
**A11y**: role="progressbar" + aria-valuenow; aria-live="polite" on helper text; error/success icons are aria-hidden (state communicated by ARIA); `aria-busy` pattern on loading region recommended.
**Best at**: Enterprise status communication — success/error states with icon, aria-live helper text, aria-busy regional pattern. **Missing**: No circular variant; no side-positioned value label.

## Polaris (Shopify)
**Approach**: Determinate-only (indeterminate = use Spinner). Four semantic tones (highlight/primary/success/critical). `animated` prop defaults true with opt-out for static snapshots. `ariaLabelledBy` references an existing DOM label element (not an inline string). Three sizes.
**Key decisions**:
- Determinate-only; Polaris made explicit component split — ProgressBar = known progress, Spinner = unknown duration; combining both was rejected because the indeterminate animation is perceptually very different from a filling bar
- Four semantic tones instead of raw colors; merchant-facing UIs need color to communicate state not brand — constrains to intent-based palette, preventing accessibility failures from arbitrary color choices
- `ariaLabelledBy` references existing DOM element instead of duplicating text; Shopify admin pages always have nearby descriptive headings — referencing them avoids redundant SR announcements
**Notable API**: `progress` (0-100); `tone` (highlight|primary|success|critical); `animated` (default true); `ariaLabelledBy` (DOM element ID); `size` (small|medium|large)
**A11y**: role="progressbar" + aria-valuenow; tone changes visual color only — no ARIA representation of critical/success state (gap); no indeterminate = aria-valuenow always present.
**Best at**: Semantic tone system — cleanest mapping of visual color to design meaning with zero risk of arbitrary color misuse. **Missing**: No indeterminate state; tone semantics not communicated to screen readers.

## Atlassian
**Approach**: Three named variants (default/success/inverse/transparent). `value` accepts 0–1 float (not 0–100). `isIndeterminate` as first-class prop. `ariaLabel` inline string (no external DOM element required). Positioned within explicit component triad: ProgressBar (measurable) / Spinner (unknown) / Skeleton (content placeholder).
**Key decisions**:
- `isIndeterminate` on ProgressBar (not Spinner-only); Atlassian products frequently trigger background jobs where duration is unknown — keeping the visual language consistent between known and unknown progress is better UX than switching components
- 0–1 float value; normalizing at the component level integrates cleanly with async data (loaded/total gives 0–1 directly without conversion)
- Explicit component triad documentation; without decision criteria, developers default Spinner for everything — documented guidance on when to use each of the three components reduces inconsistent loading patterns
**Notable API**: `value` (0-1 float); `appearance` (default|success|inverse); `isIndeterminate`; `ariaLabel` (inline string)
**A11y**: role="progressbar" + aria-valuenow (as percentage equivalent); aria-valuenow omitted for isIndeterminate; `appearance="success"` does not add ARIA completion state — consuming developer must update ariaLabel to "Complete."
**Best at**: Component ecosystem guidance — explicit ProgressBar/Spinner/Skeleton decision criteria. **Missing**: No built-in numeric label slot; percentage display composed separately.

## Ant Design
**Approach**: Single component for three shapes via `type` prop (line/circle/dashboard). `status` drives color and icon automatically (normal/active/success/exception). `strokeColor` supports gradient fills. `format` for custom label rendering. `percentPosition` for inline label placement in constrained widths.
**Key decisions**:
- Three shapes in one component; enterprise dashboards need multiple progress visualization styles simultaneously — three separate components would triple API surface with inconsistent behavior for shared props like percent and status
- `status` decoupled from `percent`; set `status="success"` when async resolves without also needing to set percent=100 and change colors — cleaner async state management
- Native gradient `strokeColor`; enterprise users need intensity-zone bars (green→yellow→red) — first-class gradient support avoids fragile stacked-element workarounds
**Notable API**: `type` (line|circle|dashboard); `percent` (0-100); `status` (normal|active|success|exception); `strokeColor` (string|gradient object); `format` ((percent)=>ReactNode); `gapDegree` (dashboard arc gap); `percentPosition`
**A11y**: role="progressbar" + aria-valuenow; no enforced label requirement (gap vs Spectrum); `status="active"` adds no aria-live region; no isIndeterminate prop (requires CSS override).
**Best at**: Shape flexibility and gradient fills — only system with linear/circular/dashboard unified API for data-heavy dashboards. **Missing**: No enforced label requirement; no isIndeterminate first-class support.
