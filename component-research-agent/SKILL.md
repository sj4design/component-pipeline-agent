---
name: component-research-agent
description: Research and analyze UI components across major design systems before building them. Use this skill whenever someone asks to research a component, investigate how other design systems solve a component, compare component implementations, analyze a brief or requirements for a component, or explore patterns for a new component. Triggers on phrases like "research [component]", "how do others implement [component]", "investigate [component]", "analyze this brief", "what patterns exist for [component]". Also triggers when someone mentions needing to build a new component and wants to understand best practices first.
---

# Component Research Agent

Research UI components across 24 design systems. The goal: explain the THINKING behind each system's choices so the designer can decide what's right for their case. Not a feature matrix — a decision-making document.

## Modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| Guided (DEFAULT) | `/research [component]` | Scope questions first → filtered research |
| Brief | `/research [component] --brief` | User provides context document → agent analyzes it → smarter questions → filtered research |
| Max | `/research [component] --max` | No scope, ALL patterns extracted, max coverage. Includes Pipeline Hints with every sub-component, state pattern, boolean, and truncation found in digests. |

### CRITICAL: Pipeline Hints are MANDATORY in ALL modes

Pipeline Hints (Step 4) MUST be generated in every mode — guided, max. Without them, spec-agent cannot generate a complete config.json and will produce minimal, incomplete components.

| Mode | Systems | Pipeline Hints |
|------|---------|----------------|
| Guided | 24 systems (scope-filtered) | **REQUIRED** — filtered by scope but all tables present |
| Max | 24 systems | **REQUIRED** — ALL slots, ALL states, ALL properties, ALL BBs found |

**If a digest doesn't have enough data to populate a Pipeline Hints table → still emit the table with the data available and add a `⚠️ LOW CONFIDENCE` flag.** Never omit the table.

## Flags

| Flag | Effect |
|------|--------|
| `--brief` | Brief mode: user provides context, agent asks smarter questions |
| `--max` | No scope questions, ALL patterns, max coverage |
| `--fresh` | Ignore cached research, re-analyze from scratch |

---

## Execution Flow

### Step 0: Check Research Cache

1. Check if `research/components/[component].md` exists
2. If yes AND no `--fresh` flag → **auto-use cache** (read and present, zero tokens). No question needed.
3. If yes AND `--fresh` flag → ignore cache, proceed from scratch.
4. If no → proceed from scratch.

### Step 1: Load References (parallel pre-load)

Load ALL needed references in parallel Read calls at the start:

**Always (parallel batch 1)**:
- `component-research-agent/references/systems/compiled/[component].md`
- `component-research-agent/references/systems/compiled-tier2/[component].md`
- `component-research-agent/references/systems/compiled-tier3/[component].md`

**Only if hints/[component].json does NOT exist** (first-time generation):
- `component-research-agent/references/ds-catalog.json` (skip if hints exist — system names already in digests)
- `component-research-agent/references/naming-conventions.md` (skip if hints exist — properties already defined)

**For guided/brief mode questions:**
- `hints/[component].json` (preferred — has pre-built question pool)
- `component-research-agent/references/guided-questions/[component].md` (fallback if no hints.json)

**Digests are the source of truth. NEVER web_search to validate them.**

### Step 1.5: Brief Analysis (Brief mode only, skip for Guided and --max)

**Brief mode** (`--brief`) — The user provides a context document (brief, requirements, PRD, design doc, or pasted text) BEFORE questions are generated. The agent uses this context to ask **smarter, more targeted questions**.

#### How it works:

1. **Prompt for brief:**
   ```
   📋 Modo Brief activado.
   
   Pega o adjunta tu documento de contexto:
   - Brief de diseño, PRD, requisitos, o notas
   - Puede ser texto pegado, ruta a un archivo .md, o descripción libre
   - Entre más contexto, mejores preguntas haré
   
   Esperando tu brief...
   ```

2. **Read the brief:** If the user provides a file path → Read it. If pasted text → use directly.

