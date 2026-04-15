---
name: enrich-agent
description: >
  Combined agent: interaction spec + token assignment in ONE pass.
  Adds accessibility data and resolved design tokens to the component spec.
  Saves ~50% tokens vs running 2 separate agents.
  Triggers on: "enrich", "enriquecer", "a11y + tokens", "accessibility and tokens".
---

# Enrich Agent (Combined: Interaction Spec + Token Assignment)

Add accessibility specifications and design tokens to a component in ONE agent pass:
- **Phase 1**: Interaction Spec (ARIA, keyboard, focus, SR, touch, edge cases)
- **Phase 2**: Token Assignment (3-layer architecture, resolved values)

Consumes `[component]-config.json` (primary — has slots, properties, sizes, exclusions).
Produces `[component]-enriched.md` + updated `[component]-config.json`.
Skip `[component]-spec.md` — config.json already contains all structured data.

## Core principle: STANDARDS OVER OPINIONS

Accessibility is standard (APG + WCAG 2.2). Tokens are derived mechanically
(slots × states × properties). The agent only asks about:
- Custom edge cases specific to the user's DS
- Token mode (A: existing system, B: partial, C: new from scratch)

## How to invoke

```bash
/enrich button           # Full a11y + tokens (Mode C default)
/enrich card --tokens-only   # Skip interaction spec
/enrich datepicker --a11y-only  # Skip tokens
/enrich button --mode=A     # Existing token system (user uploads file)
```

## Reference files (read ALL at start, in parallel)

Load these files in parallel Read calls before starting Phase 1:

1. `outputs/[component]-config.json` (PRIMARY input — has slots, properties, sizes, exclusions, buildOrder, **foundations**)
2. `references/interaction-spec-agent/interaction-rules-core.md` (always)
3. `references/interaction-spec-agent/interaction-rules-advanced.md` (only if DatePicker, form control, or disabled states)
4. `references/token-assignment-agent/token-architecture.md`
5. `references/token-assignment-agent/naming-conventions.md`
6. `references/interaction-spec-agent/component-families/[component].md` (if exists)
7. `references/token-assignment-agent/component-families/[component].md` (if exists)

**Foundations: DO NOT re-read foundation files.** config.json already contains `foundations` key
with spacingScale, typeScale, radiusScale, controlHeights, colorRoles, elevationLevels.
Use these values directly — zero additional reads needed.

Only read `foundations/color-elevation.md` if config.json lacks `foundations.colorRoles` (legacy configs).

**Atomic saves.** Write to `outputs/[component]-config.tmp.json` first. Validate schema. If valid, rename to `-config.json`. If invalid, report errors and keep `.tmp` for debugging.

**Validation summary (ALWAYS show after saving).** Before asking about HTML:
```
━━━ Enrich Summary ━━━
✓ A11y: [primary role], [key keyboard pattern]
  Keyboard: [2-3 most important keys]
  Focus: [technique — linear / roving / trap]
✓ Tokens: [N] total ([prefix]- prefix, 3-layer architecture)
✓ Colors: [N] variantStyles resolved
✓ Descriptions: enriched format (🔑⌨️🎯) → [N] components

Edge cases:
  [N] HIGH: [list — 1 line each]
  [N] MEDIUM: [list — 1 line each]

🎨 State preview ([first variant]):
  default:  ████ [hex]  ([description])
  hover:    ████ [hex]  ([change vs default])
  focus:    ████ [hex]  + ○ 2px ring
  pressed:  ████ [hex]  ([change vs default])
  disabled: ░░░░ opacity 0.5

⚠ [Any missing fields or gaps]
━━━━━━━━━━━━━━━━━━━━━
```

This summary is the designer's LAST CHANCE to catch issues before generation.
If edge cases are HIGH severity, flag them prominently.

Update `_meta.lastUpdatedBy` to `"spec+enrich"` and `_meta.timestamp` to current time.

**Visual outputs are ON-DEMAND.** After showing validation summary, ask:
> **Enrich guardado. ¿Quieres el reporte visual HTML?**

