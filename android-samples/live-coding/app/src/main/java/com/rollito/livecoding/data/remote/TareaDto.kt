package com.rollito.livecoding.data.remote

import com.rollito.livecoding.domain.Tarea
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// DTO: la forma exacta del JSON. Si el backend cambia un nombre, el cambio queda acá.
@Serializable
data class TareaDto(
    val id: Long,
    @SerialName("title") val titulo: String,
    @SerialName("completed") val completada: Boolean = false,
)

fun TareaDto.aDominio() = Tarea(id = id, titulo = titulo, completada = completada)
