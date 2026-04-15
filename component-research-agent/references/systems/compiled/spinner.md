---
component: spinner
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Spinner — All Systems Digest

## Material Design 3
**Approach**: Circular indeterminate progress indicator — same CircularProgressIndicator component used for both spinner (indeterminate) and determinate modes via nullable `value` prop. Four-colour cycling animation optional (`four-color` attribute). No built-in overlay pattern. Size via CSS custom property (no discrete S/M/L).
**Key decisions**:
- Unified determinate/indeterminate API via nullable value; teams can swap between modes at runtime as data becomes available — common pattern where task starts indeterminate then resolves with progress percentage
- Four-colour tonal animation as brand expression; Material You uses colour as identity vector — even transient loading states participate in the palette story
- No built-in overlay; overlay is composed by the app (div backdrop + spinner) keeping the component semantically focused — but creates inconsistency across products implementing overlays differently
**Notable API**: `indeterminate` (boolean); `value` (0-1, overrides indeterminate); `four-color` attribute; `--md-circular-progress-size` CSS custom property; `--md-circular-progress-active-indicator-color`
**A11y**: role="progressbar"; indeterminate = aria-valuenow/min/max omitted (correct ARIA spec); aria-label must be added manually; aria-busy on loading target region recommended.
**Best at**: Seamless runtime switching between indeterminate and determinate via single prop. **Missing**: No built-in overlay, no default label, no prefers-reduced-motion pause in web component.

## Spectrum (Adobe)
**Approach**: ProgressCircle is a separate component from ProgressBar (not a shape prop). Explicit `isIndeterminate` boolean (not inferred from missing value). `staticColor` (white|black) for contrast on coloured/image backgrounds. Three sizes (S/M/L). aria-label required at API level.
**Key decisions**:
- Separate ProgressCircle from ProgressBar; circular form is placed in different layout positions (icon slots, image wells) than linear — mixing into one component would create confusing mutually exclusive layout props
- `isIndeterminate` explicit boolean vs. inferred-from-null; explicit intent is readable in code review — developer cannot accidentally trigger indeterminate by forgetting to pass a value
- `staticColor` for coloured/image backgrounds; Adobe creative tools routinely show UI over user photo content — spinner over dark photograph becomes invisible without this escape hatch
**Notable API**: `isIndeterminate`; `staticColor` (white|black); `minValue`/`maxValue` (domain-scale values); `aria-label` (required in types); `size` (S|M|L)
**A11y**: role="progressbar"; aria-valuenow/min/max absent for indeterminate; aria-label TypeScript-enforced; no aria-live on completion — app manages that separately.
**Best at**: Enforced accessible labelling at API level and staticColor for contrast on image backgrounds. **Missing**: No built-in overlay, no aria-live completion announcement, no delay for flicker prevention.

## Carbon (IBM)
**Approach**: Three-type taxonomy — Loading (spinner/overlay), InlineLoading, standalone small spinner. InlineLoading is a full async-action lifecycle state machine (active/inactive/finished/error). Large spinner pairs with overlay for page-blocking. `description` text serves as both visible label and accessible name.
**Key decisions**:
- Three distinct loading types (not one with `type` prop); each has different interaction contract — overlay blocks intentionally, inline anchors to triggering element, background spinner signals ambient activity — one component would conflate these scopes
- InlineLoading as status machine (active→finished/error); inline actions always have outcomes — showing only loading state without resolving to success/error leaves users uncertain; live region announcements on each transition
- `description` as visible + accessible label; visible text is the primary a11y affordance — avoids hidden aria attributes that only SR users see
**Notable API**: `status` on InlineLoading (active|inactive|finished|error); `withOverlay` on Loading; `description`; `small` boolean; `isActive`
**A11y**: aria-live="polite" on status transitions; InlineLoading announces success/error states — most complete loading-lifecycle SR announcement of Tier 1 systems; large overlay does not natively enforce focus trapping (documented gap).
**Best at**: InlineLoading status machine — full async lifecycle (loading→success/error) with live region announcements. **Missing**: Large overlay doesn't enforce focus trapping; no duration estimation for long operations.