---

## Phase 1: INTERACTION SPEC

### Input
- `outputs/[component]-config.json` — PRIMARY source (has slots, properties, sizes, exclusions, buildOrder)
- Do NOT read `[component]-spec.md` — config.json already contains all structured data needed
- If config.json is missing a field, check spec.md as fallback only

### The 6 dimensions (derive 90% automatically)

```
1. ARIA Mapping         → slot → role + attributes (from anatomy slots)
2. Keyboard Navigation  → key → action → context (from APG patterns)
3. Focus Management     → state transitions → focus target
4. Screen Reader        → event → announcement → method (aria-live)
5. Touch Adaptation     → hover-only → always-visible, target sizes
6. Edge Cases           → problem → behavior → severity (HIGH/MEDIUM/LOW)
```

### Critical rules
```
- Disabled in grids/composites → aria-disabled="true" (stays focusable)
- Native form elements → disabled attribute is valid
- NEVER use aria-errormessage → use aria-describedby instead
- Every ARIA role MUST include ALL required attributes
- Edge case severity: HIGH = blocks users (Level A), MEDIUM = degraded (AA), LOW = minor
```

### Compliance
Default: WCAG 2.2 AA + APG patterns.

### Output (inline, feeds Phase 2)
- ARIA mapping table
- Keyboard navigation table
- Focus management rules
- Screen reader announcements
- Touch adaptation rules
- Edge cases with severity

---

## Phase 2: TOKEN ASSIGNMENT

### Input
- Phase 1 output (in context) — needed for focus ring tokens, interactive state tokens
- `outputs/[component]-config.json` — slots, properties, sizes to tokenize (already loaded in Phase 1)

### Token mode detection
```
Default: Mode C (no existing tokens — propose complete architecture)
If user says --mode=A or uploads file: Mode A (respect existing system)
If user says --mode=B: Mode B (partial, fill gaps)
```

### 3-layer architecture (Mode C)
```
Layer 1 (Primitive):  Raw values    → --color-blue-500: #3B82F6
Layer 2 (Semantic):   Purpose       → --color-action-primary: var(--color-blue-500)
Layer 3 (Component):  Specific use  → --btn-bg-primary: var(--color-action-primary)
```

### Token derivation formula
```
For each component in family:
  For each slot (from anatomy):
    For each visual property (bg, fg, border, shadow, radius, padding):
      For each state that changes this property:
        → Generate token: --[prefix]-[slot]-[property]-[state]
```

### Naming convention
```
--[prefix]-[slot]-[property]-[state?]

prefix   = component abbreviation (btn, card, dp, cal)
slot     = layer name from anatomy (root, label, icon-leading)
property = CSS property (bg, fg, border, shadow, radius, padding, font-size)
state    = only if value differs from default (hover, focus, pressed, disabled)
```

### Token resolution algorithm (C.1.2)

How to resolve a token to its final RGB value:

```
1. Identify target: slot("control") + property("border") + state("focus")
2. Build token name: --[prefix]-control-border-focus
3. Map to semantic: config.colors.[property key] for that state
   - focusRing → config.colors.focusRing → { r: 0.23, g: 0.51, b: 0.96 }
   - border + hover → config.colors.borderHover || config.colors.controlBorderHover
   - bg + disabled → config.colors.bgDisabled || bgSurface with opacity
4. Map to primitive: reverse-lookup the closest primitive token
   - { r: 0.23, g: 0.51, b: 0.96 } → --color-blue-500
5. Build chain: --btn-control-border-focus → --color-ring-focus → --color-blue-500 → #3B82F6
```

### Semantic layer mapping table (C.1.3)

Common mappings from config.json color keys to layers and tokens:

