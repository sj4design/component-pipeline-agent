# BottomNav

## Overview

BottomNav es la barra de navegación primaria fija en la parte inferior de la pantalla en aplicaciones móviles. Permite al usuario cambiar entre las 3 a 5 secciones principales de la aplicación con un solo toque. Es el equivalente móvil del sidebar de escritorio — no una barra de herramientas, no un menú contextual, sino la navegación primaria de toda la aplicación. Material Design 3 define el estándar de referencia: cada destino tiene un ícono y un label, el estado activo se comunica mediante una pill indicadora detrás del ícono, y el número de destinos está hard-constrained entre 3 y 5.

```
BottomNav estándar (Size=md, ItemCount=4, Appearance=stack):
  ╔════════════════════════════════════════════════════════╗
  ║                                                        ║
  ║              (contenido de la app)                     ║
  ║                                                        ║
  ║────────────────────────────────────────────────────────║
  ║  border-top: 1px                                       ║
  ║    🏠          🔍          📬          👤             ║
  ║  ╭──────╮                   ③                         ║
  ║  │ Inicio│  Buscar      Mensajes    Perfil             ║
  ║  ╰──────╯  (pill activa detrás del ícono)              ║
  ║                                                        ║
  ║  h=64px · fixed bottom · width=100%                    ║
  ╚════════════════════════════════════════════════════════╝

NavItem activo vs inactivo:
  Activo:   [pill indicator] + icono filled + label bold (dark)
  Inactivo: sin pill + ícono outlined + label normal (secondary color)
  Hover:    pill sutil (surface/selected) + ícono dark
```

El componente se compone de un `BottomNav` contenedor y múltiples instancias de `NavItem` como sub-componente. El safe-area padding para notches de iPhone (`env(safe-area-inset-bottom)`) se aplica en implementación, no en Figma.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
BottomNav:
  Size:       sm | md
              sm=56px height · md=64px height
  ItemCount:  3 | 4 | 5
              Número de NavItems en la barra

NavItem:
  State:      default | hover | active | focused | disabled
  Size:       sm | md  (hereda del BottomNav)
```

Toggles (show/hide parts — do NOT generate extra variants):

```
NavItem:
  👁 Show Label          → muestra/oculta el label bajo el ícono (default=ON, recomendado)
  👁 Has Badge           → muestra/oculta el badge de notificación sobre el ícono
  👁 Show Active Indicator → muestra/oculta la pill indicadora (default=ON en State=active)
```

### Figma properties panel

```
BottomNav:
┌─────────────────────────────────────────┐
│  BottomNav                              │
│  ─────────────────────────────────────  │
│  Size        [sm ▼] [md]               │
│  ItemCount   [3 ▼] [4] [5]             │
└─────────────────────────────────────────┘

NavItem:
┌─────────────────────────────────────────┐
│  NavItem                                │
│  ─────────────────────────────────────  │
│  State    [default ▼] [hover] [active]  │
│           [focused] [disabled]          │
│  Size     [sm ▼] [md]                  │
│  ─────────────────────────────────────  │
│  👁 Show Label          [ ON  ]         │
│  👁 Has Badge           [ OFF ]         │
│  👁 Show Active Indicator [ ON  ]       │
│  ─────────────────────────────────────  │
│  🔄 Icon                [icon/home]     │
│  🔄 Active Icon         [icon/home-filled] │
│  🔄 Badge               [Badge/dot]     │
│  ✏️ Label               [Inicio]        │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Es una app/PWA mobile?
         │
         └── SÍ ──→ ¿Cuántos destinos primarios tiene la app?
                         │
                         ├── < 3 ──→ Usar Tabs (mismo nivel jerárquico, no app-shell)
                         │
                         ├── 3–5 ──→ BottomNav ✓
                         │
                         └── > 5 ──→ BottomNav con "Más" menu que abre un Drawer
                                      (el último item del nav es "Más → Drawer")

¿Es desktop o tablet (≥768px)?
  └──→ NO usar BottomNav → Sidebar o Top Navigation
