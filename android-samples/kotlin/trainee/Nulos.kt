package trainee.nulos

fun largoDelApodo(apodo: String?): Int {
    // Como `guard let apodo else { return 0 }` en Swift:
    val valor = apodo ?: return 0
    return valor.length                       // acá `valor` es String, no String?
}

fun apodoGuardado(): String? = "Pri"       // en una app real vendría de una base o de la red

fun main() {
    var apodo: String? = null                 // el ? permite null, como un Optional en Swift
    println(apodo?.length)                    // llamada segura: si es null, devuelve null
    println(apodo ?: "Sin apodo")             // Elvis: valor por defecto, como ?? en Swift

    apodo = apodoGuardado()
    if (apodo != null) {
        println(apodo.length)                 // smart cast: adentro del if ya es String
    }
    apodo?.let { println("Hola, $it") }       // let: se ejecuta solo si no es null (como if let)

    println(largoDelApodo(null))
    println(largoDelApodo("Aramis"))

    val numero = "12a".toIntOrNull()          // convierte o devuelve null si no puede
    println(numero ?: -1)
}
