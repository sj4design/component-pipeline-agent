---
component: rating
date: 2026-04-17
mode: --max
systems_count: 24
scope: all
---

# Rating — Research Synthesis (--max mode, all 24 systems)

## Sistemas sin componente dedicado

| System | Tier | Reason |
|--------|------|--------|
| Material Design 3 | 1 | Application-level pattern; teams compose from IconButton rows with star icons |
| Spectrum (Adobe) | 1 | Creative-tool focus; star ratings not applicable to Adobe's core workflows |
| Carbon (IBM) | 1 | Enterprise dashboards; satisfaction handled via custom survey patterns |
| Polaris (Shopify) | 1 | Admin-surface scope; merchant storefront ratings are theme-level not admin-level |
| Atlassian | 1 | Collaboration tools use emoji reactions and votes, not star scales |
| Twilio Paste | 2 | Communication/contact-center UI; star ratings not applicable |
| Salesforce Lightning | 2 | Pattern exists (record pages), but documented as recipe/pattern, not a shipped component API |
| GitHub Primer | 2 | "Starring" a repo is a single toggle, not a multi-level score |
| shadcn/ui | 2 | Radix lacks a Rating primitive; community implementations exist but not in the official registry |
| Playbook (eBay) | 2 | Not in component library |
| REI Cedar | 2 | Product pages display ratings but implementation is outside Cedar |
| Wise Design | 2 | Financial product UI does not require star-rating input |
| Dell Design System | 2 | Application-level implementation; not in DS public references |
| Radix UI | 3 | No rating primitive; RadioGroup can be composed but no dedicated component |
| GOV.UK | 3 | Government services use structured text surveys (radio buttons labeled "Very satisfied" etc.) not star ratings |
| Fluent 2 (Microsoft) | 3 | Microsoft Store ratings are custom solutions outside Fluent 2 |
| Gestalt (Pinterest) | 3 | Pinterest uses Save and reaction patterns, not star-based scoring |
| Orbit (Kiwi.com) | 3 | Travel search uses text-based review scores and recommendation percentages |
| Evergreen (Segment) | 3 | Analytics dashboards do not require star-rating input |
| Nord (Nordhealth) | 3 | Clinical interfaces use validated questionnaire scales, not star ratings |

**Systems with dedicated component: Ant Design (T1), Base Web/Uber (T3), Chakra UI v3 (T3), Mantine (T3)** — 4 out of 24 systems.

---

## How Systems Solve It

### Ant Design (Tier 1) — `Rate`

Ant Design's `Rate` is the most complete Tier 1 rating implementation — the only Tier 1 system to ship the component at all. It supports both interactive input and read-only display through a single component controlled by the `disabled` prop. Half-star precision is enabled with `allowHalf`. The `character` prop accepts either a fixed ReactNode or a function receiving the star index, enabling per-position custom icons (emoji faces, hearts, thumbs). A `count` prop sets the total number of symbols (default 5). The `tooltips` array provides per-star hover labels ("Terrible", "Bad", "Normal", "Good", "Wonderful"). `allowClear` (default true) lets users click an already-selected star to reset the rating to 0 — critical for optional rating fields.

**Design Decisions:**
- **`character` as function of index** — enables mixed-icon ratings where each position shows a contextually different icon. _Why:_ rating scales are not always stars — sentiment surveys use emoji faces, approval flows use thumbs, wishlist features use hearts. A uniform `icon` prop cannot handle progressive/contextual icons per position. _Impact:_ extends the component to satisfaction surveys, emoji scales, and custom brand icons without requiring a separate component. _Para tu caso:_ use `(index) => emojiArray[index]` for NPS-style survey scales.
- **`allowHalf` for half-star granularity** — simple boolean toggle rather than a generic `precision` number. _Why:_ review systems need 0.5 precision for display (4.5 stars) and some need it for input; the binary half/full model covers 90% of use cases without introducing fractional complexity. _Impact:_ adequate for standard e-commerce display; upgrade to Mantine's `fractions` if 0.1 precision is required. _Para tu caso:_ use for product review display and simple star input.
- **`allowClear` defaults to true** — clicking an already-selected star resets to 0. _Why:_ optional rating fields must allow users to retract their selection; without this, once a star is selected the field cannot be cleared. _Impact:_ prevents accidental permanent rating — critical for optional survey questions. _Para tu caso:_ set `allowClear={false}` only for required rating fields.
- **`tooltips` array for per-star hover labels** — maps each position to a human-readable label. _Why:_ star counts alone ("3 stars") are ambiguous without anchoring labels; per-star tooltips make the scale semantically explicit for both sighted users and screen readers. _Impact:_ `tooltips` feeds accessible names for radio options, turning a visual icon into a labeled choice.

