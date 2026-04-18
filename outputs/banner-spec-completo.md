# Banner

## Overview

Banner es un mensaje persistente del sistema que ocupa el ancho completo de su contenedor para comunicar información de relevancia global o seccional. A diferencia del Toast (efímero, se auto-descarta) y el Alert de formulario (validación local), el Banner representa condiciones que persisten hasta ser resueltas o descartadas explícitamente: alertas de mantenimiento planificado, errores de cuenta, confirmaciones de acciones importantes o anuncios de sistema. El componente soporta dos contextos de placement: `page` (ancho completo sin radius, sticky en el top de la página) e `inline` (con radius y borde izquierdo accentuado, dentro de secciones o cards).

```
Placement=page (Variant=warning):
  ╔════════════════════════════════════════════════════════════╗
  ║  ⚠  Mantenimiento programado el 15 de enero, 2:00 AM UTC.  [Ver detalles]  [×]  ║
  ╚════════════════════════════════════════════════════════════╝
     width=100% · py=12 · px=16 · radius=0 · border-left=0

Placement=inline (Variant=error):
  ╔══════════════════════════════════════════╗
  ║ ╠ ✗  Error al guardar los cambios.       ║
  ║ ╠    Verifica tu conexión e intenta      ║
  ║ ╠    nuevamente.         [Reintentar]    ║
  ╚══════════════════════════════════════════╝
     radius=8 · border-left=4px accentuado · py=12 · px=16
```

El Banner nunca reemplaza al Toast (no se auto-descarta), al Modal (no bloquea interacción) ni al Alert de validación de formulario (que es inline junto a cada campo).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant:    info | warning | error | success
            info=azul (anuncios, información de sistema)
            warning=amarillo (advertencias, acción requerida baja urgencia)
            error=rojo (errores críticos, acceso bloqueado)
            success=verde (confirmaciones, acciones completadas)

Placement:  page | inline
            page=full-width, sin radius, sin border izquierdo
            inline=con radius=8, border izquierdo=4px accentuado
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Icon       → muestra/oculta el ícono semántico (default=true)
Has Title      → muestra/oculta el título bold sobre la descripción (default=false)
Has Action     → muestra/oculta el botón de acción CTA (default=false)
Has Close      → muestra/oculta el botón de cierre × (default=false)
               → NOTA: Has Close no disponible para Variant=error (Polaris pattern)
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  Banner                                     │
│  ─────────────────────────────────────────  │
│  Variant     [info ▼] [warning] [error]     │
│              [success]                      │
│  Placement   [page ▼] [inline]              │
│  ─────────────────────────────────────────  │
│  Has Icon    [ ON  ]  (default=true)        │
│  Has Title   [ OFF ]                        │
│  Has Action  [ OFF ]                        │
│  Has Close   [ OFF ]                        │
│  ─────────────────────────────────────────  │
│  ✏️ Title       [Título del banner]          │
│  ✏️ Description [Descripción del mensaje]    │
└─────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El mensaje es del sistema (no de validación de formulario)?
         │
         ├── NO ──→ Alert inline junto al campo del formulario
         │
         └── SÍ ──→ ¿El mensaje persiste hasta resolverse?
                         │
                         ├── SÍ ──→ Banner ✓
                         │          ¿Placement?
                         │          ├── Afecta toda la página: page
                         │          └── Afecta solo una sección: inline
                         │
                         └── NO (se auto-descarta) ──→ Toast
```

**Use Banner when:**
- El sistema necesita informar sobre mantenimiento planificado o de emergencia que afecta a todos los usuarios de la página
- Hay un error de cuenta, de conexión o de seguridad que persiste hasta ser resuelto por el usuario
- Se confirma el resultado exitoso de una acción importante que el usuario completó (y no es adecuado para un Toast efímero)
- Una sección de la UI tiene una restricción o nota informativa que el usuario debe ver antes de interactuar con el contenido
- Se necesita un CTA prominente para resolver una situación del sistema (verificar cuenta, renovar suscripción, actualizar plan)

**Do NOT use Banner when:**
- El mensaje debe desaparecer automáticamente después de 3-5 segundos — usar Toast
- La información está relacionada con la validación de un campo de formulario — usar error/hint inline junto al campo
- El mensaje requiere una respuesta compleja o navegación multi-paso — usar un Modal o una página dedicada
- Se quiere mostrar una notificación push o de nueva actividad — usar Notification o Toast
- El mensaje ya fue visto y no hay razón para que persista al volver a la página — considerar estado persistido en storage + lógica de display

---

## Visual variations

**Por Variant — Placement=inline, Has Icon=true, Has Description=true:**

| Variant | Background | Border (left/all) | Icon | Icon color | Uso semántico |
|---------|-----------|-------------------|------|------------|---------------|
| info | `#EDF2FF` | `#B8CCEE` / `#B8CCEE` 4px L | ℹ️ info-circle | `#2659EB` | Anuncios, mantenimiento, información |
| warning | `#FFF7EB` | `#F5D085` / `#F5D085` 4px L | ⚠️ alert-triangle | `#B87A0D` | Advertencias, acción requerida |
| error | `#FFEFEF` | `#EE9E9E` / `#EE9E9E` 4px L | ✗ alert-circle | `#DB2626` | Errores críticos, acceso bloqueado |
| success | `#EDFCF2` | `#99E5AF` / `#99E5AF` 4px L | ✓ check-circle | `#158C38` | Confirmaciones, acciones completadas |

