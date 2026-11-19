package corrutinas.supervisorjobyasync

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    // Así está armado viewModelScope: SupervisorJob + un dispatcher.
    val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    val pedido = scope.async { delay(100); throw IllegalArgumentException("sin red") }
    val otro = scope.launch { delay(200); println("el otro siguió") }
    try {
        pedido.await()
    } catch (e: IllegalArgumentException) {
        println("await lanzó: ${e.message}")
    }
    otro.join()
    println("scope activo: ${scope.isActive}")
}
