# Timeline

## Overview

Timeline es un componente de visualización cronológica que presenta una secuencia de eventos pasados mediante markers conectados por una línea vertical. Cada evento (TimelineItem) tiene un marker (dot, ícono o avatar), una línea conectora al siguiente evento, y un área de contenido con título, timestamp, descripción, actor y contenido expandido opcionales. La arquitectura es de sub-componentes: `TimelineItem` (el ítem individual, building block) + `Timeline` (el contenedor que define modo y tamaño).

**Timeline registra lo que ocurrió (historia). Steps guía lo que viene (futuro).** Esta distinción semántica es fundamental y debe reflejarse en la elección del componente.

```
Mode=default (left — audit log):       Mode=alternating (story/roadmap):
┌────────────────────────────────┐     ┌─────────────────────────────────────┐
│                                │     │                                     │
│  ●──────────────────────────   │     │  Q1 Launch ────●──── Announced      │
│  │  Deployment started        │     │                │                    │
│  │  2026-04-17 · 14:23        │     │          Beta ─●                    │
│  │                            │     │                │   ── API release   │
│  ●──────────────────────────   │     │                ●────               │
│  │  Tests passed (42/42)      │     │                │  GA Launch         │
│  │  2026-04-17 · 14:31        │     │                ○ ← pending          │
│  │                            │     │                                     │
│  ▶──────────────────────────   │     └─────────────────────────────────────┘
│     Build in progress...      │
│     2026-04-17 · 14:35        │     Status-coded (process log):
│                                │     ┌────────────────────────────────┐
└────────────────────────────────┘     │  ●  Clone repo     [success]   │
  ● = default/success dot               │  │                              │
  ▶ = pending/loading indicator         │  ●  Install deps   [success]   │
                                        │  │                              │
Date-grouped timeline:                  │  ▣  Run tests       [failed]   │
┌───────────────────────────────┐       │  │                              │
│  ── April 17, 2026 ─────────  │       │  ○  Deploy         [skipped]   │
│  ●  Order placed · 09:12     │       └────────────────────────────────┘
│  │                            │         ● = green ▣ = red ○ = gray
│  ●  Payment confirmed · 09:13│
│  ── April 18, 2026 ─────────  │
│  ●  Shipped · 11:05          │
│  ○  Out for delivery · pending│
└───────────────────────────────┘
```

`TimelineItem` es el sub-componente building block. `Timeline` es el contenedor que establece el mode (default/alternating/left/right) y el size (sm/md). La línea conectora que une los markers es parte del TimelineItem (`Show Connector`) y se oculta en el último ítem (`IsLast=yes`).

**Lo que el diseñador puede configurar:**

Variantes (cambian la apariencia — generan variantes Figma):

```
TimelineItem:
  State:      default | success | error | warning | info | disabled
  MarkerType: dot | icon | avatar
  Size:       sm | md
  IsLast:     no | yes

Timeline:
  Mode:       default | alternating | left | right
  Size:       sm | md
```

Toggles (muestran/ocultan partes — NO generan variantes adicionales):

```
TimelineItem:
  👁 Has Timestamp  → muestra/oculta timestamp del evento
  👁 Has Description → muestra/oculta descripción del evento
  👁 Has Actor       → muestra/oculta quién realizó la acción (avatar + nombre)
  👁 Has Content     → muestra/oculta contenido expandido (attachments, details)
  👁 Show Connector  → muestra/oculta la línea conectora (false en IsLast=yes)
```

### Figma properties panel

