package corrutinas.eventosdeunasolavez

import kotlinx.coroutines.cancelChildren
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val estado = MutableStateFlow<String?>(null)
    val compartido = MutableSharedFlow<String>()
    val canal = Channel<String>(Channel.BUFFERED)

    // El ViewModel emite mientras no hay ninguna pantalla colectando (por ejemplo, durante una rotación).
    estado.value = "snackbar"
    compartido.emit("snackbar")
    canal.send("snackbar")

    // Llega la pantalla nueva y empieza a colectar.
    launch { estado.collect { if (it != null) println("StateFlow, pantalla 1: $it") } }
    launch { compartido.collect { println("SharedFlow, pantalla 1: $it") } }
    launch { canal.receiveAsFlow().collect { println("Channel, pantalla 1: $it") } }
    delay(100)
    coroutineContext.cancelChildren()

    // Otra rotación: una segunda pantalla vuelve a colectar.
    launch { estado.collect { if (it != null) println("StateFlow, pantalla 2: $it") } }
    launch { canal.receiveAsFlow().collect { println("Channel, pantalla 2: $it") } }
    delay(100)
    coroutineContext.cancelChildren()
}
