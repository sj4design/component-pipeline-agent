# InlineEdit

## Overview

InlineEdit es un control de formulario que permite editar valores individuales directamente en su lugar de visualización, sin redirigir al usuario a una página de edición separada. El componente mantiene una máquina de estados explícita con cinco estados: **view** (visualización del valor actual), **edit** (input activo con controles de confirmación), **saving** (confirmación async en proceso), **error** (validación fallida dentro del modo edición) y **disabled** (campo bloqueado no editable).

La arquitectura sigue el patrón de render-props validado por Atlassian: el slot `readView` acepta el display del valor actual (heading, texto, valor formateado) y el slot `editInput` acepta el input para edición — cualquier tipo de entrada de texto. El componente posee la máquina de estados; los slots proveen la superficie visual.

```
ESTADOS: view → edit → (saving) → view
                  ↓
               (error)   ← validación inline sin salir del campo
                  ↓
               (cancel) → view

VIEW STATE:
┌────────────────────────────────────────────────────────┐
│  Sprint Goal                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Complete user authentication flow  [✏ hover]   │  │  ← readView; role="button"
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘

EDIT STATE (Enter/click activa):
┌────────────────────────────────────────────────────────┐
│  Sprint Goal                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Complete user authentication flow               │  │  ← editInput (focused)
│  └──────────────────────────────────────────────────┘  │
│  [✓ Confirmar]  [✕ Cancelar]                           │  ← confirmButton + cancelButton
└────────────────────────────────────────────────────────┘

ERROR STATE (validación inline):
┌────────────────────────────────────────────────────────┐
│  Sprint Goal                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [valor vacío]                                   │  │  ← borde error
│  └──────────────────────────────────────────────────┘  │
│  ⚠ Este campo es obligatorio                          │  ← validationMessage
│  [✓ Confirmar]  [✕ Cancelar]                           │
└────────────────────────────────────────────────────────┘

SAVING STATE (async post-confirm):
┌────────────────────────────────────────────────────────┐
│  Sprint Goal                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Complete user authentication flow  [⟳]          │  │  ← spinner reemplaza editTrigger
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

El diseñador configura el trigger de edición: **hover-reveal** (el ícono de lápiz aparece solo en hover/focus, limpio para interfaces CRM con muchos campos editables) o **always-visible** (el lápiz siempre visible, más accesible para audiencias generales).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
State          → view | edit | saving | error | disabled
TriggerVariant → hover-reveal | always-visible
Size           → sm | md | lg
```

Toggles (show/hide parts — do NOT generate extra variants):

```
SubmitOnBlur         → boolean — blur guarda; riesgo a11y; default false
StartWithEditOpen    → boolean — abre pre-enfocado (flujos "añadir nuevo")
IsRequired           → boolean — previene confirmar con valor vacío
IsPreviewFocusable   → boolean — readView en el tab order (default true)
SelectAllOnFocus     → boolean — selecciona todo el texto al activar edición
Disabled             → boolean — alineación con prop isDisabled del código
Show Edit Trigger    → boolean — visibilidad del editTrigger slot
Show Confirm         → boolean — visibilidad del confirmButton
Show Cancel          → boolean — visibilidad del cancelButton
Show Validation      → boolean — visibilidad del validationMessage
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  INLINE EDIT                            │
│  ─────────────────────────────────────  │
│  State          [view         ▾]        │
│  TriggerVariant [hover-reveal ▾]        │
│  Size           [md           ▾]        │
│  ─────────────────────────────────────  │
│  SubmitOnBlur         [ ] false         │
│  StartWithEditOpen    [ ] false         │
│  IsRequired           [ ] false         │
│  IsPreviewFocusable   [✓] true          │
│  SelectAllOnFocus     [ ] false         │
│  Disabled             [ ] false         │
│  ─────────────────────────────────────  │
│  Show Edit Trigger    [ ] false         │
│  Show Confirm         [ ] false         │
│  Show Cancel          [ ] false         │
│  Show Validation      [ ] false         │
│  ─────────────────────────────────────  │
│  ✏️ Read Value    [Valor de campo  ]    │
│  ✏️ Validation Msg [Este campo es obligatorio] │
└─────────────────────────────────────────┘

CONTEO DE FRAMES
  Gross: 5 states × 3 sizes = 15
  Exclusiones: 3 combinaciones inválidas
  Net: 12 frames (simple form-control budget)
```

