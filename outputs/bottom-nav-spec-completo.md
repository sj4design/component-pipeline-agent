# BottomNav

## Descripción general

BottomNav es la barra de navegación principal de aplicaciones mobile del sistema de diseño: una barra fija al fondo de la pantalla con 3–5 destinos de navegación. Cada item (NavItem) tiene un ícono obligatorio, un label opcional, y puede llevar un Badge para notificaciones. El estado activo se comunica mediante un pill indicator detrás del ícono — el patrón de Material Design 3 que reemplaza el tinting de color como único indicador, cumpliendo WCAG 1.4.1. Es el patrón estándar para navegación primary en apps mobile (viewport <768px).

```
Size=md, ItemCount=4 (con active indicator):
┌──────────────────────────────────────────────────────────┐
│  ┌──────┐           ┌──────┐                            │
│  │ [🏠] │   [💬]   │ [📅] │   [⚙]                   │  h:64px
│  └──────┘           └──────┘                            │
│  Inicio   Mensajes   Reuniones  Config                  │
└──────────────────────────────────────────────────────────┘
  active (pill detrás del ícono)

Con Badge:
│  ┌──────┐
│  │ [💬] │  ← ⚫ (badge dot sobre ícono)
│  └──────┘
│  Mensajes

NavItem states:
│  default:  ícono + label gris (text/secondary)           │
│  hover:    ícono + label oscuro + pill hover (sutil)     │
│  active:   ícono + label oscuro bold + pill azul         │
│  focused:  ring 2px exterior                             │
│  disabled: ícono + label gris claro                      │

ItemCount=3 (mínimo):
┌──────────────────────────────────────────────────────────┐
│          [🏠]          [💬]          [📅]               │  items más anchos
│         Inicio       Mensajes      Reuniones             │
└──────────────────────────────────────────────────────────┘

ItemCount=5 (máximo):
┌──────────────────────────────────────────────────────────┐
│  [🏠] [💬] [📅] [📁] [⚙]                              │  items más compactos
│  Inicio Chat Reuniones Archivos Config                    │
└──────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes en NavItem (building block):

```
State → default | hover | active | focused | disabled
Size  → sm | md
```

Variantes en BottomNav (composición):

```
Size      → sm | md
ItemCount → 3 | 4 | 5
```

Toggles en NavItem:

```
👁 Show Label         → muestra/oculta el label bajo el ícono (default: on)
👁 Has Badge          → muestra/oculta el Badge (default: off)
👁 Show Active Indicator → muestra/oculta el pill detrás del ícono (default: off)
```

Intercambio de ícono:

```
🔄 Icon        → ícono del destino (ej. icon/home)
🔄 Active Icon → ícono en estado active (ej. icon/home-filled)
🔄 Badge       → instancia de Badge (dot o count)
```

Texto editable:

```
✏️ Label → "Inicio"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  NavItem                                                 │
│  ──────────────────────────────────────────────────────  │
│  State  [ default         ▼ ]                            │
│  Size   [ md              ▼ ]                            │
│  ──────────────────────────────────────────────────────  │
│  👁 Show Label             [ on  ]                       │
│  👁 Has Badge              [ off ]                       │
│  👁 Show Active Indicator  [ off ]                       │
│  🔄 Icon          [ icon/home              ]             │
│  🔄 Active Icon   [ icon/home-filled       ]             │
│  🔄 Badge         [ Badge/dot              ]             │
│  ✏️ Label  [ Inicio                                ]     │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  BottomNav                                               │
│  ──────────────────────────────────────────────────────  │
│  Size       [ md              ▼ ]                        │
│  ItemCount  [ 4               ▼ ]                        │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Es navegación primary en una app mobile?
                    │
                    ▼
       ¿Viewport < 768px (mobile)?
       ├── Sí → BottomNav
       └── Desktop/tablet → Sidebar o Tabs
                    │
                    ▼
       ¿Cuántos destinos principales hay?
       ├── 3–5 → BottomNav (constraint M3)
       ├── <3 → Tabs (no suficientes para BottomNav)
       └── >5 → BottomNav con "More" (agrupa el resto)
