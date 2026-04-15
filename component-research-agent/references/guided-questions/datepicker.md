---
component: datepicker
questions: 4
---

# Guided Questions — DatePicker

---

## Pregunta 1: Tipo de selección
**(elige UNA opción)**

¿Qué necesita seleccionar el usuario?

1. **Una fecha específica** — el usuario elige un día exacto (ej: fecha de nacimiento, fecha de entrega)
2. **Un rango de fechas** — el usuario elige fecha de inicio y fin (ej: filtro de reportes, reserva de hotel)
3. **Ambos en distintos contextos** — el componente debe soportar tanto selección simple como rango según el caso de uso
4. No estoy seguro — muéstrame cómo lo resuelven otros y decido después

**Nota adaptativa:** Si eliges 2 (rango), la Pregunta 3 sobre hora aún aplica (rangos pueden tener hora de inicio/fin). Si eliges 4, mostrar todas las variantes en el research.

---

## Pregunta 2: Presentación del componente
**(elige UNA opción)**

¿Cómo se presenta el datepicker en la interfaz?

1. **Popover sobre un input** — el calendario aparece al hacer click en un campo de texto (ej: formularios, filtros de búsqueda)
2. **Inline en la página** — el calendario está siempre visible, no se oculta (ej: página de reserva, pantalla de disponibilidad)
3. **Ambos en distintos contextos** — necesito popover en formularios e inline en pantallas de selección
4. No estoy seguro — muéstrame cómo lo resuelven otros y decido después

---

## Pregunta 3: Selección de hora
**(elige UNA opción)**

¿Además de la fecha, el usuario necesita seleccionar hora?

1. **Solo fecha** — sin hora (ej: fecha de vencimiento, cumpleaños)
2. **Fecha + hora** — el usuario elige día y también la hora (ej: agendar cita, crear evento de calendario)
3. **Solo hora** — necesito un timepicker independiente, no combinado con fecha
4. No estoy seguro — muéstrame ambas variantes

**Nota adaptativa:** Si eliges 3 (solo hora), el componente relevante es un TimePicker, no DatePicker. Considera si investigar ese componente en su lugar.

---

## Pregunta 4: Restricciones y comportamientos especiales
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué restricciones o capacidades adicionales necesitas?

1. **Fecha mínima/máxima** — limitar el rango seleccionable (ej: no fechas en el pasado, no más de 90 días en el futuro)
2. **Fechas deshabilitadas** — bloquear días específicos (ej: feriados, domingos, fechas ya reservadas)
3. **Presets de fechas** — atajos como "Hoy", "Esta semana", "Último mes" (ej: filtros de dashboard)
4. **Internacionalización (i18n)** — múltiples idiomas, formatos de fecha distintos (DD/MM/YYYY vs MM/DD/YYYY), semana que empieza en lunes vs domingo
5. **Ninguna restricción especial** — comportamiento estándar es suficiente
6. No estoy seguro — muéstrame todas las opciones disponibles
