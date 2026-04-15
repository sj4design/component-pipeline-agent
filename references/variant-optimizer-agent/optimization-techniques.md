# Optimization Techniques Reference

Detailed techniques for reducing component variant count while maintaining full design coverage.
Ranked by impact. Based on research across 24 design systems + Figma best practices.

## Section Index (use offset/limit to read only what you need)

| Technique | Lines | Impact | Use when |
|-----------|-------|--------|----------|
| 1. Boolean Extraction | 20–52 | 50% per boolean | Presence/absence variants (icon, label) |
| 2. Instance Swap | 53–77 | Variable | Icon/slot variations |
| 3. Component Decomposition | 78–112 | 30–60% | Large monolithic components |
| 4. Figma Variable Modes | 113–146 | Removes dimensions | mode/theme/density/shape |
| 5. Slot Composition | 147–187 | 40–70% | Multiple optional regions |
| 6. Interactive Components | 188–218 | Removes state rows | hover/focus/pressed states |
| 7. Priority Tiering (P0/P1/P2) | 219–245 | Defers frames | Large component families |
| Optimization priority order | 246–260 | — | Execution sequence |
| Real-world benchmarks | 261–285 | — | Frame budget validation |

---

## Technique 1: Boolean Extraction

**Impact**: 50% reduction per boolean extracted
**When**: A variant property has 2 values where one is "with X" / "without X"

### Pattern
```
BEFORE (variant row):
  Icon: [with-icon, without-icon]  ← multiplies all other properties × 2
  Frames: 20 base × 2 = 40

AFTER (boolean property):
  Show Icon: [true, false]  ← boolean toggle, doesn't multiply
  Frames: 20 base + boolean = 20
```

### Common extractions
| Variant value | Boolean property | Code prop |
|---------------|-----------------|-----------|
| With icon / Without icon | Show Icon | `icon?: ReactNode` |
| With label / Without label | Show Label | `label?: string` |
| With description / Without | Show Description | `description?: string` |
| With clear / Without clear | Show Clear Button | `isClearable` |
| With avatar / Without | Show Avatar | `avatar?: ReactNode` |
| With helper / Without | Show Helper Text | `helperText?: string` |

### DS evidence
- Atlassian: `iconBefore`, `iconAfter` as boolean + instance swap
- Polaris: `icon` as optional prop, presence controls visibility
- Spectrum: `isQuiet` as boolean instead of `Variant=quiet`

---

## Technique 2: Instance Swap

**Impact**: 80–95% reduction for content dimensions
**When**: A variant property represents interchangeable content (icons, avatars)

### Pattern
```
BEFORE (variant per icon):
  Icon: [search, close, check, arrow, plus, ...]  ← 12+ values
  Frames: 20 base × 12 = 240

AFTER (instance swap):
  Icon: instance swap property → any icon component
  Frames: 20 base = 20
```

### Best practice
- Create a `_Placeholder` or `_Empty` icon component for "no icon" state
- Figma has no native "null" for instance swap — the placeholder solves this
- Combine with boolean: `Show Icon` (boolean) + `Icon` (instance swap)
  - Boolean controls visibility, swap controls which icon
  - In code: `icon?: ReactNode` — presence = visible, value = content

---

## Technique 3: Component Decomposition

**Impact**: 40–60% reduction
**When**: A component serves multiple distinct purposes or has > 5 variant properties

### Atlassian Button case study
```
BEFORE: One Button component
  Types: default, primary, subtle, warning, danger, link, subtle-link
  Modes: text, icon-only, icon+text, split
  = complex matrix with many invalid combos

AFTER: 6 purpose-built components
  Button         → standard actions (5 appearances × 2 spacing)
  IconButton     → icon-only actions (5 appearances × 2 spacing)
  LinkButton     → navigation links styled as buttons
  LinkIconButton → icon-only navigation
  SplitButton    → action + dropdown
  ButtonGroup    → container for related buttons
```

### When to decompose
- Component has variants that only apply to certain modes (icon-only props on text button)
- Name contains "or" (Button or Link → separate components)
- Designer frequently uses only a subset of variants
- > 5 variant dimensions = likely decomposition candidate

### How to decompose
1. Identify the distinct USE CASES (not visual differences)
2. Create one component per use case
3. Share common properties through component composition or shared styles
4. Verify: each sub-component should have ≤ 3 variant properties

---

## Technique 4: Figma Variable Modes

**Impact**: 50–75% reduction (eliminates entire dimensions)
**When**: A property changes uniformly across the entire component (color, spacing, radius)

### What MUST be Variables (never variants)
| Property | Variable Collection | Modes |
|----------|-------------------|-------|
| Dark/Light mode | Theme | light, dark |
| Brand theme | Brand | brand-a, brand-b |
| Density | Density | default, compact, spacious |
| Border radius / shape | Shape | rounded, square, pill |
| Breakpoint | Layout | mobile, tablet, desktop |
| Elevation | Elevation | none, low, medium, high |

### DS evidence (6/6 Tier 1 consensus)
- Material Design 3: Variable modes for dark/light, density
- Carbon: Themes as variable collections (white, g10, g90, g100)
- Spectrum: Scale (medium/large) as variable mode
- Atlassian: Spacing, colors as variables
- Polaris: Color schemes as variable modes
- Ant Design: Token system maps to Figma variables

