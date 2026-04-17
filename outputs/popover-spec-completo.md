# Popover

## Overview

El Popover es un overlay flotante anclado a un elemento trigger que muestra contenido rico — texto, acciones, formularios o información de estado — sin interrumpir el flujo principal. Se diferencia del Tooltip en que admite contenido interactivo y se activa con click; se diferencia del Modal en que mantiene relación espacial con el trigger y no requiere backdrop.

```
       ┌─ Trigger ─┐
       │  [Button]  │
       └─────┬──────┘
             ▲ ← arrow (placement=bottom: apunta hacia arriba)
  ┌──────────────────────────┐
  │  ✏️ Título (opcional)    │  ← title (Has Title = true)
  │──────────────────────────│
  │  Contenido libre         │  ← content SLOT (texto, forms,
  │  (texto, botones,        │    listas, imágenes...)
  │   formularios...)        │
  │──────────────────────────│
  │  [Cancelar]  [Confirmar] │  ← footer (Has Footer = true)
  └──────────────────────────┘
         Popover Body
```

El trigger es un SLOT externo — cualquier elemento (botón, ícono, link) puede activar el popover. El cuerpo del popover contiene regiones opcionales (title, footer) y un slot de contenido libre.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Placement  → top | bottom | left | right
              (controla dirección del arrow en Figma)
Size       → sm | md | lg
              (sm=240px, md=320px, lg=480px max-width)
Variant    → default | info | warning | error | success
              (color del borde, fondo y ícono de acento)
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Title   → muestra/oculta la región de título
Has Footer  → muestra/oculta la región de acciones
Has Arrow   → muestra/oculta la flecha de anclaje
Has Close   → muestra/oculta el botón de cierre (×)
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│ Popover                                     │
│                                             │
│  Placement  [top ▾]  [bottom ▾] [left ▾]   │
│             [right ▾]                       │
│                                             │
│  Size       [sm ▾]  [md ▾]  [lg ▾]         │
│                                             │
│  Variant    [default ▾] [info ▾]            │
│             [warning ▾] [error ▾]           │
│             [success ▾]                     │
│                                             │
│  ─ Booleans ────────────────────────────── │
│  Has Title   ○──●  (default: ON)            │
│  Has Footer  ●──○  (default: OFF)           │
│  Has Arrow   ○──●  (default: ON)            │
│  Has Close   ●──○  (default: OFF)           │
│                                             │
│  ─ Text ────────────────────────────────── │
│  ✏️ Title   [Popover title        ]          │
└─────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas mostrar contenido relacionado con un elemento específico?
│
├─ SÍ → ¿El contenido es solo texto informativo (1-2 líneas)?
│        │
│        ├─ SÍ → Usa Tooltip (más ligero, sin interacción)
│        │
│        └─ NO → ¿El contenido tiene acciones, forms o es estructurado?
│                 │
│                 ├─ SÍ → Usa Popover ✓
│                 │
│                 └─ NO → ¿Necesita backdrop y flujo modal completo?
│                          │
│                          └─ SÍ → Usa Modal
│
└─ NO → ¿Es un mensaje global sin anchor?
         │
         ├─ SÍ + transitorio → Usa Toast / Notification
         └─ SÍ + persistente → Usa Banner / Alert
