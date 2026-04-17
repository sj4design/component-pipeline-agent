# Search

## Descripción general

Search es el campo de búsqueda especializado del sistema de diseño: un input con `type="search"` y `role="search"` que optimiza la experiencia de búsqueda frente a un TextField genérico. Agrega `onSubmit` (para búsquedas con API) y `onChange` (para filtrado local) como callbacks separados, un botón de limpiar automático, estado de carga async, y una variante `expandable` que colapsa a ícono en toolbars densos. Es el patrón estándar para búsqueda global, filtrado de listas, y búsqueda contextual dentro de un módulo.

```
Size=md, Variant=default:
┌──────────────────────────────────────────────────┐
│  [🔍] Buscar...                          [×]     │  h:40px
└──────────────────────────────────────────────────┘

Size=lg, Variant=default (radio pill):
┌────────────────────────────────────────────────────┐
│  [🔍] Buscar contactos...                [×]       │  h:48px · radius:9999
└────────────────────────────────────────────────────┘

Has Loading (búsqueda async):
┌──────────────────────────────────────────────────┐
│  [⟳] Buscando...                         [×]     │
└──────────────────────────────────────────────────┘

Has Submit Btn:
┌──────────────────────────────────────┬────────────┐
│  [🔍] Buscar reuniones...            │  Buscar    │  h:40px
└──────────────────────────────────────┴────────────┘

Variant=expandable (toolbar):
  Colapsado:  [🔍]
  Expandido: ┌────────────────────────────────────┐
             │  [🔍] Buscar...              [×]   │
             └────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size    → sm | md | lg
Variant → default | expandable
```

Toggles:

```
👁 Has Value      → muestra/oculta el botón × de limpiar (default: off)
👁 Has Loading    → muestra/oculta el spinner de carga async (default: off)
👁 Has Submit Btn → muestra/oculta el botón de submit (default: off)
```

Texto editable:

```
✏️ Placeholder → "Buscar..."
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Search                                                  │
│  ──────────────────────────────────────────────────────  │
│  Size    [ md              ▼ ]                           │
│  Variant [ default         ▼ ]                           │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Value      [ off ]                               │
│  👁 Has Loading    [ off ]                               │
│  👁 Has Submit Btn [ off ]                               │
│  ✏️ Placeholder  [ Buscar...                        ]    │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita buscar o filtrar?
                    │
                    ▼
       ¿Hay un dropdown de resultados con selección?
       ├── Sí → Combobox (búsqueda + selección de opción)
       └── No → Search (búsqueda sin selección estructurada)
                    │
                    ▼
       ¿Hay espacio limitado (toolbar)?
       ├── Sí → Search Variant=expandable
       └── No → Search Variant=default
                    │
                    ▼
       ¿La búsqueda llama a una API?
       ├── Sí → Search + Has Loading (debounce + spinner)
       └── No → Search con filtrado local (onChange)
```

**Usar Search cuando:**
- Búsqueda global del producto (header)
- Filtrado de lista de contactos, meetings, o archivos
- Búsqueda contextual dentro de un panel (sidebar, modal)
- Toolbar con espacio limitado → Variant=expandable
- Búsqueda con resultado en página separada → Has Submit Btn

**NO usar Search cuando:**
- El resultado es una selección de opción → usar `Combobox`
- Solo hay texto libre sin contexto de búsqueda → usar `TextField`
- La búsqueda es filtrado de tabla compleja → puede integrar `DataGrid`
- Es un buscador de fechas → usar `Datepicker`

---

## Variaciones visuales

### Size

| Size | Height | PaddingX | PaddingY | FontSize | IconSize | Radius |
|------|--------|---------|---------|---------|---------|--------|
| sm   | 32px   | 8px     | 6px     | 12px    | 16px    | 6px    |
| md   | 40px   | 12px    | 8px     | 14px    | 16px    | 6px    |
| lg   | 48px   | 16px    | 12px    | 16px    | 20px    | 9999px (pill) |

> Size=lg usa `border-radius: 9999px` (pill shape) — patrón de buscadores tipo Google/macOS Spotlight.

### Variant

| Variant | Descripción | Casos de uso |
|---------|------------|-------------|
| default | Input visible siempre · borde completo | Búsqueda en página, modales, filtros |
| expandable | Colapsa a ícono · se expande al hacer clic | Toolbars densos, headers con espacio limitado |

> Variant=expandable excluye Size=lg — la expansión se usa en toolbars densos donde siempre es sm o md.

