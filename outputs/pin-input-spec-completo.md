# PinInput

## Overview

El componente `PinInput` es un campo de entrada segmentado para códigos de verificación de longitud fija. Cada dígito ocupa una celda individual de 48×48px —el target táctil mínimo de WCAG 2.5.8— y el foco avanza automáticamente al escribir. Está diseñado para dos casos de uso principales: OTP de 6 dígitos (códigos SMS de autenticación de dos factores) y PIN de 4 dígitos (códigos cortos de acceso rápido). El componente soporta enmascarado (Has Mask) para entrada sensible tipo contraseña.

```
Length=4 (default state):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘
  48px   gap 8px

Length=6 (OTP):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │  3  │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
         ↑ celda activa: borde azul focus
         ↑ celdas llenas: borde gris medio (border/hover)
         ↑ celdas vacías: borde gris claro (border/default)

Has Mask=true (PIN sensible):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  ●  │ │  ●  │ │  ●  │ │     │
└─────┘ └─────┘ └─────┘ └─────┘
```

El wrapper tiene `role="group"` con un label accesible. Cada celda es un `<input>` real con `aria-label="Dígito N de M"`. El primer input lleva `autocomplete="one-time-code"` para el auto-fill de SMS via WebOTP.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Length: 4 | 6
State:  default | error
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Mask  → muestra bullets ● en lugar de dígitos (default: false)
Length 6  → muestra/oculta celdas 5 y 6 (controlado por Length property)
```

### Figma properties panel

```
┌─────────────────────────────────────┐
│  PinInput                           │
│  ─────────────────────────────────  │
│  Length      [4            ▾]       │
│  State       [default      ▾]       │
│  ─────────────────────────────────  │
│  Has Mask    [○──────────────]      │
│  ─────────────────────────────────  │
│  ✏️ Cell 1    ·                       │
│  ✏️ Cell 2    ·                       │
│  ✏️ Cell 3    ·                       │
│  ✏️ Cell 4    ·                       │
└─────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita ingresar un código de longitud fija?
    │
    ├─ No ─► TextInput o NumberInput
    │
    └─ Sí ─► ¿El código tiene 4 o 6 dígitos?
                 ├─ 4 dígitos ─► PinInput (Length=4), Has Mask si es sensible
                 ├─ 6 dígitos ─► PinInput (Length=6), autocomplete=one-time-code
                 └─ Otra longitud ─► TextInput con maxLength + validación
```

**Use PinInput cuando:**
- El usuario ingresa un OTP de SMS (6 dígitos), código de autenticación de doble factor, o PIN corto de 4 dígitos.
- El flujo es de verificación de identidad donde la claridad visual de "exactamente N caracteres" mejora la UX.
- El auto-fill de SMS vía WebOTP debe ser soportado (el componente incluye `autocomplete="one-time-code"`).
- El código es sensible y debe mostrarse como bullets (Has Mask = true).

**Do NOT use PinInput cuando:**
- La longitud del código es variable o desconocida → usa TextInput con `maxLength`.
- El código es alfanumérico complejo (ej. clave de licencia de 25 caracteres) → usa TextInput con segmentación manual.
- La accesibilidad es crítica y el contexto es de alta fricción → considera la alternativa de input único (patrón GOV.UK): un `<input inputmode="numeric" maxlength="6">` tiene semántica más simple para screen readers.
- Los usuarios son mayoritariamente en mobile con alta tasa de errores → evaluar A/B contra input único antes de decidir.

---

## Visual variations

### Por Length

```
Length=4 (PIN corto / código simple):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘
  Total width: 4×48 + 3×8 = 216px

Length=6 (OTP / 2FA estándar):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
  Total width: 6×48 + 5×8 = 328px
```

### Por State

```
default (vacío):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘
  border: #D1D1D9 (border/default) todas las celdas

default (llenando, celda 3 activa):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘
  celdas 1-2: border #6B6E80 (border/hover) — "llenas"
  celda 3 activa: border #2659EB (border/focus) — "con foco"
  celdas 4+: border #D1D1D9 — "vacías"

error:
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │  3  │ │  4  │
└─────┘ └─────┘ └─────┘ └─────┘
  border: #DB2424 (border/error) TODAS las celdas
  ✕ Código incorrecto. Inténtalo de nuevo.
