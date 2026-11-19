import { useEffect, useState, type FormEvent } from 'react'
import type { Cuenta as DatosCuenta } from '../cuenta/servicio'
import { mensajeDeError } from '../cuenta/errores'
import styles from './App.module.css'
import { Contacto } from './Landing'
import { Link, navigate } from './router'
import { adminPath, privadoPath } from './routes'

const servicio = () => import('../cuenta/servicio')

// Adónde ir después de entrar: la página que pidió el login (?volver=) o la home. Solo rutas internas.
let destinoTrasEntrar: string | null = null
function recordarDestino() {
  const volver = new URLSearchParams(location.search).get('volver')
  destinoTrasEntrar = volver && volver.startsWith('/') && !volver.startsWith('//') && !volver.startsWith('/cuenta') ? volver : '/'
}

type Props = {
  cuenta: DatosCuenta | null | undefined
  completadas: number
  alCambiarCuenta: (cuenta: DatosCuenta | null) => void
  alSalir: () => Promise<void>
}

export function Cuenta({ cuenta, completadas, alCambiarCuenta, alSalir }: Props) {
  useEffect(() => {
    if (cuenta?.miembro && destinoTrasEntrar) {
      const destino = destinoTrasEntrar
      destinoTrasEntrar = null
      navigate(destino)
    }
  }, [cuenta?.miembro])
  if (cuenta === undefined) return <section className={styles.hero}><h1 tabIndex={-1}>Tu cuenta</h1><p>Cargando…</p></section>
  if (cuenta === null) return <SinSesion />
  if (!cuenta.miembro) return <SinInvitacion cuenta={cuenta} alCambiarCuenta={alCambiarCuenta} alSalir={alSalir} />
  return <section>
    <div className={styles.hero}>
      <h1 tabIndex={-1}>Hola, {cuenta.nombre}</h1>
      <p>Tu progreso se guarda en tu cuenta: {completadas} {completadas === 1 ? 'lección completada' : 'lecciones completadas'}. Lo ves igual en cualquier dispositivo donde entres.</p>
      {cuenta.admin && <p><Link href={adminPath}>Panel de administración</Link> · <Link href={privadoPath}>Material privado</Link></p>}
      <p><button type="button" className={styles.primary} onClick={() => void alSalir()}>Salir</button></p>
    </div>
    <CambiarClave />
  </section>
}

function useEnvio() {
  const [estado, setEstado] = useState<{ enviando: boolean; error: string; ok: string }>({ enviando: false, error: '', ok: '' })
  async function enviar(accion: () => Promise<string | void>) {
    setEstado({ enviando: true, error: '', ok: '' })
    try {
      const ok = await accion()
      setEstado({ enviando: false, error: '', ok: ok ?? '' })
    } catch (error) {
      setEstado({ enviando: false, error: mensajeDeError(error), ok: '' })
    }
  }
  return { ...estado, enviar }
}

const valor = (form: FormData, campo: string) => String(form.get(campo) ?? '')