3. **Analyze the brief:** Extract these signals from the document:
   | Signal | What to look for | Impact on questions |
   |--------|-----------------|---------------------|
   | Industry/domain | "e-commerce", "healthcare", "fintech", "internal tool" | Prioritize systems from that industry |
   | Use cases mentioned | "booking form", "settings page", "checkout" | Skip generic questions, ask about specific patterns |
   | Constraints | "mobile-first", "WCAG AAA", "enterprise", "no animations" | Pre-filter options |
   | Tech stack | "React", "Vue", "Figma only" | Adjust code-vs-design focus |
   | Existing components | "we already have Button and Input" | Skip sub-components that already exist |
   | Content patterns | "long forms", "data tables", "user profiles" | Focus on relevant variants |
   | Pain points | "current modal is too complex", "users miss the tooltip" | Deep-dive on those specific areas |

4. **Generate brief-informed questions:**
   - Same rules as Guided mode (3-5 questions, ALL in one message, impact preview)
   - BUT questions are **pre-filtered** by brief context — don't ask what the brief already answered
   - **Acknowledge** what you understood from the brief before asking:
   ```
   📋 Del brief entendí:
   • Contexto: [industry/domain]
   • Caso de uso principal: [what they're building]
   • Restricciones: [constraints found]
   • Ya tienen: [existing components mentioned]
   
   Con esto en mente, necesito aclarar [N] puntos:
   
   1. [Question — informed by brief, not generic]
   ...
   ```
   - If the brief is comprehensive enough to answer ALL scope questions → **skip questions entirely**, confirm understanding, and proceed to research:
   ```
   📋 Tu brief cubre todo lo que necesito. Confirmo el scope:
   • [list what was extracted]
   
   ¿Correcto? Procedo con el research.
   ```

5. **Proceed to Step 3** (Research) with the combined scope: brief signals + user answers.

#### Brief + Guided comparison:
| Aspect | Guided (default) | Brief (`--brief`) |
|--------|-------------------|-------------------|
| Context source | None — generic questions | User's document analyzed first |
| Questions | 3-5 generic per component | 1-3 targeted (brief pre-answers some) |
| Deep-dive selection | Based on user answers only | Based on brief industry + answers |
| "Para tu caso" recommendations | Generic best practices | Matched to brief's domain/constraints |

---

### Step 2: Scope (Guided mode only, skip for --max)

**Guided mode** — Generate 3–5 questions dynamically for the specific component:

| Rule | Description |
|------|-------------|
| Contextual | Each component has different questions. DatePicker: selection type, presentation, time, restrictions. Button: hierarchy, icons, sizes. Card: content type, interactivity, layout. |
| Building blocks | For components with container/slot-type slots (archetype: container, composite-overlay, or any component with slots of type `container`), ask about building block vs free-form content for each main container slot. |
| Selection type | State explicitly: `(elige UNA)` or `(puedes elegir VARIAS, sepáralas con coma)` |
| Options with context | Each option = name + use case example + IMPACT on output. Show frame impact: "→ +N frames" or "→ adds sub-component". |
| Impact preview | After listing options, show: "Current estimate: N variants × N sizes × N states = N frames". Update as user picks options. |
| Escape hatch | Always offer: "No estoy seguro — muéstrame cómo lo resuelven otros" |
| Max 5 questions | Group lesser dimensions into one multi-select "restricciones adicionales" |
| Adaptive | If answer N eliminates options for N+1, skip what no longer applies |

Ask ALL questions in a **single message** (not one at a time). The user answers everything at once.
If `component-research-agent/references/guided-questions/[component].md` exists, use it.

### Step 3: Research

Load compiled digests and synthesize. **No web search.**

#### 3a. Load digests (scope-aware)

1. Read `compiled/[component-slug].md` + `compiled-tier2/[component-slug].md` + `compiled-tier3/[component-slug].md` (all 24 systems always)
2. Scan digest headers to identify which systems HAVE vs DON'T HAVE the component
3. Systems WITHOUT → collect into compact table (Step 3b), skip full analysis
4. Systems WITH → classify into deep dive vs shallow (Step 3c)

