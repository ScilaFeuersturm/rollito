import { useEffect, useState } from 'react'
import type { Cuenta, Invitacion, Miembro } from '../cuenta/servicio'
import { mensajeDeError } from '../cuenta/errores'
import { streak, xpPerLesson, type Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { cuentaPath } from './routes'

const servicio = () => import('../cuenta/servicio')

type Datos = { miembros: Miembro[]; progreso: Record<string, Progress>; invitaciones: Invitacion[] }

export function Admin({ cuenta }: { cuenta: Cuenta | null | undefined }) {
  const [datos, setDatos] = useState<Datos | null>(null)
  const [error, setError] = useState('')
  const [nuevo, setNuevo] = useState('')
  const [max, setMax] = useState(10)

  async function cargar() {
    try {
      const s = await servicio()
      setMax(s.MAX_MIEMBROS)
      setDatos(await s.datosAdmin())
      setError('')
    } catch (e) {
      setError(mensajeDeError(e))
    }
  }

  useEffect(() => { if (cuenta?.admin) void cargar() }, [cuenta?.admin])

  if (cuenta === undefined) return <section className={styles.hero}><h1 tabIndex={-1}>Administración</h1><p>Cargando…</p></section>
  if (!cuenta?.admin) return <section className={styles.hero}>
    <h1 tabIndex={-1}>Administración</h1>
    <p>Esta página es solo para la admin de Taller Fichín. <Link href={cuentaPath}>Ir a tu cuenta</Link>.</p>
  </section>

  async function accion(hacer: () => Promise<void>) {
    try { await hacer(); await cargar() } catch (e) { setError(mensajeDeError(e)) }
  }

  const disponibles = datos?.invitaciones.filter(i => !i.usada) ?? []
  const ocupados = (datos?.miembros.length ?? 0) + disponibles.length
  const nombre = (uid: string | null) => datos?.miembros.find(m => m.uid === uid)?.nombre ?? 'cuenta sin acceso'

  return <section>
    <div className={styles.hero}>
      <h1 tabIndex={-1}>Administración</h1>
      <p>{datos ? `${datos.miembros.length} miembros y ${disponibles.length} invitaciones sin usar, de ${max} lugares.` : 'Cargando…'}</p>
      {error && <p role="alert">{error}</p>}
    </div>

    {datos && <section className={styles.task}>
      <h2>Progreso</h2>
      <table>
        <thead><tr><th>Miembro</th><th>Lecciones</th><th>XP</th><th>Racha</th><th>Última</th><th></th></tr></thead>
        <tbody>{datos.miembros.map(miembro => {
          const progreso = datos.progreso[miembro.uid] ?? {}
          const fechas = Object.values(progreso).sort()
          const lecciones = fechas.length
          return <tr key={miembro.uid}>
            <td>{miembro.nombre}<br /><small>{miembro.email}</small></td>
            <td>{lecciones}</td>
            <td>{lecciones * xpPerLesson}</td>
            <td>{streak(progreso)}</td>
            <td>{fechas.at(-1) ?? '—'}</td>
            <td>{miembro.uid !== cuenta.uid && <button type="button" onClick={() => {
              if (confirm(`¿Quitarle el acceso a ${miembro.nombre}? Su progreso queda guardado, pero no puede seguir sumando.`)) {
                void accion(async () => (await servicio()).quitarAcceso(miembro.uid))
              }
            }}>Quitar acceso</button>}</td>
          </tr>
        })}</tbody>
      </table>
    </section>}

    {datos && <section className={styles.task}>
      <h2>Invitaciones</h2>
      <p>Cada código sirve una sola vez. Pasáselo a la persona por un canal privado.</p>
      <p><button type="button" className={styles.primary} disabled={ocupados >= max} onClick={() => void accion(async () => {
        setNuevo(await (await servicio()).crearInvitacion())
      })}>Generar código</button>{ocupados >= max && ' No quedan lugares.'}</p>
      {nuevo && <p role="status">Código nuevo: <code>{nuevo}</code>{' '}
        <button type="button" onClick={() => void navigator.clipboard?.writeText(nuevo)}>Copiar</button></p>}
      <table>
        <thead><tr><th>Código</th><th>Estado</th><th></th></tr></thead>
        <tbody>{datos.invitaciones.map(inv => <tr key={inv.codigo}>
          <td><code>{inv.codigo}</code></td>
          <td>{inv.usada ? `Usada por ${nombre(inv.usadaPor)}` : 'Disponible'}</td>
          <td>{!inv.usada && <button type="button" onClick={() => void accion(async () => (await servicio()).borrarInvitacion(inv.codigo))}>Borrar</button>}</td>
        </tr>)}</tbody>
      </table>
    </section>}
  </section>
}
