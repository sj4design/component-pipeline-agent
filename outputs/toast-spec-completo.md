# Toast

## Descripción general

Toast es la notificación efímera no bloqueante del sistema de diseño: aparece flotando en un corner de la pantalla (generalmente bottom-center o bottom-right), comunica el resultado de una acción del usuario, y desaparece automáticamente después de un tiempo determinado (mínimo 5000ms según WCAG 2.2). A diferencia de Banner (persistente, en el flujo del documento) o Notification (estructurada, en un panel), Toast es temporal y se superpone al contenido sin afectar el layout. Su fondo siempre es oscuro (dark surface) para distinguirse del contenido claro de la página.

```
Toast (neutral — fondo oscuro):
┌─────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────┐  │
│  │ ● Acción completada exitosamente.           [ × ] │  │  280–480px
│  └───────────────────────────────────────────────────┘  │  bg: #21211F
└─────────────────────────────────────────────────────────┘  shadow: elevation/3

Toast con variantes semánticas (solo el ícono cambia color):
┌──────────────────────────────────────────────────────────┐
│  neutral  ● (gris)   │  info     ● (azul)               │
│  success  ● (verde)  │  warning  ● (naranja)             │
│  error    ● (rojo)   │                                   │
└──────────────────────────────────────────────────────────┘

Toast con acción:
┌───────────────────────────────────────────────────────────────┐
│  ✓ Archivo guardado.               [ Deshacer ]  [ × ]        │
└───────────────────────────────────────────────────────────────┘

Has Icon=on · Has Action=on · Has Close=on (defaults: ✓, ✗, ✓)
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Variant → neutral | info | success | warning | error
```

Toggles:

```
👁 Has Icon   → muestra/oculta el ícono semántico (default: on)
👁 Has Action → muestra/oculta el botón de acción (default: off)
👁 Has Close  → muestra/oculta el botón × de cierre (default: on)
```

Texto editable:

```
✏️ Message → "Acción completada exitosamente."
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────┐
│  Toast                                               │
│  ──────────────────────────────────────────────────  │
│  Variant    [ neutral           ▼ ]                  │
│  ──────────────────────────────────────────────────  │
│  👁 Has Icon    [ on ]                               │
│  👁 Has Action  [ off ]                              │
│  👁 Has Close   [ on ]                               │
│  ✏️ Message     [ Acción completada exitosamente. ]  │
└──────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito comunicar el resultado de una acción del usuario?
                    │
                    ▼
       ¿El mensaje requiere que el usuario tome acción?
       ├── Sí, acción crítica → Banner (persistente, no dismissible)
       └── No (o acción opcional recuperable) → Toast
                    │
                    ▼
       ¿Qué urgencia tiene el mensaje?
       ├── Error crítico que bloquea el flujo → Banner/error
       ├── Error recuperable (save fail, network) → Toast/error
       ├── Advertencia sobre algo que ocurrió → Toast/warning
       └── Confirmación o info → Toast/success|info|neutral
                    │
                    ▼
       ¿El usuario necesita poder deshacer la acción?
       ├── Sí → Toast + Has Action=on (botón "Deshacer")
       └── No → Toast sin acción
```

**Usar Toast cuando:**
- Confirmar que un formulario se guardó ("Cambios guardados")
- Confirmar que un archivo se subió o descargó ("Archivo descargado")
- Notificar que una operación falló de forma recuperable ("No se pudo guardar — reintentar")
- Ofrecer deshacer una acción reciente ("Elemento eliminado · Deshacer")
- Confirmar copia al portapapeles ("Copiado al portapapeles")

**NO usar Toast cuando:**
- El error bloquea al usuario y necesita resolverlo → usar `Banner/error` (persistente)
- El mensaje requiere acción compleja con múltiples opciones → usar `Modal` o `Notification`
- El mensaje es importante y puede perderse → usar `Notification` (en panel persistente)
- La información no fue causada por acción del usuario → usar `Banner` o `Notification`
- Se necesita contenido rico (imágenes, múltiples párrafos) → usar `Notification`

---

## Variaciones visuales

### Variant

