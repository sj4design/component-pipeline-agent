# Transfer

## Descripción general

Transfer es el componente de selección dual del sistema de diseño (patrón "dual-list"): dos paneles (source / target) con items seleccionables y botones de acción en el centro que mueven items entre ellos. Permite mover items de "Disponibles" a "Seleccionados" individualmente o en lote, con search opcional en cada lista. Es el patrón estándar para asignaciones enterprise: usuarios → grupos, permisos → roles, recursos → políticas. Ant Design es el único sistema Tier-1 que lo implementa de forma nativa.

```
Size=md, Orientation=horizontal, OneWay=no:
┌──────────────────────────┐   ┌──┐   ┌──────────────────────────┐
│ ☐  Disponibles (8)  ×   │   │ →│   │ ☑  Seleccionados (2)  ×  │
│ [🔍 Buscar...]          │   │  │   │ [🔍 Buscar...]           │
│─────────────────────────│   │ ←│   │─────────────────────────│
│ ☐  👤 Ana García   Admin│   │  │   │ ☑  👤 Luis Martínez Ed. │
│ ☐  👤 Carlos Ruiz  Ed.  │   │»»│   │ ☑  👤 María López  Vie. │
│ ☑  👤 Pedro Díaz   View │   │  │   │                          │
│ ☐  👤 Laura Vega   Admin│   │««│   │                          │
│ ☐  👤 Juan Mora    Ed.  │   └──┘   │                          │
│...                      │         │                          │
└──────────────────────────┘         └──────────────────────────┘

Action buttons:
  → : mover items seleccionados a target
  ← : mover items seleccionados de vuelta a source
  »» : mover todos a target
  «« : mover todos de vuelta a source

OneWay=yes (solo source → target):
  → : mover a target
  »» : mover todos a target
  [target items tienen ícono × para remove individual]

Orientation=vertical (mobile):
  ┌──────────────────────────┐
  │  Disponibles (8)         │
  └──────────────────────────┘
        ↓  ↑
  ┌──────────────────────────┐
  │  Seleccionados (2)       │
  └──────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes en TransferItem (building block):

```
State → default | hover | selected | focused | disabled
Size  → sm | md
```

Variantes en TransferList (building block):

```
Side  → source | target
State → default | empty | loading
Size  → sm | md
```

Variantes en Transfer:

```
Size        → sm | md
OneWay      → no | yes
Orientation → horizontal | vertical
```

Toggles en TransferItem:

```
👁 Show Checkbox    → checkbox de selección
👁 Has Avatar       → avatar del usuario/item
👁 Has Leading Icon → ícono tipo de item
👁 Has Description  → descripción secundaria
👁 Has Trailing Meta → metadata (rol, departamento)
```

Toggles en TransferList:

```
👁 Show Search → muestra campo de búsqueda (default: off)
👁 Show Footer → muestra footer con pagination (default: off)
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Transfer                                                │
│  ──────────────────────────────────────────────────────  │
│  Size        [ md              ▼ ]                       │
│  OneWay      [ no              ▼ ]                       │
│  Orientation [ horizontal      ▼ ]                       │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita mover items entre dos grupos?
                    │
                    ▼
       ¿El conjunto de items es fijo y manejable (<100)?
       ├── Sí → Transfer
       └── No → Search + MultiSelect (typeahead pattern)
                    │
                    ▼
       ¿El movimiento es bidireccional?
       ├── Sí → OneWay=no
       └── Solo source→target → OneWay=yes (with remove icon in target)
