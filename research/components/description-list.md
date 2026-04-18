# Description List — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Treats structured metadata as a List variant; two-line/three-line list item approximates vertical key-value pairs | List with overline (term) + headline (value) |
| Spectrum (Adobe) | Product-specific metadata structures vary too widely; DetailList is internal, not public | Flex/Grid composition + Body quiet for terms, Body for values |
| Atlassian | Issue detail patterns are product-level (Jira custom fields, field config schemes) | Inline/Stack/Label/Text from @atlaskit/primitives |
| GitHub Primer | No dedicated component; uses custom key-value layouts | FormControl patterns or Box composition with Text |
| shadcn/ui | No official component; community recipes with styled dl or two-column grid | Community recipe: styled `dl` with Tailwind utilities |
| REI Cedar | No dedicated component; product spec tables use custom layout | Custom layout patterns |
| Wise Design | Transfer detail screens use internal key-value patterns | Internal patterns only |
| Dell Design System | Server/system spec displays use tabular layouts internally | Internal tabular layout |
| Radix UI | No dedicated component | Text + Flex/Grid composition |
| Chakra UI | No dedicated component in v2 or v3 | SimpleGrid (2 columns) + Text; loses semantic dl/dt/dd |
| Base Web | No dedicated component | LabeledControl or custom grid layouts |
| Fluent 2 | No standalone description list; Field handles form labels but is form-oriented | Custom layouts |
| Gestalt | Pinterest pin metadata uses internal layout patterns | — |
| Mantine | No official component; community patterns vary | Grid/SimpleGrid + Text; some wrap dl/dt/dd |
| Orbit | Booking detail screens use internal key-value layouts | — |
| Evergreen | Source/destination config panels use internal patterns | — |

**Systems WITH dedicated component:** Polaris DescriptionList, Carbon StructuredList, Ant Design Descriptions, Twilio Paste DescriptionList, Playbook Detail, GOV.UK Summary List, Nord DescriptionList — 7 of 24

---

## How Systems Solve It

### Ant Design Descriptions — "The gold standard: bordered grid, responsive columns, colSpan, colon separator"

Ant Design's `Descriptions` (plural) component is the most feature-complete description list across all 24 systems. It renders a bordered or borderless key-value grid with configurable column count, sizes, layout direction (horizontal/vertical), and optional colon separator. The responsive column object `{xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1}` handles multi-column display that adapts to any viewport without media queries. `Descriptions.Item` supports `span` for items occupying multiple columns — an address field spanning 2 columns while name and email take 1 each.

The `bordered` prop renders actual `<table>` HTML with `<th>` for terms and `<td>` for values — genuine table semantics when needed. The `extra` prop provides an action slot in the header (Edit button, status badge, help link). The `colon` prop adds ":" after labels — common in enterprise UI conventions across many regions, standardized at the component level rather than requiring manual colon insertion in every label string.

**Design Decisions:**
- **Responsive column count via breakpoint object** → Why: description lists in dashboards need 3-4 columns on desktop and 1-2 on mobile; hardcoding columns produces broken layouts → Impact: HIGH → Para tu caso: always configure responsive columns for any description list in a dashboard or detail panel
- **`bordered` prop for table-like formal display** → Why: enterprise users distinguish between formal data tables (bordered) and informal metadata panels (borderless) based on data density and UI formality → Impact: HIGH → Para tu caso: use bordered for data that is highly structured/contractual (invoices, settings specs); borderless for profile info and metadata
- **`extra` action slot in header** → Why: detail views almost always need a top-right Edit or action button; building it into the component prevents 20 different ad-hoc implementations → Impact: MED → Para tu caso: include an extra slot for description list headers in your implementation

**Notable Props:** `title`; `bordered`; `column` (number|responsive object); `size` (default/middle/small); `layout` (horizontal/vertical); `colon`; `extra` (action slot in header); `Descriptions.Item` with `label`, `span`, `children`

**Accessibility:** Bordered mode renders `<table>` with `<th>`/`<td>` providing native table semantics; borderless mode renders `<div>` structure without semantic dl/dt/dd; label-value association relies on visual proximity in borderless mode; teams should add dl/dt/dd when using borderless for accessibility

---

### GOV.UK Summary List — "Three-column pattern with Change links and missing information handling"

GOV.UK's Summary List is used on every UK government digital service "Check your answers" page where users review submitted information before final submission. It's the most thoroughly user-tested description list design in production — serving millions of government service transactions. The component renders rows with three columns: key (term), value (description), and actions (Change/Remove links).

The actions column is the defining feature. "Change name", "Change date of birth" — each Change link includes the field name both visibly and in visually-hidden span text. This enables users navigating by links to distinguish between multiple "Change" links when they encounter them. The "missing information" pattern replaces empty values with a link ("No phone number provided — Add") rather than leaving a blank, which would be invisible to screen readers.

