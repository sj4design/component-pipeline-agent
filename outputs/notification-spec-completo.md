# Notification

## Overview

El componente `Notification` es una tarjeta de mensaje estructurado que comunica eventos del sistema con jerarquía visual clara. A diferencia del `Toast` —efímero y superpuesto—, `Notification` es persistente, vive en panels o feeds, y soporta contenido rico: título, descripción, acciones, ícono semántico y avatar de usuario. Su borde izquierdo de color de acento identifica visualmente la severidad de un vistazo.

```
┌──────────────────────────────────────────────────────────────┐
│ ║ [icon]  Título de la notificación               [×]        │
│ ║         Descripción adicional del evento del    [Acción]   │
│ ║         sistema o actividad del usuario.                   │
│ ║ [avatar]                                                    │
└──────────────────────────────────────────────────────────────┘
   ↑ borde-izquierdo de acento según variant
   icon: semántico por variant (info/success/warning/error/discovery)
   [×]: Has Close  [Acción]: Has Actions  [avatar]: Has Avatar
```

La relación de activación es indirecta: el componente no activa ningún overlay —es activado por el sistema y vive en su lugar de destino (feed, panel, inline). El ícono y el color comunican urgencia; las acciones habilitan respuesta sin cambiar de contexto.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant: info | success | warning | error | discovery
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Icon         → muestra/oculta icon semántico (default: true)
Has Description  → muestra/oculta texto secundario (default: true)
Has Actions      → muestra/oculta área de botones de acción (default: false)
Has Close        → muestra/oculta botón ×  (default: true)
Has Avatar       → muestra/oculta avatar de usuario (default: false)
```

### Figma properties panel

```
┌─────────────────────────────────────┐
│  Notification                       │
│  ─────────────────────────────────  │
│  Variant      [info          ▾]     │
│  ─────────────────────────────────  │
│  Has Icon     [●──────────────]     │
│  Has Desc.    [●──────────────]     │
│  Has Actions  [○──────────────]     │
│  Has Close    [●──────────────]     │
│  Has Avatar   [○──────────────]     │
│  ─────────────────────────────────  │
│  ✏️ Title      Título de la...       │
│  ✏️ Desc.      Descripción adic...   │
└─────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El mensaje necesita que el usuario lo lea o actúe?
    │
    ├─ Sí ─► ¿Es urgente / bloquea el flujo?
    │             ├─ Sí ─► Modal o ActionableNotification
    │             └─ No ─► Notification (persistent)
    │
    └─ No ─► ¿Es confirmación momentánea?
                 ├─ Sí ─► Toast (ephemeral)
                 └─ No ─► Alert/Banner inline en formulario
```

**Use Notification cuando:**
- El evento merece registro permanente y el usuario debe poder revisar el mensaje con calma (ej. "Pedro te invitó a la reunión de diseño").
- El mensaje incluye descripción adicional o acciones explícitas (Aceptar / Rechazar).
- Los mensajes se acumulan en un feed o notification center que el usuario visita.
- Se necesita mostrar quién generó el evento (Has Avatar) —contexto colaborativo/social.
- La variante `discovery` anuncia una nueva feature o cambio de producto que no es urgente pero merece atención.

**Do NOT use Notification cuando:**
- El mensaje es una confirmación inmediata de acción del usuario (ej. "Enlace copiado") → usa `Toast`.
- El mensaje está inline dentro de un formulario y describe errores de campo → usa `Alert` o helper text del campo.
- El mensaje requiere acción bloqueante y el usuario no puede continuar sin resolver → usa Modal.
- Solo quieres mostrar un conteo de mensajes no leídos → usa `Badge` en el ícono de navegación.

---

## Visual variations

### Por Variant

Cada variante usa un ícono semántico y un color de acento exclusivo en el borde izquierdo y el ícono. El fondo es siempre blanco (`surface/default`).

| Variant | Icono | Color acento | Rol ARIA |
|---------|-------|-------------|----------|
| info | info-circle | azul `#2659EB` | `status` |
| success | check-circle | verde `#158C38` | `status` |
| warning | alert-triangle | amarillo-naranja `#B87A0D` | `alert` |
| error | alert-circle | rojo `#DB2424` | `alert` |
| discovery | sparkle | púrpura `#7338BF` | `status` |

