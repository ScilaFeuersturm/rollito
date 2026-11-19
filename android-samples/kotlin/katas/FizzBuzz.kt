package katas.fizzbuzz

fun fizzBuzz(n: Int): String = when {
    n % 15 == 0 -> "FizzBuzz"   // primero el caso más específico
    n % 3 == 0 -> "Fizz"
    n % 5 == 0 -> "Buzz"
    else -> n.toString()
}

fun main() {
    println((1..15).joinToString(" ") { fizzBuzz(it) })
}
