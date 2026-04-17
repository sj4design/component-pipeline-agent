# Badge

## Descripción general

Badge es el primitivo de indicación visual del sistema de diseño: un elemento compacto y sin interacción propia que se superpone o acompaña a otro elemento para comunicar estado, conteo o categoría. Existen tres tipos: `count` (número visible), `dot` (presencia sin valor numérico) y `label` (texto corto de categoría). Badge nunca tiene role semántico propio — su valor siempre se integra en el `aria-label` del elemento padre al que se adjunta. Es un building block que otros componentes (Icon, Avatar, Tab, Navbar item) consumen.

```
Type=count (en un IconButton):
┌─────────────────────────────────────────────────┐
│                                              ┌──────┐
│   🔔                                         │  5   │  ← h:16px / radius:full
│   ↑                                          └──────┘
│   IconButton                                  badge sm/error
│
│   Type=dot (presencia sin valor):
│   🔔 •                  ← dot 8px rojo, sin texto
│
│   Type=label (categoría):
│   [ New ]               ← pill con texto corto, neutral o semántico
└─────────────────────────────────────────────────┘

Variants y colores:
┌──────────────────────────────────────────────────────────┐
│  neutral  │  info   │  success  │  warning  │  error     │
│  [  5  ]  │  [  5  ]  │  [  5  ]  │  [  5  ]  │  [  5  ]  │
│  gray bg  │ blue bg │  green bg │ orange bg │  red bg   │
└──────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Type    → count | dot | label
Variant → neutral | info | success | warning | error
Size    → sm | md
```

Texto editable:

```
✏️ Count → "9" (número a mostrar)
```

### Panel de propiedades en Figma

```
┌────────────────────────────────────────────┐
│  Badge                                     │
│  ────────────────────────────────────────  │
│  Type     [ count           ▼ ]            │
│  Variant  [ error           ▼ ]            │
│  Size     [ sm              ▼ ]            │
│  ────────────────────────────────────────  │
│  ✏️ Count  [ 9                           ]  │
└────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito indicar estado o cantidad sobre otro elemento?
                    │
                    ▼
       ¿Hay un número para mostrar?
       ├── Sí → Type=count
       └── No →
           ¿Solo presencia (hay algo sin mostrar cuánto)?
           ├── Sí → Type=dot (sin número, sin texto)
           └── No →
               ¿Es una categoría o etiqueta de texto?
               └── Sí → Type=label
                    │
                    ▼
       ¿Cuál es la urgencia semántica?
       ├── Error/warning → Variant=error|warning
       ├── Confirmación  → Variant=success
       ├── Informativo   → Variant=info
       └── Neutral       → Variant=neutral
```

**Usar Badge cuando:**
- Conteo de notificaciones no leídas sobre un icono de campana (Type=count, Variant=error)
- Indicar que un elemento del menú tiene actividad pendiente (Type=dot)
- Etiquetar un item con una categoría visible ("New", "Beta", "Pro") (Type=label)
- Conteo de mensajes en un Tab (integrado en el slot badge del Tab)
- Conteo de errores en un formulario (Type=count, Variant=error)

**NO usar Badge cuando:**
- El estado se puede comunicar con el color del elemento mismo → usar Variant del elemento
- Se necesita un mensaje de texto extenso → usar Banner o Notification
- El conteo forma parte del copy del label → incluirlo en el texto directamente
- Se necesita una etiqueta clicable → usar Tag o Chip (componente interactivo)

---

## Variaciones visuales

### Type

| Type  | Cuándo usarlo | Notas |
|-------|--------------|-------|
| count | Cuando hay un número relevante (notificaciones, errores, mensajes) | Max overflow: "99+" para números > 99 |
| dot   | Solo presencia — "hay algo" sin revelar cuánto | Siempre Variant=error (rojo); Size fija sm |
| label | Categoría textual corta: "New", "Beta", "Pro", "Verificado" | Usar Variant semántico o neutral |

