// Kata Senior: throttle. Ejecuta como mucho una vez cada `intervalo` ms: la primera llamada va enseguida,
// y si llegan más durante la espera, se ejecuta una sola al final con los últimos argumentos.
export function throttle<A extends unknown[]>(fn: (...args: A) => void, intervalo: number) {
  let ultimaEjecucion = -Infinity
  let pendiente: ReturnType<typeof setTimeout> | undefined
  let ultimosArgs: A | undefined

  return (...args: A) => {
    const ahora = Date.now()
    const restante = intervalo - (ahora - ultimaEjecucion)
    ultimosArgs = args
    if (restante <= 0) {
      ultimaEjecucion = ahora
      fn(...args)
    } else if (!pendiente) {
      pendiente = setTimeout(() => {
        ultimaEjecucion = Date.now()
        pendiente = undefined
        fn(...(ultimosArgs as A))
      }, restante)
    }
  }
}
