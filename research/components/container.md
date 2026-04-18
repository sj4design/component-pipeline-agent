---
component: container
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Container — Research Document (--max)

## Meta

| Field | Value |
|-------|-------|
| Date | 2026-04-17 |
| Mode | --max (all systems, all patterns) |
| Systems surveyed | 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3) |
| Scope | All container patterns, layout approaches, responsive width strategies |

---

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|-----------|
| Material Design 3 | Mobile-first grid system; max-width comes from column count × margins | `Scaffold(contentPadding)` + grid tokens; fixed margins per breakpoint (16dp/24dp) |
| Spectrum (Adobe) | Application UIs rarely need centered max-width containers; Provider wraps app context | `<Flex>` + `<Grid>` for layout; no max-width abstraction |
| Polaris (Shopify) | `Page` component handles admin containment; no generic container needed | `<Page narrowWidth>` for forms; `<Box maxWidth paddingInline>` as escape hatch |
| Atlassian | Box + xcss with token-constrained max-width | `<Box xcss={containerStyles}>` with `maxWidth`, `marginInline: 'auto'` |
| Ant Design | Full-width enterprise pattern; fluid layouts are the default | `<Layout.Content>`; `<Flex>` + manual `maxWidth` style; Row/Col 24-column grid |
| Twilio Paste | Box with `maxWidth`, `margin="auto"`, padding props | No abstraction; documented layout patterns |
| GitHub Primer | CSS utility classes only (`.container-sm/md/lg/xl`) | Applied via `sx` prop on Box; not a React component |
| shadcn/ui | Defers to Tailwind's `container` class | `max-w-*` + `mx-auto` + `px-*` utilities; convention over component |
| Playbook | Layout / Flex kit | No dedicated Container; Flex kit handles centering and padding |
| Base Web | Block component with manual overrides | `<Block maxWidth margin padding>` — generic layout primitive |
| Fluent 2 | No Container in Fluent UI React | `makeStyles` utility with Fluent tokens for custom container styling |
| Orbit | No Container component | Stack, Grid, custom CSS; booking flows are full-width |
| Evergreen | Pane component as generic box | `<Pane maxWidth marginX="auto">` for manual containment |

---

## How Systems Solve It

### Carbon (IBM)

Carbon provides Grid as the primary content container — the de facto Container in the IBM design system. Grid applies max-width constraints at five breakpoints (sm=320px, md=672px, lg=1056px, xl=1312px, max=1584px), centers content with auto margins, and applies horizontal gutters. The `FlexGrid` is the modern API replacing `CSSGrid`. The `fullWidth` prop removes max-width for fluid dashboard layouts. Gutter modes (`condensed`=1px, `narrow`=16px, default=32px) serve different content densities. No separate Container component is needed because Grid already handles containment, centering, and gutter management simultaneously.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Grid = Container (5 breakpoints with fixed max-widths) | Integrated approach: containment + column structure in one component | H | Most complete breakpoint coverage; reference for multi-breakpoint container systems |
| `fullWidth` prop for fluid layouts | Admin dashboards need edge-to-edge layouts; Grid shouldn't force max-width | H | Essential for dashboard vs. content page distinction |
| Three gutter modes (condensed/narrow/default) | Data density requirements differ: 1px for dense tables, 32px for editorial | M | Match gutter to content type, not to container width |
| 16px default column gutter | Consistent horizontal rhythm without a Container primitive | M | Canonical gutter value validated across IBM product suite |

**Notable Props:** `<Grid fullWidth condensed narrow>`; `<Column>` children; `<FlexGrid>` modern API

**Accessibility:** Grid renders as `<div>` — teams must add landmark roles (`role="main"`) at the page level. No implicit ARIA from the Grid component.

---

### Polaris (Shopify)

