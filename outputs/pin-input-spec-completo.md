# PinInput

## Descripción general

PinInput es el control de entrada para códigos de verificación segmentados: muestra N celdas individuales (4 o 6) donde el usuario ingresa un dígito por celda. El foco avanza automáticamente al escribir y retrocede al borrar. A diferencia de un TextField, PinInput comunica visualmente la longitud esperada del código y optimiza la experiencia de ingreso de OTP (One-Time Password) mediante la integración con la WebOTP API (`autocomplete="one-time-code"`) para autocompletar desde SMS. Es el patrón estándar para 2FA, meeting passwords, verificación de email, y PINs de dispositivo.

```
Length=6, State=default:
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│      │ │      │ │      │ │      │ │      │ │      │
│  ·   │ │  ·   │ │  ·   │ │  ·   │ │  ·   │ │  ·   │   h: 48px · w: 48px
│      │ │      │ │      │ │      │ │      │ │      │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘

Con valor (celda activa en focus):
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  3   │ │  4   │ │  8   │ │  _   │ │      │ │      │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
  filled  filled   filled   focus    empty    empty

Has Mask=on (código sensible):
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  ●   │ │  ●   │ │  ●   │ │  ·   │   Length=4
└──────┘ └──────┘ └──────┘ └──────┘

State=error (todas las celdas):
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  3   │ │  4   │ │  8   │ │  9   │ │  1   │ │  2   │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
  border: error en todas
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Length → 4 | 6
State  → default | error
```

Toggles:

```
👁 Has Mask  → muestra bullets en lugar de dígitos (default: off)
👁 Length 6  → activa celdas 5 y 6 (default: off = Length 4)
```

Texto editable de celdas:

```
✏️ Cell 1–4 → "·" (placeholder visible por defecto)
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  PinInput                                                │
│  ──────────────────────────────────────────────────────  │
│  Length  [ 4               ▼ ]                           │
│  State   [ default         ▼ ]                           │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Mask  [ off ]                                    │
│  ✏️ Cell 1  [ ·    ]  ✏️ Cell 2  [ ·    ]               │
│  ✏️ Cell 3  [ ·    ]  ✏️ Cell 4  [ ·    ]               │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita ingresar un código de longitud fija?
                    │
                    ▼
       ¿Qué tipo de código?
       ├── OTP/2FA (6 dígitos de SMS/TOTP) → PinInput Length=6
       ├── PIN de 4 dígitos (device, meeting) → PinInput Length=4
       └── Contraseña de longitud variable → TextField type=password
                    │
                    ▼
       ¿El código es sensible (no debe mostrarse)?
       ├── Sí → PinInput + Has Mask=on
       └── No → PinInput default
```

**Usar PinInput cuando:**
- Código OTP enviado por SMS o TOTP (6 dígitos)
- PIN de meeting de Zoom (4 dígitos)
- Verificación de email con código numérico
- Confirmación de acción sensible con PIN de dispositivo
- Cualquier código de longitud exacta conocida (4 o 6)

**NO usar PinInput cuando:**
- La longitud del código es variable o desconocida → usar `TextField`
- Es una contraseña alfanumérica → usar `TextField type=password`
- El código tiene más de 6 caracteres → usar `TextField` (no modelar)
- La entrada no es secuencial (ej. selección de opciones) → usar otro control

---

## Variaciones visuales

### Dimensiones de celda (fijas — sin size variants)

| Propiedad | Valor |
|-----------|-------|
| Ancho | 48px |
| Alto | 48px |
| Gap entre celdas | 8px |
| Font size | 20px / weight 600 |
| Border width | 1.5px |
| Border radius | 8px |

> Las celdas son siempre 48×48px — tap target mínimo de 44×44px (WCAG 2.5.8). No hay size variants porque PinInput es siempre prominente en pantalla, nunca inline en formulario denso.

### State de celda individual (en implementación)

| Estado | Border | Fondo |
|--------|--------|-------|
| empty | border/default | blanco |
| focus | border/focus (azul) | blanco |
| filled | border/hover (gris oscuro) | blanco |
| error | border/error (rojo) | blanco |

### State del componente (en Figma)

