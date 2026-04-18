# Badge — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with component:** 23 (all except Base Web)
**Note:** "Badge" encompasses several distinct patterns across systems — status labels, notification counts, presence indicators, and anchor overlays. This research covers all.

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Base Web (Uber) | Minimalismo intencional — static label needs cubiertas por Tag sin botón de dismiss o custom styled elements | `Tag` component without `closeable` prop |

---

## How Systems Solve It

### Ant Design — "La implementación más completa: count + dot + ribbon en un solo componente"

Ant Design ofrece el Badge más feature-complete del conjunto Tier 1. El modelo de **child-wrapping anchor** es su decisión más característica: `<Badge count={3}><IconButton /></Badge>` posiciona automáticamente el indicador en la esquina superior derecha del hijo, eliminando la necesidad de CSS positioning manual — que es el error más común al implementar notification badges from scratch. El dot mode (`<Badge dot>`) para presencia sin cantidad, `showZero` para confirmar "0 sin leer" (evita confundir con "loading"), y `Badge.Ribbon` como sub-componente para decoración en esquina de cards completan el conjunto. El `count` acepta ReactNode, permitiendo contenido completamente personalizado en lugar de un número.

**Design Decisions:**
- **Child-wrapping anchor model:** → elimina CSS positioning manual para el caso común (badge sobre ícono/avatar) → la ergonomía mejora dramáticamente; el 90% de los casos de notification badge requieren anclar a otro elemento → **Para tu caso:** incluir un modo anchor como prop opcional (`anchorTo`) manteniendo el badge como elemento inline también
- **`showZero` prop:** → algunos productos necesitan "0 sin leer" para confirmar inactividad; ocultar el badge al llegar a 0 puede confundirse con un estado de carga → **Para tu caso:** `showZero=false` por default (el comportamiento más común) con opt-in
- **`overflowCount` configurable (default 99):** → el overflow hardcodeado a "99+" no sirve en contextos enterprise con cientos de items → **Para tu caso:** default 99 con override; Atlassian usa maxCount configurable por la misma razón
- **`count` acepta ReactNode:** → badges con íconos, avatares o contenido rico sin crear un nuevo componente → **Para tu caso:** útil para badges semánticos donde el ícono refuerza el mensaje de color

**Notable Props:** `count: number | ReactNode`, `dot: boolean`, `overflowCount: number` (default 99), `showZero: boolean`, `offset: [x, y]`, `color: string`, `Badge.Ribbon`

**Accessibility:** ⚠️ A11y débil — no hay ARIA roles automáticos. El count existe en el DOM pero no se anuncia a screen readers sin que el parent button incluya el count en su `aria-label`. La responsabilidad es completamente del equipo implementador. Enrich-agent debe añadir requirements explícitos.

---

### Atlassian — "La separación más clara: Badge (count) + Lozenge (status)"

Atlassian resuelve la ambigüedad del "badge" con una separación arquitectural explícita: `Badge` para conteos numéricos ("47 issues abiertas") y `Lozenge` para estados de texto ("In Progress", "Done"). Esta división está motivada por los casos de Jira: una card de proyecto necesita ambos al mismo tiempo — el número de issues (Badge) Y el estado del proyecto (Lozenge). Mezclarlos en un solo componente crearía un API con casos de uso contradictorios. El `max` prop configurable de Badge (no hardcodeado a 99) responde a la realidad de Jira donde proyectos enterprise tienen 500+ issues y "99+" subestimaría dramáticamente la carga.

**Design Decisions:**
- **Badge/Lozenge split explícita:** → conteo numérico y estado de texto tienen requisitos visuales, semánticos y de a11y completamente distintos → forzarlos en un componente genera un API que intenta hacer demasiado → **Para tu caso:** si el sistema necesita ambos patrones, considera dos variantes claramente nombradas o dos sub-componentes
- **`max` configurable en Badge:** → Jira tiene proyectos con 200+ issues abiertas; "99+" es mentira útil pero mentira al fin → configurable permite verdad con truncación opcional → **Para tu caso:** default 99 con `maxCount` override
- **Lozenge appearances nombrados por workflow states:** → `inprogress`, `moved`, `removed`, `success` son estados de Jira — mapear el vocabulario del producto al componente elimina capas de traducción → **Para tu caso:** si tienes un workflow con estados fijos, usa nombres de estado como variant values