| Config color key | Typical layer | Token name pattern |
|------------------|---------------|--------------------|
| `bgSurface` | root, container | `--[prefix]-root-bg` |
| `bgHover` | root (hover state) | `--[prefix]-root-bg-hover` |
| `fgPrimary` | label, title | `--[prefix]-label-fg` |
| `fgSecondary` | description, helper | `--[prefix]-desc-fg` |
| `border` | root, input-wrapper | `--[prefix]-root-border` |
| `borderFocus` | root (focus state) | `--[prefix]-root-border-focus` |
| `focusRing` | root (focus ring) | `--[prefix]-root-ring-focus` |
| `divider` | divider-top, divider-bottom | `--[prefix]-divider-bg` |
| `dangerIconFg` | danger-icon | `--[prefix]-danger-icon-fg` |

### Critical rules
```
- Focus ring token REQUIRED for every interactive slot (WCAG 2.4.7)
- Only generate state tokens when the value CHANGES vs default
- Size tokens use -sm/-md/-lg suffix, NOT state suffix
- Zero hex values in component layer — all reference semantic tokens
- Icons inherit fg via currentColor — only dimensioning tokens needed
```

### Output
- Token table per component (name, value, layer, justification)
- Semantic layer suggestions
- Export formats: JSON (Style Dictionary) + CSS custom properties

---

## Final outputs (2 files)

### 1. `outputs/[component]-enriched.md`
Complete markdown with 3 sections. **"De un Vistazo" goes FIRST** (plain language for designers):
```markdown
# [Component] — Interaction & Tokens

## De un Vistazo

**Cómo se comporta (teclado):**
- [Plain sentence describing primary keyboard interaction]
- [Plain sentence for secondary interaction]
- [How to exit/leave the component]
- [What happens with disabled items]

**Casos que el diseñador debe saber:**
- [Only HIGH-severity edge cases, in plain language]
- [Things that affect layout or content decisions]

**Tokens:**
- N tokens en total (breakdown per sub-component)
- Prefijos: `prefix-` (name), `prefix-` (name)
- 3 capas: valor raw → propósito → componente

**Qué se añadió sobre el spec:**
- [What changed vs the spec.md — colors, sizes, new data]
- [Compliance additions like focus ring]

## 1. Especificación de Interacción
### 1.1 Mapeo ARIA
### 1.2 Navegación por Teclado
### 1.3 Gestión de Foco
### 1.4 Lector de Pantalla
### 1.5 Adaptación Táctil
### 1.6 Casos Límite

## 2. Asignación de Tokens
### 2.1 Arquitectura (3 capas)
### 2.2 Tokens por Componente
### 2.3 Exportación JSON
### 2.4 Exportación CSS
```


### 2. `outputs/[component]-config.json` (UPDATED)
Add resolved colors and a11y data to the existing config.json:
```json
{
  "family": [{
    "colors": {
      "bgSurface": { "r": 1, "g": 1, "b": 1 },
      "bgHover": { "r": 0.12, "g": 0.30, "b": 0.82 },
      "borderFocus": { "r": 0.25, "g": 0.39, "b": 0.95 },
      "focusRing": { "r": 0.25, "g": 0.39, "b": 0.95 }
    },
    "variantStyles": {
      "primary": { "bg": { "r": 0.15, "g": 0.35, "b": 0.92 }, "fg": { "r": 1, "g": 1, "b": 1 }, "border": null },
      "secondary": { "bg": { "r": 1, "g": 1, "b": 1 }, "fg": { "r": 0.07, "g": 0.07, "b": 0.07 }, "border": { "r": 0.82, "g": 0.82, "b": 0.85 } }
    }
  }],
  "a11y": {
    "pattern": "button",
    "role": "button",
    "keyboardNav": ["Enter", "Space", "Tab"],
    "edgeCases": 5,
    "wcagLevel": "AA"
  },
  "tokens": {
    "total": 97,
    "prefix": "btn",
    "mode": "C"
  },
  "componentDescriptions": {
    "Button": "Botón de acción principal.\nSizes: sm(32) md(40) lg(48).\nVariants: primary, secondary, ghost.\n\n🔑 ARIA:\n• role=\"button\"\n• aria-disabled=\"true\" cuando disabled\n• aria-busy=\"true\" cuando loading\n\n⌨️ Keyboard:\n• Enter / Space: activar botón\n• Tab: navegar entre botones\n\n🎯 Focus:\n• Focus ring visible (WCAG 2.4.7)\n• Disabled: no focusable\n\nTokens: 36, prefijo btn-.\nWCAG 2.2 AA · APG Button Pattern.",
    ".IconButton": "Botón solo icono.\n\n🔑 ARIA:\n• role=\"button\", aria-label OBLIGATORIO\n• Sin label visible → aria-label es el nombre accesible\n\n⌨️ Keyboard:\n• Igual que Button (Enter/Space/Tab)\n\n🎯 Focus:\n• Focus ring visible, ≥ 44×44px touch target\n\nTokens: 12, prefijo ibtn-.\nWCAG 2.2 AA."
  },
  "variableBindings": {
    "primary/default": "brand/900",
    "primary/hover": "brand/1000",
    "primary/pressed": "brand/1100",
    "primary/text": "brand/0",
    "secondary/default": "bg/mid/default",
    "secondary/hover": "bg/mid/hover",
    "secondary/pressed": "bg/mid/active",
    "outline/default": "bg/weak/default",
    "outline/border": "border/mid/default",
    "ghost/hover": "bg/weak/hover",
    "disabled/bg": "bg/disabled",
    "disabled/text": "text/disabled",
    "text/default": "text/label",
    "text/hover": "text/label-hover",
    "icon/default": "icon/default"
  }
}
```

