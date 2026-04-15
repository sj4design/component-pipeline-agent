# Design System Reference

> Unified design system for AI-driven component generation. Consolidates foundations, property rules, and naming conventions into a single source of truth. Based on consensus across 24 industry design systems.

---

## 1. Design Philosophy

- **Cross-system consensus**: Every value is backed by research across 24 design systems (Material, Spectrum, Carbon, Polaris, Atlassian, Ant, Paste, Lightning, Primer, shadcn/ui, Playbook, Cedar, Wise, Dell, Radix, Chakra, GOV.UK, Base Web, Fluent 2, Gestalt, Mantine, Orbit, Evergreen, Nord)
- **Token-first**: All visual properties resolve to tokens, never hardcoded values
- **3-layer architecture**: Primitive → Semantic → Component tokens
- **Figma ↔ Code alignment**: Zero ambiguity between Figma variants and React props
- **Density-aware**: Compact (75%), Default (100%), Comfortable (125%) modes supported

---

## 2. Color Architecture

### 2.1 Token Layers (13/14 systems use 3 layers)

| Layer | Purpose | Example |
|-------|---------|---------|
| **Primitive** | Raw palette values | `blue-500: #2563EB` |
| **Semantic** | UI roles | `--color-bg-brand: {blue-500}` |
| **Component** | Scoped to component | `--btn-bg-primary: {color-bg-brand}` |

### 2.2 Semantic Color Roles (minimum required)

| Role | Prevalence | Token Pattern | Use |
|------|-----------|---------------|-----|
| Background | 14/14 | `bg`, `surface` | Surface backgrounds |
| Foreground/Text | 14/14 | `text`, `fg` | Text and icons |
| Border | 14/14 | `border` | Borders and dividers |
| Brand/Primary | 14/14 | `primary`, `brand` | Primary actions |
| Interactive | 12/14 | `interactive`, `action` | Links, secondary buttons |
| Error/Danger | 14/14 | `error`, `danger`, `critical` | Errors, destructive |
| Warning | 14/14 | `warning`, `attention` | Caution |
| Success | 14/14 | `success`, `positive` | Confirmation |
| Info | 13/14 | `info`, `discovery` | Neutral information |
| Overlay | 10/14 | `overlay`, `blanket` | Modal backdrops |
| Inverse | 8/14 | `inverse` | Text on bold backgrounds |

### 2.3 Background/Surface Hierarchy

| Level | Token Pattern | Use |
|-------|--------------|-----|
| Base | `bg`, `bg-base` | App background |
| Surface | `bg-surface` | Cards, containers |
| Elevated | `bg-elevated` | Popovers, dropdowns |
| Fill | `bg-fill` | Solid interactive elements |

### 2.4 State Color Strategy

**Consensus: dedicated state tokens** (11/14 systems). Pattern: `--color-{element}-{role}-{state}`

```
--color-bg-primary              → default
--color-bg-primary-hover        → hover (+1 step darker)
--color-bg-primary-active       → pressed (+2 steps)
--color-bg-primary-disabled     → disabled (reduced opacity)
```

### 2.5 Focus Ring (14/14 consensus)

| Property | Value | Consensus |
|----------|-------|-----------|
| Width | 2px | 12/14 |
| Color | `interactive.default` (brand primary) | 11/14 |
| Offset | 2px | 10/14 |
| Contrast | ≥ 3:1 against adjacent colors | 14/14 |
| Technique | `:focus-visible` (not `:focus`) | 12/14 |

```
--focus-ring-color: {interactive.default}
--focus-ring-width: 2px
--focus-ring-offset: 2px
```

### 2.6 Disabled State (14/14)

| Approach | Systems | Value |
|----------|---------|-------|
| Opacity reduction | 10/14 | `opacity: 0.38–0.5` |
| Muted colors | 4/14 | Dedicated `disabled` token |

```
--disabled-opacity: 0.5
--color-bg-disabled: {gray-200}
--color-text-disabled: {gray-500}
```

### 2.7 Dark Mode

Universal: token value swap. Same token name, different values.