**Notable Props:** `allowClear` (boolean, default true); `allowHalf` (boolean); `character` (ReactNode | (index) => ReactNode); `count` (number, default 5); `tooltips` (string[]); `disabled` (read-only); `defaultValue` / `value` / `onChange`; `onHoverChange`; `style` / `className`

**Accessibility:** Uses radio group pattern — each star is a radio input within a fieldset. Tab to focus group; Arrow keys navigate between stars. `tooltips` array provides accessible labels per star position. `aria-label` supported for the overall component. Read-only mode uses `aria-disabled`.

---

### Base Web / Uber (Tier 3) — `StarRating`

Base Web's `StarRating` is purpose-built for Uber's driver/rider rating workflow — the canonical post-trip rating use case. It is more constrained than Ant or Mantine: no half-star support, no custom icons (though the Overrides API can replace the default star SVG with any React component per star position), no fractional precision. `numItems` sets the total star count; `value` is the current rating; `readOnly` switches between interactive and display modes. The Overrides API allows per-element replacement of the star SVG — maximum flexibility at the cost of more verbose configuration. `onMouseLeave` is explicitly exposed for canceling hover preview on touch devices where hover states must be explicitly cleared.

**Design Decisions:**
- **Constrained API, flexible Overrides** — no half-star or custom icon props in the base API; Overrides handles custom rendering. _Why:_ Base Web's Overrides pattern provides total flexibility without API bloat; the base component covers Uber's primary use case while Overrides handles edge cases. _Impact:_ simple default, complex customization through a consistent mechanism. _Para tu caso:_ use Overrides only when the default star SVG doesn't match brand requirements.
- **`onMouseLeave` explicitly exposed** — cancels hover preview. _Why:_ on touch-to-hover conversion on mobile, hover states persist after touch ends; explicit `onMouseLeave` callback allows consumers to clear the preview state. _Impact:_ required for correct mobile rating behavior. _Para tu caso:_ always wire this for mobile-first surfaces.

**Notable Props:** `numItems: number`; `value: number`; `readOnly: boolean`; `onChange: ({value}) => void`; `onMouseLeave: () => void`; `overrides` (API for replacing star SVG per element)

**Accessibility:** `role="radiogroup"` on container; `role="radio"` on each star; `aria-checked` for selected state.

---

### Chakra UI v3 (Tier 3) — `Rating`

Chakra UI v3 (the Park UI-based rewrite) adds a `Rating` component built on Ark UI's rating primitive. Supports `allowHalf`, custom `icon` (filled icon prop) and `emptyIcon` (unfilled icon prop) for brand-specific star shapes, and size variants (xs through xl). Uses visually hidden radio inputs internally for a11y — the visual stars are decorative, the interaction is driven by hidden radio inputs. This is a mid-complexity implementation: more capable than Base Web, less flexible than Mantine's `fractions` and `getSymbol`. Relatively new (added in the v3 rewrite) and less battle-tested than Mantine's or Ant's implementations.

**Design Decisions:**
- **`icon` / `emptyIcon` props** — separate props for filled and unfilled star shapes. _Why:_ some brands use two different icon shapes for selected vs. unselected state (filled heart vs. outlined heart). Separate props make this explicit rather than requiring per-position custom rendering. _Impact:_ handles the common brand icon customization case cleanly.
- **Visually hidden radio inputs** — interaction driven by hidden native inputs, visual stars are decorative. _Why:_ native radio inputs provide all keyboard navigation and a11y for free; the visual treatment is completely customizable because it doesn't carry semantic responsibility. _Impact:_ correct a11y with zero ARIA management overhead.

**Notable Props:** `value`; `defaultValue`; `onChange`; `allowHalf`; `icon` (ReactNode); `emptyIcon` (ReactNode); `size: "xs" | "sm" | "md" | "lg" | "xl"`; `readOnly`; `count` (total stars); `colorScheme`

**Accessibility:** Visually hidden `role="radiogroup"` with `role="radio"` per star; Arrow keys navigate; Tab to enter/exit group.

---

### Mantine (Tier 3) — `Rating`

