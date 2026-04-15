---
component: accordion
questions: 4
---

# Guided Questions — Accordion

---

## Pregunta 1: Tipo de contenido en los paneles
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué tipo de contenido va dentro de cada panel del accordion?

1. **Solo texto** — párrafos de descripción o explicación (ej: FAQ, términos y condiciones, ayuda contextual)
2. **Texto + imágenes** — contenido editorial con media embebida (ej: documentación, guías paso a paso)
3. **Formularios** — inputs, selects, checkboxes dentro de cada panel (ej: filtros avanzados, configuración por secciones)
4. **Listas o tablas** — datos estructurados dentro del panel (ej: detalles de un pedido, desglose de precios)
5. **Componentes complejos** — accordions anidados, tabs dentro de accordion, cualquier componente rico (ej: configuración avanzada, dashboards colapsables)
6. Todos los anteriores (el accordion debe soportar cualquier contenido)
7. No estoy seguro — muéstrame cómo los sistemas manejan distintos tipos de contenido en accordions

---

## Pregunta 2: Comportamiento de apertura
**(elige UNA opción)**

¿Cuántos paneles pueden estar abiertos al mismo tiempo?

1. **Solo uno (exclusivo / acordeón real)** — al abrir un panel, el anterior se cierra automáticamente (ej: FAQ donde se quiere que el usuario lea de a una sección)
2. **Varios simultáneos** — el usuario puede abrir y cerrar paneles de forma independiente, varios pueden estar abiertos a la vez (ej: filtros de búsqueda, configuración modular)
3. **Uno abierto por defecto, los demás colapsados** — la primera sección está expandida al cargar, las demás cerradas
4. **Todos cerrados por defecto** — el usuario debe abrir activamente los que quiere ver
5. No estoy seguro — muéstrame las implicaciones de UX de cada comportamiento de apertura

---

## Pregunta 3: Elementos en el header del panel
**(elige UNA opción)**

¿El header de cada panel tiene elementos adicionales además del título?

1. **Solo título + ícono de toggle** — el header es un label simple con el ícono chevron o +/- (ej: FAQ básico)
2. **Título + badge o count** — el header muestra información adicional como un contador de ítems (ej: "Filtros (3 activos)", "Pedidos (12)")
3. **Título + acciones** — el header incluye botones de acción además del toggle (ej: "Configuración avanzada — [Editar] [Eliminar]")
4. **Header completamente personalizable** — el slot del header debe poder recibir cualquier contenido (ej: diseño editorial con imagen o ícono custom)
5. No estoy seguro — muéstrame los patrones de header de accordion más comunes

**Nota adaptativa:** Si eliges 3 (acciones en el header), el research cubrirá el problema de clic ambiguo — ¿qué área del header hace toggle y qué área ejecuta la acción? Cada sistema lo resuelve diferente.

---

## Pregunta 4: Animación y transición
**(elige UNA opción)**

¿Cómo debe comportarse la animación de apertura/cierre?

1. **Con animación suave** — el panel se expande y colapsa con transición CSS (ej: estándar para la mayoría de productos)
2. **Sin animación** — el panel aparece y desaparece instantáneamente (ej: interfaces con muchos accordions donde la animación puede sentirse lenta)
3. **Animación configurable** — la velocidad o tipo de animación debe poder configurarse
4. No estoy seguro — muéstrame cómo los sistemas manejan las animaciones de accordion y las consideraciones de `prefers-reduced-motion`
