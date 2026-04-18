# Badge

## Overview

Badge es un indicador visual compacto que comunica estado, conteo o presencia. No es interactivo por sí mismo — es un elemento decorativo que refuerza la información del elemento al que acompaña. El sistema unifica tres patrones en un solo componente: `count` para conteos numéricos de notificaciones, `dot` para indicadores de presencia sin cantidad, y `label` para etiquetas de estado semántico (Activo, Pendiente, Error). Los tres tipos comparten la misma forma base (pill con border-radius completo) y sistema de variantes de color semántico.

```
Type=count (notificación numérica):
  ╔══════════════════════════════════╗
  ║     ╭──╮                        ║
  ║     │ 9│   sm=16px h            ║
  ║     ╰──╯   md=20px h            ║
  ║     count text centrado         ║
  ║     radius=9999 (full pill)     ║
  ╚══════════════════════════════════╝

Type=dot (presencia):
  ╔══════════════════════════════════╗
  ║     ●   sm=8px Ø                ║
  ║         md=10px Ø               ║
  ║         color=error.fg (rojo)   ║
  ╚══════════════════════════════════╝

Type=label (estado):
  ╔══════════════════════════════════╗
  ║  ╭──────────────╮               ║
  ║  │  ● Activo    │  sm=16px h    ║
  ║  ╰──────────────╯  md=20px h    ║
  ║   texto + color semántico       ║
  ╚══════════════════════════════════╝
```

El badge nunca tiene role propio ni recibe foco de teclado. Su valor semántico (conteo, estado) se expone a través del `aria-label` del elemento padre al que acompaña.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Type:     count | dot | label
          count=número en pill circular
          dot=punto sólido sin texto (presencia)
          label=texto de estado en pill

Variant:  neutral | info | success | warning | error
          (solo aplica para Type=count y Type=label)
          dot siempre usa color error/presencia roja

Size:     sm | md
          sm: h=16px, font=11px, px=4px
          md: h=20px, font=12px, px=6px
```

Toggles (show/hide parts — do NOT generate extra variants):

```
(Sin toggles — el badge no tiene partes opcionales)
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  Badge                                      │
│  ─────────────────────────────────────────  │
│  Type       [count ▼] [dot] [label]         │
│  Variant    [neutral ▼] [info] [success]    │
│             [warning] [error]               │
│  Size       [sm ▼] [md]                     │
│  ─────────────────────────────────────────  │
│  ✏️ Count    [9]                             │
└─────────────────────────────────────────────┘

Nota: Type=dot no muestra Variant ni Size (dot siempre sm, siempre error-rojo)
```

---

## When to use (and when not to)

```
¿Qué necesitas comunicar?
         │
         ├── Número de notificaciones sin leer / conteo
         │         └──→ Type=count · Variant=error (alerta) o neutral
         │
         ├── Presencia de actividad sin cantidad ("hay algo nuevo")
         │         └──→ Type=dot
         │
         ├── Estado de una entidad (Activo, Pendiente, Error, Completado)
         │         └──→ Type=label · Variant semántico correspondiente
         │
         └── ¿Es un filtro activo / categoría removible?
                   └──→ NO es Badge → usar Chip o Tag con botón de cierre
