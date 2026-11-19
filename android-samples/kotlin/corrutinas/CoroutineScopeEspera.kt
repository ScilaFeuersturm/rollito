package corrutinas.coroutinescopeespera

import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

suspend fun cargarTodo() = coroutineScope {
    launch { delay(200); println("imágenes") }
    launch { delay(100); println("textos") }
    println("lancé las dos")
}

fun main() = runBlocking {
    cargarTodo()
    println("listo")
}
