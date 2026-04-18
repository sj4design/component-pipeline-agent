# Tabs

## Overview

Tabs es un componente de navegación que organiza el contenido en secciones mutuamente excluyentes, mostrando solo un panel activo a la vez. Implementa el patrón WAI-ARIA Tabs con `role="tablist"`, `role="tab"` y `role="tabpanel"`, roving tabindex y navegación por teclas de flecha. La arquitectura es de sub-componentes: `Tab` (el botón individual) + `Tabs` (el contenedor que agrupa los Tab items y controla el tabList).

```
Type=line (horizontal, default):
┌─────────────────────────────────────────────┐
│  Overview │ Analytics │ Settings │ Billing   │
│  ─────────                                   │  ← indicator activo (2px, brand)
├─────────────────────────────────────────────┤
│                                             │
│   [Contenido del tab activo]                │
│                                             │
└─────────────────────────────────────────────┘

Type=contained (Carbon pattern, dashboards):
┌──────────┬──────────┬──────────┬────────────┐
│ Overview │Analytics │ Settings │  Billing   │  ← fondo filled + shadow en activo
├──────────┴──────────┴──────────┴────────────┤
│                                             │
│   [Contenido anclado visualmente al tab]    │
│                                             │
└─────────────────────────────────────────────┘

Con badges (Polaris pattern):                  Vertical (Orientation=vertical):
┌──────────────────────────────────────┐       ┌──────────────────────────────────┐
│  All ●37 │ Active ●12 │ Archived ●8  │       │  ┌──────────────┬──────────────┐│
│  ─────────                           │       │  │  Overview    │              ││
└──────────────────────────────────────┘       │  ├──────────────┤  [Content]   ││
                                               │  │▶ Account     │              ││
                                               │  ├──────────────┤              ││
                                               │  │  Privacy     │              ││
                                               │  └──────────────┴──────────────┘│
                                               └──────────────────────────────────┘
```

`Tab` es el sub-componente building block; `Tabs` es el contenedor de la lista. El TabPanel (panel de contenido) es un tercer elemento que el consumidor renderiza y conecta mediante `aria-controls`/`aria-labelledby`.

**Lo que el diseñador puede configurar:**

Variantes (cambian la apariencia — generan variantes Figma):

```
Tab:
  Type:   line | contained
  State:  default | hover | active | focused | disabled
  Size:   sm | md

Tabs:
  Orientation: horizontal | vertical
  Type:        line | contained
  Size:        sm | md
```

Toggles (muestran/ocultan partes — NO generan variantes adicionales):

```
Tab:
  👁 Has Icon    → muestra/oculta ícono leading
  👁 Has Badge   → muestra/oculta badge (count/dot) trailing
  👁 Closable    → muestra/oculta botón × (closeButton)
```

### Figma properties panel

```
Tab (sub-component):
┌──────────────────────────────────────────┐
│  Tab                                     │
├──────────────────────────────────────────┤
│  Type        ○ line  ○ contained         │
│  State       [default ▼]                 │
│              default / hover / active    │
│              focused / disabled          │
│  Size        ○ sm  ○ md                  │
├──────────────────────────────────────────┤
│  👁 Has Icon      [off]                  │
│  👁 Has Badge     [off]                  │
│  👁 Closable      [off]                  │
├──────────────────────────────────────────┤
│  ✏️ Label     [Tab label]                │
│  🔄 Icon      [icon/placeholder]         │
│  🔄 Badge     [Badge/neutral]            │
└──────────────────────────────────────────┘

Tabs (container):
┌──────────────────────────────────────────┐
│  Tabs                                    │
├──────────────────────────────────────────┤
│  Orientation  ○ horizontal  ○ vertical   │
│  Type         ○ line  ○ contained        │
│  Size         ○ sm  ○ md                 │
└──────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas dividir contenido en secciones en la misma página?
                  │
                  ▼
  ¿Solo una sección es visible a la vez?
                  │
          Sí ─────┼────── No → Accordion (múltiples abiertos)
                  │
  ¿Las secciones son tabs de contenido o filtros de lista?
      ┌───────────┴───────────────┐
  Contenido                   Filtros
  (Overview, Settings,      (All/Active/Archived)
   Members, Billing)
      │                          │
   Type=line              Type=line o contained
   Orientation=horizontal  según densidad visual

¿Son documentos simultáneos (cerrable, añadible)?
  Sí → Tabs con Closable=true + extraContent slot para Add button

¿Solo 2 opciones que cambian el modo de vista?
  Sí → considera SegmentedControl en lugar de Tabs
```

