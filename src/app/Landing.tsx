import { androidSections, architectureSections, functionalLessons, reactSections } from '../content/lessons'
import styles from './App.module.css'
import { Link } from './router'
import { cuentaPath } from './routes'

const total = (secciones: readonly { lessons: readonly unknown[] }[]) => secciones.reduce((suma, s) => suma + s.lessons.length, 0)

const rutas = [
  { titulo: 'Arquitectura', lecciones: total(architectureSections), texto: 'POO, SOLID, patrones de diseño y arquitecturas, con preguntas de entrevista y repaso en audio.' },
  { titulo: 'Android', lecciones: total(androidSections), texto: 'Android moderno de Junior a Senior: Kotlin, Compose, corrutinas y Flow, Hilt, red, testing y rendimiento.' },
  { titulo: 'React', lecciones: total(reactSections), texto: 'Componentes, estado y hooks, con ejemplos que se editan en vivo.' },
  { titulo: 'Análisis funcional', lecciones: functionalLessons.length, texto: 'Relevamiento, requisitos, historias de usuario y criterios de aceptación, con repaso en audio.' },
]

export function Contacto() {
  return <p>¿No tenés cuenta? Contactate con Aramis.</p>
}

export function Landing() {
  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Rollito</h1>
      <p>La plataforma de contenido educativo de <strong>Taller Fichín</strong>.</p>
      <p>Lecciones cortas, de 4 a 7 minutos, para aprender y repasar tecnología a tu ritmo, con ejercicios, XP y racha.</p>
      <p><Link className={`${styles.primary} ${styles.cta}`} href={cuentaPath}>Entrar</Link></p>
      <Contacto />
    </section>

    <section aria-labelledby="que-hay">
      <h2 id="que-hay">Qué vas a encontrar</h2>
      <div className={styles.trackGrid}>
        {rutas.map(ruta => <section key={ruta.titulo} className={styles.trackCard}>
          <h3>{ruta.titulo}</h3>
          <p>{ruta.texto}</p>
          <p className={styles.meta}>{ruta.lecciones} lecciones</p>
        </section>)}
        <section className={styles.trackCard}>
          <h3>Para preparar entrevistas</h3>
          <p>Simulacros por nivel, práctica de código en vivo, code reviews de código generado por IA y un live coding guiado paso a paso.</p>
        </section>
      </div>
    </section>
  </>
}

// Lo que ve quien llega a un contenido sin haber entrado.
export function SoloMiembros({ volver }: { volver: string }) {
  return <section className={styles.hero}>
    <h1 tabIndex={-1}>Contenido para miembros</h1>
    <p>Este contenido es para miembros de Taller Fichín. Entrá con tu cuenta para verlo.</p>
    <p><Link className={`${styles.primary} ${styles.cta}`} href={`${cuentaPath}?volver=${encodeURIComponent(volver)}`}>Entrar</Link></p>
    <Contacto />
  </section>
}
