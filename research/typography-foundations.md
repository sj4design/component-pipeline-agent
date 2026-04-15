# Typography Foundations -- Cross-DS Analysis

> Research date: 2026-03-30
> Sources: 14 design systems (6 Tier 1, 8 Tier 2)
> Method: Web search + official documentation fetch

---

## Consensus Summary

### Body Text
- **Consensus body size: 14px-16px**. Most systems use 14px (Ant, Carbon, Polaris, Atlassian, Wise, eBay) or 16px (Material, Spectrum, Cedar) as the primary body size. 14px is more common in dense enterprise UIs; 16px in consumer/marketing contexts.
- **Secondary body: 12px** is universally available as a small/caption size.
- **Large body: 16px-18px** when 14px is the base.

### Headings
- **H1 equivalent: 28px-40px** (most land at 32px-36px).
- **H2: 24px-28px**, **H3: 20px-24px**, **H4: 16px-20px**.
- **Display sizes: 36px-128px** (used for marketing/hero, not product UI).

### Line Height
- **Body text: 1.4x-1.5x** font size (consensus ~1.5).
- **Headings: 1.2x-1.3x** font size.
- Values rounded to 4px grid in most modern systems.

### Font Weight
- **Regular (400)** for body copy.
- **Medium (500)** or **Semi-bold (600)** for emphasis, labels, headings.
- **Bold (700)** used sparingly (eBay, shadcn).
- Some systems use non-standard weights: Polaris (450/550/650), Atlassian (653).

### Font Stacks
- **Sans-serif dominance**: Inter (Polaris, Atlassian, Wise), Roboto/Google Sans (Material), system fonts (Primer), custom typefaces (IBM Plex, Salesforce Sans, Adobe Clean, Market Sans, Twilio Sans).
- **Monospace**: IBM Plex Mono, JetBrains Mono (Atlassian), SFMono/Consolas (Primer, Polaris), Source Code Pro (Spectrum).

### Token Naming Patterns
- **Numeric scale (T-shirt alternative)**: `font-size-100` (Spectrum, Polaris), `font-size-10` (Paste)
- **Semantic scale**: `heading-01`, `body-01` (Carbon), `Display L`, `Body M` (Material)
- **Hybrid**: SLDS uses both `FONT_SIZE_1`...`FONT_SIZE_11` and semantic names
- **CSS utility classes**: `f0`-`f6` (Primer), `text-sm`/`text-lg` (shadcn/Tailwind)

### Responsive Typography
- **Fixed scales with breakpoints**: Material, Primer (mobile/desktop sizes), eBay (scales down on small screens)
- **Two platform scales**: Spectrum (Desktop + Mobile with ~1.2x multiplier)
- **Fluid/clamp()**: Cedar (container query units), Wise (min-max ranges)
- **No responsive scaling**: Carbon productive (fixed), Ant, Polaris, Atlassian (single scale)

---

## Per-System Data

### Material Design 3 (Google)

- **Font stack**: Google Sans (Display, Headline), Google Sans Text (Title, Body, Label); fallback Roboto
- **Scale** (15 tokens + 1 XL):
  | Token | Size | Line Height | Weight | Letter Spacing |
  |-------|------|-------------|--------|----------------|
  | Display XL | 88px | 96px | 475 | 0 |
  | Display L | 57px | 64px | 475 | 0 |
  | Display M | 45px | 52px | 475 | 0 |
  | Display S | 36px | 44px | 475 | 0 |
  | Headline L | 32px | 40px | 475 | 0 |
  | Headline M | 28px | 36px | 475 | 0 |
  | Headline S | 24px | 32px | 475 | 0 |
  | Title L | 22px | 30px | 400 | 0 |
  | Title M | 16px | 24px | 500 | 0 |
  | Title S | 14px | 20px | 500 | 0 |
  | Body L | 16px | 24px | 400 | 0 |
  | Body M | 14px | 20px | 400 | 0 |
  | Body S | 12px | 16px | 400 | 0.1px |
  | Label L | 14px | 20px | 500 | 0 |
  | Label M | 12px | 16px | 500 | 0.1px |
  | Label S | 11px | 16px | 500 | 0.1px |
