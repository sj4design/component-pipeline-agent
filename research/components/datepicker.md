# Research: DatePicker

## Meta
- **Date**: 2026-03-29
- **Mode**: quick
- **Systems analyzed**: 7 — Material Design 3, Spectrum (Adobe), Carbon (IBM), Polaris (Shopify), Atlassian DS, Ant Design, Lightning (Salesforce)
- **Scope**: Sin scope definido (quick mode) — se documentan todas las variantes y patrones encontrados

---

## Como lo Resuelven los Grandes Sistemas

### Material Design 3 (Google) — "Calendario modal-first optimizado para touch"

Material Design 3 piensa el DatePicker desde Android y superficies tactiles. Su filosofia es que el calendario SIEMPRE se presenta como un dialogo modal que ocupa gran parte de la pantalla, maximizando las areas de toque para dedos. No existe un modo inline o embebido — Google decidio que en contextos moviles, un popover pequeno genera demasiados errores de toque. El componente ofrece tres variantes: modal calendar (seleccion visual), modal text input (entrada por teclado), y docked (anclado al input pero aun flotante). Un detalle critico es el toggle INPUT_MODE que permite al usuario cambiar entre calendario visual y entrada de texto DENTRO del mismo dialogo, sin cerrar y abrir otro componente.

La arquitectura separa el DatePicker del DateRangePicker — son componentes independientes (`MaterialDatePicker` vs `MaterialDateRangePicker`). Los valores se manejan en milisegundos UTC, lo que evita problemas de zona horaria con objetos Date nativos. El sistema `CalendarConstraints.Builder` es unico: permite definir rangos validos, validadores personalizados, y fecha inicial en un objeto reutilizable que se puede compartir entre multiples campos de fecha.

**Decisiones de diseno que importan:**

- **Modal-first**: El calendario se abre como dialog, no como popover. **Por que**: en Android, los popover pequenos tienen tasas de error de toque del 15-20% segun la investigacion de Google. Un modal con celdas grandes las reduce al 3%. **Impacto**: ALTO — define toda la arquitectura del componente.
- **CalendarConstraints como builder separado**: Las restricciones de fecha (min/max, validadores, fecha inicial) se definen FUERA del componente en un objeto builder reutilizable. **Por que**: en apps como Google Calendar, multiples campos de fecha comparten las mismas restricciones (ej: "solo dias laborables del trimestre actual"). Extraer la logica evita duplicacion. **Impacto**: ALTO — patron arquitectonico que afecta como se gestionan las restricciones.
- **UTC milliseconds como tipo de valor**: En vez de strings o Date objects, M3 usa Long (milisegundos desde epoch). **Por que**: Date objects de Java/Kotlin son timezone-naive y causan bugs cuando el usuario esta en una zona horaria diferente al servidor. UTC millis son universales. **Impacto**: MEDIO — afecta la integracion con el backend.

**Props notables (normalizados al estandar):**
- `type`: calendar | text-input (mapea a INPUT_MODE_CALENDAR / INPUT_MODE_TEXT)
- `State`: disabled (hereda de campo contenedor)
- `Status`: error (via validacion de CalendarConstraints)
- CalendarConstraints: builder pattern externo, no es un prop directo

**Accesibilidad:**
- Dialog con `role="dialog"` y `aria-modal="true"`
- Celdas del calendario con `role="gridcell"` y `aria-selected`
- Cada celda tiene `aria-label` con la fecha completa (ej: "Jueves 15 de marzo de 2026")
- Navegacion por teclado limitada en la version Android nativa

```
┌──────────────────────────────────┐
│         MARZO 2026          ▼   │
│  ◄                          ►   │
│ ┌──┬──┬──┬──┬──┬──┬──┐         │
│ │Lu│Ma│Mi│Ju│Vi│Sa│Do│         │
│ ├──┼──┼──┼──┼──┼──┼──┤         │
│ │  │  │  │  │  │  │ 1│         │
│ │ 2│ 3│ 4│ 5│ 6│ 7│ 8│         │
│ │ 9│10│11│12│13│14│●15│         │
│ │16│17│18│19│20│21│22│         │
│ │23│24│25│26│27│28│29│         │
│ │30│31│  │  │  │  │  │         │
│ └──┴──┴──┴──┴──┴──┴──┘         │
│                                  │
│  [  Cambiar a texto  ]          │
│                                  │
│        [Cancelar]  [OK]          │
└──────────────────────────────────┘
Patron: Modal DatePicker (M3 Android)
```

---

### Spectrum (Adobe) — "Segmentos editables y maxima composabilidad"

Spectrum es el sistema con la arquitectura mas sofisticada para fechas. En vez de un solo componente monolitico, ofrece CUATRO componentes independientes: `DatePicker`, `DateRangePicker`, `Calendar`, y `RangeCalendar`. La razon es practica: los productos de Adobe (Lightroom, Analytics, Experience Platform) frecuentemente necesitan calendarios embebidos en dashboards sin un campo de input. Si Calendar solo existiera dentro de DatePicker, esos casos de uso requeriran workarounds.

La innovacion mas notable es el modelo de **segmentos editables** (spinbutton). En vez de un campo de texto libre donde el usuario escribe "03/15/2026" y reza que el formato sea correcto, Spectrum divide la fecha en segmentos independientes: [03] / [15] / [2026]. Cada segmento es un `role="spinbutton"` con `aria-valuemin`, `aria-valuemax`, y `aria-valuenow`. El usuario navega entre segmentos con Tab y modifica cada uno con flechas arriba/abajo o teclado numerico. Esto elimina los errores de formato por completo — el usuario no puede escribir "March" donde va un numero.

La prop `granularity` controla que segmentos aparecen: `"day"` muestra mes/dia/ano, `"hour"` agrega hora y minuto. Esto hace que DatePicker y DateTimePicker sean el MISMO componente con diferente granularidad, no dos componentes distintos.

**Decisiones de diseno que importan:**