**`variableBindings` mapping rules (NEW):**

Generate `variableBindings` by mapping each variant×state to the designer's Figma Variable collection. Rules:
1. **Primary/brand variants** → use the `brand` primitive collection (step 900=default, 1000=hover, 1100=pressed, 0=text)
2. **Tonal/secondary variants** → use Color Roles `bg/mid/*`
3. **Outline variants** → use Color Roles `bg/weak/*` + `border/mid/*`
4. **Ghost variants** → transparent + Color Roles `bg/weak/hover` for hover
5. **Danger variants** → use `red_ribbon` collection (same step pattern as brand)
6. **Disabled** → `bg/disabled` + `text/disabled` from Color Roles
7. **Text/icon on dark bg** → use primitive step `0` (lightest value)
8. **Text/icon on light bg** → use Color Roles `text/label/*` or `icon/default`

If the designer has provided existing Figma Variables (from the `project_designer_tokens` memory), use those paths instead of inferring.

**`componentDescriptions` format (enriched):**

Each description follows this structure with emoji headers for scannability in Figma Dev Mode:

```
[One-line description of the component]
[Sizes if applicable: Sizes: sm(H) md(H) lg(H)]
[Variants if applicable]

🔑 ARIA:
• Primary role + key attributes
• Conditional attributes (danger variant, disabled, etc.)
• Relationships (aria-labelledby, aria-describedby)

⌨️ Keyboard:
• Key → action (3-5 most important interactions)

🎯 Focus:
• Where focus goes on open/close
• Focus trap behavior (if applicable)
• Disabled/special states

📱 Touch (if relevant):
• Minimum target sizes

Tokens: N, prefijo xxx-.
WCAG 2.2 AA · APG [Pattern] Pattern.
```

**Rules:**
- Max 800 chars per description (enough for enriched format)
- Use emoji headers: 🔑 ARIA, ⌨️ Keyboard, 🎯 Focus, 📱 Touch
- Include ALL ARIA attributes from the interaction spec (not just role)
- Include keyboard nav from Phase 1 (not just "Tab navega")
- Include focus management rules (on open, on close, trap)
- Language matches user preference (Spanish by default)
- Written in config.json so `/generate` reads and pastes into Figma `component.description`
- Building blocks: shorter description (purpose + swap mechanism + no chrome)
- Sub-components: reference parent's keyboard nav if same ("Igual que [Parent]")

---

## Language

Write ALL output in the user's preferred language (Spanish by default).
config.json keys remain in English (machine format).
