import type { androidRoadmap } from './roadmap'

export type AndroidLevel = (typeof androidRoadmap)[number]['level']

type Question = {
  topic: string
  prompt: string
  answer: string
}

export const interviewPractice: Record<AndroidLevel, readonly Question[]> = {
  junior: [
    {
      topic: 'Kotlin y valores nulos',
      prompt: 'La API devuelve un nombre que puede ser null. ¿Cómo mostrarías «Sin nombre» en ese caso? ¿Qué harías si también puede llegar vacío?',
      answer: 'Modelaría el dato como String? y usaría el operador Elvis (?:) para mostrar «Sin nombre» cuando sea null. Si también quiero cubrir cadenas vacías o con espacios, puedo usar nombre?.takeIf { it.isNotBlank() } ?: "Sin nombre".',
    },
    {
      topic: 'Estado en Compose',
      prompt: 'Una fila muestra una tarea y tiene un botón para completarla. ¿Quién debería guardar el estado de la tarea y qué debería hacer la fila cuando tocás el botón?',
      answer: 'El componente que coordina la pantalla, o su ViewModel si el estado vive ahí, es dueño del estado. La fila recibe la tarea y el callback. Al tocar el botón, emite el evento. El dueño actualiza el estado y la fila muestra el nuevo valor.',
    },
    {
      topic: 'Ciclo de vida y estado',
      prompt: 'Estás escribiendo el título de una tarea en Compose y girás el teléfono. ¿Qué elegirías para conservar ese borrador? ¿Y si también debe estar disponible al volver otro día?',
      answer: 'Para un texto corto de la UI usaría rememberSaveable, que permite restaurarlo al recrear la Activity. Si el borrador tiene que seguir disponible después de cerrar y volver a abrir la app otro día, lo guardaría en almacenamiento persistente.',
    },
    {
      topic: "val y var",
      prompt: "¿Qué diferencia hay entre `val` y `var`?",
      answer: "`val` no se puede reasignar y `var` sí. Uso `val` por defecto.",
    },
    {
      topic: "lateinit y lazy",
      prompt: "¿`lateinit` o `lazy`?",
      answer: "`lateinit var` para algo que se inicializa desde afuera más tarde, como un binding. `val ... by lazy` para algo que se calcula la primera vez que se usa.",
    },
    {
      topic: "Data classes",
      prompt: "¿Qué es una data class y qué genera?",
      answer: "Una clase pensada para guardar datos: genera `equals`, `hashCode`, `toString`, `copy` y las funciones `componentN` a partir de las propiedades del constructor.",
    },
    {
      topic: "Callbacks del ciclo de vida",
      prompt: "¿Cuáles son los callbacks del ciclo de vida de una Activity?",
      answer: "`onCreate`, `onStart`, `onResume`, `onPause`, `onStop` y `onDestroy` (y `onRestart` al volver). Al rotar, la Activity se destruye y se recrea.",
    },
    {
      topic: "Intents",
      prompt: "¿Qué diferencia hay entre un Intent explícito y uno implícito?",
      answer: "El explícito nombra la clase de destino. El implícito describe una acción y el sistema elige la app.",
    },
    {
      topic: "Red y hilo principal",
      prompt: "¿Por qué no se hacen llamadas de red en el hilo principal?",
      answer: "Porque bloquearían la interfaz. Android lo impide con `NetworkOnMainThreadException`, y si la app no responde aparece un ANR.",
    },
    {
      topic: "Qué es un ViewModel",
      prompt: "¿Qué es un ViewModel?",
      answer: "Un objeto que guarda el estado de la pantalla y sobrevive a los cambios de configuración. Se destruye cuando la pantalla se cierra de verdad.",
    },
    {
      topic: "minSdk y targetSdk",
      prompt: "¿Qué diferencia hay entre `minSdk` y `targetSdk`?",
      answer: "`minSdk` es la versión más vieja donde se puede instalar la app. `targetSdk` es con qué comportamiento del sistema declarás que corre.",
    },
    {
      topic: "Keys en LazyColumn",
      prompt: "¿Para qué sirve la `key` en una `LazyColumn`?",
      answer: "Para que Compose identifique cada elemento aunque cambie de posición, y conserve su estado al reordenar o borrar.",
    },
  ],
  'semi-senior': [
    {
      topic: 'StateFlow y ciclo de vida',
      prompt: 'Un ViewModel expone un StateFlow con el estado de una pantalla Compose. ¿Cómo lo consumirías y qué pasa si la app va a segundo plano?',
      answer: 'Usaría collectAsStateWithLifecycle en el composable. Por defecto la recolección se pausa por debajo de STARTED y, cuando se retoma, StateFlow entrega su valor actual. La pausa del colector de la pantalla no detiene por sí sola cualquier trabajo que haya iniciado el ViewModel.',
    },
    {
      topic: 'MVVM y reglas de negocio',
      prompt: 'La app impide completar tareas vencidas hace más de un mes. ¿Dónde pondrías esa regla y cómo la probarías?',
      answer: 'Pondría la regla en la lógica de dominio que completa la tarea, por ejemplo en un caso de uso. El ViewModel invoca esa operación y traduce su resultado a estado de UI. Probaría con un reloj controlado qué pasa justo antes, justo en el límite y justo después.',
    },
    {
      topic: 'Trabajo diferido y datos offline',
      prompt: 'Una persona edita una tarea sin conexión y cierra la app. ¿Cómo harías para conservar el cambio y enviarlo cuando vuelva la red?',
      answer: 'Guardaría la edición y la operación pendiente en la misma transacción local. Programaría trabajo persistente con WorkManager y una restricción de red. La pantalla puede leer enseguida el dato local y mostrar que falta sincronizar. El envío se puede reintentar sin aplicar el cambio dos veces si conserva un identificador de operación y el servidor deduplica por ese identificador.',
    },
    {
      topic: "StateFlow vs. SharedFlow",
      prompt: "¿Qué diferencia hay entre `StateFlow` y `SharedFlow`?",
      answer: "`StateFlow` siempre tiene un valor actual y lo entrega al suscribirse. `SharedFlow` emite eventos y se puede configurar cuántos repite.",
    },
    {
      topic: "flatMapLatest",
      prompt: "¿Qué hace `flatMapLatest` y cuándo lo usás?",
      answer: "Cancela el flujo anterior cuando llega un valor nuevo. Es ideal para una búsqueda mientras la persona tipea.",
    },
    {
      topic: "Fallas en corrutinas hijas",
      prompt: "¿Qué pasa cuando una corrutina hija falla?",
      answer: "En un scope común cancela a su padre y a sus hermanas. Con `supervisorScope`, no afecta a las demás.",
    },
    {
      topic: "collectAsStateWithLifecycle",
      prompt: "¿Por qué `collectAsStateWithLifecycle` y no `collectAsState`?",
      answer: "Porque deja de recolectar cuando la app está en segundo plano y no gasta recursos en una pantalla que no se ve.",
    },
    {
      topic: "Muerte del proceso",
      prompt: "¿Qué es la muerte del proceso y cómo la manejás?",
      answer: "El sistema mata la app en segundo plano para liberar memoria. El ViewModel se pierde, así que lo necesario se guarda en `SavedStateHandle` o en persistencia.",
    },
    {
      topic: "@Binds y @Provides",
      prompt: "¿`@Binds` o `@Provides`?",
      answer: "`@Binds` para atar una interfaz a una implementación que ya se puede inyectar. `@Provides` para construir objetos de terceros.",
    },
    {
      topic: "Tests de ViewModel",
      prompt: "¿Cómo testeás un ViewModel que usa `viewModelScope`?",
      answer: "Con `runTest`, reemplazando `Dispatchers.Main` con `Dispatchers.setMain` y usando un fake del repositorio.",
    },
    {
      topic: "WorkManager o foreground service",
      prompt: "¿WorkManager o foreground service?",
      answer: "WorkManager para trabajo que se puede postergar pero tiene que terminarse. Foreground service para trabajo que la persona está viendo en el momento.",
    },
    {
      topic: "Errores 401",
      prompt: "¿Cómo manejás un 401 en la capa de red?",
      answer: "Con un `Authenticator` de OkHttp que renueva el token y reintenta una vez. Si la renovación falla, se cierra la sesión.",
    },
  ],
  senior: [
    {
      topic: 'Conflictos de sincronización',
      prompt: 'Dos dispositivos editan sin conexión el título de la misma tarea. ¿Cómo detectarías el conflicto y cómo evitarías aplicar dos veces una edición reintentada?',
      answer: 'Mandaría la versión de origen y un identificador estable por operación. El servidor compara la versión de origen con la actual para detectar cambios concurrentes y registra la operación procesada junto con su resultado para que un reintento no vuelva a aplicarla. La resolución depende del producto. Si perder un título importa, conservaría ambas versiones y permitiría elegir.',
    },
    {
      topic: 'Rendimiento de la UI',
      prompt: 'Una lista en Compose se traba al deslizar en dispositivos de gama media. ¿Cómo investigarías qué pasa y cómo demostrarías que tu cambio mejoró la experiencia?',
      answer: 'Reproduciría el recorrido con el mismo conjunto de datos en un dispositivo representativo y una compilación de rendimiento. Usaría un trace para identificar si el problema viene de trabajo en el hilo principal, composición, layout o renderizado. Después compararía los tiempos de cuadro y los cuadros lentos antes y después con varias corridas del mismo recorrido.',
    },
    {
      topic: 'Entregas y observabilidad',
      prompt: 'Después de publicar al 10 % de usuarios, suben los crashes en una versión de Android. ¿Qué revisarías y cómo limitarías el impacto?',
      answer: 'Pausaría el despliegue y compararía la tasa de crashes de la versión nueva con la anterior, segmentada por versión de Android y dispositivo. Revisaría las trazas y los cambios recientes para encontrar el flujo afectado. Si hay un flag que desactiva ese flujo, lo usaría. De lo contrario prepararía una corrección y retomaría en etapas, siguiendo la tasa de crashes del segmento afectado.',
    },
    {
      topic: "Diseño offline",
      prompt: "¿Cómo diseñarías una app de tareas que funcione sin conexión?",
      answer: "Con la base local como fuente de verdad, una cola de cambios pendientes, sincronización con WorkManager, una estrategia de conflictos y estados de sincronización visibles.",
    },
    {
      topic: "Modularización",
      prompt: "¿Cómo modularizarías una app grande?",
      answer: "Por funcionalidad y por capa (`feature`, `core` y `data`), con dependencias en una sola dirección, `implementation` por defecto y convention plugins para el build.",
    },
    {
      topic: "Fugas en producción",
      prompt: "¿Cómo encontrarías una fuga de memoria reportada en producción?",
      answer: "La reproduciría en debug con LeakCanary, confirmaría con un heap dump del profiler y buscaría la cadena de referencias hasta el objeto de larga vida que la retiene.",
    },
    {
      topic: "Arranque lento",
      prompt: "¿Qué medís para saber si el arranque es lento?",
      answer: "El tiempo hasta el primer frame y hasta que la pantalla es usable, en dispositivos de gama baja, con Macrobenchmark. Lo mejoro con Baseline Profiles.",
    },
    {
      topic: "R8",
      prompt: "¿Qué hace R8 y qué puede romper?",
      answer: "Elimina código sin usar, ofusca y optimiza. Puede romper lo que se usa por reflexión si no tiene reglas keep.",
    },
    {
      topic: "Crashes después de una versión",
      prompt: "Una versión nueva duplicó los crashes. ¿Qué hacés?",
      answer: "Freno la entrega gradual, apago la función con un feature flag si es posible, analizo el crash en Crashlytics con el mapping y publico un arreglo.",
    },
    {
      topic: "Kotlin Multiplatform",
      prompt: "¿Cuándo propondrías Kotlin Multiplatform?",
      answer: "Cuando hay lógica de negocio duplicada entre Android e iOS y el equipo de iOS se suma. Empezaría por un módulo chico.",
    },
    {
      topic: "Decidir entre arquitecturas",
      prompt: "¿Cómo decidís entre dos arquitecturas propuestas por el equipo?",
      answer: "Con criterios explícitos: complejidad, testeabilidad y costo de cambio. Hago una prueba acotada si hace falta, y dejo la decisión registrada en un ADR.",
    },
    {
      topic: "Desacuerdos técnicos",
      prompt: "Contame de un desacuerdo técnico.",
      answer: "Respondé con STAR: la situación, qué estaba en juego, cómo lo resolvieron con datos y qué aprendiste.",
    },
  ],
}
