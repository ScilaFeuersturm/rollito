package trainee.clases

// Constructor primario en la misma línea; `val` y `var` crean las propiedades directamente.
class Tarea(val titulo: String, var hecha: Boolean = false) {
    val creadaCon: String

    init {                                    // corre al construir el objeto
        require(titulo.isNotBlank()) { "El título no puede estar vacío" }
        creadaCon = "título de ${titulo.length} letras"
    }

    fun completar() {
        hecha = true
    }

    override fun toString() = "Tarea($titulo, hecha=$hecha)"
}

// Las clases son finales por defecto: para heredar hay que marcarlas `open`.
open class Usuario(val nombre: String) {
    open fun saludo() = "Hola, $nombre"
}

class Admin(nombre: String) : Usuario(nombre) {
    override fun saludo() = "Hola, $nombre (admin)"
}

fun main() {
    val tarea = Tarea("Comprar yerba")        // sin `new`
    println(tarea.titulo)
    println(tarea.hecha)
    tarea.completar()
    println(tarea)
    println(tarea.creadaCon)

    val usuarios: List<Usuario> = listOf(Usuario("Ana"), Admin("Pri"))
    usuarios.forEach { println(it.saludo()) }

    try {
        Tarea("   ")
    } catch (e: IllegalArgumentException) {
        println("Error: ${e.message}")
    }
}
