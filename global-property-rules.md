# Global Property Rules

Authoritative reference for classifying, optimizing, and aligning component properties across design (Figma) and development (React/Web). Used by ALL agents in the pipeline.

> **Goal**: Zero ambiguity between what a designer builds in Figma and what a developer implements in code.

---

## 1. Property Taxonomy

Every component property belongs to exactly ONE type:

| Type | Trigger | Figma mechanism | Multiplies frames? | Code equivalent |
|------|---------|-----------------|:-------------------:|-----------------|
| **size** | Design decision | Variant property | YES | `size` enum prop |
| **variant** | Design decision | Variant property | YES | `variant`/`appearance` enum prop |
| **state** | USER interaction | Variant property | YES | CSS pseudo-classes + JS |
| **status** | SYSTEM/data | Variant or boolean | Context¹ | `status` enum or `isInvalid` boolean |
| **boolean** | CONFIG toggle | Boolean property | NO | `is*` boolean prop |
| **slot** | Content presence | Instance swap + boolean | NO | `children`/`ReactNode` prop |
| **overlay** | Async process | Prototype or boolean | NO | `isLoading` boolean + spinner |
| **token** | Theme/brand | Figma Variables | NO — uses modes | CSS variables / design tokens |

¹ Status multiplies only if the designer needs distinct visual frames (e.g., error border + icon change). Default: boolean.

---

## 2. The 3 Classification Rules

### Rule 1 — State = USER interaction
```
"Does this change because the user physically interacts?"
  → YES → state (variant property, mutually exclusive)

Values: default, hover, focus, pressed, active, selecting
CSS equivalents: :hover, :focus-visible, :active
Only ONE state at a time.
```

### Rule 2 — Status = SYSTEM feedback
```
"Does this communicate meaning or system condition?"
  → YES → status

Values: error, warning, success, info
These are semantic — they tell the user about the system's response.
Status CAN coexist with state (error + hover is valid).
```

### Rule 3 — Boolean = on/off CONFIG toggle
```
"Is this a binary condition that can be toggled by a parent?"
  → YES → boolean

Values: true / false
Examples: disabled, readonly, required, selected, loading
These are configuration switches set by the parent component or system.
```

**When in doubt**: check how React implements it. If it's a boolean prop → boolean. If it's an enum → variant or state.

---

## 3. Critical Classifications (DS consensus)

Properties that are commonly misclassified. Based on research across 24 design systems.

### disabled → BOOLEAN, not state
| Evidence | Detail |
|----------|--------|
| React implementation | `isDisabled: boolean` prop (universal) |
| Atlassian | `isDisabled` boolean, maps 1:1 Figma ↔ React |
| Figma behavior | Boolean property, does NOT multiply variant grid |
| Interaction | Blocks ALL states (hover, focus, pressed) — no combo needed |
| Nathan Curtis | Recommends Architecture B (separate boolean) |
| Visual treatment | Only changes opacity (0.38) — no structural change |

**Anti-pattern**: `State = Disabled` as a variant value. This forces N extra frames (one per size × variant) that are visually identical except for opacity.

> **⚠️ Figma generation nuance (Rule 27)**: In CODE, disabled is always a boolean prop. But in FIGMA, when disabled changes fills, text colors, AND effects (not just opacity), it must be implemented as a VARIANT dimension to render correctly — boolean visibility toggling cannot change colors. Evidence: Atlassian (disabled = variant, changes fill to 3% opacity + text to 28% opacity), Polaris (disabled = variant, changes fill + text color + removes effects). The code interface stays `isDisabled: boolean`; only the Figma representation differs. Use exclusions to avoid disabled × hover/focus/pressed combos.

#### Decision tree: disabled as BOOLEAN vs VARIANT

```
1. Does disabled ONLY change opacity?
   → YES → BOOLEAN (set comp.opacity = 0.38–0.5)

2. Does disabled change fills + text colors + effects (structural change)?
   → YES → VARIANT (State=disabled), add exclusions for disabled × hover/focus/pressed

3. Does disabled change ONLY opacity + cursor (no color change)?
   → YES → BOOLEAN (set comp.opacity = 0.38–0.5)

4. Default: if unsure, check the research data — count how many visual properties change.
   ≤ 1 property → BOOLEAN, ≥ 2 properties → VARIANT
```

### readonly → BOOLEAN
| Evidence | Detail |
|----------|--------|
| React | `isReadOnly: boolean` (Spectrum, Atlassian) |
| Behavior | Focusable + copyable (unlike disabled) |
| Visual | Minimal change — remove border or change background |

### required → BOOLEAN
| Evidence | Detail |
|----------|--------|
| React | `isRequired: boolean` (universal) |
| Visual | Adds asterisk to label — slot/boolean, not variant |

