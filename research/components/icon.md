# Icon — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| shadcn/ui | BYO icon library; uses Lucide React directly; no built-in icon component | Lucide React icons directly; size/color/strokeWidth from Lucide |
| GOV.UK | Minimal ~30 curated icons; strict guidance that icons MUST accompany text; standalone icons explicitly discouraged | SVGs inline in HTML with adjacent visible text |
| Mantine | Delegates to Tabler Icons; no wrapper | @tabler/icons-react (5,000+ icons) as recommended library |

**Systems WITH dedicated Icon component:** M3 Material Symbols, Spectrum Icon, Carbon Icon, Polaris Icon, Atlassian Icon, Ant Design Icon, Twilio Paste Icon, Salesforce Lightning lightning-icon, GitHub Primer Octicons, Playbook Icon (Font Awesome), REI Cedar CdrIcon, Wise Design Icon, Dell Design Icon, Radix @radix-ui/react-icons, Chakra UI Icon/createIcon, Base Web Icon, Fluent 2 @fluentui/react-icons, Gestalt Icon, Orbit Icon, Evergreen Icon, Nord nord-icon — 21 of 24

---

## How Systems Solve It

### Material Design 3 Material Symbols — "Variable font with four continuous axes: fill, weight, grade, optical size"

Material Symbols is architecturally unique: a variable font with continuous axes (fill 0–1, weight 100–700, grade -25–200, optical size 20–48) that enables smooth transitions and precise visual tuning without loading separate icon files. The optical size axis is the critical innovation: a 20dp icon automatically gets thicker strokes for legibility while a 48dp icon gets finer detail — the "too thin at small size" problem that plagues single-weight icon sets is solved at the font level.

Three style families (Outlined/Rounded/Sharp) are separate font files rather than axes — this prevents accidental style mixing within a product while allowing cross-product differentiation. Over 3,000 symbols available.

**Design Decisions:**
- **Variable font with optical size axis** → Why: icons scaled from a single SVG master lose legibility at small sizes (strokes too thin) and look crude at large sizes (strokes too thick); optical size compensation is the architecturally correct solution → Impact: HIGH → Para tu caso: for custom icon sets, design size-specific variants for at least 16px and 24px; a single SVG scaled to both will produce noticeably different visual quality
- **Three style families as separate font files** → Why: preventing style mixing (Rounded icon next to Sharp icon) is a governance concern; separate files enforce this constraint at the infrastructure level → Impact: MED → Para tu caso: enforce style family consistency via tooling/linting, not just documentation

**Notable API:** `<span class="material-symbols-outlined">icon_name</span>`; CSS `font-variation-settings` for fill, weight, grade, optical size; also available as `<svg>` or `<img>` per icon

**Accessibility:** Decorative: `aria-hidden="true"` on icon element; Informative: wrap in element with `role="img"` + `aria-label`; Icon fonts use ligatures (text "search" renders as search icon) — screen readers read the ligature text unless hidden; `aria-hidden` is essential for decorative icon font use

---

### Carbon Icons — "Size-specific SVG optimization: each size hand-tuned at 16/20/24/32px"

Carbon's 2,000+ icons are provided at four fixed sizes (16/20/24/32px) as separately optimized SVGs — not scaled from one master. Each size is hand-tuned for the pixel grid at that specific size. Icons are individually tree-shakeable React components (`import { Add } from '@carbon/icons-react'`), shipping only used icons in the bundle. All icons default to `aria-hidden="true"` (decorative); providing `aria-label` automatically adds `role="img"` and a `<title>` element inside the SVG.

**Design Decisions:**
- **Size-specific SVG optimization** → Why: pixel grid alignment is guaranteed at each size; browser scaling of a single SVG produces sub-pixel rendering artifacts that make icons appear soft at non-native sizes → Impact: HIGH → Para tu caso: create at minimum 16px and 24px variants for each icon in your custom library; they will look measurably different
- **Decorative-by-default + aria-label enables informative** → Why: the vast majority of icons in a UI are decorative (adjacent to visible text); requiring developers to explicitly mark them `aria-hidden` for each would produce more accessibility failures than the opposite default → Impact: HIGH → Para tu caso: make icons decorative by default; require explicit accessible label only when the icon conveys information not present in adjacent text

**Notable Props:** `<Add size={24} aria-label="Add item" />`; `size` (16|20|24|32); `aria-label` for informative; `aria-hidden` for decorative; `fill` for color override; `className`; `tabIndex`

**Accessibility:** Decorative-by-default (aria-hidden="true"); providing aria-label adds role="img" + SVG `<title>` element; `focusable="true"` for focused icon button targets

---

### Fluent 2 @fluentui/react-icons — "5,000+ icons with 6 size variants and bundleIcon for state-driven icon switching"

