package com.rollito.livecoding.domain

// Modelo de dominio: lo que la app necesita, con nombres nuestros. No sabe nada de JSON.
data class Tarea(val id: Long, val titulo: String, val completada: Boolean)
