# Banner

## Descripción general

Banner es el mensaje persistente de sistema del sistema de diseño: ocupa el ancho completo de su contexto (page o sección), permanece visible hasta que el usuario lo descarta o el sistema lo resuelve, y comunica estados críticos o importantes que requieren atención. Es el componente adecuado para errores que bloquean el flujo, advertencias de configuración, avisos de sistema, y confirmaciones importantes — todos escenarios donde un Toast efímero sería insuficiente porque el usuario necesita tiempo para leer, comprender, y actuar.

```
Placement=page (ancho de página, sin radius, sin borde externo):
┌──────────────────────────────────────────────────────────────────┐
│ ▌ ⚠  Tu sesión expirará en 15 minutos.    [Extender sesión]     │  bg: warning/bg
└──────────────────────────────────────────────────────────────────┘

Placement=inline (dentro de sección, con radius y borde):
┌───────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────┐   │
│ │ ▌ ✗  Error al cargar los datos.  [Reintentar]  [×]  │   │  bg: error/bg
│ └─────────────────────────────────────────────────────┘   │  border-left: 4px
└───────────────────────────────────────────────────────────┘  radius: 8px

Variants (4) × Placement (2):
┌──────────────────────────────────────────────────────────────────┐
│  info     bg:azul-claro    │  warning  bg:naranja-claro           │
│  error    bg:rojo-claro    │  success  bg:verde-claro             │
└──────────────────────────────────────────────────────────────────┘

Estructura interna:
│ [icon] │ [Has Title] [description] │ [Has Action] │ [Has Close] │
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Variant   → info | warning | error | success
Placement → page | inline
```

Toggles:

```
👁 Has Title  → muestra/oculta el título en negrita (default: off)
👁 Has Icon   → muestra/oculta el ícono semántico (default: on)
👁 Has Action → muestra/oculta el botón de acción (default: off)
👁 Has Close  → muestra/oculta el botón × (default: off)
```

Textos editables:

```
✏️ Title       → "Título del banner"
✏️ Description → "Descripción del mensaje del sistema."
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────────────┐
│  Banner                                                          │
│  ──────────────────────────────────────────────────────────────  │
│  Variant    [ info            ▼ ]                                │
│  Placement  [ page            ▼ ]                                │
│  ──────────────────────────────────────────────────────────────  │
│  👁 Has Title   [ off ]                                          │
│  👁 Has Icon    [ on ]                                           │
│  👁 Has Action  [ off ]                                          │
│  👁 Has Close   [ off ]                                          │
│  ✏️ Title        [ Título del banner                          ]  │
│  ✏️ Description  [ Descripción del mensaje del sistema.       ]  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito comunicar un mensaje persistente que el usuario debe ver?
                    │
                    ▼
       ¿El mensaje es resultado de una acción del usuario?
       ├── Sí, resultado inmediato → Toast (efímero)
       └── No (estado del sistema o configuración) → Banner
                    │
                    ▼
       ¿Dónde vive el mensaje en el layout?
       ├── Afecta toda la página (error global, aviso de sistema) → Placement=page
       └── Afecta solo una sección (error de formulario, aviso de módulo) → Placement=inline
                    │
                    ▼
       ¿El usuario puede descartarlo?
       ├── Error crítico → Has Close=false (no dismissible — debe resolver)
       ├── Advertencia → Has Close=true (puede ignorarlo)
       └── Info/success → Has Close=true (informativo, descartable)
```

**Usar Banner cuando:**
- Aviso de expiración de sesión ("Tu sesión expirará en 15 minutos — Extender")
- Error de carga de datos en una sección específica (Placement=inline, Variant=error)
- Aviso de mantenimiento programado en toda la aplicación (Placement=page, Variant=info)
- Confirmación de acción importante que el usuario debe notar (éxito de exportación)
- Validación de formulario a nivel de formulario (no por campo) (Placement=inline, error)

**NO usar Banner cuando:**
- El mensaje es el resultado inmediato de una acción del usuario → usar `Toast`
- Se necesita confirmación explícita del usuario (botón "Aceptar" bloqueante) → usar `Modal`
- El mensaje es una notificación de actividad de otro usuario → usar `Notification`
- Se necesita contenido muy rico (múltiples párrafos, imágenes) → usar un Card o Section
- El contexto es un campo de formulario individual → usar mensajes de validación del Input

---

## Variaciones visuales

### Variant

