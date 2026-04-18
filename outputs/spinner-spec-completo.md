# Spinner

## Overview

El componente Spinner es un indicador de carga circular indeterminado — comunica que una operación está en progreso sin especificar cuánto tiempo tomará ni cuánto ha avanzado. Es el primitivo de feedback de carga más universal del design system, presente en 18 de los 21 sistemas que tienen una solución explícita (GOV.UK, shadcn/ui y REI Cedar usan patrones alternativos). Se usa en tres contextos principales: dentro de botones durante submit, en secciones mientras carga contenido, y como overlay de página para operaciones bloqueantes. A diferencia de un ProgressBar (determinado), el Spinner no conoce el porcentaje de avance — solo que algo está pasando.

```
Spinner sm (16px) — dentro de botón
┌──────────────────────────────┐
│  ┌────────────────────────┐  │
│  │  ◯  Guardando...       │  │
│  └────────────────────────┘  │
│  ↑ sm=16px, sin label        │
└──────────────────────────────┘

Spinner md (24px) — sección cargando
┌─────────────────────────────────┐
│                                 │
│              ◯                  │
│         Cargando...             │
│   ← Has Label=true, md=24px →   │
│                                 │
└─────────────────────────────────┘

Spinner lg (40px) — page overlay
┌─────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░┌───────────┐░░░░░░░░░ │
│ ░░░░░░░│    ◯      │░░░░░░░░░ │
│ ░░░░░░░│ Procesando│░░░░░░░░░ │
│ ░░░░░░░└───────────┘░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────┘

Spinner invert — sobre fondo oscuro/botón primario
  [  ◯  Guardando...  ]  ← Color=invert (blanco sobre oscuro)
```

El Spinner no es focusable ni interactivo. Su única responsabilidad es comunicar estado de espera de forma visual y asistida. El `role="status"` crea un `aria-live="polite"` implícito que anuncia la presencia del spinner a lectores de pantalla sin interrumpir la experiencia del usuario.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Size:  sm | md | lg
Color: default | invert
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Label → muestra/oculta label de texto visible (slot: label)
```

### Figma properties panel

```
╔══════════════════════════════════╗
║  Spinner                         ║
╠══════════════════════════════════╣
║  Size   ○ sm  ● md  ○ lg         ║
║  Color  ● default  ○ invert      ║
╠══════════════════════════════════╣
║  Has Label          [ Toggle ]   ║
╠══════════════════════════════════╣
║  ✏️ Label  [Cargando...]         ║
╚══════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Hay una operación en progreso que el usuario necesita conocer?
├── Sí → ¿La operación afecta contenido con una forma y tamaño conocidos?
│         ├── Sí → Skeleton loader (no Spinner)
│         └── No → ¿La operación bloquea la interfaz completa?
│                   ├── Sí → Spinner lg + overlay
│                   └── No → ¿Es dentro de un botón o acción puntual?
│                             ├── Sí → Spinner sm (Color según fondo)
│                             └── No → Spinner md en la sección afectada
└── No → No usar Spinner (eliminar si la operación es muy rápida, <200ms)
```

**Use Spinner when:**
- Un botón o acción está procesando: submit de formulario, guardado, eliminación.
- Una sección de la página está cargando datos (y no se conoce la forma del contenido).
- Una operación bloqueante requiere overlay: exportación, procesamiento masivo, generación de reporte.
- El contenido tarda más de 200ms en cargarse (usar delay para evitar flash en operaciones rápidas).

**Do NOT use Spinner when:**
- El contenido tiene forma definida (cards, tablas, perfiles) — usar Skeleton loader.
- La operación es tan rápida (<200ms) que el spinner flashea antes de desaparecer — usar delay prop.
- Hay múltiples spinners simultáneos en la misma vista — indica un problema de UX, no una solución de componente.
- La carga es la experiencia inicial completa de la app — usar skeleton page o loading screen personalizada.

---

## Visual variations

### Por tamaño

| Size | Diámetro | Stroke width | Font size (label) | Label gap |
|------|----------|-------------|-------------------|-----------|
| sm   | 16px     | 2px         | 12px              | 6px       |
| md   | 24px     | 2px         | 14px              | 8px       |
| lg   | 40px     | 3px         | 14px              | 12px      |

### Por color

**default** — para fondos claros (blanco, surface/default, surface/hover):
- Track (anillo inactivo): `#E3E3E8` (border/default aclarado)
- Indicator (arco animado): `#2659EB` (interactive/default, azul)
- Label fg: `#6B7280` (text/secondary)

