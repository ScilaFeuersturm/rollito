import styles from './App.module.css'
import { Link } from './router'
import { cuentaPath } from './routes'

export function Contacto() {
  return <p>Si sos del equipo y todavía no tenés cuenta, pedile acceso a Aramis.</p>
}

// Landing pública: no cuenta qué contenido hay adentro, solo para quién es y cómo pedir acceso.
export function Landing() {
  return <section className={styles.hero}>
    <h1 tabIndex={-1}>Rollito</h1>
    <p>Rollito es una plataforma educativa que, por ahora, está limitada al equipo de <strong>Taller Fichín</strong>.</p>
    <Contacto />
    <p><Link className={`${styles.primary} ${styles.cta}`} href={cuentaPath}>Entrar</Link></p>
  </section>
}

// Lo que ve quien llega a un contenido sin haber entrado.
export function SoloMiembros({ volver }: { volver: string }) {
  return <section className={styles.hero}>
    <h1 tabIndex={-1}>Acceso restringido</h1>
    <p>Por ahora, Rollito está limitado al equipo de Taller Fichín. Entrá con tu cuenta para ver este contenido.</p>
    <Contacto />
    <p><Link className={`${styles.primary} ${styles.cta}`} href={`${cuentaPath}?volver=${encodeURIComponent(volver)}`}>Entrar</Link></p>
  </section>
}
