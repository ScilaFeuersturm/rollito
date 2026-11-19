import type { Progress } from '../progress/progress'

const dia = /^\d{4}-\d{2}-\d{2}$/

// Lo que llega de Firestore se valida igual que lo que se lee del navegador.
export function limpiar(raw: unknown): Progress {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  return Object.fromEntries(Object.entries(raw).filter(([, fecha]) => typeof fecha === 'string' && dia.test(fecha)))
}

// Une el progreso de dos lugares (navegador y nube). Si una lección está en los dos, gana la fecha
// más vieja: es el día en que se completó por primera vez, que es lo que cuenta para la racha.
export function combinar(a: Progress, b: Progress): Progress {
  const resultado: Progress = { ...a }
  for (const [id, fecha] of Object.entries(b)) {
    if (!(id in resultado) || fecha < resultado[id]) resultado[id] = fecha
  }
  return resultado
}

export function iguales(a: Progress, b: Progress): boolean {
  const claves = Object.keys(a)
  return claves.length === Object.keys(b).length && claves.every(id => a[id] === b[id])
}
