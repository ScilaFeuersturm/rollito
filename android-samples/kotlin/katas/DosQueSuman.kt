package katas.dosquesuman

fun dosQueSuman(numeros: List<Int>, objetivo: Int): Pair<Int, Int>? {
    val vistos = mutableMapOf<Int, Int>() // valor -> índice
    numeros.forEachIndexed { indice, numero ->
        vistos[objetivo - numero]?.let { return it to indice }
        vistos[numero] = indice
    }
    return null
}

fun main() {
    println(dosQueSuman(listOf(2, 7, 11, 15), 9))
    println(dosQueSuman(listOf(1, 2, 3), 7))
}
