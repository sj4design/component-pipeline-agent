---
component: spinner
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Spinner — Research (--max mode)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| GOV.UK | Server-rendered page model; JavaScript async loading replaced by full-page "processing your request" patterns | Full-page status message or redirect |
| shadcn/ui | CSS-first philosophy; no dedicated spinner in core library | Lucide-react Loader2 icon + CSS `animate-spin` class; community Spinner wrappers widely available |
| REI Cedar | Skeleton loaders are the preferred pattern for content loading states | CdrSkeleton component; spinner only for explicit button/action states |

---

## How Systems Solve It

### Material Design 3

MD3 uses a unified `CircularProgressIndicator` for both spinner (indeterminate) and progress (determinate) modes, controlled by a nullable `value` prop. The absence of a value triggers indeterminate animation. A four-colour tonal cycling animation (`four-color` attribute) participates in Material You's identity system, extending the brand palette into transient loading states. No built-in overlay exists — the philosophy is that the app composes a backdrop + spinner, keeping the component semantically simple. Size is set entirely via a CSS custom property (`--md-circular-progress-size`) with no discrete S/M/L enum.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Nullable `value` unifies determinate + indeterminate | Teams can switch modes at runtime as data arrives | H | Use if you need progress bar + spinner in same component |
| No overlay built in | Keeps component scope narrow; overlay composed by app | M | You must implement backdrop + z-index yourself |
| No default aria-label | Manual addition required | H | Risk of shipping unlabeled spinners to production |
| No prefers-reduced-motion support | Animation plays regardless of user preference | H | Must add CSS override for WCAG 2.3.3 compliance |

**Notable Props**: `indeterminate` (boolean); `value` (0–1); `four-color` attribute; `--md-circular-progress-size`; `--md-circular-progress-active-indicator-color`

**Accessibility**: `role="progressbar"`; indeterminate omits aria-valuenow/min/max (correct per ARIA spec); aria-label must be set manually; aria-busy on loading target region recommended.

---

### Spectrum (Adobe)

Spectrum separates `ProgressCircle` from `ProgressBar` as distinct components because circular and linear spinners occupy different layout positions (icon slots, image wells vs. form-level progress). The `isIndeterminate` boolean is explicit rather than inferred from a missing value — a developer cannot accidentally trigger indeterminate by forgetting to pass a number. The `staticColor` prop (`white` or `black`) solves a real-world problem: Adobe creative tools routinely show UI over user photo content, making a default-colored spinner invisible against a dark photograph. Three named sizes (S/M/L) with pixel anchors.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Separate ProgressCircle from ProgressBar | Circular form fills different slots; mixing creates confusing mutually exclusive layout props | M | Evaluate if your DS has both shapes — separate components reduce confusion |
| `isIndeterminate` as explicit boolean | Code review legibility; can't accidentally trigger indeterminate | M | Explicit intent always safer in APIs |
| `staticColor` (white/black) | Contrast on image/dark backgrounds — critical for creative tool UIs | H | Essential if spinner appears over images or dark panels |
| `aria-label` TypeScript-enforced | Prevents unlabeled spinners at compile time | H | Strongest a11y enforcement in Tier 1 |

**Notable Props**: `isIndeterminate`; `staticColor` (white|black); `minValue`/`maxValue`; `aria-label` (required); `size` (S|M|L)

**Accessibility**: `role="progressbar"`; aria-valuenow/min/max absent for indeterminate; aria-label TypeScript-enforced; no aria-live on completion.

---

### Carbon (IBM)

Carbon defines three distinct loading components rather than one with a `type` prop: `Loading` (full spinner with optional overlay), `InlineLoading` (anchor-to-trigger lifecycle state machine), and a small standalone spinner. The choice reflects fundamentally different interaction contracts. The `InlineLoading` component is the most sophisticated loading lifecycle component in all researched systems — it models four states (active, inactive, finished, error) with aria-live announcements on every transition, giving screen reader users complete async feedback. `description` text serves simultaneously as visible label and accessible name.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Three distinct components (not one with `type` prop) | Each has a different interaction contract; conflating scope causes API confusion | H | Match component to context: overlay, inline, or ambient |
| InlineLoading as state machine (active→finished/error) | Inline actions always resolve; leaving users at "loading" indefinitely is bad UX | H | Gold standard for async button feedback |
| `description` as both visible label and accessible name | Single source of truth; avoids hidden ARIA-only labels | M | Visible text is always higher quality a11y than hidden aria-label |
| `withOverlay` on Loading | Page-blocking loading pattern built in | M | Evaluate if your app needs blocking overlays |

