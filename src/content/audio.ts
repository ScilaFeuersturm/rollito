// El repaso en audio es solo para la sección Arquitectura: conceptos para escuchar y pensar,
// no sintaxis (la sintaxis se aprende leyendo y escribiendo código).

export const audioTopics = ['POO', 'MVC', 'MVVM', 'MVP', 'Hexagonal', 'Clean Architecture', 'VIPER']

export function hasAudio(lesson: { track: string; modulo: string }) {
  return lesson.track === 'fundamentos' && lesson.modulo.trim().toLowerCase() === 'arquitectura'
}
