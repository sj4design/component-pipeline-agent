# Progress — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (sin filtro de scope, ALL patterns)
**Sistemas analizados:** 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3)
**Scope:** Indicador visual de avance de tarea — bar, circular, semicircle; determinate e indeterminate; porcentaje, label, estados success/error.

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| REI Cedar | No presente en libreria | Implementacion custom |
| GOV.UK | Investigacion de usuarios demostro que barras de progreso enganan en servicios gubernamentales | Patron task list (secciones completas/incompletas) |
| Evergreen | Prefiere Spinner para estados de carga | Spinner para carga, sin barra de progreso |
| Orbit | Solo barra de carga superior (route transitions) | Loading Bar delgada + Steps para progreso de booking |

---

## How Systems Solve It

### Material Design 3 — "Dos componentes separados por forma, un null semantico para indeterminado"

Material Design 3 divide el progreso en dos componentes completamente separados: LinearProgressIndicator y CircularProgressIndicator. Cada uno tiene props especificas de su forma (gapSize y drawStopIndicator para linear; strokeCap y strokeWidth para circular), lo que evita la contaminacion cruzada de APIs que ocurre cuando se mezclan formas en un solo componente. La decision mas interesante es usar un Float nullable para el valor de progreso: cuando es null, el componente entra automaticamente en modo indeterminado sin necesitar un boolean separado. Esto simplifica la API pero requiere que el consumidor entienda la semantica del null. El componente no renderiza un label de porcentaje propio — la etiqueta debe componerse externamente. El token de color sigue colorPrimary automaticamente, integrando el progreso al sistema de temas sin configuracion manual.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Dos componentes (Linear/Circular) | Props especificas de forma evitan cross-contamination en la API | H | Evalua si necesitas ambas formas o solo bar |
| Nullable float para indeterminado | null = indeterminate sin boolean extra; se mapea limpio a animaciones lerp | M | Mas simple para devs pero menos explicito en code review |
| Sin label de porcentaje integrado | El componente es solo la barra; el texto se compone externamente | M | Decide si el porcentaje va dentro o fuera del componente |
| drawStopIndicator en linear | Punto visual al 100% reduce ambiguedad en valores bajos | L | Util para barras delgadas donde el llenado es poco visible |

**Notable Props:** progress (Float?), trackColor, strokeCap, gapSize, drawStopIndicator
**A11y:** role="progressbar" + aria-valuenow/min/max; indeterminado omite aria-valuenow (correcto por spec ARIA); aria-label requerido; prefers-reduced-motion respetado.

---

### Spectrum (Adobe) — "ProgressBar y Meter: la unica separacion semantica real"

Spectrum es el unico sistema que formaliza la separacion entre ProgressBar (role="progressbar", tarea que terminara) y Meter (role="meter", medicion persistente). Esta distincion no es cosmetica: los roles ARIA comunican intenciones diferentes a los lectores de pantalla. Un progressbar implica "esto va a terminar", un meter implica "esta es la lectura actual". TypeScript fuerza el label como prop requerida, eliminando un gap de accesibilidad comun. formatOptions acepta Intl.NumberFormatOptions para formateo de labels segun locale — ningun otro sistema tiene integracion i18n tan profunda para el valor mostrado. minValue y maxValue aceptan valores de dominio (no forzados a 0-100), permitiendo a los equipos trabajar con valores raw sin logica de conversion.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| ProgressBar vs Meter split | Roles ARIA diferentes comunican intent distinto a SR; colapsar en uno hace la eleccion semantica invisible | H | Si tienes metricas persistentes (uso de disco, CPU), necesitas Meter separado |
| Label requerido en TypeScript | Elimina el gap de a11y mas comun en barras de progreso (sin contexto para SR) | H | Fuerza buenas practicas; adopta este patron |
| isIndeterminate boolean explicito | Mas claro que nullable — intencion obvia en code review | M | Mas explicito que el approach de M3 |
| formatOptions con Intl.NumberFormat | i18n correcto del valor mostrado sin logica custom | M | Solo si necesitas multilenguaje |