```

**Use Badge when:**
- Un ícono de notificaciones (campana, mensajes) necesita mostrar cuántos items pendientes hay
- El estado de una entidad en una tabla, card o lista requiere representación visual compacta ("Pagado", "En proceso", "Cancelado")
- Un avatar necesita indicar presencia online/offline del usuario (dot)
- Un item de navegación (BottomNav, sidebar) tiene notificaciones sin leer

**Do NOT use Badge when:**
- El elemento al que se ancla no puede actualizar su `aria-label` con el count — el badge sería invisible para lectores de pantalla
- Se necesita que el usuario pueda cerrar / remover la etiqueta — usar Chip o Tag con dismiss
- El estado necesita una descripción más larga que 2-3 palabras — usar texto inline
- Se quiere decorar visualmente sin significado semántico — nunca usar colores de estado (success/error) decorativamente; corrompe el vocabulario semántico del sistema
- Se necesita un estado con progreso parcial (incomplete/partiallyComplete) — ese patrón requiere un ícono específico no incluido en Badge base

---

## Visual variations

**Por Type — Variant=success, Size=md:**

| Type | Visual | Dimensiones | Descripción |
|------|--------|-------------|-------------|
| count | `9` en pill verde | 20×20px min | Número en pill con color semántico. Se expande con 2+ dígitos |
| dot | `●` sólido rojo | 10px Ø | Sin texto. Siempre rojo (color error.fg). Indica presencia/actividad |
| label | `● Activo` en pill | 20px h × texto-width | Texto en pill. El punto izquierdo opcional refuerza el color |

**Por Variant — Type=label, Size=md:**

| Variant | Background | Texto | Uso semántico |
|---------|-----------|-------|---------------|
| neutral | `#E3E3E8` | `#121213` | Sin carga semántica — categorías, versiones, info neutral |
| info | `#EDF2FF` | `#2659EB` | Informativo, novedad, estado en progreso neutro |
| success | `#EDFCf2` | `#158C38` | Completado, activo, confirmado, pagado |
| warning | `#FFF7EB` | `#B87A0D` | Pendiente, en revisión, acción requerida baja urgencia |
| error | `#FFEFEF` | `#DB2626` | Error, cancelado, bloqueado, acción requerida urgente |

**Por Size — Type=count, Variant=error:**

| Size | Height | Min-width | Font | Padding H | Dot size |
|------|--------|-----------|------|-----------|----------|
| sm | 16px | 16px | 11px/500w | 4px | 8px |
| md | 20px | 20px | 12px/500w | 6px | 10px |

**Count overflow:** Cuando el número supera 99, el badge muestra "99+" por defecto. El threshold es configurable en implementación (maxCount).

---

## Design decisions

### Decisión 1: Type=count|dot|label en un solo componente Badge

**Por qué:** Atlassian separa Badge (count) de Lozenge (label) en dos componentes distintos. Fluent 2 usa tres componentes (Badge, CounterBadge, PresenceBadge). Para un sistema compacto, los tres tipos comparten exactamente la misma forma base (pill con border-radius completo) y el mismo sistema de color semántico. Un componente con `Type` variant es significativamente más manejable en Figma que tres componentes con overlapping visual. Si el sistema crece y los casos de uso divergen, la separación puede hacerse después.

**Tradeoff:** Un solo componente acumula props que solo aplican en algunos types (Count solo tiene sentido en Type=count, dot no tiene Variant ni Size). Se documenta explícitamente en las exclusiones y el panel de Figma.

### Decisión 2: Type=dot siempre con color error (rojo)

**Por qué:** Material Design 3, Ant Design, Fluent 2 PresenceBadge y 4/5 sistemas más usan el color rojo/error para el dot indicator porque semánticamente significa "hay algo que requiere tu atención". No tiene variantes de color porque la semántica del dot es única: presencia de actividad sin cantidad. Añadir variantes de color para dots diluiría esa semántica y crearía inconsistencia.

**Tradeoff:** No es posible tener un dot "neutral" o "verde" (ej. para indicar "online" sin urgencia). Si el caso de uso lo requiere, usar un dot personalizado fuera del Badge component con tokens específicos de presence.

### Decisión 3: Conteo expuesto vía parent aria-label (no role propio)

**Por qué:** El 19/23 sistemas del corpus no dan role propio al badge. La razón es correcta: un screen reader que lee "5" sin contexto no aporta nada. El valor útil es "Bandeja de entrada, 5 mensajes nuevos" — que es el aria-label del botón padre. El badge como elemento independiente no puede saber su propio contexto semántico.

**Tradeoff:** La responsabilidad de la accesibilidad recae completamente en el implementador. Si el botón padre no actualiza su `aria-label` con el count, el badge es invisible para usuarios de SR. Este tradeoff debe documentarse explícitamente en la API.

### Excluded combinations

