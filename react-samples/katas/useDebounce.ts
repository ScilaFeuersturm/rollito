import { useEffect, useState } from 'react'

// Kata: hook que devuelve el valor recién cuando dejó de cambiar durante `espera` ms.
export function useDebounce<T>(valor: T, espera: number): T {
  const [demorado, setDemorado] = useState(valor)

  useEffect(() => {
    const temporizador = setTimeout(() => setDemorado(valor), espera)
    // Si el valor cambia antes de tiempo, se cancela el temporizador anterior.
    return () => clearTimeout(temporizador)
  }, [valor, espera])

  return demorado
}
