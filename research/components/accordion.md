# Accordion — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (all patterns, all systems, no scope filter)
**Sistemas analizados:** 24 (all tiers)
**Scope:** All patterns — variant, size, state, type, a11y, composition

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | No tiene spec M3 nativo; MUI Accordion es carry-forward de Material UI v1 | MUI community layer: Accordion + AccordionSummary + AccordionDetails |
| Polaris | Filosofia merchant-first: accordion es demasiado context-specific | `Collapsible` utility + Button manual. Consumer maneja ARIA |
| Atlassian | Validado en 6 productos; cada contexto tiene heading/styling diferente | Primitives Box/Stack + custom button + aria attributes por producto |
| Gestalt | Pinterest visual-feed no necesita accordions tradicionales | Module card component para contenido colapsable |
| Orbit | Dominio travel — no accordion generico | `Itinerary` (flight segments) + `Collapse` primitive |
| Evergreen | Sin accordion formal | Pane primitives + `useDisclosureState` hook |

---

## How Systems Solve It

### Spectrum (Adobe) — "Three-layer architecture: Disclosure, DisclosureGroup, Accordion"

Spectrum ofrece la arquitectura mas granular del ecosistema. Tres componentes en niveles de abstraccion crecientes: `Disclosure` (single toggle), `DisclosureGroup` (multi-disclosure con control de grupo), y `Accordion` (DisclosureGroup estilizado con heading y panel styles). La decision clave es que `allowsMultipleExpanded` es opt-in: el default es single-open (cerrar otros al abrir uno), y multiple-expand requiere prop explicito. Esto refleja la vision de Adobe de que el patron accordion clasico (single-open) es el default, y multiple-open es la excepcion.

El soporte de `hidden="until-found"` es unico entre Tier 1: el contenido colapsado es descubrible por Ctrl+F del navegador. Esto es critico para FAQs y documentacion donde usuarios buscan contenido especifico. `headingLevel` configurable asegura que el outline del documento sea correcto semanticamente.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| 3-component hierarchy | Permite composicion exacta — Disclosure standalone o ensamblado en grupo | HIGH | Adoptar 2 niveles: Accordion (wrapper) + AccordionItem (building block) |
| `hidden="until-found"` | Contenido colapsado descubrible por Ctrl+F — critico para FAQ | HIGH | Documentar como a11y enhancement; browser support limitado a Chrome/Edge |
| Single-open default | Accordion clasico cierra otros; multiple es excepcion validada | MED | Default single-open; boolean `multiple` para opt-in |
| Heading level configurable | Correcto document outline; evita heading skipping | MED | Exponer `headingLevel` o documentar que header es h3 por defecto |

**Notable Props:** `allowsMultipleExpanded`, `defaultExpandedKeys`, `expandedKeys`, `headingLevel`, `hidden="until-found"`
**A11y:** Trigger es `<button>` dentro de heading con nivel configurable; `aria-expanded` en button; `aria-controls` vinculando al content region. Heading level asegura document outline correcto.

---

### Carbon (IBM) — "Enterprise accordion con semantica de lista"

Carbon usa `<ul>` / `<li>` como estructura semantica — los items del accordion son una lista, comunicando contenido agrupado relacionado a screen readers. Esta es una decision diferenciadora: la mayoria de sistemas no usan list semantics. El chevron esta a la derecha (no izquierda), una decision documentada de IBM para layouts densos de informacion con un caveat de a11y anotado (right chevron puede ser perdido por usuarios que escanean left-to-right).

Tres tamanios (sm, md, lg) controlan la altura del header. El prop `align` ofrece "start" (flush con leading edge) vs "end" (contenido alineado despues del chevron), afectando la alineacion visual en layouts densos. `flush` boolean en items individuales remueve padding para contenido edge-to-edge.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `<ul>/<li>` semantics | Comunica contenido agrupado a SRs; anuncia count de items | HIGH | Considerar si list semantics aporta valor o si heading semantics es suficiente |
| Right-side chevron | Consistente con layout denso IBM; caveat documentado | MED | Default left-side chevron (convencion); exponer boolean `arrow-position-end` |
| 3 sizes (sm/md/lg) | Cubre desde data forms compactos a settings panels espaciosos | MED | Adoptar sm/md/lg para header padding |
| `align` prop | Controla alineacion visual en layouts densos | LOW | Omitir inicialmente; no hay consenso fuerte |