### Variant

| Variant | Background | Foreground | Uso |
|---------|-----------|-----------|-----|
| neutral | surface/neutral (gris) | text/primary | Categorías genéricas, conteos sin urgencia |
| info    | status/info/bg (azul claro) | status/info/fg (azul) | Notificaciones informativas |
| success | status/success/bg (verde claro) | status/success/fg (verde) | Confirmaciones, "Completado" |
| warning | status/warning/bg (naranja claro) | status/warning/fg (naranja) | Alertas moderadas, "Pendiente" |
| error   | status/error/bg (rojo claro) | status/error/fg (rojo) | Errores, urgencia, notificaciones críticas |

### Size

| Size | Height | MinWidth | PaddingX | FontSize | Uso |
|------|--------|---------|---------|---------|-----|
| sm   | 16px   | 16px    | 4px     | 11px    | Sobre iconos, en espacios compactos |
| md   | 20px   | 20px    | 6px     | 12px    | En componentes más grandes, labels de categoría |

---

## Decisiones de diseño

**1. Type=count|dot|label en un solo componente** — Atlassian separa Badge (label) y Lozenge (categoría) y no tiene componente de count. Polaris tiene Badge unificado. La decisión de unificar los 3 tipos en un componente se basa en que todos comparten la misma forma base (pill o círculo), la misma escala de tamaños, y el mismo sistema de color semántico. En Figma, un componente con Type variant es más manejable que 3 componentes separados.

**2. Type=dot solo con Variant implícito=error** — El dot es el mínimo indicador de presencia: "hay algo aquí" sin revelar cuánto. Material Design 3, Atlassian y la mayoría de sistemas usan rojo (error) para el dot — semánticamente significa "requiere atención". No tiene variantes de color porque el dot sin color semántico es visualmente ambiguo.

**3. Conteo expuesto vía parent aria-label** — Badge nunca tiene role propio. El valor semántico se integra en el aria-label del elemento al que se superpone: `aria-label="Notificaciones, 5 nuevas"` en el botón de campana. Este patrón evita que el screen reader anuncie el badge como elemento separado, rompiendo el flujo de lectura.

**4. Overflow "99+"** — Conteos mayores a 99 se muestran como "99+" — el número exacto no aporta valor visual en el badge. El aria-label del parent debe usar el número real ("Tienes 143 notificaciones nuevas").

### Combinaciones excluidas

```
Type=dot + Variant=neutral|info|success|warning → ✗ dot siempre error (rojo)
Type=dot + Size=md                              → ✗ dot siempre sm (8px)
```

---

## Comportamiento

### Esencial para diseño

- **Badge se superpone o se acompaña** — en implementación, `count` y `dot` se posicionan como overlay absoluto (top-right) del elemento padre. En Figma se modela como frame separado al lado del elemento — el overlay lo implementa el developer.
- **Max overflow "99+"** — el slot `count` acepta "9", "99", "99+" como textos. El desarrollador trunca automáticamente; el diseñador puede mostrar el estado de overflow.
- **showZero** — por defecto, un badge con count=0 se oculta. El developer puede usar `showZero=true` para mostrarlo siempre. El diseñador no necesita modelar este estado.
- **Type=label** — los labels de categoría no deben tener más de 2-3 palabras. Textos largos rompen el shape de pill.

### Accesibilidad (ARIA)

| Caso | Implementación | Por qué importa |
|------|---------------|----------------|
| Badge como overlay | El badge es `aria-hidden="true"` o `role="presentation"` | El valor se comunica vía el parent: `aria-label="Notificaciones, 5 nuevas"` |
| Badge como label de categoría inline | El texto del badge es legible por SR dentro del flujo | Basta con el texto; sin role adicional necesario |
| Type=dot | `aria-hidden="true"` | El parent incluye el estado en su aria-label: "tiene actividad pendiente" |
| Count overflow | Parent usa el número real en aria-label | "Tienes 143 mensajes" aunque el badge muestre "99+" |

