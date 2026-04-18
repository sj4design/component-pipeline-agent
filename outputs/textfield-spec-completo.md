# TextField

## Overview

TextField es el componente de entrada de texto de una sola línea. Bundlea el elemento `<input>`, una etiqueta visible `<label>`, texto de ayuda permanente (helper text), mensaje de error condicional, íconos leading/trailing, botón de limpieza y contador de caracteres en un solo componente que gestiona automáticamente el cableado ARIA (`aria-describedby`, `aria-invalid`, `aria-required`). Existe en tres variantes visuales que cubren los principales contextos de interfaz: outlined (formularios estándar), filled (interfaces Material-style), y subtle (edición inline tipo Jira).

```
Variant=outlined, Size=md (default):
  Label *
  ┌─────────────────────────────────────┐
  │ 🔍  Placeholder text           × ▼  │  ← leading-icon | input | clear | trailing
  └─────────────────────────────────────┘
  Texto de ayuda siempre visible

  State=error:
  Label *
  ┌─────────────────────────────────────┐
  │     Input value                  ⚠️  │  ← border rojo + status icon
  └─────────────────────────────────────┘
  ✕ Este campo es requerido

Variant=filled (Material style):
  Label
  ┌─────────────────────────────────────┐  ← sin borde completo
  │  Placeholder text                   │
  └─────────────────────────────────────┘  ← border-bottom 2px
  Texto de ayuda

Variant=subtle (inline editing, Jira style):
  Nombre del proyecto
  Acme Corp                               ← sin borde visible
                                          ← borde bottom aparece en hover/focus

Size comparison:
  SM (32px):  ┌────────────────────┐  toolbars, tablas compactas
  MD (40px):  ┌────────────────────┐  formularios estándar (default)
  LG (48px):  ┌────────────────────┐  formularios prominentes, accesibilidad
```

No tiene relación de trigger explícita con otro componente. Es un form control standalone que se usa dentro de formularios, modales, sidebars y toolbars.

**Lo que el diseñador puede configurar:**

Variantes (cambian la apariencia — generan variantes Figma):

```
Size:    sm | md | lg
Variant: outlined | filled | subtle
State:   default | error | disabled
```

Toggles (muestran/ocultan partes — NO generan variantes adicionales):

```
👁/✏️ Has Label        → visible/oculta label (texto editable)
👁    Has Leading Icon → muestra/oculta ícono leading
👁    Has Trailing Icon → muestra/oculta ícono trailing
👁    Has Clear        → muestra/oculta botón × de limpieza
👁    Has Char Count   → muestra/oculta contador N/max caracteres
✏️    Has Helper Text  → texto de ayuda siempre visible
✏️    Has Error Text   → texto de error (visible en State=error)
```

### Figma properties panel

```
┌──────────────────────────────────────────────┐
│  TextField                                   │
├──────────────────────────────────────────────┤
│  Size        ○ sm  ○ md  ○ lg                │
│  Variant     [outlined ▼]                    │
│              outlined / filled / subtle      │
│  State       [default ▼]                     │
│              default / error / disabled      │
├──────────────────────────────────────────────┤
│  👁 Has Label          [on]  ✏️ [Nombre]     │
│  👁 Has Leading Icon   [off]                 │
│  👁 Has Trailing Icon  [off]                 │
│  👁 Has Clear          [off]                 │
│  👁 Has Char Count     [off]                 │
│  👁 Has Helper Text    [off] ✏️ [Texto ayuda]│
│  👁 Has Error Text     [off] ✏️ [Error msg]  │
├──────────────────────────────────────────────┤
│  ✏️ Placeholder   [Escribe aquí...]          │
└──────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas capturar texto libre de una sola línea?
              │
              ▼
  ¿Es una sola línea? (nombre, email, título, búsqueda)
              │
       Sí ────┼──── No → TextArea (multi-línea)
              │
  ¿En un formulario estándar?
              │
       Sí ────┼──── No, ¿búsqueda/filtro?
              │              │
           outlined      Variant=subtle
           (default)     + clear button

¿El texto es una contraseña?
  Sí → usa PasswordInput (visibility toggle — componente separado)
¿Es un OTP/código segmentado?
  Sí → usa OTPInput (auto-advance — componente separado)
¿Texto multilínea?
  Sí → usa TextArea
```

