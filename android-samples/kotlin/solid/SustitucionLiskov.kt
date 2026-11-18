package solid.liskov

interface TareaEditableAntes {
    val titulo: String
    fun renombrar(nuevo: String)
}

class TareaArchivadaAntes(override val titulo: String) : TareaEditableAntes {
    override fun renombrar(nuevo: String) {
        throw UnsupportedOperationException("Una tarea archivada no se puede editar")
    }
}

interface TareaLegible {
    val titulo: String
}

interface TareaEditable : TareaLegible {
    fun renombrar(nuevo: String)
}

data class TareaArchivada(override val titulo: String) : TareaLegible

class TareaActiva(tituloInicial: String) : TareaEditable {
    override var titulo = tituloInicial
        private set

    override fun renombrar(nuevo: String) {
        titulo = nuevo
    }
}

fun mostrar(tarea: TareaLegible) = println(tarea.titulo)

fun main() {
    try {
        TareaArchivadaAntes("Comprar yerba").renombrar("Comprar café")
    } catch (error: UnsupportedOperationException) {
        println(error.message)
    }
    mostrar(TareaArchivada("Comprar yerba"))
    val activa = TareaActiva("Pagar la luz")
    activa.renombrar("Pagar internet")
    mostrar(activa)
}
