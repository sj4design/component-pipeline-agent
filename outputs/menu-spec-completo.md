# Menu

## Overview

El Menu es una lista de acciones contextuales que aparece como overlay anclado a un trigger. El usuario hace click en el trigger, el panel se abre, elige una acción y el panel se cierra. A diferencia del Select (que selecciona un valor), el Menu ejecuta acciones: editar, eliminar, mover, compartir.

```
  [ Trigger ▼ ]
       │
       ▼ al hacer click
  ┌──────────────────────────┐
  │  GRUPO (opcional)        │   ← .MenuGroup
  │  ○ Edit           ⌘E    │   ← .MenuItem (icon + label + shortcut)
  │  ○ Duplicate      ⌘D    │
  │  ○ Move to...        ▶  │   ← submenu arrow
  │  ────────────────────    │   ← divider
  │  ○ Delete         ⌫     │   ← danger item (texto rojo)
  └──────────────────────────┘
```

Tiene tres piezas: el **trigger** (botón que abre el menú), el **panel** (superficie overlay con sombra), y los **items** (acciones individuales). El trigger puede ser cualquier botón o icon-button — se intercambia via instance swap.

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Size          sm · md · lg                              Panel y items
  State         default · open                            Panel visible/oculto
```

Sub-componente .MenuItem:

```
  State         default · hover · focus · pressed · disabled    Interacción
  ItemType      default · danger                                Destructivo
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ Icon               Ícono leading en el item                       18/21 consenso
  ☐ Shortcut           Texto de atajo de teclado a la derecha          4/21 consenso
  ☐ Submenu Arrow      Chevron indicando submenu                      12/21 consenso
  ☑ Divider            Separador entre grupos                         18/21 consenso
  ☐ Group Label        Título de sección/grupo                        14/21 consenso
```

### Panel de propiedades en Figma

```
┌─ Menu ───────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ State  ▼ def │ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Instance Swap                       │
│  ↳ Trigger     [ 🏷 Button     ]    │
│                                      │
└──────────────────────────────────────┘

