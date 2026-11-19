package com.rollito.livecoding.data.remote

import retrofit2.http.GET
import retrofit2.http.Path

interface TareasApi {
    @GET("todos")
    suspend fun tareas(): List<TareaDto>

    @GET("todos/{id}")
    suspend fun tarea(@Path("id") id: Long): TareaDto
}