| Variant | Background | Border/acento | Ícono | Role ARIA | Uso |
|---------|-----------|--------------|-------|----------|-----|
| info    | status/info/bg (azul claro) | status/info/border (azul) | info-circle | `status` (polite) | Información, avisos de sistema, actualizaciones |
| warning | status/warning/bg (naranja claro) | status/warning/border (naranja) | alert-triangle | `alert` (assertive) | Advertencias: expiración, límites, configuración |
| error   | status/error/bg (rojo claro) | status/error/border (rojo) | alert-circle | `alert` (assertive) | Errores de carga, errores de formulario críticos |
| success | status/success/bg (verde claro) | status/success/border (verde) | check-circle | `status` (polite) | Confirmaciones importantes (exportación, publicación) |

### Placement

| Placement | Layout | Radius | Borde | Uso |
|-----------|--------|--------|-------|-----|
| page | Ancho 100%, sin radius, sticky posible | 0px | Sin borde externo | Avisos de sistema a nivel de toda la app/página |
| inline | Ancho 100% dentro de sección, con radius | 8px | 1px borde + 4px border-left acento | Mensajes de sección, errores de formulario |

---

## Decisiones de diseño

**1. Placement=page|inline (no size)** — La diferencia visual clave entre usos no es el tamaño sino el contexto de layout: page-level es full-width sin esquinas (toca los bordes), inline tiene radius y borde para "pertenece a esta sección". Polaris hace la misma distinción (Page vs. Section banner). Esta es la única dimensión que realmente cambia el diseño.

**2. role=alert para error/warning, role=status para info/success** — Alertas de error o warning deben interrumpir el screen reader inmediatamente (assertive) — son urgentes. Mensajes informativos o de confirmación no deben interrumpir la lectura en curso (polite). Esta distinción es el estándar de WAI-ARIA y la siguen Polaris, Atlassian, y Chakra.

**3. Has Close=false por defecto para error** — Polaris enforcea este patrón: errores críticos no son dismissibles. Si el usuario tiene un error de carga, no puede simplemente cerrarlo y seguir trabajando — necesita resolverlo (reintentando, corrigiendo, o contactando soporte). Para warning e info/success, Has Close=true permite al usuario acusar recibo y seguir.

**4. Placement=page es sticky (posible)** — Un banner de aviso de expiración de sesión o mantenimiento debe seguir visible al hacer scroll. El developer implementa `position: sticky; top: 0`. En Figma, modelar en el top del artboard para comunicar la intención.

**5. Sin neutral variant** — Banner es semánticamente explícito. Un mensaje "neutral" en el flujo de la página genera confusión — ¿es informativo? ¿urgente? Los 4 variants cubren todos los casos reales: siempre hay un tono semántico para el contexto del banner. Para contenido sin semántica, usar Typography o Card.

### Combinaciones excluidas

```
Variant=error + Has Close=true → ✗ errores críticos no deberían ser dismissibles
                                   (Polaris pattern — developer puede override en casos
                                   donde el error es recuperable)
```

---

## Comportamiento

### Esencial para diseño

- **Placement=page es sticky** — el banner de página debe seguir visible al hacer scroll hacia abajo. Esto es crítico para avisos de expiración de sesión o errores de conectividad que el usuario necesita ver en cualquier momento.
- **Sin focus trap** — Banner es inline en el flujo del documento. El usuario puede Tab sobre los elementos interactivos (Close, Action) pero el foco no queda atrapado en el banner.
- **Placement=inline en formularios** — cuando hay errores de validación a nivel de formulario completo (no por campo), usar Banner/inline/error sobre el formulario para resumir los errores. Además, cada campo inválido tiene su propio mensaje de error.
- **Has Title para mensajes complejos** — cuando el banner tiene Has Action y el mensaje necesita más contexto, Has Title=on permite estructurar: título corto + descripción detallada. Para mensajes simples de una frase, Has Title=off.
- **Ícono siempre aria-hidden** — el ícono es decorativo (el color del fondo y el texto comunican la semántica). `aria-hidden="true"` en el ícono evita que el SR lo anuncie como elemento separado.

### Accesibilidad (ARIA)