---

## When to use (and when not to)

```
¿El valor editable está aislado (un campo a la vez)?
  └→ Sí, edición rápida de bajo riesgo → InlineEdit con blur-to-save opcional
  └→ Sí, edición con consecuencias → InlineEdit con confirmación explícita
  └→ No, múltiples campos relacionados → Dialog o SidePanel con Save/Cancel

¿El contexto es una interfaz de usuario experto (CRM, dashboard, herramienta)?
  └→ Sí → InlineEdit apropiado; el patrón es establecido y esperado
  └→ No, audiencia general o baja literacidad digital → Flujo navigate-to-edit

¿El tipo de campo es texto simple o número?
  └→ Sí → InlineEdit con editInput
  └→ No, es date picker / rich text / lookup → Popout editor pattern

¿El contexto es una celda de tabla?
  └→ Sí → F2 para activar edit mode; ARIA grid pattern
  └→ No → Enter/click para activar; ARIA button pattern
```

**Use InlineEdit when:**
- El usuario necesita corregir un valor individual sin perder contexto de la página — títulos de issues en Jira, nombres de sprints, metas, etiquetas en tarjetas.
- La interfaz es usada por usuarios expertos que esperan la capacidad de edición directa y comprenden el patrón.
- La corrección es de bajo riesgo (un título, un nombre de campo) donde la eficiencia importa más que la confirmación formal.
- El campo editable está en una lista o tabla donde navegar a una pantalla de edición por cada item sería excesivamente costoso en términos de context switching.

**Do NOT use InlineEdit when:**
- Editar el campo requiere también cambiar campos relacionados — los campos dependientes deben editarse en contexto, usando un Dialog con múltiples campos.
- El contexto es un formulario regulatorio, médico o financiero donde la confirmación explícita es un requisito legal. Nord (healthcare) y GOV.UK son referencias correctas para estos contextos.
- La audiencia del producto tiene baja literacidad digital — la ambigüedad "¿qué partes son editables?" es una barrera significativa de comprensión (investigación de GOV.UK).
- El tipo de campo es complejo: datepicker, rich text, lookup combobox — estos requieren el patrón de popout editor.
- El flujo está dentro de un embudo de conversión donde la distracción o el error accidental tienen costo alto.
- La interfaz es móvil-first — las interacciones táctiles son ambiguas para edición en lugar (investigación de Pinterest/Gestalt).

---

## Visual variations

### Por estado

**view** — Muestra el `readView` (valor actual). El `editTrigger` (ícono de lápiz) es visible permanentemente (`always-visible`) o aparece en hover/focus (`hover-reveal`). El readView wrapper tiene `role="button"` + `tabIndex=0` — es un elemento interactivo que activa el modo edit.

**edit** — El `editInput` reemplaza al readView con el input activo enfocado. Los botones `confirmButton` (✓) y `cancelButton` (✕) son visibles debajo del input. El estado edit siempre muestra confirmación explícita (inline, no popover) a menos que `SubmitOnBlur=true`.

**saving** — Estado transitorio post-confirmación mientras se procesa la request async. El editTrigger es reemplazado por un spinner. El campo se muestra en modo lectura pero visualmente indica actividad. Este estado es incompatible con `TriggerVariant` (el trigger está suprimido).

**error** — Solo aplica dentro del modo edit. El borde del input cambia a error color. El `validationMessage` aparece debajo del input con `aria-live="assertive"`. Los botones confirm/cancel siguen visibles. El usuario puede corregir sin salir del campo.

**disabled** — El campo está bloqueado. El editTrigger es reemplazado por un indicador de locked (candado o sin affordance). Sin cursor pointer, sin interacción, sin tab stop en el readView.

### Por TriggerVariant

| Variante | Descripción | Cuándo usar |
|----------|-------------|-------------|
| `hover-reveal` | El lápiz aparece al hacer hover o focus sobre el readView | Interfaces CRM/admin densas donde múltiples campos son editables y la presencia permanente de íconos añade ruido visual |
| `always-visible` | El lápiz está siempre visible junto al valor | Interfaces de uso general, audiencias menos técnicas, cuando la accesibilidad táctil importa |