| Method | Systems |
|--------|---------|
| CSS custom property swap | Polaris, Primer, shadcn, Wise |
| data-attribute toggle | Atlassian, Lightning |
| ConfigProvider/Theme | Ant, Material |
| Multiple themes (>2) | Spectrum (4+), Primer (9), Carbon (4) |

### 2.8 Color Token Naming

```
--{prefix}-color-{property}-{role}-{variant}-{state}

Examples:
--p-color-bg-surface-brand-hover          (Polaris)
--md-sys-color-on-surface-variant         (Material)
--ant-color-primary-hover                 (Ant)
```

---

## 3. Typography Scale

### 3.1 Body Text

| Role | Size | Line Height | Weight | Letter Spacing |
|------|------|-------------|--------|----------------|
| Body Default | 14px | 20px (1.43) | 400 | 0 |
| Body Large | 16px | 24px (1.5) | 400 | 0 |
| Body Small / Caption | 12px | 16px (1.33) | 400 | +0.1-0.3px |
| Label Default | 14px | 20px | 500 | 0 |
| Label Small | 12px | 16px | 500 | +0.1px |

**14px** is body default in 10/14 systems.

### 3.2 Headings (product UI)

| Level | Size | Line Height | Weight |
|-------|------|-------------|--------|
| H1 / XXL | 32px | 40px (1.25) | 600 |
| H2 / XL | 28px | 36px (1.29) | 600 |
| H3 / L | 24px | 32px (1.33) | 600 |
| H4 / M | 20px | 28px (1.4) | 600 |
| H5 / S | 16px | 24px (1.5) | 600 |
| H6 / XS | 14px | 20px (1.43) | 600 |

### 3.3 Font Weight Usage

| Use | Weight | Notes |
|-----|--------|-------|
| Body copy | 400 | Universal |
| Labels, emphasis | 500-600 | 500 = medium, 600 = semibold |
| Headings sm-md | 600 | More common than 700 |
| Headings lg+ | 400 | Many DS reduce weight at large sizes |

### 3.4 Line Height Pattern

Ratio inversely proportional to size. All values aligned to 4px grid.

| Size | Ratio | Value |
|------|-------|-------|
| 12px | 1.33 | 16px |
| 14px | 1.43 | 20px |
| 16px | 1.5 | 24px |
| 20px | 1.4 | 28px |
| 24px | 1.33 | 32px |
| 28px | 1.29 | 36px |
| 32px | 1.25 | 40px |

### 3.5 Letter Spacing Rules

| Size Range | Spacing | Reason |
|-----------|---------|--------|
| ≤12px | +0.1 to +0.3px | Improve legibility at small sizes |
| 14-16px | 0 | Neutral, optimal size |
| ≥20px | -0.5 to -3% | Tighten for headings |

### 3.6 Token Naming

```
--font-size-{step}      → e.g. --font-size-350 = 14px
--line-height-{step}    → e.g. --line-height-400 = 20px
--font-weight-{name}    → e.g. --font-weight-medium = 500
```

---

## 4. Spacing & Layout

### 4.1 Base Unit

**8px** (Atlassian Design System). Token base: `space.100 = 8px`. All spacing values are multiples.

### 4.2 Spacing Scale

| Token | Multiplier | px | rem | Range |
|-------|-----------|-----|-----|-------|
| space.0 | 0× | 0 | 0 | — |
| space.025 | 0.25× | 2 | 0.125 | Small |
| space.050 | 0.5× | 4 | 0.25 | Small |
| space.075 | 0.75× | 6 | 0.375 | Small |
| space.100 | 1× | 8 | 0.5 | Small |
| space.150 | 1.5× | 12 | 0.75 | Medium |
| space.200 | 2× | 16 | 1 | Medium |
| space.250 | 2.5× | 20 | 1.25 | Medium |
| space.300 | 3× | 24 | 1.5 | Medium |
| space.400 | 4× | 32 | 2 | Large |
| space.500 | 5× | 40 | 2.5 | Large |
| space.600 | 6× | 48 | 3 | Large |
| space.800 | 8× | 64 | 4 | Large |
| space.1000 | 10× | 80 | 5 | Large |

**Usage ranges:**
- **Small (0–8px):** Compact UI — icon↔text gaps, small component padding, input padding
- **Medium (12–24px):** Mid-size components — container padding, avatar↔content spacing, card vertical spacing
- **Large (32–80px):** Layout — section spacing, large content alignment

