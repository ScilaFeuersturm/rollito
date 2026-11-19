import type { AndroidLevel } from '../content/android/interview-practice'
import { androidRoadmap } from '../content/android/roadmap'
import { lessons, type Lesson } from '../content/lessons'

export type Route =
  | { name: 'inicio' }
  | { name: 'leccion'; lesson: Lesson }
  | { name: 'repaso' }
  | { name: 'repaso-funcional' }
  | { name: 'simulacro-funcional' }
  | { name: 'simulacro'; level: (typeof androidRoadmap)[number] }
  | { name: 'practica'; level: (typeof androidRoadmap)[number] }
  | { name: 'no-encontrada' }

export const homePath = '/'
export const repasoPath = '/repaso/'
export const functionalRepasoPath = '/repaso/funcional/'
export const functionalInterviewPath = '/simulacro/funcional/'
export const interviewPath = (level: AndroidLevel) => `/simulacro/android/${level}/`
export const practicePath = (level: AndroidLevel) => `/practica/android/${level}/`
export const lessonPath = (id: string) => `/lecciones/${id}/`

export function matchRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return { name: 'inicio' }
  if (path === '/repaso') return { name: 'repaso' }
  if (path + '/' === functionalRepasoPath) return { name: 'repaso-funcional' }
  if (path + '/' === functionalInterviewPath) return { name: 'simulacro-funcional' }
  const level = androidRoadmap.find(item => path + '/' === interviewPath(item.level))
  if (level) return { name: 'simulacro', level }
  const practiceLevel = androidRoadmap.find(item => path + '/' === practicePath(item.level))
  if (practiceLevel) return { name: 'practica', level: practiceLevel }
  const id = /^\/lecciones\/([a-z0-9-]+)$/.exec(path)?.[1]
  const lesson = lessons.find(item => item.id === id)
  return lesson ? { name: 'leccion', lesson } : { name: 'no-encontrada' }
}

export function pageTitle(route: Route) {
  switch (route.name) {
    case 'inicio': return 'Rollito · Aprendé programación'
    case 'repaso': return 'Repaso de Arquitectura · Rollito'
    case 'repaso-funcional': return 'Repaso de Análisis funcional · Rollito'
    case 'simulacro-funcional': return 'Simulacro Analista Funcional Trainee · Rollito'
    case 'simulacro': return `Simulacro Android · ${route.level.title} · Rollito`
    case 'practica': return `Práctica de código Android · ${route.level.title} · Rollito`
    case 'leccion': return `${route.lesson.titulo} · Rollito`
    case 'no-encontrada': return 'No encontramos esa página · Rollito'
  }
}

// Rutas que se generan como HTML estático en el build.
export const prerenderPaths = [
  homePath,
  repasoPath,
  functionalRepasoPath,
  functionalInterviewPath,
  ...androidRoadmap.map(item => interviewPath(item.level)),
  ...androidRoadmap.map(item => practicePath(item.level)),
  ...lessons.map(lesson => lessonPath(lesson.id)),
]