```

**Usar Transfer cuando:**
- Asignar usuarios a un grupo o rol
- Asignar permisos a un perfil de seguridad
- Mover recursos entre entornos (staging → production)
- Configurar columnas visibles en un DataGrid (campos disponibles → campos activos)
- Seleccionar participantes de una reunión de un directorio

**NO usar Transfer cuando:**
- Hay más de 100 items → usar `Combobox` multiselect con typeahead
- El usuario puede seleccionar con checkbox en una sola lista → usar `CheckboxGroup`
- Los items tienen dependencias complejas → considerar TreeView
- Es mobile narrow (<600px) → usar modal picker

---

## Variaciones visuales

### TransferItem sizes

| Size | Height | PaddingX | Gap | FontSize | IconSize |
|------|--------|---------|-----|---------|---------|
| sm   | 32px   | 10px    | 8px | 13px   | 14px    |
| md   | 40px   | 12px    | 10px | 14px  | 16px    |

### TransferList sizes

| Size | Width | Height | Header H | Search H |
|------|-------|--------|---------|---------|
| sm   | 280px | 400px  | 36px    | 32px    |
| md   | 320px | 480px  | 44px    | 36px    |

### TransferItem States

| State | Background | Foreground | FontWeight |
|-------|-----------|-----------|-----------|
| default | transparent | text/primary | 400 |
| hover | surface/hover | text/primary | 400 |
| selected | brand/subtle | interactive/default | 500 |
| focused | transparent | text/primary | 400 + ring |
| disabled | transparent | text/disabled | 400 |

---

## Decisiones de diseño

**1. Familia de 3 sub-components: TransferItem → TransferList → Transfer** — arquitectura 3 niveles permite reutilizar TransferList independiente (display-only con selectAll) y TransferItem en otros contextos (search results, picker modals).

**2. Side property (source/target) en TransferList** — source muestra "Disponibles" + search; target muestra "Seleccionados" + remove option. Property discreta permite frames para ambos sin variantes condicionales complejas.

**3. OneWay como boolean** — use case común: "agregar permisos" donde source es infinito y target solo crece con posibilidad de remove. OneWay=yes oculta los botones "mover back" y expone ícono de remove individual en target items.

**4. 4 action buttons estándar: → ← »» ««** — Ant tiene 2 buttons (move selected). Nosotros proponemos 4 incluyendo "move all" (»«) porque enterprise use cases frecuentemente quieren agregar todo lo filtrado de una vez.

**5. Custom render via slots** — Ant custom render function permite items ricos (avatar + name + role). Modelado como slots + booleans en TransferItem. Common case: user picker con Avatar + email + role.

**6. Search + pagination como slots opcionales** — para listas <50 items, ambos off; para >100 items, ambos on. Ant tiene `showSearch` y `pagination` como props.

### Combinaciones excluidas

```
Orientation=vertical + Size=sm (vertical necesita más altura)
```

---

## Comportamiento

### Esencial para diseño

- **Select All en header** — el checkbox del header selecciona/deselecciona todos los items visibles (filtrados si hay search activo). El header muestra el count: "Disponibles (8)", "Disponibles (3/8)" si hay filtro.
- **Acción de mover** — el botón → mueve solo los items checked del source al target. Los items aparecen deseleccionados en el target.
- **Mover todos (»»)** — mueve todos los items visibles (aplicando el filtro del search si está activo).
- **OneWay target** — en OneWay=yes, el target muestra un ícono × junto a cada item para remove individual (en lugar de tener un botón de mover de vuelta global).
- **Search filtra localmente** — el search en cada lista filtra los items sin hacer petición a API (lista local). Para listas grandes con API: el developer implementa `onSearch` callback.
- **Orientation=vertical** — los dos paneles se apilan verticalmente con los botones en el centro. Para mobile narrow.
- **aria-live anuncia movimientos** — cuando items se mueven, `aria-live="polite"` anuncia "2 items movidos a Seleccionados".

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `role="group"` + `aria-label="Transferir items"` | SR anuncia el componente como grupo |
| Source list | `role="listbox"` + `aria-multiselectable="true"` + `aria-label="Disponibles, 8 items"` | SR anuncia el panel source |
| Target list | `role="listbox"` + `aria-multiselectable="true"` + `aria-label="Seleccionados, 2 items"` | SR anuncia el panel target |
| TransferItem | `role="option"` + `aria-selected="true\|false"` | SR anuncia cada item |
| Move buttons | `aria-label="Mover 2 items seleccionados a Seleccionados"` | SR describe la acción con contexto |
| Movimiento | `aria-live="polite"` anuncia resultado | SR confirma el movimiento |

### Navegación por teclado

```
Tab             → source search → source list → actions → target list → target search
Arrow Up/Down   → navega items en la lista activa
Space           → toggle selection de item
Enter en action → mueve items → focus regresa a source list
Shift+Click     → selección de rango en la misma lista
Ctrl/Cmd+A      → selecciona todos los items visibles
```

---

## Guía de contenido

**Headers de lista:**
- Source: "Disponibles (N)" — N es el total de items disponibles
- Target: "Seleccionados (M)" — M es el total de items en target
- Con search activo: "Disponibles (3 de 8)"

**Action buttons labels (accesibles):**
- →: "Mover seleccionados a [target label]"
- ←: "Mover seleccionados a [source label]"
- »»: "Mover todos a [target label]"
- ««: "Mover todos a [source label]"

**Search placeholder:**
- "Buscar [tipo de item]": "Buscar usuario", "Buscar permiso"

**Empty state:**
- Source vacío: "[Target label] tiene todos los items disponibles"
- Target vacío: "No hay [items] seleccionados. Selecciona de la lista izquierda."

---

## Pre-build checklist

```
□ ¿role="group" + aria-label en container?
□ ¿role="listbox" + aria-multiselectable en source y target?
□ ¿aria-label con count en cada lista (Disponibles, N items)?
□ ¿role="option" + aria-selected en cada item?
□ ¿Action buttons: aria-label con count + destino?
□ ¿aria-live="polite" anuncia movimientos?
□ ¿Ctrl/Cmd+A selecciona todos los visibles?
□ ¿OneWay=yes: remove icons en target items?
□ ¿Show Search: filtra localmente?
□ ¿Focus regresa a source list después de mover?
□ ¿Roving tabindex en cada listbox?
```

---

## Componentes relacionados

```
Combobox (multiselect) → para catálogos grandes con typeahead
CheckboxGroup          → para selección múltiple sin doble panel
DataGrid + selection   → cuando los datos son tabulares
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | OneWay | Search | Pagination | ARIA | Diferenciador |
|---------|-------|--------|--------|-----------|------|--------------|
| **Material Design 3** | — | — | — | — | — | Sin componente |
| **Spectrum (Adobe)** | — | — | — | — | — | Sin componente |
| **Carbon (IBM)** | — | — | — | — | — | Sin componente |
| **Polaris (Shopify)** | — | — | — | — | — | ResourcePicker modal |
| **Atlassian** | — | — | — | — | — | Sin componente |
| **Ant Design** | Transfer | Sí (oneWay) | Sí (showSearch) | Sí | group+listbox | El único T1; custom render; operations prop |
| **Fluent 2** | — | — | — | — | — | Sin componente |
| **Mantine** | TransferList | No | No | No | group+listbox | Simple; drag handle |
| **Orbit (Kiwi)** | — | — | — | — | — | Sin componente |
| **Carbon Filter** | FilterableMultiSelect | — | Sí | No | combobox | Alternativa compacta |
| **React Aria** | ListBox multi | — | — | — | listbox | Headless; compose dos |

