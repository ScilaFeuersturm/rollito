package patrones.adapter

data class Tarea(val titulo: String)
data class PendienteExterno(val descripcion: String)

class ServicioExterno {
    fun pendientes(): List<PendienteExterno> =
        listOf(PendienteExterno("Comprar yerba"), PendienteExterno("Pagar la luz"))
}

fun interface FuenteTareas {
    fun listar(): List<Tarea>
}

class AdaptadorServicio(private val servicio: ServicioExterno) : FuenteTareas {
    override fun listar(): List<Tarea> =
        servicio.pendientes().map { pendiente -> Tarea(pendiente.descripcion) }
}

fun mostrar(fuente: FuenteTareas) {
    println(fuente.listar().joinToString { it.titulo })
}

fun main() {
    mostrar(AdaptadorServicio(ServicioExterno()))
}