```
TimelineItem (sub-component):
┌──────────────────────────────────────────────┐
│  TimelineItem                                │
├──────────────────────────────────────────────┤
│  State       [default ▼]                     │
│              default / success / error       │
│              warning / info / disabled       │
│  MarkerType  [dot ▼]                         │
│              dot / icon / avatar             │
│  Size        ○ sm  ○ md                      │
│  IsLast      ○ no  ○ yes                     │
├──────────────────────────────────────────────┤
│  👁 Has Timestamp    [off]                   │
│  👁 Has Description  [off]                   │
│  👁 Has Actor        [off]                   │
│  👁 Has Content      [off]                   │
│  👁 Show Connector   [on]                    │
├──────────────────────────────────────────────┤
│  ✏️ Title         [Evento]                   │
│  ✏️ Description   [Descripción del evento]   │
│  ✏️ Timestamp     [hace 2 horas]             │
│  🔄 Marker        [marker/dot]               │
└──────────────────────────────────────────────┘

Timeline (container):
┌──────────────────────────────────────────────┐
│  Timeline                                    │
├──────────────────────────────────────────────┤
│  Mode    [default ▼]                         │
│          default / alternating / left / right│
│  Size    ○ sm  ○ md                          │
└──────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas mostrar una secuencia de eventos pasados?
              │
              ▼
  ¿Los eventos son históricos (ya ocurrieron)?
              │
       Sí ────┼──── No (futuro/secuencial) → usa Steps
              │
  ¿Son 3+ eventos? (menos no justifica el overhead visual)
              │
       Sí ────┼──── No → usa una Card o un Alert
              │
  ¿Los eventos tienen estructura cronológica?
              │
       Sí ────┼──── No (datos tabulares densos) → DataGrid / Table
              │
           usa Timeline

¿Caso de uso específico?
  Activity log (Jira issue history, audit)  → Mode=default, MarkerType=icon/avatar
  Process tracking (deployment, order)      → Mode=default + states semantics
  Story/roadmap/company history             → Mode=alternating
  Changelog/notifications                   → Mode=default o left
```

**Usa Timeline cuando:**
- Muestras el historial de cambios de un issue o recurso (audit log tipo Jira)
- Visualizas el estado de un proceso de múltiples pasos que ya iniciaron (deployment log, pedido)
- Construyes un feed de actividad de usuario (quién hizo qué y cuándo)
- Creas un changelog visual de actualizaciones de producto o versiones
- Presentas hitos de empresa o historia de proyecto (Mode=alternating para impacto visual)

**NO uses Timeline cuando:**
- Los pasos son futuros o están en progreso como proceso secuencial → usa Steps (Wizard)
- Los datos son tabulares con muchas columnas (tiempo, actor, IP, tipo, payload) → usa DataGrid
- Hay un solo evento → usa Card o Alert
- Quieres mostrar un proceso a futuro con estado actual → usa ProgressIndicator/Steps
- El layout es horizontal (gantt, roadmap temporal con eje X) → requiere componente especializado

---

## Visual variations

### State: default

Marker circular con fondo `border/default` (gris). Línea conectora en `border/default`. Es el estado neutro para eventos sin status semántico específico.

### State: success

Marker con fondo `status/success/fg` (verde). Línea conectora en `status/success/border`. Indica un evento que se completó satisfactoriamente (deploy exitoso, pago confirmado, test passed).

### State: error

Marker con fondo `status/error/fg` (rojo). Línea conectora permanece en gris (`border/default`) —la línea solo refleja el color del estado de inicio del evento, no el de llegada. Indica un evento que falló (build failed, error de sincronización).

### State: warning

Marker con fondo `status/warning/fg` (amber). Para eventos que completaron con advertencias o requieren atención (deploy con degraded performance, pago parcial).

### State: info

Marker con fondo `status/info/fg` (azul). Para eventos informativos (nueva versión disponible, anuncio del sistema, cambio de configuración).

### State: disabled

Marker con fondo `border/disabled` (gris claro), opacity 0.6. Para eventos futuros/planificados dentro de un timeline que tiene mezcla de histórico y planificado (uso limitado — preferir Steps para flujos futuros).

### MarkerType: dot (default)

Círculo simple. El tipo más minimalista. Ideal para activity feeds donde todos los eventos tienen el mismo peso visual y la información está en el título/descripción.

### MarkerType: icon