**Slug lists**:
- All 24 systems: `material-design-3`, `spectrum`, `carbon`, `polaris`, `atlassian`, `ant-design`, `paste`, `lightning`, `primer`, `shadcn-ui`, `playbook`, `cedar`, `wise`, `dell`, `radix`, `chakra-ui`, `gov-uk`, `base-web`, `fluent-2`, `gestalt`, `mantine`, `orbit`, `evergreen`, `nord`
- Components (41): `datepicker`, `accordion`, `button`, `modal`, `tabs`, `table`, `select`, `tooltip`, `toast`, `textfield`, `checkbox`, `radio`, `switch`, `search`, `tag`, `menu`, `calendar`, `card`, `slider`, `progress`, `spinner`, `badge`, `avatar`, `breadcrumb`, `pagination`, `popover`, `drawer`, `empty-state`, `alert`, `form`, `skeleton`, `file-upload`, `number-input`, `link`, `segmented-control`, `timepicker`, `steps`, `color-picker`, `divider`, `inline-edit`, `combobox`

#### 3b. Systems without component → compact table

```markdown
### Sistemas sin componente dedicado
| Sistema | Razón | Workaround |
|---------|-------|------------|
| M3 | Solo formaliza componentes con interacción compleja | Composición con shape tokens |
```

One line per system, no narratives.

#### 3c. Scope-aware depth (Guided mode)

| Tier | Criteria | Output |
|------|----------|--------|
| Deep dive | System has features matching user's scope | Full narrative (3–5 sentences) + wireframe + "Para tu caso" takeaway. Min 200 words |
| Shallow | System has component but lacks scope features | 2–3 sentences + key takeaway. ~50–80 words |

#### 3d. Per-system output format

For each system WITH the component:

**[System Name] — "[1-sentence headline]"**

1. **Narrative** (3–5 sentences telling the STORY of their approach — not bullets)
2. **Design Decisions** (min 3): What → Why (actual tradeoff, not "because it's better") → Impact (H/M/L) → "Para tu caso"
3. **Notable Props** (only unique/interesting ones). Normalize names via `naming-conventions.md` before reporting.
4. **Accessibility** (specific keys, ARIA roles, SR announcements, unique innovations)

### Step 4: Analysis

#### "Pipeline Hints" (feeds spec + enrich agents) — MANDATORY IN ALL MODES

Derive these AUTOMATICALLY from the research data — they save 30%+ spec-agent time.
**Without these tables, spec-agent WILL produce incomplete components.**