Fluent 2 has the largest icon library (5,000+) with the most size variants (16/20/24/28/32/48px), each size-optimized — matching M3's Material Symbols breadth with individual SVG components. The `bundleIcon` utility is architecturally distinctive: it combines a Regular and Filled icon variant into a single component that the parent can toggle. A navigation item renders the Regular icon when unselected and Filled when selected — eliminating conditional rendering logic at the consuming component and formalizing the "filled = active" visual convention.

**Design Decisions:**
- **`bundleIcon` for state-driven icon switching** → Why: the pattern of showing filled icon on hover/selected and regular icon otherwise is ubiquitous but implemented ad-hoc; bundleIcon standardizes it → Impact: MED → Para tu caso: implement an equivalent pattern for any icon that has active/inactive visual variants; it eliminates conditional JSX at every usage site

---

### Spectrum Icon — "Workflow vs. product icon separation + automatic ARIA via alt prop presence"

Spectrum separates workflow icons (UI actions — 18/24px, 1.5px stroke) from product icons (app identity — different design constraints). Color inherits via `currentColor`. If `alt` is provided, `role="img"` + `aria-label` are applied automatically. If no `alt`, `aria-hidden="true"` is applied automatically. The alt prop is the single declarative accessibility control point — no manual ARIA attribute management needed.

---

### Polaris Icon — "Semantic tone system + accessibilityLabel dev warnings"

Polaris's `tone` prop maps icon color to semantic tokens: base/subdued/caution/warning/critical/interactive/success/primary/magic/textInverse. Icons carry semantic meaning through the color system. Only two sizes (minor 20px / major 24px) — sized around Shopify admin typography (minor inline with 14px body text; major for navigation items). Dev mode warns when `accessibilityLabel` is missing and the icon is not within a labeled parent.

---

### Atlassian Icon — "Required label prop with ESLint enforcement: forced a11y decision"

Atlassian's `label` prop is the single accessibility control point — required decision at every usage. Non-empty string = `role="img"` + `aria-label`. Empty string = `aria-hidden="true"`. ESLint rules enforce that `label` is always explicitly set (never accidentally omitted). The two-tone system (`primaryColor`/`secondaryColor`) enables status-colored icon fills while keeping strokes consistent — unique in Tier 1.

---

### Twilio Paste Icon — "Decorative boolean as the strongest T2 enforcement model"

Paste's `decorative` boolean is the cleanest T2 a11y pattern. `decorative={true}` automatically sets `aria-hidden="true"`. `decorative={false}` requires a `title` prop or the component throws a runtime error. This binary enforcement eliminates the ambiguity of optional `aria-label` props where developers can accidentally leave icons unlabeled. The `sizeIcon10`–`sizeIcon110` scale maps icon sizes to spacing tokens.

---

### GitHub Primer Octicons — "Size-specific SVG optimization at 16px and 24px"

Every Octicon has a 16px and 24px version with different path data optimized for each pixel grid. This matches Carbon's approach — the only T2 system with size-specific SVG optimization. Icons are individually tree-shakeable React components. `verticalAlign` prop controls baseline alignment with adjacent text.

---

### Chakra UI createIcon — "Factory for custom icons from SVG path data"

Chakra's `createIcon` factory is the cleanest pattern for registering custom icons from SVG path data. It creates a React component with all standard Icon props (size, color, aria-label) from path data + viewBox — no SVG file needed. The `Icon` wrapper accepts any SVG children or `as` prop for third-party icons, making Chakra compatible with any icon library.

---

## Pipeline Hints

**Archetype recommendation:** inline-action (display primitive)
Rationale: Icon is the most primitive display component in any design system. It renders a visual glyph with semantic or decorative ARIA treatment. No interaction, no state beyond enabled/disabled for standalone usage.

