# Form — Especificación Completa

## Descripción general

Sistema de layout para formularios compuesto por tres niveles de jerarquía: `FormField` (campo individual con label + input + mensajes), `FormSection` (agrupación de campos relacionados) y `Form` (layout completo con secciones + footer de acciones). Cubre layouts de una o dos columnas, alineación de labels horizontal/vertical e integración con validación accesible.

### Wireframe estructural

**FormField (Layout=stacked):**
```
Nombre *
┌────────────────────────────────────────┐
│ Pedro                                  │
└────────────────────────────────────────┘
  Este campo es requerido
```

**FormField (Layout=horizontal):**
```
Nombre *         ┌────────────────────────────────────────┐
                 │ Pedro                                  │
                 └────────────────────────────────────────┘
                   Este campo es requerido
```

**Form (Layout=single-column):**
```
┌─────────────────────────────────────────────────────────┐
│  Título del formulario                                   │
│  Descripción opcional                                    │
├─────────────────────────────────────────────────────────┤
│  SECCIÓN: Información personal                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Nombre *    [___________________________]      │   │
│  │  Email *     [___________________________]      │   │
│  │  Teléfono    [___________________________]      │   │
│  └─────────────────────────────────────────────────┘   │
│  SECCIÓN: Preferencias                                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  País        [Seleccionar ▼]                    │   │
│  │  Idioma      [Español ▼]                        │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                          [Cancelar]  [Guardar cambios]  │
└─────────────────────────────────────────────────────────┘
```

**Anatomía de slots — FormField:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | text | Sí | Nombre del campo |
| `requiredIndicator` | text | No | `*` o `Required` |
| `helperText` | text | No | Texto instructivo bajo el input |
| `input` | container | Sí | Input, Select, Textarea, etc. |
| `errorMessage` | text | No | Mensaje de error de validación |
| `successMessage` | text | No | Mensaje de éxito |
| `labelIcon` | icon | No | Info icon con tooltip |

**Anatomía de slots — FormSection:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `sectionTitle` | text | No | Título de la sección |
| `sectionDescription` | text | No | Descripción de la sección |
| `fields` | container | Sí | N FormFields |
| `divider` | shape | No | Separador visual |

**Anatomía de slots — Form:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | text | No | Título del formulario |
| `description` | text | No | Descripción o instrucciones |
| `sections` | container | Sí | N FormSections |
| `footer` | container | Sí | Botones submit + cancel |

### Properties y valores

**FormField:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `focused` · `error` · `success` · `disabled` |
| **Size** | `sm` · `md` · `lg` |
| **Layout** | `stacked` · `horizontal` · `inline` |

**FormSection:**
| Property | Valores |
|----------|---------|
| **Variant** | `default` · `card` · `inset` |

**Form:**
| Property | Valores |
|----------|---------|
| **Layout** | `single-column` · `two-column` · `horizontal` |
| **Size** | `sm` · `md` · `lg` |

**Frame counts:**
- FormField: State(5) × Size(3) × Layout(3) = 45 − 3 exclusiones = **42 frames**
- FormSection: Variant(3) = **3 frames**
- Form: Layout(3) × Size(3) = **9 frames**
- **Total: 54 frames**

**Exclusión FormField:**
| Combinación excluida | Razón |
|----------------------|-------|
| `Layout=inline + helperText visible` | Inline es layout compact de una sola línea |

### Panel de Figma

**FormField:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / focused / error / success / disabled |
| Size | Variant | sm / md / lg |
| Layout | Variant | stacked / horizontal / inline |
| 👁 Has Helper Text | Boolean | true/false |
| 👁 Has Label Icon | Boolean | true/false |
| 👁 Show Required Indicator | Boolean | true/false |
| 👁 Show Error Message | Boolean | true/false |
| 👁 Show Success Message | Boolean | true/false |
| ✏️ Label | Text | `Nombre` |
| ✏️ Helper Text | Text | `Este campo es requerido` |
| ✏️ Error | Text | `El nombre es obligatorio` |

