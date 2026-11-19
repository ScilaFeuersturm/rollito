// Kata: agrupar una lista según una clave calculada para cada elemento.
export function agruparPor<T, K extends string>(lista: T[], clave: (elemento: T) => K): Record<K, T[]> {
  const grupos = {} as Record<K, T[]>
  for (const elemento of lista) {
    const k = clave(elemento)
    ;(grupos[k] ??= []).push(elemento)
  }
  return grupos
}