**Usa Tabs cuando:**
- Divides una página de detalle en secciones (Overview, Analytics, Settings, Members)
- Filtras una lista con estados predefinidos (All / Active / Draft / Archived) con conteos
- Creas una interfaz tipo browser con documentos múltiples (Closable=true)
- Necesitas navegación vertical para una sección de configuración larga (Orientation=vertical)
- Los tabs representan secciones equivalentes de igual jerarquía

**NO uses Tabs cuando:**
- Son solo 2 opciones de modo de vista (On/Off, List/Grid) → usa ToggleGroup o SegmentedControl
- Los tabs anidan otros tabs (tabs dentro de tabs es anti-patrón de UX universal)
- Hay más de 7 tabs sin overflow strategy — limita a ≤7 o usa un patrón de navegación diferente
- El contenido de los tabs requiere URL propia (aunque los tabs pueden y deben sincronizarse con la URL via controlled mode)
- El panel contiene un solo elemento sin variación (usa directamente el contenido sin tabs)

---

## Visual variations

### Type: line (default)

El tab activo muestra un indicador de 2px en la parte inferior (horizontal) o lateral (vertical). El fondo del tab activo es transparente; el foreground cambia a `interactive/default` (azul). Los tabs inactivos tienen foreground `text/secondary` (gris). Es el estilo más versátil — funciona en fondos claros y oscuros, en headers y en paneles de contenido.

**Estados Tab line:**
- `default`: sin bg, fg=text/secondary, indicator transparente
- `hover`: bg=surface/hover, fg=text/primary
- `active`: sin bg, fg=interactive/default, indicator=interactive/default (2px)
- `focused`: ring 2px focus/ring, sin bg
- `disabled`: fg=text/disabled, no interactivo

### Type: contained

El tab activo tiene `bg=surface/default` + `shadow=elevation/1`. Los tabs inactivos tienen fondo transparente y el contenedor general tiene un fondo de relleno (`surface/pressed` o similar). Ancla visualmente el panel al tab activo. Ideal para dashboards de datos donde la conexión tab→panel debe ser inequívoca.

**Estados Tab contained:**
- `default`: sin bg, fg=text/secondary
- `hover`: bg=surface/hover, fg=text/primary
- `active`: bg=surface/default, fg=text/primary, shadow sm
- `focused`: bg=surface/default, ring 2px
- `disabled`: fg=text/disabled

### Size: sm

Altura 32px, padding horizontal 12px, fontSize 13px, gap ícono-label 6px, radius 6px. Para toolbars compactas, headers de panel secundario.

### Size: md (default)

Altura 40px, padding horizontal 16px, fontSize 14px, gap 8px, radius 8px. Tamaño estándar para la mayoría de contextos.

### Con ícono (Has Icon=true)

El ícono se coloca antes del label. Tamaño ícono: 16px (sm) o 20px (md). El ícono debe reforzar el significado del label, no reemplazarlo — un tab con solo ícono requiere `aria-label` explícito.

### Con badge (Has Badge=true)

Badge de conteo colocado al final del label. El badge count debe incluirse en el `aria-label` del tab: "Mensajes, 5 nuevos". Útil para tabs que representan listas filtradas con cantidades que cambian.

### Closable (Closable=true)

Agrega un botón × al final del tab. El botón tiene su propio `aria-label="Cerrar [Tab Name]"` y es focusable independientemente del tab label. `Delete/Backspace` cierra el tab cuando el foco está en el tab trigger. Solo disponible en Size=md por espacio (Closable + Has Icon en Size=sm es demasiado apretado).

---

## Design decisions

### 1. Dos Types: line + contained (patrón Carbon)

**¿Por qué?** Line para UI estándar y cambio de contenido editorial; contained para dashboards que necesitan un ancho visual entre el tab y su panel. Dos types cubren los casos sin fragmentar la API como Ant Design (line/card/editable-card). El type contained crea un "anchor" visual que es especialmente útil cuando el contenido del panel es una tabla o chart que necesita pertenecer visualmente al tab seleccionado.

**Trade-off:** El type contained es horizontal-first y no funciona bien en orientación vertical (demasiada superficie visual en el sidebar). Por eso existe la exclusión `Orientation=vertical + Type=contained`.