**Usa TextField cuando:**
- Capturas un nombre, email, URL, teléfono, título o cualquier texto corto de una línea
- Tienes un campo de búsqueda/filtro en un header o toolbar (Variant=subtle, con clear button)
- El formulario está en un contexto denso donde los campos necesitan ser compactos (Size=sm)
- Tienes campos de edición inline en una vista de detalle (Variant=subtle, style tipo Jira)
- El campo necesita validación visual (State=error con error text)

**NO uses TextField cuando:**
- El input requiere múltiples líneas → usa TextArea
- Es un campo de contraseña → usa PasswordInput con visibility toggle
- Es un OTP o código PIN segmentado → usa OTPInput
- El usuario selecciona de una lista de opciones → usa Select o Combobox
- Necesitas capturar una fecha → usa DatePicker
- El campo es parte de una grilla de datos con muchas celdas editables → evalúa CellEditor pattern específico

---

## Visual variations

### Variant: outlined (default)

Border completo en todos los lados (1px `border/default`). Al hacer focus, el border cambia a `border/focus` (azul, 1px sólido, no 2px — el focus ring es un outline exterior de 2px). En State=error, el border cambia a `border/error` (rojo). Fondo siempre `surface/default` (blanco).

Es la variante más versátil y legible — funciona en cualquier fondo y contexto. Recomendada como default para formularios, modales y páginas de configuración.

### Variant: filled

Fondo `surface/subtle` (gris muy claro) sin borde visible en los laterales. En el estado default tiene `border-bottom 2px` de color `border/default`. Al hacer focus, el border-bottom se vuelve `border/focus`. En State=error cambia a un borde completo de 1px en `border/error`.

Inspirado en Material Design 3 y Fluent 2. Crea una sensación de profundidad y modernidad. Útil en interfaces donde los campos deben mezclarse con el fondo pero seguir siendo reconocibles como inputs.

### Variant: subtle

Sin borde visible en el estado default. El campo se fusiona con el entorno. En hover, aparece un border-bottom sutil. En focus, el border completo se vuelve visible + ring de focus. Ideal para campos de edición inline donde mostrar bordes en estado de reposo crea demasiado ruido visual.

**Exclusión importante:** Variant=subtle + State=error no es válido. Los campos sin borde no comunican el error visualmente a usuarios con baja visión. Un campo subtle en error debe cambiar a outlined para ese estado.

### State: default

Fondo y borde en colores neutrales. El placeholder es visible en `text/subtlest`. El label está en `text/primary`. El helper text (si visible) está en `text/secondary`.

### State: error

Border en `border/error` (rojo). El status icon (⚠️) aparece en el slot trailing si `Has Status Icon=true`. El error text se vuelve visible con color `status/error/fg`. El campo tiene `aria-invalid="true"` y `aria-describedby` apuntando al id del error text.

### State: disabled

Fondo `surface/disabled`, border `border/disabled`, texto `text/disabled`. Opacity 0.5. El campo no es interactivo (`aria-disabled="true"`). No acepta foco ni input.

### Size: sm (32px)

Para toolbars compactas, headers de tabla, panels de propiedades. py=6px, px=8px, fontSize=12px, iconSize=14px.

### Size: md (40px) — default

Para la mayoría de formularios. py=8px, px=12px, fontSize=14px, iconSize=16px.

### Size: lg (48px)

Para formularios prominentes como login/signup, campos de búsqueda hero, interfaces de alto contraste y accesibilidad. py=12px, px=16px, fontSize=16px, iconSize=20px.

---

## Design decisions

### 1. Tres variantes visuales (outlined / filled / subtle)

**¿Por qué?** MD3 tiene solo 2 (filled + outlined). Atlassian tiene subtle para Jira inline-edit. Las interfaces densas con edición inline (configuración de reunión, settings de proyecto) necesitan subtle para no saturar visualmente con bordes en cada campo. Los formularios estándar necesitan outlined o filled para comunicar claramente que son campos editables. No incluir subtle significaría que los equipos lo implementarían de forma inconsistente con CSS personalizado.

**Trade-off:** Tres variantes aumentan la matriz de frames en Figma y la documentación necesaria. La exclusión `Variant=subtle + State=error` reduce la complejidad pero debe documentarse explícitamente para evitar confusión.

### 2. Variante subtle excluye State=error

**¿Por qué?** Los campos sin borde no comunican visualmente el error a usuarios con baja visión. El contraste entre un campo subtle (sin bordes) y un error state (que depende de un cambio de color de borde) es insuficiente para WCAG 1.4.3. La solución correcta es que un campo subtle que entre en error cambie a outlined para ese estado — así el borde rojo es visible.

