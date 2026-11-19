// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { memoize } from './memoize'
import { throttle } from './throttle'
import { useLocalStorage } from './useLocalStorage'

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); localStorage.clear() })

describe('memoize', () => {
  it('calcula una vez por clave', () => {
    const lenta = vi.fn((n: number) => n * 2)
    const rapida = memoize(lenta)
    expect(rapida(21)).toBe(42)
    expect(rapida(21)).toBe(42)
    expect(lenta).toHaveBeenCalledTimes(1)
    expect(rapida(1)).toBe(2)
    expect(lenta).toHaveBeenCalledTimes(2)
  })

  it('acepta una función para armar la clave con varios argumentos', () => {
    const suma = vi.fn((a: number, b: number) => a + b)
    const memorizada = memoize(suma, (a, b) => `${a},${b}`)
    memorizada(1, 2); memorizada(1, 2); memorizada(2, 1)
    expect(suma).toHaveBeenCalledTimes(2)
  })
})

describe('throttle', () => {
  it('ejecuta la primera enseguida y una sola al final con los últimos argumentos', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const limitada = throttle(fn, 100)
    limitada('a'); limitada('b'); limitada('c')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith('a')
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('c')
  })
})

describe('useLocalStorage', () => {
  it('persiste el valor y lo recupera en un nuevo montaje', () => {
    const { result, unmount } = renderHook(() => useLocalStorage('filtro', 'todas'))
    act(() => result.current[1]('pendientes'))
    unmount()
    const { result: otra } = renderHook(() => useLocalStorage('filtro', 'todas'))
    expect(otra.current[0]).toBe('pendientes')
  })

  it('si localStorage falla, funciona en memoria sin romper', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('bloqueado') })
    const { result } = renderHook(() => useLocalStorage('filtro', 'todas'))
    expect(result.current[0]).toBe('todas')
    act(() => result.current[1]('hechas'))
    expect(result.current[0]).toBe('hechas')
  })
})
