package corrutinas.cancelacioncooperativa

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        var vueltas = 0L
        val fin = System.currentTimeMillis() + 300
        while (System.currentTimeMillis() < fin) { vueltas++ } // sin ningún punto de suspensión
        println("terminé el bucle (isActive = $isActive)")
    }
    delay(100)
    job.cancelAndJoin()
    println("cancelado")
}