```

**Use BottomNav when:**
- La aplicación es mobile (viewport < 768px) o es una PWA con experiencia mobile-first
- Hay entre 3 y 5 destinos de navegación primaria que son equivalentes en jerarquía y frecuencia de uso
- Los destinos son el contexto más alto de la navegación (Home, Search, Mensajes, Perfil) — no tabs dentro de una sección
- La experiencia compite con apps nativas de iOS y Android donde la barra de tabs en el fondo es la convención establecida

**Do NOT use BottomNav when:**
- El viewport es desktop o tablet — usar Sidebar, Top Navigation o Tabs horizontales
- Hay menos de 3 destinos — usar Tabs (son el mismo pattern pero en contexto más limitado)
- Hay más de 5 destinos sin agrupar — los touch targets se vuelven demasiado pequeños
- La navegación es jerárquica (Projects > Boards > Issues) — BottomNav es para destinos planos de igual importancia
- La pantalla ya tiene un FAB (Floating Action Button) crítico en el área del bottom y el espacio z-index sería conflictivo

---

## Visual variations

**Por State del NavItem — Size=md, Show Label=true, Show Active Indicator=true:**

| State | Ícono | Label | Pill indicator | Color ícono/label |
|-------|-------|-------|----------------|-------------------|
| default | outlined | normal (500w) | transparent | text/secondary |
| hover | outlined | normal | sutil (surface/selected) | text/primary |
| active | filled | bold (600w) | accentuada (brand/subtle) | text/primary |
| focused | outlined | normal | transparent + focus ring 2px | text/primary |
| disabled | outlined | normal | transparent | text/disabled (40% opacity) |

**Por Size — State=active, Show Label=true:**

| Size | Height NavItem | Ícono | Pill H×W | Font label | Padding vertical |
|------|---------------|-------|----------|------------|-----------------|
| sm | 56px | 20px | 28×52px | 10px/500w | 8px |
| md | 64px | 24px | 32×64px | 11px/500w | 12px |

**Por ItemCount — Size=md:**
- 3 items: cada item ocupa 33.3% del ancho. Touch target amplio.
- 4 items: cada item ocupa 25% del ancho.
- 5 items: cada item ocupa 20% del ancho. Mínimo recomendado para touch (48dp).

**Con Has Badge=true:**
- Badge se posiciona en la esquina superior derecha del ícono con offset: top=4px, right=−6px
- Badge puede ser `dot` (presencia) o `count` (número de notificaciones)
- El badge count DEBE incluirse en el accessible name del NavItem para screen readers

**Show Label=false (icon-only mode):**
- Reservado para toolbars secundarias, no para navegación primaria
- Cada NavItem icon-only requiere `aria-label` explícito en implementación
- M3 y Orbit desaconsejan este modo para navegación primaria (reduce comprensión 75%)

---

## Design decisions

### Decisión 1: NavItem + BottomNav como dos componentes en la familia (sub-componente)

**Por qué:** Material Design 3 modela `NavigationBarItem` como elemento explícitamente separado del `NavigationBar` contenedor. Esto permite: (a) reutilizar NavItem en otros contextos de navegación mobile (ej. tabs horizontales en landscape), (b) testear estados individuales (hover, active, disabled) en aislamiento, (c) la relación de tamaño es bidireccional — NavItem hereda Size del BottomNav, pero BottomNav necesita conocer el State de cada NavItem para posicionar la pill indicator. La separación hace esta relación explícita.

**Tradeoff:** El diseñador debe gestionar dos componentes para construir una barra de navegación. El buildOrder `NavItem → BottomNav` en el pipeline refleja que NavItem debe construirse primero como building block.

### Decisión 2: Active indicator pill (M3) como slot + boolean Show Active Indicator

**Por qué:** Material Design 3 reemplazó el color-tint de M2 con una pill shape porque el color-only active state falla en: (a) high-contrast mode donde los colores colapsan, (b) dynamic color systems (Material You) donde el color brand puede ser cualquier tono, (c) modo daltónico donde el azul-activo y el gris-inactivo son indistinguibles. La pill crea una zona activa clara independiente del color. Modelar como slot + boolean permite deshabilitar la pill en casos donde la marca define su propio active pattern.

**Tradeoff:** La pill ocupa espacio vertical dentro del NavItem — reduce el espacio disponible para el label. En Size=sm (56px) la pill es 28px de altura, dejando solo 8px de padding para el label.

### Decisión 3: ItemCount como property explícita (3/4/5) — no libre

**Por qué:** M3 tiene un hard constraint de 3-5 destinos respaldado por research de usabilidad de Google: menos de 3 = usar Tabs; más de 5 = touch targets de menos de 48dp en pantallas de 360dp, fallando WCAG 2.5.5. Modelar como property discreta (3, 4, 5) en lugar de un número libre documenta el constraint en el API de Figma — el diseñador no puede crear un frame con 6 ítems accidentalmente.

**Tradeoff:** No hay frame para el caso "6 items con item de overflow 'Más'". Este patrón debe documentarse y manejarse a nivel de implementación, no de Figma frames.

### Decisión 4: Show Label como boolean (no variante IconOnly separada)

**Por qué:** Google research demuestra que labels siempre visibles mejoran la comprensión en 75% comparado con icon-only. La práctica correcta es tener labels por default (Show Label=ON) con la opción de desactivarlos como excepción documentada, no como variante de primer nivel. Crear una variante "IconOnly" le daría la misma prominencia visual que la variante recomendada, invitando a su uso indiscriminado.

**Tradeoff:** El diseñador aún puede desactivar Show Label en cada NavItem individualmente en Figma. La documentación debe ser explícita: "icon-only es un anti-pattern para navegación primaria; usar solo para toolbars secundarias".

### Decisión 5: Safe-area y scroll-hide documentados pero no modelados en Figma

**Por qué:** `env(safe-area-inset-bottom)` y el scroll-hide behavior son comportamientos CSS/JS runtime que no tienen representación visual en Figma. Modelarlos como frames adicionales crearía confusión (¿es un frame de la barra oculta o de la visible?). Se documentan en `componentDescription` y en este spec para que el desarrollador los implemente correctamente.

**Tradeoff:** Los diseñadores que crean mockups para iPhone con notch deben agregar manualmente el safe-area space en sus artboards. Esto es un workflow issue, no un problema del componente.

### Excluded combinations

```
ItemCount=2
  → < 3 items = usar Tabs component; BottomNav con 2 items es anti-pattern

