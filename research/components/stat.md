---
component: stat
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Stat — Research (--max mode)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | Philosophy: stat displays are product-specific compositions; M3 provides only atomic primitives | Compose: Card + Typography (displayLarge/headlineMedium/bodySmall) + color role tokens |
| Spectrum (Adobe) | No unbounded stat; public DS doesn't prescribe how to show "1.2M page views" across product contexts | Meter (bounded 0-100%) + custom headline typography + StatusLight for trend |
| Carbon (IBM) | Stat treated as a dashboard composition pattern, not a DS primitive | Tile (clickable or static) + Heading + number formatting via @carbon/charts utilities |
| Polaris (Shopify) | Merchant metrics are always contextual; generic Stat can't capture unique formatting/comparison logic per metric | Card + Text with `variant="headingXl"` + `tone` (success/critical) + Polaris Viz sparklines |
| Atlassian | Dashboard gadgets are product-level patterns, not published DS components | Heading (number) + Text (label) + Lozenge (trend context) + Badge (count display) |
| Twilio Paste | Card + Heading + Paragraph composition pattern; no stat-specific component | Card + Heading + Paragraph primitive composition |
| Salesforce Lightning | Lightning Report metric summaries are product-level; no standalone Stat in base DS | Custom metric tiles; Lightning Report components |
| GitHub Primer | CounterLabel for small counts; no full metric display component | CounterLabel + custom typography for metric displays |
| shadcn/ui | No official Stat; community recipe widely copied | Card + CardHeader + CardContent with `text-2xl font-bold` value + `text-xs text-muted-foreground` trend |
| REI Cedar | E-commerce product UI focus; KPI displays not in public component set | Custom composition |
| Wise Design | Transfer status metrics are product-level; no reusable Stat | Custom patterns |
| Dell Design System | Enterprise dashboard guidelines exist but no standalone Stat component published | Custom composition per dashboard pattern guidance |
| Radix UI | Unstyled primitives; no Stat; teams compose from Text + Heading + Flex | Text + Heading + Flex composition |
| GOV.UK | "Statistic" is a content design pattern (not a component); heading + body text | Heading + paragraph; every statistic requires: number + descriptor + time period + trend in plain English |
| Base Web (Uber) | Ride metrics and driver earnings are product-level; not in public DS | Custom composition |
| Fluent 2 | Power BI KPI is product-level; Fluent Card composes metric displays | Card + text hierarchy; custom metric tiles |
| Gestalt (Pinterest) | Analytics pin performance metrics use internal patterns; not in public DS | Custom composition |
| Orbit (Kiwi.com) | Travel booking metrics (price, duration, savings) are custom layouts | Custom composition |
| Evergreen (Segment) | Segment analytics dashboards use internal metric components | Custom composition |
| Nord (Nordhealth) | Healthcare metrics are product-level; Nord DS does not publish Stat | Custom composition |
| Mantine | No official Stat; widely-copied "StatsGroup" community template | Paper + Text (size="xl" fw={700}) + Text (size="sm" c="dimmed") + flex row with arrow icon |

---

## How Systems Solve It

### Ant Design — Statistic (most complete implementation)

Ant Design is the only Tier 1 system with a dedicated `Statistic` component, and it serves as the reference implementation for any DS building a stat component. It covers the full slot set: `title` (label), `value` (number or string), `prefix`/`suffix` (icons or text for trend indicators), `precision` (decimal places), `formatter` (custom number formatting function), `groupSeparator` (locale-aware thousands separator), `valueStyle` (inline style for the value), and `loading` (skeleton state). The `Statistic.Countdown` sub-component handles time-based metrics with an `onFinish` callback. Ant serves Chinese enterprise dashboards where KPI strip rows are the primary pattern on almost every admin screen.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Dedicated first-class component | Enterprise admin panels have stat rows on every screen; composition is error-prone at scale | H | If your app is dashboard-heavy, a dedicated Stat component pays off quickly |
| `prefix`/`suffix` slots for trend indicators | Arrow icon in prefix + percentage in suffix = standard "↑ 12.5%" trend pattern | H | The cleanest slot-based trend pattern; copy this |
| `formatter` prop for localization | Number formatting varies dramatically across locales (1,234.56 vs 1.234,56) | H | Required for any internationalized product |
| `Statistic.Countdown` sub-component | Time-limited promotions and deadlines share the stat visual language | M | Build if your product has countdown use cases |
| `loading` prop | Stat skeleton state while data fetches | M | Ship from day one; loading states are always needed |
| `groupSeparator` | Thousands separator control | M | Required for locale flexibility |

