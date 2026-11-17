import type { ComponentType } from 'react'
import { lessonSchema } from './lesson-schema'

interface LessonModule {
  default: ComponentType
  frontmatter: unknown
}

export const lessons = Object.entries(import.meta.glob<LessonModule>('./**/*.mdx', { eager: true }))
  .map(([path, module]) => {
    const parsed = lessonSchema.safeParse(module.frontmatter)
    if (!parsed.success) {
      throw new Error(`Frontmatter inválido en ${path}: ${parsed.error.message}`)
    }
    return { ...parsed.data, Content: module.default }
  })

const ids = new Set(lessons.map(lesson => lesson.id))
if (ids.size !== lessons.length) throw new Error('Hay lecciones con IDs repetidos.')
for (const lesson of lessons) {
  for (const id of lesson.prerequisitos) {
    if (id === lesson.id || !ids.has(id)) throw new Error(`Prerrequisito inválido en ${lesson.id}: ${id}`)
  }
}