---

## Decisiones de diseño

**1. Componente separado de TextField** — Spectrum y Polaris hacen esta separación explícita. Search agrega `onSubmit`, `onClear`, `enterKeyHint="search"`, `role="search"` como landmark, y el shortcut `/` que no pertenecen a un input de texto genérico.

**2. onChange vs onSubmit separados por comportamiento** — Spectrum lo documenta explícitamente: `onChange` para filtrado local (sin latencia), `onSubmit` para llamadas API (con debounce). Mezclarlos genera el bug más común: una API call por cada keystroke.

**3. Variant=expandable para toolbars** — Carbon tiene esta variante específicamente para toolbars densos. En Zoom, headers de meetings y configuración tienen espacio limitado. El expandable libera espacio visual cuando el usuario no está buscando.

**4. Has Loading: spinner reemplaza al ícono de búsqueda** — cuando hay debounce esperando respuesta API, el spinner en el leading slot comunica que está buscando. No es un spinner en el trailing — está en el mismo espacio que la lupa para mantener la estructura visual.

**5. Size=lg con pill radius** — los buscadores globales (estilo Google, macOS Spotlight, Slack) usan pill radius. Es una convención visual que comunica "búsqueda global" vs. "filtro contextual".

### Combinaciones excluidas

```
Variant=expandable + Size=lg
(expandable es para toolbars densos — siempre sm o md)
```

---

## Comportamiento

### Esencial para diseño

- **Has Value = estado "con texto escrito"** — el botón × aparece automáticamente cuando hay texto. Has Value=on modela ese estado en Figma. Has Value=off es el estado vacío/placeholder.
- **Has Loading reemplaza al ícono de búsqueda** — durante la carga async, el spinner ocupa el slot del ícono leading. No se acumulan en trailing.
- **Expandable: foco automático al expandir** — cuando el usuario hace clic en el ícono para expandir, el foco se mueve automáticamente al input. En Figma se modela como dos frames (colapsado / expandido).
- **Escape cierra y colapsa** — en Variant=expandable, Escape limpia el campo Y colapsa de vuelta al ícono. En Variant=default, Escape solo limpia el campo.
- **Submit Btn: Enter también envía** — el botón de submit es opcional (visible en buscadores con resultado en página separada). Enter siempre dispara onSubmit si no hay dropdown de resultados.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Wrapper | `role="search"` + `aria-label="Buscar [contexto]"` | Landmark navegable con / en screen readers |
| Input | `type="search"` | AT anuncia "campo de búsqueda" (distinto de "campo de texto") |
| Loading | `aria-busy="true"` en el wrapper | SR anuncia que la búsqueda está en progreso |
| Clear | `aria-label="Limpiar búsqueda"` en el botón × | Sin label, SR anuncia "botón" sin contexto |
| Expandable | `aria-expanded` en el trigger | SR anuncia estado expandido/colapsado |

### Navegación por teclado

```
Typing        → onChange (filtrado local) o debounce → onSubmit (API)
Enter         → dispara onSubmit
Escape        → limpia el campo; colapsa si Variant=expandable
/ (opcional)  → shortcut global para activar el campo desde fuera
Tab           → sale del campo (sin focus trap)
```

---

## Guía de contenido

**Placeholder:**
- Describir el contexto: "Buscar contactos", "Buscar meetings", "Filtrar por nombre"
- Incluir el objeto de búsqueda — no solo "Buscar..." o "Buscar..."
- Para búsqueda global: "Buscar en Zoom"
- Para expandable con espacio limitado: "Buscar" (mínimo necesario)

**Has Submit Btn:**
- Texto del botón: "Buscar" — no "Enviar", "OK", o "Ir"
- En buscadores con resultado en página: siempre visible
- En filtros inline: generalmente oculto (onChange sin botón)

**Resultados (fuera del componente):**
- Sin resultados: mostrar estado vacío con sugerencias, no solo "Sin resultados"
- Con resultados: accesible desde el campo con ↓ (o abrir Combobox si hay selección)

---

## Pre-build checklist

```
□ ¿role="search" en el wrapper (landmark)?
□ ¿aria-label descriptivo en el wrapper?
□ ¿type="search" en el input?
□ ¿Has Loading: aria-busy="true" en el wrapper?
□ ¿Has Value (botón ×): aria-label="Limpiar búsqueda"?
□ ¿Enter dispara onSubmit?
□ ¿Escape limpia el campo (+ colapsa si expandable)?
□ ¿onChange y onSubmit separados (no onSubmit por keystroke)?
□ ¿Variant=expandable: aria-expanded en trigger?
□ ¿Variant=expandable: foco automático al expandir?
□ ¿Size=lg: border-radius pill (9999px)?
```

