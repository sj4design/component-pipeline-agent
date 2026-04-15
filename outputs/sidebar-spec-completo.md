# Sidebar

## Overview

El Sidebar es un panel de navegación vertical lateral que contiene los links principales de la aplicación. Soporta dos estados: expandido (ícono + label, 260px) y colapsado (solo ícono, 64px). Cada item puede tener ícono, texto, badge y chevron para sub-items.

```
  ┌──────────────────────┐
  │ ┌──────────────────┐ │   ← header (logo, app name)
  │ │  LOGO  App Name  │ │
  │ └──────────────────┘ │
  │──────────────────────│
  │ MAIN                 │   ← section heading
  │ ● 🏠 Dashboard       │   ← .SidebarItem (active)
  │ ○ 📦 Products    [3] │   ← con badge
  │ ○ 📊 Analytics       │
  │ ○ 📧 Messages   [12] │
  │──────────────────────│
  │ SETTINGS             │   ← section heading
  │ ○ ⚙️ General         │
  │ ○ 👤 Account      ▶  │   ← con chevron (nested)
  │──────────────────────│
  │ ┌──────────────────┐ │   ← footer
  │ │ 👤 User  ⚙️      │ │
  │ └──────────────────┘ │
  └──────────────────────┘
```

Tiene dos piezas: el **Sidebar** (panel contenedor) y el **.SidebarItem** (item de navegación con estados propios). El Sidebar gestiona el estado expandido/colapsado; cada item gestiona su propia interacción.

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  SidebarState    expanded · collapsed                    Panel completo o solo íconos
```

Sub-componente .SidebarItem:

```
  State           default · hover · focus · pressed · active · disabled    Interacción
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Header             Logo y nombre de app                              12/18 consenso
  ☐ Footer             Contenido inferior (avatar, settings)             10/18 consenso
  ☐ Search             Campo de búsqueda en el sidebar                    6/18 consenso
  ☑ Icon               Ícono leading en cada item                        16/18 consenso
  ☐ Badge              Contador/notificación en items                     8/18 consenso
  ☐ Chevron            Indicador de sub-items expandibles                10/18 consenso
```

### Panel de propiedades en Figma

```
┌─ Sidebar ────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ SidebarState        ▼ expanded │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Header        ☐ Footer            │
│  ☐ Search                            │
│                                      │
└──────────────────────────────────────┘