**Rule:** Every padding and gap value MUST be a token from the scale (0,2,4,6,8,12,16,20,24,32,40,48,64,80). No intermediate values allowed.

### 4.3 Size-Aware Padding (per component size)

Components with `Size` variant use this table for trigger/header padding:

| Size | Pad-Y | Pad-X | Height* | Tokens |
|------|-------|-------|---------|--------|
| sm | 8px | 12px | ~36px | space.100 / space.150 |
| md | 12px | 16px | ~44px | space.150 / space.200 |
| lg | 16px | 16px | ~52px | space.200 / space.200 |

*Assuming ~20px text line (14px font + line-height).

### 4.4 Component Spacing Map

#### Buttons & interactive controls

| Element | Pad-Y | Pad-X | Icon↔Text gap |
|---------|-------|-------|---------------|
| Button sm | 8 | 12 | 6 |
| Button md | 12 | 16 | 8 |
| Button lg | 16 | 20 | 8 |
| IconButton sm | 6 | 6 | — |
| IconButton md | 8 | 8 | — |
| IconButton lg | 12 | 12 | — |
| Checkbox/Radio/Switch gap | — | — | 8 |

#### Inputs & form fields

| Element | Pad-Y | Pad-X | Label↔Input | Helper gap |
|---------|-------|-------|-------------|------------|
| Input sm | 6 | 8 | — | — |
| Input md | 8 | 12 | — | — |
| Input lg | 12 | 16 | — | — |
| InputGroup label↔input | — | — | 4 | — |
| InputGroup input↔helper | — | — | 4 | — |
| Form fields vertical gap | — | — | — | 16 |

#### Notification containers

| Element | Pad | Icon↔Title | Footer gap |
|---------|-----|-----------|------------|
| Toast header | 16 all | 8 | — |
| Alert header | 16 all | 8 | — |
| Banner | 12V/16H | 8 | 12 |

#### Navigation & tabs

| Element | Pad-Y | Pad-X | Tab↔Tab | Panel pad |
|---------|-------|-------|---------|-----------|
| Tab sm | 8 | 12 | 0 | 16 |
| Tab md | 12 | 16 | 0 | 16 |
| Tab lg | 16 | 16 | 0 | 16 |

#### Cards & containers

| Element | Pad | Header↔Body | Body↔Footer |
|---------|-----|-------------|-------------|
| Card sm | 12 | 8 | 12 |
| Card md | 16 | 12 | 16 |
| Card lg | 24 | 16 | 16 |
| Dialog/Modal body | 24 | 16 | 24 |
| Popover | 12 | 8 | 12 |
| Tooltip | 6V/8H | — | — |

#### Subcomponent universal rules

| Subcomponent | Spacing rule |
|-------------|-------------|
| Icon inside button/input | gap = space.100 (8px) |
| Close button (X) | size 20×20, gap = space.100 (8px) |
| Status icon | size 16×16, gap = space.100 (8px) |
| Chevron | size 16×16, gap = space.100 (8px) |
| Badge/counter | gap = space.050 (4px) |
| Helper/error text | gap = space.050 (4px) |
| Divider | margin-v = space.100 (8px) |
| Avatar | gap = space.100-150 (8-12px) |

### 4.5 Breakpoints

| Name | Min-width | Columns | Use |
|------|-----------|---------|-----|
| xs | 0px | 4 | Mobile portrait |
| sm | 480px | 4 | Mobile landscape |
| md | 768px | 8 | Tablet |
| lg | 1024px | 12 | Desktop |
| xl | 1280px | 12 | Large desktop |
| xxl | 1440px | 12 | Wide desktop |

### 4.6 Grid

- **12 columns** desktop (11/14 systems)
- **Gutters:** 16px (compact), 24px (default), 32px (comfortable)
- **Margins:** 16px mobile → 24px tablet → 32-48px desktop

### 4.7 Density Modes

| Mode | Multiplier | Use |
|------|-----------|-----|
| Compact | 75% | Data-dense UIs, tables |
| Default | 100% | General use |
| Comfortable | 125% | Content-heavy, reading |

