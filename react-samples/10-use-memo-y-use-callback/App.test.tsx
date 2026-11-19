// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('filtra con la búsqueda y borra una fila', () => {
  render(<App />)
  expect(screen.getByText('200 tareas')).toBeTruthy()
  fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'Tarea 19' } })
  expect(screen.getByText('11 tareas')).toBeTruthy()
  fireEvent.click(screen.getAllByRole('button', { name: 'Borrar' })[0])
  expect(screen.getByText('10 tareas')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Cambiar modo' }))
  expect(screen.getByText('10 tareas')).toBeTruthy()
})