- **Token naming**: `md.sys.typescale.[role].[size]` (e.g., `md.sys.typescale.body.medium`)
- **Responsive**: Platform-adaptive (Android/Web/iOS share same tokens, may render differently)

### Spectrum (Adobe)

- **Font stack**: Adobe Clean, Adobe Clean Serif, Adobe Clean Han; Monospace: Source Code Pro
- **Scale** (15 steps, T-shirt tokens with Desktop/Mobile variants):
  | Token | Desktop | Mobile | Ratio |
  |-------|---------|--------|-------|
  | font-size-50 | 11px | 13px | -- |
  | font-size-75 | 12px | 15px | -- |
  | font-size-100 (base) | 14px | 17px | -- |
  | font-size-200 | 16px | 19px | -- |
  | font-size-300 | 18px | 22px | -- |
  | font-size-400 | 20px | 24px | -- |
  | font-size-500 | 22px | 27px | -- |
  | font-size-600 | 25px | 31px | -- |
  | font-size-700 | 28px | 34px | -- |
  | font-size-800 | 32px | 39px | -- |
  | font-size-900 | 36px | 44px | -- |
  | font-size-1000 | 40px | 49px | -- |
  | font-size-1100 | 45px | 55px | -- |
  | font-size-1200 | 50px | 62px | -- |
  | font-size-1300 | 60px | 70px | -- |
- **Line height multipliers**: Heading/Detail: 1.3x, Body/Code: 1.5x, Components: 1.3x
- **Scale ratio**: 1.125 (major second)
- **Weights**: Not explicitly documented per step; contextual
- **Token naming**: `--spectrum-font-size-100`, `--spectrum-font-size-200`, etc.
- **Responsive**: Two platform scales (Desktop vs. Mobile), ~1.2x multiplier between them

### Carbon (IBM)

- **Font stack**: IBM Plex Sans, IBM Plex Sans VF; Mono: IBM Plex Mono
- **Scale** (Productive type sets):
  | Token | Size | Line Height | Weight | Letter Spacing |
  |-------|------|-------------|--------|----------------|
  | code-01 | 12px (.75rem) | 1.333 (16px) | 400 | 0.32px |
  | code-02 | 14px (.875rem) | 1.429 (20px) | 400 | 0.32px |
  | label-01 | 12px (.75rem) | 1.333 (16px) | 400 | 0.32px |
  | label-02 | 14px (.875rem) | 1.429 (20px) | 400 | 0.16px |
  | helper-text-01 | 12px (.75rem) | 1.333 (16px) | 400 | 0.32px |
  | helper-text-02 | 14px (.875rem) | 1.429 (20px) | 400 | 0.16px |
  | body-compact-01 | 14px (.875rem) | 1.286 (18px) | 400 | 0.16px |
  | body-compact-02 | 16px (1rem) | 1.375 (22px) | 400 | 0 |
  | body-01 | 14px (.875rem) | 1.429 (20px) | 400 | 0.16px |
  | body-02 | 16px (1rem) | 1.5 (24px) | 400 | 0 |
  | heading-01 | 14px (.875rem) | 1.429 (20px) | 600 | 0.16px |
  | heading-02 | 16px (1rem) | 1.5 (24px) | 600 | 0 |
  | heading-03 | 20px (1.25rem) | 1.4 (28px) | 400 | 0 |
  | heading-04 | 28px (1.75rem) | 1.286 (36px) | 400 | 0 |
  | heading-05 | 32px (2rem) | 1.25 (40px) | 400 | 0 |
  | heading-06 | 42px (2.625rem) | 1.19 (50px) | 300 | 0 |
  | heading-07 | 54px (3.375rem) | 1.185 (64px) | 300 | 0 |