**Nota de accesibilidad:** `hover-reveal` requiere implementar el equivalente `focus-visible` — el trigger debe aparecer cuando el readView recibe foco por teclado, no solo por hover de mouse.

### Por tamaño

| Size | Altura | Font | Icon | Padding X | Radio |
|------|--------|------|------|-----------|-------|
| `sm` | 32px | 12px | 16px | 8px | 4px |
| `md` | 40px | 14px | 16px | 12px | 4px |
| `lg` | 48px | 16px | 20px | 16px | 4px |

El radio es 4px (no píldora) — InlineEdit es un form-control archetype; los inputs usan radio rectangular.

---

## Design decisions

### 1. Máquina de estados con 5 valores como variante (no como combinación de booleans)

**Why:** Cada estado de InlineEdit cambia la estructura del componente de manera sustancial: `view` muestra readView, `edit` muestra input+botones, `saving` muestra spinner, `error` muestra validationMessage, `disabled` muestra locked readView. Cinco estructuras visuales distintas. Cuando ≥2 propiedades visuales cambian simultáneamente (Rule 27 de global-property-rules), la diferencia requiere frames de variante. No se puede capturar con toggles booleanos que se combinan.

**Tradeoff:** 12 frames net en lugar de 3-4 que tendría un enfoque naïve. Es el costo correcto por tener un componente que representa fielmente su complejidad de estado en Figma para prototipado.

---

### 2. SubmitOnBlur por defecto en false (no en true como Chakra)

**Why:** `SubmitOnBlur=true` (el default de Chakra) guarda el valor cuando el usuario mueve el foco a cualquier otro elemento. Para usuarios de teclado navegando con Tab, cualquier pulsación accidental de Tab guarda el estado actual de edición — incluso un valor incompleto o erróneo. El caso extremo es el argumento de seguridad de paciente de Nord (dosis de medicación en tablet clínico), pero el caso común es la pérdida accidental de datos. Atlassian y Polaris documentan explícitamente el riesgo.

**Tradeoff:** Los flujos de edición rápida de bajo riesgo (títulos de items, nombres de carpetas) se benefician del blur-to-save. El prop `SubmitOnBlur` debe estar disponible como opt-in explícito. El default seguro es `false`.

---

### 3. TriggerVariant como dimensión de variante (no como boolean)

**Why:** `hover-reveal` vs. `always-visible` produce layouts estructuralmente diferentes del readView slot: en always-visible el lápiz ocupa espacio permanente en el layout, en hover-reveal el espacio cambia al hacer hover/focus. Esta diferencia de layout es visible en los frames de Figma y afecta al spacing y alineación del contenido. Es un cambio estructural → variante requerida.

**Tradeoff:** Añade un eje a la matriz de frames (2 trigger variants × 5 states × 3 sizes = 30 gross, pero los exclusions la llevan a 12 net). La separación es correcta porque los dos triggers tienen implicaciones de accesibilidad diferentes que el diseñador debe elegir conscientemente.

---

### 4. ConfirmModel eliminado de la matriz de variantes (gestionado como SubmitOnBlur boolean)

**Why:** El modelo de confirmación (explicit confirm/cancel buttons vs. blur-to-save) es una decisión de comportamiento/configuración, no una diferencia visual estructural. Ambos modelos muestran los mismos botones confirm/cancel en el estado edit — la diferencia está en si el blur dispara la confirmación o no. Por las reglas de global-property-rules, los props de comportamiento sin impacto estructural visual se mapean como booleans.

**Tradeoff:** Menos obvious en el panel de Figma para diseñadores que quieren ver "modos" distintos. La documentación del componente debe explicar que SubmitOnBlur=true es el modo blur-to-save.

---

### 5. Focus management como requisito no negociable

**Why:** Si el foco no regresa al elemento trigger del readView después de guardar o cancelar, los usuarios de teclado pierden su posición en la página. En una lista de 20 items editables, si el foco cae al documento root después de cada guardado, el usuario debe navegar desde el inicio para continuar editando. Atlassian, Chakra, Ant Design y la guía de patrones de Polaris documentan esto como el requisito de accesibilidad más importante del componente.

