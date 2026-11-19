// Práctica de código en vivo de React. Las soluciones se leen de react-samples/katas/, que tiene tests.
const fuentes = import.meta.glob<string>('../../../react-samples/katas/*.{ts,tsx}', { query: '?raw', import: 'default', eager: true })

function fuente(archivo: string) {
  const codigo = fuentes[`../../../react-samples/katas/${archivo}`]
  if (codigo === undefined) throw new Error(`No existe react-samples/katas/${archivo}`)
  return codigo.trimEnd()
}

export interface KataReact { titulo: string; enunciado: string; pista: string; codigo: string }

export const reactKatas: Record<'junior' | 'semi-senior', readonly KataReact[]> = {
  'junior': [
    { titulo: "Contador con límites", enunciado: "Un contador con botones Sumar, Restar y Reiniciar, que no baja de 0 ni pasa de un máximo que llega por props. Los botones se deshabilitan en los límites.", pista: "Un `useState` para el valor, la forma con función del setter y `disabled` según el valor.", codigo: fuente("Contador.tsx") },
    { titulo: "Lista de tareas", enunciado: "El clásico: un formulario para agregar tareas (sin aceptar títulos vacíos), la lista y un botón para borrar cada una. Si no hay tareas, un mensaje.", pista: "Un estado para la lista y otro para el campo controlado. Cada tarea necesita un id para la key y para borrarla.", codigo: fuente("ListaDeTareas.tsx") },
    { titulo: "Agrupar por", enunciado: "Una función genérica que agrupe una lista según una clave calculada. Por ejemplo, tareas en \"hechas\" y \"pendientes\".", pista: "Recorré la lista y acumulá en un objeto. `??=` crea el array del grupo la primera vez.", codigo: fuente("agruparPor.ts") },
  ],
  'semi-senior': [
    { titulo: "debounce", enunciado: "Una función que reciba otra función y una espera, y devuelva una versión que solo se ejecuta cuando pasan `espera` ms sin nuevas llamadas, con los últimos argumentos.", pista: "Guardá el temporizador en una clausura y cancelalo en cada llamada nueva.", codigo: fuente("debounce.ts") },
    { titulo: "useDebounce", enunciado: "El mismo concepto como hook: recibe un valor y devuelve una versión que se actualiza recién cuando el valor dejó de cambiar. Ideal para un buscador.", pista: "Un estado con el valor demorado y un efecto que programa el cambio y lo cancela en la limpieza.", codigo: fuente("useDebounce.ts") },
    { titulo: "Promise.all propio", enunciado: "Reimplementá `Promise.all`: resolver con todos los resultados en el mismo orden que las promesas, o rechazar con el primer error. Una lista vacía resuelve con `[]`.", pista: "Guardá cada resultado en su índice (no con `push`, porque terminan en cualquier orden) y llevá la cuenta de cuántas faltan.", codigo: fuente("promiseAll.ts") },
  ],
}
