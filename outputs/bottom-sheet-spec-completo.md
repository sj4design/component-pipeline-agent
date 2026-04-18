# BottomSheet

## Overview

BottomSheet es un overlay móvil que emerge desde la parte inferior de la pantalla con puntos de snap configurables. Ofrece revelación progresiva de contenido mediante tres posiciones de descanso (collapsed/peek, half-expanded, expanded), permitiendo que el usuario decida cuánto quiere interactuar sin abandonar la pantalla actual. Existen dos variantes fundamentales: **Modal** (scrim + focus trap + swipe-to-dismiss) para flujos que requieren resolución antes de continuar, y **Standard** (no-modal, coexiste con el contenido de fondo) para escenarios como mapas con resultados de búsqueda donde el usuario necesita interactuar simultáneamente con ambas capas.

```
Estado: COLLAPSED (peek)
┌─────────────────────────────────┐
│                                 │
│     (contenido de la página)    │
│                                 │
│       ──── drag handle ────     │ ← 8px margen superior
│       Título del sheet          │
└─────────────────────────────────┘
  peekHeight: sm=120 / md=160 / lg=200

Estado: HALF-EXPANDED
┌─────────────────────────────────┐
│                                 │
│  (página parcialmente visible)  │
│       ──── drag handle ────     │
│       Título del sheet          │
│  ─────────────────────────────  │
│  Item 1                         │
│  Item 2                         │
└─────────────────────────────────┘
  height: sm=40% / md=50% / lg=60%

Estado: EXPANDED
┌─────────────────────────────────┐
│      ──── drag handle ────      │ ← radius top: sm=16 / md=20 / lg=24
│      Título          [✕ Cerrar] │ ← header (opcional)
│  ──────────────────────────────  │
│  Contenido scrolleable          │ ← content (required)
│  (scroll solo cuando expanded)  │
│  Item 1                         │
│  Item 2                         │
│  ...                            │
│  ─────────────────────────────  │
│  [Cancelar]      [Confirmar]    │ ← footer (opcional, sticky)
└─────────────────────────────────┘
  height: sm=70% / md=85% / lg=95%

Scrim (solo Modal variant):
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← rgba(0,0,0,0.5) detrás del sheet
```

El componente se relaciona con su trigger (botón, interacción de mapa, acción) a través de estado controlado — la apertura y cierre son siempre externos al componente. El drag handle funciona como affordance principal para cambiar entre snap points mediante gestos o teclado.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant:  modal | standard
State:    collapsed | half-expanded | expanded
Size:     sm | md | lg
```

Toggles (show/hide parts — do NOT generate extra variants):

```
👁 Show Drag Handle   → dragHandle layer
👁 Show Header        → header layer
👁 Show Footer        → footer layer
```

### Figma properties panel

```
╔══════════════════════════════════════╗
║  BottomSheet                         ║
╠══════════════════════════════════════╣
║  Variant      [modal ▾]              ║
║  State        [expanded ▾]           ║
║  Size         [md ▾]                 ║
╠══════════════════════════════════════╣
║  👁 Show Drag Handle    [✓]          ║
║  👁 Show Header         [✓]          ║
║  👁 Show Footer         [✓]          ║
╠══════════════════════════════════════╣
║  ✏️ Title text          [Título]     ║
╚══════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas un overlay desde el bottom en móvil?
│
├── ¿El usuario debe resolver antes de continuar?
│   ├── SÍ → BottomSheet Variant=modal
│   └── NO, debe poder interactuar con el fondo → BottomSheet Variant=standard
│
├── ¿Es desktop (viewport ≥ 768px)?
│   └── NO usar BottomSheet → usar Modal o Drawer lateral
│
├── ¿Es solo una lista de acciones (sin área de contenido)?
│   └── NO usar BottomSheet → usar ActionSheet / Menu
│
└── ¿Es un panel persistente siempre visible (bottom nav)?
    └── NO usar BottomSheet → patrón diferente (BottomNav)