ItemCount=6+
  → > 5 items = touch targets < 44dp en 360dp; fallará WCAG 2.5.5
  → Alternativa: 5 items + item "Más" que abre Drawer con destinos adicionales

Show Active Indicator=true + State=default/hover/disabled
  → La pill activa solo es visible en State=active
  → En otros estados Show Active Indicator no debería renderizar la pill visible

Has Badge=true + badge count no actualiza aria-label del NavItem
  → A11y error: el badge debe incluirse en el accessible name del item
  → "Mensajes, 3 sin leer" — no solo el ícono de mensaje con badge visual

Size=sm + ItemCount=5 (en viewport estrecho)
  → 5 items en 56px height con ícono 20px y label 10px: muy denso
  → Preferir md size si se usan 5 items; sm es mejor para 3-4 items
```

---

## Behavior

### Essential for design

1. **Fixed positioning:** El BottomNav está `position: fixed; bottom: 0; width: 100%`. En Figma, se posiciona en el bottom del artboard como un componente fijo.
2. **Safe area (iPhone):** En implementación, el contenedor debe agregar `padding-bottom: env(safe-area-inset-bottom)` para evitar que la barra quede debajo de la gesture indicator en iPhones X en adelante. La altura visual del BottomNav (56 o 64px) se suma a este padding.
3. **Border top:** El BottomNav tiene un `border-top: 1px solid border/default` que lo separa del contenido. En layouts oscuros, puede reemplazarse con una sombra sutil `box-shadow: 0 -4px 8px rgba(0,0,0,0.08)`.
4. **Active pill transition:** La pill indicator hace transición suave (200ms ease) cuando el usuario cambia de destino. En Figma esto se modela en prototyping, no en variants.
5. **Scroll-hide (opcional, M3):** En contenido largo, el BottomNav puede ocultarse con `transform: translateY(100%)` al hacer scroll hacia abajo y reaparecer al hacer scroll hacia arriba. SOLO responde a gestos táctiles/mouse — nunca ocultar durante keyboard navigation.
6. **Distribución equitativa:** Los NavItems se distribuyen equitativamente en el ancho del BottomNav (flex: 1 cada uno). No es posible que un item sea más ancho que otro.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| BottomNav container | `navigation` | `aria-label="Navegación principal"` | Landmark semántico que permite a SR users navegar directamente a la barra de nav |
| NavItem activo | `link` o `button` | `aria-current="page"` (link) o `aria-selected="true"` (tab) | Informa al SR cuál es el destino actual — crítico para orientación |
| NavItem inactivo | `link` o `button` | sin aria-current | Sin atributo de selección en inactivos |
| NavItem con badge | `link` o `button` | `aria-label="Mensajes, 3 sin leer"` | El count del badge DEBE estar en el accessible name — no solo como badge visual |
| NavItem icon-only | `link` o `button` | `aria-label="[nombre del destino]"` | Sin label visible, el aria-label es obligatorio |
| Disabled NavItem | `button` | `aria-disabled="true"` (no `disabled`) | `aria-disabled` mantiene el foco navegable sin activar; `disabled` lo saca del tab order |
| Active indicator pill | `none` | `aria-hidden="true"` | Decorativo — sin información semántica propia |

### Keyboard navigation

Primary interactions (affect design):

```
Tab          → Navega entre los NavItems en orden
Enter/Space  → Activa el NavItem enfocado (navega al destino)
```

Secondary interactions (dev reference):

```
Shift+Tab    → Navegación inversa entre NavItems
Focus ring   → 2px solid focus/ring, offset=2px, en el NavItem enfocado
              La pill indicator NO reemplaza al focus ring — ambos pueden coexistir

