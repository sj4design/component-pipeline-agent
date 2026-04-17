# Tabs

## Descripción general

Tabs es el componente de navegación entre vistas del sistema de diseño: una lista de tabs (Tab items) que controla qué panel de contenido se muestra. A diferencia de SegmentedControl (que alterna modos de la misma vista), Tabs navega entre contenidos completamente distintos. Existe como familia de dos componentes: `Tab` (el item individual, building block) y `Tabs` (el contenedor que agrupa los Tab items). El sistema soporta dos tipos visuales — `line` (underline del tab activo, el más universal) y `contained` (tab activo con fondo filled sobre una banda de color, estilo Chrome/pill) — y dos orientaciones (horizontal y vertical).

```
Type=line, Size=md, horizontal (3 tabs, tab 2 activo):
┌──────────────────────────────────────────────────────────────┐
│  Overview    │ Analytics •  │ Settings                       │
│  ────────────│═════════════│────────────                    │  ← borde bottom 1px
│              ↑ active: azul + underline 2px                 │
│              ↑ badge · (dot)                                │
└──────────────────────────────────────────────────────────────┘

Type=contained, Size=md:
┌──────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐  │
│ │  Overview  ┌──────────┐  Settings                       │  │
│ │            │Analytics │                                  │  │  bg: surface
│ │            └──────────┘                                  │  │  shadow: sm
│ └─────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

Tab states (Type=line):
│  default:   text/secondary · bg: transparent               │
│  hover:     text/primary   · bg: surface/hover             │
│  active:    interactive    · indicator azul 2px            │
│  focused:   text/primary   · ring 2px focus                │
│  disabled:  text/disabled  · bg: transparent               │

Orientation=vertical (Type=line):
┌──────────────────────────────────────────────────────────────┐
│  Overview     │                                              │
│  ─────────    │  [panel content]                            │
│  Analytics ← │                                              │
│  ══════════   │                                              │
│  Settings     │                                              │
└──────────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes del Tab (sub-componente):

```
Type  → line | contained
State → default | hover | active | focused | disabled
Size  → sm | md
```

Toggles del Tab:

```
👁 Has Icon    → muestra/oculta el ícono leading
👁 Has Badge   → muestra/oculta el badge de count/dot
👁 Closable    → muestra/oculta el botón × de cierre del tab
```

Variantes del Tabs (contenedor):

```
Orientation → horizontal | vertical
Type        → line | contained
Size        → sm | md
```

Textos editables:

```
✏️ Label → "Tab label"
```

Slots intercambiables:

```
🔄 Icon  → ícono leading del tab
🔄 Badge → instancia de Badge (count/dot)
```

### Panel de propiedades en Figma

**Tab:**
```
┌──────────────────────────────────────────────────────┐
│  Tab                                                 │
│  ──────────────────────────────────────────────────  │
│  Type   [ line          ▼ ]                          │
│  State  [ default       ▼ ]                          │
│  Size   [ md            ▼ ]                          │
│  ──────────────────────────────────────────────────  │
│  👁 Has Icon    [ off ]                              │
│  👁 Has Badge   [ off ]                              │
│  👁 Closable    [ off ]                              │
│  ✏️ Label        [ Tab label                     ]   │
│  🔄 Icon         [ icon/placeholder           ↗ ]   │
│  🔄 Badge        [ Badge/neutral              ↗ ]   │
└──────────────────────────────────────────────────────┘
```

**Tabs:**
```
┌──────────────────────────────────────────────────────┐
│  Tabs                                                │
│  ──────────────────────────────────────────────────  │
│  Orientation  [ horizontal      ▼ ]                  │
│  Type         [ line            ▼ ]                  │
│  Size         [ md              ▼ ]                  │
└──────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito alternar entre vistas o paneles de contenido?
                    │
                    ▼
       ¿El contenido de cada vista es semánticamente distinto?
       ├── Sí → Tabs (cada tab lleva a contenido diferente)
       └── No (mismo contenido en distinto modo) → SegmentedControl
                    │
                    ▼
       ¿Cuántos tabs hay?
       ├── 2-7 → Tabs (horizontal, caben en pantalla)
       ├── >7  → Considerar Tabs vertical o reestructurar la navegación
       └── 1   → No usar tabs (sin propósito)
                    │
                    ▼
       ¿Los tabs están en un espacio vertical angosto?
       ├── Sí → Orientation=vertical
       └── No → Orientation=horizontal (default)
                    │
                    ▼
       ¿Qué tipo visual?
       ├── UI de aplicación estándar → Type=line
       └── Dashboard / segmentación visual prominente → Type=contained
