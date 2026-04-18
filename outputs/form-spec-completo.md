# Form

## Overview

El sistema de Form es un conjunto de tres componentes compuestos jerárquicamente: `FormField` (campo individual con label, input, helper y mensajes de validación), `FormSection` (agrupación semántica de campos relacionados con título y separadores) y `Form` (contenedor de nivel superior que gestiona el layout, el tamaño y el footer de acciones). La arquitectura en tres capas permite usar `FormField` de forma independiente en formularios simples inline, `FormSection` para agrupar campos en settings o checkout, y `Form` para layouts complejos de multi-columna.

El principio central que unifica todos los sistemas estudiados: la accesibilidad del formulario no es opcional y no es un feature que se puede añadir después. Los tres atributos ARIA fundamentales — `aria-required`, `aria-invalid` y `aria-describedby` — deben aplicarse automáticamente por el componente, no por el consumer. Cuando un campo tiene error, el `aria-invalid` y `aria-errormessage` son responsabilidad del componente, no del desarrollador.

```
Form (Layout=single-column, Size=md):
┌─────────────────────────────────────────────────────────────┐
│  Información de contacto                                     │  title
│  Completa los campos requeridos para continuar.             │  description
├─────────────────────────────────────────────────────────────┤
│  <fieldset>                                                 │
│    Datos personales                                         │  sectionTitle (legend)
│    ─────────────────────────────────────────────────────   │  divider
│                                                             │
│    Nombre *                              FormField sm/md/lg │
│    ┌─────────────────────────────────────────────────────┐ │
│    │  Pedro Quinones                                     │ │
│    └─────────────────────────────────────────────────────┘ │
│                                                             │
│    Correo electrónico *                                     │
│    ┌─────────────────────────────────────────────────────┐ │
│    │  pedro@example.com                                  │ │
│    └─────────────────────────────────────────────────────┘ │
│    ⚠ Ingresa un correo electrónico válido                  │  errorMessage
│                                                             │
│    Teléfono (Opcional)                                      │
│    ┌─────────────────────────────────────────────────────┐ │
│    │  +52 55 1234 5678                                   │ │
│    └─────────────────────────────────────────────────────┘ │
│    Incluye código de país                                   │  helperText
│  </fieldset>                                               │
├─────────────────────────────────────────────────────────────┤
│  footer:              [Cancelar]   [Guardar cambios]        │
└─────────────────────────────────────────────────────────────┘

FormField Layout=horizontal:
  Nombre *    ┌───────────────────────────────────────┐
              │                                       │
              └───────────────────────────────────────┘
  label (1/3) │ input (2/3)

FormField Layout=inline:
  [  Nombre  ]  [ input ]  — single line, no helperText
```

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Form:
  Layout: single-column | two-column | horizontal
  Size:   sm | md | lg

FormField:
  State:  default | focused | error | success | disabled
  Size:   sm | md | lg
  Layout: stacked | horizontal | inline

FormSection:
  Variant: default | card | inset
```

Toggles (show/hide parts — do NOT generate extra variants):

```
FormField:
  Has Helper Text         → texto instructivo bajo el input
  Has Label Icon          → ícono de info al lado del label
  Show Required Indicator → asterisco * o texto "Requerido"
  Show Error Message      → mensaje de error bajo el input
  Show Success Message    → mensaje de validación positiva
```

### Figma properties panel

```
Form:
┌─────────────────────────────────────────────┐
│  Form                                       │
├─────────────────────────────────────────────┤
│  Layout  [ single-column ▼ ]                │
│            two-column                       │
│            horizontal                       │
├─────────────────────────────────────────────┤
│  Size    [ md ▼ ] / sm / lg                 │
└─────────────────────────────────────────────┘