Mantine's `Rating` is the most flexible rating component across all 24 systems. The `fractions` prop accepts any integer denominator — `fractions={2}` for half stars, `fractions={4}` for quarter stars, `fractions={10}` for fine-grained display of aggregated review scores (e.g., 4.3 stars rendered accurately without rounding). `highlightSelectedOnly` toggles between cumulative fill (standard stars: 1 through N all highlighted) and single-item highlight (emoji scales: only the selected symbol is active). `getSymbol` function receives the index and returns a ReactNode for per-position custom icons — identical to Ant's `character` function. Sizes xs through xl. `readOnly` for display. Built-in support for Mantine Form integration.

**Design Decisions:**
- **`fractions` as arbitrary precision** — integer denominator for subdivision. _Why:_ `allowHalf` boolean covers only half-star precision; displaying aggregated scores (4.3, 4.7) requires more granular fill. `fractions={10}` renders a 4.3 rating as 43% fill on the 5th star without rounding. _Impact:_ the most accurate visual representation of fractional scores in any system — superior to Ant's binary model for display-heavy use cases. _Para tu caso:_ use `fractions={10}` when displaying aggregated review averages; use `fractions={2}` for interactive half-star input.
- **`highlightSelectedOnly` for non-star scales** — disables cumulative fill. _Why:_ emoji-face or quality-label scales ("sad/neutral/happy") are semantically wrong with cumulative fill — selecting "happy" should not also highlight "sad" and "neutral". _Impact:_ makes the component appropriate for ordinal quality scales, not just additive star scales. _Para tu caso:_ required for NPS or satisfaction emoji ratings.
- **`getSymbol` for per-position custom icons** — function receiving index returns ReactNode. _Why:_ identical to Ant Design's `character` function; progressive icon changes (face 1=sad, face 5=happy) require per-position rendering that a uniform `icon` prop cannot provide. _Impact:_ extends to satisfaction surveys, emoji scales, and sentiment indicators.

**Notable Props:** `fractions: number` (default 1 = whole stars); `highlightSelectedOnly: boolean`; `getSymbol: (value: number) => React.ReactNode`; `value`; `defaultValue`; `onChange`; `readOnly`; `count` (default 5); `size: "xs" | "sm" | "md" | "lg" | "xl"`; `color`; `emptySymbolColor`; `fullSymbolColor`

**Accessibility:** Visually hidden radio group pattern. Each star is a visually hidden radio input with appropriate aria-label. Tab to focus group; Arrow keys to navigate; Space/Enter to select.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: composite-input** — A group of selectable symbols (stars, icons) that map to a numeric value. The component spans two distinct use cases: interactive input (radio group semantics, keyboard navigable) and read-only display (image semantics, aria-label describing the value). These should be the same component controlled by a `readOnly` / `disabled` prop, not two separate components.

**Rationale:** Only 4 of 24 systems implement Rating, confirming its domain-specific nature (e-commerce, ride-sharing, review platforms). The radio group a11y pattern is unanimous across all 4 implementing systems. The `fractions` precision model (Mantine) and `character`/`getSymbol` per-position custom icons (Ant, Mantine) are the two most impactful differentiators for real-world display accuracy. Both are worth including as the component will be used for display of aggregated scores as well as interactive input.

---

### Slot Consensus Table (systems with component: 4)

| Slot | Description | Systems | Consensus |
|------|-------------|---------|-----------|
| `symbol` / `character` | Individual star/icon element | Ant, Base Web, Chakra, Mantine | 4/4 |
| `tooltip` | Per-star hover/focus label | Ant (`tooltips` array) | 1/4 |

---

### Property Consensus Table

| Property | Values Found | Systems | Consensus |
|----------|-------------|---------|-----------|
| `value` | number (0–count) | Ant, Base Web, Chakra, Mantine | 4/4 |
| `defaultValue` | number | Ant, Chakra, Mantine | 3/4 |
| `onChange` | `(value: number) => void` | Ant, Base Web, Chakra, Mantine | 4/4 |
| `count` / `numItems` | number (default 5) | Ant, Base Web, Chakra, Mantine | 4/4 |
| `readOnly` / `disabled` | boolean | Ant, Base Web, Chakra, Mantine | 4/4 |
| `size` | xs/sm/md/lg/xl | Chakra, Mantine | 2/4 |
| `allowHalf` | boolean | Ant, Chakra | 2/4 |
| `fractions` | integer denominator | Mantine | 1/4 |
| `character` / `getSymbol` / `icon` | ReactNode / function | Ant, Chakra, Mantine | 3/4 |
| `allowClear` | boolean (default true) | Ant | 1/4 |
| `tooltips` | string[] per position | Ant | 1/4 |
| `highlightSelectedOnly` | boolean | Mantine | 1/4 |
| `onHoverChange` | `(value: number) => void` | Ant | 1/4 |
| `onMouseLeave` | `() => void` | Base Web | 1/4 |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `allowHalf` | false | Ant, Chakra |
| `allowClear` | true | Ant |
| `disabled` / `readOnly` | false | All 4 |
| `highlightSelectedOnly` | false | Mantine |
| `autoFocus` | false | Ant |