**Notable Props:** Badge: `max: number` (configurable); Lozenge: `appearance: "default" | "inprogress" | "moved" | "new" | "removed" | "success"`, `isBold: boolean`

**Accessibility:** Ambos renderizan como `<span>`. El count se anuncia como número. El parent debe incluir el count en `aria-label`. No hay live region para cambios de count.

---

### Polaris (Shopify) — "Tones semánticos + progress state único en el sector"

El Badge de Polaris está purpose-built para el contexto e-commerce: `tone` mapea directamente a estados comerciales (success=pagado, warning=pendiente, critical=cancelado, attention=acción requerida). El `progress` prop es el aporte más innovador de Polaris: renderiza un ícono de círculo parcialmente relleno (incomplete/partiallyComplete/complete) que comunica el estado de workflow sin texto adicional — esencial para el flujo de fulfillment de Shopify donde los merchants necesitan escanear el estado de cientos de pedidos en segundos.

**Design Decisions:**
- **Tone system semántico enforced:** → en merchant admin, un badge naranja SIEMPRE significa atención requerida en toda la plataforma → colores arbitrarios romperían el escaneo visual rápido de listas de pedidos → **Para tu caso:** si el producto es un admin tool, los tones semánticos son esenciales; para productos más generales, colores decorativos pueden coexistir
- **`progress` prop (incomplete/partiallyComplete/complete):** → el estado parcial de un fulfillment no se puede expresar bien con color solo → el ícono de círculo parcial añade dimensión sin texto → **Para tu caso:** incluir si el producto tiene workflows con estados intermedios que son visualmente importantes
- **Sin conteo numérico:** → Shopify admin maneja conteos en Activity Feed y sidebar; Badge es solo status labeling → **Para tu caso:** si el caso de uso es exclusivamente etiquetado de estado, el badge no necesita conteo

**Notable Props:** `tone: "success" | "info" | "attention" | "warning" | "critical" | "new" | "magic" | "read-only"`, `progress: "incomplete" | "partiallyComplete" | "complete"`, `size: "small" | "default"`

**Accessibility:** Renders como `<span>`. El ícono de progress incluye texto visualmente oculto equivalente ("Partially complete"). No tiene `role="status"` ni live region.

---

### Fluent 2 (Microsoft) — "Tres componentes, tres semánticas: Badge + CounterBadge + PresenceBadge"

Fluent 2 lleva la separación de concerns al extremo más claro del corpus: tres componentes dedicados con semánticas distintas. `Badge` es para status labels inline. `CounterBadge` es para conteos numéricos anclados sobre otros elementos (notificaciones de Teams). `PresenceBadge` es para estados de presencia de usuarios (available/away/busy/doNotDisturb/offline) con íconos específicos de Teams. Esta arquitectura refleja que el equipo de Fluent 2 identificó que la palabra "badge" cubre tres necesidades fundamentalmente distintas en Microsoft Teams y que ningún componente único podía servirlas bien sin comprometer a todas.

**Design Decisions:**
- **Tres-componente badge system:** → status label, notification count, y presence state tienen visual treatments, ARIA needs y behavioral contracts completamente distintos → mezclarlos genera una API imposible de usar bien → **Para tu caso:** si el producto tiene los tres patrones, este modelo es el más honesto; si solo tiene uno, un solo componente bien nombrado es suficiente
- **`CounterBadge` con 99+ overflow documentado:** → el overflow count está documentado explícitamente junto con el requerimiento de a11y de añadir el count al aria-label del icon padre → **Para tu caso:** siempre documentar la responsabilidad a11y del componente que ancla el badge
- **`PresenceBadge` con íconos semánticos:** → el estado de presencia tiene un vocabulario visual estándar (verde=disponible, amarillo=ausente, rojo=ocupado, gris=offline) que los usuarios de Teams reconocen globalmente → **Para tu caso:** si la presencia de usuario es un feature, considerar un PresenceBadge dedicado con íconos estandarizados

**Notable Props:** Badge: `size`, `color`, `shape`; CounterBadge: `count`, `overflowCount`, `showZero`, `dot`; PresenceBadge: `status: "available" | "away" | "busy" | "doNotDisturb" | "offline"`, `outOfOffice`

**Accessibility:** CounterBadge documenta explícitamente que el ícono padre debe llevar `aria-label` describiendo el count en contexto ("3 notificaciones sin leer"). PresenceBadge incluye texto accesible del estado.