Polaris handles containment through the `Page` component, which provides max-width (default 1440px), horizontal padding, and vertical spacing with built-in title and action slots. The `narrowWidth` prop constrains Page to 998px for focused flows like settings and forms — two discrete width modes reflecting Shopify admin's two primary layout categories. `Box` with `maxWidth` and `paddingInline` props functions as an escape hatch for ad-hoc containment without page-level semantics.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Page as primary container (semantics-coupled) | Shopify admin is always in a Page context; containment and page structure are inseparable | H | Lessons: coupling page-level structure to containment makes the API more opinionated but less reusable |
| Two-mode width (1440px vs. 998px `narrowWidth`) | Shopify's two use cases: full admin pages vs. focused settings forms | M | Two named modes (wide/narrow) are more intentional than an arbitrary pixel scale |
| Box as composable escape hatch | When Page semantics don't apply, Box provides manual containment | M | Every container system needs a lower-level escape hatch |

**Notable Props:** `<Page narrowWidth>`; `<Layout>` with `<Layout.Section>`; `<Box maxWidth paddingInline>`

**Accessibility:** Page renders landmark structure with `<main>` and title as `<h1>`. Layout sections use semantic grouping.

---

### REI Cedar (CdrContainer)

CdrContainer is the only Tier 2 system with a dedicated, first-class Container component. It applies responsive max-width and horizontal padding consistently across REI's e-commerce platform — ensuring marketing pages and product pages share identical containment behavior. Cedar validates that a simple Container component (responsive width + centering + padding) is a viable first-class primitive worth extracting.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Dedicated CdrContainer component | E-commerce: consistent page width across marketing, product, and account contexts | H | First-class Container component is justified when cross-page consistency is critical |
| Responsive max-width + horizontal padding | Single component handles all viewport widths | M | Combine width constraint and padding into one abstraction |

**Notable Props:** Responsive max-width per breakpoint; horizontal padding; centering via auto margins

**Accessibility:** Renders as `<div>` — no ARIA semantics. Landmark elements are the responsibility of contained content.

---

### Radix Themes

Radix Themes provides Container with four size variants mapped to discrete max-widths: size 1 = 448px, size 2 = 688px, size 3 = 880px, size 4 = 1136px. The responsive `display` prop adapts container behavior at different viewports. Crucially, Container derives its horizontal padding from a parent `Section` component — Section controls vertical spacing and horizontal padding, while Container controls only max-width. This separation of concerns is unique in the full 24-system survey.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| 4 numeric size variants (448/688/880/1136px) | Named sizes don't carry semantic meaning for width; numbers are more honest | M | Numeric scale avoids T-shirt size ambiguity |
| Padding from parent Section, not from Container | Clean separation: Container = width constraint only; Section = spacing wrapper | H | Unique architectural decision — worth modeling for composable layout systems |
| Responsive `display` prop | Container can be hidden or reflow at different breakpoints | M | Needed for complex responsive layouts |

**Notable Props:** `size` (1|2|3|4); `display` (responsive); no padding prop (inherited from Section)

**Accessibility:** Presentational `<div>` by default; polymorphic `as` prop available. No ARIA semantics required for containment.

---

### Chakra UI

Chakra provides a dedicated Container component with `maxW` accepting T-shirt sizes (sm/md/lg/xl) or arbitrary CSS values. The `centerContent` boolean adds flexbox centering for the Container's direct children. The `as` polymorphic prop enables rendering as semantic elements. Horizontal padding applies from the theme's `padding` default. Chakra's Container is the most flexible in Tier 3 — arbitrary `maxW` values allow brand-specific widths without theme configuration.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Arbitrary `maxW` values | Brand-specific max-widths (e.g., 1200px) don't map to standard T-shirt sizes | M | Always support both named sizes and custom values |
| `centerContent` boolean | Children flexbox-centered within Container without separate wrapper | M | Convenience prop for single-column content layouts |
| Polymorphic `as` prop | `<Container as="section" aria-label="...">` adds semantics when needed | M | Critical for accessibility compliance without extra wrapper divs |

