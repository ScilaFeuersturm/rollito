// Paso 2: un hook de datos con estado discriminado, cancelación y reintento.
import { useEffect, useState } from 'react'
import { ErrorDeApi, type Falla } from './api'

export type Estado<T> =
  | { tipo: 'cargando' }
  | { tipo: 'error'; falla: Falla }
  | { tipo: 'listo'; datos: T }

export function useRecurso<T>(cargar: (signal: AbortSignal) => Promise<T>, dependencias: unknown[]) {
  const [estado, setEstado] = useState<Estado<T>>({ tipo: 'cargando' })
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const control = new AbortController()
    setEstado({ tipo: 'cargando' })
    cargar(control.signal).then(
      datos => setEstado({ tipo: 'listo', datos }),
      error => {
        if (control.signal.aborted) return // la pantalla ya no lo necesita
        setEstado({ tipo: 'error', falla: error instanceof ErrorDeApi ? error.falla : { tipo: 'sin-conexion' } })
      },
    )
    // Limpieza: si cambian las dependencias o se desmonta, se cancela el pedido anterior.
    return () => control.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, intento])

  return { estado, reintentar: () => setIntento(i => i + 1) }
}