```

**Usar Popover cuando:**
- El contenido es demasiado largo o interactivo para un tooltip (acciones, formularios, listas)
- Se necesita mostrar información contextual de un elemento sin salir del flujo
- Se usa el patrón de ayuda contextual ("?" junto a un campo de formulario)
- Se requiere confirmación inline antes de una acción destructiva (ej. Popconfirm)
- El contenido de estado necesita anclarse visualmente a un elemento específico (error/warning de campo)

**NO usar Popover cuando:**
- El contenido es texto corto solo informativo → usa **Tooltip**
- La acción requiere el flujo completo del usuario sin interrupciones → usa **Modal**
- El mensaje es global y no se ancla a ningún elemento → usa **Banner** o **Toast**
- El contenido tiene scroll extenso (>3 pantallas de alto) → usa **Drawer**

---

## Visual variations

### Por Placement (dirección del arrow en Figma)

| Placement | Arrow | Cuándo usar |
|-----------|-------|-------------|
| `bottom` (default) | Apunta ↑ hacia trigger | Trigger en parte superior del viewport |
| `top` | Apunta ↓ hacia trigger | Trigger cerca del borde inferior |
| `right` | Apunta ← hacia trigger | Trigger en panel lateral izquierdo |
| `left` | Apunta → hacia trigger | Trigger en panel lateral derecho |

El `shouldFlip` (runtime) invierte automáticamente si el placement preferido no tiene espacio — el arrow se reorienta según el placement real, no el solicitado.

### Por Size

| Size | Max-width | padding | Cuándo usar |
|------|-----------|---------|-------------|
| `sm` | 240px | 12px | Ayuda contextual breve (ContextualHelp), tooltips ricos |
| `md` | 320px | 16px | Contenido general, confirmaciones, info de usuario |
| `lg` | 480px | 20px | Formularios inline, previews, contenido estructurado |

### Por Variant

| Variant | Fondo | Borde | Ícono acento | Uso |
|---------|-------|-------|--------------|-----|
| `default` | Blanco | Gris claro | — | Contenido general, ayuda neutral |
| `info` | Azul muy claro | Azul medio | info-circle (azul) | Información adicional, hints |
| `warning` | Naranja muy claro | Naranja | alert-triangle (naranja) | Advertencias no bloqueantes |
| `error` | Rojo muy claro | Rojo claro | alert-circle (rojo) | Errores de campo, validación |
| `success` | Verde muy claro | Verde | check-circle (verde) | Confirmación de estado exitoso |

### Combinaciones de booleans

```
Popover minimal:     Has Title=OFF, Has Footer=OFF, Has Arrow=ON
Popover completo:    Has Title=ON,  Has Footer=ON,  Has Close=ON
ContextualHelp:      Has Title=ON,  Has Footer=OFF, Has Arrow=ON,  Size=sm, Variant=info
Confirmación:        Has Title=ON,  Has Footer=ON,  Has Arrow=ON,  Has Close=OFF
```

---

## Design decisions

### Placement como variante (4 valores, no 12 ni 20)

Spectrum usa 20 posiciones; Ant Design usa 12. Para Figma, se eligieron 4 direcciones cardinales (top/bottom/left/right). Las variantes de alineación (start/end dentro de una dirección) son comportamiento de runtime, no diferencias visuales en el componente. Esto mantiene el frame count manejable: 4 × 3 × 5 = 60 frames.

### Variant semántico en el contenedor (no solo en el contenido)

0/5 sistemas de referencia implementan variantes semánticas en el popover mismo — pero Zoom es un producto enterprise con validación de formularios inline, estados de campo y alertas contextuales ancladas a elementos. Los variantes de color permiten comunicar el tipo de información sin que el diseñador tenga que componer un Alert dentro de cada popover.

### modal=false por defecto (non-modal)

Spectrum hace todos los popovers modales (focus trap). Polaris usa `autofocusTarget="none"` para non-modal. La mayoría de usos de popover (ayuda, info, estado) no deben atrapar foco — interferirían con el flujo del usuario. Los popovers con formularios o acciones críticas deben activar `modal=true` explícitamente.

### Click como trigger por defecto

Hover-only viola WCAG 1.4.13 para usuarios de teclado. El caso de Ant Design (hover default) es un anti-patrón documentado. Click funciona para mouse, teclado y touch. Si se usa hover, se debe acompañar con focus como co-trigger.

### Excluded combinations

```
trigger=hover (sin focus co-trigger)  →  WCAG 1.4.13 violation (no implementar)
size=sm + Has Footer + 2 botones      →  overflow de contenido (preferir md)
Variant=error/warning + modal=false   →  mensajes críticos deben ser modales (reconsiderar)
```

---

## Behavior

### Essential for design

- **Apertura:** El trigger muestra `aria-expanded="true"` y el popover aparece anclado al trigger con la dirección indicada por Placement.
- **Cierre:** Escape siempre cierra y retorna foco al trigger. Click fuera del popover también cierra (light dismiss). Has Close=ON ofrece botón explícito de cierre.
- **Flip:** Si el placement preferido colisiona con el viewport, el popover se invierte al lado opuesto. El arrow reorienta automáticamente para apuntar al trigger.
- **Non-modal (default):** Tab puede salir del popover naturalmente — el foco no está atrapado.
- **Modal (opt-in):** Tab hace ciclo circular dentro del popover hasta que se cierra.
- **Z-index:** El popover renderiza en portal (fuera del DOM de su parent) para evitar colisiones con sticky headers, sidebars y modales. Tier de z-index: por encima de elementos sticky, por debajo de modales.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Trigger | — | `aria-expanded`, `aria-controls="[popover-id]"`, `aria-haspopup="dialog"` | Comunica estado abierto/cerrado al screen reader |
| Popover container | `dialog` (interactivo) / `tooltip` (solo lectura) | `aria-labelledby="[title-id]"` (si Has Title=true), `id="[popover-id]"` | Identifica el overlay como región nombrada |
| Title | `heading` (h2 recomendado) | `id="[title-id]"` | Referenciado por `aria-labelledby` del container |
| Close button | `button` | `aria-label="Cerrar"` | Screen reader puede identificar la acción |
| Footer actions | `button` | Nombres descriptivos de acción | Permite activar acciones con teclado |

### Keyboard navigation

Primary interactions (affect design):

```
Trigger activo + Enter/Space  →  Abre popover, foco → primer elemento focusable
Escape                         →  Cierra popover, foco → trigger
Tab (modal=false)              →  Navega hacia adelante (puede salir del popover)
Tab (modal=true)               →  Ciclo circular dentro del popover
Shift+Tab                      →  Navega hacia atrás (misma lógica que Tab)
```

Secondary interactions (dev reference):

```
Click fuera del popover        →  Cierra (light dismiss)
Scroll del documento           →  El popover puede cerrarse o reposicionarse (config)
Resize del viewport             →  Recalcula placement + flip
Trigger pierde foco (hover)    →  Cierra con delay 300ms (solo si trigger=hover)
```

---

## Content guide

- **Título:** Máx. 40 caracteres. Describe el contenido del popover, no repite el texto del trigger. Ej: "Más sobre permisos" ✓ — "Info" ✗
- **Cuerpo:** Máx. 3-4 líneas para size=sm/md. Si el contenido excede, considerar size=lg o Drawer.
- **Footer:** Máximo 2 botones. Acción principal a la derecha, secundaria/cancelar a la izquierda. Para acciones destructivas usar variant=error.
- **Variantes de estado:** El texto del cuerpo debe reforzar el mensaje visual. No usar variant=error con texto positivo.
- **Tono:** Directo y contextual. El popover complementa un elemento — el texto debe ser relevante a ese elemento específico.

---

## Pre-build checklist

```
Anatomía
 □ Trigger es un SLOT externo (no incluido en el componente)
 □ Arrow implementada como layer separada (no parte del body)
 □ Arrow cambia dirección por Placement (top→↓, bottom→↑, left→→, right→←)
 □ Slots title y footer visibles/ocultos por booleans (no por variantes)
 □ Close button es Has Close boolean (default OFF)