**Trade-off:** Esta exclusión requiere que el consumidor maneje el cambio de variante en el estado de error. La documentación debe incluir un ejemplo de cómo gestionar este caso.

### 3. `<label>` via htmlFor en lugar de aria-label

**¿Por qué?** Atlassian lo documenta explícitamente: `<label>` tiene soporte más amplio que `aria-label` en tecnologías asistivas antiguas y browsers. Spectrum también lo enforza. El `<label>` visible es siempre preferible porque también beneficia a usuarios sin AT (pueden hacer clic en el label para enfocar el campo). `aria-label` es una alternativa de baja calidad: solo los AT lo leen, los usuarios sighted no lo ven.

**Trade-off:** Requiere que cada TextField tenga un `id` único en el input y un `<label htmlFor="[id]">`. El componente bundleado gestiona esto automáticamente; los consumidores que usen Input bare deben manejarlo.

### 4. Descripción + Error como slots separados (no un solo helperText)

**¿Por qué?** La descripción (helper text) es siempre visible y provee guía antes de que el usuario interactúe. El error text es condicional y reemplaza la guía solo en estado de error. Si se mergean en un solo prop `helperText`, hay dos problemas: (1) la descripción desaparece cuando aparece el error, y (2) el `aria-describedby` debe actualizarse dinámicamente. El modelo de Mantine (`description` permanente + `error` condicional) es el más limpio.

**Trade-off:** Agrega verbosidad a la API. La documentación debe explicar cuándo usar cada uno y cómo interactúan.

### Combinaciones excluidas

```
Variant=subtle + State=error
  └── Campos sin borde no comunican error visualmente para WCAG 1.4.3.
      Usar Variant=outlined en State=error.
      Total: 3 exclusiones en la matriz (3 sizes × 1 combinación)

disabled + error/warning (cualquier variant)
  └── Un campo deshabilitado no puede estar en estado de error
      (el usuario no puede corregirlo). Mutuamente excluyentes.
```

---

## Behavior

### Essential for design

1. **Label siempre visible:** El label se muestra sobre el campo en todos los estados. El placeholder dentro del campo desaparece cuando el usuario escribe — nunca es un sustituto del label.
2. **Error reemplaza helper text:** En State=error, el helper text se oculta y el error text ocupa su posición. La altura total del componente no cambia (sin layout shift).
3. **Has Clear:** El botón × aparece cuando el campo tiene contenido. Es un botón focusable independientemente del input. Al activarse, limpia el valor y devuelve el foco al input.
4. **Char count:** El contador (ej. "47/100") se actualiza en tiempo real mientras el usuario escribe. Al alcanzar el máximo, cambia a color de error.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Label | — | `<label htmlFor="[input-id]">` | Asociación visible; soporte más amplio que aria-label |
| Input | textbox | `id`, `aria-describedby="[helper-id] [error-id]"` | Anuncia el helper y/o error al enfocar |
| Input (error) | textbox | `aria-invalid="true"` | SR anuncia que el campo es inválido |
| Input (required) | textbox | `aria-required="true"` | SR anuncia que el campo es obligatorio |
| Input (disabled) | textbox | `aria-disabled="true"`, `disabled` | Mantiene en tab order pero marca como no interactivo |
| Helper text | — | `id="[helper-id]"` | Referenciado por aria-describedby del input |
| Error text | — | `id="[error-id]"` | Referenciado por aria-describedby; anunciado al enfocar |
| Leading icon | — | `aria-hidden="true"` | Decorativo |
| Trailing icon | — | `aria-hidden="true"` | Decorativo (o con aria-label si es interactivo) |
| Clear button | button | `aria-label="Limpiar [field label]"` | Acción explícita; focusable por Tab |
| Required indicator (*) | — | (en el label text o visually-hidden "requerido") | Visible + texto alternativo para SR |

### Keyboard navigation

Primary interactions (affect design):

```
Tab         → Foco al input (o al label si viene antes en el orden)
Shift+Tab   → Retrocede al elemento previo en el formulario
```

Secondary interactions (dev reference):

```
Tab (con Has Clear=true y campo con valor)
  └── El botón × también es focusable por Tab (viene después del input en el orden)
  └── Enter/Space en el botón × limpia el valor

Escape (patrón common en search fields)
  └── Cuando Has Clear=true y el campo tiene foco, Escape limpia el valor
  └── No estándar ARIA — documentar si se implementa

autocomplete
  └── Los valores de HTML autocomplete deben especificarse para name, email,
      tel, address-line1 (WCAG 1.3.5 — Input Purpose)
  └── Beneficia especialmente a usuarios con motor disabilities (autofill)
```

