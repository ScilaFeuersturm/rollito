// El repaso en audio es solo para la sección Arquitectura: conceptos para escuchar y pensar,
// no sintaxis (la sintaxis se aprende leyendo y escribiendo código).

// Temas que más se preguntan en entrevistas de Android y frontend, en orden de aprendizaje.
export const audioTopics = [
  'POO',
  'SOLID',
  'Patrones de diseño',
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
  return lesson.track === 'fundamentos'
    && ['arquitectura', 'solid', 'patrones de diseño'].includes(normalizedModule(lesson.modulo))
}

function normalizedModule(module: string) {
  return module.trim().toLowerCase()
}

export function architectureSection(lesson: { id: string; modulo: string }) {
  const module = normalizedModule(lesson.modulo)
  if (module === 'solid') return 'solid'
  if (module === 'patrones de diseño') return 'patterns'
  return lesson.id.startsWith('fundamentos-poo-') ? 'poo' : 'architectures'
}
