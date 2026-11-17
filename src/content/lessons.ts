import type { ComponentType } from 'react'
import { hasAudio } from './audio'
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

// Vite devuelve los archivos ordenados por ruta: el prefijo numérico define el orden.
export const lessons: Lesson[] = Object.entries(import.meta.glob<LessonModule>('./**/*.mdx', { eager: true }))
  .map(toLesson)

const ids = new Set(lessons.map(lesson => lesson.id))
if (ids.size !== lessons.length) throw new Error('Hay lecciones con IDs repetidos.')
for (const lesson of lessons) {
  for (const id of lesson.prerequisitos) {
    if (id === lesson.id || !ids.has(id)) throw new Error(`Prerrequisito inválido en ${lesson.id}: ${id}`)
  }
}