**Notable Props**: `title`; `value` (number|string); `prefix`; `suffix`; `precision`; `formatter`; `groupSeparator`; `valueStyle`; `loading`; `Statistic.Countdown` with `onFinish`; `decimalSeparator`

**Accessibility**: No dedicated ARIA roles; title renders as label text above value; no `role="status"` for live updates; Countdown has no aria-live announcement on completion. A11y responsibility is on implementing teams.

---

### Chakra UI — Stat family (best T3 implementation)

Chakra's Stat is the most complete T3 implementation, rivaling Ant Design in slot coverage. The sub-component architecture (`Stat` > `StatLabel` + `StatNumber` + `StatHelpText` + `StatArrow`) makes each slot explicit and independently composable. `StatArrow` is unique — it accepts `type="increase"` or `type="decrease"` and renders a correctly colored directional arrow, the only dedicated trend indicator in any T3 system. Visually hidden text ("increase"/"decrease") is included alongside the icon for screen reader access. `StatGroup` wraps multiple stats in a responsive flex row. The API is simple enough to learn in under 5 minutes but structured enough to enforce consistent stat displays.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Sub-component architecture (one component per slot) | Each slot is explicit; composable; no prop-drilling confusion about which prop goes where | H | Cleaner than props-based slot API for stat displays |
| `StatArrow` as dedicated component | Trend direction made explicit; includes screen-reader text ("increase"/"decrease") | H | Best accessible trend indicator in the research set |
| `StatGroup` for horizontal layout | Stats almost always appear in groups of 3-4; Group handles responsive layout | M | Build as a companion layout component |
| `StatHelpText` for secondary context | Space for comparison period, change percentage, or additional context | M | The "context line" is the most skipped but most useful slot |

**Notable Props**: `StatLabel` (title text); `StatNumber` (value); `StatHelpText` (context/comparison); `StatArrow` with `type` (increase|decrease); `StatGroup`

**Accessibility**: `StatArrow` includes visually hidden "increase"/"decrease" text alongside icon; heading hierarchy provides structure; no `role="status"` for live updates.

---

### Playbook — Stat / StatValue / StatChange (best T2 implementation)

Playbook (PowerBI/eBay) is the only T2 system with a dedicated, structured Stat component family. `Stat` wraps `StatValue` (the number) and `StatChange` (trend with direction arrow and percentage). `StatGroup` handles horizontal/vertical grouping with consistent spacing. The explicit sub-component for each slot mirrors Chakra's approach but predates it. This is the T2 reference implementation.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Dedicated StatChange component | Trend is its own component with direction + percentage + color semantics | H | Trend display is complex enough to deserve its own component |
| StatGroup for grouping | 3-4 stats in a horizontal strip is the universal KPI pattern | M | Ship the grouping component alongside the stat component |

**Notable Props**: `StatValue` (the number); `StatChange` with direction arrow + percentage; `StatGroup`

---

### GOV.UK — Statistic Content Pattern (best content design reference)

GOV.UK doesn't have a Stat component, but the "Statistic" content design pattern is the strongest reference for what data every stat display requires. Government statistics must include: (1) the number with commas/formatting, (2) a descriptor ("people employed"), (3) a time period ("April 2025 to March 2026"), and (4) a trend description in plain English ("up 3.2% from last year"). This four-field content model is the best definition of the minimum viable stat slot set.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Number + descriptor + time period + trend (plain English) | A number alone is meaningless without context | H | Use as the minimum viable slot definition for your Stat component |
| Trend in plain English, not just arrow | Arrow icons are not accessible; prose trend is always required alongside | H | Document this requirement alongside your Stat component |

---

### Mantine — StatsGroup community template (most copied pattern)

