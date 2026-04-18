# Toast

## Overview

Toast es una notificación efímera no bloqueante que aparece superpuesta sobre el contenido de la página para confirmar que una acción ocurrió, o alertar sobre un evento del sistema que no requiere acción inmediata del usuario. A diferencia de un Banner (persistente, inline) o un Dialog (bloquea interacción), el Toast es temporal, flota en una esquina y no interrumpe el flujo de trabajo.

```
                    ┌─────────────────────────────────────┐
                    │  ✓  Archivo guardado exitosamente.  │
                    │                              [ × ]  │
                    └─────────────────────────────────────┘

                    ┌────────────────────────────────────────────┐
                    │  ⚠  Conexión inestable.  [ Reintentar ]  │
                    │                                   [ × ]   │
                    └────────────────────────────────────────────┘
```

El Toast siempre tiene fondo oscuro (dark surface) independientemente del variant semántico — el color semántico se expresa únicamente en el ícono. Esto crea contraste visual claro con el contenido de página (generalmente claro) y le da identidad visual propia al sistema de notificaciones.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant: neutral | info | success | warning | error
```

Toggles (show/hide parts — do NOT generate extra variants):

```
👁 Has Icon    → ícono semántico leading
👁 Has Action  → botón de texto (Undo, Ver, Reintentar)
👁 Has Close   → botón × para dismiss manual
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  Toast                                  │
│  ─────────────────────────────────────  │
│  Variant  ○ neutral  ○ info             │
│           ○ success  ○ warning          │
│           ○ error                       │
│  ─────────────────────────────────────  │
│  👁 Has Icon      [toggle] (default: on)│
│  👁 Has Action    [toggle] (default: off)│
│  👁 Has Close     [toggle] (default: on)│
│  ─────────────────────────────────────  │
│  ✏️ Message  "Acción completada..."     │
│  ✏️ Action   "Deshacer"                 │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita saber que algo ocurrió?
│
├─ ¿Es crítico y puede perderse si desaparece?
│   └─ NO usar Toast → usar Banner persistente
│       (errores de pago, fallas de proceso crítico)
│
├─ ¿Requiere acción inmediata que no existe en otro lugar de la UI?
│   └─ NO usar Toast → usar Modal/Dialog
│
├─ ¿Es confirmación de una acción completada (guardar, enviar, borrar)?
│   └─ SÍ → Toast success o neutral
│
├─ ¿Es una alerta recuperable (error de red, fallo temporal)?
│   └─ SÍ → Toast error con Has Action=true (Reintentar)
│
└─ ¿Es información sobre el estado del sistema (advertencia menor)?
    └─ SÍ → Toast warning o info