```

### Con Has Mask

```
Has Mask=true (PIN sensible):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  ●  │ │  ●  │ │  ●  │ │     │
└─────┘ └─────┘ └─────┘ └─────┘
  ● : bullet, tamaño proporcional al cell, color: text/primary
  celda activa mantiene el caret visible antes del bullet
```

---

## Design decisions

### 1. Solo Length=4 y Length=6 como variants (no prop dinámico)

**Por qué:** 4 dígitos = PIN/código simple; 6 dígitos = OTP/verificación estándar (TOTP, SMS). Son las dos longitudes más comunes en el ecosistema: Mantine default 4, Ant Design default 6. Otras longitudes (8 para backup codes) son edge cases que el dev configura en tiempo de ejecución. Expo sar longitudes arbitrarias como variante Figma generaría frames inmanejables.

**Trade-off:** Si el producto necesita códigos de 8 dígitos frecuentemente, la propiedad `Length` necesitaría extenderse. Por ahora, Length=4 y Length=6 cubren el 95% de los casos de uso documentados.

---

### 2. Celda size fija 48×48px sin variantes de tamaño

**Por qué:** El target táctil mínimo de WCAG 2.5.8 es 24×24px, pero para un campo de autenticación donde la precisión de toque importa, 48×48px es el mínimo práctico (igual al target recomendado por Apple HIG y Material Design). `PinInput` es siempre prominente en pantalla —es el elemento principal de un paso de verificación— y nunca vive inline en un formulario denso donde un tamaño más pequeño tendría sentido.

**Trade-off:** El componente ocupa más espacio vertical que un input regular. En pantallas muy pequeñas (320px de ancho), Length=6 (328px total) puede requerir scroll horizontal o reducción de gap. Documentado como constrainte de layout.

---

### 3. Estado error afecta todas las celdas simultáneamente

**Por qué:** El error de un código OTP no es de una celda individual —es del código completo ("código incorrecto", "código expirado"). El borde rojo en todas las celdas comunica que el problema es el valor total, no una posición específica. Ant Design, Chakra y Mantine siguen este patrón: `isInvalid` en el `PinInput` wrapper aplica el estado a todas las celdas.

**Trade-off:** No se pueden expresar errores por celda individual. Si el caso de uso requiere destacar una posición específica (ej. "el dígito 3 es incorrecto"), el componente no lo soporta —necesitaría una implementación custom.

---

### 4. `autocomplete="one-time-code"` activado por defecto en el primer input

**Por qué:** La WebOTP API de los browsers permite que el dispositivo lea un código SMS y lo rellene automáticamente en el campo de autenticación cuando el input tiene `autocomplete="one-time-code"`. Es una feature de UX crítica para flujos de 2FA en mobile: elimina la necesidad de cambiar de app, copiar y pegar. Los 3 sistemas que implementan este componente (Chakra, Mantine, Ant) exponen esta feature como prop opt-in (`otp`, `oneTimeCode`). En nuestro caso, está activo por defecto porque PinInput es casi exclusivamente usado para verificación.

**Trade-off:** Para Length=4 con Has Mask (PIN de dispositivo), el autocomplete de SMS no aplica. El dev puede desactivarlo, pero el default correcto es tenerlo activo.

---

## Behavior

### Essential for design

- **Auto-avance:** Al escribir un dígito, el foco avanza automáticamente a la siguiente celda.
- **Backspace retrocede:** Borrar un dígito devuelve el foco a la celda anterior.
- **Paste distribuye:** Pegar "123456" llena todas las celdas y posiciona el foco al final.
- **Error state:** Todas las celdas adquieren el borde de error simultáneamente.
- **Celda activa:** Borde azul (`border/focus`). Celdas llenas: borde gris medio (`border/hover`). Celdas vacías: borde gris claro (`border/default`).
- **Has Mask:** Los dígitos se reemplazan por bullets (●) al salir de la celda (o inmediatamente según configuración del producto).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Wrapper | `group` | `aria-label="Código de verificación"` | Agrupa las celdas como una unidad lógica |
| Celda 1 | `textbox` | `aria-label="Dígito 1 de 4"`, `autocomplete="one-time-code"` | SR identifica posición; WebOTP auto-fill |
| Celda N | `textbox` | `aria-label="Dígito N de M"` | SR anuncia posición al avanzar |
| State=error | Todas las celdas | `aria-invalid="true"`, `aria-describedby="pin-error-id"` | SR asocia el mensaje de error con el campo |
| Error message | `span` | `id="pin-error-id"`, `role="alert"` | SR anuncia el error inmediatamente |

### Keyboard navigation

Primary interactions (affect design):

```
Typing (0-9)  → escribe dígito y avanza al siguiente
Backspace     → borra dígito de la celda actual y retrocede al anterior
← Arrow       → mueve foco a la celda anterior (sin borrar)
→ Arrow       → mueve foco a la celda siguiente (sin escribir)
```

Secondary interactions (dev reference):

```
Tab           → sale del grupo de celdas al siguiente elemento focusable
Shift+Tab     → sale del grupo al elemento anterior
Paste         → distribuye el texto pegado en las celdas desde la posición actual
Delete        → borra el dígito de la celda actual sin retroceder
```

---

## Content guide

### `cell-1` a `cell-4` (slots obligatorios, siempre visibles)
- **Qué va aquí:** Un solo carácter numérico (0–9) o bullet (●) si Has Mask.
- **Default en Figma:** `·` (punto centrado) para indicar "celda vacía esperando entrada".
- **Tamaño de fuente:** 20px / semibold (600) —prominente para que el dígito sea claro.
- **Nota:** El designer edita estas text properties solo para mostrar estados concretos en prototipos o documentación. En producción el dev controla el valor.

### `cell-5` y `cell-6` (slots opcionales, solo Length=6)
- **Qué va aquí:** Igual que cell-1 a cell-4.
- **Visibilidad:** Controlada por la property `Length`. Length=4 → ocultas. Length=6 → visibles.

### Mensajes de error (fuera del componente)
- **Qué va aquí:** Texto bajo las celdas explicando el error. "Código incorrecto. Inténtalo de nuevo." o "El código ha expirado. Solicita uno nuevo."
- **Posición:** Directamente bajo el grupo de celdas, gap de 8px.
- **Longitud:** Máx. una línea (~60 caracteres).

### Timer de reenvío (fuera del componente)
- **Qué va aquí:** Enlace o texto para solicitar un nuevo código. "¿No recibiste el código? Reenviar (0:45)".
- **Nota:** Este elemento es externo al componente —PinInput no lo gestiona.

---

## Pre-build checklist

```
[ ] Length=4: 4 celdas visibles, total width ~216px
[ ] Length=6: 6 celdas visibles (cell-5 y cell-6 activadas), total width ~328px
[ ] State=default: borde border/default en celdas vacías
[ ] State=error: borde border/error en TODAS las celdas
[ ] Has Mask toggle funcional (default: false)
[ ] Celda size: 48×48px (no variantes de tamaño)
[ ] Gap entre celdas: 8px
[ ] Radius: 8px (pin/radius)
[ ] Border width: 1.5px
[ ] Tipografía: 20px, semibold (600), line-height 28px
[ ] Colores de borde por estado de celda:
    vacía:  border/default (#D1D1D9)
    llena:  border/hover   (#6B6E80) — distinta del foco
    activa: border/focus   (#2659EB)
    error:  border/error   (#DB2424) en todas
[ ] Text properties: ✏️ Cell 1–4 editables
[ ] Tokens pin- aplicados: pin/cell-bg, pin/cell-border, pin/cell-border-focus,
    pin/cell-border-filled, pin/cell-border-error, pin/fg, pin/radius, pin/error/fg
[ ] 4 frames en el grid (Length 4 default, Length 6 default, Length 4 error, Length 6 error)
```

---

## Related components

```
TextInput         → para códigos de longitud variable o alfanuméricos complejos
NumberInput       → para valores numéricos con rango y stepper
Form              → wrapper semántico que gestiona el submit del código
OTPTimer          → componente de reenvío (externo a PinInput)
```

---

## Reference: how other systems do it

### Ant Design (Tier 1) — `Input.OTP`: el único Tier 1 con componente dedicado

Añadido en Ant Design v5.16.0, `Input.OTP` es el primero de los sistemas Tier 1 en publicar este componente. Usa `length` como prop estructural (default 6). El prop `mask` (v5.17+) renderiza bullets para entrada sensible. `formatter: (v) => v.toUpperCase()` para transformación inline en alfanuméricos. Limitación notable: no tiene `onComplete` —el consumer detecta la completitud comparando `value.length === length` en `onChange`, lo que puede fallar en paste scenarios.

### shadcn/ui — Arquitectura de input único oculto + slots visuales

shadcn's `InputOTP` usa la librería `input-otp` con una arquitectura radicalmente diferente: un único `<input>` oculto recibe el valor, y los "slots" son presentación visual (no inputs reales). Esta arquitectura soluciona nativamente los problemas más difíciles: paste (un solo input lo recibe), autofill (`autocomplete="one-time-code"` en un input), y form submission. `InputOTPSeparator` como componente hijo para separadores visuales entre grupos (ej. XXX-XXX para códigos de licencia).

### Chakra UI (Tier 3) — Arquitectura compound con `onComplete`

`PinInput` + `PinInputField` como arquitectura compound: la cantidad de celdas se determina por cuántos `PinInputField` hijos se renderizan, no por un prop `length`. Esto da máxima flexibilidad de layout y separadores personalizados. `onComplete` callback se dispara **solo** cuando todas las celdas están llenas —la feature más impactante del ecosistema, ausente en Ant Design. Habilita auto-submit de formulario sin botón explícito. `manageFocus: false` como escape hatch para deshabilitar el auto-avance en flujos custom.

### Mantine (Tier 3) — API simple con `length` prop y soporte `onComplete`

`PinInput` de Mantine con `length` prop (default 4). Acepta `type: "number" | "alphanumeric" | RegExp` para validación de caracteres. `oneTimeCode` boolean agrega `autocomplete="one-time-code"`. `onComplete` como en Chakra. `gap` como style prop para agrupar visualmente (celdas juntas = un código, celdas separadas = dos grupos). Integración nativa con `@mantine/form`.

### GOV.UK — Anti-patrón documentado con research de usuarios

GOV.UK recomienda explícitamente contra los inputs segmentados para códigos OTP. Su investigación de usuarios encontró que los segmented inputs causaron confusión, dificultad para corregir errores, y fallos de paste. La alternativa: un único `<input inputmode="numeric" maxlength="6">` con label descriptivo. Argumento de accesibilidad: un único input tiene un solo label, un único `aria-invalid`, y semántica más simple para screen readers. Esta evidencia no invalida el uso de PinInput, pero debe considerarse antes de implementarlo en flujos de alta fricción o para poblaciones con menor familiaridad tecnológica.

---

## Tokens

**8 tokens** · prefix `pin-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `pin/cell-bg` | `surface/default` | Fondo de cada celda |
| `pin/cell-border` | `border/default` | Borde de celda vacía |
| `pin/cell-border-focus` | `border/focus` | Borde de celda activa (azul) |
| `pin/cell-border-filled` | `border/hover` | Borde de celda con valor (gris medio) |
| `pin/cell-border-error` | `border/error` | Borde de todas las celdas en error |
| `pin/fg` | `text/primary` | Color del dígito o bullet |
| `pin/radius` | `radius/md` | Border radius de la celda (8px) |
| `pin/error/fg` | `status/error/fg` | Color del mensaje de error debajo |
| `focus/ring` | `border/focus` | Anillo de focus (mismo que border-focus en celda) |

### Spacing specs

```
Celda (única dimensión de tamaño):
  width:        48px
  height:       48px
  border-width: 1.5px
  border-radius: 8px  (pin/radius)
  font-size:    20px
  font-weight:  600 (semibold)
  line-height:  28px

Layout del grupo:
  gap entre celdas: 8px (spacing/8)

Length=4: total ancho = (4 × 48) + (3 × 8) = 216px
Length=6: total ancho = (6 × 48) + (5 × 8) = 328px

Mensaje de error (externo):
  margin-top:   8px
  font-size:    14px (typeScale/md)
  color:        pin/error/fg (status/error/fg)
  line-height:  20px

Focus ring:
  No ring exterior — la celda activa usa borde más grueso
  border-color: pin/cell-border-focus
  borde es 1.5px en reposo → 2px en foco (o solo color cambia, según implementación)
```
