package solid.segregacion

interface TableroAntes {
    fun titulos(): List<String>
    fun agregar(titulo: String)
}

class PantallaResumenAntes(private val tablero: TableroAntes) {
    fun mostrar() = tablero.titulos().joinToString()
}

fun interface LecturaTareas {
    fun titulos(): List<String>
}

fun interface EscrituraTareas {
    fun agregar(titulo: String)
}

class TableroEnMemoria : LecturaTareas, EscrituraTareas {
    private val tareas = mutableListOf("Comprar yerba")

    override fun titulos(): List<String> = tareas.toList()

    override fun agregar(titulo: String) {
        tareas.add(titulo)
    }
}

class PantallaResumen(private val tareas: LecturaTareas) {
    fun mostrar() = tareas.titulos().joinToString()
}

fun main() {
    val anterior = object : TableroAntes {
        override fun titulos() = listOf("Comprar yerba")

        override fun agregar(titulo: String) {
            error("Esta vista de prueba solo lee")
        }
    }

    println(PantallaResumenAntes(anterior).mostrar())
    println(PantallaResumen(LecturaTareas { listOf("Comprar yerba") }).mostrar())

    val tablero = TableroEnMemoria()
    tablero.agregar("Pagar la luz")
    println(PantallaResumen(tablero).mostrar())
}
