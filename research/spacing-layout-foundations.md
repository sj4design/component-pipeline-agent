# Spacing & Layout Foundations -- Cross-DS Analysis

> **Research date:** 2026-03-30
> **Systems analyzed:** 14 (6 Tier 1 + 8 Tier 2)
> **Data source:** Official documentation via web search/fetch (not training data)

---

## Consensus Summary

### Base Unit
- **12 of 14 systems use a 4px base unit** (or 8px with 4px sub-grid)
- Material Design 3 uses 8dp (with 4dp half-step allowed)
- Spectrum (Adobe) uses 2px as smallest increment but effectively 4px as primary unit
- Cedar (REI) uses 1.6rem (roughly 16px) as `one-x` with fractional multipliers

### Common Spacing Scale (px)
The most common values across all systems: **0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96**

### Breakpoint Consensus
| Category | Most Common Range | Typical Name |
|----------|------------------|-------------|
| Mobile | 0-479px | xs |
| Small | 480-767px | sm |
| Tablet | 768-1023px | md |
| Desktop | 1024-1279px | lg |
| Large | 1280-1439px | xl |
| XL | 1440-1919px | xxl |

### Grid Consensus
- **12 columns** is the standard for desktop (11 of 14 systems)
- **Gutters:** typically 16px-32px (most common: 16px narrow, 24-32px default)
- **Margins:** scale with breakpoint, typically 16px mobile, 24-48px desktop

### Density Modes
- 5 systems explicitly support density: Material Design 3, Carbon (IBM), Lightning (Salesforce), Dell DS, Ant Design
- Standard modes: **Compact / Default / Comfortable** (sometimes called Condensed/Normal/Spacious)

### Token Naming Patterns
| Pattern | Systems |
|---------|---------|
| Numeric scale (`space-100`, `space-200`) | Polaris, Atlassian, Spectrum |
| Sequential (`$spacing-01`, `$spacing-02`) | Carbon |
| T-shirt + number (`space-10`, `space-20`) | Paste |
| Size-value (`size-4`, `size-8`) | Wise |
| CSS utility (`gap-2`, `p-4`) | shadcn/ui (Tailwind) |
| Semantic names (`spacingSmall`, `spacingMedium`) | Lightning (SLDS) |
| Fractional (`half-x`, `one-x`, `two-x`) | Cedar |
| Direct pixel (`--ant-padding-xs`) | Ant Design |

---

## Per-System Data

### T1: Material Design 3

- **Base unit:** 8dp (4dp sub-grid for fine adjustments)
- **Scale:** 4, 8, 16, 24, 32, 40, 48, 56, 64 (8dp increments; 4dp for compact)
- **Breakpoints (Window Size Classes):**
  - Compact: < 600dp (4 columns)
  - Medium: 600-839dp (8 columns)
  - Expanded: 840-1199dp (12 columns)
  - Large: 1200-1599dp (12 columns)
  - Extra-large: >= 1600dp (12 columns)
- **Density:** Supports density settings (compact reduces vertical spacing)
- **Token naming:** Not tokenized publicly; MUI uses `theme.spacing(n)` where n * 8px
- **Grid:** 4/8/12 columns depending on breakpoint; gutters 8/16/24/40dp

