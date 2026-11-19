import { useState } from 'react'

type Tarea = { id: number; titulo: string }

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: 'Comprar yerba' },
    { id: 2, titulo: 'Pagar la luz' },
  ])

  function agregarAlPrincipio() {
    const nueva = { id: Date.now(), titulo: 'Llamar al médico' }
    setTareas([nueva, ...tareas])
  }

  return (
    <main>
      <button onClick={agregarAlPrincipio}>Agregar arriba</button>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>{tarea.titulo}</li>
        ))}
      </ul>
    </main>
  )
}