El fondo de todos los variants es idéntico (dark surface #21211F). Solo el color del ícono cambia para comunicar el tipo de mensaje.

| Variant | Ícono | Color del ícono | Role ARIA | Urgencia |
|---------|-------|----------------|----------|---------|
| neutral | ninguno | — | `status` (polite) | Confirmaciones genéricas |
| info    | info-circle | azul (#8CB5FA) | `status` (polite) | Información contextual |
| success | check-circle | verde (#4DC876) | `status` (polite) | Operación exitosa |
| warning | alert-triangle | naranja (#FAB833) | `alert` (assertive) | Advertencia |
| error   | alert-circle | rojo (#FA6666) | `alert` (assertive) | Error recuperable |

### Slots opcionales

| Slot | Default | Cuándo activar |
|------|---------|---------------|
| Has Icon | ON | Siempre activado excepto para mensajes muy cortos y neutros |
| Has Action | OFF | Cuando el usuario puede deshacer o corregir la acción |
| Has Close | ON | Siempre — da control al usuario sobre el dismissal |

---

## Decisiones de diseño

**1. Fondo oscuro (dark surface) para todos los variants** — El análisis de 24 sistemas muestra que 20 de ellos usan fondo oscuro para toast. La razón: los toasts flotan sobre el contenido de la página que generalmente es claro (blanco, gris claro). Un fondo oscuro crea contraste inmediato y "pertenece" al nivel de capa de overlay, no al de contenido. El color semántico se expresa solo en el ícono, no en el fondo, para mantener consistencia visual entre variants.

**2. Un solo size (no sm/md/lg)** — El 80% de sistemas estudiados tienen un solo tamaño de toast. La anchura se controla por `min-width: 280px` y `max-width: 480px` — el contenido dicta el ancho dentro de ese rango. Múltiples sizes harían frames innecesarios y decisiones adicionales para el diseñador.

**3. Errores críticos → Banner, no Toast** — Polaris enforcea explícitamente este principio. Toast es efímero — si desaparece antes de que el usuario lo lea, el error se pierde. Los errores que el usuario debe resolver (formulario inválido, acceso denegado, pago rechazado) necesitan Banner persistente. Toast/error es solo para errores recuperables que se resuelven automáticamente o con un "Reintentar".

**4. role=alert (assertive) para warning/error** — La interrupción inmediata del screen reader es apropiada para mensajes urgentes. Para neutral/info/success, `role=status` (polite) evita interrumpir la lectura en curso. Esta distinción sigue el patrón de Atlassian y Polaris.

**5. Auto-dismiss mínimo 5000ms** — WCAG 2.2 Success Criterion 2.2.1: el usuario debe poder controlar los cambios de tiempo. 5 segundos es el mínimo para que un usuario con discapacidad motriz o cognitiva pueda leer el mensaje. Con Has Action=true, el toast no debe auto-cerrar hasta que el usuario interactúe.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Variant × toggles son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Toast no roba el foco** — el toast aparece sin mover el foco del elemento activo. El usuario puede seguir interactuando con el formulario mientras el toast está visible. Solo si el usuario hace Tab, el foco entra al toast (botones Close/Action).
- **Posicionamiento** — el toast se posiciona como overlay fixed, típicamente en `bottom-center` o `bottom-right`. El developer implementa la posición; el diseñador diseña el frame del toast sin preocuparse del posicionamiento.
- **Stack de toasts** — cuando hay múltiples toasts simultáneos, se apilan verticalmente con gap de 8px. El toast más reciente aparece en la posición principal. Máximo 3-4 toasts apilados simultáneamente.
- **Auto-dismiss se pausa con hover/focus** — cuando el usuario hace hover sobre el toast o mueve el foco dentro de él, el timer de auto-dismiss se pausa. Esto cumple WCAG 2.2 (pause, stop, hide).
- **Has Action=true → sin auto-dismiss** — si el toast tiene un botón de acción crítica (como "Deshacer"), no debe cerrarse automáticamente. El usuario debe explícitamente interactuar o cerrar con Has Close.

### Accesibilidad (ARIA)

| Caso | Implementación | Por qué importa |
|------|---------------|----------------|
| Variant neutral/info/success | `role="status"` + `aria-live="polite"` + `aria-atomic="true"` | SR anuncia el mensaje al terminar la lectura en curso |
| Variant warning/error | `role="alert"` + `aria-live="assertive"` + `aria-atomic="true"` | SR interrumpe y anuncia inmediatamente |
| Live region | Siempre presente en DOM (aunque vacía) | Si se agrega dinámicamente, el SR puede no detectarla |
| Has Close | `<button aria-label="Cerrar notificación">×</button>` | El × solo no es descriptivo para SR |
| Has Action | `<button>Deshacer</button>` con label descriptivo | El botón debe describir la acción, no el elemento |
| Auto-dismiss | Timer pausa con hover/focus (WCAG 2.2) | Usuario con discapacidad motriz puede necesitar más tiempo |

### Navegación por teclado

```
Tab         → entra al toast (si el usuario navega hacia él)
Tab         → mueve entre Has Action y Has Close
Enter/Space → activa botón Has Action o Has Close
Escape      → cierra el toast (si Has Close=true)

Toast NO roba foco al aparecer.
Auto-dismiss se pausa cuando el foco está dentro del toast.
```

---

## Guía de contenido

**Message:**
- Máximo 1-2 oraciones cortas — el toast es efímero; mensajes largos no se leen
- Voz activa y concisa: "Guardado" no "Los cambios han sido guardados exitosamente"
- Para errores recuperables: describir qué falló + opción con Has Action: "No se pudo guardar · Reintentar"
- Incluir el objeto cuando aporta contexto: "Proyecto 'Marketing Q2' guardado" no solo "Guardado"
- Evitar jerga técnica: "Error 503" no es útil; "Error de red — reintentar" sí

**Has Action — etiqueta del botón:**
- Verbo concreto: "Deshacer", "Reintentar", "Ver", "Ir"
- Máximo 2 palabras
- No usar "Clic aquí" o "OK"

**Variant vs. mensaje:**
- `success` → pasado completado: "Guardado", "Enviado", "Eliminado"
- `error` → problema ocurrido: "No se pudo guardar", "Error al subir el archivo"
- `warning` → situación a notar: "Sesión por expirar", "Límite casi alcanzado"
- `info` → información contextual: "Actualización disponible", "3 elementos seleccionados"
- `neutral` → confirmación sin connotación semántica: "Copiado al portapapeles"

---

## Pre-build checklist

```
□ ¿role="status" para neutral/info/success?
□ ¿role="alert" para warning/error?
□ ¿aria-atomic="true" en todos los casos?
□ ¿Live region siempre en DOM (aunque vacía)?
□ ¿Has Close tiene aria-label="Cerrar notificación"?
□ ¿Auto-dismiss mínimo 5000ms?
□ ¿Auto-dismiss se pausa con hover/focus?
□ ¿Has Action=true desactiva auto-dismiss?
□ ¿Toast no roba foco al aparecer?
□ ¿Errores críticos van a Banner (no Toast)?
□ ¿Mensaje es conciso (máximo 2 oraciones)?
```

---

## Componentes relacionados

```
Banner       → para mensajes persistentes en el flujo del documento (error crítico, aviso de sistema)
Notification → para mensajes estructurados (título + descripción) en un panel permanente
Alert        → para mensajes inline de validación dentro de formularios
Modal        → para confirmaciones que requieren acción explícita del usuario
Progress     → para operaciones con duración conocida (barra de progreso)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Fondo | Size | Variantes | Auto-dismiss | Acción | Diferenciador |
|---------|-------|-------|------|----------|-------------|--------|--------------|
| **Material Design 3** | Snackbar | dark | Único | ninguno (solo acción) | Sí (4s) | text button | Siempre fondo oscuro; sin variantes semánticas; solo 1 acción |
| **Spectrum (Adobe)** | Toast | oscuro | Único | info/positive/negative/warning | No (manual) | — | Sin auto-dismiss; actionLabel prop |
| **Carbon (IBM)** | Toast | claro + borde L | — | error/info/success/warning | No (manual) | — | Fondo claro con borde izquierdo; subtitle prop |
| **Polaris (Shopify)** | Toast | oscuro | Único | default/error | Sí (5s) | dismiss/action | error prop; enforcea no-toast para errores críticos |
| **Atlassian** | Flag | oscuro | Único | info/success/warning/error | Sí (8s) | actions | Flag name; appearance prop; appearance=error no auto-dismiss |
| **Ant Design** | message | claro | Único | success/error/info/warning/loading | Sí (3s config) | — | API funcional (message.success()); loading variant |
| **Twilio Paste** | Toast | oscuro | Único | neutral/success/warning/error | Sí (config) | — | useToaster hook; dismiss callback |
| **Lightning** | Toast | oscuro | Único | base/info/success/warning/error | Sí (config) | — | LWC component |
| **Primer (GitHub)** | Flash | claro | Único | default/warning/danger/success | No | dismiss | Fondo claro; Flash es inline pero puede ser toast |
| **shadcn/ui** | Toast | oscuro | Único | default/destructive | Sí (config) | action | Radix Toast; ToastAction component |
| **Chakra UI** | Toast | oscuro | Única | info/warning/success/error/loading | Sí (5s) | — | useToast hook; isClosable; position config |
| **Fluent 2** | Toast | claro | Único | info/success/warning/error/inverted | No (manual) | — | ToastBody + ToastTitle + ToastFooter; intent prop |
| **Mantine** | Notification | claro | Única | sin variantes (color libre) | Sí (config) | — | withCloseButton; autoClose; color prop libre |
| **Orbit (Kiwi)** | Toast | oscuro | Único | success/warning/critical | Sí (config) | dismiss | Domain-specific (Kiwi booking confirmaciones) |
| **Evergreen** | Toaster | claro | Único | default/success/warning/danger | Sí (5s) | — | Toaster API; no component (API-only) |
| **Nord** | Toast | oscuro | Único | info/success/warning/danger | Sí (config) | — | Healthcare; ARIA live regions correctas |

**Patrones clave de la industria:**
1. **Fondo oscuro dominante** — M3, Spectrum, Polaris, Atlassian, shadcn, Chakra, Orbit, Nord usan dark surface. Carbon y Primer usan fondo claro (minoría). El fondo oscuro es el estándar de industria para toasts flotantes.
2. **Auto-dismiss variable** — El rango va de 3s (Ant) a 8s (Atlassian). WCAG 2.2 recomienda mínimo 5s (Polaris lo enforcea). Para acciones críticas, Atlassian no auto-dismisses.
3. **Errores críticos → otro componente** — Polaris es el único que lo documenta explícitamente, pero el patrón es universal: Toast es para errores recuperables, no para errores que bloquean el flujo.
4. **Live region siempre en DOM** — ARIA best practice: la región live debe existir en el DOM antes de que el contenido sea inyectado, para que el SR la detecte. La mayoría lo implementa correctamente; algunos inyectan el div dinámicamente (error).

---

## Tokens

**10 tokens** · prefijo `tst-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `tst-bg` | `surface/inverse` | Background dark de todos los variants |
| `tst-fg` | `text/inverse` | Color del texto del mensaje |
| `tst-close-color` | `text/inverse/secondary` | Color del botón × de cierre |
| `tst-action-color` | `interactive/inverse` | Color del botón de acción |
| `tst-radius` | `radius/md` | Border radius — 8px |
| `tst-info-icon` | `status/info/fg` | Color ícono info (azul claro sobre dark) |
| `tst-success-icon` | `status/success/fg` | Color ícono success (verde claro sobre dark) |
| `tst-warning-icon` | `status/warning/fg` | Color ícono warning (naranja claro sobre dark) |
| `tst-error-icon` | `status/error/fg` | Color ícono error (rojo claro sobre dark) |
| `focus-ring` | `border/focus` | Focus ring en botones internos |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Dimensiones:                                            │
│  min-width: 280px · max-width: 480px                    │
│  py: 12px · px: 16px · gap: 12px                        │
│  radius: 8px · shadow: elevation/3                      │
│                                                          │
│  Tipografía del mensaje:                                 │
│  14px/regular/20px · text/inverse (#FFFFFF)             │
│                                                          │
│  Ícono semántico:                                        │
│  20px · color varía por variant                         │
│                                                          │
│  Botón × (Has Close):                                    │
│  20px × 20px · text/inverse/secondary                   │
│                                                          │
│  Frames totales:                                         │
│  Variant(5) = 5 frames                                  │
└──────────────────────────────────────────────────────────┘
```