FormField:
┌─────────────────────────────────────────────┐
│  FormField                                  │
├─────────────────────────────────────────────┤
│  State   [ default ▼ ]                      │
│            focused / error / success        │
│            disabled                         │
├─────────────────────────────────────────────┤
│  Size    [ md ▼ ] / sm / lg                 │
├─────────────────────────────────────────────┤
│  Layout  [ stacked ▼ ]                      │
│            horizontal / inline              │
├─────────────────────────────────────────────┤
│  Has Helper Text       [   ]               │
│  Has Label Icon        [   ]               │
│  Show Required Indicator [ ✓ ]             │
│  Show Error Message    [   ]               │
│  Show Success Message  [   ]               │
├─────────────────────────────────────────────┤
│  ✏️ Label        [ Nombre              ]    │
│  ✏️ Helper Text  [ Este campo es...    ]    │
│  ✏️ Error        [ El nombre es...     ]    │
└─────────────────────────────────────────────┘

FormSection:
┌─────────────────────────────────────────────┐
│  FormSection                                │
├─────────────────────────────────────────────┤
│  Variant  [ default ▼ ]                     │
│             card / inset                    │
└─────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita ingresar o editar datos?
│
├─ Sí → ¿Cuántos campos?
│        ├─ 1-2 campos independientes → FormField standalone (sin Form wrapper)
│        ├─ 3-15 campos relacionados → Form (Layout=single-column)
│        └─ 15+ campos o grupos complejos → Form con FormSections
│
│        ¿Layout de los campos?
│        ├─ Mobile-first o onboarding → Layout=stacked (default)
│        ├─ Settings desktop con labels largos → Layout=horizontal
│        └─ Filtros inline compactos → Layout=inline
│
└─ No → No usar Form
         Para mostrar datos (no editar): usar DescriptionList
         Para confirmaciones simples: usar Dialog con texto