**Tradeoff:** Requiere guardar una ref al elemento trigger antes de activar el modo edit. Es complejidad de implementación, pero es el precio de la accesibilidad correcta. No hay alternativa — sin esto el componente falla para usuarios de teclado.

### Excluded combinations

```
State=saving × TriggerVariant=hover-reveal  → Saving suprime el trigger; hover no aplica
State=saving × TriggerVariant=always-visible → Spinner reemplaza el trigger en saving
State=disabled × State=edit                  → Disabled bloquea toda interacción; edit inalcanzable
State=error × State=view                     → Error solo en modo edit; view muestra último valor válido
SubmitOnBlur=true × IsRequired=true          → Blur de campo vacío bloquearía navegación o guardaría inválido
```

---

## Behavior

### Essential for design

InlineEdit funciona como una máquina de estados controlada: el usuario ve el valor en modo lectura, activa el modo edición, modifica el valor y confirma o cancela. Los estados son exclusivos — el componente siempre está en exactamente uno de los cinco estados.

**Activación del modo edit:**
- Click en el readView (el wrapper completo es clickable)
- Enter o Space cuando el readView tiene foco (es un `role="button"`)
- Click en el editTrigger (ícono de lápiz) si está visible

**Al activar edit:** El foco se mueve inmediatamente al editInput. Si `SelectAllOnFocus=true`, todo el texto se selecciona al entrar al campo.

**Confirmación:** Enter en el editInput confirma. El clic en confirmButton confirma. Si `SubmitOnBlur=true`, perder el foco del editInput también confirma (excepto cuando el foco va al confirmButton o cancelButton — eso no debe disparar save).

**Cancelación:** Escape cancela y regresa a view. Clic en cancelButton cancela. En ambos casos, el foco regresa al readView trigger.

**Post-save:** Si hay API async, el estado cambia a `saving`. El spinner indica actividad. Al completar, regresa a `view` con el nuevo valor. El foco regresa al readView trigger.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| readView wrapper | `role="button"` | `tabIndex={0}`, `aria-label="Editar [nombre del campo]"` | Teclado puede activar el modo edit; AT anuncia que es interactivo |
| editTrigger (lápiz) | `role="button"` | `aria-label="Editar [nombre del campo]"` | Nunca usar "Editar" genérico sin contexto del campo |
| editInput | `role="textbox"` (nativo input) | `aria-label` o `aria-labelledby` del campo | El input debe tener label accesible |
| confirmButton | `role="button"` | `aria-label="Confirmar edición de [campo]"` | Distingue qué campo se está confirmando |
| cancelButton | `role="button"` | `aria-label="Cancelar edición de [campo]"` | Distingue qué campo se está cancelando |
| validationMessage | Live region | `aria-live="assertive"`, `role="alert"` | Errores se anuncian inmediatamente, sin esperar que el usuario navegue al mensaje |
| Transición view→edit | — | `aria-live="polite"` o mover foco al input | Sin anuncio, la aparición del input es silenciosa para AT |

### Keyboard navigation

Primary interactions (affect design):

```
readView (role="button"):
  Enter / Space  → Activar modo edit; mover foco al editInput

editInput (modo edit):
  Escape         → Cancelar; regresar a view; foco al readView trigger
  Enter          → Confirmar; si async → estado saving; foco al readView trigger
  Shift+Enter    → (para textarea multilinea) — nueva línea sin confirmar
  Tab            → Mover foco al confirmButton (no guardar en blur)

confirmButton:
  Enter / Space  → Confirmar; foco al readView trigger
  Tab            → Mover al cancelButton

cancelButton:
  Enter / Space  → Cancelar; foco al readView trigger
  Tab            → Salir del componente (foco al siguiente elemento de la página)
```

Secondary interactions (dev reference):

```
Focus management post-save/cancel:
  → SIEMPRE regresar foco al readView trigger element
  → Almacenar ref al trigger ANTES de activar edit mode
  → triggerRef.current.focus() en onConfirm y onCancel callbacks
  → Sin esto: keyboard users pierden posición en la página

aria-live="polite":
  → "Editando [nombre del campo]" al activar edit mode (o confiar en focus al input)

aria-live="assertive":
  → Mensaje de validación completo al aparecer (nunca solo "Campo requerido" — incluir el campo)

En tabla/grid context:
  → F2 para entrar edit mode (ARIA grid pattern, no Enter)
  → Arrow keys navegan la tabla; NO entran al input
  → Escape sale del edit mode y regresa a grid navigation
```

