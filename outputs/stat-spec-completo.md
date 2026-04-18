# Stat

## Overview

Stat es un componente de visualización de KPIs que presenta una métrica única con su contexto mínimo necesario: etiqueta, valor, unidad, tendencia y descripción comparativa. Es el bloque atómico de todo dashboard: aparece en tiras horizontales de 3–4 stats, en tarjetas de métricas elevadas, y en paneles de resumen de perfil. La tendencia (trend) comunica el cambio relativo respecto a un período anterior mediante color, ícono y texto — los tres señales simultáneas para cumplir con WCAG 1.4.1.

```
Layout: stacked (default)           Layout: horizontal               Layout: card (elevado)
┌─────────────────────────┐         ┌───────────────────────────┐    ┌─────────────────────────┐
│ 🔼 [icon opcional]      │         │ Total Revenue  $42,350 USD│    │                         │
│                         │         │               ▲ +12.5%    │    │  Total Revenue          │
│ Total Revenue           │ ← label │               vs last month│    │                         │
│ $42,350                 │ ← value └───────────────────────────┘    │  $42,350  USD           │
│ USD                     │ ← unit                                    │  ▲ +12.5%  vs last month│
│ ▲ +12.5%  vs last month │ ← trend                                   └─────────────────────────┘
└─────────────────────────┘           ↑ Layout=horizontal = label
  ↑ Layout=stacked = label arriba,    y value en la misma fila (compact)
  value dominante en el centro

KPI Strip (StatGroup pattern — 4 items):
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total Rev.   │ New Users    │ Conversion   │ Avg. Order   │
│ $1.2M        │ 8,492        │ 3.24%        │ $145.20      │
│ ▲ +5.2%      │ ▼ -1.1%      │ ▲ +0.8%      │ ▲ +2.3%      │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Stat no tiene trigger relationship con otro componente. Es un elemento de display puro que nunca recibe foco de teclado excepto cuando toda la tarjeta está envuelta en un Link o Button.

**Lo que el diseñador puede configurar:**

Variantes (cambian la apariencia — generan variantes Figma):

```
Size:     sm | md | lg
Trend:    none | up | down | neutral
Layout:   stacked | horizontal | card
Emphasis: default | prominent
```

Toggles (muestran/ocultan partes — NO generan variantes adicionales):

```
👁 Has Icon        → muestra/oculta ícono decorativo (top-right en stacked, leading en horizontal)
👁 Has Trend       → muestra/oculta bloque de tendencia (flecha + delta + description)
👁 Has Description → muestra/oculta texto comparativo ('vs last month')
👁 Has Sparkline   → muestra/oculta mini-chart de tendencia (últimos N días)
👁 Has Unit        → muestra/oculta unidad ('USD', 'users', '%')
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  Stat                                       │
├─────────────────────────────────────────────┤
│  Size          ○ sm  ○ md  ○ lg             │
│  Trend         [none ▼]                     │
│                none / up / down / neutral   │
│  Layout        [stacked ▼]                  │
│                stacked / horizontal / card  │
│  Emphasis      ○ default  ○ prominent       │
├─────────────────────────────────────────────┤
│  👁 Has Icon         [off]                  │
│  👁 Has Trend        [off]                  │
│  👁 Has Description  [off]                  │
│  👁 Has Sparkline    [off]                  │
│  👁 Has Unit         [off]                  │
├─────────────────────────────────────────────┤
│  ✏️ Label         [Total Revenue]           │
│  ✏️ Value         [$42,350]                 │
│  ✏️ Unit          [USD]                     │
│  ✏️ Trend Delta   [+12.5%]                  │
│  ✏️ Description   [vs last month]           │
│  🔄 Icon          [icon/trending-up]        │
└─────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas mostrar una métrica cuantitativa con contexto?
              │
              ▼
  ¿Es una sola métrica con label, valor y tendencia?
              │
         Sí ─┼─ No ─→ DataGrid (múltiples métricas en tabla) o Chart
              │
  ¿Está en un dashboard o panel de summary?
              │
         Sí ─┼─ No ─→ texto inline con Typography
              │
           usa Stat

¿El valor es interactivo (clickeable para ver detalle)?
  Sí → envuelve Stat en Link o Button (no hagas la stat directamente interactiva)
