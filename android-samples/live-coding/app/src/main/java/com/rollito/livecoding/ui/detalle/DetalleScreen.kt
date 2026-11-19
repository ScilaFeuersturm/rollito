package com.rollito.livecoding.ui.detalle

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import androidx.navigation.toRoute
import com.rollito.livecoding.data.Resultado
import com.rollito.livecoding.data.TareasRepository
import com.rollito.livecoding.domain.Tarea
import com.rollito.livecoding.ui.Detalle
import com.rollito.livecoding.ui.lista.mensaje
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface DetalleUiState {
    data object Cargando : DetalleUiState
    data class Listo(val tarea: Tarea) : DetalleUiState
    data class Error(val mensaje: String) : DetalleUiState
}

@HiltViewModel
class DetalleViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val repo: TareasRepository,
) : ViewModel() {
    // El argumento de navegación llega en el SavedStateHandle: sobrevive incluso a la muerte del proceso.
    private val id = savedStateHandle.toRoute<Detalle>().id

    private val _estado = MutableStateFlow<DetalleUiState>(DetalleUiState.Cargando)
    val estado = _estado.asStateFlow()

    init {
        viewModelScope.launch {
            _estado.value = when (val r = repo.tarea(id)) {
                is Resultado.Exito -> DetalleUiState.Listo(r.valor)
                is Resultado.Error -> DetalleUiState.Error(mensaje(r.falla))
            }
        }
    }
}

@Composable
fun DetalleScreen(viewModel: DetalleViewModel = hiltViewModel()) {
    val estado by viewModel.estado.collectAsStateWithLifecycle()
    Box(Modifier.fillMaxSize().padding(16.dp), contentAlignment = Alignment.Center) {
        when (val e = estado) {
            DetalleUiState.Cargando -> CircularProgressIndicator()
            is DetalleUiState.Error -> Text(e.mensaje)
            is DetalleUiState.Listo -> Column {
                Text(e.tarea.titulo, style = MaterialTheme.typography.headlineSmall)
                Text(if (e.tarea.completada) "Completada" else "Pendiente")
            }
        }
    }
}
