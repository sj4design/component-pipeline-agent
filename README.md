# Component Pipeline Agent

A Claude Code agent that researches, specifies, and documents UI components by analyzing 24 major design systems. It produces complete, decision-oriented specs for designers — with anatomy, properties, ARIA, tokens, and design rationale backed by cross-system consensus.

---

## What it produces

For each component, the pipeline generates:

- **`[comp]-spec-completo.md`** — Full design spec: when to use, visual variations, design decisions, behavior (ARIA + keyboard), content guide, checklist, tokens
- **`[comp]-config.json`** — Structured data: slots, properties, sizes, colors, tokens, a11y — ready to feed a Figma generator

---

## How it works

```
/build [component]
    └── research (24 design systems)
    └── spec (anatomy + variant matrix + optimization)
    └── enrich (ARIA + keyboard + tokens)
    └── spec-completo.md
```

**23 components are pre-generated.** When you run `/build` on a pre-generated component, the agent skips synthesis and customizes the existing data to your scope — saving ~90% of tokens.

---

## Requirements

- [Claude Code](https://claude.ai/code) CLI installed
- Run from this directory

---

## Commands

### Full pipeline

```bash
/build [component]               # Guided: scope questions → filtered spec
/build [component] --max         # No questions, full coverage
/build [component] --brief       # Paste a brief/PRD → smarter questions
/build [component] --from=spec   # Skip research, start from existing spec
/build [component] --fresh       # Ignore cache, regenerate from scratch
```

### Step by step

```bash
/research [component]            # Research across 24 design systems
/spec [component]                # Generate anatomy + variant matrix
/enrich [component]              # Add ARIA + keyboard + tokens
/enrich [component] --a11y-only  # Accessibility only
/enrich [component] --tokens-only # Tokens only
```

---

## Pre-generated components (23)

Accordion, Alert, Avatar, Breadcrumb, Button, Card, Checkbox, Datepicker, Drawer, Input, Menu, Modal, Navbar, Pagination, Progress, Radio, Select, Sidebar, Skeleton, Switch, Table, Textarea, Tooltip

For these components, `/build` uses the **customize flow**: reads `hints/[comp].json` + `outputs/[comp]-config.json`, asks scope questions, and filters the existing data to your context. No re-synthesis needed.

---

## Modes

| Mode | Trigger | When to use |
|------|---------|-------------|
| **Guided** | `/build [comp]` | You want control over scope |
| **Max** | `--max` | You want everything, no questions |
| **Brief** | `--brief` | You have a PRD or design brief to paste |

---

## Project structure

```
component-pipeline/
├── build-agent/
│   ├── build-compact.md          # Pipeline instructions (~1.3K tokens)
│   └── spec-completo-template.md # Output template
├── component-research-agent/     # /research agent
├── spec-agent/                   # /spec agent
├── enrich-agent/                 # /enrich agent
├── references/                   # Shared reference data (slots, tokens, ARIA rules)
├── hints/                        # Pre-built question pools + compact data per component
├── outputs/                      # Generated specs and configs (23 components)
├── research/components/          # 24-system research per component
├── foundations.json              # Shared spacing, radius, typography, colors
├── DESIGN.md                     # Unified design system reference
└── _figma/                       # Archived: Figma generator (coming back)
```

---

## Adding a new component

```bash
/build [new-component]
```

The agent will synthesize from scratch using the 24 compiled design system digests in `references/systems/`. No manual setup needed.

---

## Adding a new design system

1. Add compiled digests to `references/systems/compiled/`, `compiled-tier2/`, or `compiled-tier3/`
2. Update the system list in `component-research-agent/SKILL.md`
3. Re-run `/research [comp] --fresh` for any components you want updated

---

## Token cost (approximate)

| Action | Tokens |
|--------|--------|
| `/build [comp]` on pre-generated component | ~15K |
| `/build [comp]` from scratch | ~60K |
| `/research [comp]` | ~20K |

---

## Language

The agent detects your language from your first message and generates all output accordingly. Config keys are always in English.

---

## License

MIT

---
---

# Component Pipeline Agent (Español)

Un agente de Claude Code que investiga, especifica y documenta componentes UI analizando 24 sistemas de diseño. Produce specs completas y orientadas a decisiones para diseñadores — con anatomía, propiedades, ARIA, tokens y justificación de diseño respaldada por consenso entre sistemas.

---

## Qué produce

Para cada componente, el pipeline genera:

- **`[comp]-spec-completo.md`** — Spec completa: cuándo usar, variaciones visuales, decisiones de diseño, comportamiento (ARIA + teclado), guía de contenido, checklist, tokens
- **`[comp]-config.json`** — Data estructurada: slots, propiedades, tamaños, colores, tokens, a11y — lista para alimentar un generador de Figma

---

## Cómo funciona

```
/build [componente]
    └── research (24 design systems)
    └── spec (anatomía + matriz de variantes + optimización)
    └── enrich (ARIA + teclado + tokens)
    └── spec-completo.md
```

**23 componentes están pre-generados.** Cuando corres `/build` sobre un componente pre-generado, el agente salta la síntesis y personaliza la data existente a tu scope — ahorrando ~90% de tokens.

---

## Requisitos

- [Claude Code](https://claude.ai/code) CLI instalado
- Ejecutar desde este directorio

---

## Comandos

### Pipeline completo

```bash
/build [componente]               # Guided: preguntas de scope → spec filtrada
/build [componente] --max         # Sin preguntas, cobertura total
/build [componente] --brief       # Pega un brief/PRD → preguntas más inteligentes
/build [componente] --from=spec   # Salta research, usa spec existente
/build [componente] --fresh       # Ignora cache, regenera desde cero
```

### Paso a paso

```bash
/research [componente]            # Research en 24 design systems
/spec [componente]                # Genera anatomía + matriz de variantes
/enrich [componente]              # Agrega ARIA + teclado + tokens
/enrich [componente] --a11y-only  # Solo accesibilidad
/enrich [componente] --tokens-only # Solo tokens
```

---

## Componentes pre-generados (23)

Accordion, Alert, Avatar, Breadcrumb, Button, Card, Checkbox, Datepicker, Drawer, Input, Menu, Modal, Navbar, Pagination, Progress, Radio, Select, Sidebar, Skeleton, Switch, Table, Textarea, Tooltip

Para estos componentes, `/build` usa el **customize flow**: lee `hints/[comp].json` + `outputs/[comp]-config.json`, hace preguntas de scope, y filtra la data existente a tu contexto. Sin re-síntesis.

---

## Modos

| Modo | Trigger | Cuándo usar |
|------|---------|-------------|
| **Guided** | `/build [comp]` | Quieres control sobre el scope |
| **Max** | `--max` | Quieres todo, sin preguntas |
| **Brief** | `--brief` | Tienes un PRD o brief de diseño para pegar |

---

## Estructura del proyecto

```
component-pipeline/
├── build-agent/
│   ├── build-compact.md          # Instrucciones del pipeline (~1.3K tokens)
│   └── spec-completo-template.md # Template de output
├── component-research-agent/     # Agente /research
├── spec-agent/                   # Agente /spec
├── enrich-agent/                 # Agente /enrich
├── references/                   # Data de referencia compartida (slots, tokens, reglas ARIA)
├── hints/                        # Pool de preguntas + data compacta por componente
├── outputs/                      # Specs y configs generados (23 componentes)
├── research/components/          # Research de 24 sistemas por componente
├── foundations.json              # Spacing, radius, tipografía, colores compartidos
├── DESIGN.md                     # Referencia unificada del design system
└── _figma/                       # Archivado: generador Figma (próximamente)
```

---

## Agregar un nuevo componente

```bash
/build [nuevo-componente]
```

El agente sintetiza desde cero usando los 24 digests compilados en `references/systems/`. Sin setup manual.

---

## Agregar un nuevo design system

1. Agrega los digests compilados a `references/systems/compiled/`, `compiled-tier2/`, o `compiled-tier3/`
2. Actualiza la lista de sistemas en `component-research-agent/SKILL.md`
3. Corre `/research [comp] --fresh` para los componentes que quieras actualizar

---

## Costo en tokens (aproximado)

| Acción | Tokens |
|--------|--------|
| `/build [comp]` sobre componente pre-generado | ~15K |
| `/build [comp]` desde cero | ~60K |
| `/research [comp]` | ~20K |

---

## Idioma

El agente detecta tu idioma desde tu primer mensaje y genera todo el output en ese idioma. Las keys del config.json siempre quedan en inglés.

---

## Licencia

MIT
