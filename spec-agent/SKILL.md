---
name: spec-agent
description: >
  Combined agent: anatomy + variant matrix + optimization in ONE pass.
  Derives component structure, properties, frame count, and optimization audit
  from research data. Saves ~65% tokens vs running 3 separate agents.
  Triggers on: "spec", "especificación", "definir componente", "component spec".
---

# Spec Agent (Combined: Anatomy + Matrix + Optimize)

Define the full component specification in ONE agent pass:
- **Phase 1**: Anatomy (slots, regions, hierarchy)
- **Phase 2**: Variant Matrix (properties, combinations, frame count)
- **Phase 3**: Optimization audit (7-point check, frame reduction)

Produces `[component]-spec.md` + `[component]-config.json`.

## Core principle: PARALLEL PRE-LOAD + PROGRESSIVE DERIVATION

Pre-load ALL reference files at the start in parallel reads. Then process phases
sequentially within context — each phase builds on the previous, zero I/O waits between them.

## How to invoke

```bash
/spec button         # Full spec from research
/spec datepicker     # Complex family with sub-components
/spec --human card   # Also generate spec.md (default: config.json only)
/spec --max button   # Max coverage: ALL sub-components, ALL states differentiated, ALL booleans, chromeless, semanticPalette
```

## Reference files (read ALL at start, in parallel)

Load these files in parallel Read calls before starting Phase 1:

1. `research/components/[component].md` (input — look for "Pipeline Hints" section first: archetype, slot consensus, property consensus, exclusion patterns, BB candidates, a11y consensus. Use these as starting point to SKIP re-derivation.)
2. `foundations/spacing-layout.md` — section 1.7
3. `foundations/radius-sizing.md` — sections 5.2, 6.1
4. `foundations/typography.md` — sections 2.1-2.2
5. `references/anatomy-agent/slot-decision-rules.md`
6. `global-property-rules.md`
7. `references/variant-optimizer-agent/optimization-techniques.md`
8. `references/anatomy-agent/component-families/[comp].md` (if exists — skip if not)

Then process all 3 phases without additional file reads.

### CRITICAL: Research Completeness Validation

After reading `research/components/[component].md`, check for Pipeline Hints:

```
Required sections in research:
- [ ] "Pipeline Hints" header exists
- [ ] Slot consensus table (≥ 5 slots)
- [ ] Property consensus table (≥ 3 properties)
- [ ] State coverage table (≥ 5 states)
- [ ] Boolean properties table (≥ 2 booleans)
- [ ] Building block candidates (≥ 1)
- [ ] A11y consensus (role + keyboard)
```

**If Pipeline Hints is MISSING or has < 3 rows in key tables:**
1. WARN the user: "Research for [component] lacks Pipeline Hints. Spec will be incomplete."
2. If running via `/build`: recommend re-running `/research [component] --max --fresh` first
3. If running standalone: attempt to derive hints from narrative text, but flag `⚠️ DERIVED FROM NARRATIVE — may be incomplete` in _decisions