**Por Placement — Variant=info:**
- `page`: width=100%, py=12, px=16, radius=0, border=0, border-left=0. Diseñado para sticky en top de página, spans el viewport completo.
- `inline`: width=100% del contenedor, py=12, px=16, radius=8, border=1px, border-left=4px accentuado. Vive dentro del flujo de contenido.

**Combinaciones con toggles:**

| Has Title | Has Action | Has Close | Descripción |
|-----------|-----------|-----------|-------------|
| false | false | false | Banner mínimo: solo ícono + descripción |
| true | false | false | Banner con jerarquía: título bold + descripción |
| false | true | false | Banner con CTA: descripción + botón de acción |
| true | true | true | Banner completo: título + descripción + acción + cierre |
| false | false | true | Banner dismissible: solo ícono + descripción + × |

**Exclusión Variant=error + Has Close:**
Los errores críticos no son dismissibles (patrón Polaris). El usuario debe resolver el error, no ocultarlo. En la práctica, el botón de cierre no se muestra para `Variant=error` en el default del sistema.

---

## Design decisions

### Decisión 1: Placement=page|inline (no una propiedad de "size")

**Por qué:** La diferencia visual clave entre los dos modos no es el tamaño del texto ni el padding — es el layout y la presentación contextual. `page` es full-width sin radius (diseñado para fluir desde el borde izquierdo hasta el borde derecho del viewport, como Atlassian Banner). `inline` tiene radius=8 y border izquierdo=4px (diseñado para vivir dentro de una sección, tarjeta o form, como Polaris Banner inline). Tratarlo como `Size` (sm/md) induciría a error sobre qué cambia realmente. Polaris hace esta misma distinción explícita.

**Tradeoff:** Dos placement values pueden parecer insuficientes. Si el producto necesita un tercer modo (ej. "floating" como Gestalt BannerOverlay), puede añadirse como extensión sin romper el API existente.

### Decisión 2: role="alert" para error/warning, role="status" para info/success

**Por qué:** `role="alert"` interrumpe inmediatamente al screen reader con modo assertive — correcto para errores urgentes que requieren atención inmediata. `role="status"` es polite — anuncia en el próximo momento de silencio, sin interrumpir al usuario. Polaris y Atlassian hacen exactamente esta distinción. Usar `role="alert"` para todo (como Ant Design) genera fatiga de interrupciones; usarlo para nada deja los errores críticos silenciosos.

**Tradeoff:** El implementador debe garantizar que el role correcto se aplique según la variante. La documentación debe ser explícita: "si el banner es dinámico (aparece post-acción), aplica el role; si está en el HTML inicial de la página, usar `role='region'` con `aria-label` en su lugar".

### Decisión 3: Has Close=false por default para Variant=error (Polaris pattern)

**Por qué:** Un error crítico (ej. "Tu cuenta tiene acceso bloqueado", "Error crítico de sincronización") que el usuario puede descartar con × puede resultar en que el problema sea ignorado, especialmente en flujos de alto volumen donde los usuarios desarrollan "banner blindness". La recomendación de Polaris es clara: críticos no dismissibles. El usuario debe resolver el error para que el banner desaparezca, no ocultarlo.

**Tradeoff:** En algunos casos un error puede ser "informativo pero no urgente" (ej. "Tu suscripción expira en 30 días"). Para estos casos, usar `Variant=warning` (que sí permite close) en lugar de `error`.

### Excluded combinations

```
Variant=error + Has Close=true
  → Errores críticos no deberían ser descartables
  → Si el mensaje de error es dismissible, reconsiderar si es Variant=warning

Placement=page + Has Close=false + Variant=warning
  → Un banner de warning page-level no dismissible es válido pero inusual
  → Documentar explícitamente en la implementación si este pattern se usa

Has Action=true + texto de acción genérico ("Click aquí", "Más info")
  → El botón de acción debe describir la acción: "Ver detalles", "Verificar cuenta",
     "Reintentar", no texto genérico que no informa la consecuencia del click
```

