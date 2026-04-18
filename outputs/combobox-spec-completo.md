# Combobox

## Overview

Combobox es un campo de texto con sugerencias filtradas que combina las capacidades de un `<input>` libre con las de un `<select>` — el usuario puede escribir para filtrar opciones o elegir directamente de la lista desplegable. Es el componente más versátil de la familia de selección: cubre desde autocomplete cerrado (el valor debe existir en la lista) hasta free-text abierto (el valor puede ser cualquier texto) con soporte opcional para creación de nuevas opciones.

A diferencia de un Select nativo, el Combobox mantiene el contexto del texto escrito mientras el dropdown está abierto, y usa **virtual focus** (`aria-activedescendant`) para navegar las opciones sin mover el foco DOM fuera del campo — esto garantiza que cada keystroke siga filtrando resultados inmediatamente.

```
Estado closed:
┌──────────────────────────────────────────────┐
│ 🔍  Buscar o seleccionar...              ▾   │  ← input + chevron
└──────────────────────────────────────────────┘

Estado open con sugerencias:
┌──────────────────────────────────────────────┐
│ 🔍  react                                ×  │  ← clear button aparece
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│   React                              ✓       │  ← aria-selected=true
│ ● React Native                               │  ← aria-activedescendant
│   React Router                               │
│   + Crear "react"                            │  ← create option (opcional)
└──────────────────────────────────────────────┘

Estado error:
┌──────────────────────────────────────────────┐
│ 🔍  Buscar o seleccionar...              ▾   │  ← borde rojo
└──────────────────────────────────────────────┘
```

El Combobox modela el contrato semántico con una sola propiedad clave: `allowsCustomValue`. Cuando es `false`, el campo revierte al último valor válido en blur (autocomplete cerrado, útil para taxonomías). Cuando es `true`, acepta cualquier texto como valor final (free-text, útil para tags y búsqueda libre). Esta distinción no es visual — no genera frames distintos en Figma — pero es la decisión más importante antes de implementar.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Size:   sm | md | lg
State:  default | error | disabled
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Prefix Icon   → muestra ícono a la izquierda del input
Has Clear         → muestra botón × para limpiar
Has Loading       → muestra spinner en lugar del chevron (búsqueda async)
```

### Figma properties panel

```
┌─────────────────────────────┐
│  Combobox                   │
│  ─────────────────────────  │
│  Size    [md            ▼]  │
│  State   [default       ▼]  │
│  ─────────────────────────  │
│  ☐ Has Prefix Icon          │
│  ☐ Has Clear                │
│  ☐ Has Loading              │
│  ─────────────────────────  │
│  ✏️ Placeholder              │
│  [Buscar o seleccionar...] │
└─────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita seleccionar o ingresar un valor?
│
├─ ¿La lista es fija y pequeña (≤ 7 opciones)?
│   └─ Select nativo — menor complejidad, mejor en mobile
│
├─ ¿El usuario debe elegir SOLO de la lista (valor siempre válido)?
│   └─ Combobox con allowsCustomValue=false (autocomplete cerrado)
│       ├─ < 100 opciones  → filtrado client-side
│       └─ > 100 opciones  → filtrado server-side (Has Loading=on)
│
├─ ¿El usuario puede ingresar valores que no están en la lista?
│   └─ Combobox con allowsCustomValue=true (free-text)
│       └─ ¿Puede crear nuevas opciones inline?
│           └─ Sí → Has Create Option (Polaris/Atlassian pattern)
│
├─ ¿Múltiples valores (tags, assignees)?
│   └─ Combobox multi-select (allowMultiple + tag chips)
│
└─ ¿Solo búsqueda de contenido sin selección fija?
    └─ SearchInput (no Combobox)
