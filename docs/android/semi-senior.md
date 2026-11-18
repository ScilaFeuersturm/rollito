# Android Semi Senior · Guía de lecciones

Después de Junior. Practicá aislar una falla y verificar la interacción entre piezas.

**Contenido** 14 lecciones incorporadas a la vista previa local. Los ejemplos Android se describen como escenarios de práctica.

## 1. Genéricos y varianza

**Concepto.** Un tipo genérico preserva el tipo que entra y sale de una abstracción. Un productor covariante puede entregar valores de un subtipo; un consumidor contravariante puede aceptar valores de un supertipo.

**Ejemplo.** Una fuente de TareaUrgente puede usarse como productora de Tarea cuando su contrato solo devuelve elementos.

### Práctica

1. ¿Dónde es razonable usar out? **Respuesta esperada.** En un contrato que produce T.
2. ¿Por qué no entregar una lista mutable de tareas urgentes como lista mutable de cualquier tarea? **Respuesta esperada.** Alguien podría agregar una tarea común al contenedor de urgentes.

### Tarea para tu máquina

Modelá una Fuente de solo lectura y probá asignar una fuente de subtipo a la de tipo base.

**Resultado esperado.** La asignación del productor compila y sigue devolviendo el subtipo.

### Repaso para entrevista

**Pregunta.** ¿Una clase genérica tiene que ser siempre covariante?

**Respuesta.** La varianza depende de cómo el contrato usa el parámetro de tipo.

## 2. Tipos sellados y estados de pantalla

**Concepto.** Un tipo sellado permite modelar alternativas conocidas y exigir que el render contemple cada una.

**Ejemplo.** Cargando, Contenido y Error son alternativas. Contenido puede llevar una lista vacía sin confundirse con Cargando.

### Práctica

1. ¿Qué representa una lista vacía recibida correctamente? **Respuesta esperada.** Contenido vacío.
2. ¿Qué ventaja aporta un when exhaustivo? **Respuesta esperada.** El compilador señala casos que faltan al agregar una variante.

### Tarea para tu máquina

Modelá el estado y agregá una variante SinConexion. Actualizá el render y probá las cuatro salidas.

**Resultado esperado.** Cada estado produce su mensaje. El render no mezcla vacío con error.

### Repaso para entrevista

**Pregunta.** ¿Conviene un booleano por estado posible?

**Respuesta.** Varios booleanos pueden representar combinaciones incompatibles. Un tipo sellado hace explícitas las alternativas.

## 3. Funciones de orden superior y scope functions

**Concepto.** Pasar una función como valor permite delegar un criterio. Las scope functions cambian cómo se accede al receptor o qué devuelve el bloque.

**Ejemplo.** El repositorio recibe una transformación de lista. En otro lugar apply configura un objeto y devuelve ese mismo objeto.

### Práctica

1. ¿Qué se inyecta al pasar un criterio como lambda? **Respuesta esperada.** El comportamiento que debe ejecutar la función.
2. ¿Qué devuelve apply? **Respuesta esperada.** El objeto receptor.

### Tarea para tu máquina

Reescribí una transformación como lambda nombrada. Compará configurar un ejemplo con apply y con asignaciones explícitas.

**Resultado esperado.** Ambas versiones devuelven el mismo objeto configurado.

### Repaso para entrevista

**Pregunta.** ¿Anidar varias scope functions mejora siempre la legibilidad?

**Respuesta.** Cada anidamiento puede volver ambiguo qué representan it o this. Elegí la forma que deja claro el receptor.

## 4. Delegación y secuencias

**Concepto.** La delegación de interfaces reutiliza la implementación de otro objeto. Las secuencias ejecutan operaciones intermedias bajo demanda hasta que una terminal pide el resultado.

**Ejemplo.** Con filter, map y take sobre una secuencia, solo se transforman los elementos que llegan a pedirse para completar el resultado.

### Práctica

