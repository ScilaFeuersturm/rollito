// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('dibuja solo las filas visibles y las cambia al hacer scroll', () => {
  render(<App />)
  expect(screen.getAllByRole('listitem')).toHaveLength(12) // no 10.000
  expect(screen.getByText('Tarea 1')).toBeTruthy()

  fireEvent.scroll(screen.getByTestId('contenedor'), { target: { scrollTop: 32 * 5000 } })
  expect(screen.getByText('Tarea 5001')).toBeTruthy()
  expect(screen.queryByText('Tarea 1')).toBeNull()
  expect(screen.getAllByRole('listitem')).toHaveLength(12)
})