```

**Usar Toast cuando:**
- Se confirma el resultado de una acción del usuario (guardar, enviar, duplicar, eliminar) con éxito o error recuperable.
- Se proporciona un shortcut de acción reversible como "Deshacer" después de una operación (mover, archivar, borrar).
- Se informa sobre un evento del sistema que el usuario debe conocer pero no debe bloquear (nueva versión disponible, alerta de conectividad temporal).
- El mensaje es breve (1–2 líneas) y no requiere decisión explícita del usuario.
- La notificación puede perderse sin consecuencias críticas — el usuario puede recuperar el contexto de otra forma.

**NO usar Toast cuando:**
- El error es crítico y el usuario debe resolver un problema activamente (error de pago, falla de autenticación, pérdida de datos) — usar Banner persistente.
- La acción disponible en el toast es el único camino para realizar una tarea — el toast puede desaparecer antes de que el usuario lo vea (Polaris design principle: toda acción de toast debe existir en otro lugar de la UI).
- La notificación contiene información compleja con múltiples secciones o campos de datos.
- Se trata de validación de formulario — usar inline errors + banner sumario en el formulario.
- El estado debe persistir visiblemente (estado de conexión, progreso de operación larga) — usar StatusBar o Progress indicator.
- El contexto es de alta criticidad transaccional (e-commerce payment, médico) — los errores requieren feedback persistente.

---

## Visual variations

### Por Variant

Todos los variants comparten el mismo fondo oscuro (`surface/inverse` ≈ #212124). El color semántico diferencia únicamente el ícono.

| Variant | Ícono | Color del ícono | Nombre del ícono |
|---------|-------|-----------------|-----------------|
| neutral | — | `text/inverse/secondary` (#CCCCCC) | ninguno (Has Icon=off por defecto) |
| info | ● | `status/info/fg` (azul claro) | `info-circle` |
| success | ✓ | `status/success/fg` (verde) | `check-circle` |
| warning | ⚠ | `status/warning/fg` (amarillo) | `alert-triangle` |
| error | ✕ | `status/error/fg` (rojo claro) | `alert-circle` |

**Dual encoding obligatorio:** El color del ícono nunca es el único diferenciador — el ícono en sí comunica el tipo (triángulo=warning, círculo con check=success). Esto cumple WCAG 1.4.1 (uso de color).

### Con Has Action=true

```
┌────────────────────────────────────────────────────┐
│  ✓  3 archivos movidos a Papelera.   [Deshacer]  │
│                                            [ × ] │
└────────────────────────────────────────────────────┘
```

El botón de acción aparece a la derecha del mensaje, antes del botón de cierre. Estilo: texto en `interactive/inverse` (azul claro sobre fondo oscuro), sin borde, sin fondo.

**Regla crítica:** Cuando Has Action=true, el toast NO debe auto-dismiss — debe persistir hasta que el usuario interactúe con la acción o cierre manualmente. Este comportamiento es non-negociable (Spectrum, Radix, Atlassian).

### Con Has Close=true

El botón × (ícono `x`) aparece en la esquina superior derecha. Siempre tiene `aria-label="Cerrar notificación"`. El hover muestra un fondo sutil sobre el ícono para retroalimentación de interactividad.

### Dimensiones

| Propiedad | Valor |
|-----------|-------|
| Min width | 280px |
| Max width | 480px |
| Padding V | 12px |
| Padding H | 16px |
| Gap entre elementos | 12px |
| Font size | 14px |
| Line height | 20px |
| Font weight | 400 |
| Border radius | 8px |
| Sombra | elevation/3 |
| Ícono size | 20px |

---

## Design decisions

### 1. Fondo oscuro (dark surface) para todos los variants

**Por qué:** 20 de 24 sistemas analizados usan fondo oscuro para toast — incluyendo Spectrum, Atlassian, Ant Design, Mantine, shadcn/Sonner. El fondo oscuro contrasta con el contenido de página (generalmente claro) y crea una identidad visual propia para el sistema de notificaciones. El color semántico se expresa solo en el ícono, lo que es más elegante y accesible que tener fondos de colores diferentes por tipo.

**Tradeoff:** Los toasts tienen menos "diferenciación por color" que sistemas como Carbon (fondos de color por severity). Sin embargo, el dual encoding (ícono shape + ícono color) cumple WCAG sin necesidad de fondos semánticos. El resultado es visualmente más cohesivo y menos ruidoso.

### 2. Un solo size (sin sm/md/lg)

**Por qué:** 5 de 6 sistemas con toast único tienen un solo tamaño controlado por `min-width`/`max-width` y el contenido del mensaje. MD3 Snackbar, Spectrum Toast, Radix Toast, Atlassian Flag — todos tienen un único tamaño. Las variaciones de size generarían frames innecesarios en Figma y decisiones arbitrarias en diseño. El ancho se adapta al contenido dentro de los límites 280–480px.

**Tradeoff:** No se puede hacer el toast más pequeño para layouts compactos. En casos donde se necesita una notificación más densa (embedded notification), la alternativa correcta es un Badge o un Inline Alert, no un Toast reducido.

### 3. Errores críticos → Banner, no Toast

**Por qué:** Polaris enforza explícitamente esta separación: en comercio, un error de pago que desaparece en 5 segundos = orden perdida. Orbit (Kiwi.com) no tiene Toast por este mismo razonamiento aplicado a booking aéreo. La regla se extiende a cualquier contexto transaccional: el error debe persistir hasta que el usuario lo resuelva activamente.

**Tradeoff:** Requiere tener un componente Banner separado para errores persistentes. El beneficio de claridad semántica (toast = efímero, banner = persistente) justifica el costo de tener dos componentes distintos.

### Excluded combinations

```
(No hay exclusiones de property — todos los variants pueden tener cualquier combinación de booleans)