```

**Usa Stat cuando:**
- Muestras KPIs en la parte superior de un dashboard (revenue, usuarios activos, conversión, pedido promedio)
- Construyes una tira de métricas de proyecto (velocidad del equipo, cobertura de tests, issues abiertos)
- Necesitas comunicar una métrica con su cambio respecto al período anterior (trend up/down/neutral)
- Presentas un resumen de perfil de usuario (posts publicados, seguidores, engagement)
- Construyes un widget de métricas elevado dentro de una página de detalle (Layout=card)

**NO uses Stat cuando:**
- El valor es una lista o tabla de datos → usa DataGrid o Table
- Necesitas mostrar un progreso hacia una meta → usa ProgressBar o Meter (bounded 0–100%)
- El dato es un conteo pequeño dentro de UI (ej. "12 unread") → usa Badge o CounterLabel
- Hay más de 8–10 stats diferentes → considera una tabla de métricas o charts
- La métrica es un gráfico de barras/líneas completo → usa un componente de Chart

---

## Visual variations

### Size: sm (valueFontSize 20px)

Para stats en línea dentro de cards compactas, panels secundarios, o resúmenes de sidebar. El label tiene 12px y el valor 20px. Padding interno 12px.

### Size: md (valueFontSize 28px) — default

El tamaño estándar para dashboard grids de 3–4 columnas. Balance óptimo entre densidad y legibilidad. Label 13px, valor 28px. Padding 16px.

### Size: lg (valueFontSize 40px)

Para hero metrics en la parte superior de un dashboard, o métricas de énfasis máximo. El número domina visualmente toda la tarjeta. Label 14px, valor 40px. Padding 24px.

### Trend: up

Ícono de flecha hacia arriba (▲), color verde (`status/success/fg`), fondo verde claro (`status/success/bg`). El texto del delta ("+12.5%") se muestra en el mismo color.

### Trend: down

Ícono de flecha hacia abajo (▼), color rojo (`status/error/fg`), fondo rojo claro (`status/error/bg`). Delta negativo ("-1.1%") en rojo.

### Trend: neutral

Ícono de guión (—), color secundario (`text/secondary`), fondo surface/pressed. Para métricas sin cambio significativo.

### Layout: stacked (default)

Label arriba del valor, value como tipografía dominante, trend + description debajo. El ícono opcional se posiciona en la esquina superior derecha (top-right). Orientación vertical. Ideal para grids de dashboard.

### Layout: horizontal

Label a la izquierda, value + unit a la derecha, trend debajo del value. Orientación en fila. Más compacto horizontalmente. Útil para panels laterales o resúmenes de settings. El sparkline no está disponible en este layout (espacio insuficiente).

### Layout: card

Igual que stacked pero con fondo surface/default, borde border/default, radio radius/md y padding aplicado. Crea un widget visualmente separado del resto de la página. Ideal para dashboards donde las stats necesitan elevation visual.

### Emphasis: prominent

El value es 1.5× más grande que en `default`. Para cuando la métrica es la información más crítica de la pantalla y debe destacarse sobre todo lo demás.

---

## Design decisions

### 1. Trend como propiedad explícita con semántica (no solo booleano)

**¿Por qué?** La tendencia no es simplemente "tiene trend / no tiene trend". Los valores `up`, `down` y `neutral` implican cambios específicos de color, ícono Y texto accesible. Si se modelara como un booleano + slot de texto libre, cada equipo implementaría el color verde/rojo de forma inconsistente y olvidaría el texto alternativo para daltonismo. Al definir `Trend` como propiedad enum, el componente puede garantizar que los tres indicadores (color + ícono + texto) siempre aparezcan juntos.

**Trade-off:** La prop enum no cubre el caso de "trend positivo pero rojo" (ej. una métrica donde subir es malo, como el tiempo de carga). En esos casos, el consumidor necesita documentación sobre cómo overrideizar el color.

### 2. Tres Layouts (stacked / horizontal / card) en lugar de un solo layout con variaciones de CSS

**¿Por qué?** Stacked, horizontal y card no son simples variaciones cosméticas: cada uno cambia la jerarquía visual, la posición de los slots y las expectativas del lector. El layout stacked pone el valor como elemento dominante (dashboard-first); el horizontal prioriza la legibilidad en línea (settings/sidebar); el card agrega contenimiento visual que lo separa del fondo. Son contextos de uso tan distintos que merecer una prop explícita previene el uso incorrecto.

**Trade-off:** Agrega frames en Figma (3 layouts × otras propiedades). La exclusión `Layout=horizontal + sparkline` reduce la matriz pero hay que documentarla.

### 3. Sparkline como slot opcional con aria-hidden + alternativa textual

**¿Por qué?** El mini-chart de tendencia (línea de los últimos 7/30 días) aporta valor visual rápido sin requerir un componente de Chart completo. Al modelarlo como slot opcional con `aria-hidden="true"`, el componente puede incluirlo decorativamente sin comprometer la accesibilidad, siempre que el estado de la tendencia también esté expresado en texto (`Has Description` + `Has Trend`).

**Trade-off:** El sparkline en Figma es una forma estática, no un chart real. En producción requiere integración con una librería de charts (Recharts, D3, Chart.js) como slot de React.

### 4. Slot de Unit separado del Value (no concatenado)

**¿Por qué?** Separar la unidad del valor permite estilos tipográficos distintos: el valor es seminegrita y grande; la unidad es de tamaño secundario (body-sm). La concatenación en el mismo text layer haría imposible el styling diferenciado en Figma. En la capa de accesibilidad, el aria-label del value concatena ambos: `aria-label="$42,350 dólares"`.

**Trade-off:** El consumidor debe asegurar que el orden semántico sea correcto (valor primero, unidad después) tanto visualmente como en el aria-label.

### Combinaciones excluidas

```
Trend=none + Has Description=true
  └── 'vs last month' requiere contexto de trend para tener sentido;
      sin flecha/color, la descripción comparativa confunde al lector.
      Solución: usar Has Description solo cuando Trend ≠ none.