### 2. Arquitectura de sub-componentes: Tab + Tabs

**¿Por qué?** Espeja el patrón WAI-ARIA (tablist/tab/tabpanel) y la composabilidad de Atlassian/Spectrum/Radix. Permite colocar el TabList y el TabPanel en posiciones distintas del DOM —un requisito real para app shells donde el header con tabs controla una vista completa de página. El sub-componente `Tab` puede usarse independientemente como building block en otros contextos (ej. un nav personalizado).

**Trade-off:** Más verboso para casos simples. La solución es ofrecer una variante de `items` prop como shorthand para el caso simple, con la arquitectura de sub-componentes para casos avanzados.

### 3. Badge + Closable como booleans independientes

**¿Por qué?** Badges son first-class en Polaris (commerce tabs siempre muestran counts). Closable en Ant Design editable-card. Modelarlos como booleans independientes permite combinarlos (un tab closable con badge) sin crear variantes explícitas en Figma. La lógica de qué tabs son closables vs. cuáles tienen badge es del consumidor.

**Trade-off:** El diseño debe verificar que Closable + Has Icon en Size=sm no colapse (espacio insuficiente). La exclusión está documentada: "permitido pero apretado".

### 4. Roving tabindex + activación manual opcional

**¿Por qué?** Automatic activation (el foco con arrow keys activa inmediatamente el tab) es el default —más simple, menos teclas para la mayoría de usuarios. Manual activation (arrow key mueve foco, Enter/Space activa) es opt-in para paneles con API calls caros que no deben dispararse en cada tecla de flecha. Carbon y Spectrum lo tienen como prop de primera clase. Omitirlo en la primera versión sería incorrecto: es muy difícil retrofitear sin breaking changes.

**Trade-off:** La documentación debe explicar cuándo usar manual (paneles con fetch de datos) vs. automatic (cambio de contenido estático). El default incorrecto en tabs con datos asincrónicos causa N requests en producción.

### 5. Sin overflow/scroll built-in (v1)

**¿Por qué?** Carbon y Ant usan scroll; Spectrum colapsa a Picker. La estrategia de overflow correcta depende del contexto (cuántos tabs, longitud de labels, tipo de interfaz). Omitir en v1 y recomendar ≤7 tabs con documentación de alternativas (reducir tabs, usar orientación vertical, o implementar overflow en el componente que contiene a Tabs) es más responsable que implementar una estrategia incorrecta por defecto.

**Trade-off:** Equipos con muchos tabs necesitarán gestionar overflow ellos mismos. La guía de contenido debe ser explícita: máximo 7 tabs visibles; si hay más, reconsiderar la arquitectura de navegación.

### Combinaciones excluidas

```
Type=contained + indicator visible
  └── contained usa fondo filled en el tab activo, no subraya.
      El indicator (2px line) solo es visible en Type=line.

Orientation=vertical + Type=contained
  └── contained es horizontal-first; en vertical crea demasiada
      superficie visual lateral. Vertical siempre usa Type=line.

Closable=true + Has Icon en Size=sm
  └── Espacio insuficiente — ambos caben técnicamente pero el
      tab queda visualmente apretado (16px icon + label + 16px close en 32px height).
      Permitido pero documentado como caso límite.
```

---

## Behavior

### Essential for design

1. **Roving tabindex:** Solo el tab activo tiene `tabindex="0"`. Todos los demás tienen `tabindex="-1"`. Esto garantiza que al llegar con Tab al tablist, el usuario llega al tab activo (no al primero de la lista).
2. **Tab enters panel:** La tecla Tab (no las flechas) saca el foco del tablist y lo mueve al panel activo. Es el comportamiento WAI-ARIA para tabs.
3. **Inactive panels hidden:** Los paneles inactivos deben estar ocultos del árbol de accesibilidad con `hidden` attribute o `aria-hidden="true"`. El solo `display:none` visual no es suficiente.
4. **Activation mode:** Default automatic (arrow keys activan inmediatamente). Manual mode para paneles con data fetch.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Tabs container | tablist | `aria-label="[propósito]"`, `aria-orientation="horizontal\|vertical"` | Identifica el grupo de tabs y su dirección |
| Tab (activo) | tab | `aria-selected="true"`, `aria-controls="[panel-id]"`, `tabindex="0"` | Roving tabindex; conecta con su panel |
| Tab (inactivo) | tab | `aria-selected="false"`, `aria-controls="[panel-id]"`, `tabindex="-1"` | Excluido del tab order pero accesible con flechas |
| Tab (disabled) | tab | `aria-disabled="true"`, `tabindex="-1"` | Anunciado pero no activable |
| Tab con badge | tab | `aria-label="[Tab Name], [count] nuevos"` | El conteo se incluye en el accessible name |
| Close button | button | `aria-label="Cerrar [Tab Name]"` | Separado del tab label; acción explícita |
| TabPanel (activo) | tabpanel | `aria-labelledby="[tab-id]"`, `tabindex="0"`, `id="[panel-id]"` | Conectado con su tab; focusable para panel nav |
| TabPanel (inactivo) | tabpanel | `hidden` attribute o `aria-hidden="true"` | Oculto del árbol AT; crítico para SR |