Screen reader announces al entrar al nav:
  "Navegación principal, lista de 4 elementos"
  (implicit list semantics del nav element)

Al activar NavItem activo:
  No debe navegar ni recargar — ya estás en el destino
  Puede hacer scroll-to-top de la sección si el comportamiento es iOS-like

Scroll-hide y teclado:
  El scroll-hide behavior NUNCA debe activarse durante keyboard navigation
  Solo responde a eventos de scroll provocados por mouse/touch
```

---

## Content guide

**Slot: icon (required) + active icon (instance swap)**
- Usar íconos con variante outlined (default/inactive) y filled (active)
- La convención filled=active / outlined=inactive es el estándar establecido por iOS, Android y M3
- Los íconos deben ser universalmente reconocibles — se comprenden sin el label asociado
- Tamaño: sm=20px, md=24px. Usar el tamaño correcto del sistema de íconos

**Slot: label (text)**
- Máximo 1-2 palabras. Máx ~10 caracteres para evitar truncado en ItemCount=5
- Usar sustantivos simples: "Inicio", "Buscar", "Mensajes", "Perfil", "Actividad"
- Evitar verbos: "Ver Inicio", "Ir a Mensajes" — demasiado largos
- Capitalizar solo la primera letra (sentence case)
- En inglés: "Home", "Search", "Messages", "Profile" — el vocabulario estándar de apps

**Slot: badge (container, optional)**
- Para conteos: Badge Type=count, Variant=error (default) o neutral
- Para presencia: Badge Type=dot
- El accessible name del NavItem DEBE incluir el count: `aria-label="Mensajes, 3 sin leer"`
- Actualizar el aria-label dinámicamente cuando cambia el count

---

## Pre-build checklist

```
ANATOMÍA - NavItem
[ ] 5 slots: icon · active-icon (swap) · label · badge · activeIndicator (pill)
[ ] State machine: default / hover / active / focused / disabled con estilos correctos
[ ] Show Label boolean (default=ON)
[ ] Has Badge boolean (default=OFF) + badge slot
[ ] Show Active Indicator boolean

ANATOMÍA - BottomNav
[ ] Contenedor flex row con distribución equitativa de items (flex: 1)
[ ] border-top: 1px solid border/default
[ ] bg: surface/default (blanco)
[ ] Width=100%, height según Size (sm=56 / md=64)
[ ] Fixed bottom en prototyping Figma

TAMAÑOS - NavItem
[ ] sm: h=56px · py=8px · icon=20px · pill=28×52px · font=10px/500w · lh=14px
[ ] md: h=64px · py=12px · icon=24px · pill=32×64px · font=11px/500w · lh=16px

ESTADOS
[ ] default: icon/label=text/secondary · pill=transparent
[ ] hover: icon/label=text/primary · pill=surface/selected
[ ] active: icon/label=text/primary · pill=brand/subtle · label=600w
[ ] focused: icon/label=text/primary · ring 2px focus/ring offset=2px
[ ] disabled: icon/label=text/disabled · pill=transparent · cursor=not-allowed

