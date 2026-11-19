package trainee.objectycompanion

// object: una única instancia (un singleton), creada la primera vez que se usa.
object Configuracion {
    var modoOscuro = false
    fun describir() = if (modoOscuro) "Oscuro" else "Claro"
}

class Tarea private constructor(val titulo: String) {  // constructor privado: solo se crea desde adentro

    // companion object: lo que en Swift o Java sería `static`. Pertenece a la clase, no a cada objeto.
    companion object {
        const val LARGO_MAXIMO = 60
        private var creadas = 0

        fun crear(titulo: String): Tarea? {               // fábrica: decide si se puede crear
            if (titulo.isBlank() || titulo.length > LARGO_MAXIMO) return null
            creadas++
            return Tarea(titulo.trim())
        }

        fun cuantasSeCrearon() = creadas
    }
}

fun main() {
    println(Configuracion.describir())
    Configuracion.modoOscuro = true
    println(Configuracion.describir())

    println(Tarea.LARGO_MAXIMO)                // se usa con el nombre de la clase
    println(Tarea.crear("  Comprar yerba ")?.titulo)
    println(Tarea.crear("   "))
    println(Tarea.cuantasSeCrearon())
}