**Notable Props:** `size: sm|md|lg`, `align: start|end`, `flush: boolean`
**A11y:** `<button>` trigger dentro de `<li>`; `aria-expanded`; `aria-controls`. SRs anuncian estructura de lista y count.

---

### Ant Design — "Multiple-open default con items API"

Ant Design (Collapse) invierte el default: multiple-open es default, y `accordion` prop opt-in para single-open. Esta decision refleja que UIs enterprise frecuentemente necesitan multiples secciones abiertas simultaneamente para comparacion. La `items` array API (v5) reemplaza la composicion de `Collapse.Panel` — mejor para generacion data-driven desde API responses.

Tres variantes visuales — `bordered`, `borderless`, y `ghost` — cubren contextos desde standalone a embebido en cards/tablas. `collapsible` controla que area del header funciona como trigger: `"header"` (todo el header), `"icon"` (solo el chevron), o `"disabled"` (no colapsable).

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Multiple-open default | Enterprise: comparar multiples secciones abiertas | HIGH | Evaluar: nuestro default sera single-open (mas comun en 14/24 sistemas) |
| `items` API (flat array) | Data-driven accordion desde API; reemplaza JSX children | MED | Relevante para code, no para Figma component |
| `ghost` variant | Sin border/bg — embeber en cards/tablas sin conflicto visual | HIGH | Incluir ghost como variant value |
| `collapsible` trigger control | Header vs icon vs disabled per-item | MED | Simplificar a boolean disabled; trigger siempre es todo el header |

**Notable Props:** `accordion: boolean`, `collapsible: "header"|"icon"|"disabled"`, `expandIcon`, `ghost: boolean`, `bordered: boolean`
**A11y:** Panel trigger es `<div role="button">` con `aria-expanded` y `aria-controls`; `aria-hidden` en content cuando colapsado. NO usa `<button>` nativo — reduce robustez de keyboard. **[A11Y WEAK]**

---

### shadcn/ui (Radix) — "Headless primitive con type string"

shadcn/ui usa Radix Accordion como base: composicion de 5 partes (Root, Item, Header, Trigger, Content). `type="single"|"multiple"` controla el comportamiento de grupo con state shapes distintas. La prop `collapsible` (solo en type=single) permite cerrar todos los items — sin ella, siempre hay uno abierto.

Radix expone un CSS custom property `--radix-accordion-content-height` para animaciones de altura, eliminando la necesidad de calcular alturas manualmente en JS. Esto es elegante y performante.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| type="single"\|"multiple" | State shapes distintas previenen bugs; explicit intent | HIGH | Mapear a boolean `multiple` — mas simple para designers |
| `collapsible` (single only) | Permite 0 items abiertos en single mode | MED | Default true — permitir cerrar todo |
| CSS custom property for height | Animacion performante sin JS calculations | LOW | Code concern, no afecta Figma component |
| Composable parts (5) | Maximo control de styling por parte | MED | Mapear a 2 niveles: Accordion + AccordionItem |

**Notable Props:** `type: "single"|"multiple"`, `collapsible: boolean`, `defaultValue`, `value`
**A11y:** Trigger es `<button>` nativo; `aria-expanded`; `aria-controls`; heading wrapper configurable. ARIA-correct headless structure.

---

### Lightning (Salesforce) — "Full accordion con single/multi modes para page sections"

Lightning ofrece un accordion completo con modos single y multi-expand, optimizado para organizacion de page sections en Salesforce. Items se definen como lightning-accordion-section children. Single mode cierra automaticamente otras secciones al abrir una.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Single/multi modes | Page sections en Salesforce necesitan ambos patrones | MED | Alineado con nuestro boolean `multiple` |
| Section-based naming | "Sections" no "items" — semantica de page organization | LOW | Naming: AccordionItem es mas generico |

**Notable Props:** `allow-multiple-sections-open`, `active-section-name`
**A11y:** `<button>` trigger con `aria-expanded`, content panel con `id` referenciado.

---

### Primer (GitHub) — "Native HTML details/summary — zero JS"