---

### State Coverage Table

| State | Systems | Consensus |
|-------|---------|-----------|
| empty (no selection, value=0) | Ant, Chakra, Mantine | 3/4 |
| partial (1–N-1 stars selected) | Ant, Base Web, Chakra, Mantine | 4/4 |
| full (all stars selected) | Ant, Base Web, Chakra, Mantine | 4/4 |
| hover preview | Ant, Base Web, Chakra, Mantine | 4/4 |
| disabled / read-only | Ant, Base Web, Chakra, Mantine | 4/4 |
| half-star active | Ant, Chakra | 2/4 |
| fractional display (0.1 precision) | Mantine | 1/4 |
| error / required | — | 0/4 |

---

### Exclusion Patterns

- 20 of 24 systems do not have a Rating component — this is the component with the most uniformly absent T2 coverage (0/8 T2 systems)
- GOV.UK explicitly rejects star ratings in favor of labeled radio buttons — government accessibility research supports this
- Clinical/healthcare systems (Nord) and financial systems (Wise) exclude rating due to domain mismatch
- Enterprise workflow systems (Carbon, Atlassian) exclude rating because their product surfaces don't have review or rating use cases
- The radio group pattern as the a11y foundation is not disputed — all 4 implementing systems use it

---

### Building Block Candidates

- `RadioGroup` / `fieldset` — a11y container for interactive mode
- `Radio` (visually hidden) — semantic input per star position
- `StarIcon` (filled) / `StarOutlineIcon` (empty) — default visual symbols
- `Image role` wrapper — for read-only display mode with `aria-label`

---

### Enum / Configuration Properties

| Property | Options | Default |
|----------|---------|---------|
| `size` | `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"` | `"md"` |
| `fractions` | `1` (whole), `2` (half), `4` (quarter), `10` (fine) | `1` |
| mode | interactive (radio group), read-only (image) | interactive |

---

### A11y Consensus

