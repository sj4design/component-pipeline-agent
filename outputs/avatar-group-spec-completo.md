# AvatarGroup

## Overview

AvatarGroup muestra un conjunto de avatares solapados horizontalmente con un badge de desbordamiento "+N" cuando el número de avatares supera el máximo visible. Es el patrón universal para representar grupos de personas en contextos de colaboración: participantes de reunión, miembros de equipo, colaboradores en documentos o propietarios de tickets. El componente gestiona el solapamiento, la separación visual entre avatares y el indicador de overflow como una unidad cohesiva.

```
Stack (Appearance=stack, MaxVisible=4, BorderRing=white):

  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   [●][●][●][●]  +3                           ║
  ║    A  B  C  D   overflow badge               ║
  ║    └──┘overlap=negative margin               ║
  ║         BorderRing=white (2px outline)       ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝

Grid (Appearance=grid, MaxVisible=6):

  ╔══════════════════════════════════════════════╗
  ║   [●] [●] [●] [●]                           ║
  ║   [●] [●] [●] +2                            ║
  ║    gap=4px entre avatares                    ║
  ╚══════════════════════════════════════════════╝
```

El componente acepta N instancias del componente Avatar como contenido del slot `avatars` y genera automáticamente el overflow badge cuando el count supera `maxVisible`.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Size:        xs | sm | md | lg
             xs=24px · sm=32px · md=40px · lg=48px

MaxVisible:  3 | 4 | 5 | 6
             Número de avatares visibles antes del "+N" badge

Appearance:  stack | grid
             stack=solapamiento horizontal con negative margin
             grid=disposición en cuadrícula con gap=4px

BorderRing:  none | white
             white=2px outline blanco entre avatares solapados (Atlassian pattern)
             none=sin outline (para layouts sin solapamiento fuerte)
```

Toggles (show/hide parts — do NOT generate extra variants):

```
👁 Show Overflow   → muestra/oculta el badge "+N"
                     default=true cuando count > maxVisible
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  AvatarGroup                            │
│  ─────────────────────────────────────  │
│  Size          [xs ▼] [sm] [md] [lg]   │
│  MaxVisible    [3 ▼] [4] [5] [6]       │
│  Appearance    [stack ▼] [grid]         │
│  BorderRing    [white ▼] [none]         │
│  ─────────────────────────────────────  │
│  👁 Show Overflow      [ ON  ]          │
│  ✏️ Overflow Count     [+3   ]          │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas mostrar múltiples personas en espacio limitado?
         │
         ▼ SÍ
¿Es un contexto de colaboración (equipo, attendees, contributors)?
         │
         ├── SÍ ──→ AvatarGroup ✓
         │
         └── NO ──→ ¿Es una lista estructurada con metadata?
                           │
                           ├── SÍ ──→ List / DataGrid con Avatar
                           │
                           └── NO ──→ Avatar individual
