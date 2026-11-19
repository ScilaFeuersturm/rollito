// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import App, { Tabs } from './App'

afterEach(() => { cleanup(); vi.restoreAllMocks() })

it('no controlado: cambia de panel y marca la tab seleccionada', () => {
  render(<App />)
  expect(screen.getByRole('tabpanel').textContent).toBe('Pagar la luz')
  fireEvent.click(screen.getByRole('tab', { name: 'Hechas' }))
  expect(screen.getByRole('tab', { name: 'Hechas' }).getAttribute('aria-selected')).toBe('true')
  expect(screen.getByRole('tabpanel').textContent).toBe('Comprar yerba')
})

it('controlado: manda el valor de afuera y avisa los cambios', () => {
  const alCambiar = vi.fn()
  render(
    <Tabs activa="a" alCambiar={alCambiar}>
      <Tabs.Lista><Tabs.Tab id="a">A</Tabs.Tab><Tabs.Tab id="b">B</Tabs.Tab></Tabs.Lista>
      <Tabs.Panel id="a">Panel A</Tabs.Panel><Tabs.Panel id="b">Panel B</Tabs.Panel>
    </Tabs>,
  )
  fireEvent.click(screen.getByRole('tab', { name: 'B' }))
  expect(alCambiar).toHaveBeenCalledWith('b')
  expect(screen.getByRole('tabpanel').textContent).toBe('Panel A') // manda el padre, que no cambió
})

it('usar una pieza afuera de Tabs da un error claro', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<Tabs.Tab id="x">X</Tabs.Tab>)).toThrow('Tab y Panel van adentro de <Tabs>')
})
