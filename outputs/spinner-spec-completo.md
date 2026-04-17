# Spinner

## Descripción general

Spinner es el indicador de carga circular indeterminado del sistema de diseño: una animación de anillo que comunica "el sistema está procesando, por favor espera". Es la representación visual de estado `loading` para operaciones sin duración conocida — a diferencia de Progress que modela operaciones con porcentaje conocido. Spinner es siempre pasivo (sin interacción) y casi siempre se ubica dentro o adyacente al elemento que está cargando, no como overlay de página completa (para eso se usa Size=lg con overlay).

```
Size=sm (16px):     Size=md (24px):     Size=lg (40px):
   ╭───╮               ╭─────╮              ╭─────────╮
  ╱ ↺  ╲             ╱   ↺   ╲           ╱     ↺      ╲
  ╲     ╱             ╲       ╱           ╲             ╱
   ╰───╯               ╰─────╯              ╰─────────╯
 stroke:2px           stroke:2px          stroke:3px
 color:brand          color:brand         color:brand

Color=default:                Color=invert:
  track:  border/default        track:  white/30%
  indicator: interactive        indicator: white/100%

Con Has Label=on:
  ╭───╮
  ╰───╯
  Cargando...   ← 12/14px · text/secondary · gap: 6/8/12px
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size  → sm (16px) | md (24px) | lg (40px)
Color → default | invert
```

Toggles:

```
👁 Has Label → muestra/oculta el texto de carga debajo del spinner
```

Texto editable:

```
✏️ Label → "Cargando..."
```

### Panel de propiedades en Figma

```
┌────────────────────────────────────────────┐
│  Spinner                                   │
│  ────────────────────────────────────────  │
│  Size   [ md              ▼ ]              │
│  Color  [ default         ▼ ]              │
│  ────────────────────────────────────────  │
│  👁 Has Label  [ off ]                     │
│  ✏️ Label      [ Cargando...            ]  │
└────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El sistema está procesando algo sin duración conocida?
                    │
                    ▼
       ¿Hay un porcentaje de avance disponible?
       ├── Sí → Progress (determinate)
       └── No → Spinner
                    │
                    ▼
       ¿Cuál es el contexto de carga?
       ├── Dentro de un botón (submit) → Size=sm, Color depende del button variant
       ├── Sección de contenido (card, widget) → Size=md centrado
       ├── Página completa / overlay → Size=lg + overlay opcional
       └── Inline en texto → Size=sm
                    │
                    ▼
       ¿El fondo es oscuro (botón primario, overlay dark)?
       ├── Sí → Color=invert
       └── No → Color=default
```

**Usar Spinner cuando:**
- Botón de submit en un formulario mientras se procesa la petición (dentro del Button, Size=sm)
- Loading state de una sección de datos (tabla, card, lista) mientras carga la API
- Loading de página completa en transiciones de rutas (Size=lg, overlay)
- Carga de un modal con datos remotos (centrado en el área del modal)
- Inline después de un input que valida asíncronamente

**NO usar Spinner cuando:**
- La duración es conocida (porcentaje) → usar `Progress`
- El contenido tiene forma definida → usar `Skeleton` (comunica el shape del contenido futuro)
- El estado de carga es de muy corta duración (<200ms) → no mostrar spinner (evitar flash)
- La operación está en cola o es batch → usar Progress con estado

---

## Variaciones visuales

### Size

| Size | Diameter | Stroke | LabelGap | LabelFontSize | Uso |
|------|---------|--------|---------|-------------|-----|
| sm   | 16px    | 2px    | 6px     | 12px        | Dentro de botones, inline, listas compactas |
| md   | 24px    | 2px    | 8px     | 14px        | Secciones, cards, modales, espacios medianos |
| lg   | 40px    | 3px    | 12px    | 14px        | Estados de carga de página completa, overlays |

### Color

| Color   | Track             | Indicator          | Contexto |
|---------|-------------------|--------------------|---------|
| default | border/default (gris) | interactive/default (azul) | Fondos claros — superficies blancas, cards, formularios |
| invert  | white/30% alpha   | white/100%          | Fondos oscuros — botón primario filled, overlay, dark hero |

---

## Decisiones de diseño

**1. Color=default|invert (no variants semánticos)** — Spinner no comunica semántica de estado — solo dice "espera". La única dimensión de color que importa es el contraste con el fondo: claro (default) vs oscuro (invert). Agregar variants de color semántico (error, success) no tendría sentido — si la carga falló, el spinner desaparece y aparece un estado de error. Atlassian usa exactamente este nombre ("invert") para el mismo patrón.

**2. role=status (no role=progressbar)** — `role=progressbar` requiere `aria-valuenow`, `aria-valuemin`, `aria-valuemax` — propiedades que no aplican a indicadores indeterminados. `role=status` crea automáticamente un `aria-live="polite"` implícito, que es el comportamiento correcto: anunciar al screen reader de forma no interrumpiva que algo está cargando. Atlassian, Radix y shadcn usan este pattern; M3 usa progressbar con valores vacíos — inconsistente con la spec.