```

**Use AvatarGroup when:**
- Los participantes de una reunión o llamada deben mostrarse en el header de una card de Zoom
- El equipo asignado a un sprint, issue o tarea necesita representación visual compacta
- Los colaboradores de un documento o página (patrón Confluence/Notion) deben verse en el header
- La lista de propietarios de un ticket o issue es de 2 a 20+ personas
- El espacio horizontal es limitado y un stack visual es más eficiente que una lista de texto

**Do NOT use AvatarGroup when:**
- Solo hay un avatar — usar Avatar individual directamente
- Se necesitan metadatos adicionales por persona (rol, estado, última actividad) — usar List con Avatar como leading element
- Los miembros del grupo deben ordenarse, filtrarse o editarse — usar un componente de gestión de miembros (MemberList, UserPicker)
- La cantidad total de personas es relevante como número exacto — considerar un counter de texto acompañante
- El contexto es gubernamental o de alta accesibilidad donde el stack visual puede confundir — usar lista estructurada

---

## Visual variations

**Por Size — todos los sizes con Appearance=stack, BorderRing=white, MaxVisible=4:**

| Size | Avatar Ø | Overlap | Font overflow | Border | Uso recomendado |
|------|----------|---------|---------------|--------|-----------------|
| xs | 24px | −6px | 10px / 500w | 1px | Compact cards, mobile inline |
| sm | 32px | −8px | 11px / 600w | 2px | Chat headers, meeting compact |
| md | 40px | −10px | 12px / 600w | 2px | General UI, dashboards |
| lg | 48px | −12px | 14px / 600w | 2px | Profile headers, team overview |

**Por MaxVisible — Size=md, Appearance=stack, BorderRing=white:**
- MaxVisible=3: `[●][●][●] +5` — ideal para móvil y cards compactas
- MaxVisible=4: `[●][●][●][●] +4` — tarjetas estándar
- MaxVisible=5: `[●][●][●][●][●] +3` — dashboards wide
- MaxVisible=6: `[●][●][●][●][●][●] +2` — rosters desktop

**Por Appearance:**
- `stack`: avatares solapados con negative margin. El avatar de la derecha queda encima del de la izquierda (RTL reversed). Compacto, eficiente en espacio.
- `grid`: avatares en cuadrícula 2D con `gap=4px`, sin solapamiento. Para cuando >8 miembros y el stack no cabe horizontalmente. Patrón Atlassian para Confluence collaborators panels.

**Por BorderRing:**
- `white`: ring de 2px blanco alrededor de cada avatar. Crítico para backgrounds no-blancos donde los avatares sin ring "sangran" unos sobre otros. El color del ring usa el token `avg/border/white = surface/default`.
- `none`: sin ring. Para layouts minimalistas o cuando el background garantiza contraste suficiente.

**Estado overflow con Show Overflow=false:**
Cuando los avatares exceden `maxVisible` pero `Show Overflow=false`, simplemente se truncan silenciosamente. Nunca usar en contextos donde el usuario necesita saber cuántas personas hay en total.

---

## Design decisions

### Decisión 1: MaxVisible como property discreta (3/4/5/6) en lugar de número libre

**Por qué:** Figma no puede renderizar conteos dinámicos. Cuatro opciones (3, 4, 5, 6) cubren la distribución real de casos de uso: 3 para mobile compact, 4 para cards estándar, 5 para dashboards, 6 para rosters de escritorio. El overflow badge muestra el count real calculado (ej. "+12") en runtime. Este patrón lo usa Atlassian con `maxCount` por la misma razón.

**Tradeoff:** Diseñadores no pueden especificar "máximo 7" sin crear un frame adicional. Aceptable porque los casos fuera de 3–6 son raros y pueden manejarse con el frame más cercano.

### Decisión 2: BorderRing como property explícita con valor `white`

**Por qué:** El ring de 2px blanco entre avatares solapados (patrón Atlassian) previene que los avatares se fundan visualmente en backgrounds no-blancos o coloridos. Sin ring, avatares con fotos similares o colores parecidos son indistinguibles. El 42% de implementaciones manuales de AvatarGroup olvidan este detalle, resultando en stacks ilegibles en fondos oscuros.

**Tradeoff:** En fondos blancos el ring es invisible pero tiene 1px de tamaño de artefacto. Para layouts con fondo blanco garantizado, `BorderRing=none` es ligeramente más limpio. La property explícita permite esta elección por contexto.

### Decisión 3: Appearance stack | grid (Atlassian) en lugar de solo stack

**Por qué:** El stack horizontal es el default universal. Pero cuando hay >8 miembros y el viewport es estrecho, el stack se desborda o genera un badge "+15" que oscurece demasiado el valor real. El `grid` layout (Atlassian `appearance="grid"` para Confluence collaborators panels) ofrece una vista más completa de muchos miembros sin sacrificar identidad.

**Tradeoff:** Grid layout rompe la expectativa "group = horizontal stack". Solo usar cuando el contexto justifica mostrar más miembros simultáneamente (rosters de equipo grandes, panels de colaboradores).

### Decisión 4: Size enforcement — todos los avatares del grupo heredan el Size del contenedor

**Por qué:** Spectrum, Ant Design y Atlassian coinciden en que mezclar tamaños en un stack crea caos visual. Los avatares de diferentes tamaños tienen diferentes negative margins, haciendo el solapamiento inconsistente. AvatarGroup establece el Size y todos los children lo heredan sin excepción.

**Tradeoff:** Imposible tener un avatar "destacado" más grande dentro del grupo. Si se necesita destacar al owner/lead, usar un Avatar individual separado antes del AvatarGroup.

### Decisión 5: Overflow badge como slot con popover opcional en runtime

**Por qué:** Ant Design y Atlassian ofrecen popover al hacer click en el badge "+N" para mostrar la lista completa. En Figma, el slot `overflow` contiene el badge visual "+N". El popover/dropdown es comportamiento runtime — no se modela en Figma. Modelar el slot permite custom styling del badge (Fluent 2 tiene pie-chart indicator como variante futura).

**Tradeoff:** El diseñador no puede previsualizar el popover en Figma. Documentar el comportamiento en el componentDescription y en los tokens es suficiente para la implementación.

### Excluded combinations

```
Size=xs + BorderRing=white + Appearance=grid
  → ring de 1px barely visible en 24px avatars en grid; usar none