```
Type=dot + Variant=info/success/warning/error/neutral
  → Dot siempre usa color error (presencia); las variantes no aplican

Type=dot + Size=md
  → Dot siempre es sm (8px); no tiene size md

Type=count + count="" (vacío)
  → Sin count text el badge pierde su función; usar Show Overflow=false para ocultar

Variant=error + uso decorativo (ej. categorías)
  → PROHIBIDO: colores semánticos (success/error) no deben usarse decorativamente
     Corrompe el vocabulario semántico del sistema en todos los contextos donde aparece
```

---

## Behavior

### Essential for design

Badge es un elemento de display pasivo. No tiene estados propios de hover/focus/pressed. Los comportamientos relevantes para el diseño:

1. **Expansión horizontal:** Type=count se expande horizontalmente cuando el número tiene más de 1 dígito. Min-width = height (circle para 1 dígito); se expande para "99+". Los valores `px=4px (sm)` y `px=6px (md)` garantizan padding consistente.
2. **Overflow a "99+":** Cuando count > 99 (configurable en implementación), el badge muestra "99+" en lugar del número exacto. El texto visible puede ser `aria-hidden="true"` mientras el SR recibe el número real a través del parent.
3. **Count=0:** Por defecto el badge NO se muestra cuando count=0 (`showZero=false`). Esta es la convención universal. `showZero=true` es opt-in para confirmar explícitamente que hay "0 sin leer".
4. **Posicionamiento overlay (runtime):** Cuando el badge se ancla a un ícono o avatar (notification pattern), se posiciona en la esquina superior derecha con offset negativo. Este posicionamiento es CSS runtime, no propiedad Figma.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Badge (display) | ninguno (`<span>`) | sin role, sin tabIndex | Es decorativo — no debe estar en el tab order ni tener ARIA role propio |
| Count text | ninguno | `aria-hidden="true"` opcional | El número "+5" puede ser `aria-hidden` si el parent button lo incluye en su label |
| Parent button con count | `button` | `aria-label="Bandeja de entrada, 5 nuevos"` | El count DEBE vivir en el aria-label del padre, no en el badge |
| Badge con cambio dinámico | ninguno | parent usa `aria-live="polite"` en una región separada | Si el count cambia en tiempo real, anunciar via live region — el badge NO debe tener role="status" |
| Type=dot decorativo | ninguno | `aria-hidden="true"` | Dot puramente visual sobre avatar; sin información semántica propia |

### Keyboard navigation

Primary interactions (affect design):

```
(Sin interacción de teclado propia)
El badge no recibe foco. Toda la interacción es responsabilidad del elemento padre.
```

Secondary interactions (dev reference):

```
Si el parent button tiene el badge:
  Tab         → El foco va al parent button, no al badge
  Enter/Space → Activa el parent button (ej. abre bandeja de entrada)
  
Si el badge es parte de un NavItem con notification:
  El accesible name del NavItem debe incluir el count:
  "Mensajes, 3 sin leer"  (no "Mensajes" + badge visible sin anuncio)
```

---

## Content guide

**Slot: count (text, Type=count)**
- Formato: número entero positivo. "0" solo si `showZero=true`
- Máximo visible: "99+" por defecto. Para enterprise con >999 items, configurar `maxCount=999`
- El texto del badge en Figma es el placeholder del diseñador. En runtime, es dinámico
- No incluir el "+" en el count — el componente lo añade automáticamente cuando count > maxCount

**Slot: label (text, Type=label)**
- Máximo 2-3 palabras para labels semánticos. Ejemplos: "Activo", "En progreso", "Cancelado", "Nuevo"
- Evitar redundancia: si el contexto ya deja claro el tipo de entidad, el label puede ser conciso ("Pagado" en lugar de "Pago completado")
- Capitalizar solo la primera palabra (sentence case), no Title Case
- En inglés: "Active", "In progress", "Done" — vocabulario de workflow conocido
- En español: "Activo", "En proceso", "Completado" — equivalentes directos

**Type=dot**
- Sin contenido de texto. El dot es puramente visual
- El aria-label del elemento padre debe comunicar la presencia: "Usuario online", "Actividad pendiente"
- No añadir texto al dot aunque el espacio lo permita — si se necesita texto, usar Type=label