| Caso | Implementación | Por qué importa |
|------|---------------|----------------|
| Variant warning/error | `role="alert"` + `aria-live="assertive"` | SR interrumpe y anuncia inmediatamente |
| Variant info/success | `role="status"` + `aria-live="polite"` | SR anuncia al terminar la lectura en curso |
| Has Icon | `aria-hidden="true"` en el icono | El ícono es decorativo — el color y texto comunican |
| Has Close | `<button aria-label="Cerrar aviso">×</button>` | × solo no es descriptivo |
| Has Action | Botón con label descriptivo de la acción | "Extender sesión" no "Clic aquí" |
| Placement=page sticky | `aria-live` activo al aparecer | SR anuncia el banner cuando se inserta en DOM |
| Has Title | `aria-labelledby="[title-id]"` si hay title | SR asocia descripción con el título |

### Navegación por teclado

```
Tab         → navega hacia los elementos interactivos dentro del banner
Tab         → mueve entre Has Action y Has Close
Enter/Space → activa el elemento enfocado
Escape      → cierra el banner (solo si Has Close=true)

Banner NO roba foco al aparecer (inline en documento).
```

---

## Guía de contenido

**Description (mensaje principal):**
- Conciso: máximo 2 líneas — si necesita más, el mensaje es muy complejo para un banner
- Voz activa: "No se pudieron cargar los datos" no "Los datos no han podido ser cargados"
- Para error: describir qué ocurrió + qué puede hacer el usuario: "Error al conectar con el servidor. Verifica tu conexión e intenta de nuevo."
- Para warning: describir la situación + consecuencia + acción: "Tu suscripción expira el 30 de abril. Renueva para evitar interrupciones del servicio."
- Para info: ser directo: "Mantenimiento programado el 25 de mayo de 10:00 a 12:00 (UTC-5)."

**Has Title (cuando se activa):**
- Resumir el tipo de mensaje: "Error de conexión", "Suscripción por expirar"
- Máximo 1 línea — título corto + descripción detallada es el patrón correcto
- No repetir el mismo texto del ícono (el ícono ya comunica el tipo)

**Has Action — etiqueta del botón:**
- Verbo + objeto específico: "Extender sesión", "Reintentar", "Ver detalles", "Actualizar plan"
- Evitar genéricos: "OK", "Continuar", "Hacer clic aquí"

**Variant vs. mensaje:**
- `error` → algo falló y necesita atención: sistema, carga de datos, validación crítica
- `warning` → algo va a pasar o está en riesgo: expiración, límite, configuración
- `info` → aviso informativo: mantenimiento, novedad, cambio de política
- `success` → confirmación importante: publicación exitosa, exportación lista

---

## Pre-build checklist

```
□ ¿role="alert" para warning/error?
□ ¿role="status" para info/success?
□ ¿El ícono tiene aria-hidden="true"?
□ ¿Has Close tiene aria-label descriptivo?
□ ¿Has Action tiene label descriptivo (no "OK")?
□ ¿Variant=error tiene Has Close=false (no dismissible)?
□ ¿Placement=page es sticky (position: sticky; top: 0)?
□ ¿Placement=inline aparece sobre el contenido afectado?
□ ¿El mensaje es conciso (máximo 2 líneas)?
□ ¿Sin focus trap?
```

---

## Componentes relacionados

