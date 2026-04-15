---
component: icon
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Icon — All Systems Digest

## Material Design 3
**Approach**: Material Symbols — a single variable font with four axes (fill, weight, grade, optical size). Replaces the older Material Icons static icon font. Over 3,000 symbols available in three styles: Outlined, Rounded, Sharp. Icons are delivered as a variable font or as individual SVGs. Size scale aligns with text: 20dp (default), 24dp, 40dp, 48dp via optical size axis. Color inherits from parent text color by default.
**Key decisions**:
- [HIGH] Variable font with continuous axes (fill 0–1, weight 100–700, grade -25–200, optical size 20–48); enables smooth transitions and precise visual tuning without loading separate icon files — one font file serves all visual variants
- [HIGH] Optical size axis adjusts stroke weight and detail at small/large sizes; a 20dp icon has thicker strokes for legibility while a 48dp icon has finer detail — prevents the "too thin at small size" problem that plagues single-weight icon sets
- [MED] Three style families (Outlined/Rounded/Sharp) as separate font files, not an axis; prevents accidental style mixing within a product while still allowing cross-product differentiation
**Notable API:** `<span class="material-symbols-outlined">icon_name</span>`; CSS `font-variation-settings` for fill, weight, grade, optical size; also available as `<svg>` or `<img>` per icon
**A11y:** Decorative icons: `aria-hidden="true"` on icon element. Informative icons: wrap in element with `role="img"` and `aria-label`. Icon fonts use ligatures (text "search" renders as search icon) — screen readers read the ligature text unless hidden.
**Best at:** Continuous visual customization via variable font axes; optical size compensation; massive icon library. **Missing:** Requires font loading infrastructure; variable font file is ~2MB; no React component abstraction in core library.

## Spectrum (Adobe)
**Approach**: Workflow icons (UI actions) and product icons (app identity) as separate SVG libraries. Workflow icons are 18/24px with 1.5px stroke. All icons packaged as individual SVG files and as React/web components via `@spectrum-css/icon` and `@adobe/react-spectrum`. Icon component wraps SVG with size normalization and ARIA handling. Color inherits via CSS `currentColor`.
**Key decisions**:
- [HIGH] Workflow vs. product icon separation; UI action icons need pixel-perfect clarity at small sizes while product icons need brand expression at larger sizes — different design constraints require different libraries
- [HIGH] `currentColor` inheritance as default; icon color follows parent text color automatically — ensures icons match surrounding typography without manual color assignment in every instance
- [MED] Fixed size scale (S/M/L/XL mapping to specific pixel values) rather than arbitrary sizing; prevents icons from being rendered at non-optimized sizes that would cause sub-pixel blurring
**Notable API:** `<Icon src={IconName} size="M" />` (React); `size` (S|M|L|XL); `alt` for accessible label; `UNSAFE_className` for custom styling; `slot` for placement in parent components
**A11y:** If `alt` provided: `role="img"` + `aria-label` applied automatically. If no `alt`: `aria-hidden="true"` applied. Parent component (Button, Menu) should provide context when icon is decorative within it.
**Best at:** Systematic separation of workflow vs. product icons; automatic ARIA handling based on alt prop presence. **Missing:** No variable weight/fill customization; no icon font option; limited to Adobe's curated set without easy extension.

## Carbon (IBM)
**Approach**: Over 2,000 SVG icons at four fixed sizes (16/20/24/32px). Each size is a separately optimized SVG (not scaled from one master). Delivered as React components, Vue components, and raw SVGs. Icon component accepts `size` and renders the size-specific SVG. Color via `fill` prop or CSS `currentColor`. Pictograms (larger illustrative icons, 32/48/64px) are a separate package.
**Key decisions**:
- [HIGH] Size-specific SVG optimization; each icon is hand-tuned at 16, 20, 24, and 32px — pixel grid alignment is guaranteed at each size rather than relying on browser scaling of a single SVG
- [HIGH] Icons as individually tree-shakeable React components (`import { Add } from '@carbon/icons-react'`); only used icons ship in the bundle — critical for IBM's enterprise apps where bundle size directly impacts load time
- [MED] Pictograms as separate package from UI icons; prevents misuse of illustrative pictograms in action contexts and vice versa
**Notable API:** `<Add size={24} aria-label="Add item" />`; `size` (16|20|24|32); `aria-label` for informative; `aria-hidden` for decorative; `fill` for color override; `className`; `tabIndex`
**A11y:** All icons default to `aria-hidden="true"` (decorative). When `aria-label` is provided, icon gets `role="img"` automatically. `<title>` element added inside SVG when labeled. Focused icon gets `focusable="true"`.
**Best at:** Size-specific pixel optimization; tree-shakeable imports; clear decorative-by-default a11y model. **Missing:** No continuous sizing (locked to 4 sizes); no weight/fill variation; no icon font delivery option.

