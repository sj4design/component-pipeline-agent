# Timeline — Especificación Completa

## Descripción general

Lista cronológica de eventos con markers, conectores verticales y contenido estructurado. Cada item tiene estado semántico (success, error, warning, info) representado en el color del marker y el conector. Compuesto por `TimelineItem` (evento individual) y `Timeline` (contenedor con mode de layout). Usado para activity feeds, audit logs, process tracking y scheduling visualizations.

### Wireframe estructural

**TimelineItem (MarkerType=dot, State=success):**
```
  ●  ← marker (success = verde)
  │
  │  hace 2 horas
  │  Evento completado
  │  Descripción del evento
  │
  ●  ← siguiente item
```

**TimelineItem (MarkerType=icon, State=error):**
```
  ⚠  ← icon marker (error = rojo)
  │
  │  2026-04-17 10:30
  │  Deploy fallido
  │  La imagen no pudo ser construida
  │  por: [avatar] nombre.apellido
```

**Timeline (Mode=default con 3 items):**
```
  ●  Solicitud creada                 hace 3 días
  │  La solicitud #1234 fue creada
  │
  ✓  Revisión completada             hace 1 día
  │  Aprobado por el equipo de diseño
  │
  ★  (sin conector)                  Ahora
     Publicado en producción
  ↑ IsLast=yes — sin trailing connector
```

**Timeline (Mode=alternating):**
```
  ●  Evento impar         │
  │                       │  Evento par  ●
  ●  Evento impar         │
  │                       │  Evento par  ●
  ★  Último               │
```

**Anatomía de slots — TimelineItem:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `marker` | icon-or-shape | Sí | Dot, icon, avatar |
| `connectorLine` | shape | No | Línea vertical que conecta markers |
| `timestamp` | text | No | "hace 2 horas", "2026-04-17 10:30" |
| `title` | text | Sí | Título del evento |
| `description` | text | No | Detalle del evento |
| `actor` | container | No | Avatar + nombre del actor |
| `content` | container | No | Contenido expandido (attachments, comments) |

**Anatomía de slots — Timeline:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `items` | container | Sí | N TimelineItems |

### Properties y valores

**TimelineItem:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `success` · `error` · `warning` · `info` · `disabled` |
| **MarkerType** | `dot` · `icon` · `avatar` |
| **Size** | `sm` · `md` |
| **IsLast** | `no` · `yes` |

**Timeline:**
| Property | Valores |
|----------|---------|
| **Mode** | `default` · `alternating` · `left` · `right` |
| **Size** | `sm` · `md` |

**Frame counts:**
- TimelineItem: State(6) × MarkerType(3) × Size(2) × IsLast(2) = 72 − 12 exclusiones = **60 frames**
- Timeline: Mode(4) × Size(2) = **8 frames**
- **Total: 68 frames**

**Exclusión TimelineItem:**
| Combinación excluida | Razón |
|----------------------|-------|
| `IsLast=yes + connectorLine visible` | El último item no tiene conector descendente |

### Panel de Figma

**TimelineItem:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / success / error / warning / info / disabled |
| MarkerType | Variant | dot / icon / avatar |
| Size | Variant | sm / md |
| IsLast | Variant | no / yes |
| 👁 Has Timestamp | Boolean | true/false |
| 👁 Has Description | Boolean | true/false |
| 👁 Has Actor | Boolean | true/false |
| 👁 Has Content | Boolean | true/false |
| 👁 Show Connector | Boolean | true/false |
| ✏️ Title | Text | `Evento` |
| ✏️ Description | Text | `Descripción del evento` |
| ✏️ Timestamp | Text | `hace 2 horas` |
| 🔄 Marker | Instance swap | `marker/dot` |

**Timeline:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Mode | Variant | default / alternating / left / right |
| Size | Variant | sm / md |

---

## Cuándo usar

**Usar Timeline cuando:**
- Se necesita representar una secuencia de eventos en orden cronológico
- El usuario debe entender el progreso o historial de un proceso
- Cada evento tiene metadatos relevantes (quién, cuándo, qué)

**MarkerType=dot:** Activity feeds simples, changelog de versiones
**MarkerType=icon:** Eventos con tipo semántico (bug-fix, feature, deploy, meeting)
**MarkerType=avatar:** Audit logs donde "quién" es relevante (Jira issue history, pull request timeline)

**Mode=default:** Activity feeds, audit logs — estándar
**Mode=alternating:** Presentaciones visuales, timelines de historia, marketing
**Mode=left / right:** Layouts especiales donde el contenido debe alinearse a un lado

**No usar Timeline cuando:**
- Los pasos tienen acciones/decisiones → usar Stepper (más estructurado)
- Los eventos son horizontales → usar Steps component en horizontal
- Solo hay 2-3 items sin contexto temporal → usar List simple

---

## Variaciones visuales

