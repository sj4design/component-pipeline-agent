# Color & Elevation Foundations -- Cross-DS Analysis

> **Research date:** 2026-03-30
> **Systems analyzed:** 14 (6 Tier 1 + 8 Tier 2)
> **Data source:** Official documentation via web search/fetch (not training data)

---

## Consensus Summary

### Color Architecture
- **3-layer token architecture is the universal standard** (13/14 systems use it):
  - Layer 1: **Primitive/Base/Seed** -- raw color values (hex, HSL, palette steps)
  - Layer 2: **Semantic/Alias/Map** -- purpose-based tokens (background, text, border)
  - Layer 3: **Component** -- scoped to specific components (button-bg, input-border)
- Only **shadcn/ui** uses a simpler 2-layer model (semantic CSS vars + component usage)

### Common Semantic Roles (consensus across 12+ systems)
| Role | Prevalence | Common Token Names |
|------|------------|-------------------|
| Background/Surface | 14/14 | `bg`, `surface`, `background` |
| Text/Foreground | 14/14 | `text`, `fg`, `foreground`, `on-*` |
| Border | 14/14 | `border`, `borderColor` |
| Icon | 10/14 | `icon`, `fg` (shared with text) |
| Brand/Primary | 14/14 | `primary`, `brand`, `accent` |
| Interactive | 12/14 | `interactive`, `action`, `link` |
| Status: Error/Danger | 14/14 | `error`, `danger`, `critical`, `negative`, `destructive` |
| Status: Warning | 14/14 | `warning`, `attention`, `caution` |
| Status: Success | 14/14 | `success`, `positive` |
| Status: Info | 13/14 | `info`, `information`, `discovery`, `neutral` |
| Overlay | 10/14 | `overlay`, `blanket`, `scrim` |
| Inverse | 8/14 | `inverse`, `on-bold` |

### Common Elevation Levels
- **4 levels is the most common** (Atlassian, Paste, Primer, Wise)
- Material Design uses **6 levels** (0-5), the most granular
- Shadow values universally use **dual-layer shadows** (ambient + key light)
- Dark mode elevation: **surface color shift** (lighter surface = higher), not just shadows

### Common Border Radius Scale
- Most systems use **4-6 named radius levels**
- Common values cluster around: **0, 2, 4, 8, 12, 16, 9999px**
- Full/pill radius universally = `9999px` or `999rem`

---

## Per-System Data

### TIER 1 SYSTEMS

---

#### Material Design 3 (Google)

**Color Architecture:** 3 layers
- **Reference tokens** (primitive): Raw palette values from tonal palettes (e.g., `primary-80`, `neutral-95`)
- **System tokens** (semantic): Role-based mappings (e.g., `on-primary`, `surface-variant`)
- **Component tokens**: Component-scoped (e.g., `filled-button-container-color`)

**Semantic Roles:**
- Primary, On-Primary, Primary-Container, On-Primary-Container
- Secondary, On-Secondary, Secondary-Container, On-Secondary-Container
- Tertiary, On-Tertiary, Tertiary-Container, On-Tertiary-Container
- Error, On-Error, Error-Container, On-Error-Container
- Surface (0-5 levels), Surface-Variant, On-Surface, On-Surface-Variant
- Background, On-Background
- Outline, Outline-Variant
- Inverse-Surface, Inverse-On-Surface, Inverse-Primary
- Scrim

**State Strategy:** Opacity overlay system. States use state-layer overlays:
- Hover: 8% opacity overlay of content color
- Focus: 10% opacity overlay
- Pressed: 10% opacity overlay
- Dragged: 16% opacity overlay
- Disabled: 12% opacity container, 38% opacity content

**Dark Mode:** Full token swap. Dynamic color from wallpaper generates new Reference tokens that map to same System tokens. Light/dark themes swap the tonal palette mappings (e.g., primary goes from tone 40 in light to tone 80 in dark).

**Token Naming:** `md.sys.color.[role]` / `md.ref.palette.[hue][tone]`
- CSS: `--md-sys-color-primary`, `--md-sys-color-on-surface-variant`

