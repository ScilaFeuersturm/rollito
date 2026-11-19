import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type Tarea = { id: number; titulo: string }

// "Servidor" simulado: el primer pedido falla, para mostrar el error y el reintento.
let tareas: Tarea[] = [{ id: 1, titulo: 'Comprar yerba' }]
let fallarLaPrimera = true
const esperar = () => new Promise(resolve => setTimeout(resolve, 50))

async function obtenerTareas(): Promise<Tarea[]> {
  await esperar()
  if (fallarLaPrimera) { fallarLaPrimera = false; throw new Error('Sin conexión') }
  return [...tareas]
}

async function agregarTarea(titulo: string) {
  await esperar()
  tareas = [...tareas, { id: tareas.length + 1, titulo }]
}

function Tareas() {
  const consulta = useQuery({ queryKey: ['tareas'], queryFn: obtenerTareas, retry: false })
  const queryClient = useQueryClient()
  const agregar = useMutation({
    mutationFn: agregarTarea,
    // Después de escribir, se invalida la consulta: TanStack Query la vuelve a pedir sola.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tareas'] }),
  })
  const [titulo, setTitulo] = useState('')

  if (consulta.isPending) return <p role="status">Cargando tareas…</p>
  if (consulta.isError) return <div role="alert">{consulta.error.message} <button onClick={() => consulta.refetch()}>Reintentar</button></div>

  return (
    <main>
      <ul>{consulta.data.map(tarea => <li key={tarea.id}>{tarea.titulo}</li>)}</ul>
      <label>Nueva tarea <input value={titulo} onChange={evento => setTitulo(evento.target.value)} /></label>
      <button disabled={agregar.isPending} onClick={() => agregar.mutate(titulo)}>Agregar</button>
    </main>
  )
}

const queryClient = new QueryClient()

export default function App() {
  return <QueryClientProvider client={queryClient}><Tareas /></QueryClientProvider>
}