Layout=horizontal + Has Sparkline=true
  └── El layout horizontal no tiene espacio horizontal suficiente
      para mostrar la sparkline sin comprimir el valor principal.
      Solución: usar Layout=stacked o Layout=card con sparkline.
```

---

## Behavior

### Essential for design

Stat es un componente de display puro con comportamientos mínimos:

1. **Reading order:** El orden de lectura para screen readers es: label → value → unit → trend → description. El diseño visual debe reflejar esta jerarquía.
2. **Loading state:** Cuando los datos están cargando (async), los tres slots principales (label, value, trend) muestran un skeleton. El skeleton tiene las mismas dimensiones que el contenido real para evitar layout shifts.
3. **Live updates:** Si el valor se actualiza en tiempo real (polling/websocket), el contenedor del value debe tener `aria-live="polite"` para anunciar el cambio sin interrumpir al lector.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container | group | `aria-labelledby="[label-id]"` | Agrupa semánticamente label → value → trend |
| Label | — | `id="[label-id]"` | Referenciado por aria-labelledby del container |
| Value | — | `aria-label="[value] [unit]"` (ej. "$42,350 dólares") | Concatena valor + unidad para lectura natural |
| Trend (ícono) | — | `aria-hidden="true"` | La flecha es decorativa; el texto la describe |
| Trend (texto) | — | — | Texto visible ("▲ +12.5%") es suficiente para SR |
| Trend (container) | — | `aria-label="aumento de 12.5% vs mes anterior"` | Descripción completa para contexto |
| Sparkline | — | `aria-hidden="true"` | Decorativa; la tendencia ya está en trend text |
| Sparkline alt | — | (visually hidden text) "Tendencia al alza últimos 30 días" | Alternativa textual para lectores de pantalla |

### Keyboard navigation

Primary interactions (affect design):

```
Stat no es focusable por defecto (display-only).
No tiene navegación de teclado propia.
```

Secondary interactions (dev reference):

```
Si Stat está envuelto en Link o Button:
  Tab/Shift+Tab  → navega al wrapper
  Enter/Space    → activa el link/button (va a detalle)
  
Si el valor se actualiza en tiempo real:
  aria-live="polite" en el contenedor del value
  → anuncia el nuevo valor cuando cambia
  → NO interrumpe la lectura en curso del SR