1. ¿Cuándo corre el map de una secuencia? **Respuesta esperada.** Cuando una operación terminal consume elementos.
2. ¿Qué hace by en una implementación de interfaz? **Respuesta esperada.** Delega los miembros al objeto indicado salvo los que sobrescribís.

### Tarea para tu máquina

Contá invocaciones del transformador al pedir las primeras dos tareas pendientes con una lista y con una secuencia.

**Resultado esperado.** Ambas arrojan los mismos títulos. La secuencia puede ejecutar menos transformaciones.

### Repaso para entrevista

**Pregunta.** ¿Las secuencias aceleran todas las colecciones?

**Respuesta.** Para colecciones chicas u operaciones simples, la sobrecarga puede superar el ahorro. Medí casos relevantes.

## 5. Corrutinas, scopes y cancelación

**Concepto.** Una corrutina pertenece a un alcance que controla su vida. La cancelación es cooperativa y las operaciones de bloqueo requieren tratamiento específico.

**Ejemplo.** Una búsqueda nueva cancela la anterior. Si la anterior suspende de manera cancelable, deja de producir resultados.

### Práctica

1. ¿Una función suspend corre sola en un hilo de fondo? **Respuesta esperada.** La palabra suspend permite suspensión. El contexto y la implementación determinan dónde corre.
2. ¿Qué propiedad evita que un trabajo quede suelto al cerrar su alcance? **Respuesta esperada.** La concurrencia estructurada.

### Tarea para tu máquina

Simulá dos búsquedas lentas en el mismo alcance. Cancelá la anterior al iniciar la nueva.

**Resultado esperado.** La pantalla recibe el resultado de la última consulta.

### Repaso para entrevista

**Pregunta.** ¿Por qué no conviene capturar y ocultar CancellationException?

**Respuesta.** Podés impedir que la cancelación se propague y continuar un trabajo que ya perdió su propósito.

## 6. Flow, StateFlow y SharedFlow

**Concepto.** Flow describe emisiones. Un flujo frío común empieza su trabajo por colección. StateFlow mantiene un valor actual y SharedFlow permite configurar cómo se comparten emisiones.

**Ejemplo.** Una pantalla que se vuelve a abrir quiere leer el estado actual de tareas. Una repetición configurable se decide según qué consumidores requieren los eventos.

### Práctica

1. ¿Qué opción expone un estado que siempre tiene valor actual? **Respuesta esperada.** StateFlow.
2. ¿Un Flow es necesariamente frío? **Respuesta esperada.** Hay flujos fríos y flujos calientes.

### Tarea para tu máquina

Prepará un flujo frío con un contador de inicio y un StateFlow con una lista inicial. Agregá dos colecciones de cada uno.

**Resultado esperado.** El flujo frío arranca una vez por colección. Las dos colecciones de StateFlow pueden leer el valor actual.

### Repaso para entrevista

**Pregunta.** ¿Conviene emitir un evento de una sola vez con replay por defecto?

**Respuesta.** Depende de si debe recuperarse al recrear la UI. El replay puede repetir un efecto que ya se atendió.

## 7. Fragment, ViewModel y restauración

**Concepto.** La vista de un Fragment puede destruirse mientras el Fragment sigue existiendo. Las referencias al binding y el trabajo que actualiza la vista deben seguir el ciclo de esa vista.

**Ejemplo.** Al volver del detalle se crea otro árbol de vistas. El ViewModel puede seguir teniendo el estado, pero el binding anterior debe liberarse.

### Práctica

1. ¿A qué ciclo ligás la suscripción que actualiza el binding? **Respuesta esperada.** Al ciclo de la vista del Fragment.
2. ¿ViewModel por sí solo recupera datos tras muerte del proceso? **Respuesta esperada.** Después de la pérdida del proceso se crea otra instancia. Restaurá lo mínimo o recargá la fuente.

### Tarea para tu máquina

Navegá ida y vuelta desde un Fragment que observa tareas. Registrá creación y destrucción de su vista.

**Resultado esperado.** La vista nueva recibe el estado y la anterior deja de recibir actualizaciones.

### Repaso para entrevista