---

## 5. Depth & Elevation

### 5.1 Elevation Levels (consensus: 4-5)

| Level | Token | Use | Shadow |
|-------|-------|-----|--------|
| 0 / Flat | `elevation-0` | Base, inline | none |
| 1 / Raised | `elevation-1` | Cards, tiles | `0 1px 2px rgba(0,0,0,0.1)` + `0 1px 3px rgba(0,0,0,0.08)` |
| 2 / Elevated | `elevation-2` | Dropdowns, popovers | `0 2px 6px rgba(0,0,0,0.1)` + `0 4px 8px rgba(0,0,0,0.08)` |
| 3 / Floating | `elevation-3` | Modals, dialogs | `0 4px 12px rgba(0,0,0,0.12)` + `0 8px 24px rgba(0,0,0,0.08)` |
| 4 / Overlay | `elevation-4` | Notifications, top-level | `0 8px 16px rgba(0,0,0,0.14)` + `0 12px 32px rgba(0,0,0,0.1)` |

**Best practice: dual-layer shadows** (ambient + key light).

### 5.2 Dark Mode Elevation

Surface color shift: lighter surfaces = more elevated. Shadows less effective in dark mode → combine with surface tint.

### 5.3 Token Naming

```
--shadow-{level}      → e.g. --shadow-200
--elevation-{level}   → e.g. elevation.shadow.raised
```

---

## 6. Radius & Sizing

### 6.1 Radius Scale

| Step | px | Use | Token |
|------|-----|-----|-------|
| none | 0 | Sharp corners | `--radius-0` |
| xs | 2px | Checkboxes, tags | `--radius-050` |
| sm | 4px | Inputs, buttons sm | `--radius-100` |
| md | 8px | Cards, buttons default | `--radius-200` |
| lg | 12px | Modals, containers | `--radius-300` |
| xl | 16px | Large panels | `--radius-400` |
| 2xl | 28px | Floating action buttons | `--radius-700` |
| full | 9999px | Pill buttons, badges | `--radius-full` |

### 6.2 Radius by Component

| Component | Typical radius |
|-----------|---------------|
| Button | 6-8px (md) |
| Input | 6-8px (md) |
| Card | 8-12px (md-lg) |
| Modal/Dialog | 12-16px (lg-xl) |
| Chip/Tag | 4-6px or pill |
| Badge | pill (full) |
| Checkbox | 2-4px (xs-sm) |
| Avatar | full (circular) |
| Tooltip | 4-8px (sm-md) |

### 6.3 Control Heights

| Size | Height | Font Size | Icon Size |
|------|--------|-----------|-----------|
| xs | 24px | 12px | 12-14px |
| sm | 32px | 12-14px | 16px |
| md | 40px | 14px | 20px |
| lg | 48px | 16px | 20-24px |
| xl | 56px | 18px | 24px |

### 6.4 Icon Sizes

| Step | px | Use |
|------|-----|-----|
| xs | 12px | Inline, decorative |
| sm | 16px | Buttons sm, inputs |
| md | 20px | Default in components |
| lg | 24px | Buttons lg, standalone |
| xl | 32px | Empty states, hero |

---

## 7. Component Property Rules

### 7.1 Property Taxonomy

Every component property belongs to exactly ONE type:

| Type | Trigger | Figma mechanism | Multiplies frames? | Code equivalent |
|------|---------|-----------------|:-------------------:|-----------------|
| **size** | Design decision | Variant property | YES | `size` enum prop |
| **variant** | Design decision | Variant property | YES | `variant`/`appearance` enum |
| **state** | USER interaction | Variant property | YES | CSS pseudo-classes + JS |
| **status** | SYSTEM/data | Variant or boolean | Context¹ | `status` enum or `isInvalid` |
| **boolean** | CONFIG toggle | Boolean property | NO | `is*` boolean prop |
| **slot** | Content presence | Instance swap + boolean | NO | `children`/`ReactNode` prop |
| **overlay** | Async process | Prototype or boolean | NO | `isLoading` boolean + spinner |
| **token** | Theme/brand | Figma Variables | NO — uses modes | CSS variables / design tokens |

¹ Status multiplies only if distinct visual frames are needed.

