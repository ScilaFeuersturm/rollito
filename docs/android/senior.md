# Android Senior · Borradores de lección

Después de Semi Senior. Practicá justificar límites, medir resultados y explicar trade-offs.

**Estado** 13 borradores para revisión. Los ejemplos Android se describen como escenarios de práctica.

## 1. Diseño de APIs Kotlin e interoperabilidad con Java

**Concepto.** Una API pública debe declarar contratos claros de nullability, errores y compatibilidad. Los tipos de plataforma de Java pueden dejar incertidumbre sobre si un valor es nulo.

**Ejemplo.** Un proveedor Java puede devolver null y Kotlin puede permitir usar el resultado con supuestos distintos. Validá en el límite y exponé un tipo claro al resto de la app.

### Práctica

1. ¿Dónde validarías el valor si no podés modificar Java? **Respuesta esperada.** En un adaptador que modele el contrato para Kotlin.
2. ¿Qué comprobás antes de cambiar la firma pública? **Respuesta esperada.** Compatibilidad de clientes fuente y binarios, según cómo consumen el componente.

### Tarea para tu máquina

Armá un pequeño proveedor Java que devuelva un título o null. Escribí un adaptador y probá los dos casos.

**Resultado esperado.** Los consumidores Kotlin reciben un tipo explícito y manejan el dato ausente.

### Repaso para entrevista

**Pregunta.** ¿Agregar un argumento por defecto conserva siempre la compatibilidad binaria?

**Respuesta.** Compará las firmas generadas y testeá consumidores ya compilados. Compatibilidad de fuente y binaria son distintas.

## 2. Inline, reified y límites de una API

**Concepto.** Inline puede insertar el cuerpo de la función y habilitar un parámetro reified. Esto permite comprobar ese tipo, con límites derivados del borrado de tipos.

**Ejemplo.** Un filtro puede recuperar los elementos String de una colección mixta. La JVM no verifica todos los argumentos de un tipo genérico anidado en esa operación.

### Práctica

1. ¿Para qué sirve reified en un filtro? **Respuesta esperada.** Permite referirse al tipo en una comprobación dentro de la función inline.
2. ¿El tipo reified garantiza que cada elemento dentro de List<String> sea String? **Respuesta esperada.** El borrado de tipos limita esa comprobación.

### Tarea para tu máquina

Filtrá una lista mixta por String. Compará el resultado con un filtro que recibe una condición explícita.

**Resultado esperado.** Las dos versiones conservan las cadenas.

### Repaso para entrevista

**Pregunta.** ¿Conviene hacer inline toda función de orden superior?

**Respuesta.** El beneficio depende del caso. Evaluá legibilidad, tamaño del código, API pública y mediciones.

## 3. Concurrencia, atomicidad y consistencia

**Concepto.** Operaciones de lectura, cálculo y escritura pueden intercalarse aun cuando cada acceso individual sea seguro. Elegí estructuras o límites que protejan la operación completa.

**Ejemplo.** Dos corrutinas leen un contador en cero y ambas escriben uno. Una actualización se pierde.

### Práctica

1. ¿Qué resultado esperás si ambos incrementos se aplican? **Respuesta esperada.** Dos.
2. ¿Qué debe protegerse para que no se pierdan incrementos? **Respuesta esperada.** La operación de lectura, cálculo y escritura como una unidad.

### Tarea para tu máquina

Reproducí la intercalación con dos trabajos coordinados. Repetí con una actualización atómica o con exclusión mutua.

**Resultado esperado.** El caso intercalado puede perder un incremento. La versión protegida conserva los dos.

### Repaso para entrevista

**Pregunta.** ¿Cambiar de dispatcher resuelve una carrera?

**Respuesta.** El dispatcher decide dónde se ejecuta trabajo. La corrección depende de cómo se coordina el estado compartido.

## 4. Modularización, Gradle y límites del dominio

**Concepto.** Un módulo es útil cuando tiene una responsabilidad y una API que mantiene dependencias claras. Buscá direcciones estables y un lugar para ensamblar las implementaciones.

