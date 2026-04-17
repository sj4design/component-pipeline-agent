# Notification

## Descripción general

Notification es el mensaje de sistema estructurado del sistema de diseño: más rico y persistente que Toast, tiene título + descripción + acciones + avatar opcionales. Se usa para eventos del sistema, actividad de usuarios, o mensajes que requieren más contexto que una sola línea. A diferencia de Toast (overlay efímero, fondo oscuro, bottom corner), Notification vive en panels, feeds de actividad, o drawers de notificaciones — persiste hasta que el usuario la descarta explícitamente. Su fondo es blanco con un borde izquierdo de color de acento para comunicar la variante semántica.

```
Notification (estructura completa):
┌──────────────────────────────────────────────────────────┐
│ ╔═══════════════════════════════════════════════════════╗ │
│ ║ ● │  Título de la notificación              [×]      ║ │  w: 360px
│ ║   │  Descripción adicional del evento del sistema.   ║ │  py: 16px · px: 16px
│ ║   │  [Acción primaria]  [Acción secundaria]          ║ │  border-left: 4px acento
│ ╚═══════════════════════════════════════════════════════╝ │
└──────────────────────────────────────────────────────────┘

Variants — solo el borde izquierdo y ícono cambian:
┌─────────────────────────────────────────────────────────┐
│  info      │▌ ● azul   │  success   │▌ ● verde          │
│  warning   │▌ ● naranja│  error     │▌ ● rojo           │
│  discovery │▌ ● violeta│                                │
└─────────────────────────────────────────────────────────┘

Con Has Avatar (actividad de usuario):
┌──────────────────────────────────────────────────────────┐
│  [👤]  Pedro te invitó a una reunión.        [×]         │  avatar: 36px
│        Hoy · 14:32  [Ver reunión]                        │
└──────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Variant → info | success | warning | error | discovery
```

Toggles:

```
👁 Has Icon        → muestra/oculta el ícono semántico (default: on)
👁 Has Description → muestra/oculta el texto descriptivo (default: on)
👁 Has Actions     → muestra/oculta los botones de acción (default: off)
👁 Has Close       → muestra/oculta el botón × (default: on)
👁 Has Avatar      → muestra/oculta el avatar de usuario (default: off)
```

Textos editables:

```
✏️ Title       → "Título de la notificación"
✏️ Description → "Descripción adicional del evento del sistema."
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────────────┐
│  Notification                                                    │
│  ──────────────────────────────────────────────────────────────  │
│  Variant   [ info              ▼ ]                               │
│  ──────────────────────────────────────────────────────────────  │
│  👁 Has Icon        [ on ]                                       │
│  👁 Has Description [ on ]                                       │
│  👁 Has Actions     [ off ]                                      │
│  👁 Has Close       [ on ]                                       │
│  👁 Has Avatar      [ off ]                                      │
│  ✏️ Title         [ Título de la notificación              ]     │
│  ✏️ Description   [ Descripción adicional del evento.     ]     │
└──────────────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El mensaje del sistema tiene título + descripción + posibles acciones?
                    │
                    ▼
       ¿El mensaje fue generado por un evento del sistema (no por acción del usuario)?
       ├── Sí → Notification (en panel/feed)
       └── No (resultado de acción) → Toast (efímero)
                    │
                    ▼
       ¿La notificación involucra actividad de otro usuario?
       ├── Sí → Notification + Has Avatar=on
       └── No → Notification sin avatar
                    │
                    ▼
       ¿El mensaje necesita que el usuario lo vea pero no es urgente?
       ├── Urgente/crítico → Banner (inline, en el flujo del documento)
       └── Informativo/persistente → Notification (en panel o feed)
```

**Usar Notification cuando:**
- Notificaciones de actividad en un panel: "María comentó en tu documento"
- Alertas de sistema persistentes: "Tu suscripción expira en 3 días"
- Confirmaciones con detalles: "Tu exportación está lista — descarga disponible"
- Mensajes de onboarding o discovery: "Nueva función disponible: Zoom Clips"
- Feed de notificaciones en un drawer o sidebar

**NO usar Notification cuando:**
- El mensaje es el resultado inmediato de una acción del usuario → usar `Toast`
- El error bloquea el flujo actual → usar `Banner/error` (inline)
- El mensaje es muy simple (una línea) → usar `Toast`
- Se necesita confirmación modal (acción destructiva) → usar `Modal`

