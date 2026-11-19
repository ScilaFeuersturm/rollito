// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('agrega al principio y conserva los demás elementos', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Agregar arriba' }))
  expect(screen.getAllByRole('listitem').map(li => li.textContent))
    .toEqual(['Llamar al médico', 'Comprar yerba', 'Pagar la luz'])
})