### TimelineItem — Colores de estado

| Estado | Marker bg | Conector | Uso típico |
|--------|-----------|---------|------------|
| `default` | `border/default` (gris) | `border/default` | Evento neutro, pendiente |
| `success` | `status/success/fg` (verde) | `status/success/border` | Completado, aprobado |
| `error` | `status/error/fg` (rojo) | `border/default` | Fallido, rechazado |
| `warning` | `status/warning/fg` (amber) | `border/default` | Advertencia, necesita atención |
| `info` | `status/info/fg` (azul) | `border/default` | Informativo, notificación |
| `disabled` | `border/default` | `border/default` | Futuro, inactivo, opacity 60% |

**Nota:** Solo el success state propaga el color semántico al conector (trace visual del flujo completado). El resto usan conector gris neutro.

### MarkerType — Tamaños

| MarkerType | sm | md |
|-----------|----|----|
| `dot` | 12px | 16px |
| `icon` | 16×16px | 20×20px |
| `avatar` | 24×24px | 32×32px |

### TimelineItem — Espaciado

| Propiedad | sm | md |
|-----------|----|----|
| Marker size (dot) | 12px | 16px |
| Conector grosor | 2px | 2px |
| Font title | 14px | 16px |
| Font description | 12px | 13px |
| Font timestamp | 12px · `type/xs` | 13px · `type/xs` |
| Gap horizontal | 12px | 16px |
| Gap vertical entre items | 16px | 24px |

### Timeline — Modes

**default:** Markers y conectores a la izquierda, contenido (timestamp + title + description) a la derecha. Estándar para activity feeds.

**alternating:** Items impares a la izquierda, items pares a la derecha, conector vertical al centro. Efectivo para timelines de historia o presentaciones.

**left:** Todo el contenido a la izquierda del conector.

**right:** Todo el contenido a la derecha del conector (equivalente al default pero con el conector más a la derecha visualmente).

### IsLast=yes

Cuando un TimelineItem es el último de la lista, el `connectorLine` se oculta (slot invisible). Esto evita que el conector "cuelgue" hacia abajo sin otro marker a continuación. Modelar en Figma como `👁 Show Connector = false` en IsLast=yes.

---

## Decisiones de diseño

### 1. 3 MarkerTypes para cubrir los tres contextos principales

- **dot:** Mínimo, para cuando el evento importa pero no el tipo visual
- **icon:** Para tipar eventos (feature ★, bug ⚠, deploy 🚀, meeting 📅)
- **avatar:** Para audit logs donde "quién lo hizo" es tan importante como "qué"

Estos tres tipos cubren el 95% de los casos de uso sin necesitar un cuarto.

### 2. 6 estados con color en marker

Los estados semánticos (success/error/warning/info) en el marker permiten escanear visualmente el resultado de una secuencia de eventos: verde = todo bien, rojo = algo falló. Solo success propaga el color al conector para crear un trace visual del flujo completado sin saturar de color.

### 3. IsLast como property en TimelineItem (no en Timeline)

La lógica de si un item es el último debe estar en el item porque en implementación la lista puede ser dinámica (lazy load). Modelarlo en el item permite controlar el trailing connector sin conocer el total de items desde el contenedor.

### 4. `<time datetime="[ISO]">` semántico

Los timestamps deben usar el elemento HTML `<time>` con el atributo `datetime` en formato ISO (ej. `2026-04-17T10:30:00Z`). Permite a screen readers leer la fecha completa independientemente del formato de display ("hace 2 horas"), y facilita i18n y machine parsing.

### 5. Estado comunicado en texto, no solo en color (WCAG 1.4.1)