```

**Use BottomSheet when:**
- El usuario está en móvil (viewport < 768px) y necesita ver un panel de contenido adicional
- El contexto es un selector (país, moneda, opciones de configuración rápida)
- El escenario requiere revelación progresiva: el usuario ve un "peek" y decide si expandir
- La variante Standard es necesaria para escenarios tipo mapa + resultados (interacción simultánea con el fondo)
- El contenido es variable en tamaño y los snap points ofrecen mejor UX que una altura fija

**Do NOT use BottomSheet when:**
- El viewport es desktop — en escritorio, Modal o Drawer lateral son más apropiados
- El contenido es solo una lista de acciones simples — usar un ActionSheet o Menu
- El panel debe estar siempre visible en pantalla (no es un overlay) — usar un BottomBar o NavBar
- La interacción es un diálogo de confirmación crítica — un Modal centrado comunica mejor la urgencia
- El componente se usa en una PWA con teclado virtual activo sin haber probado el comportamiento de `env(keyboard-inset-height)`

---

## Visual variations

### Variantes principales

**Variant=modal, State=collapsed (peek)**
El sheet asoma desde el fondo mostrando únicamente el drag handle y el título. El scrim oscurece el contenido de fondo (rgba(0,0,0,0.5)). Este estado comunica "hay más aquí" sin interrumpir completamente. Radius top sm=16px, md=20px, lg=24px. Fondo blanco sobre scrim oscuro.

**Variant=modal, State=half-expanded**
El sheet ocupa 40–60% del viewport según el size. El scrim permanece activo. Visible el drag handle, el header con título y botón de cierre, y el inicio del contenido scrolleable. El footer (si está visible) no se muestra en half-expanded (exclusión: `State=collapsed + footer visible`).

**Variant=modal, State=expanded**
El sheet ocupa 70–95% del viewport. El contenido interno es scrolleable solo cuando el sheet está en su máximo snap point (contrato de nested scrolling de M3). El footer sticky aparece pegado al bottom. El radius top se preserva.

**Variant=standard, State=half-expanded**
Sin scrim. El contenido de la página sigue siendo interactuable en la región superior. Sin focus trap. Ejemplo paradigmático: mapa en la parte superior, lista de resultados en el sheet. El usuario puede hacer tap en el mapa Y leer los resultados simultáneamente.

### Tamaños

| Size | peekHeight | halfHeight | fullHeight | radiusTop | dragHandle |
|------|-----------|-----------|-----------|-----------|------------|
| sm   | 120px     | 40%       | 70%       | 16px      | 40×4px     |
| md   | 160px     | 50%       | 85%       | 20px      | 48×4px     |
| lg   | 200px     | 60%       | 95%       | 24px      | 56×4px     |

### Drag handle

Pill de forma redondeada (radius: pill = 9999), fondo `text/disabled` (rgba(0.72, 0.72, 0.75)), margenes top=8px, bottom=16px. Actúa como primary affordance visual y como control de teclado (role=slider).

### Estados del fondo (scrim)

- **Modal**: scrim visible rgba(0,0,0,0.5), `aria-hidden="true"` en el contenido de fondo
- **Standard**: sin scrim, fondo totalmente interactuable

---

## Design decisions

### 1. Modal vs. Standard como variantes distintas (no un boolean)

**Why:** La distinción no es solo visual (scrim vs. sin scrim) — define completamente el modelo mental del usuario. Modal = "tengo que resolver esto antes de continuar". Standard = "esta información adicional no me interrumpe". Un boolean `isModal` ocultaría esta distinción semántica fundamental en el API.

**Tradeoff:** Dos variantes duplican algo de especificación. Sin embargo, la claridad conceptual supera la redundancia. M3 es el único T1 con spec completo y define exactamente esta distinción.

### 2. Tres snap points: collapsed / half-expanded / expanded

**Why:** La revelación progresiva reduce el cognitive load. El estado collapsed (peek) permite al usuario ver suficiente para decidir si quiere expandir. El half-expanded es el equilibrio entre visibilidad y espacio de pantalla. El estado expanded da acceso completo al contenido. M3 lo llama el "patrón canónico de progressive disclosure".

**Tradeoff:** Más snap points = más estados en Figma (12 frames netos después de exclusiones). En implementaciones simples donde el half-state no agrega valor, se puede usar `skipPartiallyExpanded: true`. El diseñador debe definir los snap points en porcentajes o píxeles antes de implementar.

### 3. Drag handle como slot visible con semántica de slider

**Why:** El drag handle es el primary affordance visual de un bottom sheet nativo. Sin él, el componente se percibe como un "drawer CSS" en lugar de un sheet gesturado. Además, `role="slider"` con `aria-valuenow` permite Arrow keys para cambiar snap points — esto es la alternativa de teclado requerida por WCAG 2.5.1 para los gestos de swipe.

**Tradeoff:** La complejidad de implementar `role="slider"` correctamente es mayor que un botón simple. Sin embargo, es el único mecanismo que satisface a la vez la expectativa visual nativa y los requisitos de accesibilidad.

### 4. Scope explícito: mobile-only (viewport < 768px)

**Why:** Solo M3 y Ant Design (como bottom Drawer) implementan este componente. 14 de los 24 sistemas analizados no tienen bottom sheet, y 4 T1 de referencia (Carbon, Polaris, Atlassian, Paste) argumentan explícitamente que mobile debe usar Modal full-screen. Documentar el scope de viewport previene que el componente se use en desktop donde Drawer o Modal son más apropiados.

**Tradeoff:** No tener un único componente que responda en todos los viewports. Gestalt resuelve esto con Sheet responsive (bottom en mobile, side en desktop), pero implica una complejidad adicional que puede ser un componente separado.

### Excluded combinations

```
Variant=standard + scrim visible
→ Standard es non-modal por definición; el scrim contradice su propósito