**Pregunta.** ¿Qué guardarías para restaurar el detalle?

**Respuesta.** Un identificador y el estado ligero necesario para retomar. Los datos principales se leen de la fuente.

## 8. UI unidireccional y pruebas de estado

**Concepto.** La pantalla envía acciones y observa estado. Las reglas y dependencias se pueden probar haciendo que el caso de uso entregue resultados controlados.

**Ejemplo.** Al reintentar, el estado pasa de Error a Cargando y después a Contenido.

### Práctica

1. ¿En qué dirección viajan las acciones? **Respuesta esperada.** De la vista a quien maneja el estado.
2. ¿Qué deberías afirmar en una prueba del ViewModel? **Respuesta esperada.** El estado que resulta de cada acción y resultado de la dependencia.

### Tarea para tu máquina

Simulá un repositorio que primero falla y luego devuelve dos tareas. Verificá los estados de error y reintento.

**Resultado esperado.** El error permite reintentar y el nuevo contenido contiene dos tareas.

### Repaso para entrevista

**Pregunta.** ¿MVVM y MVI se distinguen solo por el nombre de la clase?

**Respuesta.** Compará cómo se representan las acciones, quién produce el estado y qué puede observar la vista.

## 9. HTTP, Retrofit y clasificación de fallas

**Concepto.** Una capa de red transforma llamadas HTTP en resultados para la app. Separá problemas de transporte, autenticación, respuestas fallidas y errores de datos.

**Ejemplo.** La lista devuelve 500 y se puede reintentar. Una respuesta 401 puede requerir renovar la sesión.

### Práctica

1. ¿Un 500 significa que el teléfono perdió conectividad? **Respuesta esperada.** Es una respuesta del servidor.
2. ¿Qué error puede necesitar iniciar sesión de nuevo? **Respuesta esperada.** Uno de autenticación, según el contrato del servidor.

### Tarea para tu máquina

Usá respuestas simuladas 200, 401, 500 y un timeout para el mismo pedido.

**Resultado esperado.** La app produce cuatro resultados identificables y ofrece una acción apropiada para cada uno.

### Repaso para entrevista

**Pregunta.** ¿Conviene reintentar cualquier pedido automáticamente?

**Respuesta.** Verificá si el error es transitorio y si repetir la operación es seguro.

## 10. Room, migraciones y repositorios

**Concepto.** Room modela entidades y consultas persistentes. El repositorio define qué fuente se lee y cómo se actualiza. Las migraciones preservan datos al cambiar el esquema.

**Ejemplo.** Sumar una propiedad requiere declarar cómo se proyectan las filas existentes al esquema nuevo.

### Práctica

1. ¿Qué deberías verificar al migrar? **Respuesta esperada.** Que los datos previos se conserven con la forma esperada.
2. ¿Quién decide si una lectura usa los datos locales o remotos? **Respuesta esperada.** El repositorio o la política de datos de la aplicación.

### Tarea para tu máquina

Prepará una base de prueba con dos tareas en el esquema anterior. Migrala y consultá las filas.

**Resultado esperado.** Siguen las dos tareas y el campo nuevo tiene un valor válido.

### Repaso para entrevista

**Pregunta.** ¿Cuándo evitarías una migración destructiva?

**Respuesta.** Siempre que los datos previos importen o no se puedan reconstruir de manera fiable.

## 11. Inyección con Hilt y alcances

**Concepto.** El ensamblado elige implementaciones y define cuánto viven. Un alcance aplica a una instancia dentro de su componente, según el ciclo que ese componente representa.

**Ejemplo.** Una política común puede compartirse. Un objeto con estado de un formulario necesita un alcance más corto.

### Práctica

1. ¿Qué pasa si una dependencia compartida guarda el borrador de una pantalla? **Respuesta esperada.** Ese estado puede sobrevivir más de lo esperado o mezclarse con otro formulario.
2. ¿Qué ganás al inyectar por constructor? **Respuesta esperada.** Dependencias explícitas y reemplazables al probar.

### Tarea para tu máquina