---

## Pre-build checklist

```
ANATOMÍA
[ ] Type=count: pill circular, text centrado, min-width=height
[ ] Type=dot: círculo sólido sin texto, siempre color error.fg
[ ] Type=label: pill pill con texto, width proporcional al contenido
[ ] radius=9999 en todos los types (full pill)

COLORES (5 variantes para count + label)
[ ] neutral: bg=#E3E3E8 · fg=#121213 (surface/neutral + text/primary)
[ ] info:    bg=#EDF2FF · fg=#2659EB (status/info/bg + status/info/fg)
[ ] success: bg=#EDFC F2 · fg=#158C38 (status/success/bg + status/success/fg)
[ ] warning: bg=#FFF7EB · fg=#B87A0D (status/warning/bg + status/warning/fg)
[ ] error:   bg=#FFEFEF · fg=#DB2626 (status/error/bg + status/error/fg)
[ ] dot:     bg=#DB2626 (status/error/fg — sin variantes)

SIZES
[ ] sm: h=16px · minW=16px · px=4px · font=11px/500w · lh=14px · dotΩ=8px
[ ] md: h=20px · minW=20px · px=6px · font=12px/500w · lh=16px · dotΩ=10px

EXCLUSIONES
[ ] Type=dot no tiene Variant ni Size=md en el panel
[ ] Documentado: Type=count exige parent aria-label con count

FRAME COUNT
[ ] count×5×2 + label×5×2 + dot×1 = 21 frames netos
[ ] Grid: máx 7 columnas, gap=16, pad=24

TOKENS
[ ] bdg/neutral/bg → surface/neutral
[ ] bdg/neutral/fg → text/primary
[ ] bdg/info/bg → status/info/bg
[ ] bdg/info/fg → status/info/fg
[ ] bdg/success/bg → status/success/bg
[ ] bdg/success/fg → status/success/fg
[ ] bdg/warning/bg → status/warning/bg
[ ] bdg/warning/fg → status/warning/fg
[ ] bdg/error/bg → status/error/bg
[ ] bdg/error/fg → status/error/fg
[ ] bdg/dot/bg → status/error/fg
[ ] bdg/radius → radius/full
```

---

## Related components

```
Chip / Tag
  → Usar cuando el usuario puede remover la etiqueta (dismiss action)
  → Badge es siempre display-only, sin botón de cierre

AvatarGroup (overflow badge)
  → El "+N" del AvatarGroup usa internamente un Badge con Type=count
  → No crear un badge separado para el overflow; reusar Badge

BottomNavItem (badge prop)
  → El NavItem del BottomNav tiene un slot Badge para notificaciones
  → El badge se compone desde el Badge component; el NavItem gestiona la a11y

StatusLight / StatusDot (Spectrum pattern)
  → Para indicadores de estado con semántica de color más rica (available/busy/offline)
  → Si el producto tiene estados de presencia de usuario con múltiples valores,
     considerar un PresenceBadge dedicado (Fluent 2 pattern)

Alert / Banner
  → Para mensajes de sistema de mayor prominencia que requieren acción del usuario
  → Badge es para etiquetado inline; Alert/Banner es para mensajes que interrumpen
```

---

## Reference: how other systems do it

**Fluent 2 (Microsoft)** lidera el corpus con la separación de concerns más honesta: tres componentes distintos para tres semánticas distintas. `Badge` es para status labels inline. `CounterBadge` es para conteos numéricos anclados (notificaciones de Teams). `PresenceBadge` es para estados de presencia de usuarios (available/away/busy/doNotDisturb/offline) con íconos específicos del vocabulario visual de Teams. Esta arquitectura refleja que el equipo identificó que la palabra "badge" cubre tres necesidades fundamentalmente distintas y que ningún componente único podía servirlas bien sin comprometer todas. `CounterBadge` documenta explícitamente que el ícono padre debe llevar `aria-label` describiendo el count en contexto ("3 notificaciones sin leer"). `PresenceBadge` incluye texto accesible del estado.

