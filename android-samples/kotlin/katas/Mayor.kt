package katas.mayor

// Sin usar max(): recorrer la lista guardando el mayor visto. Una lista vacía no tiene mayor: null.
fun mayor(numeros: List<Int>): Int? {
    if (numeros.isEmpty()) return null
    var resultado = numeros[0]
    for (n in numeros) {
        if (n > resultado) resultado = n
    }
    return resultado
}

fun main() {
    println(mayor(listOf(3, 17, -2, 8)))
    println(mayor(listOf(-5, -1, -9)))
    println(mayor(emptyList()))
}