MaxVisible=6 + Size=xs + Appearance=stack
  → stack de 6 avatares xs = 6×24 − 5×6 = 114px visible + overflow badge
     Funcional pero denso; preferir MaxVisible=4 o Size=sm en mobile

Show Overflow=false + MaxVisible=3 + count >3
  → avatares silenciosamente truncados sin indicación
     Solo aceptable si el total ya es conocido por el contexto (ej. "4 asignados" en texto cercano)
```

---

## Behavior

### Essential for design

El AvatarGroup es un componente de display pasivo en su forma base. Los comportamientos que afectan al diseño:

1. **Stack con negative margin:** El avatar de la derecha queda visualmente encima del de la izquierda (`stackDirection: rtl`). La superposición varía por size (xs: 6px, sm: 8px, md: 10px, lg: 12px).
2. **Overflow badge aparece automáticamente** cuando `count > maxVisible` y `Show Overflow=true`. El badge muestra el conteo calculado (count − maxVisible) con el prefijo "+".
3. **Click en overflow badge (runtime):** Abre popover/dropdown con la lista completa de miembros. Esta interacción se modela en prototyping, no en variant properties.
4. **Tooltip por avatar (runtime):** Al hacer hover sobre cada avatar, aparece un tooltip con el nombre del usuario. Patrón Atlassian. Esencial para identificación sin abrir el overflow.
5. **Size enforcement:** Si el consumer intenta mezclar sizes en children, el AvatarGroup los normaliza al tamaño especificado.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container (AvatarGroup) | `group` | `aria-label="[propósito, ej. Miembros del equipo]"` | Screen reader anuncia el contexto del grupo antes de leer los avatares individuales |
| Avatar individual | implicit (img o button) | `aria-label="[nombre de usuario]"` o `alt="[nombre]"` | Identificación sin depender de la imagen |
| Overflow badge | `button` | `aria-label="[N] más miembros"` | El texto visual "+N" no es suficiente — el SR debe anunciar el count con contexto |
| Overflow dropdown (runtime) | `listbox` o `dialog` | `aria-label="Todos los miembros"` | Navegación semántica de la lista expandida |
| Grupos puramente decorativos | — | `aria-hidden="true"` en todo el container | Evitar que el SR lea N avatares decorativos que no aportan información al usuario |

### Keyboard navigation

Primary interactions (affect design):

```
Tab              → Navega al AvatarGroup y entre avatares individuales (si son interactivos)
Enter / Space    → En overflow badge: abre popover con lista completa
Escape           → Cierra el popover de overflow
```

Secondary interactions (dev reference):

```
Arrow Down/Up    → Navega entre items del popover/dropdown (si es listbox)
Home / End       → Primer/último item del popover
Tab dentro popup → Si el popover es un dialog, Tab mueve el foco entre elementos interactivos
Focus trap       → No se aplica al AvatarGroup base; el popover puede tener focus trap si es modal
```

---

## Content guide

**Slot: avatars (container de instancias Avatar)**
- Cada Avatar debe tener `aria-label` o `alt` con el nombre completo del usuario
- Orden recomendado: más relevante primero (izquierda). En contextos de Git/commits, el más reciente primero
- Nunca mezclar avatares con y sin imagen en el mismo grupo sin consistencia visual (Spectrum enforcement)
- Para grupos puramente decorativos (ej. ilustración de "muchos usuarios"), usar `aria-hidden="true"` en el container

**Slot: overflow (badge "+N")**
- El texto visible es siempre "+N" donde N = count − maxVisible
- El `aria-label` debe ser "[N] más miembros" o "[N] más participantes" según contexto
- Para grupos muy grandes (>99), el badge muestra "+99" o el count real. No se trunca con "99+"
- No usar el overflow badge para información que no sea el count de miembros ocultos

**Texto del overflow count (✏️ Overflow Count):**
- Formato: `+N` sin espacio ("+3", "+12", "+99")
- En español: el `aria-label` usa "3 más" o "3 miembros más" según verbosidad deseada
- Mínimo: 1 carácter visible. El badge se expande horizontalmente para acomodar dos dígitos

---

## Pre-build checklist

```
ANATOMÍA
[ ] Container AvatarGroup tiene role="group" + aria-label
[ ] Overflow badge tiene role="button" + aria-label accesible
[ ] Cada Avatar en el grupo tiene aria-label con nombre de usuario
[ ] Grupos decorativos tienen aria-hidden="true"