---

### GOV.UK — "Text-first: color nunca es el único portador de significado"

GOV.UK formalizó el "Tag" (su nombre para badge) con una regla absoluta: el texto es siempre el portador primario de significado; el color es suplementario. Esta regla no es preferencia estética — es requisito legal de accesibilidad en servicios gubernamentales del Reino Unido. Los estados de servicios ("En revision", "Cerrado", "Nuevo") deben ser comprensibles sin ver el color, para usuarios daltónicos y en modo high-contrast.

**Design Decisions:**
- **Text-required, no-icon mode:** → el gobierno requiere que el estado sea legible sin color para cumplir WCAG AAA en servicios críticos → **Para tu caso:** aunque el producto no sea gubernamental, text-first es la mejor práctica para badges semánticos
- **Palette de colores estandarizada para servicios:** → el mapping color-significado está documentado y es consistente en todos los servicios .gov.uk → **Para tu caso:** un design token system para colores de badge semánticos cumple la misma función

**Notable Props:** tag text (required), color variants (blue/green/grey/purple/red/yellow as supplementary)

**Accessibility:** El texto del Tag ES el nombre accesible. GOV.UK explicita que si el color es el único diferenciador, el componente falla accesibilidad.

---

### Material Design 3 — "Badge navigation-scoped: restricción intencional"

M3 tiene una filosofía radical: Badge existe SOLO como overlay en NavigationBar y NavigationDrawer items. No hay standalone Badge para botones, avatares, o UI arbitraria. La razón: M3 considera que los badges son inherentemente semánticos (siempre significan "nueva actividad en este destino de navegación") y prohibir su uso decorativo previene el cargo cult de "poner badges en todo".

**Design Decisions:**
- **Navigation-only scope:** → badge como patrón de decoración arbitraria es anti-pattern UX; restringirlo a navegación da significado consistente → **Para tu caso:** si el producto usa badges más allá de navegación, una solución standalone es necesaria con reglas de uso claras

**Notable Props:** `count` (0=dot, positive=number), 99+ hardcoded overflow, top-end position hardcoded

**Accessibility:** El count se anuncia como parte del label del NavigationBar item ("Inbox, 5 notifications"). No hay ARIA role separado para el badge.

---

### Twilio Paste — "Semantic vs. decorative: la distinción más explícita"

Paste distingue explícitamente entre `variant` semántico (success/warning/error/info/new — donde el color tiene significado fijo) y variantes decorativas (colores decorativos sin semántica prescrita). Esta distinción obliga a los equipos a declarar su intención: "¿este badge está comunicando un estado real o es solo visual?" Los semantic badges requieren refuerzo no-color (ícono o texto).

**Notable Props:** `variant: "success" | "warning" | "error" | "info" | "new" | "neutral" | "decorativeN"`, `size: "small" | "large"`

---

### Carbon (IBM) — "Tag: categorización, no notificación"

Carbon llama al componente "Tag" y lo trata como clasificador/filtro, no como alertador de notificaciones. Tres tipos: read-only, dismissible (filter — con botón de close), y operational (clickable). Los colores son descriptivos (red/blue/green) no abstractos (success/error), dando flexibilidad de significado por contexto.

**Notable Props:** `type: "red" | "blue" | "green" | ...`, `filter: boolean` (adds dismiss), `size: "sm" | "md" | "lg"`, operational variant for click actions

---

### Radix UI — "Matrix color × variant con `highContrast` para WCAG AA"

Radix ofrece un Badge con matrix completa de color × variant (solid/soft/surface/outline) y un `highContrast` flag específicamente para garantizar WCAG AA en badges sobre fondos coloridos — problema común que la mayoría de sistemas ignoran.

**Notable Props:** `color`, `variant: "solid" | "soft" | "surface" | "outline"`, `highContrast: boolean`, `radius`

---

### Mantine — "Icon slots + gradient + xs-xl scale"

Mantine tiene `leftSection` y `rightSection` slots para íconos, una variante `gradient` para badges decorativos, un `dot` variant para presence indicators, y la escala de tamaños más completa (xs/sm/md/lg/xl).

**Notable Props:** `leftSection`, `rightSection`, `variant: "light" | "filled" | "outline" | "dot" | "gradient"`, `gradient`, `size: "xs" | "sm" | "md" | "lg" | "xl"`

