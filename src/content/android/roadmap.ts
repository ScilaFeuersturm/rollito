export const androidRoadmap = [
  {
    level: 'junior',
    title: 'Junior',
    description: 'De Java y XML a Kotlin y Compose. Construí una pantalla y respondé a las acciones del usuario.',
    topics: ['Kotlin y null safety', 'POO y data classes', 'Colecciones, lambdas y extensiones', 'Árbol de vistas, XML y ViewBinding', 'Medición, layout y dibujo', 'Composables y modificadores', 'Material Design 3', 'Estado y navegación', 'Ciclo de vida de Activity', 'Git y pull requests'],
  },
  {
    level: 'semi-senior',
    title: 'Semi Senior',
    description: 'Separá la lógica de la interfaz y manejá datos, errores y pruebas en una app.',
    topics: ['Genéricos y tipos sellados', 'Corrutinas, StateFlow y SharedFlow', 'Ciclo de vida, ViewModel y estado restaurable', 'MVVM, Repository y nociones de Clean', 'Navigation, deep links y back stack', 'Retrofit, OkHttp y serialización', 'Carga, errores de red y datos sensibles', 'Room y caché', 'Hilt o Dagger: scopes y ciclo de vida', 'Gradle con Kotlin DSL', 'JUnit, MockK, Espresso y Compose Testing', 'CI en cada PR y Crashlytics'],
  },
  {
    level: 'senior',
    title: 'Senior',
    description: 'Evaluá decisiones de arquitectura, medí rendimiento y automatizá entregas.',
    topics: ['Concurrencia y diseño de APIs', 'Modularización y Gradle', 'Recomposición, estabilidad y profiling', 'Datos offline y sincronización', 'Pruebas de UI, CI/CD y observabilidad', 'Seguridad, privacidad y decisiones técnicas'],
  },
] as const