**Design Decisions:**
- **Three-column key/value/actions** → Why: government services require users to be able to correct specific answers; a description list without edit links creates a dead-end confirmation page → Impact: HIGH → Para tu caso: include an actions slot per row for any "review before submit" or "profile detail" pattern
- **Visually-hidden context in Change links** → Why: "Change" without context is meaningless when screen reader users navigate by links; "Change name" is unambiguous → Impact: HIGH → Para tu caso: all action links in description list rows must include the field name in their accessible text — "Edit" alone is never acceptable
- **Missing information pattern** → Why: blank values are invisible to screen readers and confusing to visual users; a descriptive placeholder with a call-to-action resolves both problems → Impact: MED → Para tu caso: never leave description list values empty; use a placeholder text + action link

**Notable Props:** `key`, `value`, `actions` per row; `card` variant (bordered); sentence-case content guidelines; `govuk-summary-list--no-border` modifier

**Accessibility:** Semantic `dl`/`dt`/`dd` HTML; Change links include visually-hidden field name text; missing values shown with descriptive text not blanks; sections divided with heading landmarks

---

### Polaris DescriptionList — "Clean semantic HTML with simple items API and ReactNode descriptions"

Polaris provides `DescriptionList` as a dedicated first-class component rendering semantic `dl`/`dt`/`dd` HTML. The `items` array API (`{term: string, description: ReactNode}`) allows rich content in the description slot — links, badges, formatted text — without breaking the semantic structure. Shopify Admin is fundamentally a metadata display product: every order, customer, product, and discount page is a series of key-value pairs, justifying a first-class component.

The vertical default (term stacked above description) handles long merchant-entered values better than horizontal columns where long content would compress the label column. The `gap` prop controls spacing between items using Polaris spacing tokens.

**Design Decisions:**
- **Semantic dl/dt/dd** → Why: native HTML provides term-description association for screen readers without any ARIA engineering → Impact: HIGH → Para tu caso: always use dl/dt/dd as the HTML foundation; div-based grids require aria-labelledby to recreate what dl/dt/dd provides natively
- **ReactNode in description** → Why: values in real products are rarely plain text — they contain status badges, profile links, formatted dates → Impact: MED → Para tu caso: always type your description/value slot as ReactNode, never just string

---

### Carbon StructuredList — "Enterprise metadata with optional selection rows"

Carbon's StructuredList is a table-like structure serving as the closest Carbon equivalent to a description list. The two-column configuration (term | value) handles key-value display, while the optional selection variant extends into settings panels where users can choose between configuration options. FormGroup's enforced `legendText` prop ensures accessible labeling for grouped sections. No semantic dl/dt/dd — Carbon uses `role="table"` semantics.

---

### Twilio Paste DescriptionList — "The T2 semantic reference with sub-component composition"

Paste provides dedicated `DescriptionList`, `DescriptionListTerm`, and `DescriptionListDetails` sub-components that render semantic `dl > dt + dd` HTML. It is one of only two T2 systems (alongside Polaris T1) that guarantee correct semantic HTML. The API follows the standard sub-component composition pattern. Paste's implementation is the T2 accessibility reference.

---

### Nord DescriptionList — "Minimal semantic implementation with horizontal/vertical toggle"

Nord provides `DescriptionList` > `DescriptionGroup` > `DescriptionTerm` + `DescriptionDetails` with `direction` (horizontal/vertical) at the list level and semantic dl/dt/dd HTML. The horizontal layout places term and description side by side; vertical stacks them. Nord's implementation is minimal but correct — the reference for a lightweight description list without the full Ant Design or GOV.UK feature set.

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Description list is a container component that organizes key-value pairs. Its primary job is layout and semantic association between terms and their descriptions. The shell is a `dl` (or equivalent) containing repeated term+description groups.

