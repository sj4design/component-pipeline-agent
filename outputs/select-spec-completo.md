# Select

## Overview

El Select es un campo de formulario que abre un panel con opciones. El usuario elige una (o varias) y el panel se cierra.

```
  Label *
  ┌──────────────────────────────────┐
  │ [🏷]  Valor seleccionado  [✕] ▼ │   ← trigger
  └──────────────────────────────────┘
  Helper text
         │
         ▼ al hacer click
  ┌──────────────────────────────────┐
  │ 🔍 Buscar...                     │   ← opcional
  ├──────────────────────────────────┤
  │   Grupo A                        │
  │   ○ Opción 1                     │
  │   ● Opción 2 (seleccionada)  ✓  │
  │   ○ Opción 3                     │
  │   ░░ Opción 4 (deshabilitada)   │
  └──────────────────────────────────┘
```

Tiene dos piezas: el **trigger** (lo que ves en el formulario) y el **dropdown** (lo que aparece al hacer click). El trigger comparte anatomía con el Input — misma altura, padding, radius, label y helper text — para que formularios con Inputs y Selects se alineen sin ajustes.

---

## Cuándo usar (y cuándo no)

```
  ¿El usuario elige entre opciones predefinidas?
  │
  ├─ 2-4 opciones, todas visibles → usa Radio (las opciones se ven sin click)
  │
  ├─ 5+ opciones, espacio limitado → usa Select ✓
  │
  ├─ El usuario puede escribir texto libre + sugerencias → usa Combobox/Autocomplete
  │
  ├─ Las opciones son acciones (eliminar, editar) → usa Menu (no es selección de valor)
  │
  └─ Solo on/off → usa Toggle/Switch
```

**Usa Select cuando:**
- Hay 5 o más opciones predefinidas
- El espacio en pantalla es limitado (las opciones se ocultan hasta que el usuario las necesita)
- La selección es un valor del formulario (país, categoría, prioridad)

**NO uses Select cuando:**
- Hay 2-4 opciones y caben en pantalla → Radio es mejor (el usuario ve todas las opciones sin click)
- El usuario necesita escribir texto libre → usa Input o Combobox
- Las opciones son acciones (borrar, exportar) → usa Menu/Dropdown Menu
- Es una decisión binaria (sí/no, on/off) → usa Toggle o Checkbox

---

## Variaciones visuales

### Variantes de estilo

```
  outlined (default)              filled                          borderless
  ┌────────────────────────┐      ┌────────────────────────┐      
  │ Seleccionar...       ▼ │      │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        Seleccionar...       ▼
  └────────────────────────┘      │ Seleccionar...       ▼ │      ─────────────────────────
                                  └────────────────────────┘      
  Formularios estándar            Superficies con color           Filtros, tablas, inline
```

### Estados del trigger

```
  default                  hover                    focus
  ┌────────────────────┐   ┌────────────────────┐   ╔════════════════════╗
  │ Valor            ▼ │   │ Valor            ▼ │   ║ Valor            ▼ ║  ← ring 2px azul
  └────────────────────┘   └────────────────────┘   ╚════════════════════╝
  borde gris               borde gris oscuro        borde azul

  open                     disabled                 readonly
  ╔════════════════════╗   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐   ┌────────────────────┐
  ║ Valor            ▲ ║   ╎ Valor            ▼ ╎   │ Valor              │  ← sin chevron
  ╚════════════════════╝   └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘   └────────────────────┘
  borde azul + dropdown    opacity 50%              texto copiable, no editable
```

### Validación (Status)

```
  error                                      warning
  ┌────────────────────────────────┐         ┌────────────────────────────────┐
  │ Valor seleccionado           ▼ │         │ Valor seleccionado           ▼ │
  └────────────────────────────────┘         └────────────────────────────────┘
  ⚠ Este campo es obligatorio                ⚠ Este valor es inusual
  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔          ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  borde rojo + mensaje rojo                  borde ámbar + mensaje ámbar
  "inválido, no puedes continuar"            "inusual pero permitido"
```

### Single vs Multi-select

```
  single-select                              multi-select (con tags)
  ┌────────────────────────────────┐         ┌────────────────────────────────┐
  │ Python                    ✕  ▼ │         │ [Python ✕] [Rust ✕] [+2]    ▼ │
  └────────────────────────────────┘         └────────────────────────────────┘
       │                                          │
       ▼                                          ▼
  ┌────────────────────────────────┐         ┌────────────────────────────────┐
  │   JavaScript                   │         │ ☑ Python                       │
  │ ● Python                       │         │ ☑ Rust                         │
  │   Rust                         │         │ ☐ JavaScript                   │
  │   Go                           │         │ ☐ Go                           │
  └────────────────────────────────┘         └────────────────────────────────┘
  seleccionar cierra el dropdown             seleccionar NO cierra (sigue abierto)
```