El marker contiene un ícono que identifica el tipo de evento (bug fix, feature release, deploy, comment). Requiere que el sistema tenga un vocabulario de íconos por tipo de evento. Máximo ~8 tipos para que el vocabulario sea aprendible.

### MarkerType: avatar

El marker es el avatar del actor (quien realizó la acción). Ideal para audit logs y feeds de colaboración donde "quién hizo qué" es tan importante como "qué se hizo". Combina con `Has Actor=true` para mostrar el nombre del actor.

### Size: sm

markerSize 12px, connectorThickness 2px, titleFontSize 14px, descriptionFontSize 12px, gap horizontal 12px, verticalGap 16px. Para feeds de alta densidad o panels secundarios.

### Size: md (default)

markerSize 16px, connectorThickness 2px, titleFontSize 16px, descriptionFontSize 13px, gap 16px, verticalGap 24px. Para la mayoría de contextos de dashboard y detalle.

### IsLast: yes

El último TimelineItem no muestra la línea conectora descendente (`Show Connector=false`). La línea de un timeline debe terminar en el último marker, no extenderse indefinidamente hacia abajo.

### Mode: alternating

Eventos alternados izquierda/derecha del connector central. El clásico visual de "timeline histórico". Requiere espacio horizontal suficiente (>600px). No funciona bien en mobile sin responsive fallback a Mode=default.

---

## Design decisions

### 1. Tres MarkerTypes: dot / icon / avatar

**¿Por qué?** Cada tipo sirve un caso de uso distinto con semántica diferente. Dot para feeds simples donde los eventos son equivalentes; icon para sistemas con vocabulario de tipos de evento (bug, feature, deploy, merge); avatar para feeds de colaboración donde la identidad del actor es primaria. Ant Design usa `dot` como ReactNode (máxima flexibilidad) pero sin tipos semánticos definidos. Modelar los tres tipos explícitamente garantiza que los equipos no improvisen avatares y íconos de forma inconsistente.

**Trade-off:** Los tres tipos no son uniformes en peso visual. Un feed que mezcle dot + avatar + icon puede verse caótico. La guía de contenido debe recomendar elegir un tipo por contexto de Timeline.

### 2. Seis States con color semántico en marker + connector

**¿Por qué?** El estado de cada evento (success, error, warning, info, default, disabled) cambia el color del marker Y de la línea conectora (en casos de success). Esto permite que el "trazado del flujo" sea visible: en un deployment log con un error en el paso 3, los pasos 1-2 son verdes, el paso 3 es rojo, y los pasos 4-N permanecen en gris porque no se ejecutaron. El estado solo en el marker sería insuficiente para comunicar esta progresión.

**Trade-off:** Usando color como único indicador de estado falla WCAG 1.4.1. La mitigación es que el estado debe expresarse también en el título/descripción del evento ("Falló: 3/5 tests"). El marker lleva `aria-hidden="true"` y la semántica está en el texto.

### 3. Mode: default / alternating / left / right (patrón Ant Design)

**¿Por qué?** Default (markers izquierda, content derecha) es el estándar para la mayoría de casos de uso. Alternating crea el impacto visual clásico de timeline histórico. Left y right cubren casos específicos de layout (RTL, contextos sidebar). Omitir alternating sería limitar el componente a un caso de uso, ignorando su potencial para marketing/historia de empresa.

**Trade-off:** Alternating requiere espacio horizontal y no funciona en mobile sin un responsive fallback. La guía de contenido debe advertir sobre esto explícitamente.

### 4. IsLast boolean oculta el trailing connector

**¿Por qué?** Un timeline no debe tener una línea descendente sin destino al final de la lista. El conector del último ítem no tiene sentido semántico. Modelarlo como property explícita (similar al patrón `IsLast` en componentes de lista/breadcrumb) garantiza que el diseñador no olvide configurarlo y que el comportamiento sea predecible.

**Trade-off:** Requiere que el equipo de desarrollo (y el diseñador en Figma) marque correctamente el último ítem. Con datos dinámicos, el último ítem debe detectarse automáticamente via `index === items.length - 1`.