---

## Behavior

### Essential for design

1. **Placement=page vs inline:** Page banners se usan habitualmente sticky en el top de la página (CSS `position: sticky; top: 0`). Inline banners fluyen en el documento. La altura del sticky banner debe considerarse para el cálculo del `top` de otros elementos sticky debajo de él.
2. **Dismissal:** Cuando Has Close=true y el usuario hace click en ×, el banner desaparece. La animación de cierre es un collapse vertical (height → 0) de 200ms. El foco vuelve al elemento que tenía foco antes de interactuar con el banner.
3. **Dynamic insertion vs page load:** Si el banner se inserta dinámicamente (post-acción del usuario), el `role="alert"` o `role="status"` lo anuncia automáticamente. Si está en el HTML inicial, NO usar `role="alert"` — usar `role="region"` con `aria-label` para evitar interrumpir al usuario al cargar la página.
4. **Orden de tab:** Ícono (aria-hidden) → Título (no focusable) → Descripción (no focusable) → Botón de acción (focusable) → Botón de cierre × (focusable). Nunca el ícono antes que el contenido.
5. **Multi-banner stacking:** Si múltiples banners coexisten en page-level, apilar verticalmente con el de mayor severidad primero (error > warning > info > success). Máximo 2-3 banners visibles simultáneamente.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Banner container (dinámico) | `alert` (error/warning) o `status` (info/success) | `role="alert"` o `role="status"` | Anuncia el mensaje al SR cuando aparece dinámicamente |
| Banner container (page load) | `region` | `aria-label="Mensaje del sistema"` | En page load, usar region para no interrumpir; alert solo para inserción dinámica |
| Ícono semántico | `img` o `svg` | `aria-hidden="true"` | El ícono refuerza visualmente el color — el texto ya comunica el severity |
| Título | ninguno | ninguno (texto legible por el banner role) | Incluido en el contenido del banner; el role del container lo lee |
| Botón de acción | `button` | `aria-label` descriptivo si el texto no es autoexplicativo | "Verificar cuenta" es mejor que "Click aquí" |
| Botón de cierre × | `button` | `aria-label="Cerrar banner"` o `"Cerrar aviso de [tipo]"` | El × visual no es suficiente — el SR debe leer la acción |

### Keyboard navigation

Primary interactions (affect design):

```
Tab          → Mueve el foco hacia el botón de acción (si Has Action=true)
Tab          → Mueve el foco hacia el botón de cierre × (si Has Close=true)
Enter/Space  → Activa el botón enfocado (acción o cierre)
```

Secondary interactions (dev reference):

```
Shift+Tab    → Navegación inversa entre elementos del banner
Focus trap   → NO aplicar — el banner es inline en el documento, no modal
Foco tras cierre → Devolver al elemento que tenía foco antes de interactuar con el banner,
                   o al elemento lógicamente anterior en el flujo del documento
```

---

## Content guide

**Slot: title (text, opcional, Has Title=true)**
- Máximo 1 línea (40-60 caracteres). Conciso y descriptivo del problema.
- Ejemplos buenos: "Mantenimiento programado", "Error al sincronizar", "Suscripción suspendida"
- Evitar: "Atención", "Importante", "Aviso" — son genéricos y no describen el problema
- Si el mensaje es suficientemente corto y claro sin título (< 80 chars), usar solo `description`

**Slot: description (text, requerido)**
- La descripción es el único slot requerido. Debe ser autoexplicativa incluso sin título ni ícono.
- Máximo 2-3 líneas (120-180 caracteres). Banners más largos → Modal o página de detalle.
- Formato recomendado: [Qué pasó] + [Qué debe hacer el usuario] + [Enlace a más info si aplica]
- Ejemplo: "Tu cuenta ha sido suspendida temporalmente. Verifica el email para más detalles."
- Evitar jerga técnica en banners de usuario final. Los mensajes de error deben ser recuperables.

**Slot: action (container, opcional, Has Action=true)**
- El texto del botón describe la acción resultante: "Verificar cuenta", "Ver detalles", "Reintentar"
- Evitar CTAs genéricos: "Más información", "Click aquí", "Ver"
- Un solo botón de acción primario es suficiente. Si se necesitan dos acciones, usar botón secondary de menor prominencia.
- Cuando sea posible, el CTA debe resolver directamente el problema, no solo navegar a información sobre él.

