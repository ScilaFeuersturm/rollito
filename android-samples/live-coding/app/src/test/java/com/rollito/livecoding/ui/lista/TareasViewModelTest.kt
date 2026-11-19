package com.rollito.livecoding.ui.lista

import com.rollito.livecoding.data.Falla
import com.rollito.livecoding.data.Resultado
import com.rollito.livecoding.data.TareasRepository
import com.rollito.livecoding.domain.Tarea
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.delay
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runCurrent
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class TareasViewModelTest {
    // viewModelScope usa Dispatchers.Main, que en la JVM no existe: lo reemplazamos por uno de test.
    private val dispatcher = StandardTestDispatcher()
    private val repo = mockk<TareasRepository>()

    @Before fun setUp() = Dispatchers.setMain(dispatcher)
    @After fun tearDown() = Dispatchers.resetMain()

    @Test
    fun `muestra cargando y después el contenido`() = runTest(dispatcher) {
        val tareas = listOf(Tarea(1, "Comprar yerba", completada = false))
        coEvery { repo.tareas() } returns Resultado.Exito(tareas)

        val viewModel = TareasViewModel(repo)
        assertEquals(TareasUiState.Cargando, viewModel.estado.value)

        advanceUntilIdle()
        assertEquals(TareasUiState.Contenido(tareas), viewModel.estado.value)
    }

    @Test
    fun `una lista vacía muestra el estado vacío`() = runTest(dispatcher) {
        coEvery { repo.tareas() } returns Resultado.Exito(emptyList())

        val viewModel = TareasViewModel(repo)
        advanceUntilIdle()

        assertEquals(TareasUiState.Vacio, viewModel.estado.value)
    }

    @Test
    fun `reintentar después de un error carga el contenido`() = runTest(dispatcher) {
        val tareas = listOf(Tarea(1, "Comprar yerba", completada = false))
        coEvery { repo.tareas() } returnsMany listOf(Resultado.Error(Falla.SinConexion), Resultado.Exito(tareas))

        val viewModel = TareasViewModel(repo)
        advanceUntilIdle()
        assertEquals(TareasUiState.Error(Falla.SinConexion), viewModel.estado.value)

        viewModel.cargar()
        advanceUntilIdle()
        assertEquals(TareasUiState.Contenido(tareas), viewModel.estado.value)
    }

    @Test
    fun `al reintentar muestra cargando mientras espera la respuesta`() = runTest(dispatcher) {
        coEvery { repo.tareas() } returns Resultado.Error(Falla.Timeout)
        val viewModel = TareasViewModel(repo)
        advanceUntilIdle()

        // La respuesta tarda: así se puede observar el estado intermedio.
        coEvery { repo.tareas() } coAnswers { delay(1_000); Resultado.Exito(emptyList()) }
        viewModel.cargar()
        runCurrent()
        assertEquals(TareasUiState.Cargando, viewModel.estado.value)

        advanceUntilIdle()
        assertEquals(TareasUiState.Vacio, viewModel.estado.value)
    }
}