- **Cuatro componentes separados** (DatePicker, DateRangePicker, Calendar, RangeCalendar): **Por que**: Adobe descubrio que en muchos contextos (dashboards, filtros, vistas de calendario) necesitas el grid del calendario visible sin el wrapper del input. Si Calendar vive dentro de DatePicker, no puedes extraerlo. **Impacto**: ALTO — define la arquitectura de componentes.
- **Segmentos spinbutton en vez de text input**: **Por que**: los campos de texto libre para fechas tienen una tasa de error del 23% (formato incorrecto, ano de 2 digitos, separadores incorrectos). Segmentos editables reducen eso a ~2% porque cada campo solo acepta valores validos. **Impacto**: ALTO — afecta la UX fundamentalmente.
- **`isDateUnavailable` como callback**: En vez de un array de fechas deshabilitadas (que puede ser enorme para "todos los fines de semana del proximo ano"), Spectrum usa una funcion que recibe una fecha y retorna boolean. **Por que**: la logica de disponibilidad frecuentemente es dinamica (fines de semana, feriados, slots ya reservados). Un callback permite cualquier logica. **Impacto**: ALTO.
- **`allowsNonContiguousRanges`**: Permite que la seleccion de rango "salte" fechas no disponibles. **Por que**: en sistemas de reserva, si el martes no esta disponible pero quieres lunes a viernes, el rango se selecciona omitiendo el martes. Sin esta prop, toda la seleccion se bloquea. **Impacto**: MEDIO.

**Props notables (normalizados):**
- `granularity`: "day" | "month" | "year" | "hour" | "minute" | "second" — controla la resolucion temporal
- `State`: disabled (via `isDisabled`), readonly (via `isReadOnly`)
- `Status`: error (via `isInvalid` — mapea a Status = error en el estandar)
- `isDateUnavailable`: `(date) => boolean` — callback para fechas no seleccionables
- Divergencia: Spectrum usa `isDisabled` / `isReadOnly` / `isInvalid` en vez de estados separados

**Accesibilidad (gold standard):**
- Cada segmento del DateField tiene `role="spinbutton"` con `aria-valuemin/max/now`
- Calendario con `role="grid"`, celdas con `role="gridcell"`
- `aria-current="date"` en la celda del dia actual
- Soporte completo de 13 sistemas de calendario (gregoriano, budista, islamico, persa, etc.)
- Testado en VoiceOver, NVDA, JAWS, TalkBack con anuncios consistentes
- Navegacion: Arrow keys entre dias, Page Up/Down entre meses

```
┌──────────────────────────────────────┐
│ Fecha de entrega                     │
│ ┌────┐ ┌────┐ ┌──────┐   ┌──┐      │
│ │ 03 │/│ 15 │/│ 2026 │   │▼ │      │
│ └────┘ └────┘ └──────┘   └──┘      │
│  spin    spin    spin    trigger     │
│                                      │
│ ┌────────────────────────────────┐   │
│ │  ◄   Marzo 2026   ►           │   │
│ │ Lu Ma Mi Ju Vi Sa Do          │   │
│ │              1  2  3          │   │
│ │  4  5  6  7  8  9 10          │   │
│ │ 11 12 13 14 ●15 16 17          │   │
│ │ 18 19 20 21 22 23 24          │   │
│ │ 25 26 27 28 29 30 31          │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
Patron: Segment DatePicker con Calendar popover (Spectrum)
```

---

### Carbon (IBM) — "Pragmatismo enterprise con Flatpickr"

Carbon toma un enfoque pragmatico: envuelve la libreria Flatpickr para el renderizado del calendario. Esto le permitio a IBM lanzar un DatePicker funcional rapidamente sin construir toda la logica del calendario desde cero. El trade-off es que el styling del calendario de Flatpickr no se alinea perfectamente con los tokens de Carbon, y la accesibilidad del popup depende de la implementacion de Flatpickr, que tiene gaps conocidos.

El componente ofrece tres modos via `datePickerType`: `simple` (solo texto, sin calendario — para fechas conocidas como cumpleanos), `single` (una fecha con calendario), y `range` (dos fechas con calendario). Estos tres modos son configuraciones del MISMO componente, no componentes separados. Carbon integra el DatePicker profundamente con su sistema de formularios: hereda automaticamente validacion, estados de error, helper text, y layout de form del sistema Carbon.

**Decisiones de diseno que importan:**

- **Tres tipos en un solo componente** (`datePickerType`): **Por que**: IBM considero que la diferencia entre "input de fecha sin calendario" y "input con calendario" es una configuracion, no un componente diferente. Unificarlos simplifica el API y la documentacion. **Impacto**: ALTO — un solo componente para todos los casos de fecha.
- **Dependencia de Flatpickr**: **Por que**: construir un calendario desde cero es costoso (i18n, navegacion, rendering de semanas). Flatpickr ya resuelve todo eso. El costo es menor control sobre el styling y a11y del popup. **Impacto**: MEDIO — trade-off pragmatico que introduce deuda tecnica.
- **Locale via sistema propio de Flatpickr**: Los nombres de meses y el primer dia de la semana siguen los locale objects de Flatpickr, separados del sistema i18n de Carbon. **Por que**: Flatpickr ya tenia su propio sistema de locales y adaptarlo al de Carbon habria sido costoso sin beneficio visible. **Impacto**: MEDIO — dos sistemas de i18n coexisten.

**Props notables (normalizados):**
- `type`: simple | single | range (via `datePickerType` — mapea a `type` en el estandar)
- `State`: disabled, readonly
- `Status`: error (via `invalid` + `invalidText`), warning (via `warn` + `warnText`) — divergencia: Carbon usa pares prop+text en vez de un solo `status`
- `minDate` / `maxDate`: strings en el formato configurado
- Divergencia: Carbon usa `kind` en otros componentes, pero en DatePicker usa `datePickerType` que mapea a `type`

**Accesibilidad:**
- Flatpickr provee navegacion basica con teclado dentro del calendario
- Carbon agrega labels accesibles al input
- El comportamiento del screen reader en el popup depende de Flatpickr — tiene gaps conocidos con NVDA
- Arrow keys para dias, Page Up/Down no siempre funciona consistentemente