**If Pipeline Hints IS present:**
- Use slot consensus as the STARTING POINT for Phase 1 (don't re-derive from scratch)
- Use property consensus as the STARTING POINT for Phase 2
- Use state coverage to ensure ALL states are represented (not just the obvious 3)
- Use boolean properties to pre-populate booleanLayers and booleanTextPairs

---

## Phase 1: ANATOMY

### Input
- `research/components/[component].md`

### Rules
```
Slot             = Swappable region via component API
Internal region  = Sub-part always inside a parent slot, not replaceable
State            = Visual variant → goes to Phase 2 (Matrix), NOT here

Consensus ≥ 4/6  → AUTO-CONFIRMED (default ON)
Consensus  3/6   → FLAGGED for review (default OFF)
Consensus < 3/6  → NOT proposed (mentioned in notes only)
```

### Sub-component detection (derive from digests)
```
If 4+ systems have a named child component (e.g., "BreadcrumbItem", "Tab", "MenuItem"):
  → CREATE sub-component with dot prefix (.BreadcrumbItem)
  → Parent component uses INSTANCES of the sub-component
  → Sub-component has its OWN states (hover, focus, pressed)

If digest mentions "current", "active", "selected" as a visual state on the item:
  → If it changes ONLY color/weight → VARIANT property (IsCurrent, Selected)
  → If it changes structure → separate variant values
  → Add variantStyles entry with the specific fg/bg overrides

If digest mentions "icon before/after", "prefix/suffix" on items:
  → BOOLEAN + INSTANCE_SWAP (Prefix, Suffix), NOT a Type variant
  → This avoids frame multiplication

If digest mentions "truncation", "overflow", "ellipsis" on text:
  → VARIANT property (Truncation: false/true)
  → Config: truncationWidth in sizes (default 100px)
  → Chromeless text: textAutoResize = TRUNCATE
```

### State color derivation (derive from digests)
```
For EACH state mentioned in the digest, derive the SPECIFIC visual treatment:
  default   → fgPrimary (base color)
  hover     → underline text (if link-like) OR bgHover (if button-like)
  focus     → 2px border ring (chromeless) OR focus ring shadow (with chrome)
  pressed   → darker fg (fgPressed) + underline (if link-like)
  disabled  → opacity 0.5

For "current/active/selected" states that change color:
  → Add to variantStyles with specific fg override
  → The darker/bolder color communicates "you are here"

NEVER leave all states with identical colors. If the digest doesn't specify
exact colors, derive them: hover = fgPrimary darkened 10%, pressed = darkened 20%.
```

### Chromeless component detection
```
If the component has NO container chrome (no bg, no border, no shadow):
  → Set chromeless: true
  → Examples: Breadcrumb, Divider, Skeleton, Link
  → Builder: transparent bg, HUG width, text as HUG not FILL
  → States STILL apply: hover bg, focus ring, pressed color, disabled opacity
```

### Figma property mapping (derive from slot type)
```
Required text slot    → TEXT property (Rule 24)
Optional text slot    → BOOLEAN + TEXT pair (Rule 25)
Optional visual slot  → BOOLEAN visibility toggle (Rule 23)
Icon slot             → BOOLEAN + INSTANCE_SWAP (Rule 26)
```

### Building block detection (container/slot-type slots)

For each slot with `type: "container"` or `type: "slot"`:

```
Q: Does this container hold structured, typical content that designers
   would swap as a pre-built unit?
  YES → create a building block sub-component
  NO  → leave as plain container with placeholder text

Decision heuristics:
  body slot in container archetype     → YES (typical: text paragraph, form, list)
  footer slot with action buttons      → YES (typical: cancel + confirm buttons)
  content panel in nav-content         → NO (usually free-form)
  form-control slots                   → NO (never container type)

When YES:
  1. Add family[] entry: name=.[Parent][Slot], isBuildingBlock=true, parentSlot=[slot]
  2. Set slot figmaBinding: "slot", add buildingBlock: ".[Parent][Slot]"
  3. Add to buildOrder BEFORE the parent
  4. Add swapSlots entry on parent with preferredRef: ".[Parent][Slot]"
```

If the research output indicates the user chose "free-form" content for a slot, skip building block generation for that slot and use `figmaBinding: "none"` instead.

### Output (inline, feeds Phase 2)
For each component in the family:
- Slot table: name, type, required/optional, consensus, Figma property type, building block
- Component hierarchy: parent → child relationships
- Sub-components identified (dot prefix: `.DayCell`, `.MonthNav`)
- Building blocks identified (dot prefix + `isBuildingBlock: true`)
- States listed (NOT defined here — just collected for Phase 2)

---

## Phase 2: VARIANT MATRIX

### Input
- Phase 1 anatomy output (in context)

### Derivation rules from anatomy
```
Slot required, no states  → fixed part, NO property
Slot optional             → Boolean property
Slot with listed states   → classify by taxonomy:
  "User interacts?"       → STATE variant (hover, focus, pressed)
  "System feedback?"      → STATUS (error, warning, success)
  "On/off toggle?"        → BOOLEAN (disabled, readonly, required, loading)

Component with input      → has Size: [sm, md, lg]
Component inline          → may skip Size
```

### Global property rules (ALWAYS apply)
```
disabled → BOOLEAN or VARIANT per Rule 27 in global-property-rules.md (decision tree: opacity-only = BOOLEAN; fills+colors+effects = VARIANT with exclusions)
readonly, required, selected, loading → BOOLEAN (never state/status)
error, warning, success                         → STATUS
hover, focus, pressed                           → STATE
mode, theme, density, shape, breakpoint         → FIGMA VARIABLES (never variants)
```

### figmaBinding enum (valid values)
```
"text"     → TEXT property (editable text content)
"swap"     → BOOLEAN + INSTANCE_SWAP (show/hide + swappable content)
"bool"     → BOOLEAN only (visibility toggle)
"boolText" → BOOLEAN + TEXT (show/hide + editable text)
"boolSwap" → same as "swap" (alias)
"slot"     → Native Figma slot / container with building block support
"none"     → No Figma property binding (fixed/structural)
null       → Same as "none" (no binding)
```
Any other value is INVALID. The generator will silently skip binding for unrecognized values.

### Frame formula
```
sizes × variants × states − exclusions = NET frames P0
```

> **⚠️ Combinatoric explosion guard:** If `NET frames > thresholds.warnFrames` (default: 150), add a WARNING recommending Technique 6 or Technique 3. If > `thresholds.maxFrames` (default: 200), flag as ERROR. Read thresholds from config.json `thresholds` key if present, otherwise use defaults.

### Output (inline, feeds Phase 3)
For each component:
- Properties table with classification
- Exclusions list
- Frame count (gross, exclusions, net)
- Figma naming convention
- Component properties (text, boolean, swap, boolean+text pairs)
- Auto-layout blueprint

---

## Phase 3: OPTIMIZATION AUDIT

### Input
- Phase 2 matrix output (in context)

### 8-point audit
```
1. Classification   — every property correctly typed?
2. Boolean extract  — can any variant dimension become boolean?
3. Instance swap    — icon slots using BOOL+SWAP pattern?
4. Decomposition    — should component split into sub-components?
5. Variable migrate — mode/theme/density moved to Variables?
6. Exclusions       — all invalid combos excluded?
7. State reduction  — can Interactive Components handle some states?
8. Building blocks  — container slots with typical structure have building blocks?
   PASS: All structured containers have building block sub-components
   OPPORTUNITY: Container slot [X] has typical structure but no building block
   FAIL: Building block referenced in slot but missing from family[]
```

### Frame budgets
```
Simple (Button, Badge):     10–30 frames
Medium (Input, Card):       30–80 frames
Complex (DatePicker, Table): 80–150 frames
Family total:               < 200 frames
```

### Output
- Audit results per point (PASS / OPPORTUNITY / FAIL)
- Before/after frame count if optimizations found
- Updated properties table (if classifications changed)

---

## Final outputs

### PRIMARY: `outputs/[component]-config.json`
Machine-readable CONFIG for Figma generation. This is the ONLY required output.
Generate this FIRST — it is the source of truth for the entire pipeline.

**Atomic save:** Write to `outputs/[component]-config.tmp.json` first. Validate against `_figma/config.schema.json`. If valid, rename to `-config.json`. If invalid, report errors and keep `.tmp.json` for debugging.

**Set `_meta`:** `{ "lastUpdatedBy": "spec", "pipelineVersion": "1.0", "timestamp": "[now]", "mode": "[quick|max|guided]" }`

**Set `_decisions`:** Record 3-5 key design decisions with rationale:
```json
"_decisions": [
  { "what": "[decision]", "why": "[rationale with consensus data]", "source": "research|spec|global-property-rules" }
]
```
Examples:
- Architecture: "Family split into Button + .IconButton" — "Atlassian 2025 split, Spectrum 3 components. Separate semantics prevent a11y bugs."
- Variants: "5 variants (primary/secondary/outline/ghost/danger)" — "majority of systems have ≥3 emphasis levels + danger."
- Properties: "Disabled as State variant, not boolean" — "Changes fill+text+opacity. global-property-rules.md decision tree."
- Optimization: "Icons as BOOL+SWAP, not variant" — "Technique 2: 80-95% frame reduction."

### ALWAYS: Inline "De un Vistazo" summary (shown in terminal after saving config.json)
Even WITHOUT `--human`, ALWAYS display this summary in the conversation after saving config.json.
This is NOT written to a file — it's shown directly to the designer so they understand what was decided.

```
📐 [Component] — De un Vistazo

Familia: [list all family members with (main) or (sub)]
Anatomía:
  ┌─────────────────────────────────────┐
  │ [slot1]  [slot2]  [slot3]           │
  └─────────────────────────────────────┘
  [slot description for each]

Propiedades (multiplican frames):
  • Size: [values] — [heights]
  • Variant: [values] — [description]
  • State: [values]

Booleans (NO multiplican):
  • [bool1] — [description]
  • [bool2] — [description]

Frames: [gross] − [exclusions] = [net] ✓
Archetype: [archetype]
```

### OPTIONAL: `outputs/[component]-spec.md` (only with `--human` flag)
Human-readable markdown WITH full detail. Only generate when user passes `--human`.
Complete markdown with 4 sections. **"De un Vistazo" goes FIRST** (plain language for designers):
```markdown
# [Component] — Design Specification

## De un Vistazo

**Qué vamos a construir:** Familia [Component] con N componentes y M frames.

| Componente | Tipo | Frames | Qué es |
|------------|------|:------:|--------|
| .SubComp   | Sub-componente | X | [Plain description] |
| MainComp   | Principal | Y | [Plain description] |

**Propiedades que controlas en Figma:**
- **[Prop]** ([values]) — [what it does in plain words]
- ... (list ALL user-facing properties with "on/off" instead of "true/false")

**Decisiones pendientes:**
- [ ] [Questions the designer needs to answer before generation]
- [ ] [Scope/content decisions not yet resolved]

**Automático (sin acción):**
- Estructura derivada de consenso de N sistemas
- M frames optimizado (dentro del budget)
- Naming Figma: `Component / Prop=value`

## 1. Anatomía
[Slot tables, hierarchy, sub-components]

## 2. Matriz de Variantes
[Properties, exclusions, frame count, naming, auto-layout blueprint]

## 3. Auditoría de Optimización
[7-point audit results, before/after]
```

### 2. `outputs/[component]-config.json`
Machine-readable CONFIG for Figma generation.
**Schema:** `_figma/config.schema.json` — validate output before saving.
```json
{
  "version": "1.0",
  "component": "Button",
  "archetype": "inline-action",
  "buildOrder": [".IconButton", "Button", "SplitButton", "ButtonGroup"],
  "family": [{
    "name": "Button",
    "isSubComponent": false,
    "slots": [
      { "name": "icon-leading", "type": "icon", "required": false, "figmaBinding": "swap" },
      { "name": "label", "type": "text", "required": true, "figmaBinding": "text" },
      { "name": "icon-trailing", "type": "icon", "required": false, "figmaBinding": "swap" },
      // Container slots with building blocks (for flexible components):
      // { "name": "body", "type": "container", "required": true, "figmaBinding": "slot", "buildingBlock": ".ModalBody" }
      // { "name": "footer", "type": "container", "required": false, "figmaBinding": "slot", "buildingBlock": ".ModalFooter" }
    ],
    "properties": {
      "Size": ["sm", "md", "lg"],
      "Variant": ["primary", "secondary", "ghost"],
      "State": ["default", "hover", "focus", "pressed"]
    },
    "exclusions": [],
    "sizes": {
      "sm": { "h": 36, "fontSize": 12, "iconSize": 16, "py": 8, "px": 12, "gap": 8, "radius": 6 },
      "md": { "h": 44, "fontSize": 14, "iconSize": 20, "py": 12, "px": 16, "gap": 8, "radius": 8 },
      "lg": { "h": 52, "fontSize": 16, "iconSize": 20, "py": 16, "px": 16, "gap": 8, "radius": 10 }
    },
    "textProperties": [
      { "propName": "✏️ Label", "layerName": "label", "default": "Button" }
    ],
    "swapSlots": [
      { "boolName": "iconBefore", "swapName": "Icon before", "layerName": "icon-leading", "defaultVisible": false },
      { "boolName": "iconAfter", "swapName": "Icon after", "layerName": "icon-trailing", "defaultVisible": false }
      // Building block swap (for flexible components):
      // { "boolName": "Has Footer", "swapName": "Footer Content", "layerName": "footer", "defaultVisible": true, "preferredRef": ".ModalFooter" }
    ],
    "booleanLayers": [],
    "booleanTextPairs": [],
    "frameCount": { "gross": 36, "exclusions": 0, "net": 36 },
    "grid": { "maxCols": 4, "gap": 20, "pad": 30 }
  }]
}
```

**Note**: `sizes` values use Atlassian 8px spacing tokens. `colors` and `variantStyles` are populated with PLACEHOLDER values. The `/enrich` agent fills them with resolved token values.

**Spacing derivation (MANDATORY):** When populating `sizes`, consult `foundations/spacing-layout.md` sections 1.7.1–1.7.4:
- `py` and `px` MUST come from section 1.7.1 (Size-Aware Padding) or 1.7.2 (category-specific tables)
- `gap` (icon↔text) = 8px (space.100) universally per section 1.7.3
- All values MUST exist in the spacingScale array: [0,2,4,6,8,12,16,20,24,32,40,48,64,80]
- For composed components, also emit `sectionPadding` (container padding) and `itemsGap` per section 1.7.2

### `foundations` key (embedded for downstream agents)
Embed foundation values so `/enrich` does NOT need to re-read foundation files:
```json
{
  "foundations": {
    "spacingScale": [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80],
    "typeScale": { "xs": 10, "sm": 12, "md": 14, "lg": 16, "xl": 20 },
    "lineHeights": { "xs": 14, "sm": 16, "md": 20, "lg": 24, "xl": 28 },
    "radiusScale": [0, 2, 4, 6, 8, 12, 16, 28, 9999],
    "controlHeights": { "xs": 24, "sm": 32, "md": 40, "lg": 48, "xl": 56 },
    "iconSizes": { "xs": 12, "sm": 16, "md": 20, "lg": 24, "xl": 32 },
    "colorRoles": ["background", "foreground", "border", "brand", "interactive", "error", "warning", "success", "info", "overlay", "inverse"],
    "elevationLevels": [0, 1, 2, 3, 4],
    "densityModes": ["compact", "default", "comfortable"]
  }
}
```
Populate values from the foundations files you already read in the parallel pre-load.

### `language` key
Set `"language": "es"` (or user's preferred language). This drives component descriptions and review output language. Config keys remain English.

### `thresholds` key (optional)
Override pipeline defaults if the designer needs different limits:
```json
{
  "thresholds": {
    "warnFrames": 150,
    "maxFrames": 200,
    "maxDescriptionChars": 800,
    "disabledOpacity": 0.5,
    "focusRingWidth": 2,
    "focusRingOffset": 2
  }
}
```
Only include if overriding defaults. Downstream agents read these; code.js maps `disabledOpacity` to `DEFAULTS.disabledOpacity`.

### `variableBindings` key (optional, populated by enrich or designer)
Maps semantic color roles to Figma Variable paths. If present, the generator uses `bindVar()` instead of hardcoded RGB:
```json
{
  "variableBindings": {
    "primary/default": "brand/900",
    "primary/hover": "brand/1000",
    "primary/pressed": "brand/1100",
    "primary/text": "brand/0",
    "secondary/default": "bg/mid/default",
    "disabled/bg": "bg/disabled",
    "disabled/text": "text/disabled"
  }
}
```
The generator resolves paths like `"brand/900"` to the Variable ID at runtime via `figma.variables.getLocalVariablesAsync()`.

**`semanticPalette` — embedded state-aware colors (NEW):**
Derives from `color-elevation.md` 3.4 state tokens. This palette gives the builder
pre-computed state colors so individual components don't need to hardcode them.

```json
{
  "foundations": {
    "semanticPalette": {
      "interactive": {
        "default": { "r": 0.15, "g": 0.35, "b": 0.92 },
        "hover": { "r": 0.12, "g": 0.30, "b": 0.82 },
        "pressed": { "r": 0.10, "g": 0.25, "b": 0.72 },
        "visited": { "r": 0.45, "g": 0.22, "b": 0.75 }
      },
      "text": {
        "primary": { "r": 0.07, "g": 0.07, "b": 0.07 },
        "secondary": { "r": 0.42, "g": 0.45, "b": 0.50 },
        "subtlest": { "r": 0.55, "g": 0.55, "b": 0.60 },
        "disabled": { "r": 0.72, "g": 0.72, "b": 0.75 },
        "inverse": { "r": 1, "g": 1, "b": 1 }
      },
      "surface": {
        "default": { "r": 1, "g": 1, "b": 1 },
        "hover": { "r": 0.97, "g": 0.97, "b": 0.98 },
        "pressed": { "r": 0.95, "g": 0.95, "b": 0.97 },
        "selected": { "r": 0.93, "g": 0.95, "b": 1.0 },
        "disabled": { "r": 0.96, "g": 0.96, "b": 0.98 }
      },
      "border": {
        "default": { "r": 0.82, "g": 0.82, "b": 0.85 },
        "hover": { "r": 0.65, "g": 0.65, "b": 0.70 },
        "focus": { "r": 0.15, "g": 0.35, "b": 0.92 },
        "disabled": { "r": 0.88, "g": 0.88, "b": 0.90 },
        "error": { "r": 0.86, "g": 0.15, "b": 0.15 }
      },
      "focus": {
        "ring": { "r": 0.25, "g": 0.39, "b": 0.95 },
        "ringWidth": 2,
        "ringOffset": 2
      },
      "status": {
        "error": { "bg": { "r": 1.0, "g": 0.94, "b": 0.94 }, "fg": { "r": 0.86, "g": 0.15, "b": 0.15 }, "border": { "r": 0.96, "g": 0.62, "b": 0.62 } },
        "warning": { "bg": { "r": 1.0, "g": 0.97, "b": 0.92 }, "fg": { "r": 0.72, "g": 0.48, "b": 0.05 }, "border": { "r": 0.96, "g": 0.82, "b": 0.52 } },
        "success": { "bg": { "r": 0.93, "g": 0.99, "b": 0.95 }, "fg": { "r": 0.08, "g": 0.55, "b": 0.22 }, "border": { "r": 0.60, "g": 0.90, "b": 0.68 } },
        "info": { "bg": { "r": 0.93, "g": 0.95, "b": 1.0 }, "fg": { "r": 0.15, "g": 0.35, "b": 0.92 }, "border": { "r": 0.72, "g": 0.80, "b": 0.96 } }
      }
    }
  }
}
```

When generating colors for a component, USE the semanticPalette values instead of
inventing new RGB values. This ensures all components share the same interactive,
surface, border, and status colors — consistent across the entire DS.

For component-specific colors (e.g., switch track colors), derive from the palette:
- `trackOn` → `semanticPalette.interactive.default`
- `trackOff` → `semanticPalette.text.subtlest`
- `fgPrimary` → `semanticPalette.text.primary`

---

## Language

Write ALL output in the user's preferred language (Spanish by default).
config.json keys remain in English (machine format).