State=collapsed + footer visible
→ En estado collapsed solo se muestra el peek; footer requiere expanded/half-expanded
```

---

## Behavior

### Essential for design

El contrato más crítico de BottomSheet es el **nested scrolling**: el sheet siempre se expande hasta su snap máximo ANTES de que el contenido interno comience a scroll. Nunca ocurre scrolling interno cuando el sheet está en collapsed o half-expanded. Esto elimina la ambigüedad de "¿estoy scrolleando el sheet o el contenido?".

**Swipe-to-dismiss** (solo Variant=modal): deslizar hacia abajo desde el drag handle más allá del snap lowest cierra el sheet. WCAG 2.5.1 requiere que esta acción de gesto siempre tenga una alternativa: el botón de cierre en el header debe estar siempre visible cuando `isDismissible=true`.

**Snap transitions**: al soltar el drag handle en mid-drag, el sheet snaps al punto más cercano según velocidad (velocity-based snap, no position-based). Velocidad alta hacia abajo = cierra; velocidad alta hacia arriba = expande al máximo.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Sheet container (modal) | `dialog` | `aria-modal="true"`, `aria-labelledby="[header-id]"` | Define boundary semántica para screen readers; aria-modal oculta fondo |
| Sheet container (standard) | `region` | `aria-label="[propósito del panel]"` | No bloquea el fondo; region da nombre sin dialog semantics |
| Drag handle | `slider` | `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow="[percentage]"`, `aria-label="Cambiar tamaño del panel"` | Permite Arrow keys como alternativa keyboard al gesto de swipe |
| Close button | `button` | `aria-label="Cerrar"` | Alternativa keyboard/pointer al swipe-to-dismiss (WCAG 2.5.1) |
| Footer actions | heredado | Sin roles adicionales; los botones heredan sus roles | Contexto dentro del dialog es suficiente |
| Scrim (modal) | presentational | `aria-hidden="true"` en el contenido de fondo | Oculta el fondo del AT cuando modal está activo |

### Keyboard navigation

Primary interactions (affect design):

```
Tecla          | Acción                              | Focus target
────────────── | ─────────────────────────────────── | ────────────────────
Escape         | Cierra el modal bottom sheet        | Trigger que lo abrió
Tab            | Navega entre elementos focusables   | Siguiente focusable en sheet
Shift+Tab      | Navega hacia atrás                  | Anterior focusable en sheet
Arrow Up       | Drag handle: expande al siguiente snap | Drag handle (permanece)
Arrow Down     | Drag handle: colapsa al snap anterior | Drag handle (permanece)
Enter / Space  | Activa botón de cierre o acción     | Permanece en el botón
```

Secondary interactions (dev reference):

```
Swipe up         → Expande al siguiente snap point (gesture)
Swipe down       → Colapsa al snap anterior o cierra (gesture)
Tap en scrim     → Cierra modal (gesture alternative al Escape)
Velocity drag    → Snap basado en velocidad, no posición
```

**Focus management:**
- Al abrir: focus se mueve al primer elemento focusable dentro del sheet (no al drag handle, sino al primer interactivo del content o al close button)
- Modal: focus trap activado — Tab no escapa del sheet; el contenido de fondo tiene `aria-hidden="true"`
- Standard: sin focus trap — Tab puede moverse libremente entre sheet y contenido de fondo
- Al cerrar: focus retorna al elemento trigger que abrió el sheet

---

## Content guide

### dragHandle
Elemento puramente visual. Sin texto. Su aria-label en el slider describe la funcionalidad: "Cambiar tamaño del panel". No incluir texto de descripción en este slot.

### header
Máximo 2–3 palabras para el título. El título describe el propósito del sheet, no una acción. Ejemplos correctos: "Configuración", "Seleccionar país", "Resultados (4)". El botón de cierre siempre con aria-label="Cerrar" sin texto visible (solo icono).

**Ejemplo — Picker de país:**
- Correcto: "Selecciona tu país"
- Incorrecto: "Por favor selecciona el país de tu cuenta en la lista de abajo"

### content
El contenido debe ser diseñado para el estado expanded. En half-expanded, el contenido se corta naturalmente con el scroll. Evitar contenido que solo tiene sentido completo — el usuario puede ver el sheet en cualquier snap point. Implicación: los estados iniciales del contenido deben ser comprensibles incluso cuando están truncados.

### footer
Solo para acciones primarias. Máximo 2 botones (Cancelar + Acción principal). El botón primario siempre a la derecha. No usar footer para navegación o acciones secundarias — esas van en el content. Los labels de los botones deben ser verbos de acción específicos: "Confirmar", "Seleccionar", no "OK" ni "Aceptar".

### scrim
Puramente decorativo. Sin contenido. Gestiona con `aria-hidden="true"`.

---

## Pre-build checklist

```
Estructura y anatomía
□ dragHandle es un pill (radius: pill, 9999) centrado horizontalmente con margin-top=8px, margin-bottom=16px
□ radiusTop implementado (no radiusBottom) — bottom del sheet llega al borde de pantalla
□ Tres snap points definidos en px o % antes de implementar (peek / half / full)
□ Contrato nested scrolling: content no scrollea hasta que sheet esté en expanded máximo