```
Toast        → para mensajes efímeros resultado de acciones del usuario (< 1 frase, 5s)
Notification → para mensajes estructurados en panels de notificaciones
Modal        → para confirmaciones que requieren acción explícita del usuario
Input        → mensajes de validación por campo individual (no Banner)
Alert        → alias inline de Banner para mensajes de validación en formularios
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Placement | Variants | Dismissible | Border-left | Diferenciador |
|---------|-------|-----------|----------|------------|-------------|--------------|
| **Material Design 3** | No Banner standalone | — | — | — | — | Snackbar + AlertDialog; sin banner persistente |
| **Spectrum (Adobe)** | InlineAlert | inline only | 4 semantic | No | No | informative/positive/notice/negative; No dismiss |
| **Carbon (IBM)** | InlineNotification / ActionableNotification | inline | 4 semantic | Sí | Sí (borde L) | ActionableNotification con botón; subtitle |
| **Polaris (Shopify)** | Banner | page + section | info/success/warning/critical | Sí (warning/info) / No (critical) | No (bg tinted) | Page vs. Section context; enforcea no-dismiss en critical |
| **Atlassian** | Banner + SectionMessage | page + section | 5 types | Sí | No (SectionMessage: icon) | Banner (page) y SectionMessage (section) separados |
| **Ant Design** | Alert | inline | 4 semantic | Sí | Sí (borde L) | closable prop; action slot; showIcon |
| **Twilio Paste** | Alert | inline | 4 semantic | No (manual) | No | Inline only; sin dismiss built-in |
| **Lightning** | LightningAlert | page + inline | 4 semantic | Sí | — | LWC; variant prop; alternate-inverse |
| **Primer (GitHub)** | Flash | inline | 4 semantic | Sí | No (bg) | dismiss prop; Flash.Item para complex |
| **shadcn/ui** | Alert | inline | default + destructive | No | No (radius + bg) | AlertDescription + AlertTitle; sin dismiss |
| **Chakra UI** | Alert | inline | 4 semantic | No | Sí (variant=left-accent) | 4 alert status variants: subtle/solid/left-accent/top-accent |
| **Fluent 2** | MessageBar | page + inline | 4 semantic + neutral | Sí | No | intent + layout + politeness props; actions slot |
| **Mantine** | Alert | inline | color libre | Sí | No | withCloseButton; icon customizable; color prop libre |
| **Orbit (Kiwi)** | Alert | inline | 4 semantic | Sí | No | Domain-specific booking alerts |
| **Evergreen** | InlineAlert | inline | 4 semantic | No | No | Minimal; intent prop |
| **Nord** | nord-alert | inline + page | 4 semantic | Sí | No | Healthcare; WCAG a11y first |

**Patrones clave de la industria:**
1. **page + inline distinction** — Solo Polaris (Page vs Section), Atlassian (Banner vs SectionMessage), Carbon (con context prop), y Fluent 2 (layout prop) hacen la distinción explícita. La mayoría solo tiene inline. La distinción es valiosa porque page es sticky y tiene implicaciones de layout diferentes.
2. **Border-left como acento semántico** — Carbon, Ant Design, y Chakra (left-accent variant) usan borde izquierdo de color. Polaris y shadcn usan fondo tinted. El borde izquierdo crea jerarquía visual sin invadir el espacio de lectura.
3. **No-dismiss para errores críticos** — Solo Polaris lo enforcea explícitamente. Carbon y Atlassian lo recomiendan. El patrón es válido y se basa en que errores críticos deben resolverse, no ignorarse.
4. **role=alert vs status** — Carbon, Polaris, Atlassian y Fluent 2 distinguen entre interrumpe (alert) y polite (status). La mayoría usa `role="alert"` para todos los tipos — incorrecto para info/success.

---

## Tokens

**18 tokens** · prefijo `bnr-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `bnr-info-bg` | `status/info/bg` | Background info |
| `bnr-info-border` | `status/info/border` | Borde externo info |
| `bnr-info-icon` | `status/info/fg` | Ícono info |
| `bnr-warning-bg` | `status/warning/bg` | Background warning |
| `bnr-warning-border` | `status/warning/border` | Borde externo warning |
| `bnr-warning-icon` | `status/warning/fg` | Ícono warning |
| `bnr-error-bg` | `status/error/bg` | Background error |
| `bnr-error-border` | `status/error/border` | Borde externo error |
| `bnr-error-icon` | `status/error/fg` | Ícono error |
| `bnr-success-bg` | `status/success/bg` | Background success |
| `bnr-success-border` | `status/success/border` | Borde externo success |
| `bnr-success-icon` | `status/success/fg` | Ícono success |
| `bnr-title-color` | `text/primary` | Color del título |
| `bnr-body-color` | `text/secondary` | Color del body/descripción |
| `bnr-close-color` | `text/secondary` | Color del botón × |
| `bnr-radius` | `radius/md` | Border radius inline — 8px |
| `bnr-icon-size` | `iconSize/md` | Tamaño del ícono — 20px |
| `focus-ring` | `border/focus` | Focus ring en elementos interactivos |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Placement=page:                                         │
│  w: 100% · radius: 0 · borde: 0 (solo borde-left 4px)  │
│  py: 12px · px: 16px · gap: 12px                        │
│                                                          │
│  Placement=inline:                                       │
│  w: 100% · radius: 8px · borde: 1px + borde-left: 4px  │
│  py: 12px · px: 16px · gap: 12px                        │
│                                                          │
│  Tipografía:                                             │
│  title: 14px/600/20px · text/primary                   │
│  body: 14px/400/20px · text/secondary                  │
│  ícono: 20px                                            │
│                                                          │
│  Frames totales:                                         │
│  Variant(4) × Placement(2) = 8 frames                  │
└──────────────────────────────────────────────────────────┘
```