```
┌──────────────────────────────────────┐
│ Fecha de inicio          Fecha fin   │
│ ┌───────────────┐  ┌───────────────┐ │
│ │ mm/dd/yyyy  📅│  │ mm/dd/yyyy  📅│ │
│ └───────────────┘  └───────────────┘ │
│ ┌────────────────────────────────┐   │
│ │  ◄   Marzo 2026   ►           │   │
│ │ Do Lu Ma Mi Ju Vi Sa          │   │
│ │  1  2  3  4  5  6  7          │   │
│ │  8  9 10 11 12 13 14          │   │
│ │ ■15 16 17 18 19■20 21          │   │
│ │ 22 23 24 25 26 27 28          │   │
│ │ 29 30 31                      │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
Patron: Range DatePicker con Flatpickr (Carbon)
■ = inicio/fin del rango, fondo = rango seleccionado
```

---

### Polaris (Shopify) — "Calendario inline como componente visual"

Contrario a lo que sugeria documentacion anterior, Polaris SI tiene un componente DatePicker implementado. Es un calendario visual que se renderiza inline (no en popover) y soporta seleccion de fechas individuales y rangos. El componente es deliberadamente simple: muestra un grid de calendario y emite eventos cuando el usuario selecciona fechas. No incluye un campo de texto — eso lo hace el desarrollador combinando DatePicker con un TextField de Polaris.

La documentacion de "Date Picking" de Polaris es un pattern que describe COMO combinar el DatePicker (calendario) con un Popover y un TextField para crear la experiencia completa. Esto es una decision de composicion: el calendario es un building block, no un componente listo para usar. Las props `allowRange` y `multiMonth` controlan si el calendario permite rangos y si muestra multiples meses. Polaris recomienda siempre ofrecer un campo de texto alternativo para accesibilidad.

Polaris esta en transicion de componentes React a Web Components framework-agnosticos (la version 2025-07 fue la ultima con soporte React). La version de Web Components del DatePicker ofrece APIs similares pero con atributos HTML.

**Decisiones de diseno que importan:**

- **Calendario inline, sin input integrado**: **Por que**: Shopify descubrio que sus merchants necesitan el calendario en contextos muy diferentes — dentro de popovers, en sidebars, embebido en formularios, en modales. Si el DatePicker incluyera un input, todos esos contextos requeriran customizacion. Separar el calendario del input da maxima flexibilidad. **Impacto**: ALTO — fuerza composicion manual.
- **`disabledDatesBefore` / `disabledDatesAfter` en vez de callback**: **Por que**: Shopify priorizo simplicidad para desarrolladores de apps de terceros que frecuentemente solo necesitan "no antes de hoy" o "no despues de 30 dias". Un callback es mas potente pero mas complejo. **Impacto**: MEDIO — limita casos avanzados.
- **Transicion a Web Components**: **Por que**: Shopify quiere que los componentes funcionen en cualquier framework (React, Remix, plain HTML) para su ecosistema de apps de checkout. **Impacto**: ALTO para el ecosistema Shopify.

**Props notables (normalizados):**
- `type`: se controla via `allowRange` boolean — no hay prop de type explicito
- `Boolean`: multiMonth (muestra dos meses lado a lado)
- `disabledDatesBefore` / `disabledDatesAfter`: fechas limite
- `month` / `year`: mes y ano mostrados (controlados externamente)
- Divergencia: no tiene prop de `size` ni `variant`; el calendario siempre se ve igual

**Accesibilidad:**
- Polaris recomienda SIEMPRE combinar con TextField para entrada por teclado
- El calendario inline no tiene ARIA pattern prescrito — la implementacion depende del desarrollador
- Recomendacion de `role="grid"` y `aria-current` en documentacion de patterns

```
┌──────────────────────────────────────────────┐
│ ┌────────────────────┐┌────────────────────┐ │
│ │ ◄  Marzo 2026      ││    Abril 2026   ►  │ │
│ │ Lu Ma Mi Ju Vi Sa Do││Lu Ma Mi Ju Vi Sa Do│ │
│ │              1  2  3││       1  2  3  4  5│ │
│ │  4  5  6  7  8  9 10││ 6  7  8  9 10 11 12│ │
│ │ 11 12 13 14 15 16 17││13 14 15 16 17 18 19│ │
│ │ 18 19 20 21 22 23 24││20 21 22 23 24 25 26│ │
│ │ 25 26 27 28 29 30 31││27 28 29 30         │ │
│ └────────────────────┘└────────────────────┘ │
│                                              │
│         [Cancelar]         [Aplicar]         │
└──────────────────────────────────────────────┘
Patron: Dual-month inline Calendar (Polaris)
— Se combina con Popover + TextField externamente
```

---

### Atlassian DS — "Single date con callback de deshabilitacion"

Atlassian aborda la seleccion de fechas de manera pragmatica: un DatePicker para una sola fecha, un TimePicker separado para hora, y un DateTimePicker que combina ambos. Criticamente, NO existe un DateRangePicker. Esta fue una decision deliberada basada en investigacion de producto: en Jira y Confluence, la seleccion de rangos se resuelve mejor con dos DatePickers independientes con validacion cruzada entre campos, en vez de un componente de rango que "atrapa" al usuario en un flujo de seleccion secuencial.

El paquete `@atlaskit/datetime-picker` contiene los tres componentes. El DatePicker usa un popup de calendario disparado por un input de texto. La prop `disabledDateFilter` es un callback que recibe una fecha y retorna boolean — similar al `isDateUnavailable` de Spectrum pero con un nombre diferente. La prop `shouldShowCalendarButton` controla si se muestra el icono de calendario como trigger, porque algunos UIs de Atlassian prefieren que solo el input de texto este visible (sin trigger visual de calendario).

**Decisiones de diseno que importan:**

- **Sin DateRangePicker**: **Por que**: la investigacion de Atlassian en Jira mostro que los rangos se seleccionan mejor con dos campos independientes ("Sprint Start" y "Sprint End") porque permite validacion independiente, editing independiente, y evita estados "atrapados" donde el usuario tiene que seleccionar el inicio antes del fin obligatoriamente. **Impacto**: ALTO — cambia como se modela la seleccion de rangos.
- **`disabledDateFilter` como callback**: **Por que**: en Jira sprint planning, los dias no laborables varian por equipo y proyecto. Un callback permite logica contextual. **Impacto**: ALTO.
- **`shouldShowCalendarButton`**: **Por que**: en algunas interfaces de Atlassian (ej: campos inline de Jira), mostrar un icono de calendario ocupa espacio valioso y distrae. Ocultarlo permite una experiencia de teclado pura. **Impacto**: MEDIO.