**Notable Props**: InlineLoading `status` (active|inactive|finished|error); Loading `withOverlay`; `description`; `small`; `isActive`

**Accessibility**: `aria-live="polite"` on InlineLoading transitions; success/error states announced to SR; large overlay does not enforce focus trapping (documented gap).

---

### Polaris (Shopify)

Polaris takes the most minimal approach: two sizes (20px small, 44px large) mapping exactly to two use cases (loading-in-button and loading-a-section). The `accessibilityLabel` prop solves a real cross-browser problem: SVG elements are inconsistently announced by screen readers, and Polaris uses a DOM text mechanism rather than SVG `<title>` to ensure reliable AT announcement. The `hasFocusableParent` prop is the most context-aware accessibility prop in any spinner — it suppresses the role when placed inside a `<button>` to prevent double-announcement ("Loading button button"). Polaris explicitly scopes spinners to action-triggered states; skeleton screens are mandated for initial content loads.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Only two sizes | Shopify admin has two predictable scenarios; more sizes would create inconsistency | L | Right for apps with stable, known loading contexts |
| `hasFocusableParent` | Prevents double-announcement inside buttons; correct SR behavior depends on DOM context | H | Implement if you allow spinners inside interactive elements |
| `accessibilityLabel` via DOM (not SVG title) | SVG title is unreliably announced cross-browser | H | Always use DOM mechanism for SR labels on SVG spinners |
| Spinner-vs-skeleton guidance | Prevents spinner overuse; improves perceived performance | M | Document when to use spinner vs skeleton in your DS |

**Notable Props**: `accessibilityLabel`; `hasFocusableParent`; `size` (small|large)

**Accessibility**: DOM mechanism for accessible label; hasFocusableParent suppresses role inside focusable ancestors.

---

### Atlassian

Atlassian uses a simple, prescriptive approach: three sizes, `label` required with specific guidance against generic text, and `invert` as a semantic appearance descriptor (not a color value). The critical differentiator is the label guidance itself — documentation explicitly says "Loading project settings" is correct, "Loading" is too generic. The `invert` prop signals semantic context ("you're on a dark background") rather than specifying a color value, aligning with the DS's semantic color philosophy. `role="status"` creates an implicit `aria-live="polite"` region that announces spinner presence without interrupting user interaction. Prefers-reduced-motion is supported via motion tokens.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Prescriptive label guidance against "Loading" | Enterprise SR users need to know which of many loading states they're in | H | Document specific label examples in your DS guidelines |
| `invert` as semantic context, not color | Aligns with semantic color system; describes the surface context | M | Prefer semantic props over color-value props |
| `role="status"` (implicit aria-live="polite") | Spinner presence announced politely without interruption | M | Correct for non-blocking loading |
| Prefers-reduced-motion via motion tokens | WCAG 2.1 SC 2.3.3 compliance built into token system | H | Best practice for any spinner implementation |

**Notable Props**: `label`; `appearance` (default|invert); `size` (small|medium|large); `testId`

**Accessibility**: role="status"; prefers-reduced-motion supported via motion tokens; completion not automatically announced.

---

### Ant Design

Ant Design's `Spin` is the only Tier 1 spinner with a built-in wrapper/overlay pattern — wrapping any content subtree and applying a loading overlay is a first-class use case, not an app-level composition task. The `delay` prop is the only debounced spinner visibility in Tier 1: a 200ms delay suppresses the spinner entirely for fast operations, eliminating the flash UX problem where a spinner appears and disappears in under 100ms. `tip` provides a visible contextual message beneath the spinner for long-running operations ("Processing 1,847 records..."). `fullscreen` mode covers the viewport. `indicator` slot accepts any React element for custom animations.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Wrapper/overlay as first-class pattern | Enterprise tables/charts need loading overlay without losing visual structure | H | Best model for content-blocking loading states |
| `delay` for flicker prevention | Sub-200ms operations shouldn't show spinner at all | H | Implement in all button/form loading states |
| `tip` for visible contextual message | Enterprise long operations need "Processing X records..." not "Loading..." | M | Use for operations over 3 seconds |
| No `inert` on wrapped content during loading | Keyboard focus can reach visually blocked elements | H | Critical gap — must add manually for accessibility |

