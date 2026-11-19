import { useState } from 'react'

export default function App() {
  const [tareas, setTareas] = useState<string[]>([])
  const urgentes = 0

  return (
    <main>
      {tareas.length === 0 ? (
        <p>No tenés tareas pendientes</p>
      ) : (
        <ul>
          {tareas.map(tarea => <li key={tarea}>{tarea}</li>)}
        </ul>
      )}

      {/* Con && hay que usar una condición booleana: {urgentes && ...} mostraría un 0. */}
      {urgentes > 0 && <p>Tenés {urgentes} tareas urgentes</p>}

      <button onClick={() => setTareas(['Comprar yerba'])}>Agregar una tarea</button>
    </main>
  )
}
