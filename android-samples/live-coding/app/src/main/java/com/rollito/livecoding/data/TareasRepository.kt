package com.rollito.livecoding.data

import com.rollito.livecoding.data.remote.TareasApi
import com.rollito.livecoding.data.remote.aDominio
import com.rollito.livecoding.domain.Tarea
import java.io.IOException
import java.net.SocketTimeoutException
import javax.inject.Inject
import kotlin.coroutines.cancellation.CancellationException
import kotlinx.serialization.SerializationException
import retrofit2.HttpException

interface TareasRepository {
    suspend fun tareas(): Resultado<List<Tarea>>
    suspend fun tarea(id: Long): Resultado<Tarea>
}

class TareasRepositoryRed @Inject constructor(
    private val api: TareasApi,
) : TareasRepository {

    override suspend fun tareas() = llamar { api.tareas().map { it.aDominio() } }

    override suspend fun tarea(id: Long) = llamar { api.tarea(id).aDominio() }

    // Retrofit con funciones suspend ya cambia de hilo solo: no hace falta withContext(Dispatchers.IO).
    private suspend fun <T> llamar(bloque: suspend () -> T): Resultado<T> = try {
        Resultado.Exito(bloque())
    } catch (e: CancellationException) {
        throw e // la cancelación nunca se traga
    } catch (e: SocketTimeoutException) {
        Resultado.Error(Falla.Timeout) // va antes que IOException porque es una subclase
    } catch (e: IOException) {
        Resultado.Error(Falla.SinConexion)
    } catch (e: HttpException) {
        Resultado.Error(if (e.code() in 500..599) Falla.Servidor(e.code()) else Falla.Cliente(e.code()))
    } catch (e: SerializationException) {
        Resultado.Error(Falla.Parseo)
    } catch (e: Exception) {
        Resultado.Error(Falla.Desconocida)
    }
}