**Slot consensus:** (21/24 systems with icon component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| glyph / source | media | yes | 21/21 | The SVG path data or icon name reference |
| title (accessible) | text | conditional | 14/21 | Accessible name when icon is informative; rendered as SVG `<title>` or aria-label |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | 16/20/24/32 (or sm/md/lg scale) | 19/21 | Fixed sizes only; no arbitrary sizing (prevents non-optimized sizes) |
| Color | variant | currentColor / semantic token | 17/21 | currentColor inheritance is universal best practice |
| Decorative / accessibility | state | decorative/informative | 19/21 | The core binary ARIA decision; handled via different props across systems |
| Weight / style | variant | outlined/filled/regular/two-tone | 10/21 | M3 fill axis; Fluent 2 Filled/Regular/Light; Ant Design Outlined/Filled/TwoTone |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isDecorative | 14/21 | true (decorative by default) | Carbon, Polaris, Atlassian, Paste — decorative is the safe default |
| spin | 3/21 | false | Ant Design; rotation animation for loading indicators |
| isDisabled | 4/21 | false | Reduced opacity for standalone interactive icons |
| focusable | 2/21 | false | Carbon `focusable="true"` for keyboard-accessible standalone icons |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| decorative | 19/21 | aria-hidden="true"; no role | Paired with visible text label; SR ignores the icon |
| informative | 14/21 | role="img" + aria-label/title | Standalone icon conveying meaning without adjacent text |
| disabled | 4/21 | reduced opacity (typically 40%) | Within disabled parent components |
| active/selected | 3/21 | filled variant (Fluent 2 bundleIcon) | Icon switches from Regular to Filled on selection |
| error/critical | 5/21 | semantic color token (critical/warning) | Polaris tone; Carbon color prop; status communication |

**Exclusion patterns found:**
- decorative × informative — mutually exclusive; cannot be both aria-hidden and role="img"
- icon-only buttons: the accessible label belongs on the button, not the icon; icon inside button MUST be aria-hidden

**Building block candidates:**
- None — Icon is itself the primitive; no sub-components

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| size | 16/20/24/32px (or sm/md/lg) | 19/21 | Fixed sizes; never arbitrary values |
| style/theme | outlined/filled/two-tone/regular/light | 10/21 | Ant Design: in component name; Fluent 2: separate components + bundleIcon |
| tone/semantic-color | base/subtle/critical/warning/success/interactive | 5/21 | Polaris tone system; semantic over arbitrary color |

**A11y consensus:**
- Universal binary: decorative icon → `aria-hidden="true"` (or `role="none"`); informative standalone icon → `role="img"` + `aria-label` or SVG `<title>` element
- Decorative is the safe default (Carbon, Polaris, Atlassian, Paste all default to decorative) — the vast majority of icons in a product are adjacent to visible text labels
- Icon-only buttons: accessible label belongs on the `<button>` element, NOT on the icon SVG inside it; the icon inside should be `aria-hidden="true"`
- `<title>` in SVG (Base Web approach) vs. `aria-label` on wrapper: both are valid; `<title>` is the SVG-native approach; `aria-label` on wrapper is the wrapper-component approach; never both simultaneously
- GOV.UK principle: standalone icons without adjacent visible text are an anti-pattern — the most conservative position
- Color alone: must never be the only differentiator for icon meaning (WCAG 1.4.1 — same as badge/status); always pair semantic color with shape or label
- Icon in form: form field icons (trailing validation checkmark/error icon) must be `aria-hidden` if the field's `aria-invalid`/`aria-describedby` conveys the same information

---

## What Everyone Agrees On

1. **Decorative is the default**: The vast majority of icons appear adjacent to visible text labels — the icon is decorative, the text is the accessible label. Systems that default to `aria-hidden="true"` (Carbon, Polaris, Atlassian, Paste) produce fewer a11y failures than systems where developers must remember to add aria-hidden manually.

2. **Icon-only button labels go on the button, not the icon**: Universal agreement. The accessible label for an icon-only button (save, delete, close) belongs on `<button aria-label="Save">`, and the icon inside gets `aria-hidden="true"`. Labels on the icon SVG inside an unlabeled button are not surfaced correctly by all screen readers.

3. **Size must be constrained**: No system allows arbitrary icon sizes. Fixed sizes (16/20/24/32px) ensure icons are rendered at their optimized pixel grid. Free-form sizing degrades icon rendering quality.

4. **`currentColor` for color inheritance**: Every system that implements an Icon component uses CSS `currentColor` as the default color — icons inherit the parent text color automatically, ensuring icons match surrounding typography without manual color assignment.

5. **Color alone must never convey icon meaning**: A red X icon means "error" to sighted users, but a colorblind user may not perceive the red. All systems document that semantic meaning must be conveyed through shape AND label, not color alone.

---

## Where They Disagree

**"¿BYO icon library or bundled icon set?"**
→ Bundled (M3, Carbon, Polaris, Atlassian, Primer): consistent visual language; curated for the product domain; semantic naming → BYO (shadcn/ui + Lucide, Mantine + Tabler): flexibility; never locked to one icon vocabulary; separates icon set choice from component API
→ Para tu caso: bundled if your system has a strong brand and curated use cases; BYO-compatible wrapper if teams across different brands use your system

**"¿Size-specific SVG optimization or single-SVG scaling?"**
→ Size-specific (M3, Carbon, Primer): visually superior; stroke weight and detail tuned per size → Single SVG (most systems): simpler to maintain; acceptable visual quality for non-critical uses
→ Para tu caso: provide size-specific SVGs for at minimum 16px and 24px; the visual difference is noticeable and the extra maintenance is worth it for a design system that will be used at scale

**"¿Decorative boolean prop or required label prop?"**
→ Decorative boolean (Paste): clearest API; error thrown if non-decorative icon lacks title → Required label with empty string (Atlassian): forces explicit decision; ESLint enforcement → Optional aria-label (most systems): maximum flexibility; accessibility failures easier to miss
→ Para tu caso: implement either Paste's decorative boolean or Atlassian's required label pattern; optional aria-label is the weakest enforcement model for accessibility

**"¿Semantic color tokens or arbitrary color?"**
→ Semantic tokens (Polaris tone, Atlassian primaryColor): icons carry meaning through the color system → Arbitrary (Ant Design style prop, M3 CSS custom properties): maximum flexibility; risk of off-brand or meaningless color choices
→ Para tu caso: expose semantic tone props (base/subtle/critical/warning/success) in addition to a color escape hatch; tokens-first for regular use, escape hatch for edge cases

**"¿Fixed icon vocabulary or extensible?"**
→ Fixed/curated (Polaris ~300, Atlassian ~400): visual consistency; prevents icon proliferation → Extensible (Ant Design iconfont.cn, Chakra createIcon, Carbon full imports): teams add domain-specific icons without forking → Para tu caso: curated core set + extension mechanism; provide `createIcon` or equivalent to register custom icons without bypassing the wrapper component

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Icon + text label | Icon decorative; adjacent text is the accessible label | Buttons, menu items, nav links | All systems |
| Icon-only button | Button with aria-label; icon is aria-hidden | Toolbar actions, close buttons, compact UIs | All systems |
| Semantic tone color | Icon color maps to semantic token (critical, warning, success) | Status indicators, form validation | Polaris, Atlassian, Carbon |
| Two-tone/filled state | Icon switches Outlined→Filled on hover/selection | Navigation active states | Fluent 2 bundleIcon, Ant Design TwoTone |
| Optical size compensation | Stroke weight automatically adjusts at small sizes | Variable icon sizes in same context | M3 Material Symbols |

**Wireframe — decorative icon with label (button):**
```
[  💾 Save changes  ]   ← icon is aria-hidden; "Save changes" is the accessible name

[  🗑️ Delete  ]         ← icon is aria-hidden; "Delete" is the accessible name
```

**Wireframe — icon-only button (correct):**
```
<button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />     ← aria-hidden on icon; accessible name on button
</button>
```

**Wireframe — informative standalone icon (status):**
```
<span role="img" aria-label="Error: email is invalid">
  ⚠                    ← role="img" on wrapper; icon conveys meaning without adjacent text
</span>
```

**Wireframe — icon size comparison:**
```
16px: ◉  ← thicker strokes, simpler detail (Carbon 16px / M3 optical size 20)
24px: ◎  ← medium strokes, standard detail (Carbon 24px)
32px: ○  ← finer strokes, more detail (Carbon 32px / M3 optical size 48)
```

---

## Risks to Consider

**Icon-only buttons without accessible labels** (HIGH) — the most common icon a11y failure; close buttons, toolbar actions, and icon-only nav items that have no `aria-label` on the button container; mitigation: lint for `<button>` elements containing only icon components without an `aria-label` or visually-hidden text child

**Decorative icons in forms announcing status via color only** (HIGH) — validation checkmark (green ✓) and error icon (red ✗) that are `aria-hidden` when they should be informative, or vice versa; the `aria-invalid` and `aria-describedby` on the field must carry the semantic meaning if the icons are decorative; mitigation: establish a clear rule — if the icon color encodes semantic meaning (status, severity), it needs an accessible label unless the adjacent text already conveys the same meaning

**Icon font accessibility vs. SVG** (MEDIUM) — icon fonts (M3, Playbook/Font Awesome) use ligature text that screen readers may announce unless aria-hidden is explicitly set; SVG icons are easier to control; mitigation: always add `aria-hidden="true"` to icon font elements; prefer SVG components over icon fonts for new implementations

---

## Dimension Scores

| Dimension | M3 Material Symbols | Carbon | Fluent 2 | Polaris | Atlassian | Paste |
|-----------|-------------------|--------|----------|---------|-----------|-------|
| Library size | 5/5 | 4/5 | 5/5 | 2/5 | 3/5 | 3/5 |
| A11y enforcement | 3/5 | 5/5 | 4/5 | 4/5 | 5/5 | 5/5 |
| Visual quality | 5/5 | 5/5 | 5/5 | 4/5 | 4/5 | 4/5 |
| Token integration | 3/5 | 4/5 | 5/5 | 5/5 | 4/5 | 5/5 |
| Extensibility | 4/5 | 3/5 | 4/5 | 2/5 | 2/5 | 3/5 |

---

## Next Steps

```
/spec icon      → outputs/icon-config.json
/enrich icon    → a11y tokens + interaction spec
/build icon     → full pipeline in one command
/build icon --max  → use pre-generated config
```