```

**Use Form when:**
- El usuario necesita ingresar o editar múltiples campos relacionados
- El formulario tiene validación (client-side o server-side) que debe comunicarse al usuario
- Los campos necesitan agruparse semánticamente (dirección, datos de pago, preferencias)
- El formulario tiene un submit explícito con botones de acción en el footer
- El contexto es settings, onboarding, checkout, data entry o filtros avanzados

**Do NOT use Form when:**
- Solo hay 1-2 campos independientes sin relación semántica entre ellos
- Los datos son solo de lectura — usar DescriptionList o Typography
- El input es una búsqueda inline — usar SearchField o la barra de búsqueda
- El "formulario" es solo un checkbox o toggle de confirmación — usar directamente el control
- El contexto es un filtro de una sola línea — usar FilterBar component

---

## Visual variations

### FormField por State

**State=default**
Campo en reposo. Label color `text/primary`, helper text color `text/secondary`. El input interno está en su estado default. Sin indicadores de error o éxito.

**State=focused**
El input interno tiene focus. El label cambia a color `interactive/default` (azul). El border del input interno cambia a `border/focus`. El helper text permanece visible.

**State=error**
El campo tiene un error de validación. Label permanece `text/primary`. El helper text (si visible) cambia a `status/error/fg` (rojo). El error message es visible debajo del input con ícono de alerta. El input interno tiene `aria-invalid="true"` y borde `border/error`.

**State=success**
Validación positiva — el campo tiene un valor válido. El success message muestra confirmación con ícono de check en `status/success/fg`. El input interno muestra borde de éxito. Más común en campos con validación compleja (formato de email, disponibilidad de username).

**State=disabled**
El campo no puede ser editado. Label y texto cambian a `text/disabled`. El input interno muestra `disabled` visual. El campo no recibe focus.

### FormField por Layout

**Layout=stacked** (default, mobile-first)
Label arriba del input, full width. El layout más legible para formularios en mobile y formularios con labels descriptivos. Permite helper text y mensajes de error sin afectar el ancho del input.

**Layout=horizontal**
Label a la izquierda (1/3 del ancho) e input a la derecha (2/3 del ancho). Ideal para formularios de settings en desktop donde hay muchos campos y se quiere aprovechar el ancho. Exclusión: `Layout=inline + helperText visible` — el helper text no cabe en el layout inline.

**Layout=inline**
Todo en una línea. Label + input en la misma fila, sin helper text debajo. Para filtros compactos y casos donde el espacio vertical es crítico.

### FormField por Size

| Size | Label fontSize | Label marginBottom | Helper fontSize | Gap (entre elementos) |
|------|---------------|--------------------|-----------------|-----------------------|
| sm | 12px | 4px | 11px | 8px |
| md | 13px | 6px | 12px | 12px |
| lg | 14px | 8px | 13px | 16px |

### FormSection por Variant

**Variant=default**
Sección con título, espaciado visual y un divider opcional. Sin contenedor visible — solo estructura de spacing y heading.

**Variant=card**
Sección con borde visible, border-radius=md, fondo `surface/default` y padding interno de 24px. El patrón clásico de settings page donde cada sección es una tarjeta elevada.

**Variant=inset**
Sección con fondo tinted (`surface/hover`), padding interno y sin borde visible. Para sub-secciones dentro de una card principal — crea jerarquía visual sin añadir bordes anidados.

### Form por Layout

**Layout=single-column**
Todos los FormFields ocupan el 100% del ancho disponible. El layout más simple y legible para onboarding, checkout y formularios de contacto.

**Layout=two-column**
Los FormFields se distribuyen en dos columnas de igual ancho. Para data entry con muchos campos que tienen valores cortos (fechas, precios, cantidades). Requiere que el consumer defina qué campos van en qué columna — el Form proporciona el grid de 2 columnas.

**Layout=horizontal**
Todos los FormFields dentro del Form usan `Layout=horizontal` por defecto. El Form propaga el layout a sus hijos. Para settings pages desktop con labels alineados a la izquierda.

---

## Design decisions

### 1. Tres sub-componentes: FormField + FormSection + Form

**Por qué:** La composición natural del formulario es jerárquica: Form contiene N FormSections, cada Section contiene N FormFields. Esta arquitectura permite tres cosas importantes: (1) usar `FormField` standalone para formularios simples de 2-3 campos sin el overhead del Form; (2) cambiar el layout de una sección específica sin afectar las demás; (3) hacer que el FormSection renderice automáticamente `<fieldset>` + `<legend>` sin que el consumer lo gestione manualmente.

**Tradeoff:** Tres componentes implican tres filas de importación, tres documentaciones, y tres lugares donde buscar problemas. El tradeoff es correcto: la claridad semántica y la reutilización individual de FormField justifica la separación.

### 2. FormField Layout: stacked / horizontal / inline

**Por qué:** Los tres layouts responden a tres contextos de uso reales y distintos. Stacked es mobile-first y el más legible cuando los labels son descriptivos (más de 2 palabras). Horizontal es el estándar para settings desktop donde hay 20+ campos y el espacio vertical es escaso. Inline es para filtros compactos donde todo debe caber en una línea. Ningún sistema tiene un layout único que funcione bien en todos los contextos.

**Tradeoff:** La exclusión `Layout=inline + helperText visible` es el tradeoff explícito: en inline no hay espacio para texto de ayuda. El diseñador debe elegir entre layout compacto y contexto de ayuda.

### 3. Error message linked via aria-errormessage (WCAG ARIA 1.2)

**Por qué:** `aria-errormessage` es el patrón ARIA 1.2 correcto para mensajes de validación. La separación semántica es crucial: `aria-describedby` apunta al helper text (información complementaria siempre visible), mientras `aria-errormessage` apunta al mensaje de error (solo relevante cuando el campo es inválido). Mezclarlos con un único `aria-describedby` que cambia entre helper y error confunde a los lectores de pantalla.

**Tradeoff:** `aria-errormessage` tiene soporte menos universal que `aria-describedby` en lectores de pantalla antiguos. El fallback es mantener siempre el error en el DOM (nunca display:none) y confiar en `aria-live` para anunciar la aparición del mensaje.

### 4. FormSection Variants: default / card / inset

**Por qué:** Las tres variantes responden a tres niveles de jerarquía visual en formularios complejos. Default es el nivel base de agrupación (solo spacing + heading). Card crea una jerarquía de página con secciones claramente delimitadas (el patrón de settings de Stripe, GitHub, Linear). Inset crea sub-jerarquía dentro de una card (campos anidados, dependencias condicionales).

**Tradeoff:** Con tres variantes existe el riesgo de mezclarlas incorrectamente (inset dentro de default, card dentro de card). La documentación de cuándo usar cada una es más importante que la implementación técnica.

### 5. Focus al primer campo inválido al submit (WCAG 3.3.1)

**Por qué:** WCAG 3.3.1 Error Identification requiere que cuando hay errores de validación, el usuario pueda identificarlos. Los usuarios que solo usan teclado no pueden ver los indicadores visuales de error en campos distantes — si el foco permanece en el botón Submit después de un error, el usuario no sabe qué campo tiene el problema. El focus shift al primer campo inválido es el comportamiento correcto según todos los sistemas que documentan este patrón (Ant Design `scrollToFirstError`, Spectrum, GOV.UK).

**Tradeoff:** El focus automático puede sorprender a usuarios que esperan que el form valide silenciosamente. Es el tradeoff correcto: la sorpresa inicial es menor que la confusión de un formulario con errores que el usuario no puede encontrar.

### Excluded combinations

```
Layout=inline + Has Helper Text=true
→ En inline no hay espacio vertical para el helper text
→ Exclusión hard: −3 frames (State(5) × Size(3) × Layout(3) = 45; −3 inline+helper)

