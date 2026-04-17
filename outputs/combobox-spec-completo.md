# Combobox

## Descripción general

Combobox es el control de selección con búsqueda del sistema de diseño: combina un campo de texto editable con un dropdown de opciones filtradas. A diferencia de Select (dropdown puro, sin búsqueda), Combobox permite al usuario escribir para filtrar las opciones disponibles — y opcionalmente aceptar valores personalizados que no estén en la lista (`allowsCustomValue=true`). Es el patrón estándar para selección de elementos en datasets grandes (más de 10 opciones), tags, contactos, países, y cualquier selección donde el filtrado mejora la velocidad de uso.

```
State=default, Size=md:
┌──────────────────────────────────────────────────────────┐
│  [🔍] Buscar o seleccionar...                   [▾]      │  h:40px
└──────────────────────────────────────────────────────────┘

Con valor escrito (Has Clear=on):
┌──────────────────────────────────────────────────────────┐
│  [🔍] España                                   [×] [▾]   │
└──────────────────────────────────────────────────────────┘

Dropdown expandido (implementación):
┌──────────────────────────────────────────────────────────┐
│  [🔍] Esp                                      [×] [▾]   │
├──────────────────────────────────────────────────────────┤
│  ● España                                                │  role=listbox
│    Estados Unidos                                        │  role=option
│    República Checa                                       │
└──────────────────────────────────────────────────────────┘

States:
│  default:  bg:white   border:default  fg:primary        │
│  error:    bg:white   border:error    fg:primary         │
│  disabled: bg:disabled border:disabled fg:disabled       │

Has Loading (async):
┌──────────────────────────────────────────────────────────┐
│  [🔍] Buscando...                          [⟳] [▾]       │  spinner en trailing
└──────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size  → sm | md | lg
State → default | error | disabled
```

Toggles:

```
👁 Has Prefix Icon → muestra/oculta el ícono leading (lupa, etc.) (default: off)
👁 Has Clear       → muestra/oculta el botón × de limpiar (default: off)
👁 Has Loading     → muestra/oculta el spinner de carga async (default: off)
```

Texto editable:

```
✏️ Placeholder → "Buscar o seleccionar..."
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Combobox                                                │
│  ──────────────────────────────────────────────────────  │
│  Size   [ md              ▼ ]                            │
│  State  [ default         ▼ ]                            │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Prefix Icon  [ off ]                             │
│  👁 Has Clear        [ off ]                             │
│  👁 Has Loading      [ off ]                             │
│  ✏️ Placeholder  [ Buscar o seleccionar...           ]   │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita seleccionar de una lista de opciones?
                    │
                    ▼
       ¿Cuántas opciones hay?
       ├── 2–10 opciones → Select o RadioGroup (sin búsqueda)
       └── >10 opciones → Combobox (búsqueda necesaria)
                    │
                    ▼
       ¿El usuario puede ingresar valores no en la lista?
       ├── Sí → allowsCustomValue=true (Combobox con creación)
       └── No → allowsCustomValue=false (solo seleccionar de la lista)
                    │
                    ▼
       ¿Las opciones vienen de una API (carga asíncrona)?
       ├── Sí → Combobox + Has Loading (async search)
       └── No → Combobox con opciones locales
```

**Usar Combobox cuando:**
- Selección de país en un formulario (195 opciones — búsqueda esencial)
- Agregar tags o etiquetas a un item (valores custom + opciones existentes)
- Buscar y seleccionar un contacto de un directorio (async desde API)
- Seleccionar una zona horaria, idioma, o moneda (listas largas)
- Selección de assignee en una tarea (equipo largo con búsqueda)

**NO usar Combobox cuando:**
- Hay menos de 10 opciones sin búsqueda → usar `Select` o `RadioGroup`
- La selección es binaria (sí/no, activo/inactivo) → usar `Switch` o `Checkbox`
- Solo se quiere filtrar sin seleccionar → usar `Search`
- El listado de opciones no tiene estructura de búsqueda (como fechas) → usar `Datepicker`

---

## Variaciones visuales

### Size

| Size | Height | PaddingX | PaddingY | FontSize | IconSize | Radius |
|------|--------|---------|---------|---------|---------|--------|
| sm   | 32px   | 8px     | 6px     | 12px    | 16px    | 6px    |
| md   | 40px   | 12px    | 8px     | 14px    | 16px    | 6px    |
| lg   | 48px   | 16px    | 12px    | 16px    | 20px    | 8px    |

### State

| State | Background | Border | Foreground | Notas |
|-------|-----------|--------|-----------|-------|
| default | surface/default (blanco) | border/default | text/primary | Focus: border/focus |
| error | surface/default | border/error (rojo) | text/primary | Ícono error en trailing |
| disabled | surface/disabled | border/disabled | text/disabled | No interactivo |

---

## Decisiones de diseño