Primer usa el elemento nativo `<details>/<summary>` — zero JavaScript, semantica del navegador completa, `aria-expanded` automatico. La limitacion es control de styling reducido y no hay group management nativo.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Native HTML | Zero JS, full browser semantics, automatic a11y | HIGH | Documentar como alternativa lightweight; no suficiente para Figma component |
| No group management | Cada details es independiente | MED | Necesitamos group-level control |

**A11y:** Browser-native `aria-expanded` behavior; no additional ARIA needed.

---

### Paste (Twilio) — "Disclosure primitive para composicion"

Paste ofrece Disclosure como primitiva single-section basada en Reakit. No hay accordion compound component — equipos componen accordion lists desde Disclosure. Esto es un patreon primitivo similar a Polaris.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Single-section primitive | Maximo control; sin opiniones sobre agrupacion | MED | Nuestro AccordionItem es similar pero con group-level wrapper |

---

### Cedar (REI) — "Vue accordion con `unwrapped` prop"

CdrAccordion es un componente Vue con prop `unwrapped` para variante borderless. WCAG 2.1 AA compliance explicita. Level prop para heading semantics.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `unwrapped` prop | Borderless variant para contextos embedded | MED | Mapeamos a Variant=ghost |
| Heading level prop | Correcto document outline | MED | Documentar en a11y spec |

---

### Radix UI — "Headless canonical reference"

Radix Accordion es la referencia canonica para estructura ARIA-correct headless. 5 partes composables (Root, Item, Header, Trigger, Content). CSS custom property `--radix-accordion-content-height` para animacion. `type="single"|"multiple"` con state shapes distintas.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| 5-part composition | Maximo control; cada parte es un elemento | MED | Referencia para anatomia de slots |
| CSS height variable | Performant animation | LOW | Code concern |

---

### Chakra UI — "Boolean props para control"

Chakra usa `allowMultiple` y `allowToggle` como boolean props separados (en vez de type string). Ship con defaults visuales via Chakra theme tokens. `reduceMotion` prop para a11y motion preference.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Two booleans vs type string | `allowMultiple` + `allowToggle` es mas explicito pero confuso | LOW | Preferimos un boolean `multiple` (mas simple) |
| `reduceMotion` prop | Respeta `prefers-reduced-motion` | MED | Documentar en a11y spec |

---

### GOV.UK — "Show all sections toggle + progressive enhancement"

GOV.UK tiene el patron mas unico: un "Show all sections" global toggle arriba del accordion. Progressive enhancement — funciona sin JS. No animation by design (government content debe ser directo). Headings siempre `<h2>`.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| "Show all sections" toggle | Power users abren todo de una vez | HIGH | Considerar como feature opcional |
| No animation | Government content — claridad sobre polish | LOW | No aplicable a nuestro DS |
| Progressive enhancement | Funciona sin JS | MED | Referencia para fallback patterns |

---

### Mantine — "Cuatro variantes visuales + chevron configurable"

Mantine ofrece cuatro variantes built-in: `default`, `contained`, `filled`, `separated`. Chevron position configurable (left/right) y custom chevron node. Loop keyboard navigation (wraps around).

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| 4 variants (default/contained/filled/separated) | Cubre la mayoria de contextos visuales sin CSS custom | HIGH | Adoptar 3: default, bordered, ghost (alineado con naming-conventions) |
| Chevron position configurable | Left vs right | MED | Boolean `arrow-position-end` |
| Loop keyboard nav | Arrow keys wrap around | MED | Adoptar en keyboard spec |

---

### Base Web — "Override-based + renderAll para SEO"

Base Web ofrece `renderAll` prop que renderiza todo el contenido aunque este colapsado — importante para SEO y print. Modelo de customizacion via overrides. `StatefulAccordion` para uncontrolled.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `renderAll` para SEO/print | Contenido colapsado es indexable y printable | MED | Documentar como feature de code |
| Override model | Customizacion granular | LOW | No aplica a Figma |

---

### Fluent 2 — "Token-based, multi-panel default"

Fluent 2 optimiza para navigation panels y settings en productivity apps. Multi-panel default (matches productivity-app expectations). Token-based animation. `as` prop para heading level control.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Multi-panel default | Productivity apps: multiple settings panels abiertos | MED | Nuestro default sera single-open per convention |
| `as` prop for heading | Consumer controla heading level para document outline | MED | Documentar en a11y |

---

### Nord — "Web component healthcare-focused"