```

**Usar Combobox cuando:**
- El usuario necesita filtrar una lista larga (>7 opciones) para encontrar y seleccionar un valor.
- El campo admite valores libres que no están en ninguna lista predefinida — nombres de tags, hostnames, búsquedas ad hoc.
- Se necesita búsqueda async contra un servidor (contacts, records CRM, taxonomías amplias).
- El campo necesita multi-select con representación visual de los valores seleccionados (chips/pills).

**NO usar Combobox cuando:**
- La lista tiene ≤ 7 opciones estáticas y el usuario no puede ingresar texto libre — un `<select>` nativo es más accesible, más liviano y funciona mejor en mobile con scroll nativo.
- El campo es de búsqueda pura sin selección final (buscar dentro de contenido, no seleccionar un valor de formulario) — usar SearchInput.
- El campo requiere selección de fechas, rangos, o valores numéricos con validación compleja — usar DatePicker o NumberInput.
- El contexto es un filtro rápido con toggle visual (chips de filtro sobre un grid) — considerar FilterBar o TagGroup.

---

## Visual variations

### Tamaños

| Size | Alto | Padding vertical | Padding horizontal | Font size | Line height | Radius | Icon size | Gap |
|------|------|------------------|--------------------|-----------|-------------|--------|-----------|-----|
| sm   | 32px | 6px              | 8px                | 12px      | 16px        | 6px    | 16px      | 6px |
| md   | 40px | 8px              | 12px               | 14px      | 20px        | 6px    | 16px      | 8px |
| lg   | 48px | 12px             | 16px               | 16px      | 24px        | 8px    | 20px      | 8px |

### Estados

**default:** Fondo blanco `surface/default`, borde `border/default` (#D0D0D9), texto `text/primary`. Placeholder en `text/subtlest`. Chevron visible en `text/secondary`.

**hover:** Borde se intensifica a `border/hover`. Sin cambio de fondo.

**focus:** Borde azul `border/focus` (#3F64F2), focus ring 2px exterior. `aria-expanded="true"` cuando el dropdown está abierto.

**error:** Borde rojo `border/error` (#DC2626). La propiedad `State=error` genera frame propio porque el error cambia borde + puede añadir ícono de error + puede mostrar texto de error debajo (dev concern).

**disabled:** Fondo `surface/disabled` (#F5F5F8), borde `border/disabled`, texto `text/disabled`. Opacidad 50%. Sin interacción.

**loading (Has Loading=on):** El spinner reemplaza el chevron. Se usa durante búsquedas async mientras el servidor responde.

### Slots opcionales

**Has Prefix Icon:** Ícono 16px (sm/md) o 20px (lg) a la izquierda del texto, antes del placeholder/valor. Color `text/secondary`. Separado del texto por un gap de 6-8px.

**Has Clear (×):** Botón ícono de 16px aparece cuando hay un valor seleccionado. Posicionado a la derecha, antes del chevron. `aria-label="Limpiar selección"`. Solo visible cuando `value !== empty`.

**Has Loading:** Spinner animado en lugar del chevron. Mismo tamaño (16px sm/md, 20px lg). Indica búsqueda async en progreso.

---

## Design decisions

### 1. `allowsCustomValue` como comportamiento semántico, no variante visual

**Por qué:** Spectrum hace la distinción más clara del corpus: `allowsCustomValue=false` = autocomplete (el campo revierte al último valor válido en blur, preservando semántica de lista cerrada); `allowsCustomValue=true` = combobox verdadero (acepta cualquier texto). Esta diferencia es crítica para screen readers, validadores de formularios y backends — el contrato semántico es diferente. Sin embargo, no genera frames visuales distintos en Figma: la diferencia es puramente comportamental.

**Tradeoff:** Un diseñador que no conoce esta distinción puede usar el mismo componente para ambos casos sin pensar en las consecuencias de validación. La solución es documentar el `allowsCustomValue` como la primera decisión de implementación, no un detalle técnico.

### 2. `State=error` como frame variant (no solo color)

**Por qué:** El estado de error en un Combobox implica múltiples cambios simultáneos: borde rojo, posible ícono de error dentro del campo, y posible mensaje de error debajo del campo. Si error fuera solo un cambio de color gestionado por token, no se podría mostrar en Figma cómo afecta al layout completo del campo con el mensaje de error. Las reglas de `global-property-rules.md` confirman que cualquier estado que afecta layout o añade/quita elementos visuales requiere frame propio.

**Tradeoff:** 3 states × 3 sizes = 9 frames netos. Manejable. La alternativa (no generar frame para error) dejaría al desarrollador sin referencia visual de cómo luce el estado de error en los tres tamaños.

### 3. Has Create como boolean (default OFF)

**Por qué:** Polaris y Atlassian tienen los patrones más explícitos de creación inline de opciones ("Crear [valor]"). Polaris's `Listbox.Action` es el más descubrible: aparece como item visible en la lista con el texto escrito — el usuario sabe exactamente qué se va a crear. Sin visibilidad del affordance de creación, los usuarios no saben si el sistema acepta valores nuevos hasta que hacen blur y reciben (o no) un error. El boolean `Has Create` permite modelar este slot sin multiplicar frames.

**Tradeoff:** El slot de creación es solo visible si Has Create=on. En Figma, el item de creación se modela como el último item del dropdown list component — no es parte del Combobox frame en sí, sino del List/Dropdown que el desarrollador compone.

---

## Behavior

### Essential for design

El dropdown se abre al primer carácter escrito por defecto (patrón Spectrum/Polaris). Puede abrirse al focus si la lista es corta y el browsing previo a filtrar agrega valor. El dropdown siempre cierra con Escape, regresando el campo al valor previo (sin selección).

El **virtual focus** (`aria-activedescendant`) mantiene el foco DOM en el input en todo momento. Navegar con Arrow keys mueve un indicador visual de highlight entre los options, pero el foco real nunca sale del campo. Esto garantiza que cualquier keystroke de tipeo inmediatamente filtre — sin necesidad de hacer Tab para volver al input.

Cuando `allowsCustomValue=false`: en blur, si el texto no coincide con ninguna opción, el campo revierte al último valor válido. Cuando `allowsCustomValue=true`: en blur, el texto escrito se acepta como valor final.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Input (trigger) | `combobox` | `aria-expanded="true/false"`, `aria-controls="[listbox-id]"`, `aria-autocomplete="list"`, `aria-activedescendant="[option-id]"`, `aria-haspopup="listbox"` | El screen reader anuncia el estado del dropdown y el item activo con cada navegación |
| Dropdown | `listbox` | `aria-label="Sugerencias"` o `aria-labelledby="[label-id]"` | Contenedor de opciones; el ARIA controls desde el input lo referencia |
| Opción | `option` | `aria-selected="true/false"` | Screen reader anuncia la opción destacada y su estado de selección |
| Grupo de opciones | `group` | `aria-label="[nombre del grupo]"` | Anuncia la categoría al entrar al grupo |
| Opción de creación | `option` | `aria-label="Crear '[valor]'"` | Dentro del listbox; misma navegación que options regulares |
| Clear button | `button` | `aria-label="Limpiar selección"` | Sin label contextual, el screen reader no sabe qué está limpiando |
| Loading | `status` | `aria-live="polite"` | Anuncia "Buscando..." sin interrumpir la narración |

### Keyboard navigation

Primary interactions (affect design):

```
↓ / ↑       → navega opciones del dropdown (virtual focus)
Enter        → selecciona opción resaltada y cierra dropdown
Escape       → cierra dropdown; revierte input al valor pre-apertura
Tab          → confirma el valor actual y avanza al siguiente campo
Backspace    → (multi-select) elimina el último chip/tag seleccionado
```

Secondary interactions (dev reference):

```
Typing       → filtra opciones en tiempo real
Home / End   → va a la primera/última opción del dropdown
PageUp/Down  → navega en bloques (si la lista es larga)
Alt + ↓      → abre dropdown sin filtrar (muestra todas las opciones)
Alt + ↑      → cierra dropdown si está abierto
```

---

## Content guide

### Slot: prefix-icon

Ícono contextual a la izquierda del input. Usa un ícono de búsqueda (lupa) para comboboxes de búsqueda/filtro. Para campos con semántica específica (usuario, archivo, tag), usa el ícono correspondiente. No debe ser interactivo — es puramente decorativo/contextual. Si el ícono va a cambiar según el valor seleccionado, considerar si eso es manejable como boolean toggle o si requiere instancia diferente.

### Slot: input (text)

Placeholder predeterminado: "Buscar o seleccionar..." para comboboxes de búsqueda. Para campos de tipo específico: "Buscar contactos", "Seleccionar etiqueta", "Nombre del proyecto". El placeholder desaparece al focus — no usar como label (WCAG 2.4.6: la label visible siempre debe existir fuera del campo).

### Slot: clear (×)

Solo visible cuando hay un valor seleccionado o texto escrito. Aparecer/desaparecer no debe causar salto de layout — reservar el espacio siempre y mostrar/ocultar el ícono con `visibility` no con `display:none`.

### Slot: chevron

Siempre visible. Indica que el campo tiene dropdown. Rota 180° cuando el dropdown está abierto (keyframe de CSS, no dos frames de Figma). El chevron y el clear nunca aparecen simultáneamente — cuando hay clear visible, chevron se oculta.

### Slot: loading

Spinner animado. Reemplaza al chevron durante búsquedas async. Comunica que el sistema está procesando la entrada del usuario. Si la carga dura más de 300ms, siempre mostrar el spinner para evitar que el usuario piense que el campo está roto.

---

## Pre-build checklist

```
ESTRUCTURA
□ 3 tamaños: sm(32px), md(40px), lg(48px)
□ 3 estados: default, error, disabled
□ Frame count: Size(3) × State(3) = 9 frames
□ Boolean layers: prefix-icon, clear, loading nombradas exactamente

