// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('las tarjetas leen el tema del contexto, sin props intermedias', () => {
  render(<App />)
  expect(screen.getByText('Comprar yerba · tema claro')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Cambiar tema' }))
  expect(screen.getByText('Comprar yerba · tema oscuro')).toBeTruthy()
  expect(screen.getByText('Pagar la luz · tema oscuro')).toBeTruthy()
})
