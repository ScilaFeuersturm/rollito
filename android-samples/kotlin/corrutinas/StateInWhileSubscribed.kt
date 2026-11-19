package corrutinas.stateinwhilesubscribed

import kotlinx.coroutines.cancelChildren
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val fuente = flow {
        println("  [fuente] arranca")
        try {
            var i = 0
            while (true) { emit(i++); delay(100) }
        } finally {
            println("  [fuente] se detiene")
        }
    }
    // En la app sería viewModelScope y WhileSubscribed(5000); acá los tiempos están achicados 10 veces.
    val estado = fuente.stateIn(this, SharingStarted.WhileSubscribed(500), -1)

    println("pantalla abierta")
    var pantalla = launch { estado.collect {} }
    delay(250); pantalla.cancel()
    println("rotación: 200 ms sin nadie colectando")
    delay(200)
    pantalla = launch { estado.collect {} }
    delay(250); pantalla.cancel()
    println("segundo plano: 800 ms sin nadie colectando")
    delay(800)
    println("al volver, ¿quedó el último valor? ${estado.value != -1}")
    pantalla = launch { estado.collect {} }
    delay(150)
    coroutineContext.cancelChildren()
}
