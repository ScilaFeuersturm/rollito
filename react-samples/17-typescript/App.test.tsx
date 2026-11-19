// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('la lista genérica muestra cada elemento con la función que recibe', () => {
  render(<App />)
  expect(screen.getAllByRole('listitem').map(li => li.textContent))
    .toEqual(['Pagar la luz (alta)', 'Ordenar el placard (baja)'])
})