### 5. `<time datetime="[ISO]">` semántico para timestamps

**¿Por qué?** Es el elemento HTML estándar para fechas/horas. Permite que los lectores de pantalla reformateen la fecha en el formato del sistema del usuario, que los motores de búsqueda indexen fechas correctamente, y que las herramientas de i18n re-localicen la presentación. Una string de texto plano ("hace 2 horas") no cumple ninguna de estas funciones.

**Trade-off:** El slot de timestamp debe tipificarse como `{ displayText: string; isoDate: string }` en lugar de solo `string`. Agrega complejidad de API pero es la práctica correcta.

### Combinaciones excluidas

```
IsLast=yes + Show Connector=visible
  └── El último item no tiene trailing connector.
      Cuando IsLast=yes, Show Connector se fuerza a false automáticamente.

Mode=alternating en viewports < 600px
  └── Alternating degrada a dos columnas colapsadas. No es una exclusión Figma
      sino una restricción documentada: usar solo en desktop. El componente
      debe tener un fallback responsive a Mode=left en mobile.
```

---

## Behavior

### Essential for design

1. **Orden cronológico:** Por defecto, el primer ítem (top) es el más antiguo. Para activity logs que muestran primero el más reciente, usar `reverse=true` (prop de desarrollo; en Figma, reordenar los frames).
2. **Connector del último ítem:** `Show Connector=false` en el último TimelineItem (`IsLast=yes`). El diseño debe reflejarlo.
3. **Estado en texto, no solo color:** Todo cambio de estado (success, error, warning) debe estar expresado también en el texto del title o description para cumplir WCAG 1.4.1.
4. **Expandable items:** Si un TimelineItem tiene `Has Content=true`, el contenido expandido puede ser un detalle, un adjunto o un comentario. El toggle de expansión usa el patrón de disclosure estándar (`aria-expanded`).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Timeline container | list | `aria-label="[Contexto] timeline"` (ej. "Historial de pedido") | Identifica el propósito de la lista cronológica |
| TimelineItem | listitem | — | Ítem de lista; orden secuencial implícito |
| Timestamp | — | `<time datetime="[ISO-8601]">` | Machine-readable; AT reformatea fechas |
| Marker (decorativo) | — | `aria-hidden="true"` | El círculo/ícono es decorativo; el estado está en el texto |
| Connector line | — | `aria-hidden="true"` (o CSS ::before/::after) | Decorativo; sin significado semántico |
| State color (success/error/etc.) | — | Estado expresado en title/description text | Color solo falla WCAG 1.4.1 — el texto lo complementa |
| Actor slot | — | Texto visible con nombre del actor | "por [Nombre]" en el texto; el avatar es decorativo |
| Expandable content | — | `aria-expanded="true/false"` en el trigger | Patrón disclosure estándar |
| Dynamic loading (feed) | — | `aria-live="polite"` en región de status | Anuncia "N nuevos eventos" — no cada ítem individual |

### Keyboard navigation

Primary interactions (affect design):

```
Tab  → Si los TimelineItems son interactivos (tienen links o expand trigger)
       navega entre los elementos focusables dentro de cada item
```

Secondary interactions (dev reference):

```
Tab / Shift+Tab
  └── Navega entre elementos interactivos: timestamps (si son links),
      títulos (si son links al detalle), botones de expand/collapse,
      acciones (CTA buttons dentro del item)

Enter / Space (en trigger de expand)
  └── Expande/colapsa el contenido del item
  └── aria-expanded cambia de true a false

Arrow keys (optional, custom)
  └── Para listas de timeline muy largas, implementar arrow key navigation
      como enhancement (no requerido por WAI-ARIA)
```

---

## Content guide

### Slot: title (requerido)

