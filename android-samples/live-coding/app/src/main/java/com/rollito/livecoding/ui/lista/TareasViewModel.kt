package com.rollito.livecoding.ui.lista

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.rollito.livecoding.data.Falla
import com.rollito.livecoding.data.Resultado
import com.rollito.livecoding.data.TareasRepository
import com.rollito.livecoding.domain.Tarea
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface TareasUiState {
    data object Cargando : TareasUiState
    data object Vacio : TareasUiState
    data class Contenido(val tareas: List<Tarea>) : TareasUiState
    data class Error(val falla: Falla) : TareasUiState
}

@HiltViewModel
class TareasViewModel @Inject constructor(
    private val repo: TareasRepository,
) : ViewModel() {

    private val _estado = MutableStateFlow<TareasUiState>(TareasUiState.Cargando)
    val estado: StateFlow<TareasUiState> = _estado.asStateFlow()

    init { cargar() }

    fun cargar() {
        viewModelScope.launch {
            _estado.value = TareasUiState.Cargando
            _estado.value = when (val resultado = repo.tareas()) {
                is Resultado.Exito ->
                    if (resultado.valor.isEmpty()) TareasUiState.Vacio
                    else TareasUiState.Contenido(resultado.valor)
                is Resultado.Error -> TareasUiState.Error(resultado.falla)
            }
        }
    }
}
