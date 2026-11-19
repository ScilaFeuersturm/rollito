// El repaso en audio es para conceptos que se escuchan y se piensan, no para sintaxis
// (la sintaxis se aprende leyendo y escribiendo código).

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

// Lecciones de la sección Arquitectura (POO, SOLID, patrones y arquitecturas).
export function isArchitecture(lesson: { track: string; modulo: string }) {
  return lesson.track === 'fundamentos'
    && ['arquitectura', 'solid', 'patrones de diseño'].includes(normalizedModule(lesson.modulo))
}

// El repaso en audio está en Arquitectura y en Análisis funcional: conceptos para escuchar y pensar.
export function hasAudio(lesson: { track: string; modulo: string }) {
  return isArchitecture(lesson) || lesson.track === 'funcional'
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