---

## Content guide

### Slot: readView (REQUERIDO)

Muestra el valor actual del campo en modo lectura. El contenido puede ser un heading (`h1`–`h6`), texto de párrafo, un valor numérico formateado ("$ 1,234.56") o cualquier elemento de texto. El wrapper del readView debe ser un `<button>` o tener `role="button"`.

El texto debe ser el valor real, no un placeholder. Si el campo no tiene valor, muestra un texto de placeholder diferenciado visualmente (e.g., color `text/subtlest`): "Sin asignar", "Añade un título…".

### Slot: editTrigger (opcional)

Ícono de lápiz o botón "Editar" que activa el modo edit. Su `aria-label` debe incluir el nombre del campo: "Editar nombre del sprint" — nunca "Editar" genérico.

En `TriggerVariant=hover-reveal`, el trigger debe aparecer también en `focus-visible` del readView — no solo en `hover`. La omisión de este caso es el error de accesibilidad más frecuente en implementaciones de CRM-style edit triggers.

### Slot: editInput (modo edit)

El input que recibe el valor editado. Puede ser un `<input type="text">` para valores de una línea o un `<textarea autoSize>` para valores multilínea. El tamaño visual del input debe aproximarse al del readView para minimizar el layout shift al activar el modo edit.

### Slot: confirmButton / cancelButton

Los botones de confirmación y cancelación se muestran debajo del editInput en el estado `edit`. El botón confirm tiene ícono de checkmark (✓); cancel tiene ícono de ×. El posicionamiento es inline (debajo del campo), no en un popover flotante — los popovers añaden complejidad de z-index y son menos predecibles para usuarios de teclado.

### Slot: validationMessage

Aparece en el estado `error`, debajo del editInput. Comunica por qué el valor no es válido sin que el usuario tenga que salir del campo. El mensaje debe ser específico: "Este campo es obligatorio" (no "Campo inválido") o "El título no puede superar 100 caracteres" (no "Demasiado largo").

El slot usa `figmaBinding: boolText` — tiene tanto un toggle de visibilidad (`Show Validation`) como texto editable (`✏️ Validation Message`).

---

## Pre-build checklist

```
ANTES DE EMPEZAR
  [ ] Decidir modelo de confirmación: blur-to-save (SubmitOnBlur) vs. explicit confirm/cancel
  [ ] Documentar el riesgo de accesibilidad de blur-to-save en la documentación del componente
  [ ] Confirmar si el contexto es tabla (ARIA grid, F2) o general (Enter/click)
  [ ] Decidir TriggerVariant: hover-reveal (CRM/denso) vs. always-visible (general)

FIGMA
  [ ] 12 frames net (5 states × 3 sizes, minus 3 exclusiones)
  [ ] State=edit muestra confirmButton + cancelButton (no solo el input)
  [ ] State=saving muestra spinner en lugar del editTrigger
  [ ] State=error muestra validationMessage con borde de error en el input
  [ ] State=disabled sin editTrigger, sin cursor pointer
  [ ] validationMessage slot con figmaBinding boolText correctamente configurado
  [ ] editInput slot con figmaBinding "slot" (acepta instancia de TextField)
  [ ] Radio 4px en todos los tamaños (form-control, no píldora)
  [ ] TriggerVariant=hover-reveal: lápiz con opacidad 0 en state=default, visible en hover

ACCESIBILIDAD
  [ ] readView wrapper tiene role="button" + tabIndex=0
  [ ] editTrigger aria-label incluye el nombre del campo (no "Editar" genérico)
  [ ] confirmButton aria-label incluye el nombre del campo
  [ ] validationMessage tiene aria-live="assertive" / role="alert"
  [ ] Especificado en el handoff: focus debe regresar al readView trigger después de save/cancel
  [ ] Documentado: Tab en editInput mueve al confirmButton, no guarda
  [ ] TriggerVariant=hover-reveal: confirmado que focus-visible también revela el trigger

TOKENS
  [ ] Prefix ine- en todos los tokens del componente
  [ ] Borde de error usa border/error token, no solo color visual
  [ ] Focus ring en editInput usa el token focus.ring del sistema
```