BADGE POSITIONING
[ ] Badge offset: top=4px right=−6px del ícono (esquina superior derecha)

ACCESIBILIDAD
[ ] BottomNav container: role="navigation" + aria-label="Navegación principal"
[ ] NavItem activo: aria-current="page" o aria-selected="true"
[ ] NavItem con badge: accessible name incluye count ("Mensajes, 3 sin leer")
[ ] NavItem icon-only: aria-label con nombre del destino
[ ] Focus ring 2px visible en state=focused

FRAME COUNT
[ ] NavItem: 10 frames = State(5) × Size(2)
[ ] BottomNav: 6 frames = Size(2) × ItemCount(3)
[ ] Total familia: 16 frames netos

TOKENS
[ ] bnav/sm/h → sizing/56
[ ] bnav/md/h → sizing/64
[ ] bnav/bg → surface/default
[ ] bnav/borderTop → border/1
[ ] bnav/borderTopColor → border/default
[ ] bnav/item/default/iconFg → text/secondary
[ ] bnav/item/default/labelFg → text/secondary
[ ] bnav/item/hover/iconFg → text/primary
[ ] bnav/item/hover/indicator → surface/selected
[ ] bnav/item/active/iconFg → text/primary
[ ] bnav/item/active/labelFg → text/primary
[ ] bnav/item/active/indicator → brand/subtle
[ ] bnav/item/active/fontWeight → type/weight-semibold
[ ] bnav/item/focused/ring → focus/ring
[ ] bnav/item/disabled/fg → text/disabled
[ ] bnav/indicator/radius/sm → radius/pill
[ ] bnav/indicator/radius/md → radius/pill
[ ] bnav/iconSize/sm → iconSize/md (20px)
[ ] bnav/iconSize/md → iconSize/lg (24px)
[ ] bnav/label/fontSize/sm → type/xs (10px)
[ ] bnav/label/fontSize/md → type/xs (11px)
```

---

## Related components

```
Tabs
  → Usar para 2-3 secciones dentro de una pantalla (no app-level)
  → BottomNav es app-shell navigation; Tabs es section navigation
  → Tabs son horizontales inline; BottomNav es fixed bottom

Sidebar / Drawer
  → Usar en desktop (≥768px) o para navegación jerárquica con submenús
  → BottomNav es plano y mobile-only; Sidebar puede tener jerarquía
  → En mobile, Drawer se activa con hamburger o como overlay; BottomNav siempre visible

Tab Bar (iOS nativo)
  → El equivalente nativo. Para apps híbridas, mantener consistencia visual con el nativo
  → BottomNav es la versión web/Figma del Tab Bar nativo

FAB (Floating Action Button)
  → Si la app tiene un FAB, debe flotar SOBRE el BottomNav (z-index superior)
  → El contenido de la app debe tener padding-bottom = altura del BottomNav + margen del FAB

Badge
  → NavItem usa Badge component para los indicadores de notificación
  → El Badge se compone dentro del NavItem slot; no crear un badge ad-hoc
