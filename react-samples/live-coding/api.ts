// Paso 1: modelo, DTO y cliente de la API, con las fallas clasificadas.

export type Tarea = { id: number; titulo: string; completada: boolean }

// Forma exacta del JSON de la API. Si el backend cambia un nombre, el cambio queda acá.
type TareaDto = { id: number; title: string; completed: boolean }

export type Falla =
  | { tipo: 'sin-conexion' }
  | { tipo: 'cliente'; codigo: number }
  | { tipo: 'servidor'; codigo: number }
  | { tipo: 'parseo' }

export class ErrorDeApi extends Error {
  constructor(readonly falla: Falla) { super(falla.tipo) }
}

const BASE = 'https://jsonplaceholder.typicode.com'

// TypeScript no valida datos en tiempo de ejecución: lo que llega de afuera se revisa.
function esTareaDto(dato: unknown): dato is TareaDto {
  const d = dato as TareaDto
  return typeof d === 'object' && d !== null && typeof d.id === 'number' && typeof d.title === 'string' && typeof d.completed === 'boolean'
}

const aDominio = (dto: TareaDto): Tarea => ({ id: dto.id, titulo: dto.title, completada: dto.completed })

async function pedir(ruta: string, signal?: AbortSignal): Promise<unknown> {
  let respuesta: Response
  try {
    respuesta = await fetch(BASE + ruta, { signal })
  } catch (error) {
    if (signal?.aborted) throw error // una cancelación no es una falla de red
    throw new ErrorDeApi({ tipo: 'sin-conexion' })
  }
  // fetch no rechaza ante un 404 o un 500: hay que revisar `ok`.
  if (!respuesta.ok) {
    throw new ErrorDeApi(respuesta.status >= 500 ? { tipo: 'servidor', codigo: respuesta.status } : { tipo: 'cliente', codigo: respuesta.status })
  }
  try {
    return await respuesta.json()
  } catch {
    throw new ErrorDeApi({ tipo: 'parseo' })
  }
}

export async function obtenerTareas(signal?: AbortSignal): Promise<Tarea[]> {
  const datos = await pedir('/todos?_limit=20', signal)
  if (!Array.isArray(datos) || !datos.every(esTareaDto)) throw new ErrorDeApi({ tipo: 'parseo' })
  return datos.map(aDominio)
}

export async function obtenerTarea(id: number, signal?: AbortSignal): Promise<Tarea> {
  const dato = await pedir(`/todos/${id}`, signal)
  if (!esTareaDto(dato)) throw new ErrorDeApi({ tipo: 'parseo' })
  return aDominio(dato)
}

export function mensaje(falla: Falla): string {
  switch (falla.tipo) {
    case 'sin-conexion': return 'No hay conexión. Revisá tu red.'
    case 'servidor': return 'El servicio no está disponible.'
    case 'cliente': return falla.codigo === 404 ? 'No encontramos esa tarea.' : 'Algo salió mal.'
    case 'parseo': return 'Algo salió mal.'
  }
}