Mantine has no official Stat component, but the "StatsGroup" community template is the most-copied stat pattern in the T3 ecosystem. It uses Paper for card containment, Text with `size="xl" fw={700}` for the value, Text with `size="sm" c="dimmed"` for the label, and a flex row with an arrow icon (ThemeIcon or plain icon) + colored Text for the trend line. Simple, effective, widely copied.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Paper as container | Subtle elevation separates stat from background; consistent with card pattern | L | Card/Paper as container is the universal composition model |
| fw={700} for value | Bold weight makes the number dominant; semantic typography decision | L | Ship as part of the StatNumber style defaults |

---

### Tier 2 System Approaches

| System | Name | Approach |
|--------|------|---------|
| Playbook | Stat / StatValue / StatChange / StatGroup | Full dedicated family; sub-components per slot; StatChange with direction + percentage |
| Twilio Paste | — | Card + Heading + Paragraph composition |
| Salesforce Lightning | — | Custom dashboard metric tiles |
| GitHub Primer | CounterLabel | Small counts only; not a full stat |
| shadcn/ui | — | Dashboard card recipe: Card + text-2xl bold + text-xs muted comparison line |
| REI Cedar | — | No stat |
| Wise Design | — | No stat |
| Dell Design System | — | Dashboard guidelines but no component |

---

### Tier 3 System Approaches

| System | Name | Approach |
|--------|------|---------|
| Chakra UI | Stat / StatLabel / StatNumber / StatHelpText / StatArrow / StatGroup | Full dedicated family; cleanest T3 implementation; StatArrow with a11y text |
| GOV.UK | — | Content design pattern (not component); 4-field content model |
| Radix UI | — | Compose from Text + Heading + Flex |
| Base Web | — | No stat |
| Fluent 2 | — | Card composition |
| Gestalt | — | No public stat |
| Mantine | — (community StatsGroup) | Paper + Text hierarchy + flex trend row |
| Orbit | — | Custom composition |
| Evergreen | — | Internal; not public |
| Nord | — | Healthcare product-level |

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Display / data primitive (non-interactive)**

Stat is a display-only component that surfaces a single metric with surrounding context. It is never interactive (unless the whole card is a link), never receives keyboard focus, and has no interactive states. The correct archetype is a compound display component with explicit named sub-components or props for each slot: label (title), value (the number), helpText (context/comparison), and trend (direction indicator). Ship a companion `StatGroup` for the KPI strip layout pattern.

The architecture decision is: **props-based** (Ant Design's `title`, `value`, `prefix`, `suffix`, `precision`) vs. **sub-component** (Chakra's `StatLabel` + `StatNumber` + `StatArrow`). Sub-component is more composable and extensible; props-based is simpler for basic use.

---

### Slot Consensus

| Slot | Consensus | Notes |
|------|-----------|-------|
| value (the number) | 5/5 systems with component | Core slot; always present; number or string |
| label / title | 5/5 systems with component | Text above or below the value describing the metric |
| helpText / context | 4/5 systems with component | Comparison period, additional context ("vs. last month") |
| trend / change (direction indicator) | 4/5 systems with component | Arrow + percentage; Chakra StatArrow; Ant Design prefix/suffix; Playbook StatChange |
| prefix | 3/5 | Ant Design, shadcn recipe; currency symbol, units |
| suffix | 3/5 | Ant Design, shadcn recipe; percentage, units |
| loading | 2/5 | Ant Design, shadcn recipe; skeleton state |

---

### Property Consensus

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| value | number, string | 5/5 | Core prop; Ant Design supports both types |
| title / label | string | 5/5 | Metric name; above or below value |
| precision | number | 3/5 | Decimal places; Ant Design, Mantine community template |
| formatter | function | 2/5 | Custom number formatting; Ant Design |
| groupSeparator | string | 2/5 | Thousands separator; Ant Design |
| loading | boolean | 2/5 | Skeleton state; Ant Design |
| valueStyle | CSSProperties | 2/5 | Inline style for value; Ant Design |

---

### Boolean Properties

| Property | Default | Adopters |
|----------|---------|---------|
| loading | false | Ant Design |
| trend.type (increase/decrease) | — | Chakra StatArrow, Playbook StatChange |

---

### State Coverage

| State | Adopters | Notes |
|-------|---------|-------|
| Default (static value) | All | Standard display state |
| Loading / skeleton | Ant Design, shadcn community | While value fetches |
| Positive trend | Chakra, Playbook, Ant Design (via prefix/suffix), shadcn | Green color + up arrow |
| Negative trend | Chakra, Playbook, Ant Design, shadcn | Red color + down arrow |
| Neutral / no trend | Most | No trend indicator |
| Live-updating | — (not built-in) | Requires aria-live="polite" on value container |
| Countdown | Ant Design Statistic.Countdown | Time-based values with onFinish callback |

