import { useState } from 'react'

export default function App() {
  const [tareas, setTareas] = useState<string[]>([])
  const [titulo, setTitulo] = useState('')

  return (
    <main>
      <label htmlFor="nueva">Nueva tarea</label>
      <input id="nueva" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <button disabled={titulo.trim() === ''}
        onClick={() => { setTareas([...tareas, titulo.trim()]); setTitulo('') }}>
        Agregar
      </button>
      <ul>{tareas.map(t => <li key={t}>{t}</li>)}</ul>
    </main>
  )
}
