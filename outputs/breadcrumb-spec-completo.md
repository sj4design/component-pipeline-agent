# Breadcrumb

## Overview

El Breadcrumb es una lista horizontal de links que muestra la ruta jerárquica desde la raíz hasta la página actual. Es chromeless — sin fondo, borde ni sombra. El último item representa la página actual y no es interactivo.

```
  Home  /  Products  /  Category  /  Current Page
   ▶        ▶            ▶           (bold, no-link)
   link     link         link        aria-current="page"
```

Tiene dos piezas: el **Breadcrumb** (contenedor `<nav>` con `<ol>`) y el **.BreadcrumbItem** (cada item de la ruta con estados propios). Los separadores ("/" o ">") son internos y `aria-hidden` — decoración visual que el screen reader no anuncia.

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  (Breadcrumb no tiene variantes — es un contenedor chromeless)
```

Sub-componente .BreadcrumbItem:

```
  State       default · hover · focus · pressed          Interacción del link
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ Icon              Ícono leading en cada item                     4/21 consenso
  ☐ IsCurrent          Marca item como página actual (non-interactive) 18/21 consenso
  ☐ Ellipsis           Indicador de truncation "..." en paths largos   8/21 consenso
```

### Panel de propiedades en Figma

```
┌─ Breadcrumb ─────────────────────────┐
│                                      │
│  Boolean Properties                  │
│  ☐ Ellipsis                          │
│                                      │
└──────────────────────────────────────┘

