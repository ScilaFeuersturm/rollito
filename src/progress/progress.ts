const storageKey = 'rollito.progress.v1'
export const xpPerLesson = 10

export type Progress = Record<string, string>

export function readProgress(): Progress {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '{}')
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
    return Object.fromEntries(Object.entries(raw).filter(([, date]) =>
      typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ))
  } catch {
    return {}
  }
}

export function saveProgress(progress: Progress): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress))
    return true
  } catch {
    return false
  }
}

export function localDay(date = new Date()): string {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(value => String(value).padStart(2, '0'))
    .join('-')
}

export function streak(progress: Progress, now = new Date()): number {
  const days = new Set(Object.values(progress))
  const cursor = new Date(now)
  if (!days.has(localDay(cursor))) cursor.setDate(cursor.getDate() - 1)
  let count = 0
  while (days.has(localDay(cursor))) {
    count += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
}

const claveUltimaLeccion = 'rollito.ultimaLeccion'

export function leerUltimaLeccion(): string | null {
  try { return localStorage.getItem(claveUltimaLeccion) } catch { return null }
}

export function guardarUltimaLeccion(id: string) {
  try { localStorage.setItem(claveUltimaLeccion, id) } catch { /* sin almacenamiento: no se recuerda */ }
}
