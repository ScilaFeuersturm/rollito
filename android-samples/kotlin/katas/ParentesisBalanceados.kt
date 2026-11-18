package katas.parentesis

fun estaBalanceado(texto: String): Boolean {
    val pares = mapOf(')' to '(', ']' to '[', '}' to '{')
    val pila = ArrayDeque<Char>()
    for (c in texto) {
        when (c) {
            '(', '[', '{' -> pila.addLast(c)
            ')', ']', '}' -> if (pila.removeLastOrNull() != pares[c]) return false
        }
    }
    return pila.isEmpty()
}

fun main() {
    println(estaBalanceado("{[()()]}"))
    println(estaBalanceado("([)]"))
    println(estaBalanceado("(("))
}
