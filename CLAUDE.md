# Project Instructions

## Pipeline

### Full pipeline (one command)
```
/build [component]               → research → spec → enrich → spec-completo.md
/build [component] --max         → uses pre-generated data, no questions
/build [component] --brief       → user provides context doc → smarter questions
/build [component] --from=spec   → skip research
/build [component] --fresh       → ignore cache, regenerate all steps from scratch (research + spec + enrich)
```

### Step-by-step (granular control)
```
/research [component]  → research/components/[component].md
/spec [component]      → outputs/[component]-config.json
/enrich [component]    → updates config.json with a11y + tokens
```

### Agent routing

| Command | Instructions | Output |
|---------|-------------|--------|
| `/build` | `build-agent/build-compact.md` | Full pipeline → `outputs/[comp]-spec-completo.md` |
| `/research` | `component-research-agent/SKILL.md` | `research/components/[comp].md` |
| `/spec` | `spec-agent/SKILL.md` | `outputs/[comp]-config.json` |
| `/enrich` | `enrich-agent/SKILL.md` | Updated `config.json` |

**`/build` reads `build-compact.md` ONLY** — do NOT read individual agent SKILL.md files. The compact file consolidates all pipeline logic.

## Pre-generated Data (20 components)

All components have pre-generated max research, config, and spec-completo. When pre-generated data exists, `/build` uses the **customize flow** (filter existing config by user scope) instead of synthesizing from scratch.

| File | Purpose | When read |
|------|---------|-----------|
| `hints/[comp].json` | Compact component data (~400 tokens) | `/build` customize flow |
| `outputs/[comp]-config.json` | Full config (spec+enrich) | `/build` customize + `/enrich` |
| `outputs/[comp]-spec-completo.md` | Unified spec document (v4) | Output of `/build` |
| `research/components/[comp].md` | 24-system research | `/build --fresh` or `/research` |
| `foundations.json` | Shared foundation values | Once per session (shared across builds) |

## Design System Reference

| File | Content |
|------|---------|
| `DESIGN.md` | Unified DS reference (foundations + property rules + naming) |
| `foundations.json` | Spacing, radius, typography, colors (shared, read once) |
| `global-property-rules.md` | Property classification rules |
| `foundations/` | Detailed foundation files (only for `/research --fresh`) |

## Research Modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| Guided | `/build [comp]` | Show scope questions from hints.json pool → filter config |
| Brief | `/build [comp] --brief` | User pastes context → fewer/smarter questions → filter config |
| Max | `/build [comp] --max` | Use pre-generated config as-is, no questions |

## Performance Rules

1. **Pre-generated = customize, don't synthesize.** Read hints.json + config.json, filter by scope. Don't re-read digests.
2. **foundations.json = read ONCE per session.** Shared across all components.
3. **build-compact.md = single instruction file.** Don't read 3 separate SKILL.md files.
4. **No web_search.** Compiled digests are the source of truth.
5. **Context carries forward.** Never re-read a file already in conversation context.
6. **Batch questions.** Ask ALL scope questions in ONE message.
7. **Auto-cache.** If config.json exists → customize flow. Pass `--fresh` to override.

## Shared References (used by spec-agent + enrich-agent)

| Folder | Content | Used by |
|--------|---------|---------|
| `references/anatomy-agent/` | Slot decision rules + component families | `/spec` |
| `references/variant-optimizer-agent/` | Optimization techniques | `/spec` |
| `references/interaction-spec-agent/` | Interaction rules (core + advanced) + component families | `/enrich` |
| `references/token-assignment-agent/` | Token architecture + naming conventions + component families | `/enrich` |

## Archived (not in active pipeline)

| Folder | Content | Reactivate with |
|--------|---------|-----------------|
| `_figma/` | generate + figma-qa + plugin + config.schema.json + plugin-updates.md | Move back to root when ready |
| `_deprecated/` | Old agents (anatomy, interaction-spec, token-assignment, variant-optimizer, review, etc.) | — |