---

## Componentes relacionados

```
Combobox     → cuando la búsqueda produce una selección de opción
TextField    → para input de texto sin contexto de búsqueda
DataGrid     → puede integrar Search para filtrado de tabla
CommandPalette → búsqueda global con acciones (Cmd+K)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Async | Expandable | Submit Btn | ARIA | Diferenciador |
|---------|-------|-------|-----------|-----------|------|--------------|
| **Material Design 3** | SearchBar / SearchView | Sí | SearchView (full-screen) | No | search | SearchView: pantalla completa en mobile |
| **Spectrum (Adobe)** | SearchField | Sí | No | No | search | onChange/onSubmit separados; onClear |
| **Carbon (IBM)** | Search | Sí | Sí (expandable) | No | search | expandable toolbar; closeButton |
| **Polaris (Shopify)** | — | — | — | — | — | Sin SearchField (usa TextField) |
| **Atlassian** | — | — | — | — | — | Sin SearchField (usa TextField) |
| **Ant Design** | Input.Search | Sí | No | Sí | search | enterButton prop; onSearch |
| **Twilio Paste** | SearchInput | Sí | No | No | search | Wraps Input; HTMLInputElement interface |
| **Lightning** | lightning-input type=search | — | — | — | search | LWC native |
| **Primer (GitHub)** | TextInput leadingVisual=SearchIcon | — | — | — | — | No dedicated; compone desde TextInput |
| **shadcn/ui** | — | — | — | — | — | Compone desde Input + Command |
| **Chakra UI** | InputGroup + SearchIcon | — | — | — | — | Sin componente dedicado |
| **Fluent 2** | SearchBox | Sí | No | No | search | contentAfter/Before slots |
| **Mantine** | — | — | — | — | — | Sin componente dedicado |
| **Orbit (Kiwi)** | — | — | — | — | — | Sin componente dedicado |

**Patrones clave de la industria:**
1. **`role="search"` como landmark** — ARIA Landmark Roles: `role="search"` define una región de búsqueda navegable por SR con `/` shortcut. Carbon, Spectrum, Fluent y Twilio lo implementan en el wrapper.
2. **`type="search"` en el input** — diferente de `type="text"`: limpia el campo con Escape nativo en algunos browsers; AT anuncia "campo de búsqueda"; `enterKeyHint="search"` activa el ícono de lupa en teclados móviles.
3. **Carbon Expandable** — variante de toolbar que Carbon documenta con apertura por click/foco, cierre por Escape, y animación de expansión. La única T1 con esta variante nativa.
4. **Spectrum onChange/onSubmit** — separación más clara del mercado: `onChange` dispara en cada keystroke (filtrado local), `onSubmit` dispara en Enter (API call). Debounce se gestiona en `onSubmit`, no en `onChange`.

---

## Tokens

**10 tokens** · prefijo `sch-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `sch/bg` | `surface/default` | Background del campo |
| `sch/border` | `border/default` | Borde default |
| `sch/border-focus` | `border/focus` | Borde en focus — azul |
| `sch/fg` | `text/primary` | Texto de búsqueda |
| `sch/placeholder` | `text/subtlest` | Texto placeholder |
| `sch/icon` | `text/secondary` | Color del ícono de lupa |
| `sch/radius` | `radius/md` | Border radius sm/md; pill en lg |
| `sch/submit-bg` | `interactive/default` | Background botón submit |
| `sch/submit-fg` | `text/inverse` | Texto botón submit |
| `focus/ring` | `border/focus` | Focus ring exterior |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size sm: h:32px · px:8px  · py:6px  · font:12px        │
│  Size md: h:40px · px:12px · py:8px  · font:14px        │
│  Size lg: h:48px · px:16px · py:12px · font:16px        │
│           └─ radius:9999px (pill)                        │
│                                                          │
│  Estructura interna (de izquierda a derecha):            │
│  [🔍 / ⟳] [input] [Has Value: ×] [Has Submit Btn]       │
│                                                          │
│  Frames totales (net):                                   │
│  Size(3) × Variant(2) − 1 (expandable+lg) = 5 frames   │
└──────────────────────────────────────────────────────────┘
```