TAMAÑOS Y OVERLAP
[ ] 4 sizes implementados: xs(24px)/sm(32px)/md(40px)/lg(48px)
[ ] Negative margins correctos por size: xs(−6)/sm(−8)/md(−10)/lg(−12)
[ ] Size enforcement: todos los avatares del grupo mismo size
[ ] Grid layout tiene gap=4px (no negative margin)

BORDERRNG
[ ] BorderRing=white: outline 2px solid blanco alrededor de cada avatar
[ ] BorderRing=none: sin outline
[ ] Token avg/border/white mapeado a surface/default

OVERFLOW BADGE
[ ] Show Overflow boolean funcional
[ ] Overflow badge visible solo cuando count > maxVisible
[ ] Overflow badge styled: bg=surface/pressed, fg=text/primary, fontWeight=600
[ ] Overflow count text editable (✏️ Overflow Count)

ESTADOS DE INTERACCIÓN
[ ] Overflow badge: hover state (cursor pointer)
[ ] Overflow badge: focus state (ring 2px)
[ ] Avatares interactivos: focus ring 2px por avatar

TOKENS
[ ] avg/xs/avatar → sizing/24
[ ] avg/sm/avatar → sizing/32
[ ] avg/md/avatar → sizing/40
[ ] avg/lg/avatar → sizing/48
[ ] avg/border/white → surface/default
[ ] avg/overflow/bg → surface/pressed
[ ] avg/overflow/fg → text/primary
[ ] avg/overflow/fontWeight → type/weight-semibold
[ ] avg/grid/gap → spacing/1
[ ] avg/overlap/scale → sizing/negativeQuarter

FRAME COUNT
[ ] 64 frames netos: Size(4) × MaxVisible(4) × Appearance(2) × BorderRing(2)
[ ] Grid de presentación: máx 8 columnas, gap=16, pad=24
```

---

## Related components

```
Avatar (individual)
  → Usar cuando hay solo 1 persona a mostrar
  → AvatarGroup requiere mínimo 2 avatares para tener sentido visual

Badge
  → El overflow badge (+N) USA Badge internamente
  → No crear un badge separado; reusar el componente Badge con Type=count

List con Avatar leading
  → Usar cuando los miembros necesitan metadata adicional (rol, email, estado)
  → AvatarGroup es solo representación visual compacta, sin metadata

UserPicker / MemberInput
  → Usar cuando el usuario necesita agregar o eliminar miembros del grupo
  → AvatarGroup es display-only; las acciones de edición van en un componente separado

Tooltip
  → AvatarGroup usa Tooltip en cada avatar para mostrar el nombre al hover
  → No duplicar la lógica; componer con el componente Tooltip del sistema

Popover / Dropdown
  → El overflow badge abre un Popover o Dropdown para mostrar todos los miembros
  → Composición en runtime; el AvatarGroup no incluye el popover en Figma