FormField State=disabled + Show Error Message=true
→ Campos deshabilitados no muestran errores de validación
→ Soft exclusion: documentada, no es exclusión de frames

FormField State=focused + Show Error Message=true
→ El error aparece al salir del campo (blur), no mientras está focused
→ Soft exclusion: el diseñador puede necesitar mostrar el estado para documentación
```

---

## Behavior

### Essential for design

El comportamiento más importante del Form para el diseñador es el timing de la validación. En el estado default (sin interacción), todos los campos muestran `State=default`. Al hacer blur en un campo (el usuario lo deja), el campo puede cambiar a `State=error` o `State=success`. Al hacer submit con errores, todos los campos inválidos cambian a `State=error` simultáneamente y el foco se mueve al primero.

El FormSection debe renderizar `<fieldset>` + `<legend>` automáticamente — el diseñador no configura esto, el componente lo hace siempre. El sectionTitle siempre es el texto de la `<legend>`. Este es el comportamiento que hace que los grupos de campos sean accesibles para lectores de pantalla que anuncian el nombre del grupo al entrar en él.

El Form footer (con submit y cancel buttons) siempre tiene un separador visual (borde superior) para separar las acciones del contenido del formulario. El footer tiene `position: sticky` en formularios largos (opcional, definido por el consumer).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Form container | form | `aria-labelledby="[title-id]"` (si tiene título) | Crea un landmark de formulario navegable por screen readers |
| FormField | div/li | wrapper sin role | El contenido semántico está en label + input |
| Label | label | `for="[input-id]"` | Asociación nativa label-input; click en label = focus en input |
| Input (requerido) | input/select/textarea | `aria-required="true"` | Anuncia al SR que el campo es obligatorio |
| Input (con error) | input/select/textarea | `aria-invalid="true"` · `aria-errormessage="[error-id]"` | El SR anuncia el error al navegar al campo |
| Input (con helper) | input/select/textarea | `aria-describedby="[helper-id]"` | SR lee el texto de ayuda al llegar al campo |
| Error message | p/span | `role="alert"` · `id="[error-id]"` | El error se anuncia inmediatamente al aparecer |
| Helper text | p/span | `id="[helper-id]"` | Referenciado por aria-describedby del input |
| FormSection | fieldset | ninguno adicional | El <fieldset> nativo crea agrupación semántica |
| Section title | legend | ninguno adicional | El <legend> es el nombre del grupo para SR |
| Required indicator | span | `aria-hidden="true"` | El asterisco visual es decorativo; aria-required en el input lo maneja semánticamente |

### Keyboard navigation

Primary interactions (affect design):

```
Tab           → navega al siguiente campo en DOM order
Shift+Tab     → navega al campo anterior
Enter         → en submit button: envía el formulario
              → en input text (si único campo): envía si Enter está habilitado
