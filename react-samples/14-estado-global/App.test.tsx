// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('dos componentes comparten el mismo estado a través del reducer', () => {
  render(<App />)
  expect(screen.getByText('Pendientes: 1')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(screen.getByText('Pendientes: 2')).toBeTruthy()
  fireEvent.click(screen.getAllByRole('button', { name: '○' })[0])
  expect(screen.getByText('Pendientes: 1')).toBeTruthy()
})
