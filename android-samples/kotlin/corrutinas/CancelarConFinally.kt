package corrutinas.cancelarconfinally

import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val job = launch {
        try {
            repeat(5) { i ->
                println("trabajo $i")
                delay(100)
            }
        } finally {
            println("limpieza")
        }
    }
    delay(250)
    job.cancelAndJoin()
    println("cancelado")
}
