# TextField

## Descripción general

TextField es el control de entrada de texto de una línea del sistema de diseño. Es el componente de formulario más frecuente: soporta tres variantes visuales (outlined, filled, subtle), tres tamaños y tres estados, con slots para label, íconos leading/trailing, texto de ayuda, texto de error, y contador de caracteres. A diferencia de NumberInput (restringido a valores numéricos) o Search (con `role="search"`), TextField es el input genérico para nombre, email, URL, contraseña, y cualquier texto libre. Implementa las prácticas de accesibilidad estándar: `<label>` via `htmlFor`, `aria-describedby` para helper/error, y `aria-invalid` para error state.

```
Size=md, Variant=outlined, State=default:
Nombre
┌──────────────────────────────────────────────┐
│  Escribe aquí...                             │  h:40px
└──────────────────────────────────────────────┘
  Texto de ayuda

Size=md, Variant=outlined, State=error:
Nombre
┌──────────────────────────────────────────────┐
│  Juan García                          [⚠]   │  border: rojo
└──────────────────────────────────────────────┘
  Este campo es requerido                         fg: rojo

With icons:
┌──────────────────────────────────────────────┐
│  [✉]  Escribe tu email...          [×] [👁]  │  leading + clear + trailing
└──────────────────────────────────────────────┘

Variant=filled:
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Escribe aquí...                                fondo gris · sin borde · bottom line

Variant=subtle:
  Escribe aquí...                                sin fondo · sin borde
  ─────────────────────────────────────────────  bottom border solo en hover/focus

States:
│  default:  bg:white   border:default  fg:primary        │
│  error:    bg:white   border:error    fg:primary         │
│  disabled: bg:disabled border:disabled fg:disabled       │
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size    → sm | md | lg
Variant → outlined | filled | subtle
State   → default | error | disabled
```

Toggles:

```
👁 Has Label        → muestra/oculta el label sobre el campo (default: on)
👁 Has Leading Icon → muestra/oculta ícono izquierdo (default: off)
👁 Has Trailing Icon → muestra/oculta ícono derecho (default: off)
👁 Has Clear        → muestra/oculta botón × de limpiar (default: off)
👁 Has Helper Text  → muestra/oculta texto de ayuda (default: off)
👁 Has Error Text   → muestra/oculta texto de error (default: off)
👁 Has Char Count   → muestra/oculta contador N/max (default: off)
```

Texto editable:

```
✏️ Label       → "Nombre"
✏️ Placeholder → "Escribe aquí..."
✏️ Helper Text → "Texto de ayuda"
✏️ Error Text  → "Este campo es requerido"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  TextField                                               │
│  ──────────────────────────────────────────────────────  │
│  Size    [ md              ▼ ]                           │
│  Variant [ outlined        ▼ ]                           │
│  State   [ default         ▼ ]                           │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Label         [ on  ]                            │
│  👁 Has Leading Icon  [ off ]                            │
│  👁 Has Trailing Icon [ off ]                            │
│  👁 Has Clear         [ off ]                            │
│  👁 Has Helper Text   [ off ]                            │
│  👁 Has Error Text    [ off ]                            │
│  👁 Has Char Count    [ off ]                            │
│  ✏️ Label       [ Nombre                          ]      │
│  ✏️ Placeholder [ Escribe aquí...                 ]      │
│  ✏️ Helper Text [ Texto de ayuda                  ]      │
│  ✏️ Error Text  [ Este campo es requerido         ]      │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita ingresar texto?
                    │
                    ▼
       ¿Es texto de una línea?
       ├── Sí → TextField
       └── Múltiples líneas → Textarea
                    │
                    ▼
       ¿Es un número con rango?
       └── Sí → NumberInput
                    │
                    ▼
       ¿Es búsqueda?
       └── Sí → Search (role=search + onSubmit)
                    │
                    ▼
       ¿Es selección de una lista?
       └── Sí → Select o Combobox
```

**Usar TextField cuando:**
- Nombre, apellido, nombre de empresa
- Email, teléfono, URL
- Contraseña (`type="password"`)
- Nombre de usuario, slug, código de descuento
- Cualquier texto libre sin restricción de tipo

