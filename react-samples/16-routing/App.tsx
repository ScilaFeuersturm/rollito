import { Link, MemoryRouter, Route, Routes, useParams } from 'react-router'

const tareas = [
  { id: '1', titulo: 'Comprar yerba' },
  { id: '2', titulo: 'Pagar la luz' },
]

function Lista() {
  return (
    <ul>
      {tareas.map(t => <li key={t.id}><Link to={`/tareas/${t.id}`}>{t.titulo}</Link></li>)}
    </ul>
  )
}

function Detalle() {
  const { id } = useParams()
  const tarea = tareas.find(t => t.id === id)
  if (!tarea) return <p>No encontramos esa tarea</p>
  return (
    <>
      <h1>{tarea.titulo}</h1>
      <Link to="/">Volver</Link>
    </>
  )
}

export default function App() {
  // En una app real se usa BrowserRouter (o un router de datos). MemoryRouter guarda la
  // dirección en memoria, cómodo para ejemplos y tests.
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/tareas/:id" element={<Detalle />} />
      </Routes>
    </MemoryRouter>
  )
}