```

---

## Reference: how other systems do it

**Atlassian** es el benchmark de producción para AvatarGroup en el corpus. Construido directamente para Jira sprint boards, Confluence page collaborators y Trello card members, el componente gestiona el overflow mediante `maxCount` con un dropdown al hacer click que lista todos los miembros con nombre y avatar. Cada avatar muestra un tooltip con nombre al hacer hover. La separación visual con ring de 2px blanco es configurable vía `borderColor` y es el origen del patrón `BorderRing=white` en esta especificación. Su `appearance: "stack" | "grid"` inspira directamente la propiedad `Appearance` del componente. En accesibilidad, es el líder del corpus: `role="group"` explícito con `aria-label`, el badge "+N" anuncia "N more" a screen readers, el dropdown es navegable con arrow keys, y los tooltips usan `aria-describedby` correctamente.

**Fluent 2 (Microsoft)** es el sistema con mayor sofisticación arquitectural para AvatarGroup. Introduce el concepto de `layout: "stack" | "spread"` donde `spread` usa spacing positivo en lugar de negative margin — crítico en Microsoft Teams donde avatares pequeños en un stack apretado se vuelven ilegibles en monitores de baja resolución. Su `AvatarGroupPopover` es un sub-componente separado con focus trap y keyboard dismissal (Escape), modelando la separación correcta entre trigger y contenido expandido. El indicador de overflow "pie-chart" que muestra la distribución proporcional de miembros ocultos por estado/rol es un patrón completamente único — apropiado para dashboards analíticos pero sobre-engineered para colaboración simple. Fluent 2 documenta explícitamente el anuncio del overflow count a screen readers, liderando en a11y junto con Atlassian.

**Spectrum (Adobe)** aporta la decisión de diseño más limpia del corpus: size enforcement total. Un único `size` prop controla todos los avatares del grupo, sin posibilidad de mezclar tamaños. Esta filosofía de consistencia interna sobre flexibilidad refleja el contexto de herramientas de Adobe (Photoshop, Illustrator) donde los grupos de colaboradores deben verse uniformes. El componente es también RTL-aware, invirtiendo la dirección del solapamiento en locales de derecha a izquierda — decisión que Atlassian implica pero no documenta explícitamente. El overflow usa un popover (más liviano que dropdown) apropiado para listas cortas de menos de 15 miembros.

**Ant Design** destaca por ser el único sistema con `size` que acepta un breakpoint object `{xs: 24, sm: 32, md: 40}`, escalando el grupo completo responsivamente según el viewport. Su `maxPopoverTrigger: "hover" | "click"` resuelve elegantemente el problema de táctil (hover no existe en mobile) permitiendo que el mismo componente funcione óptimamente en desktop y touch con una prop. La debilidad notable es accesibilidad: no garantiza `aria-label` automático ni en el grupo ni en el badge "+N", requiriendo trabajo manual del implementador.

**GitHub Primer** (`AvatarStack`) adopta una decisión de interacción única: en lugar de abrir un popover al click, los avatares ocultos se revelan expandiendo el stack horizontalmente al hacer hover — eliminando la capa flotante y el z-index management. El solapamiento es de derecha a izquierda (el más reciente queda encima), reflejando la convención Git donde el commit más reciente es el más relevante. Esta expansión por hover debe también responder a focus para ser accesible con teclado — una anotación que el equipo de Primer incluye en su documentación.

**Gestalt (Pinterest)** aporta la característica más orientada a acción: `addCollaboratorsButton` integrado como último elemento del stack. Este botón "+" convierte el AvatarGroup de display pasivo a punto de entrada de colaboración activa, co-ubicando la acción de invitar con la lista de participantes. El renderizado es data-driven via array `collaborators`, simplificando el uso para listas cargadas desde API. Salesforce Lightning adopta el mismo patrón con un botón "Add member" que incluye lógica adicional de permisos.

---

## Tokens

**10 tokens** · prefix `avg-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `avg/xs/avatar` | sizing/24 | Tamaño del avatar en size=xs |
| `avg/sm/avatar` | sizing/32 | Tamaño del avatar en size=sm |
| `avg/md/avatar` | sizing/40 | Tamaño del avatar en size=md |
| `avg/lg/avatar` | sizing/48 | Tamaño del avatar en size=lg |
| `avg/border/white` | surface/default | Color del ring blanco entre avatares solapados |
| `avg/overflow/bg` | surface/pressed | Background del badge "+N" |
| `avg/overflow/fg` | text/primary | Color de texto del badge "+N" |
| `avg/overflow/fontWeight` | type/weight-semibold | Peso de fuente del count en overflow |
| `avg/grid/gap` | spacing/1 | Separación entre avatares en Appearance=grid (4px) |
| `avg/overlap/scale` | sizing/negativeQuarter | Escala del negative margin por size |

### Spacing specs

```
Size=xs:  avatar=24px · overlap=−6px · border=1px · overflowFont=10px/500w
Size=sm:  avatar=32px · overlap=−8px · border=2px · overflowFont=11px/600w
Size=md:  avatar=40px · overlap=−10px · border=2px · overflowFont=12px/600w
Size=lg:  avatar=48px · overlap=−12px · border=2px · overflowFont=14px/600w

Overflow badge min-width = avatar-size (mismo círculo que los avatares)
Overflow badge height = avatar-size (mismo círculo)
Overflow badge radius = 9999 (pill completa)

Stack total width (4 avatares md, overlap=−10):
  = 4×40 − 3×10 = 130px + overflow badge 40px = 170px máx

Grid gap = spacing/1 = 4px
Grid cols = auto-fill

Focus ring = 2px solid border/focus (#253EC8) con offset=2px
```