## Polaris (Shopify)
**Approach**: Curated set of ~300 Polaris icons designed specifically for Shopify admin. Two sizes: minor (20px, inline with text) and major (24px, standalone or navigation). Delivered as React components. `Icon` component wraps any icon source SVG. Color controlled via `tone` prop mapping to semantic Polaris color tokens. External icons supported via `source` prop accepting SVG markup.
**Key decisions**:
- [HIGH] Curated small icon set (~300) over massive library; Shopify admin has finite UI patterns — a focused set ensures visual consistency and prevents icon choice paralysis across thousands of merchants building with Polaris
- [HIGH] `tone` prop maps to semantic tokens (base/subdued/caution/warning/critical/interactive/success/primary/magic/textInverse); icons carry semantic meaning through color system rather than arbitrary hex values
- [MED] Minor/major size distinction designed around admin typography; minor icons sit inline with 14px body text, major icons anchor navigation items — two sizes cover 95% of merchant admin needs
**Notable API:** `<Icon source={SearchIcon} tone="base" />`; `source` (Polaris icon component or custom SVG); `tone` (base|subdued|caution|warning|critical|interactive|success|primary|magic|textInverse); `accessibilityLabel`
**A11y:** If `accessibilityLabel` provided: `role="img"` + `aria-label`. If omitted: `aria-hidden="true"`. Icon component warns in dev mode if no label provided and icon is not within a labeled parent.
**Best at:** Semantic tone system for icon coloring; tight integration with Shopify admin design language; dev warnings for missing a11y labels. **Missing:** Only two sizes; no weight variation; small curated set limits use outside Shopify context.

## Atlassian
**Approach**: Icon package (`@atlaskit/icon`) with ~400 icons at 16/24px (small/medium). Icons are React components wrapping SVGs. `primaryColor` and `secondaryColor` props for two-tone icons (unique among Tier 1). New icons system migrating to `@atlaskit/icon/core` with MVVM pattern. `label` prop controls accessibility — required decision point at every usage.
**Key decisions**:
- [HIGH] Two-tone color system (`primaryColor`/`secondaryColor`); Jira and Confluence use colored icons where the fill and stroke need independent control — enables status-colored icon fills while keeping strokes consistent
- [HIGH] `label` prop as the single a11y control point; if label is a string, icon is informative with `role="img"` + `aria-label`; if label is empty string, icon is decorative with `aria-hidden="true"` — forces developers to make an explicit accessibility decision
- [MED] Migration from legacy icon set to new core icons with glyphs (raw SVG paths) and utility icons; acknowledges that the original icon API accumulated inconsistencies across years of Jira/Confluence development
**Notable API:** `<AddIcon label="Add item" primaryColor="blue" secondaryColor="white" size="medium" />`; `label` (string = informative, "" = decorative); `size` (small|medium); `primaryColor`; `secondaryColor`; `LEGACY_fallbackIcon`
**A11y:** `label` prop is the single accessibility mechanism. Non-empty string: `role="img"` + `aria-label`. Empty string: `aria-hidden="true"`. ESLint rules enforce that `label` is always explicitly set (not accidentally omitted).
**Best at:** Forced explicit a11y decision via required label prop; two-tone color control for status-colored icons. **Missing:** Only two sizes; no weight/fill variation; legacy-to-new migration creates two parallel icon systems.

## Ant Design
**Approach**: 800+ icons in three themes: Outlined (default), Filled, and TwoTone. Delivered as React components via `@ant-design/icons`. Icons are tree-shakeable individual imports. TwoTone icons support `twoToneColor` prop for the secondary color. `createFromIconfontCN` factory function creates icon components from Alibaba's iconfont.cn platform for custom icon sets. `spin` prop for loading indicators.
**Key decisions**:
- [HIGH] Three themes as separate icon components (`HeartOutlined`/`HeartFilled`/`HeartTwoTone`); theme is part of the component name, not a prop — eliminates runtime theme switching bugs and enables static analysis of which icon variant is used
- [HIGH] `createFromIconfontCN` for custom icon sets from iconfont.cn; integrates with Alibaba's massive icon ecosystem — teams can mix Ant's built-in icons with custom sets from a unified platform
- [MED] `spin` prop built into base Icon component; avoids CSS class juggling for the extremely common loading spinner use case
**Notable API:** `<HeartOutlined style={{ fontSize: 24, color: 'red' }} />`; `spin` (boolean); `rotate` (degrees); `twoToneColor` (for TwoTone theme); `component` (custom SVG component); `createFromIconfontCN({ scriptUrl })` factory
**A11y:** Icons render as `<span role="img" aria-label="heart">` when used standalone. `aria-label` defaults to icon name. No automatic decorative detection — all icons get role="img" by default, which can create screen reader noise for decorative icons. Developers must manually add `aria-hidden="true"` for decorative use.
**Best at:** Theme-as-component-name pattern; iconfont.cn integration for custom icon libraries; built-in spin/rotate transforms. **Missing:** No automatic decorative icon detection (all icons announced by default); no size prop (uses CSS fontSize); no optical size optimization.