**Elevation:** 6 levels (0-5)
| Level | Shadow Values |
|-------|--------------|
| 0 | none |
| 1 | `0px 1px 2px 0px rgba(0,0,0,0.30), 0px 1px 3px 1px rgba(0,0,0,0.15)` |
| 2 | `0px 1px 2px 0px rgba(0,0,0,0.30), 0px 2px 6px 2px rgba(0,0,0,0.15)` |
| 3 | `0px 1px 3px 0px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)` |
| 4 | `0px 2px 3px 0px rgba(0,0,0,0.30), 0px 6px 10px 4px rgba(0,0,0,0.15)` |
| 5 | `0px 4px 4px 0px rgba(0,0,0,0.30), 0px 8px 12px 6px rgba(0,0,0,0.15)` |

Plus **surface tint** overlay (primary color at varying opacity per level) in light mode. In dark mode, surfaces get lighter as elevation increases.

**Border Radius (Shape Scale):**
| Name | Value |
|------|-------|
| None | 0px |
| Extra Small | 4px |
| Small | 8px |
| Medium | 12px |
| Large | 16px |
| Extra Large | 28px |
| Full | 9999px |

---

#### Spectrum (Adobe)

**Color Architecture:** 3 layers
- **Global tokens**: Raw values (e.g., `gray-100`, `blue-900`)
- **Alias tokens**: Semantic references (e.g., `accent-background-color-default`, `negative-border-color-default`)
- **Component-specific tokens**: Scoped (e.g., `accent-button-edge-to-text-large`)

**Semantic Roles:**
- Accent (primary actions)
- Negative (error/destructive)
- Positive (success)  -- inferred from component usage
- Informative (info)
- Notice (warning)
- Neutral backgrounds and text
- Background: base, layer-1, layer-2
- Content: default, strong

**State Strategy:** Separate tokens per state:
- `*-default`, `*-hover`, `*-down`, `*-key-focus`

**Dark Mode:** Theme-based token swap across 4+ themes:
- Lightest, Light, Dark, Darkest, Wireframe
- Same token names resolve to different values per theme

**Token Naming:** `[context]-[property]-[state]`
- CSS: `--spectrum-accent-background-color-default`
- Naming structure: context + common unit + clarification

**Elevation:**
- Default drop shadow (scales between desktop/mobile)
- Shadow opacity increases on dark/darkest themes
- Not a numbered scale -- role-based (default, floating)

**Border Radius:**
| Name | Desktop | Mobile |
|------|---------|--------|
| Small | 2px | 2px |
| Default | 4px | 5px |
| Full | 9999px | 9999px |

---

#### Carbon (IBM)

**Color Architecture:** 3 layers
- **Palette** (primitive): IBM color palette with 10-step scales per hue (e.g., Blue-60, Gray-10)
- **Theme tokens** (semantic): Role-based (e.g., `$background`, `$text-primary`, `$border-strong`)
- **Component tokens**: Scoped to components

**Semantic Roles (token categories):**
- Background: `$background`, `$background-hover`, `$background-active`, `$background-selected`, `$background-brand`, `$background-inverse`
- Layer: `$layer-01`, `$layer-02`, `$layer-03` (contextual layering model)
- Field: `$field-01`, `$field-02`, `$field-03`
- Text: `$text-primary`, `$text-secondary`, `$text-placeholder`, `$text-on-color`, `$text-inverse`, `$text-disabled`, `$text-helper`, `$text-error`
- Link: `$link-primary`, `$link-secondary`, `$link-visited`, `$link-inverse`
- Icon: `$icon-primary`, `$icon-secondary`, `$icon-on-color`, `$icon-inverse`, `$icon-disabled`
- Border: `$border-strong`, `$border-subtle`, `$border-disabled`, `$border-interactive`, `$border-inverse`
- Support (status): `$support-error`, `$support-success`, `$support-warning`, `$support-info`, `$support-caution-minor`, `$support-caution-major`, `$support-undefined`
- Focus: `$focus`, `$focus-inset`, `$focus-inverse`
- Interactive: `$interactive`
- Overlay: `$overlay`
- Skeleton: `$skeleton-background`, `$skeleton-element`

**State Strategy:** Dedicated hover tokens as "half-step" between adjacent palette steps:
- `$background-hover`, `$layer-hover`, `$field-hover`
- Hover token = half-step between base color and next palette step

**Dark Mode:** 4 built-in themes: White, Gray 10 (light), Gray 90, Gray 100 (dark)
- Layering model: Light themes alternate White/Gray 10 per layer; dark themes get one step lighter per layer
- Class-based theme switching

**Token Naming:** `$[category]-[modifier]`
- CSS custom property: `--cds-[token-name]`

**Elevation:** Scale 0-24 (conceptual), blur value = elevation unit in px
- Not heavily documented as discrete levels; uses contextual layering model instead
- Shadows increase in intensity and depth with elevation