**invert** — para fondos oscuros (botones primarios, overlays, dark mode):
- Track: `rgba(255,255,255,0.3)` (blanco semi-transparente)
- Indicator: `#FFFFFF` (blanco puro)
- Label fg: `#FFFFFF`

### Anatomía visual

El Spinner se compone de dos arcos concéntricos:
1. **Track (anillo completo):** círculo de 360° en color gris/blanco-30% que sirve de referencia visual.
2. **Indicator (arco animado):** arco de ~270° que rota indefinidamente sobre el track.

La animación es una rotación de 0° a 360° en ~1 segundo con `ease-linear`. Con `prefers-reduced-motion`: la animación se detiene (el arco queda estático en la posición inicial).

### Has Label

Cuando `Has Label=true`, el label de texto aparece **debajo** del spinner (centrado). La distancia entre el círculo y el primer baseline del texto es el `labelGap`.

Layout vertical:
```
    ◯       ← spinner circle (diameter)
  [gap]     ← labelGap (6/8/12px según size)
 Cargando   ← label text
```

### Color=invert en contextos comunes

- **Botón primario loading:** `Color=invert, Size=sm` — el spinner blanco sobre el fondo azul del botón.
- **Overlay oscuro:** `Color=invert, Size=lg` — spinner blanco sobre backdrop semitransparente.
- **Tarjeta con imagen:** `Color=invert, Size=md` — spinner blanco sobre imagen de fondo oscura.

---

## Design decisions

### 1. Color=default|invert (no variantes semánticas multiplicadas por size)

**Por qué:** El Spinner no tiene semántica de estado de éxito/error/warning — solo comunica "esperando". La única dimensión de color relevante es el contraste de fondo: sobre fondos claros (default) vs. sobre fondos oscuros (invert). Atlassian usa `invert` como nombre semántico de contexto (no un valor de color), lo que lo hace más mantenible en design tokens que usar `color="white"`.

**Tradeoff:** Dos variantes de color en lugar de un sistema más granular. Si en el futuro se necesitan spinners con branding de colores específicos (azul, verde, naranja), se puede agregar una prop `color` con valores de token, pero el default+invert cubre el 95% de los casos.

### 2. role=status, no role=progressbar

**Por qué:** `role="progressbar"` requiere `aria-valuenow`, `aria-valuemin`, y `aria-valuemax` — atributos que no tienen significado para una carga indeterminada. Para spinners indeterminados, `role="status"` (que crea un `aria-live="polite"` implícito) es semánticamente más correcto (patrón de Atlassian). M3 y Spectrum usan `progressbar` pero sin los atributos requeridos — técnicamente incorrecto per ARIA spec.

**Tradeoff:** Algunos sistemas y herramientas asumen `progressbar` para spinners — puede haber inconsistencias en cómo AT lo anuncia cross-browser. La solución es testear con JAWS, NVDA, y VoiceOver para verificar el anuncio.

### 3. Has Label boolean (default OFF)

**Por qué:** Atlassian prescribe labels descriptivos para spinners. Sin embargo, en la mayoría de casos de uso en Zoom el spinner va dentro de un botón (donde el botón ya tiene texto como contexto) o en una sección de contenido (donde el contexto es visual). Un label adicional como "Cargando..." sería redundante en estos casos. `Has Label=true` debe activarse cuando el contexto no sea suficientemente claro — por ejemplo, overlays de página completa con operaciones largas.

**Tradeoff:** Default OFF significa que algunos spinners en producción podrán no tener label visible. Sin embargo, `aria-label` en el wrapper es siempre obligatorio para AT — el label visible es complementario, no la única fuente de nombre accesible.

### 4. Separación de Spinner (primitivo) del overlay