```

**Usar BottomNav cuando:**
- Navegación principal de app mobile (Home, Chat, Meetings, Settings)
- 3–5 destinos principales y paralelos de igual jerarquía
- Los destinos se acceden frecuentemente durante una sesión
- El usuario necesita cambiar entre secciones sin perder el contexto

**NO usar BottomNav cuando:**
- Viewport ≥ 768px → usar `Sidebar` o `Tabs`
- Menos de 3 destinos → usar `Tabs` (más apropiado semánticamente)
- Los destinos son acciones (no navegación) → usar `Toolbar`
- Es navegación secundaria dentro de una sección → usar `Tabs`

---

## Variaciones visuales

### NavItem sizes

| Size | Alto total | Min Width | PaddingY | Gap icon/label | IconSize | Indicator H | Indicator W | FontSize |
|------|-----------|----------|---------|---------------|---------|------------|------------|---------|
| sm   | 56px      | 56px     | 8px     | 4px           | 20px    | 28px       | 52px       | 10px    |
| md   | 64px      | 64px     | 12px    | 4px           | 24px    | 32px       | 64px       | 11px    |

### BottomNav container

| Size | Alto | Border top | Shadow |
|------|------|-----------|--------|
| sm   | 56px | 1px border/default | shadow top |
| md   | 64px | 1px border/default | shadow top |

### States del NavItem

| State | Ícono/Label | Indicator | Label weight | Notas |
|-------|------------|-----------|-------------|-------|
| default | text/secondary (gris) | transparent | 500 | Estado base |
| hover | text/primary (oscuro) | surface/selected (azul tenue) | 500 | Hover de mouse |
| active | text/primary (oscuro) | brand/subtle (azul) | 600 | Destino activo |
| focused | text/primary (oscuro) | — | 600 | Focus ring 2px |
| disabled | text/disabled (gris claro) | transparent | 500 | No interactivo |

---

## Decisiones de diseño

**1. Active indicator pill (M3)** — M3 reemplazó el color-tint-only de M2 con pill shape detrás del ícono. Active state no depende solo de color (WCAG 1.4.1). El pill es un slot `activeIndicator` + boolean `Show Active Indicator`. El developer decide si mostrarlo siempre o solo en active.

**2. ItemCount como property explícita (3/4/5)** — constraint M3 de 3–5 items. Documentar en la API evita builds con 2 o 6 items accidentales. Property discreta genera frames para cada cantidad sin flexibilidad ambigua.

**3. Show Label default ON** — Google research: labels mejoran la comprensión del destino en un 75%. Default ON. Permitir OFF es opt-in documentado con la advertencia de que icon-only requiere `aria-label`. Evita crear una variante "icon-only" separada que fragmenta la consistencia.

**4. Active Icon como swap slot separado** — el ícono activo suele ser la versión "filled" del ícono default (home → home-filled, chat → chat-filled). Swap slot independiente para que el developer pueda asignar el ícono apropiado sin cambiar el ícono base.

**5. Badge como instancia de Badge component** — el Badge se asigna via instance swap (puede ser dot o count). El accesible name del NavItem debe incluir el count: "Mensajes, 3 sin leer" — no "Mensajes" + badge separado.

**6. Safe-area + hide-on-scroll documentados pero no modelados** — son comportamientos runtime (CSS `safe-area-inset-bottom`, scroll listeners), no propiedades Figma. El developer usa `env(safe-area-inset-bottom)` para el padding inferior en iPhones con notch.

### Combinaciones excluidas

```
(ninguna — Size × ItemCount no tiene exclusiones)
```

---

## Comportamiento

### Esencial para diseño

- **ItemCount estricto: 3–5** — nunca menos de 3 (usar Tabs) ni más de 5 (agrupar en "More"). M3 documenta este constraint como hard rule de usabilidad.
- **BottomNav es mobile-only** — viewport < 768px. En desktop el mismo nivel de navegación usa Sidebar o TabBar horizontal.
- **Items de ancho equitativo** — cada NavItem recibe el mismo ancho calculado como `containerWidth / itemCount`. No anchos variables por label length.
- **Estado active siempre visible** — exactamente un NavItem está en estado active en todo momento (la sección actual). No hay estado sin selección.
- **Safe-area inset** — en iPhones con Home Indicator, el BottomNav necesita `padding-bottom: env(safe-area-inset-bottom)` para que los items no queden bajo el indicator.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `role="navigation"` + `aria-label="Navegación principal"` | Landmark navegable; diferencia de otras `nav` |
| NavItem activo | `aria-current="page"` (link) o `aria-selected="true"` (tab) | SR anuncia el destino actual |
| NavItem con badge count | accessible name integrado: "Mensajes, 3 sin leer" | SR anuncia el count sin que el usuario busque el badge |
| Icon-only | `aria-label` en el NavItem | Sin label visual, SR necesita nombre |
| Disabled | `aria-disabled="true"` | SR anuncia que no es interactivo |
| Focus | ring 2px exterior al NavItem | El pill indicator no reemplaza al focus ring |

### Navegación por teclado

```
Tab           → navega entre NavItems
Enter/Space   → activa (navega al destino)
SR: "N de M"  → SR anuncia posición en la lista al entrar (semantics de lista implícita)
```

---

## Guía de contenido

**Label del NavItem:**
- 1 palabra máximo: "Inicio", "Chat", "Reuniones", "Archivos", "Config"
- Sustantivo (destino) no verbo (acción): "Inicio" no "Ir a inicio"
- Con ícono: el label refuerza el ícono — no duplicar con palabras diferentes

**Badge:**
- Count (número): solo en tabs con notificaciones numéricas ("3")
- Dot (sin número): para indicar actividad sin contar (nuevo contenido)
- Accesible name: "Mensajes, 3 sin leer" — integrar en el label accesible del item

**aria-label del container:**
- "Navegación principal" (si es la única `nav`)
- "Navegación de la app" (si hay otras navs en la página)

---

## Pre-build checklist

```
□ ¿role="navigation" + aria-label en el container?
□ ¿NavItem activo: aria-current="page" o aria-selected="true"?
□ ¿Has Badge: count integrado en el accessible name?
□ ¿Show Label=off: aria-label en cada NavItem?
□ ¿ItemCount: estrictamente 3, 4, o 5 items?
□ ¿Items de ancho equitativo (containerWidth / count)?
□ ¿Show Active Indicator: pill visible en active state?
□ ¿Active Icon: swap slot con ícono filled?
□ ¿Mobile-only: oculto en viewport ≥ 768px?
□ ¿Safe-area: padding-bottom: env(safe-area-inset-bottom)?
□ ¿Focus ring separado del active indicator?
□ ¿Exactamente un item activo en todo momento?
```

---

## Componentes relacionados

```
Tabs       → para navegación con 2–5 pestañas dentro de una sección
Sidebar    → para navegación primary en desktop/tablet
Toolbar    → para acciones (no navegación de destinos)
Badge      → para notificaciones en NavItems
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Active indicator | Safe-area | ItemCount | ARIA | Diferenciador |
|---------|-------|----------------|----------|----------|------|--------------|
| **Material Design 3** | NavigationBar | Pill animado | Sí | 3–5 | navigation | Pill con enter animation; active icon swap; M3 tokens |
| **Spectrum (Adobe)** | — | — | — | — | — | Sin componente mobile navigation |
| **Carbon (IBM)** | — | — | — | — | — | Sin componente mobile navigation |
| **Polaris (Shopify)** | — | — | — | — | — | Sin bottom nav (e-commerce patterns) |
| **Atlassian** | — | — | — | — | — | Sin componente mobile navigation |
| **Ant Design** | TabBar (antd-mobile) | Color tint | Sí | 2–5 | navigation | antd-mobile library separada; safeArea prop |
| **Twilio Paste** | — | — | — | — | — | Sin componente dedicado |
| **shadcn/ui** | — | — | — | — | — | Sin componente dedicado |
| **Chakra UI** | — | — | — | — | — | Sin componente dedicado |
| **Fluent 2** | TabList (mobile) | Underline | — | Flexible | tablist | Fluent UI React Native |
| **Mantine** | — | — | — | — | — | Sin componente dedicado |
| **Ionic Framework** | IonTabBar + IonTabButton | Tint + icon | Sí | 2–5 | tablist | Nativo mobile; iOS/Android theming |
| **NativeBase** | — | Color tint | — | — | — | React Native based |