**NO usar TextField cuando:**
- El texto tiene múltiples líneas → usar `Textarea`
- Es un número con rango y steppers → usar `NumberInput`
- Es búsqueda con `role="search"` → usar `Search`
- Es un código OTP de longitud fija → usar `PinInput`
- El valor viene de una lista → usar `Select` o `Combobox`

---

## Variaciones visuales

### Size

| Size | Height | PaddingX | PaddingY | FontSize | IconSize | Radius | LabelSize | HelperSize |
|------|--------|---------|---------|---------|---------|--------|-----------|-----------|
| sm   | 32px   | 8px     | 6px     | 12px    | 14px    | 6px    | 12px      | 11px      |
| md   | 40px   | 12px    | 8px     | 14px    | 16px    | 6px    | 14px      | 12px      |
| lg   | 48px   | 16px    | 12px    | 16px    | 20px    | 8px    | 14px      | 12px      |

### Variant

| Variant | Background | Borde | Cuándo usar |
|---------|-----------|-------|------------|
| outlined | blanco | borde completo 1px | Formularios estándar — máximo contraste y claridad |
| filled | surface/subtle (gris claro) | sin borde visible · bottom line 2px | Formularios densos donde el borde completo crea ruido |
| subtle | transparent | sin borde · bottom line en hover/focus | Inline edit (Jira pattern) — mínima presencia visual |

### State

| State | Outlined | Filled | Subtle |
|-------|---------|--------|--------|
| default | bg:blanco · border:default | bg:gris · bottom:default | bg:none · no border |
| error | bg:blanco · border:error (rojo) | bg:error-tint · border completo (rojo) | **excluido** |
| disabled | bg:disabled · border:disabled | bg:disabled · no border | bg:none · opacity:0.4 |

> **Variant=subtle + State=error está excluido** — campos sin borde no comunican visualmente el error a usuarios con baja visión. En error, un campo subtle debe cambiar a outlined.

---

## Decisiones de diseño

**1. 3 variantes visuales (outlined, filled, subtle)** — M3 tiene solo 2 (filled+outlined). Atlassian tiene subtle para Jira inline-edit. Zoom tiene interfaces densas con edición inline (meeting config, settings) que necesitan subtle — y formularios estándar que necesitan outlined/filled.

**2. Variant=subtle excluye State=error** — campos sin borde no comunican visualmente el error a usuarios con baja visión. La solución correcta: cambiar el campo de subtle a outlined cuando entra en error. Esta exclusión se enforza en la especificación para que los developers lo implementen.

**3. `<label>` via htmlFor, no aria-label** — Atlassian y Spectrum lo documentan explícitamente: `<label htmlFor="input-id">` tiene soporte más amplio que `aria-label` en AT antiguos y browsers. Mejor práctica universal — nunca usar aria-label como sustituto de un label visible.

**4. aria-describedby para helper + error** — ambos textos pueden estar presentes simultáneamente. El `aria-describedby` puede apuntar a múltiples ids: `aria-describedby="helper-id error-id"`. El SR leerá ambos en orden.

**5. Has Error Text default OFF** — el texto de error solo aparece cuando State=error. No en default (usa Has Helper Text para hints). En Figma: Has Error Text=on modela el estado de error con mensaje; Has Helper Text=on modela el estado normal con hint.

### Combinaciones excluidas

```
Variant=subtle + State=error (3 frames excluidos — uno por cada Size)
```

---

## Comportamiento

### Esencial para diseño

- **Label siempre encima del campo** — no usar labels flotantes (material input) — el label siempre es visible sobre el campo para evitar confusión cuando el campo está lleno.
- **Helper text siempre visible** — el helper text se muestra en todos los estados excepto cuando hay error (que muestra el error text). No se oculta al escribir.
- **Has Error Text reemplaza Has Helper Text en error** — cuando State=error, mostrar el error text (rojo) en lugar del helper text (gris). En Figma: usar Has Error Text=on, Has Helper Text=off en los frames de error.
- **Has Clear aparece al tener valor** — el botón × es condicional — visible cuando hay texto ingresado. Has Clear=on en Figma modela el estado "con valor escrito".
- **Char Count posición** — el contador N/max se muestra en la esquina inferior derecha del campo, alineado con el input. Cuando supera el máximo: texto rojo + border rojo (como error).

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Label | `<label htmlFor="input-id">` | AT asocia el nombre con el input correctamente |
| Helper text | `aria-describedby="helper-id"` | SR lee el hint al hacer foco |
| Error text | `aria-describedby="error-id"` + `aria-invalid="true"` | SR anuncia el error |
| Ambos | `aria-describedby="helper-id error-id"` | SR lee ambos en orden |
| Requerido | `aria-required="true"` | SR anuncia que el campo es obligatorio |
| Disabled | `aria-disabled="true"` | SR anuncia que no es interactivo |
| Clear | `aria-label="Limpiar [campo]"` | Sin label, SR anuncia "botón" sin contexto |