### Por contenido (toggles)

```
Solo título:
┌─────────────────────────────────────┐
│ ║ [i]  Verificación completada   ✕ │
└─────────────────────────────────────┘

Título + descripción:
┌─────────────────────────────────────┐
│ ║ [i]  Verificación completada   ✕ │
│ ║      Tu cuenta está verificada y  │
│ ║      lista para usar.             │
└─────────────────────────────────────┘

Con acciones:
┌─────────────────────────────────────┐
│ ║ [⚠]  Reunión en 5 minutos      ✕ │
│ ║      Pedro inició la reunión de   │
│ ║      diseño.                      │
│ ║                 [Ver] [Unirse]    │
└─────────────────────────────────────┘

Con avatar (actividad de usuario):
┌─────────────────────────────────────┐
│ ║ [●]  Pedro te mencionó          ✕ │
│ ║      "Qué piensas de esta         │
│ ║       propuesta?"                 │
│ ║                         [Resp]   │
└─────────────────────────────────────┘
```

### Discovery variant

```
┌─────────────────────────────────────┐
│ ║ [✦]  Nueva feature disponible  ✕ │
│ ║      Las reuniones de Zoom ahora  │
│ ║      soportan transcripción IA.   │
│ ║              [Probar] [Recordar]  │
└─────────────────────────────────────┘
```

---

## Design decisions

### 1. Fondo blanco con borde izquierdo de acento (vs. Toast oscuro/colored)

**Por qué:** `Notification` es más rica y persistente que `Toast`. Vive en panels o feeds —no como overlay flotante— donde el color de fondo completo de cada variante crearía un "semáforo visual" agresivo. El borde izquierdo (`border-left: 4px`) comunica la categoría semántica de forma sutil y permite que múltiples notificaciones coexistan sin competir visualmente.

**Referencia:** Atlassian Flag, Ant Design notification, Carbon InlineNotification usan este mismo patrón en sus variantes persistentes.

**Trade-off:** El borde izquierdo puede ser menos perceptible que el fondo coloreado completo para usuarios con baja visión. Se mitiga manteniendo el ícono semántico (doble señal: color + forma) y asegurando contraste ≥ 4.5:1 en el título.

---

### 2. Variant `discovery` como quinto tipo semántico

**Por qué:** Los cuatro semánticos estándar (info/success/warning/error) son universales, pero no cubren el caso de "anuncio de feature" —un mensaje que no es urgente ni de error, sino de invitación a explorar algo nuevo. Atlassian es el único sistema Tier 1 con `discovery`, y lo justifica por el mismo motivo: el canal de notificación también es canal de educación y onboarding.

**Trade-off:** Agrega un quinto caso al switch de variantes. El riesgo es que equipos de producto lo usen para mensajes de marketing. Documentar que `discovery` es exclusivo para anuncios de producto/feature, nunca para comunicaciones de ventas.

---

### 3. `Has Avatar` para notificaciones de actividad de usuario

**Por qué:** Zoom es una plataforma colaborativa donde los eventos tienen un autor humano ("Pedro te invitó", "Ana te mencionó"). El avatar humaniza la notificación y permite reconocer la fuente sin leer el texto. Ant Design y los sistemas sociales de actividad usan este patrón.

**Trade-off:** El avatar aumenta la altura del componente y requiere que el sistema provea la imagen del usuario. Si el avatar no está disponible (usuario anónimo o externo), el sistema debe fallback a un avatar de iniciales o ícono genérico.

---

### 4. Auto-dismiss pausa con foco dentro

**Por qué:** WCAG 2.2.1 exige que el usuario pueda pausar, detener o extender cualquier contenido con límite de tiempo. Si una notificación se auto-descarta mientras el usuario la está leyendo o interactuando con ella, se viola el criterio. El foco dentro del componente debe pausar el timer.

**Trade-off:** La implementación requiere que el dev respete el evento `focusin` del contenedor. No se puede expresar en Figma —es una nota de comportamiento de dev.

