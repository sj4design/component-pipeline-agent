# Drawer

## Overview

El Drawer es un panel que se desliza desde el borde de la pantalla para mostrar contenido secundario — formularios, detalles, filtros — sin perder el contexto de la pagina principal. Tiene tres regiones fijas: header (titulo + cierre), body (contenido scrollable) y footer (acciones). Un overlay oscurece el fondo para comunicar que el contenido principal esta inactivo.

```
  ┌───────────────────────────┐
  │         MAIN CONTENT      │┌────────────────────────┐
  │                           ││ Title            [✕]   │  ← .DrawerHeader
  │    ░░░░░░░░░░░░░░░░      ││────────────────────────│
  │    ░░░ OVERLAY ░░░░      ││                        │
  │    ░░░░░░░░░░░░░░░░      ││     Contenido          │  ← .DrawerBody
  │                           ││     scrollable         │     (scroll)
  │                           ││                        │
  │                           ││────────────────────────│
  │                           ││ [Cancelar]    [Guardar]│  ← .DrawerFooter
  └───────────────────────────┘└────────────────────────┘
```

Tiene dos piezas: el **panel** (lo que ves como drawer) y el **overlay** (el scrim detras). El panel se compone de tres building blocks — `.DrawerHeader`, `.DrawerBody`, `.DrawerFooter` — que son sub-componentes independientes e intercambiables.

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg                         Ancho: 320 / 480 / 640px
  Posicion      left · right                         Borde desde el que aparece
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Header             Region superior con titulo + close button
  ☐ Footer             Region inferior con botones de accion
  ☑ Overlay            Scrim oscuro detras del panel
  ☑ Close Button       Boton X en el header
  ☑ Divider Header     Separador entre header y body
  ☑ Divider Footer     Separador entre body y footer
```

### Panel de propiedades en Figma

```
┌─ Drawer ─────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size     ▼  md │ │ Position ▼ … │ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Header            ☑ Overlay       │
│  ☐ Footer            ☑ Close Button  │
│  ☑ Divider Header    ☑ Divider Footer│
│                                      │
│  Instance Swap                       │
│  ↳ Header Content [ .DrawerHeader ]  │
│  ↳ Footer Content [ .DrawerFooter ]  │
│                                      │
└──────────────────────────────────────┘

┌─ .DrawerHeader ──────────────────────┐
│                                      │
│  Boolean Properties                  │
│  ☑ Close Button                      │
│                                      │
│  Text Properties                     │
│  ✏️ Title        [ Drawer Title   ]  │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿Necesitas mostrar contenido secundario sin salir de la pagina?
  │
  ├─ Es una accion rapida (confirmar, eliminar) → usa Modal (mas enfocado)
  │
  ├─ Es un formulario largo o detalles de un registro → usa Drawer ✓
  │
  ├─ Es contenido que debe estar siempre visible → usa Sidebar (persistente)
  │
  ├─ Es una notificacion o mensaje breve → usa Toast / Banner
  │
  └─ Es un menu de navegacion de la app → usa Navigation Drawer (otro componente)
```

**Usa Drawer cuando:**
- El contenido secundario necesita espacio vertical largo (formularios, detalles, listas de filtros)
- El usuario debe mantener contexto de la pagina principal (el overlay comunica "estas aqui temporalmente")
- Hay acciones asociadas al contenido (Guardar, Aplicar, Cancelar) que requieren footer fijo

**NO uses Drawer cuando:**
- La decision es simple y rapida (si/no, confirmar) → usa Modal
- El contenido debe ser persistente y no overlay → usa un panel inline o sidebar
- Es un menu de acciones contextuales → usa Menu/Popover
- Son opciones de navegacion global → usa Navigation Drawer (componente separado)

---

## Variaciones visuales

### Posicion

```
  right (default)                        left
  ┌──────────────────┐┌──────────┐      ┌──────────┐┌──────────────────┐
  │   ░░ OVERLAY ░░  ││ Title [X]│      │ [X] Title││   ░░ OVERLAY ░░  │
  │                  ││──────────│      │──────────││                  │
  │                  ││  Body    │      │  Body    ││                  │
  │                  ││──────────│      │──────────││                  │
  │                  ││ [Actions]│      │ [Actions]││                  │
  └──────────────────┘└──────────┘      └──────────┘└──────────────────┘
  Detalles, filtros, config              Navegacion contextual
