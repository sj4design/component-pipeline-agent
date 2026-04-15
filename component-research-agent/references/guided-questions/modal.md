---
component: modal
questions: 5
---

# Guided Questions — Modal

---

## Pregunta 1: Tipo de contenido y propósito
**(elige UNA opción)**

¿Para qué se usa el modal en tu caso?

1. **Confirmación simple** — pregunta al usuario si confirma una acción (ej: "¿Estás seguro de eliminar?") — título + texto + 2 botones
2. **Formulario** — el usuario completa datos dentro del modal antes de continuar (ej: crear nuevo ítem, editar registro)
3. **Contenido rico** — muestra información compleja como imágenes, listas, detalles expandidos (ej: preview de archivo, detalle de producto)
4. **Flujo paso a paso (wizard)** — proceso multi-step dentro del modal (ej: onboarding, configuración inicial, proceso de checkout)
5. **Varios propósitos** — el mismo componente modal se usa para confirmaciones, formularios y contenido según el contexto
6. No estoy seguro — muéstrame las variantes que ofrecen los design systems

**Nota adaptativa:** Si eliges 4 (wizard), el research enfatizará cómo los sistemas manejan navegación multi-step, progress indicators y el problema de "¿puedo cerrar el modal en medio de un flujo?".

---

## Pregunta 2: Tamaños necesarios
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué tamaños de modal necesitas?

1. **Small / Alert** — para confirmaciones cortas, alertas de una línea (ej: "¿Eliminar registro?" — ancho ~400px)
2. **Medium / Default** — para formularios de 3-6 campos, contenido moderado (ej: editar perfil — ancho ~560-640px)
3. **Large** — para contenido complejo, tablas, formularios largos (ej: importar datos — ancho ~800px+)
4. **Fullscreen / Drawer** — ocupa toda o casi toda la pantalla (ej: editor avanzado, flujos complejos en mobile)
5. Un solo tamaño es suficiente para todos mis casos

---

## Pregunta 3: Comportamiento de cierre
**(puedes elegir VARIAS, sepáralas con coma)**

¿Cómo puede cerrar el modal el usuario?

1. **Click en el overlay** — hacer click fuera del modal lo cierra
2. **Botón X explícito** — hay un ícono de cerrar visible en la esquina superior del modal
3. **Tecla Escape** — presionar Esc cierra el modal
4. **Solo con acción explícita** — el modal es bloqueante, no se puede cerrar hasta completar o cancelar la acción (ej: proceso crítico, datos sin guardar)
5. No estoy seguro — muéstrame las implicaciones de accesibilidad de cada opción

**Nota adaptativa:** Si eliges 4 (modal bloqueante), el research cubrirá los requerimientos de accesibilidad específicos para modales que no cierran con Escape — es un caso especial con implicaciones en ARIA y UX.

---

## Pregunta 4: Acciones en el footer
**(elige UNA opción)**

¿Cómo se estructuran las acciones del modal?

1. **Acción primaria + cancelar** — footer estándar con 2 botones (ej: "Guardar" y "Cancelar")
2. **Solo cerrar** — un único botón de "Entendido" o "Cerrar" (ej: modales informativos)
3. **Acciones múltiples** — 3 o más botones en el footer (ej: "Guardar borrador", "Publicar", "Cancelar")
4. **Sin footer** — las acciones están inline dentro del contenido, no en un área de footer separada
5. **Variable** — depende del caso de uso, el modal debe soportar todas las configuraciones anteriores
6. No estoy seguro — muéstrame los patrones estándar de footer en los design systems

---

## Pregunta 5: Personalización de contenido interno
**(puedes elegir VARIAS, sepáralas con coma)**

El contenido dentro del body y footer del modal ¿tiene estructura predecible o es libre?

1. **Body predefinido** — el body siempre tiene una estructura típica (texto, lista, formulario) que se puede pre-armar como building block intercambiable en Figma
2. **Body libre** — el body es un contenedor vacío donde el diseñador pone cualquier contenido
3. **Footer con acciones estándar** — el footer siempre tiene 1-3 botones de acción (Cancelar, Confirmar) que se pueden pre-armar como building block
4. **Footer libre** — el footer puede tener cualquier contenido, no solo botones
5. **Todo predefinido** — tanto body como footer tienen estructura típica, quiero building blocks para ambos
6. No estoy seguro — muéstrame cómo los design systems manejan la personalización de contenido dentro de modales

**Nota adaptativa:** Si eliges 1, 3 o 5, el research enfatizará patrones de building blocks, instance swap y slot defaults en Figma. Si eliges 2 o 4, el foco será en flexibilidad de contenedores y guías de uso libre.