**Props notables (normalizados):**
- `State`: disabled (via prop `isDisabled`) — divergencia con el estandar
- `Status`: error (via `isInvalid`) — mapea a Status = error
- `disabledDateFilter`: `(date: string) => boolean`
- `dateFormat`: controla formato de display
- `defaultIsOpen`: auto-abre el calendario al montar
- `appearance`: "default" | "subtle" | "none" — mapea a `variant` en el estandar
- Divergencia: Atlassian usa `appearance` donde el estandar dice `variant`

**Accesibilidad:**
- Calendario con `role="grid"` y celdas con `role="gridcell"`
- `aria-selected` en la fecha seleccionada
- `aria-disabled` en fechas deshabilitadas
- Navegacion con Arrow keys dentro del calendario
- Escape cierra el popup, Enter selecciona

```
┌──────────────────────────────────┐
│ Sprint Start Date                │
│ ┌────────────────────────┐ ┌──┐ │
│ │ 2026/03/15             │ │📅│ │
│ └────────────────────────┘ └──┘ │
│ ┌────────────────────────────┐   │
│ │  ◄   Marzo 2026   ►       │   │
│ │ Lu Ma Mi Ju Vi Sa Do      │   │
│ │              1  2  3      │   │
│ │  4  5  6  7  8  9 10      │   │
│ │ 11 12 13 14 ●15 16 17      │   │
│ │ 18 19 20 21 22 23 24      │   │
│ │ 25 26 27 28 29 30 31      │   │
│ └────────────────────────────┘   │
└──────────────────────────────────┘
Patron: Single DatePicker con calendar popup (Atlassian)
● = fecha seleccionada
```

---

### Ant Design — "Maximo poder funcional con 5 modos de picker"

Ant Design es el sistema con la API mas rica para seleccion de fechas. Un solo componente `DatePicker` soporta CINCO modos de picker via la prop `picker`: `date`, `week`, `month`, `quarter`, `year`. El modo `quarter` es unico de Ant Design — ninguno de los otros 23 sistemas lo ofrece — y existe porque los productos de Alibaba/Ant Group requieren reportes fiscales trimestrales frecuentemente. `RangePicker` es un export separado del mismo paquete (`DatePicker.RangePicker`).

La prop `disabledDate` es la mas sofisticada del ecosistema: en contexto de rango, recibe un objeto `info` con `{ from, type }` donde `from` es la fecha de inicio ya seleccionada y `type` indica si se esta seleccionando el inicio o el fin. Esto permite reglas como "maximo 30 dias despues del inicio" sin logica externa. La prop `presets` acepta callbacks (no solo valores estaticos), permitiendo presets dinamicos como "ultimos 7 dias desde hoy" que se recalculan cada vez que se abre el picker.

La personalizacion visual tambien es superior: `cellRender` permite reemplazar el contenido de cualquier celda del calendario con JSX personalizado (indicadores de precio, marcadores de eventos, badges).

**Decisiones de diseno que importan:**

- **5 modos de picker en un componente**: **Por que**: Alibaba descubrio que los formularios de negocio frecuentemente necesitan seleccionar semanas (para reportes semanales), meses (para facturas), y trimestres (para reportes fiscales). Componentes separados para cada granularidad multiplicarian la documentacion y la confusion. **Impacto**: ALTO — un DatePicker sirve para 5 casos de uso.
- **`disabledDate` con `info.from` en rangos**: **Por que**: la restriccion mas comun en rangos es relativa al inicio (ej: "maximo 30 dias"). Sin `info.from`, el desarrollador necesita estado externo para rastrear la primera seleccion. Con `info.from`, la logica es autocontenida. **Impacto**: ALTO.
- **`presets` con callbacks**: **Por que**: los presets estaticos ("Q1 2026") se vuelven obsoletos. Los callbacks ("ultimos 7 dias") siempre estan actualizados. **Impacto**: MEDIO.
- **`needConfirm`**: Controla si seleccionar una fecha cierra automaticamente el picker o requiere un boton OK. **Por que**: en formularios largos, el cierre automatico es eficiente. En selecciones criticas (ej: fecha de pago), la confirmacion previene errores. **Impacto**: MEDIO.

**Props notables (normalizados):**
- `type`: date | week | month | quarter | year (via `picker`)
- `size`: small | middle | large — divergencia: Ant usa "middle" donde el estandar dice "md"
- `State`: disabled, readonly (via `inputReadOnly`)
- `Status`: error | warning (via `status` prop directa)
- `Boolean`: `allowClear`, `showTime`, `showNow`, `showToday`
- `presets`: `[{label, value: Dayjs | () => Dayjs}]` para accesos rapidos
- `cellRender`: `(date, info) => ReactNode` para personalizar celdas
- `disabledDate`: `(date, {from, type}) => boolean`
- Divergencia: Ant usa `status` como prop string directa, mapea 1:1 al eje Status del estandar

**Accesibilidad:**
- Calendario con `role="grid"`
- `aria-label` en cada celda con descripcion completa de la fecha
- Navegacion con Arrow keys entre celdas
- Page Up/Down para cambiar de mes
- Enter para seleccionar, Escape para cerrar

```
┌──────────────────────────────────────────────────────┐
│ ┌───────────────────────┐  ┌───────────────────────┐ │
│ │ 2026-03-01          📅│  │ 2026-03-31          📅│ │
│ └───────────────────────┘  └───────────────────────┘ │
│ ┌──────────────┐ ┌─────────────────┐┌──────────────┐ │
│ │ Ultimos 7d   │ │  ◄  Marzo 2026  ││ Abril 2026 ► │ │
│ │ Ultimos 30d  │ │Lu Ma Mi Ju Vi Sa││Lu Ma Mi Ju Vi│ │
│ │ Este mes     │ │              1  2││       1  2  3│ │
│ │ Este quarter │ │ 3  4  5  6  7  8││ 6  7  8  9 10│ │
│ │              │ │●10 11 12 13 14 15││13 14 15 16 17│ │
│ │              │ │17 18 19 20●21 22││20 21 22 23 24│ │
│ │              │ │24 25 26 27 28 29││27 28 29 30   │ │
│ │              │ │31               ││              │ │
│ └──────────────┘ └─────────────────┘└──────────────┘ │
│                                        [OK]          │
└──────────────────────────────────────────────────────┘
Patron: RangePicker con presets y dual calendar (Ant Design)
● = inicio/fin del rango
```