El color del marker no puede ser el único indicador del estado del evento. El title o description debe incluir el estado: "Deploy fallido", "Solicitud aprobada". El `aria-hidden="true"` en el marker (decorativo) obliga a que la información semántica esté en el texto.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Timeline container | `role="list"` + `aria-label="Timeline"` (o descriptivo) |
| TimelineItem | `role="listitem"` |
| Timestamp | `<time datetime="[ISO-8601]">` |
| Marker (dot/icon) | `aria-hidden="true"` (decorativo) |
| Actor | `aria-label="por [nombre]"` |
| Items interactivos | `tabindex="0"` + ring de focus |
| Items display-only | Sin tabindex (no focuseables) |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` | Navega entre items interactivos (si el timeline es interactive) |
| `Enter` / `Space` | Expande detalle del item (si hay slot `content` expandible) |
| Arrow keys | Opcional para timelines grandes con muchos items |

Los timelines de solo display (audit log read-only) no requieren navegación por teclado más allá del scroll. Solo los items con acciones (expand, link, botón de detalle) necesitan ser focuseables.

### Estado comunicado en contenido

El color del marker es decorativo y `aria-hidden`. El estado del evento debe ser legible en el `title` o `description`:
- ✓ "Deploy completado en producción"
- ✗ Solo color verde sin texto de estado

---

## Guía de contenido

**Timestamps:**
- Usar formato relativo para eventos recientes: "hace 2 horas", "ayer", "la semana pasada"
- Usar fecha absoluta para eventos históricos: "17 abr 2026, 10:30"
- Siempre incluir el `datetime` ISO en el atributo `<time>` independientemente del display

**Títulos:**
- Cortos y descriptivos: "Deploy iniciado", "Solicitud aprobada", "Usuario creado"
- En audit logs incluir el objeto: "Proyecto 'Rediseño 2026' archivado"
- Verbos en pasado para eventos completados

**Descriptions:**
- Opcionales — solo si añaden contexto que el título no cubre
- Máximo 2 líneas en sm, 3 en md
- Para detalles extensos usar el slot `content` expandible

**Actor:**
- Mostrar avatar + nombre: "@pedro.quinones"
- En audit logs incluir la acción: "por Pedro Quinones" o "revisado por"

**Marker icons:**
- Usar iconos universalmente reconocibles para estados
- No depender del color para distinguir el tipo de evento (WCAG 1.4.1)

---

## Pre-build checklist

- [ ] IsLast=yes: verificar que `👁 Show Connector` está en false en todos los frames de IsLast=yes
- [ ] Los 12 frames excluidos (IsLast=yes con connector) no existen en el set
- [ ] 6 estados de color distintos en el marker — verificar que warning y error son diferenciables sin depender de saturación
- [ ] MarkerType=avatar: el avatar se integra limpiamente en el tamaño de marker (24/32px)
- [ ] Timeline Mode=alternating: los items se distribuyen alternadamente izquierda/derecha correctamente
- [ ] El conector tiene grosor 2px y parte del centro del marker (no del borde)
- [ ] `<time>` semántico documentado en handoff — implementación debe usar el elemento HTML correcto

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Steps / Stepper** | Alternativa para procesos estructurados con acciones en cada paso |
| **Avatar** | MarkerType=avatar reutiliza el componente Avatar |
| **Badge** | Los estados de evento pueden complementarse con Badge |
| **List** | Timeline es una List especializada con connectors y metadata |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | MarkerTypes | States | Alternating | datetime |
|---------|------------|--------|-------------|---------|
| **Ant Design** | dot/icon/custom | Sí | Sí | No native |
| **Atlassian** | dot/icon | Parcial | No | No |
| **MUI** | dot/icon/custom | Sí | Sí | No native |
| **Carbon (IBM)** | dot | Mínimo | No | No |
| **Polaris (Shopify)** | No nativo | — | — | — |
| **Spectrum (Adobe)** | No nativo | — | — | — |

**Consenso:** Ant y MUI son los más completos. Los dos incluyen alternating mode. Ninguno documenta `<time>` semántico explícitamente — oportunidad de liderazgo en accesibilidad.

---

## Tokens y espaciado

**Prefijo:** `tl-` · **Total tokens:** 18 · **Modo:** Components

### Tokens de marker

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tl/marker/sm` | `sizing/xs` (12px) | Marker dot sm |
| `tl/marker/md` | `sizing/sm` (16px) | Marker dot md |
| `tl/default/marker` | `border/default` | Marker color default |
| `tl/success/marker` | `status/success/fg` | Marker color success |
| `tl/error/marker` | `status/error/fg` | Marker color error |
| `tl/warning/marker` | `status/warning/fg` | Marker color warning |
| `tl/info/marker` | `status/info/fg` | Marker color info |

### Tokens de conector

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tl/connector/color` | `border/default` | Conector default |
| `tl/connector/success` | `status/success/border` | Conector success |
| `tl/connector/thickness` | `border/2` (2px) | Grosor del conector |

### Tokens de tipografía

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tl/title/fontSize/sm` | `type/sm` (13px) | Título sm |
| `tl/title/fontSize/md` | `type/md` (14px) | Título md |
| `tl/title/fontWeight` | `type/weight-medium` | Peso del título |
| `tl/description/fg` | `text/secondary` | Color descripción |
| `tl/timestamp/fg` | `text/subtlest` | Color timestamp |
| `tl/timestamp/fontSize` | `type/xs` | Tamaño timestamp |

### Tokens de espaciado

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tl/gap/sm` | `spacing/3` (12px) | Gap horizontal sm |
| `tl/gap/md` | `spacing/4` (16px) | Gap horizontal md |

### Espaciado completo

| Propiedad | sm | md |
|-----------|----|----|
| Marker dot | 12px | 16px |
| Conector grosor | 2px | 2px |
| Gap marker → contenido | 12px | 16px |
| Gap vertical entre items | 16px | 24px |
| Font title | 14px | 16px |
| Font description | 12px | 13px |
| Font timestamp | 12px | 12px |