- **Token naming**: `$heading-01`, `$body-compact-01`, `$label-01` (semantic, numbered)
- **Responsive**: Expressive theme has fluid heading scales; Productive is fixed
- **Letter spacing**: Positive at small sizes (0.16-0.32px), zero at 16px+

### Polaris (Shopify)

- **Font stack**: Inter, -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; Mono: ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace
- **Scale** (major third ratio 1.2, 4px grid):
  | Token | Size | Typical Line Height |
  |-------|------|---------------------|
  | font-size-275 | 11px (0.6875rem) | 12px |
  | font-size-300 | 12px (0.75rem) | 16px |
  | font-size-325 | 13px (0.8125rem) | 16px |
  | font-size-350 | 14px (0.875rem) | 20px |
  | font-size-400 | 16px (1rem) | 20px |
  | font-size-450 | 18px (1.125rem) | 24px |
  | font-size-500 | 20px (1.25rem) | 24px |
  | font-size-550 | 22px (1.375rem) | 28px |
  | font-size-600 | 24px (1.5rem) | 28px |
  | font-size-750 | 30px (1.875rem) | 36px |
  | font-size-800 | 32px (2rem) | 40px |
  | font-size-900 | 36px (2.25rem) | -- |
  | font-size-1000 | 40px (2.5rem) | -- |
- **Weights**: Regular 450, Medium 550, Semibold 650, Bold 700
- **Line height tokens**: `font-line-height-300` (12px) through `font-line-height-1200` (48px)
- **Token naming**: `--p-font-size-275`, `--p-font-size-350`, etc.
- **Responsive**: Single scale for desktop and mobile web
- **Semantic variants**: headingXs, headingSm, headingMd, headingLg, headingXl, heading2xl; bodyXs, bodySm, bodyMd, bodyLg

### Atlassian Design System

- **Font stack**: Atlassian Sans (derivative of Inter Variable); Mono: Atlassian Mono (based on JetBrains Mono)
- **Scale** (minor third ratio 1.2, 4px grid, base 16px):
  | Level | Size | Line Height | Weight |
  |-------|------|-------------|--------|
  | Heading XXL | 32px | ~38px (1.2x) | 653 |
  | Heading XL | 28px | ~34px (1.2x) | 653 |
  | Heading L | 24px | ~29px (1.2x) | 653 |
  | Heading M | 20px | ~24px (1.2x) | 653 |
  | Heading S | 16px | ~19px (1.2x) | 653 |
  | Heading XS | 14px | ~17px (1.2x) | 653 |
  | Heading XXS | 12px | ~14px (1.2x) | 653 |
  | Body (default) | 14px | ~21px (1.5x) | 400 |
  | Body small | 11-12px | ~18px (1.5x) | 400 |
- **Weights**: 653 (headings, non-standard), 400 (body)
- **Token naming**: Typography tokens via design token system
- **Responsive**: Single scale, 4px grid alignment
- **Special features**: Slashed zeros, alternate glyphs, disabled ligatures in mono

### Ant Design

- **Font stack**: AlibabaSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif; Mono: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace
- **Scale** (pentatonic/natural log inspired, base 14px):
  | Token | Size | Line Height | LH Ratio |
  |-------|------|-------------|----------|
  | SM | 12px | 20px | 1.67 |
  | Base | 14px | 22px | 1.57 |
  | LG | 16px | 24px | 1.5 |
  | XL | 20px | 28px | 1.4 |
  | Heading 5 | 16px | 24px | 1.5 |
  | Heading 4 | 20px | 28px | 1.4 |
  | Heading 3 | 24px | 32px | 1.33 |
  | Heading 2 | 30px | 38px | 1.27 |
  | Heading 1 | 38px | 46px | 1.21 |
- **Weights**: Regular 400 (body), Medium 500 (emphasis), Semibold 600 (strong)
- **Token naming**: Theme tokens: `fontSize`, `fontSizeSM`, `fontSizeLG`, `fontSizeHeading1`-`fontSizeHeading5`
- **Responsive**: Title margins use relative sizing (1.2em top, 0.5em bottom); no explicit breakpoint scaling
- **Special**: Line height ratio decreases as size increases (1.67 at 12px to 1.21 at 38px)