**Notable Props:** `maxW` (sm|md|lg|xl|custom); `centerContent`; `as`; default horizontal padding from theme

**Accessibility:** Renders as `<div>` by default; `as` prop for semantic elements; max-width directly supports WCAG 1.4.8 line length.

---

### Mantine

Mantine provides the most feature-complete Container in the entire 24-system survey. Five named sizes with theme-level max-width customization: xs=540px, sm=720px, md=960px, lg=1140px, xl=1320px. The `fluid` boolean removes max-width entirely. A custom pixel value can override named sizes. Responsive `sizes` customization at the theme level allows brand-specific size scales. The `px` prop ties horizontal padding to theme spacing tokens.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| 5 named sizes (xs-xl) with theme customization | Teams can override the entire scale once at the theme level rather than per-instance | H | Theme-level size customization is the right architecture for multi-page consistency |
| `fluid` boolean | Edge-to-edge layouts without abandoning the Container component | M | `fluid` as a prop preserves semantics while removing width constraint |
| Custom pixel value override | Brand-specific widths (e.g., 1400px) that don't fit the standard scale | M | Escape hatch within the component API |
| `px` prop tied to theme spacing | Horizontal padding from design tokens, not hardcoded values | H | Ensures padding changes propagate from theme, not from component instances |

**Notable Props:** `size` (xs|sm|md|lg|xl|custom pixel); `fluid`; `px` (theme spacing token)

**Accessibility:** Presentational component; max-width enforces WCAG 1.4.8 line length guidance; no ARIA required.

---

### Gestalt (Pinterest)

Gestalt provides an intentionally single-width Container: 800px maximum, no size variants. Pinterest's design philosophy holds that if you need a different width, use Box with explicit maxWidth rather than extending the Container concept. 800px keeps body text within comfortable reading line lengths (~75 characters at 16px). The deliberate absence of variants is a product-philosophy decision, not a gap.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Single fixed width (800px) | Pinterest decided reading comfort is more important than layout flexibility | M | Single-width container forces consistent content density |
| No size variants — intentional | If you need a different width, use Box. Container means "reading content width." | H | Strong argument for keeping Container semantically narrow |

**Accessibility:** Enforces comfortable line lengths (~75 chars) at 800px — directly supports WCAG 1.4.8.

---

### GOV.UK

GOV.UK uses a single CSS class (`govuk-width-container`) applying `max-width: 960px` + `margin: 0 auto` inside `govuk-main-wrapper`. A single width for all government services enforces institutional consistency. No variants exist — the deliberate absence ensures no team can create a wider or narrower layout that breaks the uniform government experience. This is the most accessibility-conscious approach in the 24-system survey.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Single fixed width (960px) | Every government service has the same width — no per-service decisions | H | Institutional systems benefit from enforced consistency over flexibility |
| CSS class only (not a component) | Government tech stack diversity; CSS class works in any framework | M | CSS utility approach works when framework diversity is a constraint |

**Accessibility:** 960px ensures comfortable reading width across all government services; no teams can choose a wider width that creates reading problems.

---

### Lightning Design System (Salesforce)

Lightning provides `slds-container` CSS utility classes with four named size variants: small=480px, medium=768px, large=1024px, x-large=1280px, plus `slds-container--center` for horizontal centering. CSS utility approach (not a component) provides flexibility for Lightning's multi-framework environment (Aura, LWC, Classic Visualforce).

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Semantic size names (small/medium/large/x-large) | Salesforce product teams choose container width based on content type semantics | M | Semantic names are more intentional than T-shirt sizes |
| CSS utility approach | Framework agnostic — works in Aura, LWC, Visualforce, external apps | M | CSS utility is the right architecture for multi-framework design systems |

---

### Nord (Nordhealth)

