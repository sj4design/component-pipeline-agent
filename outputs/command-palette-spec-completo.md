# CommandPalette — Especificación Completa

## Descripción general

Launcher de comandos tipo Cmd+K para búsqueda y ejecución de acciones globales en una aplicación. Patrón establecido por Raycast, Linear, Slack, GitHub y Notion. Compuesto por `CommandItem` (building block de acción individual) y `CommandPalette` (dialog completo con search + lista agrupada).

### Wireframe estructural

**CommandItem:**
```
┌────────────────────────────────────────────────────────┐
│ [icon]  Ir a inicio          [Descripción]    [⌘K]    │
└────────────────────────────────────────────────────────┘
```

**CommandPalette (Size=md):**
```
┌──────────────────────────────────────────────────────────────┐
│  🔍  Buscar comandos...                                       │
├──────────────────────────────────────────────────────────────┤
│  NAVEGACIÓN                                                   │
│  [icon]  Ir a inicio                              [⌘H]       │
│  [icon]  Ir a ajustes                             [⌘,]       │
├──────────────────────────────────────────────────────────────┤
│  ACCIONES                                                     │
│  [icon]  Nuevo documento                          [⌘N]       │
│  [icon]  Exportar                                 [⌘E]       │
│  [icon]  Archivar proyecto            [Nuevo]                 │
├──────────────────────────────────────────────────────────────┤
│  ↑↓ navegar  •  ↵ seleccionar  •  esc cerrar                 │  ← footer (HasFooter=yes)
└──────────────────────────────────────────────────────────────┘
```

**Anatomía de slots — CommandItem:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `icon` | icon | No | Icono de la acción |
| `label` | text | Sí | Nombre del comando |
| `description` | text | No | Texto descriptivo adicional |
| `shortcut` | container | No | Badges con atajos de teclado |
| `badge` | container | No | Tag "New", "Pro", categoría |

**Anatomía de slots — CommandPalette:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `searchInput` | container | Sí | Input de búsqueda (combobox) |
| `groupHeader` | text | No | Separador de categoría |
| `items` | container | Sí | N CommandItems |
| `emptyState` | container | No | "No se encontraron comandos" |
| `footer` | container | No | Hints de navegación por teclado |

### Properties y valores

**CommandItem:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `hover` · `selected` · `focused` · `disabled` |
| **Size** | `sm` · `md` |

**CommandPalette:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `empty` · `loading` |
| **Size** | `sm` · `md` · `lg` |
| **HasFooter** | `no` · `yes` |

**Frame counts:**
- CommandItem: State(5) × Size(2) = **10 frames**
- CommandPalette: State(3) × Size(3) × HasFooter(2) = **18 frames**
- **Total: 28 frames**

### Panel de Figma

**CommandItem:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / hover / selected / focused / disabled |
| Size | Variant | sm / md |
| 👁 Has Icon | Boolean | true/false |
| 👁 Has Description | Boolean | true/false |
| 👁 Has Shortcut | Boolean | true/false |
| 👁 Has Badge | Boolean | true/false |
| ✏️ Label | Text | `Ir a inicio` |
| ✏️ Description | Text | `Abre el dashboard principal` |
| 🔄 Icon | Instance swap | `icon/arrow-right` |

**CommandPalette:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / empty / loading |
| Size | Variant | sm / md / lg |
| HasFooter | Variant | no / yes |

---

## Cuándo usar

**Usar CommandPalette cuando:**
- La aplicación tiene un número considerable de acciones o páginas que el usuario navega frecuentemente
- El target de usuarios son power users o técnicos que prefieren teclado sobre mouse
- Se necesita un lanzador global accesible desde cualquier pantalla (Cmd/Ctrl+K)

**Size=sm (480px):** Aplicaciones focalizadas con pocos comandos
**Size=md (640px):** Estándar para la mayoría de aplicaciones
**Size=lg (720px):** Aplicaciones con muchos comandos y descriptions largas

**No usar CommandPalette cuando:**
- La aplicación es simple con 5-10 acciones → usar Menu o botones directos
- El patrón Cmd+K no es conocido por el usuario objetivo (aplicaciones consumer básicas)
- El contexto es mobile → buscar un equivalente más accesible (bottom sheet con search)

---

## Variaciones visuales

### CommandItem — Tamaños

| Size | Alto | Padding X | Gap | Font label | Font desc | Icon |
|------|------|-----------|-----|------------|-----------|------|
| `sm` | 36px | 12px | 10px | 13px | 12px | 16px |
| `md` | 44px | 16px | 12px | 14px | 13px | 18px |

