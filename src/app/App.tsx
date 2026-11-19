import { useEffect, useRef, useState } from 'react'
import { lessons } from '../content/lessons'
import type { Cuenta as DatosCuenta } from '../cuenta/servicio'
import { combinar, iguales } from '../cuenta/combinar'
import { localDay, readProgress, saveProgress, streak, xpPerLesson, type Progress } from '../progress/progress'
import styles from './App.module.css'
import { Admin } from './Admin'
import { Cuenta } from './Cuenta'
import { Home } from './Home'
import { Landing, SoloMiembros } from './Landing'
import { CodePractice } from './CodePractice'
import { InterviewPractice } from './InterviewPractice'
import { LessonPage } from './LessonPage'
import { Privado } from './Privado'
import { Repaso } from './Repaso'
import { interviewPractice } from '../content/android/interview-practice'
import { flashcards } from '../content/android/flashcards'
import { katas, katasIntro } from '../content/android/katas'
import { reactInterview } from '../content/react/interview-practice'
import { reactKatas } from '../content/react/katas'
import { functionalInterview } from '../content/funcional/interview-practice'
import { Link, usePathname } from './router'
import { cuentaPath, homePath, interviewPath, matchRoute, pageTitle, reactInterviewPath, repasoPath } from './routes'

// Marca local de "en este navegador hay una sesión": así Firebase solo se descarga si hace falta.
const marcaDeSesion = 'rollito.sesion'
function haySesion() {
  try { return localStorage.getItem(marcaDeSesion) === '1' } catch { return false }
}
function marcarSesion(activa: boolean) {
  try { if (activa) localStorage.setItem(marcaDeSesion, '1'); else localStorage.removeItem(marcaDeSesion) } catch { /* sin almacenamiento */ }
}

const servicio = () => import('../cuenta/servicio')

// Rutas que solo ven los miembros. La landing, la cuenta y el 404 son públicas; admin se controla adentro.
const rutasDeContenido = new Set(['flashcards', 'simulacro-react', 'practica-react', 'leccion', 'repaso', 'repaso-funcional', 'simulacro', 'simulacro-funcional', 'practica', 'privado'])
const esContenido = (nombre: string) => rutasDeContenido.has(nombre)

function Cargando() {
  return <section className={styles.hero}><h1 tabIndex={-1}>Rollito</h1><p>Cargando…</p></section>
}