┌─ .MenuItem ──────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ State  ▼ def.. │ │ ItemType ▼ … │ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Icon         ☐ Shortcut           │
│  ☐ Submenu Arrow                     │
│                                      │
│  Text Properties                     │
│  ✏️ Label       [ Menu Item     ]    │
│  ✏️ Shortcut    [ Ctrl+K        ]    │
│                                      │
│  Instance Swap                       │
│  ↳ Icon         [ 🏷 icon-name  ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
  ¿Qué hace el item al seleccionarlo?
  │
  ├─ Ejecuta una acción (editar, borrar, exportar) → Menu ✓
  │
  ├─ Selecciona un valor (país, categoría) → Select / Listbox
  │
  ├─ Navega a otra página → Navigation links, no Menu
  │
  ├─ Es right-click contextual → Context Menu (mismo patrón, trigger diferente)
  │
  └─ Son 2-3 acciones simples → Buttons directos, no Menu
```

**Usa Menu cuando:**
- Hay 3+ acciones contextuales que no caben como botones visibles
- Las acciones se agrupan lógicamente (archivo: nuevo/abrir/guardar)
- Necesitas overflow de toolbar (3-dot menu)

**NO uses Menu cuando:**
- Los items seleccionan un valor → usa Select (role="listbox", no "menu")
- Son solo 2 acciones → usa botones directos (más descubribles)
- El contenido es rico (imágenes, formularios) → usa Popover
- Es navegación persistente → usa Sidebar o Navbar

---

## Variaciones visuales

### Items con ícono y shortcut

```
  sin ícono ni shortcut           con ícono                    con ícono + shortcut
  ┌────────────────────┐          ┌────────────────────┐       ┌─────────────────────────┐
  │ Edit               │          │ ✏️ Edit            │       │ ✏️ Edit          ⌘E     │
  │ Duplicate          │          │ 📋 Duplicate       │       │ 📋 Duplicate     ⌘D     │
  │ Delete             │          │ 🗑 Delete          │       │ 🗑 Delete        ⌫      │
  └────────────────────┘          └────────────────────┘       └─────────────────────────┘
```

### Items danger

```
  default                        danger
  ┌────────────────────┐         ┌────────────────────┐
  │ Edit               │         │ Delete             │  ← texto rojo
  │ Duplicate          │         └────────────────────┘
  │ ────────────────── │         hover:
  │ Delete             │ ← rojo  ┌────────────────────┐
  └────────────────────┘         │▓▓ Delete ▓▓▓▓▓▓▓▓▓│  ← bg rojo + texto blanco
                                 └────────────────────┘
```

### Tamaños

```
  sm (32px)    ┌──────────────────────┐    toolbars densos
               │ Edit              ⌘E │    font 12px · padding 6/8
               └──────────────────────┘

  md (36px)    ┌──────────────────────┐    uso general (default)
               │ Edit              ⌘E │    font 14px · padding 8/12
               └──────────────────────┘

  lg (44px)    ┌──────────────────────┐    mobile, touch-friendly
               │ Edit              ⌘E │    font 16px · padding 12/12
               └──────────────────────┘
```

### Con grupos y submenú

```
  ┌──────────────────────────┐
  │  File                    │ ← group label
  │  ○ New           ⌘N     │
  │  ○ Open          ⌘O     │
  │  ────────────────────    │
  │  ○ Move to...        ▶  │──┐
  │  ────────────────────    │  │ ┌──────────────┐
  │  ○ Delete         ⌫     │  └─│ Folder A     │
  └──────────────────────────┘    │ Folder B     │
                                  └──────────────┘
```

---

## Decisiones de diseño

### 1. Familia de 3: Menu + .MenuItem + .MenuGroup

21/21 sistemas tienen items discretos con estados propios. 14/21 tienen grupos con labels opcionales. Embebir los estados de cada item (5 states x 2 types = 10) dentro del Menu multiplicaría las variantes exponencialmente. Como sub-componentes, se configuran independientemente.

### 2. ItemType=danger como variante, no boolean

14/21 sistemas distinguen items destructivos con tratamiento visual diferenciado. Carbon llega a tener un hover state específico para danger (bg rojo + texto blanco). Danger cambia fg (texto rojo) + bg en hover (fondo rojo) — más de 2 propiedades cambian, lo que justifica variante sobre boolean.

### 3. Shortcut como toggle opcional (4/21 consenso)

Solo Carbon y Mantine tienen display de keyboard shortcuts integrado. Es una feature enterprise/desktop que no tiene sentido en mobile ni en apps consumer. Boolean `hasShortcut` off por default — apps enterprise lo activan.

### 4. Max 12 items por menú

Carbon documenta explícitamente un límite de 12 items. Más allá de 12, el scanning overhead excede el umbral cognitivo y se recomienda tree view o select. Documentamos como guía, no como restricción técnica.

### 5. Menu es para ACCIONES, no para VALORES

Confusión semántica frecuente: usar `role="menu"` para selección de valores es incorrecto. Menus son para acciones (editar, borrar). Select/Listbox son para valores (país, categoría). GOV.UK eliminó menus completamente porque la confusión creaba barreras.

### Combinaciones excluidas

```
  disabled + hover/focus/pressed      no reacciona a interacción (21/21 universal)
  disabled + danger-hover             disabled bloquea toda interacción
  danger + selected                   action items no mantienen selección
```

---

## Comportamiento

### Lo esencial para diseñar

1. **Escape cierra y retorna foco al trigger.** 21/21 sistemas coinciden. Previene pérdida de foco.

2. **Arrow keys navegan, Tab cierra.** El menú es UN tab stop — la navegación interna usa flechas. Tab cierra el menú y mueve el foco al siguiente elemento.

3. **Items disabled permanecen en DOM.** `aria-disabled="true"` pero mantienen presencia. Algunos sistemas los mantienen focusable para descubribilidad (Spectrum, Radix).

4. **Danger items requieren confirmación para acciones irreversibles.** El styling rojo de danger items puede dar falsa sensación de seguridad. Atlassian UX research muestra que items rojos incrementan clicks accidentales. Siempre combinar con dialog de confirmación.

5. **El dropdown abre donde hay espacio.** En Figma, mostrarlo abajo. El código adapta posición.

6. **Un solo nivel de submenú como máximo.** Más de 2 niveles causa confusión cognitiva y dificultad motora en mobile. Para jerarquías profundas, usar tree view.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Trigger | `button` | `aria-haspopup="menu"`, `aria-expanded` | SR anuncia "menú desplegable" |
| Panel | `menu` | `aria-label` | SR anuncia cantidad de opciones |
| Item | `menuitem` | `aria-disabled` si disabled | SR anuncia cada acción disponible |
| Submenu trigger | `menuitem` | `aria-haspopup="menu"` | SR anuncia "submenú disponible" |
| Separador | `separator` | `role="separator"` | SR anuncia separación entre grupos |

### Navegación por teclado

Interacciones principales (afectan el diseño):

```
  Click / Enter / Space    abre menú, foco en primer item
  ↓ ↑                      navega entre items (roving tabindex)
  Enter / Space            activa item → cierra menú
  →                        abre submenú (si hay)
  ← / Escape               cierra submenú → cierra menú
```

Interacciones secundarias (referencia para dev):

```
  Home / End               primer / último item
  Type-ahead               escribe letra → salta a item que empieza con esa letra
  Tab                      cierra menú y avanza foco al siguiente elemento
```

---

## Guía de contenido

**Label del item:** Verbo + sustantivo. "Editar proyecto", "Eliminar archivo" — no solo "Editar". Excepto cuando el contexto es obvio (menú de un archivo → "Eliminar" basta).

**Grupos:** Usar labels de grupo cuando hay 2+ secciones lógicas. "Archivo", "Edición" — no cuando todos los items son del mismo tipo.

**Shortcuts:** Mostrar solo los atajos más usados. No llenar cada item con shortcut — genera ruido visual.

**Danger items:** Siempre al final del menú, separados con divider. Nunca como primer item.

**Longitud:** Items concisos (2-3 palabras). Si un item necesita explicación, agregar item-description como texto secundario debajo del label.

---

## Checklist antes de construir

```
  ☐ ¿Los items son acciones o valores?
    └─ Si son valores → usar Select, no Menu

  ☐ ¿Cuántos items tendrá?
    └─ Más de 12 → considerar tree view o panel
    └─ Menos de 3 → considerar botones directos

  ☐ ¿Hay items destructivos?
    └─ Si sí → ItemType=danger + confirmation dialog

  ☐ ¿Es app enterprise/desktop?
    └─ Si sí → activar hasShortcut en items frecuentes

  ☐ ¿Necesita submenú?
    └─ Máximo 1 nivel de profundidad

  ☐ ¿Qué tamaño?
    └─ sm = toolbar · md = general · lg = mobile/touch
```

---

## Relación con otros componentes

```
  Select         Para seleccionar VALORES, no acciones. Usa role="listbox"
  Button         Para 1-2 acciones directas sin menú
  Popover        Para contenido rico (forms, previews), no acciones
  Toolbar        Contiene triggers de menú (overflow button)
  Context Menu   Mismo patrón, trigger es right-click
  Dropdown       Término genérico — en nuestro DS, "Menu" es el nombre
```

---

## Referencia: cómo lo hacen otros sistemas

**Los que tienen keyboard shortcuts:**
- Carbon: `shortcutText` integrado. Enterprise power users necesitan recordatorios.
- Mantine: `rightSection` para shortcuts y count badges.

**Los que separan acción vs selección:**
- Spectrum: `onAction` vs `onSelectionChange` — APIs separadas previenen mixing accidental.
- Radix: 3 primitivos (DropdownMenu, ContextMenu, Menubar) por patrones ARIA distintos.

**Los que componen en vez de componente dedicado:**
- Polaris: ActionList + Popover. La ActionList se reutiliza en bulk actions y row actions.

**Consenso universal (21/21):**
- `role="menu"` + `role="menuitem"`
- Trigger con `aria-haspopup` y `aria-expanded`
- Escape cierra y retorna foco
- Arrow keys para navegación interna

---

## Tokens

**30 tokens** · prefijo `mnu-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--mnu-panel-bg` | `surface/default` | Fondo del panel |
| `--mnu-panel-shadow` | `elevation/2` | Sombra del panel |
| `--mnu-panel-radius` | `radius/md` | Border radius del panel |
| `--mnu-panel-border` | `border/mid/default` | Borde del panel |
| `--mnu-item-bg-hover` | `surface/hover` | Item en hover |
| `--mnu-item-bg-focus` | `surface/hover` | Item en focus (keyboard) |
| `--mnu-item-bg-pressed` | `surface/pressed` | Item presionado |
| `--mnu-item-fg` | `text/label` | Texto del item |
| `--mnu-item-fg-disabled` | `text/disabled` | Item deshabilitado |
| `--mnu-danger-fg` | `status/error/fg` | Texto danger item |
| `--mnu-danger-bg-hover` | `status/error/bg` | Fondo danger hover |
| `--mnu-icon-fg` | `icon/secondary` | Ícono del item |
| `--mnu-shortcut-fg` | `text/subtlest` | Texto del shortcut |
| `--mnu-group-label-fg` | `text/subtlest` | Texto del label de grupo |
| `--mnu-divider` | `border/subtle` | Color del separador |

### Specs de spacing

```
  ┌─ panel ─────────────────────────────────────────────┐
  │  ↕ 4 (panelPy)                                     │
  │  ┌─ .MenuItem ────────────────────────────────────┐ │
  │  │ ←12→ [icon 16] ←8→ [label] ←→ [shortcut] ←12→ │ │
  │  │       ↕ 8 (py)                          ↕ 8    │ │
  │  └────────────────────────────────────────────────┘ │
  │  ┌─ .MenuItem ────────────────────────────────────┐ │
  │  │ ←12→ [label]                            ←12→   │ │
  │  └────────────────────────────────────────────────┘ │
  │  ↕ 4 (panelPy)                                     │
  └─────────────────────────────────────────────────────┘

  panel min-width:   180px (md)
  panel max-width:   320px (md)
  panel padding:     4px vertical · 0px horizontal
  panel radius:      8px
  panel shadow:      elevation level 2
  item height:       sm=32 · md=36 · lg=44
  item padding:      sm=6/8 · md=8/12 · lg=12/12
  gap icon↔label:    8px
  item radius:       4px (sm/md) · 6px (lg)
```
