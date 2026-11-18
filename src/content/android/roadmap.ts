export const androidRoadmap = [
  {
    level: 'junior',
    title: 'Junior',
    description: 'De Java y XML a Kotlin y Compose. Construí una pantalla y respondé a las acciones del usuario.',
    topics: ['Kotlin y null safety', 'POO y data classes', 'Colecciones, lambdas y extensiones', 'Árbol de vistas, XML y ViewBinding', 'Medición, layout y dibujo', 'Composables y modificadores', 'Estado y navegación'],
  },
  {
    level: 'semi-senior',
    title: 'Semi Senior',
    description: 'Separá la lógica de la interfaz y manejá datos, errores y pruebas en una app.',
    topics: ['Genéricos y tipos sellados', 'Corrutinas y Flow', 'Ciclo de vida de vistas y estado restaurable', 'ViewModel y arquitectura de UI', 'Retrofit, Room y caché', 'Hilt y trabajo en segundo plano', 'Pruebas unitarias y de integración'],
  },
  {
    level: 'senior',
    title: 'Senior',
    description: 'Evaluá decisiones de arquitectura, medí rendimiento y automatizá entregas.',
    topics: ['Concurrencia y diseño de APIs', 'Modularización y Gradle', 'Recomposición, estabilidad y profiling', 'Datos offline y sincronización', 'Pruebas de UI, CI/CD y observabilidad', 'Seguridad, privacidad y decisiones técnicas'],
  },
] as const