| State | Comportamiento visual |
|-------|----------------------|
| default | Celdas vacías con placeholder `·` |
| error | Todas las celdas con border rojo |

---

## Decisiones de diseño

**1. Celdas de tamaño fijo (48×48px) — sin size variants** — WCAG 2.5.8 requiere tap target mínimo de 44×44px. PinInput siempre aparece prominente en pantalla (modal de verificación, pantalla de login) — nunca inline en formulario denso. No hay justificación para sizes más pequeños.

**2. Length=4|6 como variant (no prop dinámica)** — 4 dígitos = PIN/código simple (meeting, device); 6 dígitos = OTP/verificación estándar (TOTP, SMS). Son las dos longitudes dominantes. Otros valores son edge cases que el developer configura con la prop `length` sin frame Figma dedicado.

**3. Solo 2 states (default y error)** — PinInput no tiene `disabled` state (no se deshabilita durante la entrada — se reemplaza por una pantalla de espera). No tiene variantes de tamaño. Mantener el set de frames reducido.

**4. Has Mask para códigos sensibles** — El PIN del dispositivo o códigos de recuperación no deben mostrarse en texto claro. Has Mask=on muestra bullets (●) en lugar de dígitos. Es un toggle de privacidad, no de seguridad — la implementación gestiona el type="password" por celda.

### Combinaciones excluidas

```
(ninguna — Length × State no tiene exclusiones)
```

---

## Comportamiento

### Esencial para diseño

- **Auto-avance al escribir** — al escribir un dígito, el foco salta automáticamente a la siguiente celda. No se necesita Tab entre celdas.
- **Auto-retroceso con Backspace** — borrar un dígito devuelve el foco a la celda anterior.
- **Paste distribuye el código** — pegar "348912" completa todas las celdas automáticamente. WebOTP API hace esto desde SMS sin interacción del usuario.
- **State=error afecta todas las celdas** — cuando el código es incorrecto, todas las celdas cambian a border rojo simultáneamente (no solo la última).
- **Auto-submit opcional** — cuando todas las celdas están llenas, el developer puede disparar la validación automáticamente. El diseñador modela este estado en el flujo protipado.
- **Resend timer fuera del componente** — el enlace/botón de reenvío de código no es parte de PinInput — es contenido de la pantalla que lo contiene.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Wrapper | `role="group"` + `aria-label="Código de verificación"` | SR anuncia el grupo antes de las celdas |
| Cada celda | `aria-label="Dígito N de M"` | SR anuncia "Dígito 1 de 6" al recibir foco |
| Primera celda | `autocomplete="one-time-code"` | WebOTP API auto-rellena desde SMS |
| Tipo de input | `inputmode="numeric"` o `type="number"` | Teclado numérico en móvil |
| Error | `aria-invalid="true"` en todas las celdas + `aria-describedby` | SR anuncia el error al entrar a cualquier celda |

### Navegación por teclado

```
Typing          → ingresa dígito + avanza foco a siguiente celda
Backspace       → borra dígito + retrocede foco a celda anterior
←/→ Arrow       → navega entre celdas sin borrar
Paste           → distribuye el código completo en todas las celdas
Tab             → sale del grupo completo
```

---

## Guía de contenido

**Placeholder por celda:**
- Usar `·` (punto medio) o guion bajo `_` — no dejar vacío
- No usar "0" como placeholder (se confunde con valor ingresado)

**Label del grupo (para SR):**
- Descriptivo del contexto: "Código de verificación", "PIN de acceso", "Código de meeting"
- No genérico: no usar solo "Código"

**Error text (debajo del componente):**
- Específico: "Código incorrecto. Intenta de nuevo." (no "Error")
- Con contador: "Código incorrecto. Quedan 2 intentos."
- Expirado: "El código ha expirado. Solicita uno nuevo."

**Resend link (fuera del componente):**
- Con timer: "Reenviar código en 0:45"
- Sin timer: "¿No recibiste el código? Reenviar"

---

## Pre-build checklist