### Keyboard navigation

Primary interactions (affect design):

```
← / → (horizontal)    Navega entre tabs en modo horizontal
↑ / ↓ (vertical)      Navega entre tabs en modo vertical
Home                   Primer tab del tablist
End                    Último tab del tablist
Tab                    Sale del tablist y entra al tabpanel activo
```

Secondary interactions (dev reference):

```
Enter / Space (manual activation mode)
  └── Activa el tab con foco (en modo manual)
  └── En modo automatic, las flechas activan directamente

Delete / Backspace (en Closable tab)
  └── Cierra el tab cuando el tab trigger tiene foco
  └── El foco se mueve al tab anterior o al siguiente

Tab (desde tabpanel)
  └── Navega hacia el siguiente elemento focusable dentro del panel
  └── Shift+Tab retrocede; al llegar al inicio del panel, el siguiente Shift+Tab
      regresa al tablist (al tab activo)
```

---

## Content guide

### Slot: label (Tab — requerido)

El texto del tab. Debe ser conciso, descriptivo y consistente en longitud.
- **Do:** "Overview", "Analytics", "Settings", "Billing"
- **Don't:** "All your account configuration settings" (demasiado largo, causa wrap)
- **Longitud máxima recomendada:** 14–16 caracteres para que los tabs se vean uniformes
- **Capitalización:** Title Case ("Active Users") para tabs de navegación de secciones; Sentence case para filtros ("All", "Active", "Archived")

### Slot: icon (Tab — opcional)

Ícono visual que refuerza el significado del tab label.
- **Do:** un ícono relacionado con el contenido (settings ⚙️ para Settings, chart 📊 para Analytics)
- **Don't:** íconos como único contenido sin label (requiere `aria-label` explícito en cada tab)
- **Nota:** El ícono NO reemplaza el label para accesibilidad; si se oculta el label, se debe proveer `aria-label`

### Slot: badge (Tab — opcional)

Contador o indicador de estado adyacente al label.
- **Do:** números cortos (1–999), punto indicador (nuevas notificaciones)
- **Don't:** texto en el badge (usar el label o la description del panel para eso)
- **Accesibilidad crítica:** el `aria-label` del tab debe incluir el conteo ("Issues, 12 nuevos")

### Slot: extraContent (Tabs — opcional)

Contenido adicional al final de la barra de tabs (Ant Design `tabBarExtraContent`).
- **Do:** botón "Agregar tab" para interfaces de documentos; un search input para filtrar tabs
- **Don't:** acciones de formulario o CTAs primarios que no están relacionados con el contexto de tabs

---

## Pre-build checklist

```
ARIA & Accesibilidad
□ Container: role="tablist" + aria-label + aria-orientation
□ Tabs activos: aria-selected="true" + tabindex="0"
□ Tabs inactivos: aria-selected="false" + tabindex="-1"
□ TabPanel activo: role="tabpanel" + aria-labelledby + tabindex="0"
□ TabPanel inactivo: atributo "hidden" (no solo display:none)
□ Badges incluidos en aria-label del tab
□ Close buttons: aria-label="Cerrar [Tab Name]"
□ IDs únicos por instancia (no globalmente secuenciales — evitar colisiones)

Keyboard
□ Arrow keys navegan entre tabs (dirección según Orientation)
□ Home/End: primer/último tab
□ Tab: sale del tablist, entra al panel
□ activationMode prop disponible (automatic=default, manual=opt-in)
□ Delete/Backspace cierra Closable tabs

Behavior
□ Solo un panel visible a la vez (inactive panels hidden)
□ Controlled mode disponible: value + onChange (para URL sync)
□ lazyBehavior o unmountOnHide implementado

Figma Handoff
□ Tab frames: Type(2) × State(5) × Size(2) = 20 gross, −2 exclusiones = 18 net
□ Tabs container frames: Orientation(2) × Type(2) × Size(2) = 8 gross, −2 exclusiones = 6 net
□ Exclusión documentada: Orientation=vertical + Type=contained
□ Boolean layers: 👁 Has Icon, 👁 Has Badge, 👁 Closable
```