┌─ .BreadcrumbItem ────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ State               ▼ default  │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Icon         ☐ IsCurrent          │
│                                      │
│  Text Properties                     │
│  ✏️ Label       [ Page          ]    │
│                                      │
│  Instance Swap                       │
│  ↳ Icon         [ 🏷 icon-name  ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
  ¿El usuario necesita orientación de ubicación?
  │
  ├─ Sitio con jerarquía de 3+ niveles → Breadcrumb ✓
  │
  ├─ App de un solo nivel (dashboard plano) → no necesita breadcrumb
  │
  ├─ Flujo transaccional (wizard/checkout) → usa Stepper, no Breadcrumb
  │
  ├─ Solo necesita "volver atrás" → usa botón Back
  │
  └─ Navegación entre hermanos del mismo nivel → usa Tabs o links
```

**Usa Breadcrumb cuando:**
- El sitio/app tiene jerarquía de contenido de 3+ niveles
- El usuario necesita saber dónde está en la estructura
- El usuario necesita navegar rápidamente a niveles superiores

**NO uses Breadcrumb cuando:**
- La navegación es plana (1-2 niveles) → redundante con la nav principal
- Es un flujo lineal (checkout, wizard) → usa Steps/Stepper (GOV.UK confirma)
- Solo hay una forma de llegar a la página → el botón Back es suficiente
- La jerarquía cambia dinámicamente → breadcrumbs estáticos confunden

---

## Variaciones visuales

### Path estándar

```
  Home  /  Products  /  Category  /  Current Page
   ▶        ▶            ▶           (bold, no-link)
```

### Con ellipsis (paths largos)

```
  Home  /  ...  /  Category  /  Current Page
   ▶      [▼]      ▶            (bold, no-link)
          │
          ├─ Level 2
          ├─ Level 3
          └─ Level 4
```

### Con ícono

```
  🏠 Home  >  📁 Products  >  📁 Category  >  Current Page
```

### Estados del .BreadcrumbItem

```
  default              hover                focus
  Products             Products             Products
  (link color azul)    (underline)          (ring 2px)

  pressed              IsCurrent=true
  Products             Current Page
  (fg más oscuro)      (bold, fg texto, no-link, no focusable)
```

---

## Decisiones de diseño

### 1. Chromeless — sin background, border ni shadow

21/21 sistemas implementan breadcrumb como una lista de links inline, transparente. No es un "contenedor" con chrome — es navegación secundaria que se integra en el layout sin peso visual. Esto lo diferencia de Tabs o Navbar.

### 2. IsCurrent como boolean en el item, no como State

El item de página actual no es interactivo — es texto bold sin link. IsCurrent=true excluye todos los estados de interacción (hover/focus/pressed). Es una condición binaria que cambia la naturaleza del item (link → texto), no un estado de interacción transitorio.

### 3. Sin variante de Size

17/21 sistemas tienen un solo tamaño de breadcrumb. El breadcrumb vive en una posición fija del layout (debajo del navbar, encima del contenido) y no necesita escalar. Solo Spectrum (S/M) y Fluent 2 (S/M/L) ofrecen tamaños — para contextos densos (sidebars) que no son nuestro caso de uso primario.

### 4. Separador interno, no configurable

Los separadores ("/" o ">") son `aria-hidden` — decoración visual. 21/21 sistemas los ocultan de assistive technology. No los exponemos como prop configurable porque la inconsistencia cross-producto no justifica la complejidad.

### 5. Ellipsis manual, no auto-collapse

Spectrum implementa auto-collapse que detecta overflow automáticamente. Atlassian usa `maxItems` explícito. Elegimos un boolean `hasEllipsis` que el diseñador activa cuando el path es largo — el auto-collapse es comportamiento runtime que el código resuelve.

### Combinaciones excluidas

```
  IsCurrent=true + hover/focus/pressed     current page es non-interactive
  IsCurrent=true + disabled                current page no puede estar disabled
  disabled + hover/focus/pressed           disabled bloquea interacción
```

---

## Comportamiento

### Lo esencial para diseñar

1. **El último item es texto, no link.** `aria-current="page"` + texto non-interactive. Navegar a donde ya estás es un anti-pattern. 18/21 sistemas coinciden.

2. **Separadores son decoración.** `aria-hidden="true"` — screen readers leen la lista y entienden la jerarquía sin ellos. Anunciar "slash" entre cada item sería ruido.

3. **Cada item es un tab stop independiente.** A diferencia de Tabs o RadioGroup, breadcrumb items son links individuales con Tab navigation normal. No necesitan arrow keys ni roving tabindex.

4. **El breadcrumb es una lista ordenada.** `<nav>` > `<ol>` > `<li>` > `<a>` — la lista ordenada comunica jerarquía. Usar `<ul>` sería semánticamente incorrecto.

5. **Ellipsis para paths > 4 niveles.** Los items intermedios se colapsan a "..." para mantener el breadcrumb en una línea. El root y los últimos items permanecen visibles.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Container | `navigation` | `aria-label="Breadcrumb"` | SR identifica como navegación secundaria |
| Lista | — | `<ol>` (ordered list) | SR anuncia la jerarquía como lista ordenada |
| Item (link) | `link` | `href` | SR anuncia como link navegable |
| Item (current) | — | `aria-current="page"` | SR anuncia "página actual" |
| Separador | — | `aria-hidden="true"` | SR no anuncia decoración visual |

### Navegación por teclado

Interacciones principales (afectan el diseño):

```
  Tab                   navega al siguiente item link
  Shift+Tab             navega al item link anterior
  Enter                 activa el link (navega a esa página)
```

Interacciones secundarias (referencia para dev):

```
  IsCurrent=true        item se salta en tab order (no es focusable)
  Ellipsis trigger      si es dropdown, Enter lo abre
```

---

## Guía de contenido

**Labels de items:** Nombres de sección/página cortos. "Productos", "Categoría", "Dashboard" — no URLs ni identificadores técnicos.

**Truncación de texto largo:** Si un item tiene nombre largo ("Acme Corporation West Coast Division"), truncar con ellipsis y mostrar tooltip con texto completo (Lightning pattern).

**Root item:** Siempre incluir un item raíz reconocible. "Home", "Inicio", o el nombre de la app.

**Cantidad de items:** Ideal 3-5 items. Más de 5 → activar ellipsis. Menos de 2 → el breadcrumb es redundante.

**Consistencia con la nav:** Los labels del breadcrumb deben coincidir con los labels de la navegación principal.

---

## Checklist antes de construir

```
  ☐ ¿La jerarquía tiene 3+ niveles?
    └─ Si no → el breadcrumb probablemente es innecesario

  ☐ ¿El path puede tener más de 5 niveles?
    └─ Si sí → activar hasEllipsis

  ☐ ¿Los items necesitan ícono?
    └─ File browsers, navegación visual → activar hasIcon
    └─ Standard web → sin ícono (más limpio)

  ☐ ¿El current page item es texto (no link)?
    └─ Siempre → IsCurrent=true, no focusable

  ☐ ¿Separador: slash o chevron?
    └─ Audiencia técnica → "/" (path convention)
    └─ Audiencia general → ">" o ChevronRight icon

  ☐ ¿Complementa al sidebar o navbar?
    └─ Breadcrumb = orientación, no reemplazo de nav principal
```

---

## Relación con otros componentes

```
  Navbar         Breadcrumb vive debajo del navbar, no dentro
  Sidebar        Complementario — sidebar muestra toda la nav, breadcrumb muestra la ruta
  Tabs           Para navegación dentro de una página, no entre páginas
  Steps          Para flujos lineales (wizard), no jerarquías de contenido
  Back Button    Para "volver atrás" simple sin contexto de ruta
```

---

## Referencia: cómo lo hacen otros sistemas

**Auto-collapse responsive:**
- Spectrum: detecta overflow automáticamente, colapsa items intermedios a dropdown.
- Atlassian: `maxItems` + `itemsBeforeCollapse` / `itemsAfterCollapse` para control explícito.

**Mobile collapse:**
- GOV.UK: `collapseOnMobile` muestra solo el parent directo. Máximo ahorro de espacio.
- Orbit: colapsa a "previous + current" en mobile.

**Navegación lateral (siblings):**
- Ant Design: dropdown menus en cada item para navegar entre hermanos del mismo nivel. Único entre 21 sistemas.

**Consenso universal (21/21):**
- `<nav aria-label="Breadcrumb">` con `<ol>`
- `aria-current="page"` en item actual
- Separadores `aria-hidden="true"`
- Items son links independientes (Tab navigation)

---

## Tokens

**18 tokens** · prefijo `brc-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--brc-item-fg` | `interactive/default` | Color de link (default) |
| `--brc-item-fg-hover` | `interactive/hover` | Color de link en hover |
| `--brc-item-fg-pressed` | `interactive/pressed` | Color de link presionado |
| `--brc-item-fg-current` | `text/label` | Texto de página actual (bold) |
| `--brc-item-fg-disabled` | `text/disabled` | Item deshabilitado |
| `--brc-separator-fg` | `text/subtlest` | Color del separador |
| `--brc-focus-ring` | `border/focus` | Focus ring (2px) |
| `--brc-font-size` | `font/size/sm` | Tamaño de texto (14px) |
| `--brc-font-weight-current` | `font/weight/semibold` | Peso del item actual |

### Specs de spacing

```
  ┌─ breadcrumb ───────────────────────────────────────┐
  │                                                    │
  │  [🏠] ←6→ [Home] ←8→ / ←8→ [Products] ←8→ / ←8→ [Current]
  │                                                    │
  └────────────────────────────────────────────────────┘

  item height:       20px (hug)
  item padding:      0px (chromeless)
  gap icon↔label:    6px
  gap item↔separator: 8px
  separator:         "/" o ">" (aria-hidden)
  font-size:         14px
  font-weight:       400 (links) · 600 (current)
  focus ring:        2px offset 2px
```