### Navegación por teclado

```
Tab/Shift+Tab   → navega al campo / retrocede
Has Clear: Tab  → el botón × es focusable (Tab stop adicional)
Enter           → no envía el formulario (a menos que sea el único input)
```

---

## Guía de contenido

**Label:**
- Conciso y descriptivo: "Nombre completo", "Email de trabajo", "URL del perfil"
- Siempre presente (nunca depender solo del placeholder para comunicar el propósito)
- Para campos requeridos: "Nombre *" o indicar en el contexto del formulario

**Placeholder:**
- Complementa el label: si el label es "Email", el placeholder puede ser "ej. nombre@empresa.com"
- No repetir el label como placeholder: no `label="Email" placeholder="Email"`
- Para format hints: "DD/MM/AAAA", "+52 (55) 0000-0000"

**Helper Text:**
- Formato esperado: "Usa entre 8 y 20 caracteres"
- Restricciones: "Solo letras y números, sin espacios"
- Contexto: "Este email se usará para notificaciones de cuenta"

**Error Text:**
- Específico sobre el problema: "El email debe incluir @" (no "Email inválido")
- Accionable: "La contraseña debe tener al menos 8 caracteres" (no "Contraseña incorrecta")
- Para campos requeridos vacíos: "Este campo es requerido"

---

## Pre-build checklist

```
□ ¿<label htmlFor="input-id"> (no aria-label)?
□ ¿aria-describedby apuntando a helper-text id?
□ ¿State=error: aria-invalid="true" + aria-describedby → error-text?
□ ¿aria-required="true" en campos obligatorios?
□ ¿Has Clear: botón × con aria-label="Limpiar [campo]"?
□ ¿Has Clear: Tab-focusable?
□ ¿Variant=subtle + State=error: cambiar a outlined?
□ ¿Has Helper Text: visible siempre (no solo en focus)?
□ ¿Has Error Text: visible solo en State=error?
□ ¿Has Char Count: accesible via aria-describedby?
□ ¿Variant=filled: bottom border 2px (no borde completo)?
□ ¿Focus: borde azul (outlined/filled) o bottom-line azul (subtle)?
```

---

## Componentes relacionados