**Slot consensus:** (7/24 systems with dedicated component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| term / key | text | yes | 7/7 | Label text; always plain text |
| value / description | container | yes | 7/7 | Description content; ReactNode in most systems; allows rich content |
| title | text | no | 3/7 | Section title above the list; Ant Design, Carbon patterns |
| extra / header-action | container | no | 2/7 | Ant Design `extra`; GOV.UK Change link pattern; action in header or per-row |
| row-action | container | no | 2/7 | Per-row action link (GOV.UK Change/Remove; edit button pattern) |
| divider | divider | no | 3/7 | Visual separator between rows |
| section | container | no | 2/7 | Groups of rows with a sub-heading; Carbon FormGroup; GOV.UK sections |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Layout | variant | horizontal/vertical | 4/7 | horizontal: term+value side-by-side; vertical: term above value |
| Size | variant | default/compact/small | 3/7 | Ant Design size prop; affects row density |
| Bordered | variant | bordered/borderless | 3/7 | Ant Design; GOV.UK card variant; Carbon StructuredList |
| Columns | variant | 1/2/3/4 | 2/7 | Ant Design responsive column; Nord fixed 2-column |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasBorder | 3/7 | false | Bordered table-like display vs. clean borderless list |
| hasColon | 2/7 | true | Ant Design `colon` prop; adds ":" after term label |
| hasHeaderAction | 2/7 | false | Ant Design `extra`; action slot in description list header |
| hasRowActions | 2/7 | false | GOV.UK Change links; per-row edit/remove actions |
| isCompact | 3/7 | false | Reduced row padding for dense displays |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 7/7 | standard display | |
| missing-value | 1/7 | placeholder text + CTA link | GOV.UK missing information pattern |
| loading | 1/7 | skeleton text for values | inline loading while fetching field values |
| hover-row | 2/7 | subtle row background | only for selectable rows (Carbon StructuredList) |
| selected-row | 1/7 | checked state + background | Carbon StructuredList selection variant |

**Exclusion patterns found:**
- missing-value × loading — value is either unknown (loading) or absent (missing); not both
- selected × non-selectable rows — selection only relevant in Carbon StructuredList context

**Building block candidates:**
- row → `.DescriptionItem` / `.DescriptionGroup` — 7/7 systems have a row-level sub-component pairing term + value
- section → `.DescriptionSection` — Ant Design + GOV.UK pattern for grouped rows with sub-heading

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| layout | horizontal/vertical | 4/7 | horizontal: side-by-side; vertical: stacked |
| size | default/compact/small | 3/7 | row density |
| columns | 1/2/3/4 (or responsive object) | 2/7 | Ant Design responsive column configuration |

**A11y consensus:**
- Primary role: semantic `dl`/`dt`/`dd` HTML provides native term-description association — no ARIA needed (Polaris, Paste, GOV.UK, Nord all use this)
- When semantic HTML is not used: `aria-labelledby` must connect each value to its label; without this, screen readers cannot determine which value belongs to which label
- Required ARIA: none when using dl/dt/dd; `aria-labelledby` on `<dd>` pointing to its `<dt>` when using divs
- Keyboard: description lists are non-interactive by default; action links (GOV.UK Change) must be independently focusable
- Action links in rows: must include the field name in accessible text — "Change name" not just "Change"
- Missing values: never leave empty; use descriptive placeholder text ("Not provided") or CTA link
- Sections: use heading elements between groups of rows to aid screen reader navigation by heading
- APG pattern: `dl` / Description List — native HTML semantics are the accessible foundation

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40–70% | Extension — shared shell + additional prop | Same component set with additional variant property |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Vertical key-value | 100% | Template | Default: term above value | Polaris, Paste |
| Horizontal key-value | 85% | Template | `layout="horizontal"` | Nord, Ant Design |
| Bordered grid | 80% | Template | `bordered=true` renders table HTML | Ant Design, GOV.UK card variant |
| Multi-column grid | 70% | Template | `columns` > 2; responsive object | Ant Design |
| With row actions | 60% | Extension | Adds per-row actions slot (Change/Edit links) | GOV.UK, Ant Design extra |
| Review/confirm page | 50% | Extension | 3-column key/value/actions for "check your answers" | GOV.UK Summary List |
| Selectable rows | 40% | Extension | Adds selection checkbox per row | Carbon StructuredList |

---

## What Everyone Agrees On

1. **Semantic dl/dt/dd is the correct HTML**: Every system that implements description list as a dedicated component (Polaris, Paste, GOV.UK, Nord) uses semantic `dl`/`dt`/`dd` HTML. Systems that skip the dedicated component tend to use div grids, which then require ARIA workarounds.

2. **Value slot must accept rich content (ReactNode)**: Values in real products are never just strings — they contain badges, dates, links, avatars, status indicators. Every implementation that has a description slot types it as ReactNode or equivalent.

3. **Non-interactive by default**: Description lists have no keyboard interaction requirements beyond any action links or buttons within value slots. The semantic HTML handles all accessibility.

4. **Action links need full context in accessible text**: All systems implementing per-row actions (GOV.UK's Change links) agree that "Change" alone is insufficient — "Change [field name]" is required for screen reader link navigation.

5. **Vertical layout for long content, horizontal for short labels**: Vertical default handles long merchant-entered values; horizontal works for compact technical metadata (key: value). Every system with a layout option documents this distinction.

---

## Where They Disagree

**"¿Semantic dl/dt/dd or div grid?"**
→ dl/dt/dd (Polaris, Paste, GOV.UK, Nord): native HTML semantics; zero ARIA needed; browsers understand term-description relationships → div grid (Ant Design borderless, Carbon StructuredList, Chakra): visual flexibility; easier responsive CSS; loses native semantics and requires aria-labelledby
→ Para tu caso: always start with dl/dt/dd; switch to div only if you need a layout that dl cannot achieve (rare); add aria-labelledby on divs

**"¿Horizontal or vertical default layout?"**
→ Horizontal (Nord): side-by-side term and value like a classic "label: value" → Vertical (Polaris default): term above value; handles long values better without column compression
→ Para tu caso: default to vertical; offer horizontal as a variant; document when each is appropriate

**"¿Per-row actions or header actions only?"**
→ Per-row (GOV.UK Change links, Ant Design `extra` is header-level but row items can have React node content): allows users to edit individual fields → Header only (Polaris, Paste): simpler; single edit action for the entire section
→ Para tu caso: per-row for detail pages where individual fields are editable; header action for sections with a single Edit/Settings entry point

**"¿Responsive columns or fixed layout?"**
→ Responsive columns (Ant Design): one component works at all viewports; column count adapts to screen width → Fixed (Polaris, Paste, Nord): simpler API; layout responsibility stays with the consumer/page
→ Para tu caso: responsive columns if your product has dense metadata panels that must work on both desktop and tablet; fixed for simple vertical or horizontal layouts

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Vertical stack | Term above value; full-width rows | General metadata; long values | Polaris, Paste, GOV.UK |
| Horizontal two-column | Term left, value right; fixed-width label column | Compact technical metadata | Nord, Ant Design |
| Bordered grid | Table-like borders around each cell | Formal/contractual data | Ant Design, GOV.UK card |
| Multi-column grid | 2-4 columns of term+value pairs | Dashboard detail panels | Ant Design |
| Three-column with actions | Key / Value / Change link | Review-before-submit pages | GOV.UK Summary List |

**Wireframe — standard vertical with header action:**
```
┌─────────────────────────────────────────────────────┐
│  Customer Details                          [Edit]   │
├─────────────────────────────────────────────────────┤
│  Name                                               │
│  Pedro Quinones                                     │
├─────────────────────────────────────────────────────┤
│  Email                                              │
│  pedro@example.com                                  │
├─────────────────────────────────────────────────────┤
│  Plan                                               │
│  Pro ●                                              │
└─────────────────────────────────────────────────────┘
```

**Wireframe — GOV.UK three-column (review page):**
```
┌──────────────────────┬──────────────────────┬──────────┐
│  Name                │  Pedro Quinones      │  Change  │
├──────────────────────┼──────────────────────┼──────────┤
│  Date of birth       │  12 January 1990     │  Change  │
├──────────────────────┼──────────────────────┼──────────┤
│  Phone number        │  No phone number     │  Add     │
│                      │  provided            │          │
└──────────────────────┴──────────────────────┴──────────┘
```

**Wireframe — Ant Design multi-column bordered:**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Order ID     │ #A1234       │ Status       │ Processing   │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Created      │ Jan 12, 2026 │ Total        │ $248.00      │
├──────────────┴──────────────┴──────────────┴──────────────┤
│ Shipping address                                           │
│ 123 Main Street, New York, NY 10001                       │
└────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

**Div-based grid loses semantic association** (HIGH) — the most common implementation mistake: using CSS Grid or Flexbox for the description list layout without dl/dt/dd markup; screen readers cannot determine term-description relationships; mitigation: always start with dl/dt/dd; the CSS layout behavior of dl can be overridden without changing the semantic HTML

**Action links without field context** (HIGH) — "Change" without the field name is a documented a11y failure; occurs when Change links are visually differentiated by position but not by accessible label; mitigation: mandate that all row action links include the field name in their accessible text (`Change <span class="sr-only">email address</span>`)

**Empty values are invisible to screen readers** (MEDIUM) — a blank `<dd>` is announced as nothing by most screen readers; users can't tell if the field is intentionally empty or failed to load; mitigation: use GOV.UK's "Not provided" pattern — always show descriptive placeholder text for empty values

---

## Dimension Scores

| Dimension | Ant Design | GOV.UK | Polaris | Paste | Nord |
|-----------|-----------|--------|---------|-------|------|
| Feature coverage | 5/5 | 3/5 | 3/5 | 3/5 | 2/5 |
| A11y depth | 3/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| API ergonomics | 4/5 | 3/5 | 5/5 | 5/5 | 4/5 |
| Layout flexibility | 5/5 | 2/5 | 2/5 | 2/5 | 3/5 |
| Responsive | 5/5 | 2/5 | 2/5 | 2/5 | 2/5 |

---

## Next Steps

```
/spec description-list      → outputs/description-list-config.json
/enrich description-list    → a11y tokens + interaction spec
/build description-list     → full pipeline in one command
/build description-list --max  → use pre-generated config
```