---

## Related components

```
SegmentedControl
  └── Para 2–4 opciones de modo de vista que no tienen paneles de contenido
  └── Cuando las opciones son equivalentes y la selección es más como un toggle
  └── Diferencia clave: SegmentedControl cambia modo; Tabs muestra contenido

Accordion / Disclosure
  └── Cuando múltiples secciones pueden estar abiertas simultáneamente
  └── Para contenido de página larga que se expande verticalmente

NavigationMenu / SideNav
  └── Para navegación entre páginas (URLs distintas)
  └── Tabs con URL sync son una variante de navegación pero siguen siendo tabs

Badge
  └── Usado dentro de Tab (Has Badge=true) para contadores
  └── Badge component independiente para otras partes de la UI

Modal / Drawer
  └── Si el contenido del panel requiere un contexto de trabajo más grande
  └── Tabs dentro de Modal es un patrón válido para configuración multi-sección
```

---

## Reference: how other systems do it

### Material Design 3

MD3 provee dos componentes separados: `PrimaryTabRow` (navegación de nivel superior, abajo del app bar — scrollable o fija) y `SecondaryTabRow` (subdivisión de contenido in-page — siempre fija). No son variantes del mismo componente porque mezclar íconos con texto en tabs Secondary creó desorden visual en pruebas de usuario. La elección de fixed vs. scrollable debe hacerse upfront —el auto-switch al agregar un tab crea layout shifts inaceptables. Los íconos solo se soportan en Primary tabs.

### Spectrum (Adobe)

Los Tabs de Spectrum son arquitectónicamente los más composables en Tier 1: `Tabs` (state container), `TabList` (botones de tab) y `TabPanel` (paneles de contenido) pueden colocarse en distintas posiciones del DOM. El overflow colapsa el `TabList` completo en un dropdown Picker (no scroll horizontal) porque la visibilidad parcial de labels confunde a los usuarios sobre cuántos tabs existen. `keyboardActivation="manual"` desacopla la navegación del foco de la activación del panel, previniendo re-renders costosos en cada tecla de flecha. La capa dual React Spectrum (con tema) + React Aria (headless) comparte el mismo core de accesibilidad.

### Carbon (IBM)

Carbon provee dos variantes visuales: `Line` para contextos de contenido ligero y `Contained` para dashboards que necesitan fuerte anclaje visual entre tabs y panel. `activation="manual"` es una API prop de primera clase, abordando directamente el problema de rendimiento en paneles enterprise con muchos datos. El overflow usa botones de flecha en los bordes. `dismissable` habilita tabs cerrable con botón X.

### Polaris (Shopify)

Los Tabs de Polaris están construidos específicamente para vistas guardadas de administración de comercio y son los más completos para ese caso. Prop `badge` por tab para conteos. Acciones de tab (renombrar, duplicar, eliminar) via disclosure UI. `canCreateNewView` + `onCreateNewView` convierte el componente en un sistema de gestión de vistas generadas por el usuario. `fitted` distribuye tabs igualmente en el ancho disponible.

### Atlassian

Los Tabs de Atlassian son deliberadamente mínimos — una variante de line-style, sub-componentes que coinciden exactamente con el naming WAI-ARIA (`Tabs`/`TabList`/`Tab`/`TabPanel`). Sin overflow, sin badges, sin acciones integradas. `shouldUnmountTabPanelOnChange` controla si los paneles inactivos permanecen montados (preservación de estado) o se desmontan (rendimiento/datos frescos). Modo controlado via `selected`/`onChange` para navegación sincronizada con URL.

### Ant Design