### selected → BOOLEAN (separate from state)
| Evidence | Detail |
|----------|--------|
| React | `isSelected: boolean` (universal, as separate prop) |
| Interaction | `selected + hover` is universally valid |
| Figma | Boolean property, not a State variant value |

### loading → BOOLEAN / OVERLAY

**Decision tree: BOOLEAN vs OVERLAY**
```
1. Does loading show a spinner INSIDE the component (replacing content)?
   → BOOLEAN: toggle spinner layer visibility, set comp.opacity = 0.5

2. Does loading show a full-screen or section overlay (blocking interaction)?
   → OVERLAY: separate overlay layer with spinner + backdrop

3. Does loading need its own visual variant (skeleton, shimmer)?
   → VARIANT: if structurally different (skeleton has placeholder shapes)
```

| Evidence | Detail |
|----------|--------|
| React | `isLoading: boolean` (Atlassian, Spectrum) |
| Figma | Boolean toggle showing spinner, maintains dimensions |
| Behavior | Coexists with disabled (loading implies disabled) |

### error → STATUS
| Evidence | Detail |
|----------|--------|
| React | `isInvalid: boolean` (Spectrum) or `status="error"` (Ant) |
| Figma | Can be boolean or variant depending on visual complexity |
| Visual | Changes border color + shows error icon/text |

---

## 4. What Multiplies Frames (Frame Formula)

```
GROSS frames = sizes × variants × states
NET frames   = gross − excluded combinations

Booleans     → DO NOT multiply (Figma boolean property)
Slots        → DO NOT multiply (instance swap)
Overlays     → DO NOT multiply (boolean or prototype)
Tokens       → DO NOT multiply (Figma Variable modes)
Status       → Default: DO NOT multiply (boolean). Designer can override.
```

### What NEVER enters the variant matrix

These properties are resolved through Figma Variables or tokens, NOT component variants:

| Property | Mechanism | DS consensus |
|----------|-----------|:------------:|
| **mode** (dark/light) | Figma Variable Modes | 6/6 |
| **theme** (brand) | Figma Variable Collections | 6/6 |
| **breakpoint** | Figma Variables + Auto Layout | 6/6 |
| **density** (compact/default) | Figma Variable Modes | 5/6 |
| **shape** (rounded/square) | Tokens / Variables | 6/6 (0 use as variant) |
| **elevation** | Tokens (shadow) | 6/6 |
| **color** (brand palette) | Figma Variables | 6/6 |

**Anti-pattern**: Creating `Theme=Dark` or `Breakpoint=Mobile` or `Display=overlay/inline` (with color swap) as variant properties. This doubles/triples every frame for no reason.

**Rule**: If a variant only changes colors (dark→light, overlay dark→inline light), it's a THEME concern, not a variant. Use Figma Variable modes. Only create a variant when the STRUCTURE changes (different slots, different layout, different content).

---

## 5. Figma ↔ Code Alignment Rules

### Naming conventions
| Figma property | Code prop | Convention |
|----------------|-----------|------------|
| Variant "Size" | `size` | Lowercase enum: `sm`, `md`, `lg` |
| Variant "Type"/"Variant" | `variant` or `appearance` | Lowercase enum |
| Variant "State" | CSS pseudo-classes | `:hover`, `:focus-visible`, `:active` |
| Boolean "Disabled" | `isDisabled` | `is` + PascalCase |
| Boolean "Loading" | `isLoading` | `is` + PascalCase |
| Boolean "Selected" | `isSelected` | `is` + PascalCase |
| Boolean "Read Only" | `isReadOnly` | `is` + PascalCase |
| Boolean "Required" | `isRequired` | `is` + PascalCase |
| Instance swap "Icon Before" | `iconBefore` | camelCase, `ReactNode` type |
| Instance swap "Icon After" | `iconAfter` | camelCase, `ReactNode` type |
| Text property "Label" | `label` or `children` | string prop |

### The `is` prefix rule
All boolean properties in Figma AND code use the `is` prefix:
- Figma: `Disabled` → boolean property
- Code: `isDisabled` → boolean prop
- This ensures 1:1 mapping and zero ambiguity during handoff.

### Properties that exist in code but NOT in Figma
| Code prop | Why not in Figma |
|-----------|-----------------|
| `onChange`, `onClick` | Event handlers — no visual representation |
| `aria-label`, `role` | Accessibility — use Nathan Curtis "code-only props" technique |
| `autoFocus`, `tabIndex` | Behavioral — no visual impact |
| `value`, `defaultValue` | Data binding — no visual impact |
| `name`, `id` | Form semantics — no visual impact |
| `className`, `style` | Escape hatches — shouldn't exist in DS |

