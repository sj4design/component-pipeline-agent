# CommandPalette

## Overview

CommandPalette es un launcher de comandos invocado por teclado (patrón Cmd+K) que combina un campo de búsqueda filtrable con una lista agrupada de acciones navigables. Es el punto de acceso más eficiente para usuarios avanzados — desde cualquier pantalla, con un atajo, pueden navegar, ejecutar acciones y cambiar configuración sin salir de su flujo de trabajo.

El patrón establece como referencia VS Code (Cmd+Shift+P), Raycast, Linear y GitHub. La palette vive dentro de un Dialog/Modal como overlay central — el Dialog provee el focus trap, el portal rendering y el Escape para cerrar, mientras CommandPalette provee la lógica de búsqueda, filtrado y navegación.

```
┌──────────────────────────────────────────────────────────┐
│  🔍  Buscar comandos...                             ⌘K   │  ← searchInput
├──────────────────────────────────────────────────────────┤
│  RECIENTES                                                │  ← groupHeader
│  ▶ 📄 Abrir último archivo                        ⌘O    │  ← CommandItem
│  ▶ 🔀 Cambiar rama                                ⌘B    │
├──────────────────────────────────────────────────────────┤
│  NAVEGACIÓN                                               │
│  ▶ 🏠 Ir al Dashboard                                   │
│● ▶ ⚙️  Configuración                              ⌘,    │  ← highlighted (focused)
│  ▶ 👥 Miembros del equipo                                │
├──────────────────────────────────────────────────────────┤
│  ACCIONES                                                 │
│  ▶ ✏️  Editar perfil                                     │
│  ▶ 🗑️  Archivar proyecto                                 │
├──────────────────────────────────────────────────────────┤
│  ↑↓ navegar  · ↵ seleccionar  · esc cerrar               │  ← footer
└──────────────────────────────────────────────────────────┘

Estado vacío:
┌──────────────────────────────────────────────────────────┐
│  🔍  xyz                                                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│          No se encontraron resultados para "xyz"         │
│                                                          │
└──────────────────────────────────────────────────────────┘

Estado loading:
┌──────────────────────────────────────────────────────────┐
│  🔍  Buscando...                                  ⟳      │
├──────────────────────────────────────────────────────────┤
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄  ← skeleton loader                       │
└──────────────────────────────────────────────────────────┘
```

El sub-componente `CommandItem` es el bloque atómico — cada acción en la lista. Tiene slots para ícono, label, descripción opcional, badge (New/Pro) y shortcut keyboard.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
CommandItem:
  State:  default | hover | selected | focused | disabled
  Size:   sm | md

CommandPalette:
  State:     default | empty | loading
  Size:      sm | md | lg
  HasFooter: no | yes
```

Toggles (show/hide parts — do NOT generate extra variants):

```
CommandItem:
  👁 Has Icon
  👁 Has Description
  👁 Has Shortcut
  👁 Has Badge
```

### Figma properties panel

```
┌─────────────────────────────┐
│  CommandItem                │
│  ─────────────────────────  │
│  State   [default       ▼]  │
│  Size    [md            ▼]  │
│  ─────────────────────────  │
│  ☐ Has Icon                 │
│  ☐ Has Description          │
│  ☐ Has Shortcut             │
│  ☐ Has Badge                │
│  ─────────────────────────  │
│  ✏️ Label  [Ir a inicio    ] │
│  ✏️ Desc.  [Abre dashboard ] │
│  🔄 Icon   [arrow-right   ] │
└─────────────────────────────┘