**Notable Props**: `spinning`; `delay` (ms debounce); `tip` (ReactNode); `fullscreen`; `indicator` (custom); `size` (small|default|large); `wrapperClassName`

**Accessibility**: Overlay does not apply `inert` to blocked content (keyboard focus can reach hidden elements — documented gap); no enforced aria-label; tip is in accessibility tree.

---

### Tier 2 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Twilio Paste | Spinner | SVG-based; color variants; accessible label always required |
| Salesforce Lightning | Spinner | Overlay and inline variants; blocked interaction overlay for page sections |
| GitHub Primer | Spinner | SVG spinner; size variants; sr-only label required |
| shadcn/ui | — | No dedicated component; Lucide Loader2 + CSS animation |
| Playbook | Spinner | Loading feedback; dual React/Rails |
| REI Cedar | CdrSkeleton | Skeleton preferred over spinner; content-shaped loading placeholders |
| Wise Design | Spinner | Transfer processing states |
| Dell Design System | Spinner | Enterprise loading states |

---

### Tier 3 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Radix UI | Spinner (Themes) | `loading` wrapper: hides children and shows spinner; em-based sizing; Themes-only |
| Chakra UI | Spinner | CSS border animation; `emptyColor` for track; `thickness`; `speed`; default `label="Loading..."` |
| GOV.UK | — | No component; full-page processing patterns only |
| Base Web | Spinner | SVG animation; `$size`; `$color`; no built-in accessible label |
| Fluent 2 | Spinner | `labelPosition` (above/below/before/after); `appearance` (primary/inverted); 7 size options; built-in `label` |
| Gestalt | Spinner | Required `accessibilityLabel`; `show` prop for visibility animation |
| Mantine | Loader | Three types: `oval`, `bars`, `dots`; custom loader registry via MantineProvider |
| Orbit | Loading | `type` (page/inline/button); `text` for accessible message |
| Evergreen | Spinner | `delay` prop for flash prevention; minimal API |
| Nord | Spinner | Web component; `aria-label` required; healthcare clinical context |

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Feedback indicator (non-interactive)**

Spinner is a pure feedback primitive. It is never interactive, never receives focus, and exists solely to communicate ongoing processing. The correct archetype is a single-element leaf component with strong accessibility requirements (accessible name, role, prefers-reduced-motion). It should compose as an overlay wrapper when needed but ship as a standalone element by default. Do not conflate with determinate progress bars; ship separately if both are needed.

---

### Slot Consensus

| Slot | Consensus | Notes |
|------|-----------|-------|
| icon/animation | 18/18 systems | The spinning animation element itself |
| label (accessible name) | 16/18 systems | Visually hidden or visible text; required for a11y |
| tip (visible message) | 6/18 systems | Ant Design, Carbon InlineLoading, Orbit, Fluent 2, Orbit; beneath spinner |
| track | 4/18 systems | The inactive ring behind the animation (Chakra `emptyColor`, Mantine) |

---

### Property Consensus

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| size | small, medium, large | 14/18 | MD3 uses CSS var; Polaris uses 2 named sizes |
| label / accessibilityLabel | string | 13/18 | Required by Spectrum, Gestalt, Polaris, Nord; optional elsewhere |
| appearance / color / staticColor | default, invert, white, black, primary | 8/18 | Dark-background variant present in Spectrum, Atlassian, Fluent 2 |
| delay | number (ms) | 3/18 | Ant Design, Evergreen; flash prevention |
| indicator / type | ReactNode, oval, bars, dots | 4/18 | Custom animation slot |

---

### Boolean Properties

| Property | Default | Adopters |
|----------|---------|---------|
| isIndeterminate | true | Spectrum (explicit) |
| spinning | true | Ant Design |
| show | true | Gestalt |
| withOverlay | false | Carbon |
| fullscreen | false | Ant Design |
| hasFocusableParent | false | Polaris |
| four-color | false | MD3 |
| isActive | true | Carbon InlineLoading |

---

### State Coverage

