import { androidRoadmap } from '../content/android/roadmap'
import { audioTopics, hasAudio } from '../content/audio'
import { lessons } from '../content/lessons'
import type { Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { lessonPath, repasoPath } from './routes'

export function Home({ progress }: { progress: Progress }) {
  const architecture = lessons.filter(hasAudio)
  const androidLessons = lessons.filter(item => item.track === 'android')
  const androidCompleted = androidLessons.filter(item => Object.hasOwn(progress, item.id)).length

  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Aprendé programación paso a paso</h1>
      <p>Android moderno de Junior a Senior y la arquitectura que te preguntan en las entrevistas, con ejercicios que podés llevar a tu propia máquina.</p>
    </section>
    <section aria-labelledby="track">
      <h2 id="track">Android moderno</h2>
      <p>{androidCompleted} de {androidLessons.length} {androidLessons.length === 1 ? 'lección disponible completada' : 'lecciones disponibles completadas'}</p>
      <div className={styles.roadmap}>
        {androidRoadmap.map(level => {
          const available = lessons.filter(item => item.track === 'android' && item.nivel === level.level)
          return <section className={styles.level} key={level.level} aria-labelledby={level.level}>
            <h3 id={level.level}>{level.title}</h3>
            <p>{level.description}</p>
            <ul className={styles.topics}>
              {level.topics.map(topic => <li key={topic}>{topic}</li>)}
            </ul>
            {available.length > 0 ? <ul className={styles.lessons}>
              {available.map(item => <li key={item.id}>
                <Link href={lessonPath(item.id)}>
                  <strong>{item.titulo}</strong>
                  <span>{Object.hasOwn(progress, item.id) ? 'Completada · ' : ''}{item.duracion_min} min</span>
                </Link>
              </li>)}
            </ul> : <p className={styles.pending}>Lecciones en preparación</p>}
          </section>
        })}
      </div>
    </section>
    <section aria-labelledby="architecture">
      <h2 id="architecture">Arquitectura</h2>
      <div className={styles.level}>
        <p>Los temas que más se preguntan en entrevistas, con la respuesta en 30 segundos, la pregunta trampa y cuándo no conviene cada uno.</p>
        <ul className={styles.topics}>
          {audioTopics.map(topic => <li key={topic}>{topic}</li>)}
        </ul>
        <ul className={styles.lessons}>
          {architecture.map(item => <li key={item.id}>
            <Link href={lessonPath(item.id)}>
              <strong>{item.titulo}</strong>
              <span>{Object.hasOwn(progress, item.id) ? 'Completada · ' : ''}{item.duracion_min} min</span>
            </Link>
          </li>)}
        </ul>
        <p><Link href={repasoPath}>Escuchá el repaso de Arquitectura →</Link></p>
      </div>
    </section>
  </>
}