**1. allowsCustomValue como comportamiento, no variante visual** — Spectrum hace la distinción más clara: `allowsCustomValue=false` (autocomplete — revierte al último valor válido en blur) vs `allowsCustomValue=true` (combobox libre — acepta cualquier texto). Esta diferencia es semántica y comportamental, no visual — no genera frames distintos en Figma. El developer implementa el comportamiento; el diseñador decide el caso de uso.

**2. State=error como frame variante (no solo color)** — Error cambia el border-color Y puede añadir un ícono de alerta en el trailing Y puede mostrar texto de error debajo del campo. Tres cambios simultáneos requieren un frame propio para que el diseñador pueda modelar cada caso sin confusión.

**3. Has Loading para búsqueda async** — Cuando el usuario escribe y hay un debounce esperando la respuesta de la API, el spinner en el trailing slot comunica que está buscando. Sin este indicador, el usuario puede pensar que el campo no funciona. Modelado como toggle para activar solo en prototipos de flujos con datos remotos.

**4. Chevron siempre visible** — El chevron (▾) no tiene toggle. Siempre está presente — es la señal visual de que el campo tiene un dropdown. Ocultarlo haría el campo indistinguible de un TextField plain.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Size × State son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Dropdown no es parte del frame** — en Figma, el Combobox frame modela solo el campo (trigger). El dropdown (listbox con opciones filtradas) es un overlay que el developer renderiza en runtime. No modelar el dropdown dentro del frame del Combobox.
- **Has Clear aparece al escribir** — el botón × se muestra automáticamente cuando hay texto en el campo. En Figma, Has Clear=on representa el estado "con valor escrito". Has Clear=off es el estado vacío/placeholder.
- **Focus state** — al recibir foco, el borde cambia a border/focus (azul). No hay un State=focus separado en Figma porque el focus es gestionado por el browser/OS — se documenta en el token `cbx/border-focus`.
- **allowsCustomValue=false: revert en blur** — si el usuario escribe y no selecciona una opción, el campo revierte al último valor válido al perder el foco. El diseñador debe modelar este estado mostrando el último valor seleccionado, no el texto parcial escrito.
- **Chevron rota al expandir** — en implementación, el chevron rota 180° cuando el dropdown está abierto (▾ → ▴). En Figma, se modela con el chevron en posición cerrada (▾) siempre.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Input | `role="combobox"` + `aria-expanded` + `aria-controls` | SR anuncia "combobox, [estado de dropdown]" |
| Dropdown | `role="listbox"` + `id` referenciado por `aria-controls` | SR asocia el input con su listbox |
| Opción | `role="option"` + `aria-selected` | SR anuncia cada opción al navegar |
| Opción activa | `aria-activedescendant="[option-id]"` en input | Focus virtual — el foco del DOM queda en el input |
| Autocompletar | `aria-autocomplete="list"` | SR anuncia el tipo de autocompletado |
| Estado error | `aria-invalid="true"` + `aria-errormessage` | SR anuncia el error al campo |

### Navegación por teclado

```
Typing          → filtra las opciones del dropdown
↓               → abre dropdown (si cerrado) / navega a la primera opción
↑               → navega hacia arriba en las opciones
Enter           → selecciona la opción resaltada
Escape          → cierra dropdown; revierte valor (allowsCustomValue=false)
Tab             → confirma selección y avanza al siguiente campo
Alt+↓           → abre dropdown sin mover focus a las opciones
Backspace       → borra caracteres (o limpia valor seleccionado)
```

---

## Guía de contenido

**Placeholder:**
- Describir la acción: "Buscar o seleccionar...", "Buscar país", "Seleccionar assignee"
- Incluir el tipo de contenido: no solo "Buscar..." — "Buscar contacto" es más útil
- Si allowsCustomValue=true: "Buscar o crear etiqueta..."

**Error text (debajo del campo):**
- Describir el problema: "Selecciona una opción válida de la lista" (si allowsCustomValue=false y el valor no es válido)
- Para campos requeridos: "Este campo es requerido"

**Opción "Crear [valor]" (Has Create):**
- Siempre al final de la lista de opciones
- Formato: `+ Crear "[valor escrito]"` — incluir el texto escrito para claridad
- Solo cuando allowsCustomValue=true + el valor escrito no existe en la lista

---

## Pre-build checklist

```
□ ¿role="combobox" en el input?
□ ¿aria-expanded actualizado al abrir/cerrar dropdown?
□ ¿aria-controls apunta al id del listbox?
□ ¿aria-autocomplete="list" presente?
□ ¿aria-activedescendant actualizado al navegar opciones?
□ ¿role="listbox" en el dropdown?
□ ¿role="option" + aria-selected en cada opción?
□ ¿↓↑ Arrow navegan el dropdown?
□ ¿Escape cierra y revierte (allowsCustomValue=false)?
□ ¿Has Clear aparece solo cuando hay valor (no en placeholder)?
□ ¿Dropdown renderizado fuera del campo (portal) para evitar overflow?
```

---

## Componentes relacionados