---

### 5. Role ARIA determinado por variant (no por prop separada)

**Por qué:** Carbon es la referencia: su arquitectura hace que el ARIA correcto sea automático por tipo de componente —imposible equivocarse. Para `Notification`, el mapeo es: `warning/error → role="alert"` (assertive, interrumpe el lector de pantalla); `info/success/discovery → role="status"` (polite, anuncia en la siguiente pausa). Dejar esto al consumer introduce errores sistemáticos (notificaciones de info que gritan `role="alert"`).

**Trade-off:** El designer no ve el rol ARIA en Figma. Se documenta como comportamiento de dev determinístico y se anota en la descripción del componente en Figma.

---

## Behavior

### Essential for design

- **Borde izquierdo de 4px** con color de acento de la variante. No es un borde completo —solo el lado izquierdo.
- **Ancho fijo** de 360px en desktop. En mobile puede ser full-width.
- **Sombra nivel 3** (`shadowLevel: 3`) cuando la notificación es overlay o flotante. Sin sombra cuando está inline en un feed.
- **Stacking vertical** cuando hay múltiples notificaciones: las más recientes arriba, gap de 8px entre tarjetas.
- **Auto-dismiss pausa** cuando el cursor entra al componente (`pauseOnHover: true`) o el foco está dentro (`pauseOnFocus: true`).
- **Has Close visible por defecto** —el usuario siempre debe poder descartar la notificación manualmente.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Wrapper | `alert` (warning/error) o `status` (info/success/discovery) | `aria-live="assertive"` o `"polite"` según variant; `aria-atomic="true"` | Screen reader anuncia el contenido al aparecer en el DOM |
| Title | — | `id="ntf-title-[id]"` | Referenciado por `aria-labelledby` en el wrapper |
| Wrapper | — | `aria-labelledby="ntf-title-[id]"` | Asocia el título accesible con la región |
| Close button | `button` | `aria-label="Cerrar notificación"` | Sin label textual visible, el sr-name es obligatorio |
| Action buttons | `button` | Labels descriptivos ("Unirse a la reunión", "Ver detalles") | Evitar labels genéricos como "Aceptar" sin contexto |
| Live region container | — | Siempre en el DOM, vacío inicialmente | Notificaciones insertas dinámicamente son anunciadas |

### Keyboard navigation

Primary interactions (affect design):

```
Tab          → navega al primer elemento focusable dentro (Close o primer Action)
Tab          → navega entre acciones (si Has Actions)
Shift+Tab    → navega hacia atrás
Enter/Space  → activa el botón con foco (Close o Action)
Esc          → cierra la notificación (si Has Close)
```

Secondary interactions (dev reference):

```
F8           → mueve foco al viewport de notificaciones (Radix pattern)
              permite que usuarios de teclado accedan antes del auto-dismiss
Hover/Focus  → pausa el timer de auto-dismiss
FocusOut     → reanuda el timer
```

---

## Content guide

### `icon` (slot de ícono semántico)
- **Tipo:** ícono SVG determinístico por variant. El designer no necesita seleccionarlo.
- **Tamaño:** 20×20px (`iconSize: 20`).
- **Nota:** Si Has Avatar está activo, el ícono puede ocultarse para dar protagonismo al avatar.

### `title` (slot obligatorio)
- **Qué va aquí:** Una oración corta que describe el evento. Máx. ~60 caracteres.
- **Tono:** Activo, orientado a la acción o al evento. "Pedro te invitó a la reunión", "Archivo subido correctamente", "Error al guardar cambios".
- **Formato:** Sin signo de puntuación al final. Sin mayúsculas en TODAS LAS LETRAS.
- **Evitar:** Títulos vagos ("Notificación del sistema", "Atención"). Siempre dar contexto.

### `description` (slot opcional, Has Description)
- **Qué va aquí:** Contexto adicional o instrucciones de siguiente paso. Máx. ~120 caracteres.
- **Tono:** Explicativo, sin repetir el título. Si el título es "Error al guardar", la descripción puede ser "Revisa tu conexión a internet e intenta de nuevo."
- **Evitar:** Texto de relleno ("Esto es una descripción"). Si no hay nada útil que decir, mantener Has Description en false.

