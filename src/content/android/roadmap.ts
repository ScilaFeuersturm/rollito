export const androidRoadmap = [
  {
    level: 'junior',
    title: 'Junior',
    description: 'De Java y XML a Kotlin y Compose. Construí una pantalla y respondé a las acciones del usuario.',
    topics: ['Kotlin y null safety', 'Colecciones y lambdas', 'Compose y layouts', 'Estado y navegación'],
  },
  {
    level: 'semi-senior',
    title: 'Semi Senior',
    description: 'Separá la lógica de la interfaz y manejá datos, errores y pruebas en una app.',
    topics: ['ViewModel y MVVM', 'Corrutinas y StateFlow', 'Retrofit y Room', 'Hilt y testing unitario'],
  },
  {
    level: 'senior',
    title: 'Senior',
    description: 'Evaluá decisiones de arquitectura, medí rendimiento y automatizá entregas.',
    topics: ['Modularización y Clean Architecture', 'Recomposición y Baseline Profiles', 'Pruebas de UI y CI/CD', 'Seguridad y decisiones técnicas'],
  },
] as const