Nord accordion como web component (`<nord-accordion>`). Single-item-open default para reduced cognitive load (healthcare context). Framework-portable via custom element standard.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Single-open default | Healthcare: reducir cognitive load | MED | Alineado con nuestro default |
| Web component | Framework portable | LOW | No aplica a Figma |

---

### Playbook — "Dual React/Rails"

Playbook ofrece collapsible sections con dual React/Rails support. Basico en features pero funcional.

---

### Wise Design — "FAQ/info expandable sections"

Accordion minimalista para FAQ y secciones informativas en el contexto financiero de Wise. Minimal visual weight.

---

### Dell Design System — "Enterprise configuration accordion"

Accordion para expandable sections de configuracion enterprise. Similar a Lightning en uso pero con Dell styling tokens.

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| >= 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40-70% | Extension — shared shell + `contentType` prop or extra slots | Same component set with additional variant property |
| < 40% | Separate component — different section in library | Own component set |
| Different semantics | NOT this component — belongs elsewhere | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| FAQ accordion | 90% | Template | Multiple items, each with Q heading + A body | GOV.UK, Ant, shadcn, Mantine |
| Settings panel | 85% | Template | Sections of form controls; single-open typical | Lightning, Fluent, Dell |
| Sidebar navigation | 75% | Template | Nav items as headers; links as content | Fluent, Lightning |
| Bordered/card accordion | 95% | Template | Border + radius around each item or group | Carbon, Mantine, Ant |
| Ghost/flush accordion | 90% | Template | No border/bg — embedded in other containers | Ant, Mantine, Cedar |
| Filled accordion | 80% | Template | Background fill on headers or items | Mantine |
| Multi-step/wizard | 50% | Extension | Sequential steps + status indicators per item | Lightning |
| Nested accordion | 70% | Template | Accordion inside accordion content | Carbon, Ant, Chakra |
| Disclosure (single) | 60% | Extension | Single item, no group behavior | Spectrum, Paste, Primer |
| Expandable table row | 35% | Separate | Table row that expands detail; different DOM structure | Carbon, Base Web |
| Collapsible card | 40% | Separate | Card with expand/collapse; card chrome, not accordion | Polaris, Gestalt |
| Alert/banner dismiss | 20% | NOT accordion | Dismiss (remove) not collapse (hide); different semantics | All |

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Accordion is a container that holds AccordionItem sub-components. Each item contains a header (trigger) and a content panel. The component manages group-level state (which items are expanded). This matches the container archetype: structured shell with typed sub-components.

**Slot consensus:** (feeds spec-agent Phase 1 directly)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| icon | icon | no | 8/18 | Leading icon before title; Ant `extra`, Carbon, Mantine |
| title | text | yes | 18/18 | Trigger heading text; always present |
| chevron | icon | yes | 16/18 | Expand/collapse indicator; right-side default in Carbon, left in most |
| content | container | yes | 18/18 | Panel body; BB candidate — free-form or structured |
| description | text | no | 4/18 | Subtitle/secondary text in header; Ant `extra`, Spectrum |
| extra | container | no | 3/18 | Right-side header actions (Ant `extra` slot) |

**Property consensus:** (feeds spec-agent Phase 2 directly)
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Variant | variant | default/bordered/ghost | 14/18 | Ant: bordered/borderless/ghost; Mantine: default/contained/filled/separated; naming-conventions maps to default/bordered/ghost |
| Size | variant | sm/md/lg | 8/18 | Carbon explicit; others derive from padding tokens |
| State | state | default/hover/focus/pressed/expanded/disabled | 18/18 | expanded is the primary functional state |
| Type (single/multiple) | config | single/multiple | 16/18 | Radix type string; most use boolean; controls group behavior |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| multiple | 16/18 | false | Allow multiple items open simultaneously |
| icon | 8/18 | false | Show leading icon in header |
| arrow-position-end | 6/18 | false | Chevron on right instead of left |
| disabled | 18/18 | false | Disables individual item or entire accordion |
| expanded | 18/18 | false | Initial expanded state per item |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 18/18 | Base appearance, chevron pointing right/down based on variant | |
| hover | 14/18 | Header bg change or text color change | On header/trigger only |
| focus | 16/18 | Focus ring on trigger button | Keyboard navigation |
| pressed | 10/18 | Darker header bg | Active press on trigger |
| expanded | 18/18 | Chevron rotated 90/180 deg; content panel visible | Primary functional state |
| disabled | 16/18 | Opacity 0.5; non-interactive | Per-item or whole accordion |