**3. Has Label boolean (default OFF)** — En la mayoría de contextos, el spinner va dentro de un botón o junto a texto existente que ya describe lo que está cargando. Agregar label sería redundante. El toggle permite activarlo cuando el contexto no comunica por sí solo qué está cargando (ej. loading de página completa). Atlassian prescribe labels descriptivos como best practice.

**4. prefers-reduced-motion** — WCAG 2.3.3 (Success Criterion): animaciones deben poder ser desactivadas. Cuando el usuario tiene activada la preferencia de reducción de movimiento, el spinner detiene su rotación (o la desacelera significativamente). El developer implementa esto vía `@media (prefers-reduced-motion: reduce)`. El diseñador no necesita modelarlo, pero debe conocerlo para prototipos.

**5. delay de 200ms antes de mostrar** — Para evitar el "flash" de spinner en operaciones rápidas (<200ms), el developer puede implementar un delay antes de mostrar el spinner. El diseñador trabaja con el estado de loading como si siempre se mostrara — el delay es transparente en Figma.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Size × Color son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Spinner no bloquea la UI por sí solo** — mostrar un spinner no agrega un overlay ni impide la interacción. Si se necesita bloquear la UI durante la carga, el developer agrega un overlay explícito. En el diseño, modelar el overlay como elemento separado.
- **Dentro de botón (Size=sm)** — el botón en estado loading reemplaza el label con Spinner+Label="Guardando..." o Spinner solo (el label original desaparece). El botón sigue mostrando el mismo ancho para evitar layout shift.
- **Centrado en la sección** — para loading de cards o secciones completas, el spinner se centra horizontal y verticalmente en el área que está cargando. El fondo del área puede ser surface/hover para indicar estado de loading.
- **Has Label=true** — el label va debajo del spinner, centrado. En Size=lg con Has Label, el conjunto spinner+label puede ocupar el área central de una pantalla de carga full.
- **Transición de salida** — cuando el contenido carga, el spinner desaparece y el contenido aparece. Idealmente hay una transición de opacity (fade out spinner, fade in content) — el developer implementa, el diseñador puede prototipar con Smart Animate en Figma.

### Accesibilidad (ARIA)

| Caso | Implementación | Por qué importa |
|------|---------------|----------------|
| Spinner sin label | `role="status"` + `aria-label="Cargando"` | SR anuncia "Cargando" al aparecer (polite) |
| Spinner con label visible | `role="status"` + label como `<span>` | SR lee el texto visible; aria-label no necesario |
| Spinner en botón | `aria-busy="true"` en el botón | SR sabe que el botón está procesando |
| Overlay de página | `aria-busy="true"` en el container principal | SR anuncia que el contenido está pendiente |
| Overlay dark | El contenido detrás debe tener `inert` o `aria-hidden="true"` | SR no lee contenido detrás del overlay |
| prefers-reduced-motion | Animación se detiene | WCAG 2.3.3 — animaciones no deben persistir sin control |

### Navegación por teclado

```
Spinner no es focusable — sin keyboard interactions.

Cuando Spinner está en un overlay:
→ El foco debe estar en el spinner (o su container) para no perderse
→ Los elementos detrás deben tener inert o aria-hidden
```

---

## Guía de contenido

**Label (Has Label=true):**
- Siempre descriptivo — "Cargando" sola no aporta valor; "Cargando resultados" sí
- Formato: "Cargando [qué está cargando]" → "Cargando tu historial", "Guardando cambios", "Procesando pago"
- Evitar puntos suspensivos en el label visible — la animación ya comunica la espera
- Longitud máxima: 3-4 palabras — el spinner + label deben caber en contextos compactos
- Para Size=lg en loading de página: puede ser más específico — "Preparando tu dashboard"

**Cuándo usar cada Size:**
- `sm` dentro de botones de acción (submit, save) — el spinner reemplaza el ícono o texto del botón
- `md` para loading de secciones, cards, modales — visible y no dominante
- `lg` para loading de página completa — visible a distancia, con label descriptivo

---

## Pre-build checklist

```
□ ¿role="status" implementado (no role="progressbar")?
□ ¿aria-label descriptivo cuando Has Label=false?
□ ¿aria-busy="true" en el elemento contenedor que carga?
□ ¿Color=invert en fondos oscuros (botón primario, overlay)?
□ ¿Color=default en fondos claros?
□ ¿Overlay tiene inert/aria-hidden en el contenido de fondo?
□ ¿prefers-reduced-motion detiene la animación?
□ ¿Delay de 200ms antes de mostrar (evitar flash)?
□ ¿Has Label=true cuando el contexto no describe qué carga?
□ ¿Label es descriptivo ("Cargando resultados", no solo "Cargando")?
```

---

## Componentes relacionados