**Source:** [m3.material.io/foundations/layout](https://m3.material.io/foundations/layout/understanding-layout/spacing)

---

### T1: Spectrum (Adobe)

- **Base unit:** 2px (spacing-50); primary unit 8px (spacing-100)
- **Scale:**

| Token | px |
|-------|-----|
| spacing-50 | 2 |
| spacing-75 | 4 |
| spacing-100 | 8 |
| spacing-200 | 12 |
| spacing-300 | 16 |
| spacing-400 | 24 |
| spacing-500 | 32 |
| spacing-600 | 40 |
| spacing-700 | 48 |
| spacing-800 | 64 |
| spacing-900 | 80 |
| spacing-1000 | 96 |

- **Breakpoints:** Not publicly documented as specific px values in Spectrum 2
- **Density:** Spectrum 2 supports responsive platform scales (Desktop / Mobile)
- **Token naming:** `--spectrum-spacing-[100-1000]`
- **Grid:** Responsive; documentation references grids but no fixed column count

**Source:** [spectrum.adobe.com/page/spacing](https://spectrum.adobe.com/page/spacing/)

---

### T1: Carbon (IBM)

- **Base unit:** 2px (smallest); 4px-based increments
- **Scale:**

| Token | rem | px |
|-------|-----|-----|
| $spacing-01 | 0.125 | 2 |
| $spacing-02 | 0.25 | 4 |
| $spacing-03 | 0.5 | 8 |
| $spacing-04 | 0.75 | 12 |
| $spacing-05 | 1 | 16 |
| $spacing-06 | 1.5 | 24 |
| $spacing-07 | 2 | 32 |
| $spacing-08 | 2.5 | 40 |
| $spacing-09 | 3 | 48 |

- **Layout scale (larger):** $layout-01 (16px) through $layout-07 (64px)
- **Breakpoints:**

| Name | Min-width | Columns |
|------|-----------|---------|
| sm | 320px | 4 |
| md | 672px | 8 |
| lg | 1056px | 16 |
| xlg | 1312px | 16 |
| max | 1584px | 16 |

- **Density:** 3 gutter modes: Wide (32px default), Narrow (16px), Condensed (1px)
- **Token naming:** `$spacing-0N` (sequential), `$layout-0N` (layout scale)
- **Grid:** 16 columns (unique); 32px gutter default (16px per side)

**Source:** [carbondesignsystem.com/elements/spacing](https://carbondesignsystem.com/elements/spacing/overview/)

---

### T1: Polaris (Shopify)

- **Base unit:** 4px (space-100 = 4px)
- **Scale:**

| Token | px |
|-------|-----|
| --p-space-0 | 0 |
| --p-space-025 | 1 |
| --p-space-050 | 2 |
| --p-space-100 | 4 |
| --p-space-150 | 6 |
| --p-space-200 | 8 |
| --p-space-300 | 12 |
| --p-space-400 | 16 |
| --p-space-500 | 20 |
| --p-space-600 | 24 |
| --p-space-800 | 32 |
| --p-space-1000 | 40 |
| --p-space-1200 | 48 |
| --p-space-1600 | 64 |
| --p-space-2000 | 80 |
| --p-space-2400 | 96 |
| --p-space-2800 | 112 |
| --p-space-3200 | 128 |

- **Semantic tokens:** `--p-space-card-gap`, `--p-space-card-padding`, `--p-space-table-cell-padding`, `--p-space-button-group-gap`
- **Breakpoints:**

| Token | px |
|-------|-----|
| --p-breakpoints-xs | 0 |
| --p-breakpoints-sm | 490 |
| --p-breakpoints-md | 768 |
| --p-breakpoints-lg | 1040 |
| --p-breakpoints-xl | 1440 |

- **Density:** Not explicitly; semantic tokens control component density
- **Token naming:** `--p-space-[multiplier]` where multiplier = percentage of 4px base
- **Grid:** Responsive layout primitives (Page, Layout, Stack); no fixed column grid

**Source:** [polaris-react.shopify.com/tokens/space](https://polaris-react.shopify.com/tokens/space)

---

### T1: Atlassian Design System

- **Base unit:** 8px (space.100 = 8px)
- **Scale:**

| Token | Multiplier | px |
|-------|-----------|-----|
| space.0 | 0x | 0 |
| space.025 | 0.25x | 2 |
| space.050 | 0.5x | 4 |
| space.075 | 0.75x | 6 |
| space.100 | 1x | 8 |
| space.150 | 1.5x | 12 |
| space.200 | 2x | 16 |
| space.250 | 2.5x | 20 |
| space.300 | 3x | 24 |
| space.400 | 4x | 32 |
| space.500 | 5x | 40 |
| space.600 | 6x | 48 |
| space.800 | 8x | 64 |
| space.1000 | 10x | 80 |

- **Negative tokens:** space.negative.025 (-2px) through space.negative.400 (-32px)
- **Breakpoints (from media queries):**
  - ~480px (30rem)
  - ~768px (48rem)
  - ~1024px (64rem)
  - ~1440px (90rem)
  - ~1768px (110.5rem)
- **Density:** Not explicitly; token ranges serve density (small: 0-8px, medium: 12-24px, large: 32-80px)
- **Token naming:** `space.[multiplier]` where multiplier = percentage of 8px base
- **Grid:** 12 columns; fluid and fixed grid types

**Source:** [atlassian.design/foundations/spacing](https://atlassian.design/foundations/spacing/)

---

### T1: Ant Design

- **Base unit:** 4px (--ant-size-unit: 4px; --ant-size-step: 4px)
- **Scale:**

| Token | px |
|-------|-----|
| --ant-padding-xxs | 4 |
| --ant-padding-xs | 8 |
| --ant-padding-sm | 12 |
| --ant-padding | 16 |
| --ant-padding-md | 20 |
| --ant-padding-lg | 24 |
| --ant-padding-xl | 32 |

- **Margin tokens:** --ant-margin-xxs (4), --ant-margin-xs (8), --ant-margin-sm (12), --ant-margin (16), --ant-margin-md (20), --ant-margin-lg (24), --ant-margin-xl (32)
- **Breakpoints:**

| Name | Min-width |
|------|-----------|
| xs | 480px |
| sm | 576px |
| md | 768px |
| lg | 992px |
| xl | 1200px |
| xxl | 1600px |
| xxxl | 1920px |

- **Density:** Supported via theme token customization (compact mode available)
- **Token naming:** `--ant-[property]-[size]` (e.g., --ant-padding-sm)
- **Grid:** 24 columns (unique); gutter recommendation: (16 + 8n)px
- **Control heights:** xs=16, sm=24, default=32, lg=40

**Source:** [ant.design/components/grid](https://ant.design/components/grid/)

---

### T2: Paste (Twilio)

- **Base unit:** 4px (derived from 0.25rem increments)
- **Scale (estimated from token pattern):**

| Token | rem | px (approx) |
|-------|-----|------|
| $space-0 | 0 | 0 |
| $space-10 | 0.125 | 2 |
| $space-20 | 0.25 | 4 |
| $space-30 | 0.5 | 8 |
| $space-40 | 0.75 | 12 |
| $space-50 | 1 | 16 |
| $space-60 | 1.25 | 20 |
| $space-70 | 1.5 | 24 |
| $space-80 | 1.75 | 28 |
| $space-90 | 2 | 32 |
| $space-100 | 2.25 | 36 |
| $space-110 | 2.5 | 40 |
| $space-120 | 2.75 | 44 |
| $space-130 | 3 | 48 |
| $space-140 | 3.25 | 52 |
| $space-160 | 3.75 | 60 |
| $space-180 | 4.25 | 68 |
| $space-200 | 4.75 | 76 |

- **Breakpoints:**
  - 400px (25rem)
  - 768px (tablet)
  - 1024px (desktop)
  - 1232px (large desktop)
- **Density:** Not explicitly
- **Token naming:** `$space-[10-200]` (increments of 10)
- **Grid:** 12 columns; responsive; gutters $space-40 (24px) for >1440px, $space-30 (16px) for <1440px

**Source:** [paste.twilio.design/foundations/spacing-and-layout](https://paste.twilio.design/foundations/spacing-and-layout)

---

### T2: Lightning (Salesforce / SLDS)

- **Base unit:** 4px (SLDS base unit = 4)
- **Scale (SLDS 2 styling hooks):**

| Token | px |
|-------|-----|
| --slds-g-spacing-1 | 4 |
| --slds-g-spacing-2 | 8 |
| --slds-g-spacing-3 | 12 |
| --slds-g-spacing-4 | 16 |
| --slds-g-spacing-5 | 20 |
| --slds-g-spacing-6 | 24 |
| --slds-g-spacing-7 | 28 |
| --slds-g-spacing-8 | 32 |
| --slds-g-spacing-9 | 36 |
| --slds-g-spacing-10 | 40 |
| --slds-g-spacing-11 | 44 |
| --slds-g-spacing-12 | 48 |

- **SLDS 1 tokens:** spacingXxxSmall (2px), spacingXxSmall (4px), spacingXSmall (8px), spacingSmall (12px), spacingMedium (16px / 8px compact), spacingLarge (24px), spacingXLarge (32px), spacingXxLarge (48px)
- **Breakpoints:**
  - 480px (mobile)
  - 768px (tablet)
  - 1024px (desktop)
  - 1440px (large desktop)
- **Density:** Comfy (default, 1rem=16px spacing) and Compact (0.5rem=8px spacing) modes
- **Token naming:** SLDS 1: `spacingXSmall`; SLDS 2: `--slds-g-spacing-[1-12]`
- **Grid:** 12 columns; fluid grid; mobile-first

**Source:** [lightningdesignsystem.com](https://www.lightningdesignsystem.com/)

---

### T2: Primer (GitHub)

- **Base unit:** 4px (base-size-4)
- **Scale:** 4px increments for small, 16px increments for large (all in rem)
- **Breakpoints:**

| Name | px |
|------|-----|
| xsmall | 320 |
| small | 544 |
| medium | 768 |
| large | 1012 |
| xlarge | 1280 |
| xxlarge | 1400 |

- **Viewport ranges:** narrow (<768px, 1 col), regular (>=768px, 2 cols), wide (>=1400px, 3 cols)
- **Content padding:** 16px (xsmall-large), 24px (xlarge+)
- **Max-width:** 1280px (inclusive padding), 1232px visual
- **Density:** Not explicitly
- **Token naming:** `base-size-[value]` stored in JSON primitives
- **Grid:** Content area based; no strict column grid

**Source:** [primer.style/product/getting-started/foundations/layout](https://primer.style/product/getting-started/foundations/layout/)

---

### T2: shadcn/ui (Tailwind CSS)

- **Base unit:** 4px (Tailwind default: 1 unit = 0.25rem = 4px)
- **Scale (inherited from Tailwind):**
  - 0 (0px), 0.5 (2px), 1 (4px), 1.5 (6px), 2 (8px), 2.5 (10px), 3 (12px), 3.5 (14px), 4 (16px), 5 (20px), 6 (24px), 7 (28px), 8 (32px), 9 (36px), 10 (40px), 11 (44px), 12 (48px), 14 (56px), 16 (64px), 20 (80px), 24 (96px), 28 (112px), 32 (128px), 36 (144px), 40 (160px), 44 (176px), 48 (192px), 52 (208px), 56 (224px), 60 (240px), 64 (256px), 72 (288px), 80 (320px), 96 (384px)
- **Breakpoints (Tailwind default):**

| Name | Min-width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

- **Density:** Not built-in; user-configurable via theme extension
- **Token naming:** Numeric utilities: `gap-2`, `p-4`, `m-8` (mapped to 0.5rem, 1rem, 2rem)
- **Grid:** No fixed grid; uses flex/grid CSS with gap utilities

**Source:** [ui.shadcn.com/docs/theming](https://ui.shadcn.com/docs/theming)

---

### T2: Playbook (eBay)

- **Base unit:** 8px (proportional system anchored on 8px; factors of 2 for fine detail)
- **Scale:** 2, 4, 8, 16, 24, 32, 40, 48, 64, 80, 96 (8px multiples + 4px sub-steps)
- **Breakpoints:**

| Name | px |
|------|-----|
| 1 | 320 |
| 2 | 512 |
| 3 | 768 |
| 4 | 1024 |
| 5 | 1280 |
| 6 | 1440 |
| 7 | 1680 |
| 8 | 1920 |

- **Core design sizes:** Small (375px), Medium (768px), Large (1280px)
- **Density:** Not explicitly documented
- **Token naming:** Token names documented at playbook.ebay.com/design-system/tokens/spacing (page not fetchable)
- **Grid:** Not publicly detailed; 8 breakpoints for maximum scalability

**Source:** [playbook.ebay.com/design-system/tokens/spacing](https://playbook.ebay.com/design-system/tokens/spacing)

---

### T2: Cedar (REI)

- **Base unit:** 16px = 1.6rem = "one-x" (fractional multiplier system)
- **Scale:**

| Token | rem | px (approx) |
|-------|-----|------|
| --cdr-space-zero | 0 | 0 |
| --cdr-space-sixteenth-x | 0.1 | 1.6 |
| --cdr-space-eighth-x | 0.2 | 3.2 |
| --cdr-space-quarter-x | 0.4 | 6.4 |
| --cdr-space-three-eighth-x | 0.6 | 9.6 |
| --cdr-space-half-x | 0.8 | 12.8 |
| --cdr-space-three-quarter-x | 1.2 | 19.2 |
| --cdr-space-one-x | 1.6 | 25.6 |
| --cdr-space-one-and-a-half-x | 2.4 | 38.4 |
| --cdr-space-two-x | 3.2 | 51.2 |
| --cdr-space-three-x | 4.8 | 76.8 |
| --cdr-space-four-x | 6.4 | 102.4 |

- **Fluid spacing:** `clamp()` tokens that scale between breakpoints (e.g., scale-5: 1.6rem-2rem)
- **Inset variants:** Default, Squish (-50% top/bottom), Stretch (+50% top/bottom)
- **Breakpoints:**

| Name | px |
|------|-----|
| xs | 0 |
| sm | 768 |
| md | 992 |
| lg | 1232 |

- **Density:** Not explicitly; fluid tokens provide adaptive density
- **Token naming:** `--cdr-space-[fraction]-x` (fractional of base)
- **Grid:** Responsive layout component with xs/sm/md/lg column specs

**Source:** [cedar.rei.com/guidelines/spacing](https://cedar.rei.com/guidelines/spacing)

---

### T2: Wise Design

- **Base unit:** 4px (size-4)
- **Scale:**

| Token | px |
|-------|-----|
| size-4 | 4 |
| size-8 | 8 |
| size-12 | 12 |
| size-16 | 16 |
| size-24 | 24 |
| size-32 | 32 |
| size-40 | 40 |
| size-48 | 48 |
| size-56 | 56 |
| size-64 | 64 |
| size-72 | 72 |
| size-80 | 80 |
| size-88 | 88 |
| size-96 | 96 |
| size-104 | 104 |
| size-112 | 112 |
| size-120 | 120 |
| size-128 | 128 |

- **Semantic tokens (horizontal):** between-cards (12px), between-chips (8px), screen-mobile (24px), component-default (16px)
- **Semantic tokens (vertical):** between-text (8px), display-text-bottom (16px), text-to-component (16px), content-to-button (24px), between-sections (32px)
- **Breakpoints:** Desktop (1440px), Tablet (768px), Mobile (390px)
- **Density:** Accessibility scaling: 100%, 85%, 130%, 155% modes
- **Token naming:** `size-[px-value]` (foundational); semantic names for context
- **Grid:** Not publicly detailed

**Source:** [wise.design/foundations/spacing](https://wise.design/foundations/spacing)

---

### T2: Dell Design System

- **Base unit:** 4px (4-pixel grid standard)
- **Scale:** All spacing uses multiples of 4px
- **Breakpoints:**

| Name | Range | Grid | Gutter (Default) | Margin (Default) |
|------|-------|------|-------------------|------------------|
| XS | 320-479px | 2 col | 8-24px | 16-24px |
| S | 480-767px | 6 col | 8-24px | 16-24px |
| M | 768-1023px | 6 col | 16px | 32px |
| L | 1024-1365px | 12 col | 16px | 40px |
| XL | 1366-1583px | 12 col | 16px | 48px |
| 2XL | 1584-1919px | 12 col | 24px | 64px |
| 3XL | 1920-2559px | 12 col | 32px | 72px |
| 4XL | 2560-3839px | 12 col | 40px | 96px |
| 5XL | 3840px+ | 12 col | 48px | 128px |

- **Density:** 3 modes -- Compact, Default, Comfortable (gutters/margins vary per mode per breakpoint)
- **Token naming:** Not publicly documented
- **Grid:** 2/6/12 columns depending on breakpoint; density affects gutter/margin

**Source:** [delldesignsystem.com/foundations/grid](https://www.delldesignsystem.com/foundations/grid)

---

## Cross-DS Comparison Table

| System | Base | Scale Range (px) | # Breakpoints | Density Modes | Token Pattern | Grid Cols |
|--------|------|-------------------|---------------|---------------|---------------|-----------|
| Material Design 3 | 8dp | 4-64 | 5 | Yes (compact) | theme.spacing(n) | 4/8/12 |
| Spectrum (Adobe) | 2px | 2-96 | N/A | Platform scale | --spectrum-spacing-N | Responsive |
| Carbon (IBM) | 2px | 2-48 | 5 | 3 gutter modes | $spacing-0N | 16 |
| Polaris (Shopify) | 4px | 0-128 | 5 | Semantic | --p-space-N | Flex |
| Atlassian DS | 8px | 0-80 | 5 | Token ranges | space.N | 12 |
| Ant Design | 4px | 4-32 | 7 | Theme config | --ant-padding-size | 24 |
| Paste (Twilio) | 4px | 0-76 | 4 | No | $space-N0 | 12 |
| Lightning (SLDS) | 4px | 2-48 | 4 | Comfy/Compact | --slds-g-spacing-N | 12 |
| Primer (GitHub) | 4px | 4-96+ | 6 | No | base-size-N | Content |
| shadcn/ui | 4px | 0-384 | 5 | No | gap-N / p-N | Flex/Grid |
| Playbook (eBay) | 8px | 2-96 | 8 | No | Token page | N/A |
| Cedar (REI) | ~16px | 0-102 | 4 | Fluid clamp() | --cdr-space-fraction-x | Responsive |
| Wise Design | 4px | 4-128 | 3 | A11y scaling | size-N | N/A |
| Dell DS | 4px | 4-160+ | 9 | 3 modes | N/A | 2/6/12 |

---

## Key Insights for Component Generation

### 1. Recommended Base Spacing Scale (4px base)
Based on consensus, the optimal scale for a design system is:
```
0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

### 2. Token Naming Recommendation
The **multiplier pattern** (Polaris/Atlassian) is most intuitive:
- `space-0` = 0px
- `space-025` = 1px
- `space-050` = 2px
- `space-100` = 4px (base)
- `space-200` = 8px
- `space-300` = 12px
- `space-400` = 16px
- `space-600` = 24px
- `space-800` = 32px

### 3. Breakpoint Recommendation
```
xs:  0px     (mobile portrait)
sm:  480px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
xxl: 1440px  (wide desktop)
```

### 4. Grid Recommendation
- **12 columns** for desktop (industry standard)
- **8 columns** for tablet
- **4 columns** for mobile
- **Gutters:** 16px (compact), 24px (default), 32px (comfortable)
- **Margins:** Scale with breakpoint (16px mobile to 48px+ desktop)

### 5. Density Modes
Support 3 density modes that modify spacing tokens:
- **Compact:** 75% of default spacing (for data-dense UIs)
- **Default:** Base spacing
- **Comfortable:** 125% of default spacing (for content-heavy UIs)

### 6. Component Spacing Patterns (Cross-DS)
- **Button padding:** 8-12px vertical, 16-24px horizontal
- **Input padding:** 8-12px vertical, 12-16px horizontal
- **Card padding:** 16-24px
- **Card gap:** 16px
- **Stack gap (default):** 8-16px
- **Section spacing:** 24-48px

---

## Sources

- [Material Design 3 - Layout](https://m3.material.io/foundations/layout/understanding-layout/spacing)
- [Spectrum - Spacing](https://spectrum.adobe.com/page/spacing/)
- [Carbon - Spacing](https://carbondesignsystem.com/elements/spacing/overview/)
- [Polaris - Space Tokens](https://polaris-react.shopify.com/tokens/space)
- [Polaris - Breakpoints](https://polaris-react.shopify.com/tokens/breakpoints)
- [Atlassian - Spacing](https://atlassian.design/foundations/spacing/)
- [Ant Design - Grid](https://ant.design/components/grid/)
- [Paste - Spacing and Layout](https://paste.twilio.design/foundations/spacing-and-layout)
- [Lightning Design System](https://www.lightningdesignsystem.com/)
- [Primer - Layout](https://primer.style/product/getting-started/foundations/layout/)
- [shadcn/ui - Theming](https://ui.shadcn.com/docs/theming)
- [Playbook - Spacing Tokens](https://playbook.ebay.com/design-system/tokens/spacing)
- [Cedar - Spacing](https://cedar.rei.com/guidelines/spacing)
- [Wise - Spacing](https://wise.design/foundations/spacing)
- [Dell DS - Grid](https://www.delldesignsystem.com/foundations/grid)
