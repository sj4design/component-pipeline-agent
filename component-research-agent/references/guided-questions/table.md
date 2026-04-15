---
component: table
questions: 5
---

# Guided Questions — Table

---

## Pregunta 1: Funcionalidades de datos
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué capacidades de manipulación de datos necesitas?

1. **Sorting por columna** — el usuario puede ordenar ascendente/descendente haciendo click en el header (ej: ordenar por fecha, por monto)
2. **Filtrado por columna** — filtros específicos por columna (ej: dropdown de valores, rango de fechas por columna)
3. **Búsqueda global** — un campo de búsqueda que filtra filas en todas las columnas
4. **Paginación** — los datos se dividen en páginas con navegación (ej: 10/25/50 filas por página)
5. **Scroll infinito / Load more** — más filas se cargan al hacer scroll o click en "Cargar más"
6. **Ninguna** — tabla de solo lectura con datos estáticos, sin interacción de datos
7. No estoy seguro — muéstrame cómo los sistemas combinan estas funcionalidades

**Nota adaptativa:** Si eliges 4 (paginación) y 5 (scroll infinito), son mutuamente excluyentes — el research explicará cuándo usar cada patrón.

---

## Pregunta 2: Selección de filas
**(elige UNA opción)**

¿Los usuarios pueden seleccionar filas de la tabla?

1. **No** — la tabla es informativa, no se seleccionan filas
2. **Selección simple** — se puede seleccionar una sola fila a la vez (ej: elegir un registro para ver el detalle)
3. **Selección múltiple con checkboxes** — el usuario puede seleccionar varias filas con checkboxes por fila y "seleccionar todo" en el header
4. **Selección múltiple con acciones bulk** — igual que 3, pero al seleccionar aparece un toolbar con acciones aplicables a los ítems seleccionados (ej: "Eliminar seleccionados", "Exportar selección")
5. No estoy seguro — muéstrame las implicaciones de UX de cada patrón de selección

---

## Pregunta 3: Edición de datos
**(elige UNA opción)**

¿Los usuarios pueden modificar datos directamente en la tabla?

1. **Solo lectura** — la tabla muestra datos, no permite edición directa
2. **Edición inline** — hacer click en una celda la convierte en input editable (ej: hojas de cálculo, CRMs)
3. **Acciones por fila** — cada fila tiene botones de acción al final (ej: "Editar", "Eliminar", "Ver detalle")
4. **Ambas** — hay edición inline para campos simples y un botón de edición para el registro completo
5. No estoy seguro — muéstrame las implicaciones de accesibilidad y UX de cada opción

**Nota adaptativa:** Si eliges 1 (solo lectura), las preguntas sobre edición inline y acciones no aplican — el research se centrará en la presentación y navegabilidad de los datos.

---

## Pregunta 4: Estructura de columnas
**(elige UNA opción)**

¿Las columnas son fijas o configurables por el usuario?

1. **Columnas fijas** — el desarrollador define las columnas, el usuario no puede cambiarlas
2. **Columnas con show/hide** — el usuario puede mostrar u ocultar columnas según sus necesidades (ej: reportes personalizables)
3. **Columnas con resize** — el usuario puede ajustar el ancho de las columnas arrastrando el borde
4. **Columnas con reorder** — el usuario puede reordenar columnas por drag & drop
5. **Todas las anteriores** — tabla completamente personalizable (ej: herramientas de análisis de datos enterprise)
6. No estoy seguro — muéstrame qué configuraciones de columna son comunes en design systems enterprise

---

## Pregunta 5: Comportamiento en mobile / responsivo
**(elige UNA opción)**

¿Qué pasa con la tabla en pantallas pequeñas?

1. **Scroll horizontal** — la tabla mantiene su estructura pero hace scroll en eje X (ej: datos financieros que necesitan todas las columnas)
2. **Cards apiladas** — en mobile, cada fila se transforma en una card vertical con label + valor (ej: tablas simples de listados)
3. **Colapso de columnas** — algunas columnas se ocultan en mobile, solo quedan las más importantes
4. **No aplica** — la tabla solo se usa en desktop/tablet, el diseño no incluye mobile
5. No estoy seguro — muéstrame cómo los sistemas abordan la responsividad de tablas (es uno de los problemas más complejos del UI)