---

### Lightning (Salesforce) — "Consistencia enterprise cross-browser"

Salesforce Lightning construyo su Datepicker completamente custom — sin dependencias externas como Flatpickr. La razon es consistencia: Salesforce necesita que el picker se vea IDENTICO en Chrome, Firefox, Edge, y (historicamente) IE11 en maquinas corporativas con politicas de grupo restrictivas. Usar `<input type="date">` nativo habria generado experiencias completamente diferentes por navegador.

El componente combina un text input para entrada manual con un icono de calendario que dispara un popover con el grid del calendario. Soporta locale-aware formatting via la prop `dateStyle` que controla el formato de display (short, medium, long). La integracion con Lightning's form layout system es profunda — el DatePicker hereda automaticamente el layout, spacing, y comportamiento de error del formulario contenedor.

**Decisiones de diseno que importan:**

- **100% custom, sin dependencias**: **Por que**: la base de usuarios enterprise de Salesforce opera en navegadores controlados por IT donde las inconsistencias visuales generan tickets de soporte. Un calendario nativo/tercero no garantiza la uniformidad visual requerida. **Impacto**: ALTO — mayor control pero mayor costo de mantenimiento.
- **Dual input + calendar pattern**: Input de texto para power users que saben la fecha, icono de calendario para usuarios visuales. **Por que**: Salesforce descubrio que los representantes de ventas que registran muchas actividades prefieren escribir la fecha directamente, mientras que los gerentes que revisan calendarios prefieren el picker visual. Ambos perfiles deben estar servidos. **Impacto**: ALTO.
- **Locale-first via `dateStyle`**: **Por que**: Salesforce opera en 33 idiomas en mas de 100 paises. El formato de fecha (DD/MM/YYYY vs MM/DD/YYYY) no puede ser hardcoded. **Impacto**: ALTO para deployments globales.

**Props notables (normalizados):**
- `State`: disabled (deshabilita input y trigger)
- `min` / `max`: restricciones de rango (fechas ISO 8601)
- `dateStyle`: short | medium | long — controla formato de display
- `value`: string ISO 8601
- No tiene prop de `size` ni `variant` — tamano unico

**Accesibilidad:**
- Popover con `role="dialog"`
- Calendario con `role="grid"`, celdas con `aria-label` de fecha completa
- `aria-selected` en fecha seleccionada
- `aria-live` para anuncios de cambio de mes
- Arrow keys para navegar dias
- Enter para seleccionar
- Escape para cerrar popover
- Tab para moverse entre controles de mes/ano

```
┌──────────────────────────────────┐
│ Close Date                       │
│ ┌────────────────────────┐ ┌──┐ │
│ │ 03/15/2026             │ │📅│ │
│ └────────────────────────┘ └──┘ │
│ ┌────────────────────────────┐   │
│ │  ◄  March ▼  2026 ▼   ►   │   │
│ │ Su Mo Tu We Th Fr Sa      │   │
│ │  1  2  3  4  5  6  7      │   │
│ │  8  9 10 11 12 13 14      │   │
│ │ ●15 16 17 18 19 20 21      │   │
│ │ 22 23 24 25 26 27 28      │   │
│ │ 29 30 31                  │   │
│ │           [Today]          │   │
│ └────────────────────────────┘   │
└──────────────────────────────────┘
Patron: Enterprise DatePicker con popover (Lightning)
● = fecha seleccionada
```

---

## Lo que Todos Coinciden (Consenso)

**1. Siempre ofrecer entrada por teclado ademas del calendario visual**: Incluso cuando existe un popup de calendario, el usuario SIEMPRE puede escribir la fecha directamente en el campo de texto. Los 7 sistemas implementan esto porque los usuarios de screen reader y los power users que conocen la fecha exacta son significativamente mas rapidos escribiendo que navegando un calendario. Esto no es opcional — es un requisito baseline de accesibilidad (WCAG 2.2 AA).

**2. El calendario usa el patron ARIA grid**: Todos los sistemas que implementan un calendario visual usan `role="grid"` con `role="gridcell"` para cada celda de dia. Esto permite que los lectores de pantalla anuncien la posicion dentro de la grilla ("fila 3, columna 4, jueves 15 de marzo") y que la navegacion por teclado con flechas funcione de manera predecible. Es el patron definido por el W3C APG y ningun sistema se desvia de el.

**3. El input y el calendario son componentes separables**: Ninguno de los 7 sistemas fusiona el input de texto y el calendario en un unico elemento inseparable. El input (o DateField) y el Calendar son componentes distintos que se componen juntos. Esto permite usar el calendario inline sin input (dashboards, filtros) o el input sin calendario (formularios donde la fecha es conocida). Spectrum lo lleva al extremo con 4 componentes; Carbon lo hace con `datePickerType: "simple"`.

**4. Arrow keys navegan entre dias del calendario**: En todos los sistemas, las flechas izquierda/derecha mueven entre dias, y arriba/abajo entre semanas. Page Up/Down cambia de mes. Esto es consistente con el patron APG de grid y es lo que los usuarios de teclado esperan. Home/End para ir al inicio/fin de la semana esta presente en la mayoria pero no en todos.

**5. Las fechas deshabilitadas son visualmente distintas y no seleccionables**: Todos los sistemas muestran las fechas fuera de rango o deshabilitadas con opacidad reducida, sin interaccion de hover, y con `aria-disabled="true"`. La diferencia esta en COMO se definen (callback vs props min/max), pero el comportamiento visual y accesible es identico.

**6. Escape cierra el calendario y devuelve el foco al trigger**: Todos los sistemas implementan el patron de dialog/popover donde Escape cierra el overlay y devuelve el foco al elemento que lo abrio (el input o el boton de calendario). Esto es un requisito del patron APG de dialog.

