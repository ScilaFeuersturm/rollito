package arquitectura.hexagonal

fun interface AgregarTarea {
    fun ejecutar(titulo: String): Boolean
}

fun interface GuardarTarea {
    fun guardar(titulo: String)
}

class ServicioTareas(private val salida: GuardarTarea) : AgregarTarea {
    override fun ejecutar(titulo: String): Boolean {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return false
        salida.guardar(limpio)
        return true
    }
}

class EntradaConsola(private val entrada: AgregarTarea) {
    fun procesar(texto: String) {
        println(if (entrada.ejecutar(texto)) "Tarea guardada" else "Escribí un título")
    }
}

fun main() {
    val tareas = mutableListOf<String>()
    val consola = EntradaConsola(ServicioTareas(GuardarTarea { tareas.add(it) }))
    consola.procesar(" ")
    consola.procesar("Comprar yerba")
    println(tareas)
}