### Navegación por teclado

```
Badge no es focusable — sin keyboard interactions.
El elemento padre maneja toda la interacción y el anuncio de SR.
```

---

## Guía de contenido

**Type=count:**
- Mostrar el número real hasta 99; "99+" para mayores
- Si el conteo es siempre 0, considerar ocultar el badge (showZero=false default)
- El aria-label del parent debe incluir el número real y contexto: "Bandeja de entrada, 5 mensajes nuevos"

**Type=label:**
- Máximo 2-3 palabras — forma de pill limita el espacio
- Sentence case: "New" no "NEW"; "En revisión" no "EN REVISIÓN"
- Usar etiquetas concretas y consistentes en todo el DS: "Beta", "Pro", "New", "Verificado", "Archivado"
- Evitar etiquetas genéricas sin contexto: "Estado", "Tipo"

**Type=dot:**
- El parent debe incluir el estado en su aria-label: "Notificaciones (tiene actividad nueva)"
- No agregar tooltip al dot — si necesita texto, usar Type=count o Type=label

**Variant semántico:**
- `error` → algo requiere atención urgente (errores, rechazos, mensajes críticos)
- `warning` → algo requiere revisión (pendientes, borradores, expiración próxima)
- `success` → algo fue completado o aprobado ("Verificado", "Activo")
- `info` → información contextual sin urgencia ("Nuevo", "Actualizado")
- `neutral` → categorías sin connotación semántica ("Beta", "Pro", conteos generales)

---

## Pre-build checklist

```
□ ¿El parent incluye el conteo/estado en su aria-label?
□ ¿El badge tiene aria-hidden="true" cuando es overlay?
□ ¿Type=dot solo en casos de presencia sin valor numérico?
□ ¿Type=dot siempre con Variant=error?
□ ¿Type=label tiene máximo 2-3 palabras?
□ ¿Conteos > 99 muestran "99+" (no el número exacto)?
□ ¿El aria-label del parent usa el número real (no "99+")?
□ ¿Variant es apropiado para la urgencia del contenido?
□ ¿Size=sm para badges sobre iconos? ¿Size=md para labels inline?
```

---

## Componentes relacionados