```markdown
### Pipeline Hints

**Archetype recommendation:** [inline-action | form-control | container | grid-tabular | nav-content | composite-overlay]
Rationale: [why — based on the consensus structure across systems]

**Slot consensus:** (feeds spec-agent Phase 1 directly)
Consensus = X/N where N = systems WITH the component (not all 24). E.g., 6/10 = 6 of the 10 systems that implement this component include this slot.
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| media | media | no | N/N | aspect ratio, position variants |
| avatar | icon | no | N/N | user photo, logo |
| eyebrow | text | no | N/N | overline, category, label |
| title | text | yes | N/N | Always present |
| subtitle | text | no | N/N | secondary info |
| badge | text | no | N/N | status, discount, trend |
| body/description | text | no | N/N | supporting text |
| metadata | text | no | N/N | date, read time, stats |
| divider | divider | no | N/N | separator between regions |
| footer/actions | container | no | N/N | BB candidate: buttons/icons |
| close-button | icon-action | no | N/N | dismiss action |

IMPORTANT: List EVERY slot found across ALL systems. Include even low-consensus slots (2/14).
For each slot, note: which systems have it, what they call it, whether it's a BB candidate.

**Property consensus:** (feeds spec-agent Phase 2 directly)
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | N/N | Which systems, +xl in N/N |
| Variant | variant | elevated/filled/outlined/ghost | N/N | Per-system naming |
| State | state | default/hover/focus/pressed/disabled | N/N | +loading in N/N, +selected in N/N |
| Orientation | variant | vertical/horizontal | N/N | Which systems support both |

IMPORTANT: List EVERY property found. Include states like loading, selected, error, dragged even if only 2-3 systems have them.
For --max mode: capture ALL values across ALL systems. No filtering.

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasMedia | N/N | false | controls media slot visibility |
| hasAvatar | N/N | false | controls avatar in header |
| hasActions | N/N | true | controls footer actions |
| isClickable | N/N | false | whole card as link/button |
| isSelected | N/N | false | selection checkbox state |
| isExpandable | N/N | false | expand/collapse body |

IMPORTANT: Extract EVERY boolean toggle found. These become component properties in Figma.

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | N/N | base appearance | |
| hover | N/N | elevation +1, border visible | |
| focus | N/N | focus ring | keyboard nav |
| pressed | N/N | elevation -1, darker surface | |
| disabled | N/N | opacity 0.5 | |
| loading | N/N | skeleton placeholders | |
| selected | N/N | checkbox + accent border | batch operations |
| error | N/N | error border + icon | validation |
| dragged | N/N | elevated + shadow | drag-and-drop |

IMPORTANT: List ALL states found even if consensus is low. Spec-agent decides which to include; research-agent captures everything.

**Exclusion patterns found:**
- disabled × hover/focus/pressed — N/N systems (universal)
- loading × all interactive states — N/N
- [other patterns from research]

**Building block candidates:** (feeds spec-agent BB detection)
- header → `.CardHeader` — N/N systems have structured header (avatar + title + subtitle + actions)
- body → `.CardBody` — N/N systems have structured body content
- footer → `.CardFooter` — N/N systems have standard action button pattern
- media → `.CardMedia` — N/N systems have dedicated media region with aspect ratio

IMPORTANT: For each BB candidate, note whether systems use formal sub-components or composition.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| mediaRatio | 1:1, 4:3, 16:9, 2:1 | N/N | aspect ratio of media region |
| mediaPosition | top, left, right, background | N/N | where media appears |
| actionsLayout | buttons, icons, both, justified | N/N | footer layout style |
| truncate | none, 1-line, 2-lines, 3-lines | N/N | body text truncation |

**A11y consensus:** (feeds enrich-agent Phase 1 directly)
- Primary role: [role] (N/N consensus)
- Required ARIA: [list]
- Keyboard: [key patterns]
- Focus: [trap/roving/linear]
- APG pattern: [name]
- Clickable card: [link vs button semantics]
- Nested interactive: [sibling pattern vs nesting]
```

These hints are DERIVED from the research — NOT new analysis. Extract from the per-system data you already have.

**Completeness check:** Before saving, verify Pipeline Hints has:
- [ ] ≥ 5 slots in slot consensus table
- [ ] ≥ 3 properties in property consensus table
- [ ] ≥ 3 boolean properties
- [ ] ≥ 5 states in state coverage table
- [ ] ≥ 1 exclusion pattern
- [ ] ≥ 1 building block candidate
- [ ] A11y consensus with role + keyboard + focus

If ANY table has < 3 rows, flag `⚠️ LOW DATA` and explain which digests were missing info.

#### "Type Taxonomy" (REQUIRED for container archetypes)

When the component archetype is `container` or `composite-overlay`, analyze ALL use-case types found across systems and classify them by **shell overlap** with the base component:

```markdown
### Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40–70% | Extension — shared shell + `contentType` prop or extra slots | Same component set with additional variant property |
| < 40% | Separate component — different section in library | Own component set |
| Different semantics | NOT this component — belongs elsewhere | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| [Type name] | [N%] | [Template/Extension/Separate/Not-a-X] | [What makes it unique] | [Which systems have it] |
```

**Rules for Type Taxonomy:**
1. List EVERY type/variant found across ALL systems (min 8 types for container archetypes)
2. Calculate shell overlap honestly: count shared slots / total base slots
3. Include "NOT this component" types to prevent misuse (e.g., Alert is NOT a Card)
4. For each type, note the key slots or props that differentiate it from base
5. In --max mode: include even rare types found in only 1-2 systems

This section feeds the spec-agent's building block detection and helps designers understand WHAT the component can become before deciding WHICH configurations to build.

