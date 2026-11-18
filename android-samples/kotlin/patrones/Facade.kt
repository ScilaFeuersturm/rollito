package patrones.facade

class DepositoTareas {
    private val tareas = mutableListOf<String>()

    fun guardar(titulo: String) {
        tareas.add(titulo)
    }

    fun listar(): List<String> = tareas.toList()
}

class ResumenTareas {
    fun generar(tareas: List<String>): String = "Tareas guardadas: ${tareas.size}"
}

class TareasFacade(
    private val deposito: DepositoTareas,
    private val resumen: ResumenTareas,
) {
    fun agregarYVerResumen(titulo: String): String {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return "Escribí un título"

        deposito.guardar(limpio)
        return resumen.generar(deposito.listar())
    }
}

fun main() {
    val tareas = TareasFacade(DepositoTareas(), ResumenTareas())
    println(tareas.agregarYVerResumen(" "))
    println(tareas.agregarYVerResumen("Comprar yerba"))
    println(tareas.agregarYVerResumen("Pagar la luz"))
}