---

## Related components

```
TextField / Input
  → El editInput dentro de InlineEdit ES un TextField
  → Usar TextField standalone para formularios tradicionales; InlineEdit para correcciones in-place

Dialog / Modal
  → Para edición de múltiples campos relacionados simultáneamente
  → Si los campos tienen dependencias entre sí, InlineEdit no es el patrón correcto

Popover / Popout Editor
  → Para tipos de campo complejos (datepicker, rich text, lookup)
  → Lightning Design System es la referencia: date y lookup fields usan popout editors

DataTable cell editing
  → Variante de InlineEdit para contextos de tabla con ARIA grid pattern
  → Keyboard: F2 para activar, arrow keys para navegar tabla, Escape para salir de edit

Editable Heading
  → Patrón específico para títulos de página editables (estilo Atlassian Confluence)
  → Misma arquitectura pero readView es un heading element (h1/h2) de mayor tamaño
```

---

## Reference: how other systems do it

**Atlassian InlineEdit** es la implementación de referencia en el sector — el único componente Tier 1 completamente dedicado al patrón, validado en producción por tres productos principales: Jira (títulos de issues y nombres de sprint), Confluence (títulos de páginas) y Trello (nombres de tarjetas). La arquitectura render-prop (`readView`/`editView` como funciones que retornan React elements) resuelve el problema fundamental: cualquier tipo de display (heading grande, etiqueta pequeña, valor de moneda formateado) puede usar el mismo InlineEdit con tratamientos visuales completamente distintos. La característica `keepEditViewOpenOnBlur` es la solución a la ambigüedad más común — cuando el foco se mueve al botón de confirmación, el blur del input no debe disparar cancelación. El prop `validate: (value) => string | void` habilita validación inline sin salir del modo edit.

**Ant Design Typography editable** integra la edición inline directamente en los componentes Typography mediante un objeto de configuración `editable`. La característica más valiosa es `editable.text` — separa el valor de display (formateado: "$ 1,234.56") del valor de edición (raw: "1234.56"), habilitando edición inline de valores formateados sin composición adicional. El ícono de lápiz es siempre visible por defecto — más descubrible que el hover-reveal de Lightning, a costo de ruido visual en interfaces densas.

**Chakra Editable** es la referencia de arquitectura compound component para el patrón. La separación en `Editable`, `EditablePreview`, `EditableInput` y `EditableControls` permite estilizar y posicionar el preview y el input independientemente — resuelve el "problema de size-matching mágico" que ocurre cuando un solo elemento intenta ser simultáneamente display e input. `EditableControls` como render prop permite posicionar los botones de save/cancel en cualquier layout sin dictar su ubicación. La prop `submitOnBlur` expone explícitamente la decisión de UX más importante del componente en lugar de ocultarla como default.

**Lightning Design System** implementa el patrón hover-reveal pencil para record fields en CRM — estándar en Salesforce. El lápiz aparece en hover y focus-visible del campo, disparando el modo edit al hacer click. Lightning es el único sistema con mass-edit (editar el mismo campo en múltiples filas seleccionadas simultáneamente) y con popout editors para tipos de campo complejos (rich text, lookup, datepicker) que no pueden caber inline. La activación por F2 en celdas de tabla sigue el ARIA grid pattern correcto.

**Carbon (IBM)** limita intencionalmente la edición inline a celdas de DataTable vía `useEditableRows`. IBM no planea un InlineEdit general — cita Atlassian como referencia de diseño para equipos que necesitan el patrón fuera de tablas. La edición de celdas en Carbon usa F2 para activar y Escape para salir del edit mode, siguiendo el ARIA grid interaction pattern.

**Polaris (Shopify)** no tiene componente formal pero provee la documentación de patrón más prácticamente útil: cada valor editable debe tener un affordance visible (no descubrimiento accidental), blur-to-save es apropiado solo para ediciones de un solo valor de bajo riesgo, y la confirmación explícita es requerida para ediciones multi-campo o de alta importancia. Esta distinción (single-value quick edits vs. multi-field or high-stakes) es el marco de decisión más valioso del ecosistema.