**Notable Props:** isIndeterminate, minValue/maxValue, formatOptions, valueLabel, labelPosition (top/side), showValueLabel, staticColor (white/black)
**A11y:** role="meter" para Meter; label prop requerida; aria-valuenow omitido para indeterminado; RTL auto-flipped.

---

### Carbon (IBM) — "Status explicito con icono + color para accesibilidad real"

Carbon es el sistema mas riguroso en comunicacion de estado terminal. Success y error usan icono + color juntos porque color solo falla WCAG para daltonicos. El icono refuerza el estado de forma inequivoca. Helper text debajo de la barra es la ubicacion canonica para porcentaje y texto de estado, anunciado via aria-live="polite". Esto es brillante: el texto debajo nunca tiene conflicto de contraste con el color de llenado (a diferencia de texto dentro de la barra), y puede transicionar de "45%" a "Upload complete" sin cambio de layout. El prop status separa el estado semantico del valor numerico — puedes setear status="finished" cuando el async resuelve sin importar si value llego a 100.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Icono + color para success/error | Color solo falla WCAG para daltonicos; icono refuerza inequivocamente | H | Adopta este patron para estados terminales |
| Helper text debajo de barra | Sin conflicto de contraste, transiciona de % a status sin layout shift | H | Mejor ubicacion para labels largos |
| status desacoplado de value | Async puede resolver sin que value llegue a 100 | M | Limpio para operaciones async |
| Solo 2 tamanos (sm 4px / md 8px) | Progreso es display-only; 2 tamanos cubren inline y standalone | L | Evalua si necesitas 3 tamanos |

**Notable Props:** value (0-100), status (active/finished/error), size (sm/md), helperText, label, hideLabel
**A11y:** role="progressbar" + aria-valuenow; aria-live="polite" en helper text; iconos son aria-hidden; aria-busy en region de carga.

---

### Polaris (Shopify) — "Determinado solamente, con tones semanticos"

Polaris toma una decision radical: el ProgressBar es SOLO determinado. Si la duracion es desconocida, usa Spinner. Esta separacion explicita evita la confusion perceptual entre una barra que se llena (progreso conocido) y una animacion ciclica (progreso desconocido). Cuatro tones semanticos (highlight/primary/success/critical) restringen la paleta a intenciones, no a colores arbitrarios — los comerciantes no pueden elegir colores que fallen accesibilidad. ariaLabelledBy referencia un elemento DOM existente en vez de duplicar texto, lo cual es ideal para admin pages de Shopify donde siempre hay headings descriptivos cerca.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Solo determinado (indeterminado = Spinner) | Animaciones perceptualmente distintas no deben mezclarse en un componente | H | Si tu DS ya tiene Spinner, considera separar tambien |
| 4 tones semanticos | Restringe a intent, previene colores arbitrarios y fallas de a11y | M | Excelente para DS que necesitan guardrails de color |
| animated prop con default true | Transiciones suaves por default, opt-out para screenshots | L | Buena UX default |
| 3 tamanos (small/medium/large) | Flexibilidad para contextos inline y standalone | L | Adopta sm/md/lg |

**Notable Props:** progress (0-100), tone (highlight/primary/success/critical), animated, ariaLabelledBy, size (small/medium/large)
**A11y:** role="progressbar" + aria-valuenow; tones son solo visuales, no comunicados a SR (gap).

---

### Atlassian — "Triada de componentes con value 0-1"

Atlassian documenta explicitamente la triada ProgressBar / Spinner / Skeleton, con criterios de decision claros para cuando usar cada uno. El value acepta float 0-1 (no 0-100), que se integra limpiamente con datos async donde loaded/total da 0-1 directamente. isIndeterminate es first-class, a diferencia de Polaris. La appearance soporta "inverse" para fondos oscuros y "transparent" para composicion sobre imagenes. Sin label numerico integrado — el porcentaje se compone externamente, como M3.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Triada documentada (ProgressBar/Spinner/Skeleton) | Criterios claros previenen uso inconsistente de loading | H | Documenta cuando usar cada componente de carga |
| Value 0-1 float | loaded/total da 0-1 sin conversion; limpio para async | M | Decide 0-1 vs 0-100 segun tu stack |
| isIndeterminate en ProgressBar | Background jobs frecuentes necesitan consistencia visual sin cambiar componente | M | Si tienes jobs de duracion desconocida, incluye indeterminado |
| Sin label numerico integrado | Composicion externa del porcentaje | L | Decide si label va dentro o fuera |