Modal variant
□ scrim rgba(0,0,0,0.5) detrás del sheet, delante del contenido de página
□ Focus trap activo: Tab no escapa del sheet
□ aria-modal="true" + aria-hidden en contenido de fondo
□ Close button visible en todos los estados (no solo cuando hay header)
□ Escape key cierra el modal
□ Focus retorna al trigger al cerrar

Standard variant
□ Sin scrim (background completamente visible e interactuable)
□ Sin focus trap
□ role="region" (no role="dialog")
□ Sin swipe-to-dismiss (Standard no se cierra por swipe)

Drag handle
□ role="slider" + aria-valuemin=0, aria-valuemax=100, aria-valuenow=[porcentaje del snap actual]
□ Arrow Up/Down cambian snap point (alternativa keyboard al gesto)

Exclusiones implementadas
□ Variant=standard: sin scrim visible en ningún estado
□ State=collapsed: footer layer oculto

Tamaños verificados
□ sm: peek=120px, half=40%, full=70%, radius=16px
□ md: peek=160px, half=50%, full=85%, radius=20px
□ lg: peek=200px, half=60%, full=95%, radius=24px

Tokens
□ Todos los valores referenciados por token (no valores hardcoded)
□ prefix bs- en todas las variables
```

---

## Related components

```
Componente        | Cuándo usar ESTE en lugar de BottomSheet
─────────────────────────────────────────────────────────────────────────
Modal             | Viewport desktop; diálogos de confirmación crítica;
                  | cuando el layout centrado comunica urgencia

Drawer (lateral)  | Viewport desktop; navegación secundaria; paneles
                  | de configuración que persisten durante la sesión

ActionSheet       | Solo lista de acciones discretas sin área de
                  | contenido propio; sin scroll, sin header

Menu / Dropdown   | Selección de opciones en cualquier viewport; no
                  | requiere área de contenido rica

BottomNav         | Panel permanentemente visible en la parte inferior;
                  | no es un overlay, no se cierra