**La mitad de los 24 sistemas analizados optaron por NO implementar el patrón.** Fluent 2 (Microsoft) cita investigación de UX que encontró tasas de error más altas en edición in-place en vistas densas. GOV.UK usa el patrón "Check Your Answers" — página de resumen con links "Cambiar" que navegan a preguntas dedicadas. Nord (healthcare) rechaza el patrón por incompatibilidad con requisitos de auditoría clínica. Gestalt (Pinterest) cita usabilidad táctil inconsistente en mobile-first. Estos rechazos son evidencia de que InlineEdit es apropiado para contextos específicos (aplicaciones de productividad para usuarios expertos), no como patrón universal.

---

## Tokens

**22 tokens** · prefix `ine-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `ine-bg-view` | `surface/default` | Fondo del readView en modo view |
| `ine-bg-edit` | `surface/default` | Fondo del editInput (mismo, para continuidad visual) |
| `ine-bg-hover` | `surface/hover` | Fondo del readView en hover |
| `ine-bg-disabled` | `surface/disabled` | Fondo en estado disabled |
| `ine-fg-default` | `text/primary` | Color del texto en readView |
| `ine-fg-placeholder` | `text/subtlest` | Color del placeholder ("Sin asignar") |
| `ine-fg-disabled` | `text/disabled` | Color del texto en disabled |
| `ine-border-view` | `border/default` | Borde del readView (sutil o none) |
| `ine-border-edit` | `border/focus` | Borde del editInput activo |
| `ine-border-error` | `border/error` | Borde en state=error |
| `ine-border-focus` | `border/focus` | Ring de focus en el readView button |
| `ine-trigger-fg` | `text/secondary` | Color del ícono de lápiz |
| `ine-trigger-fg-hover` | `text/primary` | Color del lápiz en hover |
| `ine-error-fg` | `status/error/fg` | Color del texto de validationMessage |
| `ine-error-bg` | `status/error/bg` | Fondo del área de validationMessage |
| `ine-spinner-fg` | `interactive/default` | Color del spinner en estado saving |
| `ine-confirm-fg` | `success/fg` | Color del ícono ✓ en confirmButton |
| `ine-cancel-fg` | `text/secondary` | Color del ícono ✕ en cancelButton |
| `ine-focus-ring` | `focus/ring` | Ring de focus visible |
| `ine-radius` | `radius/4` (4px) | Radio rectangular de form-control |
| `ine-h-sm` | `control/sm` (32px) | Altura size=sm |
| `ine-h-md` | `control/md` (40px) | Altura size=md |

### Spacing specs

```
SIZE: sm (height 32px)
  ├── padding-y: 4px   (spacing/4)
  ├── padding-x: 8px   (spacing/8)
  ├── gap (trigger→text): 8px  (spacing/8)
  ├── font-size: 12px  │  line-height: 16px
  ├── icon-size: 16px
  └── border-radius: 4px

SIZE: md (height 40px) — DEFAULT
  ├── padding-y: 8px   (spacing/8)
  ├── padding-x: 12px  (spacing/12)
  ├── gap: 8px         (spacing/8)
  ├── font-size: 14px  │  line-height: 20px
  ├── icon-size: 16px
  └── border-radius: 4px

SIZE: lg (height 48px)
  ├── padding-y: 12px  (spacing/12)
  ├── padding-x: 16px  (spacing/16)
  ├── gap: 8px         (spacing/8)
  ├── font-size: 16px  │  line-height: 24px
  ├── icon-size: 20px
  └── border-radius: 4px

CONFIRM/CANCEL BUTTONS (debajo del editInput en estado edit)
  ├── margin-top: 4px  (spacing/4) — separación del input
  ├── gap entre botones: 8px
  ├── button min-size: 32×32px (a11y minimum)
  └── icon-size: 16px (sm/md) / 20px (lg)

FOCUS RING (readView trigger + editInput)
  ├── ring-width: 2px
  ├── ring-offset: 2px
  └── ring-color: #405EF2 (interactive/default)

VALIDATION MESSAGE (estado error)
  ├── margin-top: 4px  (spacing/4)
  ├── font-size: 12px
  ├── line-height: 16px
  └── color: status/error/fg
```