Space         → en checkboxes y radios: selecciona/deselecciona
Arrow keys    → dentro de radio groups: navega entre opciones
```

Secondary interactions (dev reference):

```
Enter en formulario con múltiples campos → no envía (solo con un texto único)
Escape en modal form → cancela y cierra el modal; focus vuelve al trigger
Tab order sigue DOM order — nunca usar tabindex>0 para reordenar
Al submit con error: focus automático al primer campo inválido (no al botón de submit)
Al mount (form modal): focus automático al primer campo del formulario
aria-required="true" en inputs — más consistente que HTML required (evita UI nativa del browser)
```

---

## Content guide

### Slot: label (FormField, requerido)
El label es el texto más importante del formulario. Debe ser conciso, descriptivo y hablar al usuario:
- Bien: "Nombre completo", "Dirección de correo", "Número de teléfono"
- Mal: "Name" (en español si el producto es en español), "Input 1", "Campo"
- Máximo: 40 caracteres. Si necesitas más de 40 caracteres, usa helperText para el detalle
- Nunca terminar el label con dos puntos (el sistema los añade automáticamente si es necesario)

### Slot: requiredIndicator
El asterisco (*) indica campo requerido. Siempre debe tener una leyenda visible que explique su significado (en el FormSection o en el header del Form: "* Campos requeridos"). Alternativa: usar texto "(Opcional)" en campos no requeridos cuando la mayoría son requeridos — reduce el ruido visual.

### Slot: helperText
Texto de contexto adicional que aparece siempre bajo el input (no solo en error). Úsalo para:
- Formato esperado: "Formato: +52 55 XXXX XXXX"
- Restricciones: "Mínimo 8 caracteres, 1 número y 1 mayúscula"
- Contexto: "Este será tu nombre público en la plataforma"
- Máximo: 80 caracteres (2 líneas en sm, 1 en lg)
- No repetir el label en el helperText

### Slot: errorMessage
El mensaje que aparece cuando el campo tiene State=error. WCAG 3.3.3 recomienda que los mensajes de error incluyan:
1. Qué falló: "El correo no es válido"
2. Cómo corregirlo: "Ingresa un correo en formato usuario@dominio.com"
- Bien: "El correo no es válido. Ingresa formato usuario@dominio.com"
- Mal: "Error", "Campo inválido", "Verifique el dato"
- Nunca incluir el código de error técnico: no "HTTP 422 Unprocessable"

### Slot: successMessage
Confirmación de validación exitosa. Solo para campos con validación compleja donde la confirmación agrega valor:
- Bien: "Nombre de usuario disponible ✓", "Correo válido ✓"
- No usar para todos los campos — genera ruido visual

### Slot: sectionTitle (FormSection)
El título de la sección que se convierte en el `<legend>` del `<fieldset>`. Corto y descriptivo del grupo de campos:
- Bien: "Información personal", "Datos de facturación", "Preferencias de notificación"
- Mal: "Sección 1", "Datos", "Más información"

---

## Pre-build checklist

```
Frames FormField
[ ] State(5) × Size(3) × Layout(3) = 45; −3 exclusiones = 42 frames
[ ] Exclusión: Layout=inline + Has Helper Text visible eliminada
[ ] State=error: errorMessage visible + borde rojo en input area
[ ] State=success: successMessage visible + borde verde
[ ] State=disabled: opacidad en label y texto + input disabled

Frames FormSection
[ ] Variant(3) = 3 frames (default/card/inset)
[ ] Variant=card: borde visible + radius + padding correcto
[ ] Variant=inset: fondo tinted + padding + sin borde

Frames Form
[ ] Layout(3) × Size(3) = 9 frames
[ ] Footer con separador superior en todos los layouts
[ ] Layout=two-column: grid de 2 columnas visible

