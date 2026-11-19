// Paso 4: las rutas. En los tests se usan con MemoryRouter; en la app, con BrowserRouter.
import { BrowserRouter, Route, Routes } from 'react-router'
import { DetalleTarea, ListaTareas } from './Pantallas'

export function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<ListaTareas />} />
      <Route path="/tareas/:id" element={<DetalleTarea />} />
      <Route path="*" element={<p>No encontramos esa página.</p>} />
    </Routes>
  )
}

export default function App() {
  return <BrowserRouter><main><Rutas /></main></BrowserRouter>
}
