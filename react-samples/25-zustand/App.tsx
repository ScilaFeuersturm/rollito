import { memo } from 'react'
import { create } from 'zustand'

type Tarea = { id: number; titulo: string; hecha: boolean }
type Estado = {
  tareas: Tarea[]
  filtro: string
  agregar: (titulo: string) => void
  completar: (id: number) => void
  setFiltro: (filtro: string) => void
}

export const useTareas = create<Estado>()(set => ({
  tareas: [],
  filtro: '',
  agregar: titulo => set(estado => ({ tareas: [...estado.tareas, { id: estado.tareas.length + 1, titulo, hecha: false }] })),
  completar: id => set(estado => ({ tareas: estado.tareas.map(t => (t.id === id ? { ...t, hecha: true } : t)) })),
  setFiltro: filtro => set({ filtro }),
}))

export const dibujos = { pendientes: 0 }

// El selector evita los dibujos que dispara el store: solo redibuja si cambia el número.
// memo evita los que dispara el padre: App está suscripto a todo el store y se redibuja seguido.
const Pendientes = memo(function Pendientes() {
  const pendientes = useTareas(estado => estado.tareas.filter(t => !t.hecha).length)
  dibujos.pendientes++
  return <p>Pendientes: {pendientes}</p>
})

export default function App() {
  const { tareas, filtro, agregar, completar, setFiltro } = useTareas()
  return (
    <main>
      <Pendientes />
      <button onClick={() => agregar(`Tarea ${tareas.length + 1}`)}>Agregar</button>
      <label>Filtro <input value={filtro} onChange={evento => setFiltro(evento.target.value)} /></label>
      <ul>
        {tareas.filter(t => t.titulo.includes(filtro)).map(t =>
          <li key={t.id}>{t.titulo} {!t.hecha && <button onClick={() => completar(t.id)}>Completar {t.titulo}</button>}</li>)}
      </ul>
    </main>
  )
}
