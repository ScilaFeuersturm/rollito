import type { AndroidLevel } from './interview-practice'

// Ejercicios de código en vivo por nivel. La solución se lee de android-samples/kotlin/katas, que compila.
const sources = import.meta.glob<string>('../../../android-samples/kotlin/katas/*.kt', { query: '?raw', import: 'default', eager: true })

function source(file: string) {
  const code = sources[`../../../android-samples/kotlin/katas/${file}.kt`]
  if (code === undefined) throw new Error(`No existe android-samples/kotlin/katas/${file}.kt`)
  return code.trimEnd()
}

export interface Kata {
  titulo: string
  enunciado: string
  ejemplo: string
  pista: string
  codigo: string
}

export const katas: Record<AndroidLevel, readonly Kata[]> = {
  "junior": [
    {
      titulo: "Contar palabras",
      enunciado: "Dado un texto, devolvé cuántas veces aparece cada palabra, sin distinguir mayúsculas e ignorando la puntuación.",
      ejemplo: "`contarPalabras(\"Mate, mate y más mate.\")` → `{mate=3, y=1, más=1}`",
      pista: "`split` con una expresión regular, y después `groupingBy { it }.eachCount()`.",
      codigo: source("ContarPalabras"),
    },
    {
      titulo: "Palíndromo",
      enunciado: "Decidí si un texto se lee igual al derecho y al revés, ignorando espacios, signos y mayúsculas.",
      ejemplo: "`\"Anita lava la tina\"` → `true`. `\"Rollito\"` → `false`.",
      pista: "Limpiá el texto con `filter { it.isLetterOrDigit() }` y compará con `reversed()`.",
      codigo: source("Palindromo"),
    },
    {
      titulo: "Primer carácter no repetido",
      enunciado: "Devolvé el primer carácter que aparece una sola vez, o `null` si no hay ninguno.",
      ejemplo: "`\"android\"` → `a`. `\"aabb\"` → `null`.",
      pista: "Contá primero y recorré después: dos pasadas, O(n).",
      codigo: source("PrimerNoRepetido"),
    },
    {
      titulo: "Resumen de tareas",
      enunciado: "Dada una lista de tareas, devolvé cuántas están hechas, cuántas pendientes y los títulos de las pendientes urgentes (vencen en un día o menos), de la más urgente a la menos urgente.",
      ejemplo: "Con cuatro tareas de ejemplo → `Hechas: 1, pendientes: 3, urgentes: [Llamar al médico, Pagar la luz]`",
      pista: "`partition`, `filter`, `sortedBy` y `map`.",
      codigo: source("TareasPorEstado"),
    },
  ],
  "semi-senior": [
    {
      titulo: "Dos números que suman un objetivo",
      enunciado: "Dada una lista y un número objetivo, devolvé los índices de dos elementos que sumen el objetivo, o `null`.",
      ejemplo: "`[2, 7, 11, 15]` con objetivo `9` → `(0, 1)`. `[1, 2, 3]` con objetivo `7` → `null`.",
      pista: "Con dos bucles es O(n²). Con un mapa de \"valor visto → índice\" es O(n).",
      codigo: source("DosQueSuman"),
    },
    {
      titulo: "Paréntesis balanceados",
      enunciado: "Decidí si los paréntesis, corchetes y llaves de un texto están bien balanceados.",
      ejemplo: "`\"{[()()]}\"` → `true`. `\"([)]\"` → `false`. `\"((\"` → `false`.",
      pista: "Una pila: apilás al abrir y, al cerrar, el tope tiene que ser la apertura correspondiente.",
      codigo: source("ParentesisBalanceados"),
    },
    {
      titulo: "Debounce de un buscador",
      enunciado: "Dada una lista de eventos de tipeo (milisegundo y texto), devolvé qué búsquedas se harían si cada una espera `espera` ms sin teclas nuevas. Es la lógica del operador `debounce` de Flow, sin corrutinas.",
      ejemplo: "\"y\" (0), \"ye\" (100), \"yer\" (200), \"yerb\" (700) y \"yerba\" (750) con espera de 300 → `[yer, yerba]`",
      pista: "Un evento se emite si el siguiente llega después de la espera, o si no hay siguiente.",
      codigo: source("Debounce"),
    },
  ],
  "senior": [
    {
      titulo: "Caché LRU",
      enunciado: "Implementá una caché de capacidad fija que, al llenarse, descarte el elemento usado hace más tiempo (en inglés, least recently used). Leer un elemento cuenta como uso.",
      ejemplo: "Con capacidad 2: guardás `a` y `b`, leés `a` y guardás `c` → quedan `[a, c]` (se descartó `b`).",
      pista: "`LinkedHashMap` con `accessOrder = true` mantiene el orden de uso. `removeEldestEntry` decide cuándo descartar. Si te piden hacerlo sin `LinkedHashMap`: un mapa más una lista doblemente enlazada, todo en O(1).",
      codigo: source("CacheLru"),
    },
  ],
}

export const katasIntro: Partial<Record<AndroidLevel, string>> = {
  senior: "En Senior el código en vivo suele combinarse con preguntas de diseño: practicalas también en el simulacro Senior y en la lección «Entrevista integradora de diseño Android».",
}