### `actions` (slot opcional, Has Actions)
- **Qué va aquí:** 1–2 botones de acción directa. El botón primario va primero.
- **Labels:** Verbos específicos: "Unirse", "Ver detalles", "Aceptar invitación", "Descartar".
- **Límite:** Máximo 2 acciones por notificación. Si se necesitan más opciones, el usuario debe navegar a la vista completa.

### `close` (slot opcional, Has Close)
- **Qué va aquí:** Botón ícono × para descartar. Siempre `aria-label="Cerrar notificación"`.
- **Visibilidad default:** true. Solo ocultar en notificaciones de system-critical que requieren acción.

### `avatar` (slot opcional, Has Avatar)
- **Qué va aquí:** Imagen circular del usuario que generó el evento (36×36px).
- **Fallback:** Si no hay imagen, mostrar iniciales del usuario sobre fondo de color determinístico.
- **Cuándo activar:** Solo en notificaciones de actividad social/colaborativa. No en notificaciones de sistema puro.

---

## Pre-build checklist

```
[ ] Variant tiene los 5 valores: info, success, warning, error, discovery
[ ] Borde izquierdo de 4px con color de acento correcto por variant
[ ] Has Icon toggle funcional (default: true)
[ ] Has Description toggle + text property sincronizados
[ ] Has Actions toggle funcional (default: false)
[ ] Has Close toggle funcional (default: true)
[ ] Has Avatar toggle funcional (default: false)
[ ] Ícono cambia con Variant (info-circle / check-circle / alert-triangle / alert-circle / sparkle)
[ ] Color de acento cambia con Variant (azul / verde / naranja / rojo / púrpura)
[ ] Text properties: ✏️ Title y ✏️ Description editables
[ ] Ancho: 360px fijo
[ ] Sombra nivel 3 (shadowLevel)
[ ] Radius 8px
[ ] Tokens ntf- aplicados (ntf/bg, ntf/border, ntf/title-color, ntf/desc-color, etc.)
[ ] 5 frames en el grid (uno por variant)
```

---

## Related components

```
Toast             → ephemeral, overlay, sin descripción larga, auto-dismiss
Alert / Banner    → inline en formularios o páginas, sin overlay
Badge             → contador de notificaciones en ícono de navegación
Avatar            → building block del slot Has Avatar
Button            → building block del slot Has Actions
```

---

## Reference: how other systems do it

### Carbon (IBM) — Tres componentes, un ARIA correcto automático

Carbon implementa la separación más clara del ecosistema: `ToastNotification` (efímero, no interactivo), `InlineNotification` (persistente, inline) y `ActionableNotification` (interactivo, focus-trapping con `role="alertdialog"`). La decisión arquitectural clave es que el ARIA correcto es automático por tipo de componente —el consumer no puede equivocarse el role. `kind: "error"|"warning"|"success"|"info"` mapea a `role="alert"` o `role="status"` sin configuración adicional. La variante `lowContrast` reduce el peso visual para contextos donde la notificación es informativa pero no crítica.

### Atlassian — Flag + FlagGroup + FlagsProvider: arquitectura de tres capas

Atlassian tiene el sistema de notificaciones overlay más robusto en Tier 1. La arquitectura de tres capas es única: `Flag` (instancia individual), `FlagGroup` (gestiona stacking, animación y orden) y `FlagsProvider` (state management a nivel de app). La variante `discovery` —para anuncios de features— es la decisión de diseño más relevante para nuestro sistema: el canal de notificación también es canal de educación y onboarding. `AutoDismissFlag` como componente separado (no prop) hace el contrato de tiempo explícito. El auto-dismiss pausa en hover y focus —la implementación de referencia para WCAG 2.2.1.

### Spectrum (Adobe) — Toast priority queue con 8 niveles

Spectrum enforza 6000ms como duración mínima de Toast —uno de los pocos sistemas que codifica el requisito WCAG 2.2.1 directamente en el API. La separación entre `Toast` (efímero transitorio) e `InlineAlert` (persistente a nivel de sección) establece los dos polos del espectro. El priority queue de 8 niveles ordena múltiples notificaciones concurrentes por urgencia semántica en lugar de simplemente apilarlas LIFO.