```

### Tamanos

```
  sm (320px)     Filtros, listas cortas, configuracion rapida
  ┌──────────────────────────┐┌──────┐
  │                          ││ sm   │
  └──────────────────────────┘└──────┘

  md (480px)     Formularios estandar, detalles de registro (default)
  ┌──────────────────────┐┌──────────┐
  │                      ││   md     │
  └──────────────────────┘└──────────┘

  lg (640px)     Editores, vistas complejas, formularios con columnas
  ┌────────────────┐┌────────────────┐
  │                ││      lg        │
  └────────────────┘└────────────────┘
```

### Con y sin footer

```
  sin footer                             con footer
  ┌────────────────────┐                ┌────────────────────┐
  │ Title         [✕]  │                │ Title         [✕]  │
  │────────────────────│                │────────────────────│
  │                    │                │                    │
  │  Body scrollable   │                │  Body scrollable   │
  │                    │                │                    │
  │                    │                │────────────────────│
  │                    │                │ [Cancelar] [Guardar]│
  └────────────────────┘                └────────────────────┘
  Contenido read-only                   Formularios, filtros con Apply
```

---

## Decisiones de diseno

### 1. Un drawer ES un dialog posicionado

Todos los sistemas que implementan drawer usan `role="dialog"` con `aria-modal`. shadcn/ui lo hizo explicito: Sheet hereda de Dialog. Spectrum (Adobe) fue mas lejos — no tiene componente Drawer, usa Dialog con CSS de posicionamiento. La leccion: un drawer no es un componente nuevo, es un dialog con placement diferente.

**Nosotros: componente propio con semantica de dialog.** Aunque reutiliza la semantica de Dialog, la estructura visual (panel + overlay + header/body/footer) justifica un componente dedicado en Figma.

### 2. Solo left/right, no cuatro direcciones

14/24 sistemas soportan cuatro direcciones (top/right/bottom/left). Pero top/bottom cambian el eje del Size — "sm" en un right drawer es ancho, en un bottom drawer es alto. Esto confunde. Ademas, bottom drawer es realmente un Bottom Sheet (con drag handle, snap points), un patron de interaccion diferente. shadcn/ui los separo en dos componentes por esta razon.

**Nosotros: left/right.** Cubren el 95%+ de los casos. Si necesitas bottom sheet, es otro componente.

### 3. Tres building blocks, no contenido libre

18/24 sistemas tienen header estructurado. 22/24 tienen body scrollable. 14/24 tienen footer con acciones. Base Web no tiene header/footer built-in — el resultado es inconsistencia entre equipos. Orbit (Kiwi.com) tiene `fixedFooter` porque descubrieron que acciones ocultas bajo scroll son un problema real.

**Nosotros: .DrawerHeader, .DrawerBody, .DrawerFooter.** Son building blocks intercambiables. El header y footer son fijos; el body hace scroll.

### 4. Overlay como boolean, no como variante

Ant Design usa `mask={false}` para drawers no-blocking. Fluent 2 usa `type="overlay"|"inline"`. Mantine separa `withOverlay` de `trapFocus`. La diferencia entre overlay visual y focus trap es un detalle de codigo — en Figma, lo que importa es si se ve el scrim o no.

**Nosotros: boolean `Overlay`.** Visible por defecto. El dev decide si el foco se atrapa o no.

### 5. Anchos fijos, no porcentajes

Chakra define anchos fijos (xs=256, sm=320, md=480, lg=640, xl=768, full=100vw). Evergreen usa width flexible por caso de uso. Los porcentajes generan inconsistencia entre pantallas. Los anchos fijos garantizan que el drawer se vea igual en cualquier viewport.

**Nosotros: sm=320, md=480, lg=640.** Tres tamanos cubren filtros (sm), formularios (md), y editores (lg).

### Combinaciones excluidas

No hay combinaciones excluidas. Las 6 frames (3 sizes x 2 positions) son todas validas. Los booleans (header, footer, overlay, dividers, close button) no multiplican frames.

```
  (ninguna combinacion excluida)