**Por qué:** Ant Design hace el overlay first-class (`<Spin>` como wrapper). La mayoría de sistemas (Spectrum, Atlassian, Polaris, Carbon) mantienen el spinner como primitivo y dejan el overlay para el nivel de aplicación. La razón: el overlay requiere gestión de focus (`inert` en el contenido bloqueado), z-index, backdrop — preocupaciones de layout que no pertenecen al primitivo de feedback.

**Tradeoff:** El equipo de desarrollo debe implementar overlays consistentemente a nivel de app. El patrón correcto (SpinnerOverlay como componente separado) está documentado en "Related components".

### Excluded combinations

```
Size=sm + Has Label=true → Posible pero no recomendado en botones (espacio muy ajustado)
Color=default sobre fondo oscuro → incumple contraste WCAG 1.4.3
Color=invert sobre fondo claro → incumple contraste WCAG 1.4.3
```

---

## Behavior

### Essential for design

**No es focusable:** El Spinner no recibe foco de teclado ni mouse. No es una acción interactiva — solo comunica estado. En contextos donde el spinner está dentro de un `<button>`, el foco es del botón, no del spinner.

**aria-busy en el contenedor:** El `aria-busy="true"` se coloca en el elemento que está cargando (la tabla, la sección, el botón), no en el spinner. Cuando el contenido carga, `aria-busy` cambia a `false` — el AT anuncia que la región terminó de cargar.

**Overlay bloqueante:** En modo overlay de página, el contenido detrás del overlay debe recibir `inert` o `aria-hidden="true"` + `tabindex="-1"` en todos sus elementos para evitar que el foco de teclado llegue a elementos visualmente ocultos. Ant Design no hace esto automáticamente — es una brecha documentada en todos los sistemas con overlay.

**delay para prevenir flash:** Operaciones de menos de 200ms no deben mostrar el spinner — aparece y desaparece tan rápido que crea un flash visual perturbador. El delay de visibilidad (200ms recomendado, Ant Design pattern) evita este problema.

**prefers-reduced-motion:** La animación de rotación del spinner debe detenerse cuando el usuario ha configurado reducción de movimiento. WCAG 2.3.3 (SC Level AAA, pero best practice broadly aplicada).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Spinner wrapper | `status` | `aria-label="Cargando [contexto específico]"` | Crea aria-live polite implícito; aria-label da contexto |
| Contenedor padre | — | `aria-busy="true"` mientras carga | AT anuncia que la región está en proceso |
| Label visible | — | Texto en DOM (no aria-label oculto) | Texto visible es de mayor calidad a11y que aria-label oculto |
| SVG animation | — | `aria-hidden="true"` | El SVG es decorativo; el nombre accesible viene del wrapper |
| Overlay backdrop | — | `inert` en contenido bloqueado | Previene foco de teclado en elementos visualmente ocultos |

### Keyboard navigation

Primary interactions (affect design):

```
Sin interacciones de teclado — el Spinner no es focusable.
```

Secondary interactions (dev reference):

```
Cuando Spinner aparece en contexto de botón:
  El botón puede recibir foco, el Spinner dentro es aria-hidden.
  Si el botón está disabled durante loading: ya no es focusable.

Cuando Spinner está en overlay:
  Todo el contenido detrás del overlay: inert/aria-hidden.
  No hay foco que "escapar" al overlay.
```

---

## Content guide

### Slot: aria-label del spinner wrapper

El aria-label debe ser contextual, nunca genérico. Describe QUÉ está cargando:

| Contexto | aria-label correcto | aria-label incorrecto |
|----------|--------------------|-----------------------|
| Submit de formulario | "Guardando cambios" | "Cargando" |
| Carga de tabla | "Cargando lista de contactos" | "Loading..." |
| Exportación | "Generando reporte, esto puede tomar un momento" | "Procesando" |
| Botón de eliminación | "Eliminando registro" | "Cargando" |

La regla: el aria-label debe responder "¿qué está haciendo la app ahora mismo?" con suficiente contexto para que el usuario entienda que no necesita hacer nada más.

### Slot: label (texto visible)

Cuando `Has Label=true`, el texto visible sigue las mismas reglas que el aria-label — específico y contextual:

- **Correcto:** "Guardando cambios...", "Cargando registros...", "Procesando 1,847 elementos..."
- **Incorrecto:** "Cargando...", "Por favor espere", "Loading"