export function App({ url }: { url: string }) {
  const pathname = usePathname(url)
  const route = matchRoute(pathname)
  // El servidor no tiene localStorage: arrancamos vacío en los dos lados para que el HTML
  // prerenderizado coincida con el primer render del cliente, y recién después leemos el progreso.
  const [progress, setProgress] = useState<Progress>({})
  const [storageWarning, setStorageWarning] = useState(false)
  const [syncWarning, setSyncWarning] = useState(false)
  // undefined: todavía no sabemos; null: sin sesión.
  const [cuenta, setCuenta] = useState<DatosCuenta | null | undefined>(undefined)
  const [necesitaCuenta, setNecesitaCuenta] = useState(false)
  // Hay una marca de sesión en este navegador: mientras confirmamos, mostramos "Cargando" en vez de la landing.
  const [sesionProbable, setSesionProbable] = useState(false)
  const esMiembro = cuenta?.miembro === true
  const firstRender = useRef(true)
  const completed = lessons.filter(item => Object.hasOwn(progress, item.id)).length
  const days = streak(progress)

  useEffect(() => setProgress(readProgress()), [])

  // Firebase se descarga solo si hay (o puede haber) una sesión. Sin marca de sesión, ya sabemos que no hay cuenta.
  useEffect(() => {
    if (necesitaCuenta) return
    if (route.name === 'cuenta' || route.name === 'admin' || haySesion()) {
      setSesionProbable(haySesion())
      setNecesitaCuenta(true)
    } else {
      setCuenta(null)
    }
  }, [route.name, necesitaCuenta])

  useEffect(() => {
    if (!necesitaCuenta) return
    let activo = true
    let dejar: (() => void) | undefined
    void servicio().then(s => {
      if (!activo) return
      dejar = s.observarCuenta(nueva => {
        marcarSesion(nueva !== null)
        setCuenta(nueva)
      })
    })
    return () => { activo = false; dejar?.() }
  }, [necesitaCuenta])

  // Al entrar con una cuenta de miembro: se une el progreso del navegador con el de la nube.
  useEffect(() => {
    if (!cuenta?.miembro) return
    let activo = true
    const uid = cuenta.uid
    void servicio().then(async s => {
      const remoto = await s.leerProgreso(uid)
      if (!activo) return
      const todo = combinar(readProgress(), remoto)
      saveProgress(todo)
      setProgress(todo)
      if (!iguales(todo, remoto)) await s.guardarProgreso(uid, todo)
      setSyncWarning(false)
    }).catch(() => { if (activo) setSyncWarning(true) })
    return () => { activo = false }
  }, [cuenta?.uid, cuenta?.miembro])

  useEffect(() => {
    document.title = pageTitle(route)
    // Al cambiar de página, llevamos el foco al título para que el lector de pantalla lo anuncie.
    if (firstRender.current) firstRender.current = false
    else document.querySelector('h1')?.focus()
  }, [pathname])

  function complete(id: string) {
    const latest = { ...readProgress(), ...progress }
    if (Object.hasOwn(latest, id)) return
    const next: Progress = { ...latest, [id]: localDay() }
    setProgress(next)
    setStorageWarning(!saveProgress(next))
    if (cuenta?.miembro) {
      const uid = cuenta.uid
      void servicio().then(s => s.guardarProgreso(uid, next)).then(() => setSyncWarning(false), () => setSyncWarning(true))
    }
  }

  // Al salir se borra el progreso de este navegador (queda guardado en la cuenta), por si es un dispositivo compartido.
  async function salir() {
    await (await servicio()).salir()
    saveProgress({})
    setProgress({})
  }

  return <>
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.brand} href={homePath}>Rollito<span aria-hidden="true">.</span></Link>
        <nav aria-label="Principal">
          {esMiembro && <><Link className={styles.navLink} href={repasoPath}
            aria-current={route.name === 'repaso' ? 'page' : undefined}>Repaso</Link>{' '}</>}
          <Link className={styles.navLink} href={cuentaPath}
            aria-current={route.name === 'cuenta' ? 'page' : undefined}>{cuenta?.nombre ?? 'Entrar'}</Link>
        </nav>
        {esMiembro && <div className={styles.stats} aria-label="Tu progreso">
          <span>{completed * xpPerLesson} XP</span>
          <span>Racha · {days} {days === 1 ? 'día' : 'días'}</span>
        </div>}
      </div>
    </header>
    <main className={styles.main}>
      {storageWarning && <p role="status">El navegador no pudo guardar tu progreso. Se conserva mientras esta página siga abierta.</p>}
      {syncWarning && <p role="status">No se pudo sincronizar tu progreso con la cuenta. Queda guardado en este navegador y se vuelve a intentar la próxima vez.</p>}
      {route.name === 'inicio' && (esMiembro ? <Home progress={progress} />
        : cuenta === undefined && sesionProbable ? <Cargando /> : <Landing />)}
      {esContenido(route.name) && !esMiembro && (cuenta === undefined ? <Cargando /> : <SoloMiembros volver={pathname} />)}
      {esContenido(route.name) && esMiembro && <>
        {route.name === 'leccion' && <LessonPage key={route.lesson.id} lesson={route.lesson}
          completed={Object.hasOwn(progress, route.lesson.id)} onComplete={() => complete(route.lesson.id)} />}
        {route.name === 'simulacro' && <InterviewPractice key={route.level.level} area="Android"
          title={`Simulacro ${route.level.title}`} questions={interviewPractice[route.level.level]} />}
        {route.name === 'flashcards' && <InterviewPractice area="Android" title="Ronda relámpago" questions={flashcards} />}
        {route.name === 'simulacro-funcional' && <InterviewPractice area="Análisis funcional"
          title="Simulacro Analista Funcional Trainee" questions={functionalInterview} />}
        {route.name === 'practica' && <CodePractice key={route.level.level} area="Android" titulo={`Práctica de código ${route.level.title}`}
          descripcion="Ejercicios de Kotlin como los de una entrevista en vivo." intro={katasIntro[route.level.level]}
          items={katas[route.level.level]} lenguaje="kotlin"
          siguiente={{ href: interviewPath(route.level.level), texto: `Seguí con el simulacro de entrevista ${route.level.title}` }} />}
        {route.name === 'simulacro-react' && <InterviewPractice key={route.level.level} area="React"
          title={`Simulacro ${route.level.title}`} questions={reactInterview[route.level.level as 'junior' | 'semi-senior']} />}
        {route.name === 'practica-react' && <CodePractice key={route.level.level} area="React" titulo={`Práctica de código ${route.level.title}`}
          descripcion="Ejercicios de React y TypeScript como los de una entrevista en vivo. Las soluciones tienen tests en react-samples/katas."
          items={reactKatas[route.level.level as 'junior' | 'semi-senior']} lenguaje="tsx"
          siguiente={{ href: reactInterviewPath(route.level.level), texto: `Seguí con el simulacro de entrevista ${route.level.title}` }} />}
        {route.name === 'repaso' && <Repaso progress={progress} />}
        {route.name === 'repaso-funcional' && <Repaso key="funcional" kind="funcional" progress={progress} />}
        {route.name === 'privado' && <Privado />}
      </>}
      {route.name === 'cuenta' && <Cuenta cuenta={cuenta} completadas={completed} alCambiarCuenta={setCuenta} alSalir={salir} />}
      {route.name === 'admin' && <Admin cuenta={cuenta} />}
      {route.name === 'no-encontrada' && <section className={styles.hero}>
        <h1 tabIndex={-1}>No encontramos esa página</h1>
        <p>Puede que la dirección haya cambiado. <Link href={homePath}>Volvé al recorrido</Link>.</p>
      </section>}
    </main>
  </>
}
