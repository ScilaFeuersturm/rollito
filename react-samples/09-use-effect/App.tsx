import { useEffect, useState } from 'react'

type Tarea = { id: number; titulo: string; hecha: boolean }

// Simula una API: en una app real sería un fetch.
function buscarTareas(soloPendientes: boolean): Promise<Tarea[]> {
  const todas = [
    { id: 1, titulo: 'Comprar yerba', hecha: true },
    { id: 2, titulo: 'Pagar la luz', hecha: false },
  ]
  return new Promise(resolve =>
    setTimeout(() => resolve(soloPendientes ? todas.filter(t => !t.hecha) : todas), 300))
}

export default function App() {
  const [soloPendientes, setSoloPendientes] = useState(false)
  const [tareas, setTareas] = useState<Tarea[]>([])

  useEffect(() => {
    let ignorar = false
    buscarTareas(soloPendientes).then(resultado => {
      if (!ignorar) setTareas(resultado)
    })
    // Limpieza: si el filtro cambia antes de que llegue la respuesta, se descarta la vieja.
    return () => { ignorar = true }
  }, [soloPendientes])

  return (
    <main>
      <label>
        <input type="checkbox" checked={soloPendientes}
          onChange={evento => setSoloPendientes(evento.target.checked)} />
        Solo pendientes
      </label>
      <ul>
        {tareas.map(tarea => <li key={tarea.id}>{tarea.titulo}</li>)}
      </ul>
    </main>
  )
}