**Atlassian** resuelve la ambigüedad "badge" con una separación arquitectural explícita: `Badge` para conteos numéricos y `Lozenge` para estados de texto. Esta división está motivada por los casos de Jira donde una card de proyecto necesita ambos simultáneamente — el número de issues (Badge) Y el estado del proyecto (Lozenge). El `max` prop configurable de Badge (no hardcodeado a 99) responde a la realidad de Jira Enterprise donde proyectos tienen 500+ issues y "99+" subestimaría dramáticamente la carga. Los `Lozenge appearances` usan nombres de workflow states: `inprogress`, `moved`, `removed`, `success` — mapear el vocabulario del producto directamente al componente elimina capas de traducción.

**Polaris (Shopify)** introduce el `progress` prop único en el corpus: renderiza un ícono de círculo parcialmente relleno (incomplete/partiallyComplete/complete) que comunica el estado de workflow sin texto adicional. Esencial para el flujo de fulfillment de Shopify donde los merchants necesitan escanear el estado de cientos de pedidos en segundos. Su sistema de `tone` (no `variant`) mapea directamente a estados comerciales: success=pagado, warning=pendiente, critical=cancelado — con la regla absoluta de que los tones semánticos no pueden usarse decorativamente. Esta disciplina previene la dilución del vocabulario visual en toda la plataforma de Shopify Admin.

**GOV.UK** formaliza la regla más importante del corpus para badges: el texto es siempre el portador primario de significado; el color es suplementario. Esta regla no es preferencia estética — es requisito legal de accesibilidad en servicios gubernamentales del Reino Unido. Los estados de servicios deben ser comprensibles sin ver el color, para usuarios daltónicos y en modo high-contrast. Su `Tag` siempre requiere texto visible, sin posibilidad de icon-only o color-only.

**Ant Design** ofrece el Badge más feature-complete del Tier 1 con el modelo child-wrapping anchor: `<Badge count={3}><IconButton /></Badge>` posiciona automáticamente el indicador en la esquina superior derecha del hijo, eliminando CSS positioning manual. El `showZero` prop confirma "0 sin leer" (evita confundir con loading). La debilidad crítica es accesibilidad: no hay ARIA roles automáticos y la responsabilidad de actualizar el aria-label del parent es completamente del implementador — el error más común en producción.

---

## Tokens

**12 tokens** · prefix `bdg-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `bdg/neutral/bg` | surface/neutral | Background del badge neutral |
| `bdg/neutral/fg` | text/primary | Texto del badge neutral |
| `bdg/info/bg` | status/info/bg | Background del badge info |
| `bdg/info/fg` | status/info/fg | Texto del badge info |
| `bdg/success/bg` | status/success/bg | Background del badge success |
| `bdg/success/fg` | status/success/fg | Texto del badge success |
| `bdg/warning/bg` | status/warning/bg | Background del badge warning |
| `bdg/warning/fg` | status/warning/fg | Texto del badge warning |
| `bdg/error/bg` | status/error/bg | Background del badge error |
| `bdg/error/fg` | status/error/fg | Texto del badge error |
| `bdg/dot/bg` | status/error/fg | Color del dot indicator (rojo) |
| `bdg/radius` | radius/full | Border-radius completo (9999px) |

### Spacing specs

```
Size=sm:
  height=16px · min-width=16px · padding-horizontal=4px
  font-size=11px · font-weight=500 · line-height=14px
  dot-size=8px · radius=9999

Size=md:
  height=20px · min-width=20px · padding-horizontal=6px
  font-size=12px · font-weight=500 · line-height=16px
  dot-size=10px · radius=9999

Count overflow (Type=count):
  ≤9:   min-width = height (cuadrado/círculo perfecto)
  ≥10:  min-width se expande (texto + padding horizontal)
  >99:  muestra "99+" (configurable maxCount en implementación)

Overlay positioning (runtime, no Figma):
  top: -(badge-height/2)
  right: -(badge-width/2)
  z-index: sobre el elemento anclado
```
