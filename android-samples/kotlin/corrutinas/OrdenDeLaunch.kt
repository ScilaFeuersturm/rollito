package corrutinas.ordendelaunch

import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    println("A")
    launch { println("B") }
    println("C")
    launch { println("D") }
    println("E")
}