**Notable Props:** value (0-1), appearance (default/success/inverse), isIndeterminate, ariaLabel
**A11y:** role="progressbar" + aria-valuenow (como % equivalente); omitido para isIndeterminate; appearance="success" no agrega ARIA de completitud (gap).

---

### Ant Design — "Tres formas en un componente con gradientes nativos"

Ant Design unifica tres formas (line/circle/dashboard) en un solo componente via prop type. Esto es opuesto al approach de M3, pero tiene sentido para dashboards enterprise donde multiples estilos de progreso coexisten y la consistencia de API reduce la superficie de aprendizaje. El prop status decouples estado semantico de valor numerico (como Carbon). strokeColor soporta gradientes nativos — enterprise necesita barras de intensidad (verde a rojo) y el soporte first-class evita hacks con elementos apilados. format permite renderizar ReactNode custom en el label, no solo strings. percentPosition controla la posicion del label inline para anchos restringidos.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| 3 formas en 1 componente | Enterprise necesita consistencia de API para multiples estilos; 3 componentes triplicarian la superficie | H | Si necesitas circular y semicircle, un componente unificado es mas mantenible |
| Gradientes nativos | Barras de intensidad (verde a rojo) son comunes en dashboards | M | Solo si necesitas visualizacion de rangos |
| format para label custom | ReactNode en label permite iconos, texto rico | M | Flexibilidad alta pero riesgo de inconsistencia |
| percentPosition | Label inline vs outer para anchos restringidos | L | Util para tablas y espacios reducidos |

**Notable Props:** type (line/circle/dashboard), percent (0-100), status (normal/active/success/exception), strokeColor, format, gapDegree, percentPosition
**A11y:** role="progressbar" + aria-valuenow; no enforced label (gap vs Spectrum); sin isIndeterminate first-class (gap).

---

### Twilio Paste — "Barra horizontal con variantes de color para status"

Paste implementa un ProgressBar horizontal con variantes de color para comunicar status. Dos tamanos soportados. Approach straightforward para aplicaciones de comunicacion donde el progreso es lineal y predecible.

**Notable Props:** value, variant (color), size
**A11y:** role="progressbar" standard.

---

### Salesforce Lightning — "Bar + Ring como componentes separados"

Lightning separa Progress Bar (horizontal) y Progress Ring (circular). El Ring es especialmente util en record detail pages y dashboards donde un donut chart comunica completion percentage de forma compacta. Ambos usan role="progressbar".

**Notable Props:** value, variant, size, title
**A11y:** role="progressbar" en ambos.

---

### GitHub Primer — "Multi-segmento para breakdown de progreso"

Primer soporta multiples segmentos coloreados en una sola barra. Cada segmento tiene su propio color y valor, util para mostrar breakdown (3 passed, 1 failed, 2 pending) en CI/CD. Unico en T2 con este patron.

**Notable Props:** segments (array con value + color), barSize
**A11y:** role="progressbar" con aria-valuenow total.

---

### shadcn/ui — "Radix headless, determinado, minimalista"

Basado en Radix UI Progress. Solo determinado, un solo color, sin label integrado. La simplicidad es intencional — shadcn delega customizacion al consumidor. CSS custom property --radix-progress-indicator-transform permite animacion via CSS puro.

**Notable Props:** value (0-100)
**A11y:** Hereda de Radix: role="progressbar" correcto.

---

### Radix UI — "Headless con value=null para indeterminado y getValueLabel"

Radix es el mas completo en tratamiento ARIA del T3. value={null} para indeterminado. getValueLabel genera texto accesible contextual ("Procesando 3 de 10 archivos" en vez de "30%"). La custom property CSS permite animacion sin JS.

**Notable Props:** value (number|null), max, getValueLabel
**A11y:** getValueLabel para announcements contextuales; value=null omite aria-valuenow correctamente.

---

### Chakra UI — "Progress + CircularProgress separados con stripes animados"

