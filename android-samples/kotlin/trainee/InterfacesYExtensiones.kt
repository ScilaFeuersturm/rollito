package trainee.interfacesyextensiones

// interface: como un protocol de Swift. Puede tener implementaciones por defecto.
interface Notificable {
    val destino: String
    fun mensaje(): String
    fun enviar() = "Para $destino: ${mensaje()}"
}

class Recordatorio(override val destino: String, private val tarea: String) : Notificable {
    override fun mensaje() = "No te olvides de $tarea"
}

// Función de extensión: agrega una función a un tipo que no es tuyo (como una extension de Swift).
fun String.capitalizada(): String = replaceFirstChar { it.uppercase() }

// Propiedad de extensión.
val List<String>.resumen: String
    get() = if (isEmpty()) "Sin tareas" else "$size tareas: ${joinToString()}"

fun main() {
    val r = Recordatorio("Ana", "pagar la luz")
    println(r.enviar())

    val notificables: List<Notificable> = listOf(r)
    println(notificables.size)

    println("comprar yerba".capitalizada())
    println(listOf("Yerba", "Luz").resumen)
    println(emptyList<String>().resumen)
}