```

---

## Reference: how other systems do it

### Material Design 3
M3 es la única fuente de verdad para la especificación completa de bottom sheet en el corpus (46/50 puntos en dimension scoring). Define las dos variantes fundamentales: Standard (non-modal, coexiste con el contenido de la página) y Modal (scrim overlay, bloquea interacción de fondo). Los snap points (detents) en tres posiciones — collapsed/peek a 56dp, half-expanded al 50% del viewport, fully-expanded — crean el patrón de revelación progresiva característico. El drag handle como affordance principal implementado como composable con `role="slider"` semántico. El contrato de nested scrolling es la contribución más crítica: el sheet SIEMPRE se expande hasta su snap máximo antes de que el scroll interno del contenido se active. M3 es Android/Compose-first y carece de guidance para web, dejando que teams web implementen desde scratch o usen Vaul.

### shadcn/ui (Vaul)
La implementación web de referencia construida sobre la librería Vaul de Emil Kowalski (43/50 puntos). Ofrece el único stack web con: drag handle, snap points configurables como array (`snapPoints={["148px", "355px", 1]}`), swipe-to-dismiss con spring animation, nested scrolling, y `shouldScaleBackground` — el efecto iOS donde el contenido de fondo se escala hacia atrás creando sensación de profundidad nativa. La arquitectura de `fadeFromIndex` permite que el scrim solo aparezca cuando el sheet pasa del primer snap point (sin scrim en peek, con scrim en expanded). Vaul es el estándar de facto en el ecosistema React/web para bottom sheets.

### Gestalt (Pinterest)
El único sistema en el corpus que unifica bottom sheet (mobile) y side panel (desktop) en un solo componente con respuesta automática al viewport (34/50 puntos). En mobile viewports el Sheet sube desde el bottom con soporte de peek; en desktop el mismo Sheet renderiza como right-side panel. `accessibilityLabel` es un required prop — Gestalt fuerza el accessible name al nivel del API, no como best practice documentation. Esta estrategia de hacer obligatorio el nombre accesible es un modelo a seguir para cualquier componente de overlay.

### Spectrum (Adobe)
Spectrum Tray implementa un Dialog posicionado en el bottom de viewport en mobile. Sin drag handle, sin snap points, sin swipe-to-dismiss — es una "bottom drawer modal", no un true bottom sheet. Hereda toda la accesibilidad de Dialog: `role="dialog"`, `aria-modal`, focus trap, Escape para cerrar. Representa el extremo del espectro: máxima accesibilidad, mínima "natividad" gestual.

### Ant Design
`Drawer placement="bottom"` crea un overlay panel desde el bottom edge. La prop `height` controla el tamaño fijo. `mask={false}` crea un non-blocking bottom panel simulando el Standard variant de M3 sin gestos. Sin snap points, sin drag handle. Útil para dashboards enterprise que necesitan un panel inferior rápido sin mobile-native behavior. La solución más pragmática para enterprise sin invertir en gesture physics.

---

## Tokens

**16 tokens** · prefix `bs-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `bs/sm/peek` | `sizing/120` | Altura peek state, size sm |
| `bs/md/peek` | `sizing/160` | Altura peek state, size md |
| `bs/lg/peek` | `sizing/200` | Altura peek state, size lg |
| `bs/radius/sm` | `radius/xl` | Border radius top, size sm (16px) |
| `bs/radius/md` | `radius/xxl` | Border radius top, size md (20px) |
| `bs/radius/lg` | `radius/xxl` | Border radius top, size lg (24px) |
| `bs/bg` | `surface/default` | Background del sheet |
| `bs/shadow` | `elevation/4` | Sombra superior del sheet |
| `bs/scrim` | `overlay/backdrop` | Scrim rgba(0,0,0,0.5) — solo modal |
| `bs/handle/bg` | `text/disabled` | Color del drag handle pill |
| `bs/handle/radius` | `radius/pill` | Radius del drag handle (9999) |
| `bs/handle/marginTop` | `spacing/2` | Margen superior del handle (8px) |
| `bs/handle/marginBottom` | `spacing/4` | Margen inferior del handle (16px) |
| `bs/header/padding` | `spacing/4` | Padding horizontal del header (16px) |
| `bs/content/padding` | `spacing/4` | Padding del área de contenido (16px) |
| `bs/footer/padding` | `spacing/4` | Padding del footer (16px) |

### Spacing specs

```
Drag handle:
  width: sm=40px / md=48px / lg=56px
  height: 4px (fijo para todos los sizes)
  marginTop: 8px (spacing/2)
  marginBottom: 16px (spacing/4)
  borderRadius: 9999 (pill)

Sheet container:
  borderRadius (top-left, top-right):
    sm → 16px (radius/xl)
    md → 20px (radius/xxl)
    lg → 24px (radius/xxl)
  borderRadius (bottom): 0px (llega al borde de pantalla)

Snap points (altura desde bottom):
  collapsed/peek:
    sm → 120px
    md → 160px
    lg → 200px
  half-expanded:
    sm → 40% del viewport
    md → 50% del viewport
    lg → 60% del viewport
  expanded:
    sm → 70% del viewport
    md → 85% del viewport
    lg → 95% del viewport

Header interno:
  padding: 16px horizontal, 12px vertical
  height mínima: 48px (acomoda título + close button)

Footer interno:
  padding: 16px
  sticky bottom (no scrollea con el content)
  height mínima: 64px (acomoda botones md de 40px + 12px padding)
```