### Tamaños

```
  sm (32px)    ┌──────────────────────┐    filtros densos, dashboards
               │ Valor              ▼ │    font 12px · padding 6/8
               └──────────────────────┘

  md (40px)    ┌──────────────────────┐    formularios estándar (default)
               │ Valor              ▼ │    font 14px · padding 8/12
               └──────────────────────┘

  lg (48px)    ┌──────────────────────┐    mobile, formularios espaciosos
               │ Valor              ▼ │    font 16px · padding 12/16
               └──────────────────────┘
```

---

## Qué puede configurar el diseñador

### Panel de propiedades en Figma

```
┌─ Select ─────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ Variant  ▼ … │ │
│  └────────────────┘ └──────────────┘ │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ State  ▼ def.. │ │ Status ▼ none│ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Label              ☐ Leading Icon │
│  ☐ Helper Text        ☐ Clear Button │
│  ☐ Error Text         ☐ Searchable   │
│                                      │
│  Text Properties                     │
│  ✏️ Label        [ Label          ]  │
│  ✏️ Value        [ Select...      ]  │
│  ✏️ Helper Text  [ Helper text    ]  │
│  ✏️ Error Text   [ Error message  ]  │
│                                      │
│  Instance Swap                       │
│  ↳ Leading Icon  [ 🏷 icon-name  ]  │
│                                      │
└──────────────────────────────────────┘

┌─ .SelectOption ──────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ State                   ▼ def.. │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Icon          ☐ Description       │
│  ☐ Checkmark                         │
│                                      │
│  Text Properties                     │
│  ✏️ Label        [ Option         ]  │
│  ✏️ Description  [ Description... ]  │
│                                      │
│  Instance Swap                       │
│  ↳ Option Icon   [ 🏷 icon-name  ]  │
│                                      │
└──────────────────────────────────────┘
```

### Resumen de controles

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamaño        sm · md · lg                                   Altura: 32 / 40 / 48px
  Estilo        outlined · filled · borderless                 Bordes y fondo
  Estado        default · hover · focus · open · disabled · …  Interacción
  Validación    ninguna · error · warning                      Borde + mensaje
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Label             Etiqueta encima del trigger              texto editable
  ☐ Helper text       Texto de ayuda debajo                    texto editable
  ☐ Error text        Mensaje de error debajo                  texto editable
  ☐ Ícono prefijo     Ícono antes del valor                    intercambiable
  ☐ Botón limpiar     "✕" para borrar la selección
  ☐ Búsqueda          Campo de filtro en el dropdown
```

### Anatomía detallada (slots)

```
  ┌─────────── Select ──────────────────────────────────────┐
  │                                                         │
  │  label ─────────── "Label" (text, editable)             │
  │  required ──────── "*" (bool, off por default)          │
  │                                                         │
  │  ┌─── trigger ────────────────────────────────────────┐ │
  │  │ icon-leading   value-text   clear-button   chevron │ │
  │  │ (swap, off)    (text)       (bool, off)    (fijo)  │ │
  │  └────────────────────────────────────────────────────┘ │
  │                                                         │
  │  helper-text ───── "Helper text" (boolText, off)        │
  │  error-text ────── "Error message" (boolText, off)      │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  ┌─── .SelectOption ───────────────────────────────────────┐
  │ option-icon   label          description     checkmark  │
  │ (swap, off)   (text)         (boolText, off) (bool,off) │
  └─────────────────────────────────────────────────────────┘
