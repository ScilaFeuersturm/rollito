import { useState, type FormEvent } from 'react'

type Tarea = { id: number; titulo: string }

// Kata: lista de tareas con agregar y borrar. El clásico del código en vivo.
export default function ListaDeTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [titulo, setTitulo] = useState('')

  function agregar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpio = titulo.trim()
    if (!limpio) return
    setTareas(actuales => [...actuales, { id: Date.now() + actuales.length, titulo: limpio }])
    setTitulo('')
  }

  return (
    <main>
      <form onSubmit={agregar}>
        <label htmlFor="titulo">Nueva tarea</label>
        <input id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>
      {tareas.length === 0 && <p>No hay tareas</p>}
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            {t.titulo}
            <button onClick={() => setTareas(actuales => actuales.filter(x => x.id !== t.id))}
              aria-label={`Borrar ${t.titulo}`}>Borrar</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