Nord provides a `nord-layout` component as the page-level container with `max-inline-size` CSS property and a `padding` attribute for horizontal gutters. Used as the outermost wrapper in Nordhealth's clinical application UI. Uses `max-inline-size` (logical CSS property) rather than `max-width` — the correct approach for internationalization and RTL layout support.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| `max-inline-size` instead of `max-width` | Logical CSS properties support RTL languages correctly | M | Use `max-inline-size` for international products |

---

## Pipeline Hints

### Archetype Recommendation

**Primary Archetype: Responsive max-width container with named size scale**

Rationale: 11 of 24 systems that provide Container use a named size scale (Chakra, Mantine, Radix, Lightning, Primer, Carbon, Polaris). The Mantine approach (xs/sm/md/lg/xl + fluid + theme customization) is the most complete. The Gestalt / GOV.UK single-width approach is the most opinionated and appropriate for institutional/single-audience systems. The Carbon Grid-as-Container approach is the right architecture when column-based layouts are also needed. For a general-purpose design system, Mantine's architecture with theme-level size customization is the reference.

---

### Slot Consensus Table

| Slot | N / systems-with-component | Notes |
|------|---------------------------|-------|
| children | 11/11 | Universal — Container wraps any content |
| No dedicated slots | — | Container is a layout primitive; no named slots |

*Container has no internal slot structure — it is a pure layout wrapper.*

---

### Property Consensus Table

| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| `size` | xs/sm/md/lg/xl (Mantine); sm/md/lg/xl (Chakra); 1/2/3/4 (Radix); small/medium/large/x-large (Lightning) | 6/11 | Named size scale; maps to discrete max-width values |
| `maxW` / `maxWidth` | T-shirt sizes or arbitrary CSS value | Chakra, Polaris Box, Twilio Paste, Atlassian Box | Flexible max-width override |
| `fluid` | boolean | Mantine, Carbon (fullWidth) | Removes max-width constraint for edge-to-edge |
| `padding` / `px` | theme spacing tokens | Mantine, Nord, Cedar, Carbon (gutter modes) | Horizontal gutter from token scale |
| `centerContent` | boolean | Chakra | Flexbox-centers Container's direct children |
| `as` | HTML element string | Chakra, Radix | Polymorphic element for semantic HTML |
| `narrowWidth` | boolean | Polaris Page | Constrain to narrower fixed width |
| `condensed` | boolean | Carbon Grid | 1px column gutter for dense data UIs |
| `narrow` | boolean | Carbon Grid | 16px column gutter for medium density |

---

### Boolean Properties Table

| Property | Default | Notes |
|----------|---------|-------|
| `fluid` | false | Removes max-width |
| `centerContent` | false | Chakra flex-centering convenience |
| `narrowWidth` | false | Polaris narrow page mode |
| `fullWidth` | false | Carbon fluid grid equivalent |
| `condensed` | false | Carbon 1px gutter |
| `narrow` | false | Carbon 16px gutter |

---

### State Coverage Table

Container is a layout primitive — it has no interactive states.

| State | Notes |
|-------|-------|
| default | Max-width applied, content centered |
| fluid | Max-width removed; full viewport width |
| narrow | Secondary smaller max-width (Polaris, Carbon) |
| custom | Arbitrary pixel max-width override |

---

### Exclusion Patterns

- **Container is not a card or panel** — Container does not have background, border, or shadow. Those belong to Box/Card/Panel. Don't conflate containment (width control) with surface (visual treatment).
- **Container does not imply semantic landmark** — Container renders as a `<div>`; landmark semantics (`<main>`, `<section>`) must be applied by content or via `as` prop.
- **Don't add padding to Container when it's inside a Grid** — Carbon's gutter model provides horizontal padding at the Grid level; adding Container padding inside Grid creates double-padding.
- **Don't use Container for modal/dialog width** — Dialog has its own width control. Container is for page-level content area.
- **Avoid arbitrary px max-widths without theme documentation** — teams will diverge if Container accepts any value. Prefer named size scale with escape hatch.