### CommandItem — Estados

| Estado | Apariencia |
|--------|-----------|
| `default` | Background transparente, texto primario |
| `hover` | Background `surface/hover`, texto primario |
| `selected` | Background `brand/subtle`, texto brand, font-weight 500 |
| `focused` | Background `surface/hover` (sin ring — usa aria-activedescendant) |
| `disabled` | Transparente, texto secundario, opacity 60% |

### CommandPalette — Tamaños

| Size | Ancho | Alto máx | Search height |
|------|-------|----------|---------------|
| `sm` | 480px | 360px | 44px |
| `md` | 640px | 480px | 52px |
| `lg` | 720px | 560px | 56px |

### CommandPalette — Estados

| Estado | Apariencia |
|--------|-----------|
| `default` | Lista de items con grupos |
| `empty` | Empty state "No se encontraron comandos" en center del panel |
| `loading` | Skeleton o spinner mientras se cargan resultados |

### Shortcut badges

Pequeños contenedores con borde sutil, padding 4px 6px, font monospace xs. Separar keys con "+": `⌘K`, `Ctrl+N`, `⌘⇧P`.

---

## Decisiones de diseño

### 1. Combobox dentro de dialog (no listbox solo)

Command palette es input + listbox vinculados — el patrón ARIA combobox es el canónico. `aria-activedescendant` permite hacer highlight de items sin mover el focus fuera del input, lo que es crítico para el typing continuo. Si el focus se moviera al item, el usuario perdería el cursor de texto.

### 2. Grouped items con category headers

Slack, Linear, GitHub agrupan comandos por categoría ("Navegación", "Acciones", "Configuración"). Mejora la discoverabilidad en palettes con 20+ comandos. Los headers tienen `role="presentation"` con heading interno.

### 3. Shortcut badges inline como learning affordance

Power users aprenden los atajos al ver el comando. Los badges en el item sirven como enseñanza progresiva: el usuario ejecuta el comando desde la palette y aprende el shortcut al mismo tiempo. Con el tiempo, usa el shortcut directo.

### 4. Footer con hints de teclado (opt-in)

El footer "↑↓ navegar • ↵ seleccionar • esc cerrar" es opt-in (`HasFooter=yes`). Mejora la descoverabilidad para usuarios que no conocen los atajos, sin añadir ruido a interfaces para power users.

### 5. Typing = fuzzy search automático

No requiere submit. El typing filtra en tiempo real con fuzzy matching. `aria-live="polite"` anuncia el count de resultados ("5 comandos encontrados"). El estado `empty` se activa cuando no hay matches.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Dialog container | `role="dialog"` + `aria-modal="true"` + `aria-label="Paleta de comandos"` |
| Search input | `role="combobox"` + `aria-expanded="true"` + `aria-controls="[list-id]"` + `aria-activedescendant="[item-id]"` |
| Lista de resultados | `role="listbox"` + `aria-label="Resultados"` |
| CommandItem | `role="option"` + `aria-selected="true/false"` |
| Group header | `role="presentation"` con heading descriptivo |
| Empty state | `aria-live="polite"` anuncia `"No se encontraron comandos"` |
| Result count | `aria-live="polite"` anuncia `"N comandos encontrados"` |

### Apertura

| Trigger | Comportamiento |
|---------|----------------|
| `Cmd+K` (Mac) / `Ctrl+K` (Win/Lin) | Abre la palette |
| Custom shortcut configurable | Definir según el sistema |
| Click en botón "Buscar" global | Alternativa visual |

Al abrir: focus va inmediatamente al search input, no al primer item.

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| Typing | Filtra items con fuzzy search |
| `Arrow Down` | Mueve highlight al siguiente item (`aria-activedescendant`) |
| `Arrow Up` | Mueve highlight al item anterior |
| `Enter` | Ejecuta el item actualmente highlighted |
| `Escape` | Cierra la palette, retorna focus al trigger original |
| `Tab` | Sale del input (no navega entre items — combobox pattern) |

### Focus management

1. Al abrir: focus → search input
2. Durante navegación: highlight via `aria-activedescendant` (sin mover focus)
3. Al ejecutar: cierra palette, ejecuta acción, focus al trigger o al resultado
4. Al cancelar (Escape): cierra, focus retorna exactamente al elemento previo

---

## Guía de contenido

**Labels de comandos:**
- Verbos de acción: "Crear proyecto", "Ir a ajustes", "Exportar como PDF"
- Conciso (2-4 palabras). La descripción puede ampliar.
- Consistente con el nombre de la acción en la UI principal