```
Avatar    → usa Badge/dot para estado de presencia (online/offline)
Tab       → usa Badge/count para conteo de items en el panel
Navbar    → usa Badge/count sobre ítems de navegación
IconButton → usa Badge/count o dot para notificaciones
Tag/Chip  → para etiquetas interactivas (con click/remove) — Badge es siempre pasivo
Button    → Badge count embebido en botón de acción es anti-patrón; usar label del botón
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Types | Sizes | Color semántico | Overflow | Diferenciador |
|---------|-------|-------|-------|----------------|---------|--------------|
| **Material Design 3** | Badge | count + dot | Sin size prop | Brand color fijo | "+" suffix | Single color; no semántico; posicionamiento CSS |
| **Spectrum (Adobe)** | Badge | label only | S/M/L | semantic + staticColor | N/A | Label badge; no count/dot; staticColor para fondos dark |
| **Carbon (IBM)** | Tag / Notification indicator | label / dot | sm/md | semantic | N/A | Tag interactivo; indicator es solo CSS utility |
| **Polaris (Shopify)** | Badge | label only | default/sm | semantic (info/warning/critical/success) | N/A | Tonal + outline variants; progress indicator |
| **Atlassian** | Badge + Lozenge | count / label | No prop | Lozenge: semantic; Badge: solo count | "99+" | Badge solo numérico; Lozenge es label; separados |
| **Ant Design** | Badge | count + dot + ribbon | Sin size prop | status colors (5) | configurable | Ribbon variant; showZero prop; customizable overflow |
| **Twilio Paste** | Badge | label only | default/small | semantic (5) + neutral + decorative | N/A | Decorative variants para estilo custom |
| **Lightning** | Badge | label only | — | — | — | CSS utility; sin componente React |
| **Primer (GitHub)** | CounterLabel | count | S/M | neutral + primary + secondary | N/A | Solo count; nada de dot/label; Counter + Label separados |
| **shadcn/ui** | Badge | label only | — | default/secondary/outline/destructive | N/A | Radix sin primitivo headless; solo CSS variants |
| **Chakra UI** | Badge | label only | sm/md/lg | semantic (5) + custom | N/A | Solid/subtle/outline variants; colorScheme |
| **Fluent 2** | Badge / CounterBadge | label / count | tiny/sm/md/lg/xl | brand/danger/warning/success/info | 99 | CounterBadge separado; presenceBadge para avatar |
| **Gestalt (Pinterest)** | Badge | label only | — | neutral + error + warning + success + info | N/A | Cero configuración; un solo look por variant |
| **Mantine** | Badge | label only | xs/sm/md/lg/xl | semantic + custom | N/A | gradient variant; leftSection/rightSection slots |
| **Orbit (Kiwi)** | Badge | label only | — | Neutral/info/success/warning/critical | N/A | Domain-specific; circleBadge separado |
| **Evergreen** | Badge + Pill | label / count | — | Semantic (Badge) + 24 colors (Pill) | N/A | Pill con colorScheme amplio; Badge semántico |
| **Nord** | nord-badge | label only | sm/md/lg | semantic | N/A | Web component; healthcare neutral |
| **GOV.UK** | Tag | label only | — | semantic (10 colores) | N/A | Government-specific colors; sin count |

**Patrones clave de la industria:**
1. **Badge de count numérico** — Solo Atlassian, Fluent 2, Ant Design, y Primer lo modelan como componente separado. La mayoría solo tiene badges de label. Unificar count + dot + label en un componente reduce la superficie de API.
2. **Dot solo en overlay de avatar/icon** — M3, Ant y Fluent 2 (PresenceBadge) tienen dot explícito. El resto lo deja a CSS. La decisión de incluirlo como Type simplifica su uso sin requerir CSS manual.
3. **Overflow "99+"** — Ant Design lo hace configurable; Atlassian usa 99 como fijo; Fluent usa 99. El consenso es truncar en 99 y mostrar "+".
4. **Sin interacción** — Ningún sistema hace el badge clickeable por sí solo. La interacción siempre está en el elemento padre.

---

## Tokens

**12 tokens** · prefijo `bdg-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `bdg-neutral-bg` | `surface/neutral` | Background neutral |
| `bdg-neutral-fg` | `text/primary` | Foreground neutral |
| `bdg-info-bg` | `status/info/bg` | Background info |
| `bdg-info-fg` | `status/info/fg` | Foreground info |
| `bdg-success-bg` | `status/success/bg` | Background success |
| `bdg-success-fg` | `status/success/fg` | Foreground success |
| `bdg-warning-bg` | `status/warning/bg` | Background warning |
| `bdg-warning-fg` | `status/warning/fg` | Foreground warning |
| `bdg-error-bg` | `status/error/bg` | Background error |
| `bdg-error-fg` | `status/error/fg` | Foreground error |
| `bdg-dot-bg` | `status/error/fg` | Color del dot (siempre rojo) |
| `bdg-radius` | `radius/full` | Pill shape — 9999px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size sm:                                                 │
│  h: 16px · minW: 16px · px: 4px                          │
│  font: 11px/500/14px                                     │
│  dot sm: 8px × 8px                                       │
│                                                           │
│  Size md:                                                 │
│  h: 20px · minW: 20px · px: 6px                          │
│  font: 12px/500/16px                                     │
│  dot md: N/A (dot siempre sm)                            │
│                                                           │
│  Frames totales:                                          │
│  count(5 variants × 2 sizes) + label(5×2) + dot(1) = 21  │
└──────────────────────────────────────────────────────────┘
```