**Patrones clave de la industria:**
1. **M3 NavigationBar pill indicator** — el mayor cambio de M2→M3: el active state dejó de ser solo color-tint para incluir un pill shape detrás del ícono. `indicatorColor` + `indicatorShape` tokens. Resuelve WCAG 1.4.1 para usuarios que no distinguen colores.
2. **antd-mobile TabBar** — el único T1 con componente mobile navigation nativo. `safeArea="bottom"` prop para iPhone notch. `onChange` callback. Por defecto usa `role="tablist"` — diferente al `role="navigation"` recomendado por ARIA.
3. **Ionic IonTabBar** — el más completo para mobile: gestiona Safe Area automáticamente, soporta iOS/Android theming diferenciado, integra con el router (tabs como historial separado).
4. **`aria-current="page"` vs `aria-selected`** — si los NavItems son links (`<a>`) que navegan a rutas distintas, usar `aria-current="page"`. Si son tabs que muestran panels en la misma página (sin navegación real), usar `aria-selected="true"`. La distinción afecta cómo el SR anuncia el estado.

---

## Tokens

**20 tokens** · prefijo `bnav-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `bnav/sm/h` | `sizing/56` | Altura BottomNav size sm |
| `bnav/md/h` | `sizing/64` | Altura BottomNav size md |
| `bnav/bg` | `surface/default` | Background de la barra |
| `bnav/borderTop` | `border/1` | Grosor del border top |
| `bnav/borderTopColor` | `border/default` | Color del border top |
| `bnav/item/default/iconFg` | `text/secondary` | Ícono/label estado default |
| `bnav/item/default/labelFg` | `text/secondary` | Label estado default |
| `bnav/item/hover/iconFg` | `text/primary` | Ícono/label hover |
| `bnav/item/hover/indicator` | `surface/selected` | Pill en hover |
| `bnav/item/active/iconFg` | `text/primary` | Ícono/label active |
| `bnav/item/active/labelFg` | `text/primary` | Label active |
| `bnav/item/active/indicator` | `brand/subtle` | Pill active (azul) |
| `bnav/item/active/fontWeight` | `type/weight-semibold` | Label active más bold |
| `bnav/item/focused/ring` | `focus/ring` | Focus ring del item |
| `bnav/item/disabled/fg` | `text/disabled` | Ícono/label disabled |
| `bnav/indicator/radius/sm` | `radius/pill` | Pill radius size sm |
| `bnav/indicator/radius/md` | `radius/pill` | Pill radius size md |
| `bnav/iconSize/sm` | `iconSize/md` | Tamaño ícono sm (20px) |
| `bnav/iconSize/md` | `iconSize/lg` | Tamaño ícono md (24px) |
| `bnav/label/fontSize/sm` | `type/xs` | Font size label sm (10px) |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  NavItem sm: h:56px · minW:56px · py:8px  · icon:20px   │
│  NavItem md: h:64px · minW:64px · py:12px · icon:24px   │
│                                                          │
│  Active Indicator sm: 28px × 52px · radius:pill         │
│  Active Indicator md: 32px × 64px · radius:pill         │
│                                                          │
│  Badge offset: top:4px · right:-6px (sobre el ícono)    │
│                                                          │
│  BottomNav: width:100% · items de ancho equitativo      │
│  Border top: 1px · shadow top                           │
│  Safe-area: padding-bottom: env(safe-area-inset-bottom) │
│                                                          │
│  Sub-componentes:                                        │
│  NavItem:   State(5) × Size(2) = 10 frames              │
│  BottomNav: Size(2) × ItemCount(3) = 6 frames           │
│                                                          │
│  Frames totales: 10 + 6 = 16 frames                     │
└──────────────────────────────────────────────────────────┘
```
