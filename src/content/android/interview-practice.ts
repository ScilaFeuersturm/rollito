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
  ],
}
