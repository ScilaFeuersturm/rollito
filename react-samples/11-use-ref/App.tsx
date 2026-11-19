import { useRef, useState } from 'react'

export default function App() {
  const campo = useRef<HTMLInputElement>(null)
  const clics = useRef(0)
  const [titulo, setTitulo] = useState('')

  function enfocar() {
    campo.current?.focus()
    // Cambiar una ref no vuelve a dibujar el componente.
    clics.current += 1
  }

  return (
    <main>
      <input ref={campo} aria-label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <button onClick={enfocar}>Escribir una tarea</button>
      <button onClick={() => alert(`Enfocaste el campo ${clics.current} veces`)}>¿Cuántas veces?</button>
    </main>
  )
}
