package solid.inversion

class TareasEnMemoria : GuardarTarea {
    private val tareas = mutableListOf<String>()

    override fun guardar(titulo: String) {
        tareas.add(titulo)
    }

    fun titulos() = tareas.toList()
}

class AgregarTareaAntes(private val memoria: TareasEnMemoria) {
    fun ejecutar(titulo: String): Boolean {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return false
        memoria.guardar(limpio)
        return true
    }
}

fun interface GuardarTarea {
    fun guardar(titulo: String)
}

class AgregarTarea(private val salida: GuardarTarea) {
    fun ejecutar(titulo: String): Boolean {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return false
        salida.guardar(limpio)
        return true
    }
}

fun main() {
    val memoria = TareasEnMemoria()
    AgregarTareaAntes(memoria).ejecutar(" Comprar yerba ")
    println(memoria.titulos())

    val llamadas = mutableListOf<String>()
    val agregar = AgregarTarea(GuardarTarea { llamadas.add(it) })
    check(!agregar.ejecutar(" "))
    check(agregar.ejecutar(" Comprar yerba "))
    println(llamadas)
}
