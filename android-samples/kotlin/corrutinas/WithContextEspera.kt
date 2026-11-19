package corrutinas.withcontextespera

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext

fun hilo(): String = Thread.currentThread().name

fun main() = runBlocking {
    println("1 en ${hilo()}")
    val dato = withContext(Dispatchers.Default) {
        println("2 en otro hilo: ${hilo() != "main"}")
        "dato"
    }
    println("3 recibí $dato en ${hilo()}")
}