---

### Building Block Candidates

| Candidate | Used by | Notes |
|-----------|---------|-------|
| Section | Radix Themes | Parent of Container; provides vertical spacing + horizontal padding |
| Box | Chakra, Polaris, Atlassian, Twilio | Lower-level primitive when Container is too opinionated |
| Page | Polaris | Container + page-level structure (title, actions, breadcrumb) |
| Grid | Carbon, M3, Spectrum | Column layout with built-in max-width and gutter |
| Stack | Orbit, Playbook | Vertical layout within Container |

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `size` (Mantine) | xs \| sm \| md \| lg \| xl \| {number}px |
| `size` (Radix Themes) | 1 \| 2 \| 3 \| 4 |
| `maxW` (Chakra) | sm \| md \| lg \| xl \| 2xl \| container.sm/md/lg/xl \| any CSS value |
| `slds-container--*` (Lightning) | small \| medium \| large \| x-large |
| `.container-*` (Primer) | sm \| md \| lg \| xl |
| `gutter` (Carbon) | condensed \| narrow \| default |

---

### A11y Consensus

| Aspect | Consensus | Notes |
|--------|-----------|-------|
| Role | No ARIA role required | Container is presentational |
| Element | Renders as `<div>` | Polymorphic `as` prop available in Chakra, Radix |
| Landmark | Content within Container should use landmark elements | `<main>`, `<article>`, `<section aria-label>` |
| Line length | Max-width should target 960-1136px for comfortable reading | WCAG 1.4.8: ≤80 characters per line at body font size |
| Fluid containers | Fluid mode can create accessibility issues if text line length is not separately controlled | Gestalt's 800px / GOV.UK's 960px are the most accessibility-conscious |
| RTL | Use `max-inline-size` and `margin-inline: auto` (logical CSS) for RTL support | Nord's approach; critical for international products |
| No interaction | Container has no keyboard or focus behavior — all interaction is in contained content | No tabIndex, no role="button", no ARIA state |
| APG pattern | Not applicable — no APG pattern for layout primitives | Container is structural, not interactive |

---

## What Everyone Agrees On

1. **Container is a presentational layout primitive** — it has no ARIA role, no interactive states, no keyboard behavior. Its entire purpose is constraining content width and centering it horizontally. All 11 systems that provide Container agree on this.

2. **Max-width + auto margins = the Container contract** — regardless of whether implemented as a component (Mantine, Chakra, Gestalt), CSS utility (GOV.UK, Primer, Lightning), or Box composition (Atlassian, Twilio), all systems converge on `max-width: [value]; margin-left: auto; margin-right: auto` as the core behavior.

3. **Horizontal padding belongs with Container** — the Container should apply horizontal padding (gutters) as well as max-width. Systems that only constrain width and leave padding to children create inconsistent gutters. Mantine (`px`), Cedar, Carbon (gutter modes), and Nord (`padding` attribute) all include padding.