```

---

## Decisiones de diseño

### 1. Un solo componente, no tres separados

Carbon y Fluent separan Select, ComboBox y MultiSelect en componentes distintos porque sus roles ARIA son diferentes: non-searchable usa `button` + `aria-haspopup="listbox"`, searchable usa `role="combobox"` con `aria-activedescendant`. Spectrum (Adobe) hizo la misma separación por la misma razón.

**Nosotros: uno solo.** Las diferencias entre single, multi y searchable son toggles visuales (checkmarks, tags, campo de búsqueda), no cambios de estructura. El trigger y el dropdown son los mismos. La diferencia de ARIA la maneja el código con el boolean `isSearchable`, no con componentes separados en Figma.

### 2. El trigger comparte ADN con el Input

M3 formalizó esto: el Select ES un text field que no acepta texto libre. Mismos tokens, misma label, mismas alturas. Las tres variantes visuales (outlined/filled/borderless) son las mismas del Input. Esto garantiza alineación perfecta en formularios mixtos.

### 3. "Open" y "readonly" como estados propios

**Open** es distinto de focus: focus solo muestra el ring azul, open muestra ring + dropdown + chevron rotado (▲). 20/24 sistemas los distinguen.

**Readonly** permite ver y copiar el valor pero no cambiarlo. A diferencia de disabled (que atenúa todo y bloquea el foco), readonly acepta foco y selección de texto. Crítico para: formularios de auditoría, recibos, datos heredados.

### 4. .SelectOption como sub-componente

Cada opción tiene sus propios 6 estados (default, hover, focus, pressed, selected, disabled). Embebidas en el Select multiplicarían las variantes ×6. Como sub-componente, se configuran independientemente.

### 5. Warning además de error

Error = "inválido, no puedes continuar" (borde rojo). Warning = "inusual pero permitido" (borde ámbar). Ejemplo: en un formulario financiero, $50,000 es válido pero inusual — warning avisa sin bloquear. 12/24 sistemas lo soportan, bajo costo de implementación.

### Combinaciones excluidas

Estas combinaciones no existen porque son lógicamente imposibles o visualmente redundantes:

```
  disabled + hover/focus/open     no reacciona a interacción
  disabled + error/warning        validación no aplica si está deshabilitado
  readonly + open/hover           no abre dropdown ni muestra hover
  borderless + error/warning      sin borde, no hay dónde mostrar color de status
```

---

## Comportamiento

### Lo esencial para diseñar

1. **Escape siempre cierra.** El dropdown se cierra y el foco vuelve al trigger. 24/24 sistemas coinciden. No hay excepción.

2. **Single-select cierra al elegir. Multi-select NO.** En multi, el usuario necesita ver qué ya seleccionó para seguir eligiendo.

3. **El dropdown abre hacia donde hay espacio.** Si no cabe abajo, abre arriba. En Figma, mostrarlo abajo. El código adapta.

4. **El botón limpiar (✕) solo aparece con un valor seleccionado.** Campo vacío = sin ✕.

5. **Readonly ≠ disabled.** Readonly: se ve normal, sin chevron, acepta foco, texto copiable. Disabled: opacity 50%, sin foco, sin interacción.

6. **Tags necesitan labels descriptivos.** Cada "✕" de un tag debe comunicar "Quitar Python" al screen reader, no solo "cerrar". Dejar espacio visual para el botón remove en cada tag.

7. **En mobile, custom dropdowns rinden peor.** La investigación de GOV.UK confirma que `<select>` nativo es más confiable. Si tu público es mobile-first, evalúa el selector nativo del OS.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Trigger (sin búsqueda) | `button` | `aria-haspopup="listbox"`, `aria-expanded` | SR anuncia "botón desplegable" |
| Trigger (con búsqueda) | `combobox` | `aria-controls`, `aria-activedescendant` | SR anuncia "cuadro combinado, escriba para filtrar" |
| Dropdown | `listbox` | `aria-label`, `aria-multiselectable` | SR anuncia cantidad de opciones |
| Opción | `option` | `aria-selected`, `aria-disabled` | SR anuncia posición: "opción 2 de 5" |
| Grupo | `group` | `aria-labelledby` | SR anuncia el nombre del grupo antes de las opciones |

### Navegación por teclado

Interacciones principales (las que afectan el diseño):

```
  Tab                   foco llega al trigger (ring azul visible)
  Enter / Space / ↓     abre dropdown, foco en opción seleccionada (o primera)
  ↑ ↓                   navega entre opciones (highlight visible)
  Enter                 selecciona opción → cierra (single) o mantiene (multi)
  Escape                cierra sin seleccionar → foco vuelve al trigger
```

Interacciones secundarias (no afectan diseño, referencia para dev):

```
  Home / End            primera / última opción
  Type-ahead            escribe letra → salta a opción que empieza con esa letra
  Backspace             en multi: quita último tag
  Tab (dropdown open)   cierra dropdown, foco al siguiente campo