---

### Paste (Twilio)

- **Font stack**: Twilio Sans (TwilioSansText, TwilioSansDisplay, TwilioSansMono); fallback Inter var
- **Scale** (estimated from token naming + partial data):
  | Token | Size (approx) |
  |-------|---------------|
  | font-size-10 | 10px (0.625rem) |
  | font-size-20 | 12px (0.75rem) |
  | font-size-30 | 14px (0.875rem) |
  | font-size-40 | 16px (1rem) |
  | font-size-50 | 18px (1.125rem) |
  | font-size-60 | 20px (1.25rem) |
  | font-size-70 | 24px (1.5rem) |
  | font-size-80 | 28px (1.75rem) |
  | font-size-90 | 32px (2rem) |
  | font-size-100 | 36px (2.25rem) |
  | font-size-110 | 40px (2.5rem) |
- **Line heights**: Paired tokens (line-height-10 through line-height-110)
- **Weights**: Normal (400), Medium, Semibold (600), Bold; Light maps to 400, Bold maps to 600
- **Token naming**: `$font-size-40`, `$line-height-40` (matched pairs)
- **Responsive**: Not explicitly documented; theming-based customization

### Lightning (Salesforce)

- **Font stack**: Salesforce Sans, Arial, sans-serif; Display: AvantGardeForSalesforce; SLDS 2: Inter for body
- **Scale** (11 steps):
  | Token | Size | Pixel Equiv |
  |-------|------|-------------|
  | FONT_SIZE_1 | 0.625rem | 10px |
  | FONT_SIZE_2 | 0.75rem | 12px |
  | FONT_SIZE_3 | 0.8125rem | 13px |
  | FONT_SIZE_4 | 0.875rem | 14px |
  | FONT_SIZE_5 | 1rem | 16px |
  | FONT_SIZE_6 | 1.125rem | 18px |
  | FONT_SIZE_7 | 1.25rem | 20px |
  | FONT_SIZE_8 | 1.5rem | 24px |
  | FONT_SIZE_9 | 1.75rem | 28px |
  | FONT_SIZE_10 | 2rem | 32px |
  | FONT_SIZE_11 | 2.625rem | 42px |
- **Semantic aliases**: `$font-size-x-small` (0.625rem), `$font-size-small` (0.875rem), `$font-size-medium` (1rem), `$font-size-large` (1.25rem), `$font-size-x-large` (1.5rem), `$font-size-xx-large` (2rem)
- **Line heights**: Heading: 1.25, Text: 1.375, Reset: 1
- **Weights**: Light 300 (large headings), Regular 400 (body), Bold 700 (emphasis)
- **Token naming**: `FONT_SIZE_1`-`FONT_SIZE_11` (numeric), `$font-size-medium` (semantic)
- **Responsive**: SLDS 2 (Cosmos theme) includes responsive improvements; specifics not fully public

### Primer (GitHub)

- **Font stack**: System fonts (performance-optimized); `-apple-system, BlinkMacSystemFont, Segoe UI, Noto Sans, Helvetica, Arial, sans-serif`; Mono: `SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace`
- **Scale** (mobile / desktop):
  | Class | Mobile | Desktop |
  |-------|--------|---------|
  | h00/f00 | 40px | 48px |
  | h0/f0 | 32px | 40px |
  | h1/f1 | 26px | 32px |
  | h2/f2 | 22px | 24px |
  | h3/f3 | 18px | 20px |
  | h4/f4 | -- | 16px |
  | h5/f5 | -- | 14px |
  | h6/f6 | -- | 12px |
- **Semantic names**: Display, Title Large, Title Medium, Title Small, Subtitle, Body Large, Body Medium, Body Small, Caption
- **Weights**: Light, Normal, Medium, Semibold
- **Token naming**: CSS utilities `.f0`-`.f6`, `.h0`-`.h6`; design tokens use rem units
- **Responsive**: Mobile/desktop breakpoint scaling; 4px grid alignment
- **Line heights**: Unitless, vary per style, aligned to 4px grid

