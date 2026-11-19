import { useEffect, useState } from 'react'

// Kata Senior: useLocalStorage. Como useState, pero el valor persiste en el navegador.
// Si localStorage no está disponible (modo privado, bloqueado o en el servidor), funciona igual en memoria.
export function useLocalStorage<T>(clave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = localStorage.getItem(clave)
      return guardado === null ? inicial : (JSON.parse(guardado) as T)
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      // Sin almacenamiento: el valor vive solo mientras la página esté abierta.
    }
  }, [clave, valor])

  return [valor, setValor] as const
}