```

**Usar Tabs cuando:**
- Navegación entre secciones de una página de settings (Overview / Security / Integrations)
- Paneles de análisis con vistas distintas (Summary / Analytics / Reports)
- Inbox con categorías (All / Unread / Starred) — con Badge de count
- Página de perfil de usuario con secciones (Actividad / Configuración / Privacidad)
- Modal con contenido multi-paso donde los pasos no son secuenciales

**NO usar Tabs cuando:**
- Se necesita alternar entre modos de la misma vista (List/Grid view) → usar `SegmentedControl`
- Los tabs tienen más de 7 elementos → considerar una navegación sidebar o acordeón
- El contenido de cada tab es una página diferente → usar routing/navigation (no tabs)
- Se necesita progresión secuencial (Paso 1 → Paso 2) → usar Stepper/Wizard

---

## Variaciones visuales

### Type

| Type | Tab activo | Tab inactivo | Cuándo usar |
|------|-----------|-------------|------------|
| line | fg: interactive, underline 2px | fg: text/secondary, bg: transparent | Aplicaciones estándar, settings, forms |
| contained | bg: surface, fg: text/primary, shadow sm | fg: text/secondary, bg: transparent | Dashboards, contextos con banda de fondo |

### State (Tab — Type=line)

| State | Background | Foreground | Indicador |
|-------|-----------|-----------|---------|
| default | transparent | text/secondary | — |
| hover | surface/hover | text/primary | — |
| active | transparent | interactive/default | azul 2px bottom |
| focused | transparent | text/primary | ring 2px focus |
| disabled | transparent | text/disabled | — |

### Size

| Size | Height | PaddingX | Gap | FontSize | FontWeight | IndicatorThickness | Radius |
|------|--------|---------|-----|---------|-----------|------------------|--------|
| sm   | 32px   | 12px    | 6px | 13px    | 500       | 2px              | 6px    |
| md   | 40px   | 16px    | 8px | 14px    | 500       | 2px              | 8px    |

### Orientation

| Orientation | Direction | Type compatible | Cuándo usar |
|------------|----------|----------------|------------|
| horizontal | Fila horizontal | line + contained | Default — la mayoría de casos |
| vertical | Columna vertical | line only | Settings sidebar, navegación lateral |

---

## Decisiones de diseño

**1. Dos types: line + contained** — Line es el patrón universal (Chrome, Gmail, Atlassian, Spectrum). Contained es el estilo "pill" sobre banda de fondo — más usado en dashboards y contextos donde el tablist tiene fondo de color. Ant Design tiene line/card/editable-card pero estos son variantes de casos muy específicos. Dos tipos cubre los casos sin fragmentar el API.

**2. Sub-component architecture: Tab + Tabs** — La separación espeja WAI-ARIA (tablist/tab/tabpanel) y la composición de Atlassian y Spectrum. Facilita usos custom: extra content slot (botón "+" al final del tablist), controlled state, y renderizado dinámico de tabs. Tab como building block (isBuildingBlock=true) permite que otros componentes lo compongan internamente.

**3. Badge + Closable como booleans independientes** — Badges en tabs son first-class en Polaris y Ant Design (para counts de notificaciones o items). Closable (tab con ×) es el patrón de "editable tabs" de Chrome/Ant. Modelarlos como booleans independientes permite combinaciones: closable con badge, sin duplicar variantes.

**4. Roving tabindex + activación automática (default) / manual (opt-in)** — La activación automática (cambio de panel al mover el foco con Arrow keys) es el default — la mayoría de paneles son ligeros y el cambio inmediato es bueno UX. La activación manual (requiere Enter/Space para activar) es opt-in para paneles con API calls caros (Carbon/Spectrum usan este patrón). El developer implementa el modo; el diseñador no necesita modelarlo.

**5. Sin overflow/scroll built-in** — Carbon y Ant usan scroll horizontal cuando hay muchos tabs; Spectrum colapsa a un Picker. Omitir inicialmente — la recomendación es limitar tabs a ≤7 o usar orientación vertical. El consumer implementa overflow si es necesario en la aplicación específica.

**6. Orientation=vertical + Type=contained excluido** — Contained es un design horizontal-first (la banda de color, el tab con fondo filled, el shadow). No funciona visualmente en orientación vertical donde los tabs se apilan. Vertical siempre usa Type=line.

### Combinaciones excluidas

```
Orientation=vertical + Type=contained → ✗ contained es horizontal-first; vertical usa line
Type=contained + indicator visible    → ✗ contained usa fondo filled, no subrayado
```

---

## Comportamiento

### Esencial para diseño

- **Indicador de tab activo** — en Type=line, el tab activo tiene un underline de 2px de color interactive. En Type=contained, el tab activo tiene fondo white + shadow sm (sin underline). Son mutuamente excluyentes.
- **Estado hover** — en hover, el background del tab cambia a surface/hover (gris muy sutil). Este comportamiento es el mismo en ambos types.
- **Activación automática default** — al navegar con Arrow keys entre tabs, el panel cambia inmediatamente. Para paneles con carga de datos, el developer puede usar activación manual (Arrow keys = solo foco, Enter = activar) para evitar múltiples calls innecesarias.
- **Closable × button** — el botón de cierre del tab (Has Closable=on) es un `<button>` separado dentro del tab, con `aria-label="Cerrar [nombre del tab]"`. Tener Close dentro del tab requiere manejo especial del foco: al cerrar, el foco va al tab anterior.
- **Badge count integrado en el tab** — el slot 🔄 Badge acepta una instancia de Badge component. El count del badge se integra en el aria-label del tab: "Analytics, 5 elementos".
- **Tab disabled** — un tab disabled (State=disabled) puede ser necesario cuando la vista no está disponible. El developer usa `aria-disabled="true"` (no `disabled` nativo — para que el tab siga siendo navegable por teclado, solo no activable).

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Tablist | `role="tablist"` + `aria-label="[propósito]"` + `aria-orientation` | SR anuncia el tipo de navegación y orientación |
| Tab activo | `role="tab"` + `aria-selected="true"` + `tabindex="0"` | SR sabe cuál tab está activo |
| Tab inactivo | `role="tab"` + `aria-selected="false"` + `tabindex="-1"` | Roving tabindex; no aparece en Tab order normal |
| Tab → Panel | `aria-controls="[panelId]"` en tab + `aria-labelledby="[tabId]"` en panel | Asociación bidireccional tab ↔ panel |
| TabPanel | `role="tabpanel"` + `tabindex="0"` | Panel es focusable para que el usuario pueda Tab hacia él |
| Tab con badge | Badge count incluido en aria-label: "Analytics, 5 elementos" | SR contextualiza el count con el tab |
| Tab closable | Close button con `aria-label="Cerrar Analytics"` | × solo no describe la acción |
| Tab disabled | `aria-disabled="true"` (no `disabled`) | Tab sigue siendo navegable (Arrow keys); solo no activable |

### Navegación por teclado

```
Arrow Left / Arrow Right  → mueve foco entre tabs (horizontal)
Arrow Up / Arrow Down     → mueve foco entre tabs (vertical)
Home                      → primer tab del tablist
End                       → último tab del tablist
Tab                       → sale del tablist y entra al tabpanel activo
Shift+Tab                 → regresa al tablist desde el panel
Space / Enter (manual)    → activa el tab enfocado (en modo manual)
Delete / Backspace        → cierra el tab (si Closable=true)