```

---

## Content guide

### Slot: label (requerido)

El nombre de la métrica. Debe ser conciso y auto-explicativo fuera de contexto.
- **Do:** "Total Revenue", "Active Users", "Conversion Rate"
- **Don't:** "Data" (demasiado genérico), "Metric 1" (sin significado)
- **Longitud máxima recomendada:** 24 caracteres (para que no haga wrap en Size=sm)

### Slot: value (requerido)

El número o string que representa la métrica. Puede ser pre-formateado o numérico.
- **Do:** "$42,350", "1,234", "3.24%", "1.2M"
- **Don't:** "42350" sin separadores (ilegible para números grandes)
- **Formateado vs. raw:** Pasar el valor ya formateado con `Intl.NumberFormat` es la práctica recomendada

### Slot: unit (opcional)

La unidad de la métrica. Aparece adyacente al value en tamaño secundario.
- **Do:** "USD", "%", "users", "ms", "req/s"
- **Don't:** Unidades largas como "usuarios activos registrados" (el label ya lo explica)
- **Cuándo omitir:** Cuando el valor es autoexplicativo ("3.24%") o cuando el label ya contiene la unidad

### Slot: trend (opcional)

Arrow icon + delta + color. Generado automáticamente por la prop Trend. El consumidor solo pasa el texto del delta.
- **Do:** "+12.5%", "-1.1%", "0.0%"
- **Don't:** "+12.5 percent" (redundante con Has Unit); emojis (no accesibles en todos los AT)

### Slot: description (opcional)

Contexto comparativo de la tendencia. Siempre debe acompañar a Trend cuando está visible.
- **Do:** "vs last month", "vs last quarter", "desde el 1 de enero"
- **Don't:** Texto largo (> 30 chars) que cause wrap y aumente la altura del componente

### Slot: sparkline (opcional)

Mini-chart decorativo de los últimos N puntos de datos. Pasar como hijo del slot `sparkline`.
- Requiere una alternativa textual (handled por Has Description + Trend)
- No disponible en Layout=horizontal

### Slot: icon (opcional)

Ícono contextual decorativo. Se usa para identificar visualmente el tipo de métrica.
- **Do:** ícono de trending-up, users, dollar, shopping-cart
- **Don't:** Ícono sin relación semántica con la métrica (confunde al lector)

---

## Pre-build checklist

```
Display & Semántica
□ Trend comunicado con color + ícono + texto (los 3 simultáneos — WCAG 1.4.1)
□ Sparkline tiene aria-hidden="true" + alternativa textual
□ Value tiene aria-label concatenando "[value] [unit]"
□ Container tiene role="group" + aria-labelledby apuntando al label

Estructura y Slots
□ Label es conciso y auto-explicativo fuera de contexto
□ Value formateado con separadores de miles (Intl.NumberFormat)
□ Description solo visible cuando Trend ≠ none
□ Sparkline solo visible en Layout=stacked o Layout=card

Tokens y Tamaños
□ Trend up → status/success/fg + status/success/bg
□ Trend down → status/error/fg + status/error/bg
□ Trend neutral → text/secondary + surface/pressed
□ Font sizes de value: sm=20px, md=28px, lg=40px (semibold weight)

Loading State
□ Loading state (skeleton) definido para label, value y trend
□ Skeleton tiene las mismas dimensiones que el contenido real

Figma Handoff
□ Frames: Size(3) × Trend(4) × Layout(3) × Emphasis(2) = 72 gross, −12 exclusiones = 60 net
□ Boolean layers correctamente nombrados (👁 Has Icon, etc.)
□ Swap slots para Icon (🔄)
```

---

## Related components

```
StatGroup (companion layout)
  └── Tira horizontal de 3–4 Stats responsiva (4-across → 2x2 → stacked)
  └── El patrón KPI strip universal; siempre acompaña a Stat

ProgressBar / Meter
  └── Para valores acotados (0–100%) con representación visual de progreso
  └── Cuando la métrica tiene una meta definida (ej. "75% completado")

Badge / CounterLabel
  └── Para conteos pequeños dentro de UI (tabs, nav items, ícono de notificación)
  └── No para métricas de dashboard

Chart / Sparkline
  └── Para visualización de series de datos completas
  └── Sparkline puede ser slot opcional dentro de Stat

DataGrid / Table
  └── Para múltiples métricas organizadas en filas y columnas
  └── Cuando hay más de ~8 stats distintos

Card
  └── Layout=card de Stat usa los mismos tokens de surface/border/radius que Card
  └── Un Stat con Layout=card puede componerse dentro de una Card más grande