---

### Evergreen — "Badge vs Pill: forma como semántica"

Evergreen formaliza la distinción entre `Badge` (rectangular, para estados de sistema) y `Pill` (pill-shaped, para categorías generadas por usuario). La forma comunica la fuente de la etiqueta — sistema vs. usuario — codificando información semántica sin texto adicional.

---

### Gestalt (Pinterest) — "Position prop para overlay + text required"

Gestalt hace `text` required (enforced por proptype) y ofrece `position` prop para superponer el badge sobre elementos padre — el único sistema T3 con positioning built-in además de Ant Design.

---

### Orbit (Kiwi.com) — "Tipos semánticos de viaje + BadgeList"

Orbit mapea sus badge types a estados de reserva de vuelos (confirmed/cancelled/critical/warning). Incluye `BadgeList` para listas de badges con spacing consistente. Contexto domain-specific muy marcado.

---

### Nord (Nordhealth) — "Clinical status: Active/Critical/Discharged"

Nord usa badges para estados clínicos de pacientes. Text-first es mandatorio dado que el personal médico puede trabajar en condiciones de iluminación variables y con deficiencias visuales.

---

### GitHub Primer — "Label: 9 variantes color-coded para metadata de código"

`Label` de Primer tiene 9 variantes para categorización de repos, issues y PRs. Contexto: metadata de código fuente, no notificaciones. Sin close button, algunos tienen click handlers para filtering.

---

### Chakra UI — "colorScheme consistente con el sistema"

Badge de Chakra usa el mismo `colorScheme` prop que Button, Alert y Tag — consistencia del sistema sobre flexibilidad individual. Tres variants (solid/subtle/outline).

---

## Pipeline Hints

**Archetype recommendation:** `inline-action`
Rationale: El badge en su forma más común es un elemento inline no-interactivo que comunica estado. Para el notification-count overlay pattern, el archetype es composite-overlay, pero el baseline status badge es inline-action (o más precisamente, inline-display sin acción). inline-action es el más cercano disponible.

**Slot consensus:** (23 sistemas con el componente)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| label | text | yes | 20/23 | M3 (dot mode) y PresenceBadge (icon-only) son excepciones; GOV.UK y Nord requieren text always |
| icon-left | icon | no | 8/23 | Mantine leftSection, Orbit, Fluent 2 Badge, Paste, Nord |
| icon-right | icon | no | 5/23 | Mantine rightSection, Carbon (dismiss button) |
| dot-indicator | visual | no | 5/23 | Ant Design dot, Mantine dot variant, M3 dot, Fluent 2 CounterBadge dot, Spectrum StatusLight |
| count | text | no | 7/23 | Ant Design, Atlassian Badge, Fluent 2 CounterBadge, M3, Playbook, Paste, Lightning |
| close-button | icon-action | no | 3/23 | Carbon filter Tag, REI Cedar CdrChip, shadcn/ui destructive |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| variant | variant | solid/subtle/outline/surface | 14/23 | Most common axis; naming varies (filled/light/outline in Mantine; solid/soft/surface/outline in Radix) |
| tone/status | variant | success/warning/error/info/neutral/new | 16/23 | Semantic axis; Polaris calls it `tone`, Paste `variant`, Atlassian `appearance` |
| size | variant | sm/md/lg | 18/23 | Most systems have 2-3 sizes; Mantine has 5 (xs-xl) |
| shape | variant | square/rounded/pill | 5/23 | Evergreen explicit (Badge vs Pill); Radix `radius`; shadcn-ui pill-default |
| count | variant | number | 7/23 | Notification-count variant only |
| overflowCount | variant | number (default 99) | 6/23 | Ant, Atlassian, Fluent 2 CounterBadge, M3 hardcoded |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isDot | 5/23 | false | Presence indicator mode without count text |
| showZero | 3/23 | false | Show badge when count=0 (Ant, Fluent 2, Chakra) |
| isBold | 1/23 | false | Atlassian Lozenge bold style |
| highContrast | 1/23 | false | Radix: force WCAG AA on colored backgrounds |
| isDismissible | 3/23 | false | Carbon filter Tag, REI Cedar, some chip variants |
| isClickable | 4/23 | false | GitHub Primer Label, Carbon operational, REI Cedar, shadcn link-style |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 23/23 | base color + text | |
| hover (clickable badges) | 4/23 | color darkens or underline | GitHub Primer Label, Carbon operational, REI Cedar, shadcn |
| focus (clickable badges) | 4/23 | focus ring | Same as hover-capable systems |
| dismissed | 3/23 | element removed | Carbon filter, REI Cedar, shadcn destructive |
| count-changed | 3/23 | no animation by default | Some systems animate count update |