El nombre del evento. Debe ser claro y específico sobre lo que ocurrió.
- **Do:** "Deployment to production started", "Order placed", "Payment confirmed", "Test suite failed"
- **Don't:** "Event 1", "Action", "Update" (demasiado genérico sin contexto)
- **Incluir el estado en el texto:** "Tests passed (42/42)" es mejor que solo "Tests ran" (el estado success está en el título)

### Slot: timestamp (opcional/recomendado)

La hora/fecha del evento. Siempre en formato relativo + formato absoluto.
- **Do:** "hace 2 horas" (displayText) + `datetime="2026-04-17T14:23:00Z"` (isoDate)
- **Don't:** Solo "14:23" sin fecha (ambiguo para eventos de múltiples días)
- **Formato relativo vs. absoluto:** Relativo ("hace 3 min") para eventos recientes (<24h); absoluto ("17 abr, 14:23") para eventos más antiguos

### Slot: description (opcional)

Detalle adicional del evento. Complementa el título con contexto.
- **Do:** "42/42 tests passed in 2m 15s", "Assigned to María García", "Imported from CSV"
- **Don't:** Repetir el título en la descripción; texto > 100 chars que requiera scroll

### Slot: actor (opcional)

Quién realizó la acción. Combinado con MarkerType=avatar es el patrón de "quién hizo qué".
- **Do:** Avatar + nombre completo ("Juan López")
- **Don't:** Solo avatar sin nombre (el nombre es necesario para accesibilidad)
- **Combinación recomendada:** MarkerType=avatar + Has Actor=true

### Slot: content (opcional)

Contenido expandido del evento: adjuntos, comentarios, detalles técnicos.
- **Do:** Detalles de error (stack trace), resumen de cambios, archivos adjuntos
- **Don't:** Contenido que debería estar en el título (lo básico siempre en título)
- **Patrón expandable:** El contenido se revela con un toggle; usar `aria-expanded`

### Slot: marker (requerido)

El ícono visual del evento. Default: `marker/dot`.
- **dot:** Neutro, para feeds donde todos los eventos son equivalentes
- **icon:** Para taxonomías de tipos de evento (up a ~8 tipos únicos)
- **avatar:** Para feeds de colaboración donde la identidad del actor es primaria

---

## Pre-build checklist

```
Semántica HTML
□ Container: role="list" + aria-label descriptivo
□ TimelineItem: role="listitem"
□ Timestamp: <time datetime="[ISO-8601]">texto display</time>
□ Marker: aria-hidden="true" (decorativo)
□ Connector: aria-hidden="true" (o CSS ::before/::after)

Accesibilidad de Estado
□ State (success/error/warning/info) expresado en title o description text
□ NO dependencia única del color para comunicar estado (WCAG 1.4.1)
□ Si expandable: aria-expanded en el trigger + id en el contenido
□ Para feeds dinámicos: aria-live="polite" en región de status count

TimelineItem
□ IsLast=yes → Show Connector=false (último ítem sin trailing connector)
□ Último ítem identificado correctamente (via index en datos dinámicos)
□ State semantics: color de marker Y descripción en texto

Timeline
□ Mode=alternating solo para viewports ≥600px (documentar responsive fallback)
□ Mode=default para activity logs, audit logs, changelogs
□ Mode=alternating para story/history/roadmap pages

Tokens
□ State colors vinculados a status/ tokens (no hardcoded)
□ Connector color: border/default (o status/success/border en success)
□ Marker sizes: sm=12px (sizing/xs), md=16px (sizing/sm)

Figma Handoff
□ TimelineItem: State(6) × MarkerType(3) × Size(2) × IsLast(2) = 72 gross, −12 = 60 net
□ Timeline: Mode(4) × Size(2) = 8 frames netos
□ Boolean layers: 👁 Has Timestamp, 👁 Has Description, 👁 Has Actor, 👁 Has Content, 👁 Show Connector
□ Swap slot: 🔄 Marker (dot → icon → avatar)
```

---

## Related components