```

---

## Comportamiento

### Lo esencial para disenar

1. **Escape siempre cierra.** 20/20 sistemas con drawer implementan Escape. El foco vuelve al trigger que abrio el drawer.

2. **El overlay cierra al hacer click.** Click en el scrim = cerrar el drawer. Si hay cambios sin guardar, confirmar antes.

3. **Focus trap en drawers modales.** Si el overlay esta visible, el foco DEBE estar atrapado dentro del panel. Esto previene que usuarios de teclado interactuen con contenido oculto detras del scrim.

4. **Return focus al trigger al cerrar.** Sin esto, el foco se pierde en `<body>`. Critico para usuarios de teclado y screen readers.

5. **Header/footer fijos, body scrollable.** 16/24 sistemas fijan header y footer. Las acciones y el titulo deben ser siempre visibles sin importar cuanto contenido tenga el body.

6. **Z-index: drawer < modal.** Si se abre un modal desde dentro del drawer, el modal debe estar encima. Atlassian usa z-index 600 (drawer) vs 700 (modal).

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Panel | `dialog` | `aria-modal="true"`, `aria-labelledby` | SR anuncia "dialogo" con el titulo del drawer |
| Overlay | presentational | `aria-hidden="true"` en contenido detras | SR ignora contenido principal mientras drawer esta abierto |
| Close button | `button` | `aria-label="Cerrar"` | SR anuncia la accion sin depender del icono visual |
| Contenido principal | n/a | `inert` o `aria-hidden="true"` | Previene navegacion SR al contenido detras del overlay |

### Navegacion por teclado

Interacciones principales (las que afectan el diseno):

```
  Tab                   foco al primer elemento focusable dentro del drawer
  Shift+Tab             cicla en reversa (focus trap)
  Escape                cierra el drawer → foco vuelve al trigger
```

Interacciones secundarias (no afectan diseno, referencia para dev):

```
  Tab (ultimo elemento)  vuelve al primer focusable (loop de focus trap)
  Click overlay          cierra el drawer
```

---

## Guia de contenido

**Titulo:** Describe la accion o el contenido. "Editar perfil", "Filtros", "Detalles del pedido" — no "Panel" o "Drawer".

**Boton close:** Siempre visible. El icono X es suficiente, pero el `aria-label` debe decir "Cerrar".

**Footer actions:** Accion primaria a la derecha ("Guardar", "Aplicar"), secundaria a la izquierda ("Cancelar"). Usa verbos, no "OK/Aceptar".

**Body:** Si el contenido es largo, agrupa con secciones y headings dentro del body. No uses drawers anidados a menos que sea estrictamente necesario.

---

## Checklist antes de construir

```
  ☐ ¿Desde que lado abre?
    └─ right = detalles, filtros, config (default)
    └─ left = navegacion contextual

  ☐ ¿Que tamano necesita?
    └─ sm (320) = filtros rapidos, listas cortas
    └─ md (480) = formularios, detalles (default)
    └─ lg (640) = editores, formularios con columnas

  ☐ ¿Necesita footer?
    └─ Si hay acciones (Guardar, Aplicar, Cancelar) → si
    └─ Si es solo lectura → no

  ☐ ¿Overlay visible?
    └─ Si (default) para drawers modales
    └─ No para paneles de referencia no-blocking

  ☐ ¿Puede haber cambios sin guardar?
    └─ Si → confirmar antes de cerrar (dialog de confirmacion)

  ☐ ¿El drawer se abre desde una tabla o lista?
    └─ Patron "detail panel": click en fila → drawer con detalles
    └─ Asegurar return focus a la fila correcta al cerrar
```

---

## Relacion con otros componentes

```
  Modal          Para decisiones rapidas. Usa el mismo role="dialog"
  Dialog         El drawer ES un dialog posicionado. Misma semantica ARIA
  Sidebar        Persistente, sin overlay. No es un overlay temporal
  Bottom Sheet   Para mobile. Drag handle + snap points. Componente separado
  Menu/Popover   Para acciones contextuales, no contenido extenso
  Toast          Para mensajes breves post-accion, no contenido interactivo
