# Build Agent — Compact Instructions

Pipeline: research → spec → enrich → spec-completo.md

## Modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| Guided | `/build [comp]` | Read hints.json → show scope questions (skip answered) → filter config → spec-completo |
| Brief | `/build [comp] --brief` | User pastes context → analyze → show fewer questions → filter config → spec-completo |
| Max | `/build [comp] --max` | Use pre-generated config as-is → spec-completo |

Flags: `--fresh` (ignore cache), `--from=spec` (skip research), `--human` (also save separate .md files), `--lang=en` (force English output)

## Flow: Customize (when pre-generated data exists)

```
1. Read hints/[comp].json                          (~500 tokens)
2. Read outputs/[comp]-config.json                 (~2-3K tokens)
3. IF --max → skip to step 6
4. IF --brief → ask user for brief, analyze it, mark answered questions
5. Ask remaining questions via AskUserQuestion tool (interactive prompts, NOT markdown). Max 4 preguntas por call y max 4 options por pregunta. Si hints.json tiene >4 preguntas: hacer **2 calls en PARALELO en el mismo mensaje** (no secuencial) — priorizar las preguntas más críticas (las que más filtran el config) en el primer call. Si una pregunta tiene >4 options, consolidar la menos crítica ("Other" auto-provisto). Headers ≤12 chars. Mapear respuestas a option IDs de hints.json para filtrar config. Aplica igual a `--brief`: después de analizar el brief, las preguntas restantes van vía AskUserQuestion con el mismo patrón.
6. Filter config.json by scope (remove out-of-scope properties/booleans)
7. Generate outputs/[comp]-spec-completo.md (v4 format)
   • Para la sección "Reference: how other systems do it":
     - IF research/components/[comp].md existe → usar sus Per-System Narratives
     - IF NO existe (comps generados fast-mode) → FALLBACK: leer los 3 tiers en paralelo:
       · component-research-agent/references/systems/compiled/[comp].md (T1, 6 systems)
       · component-research-agent/references/systems/compiled-tier2/[comp].md (T2, 8 systems)
       · component-research-agent/references/systems/compiled-tier3/[comp].md (T3, 10 systems)
       Sintetizar inline 24 systems (~80 chars narrativa por sistema). Resultado equivalente en cobertura a research.md pregenerado.
8. Save filtered config.json
```

## Flow: From Scratch (no pre-generated data)

```
1. Read compiled digests: component-research-agent/references/systems/compiled/[comp].md + compiled-tier2 + compiled-tier3
2. Synthesize research → save research/components/[comp].md
3. Derive spec from Pipeline Hints → save outputs/[comp]-config.json
4. Add enrich data (a11y, tokens, descriptions) → update config.json
5. Generate outputs/[comp]-spec-completo.md
```

DO NOT read: ds-catalog.json (system names already in digests), naming-conventions.md (property names already in hints.json and config.json). These were needed for initial generation but are redundant now that hints exist.

## Spec-completo.md Format (v4)

Use `build-agent/spec-completo-template.md` as the template. Fill placeholders with data from config.json + research.md.

Sections: Overview (wireframe + properties + Figma panel) → When to use → Visual variations → Design decisions → Behavior (ARIA + keyboard) → Content guide → Pre-build checklist → Related components → Reference: other systems → Tokens + spacing specs.

## Research Phase (from scratch only)

When no pre-generated research exists, synthesize from compiled digests:

**Output structure for research.md:**
1. Systems without component (compact table)
2. Per-system narratives (3-5 sentences each, design decisions table)
3. Pipeline Hints: archetype, slot consensus, property consensus, booleans, states, exclusions, BB candidates, a11y consensus
4. Consensus (min 5 with WHY)
5. Divergences (min 5 as questions with Option A/B)
6. Visual patterns (ASCII wireframes)
7. Risks (min 3, rated HIGH/MEDIUM/LOW)

**Rules:** Digests = source of truth. No web_search. 24 systems equal weight. Include "why" for every decision.

## Spec Phase (from scratch only)

Derive from research Pipeline Hints:

**Slot rules:** Q1 replaceable externally → SLOT. Q2 always inside parent → REGION. Q3 changes by interaction → STATE.
**Property rules:** User interaction → State. System feedback → Status. Binary toggle → Boolean. Disabled/readonly/loading → Boolean (unless ≥2 visual properties change → Variant).
**Frame formula:** sizes × variants × states − exclusions = net. Budget: simple 10-30, medium 30-80, complex 80-150.
**Sizes:** sm(32/6/8) md(40/8/12) lg(48/12/16) — height/py/px from foundations.
**Icons:** gap icon↔text = 8px always. Use BOOL+SWAP pattern.

## Enrich Phase (from scratch only)

**A11y:** Map slots → ARIA roles+attributes. Keyboard table (key → action → focus target). Focus management (on open, on close, on delete, on error).
**Tokens:** Prefix from component abbreviation. 3-layer architecture. Only generate state tokens when value CHANGES vs default.
**Descriptions:** Format with 🔑⌨️🎯 headers. Max 800 chars.

## Progress Reporting

After each step:
```
✓ Research    [cached | N systems analyzed]
✓ Spec        Family: [members] · Frames: [net] · Archetype: [type]
✓ Enrich      A11y: [role] · Tokens: [N] · Edge cases: [N HIGH, N MED]
✓ Spec-completo saved to outputs/[comp]-spec-completo.md

━━━ What's next? ━━━
  /build [comp] --from=spec    → change properties
  /build [comp] --fresh        → start from scratch
```

## Rules

1. Context carries forward — never re-read what you just wrote
2. Pre-generated data = customize, don't re-synthesize
3. foundations.json is shared — read ONCE per session
4. Fail fast — report error and stop, don't continue with incomplete data
5. Write files immediately after each step
6. Language: detect from user's first message. Write ALL output (spec-completo sections, questions, responses) in detected language. Default: Spanish. Config.json keys always in English. `--lang=en` overrides detection and forces English regardless of conversation language.