```
Progress  → para operaciones con porcentaje conocido (determinate)
Skeleton  → para loading de contenido con forma conocida (comunica el shape)
Button    → usa Spinner/sm internamente en su loading state
Modal     → puede contener Spinner/md centrado mientras carga datos
Table     → usa Spinner/md centrado sobre la tabla mientras carga
Overlay   → wrapper para Spinner/lg + backdrop en loading de página
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Sizes | Color variants | Label | Indeterminate | Diferenciador |
|---------|-------|-------|---------------|-------|--------------|--------------|
| **Material Design 3** | CircularProgressIndicator | — | color prop (colorScheme) | No | Sí | Determinate + indeterminate; strokeWidth configurable |
| **Spectrum (Adobe)** | ProgressCircle | S/M/L | No variants | No | Sí | isIndeterminate prop; ARIA progressbar con value vacío |
| **Carbon (IBM)** | Loading | sm/md | No variants | label | Sí | Overlay mode (withOverlay); active prop |
| **Polaris (Shopify)** | Spinner | sm/lg | hasFocusRing | accessibilityLabel | Sí | accessibilityLabel obligatorio |
| **Atlassian** | Spinner | sm/md/lg/xl | invert | label | Sí | invert prop para fondos oscuros; label como best practice |
| **Ant Design** | Spin | sm/default/lg | — | tip | Sí | wrapperClassName; fullscreen mode; delay prop |
| **Twilio Paste** | Spinner | sizeIcon10–110 | decorative/title | title | Sí | title obligatorio para accesibilidad |
| **Lightning** | Spinner | sm/md/lg | brand/inverse/base | No | Sí | container overlay automático |
| **Primer (GitHub)** | Spinner | sm/md/lg | No | No | Sí | Native; sin label; aria-label en consumer |
| **shadcn/ui** | No component | — | — | — | — | Lucide RotateCcw icon + CSS animation |
| **Chakra UI** | Spinner | xs/sm/md/lg/xl | colorScheme | label | Sí | emptyColor para track; thickness prop |
| **Fluent 2** | Spinner | tiny/xs/sm/md/lg/xl/huge | brand/inverted | label (labelPosition) | Sí | labelPosition: above/below/before/after |
| **Gestalt (Pinterest)** | Spinner | sm/md | No | accessibilityLabel | Sí | accessibilityLabel obligatorio; show prop |
| **Mantine** | Loader | xs/sm/md/lg/xl | color prop | No | Sí | 3 variants: oval/bars/dots; size como number |
| **Orbit (Kiwi)** | Loading | sm/md | No | No | Sí | Domain-specific loading states |
| **Evergreen** | Spinner | — | No | No | Sí | Sin size; usar CSS para tamaño |
| **Nord** | nord-spinner | sm/md/lg | No | label | Sí | Healthcare; accessible por defecto |

**Patrones clave de la industria:**
1. **3 sizes (sm/md/lg)** — El consenso de T1+T2 es ofrecer 3 tamaños: compacto (botones), estándar (secciones), y grande (páginas). Carbon, Atlassian, y Polaris usan exactamente este modelo.
2. **Invert/inverse para fondos oscuros** — Atlassian y Lightning tienen esta propiedad explícita. El resto usa color prop genérico. La propiedad explícita `invert` comunica mejor la intención semántica.
3. **Label opcional** — La mayoría lo tiene como prop opcional. Polaris y Twilio lo hacen "obligatorio" para accesibilidad (necesitan alt text). La decisión de default OFF con toggle es el balance correcto.
4. **role=status vs progressbar** — Atlassian, Twilio, y Primer usan `role="status"`. Spectrum y M3 usan `role="progressbar"` sin los atributos requeridos. `role="status"` es más correcto para indeterminados.

---

## Tokens

**8 tokens** · prefijo `spn-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `spn-track` | `border/default` | Color del anillo de fondo (track) — default |
| `spn-indicator` | `interactive/default` | Color del arco animado — default |
| `spn-label-color` | `text/secondary` | Color del texto label — default |
| `spn-invert-track` | `surface/default/alpha-30` | Track en fondos oscuros — invert |
| `spn-invert-indicator` | `text/inverse` | Arco en fondos oscuros — invert |
| `spn-invert-label` | `text/inverse` | Label en fondos oscuros — invert |
| `spn-sm-diameter` | `sizing/16` | Diámetro sm — 16px |
| `spn-lg-diameter` | `sizing/40` | Diámetro lg — 40px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size scale:                                             │
│  sm: ⌀16px · stroke 2px · gap 6px · label 12px          │
│  md: ⌀24px · stroke 2px · gap 8px · label 14px          │
│  lg: ⌀40px · stroke 3px · gap 12px · label 14px         │
│                                                          │
│  Color=default:                                          │
│  track: #D1D1D8 (border/default)                        │
│  indicator: #264EEB (interactive/default)               │
│                                                          │
│  Color=invert:                                           │
│  track: rgba(255,255,255,0.3)                           │
│  indicator: #FFFFFF                                     │
│                                                          │
│  Frames totales:                                         │
│  Size(3) × Color(2) = 6 frames                          │
└──────────────────────────────────────────────────────────┘
```