Dos componentes separados. CircularProgressLabel permite texto/icono centrado dentro del anillo. hasStripe + isAnimated para barras con rayas animadas. Ambos soportan indeterminado.

**Notable Props:** value, colorScheme, hasStripe, isAnimated, isIndeterminate, min/max
**A11y:** role="progressbar" standard.

---

### Fluent 2 — "validationState para estados terminales"

validationState (success/error/warning) maneja estados terminales sin cambiar de componente. value 0-1 decimal. thickness (medium/large). Integracion con Field para label/description. Aborda la pregunta critica: que pasa cuando la operacion termina.

**Notable Props:** value (0-1), validationState, thickness, shape (rounded/square)
**A11y:** role="progressbar" standard.

---

### Base Web — "successValue automatico"

successValue define un umbral que dispara styling de exito automaticamente. infinite para indeterminado. Overrides pattern para customizacion.

**Notable Props:** value, successValue, infinite, overrides
**A11y:** role="progressbar" standard.

---

### Gestalt — "Color para status de publicidad"

accessibilityLabel requerido. Variantes de color para status de campanas publicitarias (on-target, at-risk, overspent). Uso especifico para pacing de presupuesto.

**Notable Props:** value, color variants, accessibilityLabel (requerido)
**A11y:** accessibilityLabel forzado por API.

---

### Mantine — "Multi-seccion + RingProgress con slot central"

Progress soporta sections array para barras multi-segmento (como Primer). RingProgress tiene slot central para label custom. animated para transiciones suaves.

**Notable Props:** sections (array), value, color, animated, size; RingProgress: sections, label (ReactNode), thickness
**A11y:** role="progressbar" standard.

---

### Nord — "Web component para healthcare"

Web component (nord-progress-bar) para progreso de operaciones en healthcare (upload de datos, analisis, importacion). Comunicacion clara de estado de completitud para personal clinico.

**Notable Props:** value, percentage (display)
**A11y:** role="progressbar" standard.

---

## Pipeline Hints

**Archetype recommendation:** inline-action
Rationale: Progress es un componente display-only (no interactivo). No tiene inputs, no recibe focus, no dispara acciones. Es un indicador visual simple como Badge o Spinner.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| track | structural | yes | 20/20 | Fondo de la barra; siempre presente |
| indicator | structural | yes | 20/20 | Relleno que muestra el progreso |
| label | text | no | 14/20 | Texto descriptivo (arriba o al lado); Spectrum/Carbon/Polaris/Ant/Gestalt |
| value-label | text | no | 12/20 | Porcentaje o valor custom mostrado; Spectrum/Carbon/Ant/Fluent/Chakra |
| helper-text | text | no | 4/20 | Texto debajo de la barra; Carbon primary |
| status-icon | icon | no | 3/20 | Icono de success/error; Carbon primary |
| center-label | text | no | 3/20 | Texto/icono centrado en circular; Chakra/Mantine |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 12/20 | Polaris 3, Carbon 2, Fluent 2 (thickness), universalmente escalable |
| Variant | variant | bar/circular/semicircle | 8/20 | Ant (line/circle/dashboard), M3/Lightning/Chakra (separados), Mantine |
| Status | variant | default/success/error | 14/20 | Carbon/Ant/Fluent/Polaris; Carbon+Fluent agregan icono automatico |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasLabel | 14/20 | false | Controla visibilidad del label descriptivo |
| hasPercentage | 12/20 | false | Controla visibilidad del valor numerico/porcentaje |
| isIndeterminate | 12/20 | false | Modo sin valor conocido; omite aria-valuenow, activa animacion ciclica |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 20/20 | Barra con fill parcial, color primario | Estado base |
| success | 14/20 | Fill completo, color verde, icono checkmark (Carbon) | Operacion completada |
| error | 10/20 | Fill rojo, icono error (Carbon), puede ser parcial | Operacion fallida |
| active | 4/20 | Animacion de pulso sutil; Ant/Carbon | Operacion en curso (enhancement visual) |
| indeterminate | 12/20 | Animacion ciclica sin valor; omite aria-valuenow | Duracion desconocida |

