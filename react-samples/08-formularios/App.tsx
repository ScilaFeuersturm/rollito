import { useState, type FormEvent } from 'react'

export default function App() {
  const [titulo, setTitulo] = useState('')
  const [tareas, setTareas] = useState<string[]>([])
  const [error, setError] = useState('')

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpio = titulo.trim()
    if (limpio === '') {
      setError('Escribí un título')
      return
    }
    setTareas([...tareas, limpio])
    setTitulo('')
    setError('')
  }

  return (
    <main>
      <form onSubmit={enviar}>
        <label htmlFor="titulo">Nueva tarea</label>
        <input id="titulo" value={titulo} onChange={evento => setTitulo(evento.target.value)} />
        <button type="submit">Agregar</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <ul>
        {tareas.map(tarea => <li key={tarea}>{tarea}</li>)}
      </ul>
    </main>
  )
}