**Slot: close (icon-action, opcional, Has Close=true)**
- Sin texto visible — el ícono × es convencional y reconocido
- El `aria-label` del botón debe ser descriptivo: "Cerrar" es mínimo; "Cerrar aviso de mantenimiento" es mejor
- Solo en Variant=info, warning, success. No en error (Polaris pattern).

---

## Pre-build checklist

```
ANATOMÍA
[ ] 5 slots en orden correcto: icon · title · description · action · close
[ ] Has Icon=true: ícono es aria-hidden="true"
[ ] Has Title=false: slot title oculto correctamente
[ ] Has Action=false: slot action oculto correctamente
[ ] Has Close=false: slot close oculto correctamente

PLACEMENT
[ ] page: width=100%, py=12, px=16, radius=0, borderLeft=0
[ ] inline: width=100% del contenedor, py=12, px=16, radius=8, border=1px, borderLeft=4px

COLORES (4 variantes)
[ ] info:    bg=#EDF2FF · border=#B8CCEE · icon=#2659EB · title=#121213 · body=#6B7280
[ ] warning: bg=#FFF7EB · border=#F5D085 · icon=#B87A0D · title=#121213 · body=#6B7280
[ ] error:   bg=#FFEFEF · border=#EE9E9E · icon=#DB2626 · title=#121213 · body=#6B7280
[ ] success: bg=#EDFCF2 · border=#99E5AF · icon=#158C38 · title=#121213 · body=#6B7280

ÍCONOS
[ ] info:    icon/info-circle (relleno, color info.fg)
[ ] warning: icon/alert-triangle (relleno, color warning.fg)
[ ] error:   icon/alert-circle (relleno, color error.fg)
[ ] success: icon/check-circle (relleno, color success.fg)

EXCLUSIONES
[ ] Variant=error: Has Close=false enforced (no mostrar opción de cierre)

ACCESIBILIDAD
[ ] role="alert" para warning/error (dinámico) o role="region" (page load)
[ ] role="status" para info/success (dinámico)
[ ] Botón close: aria-label="Cerrar"
[ ] Botón action: aria-label descriptivo de la acción

FRAME COUNT
[ ] 8 frames: Variant(4) × Placement(2)
[ ] Booleans en cada frame: Has Icon, Has Title, Has Action, Has Close
[ ] Grid: máx 4 columnas, gap=24, pad=32

TOKENS
[ ] bnr/info/bg → status/info/bg
[ ] bnr/info/border → status/info/border
[ ] bnr/info/icon → status/info/fg
[ ] bnr/warning/bg → status/warning/bg
[ ] bnr/warning/border → status/warning/border
[ ] bnr/warning/icon → status/warning/fg
[ ] bnr/error/bg → status/error/bg
[ ] bnr/error/border → status/error/border
[ ] bnr/error/icon → status/error/fg
[ ] bnr/success/bg → status/success/bg
[ ] bnr/success/border → status/success/border
[ ] bnr/success/icon → status/success/fg
[ ] bnr/title-color → text/primary
[ ] bnr/body-color → text/secondary
[ ] bnr/close-color → text/secondary
[ ] bnr/radius → radius/md
[ ] focus/ring → border/focus
```

---

## Related components

```
Toast
  → Usar para notificaciones efímeras que se auto-descartan (3-5 segundos)
  → Banner es persistente hasta resolución o descarte manual
  → Nunca usar Toast para mensajes críticos de sistema

Alert / InlineAlert
  → Usar para mensajes de validación de formulario (Spectrum InlineAlert)
  → Alert es scoped a una sección específica; Banner es page-level o section announcement
  → En jerarquía: Banner > Alert > Hint (field-level)

Modal / Dialog
  → Usar cuando el mensaje requiere acción obligatoria y debe bloquear la UI
  → Banner no es blocking — el usuario puede ignorarlo y continuar navegando

Callout (Paste)
  → Paste llama "Callout" a lo que otros sistemas llaman Banner inline
  → Funcionalmente equivalente al Placement=inline de este Banner

Empty State
  → Usar cuando una sección no tiene datos y necesita orientación
  → Banner no es apropiado para estados vacíos — tiene connotación de "algo está mal/cambiando"
```

---

## Reference: how other systems do it

**Atlassian** es el referente de separación de concerns más limpia del corpus. Tres componentes distintos para tres scopes: `Banner` para mensajes sistema-página (sticky top), `SectionMessage` para alertas a nivel de sección y `InlineMessage` para contexto a nivel de elemento. El `Banner` de Atlassian tiene un API deliberadamente limitado — solo tres appearances (`warning`, `error`, `announcement`) y sin botón de dismiss por diseño intencional. Esta restricción refleja que si el sistema muestra un Banner, es porque hay una condición que persiste hasta ser resuelta. La variante `announcement` es única en el corpus — una categoría neutral para cambios de producto o mantenimiento planificado que no son errores ni warnings.