```
□ ¿role="group" + aria-label en el wrapper?
□ ¿aria-label="Dígito N de M" en cada celda?
□ ¿autocomplete="one-time-code" en la primera celda?
□ ¿inputmode="numeric" para teclado numérico en móvil?
□ ¿Auto-avance al escribir (foco a siguiente celda)?
□ ¿Auto-retroceso con Backspace (foco a celda anterior)?
□ ¿Paste distribuye el código en todas las celdas?
□ ¿State=error: aria-invalid en todas + aria-describedby?
□ ¿Has Mask: type="password" por celda (bullets)?
□ ¿Tap target mínimo 44×44px (WCAG 2.5.8)?
□ ¿Auto-submit opcional al completar todas las celdas?
```

---

## Componentes relacionados

```
TextField    → para contraseñas o códigos de longitud variable
NumberInput  → para valores numéricos con rango y steppers
Search       → para búsqueda textual
Form         → contexto de uso de PinInput en flujo de verificación
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | OTP | Mask | Auto-advance | ARIA | Diferenciador |
|---------|-------|-----|------|-------------|------|--------------|
| **Material Design 3** | — | No nativo | — | — | — | Sin componente dedicado |
| **Spectrum (Adobe)** | — | No nativo | — | — | — | Sin componente dedicado |
| **Carbon (IBM)** | — | No nativo | — | — | — | Sin componente dedicado |
| **Polaris (Shopify)** | — | No nativo | — | — | — | Sin componente dedicado |
| **Atlassian** | — | No nativo | — | — | — | Sin componente dedicado |
| **Ant Design** | Input.OTP (v5.16+) | Sí | mask prop | Sí | group | Nuevo en v5.16; length prop |
| **Twilio Paste** | — | No nativo | — | — | — | Sin componente dedicado |
| **shadch/ui** | InputOTP | Sí | — | Sí | group | Basado en input-otp library |
| **Chakra UI** | PinInput | Sí | mask prop | Sí | group | otp prop; mask prop |
| **Mantine** | PinInput | Sí | mask prop | Sí | group | length prop; type (alphanumeric) |
| **Radix / Headless** | — | No nativo | — | — | — | Sin componente |
| **React Aria** | — | No nativo | — | — | — | Componer desde TextField |
| **NextUI / HeroUI** | InputOtp | Sí | — | Sí | group | allowedKeys; onComplete callback |
| **Ark UI** | PinInput | Sí | mask | Sí | group | otp; type; blurOnComplete |

**Patrones clave de la industria:**
1. **WebOTP API (`autocomplete="one-time-code"`)** — estándar Web para autocompletar OTPs desde SMS. Chrome/Safari lo soportan. Se coloca en la primera celda del grupo o en un input oculto.
2. **Ant Design Input.OTP (v5.16)** — el único T1 con este componente nativo. `length` prop, auto-advance, formatter. Referencia de implementación.
3. **Chakra UI PinInput** — `mask` prop para bullets, `otp` prop para `autocomplete="one-time-code"`, `type="alphanumeric"` para códigos no numéricos.
4. **Mantine PinInput** — `type` prop con valores `number`, `alphanumeric`, `password` (mask). `onComplete` callback. `length` dinámico.

---

## Tokens

**8 tokens** · prefijo `pin-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `pin/cell-bg` | `surface/default` | Background de cada celda |
| `pin/cell-border` | `border/default` | Borde celda vacía |
| `pin/cell-border-focus` | `border/focus` | Borde celda con foco — azul |
| `pin/cell-border-filled` | `border/hover` | Borde celda rellena (sin foco) |
| `pin/cell-border-error` | `border/error` | Borde error — rojo |
| `pin/fg` | `text/primary` | Dígito ingresado |
| `pin/radius` | `radius/md` | Border radius de celda (8px) |
| `pin/error/fg` | `status/error/fg` | Color del texto de error debajo |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Celda: w:48px × h:48px (fija, sin variants de tamaño)  │
│  Gap entre celdas: 8px                                   │
│  Font: 20px / weight 600                                 │
│  Border width: 1.5px                                     │
│  Border radius: 8px                                      │
│                                                          │
│  Length 4: ancho total = 4×48 + 3×8 = 216px             │
│  Length 6: ancho total = 6×48 + 5×8 = 328px             │
│                                                          │
│  Frames totales:                                         │
│  Length(2) × State(2) = 4 frames                        │
└──────────────────────────────────────────────────────────┘
```
