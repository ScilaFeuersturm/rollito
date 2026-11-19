// Kata: reimplementar Promise.all. Resuelve con los resultados en el mismo orden,
// o rechaza con el primer error.
export function promiseAll<T>(promesas: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const resultados: T[] = new Array(promesas.length)
    let pendientes = promesas.length
    if (pendientes === 0) return resolve([])
    promesas.forEach((promesa, indice) => {
      promesa.then(valor => {
        resultados[indice] = valor
        pendientes -= 1
        if (pendientes === 0) resolve(resultados)
      }, reject)
    })
  })
}