### 7.2 The 3 Classification Rules

**Rule 1 — State = USER interaction**
```
"Does this change because the user physically interacts?"
→ YES → state (variant, mutually exclusive)
Values: default, hover, focus, pressed, active, selecting
```

**Rule 2 — Status = SYSTEM feedback**
```
"Does this communicate meaning or system condition?"
→ YES → status
Values: error, warning, success, info
Can coexist with state (error + hover is valid)
```

**Rule 3 — Boolean = on/off CONFIG toggle**
```
"Is this a binary condition toggled by a parent?"
→ YES → boolean
Values: true / false (disabled, readonly, required, selected, loading)
```

### 7.3 Critical Classifications

| Property | Classification | Evidence |
|----------|---------------|----------|
| **disabled** | BOOLEAN (default) or VARIANT (if fills change) | See decision tree below |
| **readonly** | BOOLEAN | Focusable + copyable, minimal visual change |
| **required** | BOOLEAN | Adds asterisk only |
| **selected** | BOOLEAN (separate from state) | `selected + hover` is valid |
| **loading** | BOOLEAN / OVERLAY | Toggle spinner layer, set opacity 0.5 |
| **error** | STATUS | Changes border + shows error icon/text |

**Disabled decision tree:**
```
1. Only changes opacity? → BOOLEAN (opacity 0.38–0.5)
2. Changes fills + text colors + effects? → VARIANT (add exclusions for disabled × hover/focus/pressed)
3. Only opacity + cursor? → BOOLEAN
4. Default: ≤1 property change → BOOLEAN, ≥2 → VARIANT
```

### 7.4 Frame Multiplication Formula

```
GROSS frames = sizes × variants × states
NET frames   = gross − excluded combinations

Booleans     → DO NOT multiply
Slots        → DO NOT multiply (instance swap)
Overlays     → DO NOT multiply
Tokens       → DO NOT multiply (Figma Variable modes)
Status       → Default: DO NOT multiply (boolean)
```

**NEVER enters the variant matrix:** mode (dark/light), theme, breakpoint, density, shape (if only color change), elevation, color (brand palette). Use Figma Variable Modes instead.

### 7.5 Exclusion Patterns

| Pattern | Reason | Frames saved |
|---------|--------|:------------:|
| disabled + interaction state | Disabled blocks all interaction | N states − 1 |
| readonly + error | Readonly doesn't validate | 1 per combo |
| small + complex slot | Not enough physical space | varies |

### 7.6 Figma Practical Limits

| Range | Recommendation |
|-------|----------------|
| 10–50 frames | Target for simple components |
| 50–100 frames | Target for medium components |
| 100–200 frames | Maximum for complex components |
| 200+ frames | Split into sub-components |

### 7.7 Optimization Techniques

1. **Boolean extraction** (50% reduction) — move show/hide from variants to boolean properties
2. **Instance swap** (80-95%) — replace icon/avatar variant rows with instance swap slots
3. **Component decomposition** (40-60%) — split multi-purpose into purpose-built components
4. **Variables for theme/mode** (50-75%) — never duplicate for dark mode, density, or brand
5. **Slots for composable regions** (60-90%) — replace visibility props with slot composition
6. **Interactive components** (60-80%) — use Figma interactions for hover/focus/pressed
7. **P0/P1/P2 priority tiering** — not all combinations need visible frames

---

## 8. Naming Conventions

### 8.1 The Golden Rule — 3 Sequential Questions

```
1. Does it change slots or API?       → Separate component
2. Does it change function or mode?   → type
3. Does it only change appearance?    → variant
```

If a component needs `type` AND `variant` simultaneously → probably two distinct components.

### 8.2 The 9 Standard Axes

| Prop | What varies | Typical values | Multiplies frames |
|------|------------|----------------|:-----------------:|
| `size` | Physical dimension | sm · md · lg · xl | YES |
| `variant` | Visual appearance | filled · outline · ghost · soft | YES |
| `type` | Functional mode | single · multiple · range | YES |
| `shape` | Geometric shape | circle · square · pill | YES |
| `density` | Info density | compact · default · loose | YES |
| `State` | User interaction | default · hover · focus · disabled | YES |
| `Status` | System condition | none · error · warning · success | YES |
| `Boolean` | Slot visibility | true · false | NO |
| `Overlay` | System process | true · false (loading) | NO |