**FormSection:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Variant | Variant | default / card / inset |

**Form:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Layout | Variant | single-column / two-column / horizontal |
| Size | Variant | sm / md / lg |

---

## Cuándo usar

**Usar Form cuando:**
- Se recogen más de 3 campos de datos del usuario
- El flujo requiere validación con mensajes de error accesibles por campo
- Se necesita agrupar campos relacionados lógicamente (datos personales, preferencias, facturación)

**Layout=single-column:** Formularios de registro, perfil de usuario, creación de objeto
**Layout=two-column:** Settings page con muchos campos, formularios de administración
**Layout=horizontal:** Forms compactos donde el label está alineado a la izquierda del input (app desktop, settings)

**FormSection Variant:**
- **default:** Separación por espaciado y título — suficiente para la mayoría de casos
- **card:** Sección elevada en un card (settings page pattern, Stripe Dashboard)
- **inset:** Sección con fondo ligeramente diferente para sub-settings o secciones opcionales

**No usar Form cuando:**
- Solo hay 1-2 campos simples → usar FormField standalone sin Form wrapper
- Es un formulario de búsqueda → usar Search component

---

## Variaciones visuales

### FormField — Layouts

**stacked (label arriba, default):**
- Label sobre el input, gap entre label y input según Size
- Helper text / error message bajo el input
- Ocupa todo el ancho disponible
- Recomendado para mobile y formularios verticales

**horizontal (label izquierda):**
- Label fijo a la izquierda (ancho ~200px), input ocupa el resto
- Error/helper bajo el input, alineado con el input
- Desktop-first, formularios de settings

**inline (compact, una línea):**
- Label + input en la misma línea
- Sin helper text (slot oculto)
- Para formularios de búsqueda inline o filtros compactos

### FormField — Estados

| Estado | Label color | Helper/Error color | Input visual |
|--------|-------------|-------------------|--------------|
| `default` | `text/primary` | `text/secondary` | Borde default |
| `focused` | `interactive/default` (brand) | `text/secondary` | Borde brand + ring |
| `error` | `text/primary` | `status/error/fg` | Borde error |
| `success` | `text/primary` | `status/success/fg` | Borde success |
| `disabled` | `text/disabled` | `text/disabled` | Opacidad 50% |

### FormField — Tamaños

| Size | Label font | Gap label-input | Helper font | Gap campos |
|------|------------|----------------|-------------|------------|
| `sm` | 12px | 4px | 11px | 8px |
| `md` | 13px | 6px | 12px | 12px |
| `lg` | 14px | 8px | 13px | 16px |

### FormSection — Variantes

| Variant | Apariencia |
|---------|-----------|
| `default` | Solo spacing visual y título de sección en gray |
| `card` | Container con `border/default`, `radius/md`, padding 24px, bg `surface/default` |
| `inset` | Bg `surface/hover` (ligeramente diferente), padding 16-24px, sin border |

---

## Decisiones de diseño

### 1. Tres sub-componentes jerarquizados

La composición Form > FormSection > FormField permite reutilizar FormField standalone (en formularios inline, búsqueda) y FormSection sin Form completo (formulario embebido en un modal). La separación de responsabilidades es clara: FormField valida y muestra un campo; FormSection agrupa; Form orquesta el layout.

### 2. `<label for="...">` nativo, no aria-label

La forma correcta de asociar un label a su input es `<label for="input-id">`. Esta asociación nativa garantiza que: 1) el label es clickeable para enfocar el input, 2) el screen reader anuncia el label al entrar al input, 3) funciona en todos los contexts (modal, embedded form). Usar `aria-label` en el input en lugar de label visible viola WCAG 2.4.6 (Headings and Labels).

### 3. `aria-errormessage` para errores, `aria-describedby` para helper

ARIA 1.2 distingue entre texto descriptivo (helper) y mensajes de error de validación. `aria-describedby` → helper; `aria-errormessage` → error. La separación semántica permite que el screen reader anuncie el error con urgencia y el helper como contexto secundario.

### 4. Focus al primer campo inválido al submit

