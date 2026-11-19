// Pasos 3 y 4: la lista con sus cuatro estados y el detalle con el id de la URL.
import { Link, useParams } from 'react-router'
import { mensaje, obtenerTarea, obtenerTareas, type Falla } from './api'
import { useRecurso } from './useRecurso'

function ErrorConReintento({ falla, reintentar }: { falla: Falla; reintentar: () => void }) {
  return <div role="alert">{mensaje(falla)} <button onClick={reintentar}>Reintentar</button></div>
}

export function ListaTareas() {
  const { estado, reintentar } = useRecurso(obtenerTareas, [])

  switch (estado.tipo) {
    case 'cargando': return <p role="status">Cargando tareas…</p>
    case 'error': return <ErrorConReintento falla={estado.falla} reintentar={reintentar} />
    case 'listo':
      if (estado.datos.length === 0) return <p>No hay tareas todavía.</p>
      return (
        <ul>
          {estado.datos.map(tarea => (
            <li key={tarea.id}>
              <Link to={`/tareas/${tarea.id}`}>{tarea.titulo}</Link> {tarea.completada ? '(completada)' : ''}
            </li>
          ))}
        </ul>
      )
  }
}

export function DetalleTarea() {
  const id = Number(useParams().id) // los parámetros de la URL llegan como texto
  const { estado, reintentar } = useRecurso(signal => obtenerTarea(id, signal), [id])

  if (!Number.isInteger(id)) return <p>No encontramos esa tarea.</p>
  if (estado.tipo === 'cargando') return <p role="status">Cargando tarea…</p>
  if (estado.tipo === 'error') {
    return estado.falla.tipo === 'cliente' && estado.falla.codigo === 404
      ? <p>No encontramos esa tarea.</p>
      : <ErrorConReintento falla={estado.falla} reintentar={reintentar} />
  }
  return (
    <article>
      <h1>{estado.datos.titulo}</h1>
      <p>{estado.datos.completada ? 'Completada' : 'Pendiente'}</p>
      <Link to="/">Volver</Link>
    </article>
  )
}