```
Textarea       → para texto de múltiples líneas
NumberInput    → para valores numéricos con rango y steppers
Search         → para búsqueda con role=search y onSubmit
PinInput       → para códigos OTP/PIN de longitud fija
Combobox       → para selección con búsqueda de una lista
Select         → para selección sin búsqueda de una lista
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Variants | States | Inline label | ARIA | Diferenciador |
|---------|-------|---------|--------|-------------|------|--------------|
| **Material Design 3** | TextField | Filled + Outlined | 5 | Label flotante | textbox | Floating label animado; supporting text |
| **Spectrum (Adobe)** | TextField | 1 (outlined) | 4 | Label fijo | textbox | htmlFor enforced; validation states API |
| **Carbon (IBM)** | TextInput | 1 (outlined) | 4 | Label fijo | textbox | helperText siempre visible; inline label type |
| **Polaris (Shopify)** | TextField | 1 (outlined) | 3 | Label fijo | textbox | prefix/suffix string; multiline=Textarea |
| **Atlassian** | Textfield | 1 (subtle) | 3 | Label fijo | textbox | Default subtle; htmlFor enforcement |
| **Ant Design** | Input | 1 (outlined) | 3 | Label en Form.Item | textbox | addonBefore/After; prefix/suffix |
| **Twilio Paste** | Input | 1 (outlined) | 4 | Label en FormControl | textbox | FormControl wrapper; HelpText + ErrorMessage |
| **Lightning** | lightning-input | 1 (outlined) | 4 | Label flotante | textbox | LWC native; validity API |
| **Primer (GitHub)** | TextInput | 1 (outlined) | 3 | Label separado | textbox | leadingVisual; trailingAction; contrast prop |
| **shadcn/ui** | Input | 1 (outlined) | 2 | Label externo | textbox | Unstyled base; compose con FormField |
| **Chakra UI** | Input | 3 (outline/filled/flushed) | 3 | Label en FormControl | textbox | flushed = subtle; size prop |
| **Fluent 2** | Input | 1 + underline | 3 | Label fijo | textbox | underline variant; contentBefore/After |
| **Mantine** | TextInput | 3 (default/filled/unstyled) | 3 | Label fijo | textbox | inputWrapperOrder; leftSection/rightSection |
| **Atlassian** | Textfield | Subtle (default) | 3 | Label externo | textbox | Subtle es el default (Jira pattern) |

**Patrones clave de la industria:**
1. **M3 floating label** — el label anima de placeholder-position a label-position al hacer foco. Controversia: el label desaparece del campo vacío, rompiendo la expectativa del usuario. La mayoría de sistemas enterprise (Carbon, Spectrum, Polaris) usa label fijo encima.
2. **Atlassian subtle como default** — el único T1 donde el variant por defecto es subtle (sin borde). Jira/Confluence usan edición inline generalizada. Para productos enterprise con editing ubicuo, subtle reduce el ruido visual.
3. **Spectrum y Atlassian enforzan htmlFor** — documentan explícitamente que aria-label no reemplaza a `<label>`. Carbon y Polaris lo mencionan en guías de accesibilidad. Es el patrón más compatible con AT.
4. **Chakra UI flushed = subtle** — Chakra llama "flushed" al variant sin borde lateral + bottom border. El naming varía pero el pattern es el mismo: minimal border para inline edit.

---

## Tokens

**16 tokens** · prefijo `txf-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `txf/bg` | `surface/default` | Background outlined (blanco) |
| `txf/bg-filled` | `surface/subtle` | Background filled (gris claro) |
| `txf/border` | `border/default` | Borde default |
| `txf/border-focus` | `border/focus` | Borde en focus — azul |
| `txf/border-error` | `border/error` | Borde en error — rojo |
| `txf/fg` | `text/primary` | Texto ingresado |
| `txf/placeholder` | `text/subtlest` | Texto placeholder |
| `txf/label-color` | `text/primary` | Color del label |
| `txf/helper-color` | `text/secondary` | Color del helper text |
| `txf/error-color` | `status/error/fg` | Color del error text |
| `txf/icon-color` | `text/secondary` | Color de íconos leading/trailing |
| `txf/disabled/bg` | `surface/disabled` | Background disabled |
| `txf/disabled/border` | `border/disabled` | Borde disabled |
| `txf/disabled/fg` | `text/disabled` | Texto disabled |
| `txf/radius` | `radius/md` | Border radius (6–8px según size) |
| `focus/ring` | `border/focus` | Focus ring exterior |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size sm: h:32px · px:8px  · py:6px  · font:12px        │
│  Size md: h:40px · px:12px · py:8px  · font:14px        │
│  Size lg: h:48px · px:16px · py:12px · font:16px        │
│                                                          │
│  Estructura interna (de izquierda a derecha):            │
│  [Has Leading Icon] [input] [Has Clear] [Has Trailing]   │
│                                                          │
│  Debajo del campo (izquierda → derecha):                 │
│  [Helper Text / Error Text]       [Has Char Count]       │
│                                                          │
│  Variants:                                               │
│  outlined: border 1px completo                          │
│  filled:   no border + bottom-line 2px                  │
│  subtle:   no border (bottom on hover/focus)            │
│                                                          │
│  Frames totales (net):                                   │
│  Size(3) × Variant(3) × State(3) − 3 (subtle+error) =  │
│  27 − 3 = 24 frames                                     │
└──────────────────────────────────────────────────────────┘
```