Para operaciones largas (>3 segundos), el label puede incluir progreso contextual: "Importando archivo 3 de 5..."

### Spinner vs Skeleton: la decisión

Usar Spinner cuando:
- Se realiza una **acción** (submit, save, delete, export) — el usuario inició algo y espera el resultado.
- Se carga contenido cuya **forma no se conoce** (datos variables, contenido dinámico).
- La carga es para una sección **pequeña** (no una página completa de contenido estructurado).

Usar Skeleton cuando:
- Se carga contenido cuya **forma se conoce** (una lista de cards siempre tiene la misma estructura).
- Es la carga **inicial de una página** o sección grande.
- Se quiere **reducir la percepción de latencia** — los skeletons hacen que la carga parezca más rápida.

---

## Pre-build checklist

```
[ ] Size sm (16px), md (24px), lg (40px) generados
[ ] Color default y invert generados
[ ] Has Label toggle: muestra/oculta label slot
[ ] Color=default: track gris (#E3E3E8), indicator azul (#2659EB)
[ ] Color=invert: track rgba(255,255,255,0.3), indicator blanco
[ ] Has Label text: "Cargando..." como default
[ ] Spinner no tiene estado hover/focus (no es interactivo)
[ ] Spinner centrado verticalmente cuando se usa en secciones
[ ] role="status" documentado en annotation layer
[ ] aria-label="Cargando [contexto]" documentado como required
[ ] aria-busy="true" en contenedor padre documentado
[ ] prefers-reduced-motion: animación pausa (CSS note)
[ ] Token prefix spn- aplicado (8 tokens)
[ ] Guía Spinner vs Skeleton incluida en design guidelines
```

---

## Related components

```
Progress (ProgressBar)  → carga determinada con porcentaje conocido
Skeleton                → carga de contenido con forma conocida
SpinnerOverlay          → patrón de overlay (Spinner + backdrop + focus management)
InlineLoading           → ciclo de vida completo: loading → success/error (Carbon pattern)
Button                  → contenedor que usa Size=sm del Spinner en loading state
```

---

## Reference: how other systems do it

**Material Design 3** usa `CircularProgressIndicator` unificado para spinner (indeterminado) y progress (determinado), controlado por un prop `value` nullable. Sin `value`: modo indeterminado. Con `value`: modo determinado. La animación de cuatro colores (`four-color` attribute) participa en el sistema de identidad de Material You. El tamaño se configura mediante una CSS custom property (`--md-circular-progress-size`) sin enum S/M/L. Sin overlay incorporado — la filosofía es que la app compone backdrop + spinner. Sin `prefers-reduced-motion` support nativo — debe añadirse via CSS override.

**Spectrum/Adobe** separa `ProgressCircle` de `ProgressBar` como componentes distintos porque circular y lineal ocupan posiciones de layout diferentes (icon slots vs. form-level progress). El boolean `isIndeterminate` es explícito — un desarrollador no puede accidentalmente activar modo indeterminado olvidando pasar un número. La prop `staticColor` (`white` | `black`) soluciona un problema real: herramientas creativas de Adobe muestran UI sobre contenido fotográfico del usuario, haciendo un spinner de color default invisible sobre una fotografía oscura. `aria-label` requerido en TypeScript — el enforcement de a11y más fuerte del Tier 1.

**Carbon/IBM** define tres componentes distintos en lugar de uno con un `type` prop: `Loading` (spinner completo con overlay opcional), `InlineLoading` (máquina de estados activo→finished/error), y un spinner pequeño standalone. La distinción refleja contratos de interacción fundamentalmente diferentes. `InlineLoading` es el componente de ciclo de vida async más sofisticado de los 24 sistemas: modela cuatro estados (active, inactive, finished, error) con `aria-live` announcements en cada transición. `description` text sirve tanto de label visible como de nombre accesible — single source of truth.

**Polaris/Shopify** es el más minimalista: dos tamaños (20px small, 44px large) mapeados exactamente a dos casos de uso (loading-in-button y loading-a-section). La prop `hasFocusableParent` suprime el `role` cuando el spinner está dentro de un `<button>` — previene el doble-anuncio ("Loading button button"). `accessibilityLabel` usa mecanismo DOM en lugar de SVG `<title>` — SVG titles son anunciados inconsistentemente cross-browser, el mecanismo DOM es confiable. Los spinners se limitan a estados disparados por acciones; skeleton screens están mandatadas para cargas iniciales.