---

### Exclusion Patterns

- Stat is NOT a chart — do not include sparklines in the core Stat component; provide a separate slot/prop for a sparkline passed as children
- Trend arrow icons alone are NOT accessible — always include visually hidden text ("increased by 12%") alongside the icon
- Color alone is NOT sufficient for trend direction (green = positive, red = negative fails for colorblind users) — always pair with icon AND text direction indicator
- `role="status"` (aria-live="polite") is NOT the default — only live-updating dashboard stats need this; static stats do not
- Do NOT use heading elements for the metric value — the value is not a heading; use a `<p>` or `<span>` with appropriate typography scale

---

### Building Block Candidates

- **StatGroup**: Companion layout component; horizontal flex row of Stats; responsive (4-across → 2x2 → stacked); this is how stats always appear
- **StatTrend / StatArrow**: The trend indicator as a separate composable component; accepts `direction` (up/down/neutral) + `value` (percentage); includes accessible text
- **Statistic.Countdown**: Time-based stat sub-component; shows countdown from deadline; `onFinish` callback; separate from main Stat

---

### Enum / Configuration Properties

| Property | Values | Source |
|----------|--------|--------|
| trend direction | `increase`, `decrease`, `neutral` | Chakra StatArrow, Playbook StatChange |
| loading | `true`, `false` | Ant Design |
| size | `sm`, `md`, `lg` | shadcn community, Mantine community |

---

### A11y Consensus

| Topic | Consensus |
|-------|-----------|
| Role | No specific ARIA role for static stat display |
| Label association | Heading hierarchy OR aria-labelledby linking value to its label |
| Trend arrows | Must include visually hidden text ("increase"/"decrease"); icon alone is inaccessible |
| Color for trend | Color must be supplemented with icon + text direction indicator for colorblind users |
| Live-updating stats | Use `aria-live="polite"` on value container; NOT on static stats |
| Non-interactive | No keyboard focus, no button role, no interactive states |
| GOV.UK content rule | Every statistic needs: number + descriptor + time period + trend in plain English |
| APG Pattern | None — static display element |

---

## What Everyone Agrees On

1. **Stat is a composition of 4 slots**: value (the number) + label (metric name) + helpText (context/comparison) + trend (direction indicator). Every implementation, whether component or composition pattern, uses these four slots.
2. **Trend direction must be non-color**: Arrow icon + direction text (not just green/red) is required for colorblind accessibility. Chakra's StatArrow includes visually hidden text; GOV.UK mandates plain English trend descriptions.
3. **Stats appear in groups**: The KPI strip (3-4 stats in a horizontal row, responsive to 2x2 on tablet and stacked on mobile) is the universal usage pattern. A `StatGroup` companion component is always needed.
4. **Loading/skeleton state is required**: Dashboards fetch data; the stat skeleton is a first-class state. Ant Design's `loading` prop is the reference.
5. **Number formatting is a first-class concern**: Locales, precision, abbreviation (1.2M vs 1,200,000), currency symbols, and group separators are all required for production stat displays. Ant Design's `formatter` + `precision` + `groupSeparator` is the reference API.
6. **Most systems don't have a Stat component**: Only 4 of 24 systems ship a dedicated Stat (Ant Design, Chakra, Playbook, GOV.UK pattern). The absence confirms Stat is still a "composition pattern" territory for most design systems — but the demand is high enough to justify a dedicated component in dashboard-heavy products.

---

## Where They Disagree

### 1. Props-based API vs. sub-component API
**Option A (Props)**: `<Statistic title="Revenue" value={1234} prefix="$" suffix="K" />` — Ant Design  
**Option B (Sub-components)**: `<Stat><StatLabel>Revenue</StatLabel><StatNumber>$1.2M</StatNumber><StatArrow type="increase" /></Stat>` — Chakra