```
Steps (ProgressSteps / Wizard)
  └── Para flujos FUTUROS o en-progreso secuenciales (onboarding, checkout)
  └── Steps guía "lo que viene"; Timeline registra "lo que pasó"
  └── Si la secuencia tiene pasos futuros, usa Steps — no Timeline

ActivityFeed
  └── Para feeds de actividad social infinita (role="feed" WAI-ARIA)
  └── Timeline para secuencias acotadas; ActivityFeed para feeds infinite-scroll

Alert / Toast
  └── Para un solo evento de status (no secuencia)
  └── Cuando solo hay 1-2 eventos, una Card con status badge es suficiente

DataGrid / Table
  └── Para audit logs densos con muchas columnas (timestamp, actor, acción, IP)
  └── Cuando los eventos tienen estructura tabular uniforme con filtros y paginación

Card
  └── Para mostrar detalles de un solo evento en profundidad
  └── TimelineItem con Has Content=true puede contener Cards como contenido expandido

Avatar / AvatarGroup
  └── Slot actor dentro de TimelineItem usa Avatar
  └── MarkerType=avatar usa el mismo componente Avatar
```

---

## Reference: how other systems do it

### Ant Design (Tier 1 — implementación de referencia)

Ant Design es el único sistema Tier 1 con un componente Timeline dedicado y sirve como la implementación primaria de referencia. Separa Timeline de Steps por intención: Timeline registra lo que ocurrió (historia); Steps guía lo que viene (progresión futura). La prop `mode` ofrece tres modos de layout: left, right y alternate, siendo alternate único en Tier 1. La prop `pending` añade un ítem terminal con spinner de carga, diseñado explícitamente para activity feeds en tiempo real. Los colores semánticos por ítem (blue/green/red/gray) comunican el estado del evento sin requerir íconos personalizados. La prop `dot` acepta cualquier ReactNode para reemplazo completo del ícono.

### Salesforce Lightning ActivityTimeline (Tier 2)

La ActivityTimeline de Lightning está construida específicamente para páginas de detalle de registros CRM. Cada tipo de actividad (llamada, email, tarea, evento) tiene un ícono y color distintos. Los ítems son expandibles para mostrar detalles de la actividad inline. Los timestamps se alinean a la derecha (separando "qué" de "cuándo" para escaneo rápido). Esta es la implementación más madura para el caso de uso de "feed de eventos de tipo mixto" en CRM.

### GitHub Primer TimelineItem (Tier 2)

El Timeline de Primer está optimizado para los feeds de actividad de issues y PRs de GitHub, streams de eventos mixtos de alto volumen donde la reducción de ruido importa. La variante `TimelineItem.Condensed` agrupa eventos relacionados (múltiples adiciones de labels, cambios de asignación) en ítems compactos de una sola línea. `TimelineItem.Badge` provee el círculo de ícono coloreado que separa visualmente los tipos de evento. La dualidad condensed/full es el patrón clave único.

### Playbook (Tier 2)

Playbook agrupa los ítems de timeline por fecha, proporcionando cortes visuales naturales en historiales de actividad largos. Este patrón de agrupación por fecha es especialmente efectivo para el contexto de listados y pedidos de eBay donde los eventos abarcan días o semanas. Los encabezados de fecha actúan como divisores de sección implícitos sin requerir componentes separadores explícitos.

### Chakra UI (Tier 3)

Chakra v3 introdujo un Timeline compuesto: `Timeline.Root` > `Timeline.Item` > (`Timeline.Connector` + `Timeline.Content`). El `Timeline.Connector` explícito como pieza composable separada permite a los consumidores omitir o personalizar el conector por ítem — útil para timelines con rupturas lógicas como separadores de fecha. Implementación mínima: sin colores de estado integrados, sin active-line-fill.

### Mantine (Tier 3 — implementación más completa fuera de Ant Design)