function SinSesion() {
  const [modo, setModo] = useState<'entrar' | 'registrarme' | 'recuperar'>('entrar')
  const { enviando, error, ok, enviar } = useEnvio()

  function alEnviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    void enviar(async () => {
      const s = await servicio()
      if (modo !== 'recuperar') recordarDestino()
      if (modo === 'entrar') await s.entrar(valor(form, 'email'), valor(form, 'clave'))
      if (modo === 'registrarme') await s.registrar(valor(form, 'nombre'), valor(form, 'email'), valor(form, 'clave'), valor(form, 'codigo'))
      if (modo === 'recuperar') {
        await s.recuperar(valor(form, 'email'))
        return 'Si el mail está registrado, te llega un link para elegir una contraseña nueva. Revisá también el correo no deseado.'
      }
    })
  }

  return <section className={styles.hero}>
    <h1 tabIndex={-1}>Tu cuenta</h1>
    <p>Entrá con tu cuenta de Taller Fichín. Tu progreso se guarda en la cuenta y lo ves en cualquier dispositivo.</p>
    <p role="tablist" aria-label="Opciones de cuenta">
      {(['entrar', 'registrarme', 'recuperar'] as const).map(opcion =>
        <button key={opcion} type="button" role="tab" aria-selected={modo === opcion} className={styles.navLink}
          onClick={() => setModo(opcion)} style={{ background: 'none', border: 0, cursor: 'pointer', textDecoration: modo === opcion ? 'underline' : 'none' }}>
          {opcion === 'entrar' ? 'Entrar' : opcion === 'registrarme' ? 'Tengo un código' : 'Olvidé mi contraseña'}
        </button>)}
    </p>
    <form className={styles.form} onSubmit={alEnviar} key={modo}>
      {modo === 'registrarme' && <>
        <label>Código de invitación<input name="codigo" autoCapitalize="none" spellCheck={false} required /></label>
        <label>Nombre<input name="nombre" autoComplete="name" maxLength={60} required /></label>
      </>}
      <label>Mail<input name="email" type="email" autoComplete="email" required /></label>
      {modo !== 'recuperar' && <label>Contraseña
        <input name="clave" type="password" minLength={modo === 'registrarme' ? 8 : undefined}
          autoComplete={modo === 'registrarme' ? 'new-password' : 'current-password'} required />
      </label>}
      <button className={styles.primary} disabled={enviando}>
        {enviando ? 'Un momento…' : modo === 'entrar' ? 'Entrar' : modo === 'registrarme' ? 'Crear mi cuenta' : 'Mandarme el link'}
      </button>
    </form>
    {error && <p role="alert">{error}</p>}
    {ok && <p role="status">{ok}</p>}
    <Contacto />
  </section>
}

function SinInvitacion({ cuenta, alCambiarCuenta, alSalir }: { cuenta: DatosCuenta; alCambiarCuenta: Props['alCambiarCuenta']; alSalir: Props['alSalir'] }) {
  const { enviando, error, enviar } = useEnvio()
  function alEnviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    void enviar(async () => {
      const s = await servicio()
      recordarDestino()
      await s.canjear(valor(form, 'nombre'), valor(form, 'codigo'))
      alCambiarCuenta(await s.refrescarCuenta())
    })
  }
  return <section className={styles.hero}>
    <h1 tabIndex={-1}>Falta tu invitación</h1>
    <p>Entraste como {cuenta.email}, pero tu cuenta todavía no tiene acceso. Si sos de Taller Fichín, pedile un código de invitación a Aramis.</p>
    <form className={styles.form} onSubmit={alEnviar}>
      <label>Código de invitación<input name="codigo" autoCapitalize="none" spellCheck={false} required /></label>
      <label>Nombre<input name="nombre" autoComplete="name" maxLength={60} required /></label>
      <button className={styles.primary} disabled={enviando}>{enviando ? 'Un momento…' : 'Usar el código'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
    <p><button type="button" className={styles.navLink} style={{ background: 'none', border: 0, cursor: 'pointer' }} onClick={() => void alSalir()}>Salir</button></p>
  </section>
}

function CambiarClave() {
  const { enviando, error, ok, enviar } = useEnvio()
  function alEnviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formulario = event.currentTarget
    const form = new FormData(formulario)
    void enviar(async () => {
      if (valor(form, 'nueva') !== valor(form, 'repetida')) throw { code: 'claves-distintas' }
      const s = await servicio()
      await s.cambiarClave(valor(form, 'actual'), valor(form, 'nueva'))
      formulario.reset()
      return 'Listo: tu contraseña cambió.'
    })
  }
  return <section className={styles.task}>
    <h2>Cambiar la contraseña</h2>
    <form className={styles.form} onSubmit={alEnviar}>
      <label>Contraseña actual<input name="actual" type="password" autoComplete="current-password" required /></label>
      <label>Contraseña nueva<input name="nueva" type="password" autoComplete="new-password" minLength={8} required /></label>
      <label>Repetila<input name="repetida" type="password" autoComplete="new-password" minLength={8} required /></label>
      <button className={styles.primary} disabled={enviando}>{enviando ? 'Un momento…' : 'Cambiar'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
    {ok && <p role="status">{ok}</p>}
  </section>
}
