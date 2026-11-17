// El repaso en audio es solo para la sección Arquitectura: conceptos para escuchar y pensar,
// no sintaxis (la sintaxis se aprende leyendo y escribiendo código).

// Temas que más se preguntan en entrevistas de Android y frontend, en orden de aprendizaje.
export const audioTopics = [
  'POO',
  'Arquitectura en capas',
  'MVC',
  'MVP',
  'MVVM',
  'MVI',
  'Flux / Redux',
  'VIPER',
  'Clean Architecture',
  'Hexagonal',
  'Arquitectura modular',
  'Monolito vs. microservicios',
]

export function hasAudio(lesson: { track: string; modulo: string }) {
  return lesson.track === 'fundamentos' && lesson.modulo.trim().toLowerCase() === 'arquitectura'
}