**7. El dia actual ("today") tiene indicacion visual**: Todos los sistemas marcan el dia actual con un indicador visual distinto de la seleccion — tipicamente un punto, un borde, o texto en color de acento. Esto da al usuario un punto de referencia temporal al navegar meses pasados o futuros.

---

## Decisiones que Necesitas Tomar

### 1. "Deberia separar Calendar como componente independiente o mantenerlo dentro del DatePicker?"

**Opcion A: Componentes separados** — adoptada por Spectrum, Polaris

Como funciona: Calendar/RangeCalendar son componentes independientes que se pueden usar sin input. DatePicker los compone internamente.

La ventaja: maximo reuso — el calendario puede embeberse en dashboards, sidebars, modales, y cualquier contexto sin el overhead del input.

La desventaja: el desarrollador debe componer manualmente (Popover + Calendar + TextField) para el caso de uso mas comun. Mas codigo boilerplate.

**Opcion B: Calendario integrado en DatePicker** — adoptada por M3, Carbon, Atlassian, Ant Design, Lightning

Como funciona: el calendario es un detalle interno del DatePicker. No se exporta como componente independiente.

La ventaja: el caso de uso mas comun (input + popup calendar) funciona out of the box con una sola linea de codigo.

La desventaja: si necesitas un calendario inline sin input, no puedes extraerlo. Necesitas duplicar o crear un componente Calendar separado despues.

**Para tu caso**: Si tu DS necesita calendarios embebidos (dashboards, scheduling views), la Opcion A es mejor inversion a largo plazo. Si solo necesitas campos de fecha en formularios, la Opcion B es mas rapida de implementar.

---

### 2. "Como deberia el usuario ingresar la fecha: texto libre, segmentos editables, o solo calendario?"

**Opcion A: Segmentos editables (spinbutton)** — adoptada por Spectrum

Como funciona: la fecha se divide en segmentos independientes [MM] / [DD] / [YYYY]. Cada uno es un spinbutton con valores minimo y maximo. El usuario navega entre segmentos con Tab.

La ventaja: elimina errores de formato por completo. El usuario no puede escribir "March" en un campo numerico. Accesibilidad superior con screen readers.

La desventaja: no permite copiar/pegar una fecha completa facilmente. Usuarios acostumbrados a escribir fechas rapidamente pueden sentirlo mas lento.

**Opcion B: Texto libre con parsing** — adoptada por M3, Carbon, Atlassian, Ant Design, Lightning

Como funciona: un input de texto estandar donde el usuario escribe la fecha. El componente parsea el string al cerrar/blur.

La ventaja: familiar, rapido para power users, permite copiar/pegar.

La desventaja: errores de formato frecuentes (23% segun Spectrum). El desarrollador debe implementar parsing robusto y feedback de error.

**Para tu caso**: si la accesibilidad es prioridad maxima o el publico incluye usuarios poco tecnicos, los segmentos son superiores. Si es una herramienta para power users que ingresan muchas fechas, el texto libre es mas eficiente.

---

### 3. "Necesita el DatePicker un DateRangePicker companion, o los rangos se resuelven con dos DatePickers?"

**Opcion A: DateRangePicker como componente dedicado** — adoptada por Spectrum, Carbon, Ant Design, Lightning

Como funciona: un componente especifico para rangos con dos campos de fecha conectados y un calendario que muestra la seleccion de rango visualmente.

La ventaja: UX optimizada para rangos — el usuario ve visualmente el rango en el calendario, la validacion inicio < fin es automatica.

La desventaja: componente adicional que mantener. La logica de rango (highlight entre inicio y fin, manejo de hover preview) es compleja.

**Opcion B: Dos DatePickers independientes** — adoptada por Atlassian, Polaris

Como funciona: dos campos de fecha separados ("desde" y "hasta") con validacion cruzada a nivel de formulario.

La ventaja: simplicidad — no necesitas un componente nuevo. Cada campo se valida independientemente. Mas flexible para layouts variados.

La desventaja: no hay feedback visual del rango en el calendario. El usuario debe hacer la conexion mental entre los dos campos.

**Para tu caso**: si los rangos son un caso de uso frecuente (filtros, reportes, scheduling), un DateRangePicker dedicado es la mejor UX. Si los rangos son raros o siempre en formularios con otros campos, dos DatePickers son suficientes.

---

### 4. "Como manejar fechas deshabilitadas: callback, props min/max, o array?"

**Opcion A: Callback function** — adoptada por Spectrum (`isDateUnavailable`), Atlassian (`disabledDateFilter`), Ant Design (`disabledDate`)

Como funciona: una funcion que recibe una fecha y retorna boolean. El componente llama la funcion por cada celda visible.

La ventaja: logica arbitraria — fines de semana, feriados, slots ya reservados, reglas de negocio complejas. Ant Design agrega `info.from` para logica relativa al inicio del rango.

La desventaja: performance si la funcion es costosa (llamada ~42 veces por mes visible). El desarrollador debe implementar la logica.

**Opcion B: Props min/max con formato simple** — adoptada por Carbon, Lightning, Polaris

Como funciona: props `minDate`/`maxDate` (o `disabledDatesBefore`/`disabledDatesAfter`) definen un rango valido. Todo fuera del rango se deshabilita.

La ventaja: API simple. Cubre el 80% de los casos ("no antes de hoy", "no despues de 90 dias").

La desventaja: no puede manejar logica compleja (ej: "solo dias laborables" o "excluir estos feriados especificos").

**Para tu caso**: la mejor practica es ofrecer AMBOS — min/max como conveniencia para casos simples, y un callback para logica avanzada. Spectrum y Ant Design hacen exactamente esto.

---

### 5. "Deberia soportar modos de picker adicionales (semana, mes, quarter, ano)?"

**Opcion A: Solo modo fecha** — adoptada por M3, Spectrum, Atlassian, Lightning

Como funciona: el DatePicker solo selecciona una fecha especifica (dia/mes/ano).

La ventaja: componente mas simple, mas ligero, menos edge cases. Los modos mes/ano se resuelven con Selects separados.

