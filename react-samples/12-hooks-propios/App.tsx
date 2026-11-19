import { useState } from 'react'

type Tarea = { id: number; titulo: string; hecha: boolean }

// Un hook propio: lógica con estado que se puede reutilizar en varios componentes.
function useTareas(iniciales: Tarea[]) {
  const [tareas, setTareas] = useState(iniciales)

  function alternar(id: number) {
    setTareas(actuales => actuales.map(t => (t.id === id ? { ...t, hecha: !t.hecha } : t)))
  }

  const pendientes = tareas.filter(t => !t.hecha).length
  return { tareas, alternar, pendientes }
}

export default function App() {
  const { tareas, alternar, pendientes } = useTareas([
    { id: 1, titulo: 'Comprar yerba', hecha: false },
    { id: 2, titulo: 'Pagar la luz', hecha: false },
  ])

  return (
    <main>
      <p>Pendientes: {pendientes}</p>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
              {t.titulo}
            </label>
          </li>
        ))}
      </ul>
    </main>
  )
}