### shadcn/ui

- **Font stack**: Inherits from Tailwind CSS defaults; typically Inter or system fonts; customizable via CSS variables
- **Scale** (Tailwind utility classes):
  | Element | Class | Approx Size |
  |---------|-------|-------------|
  | H1 | text-4xl | 36px (2.25rem) |
  | H2 | text-3xl | 30px (1.875rem) |
  | H3 | text-2xl | 24px (1.5rem) |
  | H4 | text-xl | 20px (1.25rem) |
  | Large | text-lg | 18px (1.125rem) |
  | Body (default) | text-base | 16px (1rem) |
  | Small | text-sm | 14px (0.875rem) |
  | Muted | text-sm | 14px (0.875rem) |
  | xs | text-xs | 12px (0.75rem) |
- **Weights**: font-semibold (headings), font-medium (small), font-normal (body)
- **Letter spacing**: tracking-tight on headings
- **Token naming**: Tailwind utilities; no proprietary token system
- **Responsive**: Via Tailwind breakpoint prefixes (sm:, md:, lg:, xl:)
- **Note**: Does NOT ship typography styles by default; these are documented examples

### Playbook (eBay)

- **Font stack**: Market Sans (exclusive to eBay); Bold + Regular weights
- **Scale** (14 named styles):
  | Category | Sizes | Weight | Notes |
  |----------|-------|--------|-------|
  | Display 1 | 48px+ | Bold | Tighter letter spacing |
  | Display 2 | 40px | Bold | -- |
  | Display 3 | 36px | Bold | -- |
  | Display 4 | 30px | Bold | -- |
  | Title 1 | 24px | Bold | Section titles |
  | Title 2 | 20px | Bold | -- |
  | Title 3 | 16px | Bold | -- |
  | Subtitle 1 | 20px | Regular | -- |
  | Subtitle 2 | 16px | Regular | -- |
  | Body 1 | 14px | Regular | Primary body |
  | Body 1 Bold | 14px | Bold | Emphasized body |
  | Body 2 | 12px | Regular | Secondary |
  | Caption | 11px | Regular | Fine print |
  | Overline | 11px | Bold | Uppercase labels |
- **Line heights**: Pre-defined per style (not individually documented in public docs)
- **Letter spacing**: Wider at small sizes, tighter at display sizes
- **Responsive**: 16px+ styles scale down one step on small screens; 14px and below stay fixed
- **Token naming**: Not publicly documented in detail

### Cedar (REI)

- **Font stack**: Sans: Graphik, Helvetica Neue; Serif: Stuart (proprietary); Mono: Pressura, Avenir Next, Roboto
- **Scale** (fluid with clamp()):
  | Token | Size Range | Line Height | Weight |
  |-------|-----------|-------------|--------|
  | body-300 | 1.6rem (16px) | 2.6rem (26px) | 400 |
  | body-400 | 1.8rem (18px) | 3rem (30px) | 400 |
  | body-500 | 2rem (20px) | 3.6rem (36px) | 400 |
  | heading-serif-200 | 1.4rem (14px) | 1.8rem (18px) | 500 |
  | heading-serif-300 | 1.6rem (16px) | 2rem (20px) | 500 |
  | heading-serif-400 | 1.8rem (18px) | 2.4rem (24px) | 500 |
  | heading-serif-500 | 2rem (20px) | 2.6rem (26px) | 500 |
  | heading-serif-600 | 2.4rem (24px) | 3rem (30px) | 500 |
  | heading-serif-700 | 2.8rem (28px) | 3.2rem (32px) | 500 |
  | heading-serif-800 | 3.2rem (32px) | 3.6rem (36px) | 500 |
  | heading-display-1600 | 8.6rem (86px) | 9.2rem (92px) | 400 |