### Anti-pattern
```
❌ WRONG: Variant "Theme" = [Light, Dark]
   Impact: doubles every frame (40 → 80)

✅ RIGHT: Variable mode "Theme" = [Light, Dark]
   Impact: zero extra frames, swap entire page at once
```

---

## Technique 5: Slot Composition (Configuration Collapse)

**Impact**: 60–90% reduction for complex components
**When**: A component has multiple visibility toggles (showX, hideY, withZ)

### Nathan Curtis's principle
> "An increase in component slots and custom compositions could lead to a decrease in the need for configurable properties."

### Pattern
```
BEFORE (boolean explosion):
  Show Header: [true, false]
  Show Image: [true, false]
  Show Actions: [true, false]
  Show Footer: [true, false]
  = 2⁴ = 16 combinations, many invalid

AFTER (slot composition):
  Card = container with slots
  CardHeader, CardImage, CardActions, CardFooter = sub-components
  Designer drops in what they need
  = 1 base Card + 4 optional sub-components
```

### Implementation in Figma
- Use nested component instances for each slot
- Slot visibility = instance swap with `_Empty` placeholder
- Or use Figma's new Slots feature (open beta 2025)

### Implementation in code
```jsx
<Card>
  <CardHeader title="..." />     {/* optional */}
  <CardImage src="..." />        {/* optional */}
  <CardBody>...</CardBody>       {/* required */}
  <CardActions>...</CardActions>  {/* optional */}
</Card>
```

---

## Technique 6: Interactive Components for States

**Impact**: 60–80% reduction in visible frames
**When**: Interaction states only change color/shadow/border (no structural changes)

### Pattern
```
BEFORE (states as variants):
  State: [default, hover, focus, pressed, disabled]
  Frames: 5 types × 5 states = 25 visible frames

AFTER (interactive components):
  State: [default] only visible
  Hover, focus, pressed = prototype interactions
  Disabled = boolean property
  Frames: 5 types × 1 state = 5 visible frames
```

### When to keep states as variants
- State changes layout (e.g., focus adds a helper text area)
- State changes structure (e.g., active adds a checkmark icon)
- Documentation requires showing all states side by side
- The component is being built as a reference library (not production)

### When to use interactive components
- State only changes: fill color, border color, shadow, opacity
- The component is for production use by product designers
- Performance is a concern (fewer frames = faster loading)

---

## Technique 7: Priority Tiering (P0/P1/P2)

**Impact**: 70–80% reduction in visible complexity
**When**: A component has many valid combinations but not all need dedicated frames

### Tiers
| Tier | Definition | Visibility |
|------|-----------|------------|
| **P0** | Core — must exist as a Figma frame | Always visible |
| **P1** | Important — should exist for documentation | Visible in review |
| **P2** | Edge case — valid but rarely used | Documented, not framed |

### What goes where
- **P0**: Default state × all sizes × all primary variants
- **P1**: Hover, focus states × most common size
- **P2**: Pressed state, rare size+variant combos, edge cases

### Frame formula with tiering
```
BEFORE: 3 sizes × 4 variants × 5 states = 60 frames (all P0)
AFTER:  3 × 4 × 1 (default) = 12 P0 + 1 × 4 × 4 (other states) = 16 P1
        Total visible: 12 P0 frames (designer's daily view)
        Total documented: 28 frames (review mode)
```

---

## Optimization priority order

When a component exceeds its frame budget, apply techniques in this order:

1. **Variable migration** — highest impact, zero frames for mode/theme/density
2. **Misclassification fix** — disabled/selected as boolean saves N×(states-1) frames
3. **Instance swap** — eliminate content dimensions entirely
4. **Boolean extraction** — halve the matrix per extraction
5. **Interactive components** — reduce state visibility by 60-80%
6. **Decomposition** — split when > 5 variant properties
7. **Slot composition** — replace visibility props with composable sub-components
8. **Priority tiering** — reduce visible complexity without losing coverage

---

## Real-world benchmarks

### Optimized button frame counts
| Design System | Frames | Technique used |
|---------------|:------:|----------------|
| M3 Button | 10 | 5 types × 2 (icon toggle) |
| Polaris Button | 12 | 3 sizes × 4 variants |
| Atlassian Button | ~20 | 5 appearances × 2 spacing + booleans |
| Carbon Button | ~30 | 4 types × 3 sizes + states |

### Optimized input frame counts
| Design System | Frames | Technique used |
|---------------|:------:|----------------|
| M3 TextField | 10 | 2 types × 5 states |
| Atlassian TextField | ~15 | Minimal states, booleans for rest |
| Polaris TextField | 12 | 3 sizes × status booleans |
| Carbon TextInput | 48 | More states exposed as frames |

### Target budget reference
| Complexity | Frame budget | Example components |
|------------|:-----------:|-------------------|
| Simple | 10–30 | Button, Badge, Tag, Avatar, Chip |
| Medium | 30–80 | Input, Select, Checkbox, Radio, Toggle |
| Complex | 80–150 | DatePicker, Table, Dialog, Navigation |
| Family total | < 200 | All components in a family combined |
