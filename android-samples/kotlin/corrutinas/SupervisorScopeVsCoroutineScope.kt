package corrutinas.supervisorscopevscoroutinescope

import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.supervisorScope

fun main() = runBlocking {
    try {
        coroutineScope {
            launch { delay(100); throw IllegalStateException("falló A") }
            launch { delay(300); println("B terminó") }
        }
    } catch (e: IllegalStateException) {
        println("atrapé: ${e.message}")
    }

    val handler = CoroutineExceptionHandler { _, e -> println("handler: ${e.message}") }
    supervisorScope {
        launch(handler) { delay(100); throw IllegalStateException("falló C") }
        launch { delay(300); println("D terminó") }
    }
    println("fin")
}