**Ejemplo.** La pantalla de Resumen depende de un contrato de lectura. La implementación de tareas queda en su módulo y app conecta ambos.

### Práctica

1. ¿Qué evitás si Resumen conoce solo el contrato? **Respuesta esperada.** Depender de detalles que cambian dentro de Tareas.
2. ¿Qué señal indica un límite débil? **Respuesta esperada.** Un cambio común exige tocar módulos que deberían evolucionar separados.

### Tarea para tu máquina

Dibujá el grafo de app, tareas, resumen y contratos. Anotá qué dependencias permite Gradle y qué cambios quedarían dentro de cada módulo.

**Resultado esperado.** El grafo carece de ciclos y una actualización del almacenamiento no obliga a modificar Resumen.

### Repaso para entrevista

**Pregunta.** ¿Más módulos aceleran siempre el build?

**Respuesta.** Los beneficios dependen del grafo, caché y tamaño. Medí antes y después de una división.

## 5. Offline, colas y resolución de conflictos

**Concepto.** La fuente local puede sostener la experiencia offline. Un cambio pendiente necesita estado, una identidad para reintentar y una política para conflictos con actualizaciones remotas.

**Ejemplo.** El teléfono cambia el título offline y otro dispositivo cambia el mismo título en el servidor. La política define cómo conservar o resolver esas versiones.

### Práctica

1. ¿Qué debería mostrar la UI antes de sincronizar? **Respuesta esperada.** El estado local y la condición de pendiente si importa para la acción.
2. ¿Qué permite reconocer un reintento de la misma operación? **Respuesta esperada.** Un identificador de operación estable, si el servidor lo usa para deduplicar.

### Tarea para tu máquina

Diseñá una tabla de casos para éxito, respuesta perdida y conflicto. Simulá un reenvío con el mismo identificador.

**Resultado esperado.** El reenvío no duplica el cambio y el conflicto tiene una resolución explícita.

### Repaso para entrevista

**Pregunta.** ¿Última escritura gana siempre es una buena política?

**Respuesta.** Puede descartar cambios válidos. Elegí según datos, reglas de negocio y costo de resolver conflictos.

## 6. Recomposición, estabilidad y actualizaciones de UI

**Concepto.** Compose distingue composición, layout y dibujo. Observar un cambio invalida el trabajo necesario según dónde se leyó el estado. El costo se evalúa en la interacción real.

**Ejemplo.** Un contador animado puede provocar trabajo repetido. La medición ayuda a distinguir si el costo está en composición, medición o dibujo.

### Práctica

1. ¿Un cambio observable obliga a recomponer toda la pantalla? **Respuesta esperada.** Compose puede limitar el trabajo a las partes afectadas.
2. ¿Qué compararías antes de optimizar? **Respuesta esperada.** La misma interacción en condiciones comparables, con una traza y una métrica de frames.

### Tarea para tu máquina

Registrá una traza de scroll o animación. Cambiá un único punto de lectura o cálculo y repetí la medición.

**Resultado esperado.** Podés señalar en qué fase cambió el trabajo y si mejoraron los tiempos de frame.

### Repaso para entrevista

**Pregunta.** ¿Una recomposición alta demuestra un problema visible?

**Respuesta.** Es una señal. Confirmá si el trabajo se traduce en frames lentos o en otra métrica de la experiencia.

## 7. Jank, ANR y profiling de memoria

**Concepto.** Jank y ANR describen problemas distintos. La traza indica dónde se consume tiempo. Un perfil de memoria ayuda a ver asignaciones repetidas o referencias retenidas.

**Ejemplo.** Una fila hace trabajo pesado al aparecer. Por otro lado, un binding retenido puede impedir liberar una vista que ya salió.

### Práctica

1. ¿Qué mirarías primero para un scroll irregular? **Respuesta esperada.** La traza de frames y el trabajo que ocupa el hilo principal.
2. ¿Qué te ayuda a seguir una vista retenida? **Respuesta esperada.** Un perfil de memoria y la cadena de referencias.