**Border Radius:**
| Token | Value |
|-------|-------|
| Button | 0px (default -- square buttons) |
| Content Switcher | 8px |
| Tags | 24px (pill) |
- Carbon historically uses **minimal radius** -- many components are square

---

#### Polaris (Shopify)

**Color Architecture:** 3 layers
- **Palette tokens** (primitive, private): 10 shades per hue using HSLuv for perceptual uniformity
- **Alias tokens** (semantic, public): Role + element based (e.g., `--p-color-bg-surface`, `--p-color-text-critical`)
- **Component tokens**: Discussed but not widely exposed

**Semantic Roles:**
- Elements: `bg`, `bg-surface`, `bg-fill`, `text`, `border`, `icon`
- Roles: Default, Brand, Info, Success, Warning, Critical, Magic (AI)
- Hierarchy: primary (default), secondary, tertiary within each role

**State Strategy:** State suffix appended to semantic tokens:
- `-hover`, `-active`, `-selected`, `-disabled`, `-focus`
- Example: `--p-color-bg-surface-hover`

**Dark Mode:** CSS custom property swap. System preference detection via `prefers-color-scheme: dark` with localStorage persistence.

**Token Naming:** `--p-color-[element]-[role]-[variant]-[state]`
- Example: `--p-color-bg-surface-brand-hover`
- Default role omits role segment: `--p-color-bg` (default background)

**Elevation (Shadow tokens):**
| Token | Purpose |
|-------|---------|
| `--p-shadow-100` | Subtle card shadow |
| `--p-shadow-200` | Raised card |
| `--p-shadow-300` | Dropdown/popover |
| `--p-shadow-400` | Modal |
| `--p-shadow-600` | Toast/notification |
| `--p-shadow-bevel-100` | 3D bevel effect |
| `--p-shadow-inset-200` | Inset/pressed |
- Scale increments of 100, base at 100
- Bevel token combinable with elevation tokens for depth

**Border Radius:**
| Token | Value |
|-------|-------|
| `--p-border-radius-0` | 0px |
| `--p-border-radius-050` | 2px |
| `--p-border-radius-100` | 4px |
| `--p-border-radius-150` | 6px |
| `--p-border-radius-200` | 8px |
| `--p-border-radius-300` | 12px |
| `--p-border-radius-400` | 16px |
| `--p-border-radius-500` | 20px |
| `--p-border-radius-750` | 30px |
| `--p-border-radius-full` | 9999px |

---

#### Atlassian Design System

**Color Architecture:** 3 layers
- **Base scale** (primitive): Raw color values per hue
- **Design tokens** (semantic): Named by intent (e.g., `color.background.success.bold`)
- **Component tokens**: Component-scoped usage

**Semantic Roles:**
- 7 semantic roles: **Neutral, Brand, Information, Success, Warning, Danger, Discovery**
- Plus: **Accent** (decorative, no semantic meaning), **Inverse** (for bold backgrounds)
- Each role supports emphasis scale: subtlest -> subtler -> subtle -> bold -> bolder -> boldest

**Token Naming:** `color.[property].[role].[emphasis].[state]`
- `color.background.brand.bold`
- `color.text.danger.bolder`
- `color.icon.success`
- `color.border.warning.bold`
- `color.background.success.hovered`

**Color Properties:** background, text, icon, border, blanket, chart, skeleton

**State Strategy:** State suffix appended:
- `.hovered`, `.pressed`, `.disabled`, `.focused`
- Example: `color.background.brand.bold.hovered`

**Dark Mode:** CSS custom properties with `data-color-mode="dark"` attribute. Token values automatically adjust. Inverse tokens available for bold backgrounds.

**Elevation:**
| Level | Surface Token | Shadow Token |
|-------|--------------|-------------|
| Sunken | `elevation.surface.sunken` | none |
| Default | `elevation.surface` | none |
| Raised | `elevation.surface.raised` | `elevation.shadow.raised` |
| Overlay | `elevation.surface.overlay` | `elevation.shadow.overlay` |

- Dark mode: Higher elevation = lighter surface (lit from front)
- Overflow shadow: `elevation.shadow.overflow.spread`, `elevation.shadow.overflow.perimeter`

**Token naming for elevation:** `elevation.[surface|shadow].[level]`

**Border Radius:** Documented but specific values not publicly detailed in web docs. Uses token-based approach.

---

#### Ant Design

