# Search

## Overview

El componente Search es un campo de búsqueda especializado que extiende el input de texto con semántica, comportamiento y accesibilidad específicos para búsqueda. A diferencia de un TextField genérico, Search agrega un landmark navegable (`role="search"`), separación entre `onChange` (keystroke) y `onSubmit` (Enter), botón de limpiar automático, indicador de carga y soporte para un modo expandible que colapsa a ícono en toolbars densos. Es uno de los componentes con mayor adopción cross-sistema: 17 de 24 sistemas de diseño revisados incluyen un Search dedicado.

```
Search (default, md)
┌──────────────────────────────────────────────────────────────┐
│  role="search" (landmark wrapper)  aria-label="Buscar X"     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🔍  Buscar...                                   ✕  🔘  │  │
│  └────────────────────────────────────────────────────────┘  │
│  └─ search-icon (requerido)   clear (Has Value)  submit-btn  │
└──────────────────────────────────────────────────────────────┘

Search (expandable, collapsed)
┌──────────────────────────────────────────────────────────────┐
│  [toolbar items...]    [🔍]  ← colapsado a icon-button       │
└──────────────────────────────────────────────────────────────┘

Search (expandable, expanded)
┌──────────────────────────────────────────────────────────────┐
│  [toolbar items...]  ┌──────────────────────┐ [✕]            │
│                      │ 🔍  Buscar...         │               │
│                      └──────────────────────┘               │
└──────────────────────────────────────────────────────────────┘
```

El componente se integra como campo inline — no tiene focus trap. En `Variant=expandable`, el input se expande al recibir foco y colapsa al presionar Escape o al perder foco sin valor.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Size:    sm | md | lg
Variant: default | expandable
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Value      → muestra/oculta clear button (slot: clear)
Has Loading    → muestra/oculta spinner de carga (slot: loading)
Has Submit Btn → muestra/oculta botón explícito de búsqueda (slot: submit-btn)
```

### Figma properties panel

```
╔══════════════════════════════════╗
║  Search                          ║
╠══════════════════════════════════╣
║  Size      ○ sm  ● md  ○ lg      ║
║  Variant   ● default  ○ expandable║
╠══════════════════════════════════╣
║  Has Value      [ Toggle ]       ║
║  Has Loading    [ Toggle ]       ║
║  Has Submit Btn [ Toggle ]       ║
╠══════════════════════════════════╣
║  ✏️ Placeholder  [Buscar...]     ║
╚══════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿El usuario necesita encontrar algo dentro de un conjunto de datos?
├── Sí → ¿El conjunto es local (datos en memoria)?
│         ├── Sí → Search con onChange (filtrado en tiempo real)
│         └── No → Search con onSubmit (API call)
│
└── No → ¿Es para navegar entre secciones de contenido?
          ├── Sí → Tabs (no Search)
          └── No → Input (contexto de formulario, no de búsqueda)
```

**Use Search when:**
- El usuario necesita encontrar registros, archivos, contactos, o items dentro de una lista o dataset.
- El contexto es una barra de búsqueda de aplicación, filtro de tabla, o campo de búsqueda global.
- Se requiere semántica de landmark `role="search"` para que usuarios de AT puedan navegar directamente al campo de búsqueda.
- La acción de limpiar el campo es una necesidad frecuente (listados largos, búsquedas iterativas).

**Do NOT use Search when:**
- El campo es parte de un formulario de datos estructurado (nombre, email, teléfono) — usar TextField.
- La búsqueda se reemplaza por un Command Palette con items predefinidos (⌘K / Ctrl+K) — usar CommandPalette.
- El contexto es autocompletar sobre una lista cerrada de opciones — usar Combobox.
- Se necesita buscar dentro de texto seleccionado o en un editor — ese es un control nativo del navegador.

---

## Visual variations

### Por tamaño

| Size | Altura | Padding H | Font size | Icon size | Radius |
|------|--------|-----------|-----------|-----------|--------|
| sm   | 32px   | 8px       | 12px/16   | 16px      | 6px    |
| md   | 40px   | 12px      | 14px/20   | 16px      | 6px    |
| lg   | 48px   | 16px      | 16px/24   | 20px      | full   |

El tamaño `lg` usa `border-radius: 9999px` (pill shape) — referencia al Search global de M3 y al hero-search de marketing.

### Por variante

**default** — campo siempre visible con borde de 1px. Fondo blanco, borde `border/default`. Al recibir foco: borde cambia a `border/focus` (azul).

**expandable** — colapsa a un icon-button de búsqueda (sin borde). Al hacer click o focus: anima la expansión del input. Al perder foco sin contenido o al presionar Escape: colapsa de nuevo. Usado en toolbars densos donde el espacio horizontal es premium.

### Estados

| Estado | Visual |
|--------|--------|
| Default (vacío) | Borde gris, placeholder texto subtlest, search-icon gris |
| Focused (escribiendo) | Borde azul focus, placeholder desaparece, cursor activo |
| Has Value | Aparece clear button (X) en trailing position |
| Has Loading | Spinner reemplaza search-icon (or alongside) |
| Disabled | Fondo surface/disabled, todo opacado |
| Expandable collapsed | Solo icon-button visible |
| Expandable expanded | Input full width visible, foco automático |

### Combinaciones excluidas

```
Variant=expandable + Size=lg → EXCLUIDA
Razón: expandable se usa en toolbars densos (necesita compacidad), lg es para hero-search;
       son contextos incompatibles.