Sin embargo, las siguientes combinaciones son semánticamente incorrectas y deben documentarse:
• Variant=error + Has Close=false + Has Action=false → error que el usuario no puede cerrar, solo auto-dismiss
  (violación de WCAG 2.2.1 si dura menos de 5000ms)
```

---

## Behavior

### Essential para diseño

**Auto-dismiss:** Los toasts neutrales, info y success se auto-descartan después de un tiempo mínimo de 5000ms (WCAG 2.2.1). El tiempo recomendado es 5000–8000ms según la longitud del mensaje. Los toasts con `Has Action=true` NO se auto-descartan bajo ninguna circunstancia.

**Pause on focus:** Cuando el foco del teclado entra dentro del toast (sea en el botón de acción o en el botón de cierre), el auto-dismiss se pausa. Se reanuda cuando el foco sale. Esto es un requerimiento WCAG 2.2 (Pause, Stop, Hide).

**No auto-focus:** El toast aparece sin robar el foco del elemento activo del usuario. La aparición no interrumpe la navegación por teclado en curso.

**Posición:** Top-right por defecto para aplicaciones desktop. El toast es fixed position y flota sobre el contenido. Z-index suficientemente alto para aparecer sobre modals si es necesario en casos de notificación crítica.

**Stacking:** Cuando múltiples toasts aparecen simultáneamente, se apilan verticalmente con gap de 8px. El máximo recomendado es 3 toasts visibles a la vez — los excedentes entran en cola.

**El aria-live region persiste en el DOM** aunque el toast no sea visible — esto es arquitecturalmente importante para que los anuncios de AT funcionen correctamente.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Toast container (neutral/info/success) | `status` | `aria-live="polite"`, `aria-atomic="true"` | Anuncia sin interrumpir al AT |
| Toast container (warning/error) | `alert` | `aria-live="assertive"`, `aria-atomic="true"` | Interrumpe inmediatamente — urgente |
| `aria-atomic="true"` | — | En el contenedor | Anuncia el mensaje completo, no fragmentos |
| Botón de cierre | `button` | `aria-label="Cerrar notificación"` | Ícono × necesita label textual |
| Botón de acción | `button` | `aria-label="Deshacer envío"` (descriptivo) | "Deshacer" solo es ambiguo; incluir contexto |
| Viewport (contenedor de todos los toasts) | — | `aria-live` region siempre en DOM | Persiste aunque no haya toasts visibles |

**Regla crítica:** NO usar `role="alert"` (assertive) para confirmaciones de éxito. Interrumpe al AT innecesariamente. Usar `role="status"` (polite) para neutral/info/success, `role="alert"` solo para warning/error.

### Keyboard navigation

Primary interactions (affect design):

```
Tab          → foco al botón de acción (si Has Action=true)
Tab          → foco al botón × (si Has Close=true)
Enter/Space  → activa el botón enfocado
Escape       → cierra el toast (equivalente a ×)
```

Secondary interactions (dev reference):

```
F8 (Radix pattern) → foco al viewport de toasts para acceder todos los activos
Shift+Tab          → navega en orden inverso entre botones del toast
```

---

## Content guide

### Slot: message (required)
El mensaje principal del toast. Máximo 2 líneas. Debe ser:
- **Concreto:** "3 archivos eliminados" no "Operación completada"
- **Sin puntuación final** cuando es una frase corta de confirmación: "Cambios guardados"
- **Con puntuación final** cuando es una oración completa: "No se pudo conectar con el servidor."
- **Sin HTML ni markdown** — texto plano únicamente

Ejemplos buenos:
- "Acción completada exitosamente"
- "No se pudo guardar el archivo"
- "3 mensajes movidos a Spam"
- "Invitación enviada a equipo@empresa.com"

Ejemplos malos:
- "¡Éxito!" — demasiado vago
- "Ocurrió un error. Por favor verifica tu conexión e intenta nuevamente en unos momentos." — demasiado largo para un toast

### Slot: action (Has Action=true)
Etiqueta del botón de acción. Debe ser:
- **Específico y corto:** "Deshacer", "Ver", "Reintentar", "Abrir"
- **Verbo en imperativo**
- **Máximo 2 palabras** para no romper el layout

### Slot: icon (Has Icon=true)
El ícono es determinado por el `Variant` — no es customizable por el designer en un frame individual. El ícono se genera automáticamente según la tabla de variantes.

### Slot: close (Has Close=true)
Solo el ícono ×. No customizable visualmente. El `aria-label` es siempre "Cerrar notificación" (o su equivalente localizado).

---

## Pre-build checklist

```
Figma
□ 5 frames base: uno por Variant (neutral, info, success, warning, error)
□ Booleans: Has Icon, Has Action, Has Close (combinaciones 2×2×2 = 8 visibles)
□ Text properties: Message, Action label
□ Fondo oscuro consistente en todos los variants (#212124 aprox.)
□ Íconos semánticos correctos por variant (check-circle, alert-triangle, etc.)
□ Colores de ícono diferenciados por variant (no solo forma, también color)
□ Botón de acción: estilo texto claro sobre fondo oscuro
□ Botón ×: ícono solo con aria-label documentado en specs
□ Min/max width documentados (280–480px)
□ Sombra elevation/3 aplicada

Accesibilidad
□ Role documentado por tipo: status (neutral/info/success), alert (warning/error)
□ aria-atomic="true" documentado
□ aria-label en botón × = "Cerrar notificación"
□ aria-label descriptivo en botón de acción (con contexto, no solo "Deshacer")
□ Regla de no auto-dismiss cuando Has Action=true documentada en specs

Contenido
□ Mensaje de ejemplo representativo en el frame base
□ Máximo 2 líneas de texto documentado
□ Regla: errores críticos → Banner, no Toast documentada
□ Duración mínima 5000ms documentada para handoff
```

---

## Related components

```
Banner         → notificación persistente inline para errores críticos y estado del sistema
Badge          → indicador de estado compacto, no efímero
Alert          → feedback inline dentro de formularios o secciones de contenido
Dialog/Modal   → cuando se requiere acción obligatoria del usuario antes de continuar
Progress       → para feedback de operaciones largas en progreso
Tooltip        → feedback de contexto mínimo (no semántico, no para acciones)
```

---

## Reference: how other systems do it

### Material Design 3 — Snackbar minimalista con durations fijas

MD3 llama a este componente "Snackbar" en lugar de Toast. Es el patrón más minimalista: un solo mensaje de texto con máximo una acción, posición fija bottom-center, y tres duraciones fijas (SHORT=2s, LONG=3.5s, INDEFINITE). La duración INDEFINITE es requerida cuando hay una acción — el usuario debe tener tiempo para interactuar. Sin variants semánticos ni stacking — minimalismo deliberado para contextos consumer mobile. El enfo de enum para duration elimina los errores de developer que pondrían `duration: 800ms` violando WCAG.

### Spectrum / Adobe — Priority queue y enforcement de mínimos

El sistema de toast de Spectrum resuelve el problema de flood de notificaciones específico de Adobe: múltiples operaciones async concurrentes (render, export, upload) disparan notificaciones simultáneamente. Una priority queue de 8 niveles asegura que los toasts de alta severidad preempten los de baja prioridad. Los toasts con acción nunca se auto-descartan — es un constraint de API, no una guía. Mínimo 5–6 segundos de display time aplicado en la API (developer no puede poner menos). Auto-dismiss se pausa cuando el foco de teclado entra al área del toast para cumplir WCAG 2.2. Cuatro variants semánticos con íconos obligatorios — el dual encoding (color + ícono) garantiza WCAG 1.4.1.

### Carbon / IBM — Tres componentes separados por interactividad

Carbon resuelve la ambigüedad interactivo/no-interactivo creando tres componentes separados: `ToastNotification` (solo informativo, hover/focus, sin interacción), `InlineNotification` (banner in-page), y `ActionableNotification` (interactive alert con `role="alertdialog"` que trapa foco). Esta separación hace que el rol ARIA correcto sea determinado por el componente elegido, no por configuración — la accesibilidad es correcta por construcción. El `lowContrast` boolean provee variants para fondos oscuros sin que sea un indicador de severidad.

### Polaris / Shopify — Errores van a Banner, no a Toast

La decisión más importante de Polaris es qué NO usar en toast: los errores deben usar Banner porque en contextos de comercio, una notificación de error que desaparece significa un pedido perdido o un pago fallido. Los toasts usan `aria-live="assertive"` (interrumpe al screen reader inmediatamente) porque el contenido transitorio que desaparece debe anunciarse urgentemente. Las acciones de toast deben existir también en otro lugar de la página — el toast es un shortcut, no el único camino. Esta es la separación semántica que adoptamos para la decisión de diseño "errores críticos → Banner".

### Atlassian — Flags con múltiples acciones

Atlassian llama al componente "Flag" y separa el comportamiento de auto-dismiss en un componente distinto (`AutoDismissFlag`) en lugar de un prop. El `FlagGroup` gestiona stacking y animaciones en todos los productos Atlassian. Los Flags pueden tener múltiples acciones (array `actions: []`) a diferencia del límite de una acción de MD3 — apropiado para enterprise donde el contexto puede requerir varias opciones. La apariencia "discovery" sirve para educación de features via el sistema de notificaciones. Timeout fijo de 8s en AutoDismissFlag sin customización.

### shadcn/ui con Sonner — Stack and expand

shadcn/ui recomienda Sonner (librería de terceros) como toast. El stack/expand UX — múltiples toasts apilados que se expanden en hover — resuelve el problema de flood de notificaciones de forma visual. Los promise-based toasts (`toast.promise()`) muestran estado pending, transicionando automáticamente a success o error. Este patrón de loading → outcome es el más elegante para operaciones async. La API programática desde cualquier lugar del código es el patrón arquitectural correcto.

### Radix UI — Viewport con F8 hotkey

Radix provee la estructura de toast más accesible por teclado: `Toast.Provider` + `Toast.Viewport` + toasts individuales. El hotkey F8 enfoca el Viewport, permitiendo a usuarios de teclado acceder cualquier toast — incluso los que se auto-descartan — via el hotkey. `Toast.Action` requiere un prop `altText` que provee contexto sin referencia visual ("Deshacer mover a archivo" en lugar de solo "Deshacer"). La arquitectura Provider/Viewport es el patrón React correcto para infraestructura de toast.

### Fluent 2 / Microsoft — politeness explícita

El `useToastController` hook de Fluent 2 con `dispatchToast()`/`dismissToast()`. La API más correcta arquitecturalmente en T3: un prop explícito `politeness` ("assertive" / "polite" / "off") permite override del mapeo role→urgency por defecto cuando una notificación específica requiere diferente urgencia. `intent` mapea al sistema de color semántico de Fluent. `timeout: -1` para toasts persistentes — valor centinela explícito en lugar de `0` o `Infinity`.

---

## Tokens

**10 tokens** · prefix `tst-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `tst/bg` | `surface/inverse` | Fondo oscuro del toast (todos los variants) |
| `tst/fg` | `text/inverse` | Color del mensaje de texto |
| `tst/close-color` | `text/inverse/secondary` | Color del ícono × |
| `tst/action-color` | `interactive/inverse` | Color del botón de acción |
| `tst/radius` | `radius/md` | Border radius del toast |
| `tst/info/icon` | `status/info/fg` | Color del ícono variant info |
| `tst/success/icon` | `status/success/fg` | Color del ícono variant success |
| `tst/warning/icon` | `status/warning/fg` | Color del ícono variant warning |
| `tst/error/icon` | `status/error/fg` | Color del ícono variant error |
| `focus/ring` | `border/focus` | Ring en botones de acción/cierre |

### Spacing specs

```
Dimensiones del toast:
  Min width:        280px
  Max width:        480px
  Padding vertical: 12px
  Padding horizontal: 16px
  Gap interno:      12px (entre ícono, mensaje, acción, ×)
  Border radius:    8px (radius/md)
  Sombra:           elevation/3

Tipografía:
  Font size:        14px (type/md)
  Line height:      20px
  Font weight:      400 (regular)

Ícono semántico:
  Size:             20px (iconSize/md)
  Alignment:        center vertical con primera línea del mensaje

Botón ×:
  Size del ícono:   16px (iconSize/sm)
  Touch target:     24×24px mínimo
  Padding:          4px

Botón de acción:
  Font size:        14px
  Font weight:      500 (medium)
  Padding H:        4px (solo texto, sin fondo)

Stack de toasts:
  Gap entre toasts: 8px
  Máximo visible:   3 toasts
```