Tokens
[ ] frm/label/focused/fg → interactive/default verificado
[ ] frm/error/fg → status/error/fg verificado
[ ] frm/success/fg → status/success/fg verificado
[ ] frm/required/fg → status/error/fg verificado (asterisco en rojo)
[ ] frm/section/card/radius → radius/md verificado

Accesibilidad
[ ] <label for> nativo documentado en component description
[ ] aria-required + aria-invalid + aria-errormessage documentados
[ ] <fieldset> + <legend> para FormSection documentado
[ ] Focus al primer campo inválido al submit documentado
[ ] Required indicator tiene aria-hidden documentado

Content
[ ] ✏️ Label con "Nombre" como default
[ ] ✏️ Helper Text con "Este campo es requerido" como default
[ ] ✏️ Error con "El nombre es obligatorio" como default
```

---

## Related components

```
Input/TextInput    → slot input de FormField es instancia de Input
Select             → slot input puede ser Select
Textarea           → slot input puede ser Textarea
Checkbox           → puede ser el control dentro de un FormField
RadioGroup         → grupo de radios dentro de FormSection con fieldset
Button             → botones de submit/cancel en el footer del Form
Divider            → slot divider en FormSection
Icon               → labelIcon en FormField (info icon con tooltip)
Tooltip            → labelIcon abre un Tooltip con contexto adicional
```

---

## Reference: how other systems do it

**Atlassian Form (Final Form)** tiene la anatomía de formulario más articulada de Tier 1: `FormHeader` para título + descripción, `FormSection` para campos agrupados (renderiza `<fieldset>` con `<legend>`), `FormFooter` para botones de acción. La función `validate` por campo vive co-ubicada con la definición del campo — la lógica de validación para "¿es este un email válido?" pertenece junto a la definición del campo de email. El patrón de inyección de errores de servidor via `onSubmit` return es el más limpio: retornar `{fieldName: "error message"}` distribuye automáticamente los errores de servidor a los campos correspondientes.

**Ant Design Form** es el más rico en features de Tier 1. Usa un store de datos independiente (`Form.useForm()`) separado del estado React — solo el campo que cambió se re-renderiza. El prop `dependencies` es la capacidad única: `<Form.Item dependencies={['password']}>` re-valida el campo de confirmar-contraseña cuando el campo de contraseña cambia. `Form.List` gestiona arrays de campos dinámicos con operaciones incorporadas de agregar/eliminar/mover. `scrollToFirstError` hace scroll y mueve focus al primer campo inválido al fallar el submit.

**Spectrum Form** proporciona tres modos de `validationBehavior`: `native` (validación del browser), `aria` (regiones live ARIA con estilo consistente), y modo servidor via prop `validationErrors` que acepta `{ email: "Dirección ya en uso" }` para inyectar errores de servidor directamente en los campos correspondientes. El Form propaga `labelPosition`, `isDisabled` e `isQuiet` a todos los campos hijo automáticamente.

**Carbon FormGroup** requiere `legendText` como prop no-opcional — el único sistema Tier 1 que hace obligatorio el texto de legend accesible para secciones agrupadas. La convención de marcado de minoría de Carbon es un insight práctico de UX: marcar los campos requeridos si la mayoría son opcionales; marcar los campos opcionales si la mayoría son requeridos — reduce el ruido visual de asteriscos cuando casi todo es requerido.

**shadcn/ui Form** integra react-hook-form para gestión de estado y Zod para validación de esquema — la mejor práctica actual del ecosistema React para formularios validados con tipos. Los mensajes de error fluyen desde el esquema Zod a FormMessage automáticamente.

**GOV.UK Error Summary** es el tratamiento de errores a nivel de formulario más exhaustivamente investigado. Cuando la validación falla, un resumen aparece en la parte superior de la página listando todos los errores con links de ancla a cada campo. El resumen recibe focus programáticamente al cargarse — los usuarios de screen reader encuentran todos los errores antes de empezar a navegar el formulario. El principio de "una cosa por página" asegura que los resúmenes de errores permanezcan manejables en longitud.

**Radix Form** provee el wiring automático de `aria-describedby` entre inputs y mensajes de validación, integrando con la API de validación de restricciones nativa del browser. El prop `serverInvalid` maneja los errores retornados por el servidor. Esta es la infraestructura de accesibilidad de formulario de más bajo nivel — Radix provee el wiring ARIA, los consumers proveen la lógica de validación.

**Fluent 2 Field** soporta cuatro niveles de `validationState`: error/warning/success/none. El nivel warning — feedback consultivo sin bloquear el submit — es significativo para formularios enterprise: "esta tasa parece inusualmente alta, ¿estás seguro?". La distinción entre `hint` y `validationMessage` (dos slots de texto distintos) separa el contexto persistente del feedback de validación.

---

## Tokens

**24 tokens** · prefix `frm-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| frm/field/sm/gap | spacing/2 | Gap entre elementos FormField size sm (8px) |
| frm/field/md/gap | spacing/3 | Gap entre elementos FormField size md (12px) |
| frm/field/lg/gap | spacing/4 | Gap entre elementos FormField size lg (16px) |
| frm/label/default/fg | text/primary | Color del label en estado default |
| frm/label/focused/fg | interactive/default | Color del label cuando el input tiene focus |
| frm/label/disabled/fg | text/disabled | Color del label en estado disabled |
| frm/label/fontSize/sm | type/xs | Tamaño de fuente del label size sm (12px) |
| frm/label/fontSize/md | type/sm | Tamaño de fuente del label size md (13px) |
| frm/label/fontSize/lg | type/md | Tamaño de fuente del label size lg (14px) |
| frm/label/fontWeight | type/weight-medium | Peso del label (500/medium) |
| frm/helper/fg | text/secondary | Color del helper text |
| frm/helper/fontSize/sm | type/caption | Tamaño helper text sm (11px) |
| frm/helper/fontSize/md | type/xs | Tamaño helper text md (12px) |
| frm/error/fg | status/error/fg | Color del error message y borde error |
| frm/success/fg | status/success/fg | Color del success message |
| frm/required/fg | status/error/fg | Color del asterisco de campo requerido |
| frm/section/gap | spacing/8 | Gap entre FormSections (32px) |
| frm/section/card/bg | surface/default | Fondo de FormSection Variant=card |
| frm/section/card/border | border/default | Borde de FormSection Variant=card |
| frm/section/card/radius | radius/md | Radio de FormSection Variant=card |
| frm/section/card/padding | spacing/6 | Padding interno FormSection card (24px) |
| frm/footer/gap | spacing/3 | Gap entre botones del footer (12px) |
| frm/footer/borderTop | border/1 | Separador superior del footer |
| frm/footer/paddingTop | spacing/6 | Padding superior del footer (24px) |