| Aspect | Consensus |
|--------|-----------|
| **Role (interactive)** | `role="radiogroup"` on container; `role="radio"` per star; `aria-checked` for selected |
| **Role (read-only)** | `role="img"` with `aria-label="Rated X out of Y stars"` |
| **ARIA** | `aria-label` per star option ("1 star", "2 stars", etc.); `tooltips` labels override generic star-count labels when present |
| **Keyboard** | Tab to focus group; Arrow Left/Right to navigate; Space/Enter to select; Tab exits group |
| **Focus** | Roving tabindex — only the selected star (or first if none) is in the tab flow |
| **APG Pattern** | Radio Group (https://www.w3.org/WAI/ARIA/apg/patterns/radio/) |
| **Half-star display** | `aria-label` must announce fractional value ("4.5 out of 5 stars"), not round |
| **Error** | No system implements required/error state for rating; treat as `aria-required` on the radiogroup if mandatory |

---

## What Everyone Agrees On

1. **Radio group pattern for interactive mode** — every implementing system uses `role="radiogroup"` + `role="radio"` + `aria-checked`; this is not debated.
2. **Display-only should use `role="img"` with descriptive aria-label** — `aria-label="4.5 out of 5 stars"` is the universal pattern for read-only rating display.
3. **`character`/`getSymbol`/`icon` customization is essential** — all 3 flexible implementations allow custom icons because the rating component is used for more than just stars.
4. **`allowClear` / retract selection is needed for optional fields** — the ability to clear a selection is as important as making one; without it optional rating fields become sticky.
5. **Hover preview requires an explicit cancel mechanism** — `onHoverChange` or `onMouseLeave` must clear hover state; missing this leaves a ghost-highlighted star on touch devices.
6. **Read-only display is a first-class mode** — all systems treat disabled/readOnly as a distinct display mode, not just a disabled interactive state.
7. **Count defaults to 5** — all systems default to 5-star scales; this is the universal review convention.

---

## Where They Disagree

1. **Half-star granularity: boolean `allowHalf` vs. integer `fractions`?**
   Option A (Ant, Chakra): `allowHalf: boolean` — simple toggle; covers 95% of cases.
   Option B (Mantine): `fractions: number` — integer denominator for arbitrary precision; enables accurate display of 4.3/5 averages without rounding.

2. **Cumulative fill vs. single-item highlight as the default model?**
   Option A (all except Mantine): stars 1 through N are all filled when N is selected — the standard star rating visual.
   Option B (Mantine `highlightSelectedOnly`): only the selected star is active — required for emoji/quality scales where cumulative fill is semantically wrong.

3. **Per-position custom icons: uniform icon prop vs. function-per-index?**
   Option A (Chakra): `icon` and `emptyIcon` props — uniform replacement for all positions.
   Option B (Ant, Mantine): `character/(index) => ReactNode` / `getSymbol` — function per position; enables progressive icon changes.

4. **`allowClear` behavior: default on or off?**
   Option A (Ant, default true): click same star = reset to 0 — good for optional fields.
   Option B (implied by others with no `allowClear`): no clear behavior; once rated, the only way to change is to select a different value.

5. **Tooltip / label per star: built-in prop vs. composition?**
   Option A (Ant): `tooltips` array is a first-class prop; feeds both visual tooltip and accessible label.
   Option B (others): per-star labels must be composed manually via accessible name on each radio option.

---

## Visual Patterns Found

### Standard 5-star interactive rating

```
┌─────────────────────────────────────────────────────────────────┐
│  Rate this product                                              │
│  ★  ★  ★  ★  ☆    4 out of 5 stars                            │
│  ▲  ▲  ▲  ▲                                                    │
│  selected (filled)    unselected (outline)                      │
└─────────────────────────────────────────────────────────────────┘
```

### Half-star display (aggregate review score)

```
┌─────────────────────────────────────────────────────────────────┐
│  ★  ★  ★  ★  ½    4.5  (1,234 reviews)                        │
│  ─────────────────────────────────────────────                  │
│  └── readOnly mode, role="img", aria-label="4.5 out of 5 stars"│
└─────────────────────────────────────────────────────────────────┘
```

### Emoji satisfaction scale (highlightSelectedOnly)

```
┌─────────────────────────────────────────────────────────────────┐
│  How satisfied were you?                                        │
│  😞  😐  🙂  😊  😄                                            │
│  ○   ○   ○   ●   ○    ← only selected position highlighted     │
│  Tooltips: "Very Dissatisfied" ... "Very Satisfied"             │
└─────────────────────────────────────────────────────────────────┘
```

### Compact read-only display (product listing)

```
┌─────────────────────────────────────────────────────────────────┐
│  ★★★★½  4.5  (256)                                             │
│  └── inline, role="img", aria-label="4.5 out of 5 stars"       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

| Risk | Severity | Notes |
|------|----------|-------|
| Half-star display rounding inaccuracy | HIGH | Without `fractions` support, a 4.3/5 average rounds to 4 or 4.5 stars. For product listings with aggregated scores, this is a user-visible accuracy problem. Use Mantine's `fractions={10}` pattern for display-heavy use cases or implement custom fill width calculation. |
| Read-only mode without `role="img"` | HIGH | If read-only mode uses the same radio group semantics as interactive, screen readers will announce all 5 options and their states — creating a verbose, confusing read. Read-only mode must switch to `role="img"` with a single `aria-label` describing the value. |
| Missing `onHoverChange` / `onMouseLeave` for mobile | MEDIUM | On touch devices, hover states may persist after touch ends. Without an explicit clear-on-leave mechanism, the hover-preview star remains highlighted, creating a confusing "ghost" state. Expose `onMouseLeave` (Base Web pattern) or handle internally. |
| `allowClear` not in scope causing stuck ratings | LOW | For optional rating fields (surveys, preferences), not implementing a clear/deselect mechanism means users cannot retract an accidental tap. Default `allowClear` to true and expose as a prop. |

---

## Next Steps

1. **Decide precision model upfront** — choose between `allowHalf` (binary: whole or half) and `fractions` (arbitrary: whole, half, quarter, tenth). The Mantine `fractions` model is strictly superior but adds implementation complexity. If displaying aggregated review scores, `fractions` is required for accuracy.
2. **Implement dual-mode (`interactive` vs. `readOnly`)** — different ARIA roles required; build as two rendering paths inside one component with `readOnly` switching the a11y semantics.
3. **Add `getSymbol`/`character` for per-position custom icons** — this is the differentiator that makes the component useful for satisfaction surveys and NPS beyond standard star ratings.
4. **Wire `tooltips` / per-star labels as accessible names** — not just visual hover labels; each star option's accessible name should be the human-readable label, not just "3 stars".
5. **Consider whether to include `count` (non-5 scales)** — some use cases (Net Promoter Score 0–10, 3-star hotel rating) need non-standard counts; include `count` as a prop from the start.