WCAG 3.3.1 requiere identificación de errores. Para usuarios de teclado, el focus debe moverse al primer campo inválido al intentar submit para que el error sea perceptible. El error summary opcional al top de la página con links a cada campo inválido es una mejora adicional.

### 5. FormSection Variant=card para settings page pattern

El pattern de settings (Stripe, GitHub, Linear) usa cards por sección con título. Permite separación visual clara de grupos como "Seguridad", "Notificaciones", "Facturación" sin necesidad de un layout de tabs.

---

## Comportamiento e interacción

### Roles ARIA — FormField

| Elemento | Rol / Atributo |
|----------|----------------|
| Label | `<label for="input-id">` native |
| Input requerido | `aria-required="true"` |
| Input inválido | `aria-invalid="true"` + `aria-errormessage="[error-id]"` |
| Helper text | `aria-describedby="[helper-id]"` en el input |
| Error message | `role="alert"` + `aria-live="assertive"` (inmediato) |
| Success message | `aria-live="polite"` |

### Roles ARIA — FormSection

| Elemento | Rol / Atributo |
|----------|----------------|
| Sección | `<fieldset>` native |
| Título de sección | `<legend>` native |

### Roles ARIA — Form

| Elemento | Rol / Atributo |
|----------|----------------|
| Form | `<form>` native + `aria-labelledby="[title-id]"` |
| Submit button | `type="submit"` o `role="button"` |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` | Navega entre campos en DOM order |
| `Shift+Tab` | Navegación inversa |
| `Enter` en submit | Envía el formulario |
| `Enter` en único textfield | Envía (comportamiento nativo HTML) |
| `Escape` en form modal | Cancela |

### Validación

- **En blur (on blur):** Validar cada campo al perder el focus — feedback inmediato sin interrumpir typing
- **En submit:** Validar todos los campos, mostrar todos los errores simultáneamente, hacer focus al primer campo inválido
- **Server-side errors:** Mostrar en FormField state=error con el mensaje del servidor

### Focus management en form modal

1. Al abrir modal: focus al primer campo vacío
2. Al cancelar: focus retorna al trigger que abrió el modal
3. Al submit exitoso: focus al elemento de confirmación o trigger original

---

## Guía de contenido

**Labels:**
- Cortos, claros, en sentencia case: "Nombre", "Correo electrónico", "Fecha de nacimiento"
- Evitar puntuación al final: "Nombre" (no "Nombre:")
- Para campos técnicos incluir contexto: "Token de API (solo lectura)"

**Required indicator:**
- `*` rojo para campos requeridos + nota al inicio del form: "Los campos marcados con * son obligatorios"
- Alternativa: indicar `(opcional)` en campos opcionales cuando la mayoría son requeridos

**Helper text:**
- Solo cuando añade valor: explicar formato esperado, restricciones, o qué hacer con el dato
- Ej: "Introduce el código de 8 dígitos de tu documento", "Se enviará a esta dirección un correo de confirmación"
- No repetir el placeholder — es redundante

**Error messages:**
- Específicos y accionables: "El email debe ser válido (ej: nombre@dominio.com)"
- No: "Campo inválido" (genérico e inútil)
- Tono: constructivo, no culpabilizador

**Success messages:**
- Breve: "Email verificado", "Guardado correctamente"
- Mostrar solo cuando el feedback es valioso (no en cada campo que pasa validación inline)

---

## Pre-build checklist

- [ ] FormField en Layout=stacked: verificar que el label tiene margin-bottom correcto hacia el input
- [ ] FormField en Layout=horizontal: label tiene ancho fijo (~200px), no crece con el texto
- [ ] Estado error: errorMessage tiene color `status/error/fg` + icono ⚠ opcional
- [ ] Estado focused: label cambia a brand color — verificar que sigue siendo legible
- [ ] FormSection Variant=card: border + radius + padding correctos
- [ ] Form Layout=two-column: los campos se distribuyen en grid de 2 columnas igualadas
- [ ] Footer del form: `border-top` + padding-top + gap entre botones
- [ ] Verificar que los 42 frames de FormField tienen la exclusión de Layout=inline + helperText aplicada

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **TextField / Input** | El slot `input` de FormField siempre usa un Input component |
| **Select / Dropdown** | Select es otro tipo de input válido en FormField |
| **Checkbox / Radio** | Dentro de FormSection/fieldset para grupos de selección |
| **Button** | Footer del Form usa Button/primary (submit) + Button/secondary (cancel) |
| **Divider** | Entre FormSections en Variant=default |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Layouts | Secciones | Validación inline | Card sections |
|---------|---------|-----------|------------------|---------------|
| **Ant Design** | Sí (24-col grid) | Sí | Sí | No nativo |
| **Atlassian** | Stacked + horizontal | No nativo | Sí | No |
| **Carbon (IBM)** | Stacked + horizontal | Sí | Sí | Sí (tile) |
| **Polaris (Shopify)** | Stacked | Sí (Cards) | Sí | Sí (Card) |
| **MUI** | Múltiples | No nativo | Sí | No nativo |
| **Spectrum (Adobe)** | Stacked + horizontal | Sí | Sí | No |

**Consenso:** Stacked + horizontal son los dos layouts core. Validación inline (on blur) es estándar. Card sections son útiles para settings pero pocas bibliotecas lo tienen nativo.

---

## Tokens y espaciado

**Prefijo:** `frm-` · **Total tokens:** 24 · **Modo:** Components

### Tokens de FormField — Label

| Token | Valor DS | Uso |
|-------|----------|-----|
| `frm/label/default/fg` | `text/primary` | Label reposo |
| `frm/label/focused/fg` | `interactive/default` | Label focused |
| `frm/label/disabled/fg` | `text/disabled` | Label disabled |
| `frm/label/fontSize/sm` | `type/xs` (12px) | Font size sm |
| `frm/label/fontSize/md` | `type/sm` (13px) | Font size md |
| `frm/label/fontSize/lg` | `type/md` (14px) | Font size lg |
| `frm/label/fontWeight` | `type/weight-medium` | Font weight |
| `frm/required/fg` | `status/error/fg` | Color * required |

### Tokens de FormField — Helper/Error

| Token | Valor DS | Uso |
|-------|----------|-----|
| `frm/helper/fg` | `text/secondary` | Helper text |
| `frm/helper/fontSize/sm` | `type/caption` | Font helper sm |
| `frm/helper/fontSize/md` | `type/xs` | Font helper md |
| `frm/error/fg` | `status/error/fg` | Error message |
| `frm/success/fg` | `status/success/fg` | Success message |

### Tokens de FormField — Espaciado

| Token | Valor DS | Uso |
|-------|----------|-----|
| `frm/field/sm/gap` | `spacing/2` (8px) | Gap entre campos sm |
| `frm/field/md/gap` | `spacing/3` (12px) | Gap entre campos md |
| `frm/field/lg/gap` | `spacing/4` (16px) | Gap entre campos lg |

### Tokens de FormSection

| Token | Valor DS | Uso |
|-------|----------|-----|
| `frm/section/gap` | `spacing/8` | Gap entre secciones |
| `frm/section/card/bg` | `surface/default` | Fondo card |
| `frm/section/card/border` | `border/default` | Border card |
| `frm/section/card/radius` | `radius/md` | Radius card |
| `frm/section/card/padding` | `spacing/6` | Padding card |

### Tokens de Form Footer

| Token | Valor DS | Uso |
|-------|----------|-----|
| `frm/footer/gap` | `spacing/3` | Gap entre botones footer |
| `frm/footer/borderTop` | `border/1` | Separador footer |
| `frm/footer/paddingTop` | `spacing/6` | Padding superior footer |

### Espaciado por tamaño — FormField

| Propiedad | sm | md | lg |
|-----------|----|----|----|
| Label font | 12px | 13px | 14px |
| Label → Input margin | 4px | 6px | 8px |
| Helper font | 11px | 12px | 13px |
| Gap entre campos | 8px | 12px | 16px |