```

---

## Design decisions

### 1. Componente separado de TextField (no prop `type="search"`)

**Por qué:** Spectrum y Polaris hacen esta separación explícitamente. Search agrega `onSubmit`, `onClear`, `enterKeyHint`, y `role="search"` — conceptos que no pertenecen a un input genérico. Mezclarlos en TextField contaminaria su API con semántica de búsqueda específica.

**Tradeoff:** Dos componentes a mantener en lugar de uno. El beneficio es un contrato de API claro: quien necesita semántica de búsqueda importa Search, no configura un TextField.

### 2. `onChange` vs `onSubmit` separados por comportamiento

**Por qué:** Spectrum separa explícitamente estos callbacks. `onChange` dispara en cada keystroke (para filtrado local), `onSubmit` solo en Enter (para llamadas API). Mezclarlos es el bug de performance más común en implementaciones de búsqueda: query API call por cada keystroke sin debounce.

**Tradeoff:** API levemente más verbosa. El beneficio es estructural: el nombre del callback fuerza el modelo mental correcto. Es imposible "accidentalmente" cablear lógica de submit a onChange.

### 3. Variant=expandable colapsa a ícono (toolbar pattern)

**Por qué:** Carbon implementa esta variante para toolbars densos en data tables y paneles de configuración. Zoom tiene toolbars en meetings, configuración y administración donde el espacio horizontal es limitado. Un Search que siempre ocupa ancho completo no es viable en estos contextos.

**Tradeoff:** Comportamiento más complejo (expand/collapse, foco automático, Escape para colapsar). La alternativa — un Search siempre visible — consume espacio premium en toolbars donde es usado esporádicamente.

### 4. `role="search"` en el wrapper (landmark navigation)

**Por qué:** Carbon aplica este landmark automáticamente. Sin él, usuarios de AT con JAWS/NVDA no pueden navegar directamente al campo de búsqueda mediante la tecla F (form controls landmark). El landmark convierte el Search en un punto de navegación de primera clase en la página.

**Tradeoff:** Requiere un `aria-label` descriptivo en el wrapper (ej. "Buscar contactos") para que el landmark tenga nombre. Un landmark sin nombre es menos útil que ninguno.

### Excluded combinations

```
Variant=expandable + Size=lg → excluida (contextos incompatibles)
Has Loading + Has Submit Btn → evitar simultáneo (visual conflict en trailing)
```

---

## Behavior

### Essential for design

El Search opera en dos modos funcionales que el diseñador debe decidir antes de wiring:

1. **Filtrado en tiempo real** (`onChange`): cada keystroke actualiza los resultados. Para datasets locales en memoria. Sin debounce requerido en el componente.
2. **Submit explícito** (`onSubmit`): Enter o click en submit-btn dispara la búsqueda. Para API calls. El spinner (`Has Loading`) aparece mientras espera respuesta.

**Clear button** (`Has Value=true`): aparece automáticamente cuando hay valor en el input. Al hacer click: limpia el campo y dispara `onClear`. En `Variant=expandable`: también colapsa el input.

**Foco automático** en `Variant=expandable`: al expandir el input (click/tap en el icon-button), el campo recibe foco automáticamente. Sin foco automático, el usuario tendría que hacer dos interacciones para empezar a escribir.

**Shortcut opcional `/`**: activar el campo de búsqueda desde fuera del componente. Implementado a nivel de app con la prop `focused` (Polaris pattern) — no requiere `useRef + .focus()` manual.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Wrapper div | `search` (landmark) | `aria-label="Buscar [contexto]"` | Navegación directa por AT a campo de búsqueda |
| Input | — | `type="search"`, implícitamente `role="searchbox"` | AT anuncia "campo de búsqueda" (no solo "campo de texto") |
| Input | — | `aria-label` o `<label>` asociado | Nombre accesible del campo |
| Input (loading) | — | `aria-busy="true"` | SR anuncia que hay una operación en progreso |
| Clear button | `button` | `aria-label="Limpiar búsqueda"` | Sin aria-label el botón X no tiene nombre accesible |
| Submit button | `button` | `aria-label="Buscar"` | Nombre accesible del botón explícito |

### Keyboard navigation

Primary interactions (affect design):

```
Enter         → dispara onSubmit (búsqueda)
Escape        → limpia el campo; si Variant=expandable: también colapsa
/             → (shortcut opcional) activa el campo de búsqueda desde fuera
Tab           → mueve foco entre input → clear button → submit button
```

Secondary interactions (dev reference):

```
Backspace/Delete  → edición normal del texto
Ctrl+A            → seleccionar todo el texto
Home/End          → cursor al inicio/final del texto
Ctrl+Z            → deshacer (comportamiento nativo del browser)
```

---

## Content guide

### Slot: input (placeholder)

El placeholder no reemplaza al label — es una pista contextual sobre qué buscar.

- **Correcto:** "Buscar contactos", "Buscar por nombre o email", "Filtrar productos"
- **Incorrecto:** "Buscar...", "Escribe aquí", "Search"

El placeholder desaparece al escribir. Si el campo no tiene label visible, el `aria-label` del wrapper debe ser descriptivo.

### Slot: aria-label del landmark

El landmark `role="search"` necesita un nombre que identifique el alcance de la búsqueda, no la acción:

- **Correcto:** "Buscar en contactos", "Búsqueda global", "Filtrar reuniones"
- **Incorrecto:** "Campo de búsqueda", "Search"

### Slot: clear button (aria-label)

Siempre debe tener `aria-label="Limpiar búsqueda"` — nunca solo un ícono X sin nombre. Gestalt es el único sistema que hace este label un required prop; nosotros lo adoptamos como patrón.

### Slot: loading indicator

El spinner reemplaza (o complementa) el search-icon durante la búsqueda. El `aria-busy="true"` en el input comunica el estado al SR. No necesita texto visible en contextos de búsqueda inline.

### Slot: submit button

Útil cuando la búsqueda no es evidente (enterprise, usuarios no-técnicos, GOV.UK pattern). El label debe ser texto visible o `aria-label` descriptivo — no solo un ícono de búsqueda, ya que el input ya tiene uno.

---

## Pre-build checklist

```
[ ] Size sm, md, lg generados como variants en Figma
[ ] Variant default y expandable generados
[ ] Has Value toggle muestra/oculta clear button (slot: clear)
[ ] Has Loading toggle muestra/oculta spinner (slot: loading)
[ ] Has Submit Btn toggle muestra/oculta submit-btn (slot: submit-btn)
[ ] Exclusión Variant=expandable + Size=lg aplicada (frame eliminado)
[ ] Placeholder text en slot input: "Buscar..."
[ ] role="search" documentado en annotation layer
[ ] aria-label del landmark documentado en especificación
[ ] Clear button: aria-label="Limpiar búsqueda" en especificación
[ ] Focus ring 2px azul visible en estado focused
[ ] Color de borde cambia a border/focus al enfocar
[ ] Variant=expandable: transición expand/collapse documentada
[ ] Token prefix sch- aplicado (10 tokens)
```

---

## Related components

```
TextField      → campo de texto genérico sin semántica de búsqueda
Combobox       → búsqueda con dropdown de sugerencias/autocomplete
CommandPalette → búsqueda en items predefinidos (⌘K / Ctrl+K)
Spinner        → indicador de carga reutilizable en slot loading
Button         → base del submit-btn y clear button
```

---

## Reference: how other systems do it

**Material Design 3** implementa un modelo de dos componentes: `SearchBar` (la barra persistente, siempre visible) y `SearchView` (la sesión de búsqueda a pantalla completa en mobile). Esta separación arquitectónica es única entre los 24 sistemas — la barra es la affordance y la vista es la sesión. `SearchView` marca los sibling views con `importantForAccessibility=no` para evitar que el foco del SR escape al contenido de fondo. El gesto Predictive Back está cableado automáticamente para dismissal de `SearchView`. `autoShowKeyboard=true` por defecto elimina el segundo tap para empezar a escribir.

**Spectrum/Adobe** trata Search como componente dedicado (`SearchField`) con separación explícita de `onChange` (keystroke) vs `onSubmit` (Enter) — la decisión de API que previene el bug de performance más común. `isQuiet` remueve el borde visible para contextos de toolbar embebido. `label` o `aria-label` es obligatorio — el componente tira error en dev si ninguno está presente. Esta es la implementación de referencia para la separación de callbacks y enforcement de a11y.

**Carbon/IBM** tiene la documentación de teclado más explícita de todos los sistemas Tier 1: Escape limpia Y colapsa la variante expandable. La variante `expandable` colapsa a icon-button en toolbars densos — el patrón que adoptamos. El wrapper `div[role="search"]` con `aria-label` de `labelText` crea un landmark navegable correcto. Tres tamaños (sm/md/lg) mapeados al layout grid de enterprise.

**Polaris/Shopify** hace el clear button automático sin prop de override — consistencia de ecosistema forzada a nivel de componente. La prop `focused` permite activar el campo con el shortcut `/` sin `useRef + .focus()`. Sin botón de submit por diseño: Shopify search siempre filtra datos locales, nunca hace server queries. Esta es la implementación de referencia para el shortcut de activación controlada.

**Ant Design** es el único Tier 1 con `loading` integrado como prop — el spinner reemplaza el search-icon durante API calls. `enterButton` agrega un botón de submit explícito (boolean, string, o ReactNode) — reflejo de convenciones UX enterprise chinas donde la acción de submit debe ser confirmada visualmente. `onSearch` unificado con `info.source` discriminador distingue keyboard, button click, y clear como origen del evento.

**Twilio Paste** envuelve un text input con semántica `role="searchbox"` y un patrón de form submit. Botón de submit visible (no solo ícono) — consistente con guías de accesibilidad para search submit. Sin autocomplete en el componente base; resultados async manejados a nivel de aplicación.

**Salesforce Lightning** distingue búsqueda global (cross-object CRM, con sugerencias MRU) de búsqueda scoped (dentro de un object type). Este modelo de dos modos es único al contexto multi-objeto de Salesforce. No generalizable a nuestro contexto.

**GitHub Primer** es la implementación más minimal del Tier 2: `input[type=search]` con ícono magnifier. Sin autocomplete, sin submit button, sin size variants. Adecuado para filter-as-you-type en listas de página. Refleja el caso de uso primario de GitHub: filtrar listas de archivos, commits, labels.

**GOV.UK** implementa search como form pattern que funciona sin JavaScript: `<form role="search">` + text `<input>` + botón "Search" visible. El botón de submit debe ser texto visible — no ícono — porque investigación con usuarios con magnificadores de pantalla mostró que botones icon-only son omitidos cuando el usuario ve solo una porción de la pantalla.

**Gestalt/Pinterest** tiene el `accessibilityClearButtonLabel` como required prop — el único sistema que hace obligatorio el nombre accesible del clear button. Esta es la única a11y enforcement de este nivel en la categoría.

**Fluent 2/Microsoft** tiene el clear button que aparece solo cuando hay contenido — no siempre visible. Variantes de appearance que match con el sistema de Input (filled, outline, underline). Usado en Office/M365 donde search es navegación primaria.

---

## Tokens

**10 tokens** · prefix `sch-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `sch/bg` | `surface/default` | Fondo del input |
| `sch/border` | `border/default` | Borde en reposo |
| `sch/border-focus` | `border/focus` | Borde en estado focused |
| `sch/fg` | `text/primary` | Color del texto ingresado |
| `sch/placeholder` | `text/subtlest` | Color del placeholder |
| `sch/icon` | `text/secondary` | Color del search icon y clear icon |
| `sch/radius` | `radius/md` | Border-radius (sm/md); lg usa full |
| `sch/submit-bg` | `interactive/default` | Fondo del submit button |
| `sch/submit-fg` | `text/inverse` | Texto/icono del submit button |
| `focus/ring` | `border/focus` | Focus ring 2px offset 2px |

### Spacing specs

```
Size sm: h=32px  py=6px   px=8px   icon=16px  gap=6px   radius=6px
Size md: h=40px  py=8px   px=12px  icon=16px  gap=8px   radius=6px
Size lg: h=48px  py=12px  px=16px  icon=20px  gap=8px   radius=9999px

Track spacing:
  [px] [icon] [gap] [input text] [gap] [clear/loading] [px]
  sm:   8  +  16  +  6  +  [text]  +  6  +  16  +  8
  md:  12  +  16  +  8  +  [text]  +  8  +  16  + 12
  lg:  16  +  20  +  8  +  [text]  +  8  +  20  + 16
```