- **Fluid scale** (clamp tokens):
  | Scale Step | Min | Max |
  |-----------|-----|-----|
  | scale -1 | 1.33rem (21px) | 1.6rem (26px) |
  | scale 0 (base) | 1.6rem (26px) | 2rem (32px) |
  | scale 1 | 1.92rem (31px) | 2.5rem (40px) |
  | scale 7 | 5.73rem (92px) | 9.54rem (153px) |
- **Letter spacing**: body-300: 0.008rem, body-500: -0.016rem (tighter at larger sizes)
- **Token naming**: `--cdr-type-scale-0`, `--cdr-heading-serif-600`, `--cdr-body-400`
- **Responsive**: Fluid via CSS clamp() with container query units (cqw); no breakpoints
- **Note**: Unusually large base size (~16-20px body) compared to other systems; rem base is 10px

### Wise Design

- **Font stack**: Display: Wise Sans Heavy (custom); Body/Headings: Inter (Semi Bold, Regular)
- **Scale**:
  | Token | Size (Mobile-Desktop) | Line Height | Weight | Letter Spacing |
  |-------|----------------------|-------------|--------|----------------|
  | Display 1 | 56px-128px | 85% | Heavy | 0% |
  | Display 2 | 50px-96px | 85% | Heavy | 0% |
  | Display 3 | 46px-64px | 85% | Heavy | 0% |
  | Display 4 | 34px-40px | 85% | Heavy | 0% |
  | Heading 1 | 42px-78px | 46-82px | Semi Bold (600) | -3% |
  | Heading 2 | 37px-53px | 41-57px | Semi Bold (600) | -3% |
  | Heading 3 | 28px-44px | 32-40px | Semi Bold (600) | -1.5% to -3% |
  | Heading 4 | 24px-30px | -- | Semi Bold (600) | -1.5% to -2.5% |
  | Heading 5 | 20px-26px | 28-32px | Semi Bold (600) | -1% to -1.5% |
  | Title Screen | 30px | 34px | Semi Bold (600) | -2.5% |
  | Title Section | 26px | 32px | Semi Bold (600) | -1.5% |
  | Title Subsection | 22px | 28px | Semi Bold (600) | -1.5% |
  | Body Large | 16px | 24px | Regular (400) | -0.5% |
  | Body Default | 14px | 22px | Regular (400) | 1% |
  | Body 1 (Editorial) | 18-20px | 26-28px | Regular (400) | -0.5% |
  | Body 2 (Editorial) | 16-18px | 24-26px | Regular (400) | -0.5% to 1.25% |
  | Body 3 (Editorial) | 14-16px | 22-24px | Regular (400) | 1% to 1.25% |
- **Token naming**: Semantic names (Display 1, Heading 1, Body Default)
- **Responsive**: Fluid ranges for editorial styles; fixed sizes for product styles
- **Special**: Tight line height (85%) on Display styles; negative letter spacing on headings

### Dell Design System

- **Font stack**: Not publicly documented in detail; supports international scripts (Arabic, CJK, Hindi, Hebrew, Thai, etc.)
- **Scale**: H1-H6 visual sizing, Body, Subtitle, Caption, Button variants
- **Line heights**: 1.5x font size (minimum standard)
- **Responsive**: Responsive font ramp for breakpoints under 1024px
- **Token naming**: Font ramp collection (specifics behind Storybook/Figma, not publicly detailed)
- **Note**: Not publicly documented in sufficient detail for extraction. Available via Figma UI Kit and Storybook (vanilla.delldesignsystem.com, react.delldesignsystem.com)

---

## Cross-DS Comparison Table

### Body Text Sizes