┌─────────────────────────────┐
│  CommandPalette             │
│  ─────────────────────────  │
│  State     [default     ▼]  │
│  Size      [md          ▼]  │
│  HasFooter [no          ▼]  │
└─────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita acceso rápido a acciones/navegación?
│
├─ ¿Usuarios avanzados con keyboard proficiency?
│   ├─ Muchas páginas / acciones → CommandPalette (Cmd+K)
│   └─ Pocas acciones contextuales → ContextMenu o ActionMenu
│
├─ ¿Usuarios no técnicos / onboarding?
│   └─ CommandPalette con botón visible en header + onboarding
│       (no solo keyboard shortcut — añadir affordance visual)
│
├─ ¿Contexto de healthcare o safety-critical?
│   └─ NO implementar — riesgo de ejecución ambigua de comandos
│       (Nord excluye deliberadamente por esta razón)
│
└─ ¿Solo búsqueda de contenido sin acción inmediata?
    └─ SearchInput o SearchBar (no CommandPalette)
```

**Usar CommandPalette cuando:**
- La aplicación tiene muchas pantallas o acciones y los usuarios necesitan acceso rápido desde cualquier punto de la UI sin navegar físicamente.
- El producto tiene usuarios power-user o developers que valoran la eficiencia por encima de la exploración visual.
- Se quiere mejorar la discoverabilidad de atajos de teclado mostrándolos inline junto a cada acción.
- La app tiene estructura de comandos categorizables (navegación, acciones, configuración, recientes).

**NO usar CommandPalette cuando:**
- El contexto es healthcare, alertas de seguridad o cualquier dominio donde la ejecución ambigua de un comando puede tener consecuencias irreversibles o de seguridad (Nord documenta este riesgo explícitamente).
- Los usuarios no tienen keyboard proficiency — añadir siempre un affordance visual visible (botón en header) junto al shortcut, nunca solo el shortcut.
- El producto tiene ≤ 5 páginas/acciones — un menú regular o nav estándar es suficiente y menos complejo de mantener.
- El contexto requiere progressive enhancement sin JavaScript (GOV.UK excluye command palettes por este principio).

---

## Visual variations

### CommandItem — tamaños

| Size | Alto | Padding H | Gap | Font label | Font desc. | Icon size |
|------|------|-----------|-----|------------|------------|-----------|
| sm   | 36px | 12px      | 10px | 13px     | 12px       | 16px      |
| md   | 44px | 16px      | 12px | 14px     | 13px       | 18px      |

### CommandItem — estados

**default:** Fondo transparente, texto `text/primary` (#121213).

**hover:** Fondo `surface/hover` (#F7F7F8), texto `text/primary`. Sin transición de border.

**focused:** Fondo `surface/hover` con highlight visual. Estado diferenciado del hover porque ocurre solo via teclado (aria-activedescendant). Sin mover el foco DOM.

**selected:** Fondo `brand/subtle` (#EEF2FF), texto `interactive/default` (#2659EB), font-weight 500. Indica el último comando ejecutado o la opción actualmente activa en flujos multi-step.

**disabled:** Fondo transparente, texto `text/disabled`, opacidad 60%. El item no es seleccionable ni ejecutable.

### CommandPalette — tamaños

| Size | Ancho | Max. alto | Alto search |
|------|-------|-----------|-------------|
| sm   | 480px | 360px     | 44px        |
| md   | 640px | 480px     | 52px        |
| lg   | 720px | 560px     | 56px        |

### CommandPalette — estados

**default:** Lista de resultados con grupos y items. Estado normal de uso.

**empty:** El área de resultados muestra el empty state. El search input permanece activo. El mensaje debe ser descriptivo ("No se encontraron resultados para '[query]'"), no genérico.

**loading:** Skeleton o spinner en el área de resultados mientras carga async. El search input permanece activo. Si el loading dura más de 300ms siempre mostrar el estado.

### HasFooter

**HasFooter=no:** La palette termina en la última acción/grupo visible.

**HasFooter=yes:** Footer con hints de keyboard: "↑↓ navegar · ↵ seleccionar · esc cerrar". Fondo `surface/hover`, texto `text/secondary`, font-size xs (12px). Mejora la discoverabilidad para usuarios nuevos que no conocen la navegación por teclado.

---

## Design decisions

### 1. Pattern: combobox dentro de dialog (no listbox standalone)

**Por qué:** CommandPalette es un search input + listbox linkeados — el combobox ARIA pattern canónico. `aria-activedescendant` en el input permite hacer highlight de items sin perder el foco del input, lo que es crítico para el tipado continuo: cada keystroke filtra inmediatamente sin requerir Tab de vuelta al campo. Si el foco DOM se moviera al listbox, el usuario necesitaría Tab para volver a tipear — rompe el flujo.

**Tradeoff:** El Dialog provee el overlay, focus trap y Escape. Sin Dialog, el CommandPalette necesitaría reimplementar focus trap y portal rendering — lógica ya resuelta. La composición Dialog + CommandPalette es la división de responsabilidades correcta.

### 2. Grouped items con category headers

**Por qué:** Slack, Linear y GitHub agrupan por categoría ("Recientes", "Navegación", "Acciones", "Configuración"). La agrupación mejora la discoverabilidad en palettes con muchos comandos — el usuario sabe dónde buscar según el tipo de acción. Sin grupos, palettes con >10 items se convierten en listas difíciles de escanear.

**Tradeoff:** Los group headers ocupan espacio vertical y reducen el número de items visibles en la altura máxima de la palette. Para palettes pequeñas (≤6 items), una lista plana sin grupos es más eficiente visualmente.

### 3. Shortcut badges inline en items (decorativo, no funcional en el componente)

**Por qué:** Los power users necesitan ver los atajos de teclado para aprenderlos — el "⌘," junto a "Configuración" es una affordance de aprendizaje. La distinción crítica: el badge muestra el shortcut pero NO lo vincula. La binding real del shortcut es responsabilidad de la aplicación (`useEffect` + `window.addEventListener`). El componente es decorativo en este aspecto.

**Tradeoff:** Si el shortcut cambia (ej. por conflicto con otro atajo del browser), el badge debe actualizarse manualmente. El componente no puede auto-detectar bindings activas — esa información debe pasarse como datos desde la aplicación.

### 4. Typing = fuzzy search automático

**Por qué:** No requiere submit — el tipado filtra en tiempo real. `aria-live="polite"` anuncia el resultado count cuando cambia ("5 resultados disponibles"). El fuzzy search (tolera typos, "cfg" encuentra "Configuración") mejora significativamente la UX frente al exact match para palettes con nombres de acciones en lenguaje natural. cmdk (shadcn) es la referencia: "rct" encuentra "React".

**Tradeoff:** El fuzzy search requiere una librería o implementación custom. Para listas estáticas pequeñas (≤20 items), un `includes()` es suficiente y más predecible para el usuario.

---

## Behavior

### Essential for design

Al abrirse, el foco se mueve al campo `searchInput` inmediatamente. El usuario puede tipear sin hacer click. Arrow Up/Down navegan los items usando `aria-activedescendant` sin mover el foco DOM. Enter ejecuta el item resaltado y cierra la palette. Escape cierra la palette y regresa el foco al elemento que la triggeró.

La lista es scrollable si el contenido supera `maxH`. La palette no hace scroll del viewport — vive dentro de su contenedor scroll.

**Nested pages (opcional):** Si un item abre un sub-nivel, la palette muestra un header "← [Contexto] · 🔍 Buscar..." con un back button. Escape desde el sub-nivel navega back al nivel raíz, no cierra la palette directamente.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Contenedor overlay | `dialog` | `aria-modal="true"`, `aria-label="Paleta de comandos"` | Focus trap; Escape gestiona el cierre; screen reader anuncia el contexto |
| Search input | `combobox` | `aria-expanded="true"`, `aria-controls="[list-id]"`, `aria-activedescendant="[item-id]"`, `aria-label="Buscar comandos"` | El AT anuncia el item resaltado con cada navegación por teclado |
| Results list | `listbox` | `id="[list-id]"`, `aria-label="Resultados"` | Referenciado por `aria-controls` del input |
| CommandItem | `option` | `aria-selected="true/false"` | Screen reader anuncia el estado de selección |
| Group header | `presentation` con heading interior | `role="group"`, `aria-label="[nombre del grupo]"` | Categoriza items sin ser un item seleccionable |
| Empty state | `status` | `aria-live="polite"` | Anuncia "No se encontraron comandos para '[query]'" al usuario |
| Footer | `contentinfo` | — | Información de keyboard hints; decorativo para AT |

### Keyboard navigation

Primary interactions (affect design):

```
Cmd/Ctrl + K   → abre palette (trigger — binding en la aplicación)
Arrow Up / Down → navega items (virtual focus via aria-activedescendant)
Enter          → ejecuta el item resaltado + cierra palette
Escape         → cierra palette (o navega back si hay sub-nivel activo)
Typing         → filtra items en tiempo real (fuzzy search)
```

Secondary interactions (dev reference):

```
Tab            → sale del search input (no navega entre items — combobox pattern)
Home / End     → va al primer/último item del listbox
Backspace      → (si hay input) borra el último carácter del query
Cmd/Ctrl + K   → cierra palette si ya está abierta (toggle)
```

---

## Content guide

### Slot: searchInput

Campo de búsqueda siempre al top. Placeholder contextual: "Buscar comandos..." es el más genérico. Para palettes especializadas: "Buscar páginas", "Ir a...", "Buscar acciones". El placeholder no es label — el `aria-label` en el input es el label accesible.

La altura del search varía con el tamaño de la palette (44/52/56px) para mantener proporciones. El search ocupa 100% del ancho interno de la palette.

### Slot: groupHeader

Texto en mayúsculas pequeñas o semibold que categoriza el grupo de items debajo. Ejemplos efectivos: "RECIENTES", "NAVEGACIÓN", "ACCIONES", "CONFIGURACIÓN", "HERRAMIENTAS". No usar grupos si hay <5 items en total — añade overhead cognitivo sin beneficio de escaneo.

### Slot: items (CommandItem)

Cada item tiene:
- **Label (required):** Nombre de la acción. Imperativo y conciso: "Crear proyecto", "Ir a Dashboard", "Abrir configuración". No "Configuración abierta" ni "Dashboard".
- **Description (optional):** Contexto adicional. Útil para acciones ambiguas: "Ir a Dashboard — Abre el panel principal de tu workspace". Máximo 60 caracteres.
- **Icon (optional):** Ícono representativo de la acción. Usa íconos consistentes con los de la navegación principal para reforzar la asociación mental.
- **Shortcut (optional):** Badge de keyboard shortcut. Solo mostrar si el shortcut es real y está activo. "⌘K", "⌘,", "⌘N". El texto del badge es decorativo para AT.
- **Badge (optional):** Indicador de estado de la feature: "Nuevo", "Beta", "Pro". Solo para acciones con features nuevas o de pago.

### Slot: emptyState

Siempre mostrar cuando no hay resultados. Nunca dejar el área de resultados vacía en silencio — los usuarios de screen reader no sabrán si el sistema está cargando, falló o genuinamente no tiene resultados. Texto sugerido: "No se encontraron resultados para '[query]'". Icono opcional de búsqueda o lupa.

### Slot: footer

Hints de teclado. Muestra el mínimo necesario: "↑↓ navegar · ↵ seleccionar · esc cerrar". No añadir más hints — el footer no debe competir con la lista. Solo mostrar `HasFooter=yes` en la primera semana de uso o para usuarios sin experiencia previa con palettes (detectable via localStorage flag o feature flag).

---

## Pre-build checklist

```
COMMANDITEM
□ 5 states: default, hover, selected, focused, disabled
□ 2 sizes: sm(36px), md(44px)
□ Boolean layers nombrados: icon, description, shortcut, badge
□ Text layer "label" con default "Ir a inicio"
□ Text layer "description" con default "Abre el dashboard principal"
□ Swap slot "icon" con default "icon/arrow-right"
□ Frame count: State(5) × Size(2) = 10 frames