**Exclusion patterns found:**
- disabled x hover/focus/pressed — 16/18 systems (universal)
- disabled x expanded — varies: some systems allow disabled + expanded (content visible but not togglable), others prevent expansion
- In Figma: disabled as boolean, not state variant; avoids frame multiplication

**Building block candidates:** (feeds spec-agent BB detection)
- AccordionItem → `.AccordionItem` — 18/18 systems have structured item (header + content panel). This IS the main building block.
- AccordionItem is the sub-component; Accordion is the wrapper/group.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| chevronPosition | start/end | 6/18 | Carbon right-side; most left-side |
| headingLevel | h2/h3/h4/h5/h6 | 6/18 | Spectrum, GOV.UK, Fluent expose |

**A11y consensus:** (feeds enrich-agent Phase 1 directly)
- Primary role: `button` on trigger (18/18 consensus) — trigger MUST be `<button>` inside heading
- Required ARIA: `aria-expanded` on trigger (18/18); `aria-controls` linking trigger to content panel id (16/18)
- Panel: `role="region"` with `aria-labelledby` pointing to trigger heading (12/18)
- Keyboard: Enter/Space toggle expanded state; Tab navigates between triggers; Arrow keys optional between triggers in group
- Focus: Linear (Tab between triggers) — NOT roving tabindex. Some systems add optional arrow key navigation.
- APG pattern: Disclosure / Accordion pattern
- Heading semantics: trigger inside heading element with configurable level (6/18 explicit)
- Ant Design uses `role="button"` on div instead of native `<button>` — **[A11Y WEAK]** reduce weight in consensus

---

## What Everyone Agrees On