| System | Body Default | Body Small | Body Large | Caption/Label | Base Size |
|--------|-------------|------------|-----------|---------------|-----------|
| Material 3 | 14px | 12px | 16px | 11-12px | 14px |
| Spectrum | 14px | 11-12px | 16px | 11px | 14px |
| Carbon | 14px | 12px | 16px | 12px | 14px |
| Polaris | 14px | 12px | 16px | 11-13px | 14px |
| Atlassian | 14px | 11-12px | 16px | 12px | 14px |
| Ant Design | 14px | 12px | 16px | 12px | 14px |
| Paste | 14px | 12px | 16px | 10px | 14px |
| Lightning | 14px (0.875rem) | 12px | 16px | 10-13px | 16px |
| Primer | 14px | 12px | 16px | 12px | 16px |
| shadcn/ui | 16px | 14px | 18px | 12px | 16px |
| Playbook (eBay) | 14px | 12px | -- | 11px | 14px |
| Cedar (REI) | 16px+ | 14px | 18-20px | -- | 16px |
| Wise | 14px | -- | 16px | -- | 14px |
| Dell | Not public | Not public | Not public | Not public | -- |

### Heading Sizes (H1 equivalent through H3)

| System | H1 / Largest Heading | H2 | H3 | Display Max | Token Pattern |
|--------|---------------------|-----|-----|------------|---------------|
| Material 3 | 32px (Headline L) | 28px | 24px | 88px | `typescale.[role].[size]` |
| Spectrum | 32px (font-size-800) | 28px | 25px | 60px | `--spectrum-font-size-N00` |
| Carbon | 32px (heading-05) | 28px | 20px | 54px | `$heading-0N` |
| Polaris | 32px (font-size-800) | 24px | 20px | 40px | `--p-font-size-N00` |
| Atlassian | 32px (XXL) | 28px | 24px | -- | Design tokens |
| Ant Design | 38px (H1) | 30px | 24px | -- | `fontSizeHeadingN` |
| Paste | 36px (font-size-100) | 32px | 28px | 40px | `$font-size-N0` |
| Lightning | 32px (FONT_SIZE_10) | 28px | 24px | 42px | `FONT_SIZE_N` |
| Primer | 32px (h1 desktop) | 24px | 20px | 48px | `.hN` / `.fN` |
| shadcn/ui | 36px (text-4xl) | 30px | 24px | -- | Tailwind utilities |
| Playbook (eBay) | 24px (Title 1) | 20px | 16px | 48px+ | Semantic names |
| Cedar (REI) | 32px (heading-800) | 28px | 24px | 86px | `--cdr-heading-N00` |
| Wise | 30px (Title Screen) | 26px | 22px | 128px | Semantic names |
| Dell | Not public | -- | -- | -- | -- |

### Line Height Ratios

| System | Body LH Ratio | Heading LH Ratio | Method |
|--------|--------------|-------------------|--------|
| Material 3 | 1.43 (14px/20px) | 1.25 (32px/40px) | Fixed per token |
| Spectrum | 1.5x | 1.3x | Multiplier rule |
| Carbon | 1.43-1.5x | 1.19-1.43x | Fixed per token |
| Polaris | 1.43 (14px/20px) | 1.25 (32px/40px) | 4px grid |
| Atlassian | ~1.5x | ~1.2x | 4px grid |
| Ant Design | 1.57 (14px/22px) | 1.21-1.5x | Decreasing ratio |
| Paste | ~1.5x | ~1.25x | Matched pairs |
| Lightning | 1.375 (text) | 1.25 (heading) | Unitless tokens |
| Primer | ~1.5x | ~1.25x | Unitless, 4px grid |
| shadcn/ui | 1.5-1.75 (Tailwind) | 1.1-1.2 | Tailwind defaults |
| Playbook (eBay) | Pre-defined | Pre-defined | Per-style |
| Cedar (REI) | 1.625 (26/16) | 1.125 (36/32) | Fixed per token |
| Wise | 1.57 (22/14) | 85% (display) | Per-style |
| Dell | 1.5x minimum | -- | Rule-based |

### Font Weight Usage

