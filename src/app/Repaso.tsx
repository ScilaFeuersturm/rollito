import type { Track } from '../audio/speech'
import { AudioPlayer } from '../components/audio/AudioPlayer'
import { audioTopics } from '../content/audio'
import { architectureSections } from '../content/lessons'
import type { Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { lessonPath } from './routes'

const tracks: Track[] = architectureSections.flatMap(section => section.lessons.map(lesson => ({
  id: lesson.id, title: lesson.titulo, lines: lesson.resumen,
})))

export function Repaso({ progress }: { progress: Progress }) {

  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Repaso de Arquitectura</h1>
      <p>Leé o escuchá las ideas clave de las lecciones de Arquitectura, con preguntas para repasar en voz alta.</p>
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
