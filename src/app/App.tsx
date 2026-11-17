import { useEffect, useRef, useState } from 'react'
import { lessons } from '../content/lessons'
import { localDay, readProgress, saveProgress, streak, xpPerLesson, type Progress } from '../progress/progress'
import styles from './App.module.css'
import { Home } from './Home'
import { LessonPage } from './LessonPage'
import { Repaso } from './Repaso'
import { Link, usePathname } from './router'
import { homePath, matchRoute, pageTitle, repasoPath } from './routes'

export function App({ url }: { url: string }) {
  const pathname = usePathname(url)
  const route = matchRoute(pathname)
  // El servidor no tiene localStorage: arrancamos vacío en los dos lados para que el HTML
  // prerenderizado coincida con el primer render del cliente, y recién después leemos el progreso.
  const [progress, setProgress] = useState<Progress>({})
  const [storageWarning, setStorageWarning] = useState(false)
  const firstRender = useRef(true)
  const completed = lessons.filter(item => Object.hasOwn(progress, item.id)).length
  const days = streak(progress)

  useEffect(() => setProgress(readProgress()), [])

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
  }

  return <>
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.brand} href={homePath}>Rollito<span aria-hidden="true">.</span></Link>
        <nav aria-label="Principal">
          <Link className={styles.navLink} href={repasoPath}
            aria-current={route.name === 'repaso' ? 'page' : undefined}>Repaso</Link>
        </nav>
        <div className={styles.stats} aria-label="Tu progreso">
          <span>{completed * xpPerLesson} XP</span>
          <span>Racha · {days} {days === 1 ? 'día' : 'días'}</span>
        </div>
      </div>
    </header>
    <main className={styles.main}>
      {storageWarning && <p role="status">El navegador no pudo guardar tu progreso. Se conserva mientras esta página siga abierta.</p>}
      {route.name === 'leccion' && <LessonPage key={route.lesson.id} lesson={route.lesson}
        completed={Object.hasOwn(progress, route.lesson.id)} onComplete={() => complete(route.lesson.id)} />}
      {route.name === 'inicio' && <Home progress={progress} />}
      {route.name === 'repaso' && <Repaso progress={progress} />}
      {route.name === 'no-encontrada' && <section className={styles.hero}>
        <h1 tabIndex={-1}>No encontramos esa página</h1>
        <p>Puede que la dirección haya cambiado. <Link href={homePath}>Volvé al recorrido</Link>.</p>
      </section>}
    </main>
  </>
}