```

---

## Reference: how other systems do it

### Ant Design — Statistic (implementación más completa)

Ant Design es el único sistema Tier 1 con un componente `Statistic` dedicado y sirve como la implementación de referencia. Cubre el set completo de slots: `title` (label), `value`, `prefix`/`suffix` (íconos o texto para indicadores de tendencia), `precision` (decimales), `formatter` (función de formateo personalizado), `groupSeparator` (separador de miles locale-aware), `valueStyle` (inline style), y `loading` (skeleton state). `Statistic.Countdown` maneja métricas temporales con callback `onFinish`. Ant sirve dashboards enterprise chinos donde las tiras de KPI son el patrón primario en casi toda pantalla de administración.

### Chakra UI — familia Stat (mejor implementación T3)

Chakra tiene la implementación T3 más completa, rivalizando con Ant Design en cobertura de slots. La arquitectura de sub-componentes (`Stat` > `StatLabel` + `StatNumber` + `StatHelpText` + `StatArrow`) hace cada slot explícito e independientemente composable. `StatArrow` es único: acepta `type="increase"` o `type="decrease"` y renderiza una flecha con color correcto. Texto visualmente oculto ("increase"/"decrease") se incluye junto al ícono para acceso desde lector de pantalla. `StatGroup` envuelve múltiples stats en una fila flex responsiva.

### Playbook — Stat / StatValue / StatChange (mejor implementación T2)

Playbook (PowerBI/eBay) es el único sistema T2 con una familia de Stat dedicada, estructurada y madura. `Stat` envuelve `StatValue` (el número) y `StatChange` (tendencia con flecha de dirección y porcentaje). `StatGroup` maneja agrupación horizontal/vertical con espaciado consistente. La arquitectura de sub-componentes para cada slot espeja la de Chakra pero es anterior.

### GOV.UK — Patrón de contenido Statistic (mejor referencia de diseño de contenido)

GOV.UK no tiene componente Stat, pero el patrón de diseño de contenido "Statistic" es la referencia más sólida para qué datos necesita toda visualización de stat. Las estadísticas gubernamentales deben incluir: (1) el número con formato, (2) un descriptor ("personas empleadas"), (3) un período de tiempo ("abril 2025 a marzo 2026"), y (4) una descripción de tendencia en español llano ("subió 3.2% respecto al año anterior"). Este modelo de cuatro campos es la mejor definición del set mínimo de slots para un Stat.

### Mantine — plantilla comunitaria StatsGroup (patrón más copiado)

Mantine no tiene Stat oficial, pero la plantilla comunitaria "StatsGroup" es el patrón stat más copiado en el ecosistema T3. Usa Paper para el contenedor de tarjeta, Text con `size="xl" fw={700}` para el valor, Text con `size="sm" c="dimmed"` para el label, y una fila flex con ícono de flecha (ThemeIcon) + Text coloreado para la línea de tendencia.

### Sistemas sin componente dedicado

Los 21 sistemas restantes (Material Design 3, Spectrum, Carbon, Polaris, Atlassian, Twilio Paste, shadcn/ui, Radix, GOV.UK, Mantine como componente oficial, Base Web, Fluent 2, Gestalt, Orbit, Evergreen, Nord, REI Cedar, Wise, Dell, Salesforce, GitHub Primer) tratan Stat como un patrón de composición a nivel de producto. La ausencia confirma que Stat sigue siendo territorio de "patrón de composición" para la mayoría, pero la demanda es suficientemente alta para justificar un componente dedicado en productos con dashboards intensivos.

---

## Tokens

**20 tokens** · prefix `st-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| st/label/fg | text/secondary | Color del texto label |
| st/label/fontSize/sm | type/xs | Tamaño label en Size=sm (12px) |
| st/label/fontSize/md | type/sm | Tamaño label en Size=md (13px) |
| st/label/fontSize/lg | type/md | Tamaño label en Size=lg (14px) |
| st/value/fg | text/primary | Color del número/valor |
| st/value/fontSize/sm | type/heading-sm | Valor en Size=sm (20px) |
| st/value/fontSize/md | type/heading-md | Valor en Size=md (28px) |
| st/value/fontSize/lg | type/heading-lg | Valor en Size=lg (40px) |
| st/value/fontWeight | type/weight-semibold | Peso tipográfico del valor |
| st/trend/up/fg | status/success/fg | Color texto trend up (verde) |
| st/trend/up/bg | status/success/bg | Fondo badge trend up |
| st/trend/down/fg | status/error/fg | Color texto trend down (rojo) |
| st/trend/down/bg | status/error/bg | Fondo badge trend down |
| st/trend/neutral/fg | text/secondary | Color texto trend neutral |
| st/trend/neutral/bg | surface/pressed | Fondo badge trend neutral |
| st/description/fg | text/subtlest | Color texto description |
| st/card/bg | surface/default | Fondo en Layout=card |
| st/card/border | border/default | Borde en Layout=card |
| st/card/radius | radius/md | Radio en Layout=card (8px) |
| st/sparkline/color | interactive/default | Color línea sparkline |

### Spacing specs

```
Size specs (padding + gap internos):
  sm:  padding 12px · gap vertical 4px  · iconSize 16px · trendFont 11px
  md:  padding 16px · gap vertical 6px  · iconSize 20px · trendFont 12px
  lg:  padding 24px · gap vertical 8px  · iconSize 24px · trendFont 13px

Value font sizes:
  sm:  valueFontSize 20px · valueLineHeight 28px
  md:  valueFontSize 28px · valueLineHeight 36px
  lg:  valueFontSize 40px · valueLineHeight 48px

Layout=card extra:
  border-radius: radius/md (8px)
  border: 1px solid border/default
  background: surface/default

Frame counts:
  Size(3) × Trend(4) × Layout(3) × Emphasis(2) = 72 gross
  − 12 exclusiones (Trend=none + Description, Layout=horizontal + Sparkline)
  = 60 frames netos
```
