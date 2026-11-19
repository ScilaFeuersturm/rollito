import { useId, useRef, useState, type FormEvent } from 'react'

export default function App() {
  const [tareas, setTareas] = useState<string[]>([])
  const [titulo, setTitulo] = useState('')
  const [error, setError] = useState('')
  const [anuncio, setAnuncio] = useState('')
  const campo = useRef<HTMLInputElement>(null)
  const idError = useId()

  function agregar(evento: FormEvent) {
    evento.preventDefault()
    if (!titulo.trim()) {
      setError('Escribí un título')
      campo.current?.focus() // el foco va al campo con el error
      return
    }
    setTareas([...tareas, titulo.trim()])
    setTitulo('')
    setError('')
    setAnuncio(`Tarea agregada: ${titulo.trim()}`) // lo lee el lector de pantalla
    campo.current?.focus() // listo para escribir la siguiente
  }

  return (
    <main>
      <form onSubmit={agregar} noValidate>
        <label htmlFor="titulo">Nueva tarea</label>
        <input id="titulo" ref={campo} value={titulo} onChange={evento => setTitulo(evento.target.value)}
          aria-invalid={error ? true : undefined} aria-describedby={error ? idError : undefined} />
        {error && <p id={idError}>{error}</p>}
        <button>Agregar</button>
      </form>
      <p role="status">{anuncio}</p>
      <ul>{tareas.map(tarea => <li key={tarea}>{tarea}</li>)}</ul>
    </main>
  )
}