Los Tabs de Ant Design son maximalistas: tres types (line/card/editable-card), cuatro posiciones de tab (top/right/bottom/left), slots de contenido extra (izquierda y derecha de la barra), `renderTabBar` completamente reemplazable, y creación/eliminación dinámica de tabs. `editable-card` añade botones de add-tab y close-tab, transformando el componente de navegación a gestión de documentos. `destroyInactiveTabPane` es el equivalente de `shouldUnmountTabPanelOnChange`.

### Sistemas Tier 2

**GitHub Primer:** `TabNav` para tabs con URL routing; `UnderlineNav` con badges de conteo. **Twilio Paste:** Basado en Reakit; variantes horizontal/vertical/inverse; opción fitted. **Salesforce Lightning:** Tabs scoped vs. default; dropdown de overflow para muchos tabs. **shadcn/ui:** Primitivos Radix UI; keyboard-managed tablist; controlado/no controlado.

### Sistemas Tier 3

**Radix UI:** `Tabs.Root`/`Tabs.List`/`Tabs.Trigger`/`Tabs.Content` headless; `activationMode` (automatic/manual); `forceMount` por panel. **Chakra UI:** Cinco variantes visuales; `isLazy` + `lazyBehavior`; `isFitted`; `colorScheme`. **GOV.UK:** Progressive enhancement: links de anchor sin JS → widget ARIA con JS; hash de URL; guía de máx. 4 tabs. **Mantine:** API de valor string (no índice); `inverted` para bottom-tabs; `loop`; 4 variantes. **Fluent 2:** Solo navegación (sin gestión de contenido); `appearance` (subtle/transparent); `size="small"` para toolbars; vertical.

---

## Tokens

**24 tokens** · prefix `tab-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| tab/sm/h | sizing/32 | Altura Tab Size=sm (32px) |
| tab/md/h | sizing/40 | Altura Tab Size=md (40px) |
| tab/line/default/fg | text/secondary | Text tab inactivo en line |
| tab/line/hover/bg | surface/hover | Background hover en line |
| tab/line/hover/fg | text/primary | Text tab hover en line |
| tab/line/active/fg | interactive/default | Text + indicator tab activo line |
| tab/line/active/indicator | interactive/default | Línea indicadora activa (2px) |
| tab/line/disabled/fg | text/disabled | Text tab disabled |
| tab/contained/default/fg | text/secondary | Text tab inactivo en contained |
| tab/contained/active/bg | surface/default | Fondo tab activo en contained |
| tab/contained/active/fg | text/primary | Text tab activo en contained |
| tab/contained/active/shadow | elevation/1 | Shadow tab activo en contained |
| tab/focused/ring | focus/ring | Focus ring (2px, offset 2px) |
| tab/indicator/thickness | border/2 | Grosor del indicator line (2px) |
| tab/radius/sm | radius/sm | Border radius Tab Size=sm (6px) |
| tab/radius/md | radius/md | Border radius Tab Size=md (8px) |
| tab/fontSize/sm | type/body-sm | Font size Tab Size=sm (13px) |
| tab/fontSize/md | type/body-md | Font size Tab Size=md (14px) |
| tab/fontWeight | type/weight-medium | Peso tipográfico tabs (500) |
| tab/gap/sm | spacing/1.5 | Gap ícono-label Size=sm (6px) |
| tab/gap/md | spacing/2 | Gap ícono-label Size=md (8px) |
| tab/px/sm | spacing/3 | Padding horizontal Size=sm (12px) |
| tab/px/md | spacing/4 | Padding horizontal Size=md (16px) |
| tab/container/borderBottom | border/1 | Borde inferior del tablist (1px) |

### Spacing specs

```
Tab Size specs:
  sm:  height 32px · px 12px · gap 6px · iconSize 16px · radius 6px
  md:  height 40px · px 16px · gap 8px · iconSize 20px · radius 8px

Tab container specs:
  sm:  gap entre tabs 4px · py 4px · border-bottom 1px
  md:  gap entre tabs 8px · py 6px · border-bottom 1px

Focus ring:
  width: 2px · offset: 2px · color: focus/ring

Active indicator (Type=line):
  thickness: 2px · position: bottom (horizontal) / left (vertical)
  color: interactive/default

Frame counts:
  Tab:  Type(2) × State(5) × Size(2) = 20 gross, −2 exclusiones = 18 net
  Tabs: Orientation(2) × Type(2) × Size(2) = 8 gross, −2 exclusiones = 6 net
  Total: 24 frames netos
```