---

## Content guide

### Slot: label (opcional/recomendado)

El nombre visible del campo. Debe ser una descripción concisa y específica del dato esperado.
- **Do:** "Nombre completo", "Correo electrónico", "URL del proyecto"
- **Don't:** "Campo 1", "Datos", "Introduce tu información aquí"
- **Cuándo ocultarlo visualmente:** Solo en contextos muy específicos donde el label sería redundante con el contexto visual circundante. Si se oculta visualmente, debe haber un `aria-label` equivalente.
- **Required indicator:** Usar asterisco (*) + "* Campo obligatorio" al pie del formulario, o incluir "(obligatorio)" en el label. Nunca solo color.

### Slot: placeholder (input)

Texto de ejemplo dentro del campo cuando está vacío.
- **Do:** Un ejemplo del formato esperado ("ej. juan@empresa.com", "ej. https://")
- **Don't:** El nombre del campo repetido ("Nombre completo") — para eso existe el label
- **Crítico:** El placeholder NO es un sustituto del label. Desaparece al escribir.

### Slot: helper text (opcional)

Guía permanente visible debajo del campo, antes y después de la validación.
- **Do:** "Usa tu correo corporativo", "Mínimo 8 caracteres", "Solo letras y números"
- **Don't:** El mismo texto que el error (reserva el helper para guía proactiva)
- **Cuándo omitir:** Cuando el campo es autoexplicativo y no necesita instrucciones adicionales

### Slot: error text (opcional)

Mensaje de validación condicional. Solo visible en State=error.
- **Do:** "Este campo es requerido", "El email no tiene un formato válido", "Máximo 100 caracteres"
- **Don't:** "Error" sin descripción del problema ni cómo resolverlo
- **Formato recomendado:** Describe el problema + la solución ("Debe tener al menos 8 caracteres con una mayúscula y un número")

### Slot: leading-icon (opcional)

Ícono visual a la izquierda del input. Siempre decorativo (`aria-hidden`).
- **Do:** 🔍 para search, 📧 para email, 📅 para fecha, 💬 para mensajes
- **Don't:** Íconos de acción interactiva en el slot leading (usa trailing para acciones)

### Slot: trailing-icon (opcional)

Ícono o acción a la derecha del input.
- **Do:** ícono de contraseña (👁 toggle), ícono informativo, ícono de estado de validación
- **Cuándo es interactivo:** Requiere `aria-label` propio y ser focusable por Tab

### Slot: clear button (opcional)

Botón × que limpia el contenido del campo.
- **Do:** visible cuando el campo tiene contenido; oculto cuando está vacío
- **Accesibilidad:** `aria-label="Limpiar [nombre del campo]"` (ej. "Limpiar búsqueda")

### Slot: char-count (opcional)

Contador de caracteres (ej. "47/100").
- **Do:** visible cuando hay un maxlength definido; cambia a color de error al acercarse al límite
- **Don't:** mostrar sin un maxlength definido (sin límite, el contador no tiene propósito)

---

## Pre-build checklist

```
Label & ARIA
□ <label> asociado via htmlFor/id (no aria-label standalone)
□ aria-describedby → helper text id y/o error text id
□ aria-invalid="true" en State=error
□ aria-required="true" cuando el campo es obligatorio
□ aria-disabled="true" en State=disabled
□ Placeholder NO es sustituto del label — ambos visibles simultáneamente

Variantes y Estados
□ outlined: borde completo (default para formularios)
□ filled: fondo gris, border-bottom en default; borde completo en error
□ subtle: sin borde visible hasta hover/focus
□ Exclusión documentada: subtle + error → cambiar a outlined
□ Error text: solo visible en State=error
□ Helper text: siempre visible (independiente del estado)

Clear Button
□ Botón × focusable por Tab cuando campo tiene valor
□ aria-label="Limpiar [campo]"
□ Al activarse: limpia el valor + retorna foco al input

Tokens
□ Fondo outlined: surface/default
□ Fondo filled: surface/subtle (gris)
□ Border default: border/default
□ Border focus: border/focus (azul)
□ Border error: border/error (rojo)
□ Focus ring: 2px offset 2px focus/ring (exterior)

Figma Handoff
□ Frames: Size(3) × Variant(3) × State(3) = 27 gross, −3 (subtle+error) = 24 net
□ Boolean layers: 👁 Has Leading Icon, 👁 Has Trailing Icon, 👁 Has Clear, 👁 Has Char Count
□ BoolText pairs: Has Label / Has Helper Text / Has Error Text
```

