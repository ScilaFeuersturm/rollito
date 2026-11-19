package com.rollito.livecoding.data

// Fallas clasificadas: la UI decide qué mostrar sin conocer excepciones de Retrofit ni de OkHttp.
sealed interface Falla {
    data object SinConexion : Falla
    data object Timeout : Falla
    data class Cliente(val codigo: Int) : Falla   // 4xx
    data class Servidor(val codigo: Int) : Falla  // 5xx
    data object Parseo : Falla
    data object Desconocida : Falla
}

sealed interface Resultado<out T> {
    data class Exito<T>(val valor: T) : Resultado<T>
    data class Error(val falla: Falla) : Resultado<Nothing>
}
