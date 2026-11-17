// Capa de datos: sabe dónde y cómo se guardan las tareas.
class TareaRepositorio {
    private val tareas = mutableListOf("Comprar yerba", "Pagar la luz")

    fun obtenerTodas(): List<String> = tareas.toList()

    fun guardar(titulo: String) {
        tareas.add(titulo)
    }
}

// Capa de dominio: decide las reglas del negocio.
class ServicioDeTareas(private val repositorio: TareaRepositorio) {
    fun agregar(titulo: String): String {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return "El título no puede estar vacío"
        if (limpio in repositorio.obtenerTodas()) return "Esa tarea ya existe"
        repositorio.guardar(limpio)
        return "Tarea agregada"
    }
}

// Capa de presentación: recibe las acciones y muestra el resultado.
class PantallaDeTareas(private val servicio: ServicioDeTareas) {
    fun alTocarAgregar(texto: String) {
        println(servicio.agregar(texto))
    }
}

fun main() {
    val pantalla = PantallaDeTareas(ServicioDeTareas(TareaRepositorio()))

    pantalla.alTocarAgregar("Llamar al médico")
    pantalla.alTocarAgregar("   ")
    pantalla.alTocarAgregar("Pagar la luz")
}
