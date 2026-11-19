// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Contador from './Contador'
import ListaDeTareas from './ListaDeTareas'
import { agruparPor } from './agruparPor'
import { debounce } from './debounce'
import { promiseAll } from './promiseAll'
import { useDebounce } from './useDebounce'

afterEach(() => { cleanup(); vi.useRealTimers() })

describe('Contador', () => {
  it('respeta el mínimo, el máximo y reinicia', () => {
    render(<Contador maximo={2} />)
    const restar = screen.getByRole('button', { name: 'Restar' }) as HTMLButtonElement
    const sumar = screen.getByRole('button', { name: 'Sumar' }) as HTMLButtonElement
    expect(restar.disabled).toBe(true)
    fireEvent.click(sumar); fireEvent.click(sumar)
    expect(screen.getByText('Valor: 2')).toBeTruthy()
    expect(sumar.disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }))
    expect(screen.getByText('Valor: 0')).toBeTruthy()
  })
})

describe('ListaDeTareas', () => {
  it('agrega, ignora vacías y borra', () => {
    render(<ListaDeTareas />)
    const campo = screen.getByLabelText('Nueva tarea')
    fireEvent.change(campo, { target: { value: '  ' } }); fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    expect(screen.getByText('No hay tareas')).toBeTruthy()
    fireEvent.change(campo, { target: { value: 'Comprar yerba' } }); fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    fireEvent.change(campo, { target: { value: 'Pagar la luz' } }); fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Borrar Comprar yerba' }))
    expect(screen.getAllByRole('listitem').map(li => li.firstChild?.textContent)).toEqual(['Pagar la luz'])
  })
})

describe('agruparPor', () => {
  it('agrupa según la clave', () => {
    const tareas = [{ t: 'a', hecha: true }, { t: 'b', hecha: false }, { t: 'c', hecha: true }]
    expect(agruparPor(tareas, x => (x.hecha ? 'hechas' : 'pendientes'))).toEqual({
      hechas: [{ t: 'a', hecha: true }, { t: 'c', hecha: true }],
      pendientes: [{ t: 'b', hecha: false }],
    })
  })
})

describe('debounce', () => {
  it('ejecuta una sola vez, con los últimos argumentos', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const demorada = debounce(fn, 300)
    demorada('y'); vi.advanceTimersByTime(100); demorada('ye'); vi.advanceTimersByTime(100); demorada('yer')
    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('yer')
  })
})

describe('useDebounce', () => {
  it('devuelve el valor recién cuando deja de cambiar', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), { initialProps: { v: 'y' } })
    rerender({ v: 'ye' }); act(() => { vi.advanceTimersByTime(200) })
    rerender({ v: 'yer' }); act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe('y')
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBe('yer')
  })
})

describe('promiseAll', () => {
  const demora = <T,>(valor: T, ms: number) => new Promise<T>(r => setTimeout(() => r(valor), ms))
  it('mantiene el orden aunque terminen en otro orden', async () => {
    expect(await promiseAll([demora('a', 30), demora('b', 10), demora('c', 20)])).toEqual(['a', 'b', 'c'])
  })
  it('rechaza con el primer error', async () => {
    await expect(promiseAll([demora('a', 30), Promise.reject(new Error('falló'))])).rejects.toThrow('falló')
  })
  it('resuelve una lista vacía', async () => {
    expect(await promiseAll([])).toEqual([])
  })
})