**Descriptions:**
- Solo para acciones que lo necesiten (no todas)
- Una línea máximo, información contextual
- Ej: "Abre el dashboard principal" para "Ir a inicio"

**Category headers:**
- Mayúsculas completas: "NAVEGACIÓN", "ACCIONES RECIENTES", "CONFIGURACIÓN"
- Separar grupos con suficiente espacio vertical para que sean escaneables

**Shortcut badges:**
- Mostrar solo atajos que el usuario puede usar en la situación actual
- Incluir el icono de tecla correcto para la plataforma (⌘ Mac, Ctrl Win)

**Empty state:**
- "No se encontraron comandos para '[query]'"
- Opcional: sugerir acciones populares o recientes cuando el search está vacío

---

## Pre-build checklist

- [ ] CommandItem: verificar que `selected` y `focused` son visualmente distintos (selected = brand bg, focused = surface hover sin ring)
- [ ] CommandPalette: overlay de fondo (scrim) con `rgba(0,0,0,0.4)` o `overlay/backdrop`
- [ ] Shortcut badges tienen ancho mínimo (no colapsan) y se alinean a la derecha del item
- [ ] El footer es un slot visual separado con `border-top` sutil y bg ligeramente diferente
- [ ] Loading state tiene un estado intermedio visual (skeleton o spinner central)
- [ ] Comprobar que los tamaños sm/md/lg se ven bien con 3-4 grupos de comandos cada uno

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Dialog / Modal** | CommandPalette usa el mismo patrón de overlay/focus trap |
| **Input** | El search input puede reutilizar el componente TextField |
| **Badge** | Los badges de shortcut y "New/Pro" usan el componente Badge |
| **Empty State** | El estado vacío puede usar el componente EmptyState |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Shortcut | Grupos | Shortcuts inline | Footer hints |
|---------|----------|--------|-----------------|--------------|
| **Raycast** | ⌘K | Sí | Sí | Sí |
| **Linear** | ⌘K | Sí | Sí | Sí |
| **Slack** | ⌘K | Sí, recientes | No | Sí |
| **GitHub** | ⌘K | Sí | No | Parcial |
| **Notion** | ⌘K | No | No | No |
| **VS Code** | ⌘P / ⌘⇧P | Sí (Shift para comandos) | Sí | Sí |

**Consenso:** `Cmd+K` es el shortcut estándar. Grupos mejoran discoverabilidad. Footer con hints mejora onboarding de nuevos usuarios. Todos usan combobox pattern con aria-activedescendant.

---

## Tokens y espaciado

**Prefijo:** `cmd-` · **Total tokens:** 20 · **Modo:** Components

### Tokens del contenedor

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cmd/w/sm` | `sizing/480` | Ancho size sm |
| `cmd/w/md` | `sizing/640` | Ancho size md |
| `cmd/w/lg` | `sizing/720` | Ancho size lg |
| `cmd/bg` | `surface/default` | Fondo del dialog |
| `cmd/border` | `border/default` | Border del dialog |
| `cmd/radius` | `radius/lg` | Border radius |
| `cmd/shadow` | `elevation/4` | Sombra del dialog |

### Tokens del search

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cmd/search/h/sm` | `sizing/44` | Alto search sm |
| `cmd/search/h/md` | `sizing/52` | Alto search md |
| `cmd/search/h/lg` | `sizing/56` | Alto search lg |

### Tokens de items

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cmd/item/sm/h` | `sizing/36` | Alto item sm |
| `cmd/item/md/h` | `sizing/44` | Alto item md |
| `cmd/item/hover/bg` | `surface/hover` | Fondo hover |
| `cmd/item/selected/bg` | `brand/subtle` | Fondo selected |
| `cmd/item/selected/fg` | `interactive/default` | Texto selected |
| `cmd/item/selected/fontWeight` | `type/weight-medium` | Peso selected |
| `cmd/item/disabled/opacity` | `opacity/disabled` | Opacidad disabled |

### Tokens de footer y shortcut

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cmd/footer/bg` | `surface/hover` | Fondo footer |
| `cmd/footer/fg` | `text/secondary` | Texto footer |
| `cmd/footer/fontSize` | `type/xs` | Tamaño texto footer |
| `cmd/shortcut/bg` | `surface/pressed` | Fondo badge shortcut |

### Espaciado del item por tamaño

| Propiedad | sm | md |
|-----------|----|----|
| Alto | 36px | 44px |
| Padding X | 12px | 16px |
| Gap icon-label | 10px | 12px |
| Font label | 13px | 14px |
| Font description | 12px | 13px |
| Icon size | 16px | 18px |