---

## Variaciones visuales

### Variant

Todos los variants tienen fondo blanco con borde izquierdo de acento (4px). Solo el color del borde y del ícono cambian.

| Variant   | Border-left | Ícono | Role ARIA | Uso |
|-----------|-------------|-------|----------|-----|
| info      | azul (#264EEB) | info-circle (azul) | `status` (polite) | Información, actualizaciones, novedades |
| success   | verde (#0E8C38) | check-circle (verde) | `status` (polite) | Confirmaciones de operaciones |
| warning   | naranja (#B87A0D) | alert-triangle (naranja) | `alert` (assertive) | Situaciones que requieren atención |
| error     | rojo (#DC2626) | alert-circle (rojo) | `alert` (assertive) | Errores y problemas a resolver |
| discovery | violeta (#7238BF) | sparkle (violeta) | `status` (polite) | Onboarding, nuevas features, anuncios |

### Slots opcionales

| Slot | Default | Cuándo activar |
|------|---------|---------------|
| Has Icon | ON | Activar siempre que sea Variant semántico |
| Has Description | ON | Desactivar solo cuando el título solo es suficiente |
| Has Actions | OFF | Cuando hay una acción que el usuario puede tomar |
| Has Close | ON | Siempre — da control al usuario |
| Has Avatar | OFF | Solo para notificaciones de actividad de otros usuarios |

---

## Decisiones de diseño

**1. Fondo blanco con borde izquierdo de acento** — Notification es más persistente que Toast — vive en panels y feeds, no como overlay flotante. Fondo blanco con `border-left: 4px` de color semántico es el patrón de Atlassian Flag y Ant Notification — diferencia visualmente la urgencia sin usar fondos de color (que pueden ser estridentes en un feed largo con múltiples notificaciones).

**2. Variant=discovery (5to variant)** — Solo Atlassian en T1 tiene el concepto de "discovery" notification. Para un producto como Zoom con onboarding continuo y lanzamientos frecuentes de features, un variant visual diferente al de los 4 semánticos estándar (info/success/warning/error) permite comunicar "esto es nuevo y vale la pena explorar" sin la connotación de urgencia de info. Color violeta — distinto de los semánticos.

**3. Has Avatar para actividad social** — Zoom tiene meetings, chat, y colaboración en tiempo real. Las notificaciones de actividad de usuarios ("Pedro te invitó", "María comentó") son un caso de uso central. Modelar Has Avatar como toggle permite que el mismo componente sirva para notificaciones de sistema (sin avatar) y notificaciones sociales (con avatar).

**4. Width fija 360px** — Notification vive en panels y drawers con ancho controlado. A diferencia de Toast (min/max por contenido), Notification siempre tiene 360px de ancho — consistente con el patrón de notification center de Atlassian y el inbox de Zoom.

**5. role=alert para warning/error, role=status para el resto** — El mismo patrón que Toast. Notificaciones de error o warning deben interrumpir el SR (assertive); las informativas/discovery no (polite). Esto sigue la spec de WAI-ARIA para live regions.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Variant × toggles son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Width fija 360px** — Notification no se adapta al ancho del contenedor. Siempre 360px — diseñar panels y drawers con este ancho en mente.
- **Borde izquierdo como señal semántica primaria** — en una lista de múltiples notificaciones, el color del borde izquierdo es el principal diferenciador visual. El ícono refuerza la señal pero no es el único indicador.
- **Has Avatar + Has Icon** — cuando Has Avatar=true, el avatar reemplaza al ícono semántico en la posición leading. No se muestran simultáneamente.
- **Has Actions** — las acciones son botones de texto (link-style o ghost) en la parte inferior de la notificación. El diseñador define el slot; el developer implementa las acciones específicas por tipo de notificación.
- **No auto-dismiss** — a diferencia de Toast, Notification no desaparece automáticamente. El usuario debe cerrarla explícitamente con Has Close, o el sistema la marca como "leída" al interactuar.

### Accesibilidad (ARIA)

| Caso | Implementación | Por qué importa |
|------|---------------|----------------|
| Variant warning/error | `role="alert"` + `aria-live="assertive"` | SR interrumpe y anuncia inmediatamente |
| Variant info/success/discovery | `role="status"` + `aria-live="polite"` | SR anuncia al terminar la lectura en curso |
| Title + Description | `aria-labelledby="[title-id]"` en el container | SR asocia descripción con el título |
| Has Close | `<button aria-label="Cerrar notificación">×</button>` | × solo no es descriptivo |
| Has Actions | Botones con labels descriptivos de la acción | "Ver reunión" no "Clic aquí" |
| Has Avatar | Avatar con `alt="[nombre del usuario]"` | SR identifica de quién es la notificación |
| `aria-atomic="true"` | En el container | SR anuncia el mensaje completo |
| Live region en DOM | Siempre presente aunque vacía | SR detecta la región antes de que se inyecte contenido |

### Navegación por teclado

```
Tab         → entra a la notificación y navega entre elementos interactivos
Tab         → mueve entre Has Actions y Has Close
Enter/Space → activa el elemento enfocado
Escape      → cierra la notificación (si Has Close=true)

Notification NO roba foco al aparecer.
```

---

## Guía de contenido

**Title:**
- Conciso y descriptivo: "Exportación lista", "Pedro te invitó a una reunión"
- Para sistema: nombra el evento específico, no genérico ("Actualización de seguridad disponible")
- Para usuario: sujeto + verbo + objeto: "[Usuario] [acción] [objeto]"
- Máximo 1 línea — truncar con ellipsis si es necesario

**Description:**
- Complementa el título con detalles adicionales: fecha, objeto específico, contexto
- Máximo 2 líneas — si necesita más, considerar un link "Ver detalles"
- Para eventos con avatar: incluir timestamp relativo ("hace 5 minutos", "Hoy · 14:32")
- Opcional — cuando el título es suficientemente descriptivo, omitir (Has Description=off)

**Has Actions — labels:**
- Verbo específico: "Ver reunión", "Descargar", "Revisar", "Activar"
- Acción primaria + acción secundaria (si aplica): "Aceptar" / "Rechazar"
- No más de 2 acciones — para flujos complejos, enlazar a la página del evento

**Variant discovery:**
- Solo para features nuevas y onboarding — no abusar
- Tono optimista e invitador: "Descubre Zoom Clips", "¡Nueva función disponible!"
- Incluir Has Actions con "Explorar" o "Ver cómo funciona"

---

## Pre-build checklist

```
□ ¿role="alert" para warning/error?
□ ¿role="status" para info/success/discovery?
□ ¿aria-labelledby apunta al title?
□ ¿aria-atomic="true" en el container?
□ ¿Live region siempre en DOM (aunque vacía)?
□ ¿Has Close tiene aria-label descriptivo?
□ ¿Has Avatar: avatar con alt text del nombre del usuario?
□ ¿Has Actions: botones con labels descriptivos de la acción?
□ ¿Width fija 360px en el panel/drawer contenedor?
□ ¿Has Avatar y Has Icon no aparecen simultáneamente?
□ ¿Notification no auto-dismiss (persiste hasta acción del usuario)?
```

---

## Componentes relacionados

```
Toast        → para mensajes efímeros resultado de acciones del usuario (< 1 frase)
Banner       → para mensajes persistentes inline que bloquean el flujo (error crítico)
Avatar       → slot interno de Has Avatar — 36px, circular
Drawer       → contenedor típico del feed de notificaciones (panel lateral)
Badge        → muestra el count de notificaciones no leídas sobre el ícono del bell
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Fondo | Width | Avatar | Discovery | Acciones | Diferenciador |
|---------|-------|-------|-------|--------|-----------|---------|--------------|
| **Material Design 3** | Snackbar / Alert | Snackbar oscuro; Alert claro | Variable | No | No | text button | Sin componente "notification" dedicado |
| **Spectrum (Adobe)** | InlineAlert | claro (tinted bg) | Container width | No | No | text button | InlineAlert con variantes; no para feed |
| **Carbon (IBM)** | InlineNotification / ToastNotification | claro (borde L) | Container width / 288px | No | No | external link | Inline + toast; sin panel feed |
| **Polaris (Shopify)** | Banner | claro (bg + borde L) | Container width | No | No | Buttons + links | Page/section/hasDismissButton contexts |
| **Atlassian** | Flag | oscuro (card) | 360px | No | No | linkComponent | Flag persistence; appearance=discovery |
| **Ant Design** | Notification | claro | 384px | No | No | btn prop | placement (4 corners); duration; description |
| **Twilio Paste** | Alert | claro (bg tinted) | Container width | No | No | No | Alert es inline; sin feed component |
| **Lightning** | Notification | oscuro | — | Sí | No | — | LWC; structured notification body |
| **Primer (GitHub)** | Flash | claro (bg) | Container width | No | No | dismiss | Flash inline; sin feed |
| **shadcn/ui** | Toast | oscuro | min/max | No | No | action | No notification feed component |
| **Chakra UI** | Alert | claro (bg tinted) | Container width | No | No | No | Alert inline; Toast separado |
| **Fluent 2** | MessageBar | claro | Container width | No | No | dismiss/action | intent prop; actions slot; politeness prop |
| **Mantine** | Notification | claro | 400px | No | No | onClose | withCloseButton; loader variant |
| **Orbit (Kiwi)** | Alert | claro (bg) | Container width | No | No | No | Domain-specific para booking flow |
| **Evergreen** | Alert | claro (bg tinted) | Container width | No | No | dismiss | Alert inline only; sin feed |
| **Nord** | nord-alert | claro | Container width | No | No | actions slot | Healthcare; WCAG compliant |

**Patrones clave de la industria:**
1. **Componente "notification feed" es raro en T1** — La mayoría de sistemas T1 tienen inline alerts (Banner/InlineAlert) y toasts, pero no un componente de feed de notificaciones persistente. Atlassian (Flag) y Ant Design (Notification) son los más cercanos. La decisión de incluirlo responde a las necesidades de Zoom (inbox de actividad, alertas de reuniones).
2. **Borde izquierdo como acento** — Carbon, Polaris, Atlassian (Flag tiene card surface) usan borde izquierdo de color. Spectrum y Chakra usan fondo tinted. El borde izquierdo es más sutil y permite feeds largos sin ruido visual excesivo.
3. **Variant=discovery** — Solo Atlassian lo tiene en T1. Es un diferenciador para productos SaaS con releases frecuentes. La asociación con color violeta (diferente de los 4 semánticos) es el patrón de Atlassian.
4. **Has Avatar para actividad social** — Lightning y Atlassian lo soportan. Para productos colaborativos (Zoom, Slack, Teams), las notificaciones de actividad de usuario son el caso de uso más frecuente.

---

## Tokens

**14 tokens** · prefijo `ntf-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `ntf-bg` | `surface/default` | Background blanco de todos los variants |
| `ntf-border` | `border/default` | Borde exterior sutil |
| `ntf-title-color` | `text/primary` | Color del título |
| `ntf-desc-color` | `text/secondary` | Color de la descripción |
| `ntf-close-color` | `text/secondary` | Color del botón × |
| `ntf-radius` | `radius/md` | Border radius — 8px |
| `ntf-info-accent` | `status/info/fg` | Borde izquierdo + ícono info |
| `ntf-success-accent` | `status/success/fg` | Borde izquierdo + ícono success |
| `ntf-warning-accent` | `status/warning/fg` | Borde izquierdo + ícono warning |
| `ntf-error-accent` | `status/error/fg` | Borde izquierdo + ícono error |
| `ntf-discovery-accent` | `interactive/visited` | Borde izquierdo + ícono discovery (violeta) |
| `ntf-avatar-size` | `sizing/36` | Tamaño del avatar — 36px |
| `ntf-icon-size` | `iconSize/md` | Tamaño del ícono semántico — 20px |
| `focus-ring` | `border/focus` | Focus ring en elementos interactivos |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Dimensiones fijas:                                      │
│  w: 360px · py: 16px · px: 16px · gap: 12px             │
│  border-left: 4px (color de acento según variant)        │
│  radius: 8px · shadow: elevation/3                       │
│                                                          │
│  Tipografía:                                             │
│  title: 14px/600/20px · text/primary                    │
│  desc:  14px/400/20px · text/secondary                  │
│                                                          │
│  Ícono: 20px · avatar: 36px                             │
│                                                          │
│  Frames totales:                                         │
│  Variant(5) = 5 frames                                  │
└──────────────────────────────────────────────────────────┘
```