```
Select       → para listas cortas (<10 opciones) sin búsqueda — dropdown puro
Search       → para búsqueda sin selección de opción estructurada
TextField    → para input de texto libre sin dropdown de opciones
Datepicker   → para selección de fecha (no usar Combobox)
Menu         → para acciones en dropdown (no para selección de valor)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Async | Custom value | Multi-select | ARIA | Diferenciador |
|---------|-------|-------|-------------|-------------|------|--------------|
| **Material Design 3** | Exposed Dropdown | No | No | No | combobox | AutocompleteTextView |
| **Spectrum (Adobe)** | ComboBox | Sí | allowsCustomValue prop | No | combobox + APG | allowsCustomValue; filtering modes |
| **Carbon (IBM)** | ComboBox | Sí | No | No (MultiSelect separado) | combobox | typeahead; filteredItemsNode |
| **Polaris (Shopify)** | Combobox | Sí | Sí (allowNew) | Sí | combobox | Combobox.Option; Combobox.TextField |
| **Atlassian** | Select (async) | Sí | Sí (allowCreateWhileLoading) | Sí | combobox | React-Select based; create-option |
| **Ant Design** | AutoComplete | Sí | Sí (default) | No | combobox | Pure combobox (siempre custom value); filterOption |
| **Twilio Paste** | Combobox | Sí | Sí | Sí (MultiselectCombobox) | combobox + APG | Full APG; MultiselectCombobox separado |
| **Lightning** | combobox | Sí | No | No | combobox | LWC native; lookup-type |
| **Primer (GitHub)** | ActionMenu (no combobox) | — | — | — | — | Sin combobox dedicado |
| **shadcn/ui** | Command | Sí | Sí | — | combobox (cmdk) | cmdk base; SearchInput wrapper |
| **Chakra UI** | No (AutoComplete via Ark UI) | — | — | — | — | Compose Select + Input |
| **Fluent 2** | Combobox | Sí | Sí | No | combobox | positioning; resizable; freeform |
| **Mantine** | Combobox + Autocomplete | Sí | Sí | No | combobox | Split entre Combobox primitivo y Autocomplete |
| **Orbit (Kiwi)** | InputField + Select | Sí | — | — | — | Sin componente Combobox dedicado |
| **Evergreen** | Combobox | Sí | allowOtherValue | No | combobox | Popover-based |

**Patrones clave de la industria:**
1. **APG Combobox Pattern** — El ARIA Authoring Practices Guide define el patrón completo de combobox (role=combobox + listbox + option + activedescendant). Spectrum, Twilio, y Fluent 2 lo siguen completamente. Es el patrón de referencia.
2. **allowsCustomValue / freeform** — Spectrum, Polaris, Atlassian, y Fluent 2 tienen esta prop explícita. Ant Design lo tiene implícito (siempre custom). El comportamiento de revert-on-blur para allowsCustomValue=false es el diferenciador semántico clave.
3. **Async search** — La mayoría de T1+ la soportan via onInputChange callback + loadItems. El Has Loading toggle en Figma modela el estado de espera visual.
4. **Multi-select** — Polaris, Atlassian (React-Select), y Twilio tienen multi-select integrado. Es un caso de uso frecuente (tags, asignaciones múltiples) que se modela como variante separada o wrapper del mismo Combobox.

---

## Tokens

**14 tokens** · prefijo `cbx-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `cbx-bg` | `surface/default` | Background del campo |
| `cbx-border` | `border/default` | Borde default |
| `cbx-border-focus` | `border/focus` | Borde en focus — azul |
| `cbx-border-error` | `border/error` | Borde en error — rojo |
| `cbx-fg` | `text/primary` | Texto ingresado |
| `cbx-placeholder` | `text/subtlest` | Texto placeholder |
| `cbx-icon` | `text/secondary` | Color de íconos (lupa, chevron) |
| `cbx-disabled-bg` | `surface/disabled` | Background disabled |
| `cbx-disabled-border` | `border/disabled` | Borde disabled |
| `cbx-disabled-fg` | `text/disabled` | Texto disabled |
| `cbx-radius` | `radius/md` | Border radius (6-8px según size) |
| `cbx-error-fg` | `status/error/fg` | Color ícono/texto de error |
| `cbx-chevron-color` | `text/secondary` | Color del chevron ▾ |
| `focus-ring` | `border/focus` | Focus ring exterior |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size sm: h:32px · px:8px  · py:6px  · font:12px        │
│  Size md: h:40px · px:12px · py:8px  · font:14px        │
│  Size lg: h:48px · px:16px · py:12px · font:16px        │
│                                                          │
│  Estructura interna (de izquierda a derecha):            │
│  [Has Prefix Icon] [input] [Has Clear] [Has Loading] [▾] │
│                                                          │
│  Chevron: siempre visible · 16px (sm/md) · 20px (lg)    │
│                                                          │
│  Frames totales:                                         │
│  Size(3) × State(3) = 9 frames                          │
└──────────────────────────────────────────────────────────┘
```
