// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App, { dibujos } from './App'

afterEach(cleanup)

it('el selector evita dibujos cuando cambia otra parte del estado', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(screen.getByText('Pendientes: 1')).toBeTruthy()

  const antes = dibujos.pendientes
  fireEvent.change(screen.getByLabelText('Filtro'), { target: { value: 'Tarea' } })
  expect(dibujos.pendientes).toBe(antes) // cambiar el filtro no redibuja Pendientes

  fireEvent.click(screen.getByRole('button', { name: 'Completar Tarea 1' }))
  expect(screen.getByText('Pendientes: 0')).toBeTruthy()
  expect(dibujos.pendientes).toBe(antes + 1)
})
