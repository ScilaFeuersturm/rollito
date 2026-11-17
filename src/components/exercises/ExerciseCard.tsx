import { useId, useState } from 'react'
import type { Exercise } from '../../content/lesson-schema'
import { inline } from '../inline'
import styles from './ExerciseCard.module.css'

const plain = (text: string) => text.replace(/`/g, '')

export function ExerciseCard({ exercise, onSolved }: { exercise: Exercise; onSolved: () => void }) {
  const id = useId()
  const [choice, setChoice] = useState<number>()
  const [answer, setAnswer] = useState('')
  const [order, setOrder] = useState(() => exercise.tipo === 'ordenar'
    ? exercise.pasos.map((_, index) => index).reverse()
    : [])
  const [result, setResult] = useState<boolean>()
  const ready = exercise.tipo === 'opcion_multiple' ? choice !== undefined :
    exercise.tipo === 'completar' ? answer.trim().length > 0 : true

  function move(index: number, offset: number) {
    const next = [...order]
    const destination = index + offset
    ;[next[index], next[destination]] = [next[destination], next[index]]
    setOrder(next)
    setResult(undefined)
  }

  function check() {
    const correct = exercise.tipo === 'opcion_multiple' ? choice === exercise.correcta :
      exercise.tipo === 'completar' ? exercise.respuestas.includes(answer.trim()) :
      order.every((step, index) => step === index)
    setResult(correct)
    if (correct) onSolved()
  }

  return (
    <form className={styles.card} onSubmit={event => { event.preventDefault(); check() }}>
      <fieldset disabled={result === true}>
        <legend>{inline(exercise.pregunta)}</legend>
        {exercise.tipo === 'opcion_multiple' && exercise.opciones.map((option, index) =>
          <label className={styles.option} key={index}>
            <input type="radio" name={id} checked={choice === index}
              onChange={() => { setChoice(index); setResult(undefined) }} />
            {inline(option)}
          </label>
        )}
        {exercise.tipo === 'completar' && <>
          <pre><code>{exercise.codigo}</code></pre>
          <label htmlFor={id}>Tu respuesta</label>
          <input id={id} type="text" value={answer} autoComplete="off"
            onChange={event => { setAnswer(event.target.value); setResult(undefined) }} />
        </>}
        {exercise.tipo === 'ordenar' && <ol>
          {order.map((step, index) => <li key={step}>
            <span>{inline(exercise.pasos[step])}</span>
            <div className={styles.controls}>
              <button type="button" disabled={index === 0} aria-label={`Subir: ${plain(exercise.pasos[step])}`}
                onClick={() => move(index, -1)}>↑</button>
              <button type="button" disabled={index === order.length - 1} aria-label={`Bajar: ${plain(exercise.pasos[step])}`}
                onClick={() => move(index, 1)}>↓</button>
            </div>
          </li>)}
        </ol>}
      </fieldset>
      {result !== true && <button className={styles.check} disabled={!ready}>Verificar</button>}
      <div role="status">{result !== undefined && <p className={result ? styles.success : styles.retry}>
        <strong>{result ? '¡Bien!' : 'Casi. Mirá esto…'}</strong> {inline(exercise.explicacion)}
      </p>}</div>
    </form>
  )
}
