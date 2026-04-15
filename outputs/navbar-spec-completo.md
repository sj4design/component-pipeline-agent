# Navbar

## Overview

El Navbar es la barra de navegación horizontal principal de la aplicación. Contiene logo, links de navegación, búsqueda, acciones globales y avatar de usuario. Es fixed/sticky en la parte superior y colapsa a hamburger en mobile.

```
  ┌──────────────────────────────────────────────────────────┐
  │ [Logo]  Link  Link  Link  Link     [🔍]  [🔔]  [👤]  [☰]│
  └──────────────────────────────────────────────────────────┘
     ↑        ↑                          ↑     ↑     ↑     ↑
    swap   .NavItem                   search actions avatar hamburger
    (logo)  (active=underline)       (toggle)(toggle)(toggle)(toggle)
```

Tiene dos piezas: el **Navbar** (barra contenedora) y el **.NavItem** (item de navegación con estados propios). El Navbar es un shell de composición sin variantes propias — toda la configuración se hace con booleans y slots.

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  (Navbar no tiene variantes propias — es un shell de composición)
```

Sub-componente .NavItem:

```
  State     default · hover · focus · pressed · active · disabled    Interacción
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Logo               Logo de la aplicación                       18/18 consenso
  ☐ Search             Campo de búsqueda integrado                  10/18 consenso
  ☑ Avatar             Avatar de usuario + menú                     16/18 consenso
  ☐ Actions            Íconos de acciones globales (notif, help)    16/18 consenso
  ☐ Hamburger          Toggle para mobile/drawer                    14/18 consenso
```

### Panel de propiedades en Figma

```
┌─ Navbar ─────────────────────────────┐
│                                      │
│  Boolean Properties                  │
│  ☑ Logo          ☐ Search            │
│  ☑ Avatar        ☐ Actions           │
│  ☐ Hamburger                         │
│                                      │
│  Instance Swap                       │
│  ↳ Logo       [ 🏷 logo-icon    ]   │
│                                      │
└──────────────────────────────────────┘