- Adopters A: Ant Design, GOV.UK pattern, shadcn recipe  
- Adopters B: Chakra, Playbook  
- Upside A: One import; simple for basic use; co-located data and display  
- Downside A: Props become complex as slots grow; formatter + prefix + suffix + trend creates long prop lists  
- Upside B: Each slot is a named component; flexible composition; trend indicator is its own import with full type safety  
- Downside B: More imports; verbose for simple cases  
- Para tu caso: Sub-component for complex dashboards; props-based for simple product use. Offer both via default export (props) + named exports (sub-components).

### 2. Trend as slot vs. trend as prop
**Option A (Slot/sub-component)**: `<StatArrow type="increase" />` as a child — Chakra; `<StatChange direction="up" value={12.5} />` — Playbook  
**Option B (Props)**: `prefix={<ArrowUp />}` + `suffix="12.5%"` — Ant Design  
**Option C (No built-in trend)**: Trend is consumer responsibility — most systems

- Adopters A: Chakra, Playbook  
- Adopters B: Ant Design  
- Adopters C: Most  
- Upside A: Trend has semantic meaning (increase/decrease); encapsulates color + icon + text; accessible by default  
- Upside B: Flexible; any icon + any text  
- Downside B: Consumer must implement color semantics and accessible text each time  
- Para tu caso: Build a `StatTrend` sub-component with `direction` (up/down/neutral) and `value` (percentage) that handles color + icon + accessible text automatically.

### 3. Number formatting built-in vs. consumer responsibility
**Option A (Built-in)**: `precision={2}`, `formatter={fn}`, `groupSeparator=","` — Ant Design  
**Option B (Consumer)**: Pass pre-formatted string as `value` — most systems

- Adopters A: Ant Design  
- Adopters B: Chakra, Playbook, most  
- Upside A: Consistent formatting across all stat displays; locale switching works automatically  
- Downside A: Custom formatting logic in the component increases complexity  
- Upside B: Maximum flexibility; consumer uses Intl.NumberFormat or any library  
- Downside B: Every team formats numbers differently; inconsistency across stat displays  
- Para tu caso: Accept both number (with built-in `precision` + `formatter` props) and pre-formatted string. Document `Intl.NumberFormat` as the recommended consumer utility.

### 4. Countdown as sub-component vs. separate component
**Option A (Sub-component)**: `<Statistic.Countdown deadline={...} onFinish={fn} />` — Ant Design  
**Option B (Separate)**: `<CountdownStat>` or `<StatCountdown>` — Playbook-inspired  
**Option C (Not included)**: Consumer builds countdown — most systems

- Adopters A: Ant Design  
- Adopters B: — (concept only)  
- Adopters C: Most  
- Para tu caso: Include if your product has countdown/deadline use cases; Ant Design's Statistic.Countdown pattern is the reference.

### 5. Grouping layout responsibility
**Option A (StatGroup companion)**: `<StatGroup>` handles responsive KPI strip layout — Chakra, Playbook  
**Option B (Stack/Grid)**: Consumer uses Stack or Grid to lay out stats — Ant Design, most  
**Option C (CSS Grid)**: Stat designed to work in CSS grid; no grouping component — shadcn

- Adopters A: Chakra, Playbook  
- Adopters B: Ant Design, most  
- Adopters C: shadcn, Mantine community  
- Upside A: Eliminates repeated responsive layout code for the universal KPI strip pattern  
- Downside A: Another component to maintain  
- Para tu caso: Ship `StatGroup` as a companion layout component. The 3-4 stat horizontal strip is universal enough to justify it.

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| KPI strip | 3-4 stats horizontal, responsive to 2x2/stacked | Dashboard top section | All dashboard products |
| Stat card | Single stat in card/paper container with elevation | Feature pages, summary sections | shadcn, Mantine community |
| Inline stat | Label + value on same line (compact) | Sidebar, settings panels | Atlassian composition |
| Stat with sparkline | Stat + mini chart trend visualization | Historical trend alongside current value | Polaris Viz, custom |
| Stat with countdown | Number counting down to deadline | Promotions, limited offers | Ant Design Statistic.Countdown |
| Live-updating stat | Value updates in real time (websocket/polling) | Real-time dashboards | Custom with aria-live |

### ASCII Wireframes

**Standard Stat card**
```
┌─────────────────────────┐
│  Total Revenue          │  ← label (StatLabel)
│  $1,234,567             │  ← value (StatNumber) — large bold
│  ▲ +12.5%  vs last month│  ← trend (StatArrow/StatChange) + context
└─────────────────────────┘
```