4. **A `fluid` / full-width escape hatch is necessary** — dashboard and full-bleed layouts need to opt out of max-width without abandoning the Container API. Every system with a Container provides this (Mantine's `fluid`, Carbon's `fullWidth`, Polaris's Page without narrowWidth).

5. **Container should not have visual treatment** (background, border, shadow). Those properties belong on Box/Card/Panel. Container is a "ghost" wrapper — invisible except for its width constraint.

6. **Theme-level size customization matters** — Mantine validates that teams need to override the size scale once at the theme level, not per-instance. Hard-coded pixel values in component defaults create inflexibility for brand-specific widths.

7. **960-1136px is the practical sweet spot for content containers** — GOV.UK (960px), Mantine md (960px), Carbon lg (1056px), Radix size 3 (880px), Gestalt (800px). This range keeps body text within WCAG-compliant line lengths while fitting most monitor widths.

---

## Where They Disagree

### 1. Component vs. CSS utility vs. Box composition

**Option A: Dedicated Container component** — Mantine, Chakra, Gestalt, Radix Themes, Cedar, Nord
**Option B: CSS utility classes** — GOV.UK, Primer, Lightning, shadcn/ui (Tailwind)
**Option C: Compose from Box** — Atlassian, Twilio Paste, Evergreen, Base Web

- Upside A: Discoverable; enforces consistent defaults; works with component-based design systems; TypeScript props
- Downside A: Less flexible; overkill for simple centering; may conflict with Grid-based layouts
- Upside B: Framework-agnostic; works in any HTML context; low overhead; easy to override
- Downside B: No discoverability; no TypeScript; teams use inconsistent values; hard to update globally
- Upside C: Maximum composability; no new component to learn; Box primitives are universal
- Downside C: Teams repeatedly write the same composition; inconsistency emerges; no shared defaults
- Para tu caso: Component (Option A) if you have a component-based DS. CSS utility (B) if your stack is Tailwind. Avoid Option C as default — it guarantees inconsistency.

---

### 2. Named size scale vs. single fixed width vs. arbitrary values

**Option A: Named scale** — Mantine (xs-xl), Chakra (sm-xl), Radix (1-4), Lightning (small-x-large)
**Option B: Single fixed width** — Gestalt (800px), GOV.UK (960px)
**Option C: Arbitrary CSS values** — Chakra `maxW`, Polaris Box, Atlassian Box

- Adopters of A: Mantine, Chakra, Radix, Lightning, Primer, Carbon
- Adopters of B: Gestalt, GOV.UK
- Adopters of C: All Box-composition systems
- Upside A: Discoverability; consistent scale; upgrade-friendly (change theme, not instances)
- Downside A: Teams debate which size to use; xL vs. 2xl confusion
- Upside B: No decisions required; all pages consistent; most accessibility-compliant
- Downside B: Inflexible; marketers and PMs will request wider layouts; no escape hatch
- Upside C: Exact brand widths; no mapping required
- Downside C: Inconsistency; teams set different values; no theme-level control
- Para tu caso: Named scale with theme-level customization (Option A + Mantine pattern). Enforce a "no arbitrary values" lint rule.

---

### 3. Fluid/edge-to-edge as a Container prop vs. separate component

**Option A: `fluid` boolean on Container** — Mantine, Carbon (`fullWidth`)
**Option B: Separate full-width wrapper (no Container)** — Most systems without `fluid`

- Upside A: Single component for all widths; clear API contract
- Downside A: "Fluid container" is arguably an oxymoron; adds a state to a structural component
- Para tu caso: Use Option A; `fluid` as a boolean is pragmatic and widely understood.

---

### 4. Padding as Container responsibility vs. child responsibility

**Option A: Container includes horizontal padding** — Mantine, Cedar, Nord, Carbon (gutters)
**Option B: Container handles width only; children own padding** — Radix Themes Container (padding from Section parent), Gestalt

- Upside A: One component handles both constraints; more predictable gutters
- Downside A: Padding may conflict with nested Containers or Grid columns
- Upside B: Clean separation of concerns; Radix Section + Container is more composable
- Downside B: Teams forget to add padding; inconsistent gutters across pages
- Para tu caso: Include padding in Container by default (Option A). Radix's Section + Container split is elegant but requires teams to always use both, which adds cognitive overhead.

---

### 5. Landmark semantics on Container vs. separate wrapper

**Option A: Container renders as `<div>` only** — Mantine, Gestalt, GOV.UK, Carbon
**Option B: Polymorphic `as` prop** — Chakra, Radix Themes

- Adopters of A: Most systems; Container is purely presentational
- Adopters of B: Chakra (`<Container as="main">`), Radix Themes
- Upside A: Simple; Container is not a landmark
- Downside A: Extra wrapper div for semantic HTML
- Upside B: Eliminates extra wrapper div; `<Container as="section" aria-label>` is clean
- Para tu caso: Add `as` prop (Option B). The extra flexibility is low cost; the semantic HTML benefit is high.

---

### 6. Container within Grid vs. standalone Container

**Option A: Grid is the Container (grid + width + gutter)** — Carbon, M3
**Option B: Container is standalone, separate from Grid** — All other component systems

- Adopters of A: Carbon (Grid handles max-width, centering, gutters); M3 (Scaffold + grid tokens)
- Adopters of B: Mantine, Chakra, Radix, Cedar
- Upside A: Fewer components; grid automatically handles all containment
- Downside A: Cannot constrain content width without using grid column structure; awkward for simple full-width sections with centered content
- Para tu caso: Standalone Container (Option B) unless your entire UI is grid-structured.

---

## Visual Patterns Found

| Pattern | Description | Systems |
|---------|-------------|---------|
| Centered max-width container | Core pattern: max-width + auto margins + horizontal padding | All systems with Container |
| Nested containers | Wider outer container + narrower inner container for article content | Radix (Section + Container), Chakra |
| Grid-as-container | Column grid provides max-width, centering, and gutters | Carbon, M3 |
| Page-as-container | Top-level page component provides containment | Polaris, some enterprise systems |
| Two-width mode | Wide (default) + Narrow (form/article) | Polaris (narrowWidth), Carbon (narrow), Lightning (multiple sizes) |
| Fluid container | Full viewport width for dashboards and media | Mantine (fluid), Carbon (fullWidth) |
| CSS utility container | Class-based; no component overhead | GOV.UK, Primer, Lightning, shadcn/ui |

```
STANDARD CENTERED CONTAINER
┌────────────────────────────────────────────────────────────────┐  ← Viewport
│ │←  margin  →│←────────── max-width (e.g. 1140px) ──────────→│ │
│              │  [px]  ←──── content area ────→  [px]          │
│              │         ┌────────────────────┐                  │
│              │         │   Page content     │                  │
│              │         └────────────────────┘                  │
│              │                                                  │
└────────────────────────────────────────────────────────────────┘

SIZE SCALE COMPARISON
xs    sm    md    lg    xl
540   720   960  1140  1320  ← Mantine (px)
448   688   880  1136        ← Radix Themes size 1-4
      768  1024  1280        ← Lightning small/medium/large/x-large
      544   768  1012  1280  ← Primer container-sm/md/lg/xl
                  960        ← GOV.UK (single fixed)
                  800        ← Gestalt (single fixed)

TWO-COLUMN LAYOUT WITHIN CONTAINER
┌────────────────────────────────────────────────┐  ← Container (max-width)
│  ┌──────────────────┐  ┌────────────────────┐  │
│  │                  │  │                    │  │
│  │  Main Content    │  │  Sidebar           │  │
│  │  (2/3 width)     │  │  (1/3 width)       │  │
│  │                  │  │                    │  │
│  └──────────────────┘  └────────────────────┘  │
└────────────────────────────────────────────────┘

NARROW CONTAINER FOR READING CONTENT
┌────────────────────────────────────────────────┐
│           │←── 800-960px (reading width) ──→│  │
│           │  ┌──────────────────────────┐   │  │
│           │  │  Article / Form Content  │   │  │
│           │  │  ~60-75 chars per line   │   │  │
│           │  └──────────────────────────┘   │  │
└────────────────────────────────────────────────┘

GRID-AS-CONTAINER (Carbon pattern)
┌────────────────────────────────────────────────┐
│  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐  │  ← Grid (max-width + columns)
│  │ col │ col │ col │ col │ col │ col │ col │  │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘  │
└────────────────────────────────────────────────┘

RADIX SECTION + CONTAINER COMPOSITION
┌────────────────────────────────────────────────┐  ← Section (vertical padding + horizontal padding)
│  ┌────────────────────────────────────┐        │
│  │  Container (max-width only)        │        │  ← Container nested in Section
│  │  content...                        │        │
│  └────────────────────────────────────┘        │
└────────────────────────────────────────────────┘
```

---

## Risks to Consider

### HIGH — Conflating Container with Box/Card/Panel

**Risk:** Adding visual properties (background, border-radius, shadow) to Container turns it into a Card/Panel. Teams start using Container for visual surfacing, creating a bloated component. Carbon's "Grid = Container" approach shows the risk: teams who need a simple max-width wrapper without column structure must awkwardly override column behavior.

**Mitigation:** Keep Container strictly structural. Document explicitly: "Container controls width and centering only. For visual surfaces, use Card or Box." If you need a card-like container, create a separate Card component.

---

### HIGH — No theme-level size customization leads to per-instance divergence

**Risk:** If Container's max-width values are hardcoded in the component (not in the theme/tokens), teams will override them per-instance: `<Container style={{ maxWidth: 1200 }}>`. After 6 months, 15 different max-width values exist in the codebase and no design audit can find them all.

**Mitigation:** Store Container size scale in design tokens or theme configuration (Mantine's approach). Make per-instance max-width overrides possible but discouraged (require an `unsafeMaxWidth` prop, not the standard API).

---

### MEDIUM — Fluid container breaks line length accessibility

**Risk:** Mantine's `fluid` boolean and Chakra's unconstrained `maxW="100%"` can create lines of 200+ characters on wide monitors, violating WCAG 1.4.8 (Visual Presentation: line length ≤80 characters). Text-heavy content in fluid containers is an accessibility failure.

**Mitigation:** Document that `fluid` mode is for non-text content (data grids, maps, media). For text-heavy content, enforce a readable max-width. Consider a `maxLineWidth` or `clampText` prop that applies a narrower constraint to text content within a fluid container.

---

### MEDIUM — Container inside Grid creates double-padding

**Risk:** Using Container inside Carbon's Grid (which already applies gutters) creates double horizontal padding. The inner Container's padding is additive to the Grid's gutter, producing inconsistent content alignment.

**Mitigation:** Document that Container and Grid are mutually exclusive at the same level. If using Grid for column structure, do not wrap Grid columns in Container. If using Container for simple max-width, do not also use a column Grid inside it without resetting padding.

---

### LOW — RTL layout breakage with `max-width` + `margin: auto`

**Risk:** Using `max-width` + `margin-left: auto; margin-right: auto` works for LTR, but bidirectional layouts should use `max-inline-size` + `margin-inline: auto` (CSS logical properties). Physical margin properties can behave unexpectedly in writing-mode changes.

**Mitigation:** Implement Container using CSS logical properties (`max-inline-size`, `margin-inline: auto`, `padding-inline`) from the start (Nord's approach). This is a low-cost change that future-proofs for RTL without behavioral changes in LTR.

---

## Next Steps

1. **Decide architecture** — dedicated Container component (recommended for component-based DS) or CSS utility approach (if Tailwind-first).
2. **Define size scale** — use Mantine's xs/sm/md/lg/xl (540-1320px) as the starting point; customize to brand widths at the theme level.
3. **Include `fluid` boolean** — for dashboard/media layouts that need full viewport width.
4. **Include horizontal padding** as part of Container (not delegated to children); tie to spacing tokens.
5. **Add polymorphic `as` prop** — enables `<Container as="main">` or `<Container as="section" aria-label>` without extra wrapper divs.
6. **Implement using CSS logical properties** (`max-inline-size`, `margin-inline`) for RTL compatibility.
7. **Document the Container/Box/Card distinction** explicitly — Container is structural only; Box is flexible with visual props; Card is a surface.
8. **Add theme-level size customization** — don't hardcode max-width values in the component; read from the design token scale.
