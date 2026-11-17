import { useMemo } from 'react'
import type { Track } from '../audio/speech'
import { AudioPlayer } from '../components/audio/AudioPlayer'
import { lessons } from '../content/lessons'
import type { Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { lessonPath } from './routes'

export function Repaso({ progress }: { progress: Progress }) {
  const tracks: Track[] = useMemo(() => lessons.map(lesson => ({
    id: lesson.id, title: lesson.titulo, lines: lesson.resumen,
  })), [])

  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Repaso</h1>
      <p>Lo importante de cada lección, para leer o escuchar como un podcast corto. Ideal para repasar en el colectivo.</p>
    </section>
    <AudioPlayer tracks={tracks} showTitles renderTitle={track => <>
      <Link href={lessonPath(track.id)}>{track.title}</Link>
      {Object.hasOwn(progress, track.id) && <span className={styles.badge}>Completada</span>}
    </>} />
  </>
}
