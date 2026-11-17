import { useId, useMemo, type ReactNode } from 'react'
import { toSegments, type Track } from '../../audio/speech'
import { useSpeech } from '../../audio/useSpeech'
import { inline } from '../inline'
import styles from './AudioPlayer.module.css'

const rates = [0.75, 1, 1.25, 1.5]

export function AudioPlayer({ tracks, showTitles = false, renderTitle }: {
  tracks: Track[]
  /** En la página de repaso se muestra cada título; en una lección, no hace falta. */
  showTitles?: boolean
  renderTitle?: (track: Track) => ReactNode
}) {
  const segments = useMemo(() => toSegments(tracks), [tracks])
  const speech = useSpeech(segments)
  const rateId = useId()
  const active = speech.current >= 0 ? segments[speech.current] : undefined
  const firstSegmentOf = (trackIndex: number) => segments.findIndex(segment => segment.track === trackIndex)

  return <div className={styles.player}>
    {speech.supported ? <div className={styles.controls}>
      {speech.status === 'idle' && <button className={styles.main} onClick={() => speech.playFrom(0)}>
        <span aria-hidden="true">▶</span> {tracks.length > 1 ? 'Escuchar todo' : 'Escuchar'}
      </button>}
      {speech.status === 'playing' && <button className={styles.main} onClick={speech.pause}>
        <span aria-hidden="true">❚❚</span> Pausar
      </button>}
      {speech.status === 'paused' && <button className={styles.main} onClick={speech.resume}>
        <span aria-hidden="true">▶</span> Seguir
      </button>}
      {speech.status !== 'idle' && <button className={styles.secondary} onClick={speech.stop}>Detener</button>}
      <label className={styles.rate} htmlFor={rateId}>
        Velocidad
        <select id={rateId} value={speech.rate} onChange={event => speech.changeRate(Number(event.target.value))}>
          {rates.map(rate => <option key={rate} value={rate}>{String(rate).replace('.', ',')}×</option>)}
        </select>
      </label>
    </div> : <p className={styles.note}>Tu navegador no puede leer en voz alta, pero podés repasar leyendo.</p>}
    {speech.failed && <p className={styles.note} role="status">No pudimos reproducir el audio en este dispositivo. Probá de nuevo o repasá leyendo.</p>}

    {tracks.map((track, trackIndex) => <section key={track.id} className={styles.track}
      aria-current={active?.track === trackIndex ? 'true' : undefined}>
      {showTitles && <div className={styles.trackHead}>
        <h2>{renderTitle ? renderTitle(track) : track.title}</h2>
        {speech.supported && <button className={styles.secondary} onClick={() => speech.playFrom(firstSegmentOf(trackIndex))}
          aria-label={`Escuchar desde ${track.title}`}>▶</button>}
      </div>}
      <ul>
        {track.lines.map((line, lineIndex) => <li key={lineIndex}
          className={active?.track === trackIndex && active.line === lineIndex ? styles.speaking : undefined}>
          {inline(line)}
        </li>)}
      </ul>
    </section>)}
  </div>
}
