// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('al tocar el botón cambia el estado y la pantalla se actualiza', () => {
  render(<App />)
  expect(screen.getByText('Pendiente')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Completar' }))
  expect(screen.getByText('Hecha')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Marcar como pendiente' }))
  expect(screen.getByText('Pendiente')).toBeTruthy()
})