---

## Related components

```
TextArea
  └── Para texto multi-línea (bio, descripción, comentario, notas)
  └── Con resize y auto-grow; mismo modelo de label/helper/error

PasswordInput
  └── TextField con visibility toggle (👁 mostrar/ocultar contraseña)
  └── Comportamiento distinto: toggle de tipo input text/password

SearchField
  └── TextField con semántica de búsqueda (role="search" o type="search")
  └── Con clear button por defecto y submit con Enter

OTPInput
  └── Para códigos de verificación segmentados con auto-advance entre dígitos
  └── Componente completamente distinto en interacción y semántica

Select / Combobox
  └── Cuando el usuario elige de opciones predefinidas (no texto libre)
  └── Combobox para búsqueda + selección combinadas

NumberInput
  └── Para valores numéricos con incremento/decremento (spinbox)
  └── Restricciones de min/max/step

InlineEdit
  └── Wrapper para el patrón "clic para editar" (read mode → edit mode)
  └── Usa Variant=subtle internamente; gestiona transición y confirm/cancel

FormField
  └── Wrapper de bajo nivel para casos donde label e input están en posiciones
      distintas del DOM (ej. layout de formulario complejo)
  └── Gestiona aria-describedby y htmlFor/id automáticamente
```

---

## Reference: how other systems do it

### Material Design 3

MD3 provee exactamente dos variantes como componentes arquitectónicamente separados (no como prop de estilo): `Filled` y `Outlined`. El floating label anima desde la posición de placeholder hasta la posición superior al hacer focus. El error text reemplaza (no apila con) el helper text para evitar layout shifts. Los mensajes de error incluyen el prefijo de texto "Error:" para garantizar que los usuarios daltónicos vean el estado de validación sin depender del color.

### Spectrum (Adobe)

Spectrum provee tres componentes separados: `TextField` (una línea), `TextArea` (multi-línea) y `SearchField` (semántica de búsqueda con clear button). `isQuiet` elimina el borde para contextos densos. La validación se eleva al nivel de Form via `validationBehavior` y el componente `FieldError` — consistencia cross-field y blocking de submit gestionados centralmente. `necessityIndicator` soporta tanto el asterisco como la convención de texto "(requerido)".

### Carbon (IBM)

La característica más distintiva de Carbon es el modo `Fluid` — un cambio real de layout, no un toggle de estilo. En Fluid, el campo se extiende hacia los gutters de la grilla y el helper text se mueve a un tooltip. Tres sizes: SM (32px), MD (40px), LG (48px). Un estado `warn`/`warnText` separado de `error` maneja valores "inusuales pero permitidos" — una distinción de validación que ningún otro sistema aborda. La prop `inline` mueve el label al lado del campo para layouts de formulario horizontal.

### Polaris (Shopify)

El `TextField` de Polaris maneja una línea, multi-línea, campos conectados e inputs tipo tag en un solo componente. Las props `connectedLeft`/`connectedRight` son commerce-first: pares valor+unidad ($50.00 USD, 2.5 kg) con radio-border fusionado y estados de focus compartidos incorporados. `prefix`/`suffix` proveen decoradores inline no editables dentro del borde. `verticalContent` renderiza chips de tag sobre el input dentro del mismo boundary visual. `monospaced` habilita entrada de código o datos formateados.

### Atlassian

El TextField de Atlassian tiene tres modos de apariencia: `standard` (con borde), `subtle` (transparente hasta hover/focus), y `none` (completamente invisible) — diseñados específicamente para vistas de issues de Jira donde docenas de campos aparecen inline sin sobrecarga visual. El wrapper `InlineEdit` es un componente separado que gestiona transiciones read-to-edit, affordances de confirmar/cancelar, y atajos de teclado Enter/Escape. Los slots `elemBeforeInput`/`elemAfterInput` aceptan cualquier elemento React.

### Ant Design