**KPI Strip (StatGroup, 4 items)**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total Rev.   │ New Users    │ Conversion   │ Avg. Order   │
│ $1.2M        │ 8,492        │ 3.24%        │ $145.20      │
│ ▲ +5.2%      │ ▼ -1.1%      │ ▲ +0.8%      │ ▲ +2.3%      │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Stat with prefix/suffix (Ant Design pattern)**
```
┌─────────────────────┐
│  Active Users       │
│  ▶ 142,893 users    │  ← prefix icon + value + suffix text
│  Compared to 138K   │  ← help text
└─────────────────────┘
```

**Statistic.Countdown**
```
┌─────────────────────┐
│  Sale Ends In       │
│  02 : 14 : 37       │  ← HH:MM:SS countdown
│  Limited offer      │
└─────────────────────┘
```

**Loading state (skeleton)**
```
┌─────────────────────┐
│  ████████████       │  ← label skeleton
│  ██████████████████ │  ← value skeleton (wider)
│  █████████          │  ← trend skeleton
└─────────────────────┘
```

**Responsive KPI strip (mobile → desktop)**
```
Mobile (2x2):              Desktop (4-across):
┌───────────┬───────────┐  ┌─────┬─────┬─────┬─────┐
│  Stat 1   │  Stat 2   │  │  1  │  2  │  3  │  4  │
├───────────┼───────────┤  └─────┴─────┴─────┴─────┘
│  Stat 3   │  Stat 4   │
└───────────┴───────────┘
```

---

## Risks to Consider

### 1. Colorblind trend indicators — HIGH
Using color alone (green = positive, red = negative) to communicate trend direction fails for the ~8% of users with red-green color blindness. This is the most common accessibility failure in stat/metric components. Most composition patterns rely on color alone.

**Mitigation**: Ship `StatTrend` with a required `direction` prop that controls both color AND icon (▲/▼) AND visually hidden text ("increased by X%"). Make it impossible to use trend without all three signals. Chakra's StatArrow is the reference implementation.

### 2. Missing number formatting consistency — HIGH
Without built-in formatting utilities or clear guidance, different parts of a product will format the same type of number differently (1,234,567 vs 1.2M vs $1.234.567,00). This is especially damaging on dashboard KPI strips where multiple stats are compared.

**Mitigation**: Ship `formatter` and `precision` props (Ant Design model). Provide a default formatter using `Intl.NumberFormat`. Document abbreviation thresholds (>1M shows "1.2M"; >1K shows "8.4K") as recommended configuration.

### 3. No loading skeleton shipped with component — MEDIUM
Stat values come from async data sources. Without a built-in loading state, every team builds their own skeleton independently, resulting in inconsistent loading experiences across dashboard KPI strips.

**Mitigation**: Ship `loading` boolean prop that swaps the value for a skeleton placeholder. Include the skeleton as part of the component, not as a separate import.

### 4. StatGroup not built → repeated responsive layout code — MEDIUM
The 3-4 stat horizontal strip is the universal KPI pattern, yet most systems without a dedicated Stat component have every team independently implementing the same responsive grid (4-across → 2x2 → stacked). Without a `StatGroup` companion, this pattern is re-implemented inconsistently everywhere.

**Mitigation**: Ship `StatGroup` as a companion layout component alongside `Stat`. Use a CSS Grid with auto-fit columns for the responsive behavior. This eliminates the most repeated layout code in dashboard UIs.

---

## Next Steps

1. **Define slot model first**: Value + label + helpText + trend are the four required slots. Decide props-based (Ant Design) vs. sub-component (Chakra) API before writing any component code.
2. **Build StatTrend as first-class**: The trend indicator is complex enough to deserve its own component with `direction` (up/down/neutral), `value` (percentage), automatic color + icon + accessible text.
3. **Ship with `loading` prop**: Skeleton state is a day-one requirement for any async dashboard use.
4. **Add `formatter` + `precision` props**: Reference Ant Design's API. Provide a default formatter using `Intl.NumberFormat`.
5. **Build StatGroup companion**: The KPI strip is the universal usage pattern; ship the layout component alongside the display component.
6. **Reference GOV.UK content model**: Every stat needs number + descriptor + time period + trend in plain English. Use as your slot documentation template.
