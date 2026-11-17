import type { Lesson } from '../../content/lessons'
import { inline } from '../inline'
import styles from './Interview.module.css'

const paragraphs = (text: string) => text.split(/\n\s*\n/).map((paragraph, index) =>
  <p key={index}>{inline(paragraph.trim())}</p>)

export function Interview({ interview }: { interview: NonNullable<Lesson['entrevista']> }) {
  return <section className={styles.interview} aria-labelledby="interview">
    <h2 id="interview">Cómo contarlo en una entrevista</h2>

    <h3>En 30 segundos</h3>
    <blockquote>{paragraphs(interview.en_30_segundos)}</blockquote>

    {interview.trampas.map((trap, index) => <div key={index}>
      <h3>{index === 0 ? 'La pregunta trampa' : 'Otra que suele aparecer'}: “{trap.pregunta}”</h3>
      {paragraphs(trap.respuesta)}
      {trap.codigoFuente && <pre><code className="language-kotlin">{trap.codigoFuente}</code></pre>}
      {trap.salida && <>
        <p>Imprime:</p>
        <pre><code>{trap.salida}</code></pre>
      </>}
      {trap.despues && paragraphs(trap.despues)}
    </div>)}

    <h3>Cuándo no la usarías</h3>
    {paragraphs(interview.cuando_no)}
  </section>
}
