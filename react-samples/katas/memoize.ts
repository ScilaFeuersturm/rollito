// Kata Senior: memoize. Guarda el resultado por clave y lo devuelve sin recalcular.
// La clave por defecto es el primer argumento; se puede pasar otra función para armarla.
export function memoize<A extends unknown[], R>(
  fn: (...args: A) => R,
  clave: (...args: A) => unknown = (...args) => args[0],
): ((...args: A) => R) & { cache: Map<unknown, R> } {
  const cache = new Map<unknown, R>()
  const memorizada = (...args: A): R => {
    const k = clave(...args)
    if (cache.has(k)) return cache.get(k) as R
    const resultado = fn(...args)
    cache.set(k, resultado)
    return resultado
  }
  return Object.assign(memorizada, { cache })
}