```

---

## Referencia: como lo hacen otros sistemas

**Los que tienen drawer completo:**
- Ant Design: 4 direcciones, nesting con `push`, `mask={false}` para no-blocking
- Chakra UI: 4 direcciones, sizes de xs a full, comparte infra con Modal
- Mantine: composable con sub-componentes, `withOverlay` y `trapFocus` explicitos

**Los que distinguen overlay vs inline:**
- Fluent 2: `type="overlay"|"inline"` — inline empuja contenido, overlay superpone
- M3: Side Sheet Standard (push) vs Modal (overlay) como componentes separados

**Los que limitan direccion:**
- Atlassian: solo left, 5 anchos semanticos (narrow/medium/wide/extended/full)
- Paste (Twilio): solo right, non-modal option
- Orbit (Kiwi.com): solo right, `fixedFooter` para acciones siempre visibles

**Consenso universal:**
- `role="dialog"` con `aria-modal`
- Escape cierra
- Focus trap en modo modal
- Return focus al trigger
- Header con titulo + close button como estructura minima

---

## Tokens

**25 tokens** · prefijo `drw-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--drw-panel-bg` | `surface/default` | Fondo del panel |
| `--drw-panel-border` | `border/mid/default` | Borde lateral del panel |
| `--drw-overlay-bg` | `overlay/default` | Color del scrim (negro + opacidad) |
| `--drw-header-bg` | `surface/default` | Fondo del header |
| `--drw-header-fg` | `text/label` | Texto del titulo |
| `--drw-header-border` | `border/light/default` | Divider header-body |
| `--drw-body-bg` | `surface/default` | Fondo del body |
| `--drw-body-fg` | `text/body` | Texto del contenido |
| `--drw-footer-bg` | `surface/default` | Fondo del footer |
| `--drw-footer-border` | `border/light/default` | Divider body-footer |
| `--drw-close-fg` | `icon/default` | Color del icono X |
| `--drw-close-fg-hover` | `icon/hover` | Icono X en hover |

### Specs de spacing

```
  ┌─ panel ────────────────────────────────────────────┐
  │                                                    │
  │  ┌─ .DrawerHeader ──────────────────────────────┐  │
  │  │ ←px→ [Title text] ←→ [actions] ←gap→ [✕] ←px→│  │
  │  │      ↕ py                              ↕ py  │  │
  │  └──────────────────────────────────────────────┘  │
  │  ── divider ──────────────────────────────────── │  │
  │  ┌─ .DrawerBody ────────────────────────────────┐  │
  │  │ ←px→ contenido libre                    ←px→ │  │
  │  │      ↕ py                              ↕ py  │  │
  │  └──────────────────────────────────────────────┘  │
  │  ── divider ──────────────────────────────────── │  │
  │  ┌─ .DrawerFooter ─────────────────────────────┐  │
  │  │ ←px→ [Cancelar] ←gap→ [Guardar]        ←px→ │  │
  │  │      ↕ py                              ↕ py  │  │
  │  └──────────────────────────────────────────────┘  │
  │                                                    │
  └────────────────────────────────────────────────────┘

  Anchos por size:  sm = 320px  ·  md = 480px  ·  lg = 640px

  .DrawerHeader por size:
    sm: px=16, py=12, fontSize=14, iconSize=20, gap=8
    md: px=24, py=16, fontSize=16, iconSize=20, gap=8
    lg: px=24, py=16, fontSize=20, iconSize=24, gap=8

  .DrawerBody por size:
    sm: px=16, py=16, gap=12
    md: px=24, py=16, gap=16
    lg: px=24, py=24, gap=16

  .DrawerFooter por size:
    sm: px=16, py=12, gap=12
    md: px=24, py=16, gap=12
    lg: px=24, py=16, gap=12

  radius panel:  0 (edge-to-edge contra el borde de pantalla)
  shadow panel:  elevation level 3
```