**Exclusion patterns found:**
- indeterminate x success/error — 12/12 sistemas con indeterminado (no tiene valor, no puede completar/fallar)
- indeterminate x hasPercentage — universal (sin valor, no hay porcentaje que mostrar)
- semicircle x sm — espacio insuficiente para renderizar semicirculo legible

**Building block candidates:**
- Ninguno — Progress es un componente atomico sin subcomponentes estructurados. Label, percentage y helper-text son slots simples, no building blocks con estructura propia.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| value | 0-100 (int) o 0-1 (float) | 20/20 | 0-100 en mayoria; 0-1 en Atlassian/Fluent |
| labelPosition | top/side | 2/20 | Solo Spectrum |

**A11y consensus:**
- Primary role: `progressbar` (20/20 consensus)
- Required ARIA: aria-valuenow (0-100), aria-valuemin (0), aria-valuemax (100), aria-label o aria-labelledby
- Indeterminate: OMITIR aria-valuenow (12/12)
- aria-valuetext para anuncios contextuales ("3 de 10 archivos" vs "30%") — Radix getValueLabel
- Keyboard: NO interactivo — no recibe focus, no tiene keyboard nav (display only)
- Focus: N/A (no es focusable)
- APG pattern: progressbar (role)
- aria-live="polite" en helper text para anunciar cambios de estado (Carbon pattern)
- aria-busy="true" en region contenedora durante carga (Carbon recommendation)

---

## What Everyone Agrees On

1. **role="progressbar" es universal**: Los 20 sistemas con componente usan role="progressbar" con aria-valuenow/min/max. Es el patron ARIA establecido sin variacion.

2. **Indeterminado omite aria-valuenow**: Cuando la duracion es desconocida, se omite aria-valuenow del DOM. Los lectores de pantalla infieren el estado indeterminado de la ausencia del valor. 12/12 sistemas con indeterminado siguen esta regla.

3. **No es interactivo**: Progress es display-only. No recibe focus, no tiene keyboard nav, no dispara acciones. Es un indicador visual que reporta estado al usuario. Todos los sistemas coinciden.

4. **Track + Indicator es la anatomia base**: Todos los sistemas tienen un fondo (track) y un relleno (indicator/fill). Es la estructura minima irreductible del componente.

5. **Label externo mejora accesibilidad**: aria-label o aria-labelledby es requerido por todos los sistemas porque el valor numerico solo ("75") no da contexto suficiente a screen readers. El label debe decir QUE esta progresando.

6. **Success/error como estados terminales**: Cuando una operacion termina, el progreso debe comunicar exito o fallo visualmente. 14/20 sistemas implementan esto como color + icono, no solo color (WCAG compliance).

---

## Where They Disagree

**"Un componente o varios para las formas (bar/circular)?"**
- **Opcion A: Un componente con prop type** — Ant Design, Mantine. API unificada, menor superficie de aprendizaje, consistencia de status/value. Pero props se contaminan entre formas (gapDegree solo aplica a dashboard).
- **Opcion B: Componentes separados** — M3, Lightning, Chakra. APIs limpias por forma, sin props irrelevantes. Pero triplica la superficie y puede causar inconsistencia de status/value.
- **Para tu caso:** Un componente con Variant (bar/circular/semicircle) es mas mantenible en Figma — mismo component set, mismas propiedades, diferentes formas.

**"Value 0-100 o 0-1?"**
- **Opcion A: 0-100** — Ant, Carbon, Polaris, Spectrum. Intuitivo, mapea a porcentaje directo, familiar para disenadores.
- **Opcion B: 0-1 float** — Atlassian, Fluent, M3. loaded/total da 0-1 sin conversion, limpio para async. Pero menos intuitivo en Figma.
- **Para tu caso:** 0-100 es mejor para el contexto Figma — los disenadores piensan en porcentajes, no en decimales.

**"Label dentro o fuera del componente?"**
- **Opcion A: Label integrado** — Carbon, Spectrum, Polaris. Self-contained, siempre accesible, no depende del contexto externo.
- **Opcion B: Label externo (composicion)** — M3, Atlassian, shadcn. Componente mas simple, label se compone desde fuera. Pero riesgo de olvidar el label (gap de a11y).
- **Para tu caso:** Label como boolean toggle dentro del componente (hasLabel) — self-contained pero toggleable.

