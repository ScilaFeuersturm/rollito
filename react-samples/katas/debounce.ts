// Kata: devolver una función que ejecuta `fn` recién cuando pasan `espera` ms sin nuevas llamadas.
export function debounce<A extends unknown[]>(fn: (...args: A) => void, espera: number) {
  let temporizador: ReturnType<typeof setTimeout> | undefined
  return (...args: A) => {
    clearTimeout(temporizador)
    temporizador = setTimeout(() => fn(...args), espera)
  }
}