El Timeline de Mantine es la implementación más completa en T3. La prop `active` establece un índice de "posición actual": los ítems en o antes de `active` tienen el conector relleno; los posteriores tienen conector vacío/gris, creando una progresión visual. `lineVariant` (solid/dashed/dotted) diferencia conexiones confirmadas de tentativas. El `bullet` personalizado acepta cualquier ReactNode por ítem. `reverseActive` rellena la línea de abajo hacia arriba para timelines newest-first.

### Orbit (Tier 3)

El Timeline de Orbit está diseñado para itinerarios de viaje (secuencias de eventos de vuelo/reserva). Cada `TimelineStep` tiene un `type` (success/warning/critical/info) que colorea independientemente su dot y segmento de conector. Sin posición `active` global: cada evento declara su estado independientemente. El slot `subLabel` cubre información de dos niveles por paso (ruta vs. detalles de duración).

### Sistemas sin componente dedicado

Material Design 3, Spectrum (Adobe), Carbon (IBM), Polaris (Shopify), Atlassian, Twilio Paste, shadcn/ui, Radix UI, REI Cedar, Wise, Dell, GOV.UK, Base Web, Gestalt, Evergreen, Nord y otros 16 sistemas no publican un componente Timeline. Los tratan como un patrón de composición a nivel de producto. La ausencia es reveladora: Timeline es suficientemente específico de producto como para que la mayoría de DS no lo include, pero suficientemente recurrente en dashboards, CRM y herramientas de desarrollo como para justificar un componente dedicado en sistemas con estos casos de uso.

---

## Tokens

**18 tokens** · prefix `tl-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| tl/marker/sm | sizing/xs | Tamaño marker Size=sm (12px) |
| tl/marker/md | sizing/sm | Tamaño marker Size=md (16px) |
| tl/connector/color | border/default | Color línea conectora (gris default) |
| tl/connector/success | status/success/border | Color línea conectora en State=success |
| tl/connector/thickness | border/2 | Grosor línea conectora (2px) |
| tl/default/marker | border/default | Fondo marker State=default (gris) |
| tl/success/marker | status/success/fg | Fondo marker State=success (verde) |
| tl/error/marker | status/error/fg | Fondo marker State=error (rojo) |
| tl/warning/marker | status/warning/fg | Fondo marker State=warning (amber) |
| tl/info/marker | status/info/fg | Fondo marker State=info (azul) |
| tl/title/fontSize/sm | type/sm | Font size título Size=sm (13px) |
| tl/title/fontSize/md | type/md | Font size título Size=md (14px) |
| tl/title/fontWeight | type/weight-medium | Peso tipográfico título (500) |
| tl/description/fg | text/secondary | Color texto descripción |
| tl/timestamp/fg | text/subtlest | Color timestamp (gris claro) |
| tl/timestamp/fontSize | type/xs | Font size timestamp (10px) |
| tl/gap/sm | spacing/3 | Gap horizontal marker-content Size=sm (12px) |
| tl/gap/md | spacing/4 | Gap horizontal marker-content Size=md (16px) |

### Spacing specs

```
TimelineItem Size specs:
  sm:  markerSize 12px · connectorThickness 2px
       titleFontSize 14px · descriptionFontSize 12px
       gap horizontal 12px · verticalGap entre items 16px
  md:  markerSize 16px · connectorThickness 2px
       titleFontSize 16px · descriptionFontSize 13px
       gap horizontal 16px · verticalGap entre items 24px

State color map (marker background):
  default  → border/default (gris)
  success  → status/success/fg (verde)
  error    → status/error/fg (rojo)
  warning  → status/warning/fg (amber)
  info     → status/info/fg (azul)
  disabled → border/disabled (gris claro) + opacity 0.6

Connector:
  default/error/warning/info → border/default
  success → status/success/border
  thickness → 2px (border/2)
  hidden on IsLast=yes

Frame counts:
  TimelineItem: State(6) × MarkerType(3) × Size(2) × IsLast(2) = 72 gross
                −12 exclusiones (IsLast=yes + Show Connector)
                = 60 frames netos
  Timeline: Mode(4) × Size(2) = 8 frames
  Total: 68 frames netos
```