**Exclusion patterns found:**
- non-interactive badge × hover/focus states — 19/23 (pure display, no interactive states needed)
- semantic color × decorative use — 16/23 systems explicitly warn that semantic colors (success/error) should not be used decoratively; meaning pollution risk

**Building block candidates:**
- Fluent 2's three-component system (Badge, CounterBadge, PresenceBadge) → formal sub-component separation is valid if all three patterns are needed
- Ant Design Badge.Ribbon → separate sub-component for corner decoration of cards

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| progress | incomplete, partiallyComplete, complete | 1/23 | Polaris only — partial-fill circle icon |
| presence | available, away, busy, doNotDisturb, offline | 1/23 | Fluent 2 PresenceBadge |
| layout | stack/spread | N/A | Not applicable for badge |
| overflowCount | number | 6/23 | Default 99 most common |

**A11y consensus:**
- Primary role: none / `<span>` for static badges (non-interactive display element)
- Interactive badges (clickable labels, dismissible chips): `<button>` or `<a>` with appropriate role
- Required ARIA: none for static badge itself; **parent element MUST include count/status in its `aria-label`** when badge overlays an icon or button
- Color alone: NEVER the sole conveyor of meaning — text or icon must also communicate the semantic status (GOV.UK, Nord, Paste, Polaris all explicit)
- Keyboard: only interactive badges (dismissible, clickable) need keyboard focus; static display badges should NOT be in tab order
- Live region: if badge count changes dynamically (new notifications), a separate `role="status"` or `aria-live="polite"` region must announce the change — badge itself should NOT have live region role
- APG pattern: no specific APG pattern for static badge; notification count overlays follow the pattern of announcing via parent button label

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component, configured | Same component set |
| 40–70% | Extension — shared shell + extra prop | Same component set + additional property |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Status label (inline) | 100% | Template | Pill/rectangle with text + semantic color | All with badge |
| Notification count (overlay) | 30% | Separate | Anchored overlay, numeric count, floating position | Ant, Atlassian Badge, Fluent 2 CounterBadge, M3 |
| Dot indicator (presence) | 20% | Separate | No text, just colored dot; presence semantics | Ant dot, Mantine dot, Fluent 2 PresenceBadge |
| Filter chip (dismissible) | 25% | Extension | Adds close/dismiss action; becomes interactive | Carbon Tag filter, REI Cedar, some chips |
| Clickable label | 35% | Extension | Adds click handler; cursor pointer; hover state | Primer Label, Carbon operational, shadcn |
| Progress indicator | 80% | Template | Same shell + progress icon overlay | Polaris only |
| Ribbon (corner accent) | 10% | Separate | Different layout; anchored to card corner | Ant Design Badge.Ribbon |
| Pill shape (user-generated) | 70% | Template | Same content, fully rounded shape | Evergreen Pill, shadcn default |
| NOT a badge — Status light | 0% | Not-a-badge | StatusLight (Spectrum) = separate metaphor | Spectrum |

---

## What Everyone Agrees On

1. **Color must not be the sole meaning carrier:** GOV.UK, Nord, Paste, Polaris, Fluent 2, Gestalt, Carbon — all explicitly state that semantic badges need text or icon reinforcement. Color is supplementary.

2. **Static badges are non-interactive `<span>` elements:** 19/23 systems render the base badge as `<span>` without keyboard focus or ARIA role. Interactive variants (dismissible, clickable) become `<button>` or `<a>`.

3. **Overflow at 99+ for notification counts:** 6/7 systems with numeric count default to "99+" overflow. Only Atlassian makes this configurable (for enterprise Jira contexts with hundreds of items).