**"Indeterminado en ProgressBar o solo en Spinner?"**
- **Opcion A: ProgressBar tiene indeterminado** — M3, Spectrum, Atlassian, Radix, Chakra, Fluent. Consistencia visual entre progreso conocido y desconocido — misma forma visual.
- **Opcion B: Spinner para indeterminado** — Polaris. Separacion clara de componentes — forma diferente para significado diferente.
- **Para tu caso:** Incluye isIndeterminate — es el consenso mayoritario (12/20) y permite consistencia visual.

**"Como comunicar estados terminales (success/error)?"**
- **Opcion A: Color + icono** — Carbon, Fluent. WCAG compliant, inequivoco para daltonicos.
- **Opcion B: Solo color** — Polaris (tone), Atlassian (appearance). Mas limpio visualmente, pero depende de color para comunicar estado.
- **Para tu caso:** Color + cambio visual (no necesariamente icono en la barra, pero si color distinto). Status como variant property.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Linear Bar | Barra horizontal simple | Uso general, formularios | Todos |
| Circular Ring | Anillo/donut con progreso | Dashboards, tarjetas compactas | M3, Lightning, Ant, Chakra, Mantine |
| Semicircle/Dashboard | Arco semicircular | Gauges, metricas | Ant (dashboard), Fluent |
| Multi-segment | Multiples segmentos coloreados | CI/CD, breakdown de categorias | Primer, Mantine |
| With Label | Label descriptivo arriba o al lado | Cuando el contexto importa | Spectrum, Carbon, Polaris |
| With Percentage | Valor numerico visible | Cuando la precision importa | Spectrum, Carbon, Ant, Fluent |
| Indeterminate Animation | Animacion ciclica sin valor | Duracion desconocida | M3, Spectrum, Atlassian, Radix, Chakra |

### Wireframes

```
Linear Bar (default):
┌──────────────────────────────────┐
│ Label                     75%   │
│ ████████████████████░░░░░░░░░░░ │
│ Helper text                     │
└──────────────────────────────────┘

Linear Bar (indeterminate):
┌──────────────────────────────────┐
│ Loading...                      │
│ ░░░░████████░░░░░░░░░░░░░░░░░░░ │ ← animacion ciclica
└──────────────────────────────────┘

Circular (determinate):
    ┌───┐
   ╱     ╲
  │  75%  │
   ╲     ╱
    └───┘

Semicircle/Dashboard:
   ╭─────────╮
  ╱           ╲
 ╱     75%     ╲
╱_______________╲
```

---

## Risks to Consider

1. **Contraste insuficiente del track** (HIGH) — El track (fondo) debe tener suficiente contraste con el fondo de la pagina. Si el track es gris muy claro sobre blanco, el componente sera invisible para usuarios con baja vision. Mitigacion: usar el track como borde visual con al menos 3:1 de contraste.

2. **Indeterminado sin animacion reducida** (MEDIUM) — Las animaciones ciclicas del indeterminado pueden causar mareo en usuarios con sensibilidad al movimiento. Mitigacion: respetar prefers-reduced-motion y ofrecer una alternativa estatica (barra con patron sutil).

3. **Status solo por color** (HIGH) — Comunicar success/error solo con color verde/rojo falla WCAG para daltonicos (8% de hombres). Mitigacion: agregar icono o cambio de forma ademas del color, como hace Carbon.

4. **Label ausente** (HIGH) — Sin aria-label, screen readers anuncian solo "progressbar 75%" sin contexto de QUE esta progresando. Mitigacion: hasLabel como patron principal, con aria-label como fallback obligatorio.

5. **Semicircle en tamano sm** (MEDIUM) — El semicircle requiere espacio minimo para ser legible. En tamano sm puede ser ininteligible. Mitigacion: excluir semicircle de sm o establecer tamano minimo.

---

## Next Steps

```
/spec progress         -- Generar config.json con anatomia y matriz
/enrich progress       -- Agregar a11y + tokens
/generate progress     -- Construir componentes en Figma
/figma-qa              -- Auditar y corregir
/build progress        -- Pipeline completo en un comando
```