Variants
 □ 4 Placement × 3 Size × 5 Variant = 60 frames
 □ Arrow layer visible en todos los frames (Has Arrow toggle es layer control)
 □ Variant=info/warning/error/success con ícono acento visible en header

Espaciado
 □ sm: maxW=240px, padding=12px, gap=8px, radius=8px
 □ md: maxW=320px, padding=16px, gap=12px, radius=8px
 □ lg: maxW=480px, padding=20px, gap=16px, radius=12px
 □ Offset arrow↔trigger = 8px en todos los sizes

A11y
 □ Trigger tiene aria-expanded + aria-controls + aria-haspopup="dialog"
 □ Container tiene role="dialog" + aria-labelledby (si Has Title=true)
 □ Close button tiene aria-label="Cerrar"
 □ Escape cierra y retorna foco al trigger
 □ focus trap sólo cuando modal=true

Tokens
 □ Colores mapeados a variables de sistema (surface/border/text/status)
 □ Arrow usa mismo fondo que el body (pop/bg)
 □ Focus ring usa border/focus del sistema
```

---

## Related components

```
Tooltip        → Más ligero: solo texto, hover/focus trigger, no interactivo
Modal          → Más pesado: sin anchor, backdrop, focus trap siempre
Menu           → Caso especial: lista de acciones anclada a trigger (Popover especializado)
Drawer         → Más espacio: contenido extenso, ancla al borde del viewport
Banner/Alert   → Sin anchor: mensajes globales o inline dentro de contenido
Toast          → Sin anchor + transitorio: feedback de acciones del sistema
```

---

## Reference: how other systems do it

| System | Nombre | Trigger default | Placement | Notas destacadas |
|--------|--------|-----------------|-----------|-----------------|
| Spectrum | Popover + ContextualHelp | click (Dialog) | 20 posiciones | Focus trap siempre; ContextualHelp como BB |
| Carbon | Popover + Toggletip | click (Toggletip) | start/center/end por lado | Split primitivo/ready-to-use; highContrast boolean |
| Polaris | Popover | click | above/below/mostSpace | Universal container; autofocusTarget enum |
| Atlassian | Popup | click | Popper.js strings | Controlled-only; portal rendering; z-index tiers |
| Ant Design | Popover | hover ⚠️ | 12 posiciones | Herencia Tooltip→Popover→Popconfirm; hover=a11y gap |
| Material 3 | — | — | — | Ausente; usa Dialog/Menu/BottomSheet |

---

## Tokens

**22 tokens** · prefix `pop-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `pop-bg` | `surface/default` | Fondo del contenedor (default) |
| `pop-border` | `border/default` | Borde del contenedor (default) |
| `pop-radius` | `radius/md` | Radio del contenedor (8px md, 12px lg) |
| `pop-title-color` | `text/primary` | Color del título |
| `pop-body-color` | `text/secondary` | Color del cuerpo |
| `pop-close-color` | `text/secondary` | Color del ícono de cierre |
| `pop-divider` | `border/default` | Dividers entre header/body/footer |
| `pop-arrow-bg` | `surface/default` | Fondo de la flecha (igual al body) |
| `pop-info-bg` | `status/info/bg` | Fondo variante info |
| `pop-info-border` | `status/info/border` | Borde variante info |
| `pop-info-accent` | `status/info/fg` | Ícono/acento variante info |
| `pop-warning-bg` | `status/warning/bg` | Fondo variante warning |
| `pop-warning-border` | `status/warning/border` | Borde variante warning |
| `pop-warning-accent` | `status/warning/fg` | Ícono/acento variante warning |
| `pop-error-bg` | `status/error/bg` | Fondo variante error |
| `pop-error-border` | `status/error/border` | Borde variante error |
| `pop-error-accent` | `status/error/fg` | Ícono/acento variante error |
| `pop-success-bg` | `status/success/bg` | Fondo variante success |
| `pop-success-border` | `status/success/border` | Borde variante success |
| `pop-success-accent` | `status/success/fg` | Ícono/acento variante success |
| `focus/ring` | `border/focus` | Focus ring en elementos interactivos |
| `focus/ring-offset` | `surface/default` | Offset del focus ring |

### Spacing specs

```
Size sm  (max-width 240px)
  padding:     12px (all sides)
  gap:         8px  (between regions)
  radius:      8px
  arrowSize:   8px
  offset:      8px  (gap trigger↔arrow)
  font-title:  13px / 600 / 18px lh
  font-body:   13px / 400 / 18px lh

Size md  (max-width 320px)
  padding:     16px (all sides)
  gap:         12px (between regions)
  radius:      8px
  arrowSize:   8px
  offset:      8px
  font-title:  14px / 600 / 20px lh
  font-body:   14px / 400 / 20px lh

Size lg  (max-width 480px)
  padding:     20px (all sides)
  gap:         16px (between regions)
  radius:      12px
  arrowSize:   10px
  offset:      8px
  font-title:  16px / 600 / 24px lh
  font-body:   14px / 400 / 20px lh

Arrow
  Base del triángulo: arrowSize × 2
  Borde de arrow = mismo color que pop-border
  Relleno de arrow = pop-arrow-bg (igual al fondo del body)
```