### Tarea para tu máquina

Compará una lista antes y después de mover un cálculo repetido fuera del camino de scroll. Revisá el perfil y repetí varias veces.

**Resultado esperado.** La comparación muestra si bajó el trabajo durante el scroll y cuál fue el efecto en frames.

### Repaso para entrevista

**Pregunta.** ¿Un pico de memoria es prueba de fuga?

**Respuesta.** Buscá objetos que siguen retenidos tras terminar su ciclo de vida y repetí el escenario.

## 8. Arranque y Baseline Profiles

**Concepto.** Medí el arranque en escenarios definidos. Baseline Profiles optimizan rutas frecuentes mediante compilación anticipada de código seleccionado. El trabajo innecesario al inicio sigue costando.

**Ejemplo.** Abrir el inicio importa más que inicializar funciones que la persona quizá nunca use en esa sesión.

### Práctica

1. ¿La primera apertura y una reapertura con proceso vivo se comparan directamente? **Respuesta esperada.** Son escenarios distintos. Medí cada uno por separado.
2. ¿Qué recorrido conviene capturar además del inicio? **Respuesta esperada.** Uno frecuente y relevante, como abrir tareas y recorrer la lista.

### Tarea para tu máquina

Definí una medición repetible de arranque frío y una navegación frecuente. Compará builds equivalentes y registrá mediana y dispersión.

**Resultado esperado.** Podés explicar si el cambio mejora el escenario con mediciones repetibles.

### Repaso para entrevista

**Pregunta.** ¿Un Baseline Profile arregla cualquier inicio lento?

**Respuesta.** Ayuda con rutas de código, pero no elimina bloqueos ajenos, como esperar una operación de red para dibujar.

## 9. Interfaz adaptable y migración incremental

**Concepto.** Diseñá según el espacio disponible y las necesidades de accesibilidad. Migrar una app por pantallas permite conservar comportamiento y medir el efecto de cada cambio.

**Ejemplo.** En ancho compacto, lista y detalle se abren por separado. Con más espacio pueden convivir. Un destino puede migrar a Compose mientras otros siguen en Views.

### Práctica

1. ¿Qué cambia entre ancho compacto y amplio? **Respuesta esperada.** La composición de los destinos. Los datos y las reglas siguen siendo los mismos.
2. ¿Qué conviene preservar al migrar una pantalla? **Respuesta esperada.** Navegación, estado, foco y comportamiento observable.

### Tarea para tu máquina

Definí casos de prueba para dos anchos, rotación, fuente grande y navegación atrás. Corré los mismos casos antes y después de la migración.

**Resultado esperado.** Los flujos principales se conservan y el diseño adapta la distribución al espacio.

### Repaso para entrevista

**Pregunta.** ¿Basta con distinguir teléfono y tablet?

**Respuesta.** El espacio de ventana cambia con rotación, multiventana y dispositivos plegables.

## 10. Pruebas de UI y rendimiento en CI

**Concepto.** Separá las pruebas de lógica, integración, comportamiento visible y rendimiento. Para medir regresiones, mantené condiciones comparables y evitá umbrales basados en una sola corrida.

**Ejemplo.** Una prueba de UI valida que el error se vea. Una medición separada compara el tiempo que tarda la lista en estar lista.

### Práctica

1. ¿Qué prueba observaría que aparece el error al tocar Agregar? **Respuesta esperada.** Una prueba de UI con datos controlados.
2. ¿Una prueba de rendimiento debería fallar por una sola muestra ruidosa? **Respuesta esperada.** Usá corridas repetidas y un criterio de regresión explícito.

### Tarea para tu máquina

Proponé una matriz de CI para cambios comunes y una corrida de rendimiento. Anotá qué bloquea una entrega y cómo investigarías un resultado inestable.

**Resultado esperado.** La matriz distingue qué valida cada prueba y cómo interpretar una regresión.