**Polaris (Shopify)** es el Banner más feature-complete del Tier 1 con la innovación más significativa: el modelo de dismissibilidad dictada por severity. `tone: "critical"` → no dismissible (fuerza resolución). `tone: "warning" | "info" | "success"` → dismissible con `onDismiss`. Esta decisión protege a los merchants de Shopify de ocultar mensajes críticos que podrían resultarles en pérdida de acceso o revenue. El dual placement (página-nivel vs. inline en card) en un mismo componente es elegante — mismo componente, dos contextos — con roles de ARIA distintos según el placement y el timing de inserción.

**GitHub Primer** es el Banner más rico en features de Tier 2: cinco variants incluyendo `upsell` (único en el corpus) para comunicaciones de upgrade a GitHub Pro sin usar el mismo visual que errores. El `critical` como variante adicional al `warning` refleja que GitHub necesita dos niveles de negatividad: "el branch está desactualizado" (warning) y "tu organización perderá acceso en 24 horas" (critical) son mensajes cualitativamente distintos que merecen diferenciación visual. El slot de primary y secondary action button permite CTAs dobles para mensajes que requieren más de una respuesta posible.

**GOV.UK** aporta la práctica de accesibilidad más avanzada del corpus: auto-focus del banner cuando contiene confirmación de acción dinámica (ej. form submission exitoso). En servicios gubernamentales, el usuario que completó un formulario con lector de pantalla DEBE escuchar la confirmación. Esperar a que accedan al banner por navegación es insuficiente. La separación explícita entre `Notification Banner` (sistema) y `Cookie Banner` (consentimiento) como componentes distintos previene que la cookie notice herede el mismo tratamiento urgente de un error de sistema.

**Salesforce Lightning** es el único sistema con stacking rules explícitas para múltiples banners simultáneos (mantenimiento + cookie consent + upgrade notice), definiendo ordenamiento por severity y visualización agrupada. Para productos enterprise donde múltiples condiciones pueden coexistir (outage + security notice + feature banner), estas reglas previenen el caos visual que resultaría de un stack sin orden.

---

## Tokens

**18 tokens** · prefix `bnr-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `bnr/info/bg` | status/info/bg | Background del banner info |
| `bnr/info/border` | status/info/border | Borde y borde izquierdo accentuado info |
| `bnr/info/icon` | status/info/fg | Color del ícono info |
| `bnr/warning/bg` | status/warning/bg | Background del banner warning |
| `bnr/warning/border` | status/warning/border | Borde y borde izquierdo accentuado warning |
| `bnr/warning/icon` | status/warning/fg | Color del ícono warning |
| `bnr/error/bg` | status/error/bg | Background del banner error |
| `bnr/error/border` | status/error/border | Borde y borde izquierdo accentuado error |
| `bnr/error/icon` | status/error/fg | Color del ícono error |
| `bnr/success/bg` | status/success/bg | Background del banner success |
| `bnr/success/border` | status/success/border | Borde y borde izquierdo accentuado success |
| `bnr/success/icon` | status/success/fg | Color del ícono success |
| `bnr/title-color` | text/primary | Color del texto del título |
| `bnr/body-color` | text/secondary | Color del texto de la descripción |
| `bnr/close-color` | text/secondary | Color del botón de cierre × |
| `bnr/radius` | radius/md | Border-radius para Placement=inline (8px) |
| `focus/ring` | border/focus | Ring de foco en botones interactivos |
| *(18 tokens — 1 compartido con sistema)* | | |

### Spacing specs

```
Placement=page:
  width=100% · height=auto · py=12 · px=16
  gap entre slots=12 · radius=0 · border=0 · border-left=0
  icon-size=20px · font-size=14px · line-height=20px

Placement=inline:
  width=100% del contenedor · height=auto · py=12 · px=16
  gap entre slots=12 · radius=8 · border=1px · border-left=4px
  icon-size=20px · font-size=14px · line-height=20px

Título (Has Title=true):
  font-size=14px · font-weight=600 · color=text/primary
  margin-bottom=4px antes de description

Acción (Has Action=true):
  margin-top=8px desde description
  button: size=sm (height=32px) · variant=ghost o outlined según contexto

Cierre × (Has Close=true):
  icon-size=16px · padding=4px · positioned absolute top-right o inline al final
  min touch target=32×32px
```