┌─ .SidebarItem ───────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ State               ▼ default  │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Icon         ☐ Badge              │
│  ☐ Chevron      ☐ Active             │
│                                      │
│  Text Properties                     │
│  ✏️ Label       [ Menu Item     ]    │
│  ✏️ Badge       [ 3             ]    │
│                                      │
│  Instance Swap                       │
│  ↳ Icon         [ 🏷 icon-name  ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
  ¿Cómo es la navegación de tu app?
  │
  ├─ 5+ secciones principales, app persistente → Sidebar ✓
  │
  ├─ 2-4 secciones top-level sin profundidad → Navbar horizontal
  │
  ├─ Mobile-first con 3-5 destinos → Bottom Navigation
  │
  ├─ Navegación de contenido (blog, docs) → Table of Contents
  │
  └─ Acciones contextuales → Menu (overlay, no persistente)
```

**Usa Sidebar cuando:**
- La app tiene 5+ secciones de navegación principal
- Necesitas indicar visualmente la sección activa ("estás aquí")
- Hay jerarquía de navegación (secciones con sub-items)
- Es una aplicación web persistente (dashboard, admin, SaaS)

**NO uses Sidebar cuando:**
- Es un sitio web simple (landing, blog) → usa Navbar
- La navegación es plana con 2-3 opciones → usa Tabs o Navbar
- Es mobile-first → considera Bottom Navigation (M3) o hamburger + drawer
- Es un flujo transaccional lineal (wizard) → usa Steps/Stepper

---

## Variaciones visuales

### Expanded vs Collapsed

```
  expanded (260px)                     collapsed (64px)
  ┌──────────────────────┐             ┌──────┐
  │ ● 🏠 Dashboard       │             │ [🏠] │
  │ ○ 📦 Products    [3] │             │ [📦] │
  │ ○ 📊 Analytics       │             │ [📊] │
  │ ○ ⚙️ Settings        │             │ [⚙️] │
  └──────────────────────┘             └──────┘
  íconos + labels + badges             solo íconos (tooltip en hover)
```

### Estados del .SidebarItem

```
  default              hover                focus
  ○ 📦 Products        ○ 📦 Products        ○ 📦 Products
                        bg gris sutil        ring 2px azul

  active               pressed              disabled
  ● 🏠 Dashboard       ○ 📦 Products        ░ ⚙️ Settings
  bg azul + fg azul    bg gris más oscuro   opacity 50%
  indicador lateral 3px
```

### Con sub-items expandidos

```
  ┌──────────────────────┐
  │ ○ 📦 Products      ▼ │   ← chevron rotado
  │    ○ Catálogo        │   ← sub-item indentado
  │    ● Inventario      │   ← sub-item activo
  │    ○ Precios         │
  │ ○ 📊 Analytics       │
  └──────────────────────┘
```

---

## Decisiones de diseño

### 1. Un componente con estado, no dos componentes separados

M3 separa Navigation Drawer y Navigation Rail como componentes distintos — el rail no es un "drawer colapsado" sino un componente con reglas diferentes. 12/18 sistemas eligen el enfoque opuesto: un solo componente con `isCollapsed` prop. Elegimos un solo componente porque la transición expanded/collapsed es continua y ambos estados comparten la misma estructura de items.

### 2. .SidebarItem como sub-componente con 6 estados

Cada item tiene 6 estados de interacción (default, hover, focus, pressed, active, disabled). Active es el más crítico — indica "estás aquí" con bg azul + texto azul + indicador lateral de 3px. 18/18 sistemas coinciden en que el active state es esencial para orientación del usuario.

### 3. Badge como toggle, no como componente separado

8/18 sistemas tienen badges built-in en items de navegación (Polaris, Gestalt, Mantine). Los badges comunican información cuantitativa (inbox: 5, pedidos: 12) sin requerir navegación para descubrirla. Boolean `hasBadge` off por default — se activa cuando el item tiene datos cuantitativos relevantes.

### 4. Collapsed = 64px con tooltips obligatorios

Cuando el sidebar colapsa a solo íconos, cada item DEBE retener un label accesible via `aria-label` o tooltip visible. Testing muestra que 40%+ de implementaciones custom fallan en esto. Carbon usa 48px (rail), M3 usa 80dp. 64px es un balance entre densidad y target táctil.

### 5. Un solo tamaño de item (40px)

Los items de navegación viven dentro del sidebar — no necesitan tamaños independientes como un botón standalone. Alto fijo de 40px con font 14px cubre el caso de uso universal.

### Combinaciones excluidas

```
  disabled + hover/focus/pressed     no reacciona a interacción (18/18 universal)
  disabled + active                  item deshabilitado no puede ser página actual
  collapsed + search visible         search se oculta al colapsar (10/18)
  collapsed + footer visible         footer se oculta al colapsar (8/18)
```

---

## Comportamiento

### Lo esencial para diseñar

1. **Active indicator = "estás aquí".** `aria-current="page"` en el item activo. 18/18 sistemas coinciden. El indicador visual (bg azul + borde lateral) es la señal más importante del sidebar.

2. **Collapsed = tooltips obligatorios.** Cuando el sidebar muestra solo íconos, cada ícono debe tener tooltip con el nombre de la sección. Sin esto, usuarios de screen reader no saben dónde están.

3. **Chevron indica expandibilidad.** Los items con sub-items muestran un chevron que rota al expandir. `aria-expanded` comunica el estado al screen reader.

4. **Focus management al colapsar.** Cuando el sidebar transiciona entre expanded/collapsed, el foco debe mantenerse en el trigger de colapso o en el item activo — nunca perderse al `<body>`.

5. **En mobile, el sidebar se convierte en overlay.** El sidebar persistente no cabe en viewports pequeños. Se oculta y se activa con un hamburger trigger. El overlay necesita focus trap y Escape para cerrar.

6. **Tab entra, flechas navegan.** Tab mueve el foco al sidebar como región. Dentro, las flechas navegan entre items (roving tabindex). Enter activa el link.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Sidebar | `navigation` | `aria-label="Main navigation"` | SR identifica como landmark de navegación |
| Item (link) | `link` | `aria-current="page"` si activo | SR anuncia "página actual" |
| Item (nested) | `treeitem` | `aria-expanded`, `aria-level` | SR anuncia jerarquía y estado expandido |
| Sidebar (mobile) | `dialog` | `aria-modal="true"` | SR anuncia overlay modal con focus trap |
| Item (collapsed) | — | `aria-label` o tooltip | SR anuncia nombre cuando label no es visible |

### Navegación por teclado

Interacciones principales (afectan el diseño):

```
  Tab                   foco entra al sidebar
  ↓ ↑                   navega entre items (roving tabindex)
  Enter                 activa link / expande nested
  → (en item nested)    expande sub-items
  ← (en sub-item)       colapsa sub-items, foco al padre
```

Interacciones secundarias (referencia para dev):

```
  Home / End            primer / último item
  Escape (mobile)       cierra sidebar overlay
  Ctrl+B                toggle collapse (shadcn pattern)
```

---

## Guía de contenido

**Labels de items:** Sustantivos o frases nominales cortas. "Dashboard", "Productos", "Configuración" — no "Ir a productos" ni "Ver configuración".

**Section headings:** Categorías en mayúsculas o small caps. "PRINCIPAL", "CONFIGURACIÓN" — agrupan sin ser interactivos.

**Badges:** Solo números o texto muy corto. "3", "12", "Nuevo" — no oraciones.

**Header:** Logo + nombre de app. El nombre debe ser reconocible truncado a 2-3 sílabas para el estado colapsado.

**Footer:** Avatar + nombre de usuario o solo ícono de settings. Información de identidad, no navegación principal.

---

## Checklist antes de construir

```
  ☐ ¿Cuántas secciones de navegación?
    └─ Menos de 5 → considerar Navbar horizontal
    └─ Más de 20 → agrupar con section headings

  ☐ ¿Necesita estado colapsado?
    └─ Si sí → verificar tooltips en íconos

  ☐ ¿Hay sub-items?
    └─ Si sí → activar chevron + configurar nesting (max 2 niveles)

  ☐ ¿Items necesitan badges?
    └─ Si sí → activar hasBadge en items con datos cuantitativos

  ☐ ¿Cómo se comporta en mobile?
    └─ Overlay con hamburger trigger + focus trap

  ☐ ¿Hay header y footer?
    └─ Header = logo/app name · Footer = user info/settings
```

---

## Relación con otros componentes

```
  Navbar         Complementario — navbar horizontal + sidebar vertical
  Menu           Para acciones contextuales overlay, no navegación persistente
  Tabs           Para navegación de contenido dentro de una página
  Breadcrumb     Muestra la ruta actual; complementa al sidebar
  Bottom Nav     Alternativa mobile al sidebar (M3 Navigation Bar)
```

---

## Referencia: cómo lo hacen otros sistemas

**Dos componentes vs uno:**
- M3: Navigation Drawer + Navigation Rail separados. El rail tiene su propia densidad y FAB slot.
- Carbon, Spectrum, Ant: un solo componente con prop `isCollapsed`/`isRail`.

**Drill-down vs inline expand:**
- Atlassian: NestingItem desliza a una vista nueva (drill-down). Escala a profundidad arbitraria.
- Spectrum, Carbon: expansión inline tipo acordeón. Funciona para 2-3 niveles.

**Badges como feature first-class:**
- Polaris, Gestalt: badges integrados en el API del item.
- Atlassian, Spectrum: composición — sin badge built-in.

**Consenso universal (18/18):**
- `role="navigation"` + `aria-label`
- `aria-current="page"` en item activo
- Ícono + label como patrón base
- Chevron indica expandibilidad

---

## Tokens

**28 tokens** · prefijo `sdb-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--sdb-bg` | `bg/surface/default` | Fondo del sidebar |
| `--sdb-border` | `border/mid/default` | Borde derecho separador |
| `--sdb-width-expanded` | `260` | Ancho expandido |
| `--sdb-width-collapsed` | `64` | Ancho colapsado |
| `--sdb-item-bg-hover` | `bg/surface/hover` | Item en hover |
| `--sdb-item-bg-pressed` | `bg/surface/pressed` | Item presionado |
| `--sdb-item-bg-active` | `bg/interactive/subtle` | Item activo |
| `--sdb-item-fg` | `text/label` | Texto del item |
| `--sdb-item-fg-active` | `interactive/default` | Texto item activo |
| `--sdb-item-fg-disabled` | `text/disabled` | Item deshabilitado |
| `--sdb-indicator` | `interactive/default` | Indicador lateral activo (3px) |
| `--sdb-badge-bg` | `bg/interactive/subtle` | Fondo del badge |
| `--sdb-badge-fg` | `interactive/default` | Texto del badge |
| `--sdb-heading-fg` | `text/subtlest` | Texto section heading |
| `--sdb-divider` | `border/subtle` | Color del divider |

### Specs de spacing

```
  ┌─ sidebar (expanded 260px) ─────────────────────┐
  │  ↕ 16 (py)                                     │
  │  ┌─ header ──────────────────────────────────┐  │
  │  │ ←12→ [logo 24px] ←8→ [App Name]    ←12→  │  │
  │  └───────────────────────────────────────────┘  │
  │  ↕ 4 (gap entre items)                         │
  │  ┌─ .SidebarItem ───────────────────────────┐  │
  │  │ ←12→ [icon 20] ←8→ [label] ←→ [badge] ←12→│ │
  │  │       ↕ 8 (py)                      ↕ 8  │  │
  │  └───────────────────────────────────────────┘  │
  │  ┌─ .SidebarItem (active) ──────────────────┐  │
  │  │▌←12→ [icon 20] ←8→ [label]         ←12→ │  │
  │  │▌      ↕ 8                           ↕ 8  │  │
  │  └───────────────────────────────────────────┘  │
  │  ↕ 16 (py)                                     │
  └─────────────────────────────────────────────────┘

  item height:      40px
  item padding:     8px vertical · 12px horizontal
  item radius:      6px
  gap entre items:  4px
  gap icon↔label:   8px
  indicator width:  3px (active state)
  sidebar padding:  16px vertical · 12px horizontal
  border right:     1px
```