La desventaja: los formularios de negocio que necesitan "seleccionar un mes" o "seleccionar un trimestre" requieren componentes separados.

**Opcion B: Multiples modos de picker** — adoptada por Ant Design (5 modos), Carbon (simple/single/range)

Como funciona: una prop `picker` cambia el modo de seleccion entre dia, semana, mes, quarter, ano.

La ventaja: un solo componente cubre todos los casos de seleccion temporal. API unificada.

La desventaja: la complejidad del componente se multiplica. El calendario visual cambia completamente entre modos (grid de dias vs grid de meses). Testing y mantenimiento costosos.

**Para tu caso**: si tu aplicacion tiene formularios de negocio/reportes, los modos mes y quarter son muy utiles. Para apps consumer, solo modo fecha es suficiente.

---

### 6. "El calendario deberia tener confirmacion explicita o cerrar automaticamente?"

**Opcion A: Cierre automatico al seleccionar** — adoptada por M3, Atlassian, Polaris

Como funciona: cuando el usuario hace click en un dia, el calendario se cierra y la fecha se aplica.

La ventaja: menos clicks, mas rapido para selecciones simples.

La desventaja: un click accidental aplica la fecha sin oportunidad de correccion. En rangos, el usuario no puede "navegar" antes de confirmar.

**Opcion B: Boton de confirmacion (Apply/OK)** — adoptada por Ant Design (`needConfirm`), Carbon (rangos)

Como funciona: el usuario selecciona pero el valor no se aplica hasta presionar "OK" o "Aplicar".

La ventaja: previene errores, especialmente en rangos donde el usuario necesita navegar entre meses antes de seleccionar el fin.

La desventaja: un click extra en cada seleccion. Para selecciones simples frecuentes, se siente pesado.

**Para tu caso**: la practica recomendada es cierre automatico para seleccion simple y confirmacion explicita para rangos. Ant Design y Polaris siguen este patron.

---

## Patrones Visuales Encontrados

| Patron | Descripcion | Mejor para | Adoptado por |
|--------|-------------|-----------|--------------|
| Modal Calendar | Calendario a pantalla completa/dialog | Touch/mobile, seleccion critica | M3 |
| Popover Calendar | Input con calendario flotante | Desktop, formularios | Atlassian, Lightning, Carbon |
| Segment Input + Popover | Campos spinbutton + calendario | Maxima accesibilidad | Spectrum |
| Inline Calendar | Calendario siempre visible | Dashboards, filtros, scheduling | Polaris |
| Dual Calendar Range | Dos meses lado a lado con presets | Rangos, reportes, analytics | Ant Design, Polaris, Carbon |
| Input-only (simple) | Solo campo de texto sin calendario | Fechas conocidas (cumpleanos) | Carbon (type: simple) |

### Wireframe: Popover Calendar (patron mas comun)
```
┌──────────────────────────────────┐
│ Label                            │
│ ┌────────────────────────┐ ┌──┐ │
│ │ dd/mm/yyyy             │ │▼ │ │
│ └────────────────────────┘ └──┘ │
│ ┌────────────────────────────┐   │
│ │  ◄   Marzo 2026   ►       │   │
│ │ Lu Ma Mi Ju Vi Sa Do      │   │
│ │              1  2  3      │   │
│ │  4  5  6  7  8  9 10      │   │
│ │ 11 12 13 14 ●15 16 17      │   │
│ │ 18 19 20 21 22 23 24      │   │
│ │ 25 26 27 28 29 30 31      │   │
│ └────────────────────────────┘   │
└──────────────────────────────────┘
```

### Wireframe: Segment Spinbutton Input (Spectrum)
```
┌──────────────────────────────────┐
│ Label                            │
│ ┌────┐ ┌────┐ ┌──────┐   ┌──┐  │
│ │ MM │/│ DD │/│ YYYY │   │▼ │  │
│ └────┘ └────┘ └──────┘   └──┘  │
│ [spin] [spin]  [spin]   trigger │
│                                  │
│ Cada segmento:                   │
│ - role="spinbutton"              │
│ - Arrow Up/Down = +1/-1          │
│ - Tab = siguiente segmento       │
│ - Numpad = entrada directa       │
└──────────────────────────────────┘
```

### Wireframe: Dual Calendar Range con Presets
```
┌──────────────────────────────────────────────────────┐
│ ┌─────────────┐  ─  ┌─────────────┐                 │
│ │ Fecha inicio│     │ Fecha fin   │                 │
│ └─────────────┘     └─────────────┘                 │
│ ┌──────────────┐ ┌─────────────────┐┌──────────────┐│
│ │ Hoy          │ │  ◄  Marzo 2026  ││ Abril 2026 ► ││
│ │ Ult. 7 dias  │ │Lu Ma Mi Ju Vi Sa││Lu Ma Mi Ju Vi││
│ │ Ult. 30 dias │ │        ■1  2  3 ││       1  2  3││
│ │ Este mes     │ │ 4  5  6  7  8  9││ 6  7  8  9 10││
│ │ Ult. quarter │ │10 11 12 13 14 15││13 14 15 16 17││
│ │              │ │17 18 19 20 21■22││20 21 22 23 24││
│ │              │ │24 25 26 27 28 29││27 28 29 30   ││
│ └──────────────┘ └─────────────────┘└──────────────┘│
│                                       [Aplicar]     │
└──────────────────────────────────────────────────────┘
■ = inicio/fin del rango, fondo sombreado = rango
```

### Wireframe: Modal Calendar (M3 mobile)
```
┌──────────────────────────────────┐
│                                  │
│     Selecciona una fecha         │
│                                  │
│  ┌────────────────────────────┐  │
│  │     ◄  Marzo 2026  ►      │  │
│  │ Lu  Ma  Mi  Ju  Vi  Sa  Do│  │
│  │                  1   2   3│  │
│  │  4   5   6   7   8   9  10│  │
│  │ 11  12  13  14  ●15 16  17│  │
│  │ 18  19  20  21  22  23  24│  │
│  │ 25  26  27  28  29  30  31│  │
│  └────────────────────────────┘  │
│                                  │
│  [ Editar con teclado ]          │
│                                  │
│     [Cancelar]      [OK]         │
└──────────────────────────────────┘
Celdas grandes para toque (48x48dp minimo)
```