#### "What Everyone Agrees On" (min 5)
Format: **[Pattern]**: [plain language]. [Why all systems agree].

#### "Where They Disagree" (min 5)
Frame as questions: **"¿[Question]?"** → Option A vs Option B (adopters, how it works, upside, downside) → "Para tu caso" recommendation.

#### "Visual Patterns Found"
Table: pattern | description | best for | adopted by. Each with ASCII wireframe (`─│┌┐└┘├┤┬┴┼▼▶●○▣□`).

#### "Risks to Consider" (min 3)
**[Risk]** (HIGH/MEDIUM/LOW) — mitigation.

#### "Next Steps"
Connect to pipeline: `/spec` → `/enrich` → `/generate` → `/figma-qa`
Or use `/build [component]` for the full pipeline in one command.

### Step 5: Save Output

Save to `research/components/[component-name].md`:

1. **Meta** — Date, mode, systems, scope
2. **Sistemas sin componente** — compact table
3. **How Systems Solve It** — narratives (deep/shallow per scope)
4. **Pipeline Hints** — archetype, slot consensus, property consensus, exclusion patterns, BB candidates, a11y consensus
5. **Consensus** — min 5, with WHY
6. **Divergences** — min 5, as questions with Option A/B
7. **Visual Patterns** — table + ASCII wireframes
8. **Risks** — min 3, rated
9. **Dimension Scores** — only systems WITH the component
10. **Next Steps** — 5 pipeline commands

Requirements: min 1500 words, decision-oriented (not feature matrix), "why" for every decision, wireframes required.

**Pipeline Hints are the bridge between research and spec.** The spec-agent reads these to skip re-derivation. Without them, spec must re-analyze all the same data.

### Step 6: Visual HTML Report (ON-DEMAND ONLY)

**Do NOT generate automatically.** After saving markdown, ask:
> **Research guardado en `research/components/[component].md`. ¿Quieres el reporte visual HTML?**

If yes: read `component-research-agent/templates/visual-html-spec.md` for the full HTML specification.
Use `component-research-agent/templates/visual-reference-template.html` as base template.

---

## Critical Rules

1. **Digests = source of truth** — no web_search. Zero.
2. **Include "why" for EVERY decision** — "Spectrum separates Calendar because Adobe needs grids in dashboards without input wrappers." Always the reason, never just the fact.
3. **Write for designers** — plain language first, then technical terms.
4. **Frame divergences as questions** — "Should your component do X or Y?" not "A does X, B does Y."
5. **Min 200 words per deep-dive system** — if you can't, you haven't researched enough.
6. **Normalize prop names** — translate to 9-axis standard before reporting. Show divergences.
7. **Visuals = real wireframes** — never text descriptions with icons.
8. **Visual HTML = on-demand only** — never generate unless user asks.
9. **Scope-aware loading** — only deep-dive systems matching user's scope. Shallow for others.
10. **Pipeline Hints = derived, not invented** — extract from per-system data, don't add opinions.
11. **Equal weight** — All 24 systems have equal weight in consensus counts. No tier weighting.
12. **A11y quality flag** — Systems with known weak a11y (e.g., Ant Design) should be flagged in a11y consensus so enrich-agent weights them less.

## File References

| File | Purpose | When |
|------|---------|------|
| `component-research-agent/references/ds-catalog.json` | 24 systems, URLs | Always |
| `component-research-agent/references/dimensions.md` | 12 analysis dimensions | Scored report |
| `component-research-agent/references/naming-conventions.md` | 9-axis prop standard, 41-component map | Before reporting props |
| `component-research-agent/references/systems/compiled/[component].md` | System digests part 1 (6 systems) | Always |
| `component-research-agent/references/systems/compiled-tier2/[component].md` | System digests part 2 (8 systems) | Always |
| `component-research-agent/references/systems/compiled-tier3/[component].md` | System digests part 3 (10 systems) | Always |
| `component-research-agent/templates/visual-html-spec.md` | Full HTML report spec | On-demand visual |
| `component-research-agent/templates/visual-reference-template.html` | HTML base template | On-demand visual |