ESPACIADO
□ sm: h=32px, py=6px, px=8px, gap=6px, radius=6px
□ md: h=40px, py=8px, px=12px, gap=8px, radius=6px
□ lg: h=48px, py=12px, px=16px, gap=8px, radius=8px
□ Icon sizes: 16px (sm/md), 20px (lg)

COLORES
□ default: bg=surface/default, border=border/default
□ error: border=border/error
□ disabled: bg=surface/disabled, border=border/disabled, fg=text/disabled
□ focus state: border=border/focus + ring 2px (implementado en dev, no como frame Figma)
□ placeholder: text/subtlest

ACCESIBILIDAD
□ role="combobox" en el input (no en el wrapper div)
□ aria-expanded, aria-controls, aria-autocomplete="list"
□ aria-activedescendant apunta al option-id (ID estable, no index)
□ role="listbox" en dropdown
□ role="option" + aria-selected en cada opción
□ Clear button: aria-label="Limpiar selección"
□ Estado loading: aria-live="polite" region

TOKENS
□ Prefix cbx- aplicado a todas las variables
□ 14 tokens totales
```

---

## Related components

```
Select          → lista cerrada sin texto libre, ≤ 7-10 opciones
SearchInput     → búsqueda de contenido sin selección de valor de formulario
TagInput        → multi-select con creación de tags libres (sin dropdown predefinido)
MultiSelect     → selección múltiple de una lista predefinida
AutoComplete    → text-input-forward: sugerencias asisten, no restringen
DatePicker      → selección de fechas (combobox especializado)
```

---

## Reference: how other systems do it

### Spectrum (Adobe) — La distinción más clara Combobox/Select

Spectrum hace la distinción semántica más rigurosa del corpus: `Picker` (selección cerrada — el usuario DEBE elegir de la lista) vs. `ComboBox` (sugerencias + texto libre opcional). `allowsCustomValue=false` revierte en blur; `allowsCustomValue=true` acepta cualquier valor. El filtrado es externo — la aplicación controla el array `items` para soporte completo de algoritmos fuzzy, prefijo o ML-ranked sin lock-in. `isLoading` + `onLoadMore` como first-class async. La implementación ARIA más completa de Tier 1: anuncio de "N opciones disponibles" al abrir.

### Carbon (IBM) — Custom values by default + filterItems override

Carbon acepta valores custom por defecto — lo opuesto al default conservador de Spectrum — porque los usuarios enterprise IBM configuran hostnames, namespaces y nombres de recursos que no existen en listas predefinidas. `filterItems: (items, inputValue) => items[]` como prop para reemplazar el filtrado substring por defecto. `downshiftProps` como escape hatch completo para edge cases. Documentación explícita de cuándo usar ComboBox vs. Dropdown — un ejemplo raro de guía de "cuándo NO usar" publicada en Tier 1.

### Polaris (Shopify) — Compositional + mejor create-new affordance

Polaris es inusual: es un context provider, no un componente renderizado. El developer escribe JSX explícito para `Combobox.TextField` y `Listbox` — control visual completo sin render-prop gymnastics. El standout feature es `Listbox.Action`: un item especial que renderiza "Crear tag 'summer-2026'" visible en la lista — el create-new UI más descubrible de todos los sistemas Tier 1. Multi-select via `allowMultiple` con tag chips en el prefix del TextField.

### Atlassian — CreatableSelect + `isValidNewOption`

Atlassian implementa Combobox capability como `CreatableSelect` — extensión de React Select. La opción "Crear [valor]" es siempre un item visible controlado por `createOptionPosition`. `isValidNewOption` es la innovación clave: puede bloquear duplicados, nombres reservados y caracteres inválidos antes de que la acción de creación se dispare — esencial para la taxonomía de labels de Jira donde los duplicados crean problemas de query. `AsyncCreatableSelect` combina server-side lookup y creación en un solo componente.

### Ant Design — Text-input-forward semantics

Ant Design AutoComplete invierte la arquitectura: es un text input con sugerencias, no un Select con texto libre opcional. El valor siempre es lo que el usuario escribe; las sugerencias son asistencia, no restricción. `backfill` prop habilita inline completion estilo URL bar — `aria-autocomplete="both"`. `filterOption={false}` para server-side donde el servidor ya retorna resultados filtrados/rankeados. El modelo correcto para search boxes, URL bars y live-query UIs.

### Mantine — Combobox como primitive compartido

La decisión arquitectónica más sofisticada del corpus: Combobox es un primitive composable que powera TODOS los componentes de selección de Mantine — `Select`, `MultiSelect`, `Autocomplete`, `TagsInput`. Un solo `useCombobox()` hook con sub-componentes (`Combobox.Target`, `Combobox.Dropdown`, `Combobox.Option`, `Combobox.Search`) elimina el problema de divergencia de keyboard behavior entre componentes similares. La correctness de ARIA se hereda automáticamente en todos los componentes de nivel superior.

### GOV.UK — Progressive enhancement + live region de result count

El accessible autocomplete de GOV.UK es el más accessibility-forward: wrapper de progressive enhancement sobre un `<select>` nativo — cuando JavaScript no está disponible, el select nativo funciona. La innovación standout: un live region anuncia el número de resultados coincidentes mientras el usuario escribe ("2 resultados disponibles") — el ÚNICO sistema de los 24 que comunica proactivamente el result count a usuarios de screen reader. Testing exhaustivo en JAWS, NVDA, VoiceOver.

### Fluent 2 (Microsoft) — Multi-select first-class + WAI-ARIA 1.2

Fluent 2 hace del multi-select un modo built-in de primer nivel — no un prop que cambia el rendering, sino un modo con dismissible tag chips soportado arquitecturalmente. Grupos via `OptionGroup`. Custom option rendering para avatares y presence indicators — crítico para el "people picker" de Teams y Outlook. Strict WAI-ARIA 1.2 compliance (la especificación más actual).

### shadcn/ui — cmdk fuzzy search: origenes de command palette

El Combobox de shadcn es una recipe, no un componente nativo — construido componiendo `Command` (wrapper cmdk con fuzzy search) dentro de un `Popover`. La librería cmdk aporta fuzzy matching estilo command palette al dropdown: "rct" encuentra "React". Es el mejor modelo para apps con option sets grandes donde el strict prefix matching frustra a los usuarios. La composición require más setup pero es completamente unstyled y compatible con Radix primitives.

---

## Tokens

**14 tokens** · prefix `cbx-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `cbx/bg` | `surface/default` | Fondo del campo |
| `cbx/border` | `border/default` | Borde en estado default |
| `cbx/border-focus` | `border/focus` | Borde azul en focus |
| `cbx/border-error` | `border/error` | Borde rojo en error |
| `cbx/fg` | `text/primary` | Texto del valor seleccionado |
| `cbx/placeholder` | `text/subtlest` | Texto del placeholder |
| `cbx/icon` | `text/secondary` | Color del chevron e íconos |
| `cbx/disabled/bg` | `surface/disabled` | Fondo en disabled |
| `cbx/disabled/border` | `border/disabled` | Borde en disabled |
| `cbx/disabled/fg` | `text/disabled` | Texto en disabled |
| `cbx/radius` | `radius/md` (6px) | Radio del campo |
| `cbx/error/fg` | `status/error/fg` | Color del ícono/texto de error |
| `focus/ring` | `border/focus` | Focus ring exterior |

### Spacing specs

```
Tamaños del campo:
  sm: height=32px, paddingY=6px, paddingX=8px, gap=6px, radius=6px
  md: height=40px, paddingY=8px, paddingX=12px, gap=8px, radius=6px
  lg: height=48px, paddingY=12px, paddingX=16px, gap=8px, radius=8px

Iconos:
  sm / md: 16×16px
  lg:      20×20px

Chevron y clear button:
  Reservar siempre 16px (sm/md) o 20px (lg) de ancho a la derecha
  Chevron y clear nunca simultáneos — clear reemplaza al chevron

Focus ring:
  width: 2px
  offset: 2px exterior al borde del campo
  color: border/focus (#3F64F2)

Placeholder:
  font-size: 12px (sm), 14px (md), 16px (lg)
  color: text/subtlest
```