### 8.3 Translation Table

When research finds these names, map to standard:

| Found name | System(s) | Map to |
|-----------|----------|--------|
| `kind` | Carbon | `variant` |
| `appearance` | Polaris, Atlassian | `variant` |
| `intent` | Blueprint, Primer | `variant` |
| `emphasis` | various | `variant` |
| `color` (as appearance) | Material, MUI | `variant` |
| `mode` | various | `type` |
| `behavior` | various | `type` |
| `style` (as shape) | various | `shape` |
| `isDisabled` | Spectrum | `disabled` → State |
| `isInvalid` | Spectrum | `Status = error` |
| `tone` | Polaris v12 | `variant` or `Status` by context |

### 8.4 Figma ↔ Code Alignment

| Figma property | Code prop | Convention |
|----------------|-----------|------------|
| Variant "Size" | `size` | Lowercase enum: `sm`, `md`, `lg` |
| Variant "Type"/"Variant" | `variant` or `appearance` | Lowercase enum |
| Variant "State" | CSS pseudo-classes | `:hover`, `:focus-visible`, `:active` |
| Boolean "Disabled" | `isDisabled` | `is` + PascalCase |
| Boolean "Loading" | `isLoading` | `is` + PascalCase |
| Instance swap "Icon Before" | `iconBefore` | camelCase, `ReactNode` type |
| Text property "Label" | `label` or `children` | string prop |

**All boolean properties use the `is` prefix** in both Figma and code for 1:1 mapping.

---

## 9. Do's and Don'ts

### Do

- Use token scale values for ALL spacing (0,2,4,6,8,12,16,20,24,32,40,48,64,80)
- Use Figma Variable Modes for dark/light, density, brand theming
- Use boolean properties for show/hide toggles (don't multiply frames)
- Use instance swap for icon/avatar slots (don't multiply frames)
- Map State to CSS pseudo-classes (hover, focus-visible, active)
- Keep disabled as boolean when only opacity changes
- Align all line-height values to 4px grid
- Use dual-layer shadows for elevation
- Keep frame count under 200 for complex components

### Don't

- Create `Theme=Dark` or `Breakpoint=Mobile` as variant properties
- Use `State=Disabled` as a variant value (unless fills change structurally)
- Use intermediate spacing values outside the token scale
- Mix state and status in the same axis (they're orthogonal)
- Create more than 5 questions in guided scope mode
- Hardcode color values at the component level (use semantic tokens)
- Skip exclusion patterns (disabled × hover wastes frames)
- Create font sizes outside the type scale
- Use weight 700 for headings (prefer 600 or lighter at large sizes)

---

## 10. Agent Quick Reference

### Spacing cheat sheet
```
2px = space.025    |  12px = space.150   |  32px = space.400
4px = space.050    |  16px = space.200   |  40px = space.500
6px = space.075    |  20px = space.250   |  48px = space.600
8px = space.100    |  24px = space.300   |  64px = space.800
```

### Control heights
```
xs=24px  sm=32px  md=40px  lg=48px  xl=56px
```

### Icon sizes
```
xs=12px  sm=16px  md=20px  lg=24px  xl=32px
```

### Radius quick ref
```
xs=2px  sm=4px  md=8px  lg=12px  xl=16px  2xl=28px  full=9999px
```

### Typography quick ref
```
Caption: 12/16 w400    Body: 14/20 w400    Body-lg: 16/24 w400
Label: 14/20 w500      H6: 14/20 w600     H5: 16/24 w600
H4: 20/28 w600         H3: 24/32 w600     H2: 28/36 w600     H1: 32/40 w600
```

### Focus ring
```
color: interactive.default  |  width: 2px  |  offset: 2px  |  :focus-visible
```

### Disabled
```
opacity: 0.5 (default)  |  blocks all interaction states  |  cursor: not-allowed
```

### Frame formula
```
GROSS = sizes × variants × states
NET   = gross − exclusions
Booleans/Slots/Overlays/Tokens → NEVER multiply
```