```

---

## Reference: how other systems do it

**Material Design 3** es la especificación de referencia definitiva para bottom nav en todo el corpus de 24 sistemas. Sus tres innovaciones principales respecto a M2 son: (1) el active indicator pill-shaped que reemplaza el color-tint, creando una zona activa clara independiente del color y compatible con high-contrast mode y Dynamic Color; (2) el hard limit de 3-5 destinos con justificación empírica de research de uso; (3) el scroll-hide/show behavior que maximiza el viewport durante lectura. El `selectedIcon` prop separado del `icon` permite íconos filled/outlined para active/inactive respectivamente, siguiendo la convención visual de M3. La integración de badge a nivel del `NavigationBarItem` garantiza que el count se anuncie correctamente como parte del accessible name del destino.

**Ant Design Mobile (antd-mobile)** es notable por mantener BottomNav fuera del `antd` desktop library en un package separado, previniendo que el bundle desktop incluya patrones móviles. Su decisión de hacer el `icon` prop una función `(active: boolean) => ReactNode` es más flexible que la prop estática `selectedIcon` de M3 — permite íconos animados o completamente distintos en estado activo sin mantener dos icon sets en el consumer. El `safeArea` prop (opt-in) gestiona el padding bottom para notches de iPhone — el único sistema que documenta este detalle explícitamente, aunque sería mejor hacerlo automático en lugar de opt-in.

**Base Web (Uber)** es el único web design system de Tier 1 con un `BottomNavigation` componente dedicado (junto con Orbit). Uber lo necesita porque el rider app, driver app y Uber Eats tienen variantes mobile-web donde los componentes nativos no están disponibles. Su override system permite customizar cada aspecto del componente (icon rendering, active indicator shape, label visibility) sin forking — la filosofía de customización por composición de Base Web aplicada a bottom nav. En accesibilidad, es el más sólido: renders como `<nav>` con `role="navigation"`, cada item como `<a>` con `aria-current="page"`, touch targets de 48×48dp mínimo.

**Orbit (Kiwi.com)** ofrece la implementación más simple del corpus — sin override system, sin scroll-hide, sin badge integration documented — pero cubre el esencial. Labels siempre visibles por decisión de diseño explícita: en travel booking, los usuarios necesitan saber claramente a dónde van antes de tocar. Esta decisión refleja que icon-only navigation aumenta errores en contextos transaccionales de alta consecuencia. La característica notable es que el mismo componente funciona en web y React Native, lo cual lo hace particularmente relevante para productos con estrategia mobile cross-platform.

---

## Tokens

**20 tokens** · prefix `bnav-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `bnav/sm/h` | sizing/56 | Altura del BottomNav en Size=sm |
| `bnav/md/h` | sizing/64 | Altura del BottomNav en Size=md |
| `bnav/bg` | surface/default | Background de la barra de navegación |
| `bnav/borderTop` | border/1 | Grosor del borde superior |
| `bnav/borderTopColor` | border/default | Color del borde superior |
| `bnav/item/default/iconFg` | text/secondary | Color del ícono en estado default |
| `bnav/item/default/labelFg` | text/secondary | Color del label en estado default |
| `bnav/item/hover/iconFg` | text/primary | Color del ícono en estado hover |
| `bnav/item/hover/indicator` | surface/selected | Color de la pill en estado hover |
| `bnav/item/active/iconFg` | text/primary | Color del ícono en estado active |
| `bnav/item/active/labelFg` | text/primary | Color del label en estado active |
| `bnav/item/active/indicator` | brand/subtle | Color de la pill indicadora activa |
| `bnav/item/active/fontWeight` | type/weight-semibold | Peso del label en estado active |
| `bnav/item/focused/ring` | focus/ring | Color del focus ring en estado focused |
| `bnav/item/disabled/fg` | text/disabled | Color de ícono y label en disabled |
| `bnav/indicator/radius/sm` | radius/pill | Border-radius de la pill en Size=sm |
| `bnav/indicator/radius/md` | radius/pill | Border-radius de la pill en Size=md |
| `bnav/iconSize/sm` | iconSize/md | Tamaño del ícono en Size=sm (20px) |
| `bnav/iconSize/md` | iconSize/lg | Tamaño del ícono en Size=md (24px) |
| `bnav/label/fontSize/sm` | type/xs | Font-size del label en Size=sm (10px) |

### Spacing specs

```
NavItem Size=sm:
  height=56px · min-width=56px · padding-vertical=8px
  icon-size=20px · gap icon-label=4px
  active pill: 28×52px · radius=9999 (pill completa)
  badge offset: top=4px right=−6px
  label: font=10px/500w · lh=14px

NavItem Size=md:
  height=64px · min-width=64px · padding-vertical=12px
  icon-size=24px · gap icon-label=4px
  active pill: 32×64px · radius=9999 (pill completa)
  badge offset: top=4px right=−6px
  label: font=11px/500w · lh=16px

BottomNav container:
  height = NavItem height (56 o 64px)
  width=100% (spans viewport)
  border-top=1px solid border/default
  background=surface/default
  Safe area runtime: padding-bottom = env(safe-area-inset-bottom)

Distribución items:
  flex-direction=row · justify-content=space-around (o space-evenly)
  Cada item: flex=1

Focus ring:
  2px solid focus/ring (#253EC8)
  offset=2px desde el borde del NavItem
  radius=8px (sigue la forma del item, no del ícono)

Touch target mínimo:
  48×48dp (WCAG 2.5.5)
  La altura del item (56 o 64px) garantiza el mínimo vertical
  El ancho mínimo del item (1/N del viewport) garantiza el horizontal en la mayoría de viewports
```
