// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('muestra los valores de las expresiones entre llaves', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Comprar yerba' })).toBeTruthy()
  expect(screen.getByText('Vence hoy')).toBeTruthy()
  expect(screen.getByText('Te quedan 3 tareas pendientes')).toBeTruthy()
})