La familia `Input` de Ant Design consta de cinco sub-componentes: `Input` (una línea), `Input.TextArea`, `Input.Search`, `Input.Password` (toggle de visibilidad), y `Input.OTP` (auto-advance entre segmentos). Cuatro variantes visuales: `outlined`, `filled`, `borderless`, `underlined`. `addonBefore`/`addonAfter` (fuera del borde, adjuntos) vs. `prefix`/`suffix` (dentro del borde) sirven diferentes contextos de decoración. `showCount` con función `count` personalizable (ej. emoji cuenta como 1 carácter).

### GOV.UK

GOV.UK trata el ancho del campo como información funcional: el ancho comunica la longitud esperada de la respuesta (campos de 4-char para postal codes, ancho completo para direcciones). La investigación de usuario confirma que los usuarios esperan menos en un campo más angosto. No hay floating label — las etiquetas estáticas sobre el campo son siempre preferibles según su investigación extensiva. El error aparece encima del campo (no debajo) con un borde rojo en la izquierda del campo.

### Sistemas Tier 2

**GitHub Primer:** `TextInput` con `leadingVisual`/`trailingVisual` render prop slots; `TextInputWithTokens` para input de tags. **Twilio Paste:** `Input` + `FormField` separados; patrón ARIA composable. **Mantine:** `leftSection`/`rightSection` con auto-padding; `description` (siempre visible) + `error` (condicional) como props separadas — el modelo más limpio. **Orbit:** Error inline inmediato; `help` y `error` separados; touch targets optimizados para mobile.

### Sistemas Tier 3

**Radix UI:** `TextField.Slot` para íconos/addons; `variant` (surface/classic/soft); comportamiento nativo de formulario preservado. **Chakra UI:** `InputLeftElement`/`InputRightElement` (superpuestos, auto-padding); `InputLeftAddon`/`InputRightAddon` (secciones con borde). **Gestalt:** `label` como prop requerida (previene inputs sin etiqueta). **Fluent 2:** `Input`/`Field` separados; `appearance` (outline/underline/filled-darker/filled-lighter); `contentBefore`/`contentAfter`. **Nord:** Web component; `label` requerido; uso clínico con validación estricta.

---

## Tokens

**16 tokens** · prefix `txf-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| txf/bg | surface/default | Fondo outlined (blanco) |
| txf/bg-filled | surface/subtle | Fondo filled (gris claro) |
| txf/border | border/default | Border en estado default |
| txf/border-focus | border/focus | Border en estado focus (azul) |
| txf/border-error | border/error | Border en Estado=error (rojo) |
| txf/fg | text/primary | Color texto input |
| txf/placeholder | text/subtlest | Color placeholder |
| txf/label-color | text/primary | Color label |
| txf/helper-color | text/secondary | Color helper text |
| txf/error-color | status/error/fg | Color error text (rojo) |
| txf/icon-color | text/secondary | Color íconos decorativos |
| txf/disabled/bg | surface/disabled | Fondo disabled |
| txf/disabled/border | border/disabled | Border disabled |
| txf/disabled/fg | text/disabled | Texto disabled |
| txf/radius | radius/md | Border radius (6px sm/md, 8px lg) |
| focus/ring | border/focus | Focus ring (2px exterior, offset 2px) |

### Spacing specs

```
Size specs (input height, padding, typography):
  sm:  h=32px · py=6px  · px=8px  · fontSize=12px · lineHeight=16px
       iconSize=14px · gap=6px  · radius=6px · labelSize=12px · helperSize=11px
  md:  h=40px · py=8px  · px=12px · fontSize=14px · lineHeight=20px
       iconSize=16px · gap=8px  · radius=6px · labelSize=14px · helperSize=12px
  lg:  h=48px · py=12px · px=16px · fontSize=16px · lineHeight=24px
       iconSize=20px · gap=8px  · radius=8px · labelSize=14px · helperSize=12px

Variant color matrix:
  outlined default:  bg=surface/default  · border=border/default (1px)
  outlined error:    bg=surface/default  · border=border/error   (1px)
  outlined disabled: bg=surface/disabled · border=border/disabled (1px) · opacity 0.5
  filled default:    bg=surface/subtle   · border-bottom=border/default (2px, bottom only)
  filled error:      bg=status/error/bg  · border=border/error   (1px full)
  filled disabled:   bg=surface/subtle   · opacity 0.5
  subtle default:    bg=transparent      · border=none (border-bottom on hover)
  subtle disabled:   bg=transparent      · opacity 0.4

Frame counts:
  Size(3) × Variant(3) × State(3) = 27 gross
  −3 (Variant=subtle + State=error excluido)
  = 24 frames netos
```