### Ant Design — key para update-in-place y maxCount

Ant Design provee el API de notificación más rico en Tier 1. El prop `key` es la feature más relevante para casos de uso async: llamar `notification.open({key: 'job'})` dos veces actualiza la misma notificación en lugar de crear una nueva —"Subiendo..." → "Subido!". `maxCount` previene el notification flooding en apps con muchos eventos asíncronos. La distinción entre `message` (minimalista, una línea, top-center) y `notification` (tarjeta rica) establece un two-tier pattern por peso de información.

### Fluent 2 (Microsoft) — `politeness` prop explícito

Fluent 2 expone el prop `politeness: "assertive" | "polite" | "off"` en `Toast` para control explícito del `aria-live`. Esto permite override del mapeo default severity → urgencia cuando el contexto lo requiere. `MessageBar` cubre el caso inline persistente. `useToastController` hook para el API imperativo React-idiomático.

### Radix UI — F8 hotkey para keyboard access

El diferenciador de accesibilidad de Radix es el hotkey F8: permite que usuarios de teclado muevan el foco al viewport de toasts antes de que se auto-descarten. Sin este patrón, los toasts con acciones son inaccesibles para usuarios de teclado que no puedan alcanzarlos a tiempo. `Toast.Provider` + `Toast.Viewport` como arquitectura de componentes.

### Mantine — update() para transiciones loading→outcome

`@mantine/notifications` implementa `update(id)` para transiciones en una sola notificación: "Guardando..." → "Guardado" o "Error al guardar" sin crear una segunda notificación. El `limit` con queuing asegura que las notificaciones no se pierden cuando la cola está llena —se muestran al descartar las anteriores.

### GOV.UK — Persistente por diseño, sin auto-dismiss

`Notification Banner` con dos modos fijos: azul ("important") y verde ("success"). Sin auto-dismiss por principio —ningún mensaje de gobierno desaparece sin ser leído. Esta restricción intencional previene el overuse y garantiza que el usuario siempre puede leer el contenido.

### Nord (Nordhealth) — Persistente siempre por seguridad clínica

`nord-notification` web component para notificaciones inline persistentes (info/success/warning/danger). Nunca auto-dismiss. El contexto clínico define la decisión: una notificación de interacción medicamentosa que desaparece puede causar daño al paciente. El dominio determina el comportamiento por default.

---

## Tokens

**14 tokens** · prefix `ntf-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `ntf/bg` | `surface/default` | Fondo de la tarjeta (blanco) |
| `ntf/border` | `border/default` | Borde exterior de la tarjeta |
| `ntf/title-color` | `text/primary` | Color del texto del título |
| `ntf/desc-color` | `text/secondary` | Color del texto de descripción |
| `ntf/close-color` | `text/secondary` | Color del ícono de cierre |
| `ntf/radius` | `radius/md` | Border radius (8px) |
| `ntf/info/accent` | `status/info/fg` | Acento azul (borde + ícono) |
| `ntf/success/accent` | `status/success/fg` | Acento verde |
| `ntf/warning/accent` | `status/warning/fg` | Acento naranja |
| `ntf/error/accent` | `status/error/fg` | Acento rojo |
| `ntf/discovery/accent` | `interactive/visited` | Acento púrpura |
| `focus/ring` | `border/focus` | Anillo de foco para botones internos |

### Spacing specs

```
Componente:
  width:       360px (fijo)
  padding-y:   16px  (py: spacing/16)
  padding-x:   16px  (px: spacing/16)
  gap:         12px  (gap entre icon/avatar y contenido de texto)
  radius:       8px  (radius/md)
  shadow:       level 3 (overlay) / 0 (inline)
  border-left:  4px  (acento de variante)

Tipografía:
  title:       14px / semibold (600) / line-height 20px
  description: 14px / regular (400) / line-height 20px

Íconos:
  icon semántico: 20×20px
  close ×:        16×16px

Avatar:
  size: 36×36px
  radius: 9999px (circular)
```