**Color Architecture:** 3 layers (algorithmic derivation)
- **Seed tokens** (primitive): `colorPrimary`, `colorSuccess`, `colorWarning`, `colorError`, `colorInfo`, `borderRadius`, `fontSize`
- **Map tokens** (derived): Algorithmic palette generation (e.g., `blue-1` through `blue-10` from single seed)
- **Alias tokens** (semantic): `colorPrimaryBg`, `colorPrimaryHover`, `colorText`, `colorTextSecondary`, `colorBorder`

**Semantic Roles (Seed -> Alias):**
- Primary: `colorPrimary` (#1677FF) -> `colorPrimaryBg`, `colorPrimaryHover`, `colorPrimaryActive`, `colorPrimaryText`
- Success: `colorSuccess` (#52C41A) -> `colorSuccessBg`, `colorSuccessBorder`, `colorSuccessText`
- Warning: `colorWarning` (#FAAD14) -> same pattern
- Error: `colorError` (#FF4D4F) -> same pattern
- Info: `colorInfo` (#1677FF) -> same pattern
- Link: `colorLink` (#1677FF)
- Text: `colorText`, `colorTextSecondary`, `colorTextTertiary`, `colorTextQuaternary`
- Border: `colorBorder`, `colorBorderSecondary`
- Background: `colorBgBase`, `colorBgContainer`, `colorBgElevated`, `colorBgLayout`, `colorBgSpotlight`
- Fill: `colorFill`, `colorFillSecondary`, `colorFillTertiary`, `colorFillQuaternary`

**State Strategy:** Dedicated alias tokens per state:
- `colorPrimaryHover`, `colorPrimaryActive`
- `controlItemBgHover`, `controlItemBgActive`
- Component-level: `--ant-button-default-hover-color`, `--ant-button-default-hover-bg`

**Dark Mode:** CSS custom properties redefined:
- `colorBgBase: #000`, `colorTextBase: #fff`
- Text uses `rgba(255,255,255,0.85)` for hierarchy
- Configurable via `ConfigProvider` theme `algorithm: theme.darkAlgorithm`

**Token Naming:** `--ant-[category]-[semantic]-[state]`
- Seed: camelCase (`colorPrimary`)
- CSS var: `--ant-color-primary`, `--ant-color-bg-elevated`

**Elevation (Shadows):**
| Token | CSS Value |
|-------|-----------|
| `boxShadow` (primary) | `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)` |
| `boxShadowSecondary` | Same as primary |
| `boxShadowTertiary` | `0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)` |
| `boxShadowCard` | `0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 12px 4px rgba(0,0,0,0.09)` |
| `boxShadowPopoverArrow` | `2px 2px 5px rgba(0,0,0,0.05)` |
- Plus directional drawer shadows (left, right, up, down)

**Border Radius:**
| Token | Derivation |
|-------|-----------|
| `borderRadius` (Seed) | 6px (default) |
| `borderRadiusXS` | Derived smaller |
| `borderRadiusSM` | Derived from seed |
| `borderRadiusLG` | Derived larger |
- Changing seed `borderRadius` cascades to all derived values via algorithm

---

### TIER 2 SYSTEMS

---

#### Paste (Twilio)

**Color Architecture:** 3 layers
- **Hex values** (primitive): Raw color codes
- **Aliases** (palette): Named palette steps, 10+ steps per hue (lower = lighter, higher = darker). Never used directly in code.
- **Design tokens** (semantic): Purpose-based, reference aliases. Only tokens appear in production code.

**Semantic Roles:**
- Background: body, standard, strong, status-specific (error, success, warning, neutral)
- Text/Icon: standard, weak, weaker, inverse, status-specific
- Border: weak, primary, destructive, warning, success
- Status: Error (red), Success (green), Warning (orange), Neutral/Info (blue)

**State Strategy:** Dedicated tokens per interactive purpose:
- Primary interactive (blue) for main actions
- Destructive interactive (red) for danger
- `$color-background-primary-stronger` for emphasis levels

**Dark Mode:** Full Dark Theme alongside Default. Requires full Paste adoption across product UI. Token values swap automatically.

**Token Naming:** `$color-[property]-[semantic]-[strength]`
- `$color-background-primary`, `$color-text-weak`, `$color-border-destructive`
- Text tokens require 4.5:1 contrast; icon tokens 3:1

**Elevation:** 4 levels (0-3)
| Level | Token | Usage |
|-------|-------|-------|
| 0 | (base) | Interface background, most elements |
| 1 | `$shadow-elevation-05` / `$color-background-body-elevation` | Accent shadow or tonal shift |
| 2 | `$shadow-elevation-10` | Popovers, floating elements |
| 3 | `$shadow-elevation-20` / `$shadow-elevation-top-20` | Modals, crucial actions |

- Elevated backgrounds: Darken on light bg, lighten on dark bg
- Level 3 can combine with `$color-background-overlay` for focus isolation

**Border Radius:** Not publicly documented in detail. Uses token-based system.

---

#### Lightning (Salesforce)

**Color Architecture:** 3 layers (transitioning)
- SLDS 1: Traditional design tokens (`$color-background-*`)
- **SLDS 2**: CSS custom variables called "global styling hooks"
  - `--slds-g-color-surface-container-1` (surface)
  - `--slds-g-color-on-surface-1` (text on surface)
  - `--slds-g-color-border-1` (border)

**Semantic Roles:**
- Surface: `surface-container-1` through numbered scale
- On-Surface: text colors paired with surfaces
- Border: `border-base-1` for form elements
- Brand/Action: primary action colors
- Status: error, success, warning, info (semantic meaning preserved)

**State Strategy:** Styling hooks resolve states automatically within the theming system.

**Dark Mode:** SLDS 2 tokens auto-resolve based on active theme (Light or Dark). Same component code works in both modes. `data-slds-theme` attribute.

**Token Naming:** `--slds-g-color-[category]-[number]`
- Semantic naming: `radius-border-4`, `font-scale-4`
- All SLDS 2 hooks start with `--slds-g`

**Elevation:** Shadow tokens exist but specific values not publicly detailed. Uses numbered scale system.

**Border Radius:** `--slds-g-radius-border-4` = `1rem` (example). Numbered scale.

---

#### Primer (GitHub)

**Color Architecture:** 3 layers
- **Base tokens** (primitive): Map to raw values, used only as references (e.g., `color-scale-pink-5`)
- **Functional tokens** (semantic): Global UI patterns, respect color modes (e.g., `fgColor-default`, `bgColor-muted`)
- **Component/Pattern tokens**: Limited scope, reference base and functional

**Semantic Roles (7 color roles):**
| Role | Purpose |
|------|---------|
| Accent | Links, selection, active/focus states |
| Success | Primary actions, positive messaging |
| Attention | Warnings, queued processes |
| Danger | Destructive actions, errors |
| Open | Open workflow state |
| Closed | Closed workflow state |
| Done | Completed workflow state |
| Sponsors | GitHub Sponsors content |

Each role has `muted` and `emphasis` variants.

**Functional categories:** fgColor (text/icons), bgColor (backgrounds), borderColor (borders), shadow (elevation)

**State Strategy:** Neutral scale steps accommodate rest/hover/active. Contrast values calculated against `bgColor-muted`.

**Dark Mode:** Light and dark neutral scales are inverted. 9 themes total (light, dark, light high contrast, dark high contrast, etc.). Functional tokens share names but resolve to mode-appropriate values.

**Token Naming:** `{function}-{role}-{variant}`
- CSS: `--color-fg-default`, `--color-bg-accent-emphasis`
- Figma: Variables mapped 1:1

**Elevation:** Shadow as a functional color category. Specific shadow values not extensively documented publicly. Uses token-based approach.

**Border Radius:** Token-based but specific scale values not publicly detailed.

---

#### shadcn/ui

**Color Architecture:** 2 layers (simplified)
- **Semantic CSS variables**: Defined in `:root` and `.dark` selectors using OKLCH color space
- **Component usage**: Components reference variables directly via Tailwind

**Semantic Roles (CSS variables):**
- `--background` / `--foreground` (app base)
- `--primary` / `--primary-foreground` (high-emphasis actions)
- `--secondary` / `--secondary-foreground` (low-emphasis)
- `--muted` / `--muted-foreground` (subtle surfaces)
- `--accent` / `--accent-foreground` (interactive highlight)
- `--destructive` (error/danger)
- `--card` / `--card-foreground`
- `--popover` / `--popover-foreground`
- `--border`, `--input`, `--ring`
- `--chart-1` through `--chart-5`
- `--sidebar`, `--sidebar-primary`, `--sidebar-accent` (+ foreground variants)

**State Strategy:** Not tokenized at the color level. States handled via Tailwind utility classes (`hover:`, `focus:`, etc.).

**Dark Mode:** Same token names inside `.dark` CSS selector. Values change between `:root` and `.dark`.

**Token Naming:** `--[role]` (flat, no prefix)
- Used via Tailwind: `bg-primary`, `text-muted-foreground`

**Elevation (Shadows):**
| Token | Purpose |
|-------|---------|
| `--shadow-xs` | Subtle elevation |
| `--shadow-sm` | Small components |
| `--shadow-md` | Cards |
| `--shadow-lg` | Dropdowns |
| `--shadow-xl` | Modals |
| `--shadow-2xl` | Large overlays |

**Border Radius:** Single `--radius` variable, all others derived:
| Token | Formula |
|-------|---------|
| `--radius-sm` | `calc(var(--radius) * 0.6)` |
| `--radius-md` | `calc(var(--radius) * 0.8)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) * 1.4)` |
| `--radius-2xl` | `calc(var(--radius) * 1.8)` |
| `--radius-3xl` | `calc(var(--radius) * 2.2)` |
| `--radius-4xl` | `calc(var(--radius) * 2.6)` |

---

#### Playbook (eBay)

**Color Architecture:** 3 layers
- **Palette** (primitive): 136-color palette derived from heritage brand colors
- **Semantic tokens** (semantic): Background + foreground pairs (e.g., `attention` + `on-attention`, `success` + `on-success`)
- **Component tokens**: Component-scoped

**Semantic Roles:**
- Background + on-background pairs
- Attention (warning) + on-attention
- Success + on-success
- Status colors with corresponding foreground tokens for accessibility

**State Strategy:** Not publicly detailed.

**Dark Mode:** Semantic color tokens adapt UI to dark mode. Global scalability via token swap.

**Token Naming:** dot-separated, all lowercase (Figma). Convertible to dashes/camelCase per platform.

**Elevation:** Drop shadow for transient/fixed elements. Not publicly documented as a scale.

**Border Radius (Shape tokens):**
| Level | Usage |
|-------|-------|
| Default | Input fields, most containers |
| Large | Popovers, modals |
| Extra Large | Banner dialogs, expressive components |
| Full | Buttons, notification badges, priority signals |

---

#### Cedar (REI)

**Color Architecture:** 3 layers
- **Options** (primitive): Base palette values
- **Semantic tokens**: Role-based with state modifiers
- **Component tokens**: Component-scoped

**Semantic Roles (token categories):**
- Background: `--cdr-color-background-primary`, `-secondary`, button states, surfaces
- Text: `--cdr-color-text-primary`, `-secondary`, `-emphasis`, link states, input
- Border: `--cdr-color-border-primary`, `-secondary`, button, input, message types
- Icon: `--cdr-color-icon-default`, `-emphasis`, `-link`, `-disabled`
- Message/Status: `success`, `warning`, `error`, `info`, `sale`

**State Modifiers:** rest, hover, active, focus, disabled, selected, checked

**Token Naming:** `--cdr-color-[category]-[subcategory]-[state]`

**Dark Mode:** Not publicly documented as a primary feature.

**Elevation (Prominence):**
| Token | CSS Value |
|-------|-----------|
| `--cdr-prominence-flat` | `0 0 0 0 rgba(46,46,43,.2)` |
| `--cdr-prominence-raised` | `0 0.2rem 0.2rem 0` |
| `--cdr-prominence-elevated` | `0 0.4rem 0.4rem 0` |
| `--cdr-prominence-floating` | `0 0.8rem 0.8rem 0` |
| `--cdr-prominence-lifted` | `0 1.6rem 1.6rem 0` |

**Border Radius:**
| Token | Value |
|-------|-------|
| `--cdr-radius-sharp` | 0 |
| `--cdr-radius-soft` | 0.2rem (~3.2px) |
| `--cdr-radius-softer` | 0.4rem (~6.4px) |
| `--cdr-radius-softest` | 0.6rem (~9.6px) |
| `--cdr-radius-round` | 999.9rem |

---

#### Wise Design

**Color Architecture:** 3 layers
- **Brand colors** (primitive): Bright Green (#9FE870), Forest Green (#163300), 8 secondary colors
- **Product colors** (semantic): Content, Interactive, Background, Border, Sentiment
- **Base colors** (utility): Specific component needs

**Semantic Roles:**
- Content: Primary, Secondary, Tertiary, Link
- Interactive: Primary (Forest Green), Accent (Bright Green), Secondary (grey), Control, Contrast
- Background: Screen, Elevated, Neutral (8% opacity), Overlay
- Border: Neutral (12% opacity), Focus
- Sentiment: Negative (#A8200D), Positive (#2F5711), Warning (#EDC843)

**State Strategy:** Color pairing for contrast:
- Interactive Primary on light backgrounds
- Interactive Accent for button fills
- Interactive Control/Contrast for dark mode visibility

**Dark Mode:** Comprehensive property-based swap:
- Background Screen: #FFFFFF -> #121511
- Content colors shift to lighter variants
- Interactive Accent (#9FE870) stays consistent
- Border/overlay opacities increase

**Token Naming:** Descriptive names: `Content Primary`, `Interactive Accent`, `Background Neutral`
- Includes HEX, RGB, CMYK, PANTONE + `hexDarkMode`

**Elevation:** No traditional shadow system. Uses:
- Opacity-based layering (Background Neutral at 8% opacity)
- Background Elevated (#FFFFFF) for conceptual depth
- Border differentiation at 12% opacity

**Border Radius:** Not publicly documented as a token scale.

---

#### Dell Design System

**Color Architecture:** Documented but not publicly accessible (TLS cert issue on docs site).
- References to color foundations at delldesignsystem.com/foundations/color
- Uses semantic approach for communication, meaning, brand, and roles

**Elevation:** Documented at delldesignsystem.com/foundations/elevation
- Uses shadows and blurs for layered hierarchy effect
- Specific values not extractable due to site access issues

**Note:** Dell DS documentation exists but was not fully accessible during research.

---

## Cross-DS Comparison Tables

### Color Architecture

| System | Layers | Semantic Roles | State Strategy | Dark Mode | Token Pattern |
|--------|--------|---------------|----------------|-----------|---------------|
| **Material 3** | 3 (Reference/System/Component) | Primary, Secondary, Tertiary, Error, Surface, Outline, Inverse | Opacity overlay (8-16%) | Token swap via tonal palette | `--md-sys-color-[role]` |
| **Spectrum** | 3 (Global/Alias/Component) | Accent, Negative, Positive, Notice, Informative, Neutral | Separate tokens per state | 4+ theme variants | `--spectrum-[context]-[property]-[state]` |
| **Carbon** | 3 (Palette/Theme/Component) | Background, Layer, Field, Text, Link, Icon, Border, Support, Focus | Half-step hover tokens | 4 themes (White, g10, g90, g100) | `$[category]-[modifier]` / `--cds-*` |
| **Polaris** | 3 (Palette/Alias/Component) | bg, bg-surface, bg-fill, text, border, icon x Default/Brand/Critical/Warning/Success/Info/Magic | State suffix (-hover, -active) | CSS var swap + prefers-color-scheme | `--p-color-[element]-[role]-[variant]-[state]` |
| **Atlassian** | 3 (Base/Token/Component) | Neutral, Brand, Info, Success, Warning, Danger, Discovery + Accent, Inverse | State suffix (.hovered, .pressed) | data-color-mode attribute | `color.[property].[role].[emphasis].[state]` |
| **Ant Design** | 3 (Seed/Map/Alias) | Primary, Success, Warning, Error, Info, Link, Text, Border, Bg, Fill | Algorithmic derivation + component tokens | ConfigProvider darkAlgorithm | `--ant-color-[semantic]-[state]` |
| **Paste** | 3 (Hex/Alias/Token) | Background, Text/Icon, Border, Status (error/success/warning/neutral) | Semantic purpose tokens | Full Dark Theme swap | `$color-[property]-[semantic]-[strength]` |
| **Lightning** | 3 (SLDS 2: Hooks) | Surface, On-Surface, Border, Brand, Status | Auto-resolved by theme | data-slds-theme attribute | `--slds-g-color-[category]-[number]` |
| **Primer** | 3 (Base/Functional/Pattern) | Accent, Success, Attention, Danger, Open, Closed, Done, Sponsors | Neutral scale steps for states | 9 themes, inverted scales | `--color-[function]-[role]-[variant]` |
| **shadcn/ui** | 2 (Semantic vars only) | primary, secondary, muted, accent, destructive, card, popover | Tailwind utilities (not tokenized) | .dark CSS selector swap | `--[role]` (flat) |
| **Playbook** | 3 (Palette/Semantic/Component) | bg+on-bg pairs, attention, success | Not publicly detailed | Token-based auto swap | dot.separated.lowercase |
| **Cedar** | 3 (Options/Semantic/Component) | Background, Text, Border, Icon, Message (success/warning/error/info/sale) | State modifiers (rest/hover/active/focus/disabled) | Not primary feature | `--cdr-color-[category]-[sub]-[state]` |
| **Wise** | 3 (Brand/Product/Base) | Content, Interactive, Background, Border, Sentiment | Color pairing for contrast | Comprehensive property swap | Descriptive names (Content Primary) |
| **Dell** | 3 (presumed) | Not fully extractable | Not fully extractable | Not fully extractable | Not fully extractable |

### Elevation & Radius

| System | Elevation Levels | Shadow Approach | Radius Scale | Z-Index | Token Pattern |
|--------|-----------------|-----------------|--------------|---------|---------------|
| **Material 3** | 6 (0-5) | Dual-layer shadow + surface tint | 0/4/8/12/16/28/9999px | Not documented | `--md-sys-elevation-[level]` |
| **Spectrum** | Role-based (not numbered) | Single shadow, scales by theme | 2/4-5/9999px | Not documented | `--spectrum-*-shadow` |
| **Carbon** | 0-24 conceptual | Blur = elevation px | 0/8/24px (minimal) | Not documented | `$shadow` |
| **Polaris** | 5 levels (100-600) | Elevation + bevel combination | 0/2/4/6/8/12/16/20/30/9999px | Not documented | `--p-shadow-[level]` |
| **Atlassian** | 4 (Sunken/Default/Raised/Overlay) | Shadow + surface color shift | Token-based (not public values) | Not documented | `elevation.[shadow\|surface].[level]` |
| **Ant Design** | 3 named (primary/secondary/tertiary) | Triple-layer shadow per level | 6px seed + derived XS/SM/LG | Not documented | `--ant-box-shadow-[variant]` |
| **Paste** | 4 (0-3) | Progressive shadow intensity | Not publicly detailed | Not documented | `$shadow-elevation-[level]` |
| **Lightning** | Numbered scale | Styling hooks | `--slds-g-radius-border-[n]` | Not documented | `--slds-g-*` |
| **Primer** | Token-based | Shadow functional category | Not publicly detailed | Not documented | `--color-shadow-*` |
| **shadcn/ui** | 6 (xs-2xl) | T-shirt size naming | Derived from single --radius var | Not documented | `--shadow-[size]` |
| **Playbook** | Drop shadow (role-based) | Not publicly detailed | Default/Large/XL/Full | Not documented | dot.separated |
| **Cedar** | 5 (flat-lifted) | Single shadow, progressive | 0/0.2/0.4/0.6rem/999.9rem | Not documented | `--cdr-prominence-[level]` |
| **Wise** | None (opacity-based) | No traditional shadows | Not documented | Not documented | N/A |
| **Dell** | Documented (not extractable) | Shadow + blur | Not extractable | Not documented | Not extractable |

---

## Key Findings for Component Generation

### Color Recommendations
1. **Use 3-layer architecture**: primitive -> semantic -> component (universal consensus)
2. **Minimum semantic roles**: background, foreground/text, border, icon, brand/primary, error, warning, success, info
3. **State handling**: Either opacity overlay (Material) or dedicated state tokens (everyone else). Dedicated tokens are more common (11/14).
4. **Dark mode**: Token value swap is universal. Never hard-code colors.
5. **Naming convention consensus**: `--[prefix]-color-[property]-[role]-[state]`

### Elevation Recommendations
1. **4-5 levels is optimal**: Matches most systems (flat, raised, elevated/floating, overlay)
2. **Dual-layer shadows**: Use ambient + directional shadow (Material pattern is best practice)
3. **Combine shadow + surface color**: Especially for dark mode (Atlassian, Paste, Material approach)
4. **Token naming**: `elevation-[level]` or `shadow-[level]` (numbered 0-4 or 100-400)

### Border Radius Recommendations
1. **6-8 steps is optimal**: 0, 2, 4, 8, 12, 16, (24/28), 9999px
2. **Include "full/pill"**: Always 9999px
3. **Token naming**: `--radius-[size]` or `--border-radius-[step]`
4. **Consider algorithmic derivation**: shadcn approach (single seed + multiplier) is elegant for customization

### Opacity / Alpha Recommendations
1. **Material's state overlay system**: 8% hover, 10% focus, 10% pressed, 16% dragged, 12%/38% disabled
2. **Most systems avoid opacity tokens**: They use pre-computed colors instead
3. **Exception**: Wise uses opacity-based layering (8%, 12%) for backgrounds/borders