### Spacing specs

```
FormField (Size=sm):
  label-margin-bottom: 4px
  helper-font-size: 11px
  gap entre elementos: 8px
  label-font-size: 12px

FormField (Size=md):
  label-margin-bottom: 6px
  helper-font-size: 12px
  gap entre elementos: 12px
  label-font-size: 13px

FormField (Size=lg):
  label-margin-bottom: 8px
  helper-font-size: 13px
  gap entre elementos: 16px
  label-font-size: 14px

FormField (Layout=horizontal):
  label-width: 33% (1/3 del contenedor)
  input-width: 67% (2/3 del contenedor)
  alignment: label top-aligned con el input

FormSection (Variant=card):
  padding: 24px (spacing/6)
  border-radius: 8px (radius/md)
  border: 1px solid border/default
  gap interno entre fields: 16px (spacing/4)

FormSection (Variant=inset):
  padding: 16px (spacing/4)
  background: surface/hover
  border-radius: 6px (radius/sm)

Form (Layout=two-column):
  column-gap: 24px (spacing/6)
  row-gap: 16px (spacing/4)
  columns: 2 de igual ancho

Form footer:
  padding-top: 24px (spacing/6)
  border-top: 1px solid border/1
  button-gap: 12px (spacing/3)
  alignment: flex-end (botones a la derecha)
```