1. **Trigger is a `<button>` with `aria-expanded`**: Every system (except Ant Design's div role=button) uses a native button element as the trigger. This ensures keyboard activation (Enter/Space) and focus management without additional ARIA roles. The button communicates open/closed state via `aria-expanded`.

2. **Content panel linked via `aria-controls`**: The trigger's `aria-controls` attribute references the panel's `id`. This creates a programmatic relationship so assistive technologies can announce "controls [panel name]" and allow navigation from trigger to content.

3. **Chevron as expand/collapse indicator**: All systems include a visual chevron/arrow that rotates on expand. This is universally understood as the affordance for "more content available." The rotation direction varies (90 or 180 degrees) but the presence is universal.

4. **Two-component composition (wrapper + item)**: All systems that implement accordion use at minimum a wrapper (Accordion, AccordionRoot) and items (AccordionItem, AccordionSection). Some add more granularity (Radix: 5 parts) but the 2-level minimum is universal.

5. **Single-open as most common default**: 14/18 systems default to single-open behavior (opening one item closes others). Multiple-open is available via prop (`accordion`, `allowMultiple`, `type="multiple"`) but requires opt-in. Rationale: accordion's core value proposition is managing limited screen space by showing one section at a time.

6. **Disabled blocks all interaction**: Disabled items cannot be expanded, collapsed, or focused (in most systems). Some allow disabled + already-expanded (content visible but not togglable). Universal: disabled blocks hover, focus, pressed states.

---

## Where They Disagree

1. **"Single-open o multiple-open como default?"**
   - **Option A: Single-open default** (Spectrum, Radix, shadcn, Mantine, Nord, Lightning, Carbon) — accordion's purpose is space management; single-open enforces this. Multiple requires explicit opt-in.
   - **Option B: Multiple-open default** (Ant Design, Fluent 2, Chakra) — enterprise UIs need comparison across sections; restricting to single is overly opinionated.
   - **Para tu caso:** Default single-open con boolean `multiple` opt-in. Alineado con 14/18 consensus y el patron classico accordion.

2. **"Chevron a la izquierda o derecha?"**
   - **Option A: Left-side chevron** (Spectrum, Radix, Mantine, shadcn, most systems) — users scan left-to-right; chevron as first element signals expandability immediately.
   - **Option B: Right-side chevron** (Carbon, some enterprise systems) — title gets primary visual position; chevron is secondary affordance.
   - **Para tu caso:** Default left-side. Boolean `arrow-position-end` para right-side. 12/18 consensus en left.

3. **"List semantics (`<ul>/<li>`) o heading semantics?"**
   - **Option A: List semantics** (Carbon) — SRs announce item count and group relationship.
   - **Option B: Heading semantics** (Spectrum, Radix, GOV.UK, Fluent) — correct document outline; content is sections, not list items.
   - **Para tu caso:** Heading semantics. El contenido de accordion sections es tipicamente paragrafos/forms, no list items. Heading level configurable.

4. **"Trigger = full header o solo icono?"**
   - **Option A: Full header is trigger** (most systems) — larger click target, better touch a11y.
   - **Option B: Configurable trigger area** (Ant: "header"|"icon"|"disabled") — finer control.
   - **Para tu caso:** Full header as trigger. Mejor UX y a11y (larger target area, WCAG 2.5.8).

5. **"Ghost/borderless como variant o prop?"**
   - **Option A: Variant value** (Mantine: 4 variants) — explicit visual differentiation in component set.
   - **Option B: Boolean prop** (Cedar: `unwrapped`, Ant: `ghost`) — toggle on/off.
   - **Para tu caso:** Variant property: default/bordered/ghost. Tres variantes cubren todos los contextos visuales sin explosion combinatoria.

6. **"Disabled + expanded: permitir?"**
   - **Option A: Allow** (some systems) — item was expanded, then disabled; content still visible.
   - **Option B: Prevent** (others) — disabled means fully non-interactive; collapse on disable.
   - **Para tu caso:** Allow disabled + expanded. Content visible but not togglable. Document in edge cases.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Default | Items stacked, divider between, left chevron | General use | Spectrum, Radix, shadcn |
| Bordered | Border + radius around each item or group | Standalone cards | Carbon, Mantine, Ant |
| Ghost | No border/bg, minimal dividers | Embedded in containers | Ant, Mantine, Cedar |
| Filled | Header with bg fill | Visual emphasis | Mantine |
| Show all toggle | Global toggle above accordion | Long content, FAQs | GOV.UK |

**Default pattern wireframe:**
```
┌─────────────────────────────────────────┐
│ ▶ Section Title 1                       │
├─────────────────────────────────────────┤
│ ▼ Section Title 2                       │
│  ┌─────────────────────────────────────┐│
│  │ Panel content here. Can contain     ││
│  │ any content: text, forms, images.   ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│ ▶ Section Title 3                       │
└─────────────────────────────────────────┘
```

**Bordered pattern wireframe:**
```
┌─────────────────────────────────────────┐
│ ▶ Section Title 1                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ▼ Section Title 2                       │
│  ┌─────────────────────────────────────┐│
│  │ Panel content here.                 ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ▶ Section Title 3                       │
└─────────────────────────────────────────┘
```

**Ghost pattern wireframe:**
```
  ▶ Section Title 1
  ──────────────────────────────────
  ▼ Section Title 2
    Panel content here. No border,
    no background. Minimal dividers.
  ──────────────────────────────────
  ▶ Section Title 3
```

---

## Risks to Consider

1. **Heading level mismatch** (HIGH) — If accordion heading level doesn't match document context, it breaks screen reader navigation. Mitigation: document recommended heading level or make configurable.

2. **Nested interactive elements in content** (HIGH) — Content panels can contain buttons, links, forms. If tab order is broken, users get trapped or skip content. Mitigation: linear tab order; content panel is next tab stop after its trigger.

3. **Disabled + expanded ambiguity** (MEDIUM) — Users may be confused when content is visible but not togglable. Mitigation: clear visual treatment (opacity) and aria-disabled on trigger.

4. **Chevron position inconsistency** (MEDIUM) — If DS has right-chevron accordion but left-chevron everywhere else, users lose pattern recognition. Mitigation: consistent chevron position across DS.

5. **Keyboard navigation scope creep** (LOW) — Adding arrow key navigation between triggers (like tabs) creates confusion with native Tab behavior. Mitigation: keep Tab as primary navigation; arrow keys as optional enhancement.

---

## Next Steps

```
/spec accordion           # Generate config.json with anatomy + variants + optimization
/enrich accordion          # Add a11y spec + design tokens
/generate accordion        # Build Figma components
/figma-qa                  # Audit + auto-fix
/build accordion           # Full pipeline in one command
```
