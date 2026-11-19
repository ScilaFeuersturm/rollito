import type { ComponentType } from 'react'
import { androidRoadmap } from './android/roadmap'
import { architectureSection, hasAudio, isArchitecture } from './audio'
import { lessonSchema } from './lesson-schema'

interface LessonModule {
  default: ComponentType
  frontmatter: unknown
}

// El código Kotlin que se muestra fuera del cuerpo MDX (por ejemplo en "Cómo contarlo en una
// entrevista") se referencia por nombre y se lee de android-samples, que es código que compila.
const samplesDir = '../../android-samples/kotlin/'
const samples = import.meta.glob<string>('../../android-samples/kotlin/**/*.kt', { query: '?raw', import: 'default', eager: true })

function sample(file: string, lessonPath: string) {
  const source = samples[samplesDir + file]
  if (source === undefined) throw new Error(`No existe android-samples/kotlin/${file} (usado en ${lessonPath})`)
  return source.trimEnd()
}

function toLesson([path, module]: [string, LessonModule]) {
  const parsed = lessonSchema.safeParse(module.frontmatter)
  if (!parsed.success) {
    throw new Error(`Frontmatter inválido en ${path}: ${parsed.error.message}`)
  }
  const { entrevista, ...data } = parsed.data
  if (hasAudio(data) && !entrevista) {
    throw new Error(`A ${path} le falta "entrevista": es obligatoria en las lecciones de Arquitectura.`)
  }
  return {
    ...data,
    entrevista: entrevista && {
      ...entrevista,
      trampas: entrevista.trampas.map(trampa => ({
        ...trampa,
        codigoFuente: trampa.codigo && sample(trampa.codigo, path),
      })),
    },
    Content: module.default,
  }
}

export type Lesson = ReturnType<typeof toLesson>

// Se ordenan por ruta: el prefijo del archivo define el orden ("11-" va antes que "11a-").
export const lessons: Lesson[] = Object.entries(import.meta.glob<LessonModule>('./**/*.mdx', { eager: true }))
  .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  .map(toLesson)

const ids = new Set(lessons.map(lesson => lesson.id))
if (ids.size !== lessons.length) throw new Error('Hay lecciones con IDs repetidos.')
for (const lesson of lessons) {
  for (const id of lesson.prerequisitos) {
    if (id === lesson.id || !ids.has(id)) throw new Error(`Prerrequisito inválido en ${lesson.id}: ${id}`)
  }
}

export const architectureSections = [
  { id: 'poo', title: 'POO', topics: 'Clases, interfaces, herencia y composición.' },
  { id: 'solid', title: 'SOLID', topics: 'Cinco principios para pensar qué cambia y cómo se relacionan las piezas.' },
  { id: 'patterns', title: 'Patrones de diseño', topics: 'Diez temas, de Strategy a Repository e inyección de dependencias.' },
  { id: 'architectures', title: 'Arquitecturas', topics: 'De MVC, MVP y MVVM a Clean Architecture y microservicios.' },
].map(section => ({
  ...section,
  lessons: lessons.filter(lesson => isArchitecture(lesson) && architectureSection(lesson) === section.id),
}))

export const androidSections = androidRoadmap.map(level => ({
  ...level,
  lessons: lessons.filter(lesson => lesson.track === 'android' && lesson.nivel === level.level),
}))

export const functionalLessons = lessons.filter(lesson => lesson.track === 'funcional')

const architectureSequence = architectureSections.flatMap(section => section.lessons)
const androidSequence = androidSections.flatMap(section => section.lessons)

export function nextLesson(lesson: Lesson): Lesson | undefined {
  const sequence = isArchitecture(lesson) ? architectureSequence
    : lesson.track === 'funcional' ? functionalLessons
    : androidSequence
  const position = sequence.findIndex(item => item.id === lesson.id)
  return position === -1 ? undefined : sequence[position + 1]
}