Roving tabindex:
  Tab activo: tabindex=0
  Tabs inactivos: tabindex=-1
```

---

## Guía de contenido

**Tab labels:**
- Noun corto que describe el contenido del panel: "Overview", "Analytics", "Settings", "Members"
- Evitar verbos ("Ver análisis") — los labels de tabs son nombres de secciones
- Máximo 2 palabras — más largo y el tablist no cabe en mobile
- Consistente en longitud entre tabs del mismo grupo — mezclar "Overview" con "Configuración avanzada" es problemático
- Sin artículos: "Analytics" no "Los analytics"

**Badge count en tab:**
- Solo para conteos accionables: mensajes no leídos, errores, items pendientes
- El aria-label del tab debe incluir el count: "Mensajes, 5 sin leer" — no solo "Mensajes"
- Límite de overflow: "99+" para counts > 99

**aria-label del tablist:**
- Describir el propósito de la navegación, no el componente: "Configuración de cuenta" no "Tabs"
- "Secciones del perfil", "Vistas del dashboard", "Páginas de configuración"

**Cuándo usar Size=sm:**
- Tabs dentro de un modal o panel donde el espacio es limitado
- Tabs de sub-sección (segunda fila de tabs dentro de una vista tabbed)

---

## Pre-build checklist

```
□ ¿Tablist tiene role="tablist" + aria-label + aria-orientation?
□ ¿Cada tab tiene role="tab" + aria-selected + aria-controls?
□ ¿TabPanel tiene role="tabpanel" + aria-labelledby + tabindex=0?
□ ¿Roving tabindex implementado (activo tabindex=0, resto -1)?
□ ¿Arrow keys navegan entre tabs (no Tab)?
□ ¿Tab desactiva autopromoción a Tab order (tabindex=-1)?
□ ¿Tab closable tiene aria-label="Cerrar [nombre]"?
□ ¿Badge count integrado en aria-label del tab?
□ ¿Tab disabled usa aria-disabled="true" (no disabled nativo)?
□ ¿Orientation=vertical + Type=contained excluido?
□ ¿No usar Tabs para view-mode switching (usa SegmentedControl)?
□ ¿Máximo 7 tabs en horizontal (o usar vertical)?
```

---

## Componentes relacionados

```
SegmentedControl → para alternar entre modos de la MISMA vista (List/Grid, Day/Week/Month)
Badge            → slot interno de Has Badge — count/dot sobre el tab
Accordion        → para contenido que se expande/colapsa (no para navegación entre vistas)
Sidebar          → Orientation=vertical puede servir como sidebar de navegación compacto
Modal            → Tabs dentro de modal para contenido multi-sección
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Types | Orientation | Badge | Closable | Vertical | ARIA |
|---------|-------|-------|------------|-------|---------|---------|------|
| **Material Design 3** | TabRow | primary/secondary | H only | No | No | No | tablist/tab correcto |
| **Spectrum (Adobe)** | Tabs | line (underline) | H + V | No | No | Sí | keyboardActivation prop |
| **Carbon (IBM)** | Tabs | line/contained | H only | No | No | No | manual/automatic activation |
| **Polaris (Shopify)** | Tabs | line | H only | badge | No | No | accessibilityLabel |
| **Atlassian** | Tabs | line | H only | No | No | No | tablist/tab/tabpanel correcto |
| **Ant Design** | Tabs | line/card/editable-card | H + V | No | Sí (editable-card) | Sí | tablist/tab/tabpanel |
| **Twilio Paste** | Tabs | underline | H + V | No | No | Sí | full WAI-ARIA |
| **Lightning** | Tabs | default/scoped | H only | No | No | No | LWC; tablist/tab |
| **Primer (GitHub)** | TabNav / UnderlineNav | underline | H only | counter | No | No | aria-current instead of role=tab |
| **shadcn/ui** | Tabs | underline (default) | H only | No | No | No | Radix Tabs (full ARIA) |
| **Chakra UI** | Tabs | line/enclosed/soft-rounded/solid-rounded | H + V | No | No | Sí | isManual prop |
| **Fluent 2** | TabList + Tab | line (underline) | H + V | No | No | Sí | vertical prop; full ARIA |
| **Gestalt (Pinterest)** | Tabs | underline | H only | No | No | No | Basic implementation |
| **Mantine** | Tabs | default (line)/pills/outline | H + V | No | No | Sí | Full ARIA; keepMounted prop |
| **Orbit (Kiwi)** | Tabs | line | H only | No | No | No | Domain-specific |
| **Evergreen** | Tablist / Tab | pill (rounded) | H only | No | No | No | Manual tabindex management |
| **Nord** | nord-tab-group | underline | H + V | No | No | Sí | Web component; ARIA |

