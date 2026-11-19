import { useState } from 'react'

const ALTO = 32
const VISIBLES = 10
const tareas = Array.from({ length: 10_000 }, (_, i) => `Tarea ${i + 1}`)

// Virtualización: solo se dibujan las filas que se ven (más un margen), aunque la lista tenga 10.000.
export default function App() {
  const [scroll, setScroll] = useState(0)
  const inicio = Math.floor(scroll / ALTO)
  const visibles = tareas.slice(inicio, inicio + VISIBLES + 2)

  return (
    <div data-testid="contenedor" style={{ height: ALTO * VISIBLES, overflowY: 'auto' }}
      onScroll={evento => setScroll(evento.currentTarget.scrollTop)}>
      <ul role="list" style={{ height: tareas.length * ALTO, position: 'relative', margin: 0, padding: 0 }}>
        {visibles.map((tarea, i) =>
          <li key={tarea} style={{ position: 'absolute', top: (inicio + i) * ALTO, height: ALTO, listStyle: 'none' }}>{tarea}</li>)}
      </ul>
    </div>
  )
}