| State | Adopters | Notes |
|-------|---------|-------|
| loading (indeterminate) | All 18 | Core state |
| determinate (with value) | MD3, Spectrum | Shared component with progress |
| finished | Carbon InlineLoading | Lifecycle completion |
| error | Carbon InlineLoading | Lifecycle failure |
| inactive | Carbon InlineLoading | Pre-trigger state |
| hidden (delay active) | Ant Design, Evergreen | Flash prevention |
| inverted (dark bg) | Spectrum, Atlassian, Fluent 2 | Surface adaptation |

---

### Exclusion Patterns

- Do NOT conflate Spinner with determinate ProgressBar in the same component (Spectrum's separation is the right model unless you have very specific reasons to unify them like MD3)
- Do NOT ship spinner without accessible label enforcement (TypeScript required prop or default value)
- Do NOT use spinner for initial page/content loading where skeleton is more appropriate (Cedar's guidance, Polaris's guidance)
- Spinner inside a `<button>` requires special ARIA handling (`hasFocusableParent` pattern)

---

### Building Block Candidates

- **InlineLoading** (Carbon pattern): Spinner + state machine (active/finished/error) + aria-live announcements. Build as a separate component or as a composable wrapper.
- **SpinnerOverlay**: Spinner + backdrop + optional tip text + focus trap. Needed for page-blocking states.
- **ButtonSpinner**: Small spinner variant designed for inside-button use with hasFocusableParent semantics.

---

### Enum / Configuration Properties

| Property | Values | Source |
|----------|--------|--------|
| size | `tiny`, `small`, `medium`, `large`, `huge` (Fluent 2 max); `small`, `medium`, `large` (consensus) | Multi-tier |
| appearance | `default`, `invert`, `primary`, `inverted` | Atlassian, Fluent 2, Spectrum |
| labelPosition | `above`, `below`, `before`, `after` | Fluent 2 |
| status (InlineLoading) | `active`, `inactive`, `finished`, `error` | Carbon |
| loaderType | `oval`, `bars`, `dots` | Mantine |

---

### A11y Consensus

| Topic | Consensus |
|-------|-----------|
| Role | `role="progressbar"` (most common); `role="status"` (Atlassian — implicit aria-live="polite") |
| Accessible name | `aria-label`, `aria-labelledby`, or visually-hidden text — required; never omit |
| Indeterminate | Omit aria-valuenow, aria-valuemin, aria-valuemax — correct per ARIA spec |
| aria-live | Container region aria-live="polite"; not on spinner itself |
| prefers-reduced-motion | Pause/hide animation via `@media (prefers-reduced-motion: reduce)` — WCAG 2.3.3 |
| Overlay | Apply `inert` attribute to content behind overlay — keyboard trap prevention |
| Completion | No system auto-announces completion; app manages via live region content change |
| Button context | Suppress role or add hasFocusableParent semantics when inside interactive elements |
| APG Pattern | WAI-ARIA progressbar pattern (indeterminate variant) |

---

## What Everyone Agrees On

1. **Accessible name is required** — every system with strong a11y enforces an accessible label (Spectrum TypeScript-required, Gestalt required prop, Polaris accessibilityLabel, Nord aria-label required). A spinner with no accessible name is invisible to screen reader users.
2. **role="progressbar" for indeterminate loading** — all Tier 1 systems with explicit role use progressbar; indeterminate state correctly omits aria-valuenow/min/max.
3. **Size variants needed** — small (inline/button), medium (section), large (page) is the universal consensus; exact pixel values vary but the three-tier naming holds.
4. **Spinner is not a substitute for skeleton loaders** — Cedar and Polaris both document this explicitly; skeletons are preferred for content-shaped loading; spinners for action/operation feedback.
5. **prefers-reduced-motion must be honored** — Atlassian via motion tokens is the cleanest implementation, but all systems acknowledge this is a requirement.
6. **No built-in overlay in most systems** — Ant Design is the outlier; most systems expect the app to compose overlay + spinner. If you provide an overlay API, focus management (inert on blocked content) is required.

---

## Where They Disagree

### 1. Explicit `isIndeterminate` vs. inferred from missing value
**Option A (Explicit)**: `isIndeterminate={true}` — Spectrum  
**Option B (Inferred)**: Pass no `value` — MD3

- Adopters A: Spectrum  
- Adopters B: MD3, most others  
- Upside A: Readable in code review; developer intention explicit; can't accidentally trigger by forgetting to pass value  
- Downside A: More verbose; adds prop for something that is almost always true for spinners  
- Upside B: Less API surface; natural — a progress bar without a value is by definition indeterminate  
- Downside B: Subtle bug risk if value is conditionally undefined  
- Para tu caso: If spinner and progress are separate components (recommended), no `isIndeterminate` needed at all — the entire component is implicitly indeterminate.

### 2. Built-in wrapper/overlay vs. composition
**Option A (Built-in)**: `<Spin spinning={loading}><Content /></Spin>` — Ant Design  
**Option B (Composition)**: App-level backdrop + spinner — MD3, Spectrum, Carbon, Polaris, Atlassian

- Adopters A: Ant Design  
- Adopters B: Most systems  
- Upside A: Overlay consistency guaranteed; delay and tip props apply uniformly; less boilerplate  
- Downside A: Harder to control z-index across portal-based components; wrapper affects DOM structure  
- Upside B: Spinner stays semantically simple; overlay is product concern  
- Downside B: Every team implements overlays differently creating inconsistency  
- Para tu caso: Wrapper pattern is worth building as a separate `SpinnerOverlay` component rather than embedding in the base Spinner.

### 3. `delay` prop built-in vs. consumer responsibility
**Option A (Built-in)**: `delay={200}` — Ant Design, Evergreen  
**Option B (Consumer)**: Implement with `setTimeout` or Suspense — most systems

- Adopters A: Ant Design, Evergreen  
- Adopters B: All others  
- Upside A: Flash prevention is a UX best practice; building it in ensures it's always available  
- Downside A: Adds complexity; teams may not understand why the spinner is "delayed"  
- Upside B: Simple component  
- Downside B: Teams routinely forget to add delay, leading to spinner flash on fast operations  
- Para tu caso: Ship with a `delay` prop defaulting to 0 (opt-in). Document the recommended 200ms default.

### 4. Labeled or unlabeled by default
**Option A (Labeled default)**: `label="Loading..."` as default — Chakra UI  
**Option B (Required prop)**: API error if label missing — Spectrum, Gestalt, Nord  
**Option C (Optional)**: No default, no enforcement — Base Web, Mantine, Evergreen

- Adopters A: Chakra, Orbit  
- Adopters B: Spectrum, Gestalt, Nord, Polaris  
- Adopters C: Base Web, Mantine, Evergreen, MD3, Ant Design  
- Upside A: Never ships unlabeled; generic default is acceptable  
- Upside B: Forces context-specific labels; prevents generic "Loading" everywhere  
- Upside C: Maximum flexibility  
- Downside C: Routinely results in unlabeled spinners in production  
- Para tu caso: Required prop with a TypeScript type or default of "Loading..." is the right balance.

### 5. Three-type taxonomy vs. single component
**Option A (Three types)**: Loading / InlineLoading / standalone — Carbon  
**Option B (Single with type)**: `<Spinner variant="inline|overlay" />` — most systems  
**Option C (Pure primitive)**: No overlay, no state machine — Polaris, Atlassian

- Adopters A: Carbon  
- Adopters B: Ant Design (via wrapper), Lightning  
- Adopters C: Polaris, Atlassian, Spectrum  
- Upside A: Each component has focused, correct interaction contract  
- Upside C: Cleaner API; composition over configuration  
- Downside A: Three import paths; developers must know which to use  
- Para tu caso: Carbon's split is the most architecturally correct; evaluate whether your app needs the InlineLoading state machine as a pattern.

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Standalone spinner | Single spinning element, centered in container | Section loading, general feedback | All systems |
| Button spinner | Small spinner inside button, replaces or precedes label | Form submit, async actions | Polaris, Carbon, Atlassian |
| Overlay spinner | Spinner + backdrop covering content | Blocking operations, table reload | Ant Design, Lightning, Carbon |
| Inline loading (state machine) | Spinner that transitions to checkmark or error icon | Async button feedback | Carbon InlineLoading |
| Fullscreen spinner | Spinner covering entire viewport | App-level route transitions | Ant Design, Lightning |
| Spinner with tip text | Spinner + contextual message beneath | Long operations (>3s) | Ant Design, Carbon, Orbit, Fluent 2 |
| Delayed spinner | Spinner suppressed for N ms to prevent flash | Button loading on fast connections | Ant Design, Evergreen |

### ASCII Wireframes

**Standalone Spinner (centered in section)**
```
┌─────────────────────────────────┐
│                                 │
│         ◌  ─── Loading ───      │
│            ┌──────────┐         │
│            │   ◯      │         │
│            │  ╱ ╲     │         │
│            │ ╱   ╲    │         │
│            └──────────┘         │
│                                 │
└─────────────────────────────────┘
```

**Button Spinner**
```
┌───────────────────────────────┐
│  ┌──────────────────────────┐ │
│  │  ◯  Saving changes...    │ │
│  └──────────────────────────┘ │
└───────────────────────────────┘
```
(◯ = small spinner, ~16px)

**Overlay Spinner (Ant Design pattern)**
```
┌────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← backdrop
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░┌───────────┐░░░░░░░░░ │
│ ░░░░░░░│    ◯      │░░░░░░░░░ │  ← spinner container
│ ░░░░░░░│ Loading...│░░░░░░░░░ │
│ ░░░░░░░└───────────┘░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────┘
```

**InlineLoading State Machine (Carbon)**
```
Idle:     [  Submit  ]
Loading:  [ ◯  Saving changes...  ]
Success:  [ ✓  Changes saved      ]
Error:    [ ✕  Save failed        ]
```

**Fluent 2 labelPosition variants**
```
above:   Loading...     before: Loading... ◯     after: ◯ Loading...
            ◯

below:      ◯
         Loading...
```

---

## Risks to Consider

### 1. Unlabeled spinners in production — HIGH
SVG-based spinners with no accessible name are invisible to screen reader users — the single most common spinner accessibility failure in production. Most systems leave label as optional (Base Web, Mantine, Evergreen, MD3, Ant Design) which routinely results in unlabeled spinners shipping. Without enforcement (TypeScript required prop or runtime warning), teams forget.

**Mitigation**: Make `label` / `accessibilityLabel` a required prop in TypeScript. Provide a default value of "Loading..." as a fallback but document that context-specific labels are required. Add a runtime console.warn if no label is detected.

### 2. Spinner flash on fast operations — HIGH
When an async operation completes in under 200ms, showing and immediately hiding a spinner creates a disorienting visual flash that draws attention without providing useful information. Only Ant Design and Evergreen solve this at the component level. All other systems require teams to implement delay logic themselves — and routinely forget.

**Mitigation**: Build a `delay` prop with a documented recommended value of 200ms. Gate the spinner's CSS transition on the delay timer. Consider defaulting to 200ms (opt-out) rather than 0ms (opt-in) to prevent the flash by default.

### 3. Focus leaking behind loading overlays — HIGH
Ant Design's wrapper/overlay pattern does not apply `inert` to the content behind the overlay, meaning keyboard users can tab to elements that are visually hidden. This is a serious accessibility failure. The `inert` HTML attribute (now widely supported) or `aria-hidden="true"` + `tabindex="-1"` on all blocked elements prevents this — but it requires explicit implementation.

**Mitigation**: Any overlay pattern must apply `inert` to the wrapped content during loading. Test with keyboard-only navigation to verify focus cannot reach blocked elements.

### 4. Spinner vs. skeleton guidance absent from most systems — MEDIUM
Cedar and Polaris both document when to use a spinner vs. skeleton loader, but most systems do not. This absence leads to spinner overuse (showing spinners for content-shaped loading where skeletons would reduce perceived latency) and inconsistent patterns across products.

**Mitigation**: Document the decision rule in your design system: spinner for actions and operations (submit, save, process), skeleton for content loading (pages, cards, lists, tables).

---

## Next Steps

1. **Decide on architecture**: Spinner (standalone primitive) + InlineLoading (state machine) + SpinnerOverlay (wrapper) as separate exports vs. a single Spinner with all modes. Carbon's three-type separation is cleaner but requires three import paths.
2. **Enforce accessible labels**: Implement TypeScript required prop or provide a default. Copy Spectrum's approach of making `aria-label` required at the type level.
3. **Add `delay` prop**: Default to 0 (backward compatible); document 200ms as recommended value. Consider defaulting to 200ms.
4. **Implement prefers-reduced-motion**: Add CSS via motion tokens or direct media query to pause/hide animation per WCAG 2.3.3.
5. **Build overlay variant separately**: Design SpinnerOverlay as a distinct component with `inert` focus management — do not add overlay behavior to the base Spinner.
6. **Provide spinner vs. skeleton decision documentation** alongside the component.