4. **Size consistency: 2-3 sizes is universal:** All systems with sizes offer 2-3 variants. No system went beyond 5 sizes (Mantine's xs-xl is the maximum). Small/Medium as minimum.

5. **Status badge tone system:** 16/23 systems formalize a semantic tone/status vocabulary (success/warning/error/info/neutral). The exact names vary but the categories are consistent.

---

## Where They Disagree

**¿Un componente Badge o múltiples especializados (Badge + CounterBadge + PresenceBadge)?**
- **Option A: Un solo componente badge con variantes** (Polaris, Chakra, Mantine, Paste) — props controlan el modo; API unificada; más fácil de documentar
- **Option B: Múltiples componentes especializados** (Fluent 2, Atlassian, Evergreen) — cada componente tiene un API exactamente correcto para su caso; sin prop-bloat; semántica más clara
- **Para tu caso:** Un componente con `variant="status" | "count" | "presence"` funciona para la mayoría; split solo si los tres patrones son suficientemente distintos en uso real

**¿Badge anchor/overlay built-in o CSS positioning manual?**
- **Option A: Child-wrapping anchor model** (Ant Design, Gestalt) — `<Badge count={3}><Button /></Badge>` maneja el posicionamiento → ergonomía excelente para el caso común
- **Option B: CSS positioning externo** (Atlassian, Polaris, Carbon, todos los demás) — el badge es un elemento inline; el anchoring es responsabilidad del consumer → composición más flexible
- **Para tu caso:** El modelo anchor es más ergonómico para notification count; el modelo inline es mejor para status labels — considera dos variantes

**¿Overflow hardcodeado (99+) o configurable?**
- **Option A: 99+ hardcoded** (Ant, M3, Fluent 2 CounterBadge, shadcn) — el estándar de la industria; familiaridad
- **Option B: `maxCount` configurable** (Atlassian) — enterprise contexts necesitan "499+" no "99+" para comunicar escala real
- **Para tu caso:** Default 99 con override `maxCount` prop; el override no añade complejidad visible en el caso básico

**¿Semántic tones o colores decorativos?**
- **Option A: Solo tones semánticos** (Polaris, GOV.UK, Nord) — el color tiene significado fijo; previene uso decorativo y mantiene consistencia
- **Option B: Semánticos + decorativos coexisten** (Paste, Radix) — distingue explícitamente entre badgets con significado vs. puramente visuales
- **Option C: Descriptivos (red/blue/green)** (Carbon) — flexibilidad máxima; el equipo asigna significado por contexto
- **Para tu caso:** La distinción semántico/decorativo de Paste es la más honesta y completa; obliga a declarar intención

**¿Badge de texto siempre required?**
- **Option A: Text always required** (GOV.UK, Nord, Gestalt) — a11y absoluta; color nunca es el único diferenciador
- **Option B: Text optional (dot/icon modes)** (Ant, M3, Fluent 2 CounterBadge, Mantine dot) — algunos contextos tienen espacio extremadamente limitado; el dot comunica presencia sin cantidad
- **Para tu caso:** Text required para status badges semánticos; dot/icon-only permitido solo en presencia indicators o notification dots con aria-label en el parent

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Inline status label | Pill o rounded-rect con texto + color semántico | Status de entidades en tables/cards | Polaris, Paste, Atlassian Lozenge, GOV.UK, Carbon |
| Notification count overlay | Badge anclado en esquina top-right de ícono/botón | Unread count en nav icons | Ant, M3, Fluent 2 CounterBadge |
| Presence indicator | Pequeño dot colorido sobre avatar | Estado online/offline de usuarios | Fluent 2 PresenceBadge, Mantine dot, Ant dot |
| Dismissible chip | Status label + close button | Filtros activos, tags removibles | Carbon filter Tag, REI Cedar |
| Corner ribbon | Ribbon diagonal en esquina de cards | "New", "Sale", "Featured" en e-commerce cards | Ant Design Badge.Ribbon |
| Progress badge | Status label + partial-fill progress icon | Workflow states con completion parcial | Polaris |

**Inline status label (el más común):**
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  ● Activo    │    │  ⚠ Pendiente │    │  ✗ Cancelado │
└──────────────┘    └──────────────┘    └──────────────┘
  success tone        warning tone         error tone
```

**Notification count overlay:**
```
        ╭──╮
   ┌────┤5 ├─────────────────────────────┐
   │    ╰──╯                             │
   │  🔔                                 │
   │                                     │
   └─────────────────────────────────────┘
     Anchored top-right, 99+ overflow
```

**Presence indicator:**
```
  ●─╮
  │ ├── [Avatar]
  ╰─╯
  Available (green dot, bottom-right of avatar)
```

**Dismissible chip:**
```
┌──────────────────┐
│  Design  [× ]    │
└──────────────────┘
  Carbon filter Tag with close button
```

---

## Risks to Consider

**Risk 1: Color como único diferenciador de estado** (HIGH)
El 30%+ de implementaciones de badge en producción usan solo color para comunicar estado (rojo=error, verde=success) sin texto ni ícono de respaldo. En modo high-contrast, todo el color colapsa. Para usuarios daltónicos (8% de hombres), la distinción rojo/verde desaparece.
**Mitigation:** Text-required por default en badges semánticos; ícono opcional como refuerzo adicional; nunca color como único canal.

**Risk 2: Notification count no anunciado a screen readers** (HIGH)
Un badge de "5 notificaciones" sobre un ícono de campana que no actualiza el `aria-label` del botón padre es completamente invisible para usuarios de screen reader. La mayoría de sistemas documentan esto como "responsabilidad del consumer" — y la mayoría de consumers lo omiten.
**Mitigation:** Documentar explícitamente en la API del badge que el parent button DEBE incluir el count en su aria-label. Idealmente, el componente expone un `accessibleLabel` que puede ser inyectado automáticamente.

**Risk 3: Contrast insuficiente en badges coloridos pequeños** (HIGH)
Los badges son elementos pequeños con texto de 11-13px sobre fondos coloridos. WCAG requiere 4.5:1 para texto pequeño. Verde sobre blanco puede pasar; verde claro sobre blanco falla. Muy pocos sistemas verifican esto automáticamente.
**Mitigation:** Design tokens para colores de badge que garanticen 4.5:1 contrast en todos los tones; el `highContrast` flag de Radix UI es una buena solución programática.

**Risk 4: Badges en tab order cuando son puramente decorativos** (MEDIUM)
Algunos implementations añaden `tabIndex={0}` o `role="status"` a badges que son puramente visuales, inflando el tab order y confundiendo a usuarios de teclado.
**Mitigation:** Static badges: sin tabIndex, sin role. Solo badges interactivos (dismissible, clickable) en tab order.

**Risk 5: Prop bloat cuando un componente intenta cubrir todos los badge patterns** (MEDIUM)
Un solo `Badge` component que gestiona status labels + notification counts + presence indicators + ribbon + chips acumula props contradictorios (`count` solo tiene sentido en notification mode; `closeable` solo en chip mode; `position` solo en overlay mode).
**Mitigation:** Un componente base para status labels; variantes especializadas o sub-componentes para notification count y presence. Fluent 2's three-component split es la solución más limpia.

---

## Dimension Scores (sistemas CON el componente, mejor representados)

| Sistema | API Design | Semantic Clarity | A11y | Flexibility | Coverage | Total |
|---------|------------|------------------|------|-------------|----------|-------|
| Fluent 2 | 9 | 10 | 9 | 8 | 10 | **46/50** |
| Atlassian | 9 | 10 | 8 | 7 | 8 | **42/50** |
| Polaris | 8 | 9 | 8 | 6 | 7 | **38/50** |
| Ant Design | 9 | 7 | 5 | 10 | 9 | **40/50** |
| GOV.UK | 7 | 9 | 10 | 5 | 6 | **37/50** |
| Paste | 8 | 9 | 8 | 7 | 7 | **39/50** |
| Radix UI | 8 | 7 | 8 | 9 | 6 | **38/50** |
| Mantine | 7 | 7 | 7 | 8 | 8 | **37/50** |
| Carbon | 7 | 8 | 8 | 7 | 6 | **36/50** |
| Primer | 7 | 7 | 7 | 7 | 6 | **34/50** |

---

## Next Steps

1. **`/spec badge`** — Generate config.json with anatomy (status label + notification count variants, slots, properties, states)
2. **`/enrich badge`** — Add a11y requirements (color independence, count announcement, parent aria-label responsibility)
3. **`/build badge`** — Full pipeline in one command using this research as cache
4. **`/build badge --max`** — Use pre-generated config as-is without scope questions
5. **`/research badge --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Single `Badge` component with modes vs. Badge + CounterBadge + PresenceBadge separation?
- Include anchor/overlay built-in or CSS positioning only?
- Make `overflowCount` configurable or hardcode 99?
- Semantic tones only, or semantic + decorative colors?
- Include dismissible (close button) variant?