**Patrones clave de la industria:**
1. **Line (underline) es el type dominante** — M3, Spectrum, Carbon, Polaris, Atlassian, Twilio, Fluent 2, Nord usan underline como el estilo principal. Contained/pill es secundario (Carbon, Chakra, Evergreen). El consenso de T1 es claro: underline es el estándar.
2. **Activación automática vs manual** — Spectrum (keyboardActivation), Carbon (manual prop), Chakra (isManual) ofrecen ambas. La mayoría default a automático. Manual es importante para paneles con API calls — documentarlo en la spec garantiza que el developer lo considere.
3. **Vertical orientation** — Spectrum, Ant, Fluent 2, Chakra, Mantine, Nord lo soportan. M3, Polaris, Atlassian no. Para admin dashboards con muchas secciones, vertical es valioso. La exclusión contained+vertical es correcta — ningún sistema lo tiene.
4. **ARIA correcta es rara** — Solo Twilio Paste, shadcn/ui (Radix), y Fluent 2 tienen ARIA completamente correcta de serie. La mayoría tiene gaps (Primer usa aria-current en lugar de role=tab). Documentar el patrón ARIA completo en la spec es esencial.

---

## Tokens

**24 tokens** · prefijo `tab-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `tab-sm-h` | `sizing/32` | Altura Tab sm — 32px |
| `tab-md-h` | `sizing/40` | Altura Tab md — 40px |
| `tab-line-default-fg` | `text/secondary` | Tab line / default / fg |
| `tab-line-hover-bg` | `surface/hover` | Tab line / hover / bg |
| `tab-line-hover-fg` | `text/primary` | Tab line / hover / fg |
| `tab-line-active-fg` | `interactive/default` | Tab line / active / fg (azul) |
| `tab-line-active-indicator` | `interactive/default` | Underline activo (azul 2px) |
| `tab-line-disabled-fg` | `text/disabled` | Tab line / disabled / fg |
| `tab-contained-default-fg` | `text/secondary` | Tab contained / default / fg |
| `tab-contained-active-bg` | `surface/default` | Tab contained / active / bg (white) |
| `tab-contained-active-fg` | `text/primary` | Tab contained / active / fg |
| `tab-contained-active-shadow` | `elevation/1` | Tab contained / active / shadow |
| `tab-focused-ring` | `focus/ring` | Focus ring — 2px |
| `tab-indicator-thickness` | `border/2` | Grosor del underline activo — 2px |
| `tab-radius-sm` | `radius/sm` | Border radius Tab sm — 6px |
| `tab-radius-md` | `radius/md` | Border radius Tab md — 8px |
| `tab-fontSize-sm` | `type/body-sm` | FontSize Tab sm — 13px |
| `tab-fontSize-md` | `type/body-md` | FontSize Tab md — 14px |
| `tab-fontWeight` | `type/weight-medium` | FontWeight Tab — 500 |
| `tab-gap-sm` | `spacing/1.5` | Gap icon+label Tab sm — 6px |
| `tab-gap-md` | `spacing/2` | Gap icon+label Tab md — 8px |
| `tab-px-sm` | `spacing/3` | PaddingX Tab sm — 12px |
| `tab-px-md` | `spacing/4` | PaddingX Tab md — 16px |
| `tab-container-borderBottom` | `border/1` | Borde inferior del Tabs container — 1px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Tab sm:  h:32px · px:12px · gap:6px  · font 13px/500  │
│  Tab md:  h:40px · px:16px · gap:8px  · font 14px/500  │
│                                                          │
│  Tabs container:                                         │
│  borderBottom: 1px border/default (Type=line)           │
│  gap entre tabs: sm=4px · md=8px                        │
│                                                          │
│  Active indicator (Type=line):                           │
│  height: 2px · color: interactive/default · bottom: 0   │
│                                                          │
│  Frames totales:                                         │
│  Tab: Type(2) × State(5) × Size(2) = 20 − 2 = 18       │
│  Tabs: Orientation(2) × Type(2) × Size(2) = 8 − 2 = 6  │
│  Total familia: 24 frames                               │
└──────────────────────────────────────────────────────────┘
```