COMMANDPALETTE
□ 3 states: default, empty, loading
□ 3 sizes: sm(480×360px), md(640×480px), lg(720×560px)
□ 2 HasFooter modes: no, yes
□ Frame count: State(3) × Size(3) × HasFooter(2) = 18 frames

ACCESIBILIDAD
□ Overlay: role="dialog" + aria-modal="true" + aria-label
□ Search: role="combobox" + aria-expanded + aria-controls + aria-activedescendant
□ Results: role="listbox" + aria-label="Resultados"
□ Items: role="option" + aria-selected
□ Groups: role="group" + aria-label para cada categoría
□ Empty state: aria-live="polite" con mensaje descriptivo
□ Focus: al abrir → foco al search; al cerrar → foco al trigger
□ Shortcut badges: texto decorativo (no anunciado como binding)

TOKENS
□ Prefix cmd- aplicado a todas las variables
□ 20 tokens totales
□ Shadow del overlay: elevation/4
□ Item hover/selected backgrounds vinculados a tokens de surface
```

---

## Related components

```
Dialog/Modal        → overlay wrapper requerido (focus trap + portal + Escape)
SearchInput         → búsqueda de contenido sin acción inmediata
ActionMenu          → menú de acciones sin búsqueda (contextuales, no globales)
ContextMenu         → acciones contextuales al right-click
Combobox            → selección de valor de formulario con sugerencias
NavigationMenu      → navegación persistente (no invocada por keyboard)
```

---

## Reference: how other systems do it

### shadcn/ui — El estándar composable: cmdk + Dialog

shadcn/ui `Command` es el único componente de command palette disponible en un design system de Tier 1 que es verdaderamente genérico y composable. Construido sobre la librería `cmdk` de Rauno Freiberg (Vercel), expone primitives: `Command`, `CommandGroup` (con `heading`), `CommandItem` (con `onSelect`), `CommandShortcut`, `CommandEmpty`, `CommandLoading`, `CommandSeparator`. La composición estándar es `Command` dentro de `Dialog` — el Dialog gestiona el overlay, focus trap y Escape; Command gestiona el filtrado, navegación y ejecución. El trigger Cmd+K es un `useEffect` externo que llama `dialog.open()` — separation of concerns limpia.

La innovación técnica central es el virtual focus: el search input mantiene el foco DOM siempre, navegación por Arrow keys modifica `aria-activedescendant` — esto garantiza que cada keystroke filtre inmediatamente sin interrumpir el flujo de tipado.

### Mantine Spotlight — Batteries-included: acciones declaradas, filtrado automático

Mantine Spotlight (`@mantine/spotlight`) es la implementación más completa en los 24 sistemas. A diferencia del approach composable de cmdk, Spotlight es un componente totalmente ensamblado: se declaran acciones como objetos con `label`, `description`, `icon` y `onTrigger`, y Spotlight gestiona búsqueda, filtrado, agrupación, navegación y ciclo de vida del overlay. `spotlight.open()` / `spotlight.close()` como API imperativa conecta naturalmente con keyboard shortcuts globales.

Nested pages (drill-down navigation) permiten flujos multi-step: abrir Spotlight → seleccionar "Cambiar proyecto" → mostrar lista secundaria de proyectos. Escape navega back un nivel antes de cerrar el overlay. `numberOfColumns` controla grids multi-columna para palettes con íconos dominantes.

### VS Code (referencia de producto) — El modelo UX de la industria

VS Code Cmd+Shift+P es la referencia original que popularizó el patrón y define el UX esperado: prefix-based mode switching (> comandos, @ símbolos, : líneas), recent items persistence, fuzzy matching con highlight de caracteres, agrupación por categoría, shortcut inline. La brecha entre Fluent 2 (sin componente) y los productos Microsoft (VS Code, Windows Terminal, PowerToys Run — los mejores command palettes de la industria) es la evidencia más fuerte de que las palettes son features de producto que requieren integración profunda con routing y action registries, no standalone UI components.

### GitHub Cmd+K (referencia de producto) — El modelo para web apps

GitHub Cmd+K demuestra el command palette en web: búsqueda global (repos, issues, PRs), navegación a cualquier página de admin, ejecución de acciones (crear issue, cambiar tema), nested subpages (seleccionar repo, luego buscar dentro), recent items, shortcut display. Construido sobre Primer ActionList + TextInput + Dialog — no expuesto como componente público de Primer. Es la referencia de facto para product palettes en web.

### Sistemas que lo omiten deliberadamente

22 de 24 sistemas no tienen command palette como componente. Las razones más instructivas: **Material Design 3** (el modelo de navegación asume superficies persistentes visibles, no overlays invocados por teclado), **Spectrum** (taxonomía estricta separa search de action execution), **GitHub Primer** (Cmd+K existe en github.com pero no como componente público — demasiado integrado con routing interno), **GOV.UK** (conflicto con progressive enhancement — requiere JavaScript, ambigüedad de ejecución es un riesgo de accesibilidad), **Nord** (riesgo de seguridad clínica — ejecución ambigua de comandos puede seleccionar medicamento/procedimiento incorrecto).

La lección: el UI component del command palette es trivial; la parte difícil es la integración con routing, permission system y action execution. Planificar esa capa de integración antes de elegir el componente de UI.

---

## Tokens

**20 tokens** · prefix `cmd-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `cmd/w/sm` | `sizing/480` | Ancho palette sm |
| `cmd/w/md` | `sizing/640` | Ancho palette md |
| `cmd/w/lg` | `sizing/720` | Ancho palette lg |
| `cmd/bg` | `surface/default` | Fondo del overlay |
| `cmd/border` | `border/default` | Borde del overlay |
| `cmd/radius` | `radius/lg` (16px) | Radio del overlay |
| `cmd/shadow` | `elevation/4` | Sombra del overlay |
| `cmd/search/h/sm` | `sizing/44` | Alto del search sm |
| `cmd/search/h/md` | `sizing/52` | Alto del search md |
| `cmd/search/h/lg` | `sizing/56` | Alto del search lg |
| `cmd/item/sm/h` | `sizing/36` | Alto CommandItem sm |
| `cmd/item/md/h` | `sizing/44` | Alto CommandItem md |
| `cmd/item/hover/bg` | `surface/hover` | Fondo hover/focused |
| `cmd/item/selected/bg` | `brand/subtle` | Fondo selected (#EEF2FF) |
| `cmd/item/selected/fg` | `interactive/default` | Texto selected (#2659EB) |
| `cmd/item/selected/fontWeight` | `type/weight-medium` | Font weight selected (500) |
| `cmd/item/disabled/opacity` | `opacity/disabled` | Opacidad disabled (60%) |
| `cmd/footer/bg` | `surface/hover` | Fondo del footer |
| `cmd/footer/fg` | `text/secondary` | Texto del footer |
| `cmd/footer/fontSize` | `type/xs` | Font size footer (12px) |
| `cmd/shortcut/bg` | `surface/pressed` | Fondo de shortcut badges |

### Spacing specs

```
CommandPalette — tamaños:
  sm: width=480px, maxHeight=360px, searchHeight=44px
  md: width=640px, maxHeight=480px, searchHeight=52px
  lg: width=720px, maxHeight=560px, searchHeight=56px

CommandPalette — spacing interno:
  padding lateral (search): 16px
  gap entre grupos: 8px
  padding de group header: 8px horizontal, 4px vertical
  divider entre grupos: 1px, border/default

CommandItem — tamaños:
  sm: height=36px, paddingH=12px, gap=10px
  md: height=44px, paddingH=16px, gap=12px

CommandItem — iconos:
  sm: 16×16px
  md: 18×18px

Shortcut badges:
  padding: 2px 6px
  radius: 4px
  font: monospace, 11px
  background: surface/pressed

Footer:
  height: 36px
  padding: 0 16px
  border-top: 1px border/default
  font-size: 12px (text/secondary)

Overlay radius: 16px (radius/lg)
Overlay shadow: elevation/4 (sombra pronounciada de modal)
```