### Repaso para entrevista

**Pregunta.** ¿Conviene medir rendimiento con el mismo build de depuración de todos los días?

**Respuesta.** Para acercarte al comportamiento real, compará builds equivalentes representativos del lanzamiento.

## 11. Entregas, observabilidad y recuperación

**Concepto.** Una entrega gradual permite comparar indicadores y limitar el impacto si empeoran. Separá detener una entrega, revertir código, desactivar una función y recuperar datos.

**Ejemplo.** Después de una entrega suben los cierres inesperados al abrir una tarea. Podés detener la expansión mientras identificás la versión afectada.

### Práctica

1. ¿Qué compararías antes de atribuir el cambio al release? **Respuesta esperada.** Versiones, población y métricas del flujo afectado.
2. ¿Qué revisás antes de recomendar una reversión? **Respuesta esperada.** Si el código anterior tolera el esquema y los datos que ya se escribieron.

### Tarea para tu máquina

Diseñá un plan de lanzamiento para cambiar la pantalla de tareas, con señal de detención y pasos de recuperación.

**Resultado esperado.** El plan dice qué medir, cuándo pausar y cómo tratar el estado persistido.

### Repaso para entrevista

**Pregunta.** ¿Volver al código anterior recupera automáticamente los datos previos?

**Respuesta.** Las escrituras y migraciones ya realizadas requieren una estrategia explícita.

## 12. Seguridad y privacidad móvil

**Concepto.** Tratá datos entrantes y enlaces como entradas externas. Reducí permisos, evitá secretos de servidor en el APK y limitá qué información llega a logs o telemetría.

**Ejemplo.** Un enlace trae un id de tarea. La app valida el argumento y comprueba el acceso antes de mostrar información.

### Práctica

1. ¿Un id válido demuestra que la persona tiene acceso? **Respuesta esperada.** El servicio o la capa responsable todavía debe autorizarlo.
2. ¿Qué evitarías registrar durante un error de sesión? **Respuesta esperada.** Credenciales, tokens y datos personales innecesarios.

### Tarea para tu máquina

Revisá permisos, enlaces, almacenamiento y logs de una demo. Probá sesión ausente, id inválido y tarea sin acceso.

**Resultado esperado.** Cada caso se resuelve sin mostrar datos que no corresponden y sin registrar secretos.

### Repaso para entrevista

**Pregunta.** ¿Guardar un secreto de servidor en una app ofuscada lo vuelve privado?

**Respuesta.** El cliente puede inspeccionarse. Las credenciales de servidor necesitan un límite del lado servidor.

## 13. Entrevista integradora de diseño Android

**Concepto.** Partí de necesidades y restricciones. Identificá fuentes de datos, estado visible, transiciones, fallas, métricas y decisiones reversibles.

**Ejemplo.** Diseñá tareas que se editan offline, sincronizan al recuperar señal y se muestran en lista y detalle sin duplicados.

### Práctica

1. ¿Qué decidirías antes de elegir librerías? **Respuesta esperada.** Requisitos, reglas de negocio, flujos y limitaciones.
2. ¿Qué datos te harían revisar el diseño? **Respuesta esperada.** Errores de sincronización, tiempos de respuesta, frames lentos y fallas de usuarios reales.

### Tarea para tu máquina

Prepará una explicación de cinco minutos con diagrama, casos de prueba y un trade-off. Simulá dos cambios offline y un conflicto remoto.

**Resultado esperado.** La solución explica qué ve la persona y conserva decisiones trazables ante una falla.

### Repaso para entrevista

**Pregunta.** ¿Cuál es la única arquitectura correcta para este problema?

**Respuesta.** Compará alternativas para las restricciones del caso y justificá qué se gana y qué costo introduce cada una.

## Referencias

- [Android Developers · Rendimiento](https://developer.android.com/topic/performance/overview)
- [Android Developers · Arquitectura](https://developer.android.com/topic/architecture/recommendations)