**Atlassian** es la referencia para la guía de labels descriptivos: documentación explícita contra "Loading" genérico — "Loading project settings" es correcto, "Loading" es demasiado genérico. La prop `invert` como descriptor semántico de contexto (no valor de color) alineado con el sistema de colores semánticos. `role="status"` crea `aria-live="polite"` implícito. `prefers-reduced-motion` soportado via motion tokens — la implementación más clean del sistema de tokens.

**Ant Design** es el único Tier 1 con un patrón de wrapper/overlay como first-class (`<Spin spinning={loading}><Content /></Spin>`). La prop `delay` (ms) suprime el spinner para operaciones rápidas — el único sistema Tier 1 con flash prevention integrado al nivel del componente. `tip` para mensaje contextual visible debajo del spinner en operaciones largas. `fullscreen` para cobertura de viewport completo. Gap conocido: el overlay no aplica `inert` al contenido bloqueado — keyboard focus puede llegar a elementos visualmente ocultos.

**Twilio Paste** tiene el spinner SVG con variantes de color y `accessibilityLabel` siempre requerido — sin default, sin override posible de omitirlo. Apropiado para contextos de contact center donde la a11y es crítica.

**GitHub Primer** requiere `sr-only` label: label visualmente oculto en el DOM que es anunciado por AT pero no visible. La diferencia con Atlassian: el label de Primer es visually hidden, el de Atlassian puede ser visible con `Has Label=true`.

**Fluent 2/Microsoft** tiene el control de posición de label más completo: `labelPosition` (above, below, before, after) y 7 opciones de tamaño. `appearance` (primary/inverted) para adaptación a backgrounds. Usado en Microsoft 365 y Teams donde el spinner aparece en múltiples contextos de layout.

**Mantine** ofrece tres tipos de animación (`type="oval" | "bars" | "dots"`) y un registro de loaders custom via `MantineProvider` — la única implementación con tipos de animación configurables como first-class API.

**Orbit (Kiwi.com)** separa por `type` el contexto: `"page"` para carga de página completa, `"inline"` para contenido inline, `"button"` para dentro de botones. La decisión de cuál usar está en el API, no en la documentación de guidelines.

---

## Tokens

**8 tokens** · prefix `spn-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `spn/track` | `border/default` | Anillo inactivo (Color=default) |
| `spn/indicator` | `interactive/default` | Arco animado (Color=default) |
| `spn/label-color` | `text/secondary` | Color del label visible (Color=default) |
| `spn/invert/track` | `surface/default/alpha-30` | Anillo inactivo (Color=invert) |
| `spn/invert/indicator` | `text/inverse` | Arco animado (Color=invert) |
| `spn/invert/label` | `text/inverse` | Color del label visible (Color=invert) |
| (focus/ring) | `border/focus` | N/A — Spinner no es focusable |
| (motion) | `motion/reduced` | Control de animación prefers-reduced-motion |

### Spacing specs

```
Size sm: diameter=16px  strokeWidth=2px  labelGap=6px  fontSize=12px
Size md: diameter=24px  strokeWidth=2px  labelGap=8px  fontSize=14px
Size lg: diameter=40px  strokeWidth=3px  labelGap=12px fontSize=14px

Layout vertical (Has Label=true):
  ┌────────────────────┐
  │  ◯  (diameter)     │
  │  │  (labelGap)     │
  │ Cargando... (text) │
  └────────────────────┘

Circle anatomy:
  Outer radius = diameter / 2
  Inner radius = outer radius - strokeWidth
  Track arc: 360° full circle
  Indicator arc: ~270° (3/4 del círculo visible)
  Animation: rotate 360° en ~1000ms, ease-linear, infinite

Color=default stroke colors:
  Track:     rgba(#E3E3E8) → border/default (aclarado)
  Indicator: #2659EB → interactive/default

Color=invert stroke colors:
  Track:     rgba(255,255,255,0.3)
  Indicator: #FFFFFF → text/inverse
```
