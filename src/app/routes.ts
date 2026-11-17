import { lessons, type Lesson } from '../content/lessons'

export type Route =
  | { name: 'inicio' }
  | { name: 'leccion'; lesson: Lesson }
  | { name: 'repaso' }
  | { name: 'no-encontrada' }

export const homePath = '/'
export const repasoPath = '/repaso/'
export const lessonPath = (id: string) => `/lecciones/${id}/`

export function matchRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return { name: 'inicio' }
  if (path === '/repaso') return { name: 'repaso' }
  const id = /^\/lecciones\/([a-z0-9-]+)$/.exec(path)?.[1]
  const lesson = lessons.find(item => item.id === id)
  return lesson ? { name: 'leccion', lesson } : { name: 'no-encontrada' }
}

export function pageTitle(route: Route) {
  switch (route.name) {
    case 'inicio': return 'Rollito · Aprendé programación'
    case 'repaso': return 'Repaso en audio · Rollito'
    case 'leccion': return `${route.lesson.titulo} · Rollito`
    case 'no-encontrada': return 'No encontramos esa página · Rollito'
  }
}

// Rutas que se generan como HTML estático en el build.
export const prerenderPaths = [homePath, repasoPath, ...lessons.map(lesson => lessonPath(lesson.id))]
