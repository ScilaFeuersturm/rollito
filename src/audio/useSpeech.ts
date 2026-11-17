import { useEffect, useRef, useState } from 'react'
import { pickVoice, type Segment } from './speech'

export type SpeechStatus = 'idle' | 'playing' | 'paused'

/**
 * Lee una lista de frases con la Web Speech API (la voz que ya trae el dispositivo).
 *
 * Decisiones:
 * - Se encolan todas las frases dentro del mismo clic: iOS solo permite hablar en respuesta a un gesto.
 * - Pausar cancela y recuerda la frase actual. `speechSynthesis.pause()` no es confiable en Android.
 * - `generation` descarta eventos de locuciones canceladas, que algunos navegadores igual disparan.
 */
export function useSpeech(segments: Segment[]) {
  const [supported, setSupported] = useState(true)
  const [status, setStatus] = useState<SpeechStatus>('idle')
  const [current, setCurrent] = useState(-1)
  const [rate, setRate] = useState(1)
  const [failed, setFailed] = useState(false)
  const voice = useRef<SpeechSynthesisVoice | undefined>(undefined)
  const generation = useRef(0)

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false)
      return
    }
    // Las voces pueden cargarse tarde: Chrome avisa con "voiceschanged".
    const loadVoice = () => { voice.current = pickVoice(speechSynthesis.getVoices()) }
    loadVoice()
    speechSynthesis.addEventListener('voiceschanged', loadVoice)
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoice)
      generation.current += 1
      speechSynthesis.cancel()
    }
  }, [])

  function playFrom(from: number, speed = rate) {
    if (!supported || segments.length === 0) return
    const run = ++generation.current
    speechSynthesis.cancel()
    setFailed(false)
    setStatus('playing')
    setCurrent(from)
    segments.slice(from).forEach((segment, offset) => {
      const index = from + offset
      const utterance = new SpeechSynthesisUtterance(segment.text)
      utterance.lang = voice.current?.lang ?? 'es-AR'
      if (voice.current) utterance.voice = voice.current
      utterance.rate = speed
      utterance.onstart = () => { if (run === generation.current) setCurrent(index) }
      if (index === segments.length - 1) {
        utterance.onend = () => {
          if (run !== generation.current) return
          setStatus('idle')
          setCurrent(-1)
        }
      }
      utterance.onerror = event => {
        if (run !== generation.current || event.error === 'interrupted' || event.error === 'canceled') return
        generation.current += 1
        speechSynthesis.cancel()
        setFailed(true)
        setStatus('idle')
      }
      speechSynthesis.speak(utterance)
    })
  }

  function pause() {
    generation.current += 1
    speechSynthesis.cancel()
    setStatus('paused')
  }

  function stop() {
    generation.current += 1
    speechSynthesis.cancel()
    setStatus('idle')
    setCurrent(-1)
  }

  function changeRate(next: number) {
    setRate(next)
    if (status === 'playing') playFrom(Math.max(current, 0), next)
  }

  return {
    supported, status, current, rate, failed,
    playFrom, pause, stop, changeRate,
    resume: () => playFrom(Math.max(current, 0)),
  }
}