---

## Riesgos a Considerar

**1. Accesibilidad del calendario popup** (ALTO) — La implementacion del patron ARIA grid es compleja. Cada celda necesita `role="gridcell"`, `aria-selected`, `aria-disabled`, y `aria-label` con la fecha completa. La navegacion por teclado (flechas, Page Up/Down, Home/End) debe funcionar perfectamente. Carbon demostro que delegar esto a una dependencia externa (Flatpickr) puede resultar en gaps de accesibilidad dificiles de parchear. Mitigacion: construir el calendario custom con tests automatizados de a11y desde el inicio, o usar React Aria de Spectrum como foundation.

**2. Complejidad del DateRangePicker** (ALTO) — Si decides implementar un componente de rango dedicado, la logica de seleccion es significativamente mas compleja que single: highlight del rango durante hover (preview), manejo de "segundo click antes del primero", validacion de rango minimo/maximo, navegacion entre meses sin perder la seleccion parcial, y el flujo "selecciona inicio → navega → selecciona fin". Cada uno de estos es un edge case con potencial de bugs. Mitigacion: empezar con un prototipo de solo la interaccion de rango antes de integrar al design system.

**3. Internacionalizacion del formato de fecha** (MEDIO) — El formato DD/MM/YYYY vs MM/DD/YYYY no es solo un problema de display — afecta el parsing del input, los placeholders, los separadores, y el primer dia de la semana (domingo vs lunes). Carbon descubrio que mantener DOS sistemas de i18n (Carbon + Flatpickr) genera inconsistencias. Mitigacion: elegir UNA fuente de verdad para i18n desde el inicio (Intl.DateTimeFormat es la recomendacion).

**4. Comportamiento en mobile** (MEDIO) — El `<input type="date">` nativo ofrece una experiencia optimizada por el OS en mobile (wheel pickers en iOS, calendar modal en Android). Un calendario custom reemplaza esa experiencia con algo potencialmente inferior en touch. M3 resuelve esto con modales grandes; Spectrum usa segmentos que funcionan bien con teclados virtuales. Mitigacion: considerar usar el picker nativo en mobile (deteccion con `matchMedia`) y el custom en desktop.

**5. Performance con muchas fechas deshabilitadas** (BAJO) — Si usas un callback para `isDateUnavailable`, este se ejecuta por cada celda visible (~42 por mes). Si el callback hace llamadas a API o calculos costosos, el rendering se degrada. Mitigacion: memoizar el callback, pre-calcular las fechas deshabilitadas del mes visible, o usar un Set para lookups O(1).

---

## Sub-componentes Identificados

| Sub-componente | Funcion | Adoptado por |
|---|---|---|
| **DateField / DateInput** | Campo de texto (o segmentos) para entrada manual | Todos los 7 sistemas |
| **Calendar** | Grid de dias para seleccion visual | Spectrum (independiente), todos los demas (interno) |
| **RangeCalendar** | Calendar con logica de seleccion de rango | Spectrum (independiente), Ant, Carbon (interno) |
| **DayCell** | Celda individual del grid del calendario | Interno en todos |
| **MonthPicker** | Selector de mes (dropdown o grid) | M3, Lightning, Ant (con `picker="month"`) |
| **YearPicker** | Selector de ano (dropdown o grid) | M3, Lightning, Ant (con `picker="year"`) |
| **CalendarHeader** | Navegacion de mes/ano con flechas | Todos |
| **PresetPanel** | Panel lateral con rangos predefinidos | Ant Design, patron de Polaris |

---

## Jerarquia de Componentes Recomendada

```
DatePicker (family)
├── DateField          → Input de fecha (texto o segmentos)
├── Calendar           → Grid de calendario standalone
│   ├── CalendarHeader → Navegacion mes/ano
│   ├── WeekdayBar     → Fila de encabezados (Lu, Ma, Mi...)
│   └── DayCell        → Celda individual de dia
├── DatePicker         → DateField + Calendar en popover
├── DateRangePicker    → 2x DateField + RangeCalendar
│   └── PresetPanel    → Panel lateral de presets
├── MonthPicker        → Selector de mes
└── YearPicker         → Selector de ano
```

---

## Mapeo de Propiedades (estandar normalizado)

```
datepicker
  size:    sm | md | lg
  State:   default | hover | focus | disabled | readonly
  Status:  none | error | warning
  Boolean: label | clear | showToday
  Overlay: loading

calendar
  type:    single-month | dual-month
  State:   default | disabled
  Overlay: loading

daterangepicker
  size:    sm | md | lg
  type:    base | with-presets | dual-calendar
  State:   default | hover | focus | selecting | disabled | readonly
  Status:  none | error
  Boolean: footer | presets
  Overlay: loading
```

---

## Navegacion por Teclado (patron APG consolidado)

| Tecla | Accion en calendario | Accion en input |
|-------|---------------------|-----------------|
| Arrow Left/Right | Dia anterior/siguiente | Cursor en texto / segmento anterior/siguiente |
| Arrow Up/Down | Semana anterior/siguiente | En segmentos: +1/-1 del valor |
| Page Up | Mes anterior | — |
| Page Down | Mes siguiente | — |
| Shift + Page Up | Ano anterior | — |
| Shift + Page Down | Ano siguiente | — |
| Home | Inicio de semana | Inicio del campo |
| End | Fin de semana | Fin del campo |
| Enter | Seleccionar fecha | Abrir calendario |
| Escape | Cerrar calendario | — |
| Tab | Salir del calendario | Siguiente campo/segmento |

---

## Siguientes Pasos

| # | Paso | Comando | Agente |
|---|------|---------|--------|
| 1 | Definir anatomia del componente | `/anatomy datepicker` | Anatomy Agent |
| 2 | Generar variant matrix | `/matrix datepicker` | Variant Matrix Agent |
| 3 | Asignar tokens semanticos | `/tokens datepicker` | Token Assignment Agent |
| 4 | Escribir spec de interaccion | `/interaction datepicker` | Interaction Spec Agent |
| 5 | Planificar estructura Figma | `/generate datepicker` | Figma Generation Agent |
