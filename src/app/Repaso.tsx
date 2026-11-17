import { useMemo } from 'react'
import type { Track } from '../audio/speech'
import { AudioPlayer } from '../components/audio/AudioPlayer'
import { audioTopics, hasAudio } from '../content/audio'
import { lessons } from '../content/lessons'
import type { Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { lessonPath } from './routes'

export function Repaso({ progress }: { progress: Progress }) {
  const tracks: Track[] = useMemo(() => lessons.filter(hasAudio).map(lesson => ({
    id: lesson.id, title: lesson.titulo, lines: lesson.resumen,
  })), [])

  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Repaso de Arquitectura</h1>
      <p>Las ideas clave de POO y de cada arquitectura, para leer o escuchar como un podcast corto. Ideal para repasar en el colectivo.</p>
    </section>
    {tracks.length > 0 ? <AudioPlayer tracks={tracks} showTitles renderTitle={track => <>
      <Link href={lessonPath(track.id)}>{track.title}</Link>
      {Object.hasOwn(progress, track.id) && <span className={styles.badge}>Completada</span>}
    </>} /> : <section aria-labelledby="soon">
      <h2 id="soon">En preparación</h2>
      <p>Cuando estén las lecciones, vas a poder escuchar el repaso de estos temas:</p>
      <ul className={styles.topics}>
        {audioTopics.map(topic => <li key={topic}>{topic}</li>)}
      </ul>
    </section>}
  </>
}