Empezá con inyección manual y armá dos formularios con estados separados. Dibujá qué componentes usarías si lo llevaras a Hilt.

**Resultado esperado.** Cada formulario conserva su propio estado y ambos pueden usar la misma política.

### Repaso para entrevista

**Pregunta.** ¿Usar Hilt equivale a invertir cualquier dependencia?

**Respuesta.** El contenedor ensambla. La dirección del código depende de qué contratos conoce cada pieza.

## 12. Trabajo diferido y datos offline

**Concepto.** Elegí el mecanismo según cuándo debe correr la tarea y qué garantías necesita. WorkManager sirve para trabajo persistente y diferible con restricciones, no para prometer una hora exacta.

**Ejemplo.** La sincronización espera conectividad y manda cambios que quedaron pendientes. La pantalla sigue leyendo datos locales.

### Práctica

1. ¿Qué pasa si la red no está disponible? **Respuesta esperada.** Los cambios pueden seguir pendientes hasta cumplir las restricciones.
2. ¿El usuario tiene que esperar dentro de la pantalla? **Respuesta esperada.** La UI puede mostrar el estado local y comunicar la sincronización pendiente.

### Tarea para tu máquina

Simulá editar una tarea sin red. Reconectá y verificá que el cambio pendiente se procese una sola vez en el ejemplo.

**Resultado esperado.** La vista se mantiene usable offline y el cambio se confirma al sincronizar.

### Repaso para entrevista

**Pregunta.** ¿Un trabajo diferible tiene ejecución inmediata garantizada?

**Respuesta.** El sistema decide según restricciones y disponibilidad. Diseñá la UI para esa demora.

## 13. Navegación, deep links e interoperabilidad

**Concepto.** Un enlace externo puede abrir un destino directamente y requiere validar argumentos y el estado de acceso. Views y Compose pueden convivir durante una migración.

**Ejemplo.** Un enlace a la tarea 5 abre el detalle aun si la lista no se mostró antes. Un id inválido tiene un estado propio.

### Práctica

1. ¿Qué pasa si el id llega vacío? **Respuesta esperada.** El destino debe manejarlo como entrada inválida.
2. ¿Cómo migrarías una pantalla sin cambiar toda la app? **Respuesta esperada.** Introduciría la nueva UI en un límite de interoperabilidad.

### Tarea para tu máquina

Probá abrir el detalle desde la lista y desde un enlace directo, con id válido e inválido.

**Resultado esperado.** Ambas entradas funcionan y el caso inválido ofrece una salida clara.

### Repaso para entrevista

**Pregunta.** ¿Un deep link saltea las reglas de acceso?

**Respuesta.** El destino sigue verificando autenticación, permisos y datos.

## 14. Pruebas unitarias, integración y UI

**Concepto.** Probá decisiones en la capa más cercana a la regla y reservá pruebas de integración o UI para los contratos entre piezas y los flujos completos.

**Ejemplo.** La validación del título se prueba con Kotlin. El guardado en Room prueba consultas reales. Un test de UI verifica que se pueda completar una tarea.

### Práctica

1. ¿Dónde detectarías una regla de título demasiado permisiva? **Respuesta esperada.** En una prueba unitaria del caso de uso.
2. ¿Qué prueba comprueba que el texto aparece después de tocar un botón? **Respuesta esperada.** Una prueba de UI.

### Tarea para tu máquina

Escribí una matriz con un caso válido y uno inválido para unidad, integración y UI. Ejecutá primero el caso de negocio.

**Resultado esperado.** Cada prueba cubre un fallo diferente sin repetir todo el flujo.

### Repaso para entrevista

**Pregunta.** ¿Más pruebas de UI siempre dan más confianza?

**Respuesta.** Combiná niveles. Un flujo completo detecta cables rotos, mientras una prueba local aísla reglas y errores.

## Referencias

- [Android Developers · Recomendaciones de arquitectura](https://developer.android.com/topic/architecture/recommendations)
- [Kotlin · Corrutinas](https://kotlinlang.org/docs/coroutines-overview.html)