```

---

## Guía de contenido

**Label:** Breve y descriptivo. "País", "Idioma", "Categoría" — no "Selecciona tu país preferido".

**Placeholder:** Usa un verbo de acción. "Seleccionar..." o "Elegir país..." — no dejar vacío.

**Opciones:** Mantener la misma estructura gramatical. Si una empieza con verbo, todas empiezan con verbo. Orden: alfabético, o por frecuencia de uso si hay una opción dominante.

**Helper text:** Explica el impacto de la selección. "Determina la moneda de facturación" — no "Selecciona una opción".

**Error text:** Di qué salió mal Y qué hacer. "Selecciona un país para continuar" — no solo "Campo requerido".

**Cuántas opciones antes de activar búsqueda:** ~15 opciones es el umbral. Menos de 15, el scroll es suficiente. Más de 15, el usuario pierde tiempo buscando visualmente.

---

## Checklist antes de construir

```
  ☐ ¿Single o multi-select?
    └─ Si multi → activa checkmarks en opciones
    └─ ¿Tags o texto "N seleccionados"?

  ☐ ¿Cuántas opciones tendrá?
    └─ Más de 15 → activa búsqueda
    └─ Más de 100 → confirma que el dev use virtual scroll

  ☐ ¿Las opciones necesitan ícono o descripción?
    └─ Si sí → configura .SelectOption con esos slots

  ☐ ¿El campo puede quedar vacío?
    └─ Si sí → activa botón limpiar (✕)

  ☐ ¿Necesita readonly?
    └─ Para formularios de auditoría, recibos, datos heredados

  ☐ ¿Warning o solo error?
    └─ Si hay validaciones "suaves" → incluye warning

  ☐ ¿Qué variante visual?
    └─ outlined = forms · filled = surfaces · borderless = inline/tablas
```

---

## Relación con otros componentes

```
  Input          Comparte anatomía (altura, padding, radius, label, helper)
  Menu           Para acciones, no valores. Usa role="menu", no "listbox"
  Combobox       Para texto libre + sugerencias. El usuario puede escribir
  Radio          Para 2-4 opciones visibles sin click
  Checkbox       Para selección múltiple sin dropdown
  Tag/Chip       Reutilizado dentro del multi-select para mostrar selecciones
```

---

## Referencia: cómo lo hacen otros sistemas

**Los que separan en varios componentes:**
- Carbon (IBM): 4 componentes — cada uno con API enfocada a su complejidad
- Fluent (Microsoft): 2 — separación limpia por rol ARIA
- Spectrum (Adobe): 2 — Picker (`listbox`) vs ComboBox (`combobox`)

**Los que unifican:**
- Ant Design: 1 componente con `mode`, virtual scroll default para listas de 10K+
- Atlassian: sub-types nombrados que previenen combinaciones inválidas

**Los que priorizan nativo:**
- GOV.UK: `<select>` nativo siempre — research-backed para mobile y AT
- Polaris (Shopify): nativo para merchants, custom solo para apps avanzadas

**Consenso universal (24/24):**
- Trigger con chevron ▼
- Escape cierra
- Opción seleccionada se resalta
- Label + helper = misma anatomía que text fields

---

## Tokens

**40 tokens** · prefijo `sel-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--sel-trigger-bg` | `bg/surface/default` | Fondo del trigger |
| `--sel-trigger-border` | `border/mid/default` | Borde default |
| `--sel-trigger-border-focus` | `border/focus` | Borde en focus/open |
| `--sel-trigger-border-error` | `status/error/border` | Borde en error |
| `--sel-trigger-border-warning` | `status/warning/border` | Borde en warning |
| `--sel-dropdown-bg` | `bg/surface/default` | Fondo del dropdown |
| `--sel-dropdown-shadow` | `elevation/2` | Sombra del dropdown |
| `--sel-option-bg-hover` | `bg/surface/hover` | Opción en hover |
| `--sel-option-bg-selected` | `bg/surface/selected` | Opción seleccionada |
| `--sel-option-fg` | `text/label` | Texto de opción |
| `--sel-option-fg-disabled` | `text/disabled` | Opción deshabilitada |
| `--sel-checkmark-fg` | `interactive/default` | Color del checkmark ✓ |

### Specs de spacing

```
  ┌─ trigger ──────────────────────────────────────────────┐
  │                                                        │
  │  ←px→ [icon 20px] ←8→ [value text] ←8→ [✕] ←8→ [▼] ←px→
  │       ↕ py                                      ↕ py  │
  │                                                        │
  └────────────────────────────────────────────────────────┘
  ←4→
  ┌─ dropdown ─────────────────────────────────────────────┐
  │  ←0→ ┌─ option ──────────────────────────────────────┐ │
  │      │ ←12→ [icon] ←8→ [label] ←→ [checkmark] ←12→  │ │
  │      └───────────────────────────────────────────────┘ │
  │  ←0→ ┌─ option ──────────────────────────────────────┐ │
  │      │ ←12→ [label]                            ←12→  │ │
  │      └───────────────────────────────────────────────┘ │
  └────────────────────────────────────────────────────────┘

  px/py por tamaño:  sm = 8/6  ·  md = 12/8  ·  lg = 16/12
  gap icon↔texto:    8px (siempre)
  radius trigger:    sm = 6  ·  md = 8  ·  lg = 8
  radius dropdown:   sm = 8  ·  md = 8  ·  lg = 10
  shadow dropdown:   elevation level 2
  gap label↔trigger: 4px
  gap trigger↔helper: 4px
```