**Patrones clave de la industria:**
1. **Ant Design Transfer** — el único T1 con implementación completa. Props: `oneWay`, `showSearch`, `pagination`, `filterOption`, `render` (custom item render), `operations` (custom button labels). La referencia de implementación.
2. **Mantine TransferList** — alternativa minimalista: sin oneWay, sin search nativa, pero con drag handle para reorder. Útil para datasets pequeños.
3. **Carbon FilterableMultiSelect** — alternativa compacta: un solo dropdown con checkbox list + search. No tiene doble panel pero resuelve el mismo problema de manera más compacta para <50 items.
4. **Polaris ResourcePicker** — patrón modal: abre un modal con search + list para seleccionar productos/clientes. Mobile-friendly. No tiene doble panel.

---

## Tokens

**30 tokens** · prefijo `xfr-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `xfr/list/sm/w` | `sizing/280` | Ancho lista size sm |
| `xfr/list/md/w` | `sizing/320` | Ancho lista size md |
| `xfr/list/sm/h` | `sizing/400` | Alto lista size sm |
| `xfr/list/md/h` | `sizing/480` | Alto lista size md |
| `xfr/list/bg` | `surface/default` | Background lista |
| `xfr/list/border` | `border/default` | Borde lista |
| `xfr/list/radius` | `radius/md` | Radius lista |
| `xfr/header/bg` | `surface/hover` | Background header lista |
| `xfr/header/border` | `border/default` | Borde header lista |
| `xfr/item/sm/h` | `sizing/32` | Altura item sm |
| `xfr/item/md/h` | `sizing/40` | Altura item md |
| `xfr/item/default/fg` | `text/primary` | Texto item default |
| `xfr/item/hover/bg` | `surface/hover` | Item hover |
| `xfr/item/selected/bg` | `brand/subtle` | Item selected bg |
| `xfr/item/selected/fg` | `interactive/default` | Item selected fg |
| `xfr/item/selected/fontWeight` | `type/weight-medium` | Item selected weight |
| `xfr/item/focused/ring` | `focus/ring` | Focus ring |
| `xfr/item/disabled/opacity` | `opacity/disabled` | Disabled opacity |
| `xfr/action/size/sm` | `sizing/32` | Botón action sm |
| `xfr/action/size/md` | `sizing/36` | Botón action md |
| `xfr/action/bg` | `surface/default` | Botón action bg |
| `xfr/action/border` | `border/default` | Botón action borde |
| `xfr/action/hover/bg` | `surface/hover` | Botón action hover |
| `xfr/search/h/sm` | `sizing/32` | Altura search sm |
| `xfr/search/h/md` | `sizing/36` | Altura search md |
| `xfr/gap/sm` | `spacing/4` | Gap entre paneles sm |
| `xfr/gap/md` | `spacing/5` | Gap entre paneles md |
| `xfr/item/gap` | `spacing/2` | Gap internal item |
| `xfr/item/px` | `spacing/3` | PaddingX item |
| `xfr/item/fontSize/sm` | `type/sm` | Font size item sm |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  TransferList sm: w:280px × h:400px                      │
│  TransferList md: w:320px × h:480px                      │
│                                                          │
│  TransferItem sm: h:32px · px:10px                       │
│  TransferItem md: h:40px · px:12px                       │
│                                                          │
│  Action zone:                                            │
│  [→] [←] [»»] [««] — apilados verticalmente             │
│  Botones: 32px (sm) / 36px (md)                         │
│                                                          │
│  Sub-componentes:                                        │
│  TransferItem: State(5) × Size(2) = 10 frames           │
│  TransferList: Side(2) × State(3) × Size(2) = 12 frames │
│  Transfer:     Size(2) × OneWay(2) × Orient(2) −        │
│                1 excl = 7 frames                        │
│                                                          │
│  Frames totales: 10 + 12 + 7 = 29 frames                │
└──────────────────────────────────────────────────────────┘
```
