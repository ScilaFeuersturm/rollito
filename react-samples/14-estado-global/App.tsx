import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'

type Tarea = { id: number; titulo: string; hecha: boolean }
type Accion = { tipo: 'agregar'; titulo: string } | { tipo: 'alternar'; id: number }

// El reducer recibe el estado y una acción, y devuelve el estado nuevo. Es una función pura.
function tareasReducer(tareas: Tarea[], accion: Accion): Tarea[] {
  switch (accion.tipo) {
    case 'agregar':
      return [...tareas, { id: tareas.length + 1, titulo: accion.titulo, hecha: false }]
    case 'alternar':
      return tareas.map(t => (t.id === accion.id ? { ...t, hecha: !t.hecha } : t))
  }
}

const TareasContext = createContext<{ tareas: Tarea[]; despachar: Dispatch<Accion> } | null>(null)

function useTareasGlobales() {
  const valor = useContext(TareasContext)
  if (!valor) throw new Error('useTareasGlobales tiene que usarse dentro de ProveedorDeTareas')
  return valor
}

function ProveedorDeTareas({ children }: { children: ReactNode }) {
  const [tareas, despachar] = useReducer(tareasReducer, [{ id: 1, titulo: 'Comprar yerba', hecha: false }])
  return <TareasContext value={{ tareas, despachar }}>{children}</TareasContext>
}

function Contador() {
  const { tareas } = useTareasGlobales()
  return <p>Pendientes: {tareas.filter(t => !t.hecha).length}</p>
}

function Lista() {
  const { tareas, despachar } = useTareasGlobales()
  return (
    <>
      <button onClick={() => despachar({ tipo: 'agregar', titulo: 'Pagar la luz' })}>Agregar</button>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            <button onClick={() => despachar({ tipo: 'alternar', id: t.id })}>{t.hecha ? '✓' : '○'}</button> {t.titulo}
          </li>
        ))}
      </ul>
    </>
  )
}

export default function App() {
  return (
    <ProveedorDeTareas>
      <Contador />
      <Lista />
    </ProveedorDeTareas>
  )
}