| System | Body | Labels/Emphasis | Headings | Strong/Bold |
|--------|------|----------------|----------|-------------|
| Material 3 | 400 | 500 | 475 | -- |
| Spectrum | Contextual | Contextual | Contextual | -- |
| Carbon | 400 | 400 | 600 (sm), 400 (lg) | 300 (xl) |
| Polaris | 450 | 550 | 650 | 700 |
| Atlassian | 400 | -- | 653 | -- |
| Ant Design | 400 | 500 | 500 | 600 |
| Paste | 400 | 500 | 600 | 700 |
| Lightning | 400 | -- | 300 (lg), 700 (emphasis) | 700 |
| Primer | Normal | Medium | Semibold | Bold |
| shadcn/ui | 400 | 500 | 600 | 700 |
| Playbook (eBay) | Regular | -- | Bold | Bold |
| Cedar (REI) | 400 | -- | 500 | 600 |
| Wise | 400 | -- | 600 | Heavy (display) |
| Dell | Not public | -- | -- | -- |

---

## Key Patterns for Component Generation

### Recommended Defaults (based on consensus)
- **Body text**: 14px / 20px line-height (1.43 ratio) -- matches Material, Carbon, Polaris, Atlassian, Ant, Paste, Wise, eBay
- **Small/Caption**: 12px / 16px line-height (1.33 ratio)
- **Label**: 12-14px / 16-20px, weight 500-600
- **H1 (product)**: 32px / 40px, weight 600
- **H2**: 24px-28px / 32px-36px
- **H3**: 20px / 28px
- **H4**: 16px / 24px
- **Font weight body**: 400
- **Font weight heading**: 600 (most common for smaller headings), 400 (for large headings 28px+)
- **Letter spacing**: Slight positive (0.1-0.3px) at 12px and below, zero at 14-16px, slight negative at 20px+

### Scale Ratio Patterns
- **1.125** (major second): Spectrum -- gentle, many steps
- **1.2** (minor third): Polaris, Atlassian -- moderate, popular choice
- **1.25** (major third): Common in practice across many systems
- **Custom/logarithmic**: Ant Design, Carbon -- based on specific design philosophy

### Token Naming Best Practices (from most adopted)
1. **Numeric scale (100-based)**: Spectrum, Polaris -- `font-size-100`, `font-size-200`
2. **Semantic + number**: Carbon -- `heading-01`, `body-compact-01`
3. **Role + T-shirt**: Material -- `body.medium`, `headline.large`
4. **Arbitrary numeric**: Paste, Lightning -- `font-size-40`, `FONT_SIZE_5`

---

## Sources

- [Material Design 3 Typography](https://m3.material.io/styles/typography/type-scale-tokens)
- [Spectrum Typography](https://spectrum.adobe.com/page/typography/)
- [Carbon Typography Type Sets](https://carbondesignsystem.com/guidelines/typography/type-sets/)
- [Polaris Font and Typescale](https://polaris-react.shopify.com/design/typography/font-and-typescale)
- [Polaris Font Tokens](https://polaris-react.shopify.com/tokens/font)
- [Atlassian Typography](https://atlassian.design/foundations/typography/product-typefaces-and-scale/)
- [Ant Design Font Spec](https://ant.design/docs/spec/font/)
- [Paste Typography](https://paste.twilio.design/foundations/typography)
- [SLDS Font Size Tokens (GitHub)](https://github.com/salesforce-ux/design-system/blob/main/design-tokens/aliases/font-size.yml)
- [SLDS Font Tokens (GitHub)](https://github.com/salesforce-ux/design-tokens/blob/master/tokens/force-base/font.json)
- [Primer Typography](https://primer.style/foundations/typography/)
- [Primer CSS Typography (GitHub)](https://github.com/primer/css/blob/main/src/utilities/typography.scss)
- [shadcn/ui Typography](https://ui.shadcn.com/docs/components/radix/typography)
- [eBay Playbook Typography](https://playbook.ebay.com/foundations/typography/using-type-in-digital)
- [Cedar Typography](https://cedar.rei.com/guidelines/typography)
- [Wise Design Typography](https://wise.design/foundations/typography)
- [Dell Design System Typography](https://www.delldesignsystem.com/foundations/typography/)