### Properties that exist in Figma but NOT in code
| Figma property | Why not in code |
|----------------|-----------------|
| State: hover, focus, pressed | Handled by CSS pseudo-classes, not props |
| Annotation layers | Documentation only |
| Placeholder text variants | Single `placeholder` string prop |

---

## 6. Exclusion Patterns

Standard combinations that should be excluded from the variant matrix:

| Pattern | Example | Reason | Frames saved |
|---------|---------|--------|:------------:|
| disabled + interaction state | disabled + hover | Disabled blocks all interaction | N states − 1 per disabled combo |
| readonly + error | readonly + error | Readonly doesn't validate | 1 per readonly combo |
| small + complex slot | sm + clear-button | Not enough physical space | varies |
| dependency | footer without presets | Footer only exists with preset-panel | varies |

---

## 7. Figma Practical Limits

| Range | Experience | Recommendation |
|-------|------------|----------------|
| 10–50 frames | Fast, ideal | Target for simple components |
| 50–100 frames | Comfortable | Target for medium components |
| 100–200 frames | Manageable | Maximum for complex components |
| 200+ frames | Performance degrades | Split into sub-components |
| 1000+ frames | Unusable | Architecture problem — decompose |

### Real-world benchmarks
| Component | DS | Frames | Structure |
|-----------|-----|:------:|-----------|
| Button | M3 | 10 | 5 types × 2 (icon/no-icon) |
| Button | Atlassian | ~20 | 5 appearances × 2 spacing × states |
| Button | Polaris | 12 | 3 sizes × 4 variants |
| TextField | M3 | 10 | 2 types × 5 states |
| TextField | Carbon | 48 | More states exposed |
| TextField | Atlassian | ~15 | 2 sizes × states |

---

## 8. Optimization Techniques (ranked by impact)

### Technique 1: Boolean extraction (50% reduction per boolean)
Move show/hide toggles from variant rows to boolean properties.
```
BEFORE: 20 variants × 2 (with icon / without) = 40 frames
AFTER:  20 variants + boolean "Show Icon" = 20 frames
```

### Technique 2: Instance swap for content (80-95% reduction)
Replace icon/avatar variant rows with instance swap slots.
```
BEFORE: 20 variants × 12 icons = 240 frames
AFTER:  20 variants + instance swap = 20 frames
```

### Technique 3: Component decomposition (40-60% reduction)
Split multi-purpose components into purpose-built ones.
```
BEFORE: Button with link, icon-only, split modes = 160 frames
AFTER:  Button (20) + IconButton (10) + LinkButton (15) + SplitButton (8) = 53 frames
```
Source: Atlassian button refactoring.

### Technique 4: Variables for theme/mode (50-75% reduction)
Never duplicate variants for dark mode, density, or brand.
```
BEFORE: 20 variants × 2 themes × 3 densities = 120 frames
AFTER:  20 variants + Variable Modes = 20 frames
```

### Technique 5: Slots for composable regions (60-90% reduction)
Replace visibility props (`showActions`, `hideDescription`) with slot composition.
```
BEFORE: Card with showActions × showImage × showDescription = 8× multiplier
AFTER:  Card with 3 slots, content controls visibility = 1× base
```
Source: Nathan Curtis "Configuration Collapse".

### Technique 6: Interactive components for states (60-80% reduction)
Use Figma interactive components for hover/focus/pressed instead of exposing all states as variants.
```
BEFORE: 5 types × 5 states = 25 visible frames
AFTER:  5 types with interactions = 5 visible frames (states in prototype)
```

### Technique 7: P0/P1/P2 priority tiering
Not all combinations need visible frames. Tier them:
- **P0**: Must exist — core sizes × variants × default state
- **P1**: Should exist — common states (hover, focus)
- **P2**: Can exist — edge cases, rare combinations

---

## 9. The Design-Dev Alignment Checklist

Before finalizing any component, verify:

- [ ] Every Figma variant property maps to a code prop (same name, same values)
- [ ] Every Figma boolean maps to an `is*` code prop
- [ ] Every instance swap maps to a `ReactNode` code prop
- [ ] No Figma variants exist for theme/mode/density (use Variables)
- [ ] disabled is a boolean, not a state variant value
- [ ] State values match CSS pseudo-classes (hover, focus, pressed)
- [ ] Enum values use lowercase in both Figma and code (`sm`, not `Small`)
- [ ] Frame count is within practical limits (< 200 for complex components)
- [ ] Excluded combinations are documented with reasons
- [ ] Code-only props are documented (accessibility, events, data binding)