## Polaris (Shopify)
**Approach**: Minimal — two sizes only (small 20px/large 44px). `accessibilityLabel` solves SVG+AT inconsistency. `hasFocusableParent` adjusts ARIA role based on DOM context (inside button = suppress role to prevent double-announcement). Scoped to action-triggered loading; skeleton screens are preferred for page-level loads.
**Key decisions**:
- Only two sizes; Shopify admin has predictable layouts mapping to two scenarios — "loading a section" (large) and "loading an action/button" (small); broader scale would introduce inconsistency without flexibility
- `hasFocusableParent` exposes ARIA context as explicit prop; correct SR behavior depends on DOM context the component cannot infer — forces developer to be intentional about placement
- Spinner scoped to action-triggered loading; skeleton screens preferred for initial content loads — narrows the component's domain to prevent spinner overuse
**Notable API**: `accessibilityLabel` (primary SR mechanism, solves SVG AT inconsistency); `hasFocusableParent`; `size` (small|large)
**A11y**: accessibilityLabel via DOM mechanism (not SVG title) ensures reliable AT announcement cross-browser; hasFocusableParent suppresses role inside buttons to prevent double-announcement.
**Best at**: SVG + screen reader inconsistency fix via accessibilityLabel + hasFocusableParent, and clear spinner-vs-skeleton guidance. **Missing**: No prefers-reduced-motion docs, no delay prop, no built-in overlay.

## Atlassian
**Approach**: Minimal composable primitive. `label` prop required with guidance to be operation-specific ("Loading project settings" not just "Loading"). `appearance` with `invert` for dark backgrounds (semantic context descriptor, not color value). Three sizes. `prefers-reduced-motion` honored via motion tokens. Uses role="status".
**Key decisions**:
- Descriptive label guidance; enterprise SR users need to know which loading state they're encountering in complex interfaces — prescriptive guidance against generic "Loading" labels is more opinionated than any other system
- `invert` appearance as semantic context descriptor; "you're on a dark background" is clearer API intent than "make it white" — aligns with design system's semantic color philosophy
- role="status" (implicit aria-live="polite"); spinner presence announced without interrupting current user interaction
**Notable API**: `label` (accessible name with prescriptive guidance); `appearance` (default|invert); `size` (small|medium|large); `testId`
**A11y**: role="status" creates implicit aria-live="polite"; prefers-reduced-motion supported via motion tokens (WCAG 2.1 SC 2.3.3); completion not automatically announced — app manages separately.
**Best at**: Prescriptive accessible label guidance and prefers-reduced-motion support. **Missing**: No delay prop for flicker prevention; no skeleton guidance alongside spinner docs.

## Ant Design
**Approach**: Wrapper/overlay pattern as first-class feature — Spin wraps any content subtree and applies loading overlay. `delay` prop debounces spinner visibility (prevents flicker on fast operations). `tip` for visible loading message beneath spinner. `fullscreen` mode for viewport-covering overlay. `indicator` slot for custom spinner element.
**Key decisions**:
- Wrapper/overlay as built-in pattern; enterprise dashboards need tables/charts to enter loading state without losing visual structure — composing Modal + Spinner + z-index per component is error-prone; Spin handles all of this
- `delay` for flicker prevention; spinner appearing and disappearing in 80ms draws attention to latency without providing useful information — debounced visibility is a built-in UX quality feature
- `tip` as visible contextual message; enterprise long-running operations need "Processing 1,847 records..." not "Loading..." — visible text not just an aria-label
**Notable API**: `spinning` (boolean); `delay` (ms, debounce); `tip` (ReactNode); `fullscreen`; `indicator` (custom animation); `size` (small|default|large); `wrapperClassName`
**A11y**: Wrapper pattern does not automatically apply `inert` to content behind overlay — keyboard focus can reach visually blocked elements (documented gap); no explicit role or aria-label at API level; tip is in accessibility tree but aria-live not explicitly documented.
**Best at**: Wrapper/overlay pattern with delay + tip — only system handling content overlay, flicker prevention, and contextual messages in one component. **Missing**: Weak a11y API — no enforced aria-label, no role="status", no focus management for overlay wrapper.