┌─ .NavItem ───────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ State               ▼ default  │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Icon                              │
│                                      │
│  Text Properties                     │
│  ✏️ Label       [ Nav Item      ]   │
│                                      │
│  Instance Swap                       │
│  ↳ Icon         [ 🏷 icon-name  ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
  ¿Tu app necesita navegación horizontal persistente?
  │
  ├─ Sí, con 3-7 secciones top-level → Navbar ✓
  │
  ├─ Navegación profunda (sub-menus anidados) → Sidebar vertical
  │
  ├─ Solo acciones, sin links de nav → Toolbar
  │
  ├─ Navegación mobile con 3-5 destinos → Bottom Navigation (M3)
  │
  └─ Landing page con CTA prominente → Header de marketing (no Navbar de app)
```

**Usa Navbar cuando:**
- La app tiene 3-7 secciones principales de navegación
- El layout es horizontal-first (desktop-first o web responsive)
- El navbar complementa un sidebar (actions en top, nav en side)

**NO uses Navbar cuando:**
- La navegación es profunda y jerárquica → usa Sidebar
- Solo necesitas acciones sin links → usa Toolbar
- Es una app mobile-first → considera Bottom Navigation
- Tienes más de 8 links de navegación → usa Sidebar

---

## Variaciones visuales

### Patrones de layout

```
  Standard (links + actions):
  ┌──────────────────────────────────────────────────────────┐
  │ [Logo]  Link  Link  Link  Link          🔍  🔔  👤      │
  └──────────────────────────────────────────────────────────┘

  Search-centered (Polaris/Lightning):
  ┌──────────────────────────────────────────────────────────┐
  │ [Logo]     [_________ Search _________]      🔔  👤     │
  └──────────────────────────────────────────────────────────┘

  Actions-only (sidebar nav):
  ┌──────────────────────────────────────────────────────────┐
  │ ☰  [Logo]                                🔔  ⚙️  👤     │
  └──────────────────────────────────────────────────────────┘
```

### Estados del .NavItem

```
  default              hover                focus
  Link                 Link                 Link
                       ────                 ╔════╗
                       bg sutil o underline  ring 2px

  active               pressed              disabled
  Link                 Link                 Link
  ════                 ────                 opacity 50%
  indicador 2px azul   bg más oscuro        no interactivo
  (bottom border)
```

---

## Decisiones de diseño

### 1. Navbar como shell de composición sin variantes propias

El Navbar es un contenedor horizontal que organiza slots (logo, nav-items, search, actions, avatar, hamburger). No tiene variantes de aspecto propias — toda la configuración es con booleans que muestran/ocultan regiones. Esto resulta en 1 frame neto.

### 2. .NavItem con 6 estados incluyendo active

Active es el estado más importante — indica la página actual con un indicador bottom border de 2px azul. Todos los 14 sistemas con nav items horizontales coinciden en que el active state es esencial. A diferencia del sidebar (borde lateral), el navbar usa un indicador inferior que sigue la convención de tabs horizontales.

### 3. Sin variantes de Size

El navbar es full-width por definición (1280px default). No tiene sentido tener múltiples tamaños. La responsividad se maneja con el toggle de hamburger que colapsa los nav items a un drawer. Carbon, Atlassian y la mayoría de sistemas confirman: el navbar tiene una sola altura (56px es la más común).

### 4. Search como boolean, no como componente separado

10/18 sistemas integran search en el header. Polaris y Lightning lo hacen el elemento dominante central. M3 lo mantiene separado. Como boolean toggle, el diseñador decide si el navbar de su proyecto incluye búsqueda o no, sin multiplicar frames.

### 5. Skip-to-content como requisito

Carbon, GOV.UK, Paste y Nord implementan un skip link como primer elemento focusable. Es WCAG 2.4.1 Level A — no opcional. Los usuarios de teclado deben poder saltar la navegación repetitiva del navbar.

### Combinaciones excluidas

```
  .NavItem: disabled + hover/focus/pressed    no reacciona a interacción
  .NavItem: disabled + active                 item deshabilitado no puede ser página actual
```

---

## Comportamiento

### Lo esencial para diseñar

1. **Logo a la izquierda, acciones a la derecha.** 18/18 sistemas coinciden. Es una convención tan universal que romperla causa desorientación. El logo linkea a la página principal.

2. **Active indicator = "estás aquí".** `aria-current="page"` en el NavItem activo. El underline/indicator bottom de 2px azul es visible y distinguible del hover.

3. **Responsive = hamburger collapse.** 14/18 sistemas colapsan los nav items a un hamburger en mobile que abre un drawer. El drawer necesita focus trap y Escape para cerrar.

4. **Avatar + dropdown para user menu.** 16/18 sistemas usan un avatar circular que abre un dropdown con acciones de cuenta (perfil, settings, logout). Comunica "alguien está logueado" sin ocupar espacio con texto.

5. **Nav items son links, no buttons.** Los items de navegación son semánticamente links (`<a>`) que llevan a páginas. Buttons ejecutan acciones. Esta distinción importa para a11y y SEO.

6. **Fixed/sticky por default.** 14/18 sistemas posicionan el navbar como fixed o sticky. Los usuarios esperan acceso permanente a la navegación sin scrollear.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Navbar | `navigation` | `aria-label="Main navigation"` | SR identifica como landmark de navegación |
| Nav item (link) | `link` | `aria-current="page"` si activo | SR anuncia "página actual" |
| Hamburger | `button` | `aria-expanded`, `aria-controls` | SR anuncia estado del drawer |
| Container | `banner` | `role="banner"` o `<header>` | SR identifica como header global |
| Skip link | `link` | Primer focusable, oculto visualmente | Usuarios teclado saltan la nav repetitiva |

### Navegación por teclado

Interacciones principales (afectan el diseño):

```
  Tab                   navega entre logo, nav items, search, actions, avatar
  Enter                 activa link o botón
  Escape                cierra dropdown abierto (user menu, notificaciones)
```

Interacciones secundarias (referencia para dev):

```
  Skip link (Tab)       primer Tab salta a contenido principal
  → ← (en dropdown)    navega dentro de mega-menus si los hay
```

---

## Guía de contenido

**Nav items:** Sustantivos cortos. "Productos", "Precios", "Documentación" — no "Ver nuestros productos".

**Máximo 7 items visibles.** Más de 7 links horizontales causa scanning overhead. Agrupar en dropdowns o mover a sidebar.

**Logo:** Clickeable, lleva a home. No necesita aria-label si el texto es legible. Si es solo ícono, agregar `aria-label="Home"`.

**Search placeholder:** "Buscar..." o "Buscar productos, pedidos..." — contextualizar al dominio.

**Acciones:** Solo íconos con tooltips descriptivos. Notificaciones, ayuda, settings — máximo 3 visibles.

---

## Checklist antes de construir

```
  ☐ ¿Cuántos nav items?
    └─ Más de 7 → mover items a dropdown o sidebar
    └─ Menos de 3 → considerar si navbar es necesario

  ☐ ¿Search es la navegación primaria?
    └─ Si sí → search-centered layout (Polaris pattern)

  ☐ ¿Hay sidebar complementario?
    └─ Si sí → navbar solo para logo + actions (actions-only pattern)

  ☐ ¿Cómo se comporta en mobile?
    └─ Hamburger + drawer con focus trap

  ☐ ¿Skip-to-content link implementado?
    └─ Obligatorio (WCAG 2.4.1 Level A)

  ☐ ¿Navbar fixed o sticky?
    └─ Default: fixed · Scroll-responsive solo si es content-heavy mobile
```

---

## Relación con otros componentes

```
  Sidebar        Complementario — nav vertical con más profundidad
  Tabs           Para navegación de contenido dentro de una página
  Menu           Para acciones dropdown, no navegación
  Breadcrumb     Muestra ruta actual debajo del navbar
  Avatar         Reutilizado dentro del navbar para user menu
  Search         Reutilizado como slot del navbar si hasSearch=true
```

---

## Referencia: cómo lo hacen otros sistemas

**Shell de aplicación completo:**
- Carbon: UI Shell — Header controla SideNav, HeaderPanel flyouts, skip-to-content.
- Polaris: TopBar dentro de Frame — search-first, sin nav links horizontales.
- Mantine: AppShell.Header — coordinación automática con Navbar (sidebar).

**Composición vs componente:**
- Carbon, Atlassian: componente dedicado con API definida.
- Spectrum, shadcn, Chakra: receta de composición desde primitivos.

**Search como ciudadano de primera clase:**
- Polaris: search es el elemento dominante central del TopBar.
- Lightning: search central con autocompletar para registros CRM.
- M3: Search Bar es componente separado.

**Consenso universal (18/18):**
- Logo izquierda, acciones derecha
- Responsive = hamburger collapse
- Skip-to-content link
- Avatar + dropdown para user menu

---

## Tokens

**25 tokens** · prefijo `nav-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--nav-bg` | `bg/surface/default` | Fondo del navbar |
| `--nav-border` | `border/mid/default` | Borde inferior separador |
| `--nav-height` | `56` | Altura del navbar |
| `--nav-item-fg` | `text/label` | Texto del nav item |
| `--nav-item-fg-hover` | `text/label` | Texto en hover |
| `--nav-item-fg-active` | `interactive/default` | Texto item activo |
| `--nav-item-fg-disabled` | `text/disabled` | Item deshabilitado |
| `--nav-item-bg-hover` | `bg/surface/hover` | Background en hover |
| `--nav-indicator` | `interactive/default` | Indicador bottom del active (2px) |
| `--nav-icon-fg` | `icon/secondary` | Íconos de acciones |
| `--nav-focus-ring` | `border/focus` | Focus ring (2px) |

### Specs de spacing

```
  ┌─ navbar (1280 x 56px) ─────────────────────────────────────┐
  │                                                            │
  │  ←16→ [logo 24] ←16→ [NavItem] ←8→ [NavItem] ←→         │
  │                                        [🔍] ←8→ [🔔] ←8→ [👤] ←16→
  │       ↕ 0 (py)                                      ↕ 0   │
  │                                                            │
  └────────────────────────────────────────────────────────────┘

  navbar height:    56px
  navbar width:     full-width (1280px default)
  navbar padding:   0 vertical · 16px horizontal
  nav item height:  40px
  nav item padding: 8px vertical · 12px horizontal
  nav item radius:  6px
  gap entre items:  8px
  gap icon↔label:   8px
  active indicator: 2px bottom border
  border bottom:    1px
```
